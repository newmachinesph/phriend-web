import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogCover } from "@/components/blog";
import { Container } from "@/components/ui";
import { BLOG_PAGE_SIZE, blogTags, formatBlogDate, getBlogEntries, tagKey, type BlogEntry } from "@/lib/blog";
import { breadcrumbJsonLd, NOINDEX_FOLLOW, pageMeta } from "@/lib/site";

// SPEC 13e §2.2: every page of GET /v1/content/blog (cached 60 s) plus the coded articles. `?tag=` and `?page=` make
// the page per request; the reads underneath stay cached.
export const revalidate = 60;

const META: Metadata = pageMeta({
  title: "Blog: guides to local services in the Philippines",
  description: "How booking a local service works, what services cost, and guides for providers who list their services on Phriend.",
  path: "/blog",
});

type Search = { tag?: string | string[]; page?: string | string[] };

/** The tag key and page number asked for; null when the page number is not a positive integer. */
function readSearch(sp: Search): { tag: string | null; page: number | null } {
  const tag = typeof sp.tag === "string" && sp.tag.trim() !== "" ? tagKey(sp.tag) : null;
  const raw = typeof sp.page === "string" ? sp.page : "1";
  const page = /^[1-9]\d{0,3}$/.test(raw) ? Number(raw) : null;
  return { tag, page };
}

const pageHref = (tag: string | null, page: number) => {
  const q = new URLSearchParams();
  if (tag) q.set("tag", tag);
  if (page > 1) q.set("page", String(page));
  const s = q.toString();
  return s ? `/blog?${s}` : "/blog";
};

export async function generateMetadata({ searchParams }: { searchParams: Promise<Search> }): Promise<Metadata> {
  const { tag, page } = readSearch(await searchParams);
  // filtered and later pages keep the canonical /blog and stay out of the index; the articles are in the sitemap
  return tag || page !== 1 ? { ...META, robots: NOINDEX_FOLLOW } : META;
}

function Meta({ entry }: { entry: BlogEntry }) {
  return (
    <p className="text-sm font-semibold text-muted">
      {formatBlogDate(entry.publishedAt)}
      {entry.readingMinutes ? ` · ${entry.readingMinutes} min read` : ""}
    </p>
  );
}

export default async function BlogIndex({ searchParams }: { searchParams: Promise<Search> }) {
  const sp = readSearch(await searchParams);
  const entries = await getBlogEntries();
  const tags = blogTags(entries);
  const shown = sp.tag ? entries.filter((e) => e.tags.some((t) => tagKey(t) === sp.tag)) : entries;
  const pages = Math.max(1, Math.ceil(shown.length / BLOG_PAGE_SIZE));
  if (sp.page === null || sp.page > pages || (sp.tag && shown.length === 0)) notFound();
  const page = sp.page;
  const slice = shown.slice((page - 1) * BLOG_PAGE_SIZE, page * BLOG_PAGE_SIZE);
  const featured = !sp.tag && page === 1 ? slice[0] : undefined;
  const grid = featured ? slice.slice(1) : slice;
  const tagLabel = sp.tag ? (tags.find((t) => t.key === sp.tag)?.label ?? sp.tag) : null;

  return (
    <Container as="main" id="main" className="pb-14 pt-8 sm:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd("Blog", "/blog") }} />
      <p className="text-sm font-extrabold uppercase tracking-wider text-brand-text">Blog</p>
      <h1 className="mt-2 max-w-2xl font-display text-h1 font-bold text-ink">{tagLabel ? `Articles on ${tagLabel}` : "Guides to local services, from booking to getting booked."}</h1>
      {!tagLabel && <p className="mt-4 max-w-2xl text-lg leading-relaxed">How a booking works, what services cost, and how providers get booked more often.</p>}

      {tags.length > 1 && (
        <nav aria-label="Topics" className="mt-8">
          <ul className="flex flex-wrap gap-2">
            <li>
              <Link href="/blog" aria-current={sp.tag ? undefined : "page"} className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-bold ${sp.tag ? "border-line bg-white text-ink hover:border-brand" : "border-brand bg-brand-soft text-brand-text"}`}>
                All
              </Link>
            </li>
            {tags.slice(0, 16).map((t) => (
              <li key={t.key} className="min-w-0 max-w-full">
                <Link
                  href={pageHref(t.key, 1)}
                  aria-current={sp.tag === t.key ? "page" : undefined}
                  className={`inline-flex min-h-11 max-w-full items-center rounded-full border px-4 text-sm font-bold ${sp.tag === t.key ? "border-brand bg-brand-soft text-brand-text" : "border-line bg-white text-ink hover:border-brand"}`}
                >
                  <span className="truncate">{t.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {shown.length === 0 ? (
        <p className="mt-12 max-w-2xl rounded-card border border-line bg-surface p-6 leading-relaxed">No articles yet. New guides are on the way.</p>
      ) : null}

      {featured && (
        <Link href={`/blog/${featured.slug}`} className="group mt-10 grid gap-6 rounded-card border border-line bg-white p-4 transition-colors hover:border-brand md:grid-cols-[1.3fr_1fr] md:p-6">
          <BlogCover cover={featured.cover} sizes="(min-width: 768px) 640px, 100vw" priority />
          <div className="flex min-w-0 flex-col justify-center">
            {featured.tags[0] && <p className="truncate text-sm font-extrabold uppercase tracking-wider text-brand-text">{featured.tags[0]}</p>}
            <h2 className="mt-2 break-words font-display text-h2 font-bold text-ink">{featured.title}</h2>
            {featured.description && <p className="mt-3 break-words leading-relaxed">{featured.description}</p>}
            <div className="mt-4">
              <Meta entry={featured} />
            </div>
            <span className="mt-4 font-bold text-brand-text group-hover:underline">Read the article</span>
          </div>
        </Link>
      )}

      {grid.length > 0 && (
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {grid.map((p) => (
            <li key={p.slug} className="min-w-0">
              <Link href={`/blog/${p.slug}`} className="group flex h-full flex-col rounded-card border border-line bg-white p-4 transition-colors hover:border-brand">
                <BlogCover cover={p.cover} sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw" />
                {p.tags[0] && <p className="mt-4 truncate text-xs font-extrabold uppercase tracking-wider text-brand-text">{p.tags[0]}</p>}
                <h2 title={p.title} className="mt-1 line-clamp-3 break-words font-display text-h3 font-bold text-ink">
                  {p.title}
                </h2>
                <div className="mt-auto pt-3">
                  <Meta entry={p} />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {pages > 1 && (
        <nav aria-label="Pages" className="mt-10 flex flex-wrap items-center justify-between gap-3">
          {page > 1 ? (
            <Link href={pageHref(sp.tag, page - 1)} className="btn-secondary inline-flex min-h-11 shrink-0 items-center rounded-full px-5 font-bold">
              Newer articles
            </Link>
          ) : (
            <span />
          )}
          <p className="text-sm font-semibold text-muted">
            Page {page} of {pages}
          </p>
          {page < pages ? (
            <Link href={pageHref(sp.tag, page + 1)} className="btn-secondary inline-flex min-h-11 shrink-0 items-center rounded-full px-5 font-bold">
              Older articles
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </Container>
  );
}
