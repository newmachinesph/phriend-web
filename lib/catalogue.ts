import "server-only";
import { API_PLATFORM, appConfig, catalogue } from "@/lib/api";
import type { Category, CategoryGroup, ServiceCard, TeamCard } from "@/lib/phriend2";
import { CITY_PAGES, type CityPage } from "@/lib/cities";

/**
 * The catalogue reads behind the landing pages (SPEC 13e §2.2), all public /v1 routes with `platform=ios`.
 *
 * When api2 does not answer:
 * - during `next build`, a read returns its empty result (`ok: false`): the page renders its lists empty with the
 *   "Services are loading" note and the static parts still build (§2.1 "Failure");
 * - at runtime (an ISR revalidation or a first request), a read throws, so ISR keeps serving the last good page instead
 *   of caching a degraded one for the revalidate period; with no page cached yet, app/error.tsx shows.
 */

const BUILDING = process.env.NEXT_PHASE === "phase-production-build";

/** The empty result during a build; a thrown error at runtime (see above). */
function degraded<T>(fallback: T, what: string): T {
  if (!BUILDING) throw new Error(`api2 did not answer (${what}).`);
  return fallback;
}

export type Group = CategoryGroup & { categories: Category[] };
export type Catalog = { ok: boolean; groups: Group[]; categories: Category[] };

/** Ops hiding reaches the /services directory within a minute; the landing pages refresh every 10 minutes. */
export const DIRECTORY_REVALIDATE_S = 60;
export const LANDING_REVALIDATE_S = 600;
/** The curated city ids hardly ever change. */
const CITIES_REVALIDATE_S = 86_400;
/** The first page of services on a landing page. */
export const SERVICES_SHOWN = 12;
export const TEAMS_PER_PAGE = 12;

/** Groups (each with its categories, in Ops order; empty groups left out) and categories, as the iOS app shows them. */
export async function getCatalog(revalidate: number = LANDING_REVALIDATE_S): Promise<Catalog> {
  const r = await catalogue(revalidate).categories(API_PLATFORM);
  if (!r.ok) return degraded({ ok: false, groups: [], categories: [] }, "categories");
  const byPosition = <T extends { position: number }>(a: T, b: T) => a.position - b.position;
  const categories = [...r.data.categories].sort(byPosition);
  const groups = [...r.data.groups]
    .sort(byPosition)
    .map((g) => ({ ...g, categories: categories.filter((c) => c.groupId === g.id) }))
    .filter((g) => g.categories.length > 0);
  const shown = new Set(groups.map((g) => g.id));
  return { ok: true, groups, categories: categories.filter((c) => shown.has(c.groupId)) };
}

export const findGroup = (catalog: Catalog, slug: string) => catalog.groups.find((g) => g.slug === slug);
export const findCategory = (catalog: Catalog, slug: string) => catalog.categories.find((c) => c.slug === slug);
export const groupOf = (catalog: Catalog, c: Category) => catalog.groups.find((g) => g.id === c.groupId);

/** The api2 city id of each curated city page (matched by name; GET /v1/cities has no slugs). */
export async function getCityIds(): Promise<ReadonlyMap<string, number>> {
  const r = await catalogue(CITIES_REVALIDATE_S).cities();
  if (!r.ok) return degraded(new Map(), "cities");
  const ids = new Map<string, number>();
  for (const page of CITY_PAGES) {
    const city = r.data.items.find((c) => c.name.toLowerCase() === page.name.toLowerCase());
    if (city) ids.set(page.slug, city.id);
  }
  return ids;
}

export type Services = { ok: boolean; items: ServiceCard[] };

/** The first page of the feed for a landing page (12 cards). `ok: false` when api2 did not answer. */
export async function getServices(q: { category?: readonly string[]; group?: string; city?: CityPage }, revalidate: number = LANDING_REVALIDATE_S): Promise<Services> {
  let city: number[] | undefined;
  if (q.city) {
    const id = (await getCityIds()).get(q.city.slug);
    if (id === undefined) return { ok: false, items: [] }; // a curated city api2 does not list (by name): the loading note
    city = [id];
  }
  const r = await catalogue(revalidate).feed({ platform: API_PLATFORM, category: q.category, group: q.group, city, limit: SERVICES_SHOWN });
  return r.ok ? { ok: true, items: r.data.items } : degraded({ ok: false, items: [] }, "services");
}

/** The switches the client app reads (`features.teams`); off in a build without api2, as in the apps. */
export async function getFeatures(): Promise<{ teams: boolean }> {
  const r = await appConfig(LANDING_REVALIDATE_S).get({ platform: API_PLATFORM, app: "client" });
  return r.ok ? { teams: r.data.features.teams } : degraded({ teams: false }, "app config");
}

export type Teams = { ok: boolean; items: TeamCard[]; nextCursor: string | null };

/** One page of live teams (cursor paging). */
export async function getTeams(q: { city?: CityPage; cursor?: string | null; limit?: number } = {}): Promise<Teams> {
  let city: number[] | undefined;
  if (q.city) {
    const id = (await getCityIds()).get(q.city.slug);
    if (id === undefined) return { ok: false, items: [], nextCursor: null };
    city = [id];
  }
  const r = await catalogue(LANDING_REVALIDATE_S).teams({ platform: API_PLATFORM, city, cursor: q.cursor, limit: q.limit ?? TEAMS_PER_PAGE });
  if (r.ok) return { ok: true, items: r.data.items, nextCursor: r.data.nextCursor };
  // a cursor api2 refuses (tampered or stale) is not an outage: an empty page, which links back to the first
  if (r.error.kind === "api" && r.error.status >= 400 && r.error.status < 500) return { ok: true, items: [], nextCursor: null };
  return degraded({ ok: false, items: [], nextCursor: null }, "teams");
}
