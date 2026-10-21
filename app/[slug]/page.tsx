import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Landing } from "@/components/landing";
import { ServiceGrid } from "@/components/services";
import { findCategory, getCatalog, getCityIds, getServices, groupOf, type Catalog, type Services } from "@/lib/catalogue";
import { CITY_PAGES, findCity, parseCombo, type CityPage } from "@/lib/cities";
import { escapeJsonLd, itemListJsonLd } from "@/lib/landing";
import { appCityUrl, cityPath, comboPath } from "@/lib/links";
import { APP_URL, NOINDEX_FOLLOW, pageMeta, PROVIDER_URL, SITE_NAME, SITE_URL } from "@/lib/site";
import { ButtonLink, Container } from "@/components/ui";

/**
 * Two kinds of page share this segment: a city ("/manila") and a category in a city ("/photographer-in-manila").
 * Anything else is a 404, so the static routes (blog, safety, terms…) keep their own folders.
 */
export const revalidate = 600;
export const dynamicParams = true;

type Params = { params: Promise<{ slug: string }> };

async function load(slug: string) {
  const catalog = await getCatalog();
  const city = findCity(slug);
  if (city) return { catalog, city, category: undefined, services: await getServices({ city }) };
  const combo = parseCombo(slug);
  if (!combo) return null;
  // api2 not answering: fail the render instead of a 404, so ISR keeps serving the last good page (a 404 would replace it)
  if (!catalog.ok) throw new Error("The catalogue is unavailable: api2 did not answer.");
  const category = findCategory(catalog, combo.categorySlug);
  if (!category) return null;
  return { catalog, city: combo.city, category, services: await getServices({ category: [category.slug], city: combo.city }) };
}

export async function generateStaticParams() {
  const { categories } = await getCatalog();
  // the cities and the first categories in each; the rest render on first request (dynamicParams)
  const featured = categories.slice(0, 16);
  return [...CITY_PAGES.map((c) => ({ slug: c.slug })), ...CITY_PAGES.flatMap((city) => featured.map((c) => ({ slug: comboPath(c, city).slice(1) })))];
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const r = await load((await params).slug);
  if (!r) return { title: "Not found", robots: { index: false } };
  const robots = r.services.items.length ? {} : { robots: NOINDEX_FOLLOW };
  if (r.category) {
    return {
      ...pageMeta({
        title: `${r.category.label} services in ${r.city.name}`.slice(0, 60),
        description: `Book ${r.category.label.toLowerCase()} in ${r.city.name} from verified providers. Each service shows its price, photos and area. Book and chat in the app.`.slice(0, 155),
        path: comboPath(r.category, r.city),
      }),
      ...robots,
    };
  }
  return pageMeta({
    title: `Local services in ${r.city.name}`.slice(0, 60),
    description: `Aircon cleaning, repairs, tutoring, bookkeeping, photo and video, driving and errands in ${r.city.name}, from verified providers. Book in the app.`.slice(0, 155),
    path: cityPath(r.city),
  });
}

export default async function SlugPage({ params }: Params) {
  const r = await load((await params).slug);
  if (!r) notFound();
  if (r.category) return <Landing category={r.category} group={groupOf(r.catalog, r.category)} city={r.city} services={r.services} path={comboPath(r.category, r.city)} others={r.catalog.categories} />;
  return <CityLanding city={r.city} catalog={r.catalog} services={r.services} />;
}

/** The city page: every kind of service you can book there, and the services on offer right now. */
async function CityLanding({ city, catalog, services }: { city: CityPage; catalog: Catalog; services: Services }) {
  const cityId = (await getCityIds()).get(city.slug);
  const path = cityPath(city);
  const { categories } = catalog;
  const iconOf = new Map(categories.map((c) => [c.id, c.icon]));
  const jsonLd = escapeJsonLd(
    JSON.stringify({
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
        itemListJsonLd(`Services in ${city.name}`, services.items),
      ],
    }),
  );
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
        {city.name} is {city.blurb}. On Phriend you book services there from verified providers, from aircon cleaning and repairs to tutoring, bookkeeping, photo
        and video, plus online services that cover the whole country.
      </p>
      <p className="mt-3 max-w-3xl leading-relaxed">
        Every provider is verified with a government ID and a selfie, and each listing is reviewed before it goes live. Each service shows its price, photos of the
        work and the area it covers. You book and chat in the app, use one of your saved addresses for an at-home service, and pay the provider directly, as you
        agree with them.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <ButtonLink href={cityId !== undefined ? appCityUrl(cityId) : APP_URL}>Browse services in {city.name}</ButtonLink>
        <ButtonLink href={PROVIDER_URL} variant="secondary">
          Offer a service in {city.name}
        </ButtonLink>
      </div>

      <section aria-labelledby="who" className="mt-14">
        <h2 id="who" className="font-display text-h2 font-bold text-ink">
          Services in {city.name} right now
        </h2>
        <ServiceGrid
          services={services.items}
          ok={services.ok}
          iconFor={(s) => iconOf.get(s.categoryId)}
          empty={
            <p>
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
          }
        />
      </section>

      {categories.length > 0 && (
        <section aria-labelledby="acts" className="mt-14">
          <h2 id="acts" className="font-display text-h2 font-bold text-ink">
            What you can book in {city.name}
          </h2>
          <ul className="mt-6 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <li key={c.slug} className="min-w-0 border-t border-line">
                <Link href={comboPath(c, city)} className="group block py-3">
                  <p className="font-bold text-ink wrap-anywhere group-hover:text-brand-text">
                    {c.label} in {city.name}
                  </p>
                  <p className="mt-0.5 text-sm text-muted">{groupOf(catalog, c)?.label ?? "Local services"}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="other-cities" className="mt-14">
        <h2 id="other-cities" className="font-display text-h2 font-bold text-ink">
          Other cities
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {CITY_PAGES.filter((c) => c.slug !== city.slug).map((c) => (
            <li key={c.slug}>
              <Link href={cityPath(c)} className="inline-block rounded-full bg-surface px-4 py-1.5 text-sm font-bold text-ink hover:bg-brand-soft">
                {c.name}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/services" className="inline-block rounded-full bg-surface px-4 py-1.5 text-sm font-bold text-ink hover:bg-brand-soft">
              All services
            </Link>
          </li>
        </ul>
      </section>
    </Container>
  );
}
