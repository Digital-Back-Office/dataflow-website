#!/usr/bin/env python3
"""Daily cloud pricing refresh for the pricing2 page.

Fetches current GCP and IONOS compute pricing, computes an hourly cost per
instance (compute + a DISK_GB SSD data disk billed hourly), rounds to
PRICE_DECIMALS, and writes the results back into src/data/pricing2.json.

Only GCP and IONOS are touched here -- AWS and Azure are flagged
"hidden": true in the JSON (kept, not deleted) and are intentionally left
alone so they can be re-enabled later without re-deriving their prices.

Called from .github/workflows/update_pricing.yaml. No orchestration
(checkout/commit/push) lives in this file -- just fetch -> calculate -> write.
"""

from __future__ import annotations

import json
import os
import re
import sys
from datetime import date
from pathlib import Path

import requests

# --------------------------------------------------------------------------
# Config
# --------------------------------------------------------------------------

REPO_ROOT = Path(__file__).resolve().parents[2]
PRICING_JSON_PATH = REPO_ROOT / "src" / "data" / "pricing2.json"

REGION = "us-central1"  # reference region used to price every instance
DISK_GB = 60  # data disk size added on top of every instance's compute cost
PRICE_DECIMALS = 3  # round every price_per_hour to 3 decimal places (0.001 max precision)

GCP_HOURS_PER_MONTH = 730  # GCP's own hours-per-month convention for monthly SKUs
IONOS_HOURS_PER_CYCLE = 30 * 24  # IONOS bills storage per 30-day cycle

GCP_COMPUTE_SERVICE_ID = "6F81-5844-456A"  # Compute Engine, stable across all projects
GCP_SKUS_URL = f"https://cloudbilling.googleapis.com/v1/services/{GCP_COMPUTE_SERVICE_ID}/skus"

IONOS_PRICES_URL = "https://cloud.ionos.com/prices"

USER_AGENT = "dataflow-pricing-bot/1.0 (+https://dataflow.zone)"

# GCP machine-family SKU description fragments. These are matched against the
# live SKU catalog's `description` field. If Google renames a SKU, this is the
# one place to fix the regex.
GCP_FAMILY_PATTERNS = {
    "E2": {"core": r"E2 Instance Core running in", "ram": r"E2 Instance Ram running in"},
    "N1": {"core": r"N1 Predefined Instance Core running in", "ram": r"N1 Predefined Instance Ram running in"},
    "N2": {"core": r"N2 Instance Core running in", "ram": r"N2 Instance Ram running in"},
    "C2": {"core": r"Compute optimized Core running in", "ram": r"Compute optimized Ram running in"},
    "G2": {"core": r"G2 Instance Core running in", "ram": r"G2 Instance Ram running in"},
    "A2": {"core": r"A2 Instance Core running in", "ram": r"A2 Instance Ram running in"},
}
GCP_GPU_PATTERNS = {
    "T4": r"Nvidia Tesla T4 GPU running in",
    "L4": r"Nvidia L4 GPU running in",
    "A100": r"Nvidia Tesla A100 GPU running in",
}
GCP_DISK_PATTERN = r"SSD backed PD Capacity"

# instance_type -> pricing recipe, for the providers[].gcp catalog in pricing2.json
GCP_INSTANCE_RECIPES = {
    "e2-medium": {"family": "E2", "vcpu": 2, "memory_gb": 4, "gpu_type": None, "gpu_count": 0},
    "e2-standard-4": {"family": "E2", "vcpu": 4, "memory_gb": 16, "gpu_type": None, "gpu_count": 0},
    "n2-standard-8": {"family": "N2", "vcpu": 8, "memory_gb": 32, "gpu_type": None, "gpu_count": 0},
    "c2-standard-16": {"family": "C2", "vcpu": 16, "memory_gb": 64, "gpu_type": None, "gpu_count": 0},
    "n2-highmem-16": {"family": "N2", "vcpu": 16, "memory_gb": 128, "gpu_type": None, "gpu_count": 0},
    "g2-standard-4": {"family": "G2", "vcpu": 4, "memory_gb": 16, "gpu_type": "L4", "gpu_count": 1},
}

# saas_instances[] tier name -> the real GCP instance family it corresponds to.
# Each tier's vcpu/memory_gb in pricing2.json already matches a real named GCP
# instance's spec exactly -- this just points each tier at the right family so
# it's priced with that instance's actual rate, not a generic stand-in:
#   Small Server     -> e2-medium        (2 vcpu / 4 GB)
#   Medium Server     -> e2-standard-2    (2 vcpu / 8 GB)
#   Large Server      -> e2-standard-4    (4 vcpu / 16 GB)
#   GPU T4 1x          -> n1-standard-2 + Nvidia T4 (2 vcpu / 7.5 GB)
#   GPU T4 Plus 1x     -> n1-standard-4 + Nvidia T4 (4 vcpu / 15 GB)
#   GPU L4 1x          -> g2-standard-4   (4 vcpu / 16 GB + Nvidia L4)
#   GPU A100 1x        -> a2-highgpu-1g   (12 vcpu / 85 GB + Nvidia A100)
SAAS_TIER_GCP_FAMILY = {
    "Small Server": "E2",
    "Medium Server": "E2",
    "Large Server": "E2",
    "GPU T4 1x": "N1",
    "GPU T4 Plus 1x": "N1",
    "GPU L4 1x": "G2",
    "GPU A100 1x": "A2",
}

# IONOS doesn't publish a per-GPU-hour rate alongside its public vCPU/RAM/SSD
# prices, so GPU tiers fall back to this maintained rate. Update if IONOS
# publishes GPU pricing or changes its GPU lineup.
IONOS_GPU_HOURLY_RATE = {
    "T4": 0.30,
    "L4": 0.65,
    "A100": 2.20,
}

GPU_TYPE_IN_NAME = re.compile(r"\b(T4|L4|A100)\b")


# --------------------------------------------------------------------------
# GCP -- Cloud Billing Catalog API (official, free with an API key)
# --------------------------------------------------------------------------

def _gcp_unit_price(sku: dict) -> float:
    rate = sku["pricingInfo"][0]["pricingExpression"]["tieredRates"][0]["unitPrice"]
    return int(rate.get("units", 0)) + rate.get("nanos", 0) / 1e9


def fetch_gcp_skus(api_key: str) -> list[dict]:
    skus: list[dict] = []
    page_token = None
    while True:
        params = {"key": api_key, "pageSize": 5000}
        if page_token:
            params["pageToken"] = page_token
        resp = requests.get(GCP_SKUS_URL, params=params, timeout=30)
        resp.raise_for_status()
        payload = resp.json()
        skus.extend(payload.get("skus", []))
        page_token = payload.get("nextPageToken")
        if not page_token:
            break
    return skus


def _find_gcp_rate(skus: list[dict], pattern: str) -> float:
    regex = re.compile(pattern, re.IGNORECASE)
    for sku in skus:
        if sku.get("category", {}).get("usageType") != "OnDemand":
            continue
        if REGION not in sku.get("serviceRegions", []):
            continue
        if regex.search(sku.get("description", "")):
            return _gcp_unit_price(sku)
    raise RuntimeError(
        f"No GCP SKU matched pattern {pattern!r} for region {REGION!r} -- "
        "GCP may have renamed this SKU; update GCP_FAMILY_PATTERNS / "
        "GCP_GPU_PATTERNS / GCP_DISK_PATTERN above."
    )


class GcpRates:
    """Per-unit hourly/monthly rates resolved once from the live SKU catalog."""

    def __init__(self, skus: list[dict]):
        self.core = {
            family: _find_gcp_rate(skus, patterns["core"])
            for family, patterns in GCP_FAMILY_PATTERNS.items()
        }
        self.ram = {
            family: _find_gcp_rate(skus, patterns["ram"])
            for family, patterns in GCP_FAMILY_PATTERNS.items()
        }
        self.gpu = {
            gpu_type: _find_gcp_rate(skus, pattern) for gpu_type, pattern in GCP_GPU_PATTERNS.items()
        }
        self.ssd_per_gb_month = _find_gcp_rate(skus, GCP_DISK_PATTERN)

    @property
    def disk_hourly(self) -> float:
        return self.ssd_per_gb_month * DISK_GB / GCP_HOURS_PER_MONTH

    def price(self, family: str, vcpu: float, memory_gb: float, gpu_type: str | None, gpu_count: int) -> float:
        total = self.core[family] * vcpu + self.ram[family] * memory_gb + self.disk_hourly
        if gpu_count:
            total += self.gpu[gpu_type] * gpu_count
        return round(total, PRICE_DECIMALS)


def fetch_gcp(api_key: str) -> GcpRates:
    return GcpRates(fetch_gcp_skus(api_key))


# --------------------------------------------------------------------------
# IONOS -- no public pricing API. The prices page is a Next.js app that ships
# its content as a __NEXT_DATA__ JSON blob (props.pageProps.typo3Response...);
# reading that structured data is far more reliable than pattern-matching the
# rendered text, which turned out to false-match unrelated numbers on the
# page (e.g. RHEL license fees) during testing.
# --------------------------------------------------------------------------

_PRICE_RE = re.compile(r"\$\s*([\d]+\.?[\d]*)")
_NEXT_DATA_RE = re.compile(r'<script id="__NEXT_DATA__" type="application/json">(.*?)</script>', re.DOTALL)
_MDX_STRING_RE = re.compile(r'children:\s*"((?:[^"\\]|\\.)*)"')


def _extract_next_data(html: str) -> dict:
    match = _NEXT_DATA_RE.search(html)
    if not match:
        raise RuntimeError(
            "Could not find the __NEXT_DATA__ JSON blob on the IONOS prices page -- "
            "the page structure has changed; update fetch_ionos()."
        )
    return json.loads(match.group(1))


def _cell_text(cell: dict) -> str:
    """A table cell's `value` is sometimes a plain string, sometimes compiled
    MDX source with the visible text as a JS string literal after `children:`
    -- pull the human-readable text out of either form."""
    value = cell.get("value", "")
    if not isinstance(value, str) or "_createMdxContent" not in value:
        return value
    strings = _MDX_STRING_RE.findall(value)
    return strings[-1] if strings else value


def _find_table_section(colpos0: list, headline: str) -> dict:
    for item in colpos0:
        section_headline = (item.get("content") or {}).get("headline")
        text = section_headline.get("value") if isinstance(section_headline, dict) else section_headline
        if text == headline:
            return item["content"]
    raise RuntimeError(
        f"No pricing section titled {headline!r} found on {IONOS_PRICES_URL} -- "
        "IONOS may have renamed this section; update the headline lookup in fetch_ionos()."
    )


def _row_price(table: dict, row_label_substring: str) -> float:
    for row in table["tbody"]:
        cells = row["cells"]
        if row_label_substring.lower() in _cell_text(cells[0]).lower():
            match = _PRICE_RE.search(_cell_text(cells[-1]))
            if match:
                return float(match.group(1))
    raise RuntimeError(
        f"No row matching {row_label_substring!r} found in an IONOS pricing table -- "
        "update the row label lookup in fetch_ionos()."
    )


class IonosRates:
    def __init__(self, next_data: dict):
        colpos0 = next_data["props"]["pageProps"]["typo3Response"]["content"]["colPos0"]

        vcpu_table = _find_table_section(colpos0, "vCPU servers")["items"][0]["table"][0]
        self.vcpu_hr = _row_price(vcpu_table, "vCPU")
        self.ram_hr = _row_price(vcpu_table, "RAM")

        storage_table = _find_table_section(colpos0, "Block Storage")["items"][0]["table"][0]
        self.ssd_per_gb_cycle = _row_price(storage_table, "SSD Premium")

    @property
    def disk_hourly(self) -> float:
        return self.ssd_per_gb_cycle * DISK_GB / IONOS_HOURS_PER_CYCLE

    def price(self, vcpu: float, memory_gb: float, gpu_type: str | None, gpu_count: int) -> float:
        total = self.vcpu_hr * vcpu + self.ram_hr * memory_gb + self.disk_hourly
        if gpu_count:
            total += IONOS_GPU_HOURLY_RATE.get(gpu_type, IONOS_GPU_HOURLY_RATE["T4"]) * gpu_count
        return round(total, PRICE_DECIMALS)


def fetch_ionos() -> IonosRates:
    resp = requests.get(IONOS_PRICES_URL, headers={"User-Agent": USER_AGENT}, timeout=30)
    resp.raise_for_status()
    return IonosRates(_extract_next_data(resp.text))


# --------------------------------------------------------------------------
# Assembly -- write the fetched/derived rates back into pricing2.json
# --------------------------------------------------------------------------

def gpu_type_from_name(name: str) -> str | None:
    match = GPU_TYPE_IN_NAME.search(name)
    return match.group(1) if match else None


def update_gcp_provider(provider: dict, rates: GcpRates) -> None:
    for instance in provider["instances"]:
        recipe = GCP_INSTANCE_RECIPES.get(instance["instance_type"])
        if recipe is None:
            raise RuntimeError(f"No GCP_INSTANCE_RECIPES entry for {instance['instance_type']!r} -- add one.")
        instance["price_per_hour"] = rates.price(
            recipe["family"], recipe["vcpu"], recipe["memory_gb"], recipe["gpu_type"], recipe["gpu_count"]
        )


def update_ionos_provider(provider: dict, rates: IonosRates) -> None:
    for instance in provider["instances"]:
        gpu_type = gpu_type_from_name(instance["display_name"]) or gpu_type_from_name(instance["instance_type"])
        instance["price_per_hour"] = rates.price(instance["vcpu"], instance["memory_gb"], gpu_type, instance["gpu"])


def update_saas_instances(data: dict, gcp_rates: GcpRates, ionos_rates: IonosRates) -> None:
    for tier in data["saas_instances"]:
        family = SAAS_TIER_GCP_FAMILY.get(tier["name"])
        if family is None:
            raise RuntimeError(f"No SAAS_TIER_GCP_FAMILY entry for saas tier {tier['name']!r} -- add one.")
        gpu_type = gpu_type_from_name(tier["name"])
        tier["prices"]["gcp"] = gcp_rates.price(family, tier["vcpu"], tier["memory_gb"], gpu_type, tier["gpu"])
        tier["prices"]["ionos"] = ionos_rates.price(tier["vcpu"], tier["memory_gb"], gpu_type, tier["gpu"])


def main() -> None:
    api_key = os.environ.get("GCP_PRICING_API_KEY")
    if not api_key:
        sys.exit("GCP_PRICING_API_KEY is not set -- export it locally or add it as a repo secret.")

    data = json.loads(PRICING_JSON_PATH.read_text())

    gcp_rates = fetch_gcp(api_key)
    ionos_rates = fetch_ionos()

    for provider in data["providers"]:
        if provider.get("hidden"):
            continue
        if provider["id"] == "gcp":
            update_gcp_provider(provider, gcp_rates)
        elif provider["id"] == "ionos":
            update_ionos_provider(provider, ionos_rates)

    update_saas_instances(data, gcp_rates, ionos_rates)

    data["last_updated"] = date.today().isoformat()

    PRICING_JSON_PATH.write_text(json.dumps(data, indent=4) + "\n")
    print(f"Updated {PRICING_JSON_PATH.relative_to(REPO_ROOT)} ({data['last_updated']})")


if __name__ == "__main__":
    main()
