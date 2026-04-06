import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

const STATIC_ROUTES: Array<{ path: string; changefreq: string; priority: string }> = [
  { path: "/", changefreq: "daily", priority: "1.0" },
  { path: "/blog", changefreq: "weekly", priority: "0.8" },
  { path: "/about-us", changefreq: "monthly", priority: "0.7" },
  { path: "/contact-us", changefreq: "monthly", priority: "0.7" },
  { path: "/pricing", changefreq: "monthly", priority: "0.7" },
  { path: "/partners", changefreq: "monthly", priority: "0.6" },
  { path: "/book-demo", changefreq: "monthly", priority: "0.6" },
  { path: "/get-started", changefreq: "monthly", priority: "0.6" },
  { path: "/start-free-trial", changefreq: "monthly", priority: "0.6" },
  { path: "/free-credits", changefreq: "monthly", priority: "0.6" },
  { path: "/solutions/startups-smes", changefreq: "monthly", priority: "0.6" },
  { path: "/solutions/enterprise", changefreq: "monthly", priority: "0.6" },
  { path: "/solutions/personal", changefreq: "monthly", priority: "0.6" },
  { path: "/product/deploy-to-production", changefreq: "monthly", priority: "0.6" },
  { path: "/product/deploy-in-one-click", changefreq: "monthly", priority: "0.6" },
  { path: "/product/cloud-agnostic", changefreq: "monthly", priority: "0.6" },
  { path: "/product/development-ready-workspace", changefreq: "monthly", priority: "0.6" },
  { path: "/product/managed-dependencies", changefreq: "monthly", priority: "0.6" },
  { path: "/product/shared-foundation", changefreq: "monthly", priority: "0.6" },
  { path: "/legal/privacy-policy", changefreq: "yearly", priority: "0.4" },
  { path: "/legal/terms-and-conditions", changefreq: "yearly", priority: "0.4" },
];

const toAbsoluteUrl = (origin: string, routePath: string) => `${origin}${routePath}`;

export const GET: APIRoute = async ({ site }) => {
  const origin = (site?.toString() ?? "https://dataflow.zone").replace(/\/$/, "");
  const blogs = await getCollection("blogs");

  // SEO: Include all publishable blog detail pages to avoid sitemap orphaning.
  const blogRoutes = blogs
    .map((entry) => ({
      path: `/blog/${entry.slug}`,
      changefreq: "monthly",
      priority: "0.7",
      date: new Date(entry.data.date),
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  const xmlRows = [
    ...STATIC_ROUTES.map((route) => {
      const loc = toAbsoluteUrl(origin, route.path);
      return `<url><loc>${loc}</loc><changefreq>${route.changefreq}</changefreq><priority>${route.priority}</priority></url>`;
    }),
    ...blogRoutes.map((route) => {
      const loc = toAbsoluteUrl(origin, route.path);
      const lastmod = Number.isNaN(route.date.getTime())
        ? ""
        : `<lastmod>${route.date.toISOString().split("T")[0]}</lastmod>`;
      return `<url><loc>${loc}</loc>${lastmod}<changefreq>${route.changefreq}</changefreq><priority>${route.priority}</priority></url>`;
    }),
  ].join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${xmlRows}</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
