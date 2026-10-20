import type { MetadataRoute } from "next";
import { LAST_UPDATED, SITE_URL } from "@/lib/site";
import { POSTS } from "./blog/_posts";
import { listDbPosts } from "@/lib/blog-db";
import { activitySlug, CITY_PAGES, comboPath, getCategories, getGroups, getServiceCounts, groupPath } from "@/lib/landing";
import { OCCASIONS } from "@/lib/occasions";
import { getFeatures } from "@/lib/features";

const lastModified = new Date(LAST_UPDATED);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, groups, dbPosts, counts, features] = await Promise.all([getCategories(), getGroups(), listDbPosts(), getServiceCounts(), getFeatures()]);
  // a landing page with no services is noindex (see generateMetadata), so it stays out until one is listed
  const listed = categories.filter((c) => (counts.all.get(c.slug) ?? 0) > 0);
  return [
    { url: SITE_URL, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/safety`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/community-guidelines`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/press`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    // /teams is a 404 while Ops has the teams switch off (as the nav hides it), so it is listed only while it is on
    ...(features.teams ? [{ url: `${SITE_URL}/teams`, lastModified, changeFrequency: "daily" as const, priority: 0.7 }] : []),
    { url: `${SITE_URL}/occasions`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    ...OCCASIONS.map((o) => ({ url: `${SITE_URL}/occasions/${o.slug}`, lastModified, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${SITE_URL}/creators`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/blog`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    ...POSTS.map((p) => ({ url: `${SITE_URL}/blog/${p.slug}`, lastModified: new Date(p.date), changeFrequency: "monthly" as const, priority: 0.7 })),
    ...dbPosts.map((p) => ({ url: `${SITE_URL}/blog/${p.slug}`, lastModified: new Date(p.updatedAt), changeFrequency: "monthly" as const, priority: 0.7 })),
    // the services directory and one page per group
    { url: `${SITE_URL}/services`, lastModified, changeFrequency: "weekly" as const, priority: 0.9 },
    ...groups.map((g) => ({ url: `${SITE_URL}${groupPath(g)}`, lastModified, changeFrequency: "weekly" as const, priority: 0.85 })),
    // landing pages: every activity with services, the six cities, and each city × activity with services there
    // (/android is left out: it only catches old links from the web app; it is noindex)
    ...listed.map((c) => ({ url: `${SITE_URL}/services/${activitySlug(c.label)}`, lastModified, changeFrequency: "weekly" as const, priority: 0.8 })),
    ...CITY_PAGES.map((c) => ({ url: `${SITE_URL}/${c.slug}`, lastModified, changeFrequency: "weekly" as const, priority: 0.8 })),
    ...CITY_PAGES.flatMap((city) => categories.filter((c) => (counts.byCity.get(city.slug)?.get(c.slug) ?? 0) > 0).map((c) => ({ url: `${SITE_URL}${comboPath(c, city)}`, lastModified, changeFrequency: "weekly" as const, priority: 0.7 }))),
    { url: `${SITE_URL}/terms`, lastModified, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/delete-account`, lastModified, changeFrequency: "yearly", priority: 0.4 },
  ];
}
