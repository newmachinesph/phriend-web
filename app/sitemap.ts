import type { MetadataRoute } from "next";
import { LAST_UPDATED, SITE_URL } from "@/lib/site";

const lastModified = new Date(LAST_UPDATED);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/safety`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/community-guidelines`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/press`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/terms`, lastModified, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.4 },
  ];
}
