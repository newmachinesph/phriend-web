import { API_PLATFORM, API_URL, APP_URL, apiHeaders, PROVIDER_URL, SITE_NAME, SITE_URL } from "@/lib/site";
import { peso } from "@/lib/price";

/** Service and city landing pages: live data from the app's public API, rendered on the marketing domain so it carries its authority. */

export type IconNode = [string, Record<string, string | number>][];
export type Category = { slug: string; label: string; icon: string; activities: string[]; iconNode?: IconNode; group?: string | null };
/** A service group (Errands & Home Help, Weddings & Events…), managed in Ops; the API sends only groups with a shown category. */
export type CategoryGroup = { slug: string; label: string; icon: string; iconNode: IconNode };
export type VisitType = "in_person" | "online" | "hybrid";
export type Scope = "areas" | "city" | "nationwide";
/** One service from GET /api/services (the shape phriend-ph lib/services.ts reads): `id` is "o<offeringId>". */
export type ServiceItem = {
  id: string;
  postId: number;
  title: string;
  description: string;
  category: string | null;
  price: number;
  unit: "hour" | "session";
  minHours: number | null;
  photo: string | null;
  visitType?: VisitType;
  scope?: Scope;
  city?: string | null;
  coverage?: string[];
  provider: { postId: number; workName: string; title?: string; photo: string | null; verified: boolean; rating: number; reviewCount: number; city: string };
};

/** The cities with their own pages (the six the audit named first). */
export const CITY_PAGES = [
  { slug: "manila", name: "Manila", blurb: "the capital, from Intramuros and Binondo to Ermita, Malate and the Bay area" },
  { slug: "quezon-city", name: "Quezon City", blurb: "the biggest city in Metro Manila, with Maginhawa, Katipunan, Cubao and the UP campus" },
  { slug: "cebu-city", name: "Cebu City", blurb: "the Queen City of the South, gateway to the beaches and islands of the Visayas" },
  { slug: "makati", name: "Makati", blurb: "the business district, with Ayala, Poblacion and Legazpi Village" },
  { slug: "davao-city", name: "Davao City", blurb: "the biggest city in Mindanao, durian, Samal Island and Mount Apo" },
  { slug: "baguio", name: "Baguio", blurb: "the summer capital in the mountains, Session Road, Burnham Park and strawberry farms" },
] as const;
export type CityPage = (typeof CITY_PAGES)[number];
export const findCity = (slug: string) => CITY_PAGES.find((c) => c.slug === slug);

/** URL segment for a category: "Eat & Travel" -> "eat-and-travel". */
export const activitySlug = (label: string) =>
  label
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
export const activityPath = (c: Category) => `/services/${activitySlug(c.label)}`;
export const comboPath = (c: Category, city: CityPage) => `/${activitySlug(c.label)}-in-${city.slug}`;
/** The same page on the app (the friendly category path the app uses). */
export const appCategoryUrl = (c: Category) => `${APP_URL}/${activitySlug(c.label)}`;
/** One service's own page in the app. */
export const appServiceUrl = (s: ServiceItem) => `${APP_URL}/services/${s.id}`;

/** Ops tells admins "changes reach the apps within a minute": the directory follows the category, group and platform
 * hiding set in Ops (hidden groups never arrive) within the same minute. */
const CATALOG_REVALIDATE_S = 60;

/** Categories and their groups in one call (the API sends both, in Ops order), as the iOS app shows them. */
export async function getCatalog(): Promise<{ categories: Category[]; groups: CategoryGroup[] }> {
  try {
    const r = await fetch(`${API_URL}/api/categories?platform=${API_PLATFORM}`, { headers: apiHeaders(), next: { revalidate: CATALOG_REVALIDATE_S } });
    if (!r.ok) return { categories: [], groups: [] };
    const d = (await r.json()) as { categories?: Category[]; groups?: CategoryGroup[] };
    return {
      categories: d.categories ?? [],
      groups: d.groups ?? [],
    };
  } catch {
    return { categories: [], groups: [] };
  }
}
export const getCategories = async () => (await getCatalog()).categories;

/** Each group with its categories, in order; groups without categories are left out. */
export async function getGroups(): Promise<(CategoryGroup & { categories: Category[] })[]> {
  const { categories, groups } = await getCatalog();
  return groups.map((g) => ({ ...g, categories: categories.filter((c) => c.group === g.slug) })).filter((g) => g.categories.length);
}
export const groupPath = (g: { slug: string }) => `/services/${g.slug}`;
/** The same group in the app. */
export const appGroupUrl = (g: { slug: string }) => `${APP_URL}/services/${g.slug}`;
export async function findCategory(segment: string): Promise<Category | undefined> {
  const list = await getCategories();
  return list.find((c) => activitySlug(c.label) === segment || c.slug === segment);
}

const SERVICES_SHOWN = 12;

/** Services for a landing page, from the service feed (services only: a listing without a service is not in it). Empty when the API is unreachable. */
export async function getServices(q: { category?: string; city?: string }): Promise<ServiceItem[]> {
  const sp = new URLSearchParams({ platform: API_PLATFORM });
  if (q.category) sp.set("category", q.category);
  if (q.city) sp.set("city", q.city);
  try {
    const r = await fetch(`${API_URL}/api/services?${sp}`, { headers: apiHeaders(), next: { revalidate: 600 } });
    if (!r.ok) return [];
    const feed = (await r.json()) as { items?: ServiceItem[] };
    return (feed.items ?? []).filter((s) => s.id.startsWith("o")).slice(0, SERVICES_SHOWN);
  } catch {
    return [];
  }
}

const list = (xs: string[]) => (xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`);

/** The page copy: several hundred words specific to the service (and city), not a filter grid. */
export function landingCopy(c: Category, city?: CityPage, services: ServiceItem[] = []) {
  const where = city ? city.name : "the Philippines";
  const name = c.label.toLowerCase();
  const acts = c.activities.length ? c.activities : [c.label];
  const prices = services.map((s) => s.price).filter(Boolean);
  const from = prices.length ? `Services listed here currently start at ${peso(Math.min(...prices))}` : "";
  const cities = [...new Set(services.map((s) => s.city || s.provider.city).filter(Boolean))].slice(0, 5);
  const pricing = "Each service shows its price per job, per hour or per session, and any minimum booking, before you book.";
  return {
    h1: city ? `${c.label} services in ${city.name}` : `${c.label} services in the Philippines`,
    intro: city
      ? `Need ${name} in ${city.name}? Browse services for ${list(acts.slice(0, 3).map((a) => a.toLowerCase()))} and more from verified providers who work there, plus online services that cover the whole country. ${city.name} is ${city.blurb}. Book the service and chat with the provider in the Phriend app, and pay the provider directly, as you agree with them.`
      : `Book ${name} services from verified providers: ${list(acts.slice(0, 4).map((a) => a.toLowerCase()))}. Each service shows its own price, photos of the work, whether it is done online, in person or both, and the area it covers. Book it and chat with the provider in the Phriend app, and pay the provider directly, as you agree with them.`,
    what: `${c.label} on Phriend covers ${list(acts.map((a) => a.toLowerCase()))}. Every service is listed on its own, with a price per job, per hour or per session, up to six photos of the work, a visit type (online, in person or hybrid), its own schedule and its own area: listed areas, a whole city, or nationwide for online work. The provider's profile shows their name, a title, the languages they speak, the Verified badge and the documents our team checked${cities.length ? `. Right now there are ${name} services based in ${list(cities)}` : ""}.`,
    how: [
      `Browse the services below or open the full list in the app. Compare prices, photos, visit type and area, and read the reviews.`,
      `Message the provider in the app. Their FAQ answers reply instantly to the usual questions, like how to pay, the minimum booking and where they work.`,
      `Send a booking request for a time in the service's schedule. For an at-home service, pick one of your saved addresses; online services need none. The provider accepts or declines, and it goes into your calendar.`,
      `The work gets done, online or in person. Pay the provider directly, as you agreed, then leave a review so the next client knows what to expect.`,
    ],
    rates: `Each provider sets the price of each service, per job, per hour or per session, depending on the work. ${from ? `${from} in ${where}. ` : ""}The price and any minimum booking show on the service before you book. Phriend does not take a cut, so what you pay goes to the provider.`,
    safety: `Every provider is verified by our team with a government ID and a selfie, and document badges show which clearances, certificates or business documents were also checked. Agree the price and what is included in the chat, so both sides have the record. Payment goes to the provider directly: if you pay by e-wallet or bank, use only the account the provider gave you in the Phriend chat.`,
    faq: [
      { q: `How much does ${name} cost in ${where}?`, a: `${from ? `${from}. ` : ""}${pricing}` },
      { q: `Can ${name} be done online?`, a: `Some ${name} services are online or hybrid; the visit type shows on each service. Online services can be booked from anywhere in the Philippines and need no address. For an at-home service, pick one of your saved addresses when you book.` },
      { q: `How do I know the provider is who they say they are?`, a: `Our team checks every provider's government ID and a selfie before they get the Verified badge, and a person approves each listing before it shows. Document badges show the clearances, certificates or business documents that were also checked.` },
    ],
  };
}

/** JSON-LD for a landing page: breadcrumbs, the service offered, the services listed, and the FAQ. */
export function landingJsonLd(c: Category, path: string, services: ServiceItem[], copy: ReturnType<typeof landingCopy>, city?: CityPage) {
  const url = `${SITE_URL}${path}`;
  const prices = services.map((s) => s.price).filter(Boolean);
  const crumbs = [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    ...(city ? [{ "@type": "ListItem", position: 2, name: city.name, item: `${SITE_URL}/${city.slug}` }] : [{ "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services/${activitySlug(c.label)}` }]),
    { "@type": "ListItem", position: city ? 3 : 2, name: copy.h1, item: url },
  ].filter((x, i, a) => a.findIndex((y) => y.item === x.item) === i);
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "BreadcrumbList", itemListElement: crumbs },
      {
        "@type": "Service",
        name: copy.h1,
        serviceType: `${c.label} services`,
        provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        areaServed: city ? { "@type": "City", name: city.name, containedInPlace: { "@type": "Country", name: "Philippines" } } : { "@type": "Country", name: "Philippines" },
        url,
        ...(prices.length ? { offers: { "@type": "AggregateOffer", priceCurrency: "PHP", lowPrice: Math.min(...prices), highPrice: Math.max(...prices), offerCount: prices.length } } : {}),
      },
      {
        "@type": "ItemList",
        name: `${c.label} services${city ? ` in ${city.name}` : ""}`,
        itemListElement: services.map((s, i) => ({ "@type": "ListItem", position: i + 1, url: appServiceUrl(s), name: s.title, ...(s.photo ? { image: s.photo } : {}) })),
      },
      { "@type": "FAQPage", mainEntity: copy.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    ],
  }).replace(/</g, "\\u003c"); // titles come from the API
}

export const LANDING_CTA = { browse: (c: Category) => appCategoryUrl(c), become: PROVIDER_URL };
/** Teams: the shapes GET /api/teams and /api/teams/{slug} return (types only; copied from phriend-ph lib/team-rules.ts). */
export type TeamDeposit = 0 | 25 | 50;
export type TeamMember = { postId: number; name: string; photo: string; username: string | null; role: string; lead: boolean };
export type TeamPackage = {
  id: number;
  title: string;
  description: string;
  photo: string | null;
  price: number;
  hours: number;
  includedGuests: number;
  maxGuests: number;
  extraGuestFee: number;
  memberPostIds: number[];
  bookable?: boolean;
};
export type TeamCard = {
  id: number;
  slug: string;
  name: string;
  city: string;
  photo: string;
  memberCount: number;
  roles: string[];
  avatars: string[];
  rating: number | null;
  reviewCount: number;
  priceFrom: number | null;
};

export const TEAMS_PER_PAGE = 12;
/** A team in the app. */
export const appTeamUrl = (slug: string) => `${APP_URL}/teams/${slug}`;

/** Live teams. The API answers with an empty list while the feature is switched off, and a failure is an empty list too, so the page still renders. */
export async function getTeams(q: { city?: string; page?: number; limit?: number } = {}): Promise<{ teams: TeamCard[]; total: number; page: number }> {
  const sp = new URLSearchParams();
  if (q.city) sp.set("city", q.city);
  if (q.page && q.page > 1) sp.set("page", String(q.page));
  sp.set("limit", String(q.limit ?? TEAMS_PER_PAGE));
  try {
    const r = await fetch(`${API_URL}/api/teams?${sp}`, { headers: apiHeaders(), next: { revalidate: 600 } });
    if (!r.ok) return { teams: [], total: 0, page: 1 };
    const d = (await r.json()) as { teams?: TeamCard[]; total?: number; page?: number };
    const teams = d.teams ?? [];
    return { teams, total: d.total ?? teams.length, page: d.page ?? q.page ?? 1 };
  } catch {
    return { teams: [], total: 0, page: 1 };
  }
}
