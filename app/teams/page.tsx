import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TeamTile } from "@/components/teams";
import { appTeamUrl, CITY_PAGES, findCity, getTeams, TEAMS_PER_PAGE } from "@/lib/landing";
import { APP_URL, pageMeta, POST_URL, SITE_URL } from "@/lib/site";

// The page reads ?city= and ?page=, so it renders per request; the API call inside is cached for 10 minutes (see getTeams).
export const metadata: Metadata = pageMeta({
  title: "Teams: book several local pros as one",
  description: "Some days need more than one pro. A team books as one: one chat, one price, one booking. Every member is an ID-verified Phriend.",
  path: "/teams",
});

const STEPS = [
  { title: "Pick a team", text: "Browse the teams in your city. Each one lists its members and their roles, its packages and what it costs per group." },
  { title: "Choose a package", text: "A package has a fixed length, a group price and the members who come along. Pick one and the number of guests." },
  { title: "Send one booking request", text: "Give the date, start time and a public meeting place. The team lead accepts or declines for everyone, and the team has one group chat with you." },
  { title: "Meet in public, pay in person", text: "The downpayment is at most 50%, in cash, handed to the team lead when you meet. Phriend never holds the money. Then leave a review." },
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
    <main id="main" className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <nav aria-label="Breadcrumb" className="text-sm font-semibold text-muted">
        <Link href="/" className="hover:text-ink">
          Home
        </Link>
        {" › "}
        <span className="text-ink">Teams</span>
      </nav>
      <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">Book a team of local pros</h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed">
        Some days need more than one pro. A team books as one: one chat, one price, one booking. Every member is an ID-verified Phriend you can also book alone.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href="#teams" className="btn-primary inline-flex items-center gap-2 rounded-full px-5 py-3 font-bold">
          See the teams <ArrowRight size={18} aria-hidden="true" />
        </a>
        <a href="#start-a-team" className="inline-flex items-center gap-2 rounded-full border-2 border-line px-5 py-3 font-bold text-ink hover:border-brand">
          Start a team
        </a>
      </div>

      <section id="teams" aria-labelledby="teams-title" className="mt-14">
        <h2 id="teams-title" className="font-display text-2xl font-semibold text-ink sm:text-3xl">
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
          <div className="mt-6 max-w-2xl rounded-3xl border border-line bg-surface p-6 sm:p-8">
            <p className="font-display text-xl font-semibold text-ink">Teams are just getting started in {city ? city.name : "the Philippines"}.</p>
            <p className="mt-2 leading-relaxed">
              Teams are new on Phriend, and the first ones are being put together now. In the meantime you can book any of the Phriends{city ? ` in ${city.name}` : ""} on their own.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href={city ? `/${city.slug}` : "/services/tour-guide"} className="btn-primary inline-flex items-center gap-2 rounded-full px-5 py-3 font-bold">
                Browse Phriends{city ? ` in ${city.name}` : ""} <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <a href="#start-a-team" className="inline-flex items-center gap-2 rounded-full border-2 border-line px-5 py-3 font-bold text-ink hover:border-brand">
                Start a team
              </a>
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
        <h2 id="how-title" className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          How a team booking works
        </h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.title} className="rounded-3xl border border-line bg-white p-6 shadow-card">
              <span className="font-display text-3xl font-semibold text-line">0{i + 1}</span>
              <h3 className="mt-3 font-display text-xl font-semibold text-ink">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="start-a-team" aria-labelledby="start-title" className="mt-14 rounded-3xl bg-brand-soft p-6 sm:p-10">
        <h2 id="start-title" className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          Start a team
        </h2>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed">
          Already a Phriend? Invite other verified Phriends, name your team and set your packages: a group price, a fixed length and who comes along. Each member keeps their own listing and can still be booked alone.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={`${APP_URL}/manage/teams`} className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold">
            Start a team <ArrowRight size={18} aria-hidden="true" />
          </a>
          <a href={POST_URL} className="inline-flex items-center gap-2 rounded-full border-2 border-line bg-white px-6 py-3 font-bold text-ink hover:border-brand">
            Become a Phriend
          </a>
        </div>
      </section>
    </main>
  );
}
