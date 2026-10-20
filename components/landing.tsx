import Link from "next/link";
import { activityPath, CITY_PAGES, comboPath, LANDING_CTA, landingJsonLd, type Category, type CityPage, type ServiceItem, landingCopy } from "@/lib/landing";
import { PROVIDER_URL } from "@/lib/site";
import { OCCASIONS } from "@/lib/occasions";
import { ServiceTile } from "@/components/services";
import { ButtonLink, Container } from "@/components/ui";

/** One service (or service-in-city) landing page: several hundred words of real copy, the live services, and the schema. */
export function Landing({ category, city, services, path, others }: { category: Category; city?: CityPage; services: ServiceItem[]; path: string; others: Category[] }) {
  const copy = landingCopy(category, city, services);
  return (
    <Container as="main" id="main" className="py-14 sm:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: landingJsonLd(category, path, services, copy, city) }} />
      <nav aria-label="Breadcrumb" className="text-sm font-semibold text-muted">
        <Link href="/" className="hover:text-ink">
          Home
        </Link>
        {city && (
          <>
            {" › "}
            <Link href={`/${city.slug}`} className="hover:text-ink">
              {city.name}
            </Link>
          </>
        )}
        {" › "}
        <span className="text-ink">{category.label}</span>
      </nav>
      <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">{copy.h1}</h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed">{copy.intro}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <ButtonLink href={LANDING_CTA.browse(category)}>Browse all {category.label} services</ButtonLink>
        <ButtonLink href={PROVIDER_URL} variant="secondary">
          Offer {category.label} on Phriend
        </ButtonLink>
      </div>

      <section aria-labelledby="services" className="mt-14">
        <h2 id="services" className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          {category.label} services{city ? ` in ${city.name}` : ""} right now
        </h2>
        {services.length === 0 ? (
          <p className="mt-3 max-w-2xl leading-relaxed">
            No {category.label.toLowerCase()} service {city ? `in ${city.name} ` : ""}yet. Offer one:{" "}
            <a href={PROVIDER_URL} className="font-bold text-brand-text underline">
              list your services
            </a>{" "}
            and clients in {city ? city.name : "your city"} will find them here.
          </p>
        ) : (
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <li key={s.id}>
                <ServiceTile item={s} icon={category.iconNode} />
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="article mt-14 max-w-3xl">
        <h2>What {category.label.toLowerCase()} covers</h2>
        <p>{copy.what}</p>
        <h2>How a booking works</h2>
        <ol>
          {copy.how.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <h2>What it costs</h2>
        <p>{copy.rates}</p>
        <h2>Trust and safety</h2>
        <p>{copy.safety}</p>
        <h2>Questions people ask</h2>
        <dl>
          {copy.faq.map((f) => (
            <div key={f.q}>
              <dt>{f.q}</dt>
              <dd>{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="cities" className="mt-14">
        <h2 id="cities" className="font-display text-2xl font-semibold text-ink">
          {category.label} by city
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {CITY_PAGES.filter((c) => c.slug !== city?.slug).map((c) => (
            <li key={c.slug}>
              <Link href={comboPath(category, c)} className="inline-block rounded-full border-2 border-line px-4 py-1.5 text-sm font-bold text-ink hover:border-brand">
                {category.label} in {c.name}
              </Link>
            </li>
          ))}
          {city && (
            <li>
              <Link href={activityPath(category)} className="inline-block rounded-full border-2 border-line px-4 py-1.5 text-sm font-bold text-ink hover:border-brand">
                All of the Philippines
              </Link>
            </li>
          )}
        </ul>
      </section>

      {OCCASIONS.some((o) => o.book.includes(category.slug)) && (
        <section aria-labelledby="occasions" className="mt-14">
          <h2 id="occasions" className="font-display text-2xl font-semibold text-ink">
            Often booked for
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {OCCASIONS.filter((o) => o.book.includes(category.slug)).map((o) => (
              <li key={o.slug}>
                <Link href={`/occasions/${o.slug}`} className="inline-block rounded-full border-2 border-line px-4 py-1.5 text-sm font-bold text-ink hover:border-brand">
                  {o.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="more" className="mt-14">
        <h2 id="more" className="font-display text-2xl font-semibold text-ink">
          Other services{city ? ` in ${city.name}` : ""}
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {others
            .filter((c) => c.slug !== category.slug)
            .map((c) => (
              <li key={c.slug}>
                <Link href={city ? comboPath(c, city) : activityPath(c)} className="inline-block rounded-full bg-surface px-4 py-1.5 text-sm font-bold text-ink hover:bg-brand-soft">
                  {c.label}
                </Link>
              </li>
            ))}
        </ul>
      </section>
    </Container>
  );
}
