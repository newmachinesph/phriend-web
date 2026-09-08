import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { breadcrumbJsonLd, pageMeta } from "@/lib/site";
import { POSTS } from "./_posts";

export const metadata: Metadata = pageMeta({
  title: "Blog: side-income guides for Filipino locals",
  description: "Guides for people who could earn on Phriend: photographers, tour guides, tutors, fitness buddies and more. What clients book, what to charge, how to stay safe.",
  path: "/blog",
});

const fmt = (iso: string) => new Date(`${iso}T00:00:00+08:00`).toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" });

export default function BlogIndex() {
  const [latest, ...rest] = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd("Blog", "/blog") }} />
      <p className="text-sm font-extrabold uppercase tracking-wider text-brand-text">Blog</p>
      <h1 className="mt-2 max-w-2xl font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">Guides for people who could be earning on Phriend.</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed">What clients book, what it pays, how a booking works, and how to stay safe while you do it.</p>

      {latest && (
        <Link href={`/blog/${latest.slug}`} className="group mt-12 grid gap-6 rounded-3xl border border-line bg-white p-4 shadow-card transition-colors hover:border-brand md:grid-cols-[1.3fr_1fr] md:p-6">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
            <Image src={latest.hero.src} alt={latest.hero.alt} fill sizes="(min-width: 768px) 640px, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" priority />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-sm font-extrabold uppercase tracking-wider text-brand-text">{latest.tags[0]} · {latest.category.label}</p>
            <h2 className="mt-2 font-display text-2xl font-semibold leading-tight text-ink sm:text-3xl">{latest.title}</h2>
            <p className="mt-3 leading-relaxed">{latest.description}</p>
            <p className="mt-4 text-sm font-semibold text-muted">
              {fmt(latest.date)} · {latest.readingMinutes} min read
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 font-bold text-brand-text">
              Read the article <ArrowRight size={18} aria-hidden="true" />
            </span>
          </div>
        </Link>
      )}

      {rest.length > 0 && (
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}`} className="group flex h-full flex-col rounded-3xl border border-line bg-white p-4 shadow-card transition-colors hover:border-brand">
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
                  <Image src={p.hero.src} alt={p.hero.alt} fill sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                </div>
                <p className="mt-4 text-xs font-extrabold uppercase tracking-wider text-brand-text">{p.category.label}</p>
                <h2 className="mt-1 font-display text-xl font-semibold leading-tight text-ink">{p.title}</h2>
                <p className="mt-auto pt-3 text-sm font-semibold text-muted">
                  {fmt(p.date)} · {p.readingMinutes} min read
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
