import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Landing } from "@/components/landing";
import { activitySlug, appProfileUrl, CITY_PAGES, comboPath, findCategory, findCity, getCategories, getPhriends, type CityPage } from "@/lib/landing";
import { APP_URL, pageMeta, POST_URL, SITE_NAME, SITE_URL } from "@/lib/site";

/**
 * Two kinds of page share this segment: a city ("/manila") and an activity in a city ("/photographer-in-manila").
 * Anything else is a 404, so the static routes (blog, safety, terms…) keep their own folders.
 */
export const revalidate = 600;
export const dynamicParams = true;

const parse = async (slug: string) => {
  const city = findCity(slug);
  if (city) return { city, category: undefined };
  const m = /^(.+)-in-([a-z-]+)$/.exec(slug);
  const inCity = m && findCity(m[2]);
  if (!m || !inCity) return null;
  const category = await findCategory(m[1]);
  return category ? { city: inCity, category } : null;
};

export async function generateStaticParams() {
  const categories = await getCategories();
  const featured = categories.slice(0, 16);
  return [...CITY_PAGES.map((c) => ({ slug: c.slug })), ...CITY_PAGES.flatMap((city) => featured.map((c) => ({ slug: comboPath(c, city).slice(1) })))];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const r = await parse((await params).slug);
  if (!r) return { title: "Not found", robots: { index: false } };
  if (r.category)
    return pageMeta({
      title: `${r.category.label} buddies in ${r.city.name}: book a companion`.slice(0, 60),
      description: `Hire a verified local in ${r.city.name} for ${r.category.label.toLowerCase()} by the hour. ID-checked Phriends, public meetups, cash on arrival.`.slice(0, 150),
      path: comboPath(r.category, r.city),
    });
  return pageMeta({
    title: `Book a companion in ${r.city.name}: verified locals by the hour`.slice(0, 60),
    description: `Food trips, tours, study buddies, errands and more in ${r.city.name}. Every Phriend is ID-verified; meet in public, pay in cash when you meet.`.slice(0, 150),
    path: `/${r.city.slug}`,
  });
}

export default async function SlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const r = await parse((await params).slug);
  if (!r) notFound();
  const categories = await getCategories();
  if (r.category) {
    const phriends = await getPhriends({ category: r.category.slug, city: r.city.name });
    return <Landing category={r.category} city={r.city} phriends={phriends} path={comboPath(r.category, r.city)} others={categories} />;
  }
  return <CityLanding city={r.city} categories={categories} />;
}

/** The city page: who is around, and every activity you can hire someone for there. */
async function CityLanding({ city, categories }: { city: CityPage; categories: Awaited<ReturnType<typeof getCategories>> }) {
  const phriends = await getPhriends({ city: city.name });
  const path = `/${city.slug}`;
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: city.name, item: `${SITE_URL}${path}` },
        ],
      },
      {
        "@type": "Service",
        name: `Book a companion in ${city.name}`,
        serviceType: "Paid platonic company by the hour",
        provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        areaServed: { "@type": "City", name: city.name, containedInPlace: { "@type": "Country", name: "Philippines" } },
        url: `${SITE_URL}${path}`,
      },
      { "@type": "ItemList", name: `Phriends in ${city.name}`, itemListElement: phriends.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: appProfileUrl(p), name: p.workName, image: p.imagePath[0] })) },
    ],
  });
  const acts = categories.slice(0, 6).map((c) => c.label.toLowerCase());
  return (
    <main id="main" className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <nav aria-label="Breadcrumb" className="text-sm font-semibold text-muted">
        <Link href="/" className="hover:text-ink">
          Home
        </Link>
        {" › "}
        <span className="text-ink">{city.name}</span>
      </nav>
      <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">Book a companion in {city.name}</h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed">
        {city.name} is {city.blurb}. On Phriend you hire a verified local there by the hour for {acts.slice(0, -1).join(", ")} and {acts[acts.length - 1]}, and dozens of other activities. Every Phriend confirmed their identity and age
        with a government ID, and a person approved their profile before it went live. You agree on the plan in the chat, meet in a public place, and pay half in cash when you meet and half after. Platonic company and legit side gigs only.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href={`${APP_URL}/?city=${encodeURIComponent(city.name)}`} className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 font-bold text-white shadow-card hover:bg-brand-deep">
          Browse everyone in {city.name} <ArrowRight size={18} aria-hidden="true" />
        </a>
        <a href={POST_URL} className="inline-flex items-center gap-2 rounded-full border-2 border-line px-5 py-3 font-bold text-ink hover:border-brand">
          Become a Phriend in {city.name}
        </a>
      </div>

      <section aria-labelledby="acts" className="mt-14">
        <h2 id="acts" className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          What you can hire a Phriend for in {city.name}
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link href={comboPath(c, city)} className="block rounded-2xl border border-line bg-white p-4 shadow-card transition-colors hover:border-brand">
                <p className="font-display text-lg font-semibold text-ink">
                  {c.label} in {city.name}
                </p>
                <p className="mt-1 text-sm text-muted">{c.activities.slice(0, 4).join(" · ") || "Company by the hour"}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="who" className="mt-14">
        <h2 id="who" className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          Phriends in {city.name} right now
        </h2>
        {phriends.length === 0 ? (
          <p className="mt-3 max-w-2xl leading-relaxed">
            No Phriend in {city.name} yet. Be the first:{" "}
            <a href={POST_URL} className="font-bold text-brand-text underline">
              create your profile
            </a>
            .
          </p>
        ) : (
          <ul className="mt-6 flex flex-wrap gap-2">
            {phriends.map((p) => (
              <li key={p.id}>
                <a href={appProfileUrl(p)} className="inline-flex items-center gap-2 rounded-full border-2 border-line px-3 py-1.5 text-sm font-bold text-ink hover:border-brand">
                  {p.workName} · ₱{p.pricePerHour.toLocaleString("en-PH")}/hr
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="other-cities" className="mt-14">
        <h2 id="other-cities" className="font-display text-2xl font-semibold text-ink">
          Other cities
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {CITY_PAGES.filter((c) => c.slug !== city.slug).map((c) => (
            <li key={c.slug}>
              <Link href={`/${c.slug}`} className="inline-block rounded-full bg-surface px-4 py-1.5 text-sm font-bold text-ink hover:bg-brand-soft">
                {c.name}
              </Link>
            </li>
          ))}
          <li>
            <Link href={`/rent-a-friend/${activitySlug(categories[0]?.label ?? "eat and travel")}`} className="inline-block rounded-full bg-surface px-4 py-1.5 text-sm font-bold text-ink hover:bg-brand-soft">
              All activities
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
