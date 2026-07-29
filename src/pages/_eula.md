---
lastUpdated: "July 2026"
---

This End User License Agreement ("Agreement") is a binding agreement between you (either an individual or the entity you represent, "you" or "Customer") and Dataflow ("Dataflow", "we", "us", or "our") governing your access to and use of the Dataflow software, platform, and hosted services (together, the "Platform"). By creating an account, installing the Software, activating a Dataflow offer through a cloud marketplace, or otherwise accessing the Platform, you agree to be bound by this Agreement. If you do not agree, do not access or use the Platform.

## Definitions

- Software — the Dataflow application code, container images, and configuration made available for installation in a Licensed Deployment.
- Platform — the Software together with the Hosted Service, Documentation, and any associated tools Dataflow makes available.
- Hosted Service — the "Dataflow Zone" SaaS offering, in which Dataflow operates the Software on Dataflow-managed infrastructure and you access it remotely.
- Licensed Deployment — an installation of the Software into Customer's own cloud account (AWS, Google Cloud, Microsoft Azure, IONOS Cloud, or on-premise infrastructure), including deployments activated through a cloud marketplace listing.
- Instance — a compute resource (CPU or GPU) provisioned within the Platform, whether a workspace, a scheduled job, or a Deployed Application.
- Deployed Application — any notebook, script, dashboard, model, or other workload that you publish or deploy through the Platform to a Dataflow-provided or Customer-provided URL.
- Customer Content — any data, code, files, models, credentials, and other content that you or your Authorized Users upload, connect, generate, or process using the Platform.
- Authorized User — an individual you permit to access the Platform under your account, subject to your subscription's seat or user limits.
- Documentation — Dataflow's published user guides and technical documentation for the Platform.

## License Grant

### Licensed (Self-Hosted) Deployments

Subject to your compliance with this Agreement and payment of applicable fees, Dataflow grants you a limited, non-exclusive, non-transferable, non-sublicensable, revocable license to install and run the Software within your own cloud account, for the number of Authorized Users covered by your subscription, solely for your internal business purposes. This license lasts only as long as your subscription remains active and in good standing. No source code is provided, and no rights are granted beyond those expressly stated in this Agreement.

### Hosted (Dataflow Zone) Deployments

Subject to your compliance with this Agreement and payment of applicable fees, Dataflow grants you a limited, non-exclusive, non-transferable, non-sublicensable, revocable right to access and use the Hosted Service for the number of Authorized Users covered by your subscription. No copy of the Software is delivered to you under the Hosted Service, and Dataflow retains full control over the infrastructure on which it runs.

## License Restrictions

Except as expressly permitted by this Agreement or by applicable law that cannot be waived by contract, you must not, and must not permit any third party to:

- Reverse engineer, decompile, disassemble, or otherwise attempt to derive the source code of the Software
- Resell, sublicense, rent, lease, lend, or provide the Platform to third parties on a service-bureau or timesharing basis
- Remove, obscure, or alter any proprietary notices on the Software or Documentation
- Circumvent or attempt to circumvent license keys, seat limits, usage quotas, or metering mechanisms
- Publish benchmarks or performance comparisons involving the Platform without Dataflow's prior written consent
- Use the Platform to build, train, or operate a product or service that competes with Dataflow

## Accounts and Authorized Users

You must be at least 18 years old to create a Dataflow account. You agree to provide accurate registration information, keep your credentials confidential, and promptly notify us of any unauthorized use of your account. You are responsible for all activity that occurs under your account and for ensuring that every Authorized User complies with this Agreement. Actions taken by an Authorized User are treated as actions taken by you.

## Acceptable Use Policy

The Platform provides substantial compute, GPU, and network resources, and it is your responsibility to use them lawfully and responsibly. In addition to any restrictions elsewhere in this Agreement, you must not use the Platform, any Instance, or any Deployed Application to:

- Mine, hash, mint, stake, or otherwise perform proof-of-work or proof-of-stake computation for cryptocurrency or any other blockchain or distributed-ledger network, whether for yourself or a third party
- Gain or attempt to gain unauthorized access to any system, account, or network you do not own or have written authorization to test, including port scanning, vulnerability scanning, or penetration testing of Dataflow's own infrastructure without our prior written authorization
- Launch or participate in denial-of-service attacks, traffic amplification, stress testing of third-party systems, or any activity intended to disrupt or overwhelm a network or service
- Develop, host, or operate malware, ransomware, spyware, keyloggers, rootkits, botnets, or command-and-control infrastructure, or develop or distribute exploits for unauthorized use
- Perform credential stuffing, brute-force password or hash cracking, or generate rainbow tables against systems you do not own
- Send spam or bulk unsolicited communications, operate open mail or SMS relays, or host phishing pages or spoofed login forms, including through a Deployed Application
- Scrape or harvest data in violation of a third party's terms of service, published robots directives, or applicable law
- Operate the Platform as a public proxy, VPN exit node, Tor exit node, or open relay carrying third-party traffic
- Host, transmit, or distribute content that is illegal, infringing, defamatory, or otherwise harmful; any child sexual abuse material will result in immediate account termination and a report to the appropriate authorities
- Process personal data or other regulated data that you do not have a lawful basis or right to process
- Train, fine-tune, or serve AI or machine learning models for unlawful purposes, including generating non-consensual intimate imagery, deepfakes intended to defraud or impersonate a real person, biometric surveillance prohibited under the EU AI Act or equivalent law, unlawful automated decision-making in credit, housing, or employment contexts, or disinformation intended to deceive at scale
- Circumvent resource limits, quotas, or metering, or run workloads designed to consume disproportionate compute, storage, or network capacity
- Abuse the free tier, trial period, or any promotional credits (including the free-credits and referral programs) through multiple accounts, false representations, or other fraudulent means
- Resell Instances or otherwise provide the Platform's underlying compute as infrastructure to third parties
- Interfere with other customers' use of the Platform, attempt to escape container or workspace isolation, or attempt to escalate privileges beyond those granted to you

Dataflow may investigate suspected violations of this Acceptable Use Policy and may suspend or terminate access as described under "Suspension and Termination" below.

## Terminal, Workspace, and Deployed Application Access

Workspaces, notebooks, and terminal sessions are provided within an isolated, non-privileged container environment. You are not granted root, host-level, hypervisor, or control-plane access to any underlying infrastructure, and you must not attempt to obtain such access by any means. Any attempt to escape your container, exploit the underlying kernel, move laterally to infrastructure or other tenants, or otherwise access resources beyond those explicitly granted to you is a material breach of this Agreement and grounds for immediate suspension.

When you publish a Deployed Application, it is made available at a Dataflow-provided or Customer-provided URL and may be reachable over the public internet. You are solely responsible for the content, security, and behavior of every Deployed Application you publish, including any authentication or access controls (or the absence of them), and for all traffic it sends or receives. Dataflow is not responsible for monitoring the content of Deployed Applications, but reserves the right to suspend any Deployed Application that violates this Agreement.

## Customer Content and Data

As between you and Dataflow, you retain all rights in your Customer Content. You grant Dataflow a limited, non-exclusive license to host, store, transmit, execute, and display Customer Content solely to the extent necessary to provide the Platform to you. Dataflow does not use Customer Content to train models or products unrelated to providing the Platform to you. You represent and warrant that you have all rights, licenses, and consents necessary to upload, connect, and process your Customer Content through the Platform, and that doing so does not violate any law or third-party right. Our collection and use of personal information is further described in our [Privacy Policy](/privacy-policy).

## Third-Party Software and Open Source

The Platform incorporates or interoperates with third-party and open-source components, including Jupyter and JupyterHub, Apache Airflow, Apache Superset, Apache Spark, MLflow, Streamlit, Dash, VS Code and code-server, dbt, and packages distributed through the Python Package Index. Each such component remains subject to its own license terms, which are available from the applicable project, and those terms govern that component to the extent they conflict with this Agreement. Where you supply your own third-party credentials or API keys (for example, keys for a third-party AI model provider), you are responsible for complying with that provider's terms, and Dataflow is not a party to your agreement with that provider.

## Fees, Billing, and Compute Charges

Hosted and Licensed Deployment fees are billed as described on our pricing page, which may combine flat license fees with usage-based compute charges billed per hour of active compute. You are responsible for all charges incurred by Instances running under your account, including Instances left running unintentionally. Compute prices are subject to change, and current prices are available on our pricing page at the time of use. Free tiers, trial periods, and promotional credits are made available at Dataflow's discretion, may be time-limited, and may be modified, restricted, or withdrawn at any time, including where we reasonably suspect abuse. Failure to pay amounts when due is grounds for suspension or termination of your account.

## Suspension and Termination

We may suspend or terminate your access to the Platform, in whole or in part, immediately and without prior notice, if we reasonably believe you have violated the Acceptable Use Policy or the License Restrictions, if your use poses a security risk to the Platform or to other customers, if your use is unlawful, or if you fail to pay amounts owed. You may terminate your account at any time by discontinuing use and, where applicable, canceling your subscription. Following termination, you will have a reasonable period, as described in the Documentation or communicated to you, to export your Customer Content before it is deleted or anonymized, except where we are required to retain it for legal or legitimate business purposes. Sections of this Agreement that by their nature should survive termination — including License Restrictions, Intellectual Property, Warranties and Disclaimers, Limitation of Liability, Indemnification, and Governing Law and Jurisdiction — will survive.

## Intellectual Property

Dataflow and its licensors retain all right, title, and interest in and to the Software, the Platform, and the Documentation, including all associated intellectual property rights. No rights are granted to you other than the limited licenses expressly set out in this Agreement. If you provide feedback or suggestions about the Platform, you grant Dataflow an unrestricted, royalty-free license to use that feedback for any purpose without obligation to you.

## Confidentiality

Each party may have access to non-public information of the other party in connection with this Agreement. Each party agrees to use the other party's confidential information only as necessary to perform its obligations under this Agreement, and to protect it with at least the same degree of care it uses for its own confidential information of similar importance, but no less than reasonable care. These obligations do not apply to information that is or becomes public through no fault of the receiving party, was already lawfully known to the receiving party, or is required to be disclosed by law.

## Warranties and Disclaimers

The Platform is provided "as is" and "as available." To the fullest extent permitted by law, Dataflow disclaims all warranties, express or implied, including the implied warranties of merchantability, fitness for a particular purpose, title, and non-infringement. Dataflow does not warrant that the Platform will be uninterrupted, secure, or error-free, or that any outputs from AI or machine learning workloads run on the Platform will be accurate, complete, or fit for any particular purpose. Beta, preview, or early-access features are provided without any warranty and may be changed or discontinued at any time.

## Limitation of Liability

To the fullest extent permitted by law, neither party will be liable to the other for any indirect, incidental, special, punitive, or consequential damages, or for any loss of profits, revenue, data, or goodwill, arising out of or relating to this Agreement, even if advised of the possibility of such damages. Each party's total aggregate liability arising out of or relating to this Agreement will not exceed the amount of fees paid or payable by you to Dataflow in the twelve months preceding the event giving rise to the claim. Nothing in this Agreement limits either party's liability for death or personal injury caused by negligence, fraud or fraudulent misrepresentation, or any other liability that cannot be limited or excluded under applicable law.

## Indemnification

You agree to indemnify and hold Dataflow harmless from any claims, damages, liabilities, and expenses (including reasonable legal fees) arising from your Customer Content, your Deployed Applications, your violation of the Acceptable Use Policy, or your unlawful use of the Platform.

## Export Control and Sanctions

You must comply with all applicable export control and economic sanctions laws of the United Kingdom, the European Union, and the United States. You represent that you are not located in, and will not use the Platform in, any country or region subject to comprehensive sanctions, and that you are not a person or entity subject to sanctions or export restrictions. You must not use the Platform in connection with nuclear, chemical or biological weapons, or missile technology end-uses.

## Compliance with Laws

You are responsible for ensuring that your use of the Platform, and any workloads, models, or Deployed Applications you run on it, complies with applicable law, including data protection law such as the UK GDPR and the EU General Data Protection Regulation, and, where applicable, the EU AI Act.

## Changes to This Agreement

We may update this Agreement from time to time to reflect changes in our practices, the Platform, or for legal, operational, or regulatory reasons. We will post the updated Agreement on this page, and your continued use of the Platform after an update constitutes acceptance of the revised Agreement. We encourage you to review this Agreement periodically.

## Governing Law and Jurisdiction

This Agreement is governed by the laws of England and Wales, without regard to conflict of laws principles. The courts of England and Wales will have exclusive jurisdiction over any dispute arising out of or relating to this Agreement.

## General

This Agreement, together with our [Privacy Policy](/privacy-policy) and [Terms and Conditions](/legal/terms-and-conditions), constitutes the entire agreement between you and Dataflow regarding the Platform. If any provision of this Agreement is found unenforceable, the remaining provisions will remain in full effect. A party's failure to enforce any provision is not a waiver of that provision. You may not assign this Agreement without our prior written consent; we may assign it in connection with a merger, acquisition, or sale of assets. Neither party is liable for delays or failures caused by events beyond its reasonable control. Where this Agreement conflicts with our Terms and Conditions on a matter specific to the Software or Platform, this Agreement controls.

Dataflow is operated by [LEGAL ENTITY NAME], [REGISTERED ADDRESS], United Kingdom (company number [COMPANY NUMBER]).

## Contact Us

If you have any questions about this Agreement, please contact us:

- By email: [support@dataflow.zone](mailto:support%40dataflow.zone)
- By visiting: [Contact Us](/contact-us)

By creating a Dataflow account, installing the Software, activating a Dataflow offer through a cloud marketplace, or otherwise accessing the Platform, you acknowledge that you have read, understood, and agree to be bound by this End User License Agreement.
