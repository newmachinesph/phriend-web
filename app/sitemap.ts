import type { MetadataRoute } from "next";
import { LAST_UPDATED, SITE_URL } from "@/lib/site";
import { POSTS } from "./blog/_posts";
import { getCatalog, getFeatures } from "@/lib/catalogue";
import { CITY_PAGES } from "@/lib/cities";
import { cityPath, groupPath } from "@/lib/links";
import { OCCASIONS } from "@/lib/occasions";

export const revalidate = 600;

const lastModified = new Date(LAST_UPDATED);

/**
 * SPEC 13e §2.3. The category and city × category pages are listed only while they have live services, from
 * `GET /v1/content/sitemap` (G10, W3). Until that route exists they stay out: they are noindex at 0 services anyway, and
 * the site no longer counts services with a feed call per page. Left out too: /android (a redirect) and noindex pages.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [catalog, features] = await Promise.all([getCatalog(), getFeatures()]);
  const page = (path: string, changeFrequency: "daily" | "weekly" | "monthly" | "yearly", priority: number, modified = lastModified) => ({ url: `${SITE_URL}${path}`, lastModified: modified, changeFrequency, priority });
  return [
    page("", "weekly", 1),
    page("/services", "weekly", 0.9),
    ...catalog.groups.map((g) => page(groupPath(g), "weekly", 0.85)),
    ...CITY_PAGES.map((c) => page(cityPath(c), "weekly", 0.8)),
    page("/occasions", "monthly", 0.8),
    ...OCCASIONS.map((o) => page(`/occasions/${o.slug}`, "monthly", 0.8)),
    page("/blog", "weekly", 0.7),
    ...POSTS.map((p) => page(`/blog/${p.slug}`, "monthly", 0.7, new Date(p.date))),
    // /teams is a 404 while the client app has teams off (v2.0 on iOS), so it is listed only while they are on
    ...(features.teams ? [page("/teams", "daily", 0.7)] : []),
    page("/creators", "monthly", 0.6),
    page("/press", "monthly", 0.5),
    page("/download", "monthly", 0.6),
    page("/safety", "monthly", 0.8),
    page("/community-guidelines", "monthly", 0.6),
    page("/terms", "yearly", 0.4),
    page("/privacy", "yearly", 0.4),
    page("/delete-account", "yearly", 0.4),
  ];
}
