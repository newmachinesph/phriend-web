import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Star } from "lucide-react";
import { activityPath, appProfileUrl, CITY_PAGES, comboPath, LANDING_CTA, landingJsonLd, type Category, type CityPage, type Phriend, landingCopy } from "@/lib/landing";
import { POST_URL } from "@/lib/site";
import { OCCASIONS } from "@/lib/occasions";
import { ButtonLink, Container } from "@/components/ui";

const peso = (n: number) => `₱${n.toLocaleString("en-PH")}`;

/** One activity (or activity-in-city) landing page: several hundred words of real copy, the live Phriends, and the schema. */
export function Landing({ category, city, phriends, path, others }: { category: Category; city?: CityPage; phriends: Phriend[]; path: string; others: Category[] }) {
  const copy = landingCopy(category, city, phriends);
  return (
    <Container as="main" id="main" className="py-14 sm:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: landingJsonLd(category, path, phriends, copy, city) }} />
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
        <ButtonLink href={LANDING_CTA.browse(category)}>Browse all {category.label} Phriends</ButtonLink>
        <ButtonLink href={POST_URL} variant="secondary">
          Offer {category.label} as a Phriend
        </ButtonLink>
      </div>

      <section aria-labelledby="phriends" className="mt-14">
        <h2 id="phriends" className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          {category.label} Phriends{city ? ` in ${city.name}` : ""} right now
        </h2>
        {phriends.length === 0 ? (
          <p className="mt-3 max-w-2xl leading-relaxed">
            No {category.label.toLowerCase()} Phriend {city ? `in ${city.name} ` : ""}yet. Be the first:{" "}
            <a href={POST_URL} className="font-bold text-brand-text underline">
              create your profile
            </a>{" "}
            and clients in {city ? city.name : "your city"} will find you here.
          </p>
        ) : (
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {phriends.map((p) => (
              <li key={p.id}>
                <a href={appProfileUrl(p)} className="group block overflow-hidden rounded-card border border-line bg-white transition-colors hover:border-brand">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image src={p.imagePath[0]} alt={`${p.workName}, ${category.label} Phriend in ${p.city}`} width={480} height={640} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                    {p.verified && (
                      <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-bold text-verify">
                        <BadgeCheck size={14} aria-hidden="true" /> Verified
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="flex items-center justify-between font-display text-lg font-semibold text-ink">
                      {p.workName}
                      <span className="inline-flex items-center gap-1 text-sm font-bold text-body">
                        <Star size={14} className="fill-mango text-mango" aria-hidden="true" /> {p.averageStarRating.toFixed(1)}
                      </span>
                    </p>
                    <p className="text-sm text-muted">{p.city}</p>
                    <p className="mt-1 font-bold text-ink">
                      {peso(p.pricePerHour)}
                      <span className="text-xs font-semibold text-muted">/hr</span>
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="article mt-14 max-w-3xl">
        <h2>What a {category.label} Phriend does</h2>
        <p>{copy.what}</p>
        <h2>How a booking works</h2>
        <ol>
          {copy.how.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <h2>What it costs</h2>
        <p>{copy.rates}</p>
        <h2>Staying safe</h2>
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
          {category.label} Phriends by city
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
          Other things you can hire a Phriend for{city ? ` in ${city.name}` : ""}
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
