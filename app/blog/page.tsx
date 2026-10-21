import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { breadcrumbJsonLd, pageMeta } from "@/lib/site";
import { POSTS } from "./_posts";
import { Container } from "@/components/ui";

// Ops articles (GET /v1/content/blog, SPEC 13e §2.2) arrive with W3; until then the blog lists the coded articles.
export const revalidate = 60;

export const metadata: Metadata = pageMeta({
  title: "Blog: guides for Filipino service providers",
  description: "Guides for people who could offer their services on Phriend: photographers, tutors, bookkeepers, technicians and more. What clients book and what to charge.",
  path: "/blog",
});

const fmt = (iso: string) => new Date(`${iso}T00:00:00+08:00`).toLocaleDateString("en-PH", { timeZone: "Asia/Manila", year: "numeric", month: "long", day: "numeric" });

export default function BlogIndex() {
  const [latest, ...rest] = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <Container as="main" id="main" className="pb-14 pt-8 sm:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd("Blog", "/blog") }} />
      <p className="text-sm font-extrabold uppercase tracking-wider text-brand-text">Blog</p>
      <h1 className="mt-2 max-w-2xl font-display text-h1 font-bold text-ink">Guides for people who could be earning on Phriend.</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed">What clients book, what it pays, how a booking works, and how to get booked more often.</p>

      {!latest ? (
        <p className="mt-12 max-w-2xl rounded-card border border-line bg-surface p-6 leading-relaxed">No articles yet. New guides are on the way.</p>
      ) : (
        <Link href={`/blog/${latest.slug}`} className="group mt-12 grid gap-6 rounded-card border border-line bg-white p-4 transition-colors hover:border-brand md:grid-cols-[1.3fr_1fr] md:p-6">
          <div className="relative aspect-[16/9] overflow-hidden rounded-card bg-navy-soft">
            <Image src={latest.hero.src} alt={latest.hero.alt} width={1600} height={900} sizes="(min-width: 768px) 640px, 100vw" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" priority />
          </div>
          <div className="flex min-w-0 flex-col justify-center">
            <p className="text-sm font-extrabold uppercase tracking-wider text-brand-text">
              {latest.tags[0]} · {latest.category.label}
            </p>
            <h2 className="mt-2 font-display text-h2 font-bold text-ink">{latest.title}</h2>
            <p className="mt-3 leading-relaxed">{latest.description}</p>
            <p className="mt-4 text-sm font-semibold text-muted">
              {fmt(latest.date)} · {latest.readingMinutes} min read
            </p>
            <span className="mt-4 font-bold text-brand-text group-hover:underline">Read the article</span>
          </div>
        </Link>
      )}

      {rest.length > 0 && (
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <li key={p.slug} className="min-w-0">
              <Link href={`/blog/${p.slug}`} className="group flex h-full flex-col rounded-card border border-line bg-white p-4 transition-colors hover:border-brand">
                <div className="relative aspect-[16/9] overflow-hidden rounded-card bg-navy-soft">
                  <Image src={p.hero.src} alt={p.hero.alt} width={1600} height={900} sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw" className="h-full w-full object-cover" />
                </div>
                <p className="mt-4 truncate text-xs font-extrabold uppercase tracking-wider text-brand-text">{p.category.label}</p>
                <h2 title={p.title} className="mt-1 line-clamp-3 font-display text-h3 font-bold text-ink">
                  {p.title}
                </h2>
                <p className="mt-auto pt-3 text-sm font-semibold text-muted">
                  {fmt(p.date)} · {p.readingMinutes} min read
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
