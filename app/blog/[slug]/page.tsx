import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCta, BackToBlog, BlogCover, BookCta, TagLinks } from "@/components/blog";
import { ShareBar } from "@/components/share-bar";
import { formatBlogDate, getArticle, getBlogEntries, type ArticleView } from "@/lib/blog";
import { ArticleBody } from "@/lib/markdown";
import { cdn, pageMeta, SITE_NAME, SITE_URL } from "@/lib/site";

// SPEC 13e §2.2: the coded articles and the published Ops articles (GET /v1/content/blog/{slug}), ISR 60 s. A slug
// published after the build renders on its first request; a draft, unpublished, off-product or unsafe one is a 404.
export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getBlogEntries()).map((e) => ({ slug: e.slug }));
}

const DESCRIPTION_FALLBACK = "A guide from Phriend, the app for booking local services in the Philippines.";

function seo(view: ArticleView) {
  if (view.kind === "coded") return { title: view.post.seoTitle, description: view.post.seoDescription, ogTitle: view.post.ogTitle ?? view.post.seoTitle };
  const title = view.seoTitle ?? view.entry.title;
  return { title, description: view.entry.description ?? DESCRIPTION_FALLBACK, ogTitle: title };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const view = await getArticle((await params).slug);
  if (!view) return { title: "Article not found", robots: { index: false } };
  const { entry } = view;
  const s = seo(view);
  const base = pageMeta({ title: s.title, description: s.description, path: `/blog/${entry.slug}` });
  const og = { url: `/blog/${entry.slug}/opengraph-image`, width: 1200, height: 630, alt: s.ogTitle };
  return {
    ...base,
    openGraph: { ...base.openGraph, type: "article", publishedTime: entry.publishedAt, modifiedTime: entry.updatedAt, authors: [SITE_NAME], tags: entry.tags, images: [og] },
    twitter: { card: "summary_large_image", title: s.title, description: s.description, images: [og.url] },
  };
}

function jsonLd(view: ArticleView, url: string) {
  const { entry } = view;
  const image = entry.cover ? (entry.cover.src.startsWith("/") ? `${SITE_URL}${entry.cover.src}` : entry.cover.src) : `${url}/opengraph-image`;
  const graph: object[] = [
    {
      "@type": "Article",
      headline: entry.title,
      description: entry.description ?? undefined,
      image,
      datePublished: entry.publishedAt,
      dateModified: entry.updatedAt,
      author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      publisher: { "@type": "Organization", name: SITE_NAME, logo: { "@type": "ImageObject", url: cdn("/brand/logo-mark.png") } },
      mainEntityOfPage: url,
      keywords: entry.tags.join(", "),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: entry.title, item: url },
      ],
    },
  ];
  if (view.kind === "coded") {
    graph.push({ "@type": "FAQPage", mainEntity: view.post.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) });
  }
  // `<` escaped so no text in the article can close the script element
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const view = await getArticle((await params).slug);
  if (!view) notFound();
  const { entry } = view;
  const url = `${SITE_URL}/blog/${entry.slug}`;
  const kicker = view.kind === "coded" ? `${entry.tags[0]} · ${view.post.category.label}` : entry.tags[0];

  return (
    <main id="main" className="mx-auto w-full max-w-3xl px-5 pb-12 pt-8 sm:px-8 sm:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(view, url) }} />
      <BackToBlog />
      <header className="mt-6">
        {kicker && <p className="truncate text-sm font-extrabold uppercase tracking-wider text-brand-text">{kicker}</p>}
        <h1 className="mt-2 break-words font-display text-h1 font-bold text-ink">{entry.title}</h1>
        {entry.description && <p className="mt-4 break-words text-lg leading-relaxed text-body">{entry.description}</p>}
        <p className="mt-4 text-sm font-semibold text-muted">
          By Phriend · <time dateTime={entry.publishedAt}>{formatBlogDate(entry.publishedAt)}</time>
          {entry.readingMinutes ? ` · ${entry.readingMinutes} min read` : ""}
        </p>
        <div className="mt-5">
          <ShareBar url={url} title={entry.title} />
        </div>
      </header>
      <BlogCover cover={entry.cover} sizes="(min-width: 768px) 768px, 100vw" priority className="mt-8 rounded-3xl shadow-card" />

      <article className="article mt-10 break-words">
        {view.kind === "coded" ? (
          <>
            <view.post.Body />
            <h2>{view.post.faqTitle}</h2>
            <dl>
              {view.post.faq.map((f) => (
                <div key={f.q}>
                  <dt>{f.q}</dt>
                  <dd>{f.a}</dd>
                </div>
              ))}
            </dl>
          </>
        ) : (
          <ArticleBody markdown={view.body} />
        )}
      </article>

      {view.kind === "api" && entry.tags.length > 0 && (
        <div className="mt-8">
          <TagLinks tags={entry.tags} />
        </div>
      )}
      <div className="mt-10 border-t border-line pt-6">
        <ShareBar url={url} title={entry.title} />
      </div>
      {view.kind === "coded" ? <ArticleCta audience={view.post.audience} category={view.post.category} headline={view.post.ctaHeadline} /> : <BookCta />}
    </main>
  );
}
