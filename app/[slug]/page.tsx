import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Landing } from "@/components/landing";
import { ServiceTile } from "@/components/services";
import { activitySlug, appServiceUrl, CITY_PAGES, comboPath, findCategory, findCity, getCategories, getServices, type CityPage } from "@/lib/landing";
import { APP_URL, NOINDEX_FOLLOW, pageMeta, PROVIDER_URL, SITE_NAME, SITE_URL } from "@/lib/site";
import { ButtonLink, Container } from "@/components/ui";

/**
 * Two kinds of page share this segment: a city ("/manila") and a service in a city ("/photographer-in-manila").
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
  if (r.category) {
    // the same (cached) request the page renders from: no services listed means noindex, and the sitemap leaves it out
    const services = await getServices({ category: r.category.slug, city: r.city.name });
    return {
      ...pageMeta({
        title: `${r.category.label} services in ${r.city.name}`.slice(0, 60),
        description: `Book ${r.category.label.toLowerCase()} in ${r.city.name} from verified providers. Each service shows its price, photos and area. Book and chat in the app.`.slice(0, 150),
        path: comboPath(r.category, r.city),
      }),
      ...(services.length ? {} : { robots: NOINDEX_FOLLOW }),
    };
  }
  return pageMeta({
    title: `Local services in ${r.city.name}`.slice(0, 60),
    description: `Aircon cleaning, repairs, tutoring, bookkeeping, photo and video, driving and errands in ${r.city.name}, from verified providers. Book in the app.`.slice(0, 150),
    path: `/${r.city.slug}`,
  });
}

export default async function SlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const r = await parse((await params).slug);
  if (!r) notFound();
  const categories = await getCategories();
  if (r.category) {
    const services = await getServices({ category: r.category.slug, city: r.city.name });
    return <Landing category={r.category} city={r.city} services={services} path={comboPath(r.category, r.city)} others={categories} />;
  }
  return <CityLanding city={r.city} categories={categories} />;
}

/** The city page: every kind of service you can book there, and the services on offer right now. */
async function CityLanding({ city, categories }: { city: CityPage; categories: Awaited<ReturnType<typeof getCategories>> }) {
  const services = await getServices({ city: city.name });
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
        name: `Local services in ${city.name}`,
        serviceType: "Local services",
        provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        areaServed: { "@type": "City", name: city.name, containedInPlace: { "@type": "Country", name: "Philippines" } },
        url: `${SITE_URL}${path}`,
      },
      { "@type": "ItemList", name: `Services in ${city.name}`, itemListElement: services.map((s, i) => ({ "@type": "ListItem", position: i + 1, url: appServiceUrl(s), name: s.title })) },
    ],
  }).replace(/</g, "\\u003c"); // titles come from the API
  const acts = categories.slice(0, 6).map((c) => c.label.toLowerCase());
  return (
    <Container as="main" id="main" className="pb-14 pt-8 sm:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <nav aria-label="Breadcrumb" className="text-sm font-semibold text-muted">
        <Link href="/" className="hover:text-ink">
          Home
        </Link>
        {" › "}
        <span className="text-ink">{city.name}</span>
      </nav>
      <h1 className="mt-4 max-w-3xl font-display text-h1 font-bold text-ink">Local services in {city.name}</h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed">
        {city.name} is {city.blurb}. On Phriend you book services there from verified providers, for {acts.slice(0, -1).join(", ")} and {acts[acts.length - 1]}, and dozens of
        other kinds of work, plus online services that cover the whole country.
      </p>
      <p className="mt-3 max-w-3xl leading-relaxed">
        Every provider is verified by our team with a government ID and a selfie, and a person approves each listing before it goes live. Each service shows its
        price, photos of the work and the area it covers. You book and chat in the app, use one of your saved addresses for an at-home service, and pay the
        provider directly, as you agree with them.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <ButtonLink href={`${APP_URL}/?city=${encodeURIComponent(city.name)}`}>Browse services in {city.name}</ButtonLink>
        <ButtonLink href={PROVIDER_URL} variant="secondary">
          Offer a service in {city.name}
        </ButtonLink>
      </div>

      <section aria-labelledby="acts" className="mt-14">
        <h2 id="acts" className="font-display text-h2 font-bold text-ink">
          What you can book in {city.name}
        </h2>
        <ul className="mt-6 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <li key={c.slug} className="border-t border-line">
              <Link href={comboPath(c, city)} className="group block py-3">
                <p className="font-bold text-ink group-hover:text-brand-text">
                  {c.label} in {city.name}
                </p>
                <p className="mt-0.5 text-sm text-muted">{c.activities.slice(0, 4).join(", ") || "Local services"}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="who" className="mt-14">
        <h2 id="who" className="font-display text-h2 font-bold text-ink">
          Services in {city.name} right now
        </h2>
        {services.length === 0 ? (
          <p className="mt-3 max-w-2xl leading-relaxed">
            No services in {city.name} yet. See{" "}
            <a href="#other-cities" className="font-bold text-brand-text underline">
              other cities
            </a>{" "}
            or{" "}
            <Link href="/services" className="font-bold text-brand-text underline">
              all services
            </Link>
            .
          </p>
        ) : (
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <li key={s.id}>
                <ServiceTile item={s} icon={categories.find((c) => c.slug === s.category)?.iconNode} />
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="other-cities" className="mt-14">
        <h2 id="other-cities" className="font-display text-h2 font-bold text-ink">
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
            <Link href={`/services/${activitySlug(categories[0]?.label ?? "eat and travel")}`} className="inline-block rounded-full bg-surface px-4 py-1.5 text-sm font-bold text-ink hover:bg-brand-soft">
              All services
            </Link>
          </li>
        </ul>
      </section>
    </Container>
  );
}
