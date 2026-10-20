import "server-only";
import { API_URL, apiHeaders } from "./site";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import { isOnProduct } from "./blog-filter";

/** Articles written in Ops (blog_posts table); only published rows reach the site. The photographers article stays in code. */
type DbPost = {
  id: number;
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  niche: string;
  tags: string[];
  cover: string | null;
  bodyMd: string;
  publishedAt: string; // ISO
  updatedAt: string;
};

/** Published articles from the Phriend API (written in Ops). Empty when the API is unreachable: the blog then shows only the coded article. */
export async function listDbPosts(): Promise<DbPost[]> {
  try {
    const r = await fetch(`${API_URL}/api/blog`, { headers: apiHeaders(), next: { revalidate: 300 } });
    if (!r.ok) return [];
    const d = (await r.json()) as { posts: DbPost[] };
    return (d.posts ?? []).filter(isOnProduct);
  } catch {
    return [];
  }
}

export async function findDbPost(slug: string): Promise<DbPost | null> {
  try {
    const r = await fetch(`${API_URL}/api/blog/${encodeURIComponent(slug)}`, { headers: apiHeaders(), next: { revalidate: 300 } });
    if (!r.ok) return null;
    const d = (await r.json()) as { post: DbPost | null };
    return d.post && isOnProduct(d.post) ? d.post : null;
  } catch {
    return null;
  }
}

/** Markdown from Ops -> sanitized HTML for the article body. */
export function renderMarkdown(md: string): string {
  const html = marked.parse(md, { gfm: true, breaks: false }) as string;
  // sanitize-html is pure JavaScript (the jsdom-based sanitizers do not load on Vercel's runtime)
  return sanitizeHtml(html, {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, "img"],
    allowedAttributes: { ...sanitizeHtml.defaults.allowedAttributes, a: ["href", "name", "target", "rel"], img: ["src", "alt", "width", "height"] },
    allowedSchemes: ["https", "mailto"],
    allowedSchemesByTag: { img: ["https"] },
  });
}

export const readingMinutes = (md: string) => Math.max(1, Math.round(md.split(/\s+/).length / 200));
