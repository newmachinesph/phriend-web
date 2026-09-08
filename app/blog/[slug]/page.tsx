import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArticleCta, BackToBlog } from "@/components/blog";
import { pageMeta, SITE_NAME, SITE_URL } from "@/lib/site";
import { findPost, POSTS } from "../_posts";

export const generateStaticParams = () => POSTS.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = findPost((await params).slug);
  if (!post) return { title: "Article not found", robots: { index: false } };
  const base = pageMeta({ title: post.seoTitle, description: post.seoDescription, path: `/blog/${post.slug}` });
  const og = { url: `/blog/${post.slug}/opengraph-image`, width: 1200, height: 630, alt: post.ogTitle ?? post.seoTitle };
  return {
    ...base,
    openGraph: { ...base.openGraph, type: "article", publishedTime: `${post.date}T09:00:00+08:00`, authors: [SITE_NAME], tags: post.tags, images: [og] },
    twitter: { card: "summary_large_image", title: post.seoTitle, description: post.seoDescription, images: [og.url] },
  };
}

const fmt = (iso: string) => new Date(`${iso}T00:00:00+08:00`).toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" });

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const post = findPost((await params).slug);
  if (!post) notFound();
  const url = `${SITE_URL}/blog/${post.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: post.title,
        description: post.description,
        image: `${SITE_URL}${post.hero.src}`,
        datePublished: `${post.date}T09:00:00+08:00`,
        dateModified: `${post.date}T09:00:00+08:00`,
        author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        publisher: { "@type": "Organization", name: SITE_NAME, logo: { "@type": "ImageObject", url: `${SITE_URL}/brand/logo-mark.png` } },
        mainEntityOfPage: url,
        keywords: post.tags.join(", "),
      },
      {
        "@type": "FAQPage",
        mainEntity: post.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };

  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BackToBlog />
      <header className="mt-6">
        <p className="text-sm font-extrabold uppercase tracking-wider text-brand-text">
          {post.tags[0]} · {post.category.label}
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold leading-[1.1] text-ink sm:text-5xl">{post.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-body">{post.description}</p>
        <p className="mt-4 text-sm font-semibold text-muted">
          By the Phriend team · {fmt(post.date)} · {post.readingMinutes} min read
        </p>
      </header>
      <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-3xl shadow-card">
        <Image src={post.hero.src} alt={post.hero.alt} width={1600} height={900} sizes="(min-width: 768px) 768px, 100vw" className="h-full w-full object-cover" priority />
      </div>

      <article className="article mt-10">
        <post.Body />
        <h2>Questions photographers ask</h2>
        <dl>
          {post.faq.map((f) => (
            <div key={f.q}>
              <dt>{f.q}</dt>
              <dd>{f.a}</dd>
            </div>
          ))}
        </dl>
      </article>

      <ArticleCta category={post.category} />
    </main>
  );
}
