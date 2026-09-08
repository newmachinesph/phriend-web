import "server-only";
import { neon } from "@neondatabase/serverless";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

/** Articles written in Ops (blog_posts table); only published rows reach the site. The photographers article stays in code. */
export type DbPost = {
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

/** The Neon client, or null when the site runs without a database (local builds, a misconfigured env): the blog then shows only the coded article. */
const sql = () => {
  const url = (process.env.DATABASE_URL ?? "").trim().replace(/^["']|["']$/g, "");
  if (!url) return null;
  try {
    return neon(url);
  } catch {
    return null;
  }
};
const cols = "id, slug, title, seo_title as \"seoTitle\", description, niche, tags, cover, body_md as \"bodyMd\", published_at as \"publishedAt\", updated_at as \"updatedAt\"";
const row = (r: Record<string, unknown>): DbPost => ({
  ...(r as Omit<DbPost, "publishedAt" | "updatedAt" | "tags">),
  tags: Array.isArray(r.tags) ? (r.tags as string[]) : [],
  publishedAt: new Date(String(r.publishedAt)).toISOString(),
  updatedAt: new Date(String(r.updatedAt)).toISOString(),
});

export async function listDbPosts(): Promise<DbPost[]> {
  const q = sql();
  if (!q) return [];
  try {
    const rows = await q.query(`select ${cols} from blog_posts where status = 'published' order by published_at desc limit 100`);
    return (rows as Record<string, unknown>[]).map(row);
  } catch {
    return [];
  }
}

export async function findDbPost(slug: string): Promise<DbPost | null> {
  const q = sql();
  if (!q) return null;
  try {
    const rows = await q.query(`select ${cols} from blog_posts where status = 'published' and slug = $1 limit 1`, [slug]);
    return rows.length ? row((rows as Record<string, unknown>[])[0]) : null;
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
