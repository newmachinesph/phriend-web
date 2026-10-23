import Link from "next/link";
import { guidesFor } from "@/app/blog/_posts";
import type { Category } from "@/lib/phriend2";
import type { Group, Services } from "@/lib/catalogue";
import { CITY_PAGES, type CityPage } from "@/lib/cities";
import { inSentence, landingCopy, landingJsonLd } from "@/lib/landing";
import { appCategoryUrl, categoryPath, cityPath, comboPath } from "@/lib/links";
import { OCCASIONS } from "@/lib/occasions";
import { PROVIDER_URL } from "@/lib/site";
import { ServiceGrid } from "@/components/services";
import { ButtonLink, Container } from "@/components/ui";

const pill = "inline-block rounded-full border-2 border-line px-4 py-1.5 text-sm font-bold text-ink hover:border-brand";
const softPill = "inline-block rounded-full bg-surface px-4 py-1.5 text-sm font-bold text-ink hover:bg-brand-soft";
const link = "font-bold text-brand-text underline";

/** One category (or category-in-city) landing page: several hundred words of real copy, the live services, and the schema. */
export function Landing({ category, group, city, services, path, others }: { category: Category; group: Group | undefined; city?: CityPage; services: Services; path: string; others: Category[] }) {
  const copy = landingCopy(category, city, services.items);
  const occasions = OCCASIONS.filter((o) => o.book.includes(category.slug));
  const guides = guidesFor(category.slug, group?.slug);
  return (
    <Container as="main" id="main" className="pb-14 pt-8 sm:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: landingJsonLd(category, path, services.items, copy, city) }} />
      <nav aria-label="Breadcrumb" className="text-sm font-semibold text-muted">
        <Link href="/" className="hover:text-ink">
          Home
        </Link>
        {" › "}
        {city ? (
          <Link href={cityPath(city)} className="hover:text-ink">
            {city.name}
          </Link>
        ) : (
          <Link href="/services" className="hover:text-ink">
            Services
          </Link>
        )}
        {" › "}
        <span className="text-ink">{category.label}</span>
      </nav>
      <h1 className="mt-4 max-w-3xl font-display text-h1 font-bold text-ink wrap-anywhere">{copy.h1}</h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed">{copy.intro}</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {group && <ButtonLink href={appCategoryUrl(group, category)}>Browse all {category.label} services</ButtonLink>}
        <ButtonLink href={PROVIDER_URL} variant="secondary">
          Offer {category.label} on Phriend
        </ButtonLink>
      </div>

      <section aria-labelledby="services" className="mt-14">
        <h2 id="services" className="font-display text-h2 font-bold text-ink">
          {category.label} services{city ? ` in ${city.name}` : ""} right now
        </h2>
        <ServiceGrid
          services={services.items}
          ok={services.ok}
          iconFor={() => category.icon}
          empty={
            <p>
              No {inSentence(category.label)} services {city ? `in ${city.name} ` : "listed "}yet.{" "}
              {city ? (
                <>
                  See{" "}
                  <Link href={categoryPath(category)} className={link}>
                    {inSentence(category.label)} across the Philippines
                  </Link>{" "}
                  or{" "}
                  <a href="#cities" className={link}>
                    other cities
                  </a>
                  .
                </>
              ) : (
                <>
                  See{" "}
                  <a href="#more" className={link}>
                    other services
                  </a>{" "}
                  or{" "}
                  <Link href="/services" className={link}>
                    all services
                  </Link>
                  .
                </>
              )}
            </p>
          }
        />
      </section>

      <section className="article mt-14 max-w-3xl">
        <h2>What {inSentence(category.label)} on Phriend looks like</h2>
        <p>{copy.what}</p>
        <h2>How a booking works</h2>
        <ol>
          {copy.how.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <h2>What it costs</h2>
        <p>{copy.rates}</p>
        <h2>Verified providers</h2>
        <p>{copy.trust}</p>
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
        <h2 id="cities" className="font-display text-h2 font-bold text-ink">
          {category.label} by city
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {CITY_PAGES.filter((c) => c.slug !== city?.slug).map((c) => (
            <li key={c.slug} className="min-w-0 max-w-full">
              <Link href={comboPath(category, c)} className={`${pill} max-w-full wrap-anywhere`}>
                {category.label} in {c.name}
              </Link>
            </li>
          ))}
          {city && (
            <li>
              <Link href={categoryPath(category)} className={pill}>
                All of the Philippines
              </Link>
            </li>
          )}
        </ul>
      </section>

      {occasions.length > 0 && (
        <section aria-labelledby="occasions" className="mt-14">
          <h2 id="occasions" className="font-display text-h2 font-bold text-ink">
            Often booked for
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {occasions.map((o) => (
              <li key={o.slug}>
                <Link href={`/occasions/${o.slug}`} className={pill}>
                  {o.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {guides.length > 0 && (
        <section aria-labelledby="guides" className="mt-14">
          <h2 id="guides" className="font-display text-h2 font-bold text-ink">
            Guides
          </h2>
          <ul className="mt-4 grid max-w-3xl gap-3">
            {guides.map((p) => (
              <li key={p.slug} className="min-w-0">
                <Link href={`/blog/${p.slug}`} className={`${link} wrap-anywhere`}>
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="more" className="mt-14">
        <h2 id="more" className="font-display text-h2 font-bold text-ink">
          Other services{city ? ` in ${city.name}` : ""}
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {others
            .filter((c) => c.slug !== category.slug)
            .map((c) => (
              <li key={c.slug} className="min-w-0 max-w-full">
                <Link href={city ? comboPath(c, city) : categoryPath(c)} className={`${softPill} max-w-full wrap-anywhere`}>
                  {c.label}
                </Link>
              </li>
            ))}
        </ul>
      </section>
    </Container>
  );
}
