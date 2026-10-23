import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LOADING_NOTE } from "@/components/services";
import { TeamTile } from "@/components/teams";
import { getFeatures, getTeams } from "@/lib/catalogue";
import { CITY_PAGES, findCity } from "@/lib/cities";
import { escapeJsonLd } from "@/lib/landing";
import { appTeamUrl, cityPath } from "@/lib/links";
import { NOINDEX_FOLLOW, pageMeta, PROVIDER_URL, SITE_URL } from "@/lib/site";
import { ButtonLink, Container } from "@/components/ui";

// The page reads ?city= and ?cursor=, so it renders per request; the API calls inside are cached for 10 minutes.
const META = pageMeta({
  title: "Teams: book several providers as one",
  description: "Services from teams of verified providers for weddings, events, tours and moves: one chat, one price, one booking.",
  path: "/teams",
});

/** Every variant keeps the canonical /teams; a ?cursor= page (a later page of the same list) is noindex,follow. */
export async function generateMetadata({ searchParams }: { searchParams: Promise<{ cursor?: string }> }): Promise<Metadata> {
  const { cursor } = await searchParams;
  return cursor ? { ...META, robots: NOINDEX_FOLLOW } : META;
}

const STEPS = [
  { title: "Pick a team", text: "Browse the teams in your city. Each one lists its members and their roles, its services and what each one costs." },
  { title: "Choose a service", text: "A team service has its own price, length and the members who come along." },
  { title: "Send one booking request", text: "Pick a time and, for an at-home service, the address or venue. The team lead accepts or declines for everyone, and the team has one chat with you." },
  { title: "Pay the team, as agreed", text: "Payment is agreed with the team lead in the chat and paid to the team directly. Phriend never holds the money. Then leave a review." },
] as const;

const pill = "inline-block rounded-full border-2 px-4 py-1.5 text-sm font-bold";
const CURSOR = /^[\w.~-]{1,300}$/;

export default async function TeamsPage({ searchParams }: { searchParams: Promise<{ city?: string; cursor?: string }> }) {
  const sp = await searchParams; // first: reading it keeps the page per request, also while it redirects below
  // v2.0 keeps teams off on iOS, and the site follows the iOS build: out of the nav and the sitemap, and a temporary
  // redirect to the services directory (not a 404), so links and search listings of /teams still land somewhere useful
  if (!(await getFeatures()).teams) redirect("/services");
  const city = typeof sp.city === "string" ? findCity(sp.city) : undefined;
  const cursor = typeof sp.cursor === "string" && CURSOR.test(sp.cursor) ? sp.cursor : null;
  const teams = await getTeams({ city, cursor });
  const href = (next: string | null) => {
    const q = new URLSearchParams({ ...(city ? { city: city.slug } : {}), ...(next ? { cursor: next } : {}) }).toString();
    return q ? `/teams?${q}` : "/teams";
  };

  const jsonLd = escapeJsonLd(
    JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Teams", item: `${SITE_URL}/teams` },
          ],
        },
        { "@type": "ItemList", name: `Teams${city ? ` in ${city.name}` : ""}`, itemListElement: teams.items.map((t, i) => ({ "@type": "ListItem", position: i + 1, url: appTeamUrl(t.slug), name: t.name })) },
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
        <span className="text-ink">Teams</span>
      </nav>
      <h1 className="mt-4 max-w-3xl font-display text-h1 font-bold text-ink">Services from teams of providers</h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed">
        Some jobs need more than one provider: a wedding with photo, video and coordination, a tour with a guide and a driver, a moving crew. A team lists these as
        services and books as one: one chat, one price, one booking. Every member is a verified provider.
      </p>

      <section id="teams" aria-labelledby="teams-title" className="mt-14">
        <h2 id="teams-title" className="font-display text-h2 font-bold text-ink">
          Teams{city ? ` in ${city.name}` : ""}
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Filter by city">
          <li>
            <Link href="/teams" aria-current={city ? undefined : "page"} className={`${pill} ${city ? "border-line text-ink hover:border-brand" : "border-brand bg-brand-soft text-ink"}`}>
              All cities
            </Link>
          </li>
          {CITY_PAGES.map((c) => (
            <li key={c.slug}>
              <Link href={`/teams?city=${c.slug}`} aria-current={city?.slug === c.slug ? "page" : undefined} className={`${pill} ${city?.slug === c.slug ? "border-brand bg-brand-soft text-ink" : "border-line text-ink hover:border-brand"}`}>
                {c.name}
              </Link>
            </li>
          ))}
        </ul>

        {!teams.ok ? (
          <p className="mt-6 max-w-2xl leading-relaxed">{LOADING_NOTE}</p>
        ) : teams.items.length === 0 ? (
          <div className="mt-6 max-w-2xl rounded-card border border-line bg-surface p-6 sm:p-8">
            <p className="font-display text-h3 font-bold text-ink">No teams in {city ? city.name : "the Philippines"} yet.</p>
            <p className="mt-2 leading-relaxed">You can book any of the services{city ? ` in ${city.name}` : ""} on their own.</p>
            <ButtonLink href={city ? cityPath(city) : "/services"} className="mt-5">
              Browse services{city ? ` in ${city.name}` : ""}
            </ButtonLink>
          </div>
        ) : (
          <>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {teams.items.map((t) => (
                <li key={t.id} className="min-w-0">
                  <TeamTile team={t} />
                </li>
              ))}
            </ul>
            {(cursor || teams.nextCursor) && (
              <nav aria-label="Pages" className="mt-8 flex items-center justify-between gap-4 text-sm font-bold">
                {cursor ? (
                  <Link href={href(null)} className={`${pill} border-line text-ink hover:border-brand`}>
                    First page
                  </Link>
                ) : (
                  <span />
                )}
                {teams.nextCursor ? (
                  <Link href={href(teams.nextCursor)} className={`${pill} border-line text-ink hover:border-brand`}>
                    More teams
                  </Link>
                ) : (
                  <span />
                )}
              </nav>
            )}
          </>
        )}
      </section>

      <section aria-labelledby="how-title" className="mt-14">
        <h2 id="how-title" className="font-display text-h2 font-bold text-ink">
          How a team booking works
        </h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.title} className="rounded-card border border-line bg-white p-6">
              <span className="font-display text-3xl font-semibold text-muted">0{i + 1}</span>
              <h3 className="mt-3 font-display text-h3 font-bold text-ink">{s.title}</h3>
              <p className="mt-2 text-base leading-relaxed">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="start-a-team" aria-labelledby="start-title" className="mt-14 rounded-card bg-brand-soft p-6 sm:p-10">
        <h2 id="start-title" className="font-display text-h2 font-bold text-ink">
          Start a team
        </h2>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed">
          Already a provider? Invite other verified providers, name your team and list the team&apos;s services. Each member keeps their own services and can still
          be booked on their own.
        </p>
        <ButtonLink href={PROVIDER_URL} className="mt-6">
          Go to provider.phriend.app
        </ButtonLink>
      </section>
    </Container>
  );
}
