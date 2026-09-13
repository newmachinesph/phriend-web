import type { MetadataRoute } from "next";
import { LAST_UPDATED, SITE_URL } from "@/lib/site";
import { POSTS } from "./blog/_posts";
import { listDbPosts } from "@/lib/blog-db";
import { activitySlug, CITY_PAGES, comboPath, getCategories } from "@/lib/landing";

const lastModified = new Date(LAST_UPDATED);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, dbPosts] = await Promise.all([getCategories(), listDbPosts()]);
  const featured = categories.slice(0, 16);
  return [
    { url: SITE_URL, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/safety`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/community-guidelines`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/press`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/creators`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/blog`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    ...POSTS.map((p) => ({ url: `${SITE_URL}/blog/${p.slug}`, lastModified: new Date(p.date), changeFrequency: "monthly" as const, priority: 0.7 })),
    ...dbPosts.map((p) => ({ url: `${SITE_URL}/blog/${p.slug}`, lastModified: new Date(p.updatedAt), changeFrequency: "monthly" as const, priority: 0.7 })),
    // landing pages: every activity, the six cities, and each city crossed with the featured activities
    ...categories.map((c) => ({ url: `${SITE_URL}/rent-a-friend/${activitySlug(c.label)}`, lastModified, changeFrequency: "weekly" as const, priority: 0.8 })),
    ...CITY_PAGES.map((c) => ({ url: `${SITE_URL}/${c.slug}`, lastModified, changeFrequency: "weekly" as const, priority: 0.8 })),
    ...CITY_PAGES.flatMap((city) => featured.map((c) => ({ url: `${SITE_URL}${comboPath(c, city)}`, lastModified, changeFrequency: "weekly" as const, priority: 0.7 }))),
    { url: `${SITE_URL}/terms`, lastModified, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/delete-account`, lastModified, changeFrequency: "yearly", priority: 0.4 },
  ];
}
