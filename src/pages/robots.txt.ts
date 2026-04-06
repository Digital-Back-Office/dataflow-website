import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const resolvedSite = site?.toString().replace(/\/$/, "") ?? "https://dataflow.zone";

  // SEO: Keep crawl controls explicit and always reference the runtime sitemap URL.
  const body = [
    "User-agent: *",
    "Disallow: /admin/",
    "Disallow: /private/",
    "Disallow: /drafts/",
    "Disallow: /preview/",
    "Disallow: /search/",
    "Disallow: /api/",
    "Allow: /",
    `Sitemap: ${resolvedSite}/sitemap.xml`,
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};