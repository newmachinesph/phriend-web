import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { activityPath, appCategoryUrl, getCategories } from "@/lib/landing";
import { findOccasion, OCCASION_IMAGE, OCCASIONS, occasionImage } from "@/lib/occasions";
import { APP_URL, pageMeta, PROVIDER_URL, SITE_URL } from "@/lib/site";
import { getFeatures } from "@/lib/features";
import { ButtonLink, Container } from "@/components/ui";

export const revalidate = 600;
export const dynamicParams = false; // only the occasions in lib/occasions.ts

export const generateStaticParams = () => OCCASIONS.map((o) => ({ occasion: o.slug }));

export async function generateMetadata({ params }: { params: Promise<{ occasion: string }> }): Promise<Metadata> {
  const o = findOccasion((await params).occasion);
  if (!o) return { title: "Not found", robots: { index: false } };
  const meta = pageMeta({ title: o.title, description: o.description, path: `/occasions/${o.slug}` });
  const shareImage = { url: occasionImage(o.slug), ...OCCASION_IMAGE, alt: `${o.name} in the Philippines` };
  return { ...meta, openGraph: { ...meta.openGraph, images: [shareImage] }, twitter: { card: "summary_large_image", images: [shareImage.url] } };
}

export default async function OccasionPage({ params }: { params: Promise<{ occasion: string }> }) {
  const o = findOccasion((await params).occasion);
  if (!o) notFound();
  const [categories, { teams: teamsOn }] = await Promise.all([getCategories(), getFeatures()]);
  const book = o.book.map((slug) => categories.find((c) => c.slug === slug)).filter((c) => c !== undefined); // a category Ops removed drops off
  const others = OCCASIONS.filter((x) => x.slug !== o.slug);
  const path = `/occasions/${o.slug}`;

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Occasions", item: `${SITE_URL}/occasions` },
          { "@type": "ListItem", position: 3, name: o.name, item: `${SITE_URL}${path}` },
        ],
      },
      { "@type": "ImageObject", contentUrl: occasionImage(o.slug), ...OCCASION_IMAGE, caption: `${o.name} in the Philippines` },
      { "@type": "FAQPage", mainEntity: o.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
      {
        "@type": "ItemList",
        name: `Services to book for a ${o.name.toLowerCase()}`,
        itemListElement: book.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, url: `${SITE_URL}${activityPath(c)}` })),
      },
    ],
  }).replace(/</g, "\\u003c"); // category labels come from the API

  return (
    <Container as="main" id="main" className="pb-14 pt-8 sm:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <nav aria-label="Breadcrumb" className="text-sm font-semibold text-muted">
        <Link href="/" className="hover:text-ink">
          Home
        </Link>
        {" › "}
        <Link href="/occasions" className="hover:text-ink">
          Occasions
        </Link>
        {" › "}
        <span className="text-ink">{o.name}</span>
      </nav>
      <h1 className="mt-4 max-w-3xl font-display text-h1 font-bold text-ink">{o.title}</h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed">{o.intro}</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <ButtonLink href="#who-to-book">Who to book</ButtonLink>
        {teamsOn && (
          <ButtonLink href="/teams" variant="secondary">
            Team packages
          </ButtonLink>
        )}
      </div>
      <div className="relative mt-10 aspect-[3/2] max-h-[480px] w-full overflow-hidden rounded-card bg-navy-soft sm:aspect-[21/9]">
        <Image src={occasionImage(o.slug)} alt={`${o.name} in the Philippines`} fill priority sizes="(min-width: 1280px) 1216px, 100vw" className="object-cover" />
      </div>

      <section id="who-to-book" aria-labelledby="book-title" className="mt-14">
        <h2 id="book-title" className="font-display text-h2 font-bold text-ink">
          Who to book for a {o.name.toLowerCase()}
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {book.map((c) => (
            <li key={c.slug} className="flex flex-col rounded-card border border-line bg-white p-6">
              <h3 className="font-display text-h3 font-bold text-ink">
                <Link href={activityPath(c)} className="hover:text-brand-text">
                  {c.label}
                </Link>
              </h3>
              {c.activities.length > 0 && <p className="mt-2 flex-1 text-base leading-relaxed">{c.activities.slice(0, 5).join(", ")}</p>}
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm font-bold">
                <a href={appCategoryUrl(c)} className="text-brand-text hover:underline">
                  See the services
                </a>
                <Link href={activityPath(c)} className="text-muted hover:text-ink">
                  About {c.label.toLowerCase()}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="tips-title" className="mt-14 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 id="tips-title" className="font-display text-h2 font-bold text-ink">
            Before you book
          </h2>
          <ul className="mt-5 space-y-3">
            {o.tips.map((t) => (
              <li key={t} className="flex gap-3 text-base leading-relaxed">
                <Check size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-brand" />
                {t}
              </li>
            ))}
            <li className="flex gap-3 text-base leading-relaxed">
              <Check size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-brand" />
              Pay the provider directly, as you agree with them in the chat. Phriend never holds the money.
            </li>
          </ul>
        </div>
        <div>
          <h2 className="font-display text-h2 font-bold text-ink">Questions</h2>
          <dl className="mt-5 space-y-5">
            {o.faq.map((f) => (
              <div key={f.q}>
                <dt className="font-bold text-ink">{f.q}</dt>
                <dd className="mt-1 leading-relaxed">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="more-title" className="mt-14">
        <h2 id="more-title" className="font-display text-h2 font-bold text-ink">
          Other occasions
        </h2>
        <ul className="mt-5 flex flex-wrap gap-2">
          {others.map((x) => (
            <li key={x.slug}>
              <Link href={`/occasions/${x.slug}`} className="inline-block rounded-full border-2 border-line px-4 py-1.5 text-sm font-bold text-ink hover:border-brand">
                {x.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14 rounded-card bg-brand-soft p-6 sm:p-10">
        <h2 className="font-display text-h2 font-bold text-ink">Do this for a living?</h2>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed">
          Hosts, makeup artists, photographers and coordinators can list their services on Phriend for free and get booked for occasions like this one.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <ButtonLink href={PROVIDER_URL}>List your services</ButtonLink>
          <ButtonLink href={APP_URL} variant="secondary">
            Open the app
          </ButtonLink>
        </div>
      </section>
    </Container>
  );
}
