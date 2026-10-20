import type { Metadata } from "next";
import Link from "next/link";
import { TeamTile } from "@/components/teams";
import { appTeamUrl, CITY_PAGES, findCity, getTeams, TEAMS_PER_PAGE } from "@/lib/landing";
import { pageMeta, PROVIDER_URL, SITE_URL } from "@/lib/site";
import { ButtonLink, Container } from "@/components/ui";

// The page reads ?city= and ?page=, so it renders per request; the API call inside is cached for 10 minutes (see getTeams).
export const metadata: Metadata = pageMeta({
  title: "Teams and packages: book several providers as one",
  description: "Packages from teams of verified providers for weddings, events, tours and moves: one chat, one price, one booking.",
  path: "/teams",
});

const STEPS = [
  { title: "Pick a team", text: "Browse the teams in your city. Each one lists its members and their roles, its packages and what each package costs." },
  { title: "Choose a package", text: "A package has a fixed length, a price and the members who come along. Pick one and the number of guests." },
  { title: "Send one booking request", text: "Give the date, the start time and the address or venue. The team lead accepts or declines for everyone, and the team has one group chat with you." },
  { title: "Pay the team, as agreed", text: "Payment is agreed with the team lead in the chat and paid to the team directly. Phriend never holds the money. Then leave a review." },
] as const;

const pill = "inline-block rounded-full border-2 px-4 py-1.5 text-sm font-bold";

export default async function TeamsPage({ searchParams }: { searchParams: Promise<{ city?: string; page?: string }> }) {
  const sp = await searchParams;
  const city = typeof sp.city === "string" ? findCity(sp.city) : undefined;
  const page = Math.max(1, Math.floor(Number(sp.page)) || 1);
  const { teams, total } = await getTeams({ city: city?.name, page });
  const pages = Math.max(1, Math.ceil(total / TEAMS_PER_PAGE));
  const href = (p: number) => {
    const q = new URLSearchParams({ ...(city ? { city: city.slug } : {}), ...(p > 1 ? { page: String(p) } : {}) }).toString();
    return q ? `/teams?${q}` : "/teams";
  };

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Teams", item: `${SITE_URL}/teams` },
        ],
      },
      {
        "@type": "ItemList",
        name: `Teams${city ? ` in ${city.name}` : ""}`,
        itemListElement: teams.map((t, i) => ({ "@type": "ListItem", position: (page - 1) * TEAMS_PER_PAGE + i + 1, url: appTeamUrl(t.slug), name: t.name, image: t.photo })),
      },
    ],
  }).replace(/</g, "\\u003c"); // team names come from the API

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
      <h1 className="mt-4 max-w-3xl font-display text-h1 font-bold text-ink">Packages from teams of providers</h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed">
        Some jobs need more than one provider: a wedding with photo, video and coordination, a tour with a guide, a driver and a photographer, a moving crew. A team sells these as packages and books as one: one chat, one price, one booking. Every member is a verified provider you can also book on their own.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <ButtonLink href="#teams">See the teams</ButtonLink>
        <ButtonLink href="#start-a-team" variant="secondary">
          Start a team
        </ButtonLink>
      </div>

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

        {teams.length === 0 ? (
          <div className="mt-6 max-w-2xl rounded-card border border-line bg-surface p-6 sm:p-8">
            <p className="font-display text-h3 font-bold text-ink">Teams are just getting started in {city ? city.name : "the Philippines"}.</p>
            <p className="mt-2 leading-relaxed">
              Teams are new on Phriend, and the first ones are being put together now. In the meantime you can book any of the services{city ? ` in ${city.name}` : ""} on their own.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href={city ? `/${city.slug}` : "/services"}>Browse services{city ? ` in ${city.name}` : ""}</ButtonLink>
              <ButtonLink href="#start-a-team" variant="secondary">
                Start a team
              </ButtonLink>
            </div>
          </div>
        ) : (
          <>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {teams.map((t) => (
                <li key={t.id}>
                  <TeamTile team={t} />
                </li>
              ))}
            </ul>
            {pages > 1 && (
              <nav aria-label="Pages" className="mt-8 flex items-center justify-between gap-4 text-sm font-bold">
                {page > 1 ? (
                  <Link href={href(page - 1)} className={`${pill} border-line text-ink hover:border-brand`}>
                    Previous
                  </Link>
                ) : (
                  <span />
                )}
                <span className="text-muted">
                  Page {page} of {pages}
                </span>
                {page < pages ? (
                  <Link href={href(page + 1)} className={`${pill} border-line text-ink hover:border-brand`}>
                    Next
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
              <span className="font-display text-3xl font-semibold text-line">0{i + 1}</span>
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
          Already a provider? Invite other verified providers, name your team and set your packages: a price, a fixed length and who comes along. Each member keeps their own services and can still be booked on their own.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <ButtonLink href={`${PROVIDER_URL}/manage/teams`}>Start a team</ButtonLink>
          <ButtonLink href={PROVIDER_URL} variant="secondary">
            List your services
          </ButtonLink>
        </div>
      </section>
    </Container>
  );
}
