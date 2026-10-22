import "server-only";
import { findPost, POSTS, type Post } from "@/app/blog/_posts";
import { blog, isCdnImage, safeImageUrl } from "@/lib/api";
import { degraded } from "@/lib/catalogue";
import { readingMinutes } from "@/lib/markdown";
import { BLOG_LIMITS, blogBodyProblem, blogSlugSchema, isOnProductText, PAGE, type BlogArticle, type BlogCard } from "@/lib/phriend2";

/**
 * The blog (SPEC 13e §2.2): the coded articles in `app/blog/_posts` plus Ops articles from `GET /v1/content/blog`.
 *
 * api2 returns only published, on-product articles with a safe body. The site checks both again (the contracts text
 * rule and `blogBodyProblem`) as a second gate, so an article that fails either is left out of the list and is a 404.
 * When api2 does not answer, reads behave like the catalogue's (lib/catalogue.ts `degraded`): empty during a build,
 * thrown at runtime so ISR keeps the last good page.
 */

export const BLOG_REVALIDATE_S = 60;
export const BLOG_PAGE_SIZE = 12;
/** A guard against a cursor loop: 40 pages of 50 is far more than the daily publisher will ever produce. */
const MAX_LIST_PAGES = 40;

export type BlogCover = { src: string; alt: string; /** next/image may optimise it (CDN or a local file) */ optimize: boolean };

export type BlogEntry = {
  slug: string;
  title: string;
  description: string | null;
  tags: string[];
  cover: BlogCover | null;
  publishedAt: string;
  updatedAt: string;
  /** Known for coded articles; Ops articles carry no body in the list. */
  readingMinutes: number | null;
};

export type ArticleView =
  | { kind: "coded"; entry: BlogEntry; post: Post }
  | { kind: "api"; entry: BlogEntry; seoTitle: string | null; body: string };

const codedDate = (p: Post) => `${p.date}T09:00:00+08:00`;

function codedEntry(p: Post): BlogEntry {
  return {
    slug: p.slug,
    title: p.title,
    description: p.description,
    tags: p.tags,
    cover: { src: p.hero.src, alt: p.hero.alt, optimize: true },
    publishedAt: codedDate(p),
    updatedAt: codedDate(p),
    readingMinutes: p.readingMinutes,
  };
}

function coverOf(url: string | null): BlogCover | null {
  const src = safeImageUrl(url);
  return src ? { src, alt: "", optimize: isCdnImage(src) } : null;
}

const cardIsOnProduct = (c: BlogCard) => isOnProductText([c.title, c.description ?? "", c.tags.join(" ")].join("\n"));

function apiEntry(c: BlogCard, body?: string): BlogEntry {
  return {
    slug: c.slug,
    title: c.title,
    description: c.description,
    tags: c.tags,
    cover: coverOf(c.coverUrl),
    publishedAt: c.publishedAt,
    updatedAt: c.updatedAt,
    readingMinutes: body === undefined ? null : readingMinutes(body),
  };
}

const newestFirst = (a: BlogEntry, b: BlogEntry) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt);

/** Every article, newest first: all of api2's pages by cursor, plus the coded ones (a coded slug wins). */
export async function getBlogEntries(): Promise<BlogEntry[]> {
  const coded = POSTS.map(codedEntry);
  const taken = new Set(coded.map((e) => e.slug));
  const fromApi: BlogEntry[] = [];
  const seenCursors = new Set<string>();
  let cursor: string | null = null;
  for (let page = 0; page < MAX_LIST_PAGES; page++) {
    const r = await blog(BLOG_REVALIDATE_S).list({ cursor, limit: PAGE.maxLimit });
    if (!r.ok) return degraded([...coded].sort(newestFirst), "blog list");
    for (const c of r.data.items) {
      if (!taken.has(c.slug) && cardIsOnProduct(c)) {
        taken.add(c.slug);
        fromApi.push(apiEntry(c));
      }
    }
    cursor = r.data.nextCursor;
    if (!cursor || seenCursors.has(cursor)) break;
    seenCursors.add(cursor);
  }
  return [...coded, ...fromApi].sort(newestFirst);
}

/** The contracts text rule, the body rule and the body limit (a longer body is refused by api2 and never parsed here). */
const articleIsSafe = (a: BlogArticle) =>
  a.body.length <= BLOG_LIMITS.body.max &&
  isOnProductText([a.title, a.description ?? "", a.seoTitle ?? "", a.tags.join(" "), a.body].join("\n")) && blogBodyProblem(a.body) === null;

/** One article, or null for an unknown, unpublished, off-product or unsafe slug (the page answers 404). */
export async function getArticle(slug: string): Promise<ArticleView | null> {
  const post = findPost(slug);
  if (post) return { kind: "coded", entry: codedEntry(post), post };
  if (!blogSlugSchema.safeParse(slug).success) return null;
  const r = await blog(BLOG_REVALIDATE_S).article(slug);
  if (!r.ok) {
    if (r.error.kind === "api" && r.error.status === 404) return null;
    return degraded(null, "blog article");
  }
  const a = r.data;
  if (a.slug !== slug || !articleIsSafe(a)) return null;
  return { kind: "api", entry: apiEntry(a, a.body), seoTitle: a.seoTitle, body: a.body };
}

/** The tag key used in `/blog?tag=`. */
export const tagKey = (tag: string) => tag.trim().toLowerCase();

/** Tags across the articles, most used first, each with its first-seen spelling. */
export function blogTags(entries: BlogEntry[]): { key: string; label: string; count: number }[] {
  const tags = new Map<string, { key: string; label: string; count: number }>();
  for (const e of entries) {
    for (const t of new Set(e.tags.map(tagKey))) {
      const label = e.tags.find((x) => tagKey(x) === t) ?? t;
      const row = tags.get(t);
      tags.set(t, row ? { ...row, count: row.count + 1 } : { key: t, label, count: 1 });
    }
  }
  return [...tags.values()].sort((a, b) => b.count - a.count || a.key.localeCompare(b.key));
}

/** "October 22, 2026" in Manila time. */
export const formatBlogDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-PH", { timeZone: "Asia/Manila", year: "numeric", month: "long", day: "numeric" });
