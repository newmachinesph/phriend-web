import { APP_URL, POST_URL, SITE_NAME, SITE_URL } from "@/lib/site";

/** Activity and city landing pages: live data from the app's public API, rendered on the marketing domain so it carries its authority. */

export type Category = { slug: string; label: string; icon: string; activities: string[] };
export type Phriend = {
  id: number;
  workName: string;
  username?: string | null;
  city: string;
  imagePath: string[];
  pricePerHour: number;
  averageStarRating: number;
  verified?: boolean;
  activities?: string[];
  languages: string[];
  categories: string[];
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
export const activityPath = (c: Category) => `/rent-a-friend/${activitySlug(c.label)}`;
export const comboPath = (c: Category, city: CityPage) => `/${activitySlug(c.label)}-in-${city.slug}`;
/** The same page on the app (the friendly category path the app uses). */
export const appCategoryUrl = (c: Category) => `${APP_URL}/${activitySlug(c.label)}`;
export const appProfileUrl = (p: Phriend) => (p.username ? `${APP_URL}/@${p.username}` : `${APP_URL}/phriends/${p.id}`);

export async function getCategories(): Promise<Category[]> {
  try {
    const r = await fetch(`${APP_URL}/api/categories`, { next: { revalidate: 3600 } });
    if (!r.ok) return [];
    const d = (await r.json()) as { categories: Category[] };
    return d.categories ?? [];
  } catch {
    return [];
  }
}
export async function findCategory(segment: string): Promise<Category | undefined> {
  const list = await getCategories();
  return list.find((c) => activitySlug(c.label) === segment || c.slug === segment);
}

export async function getPhriends(q: { category?: string; city?: string }): Promise<Phriend[]> {
  const sp = new URLSearchParams();
  if (q.category) sp.set("category", q.category);
  if (q.city) sp.set("city", q.city);
  try {
    const r = await fetch(`${APP_URL}/api/phriends?${sp}`, { next: { revalidate: 600 } });
    if (!r.ok) return [];
    const d = (await r.json()) as { posts: Phriend[] };
    return (d.posts ?? []).slice(0, 12);
  } catch {
    return [];
  }
}

const peso = (n: number) => `₱${n.toLocaleString("en-PH")}`;
const list = (xs: string[]) => (xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`);

/** The page copy: several hundred words specific to the activity (and city), not a filter grid. */
export function landingCopy(c: Category, city?: CityPage, phriends: Phriend[] = []) {
  const where = city ? city.name : "the Philippines";
  const acts = c.activities.length ? c.activities : [c.label];
  const prices = phriends.map((p) => p.pricePerHour).filter(Boolean);
  const rate = prices.length ? `${peso(Math.min(...prices))} to ${peso(Math.max(...prices))} per hour` : "₱300 to ₱1,500 per hour, depending on the activity and the city";
  const cities = [...new Set(phriends.map((p) => p.city))].slice(0, 5);
  return {
    h1: city ? `${c.label} buddies in ${city.name}` : `Rent a friend for ${c.label} in the Philippines`,
    intro: city
      ? `Looking for someone to join you for ${c.label.toLowerCase()} in ${city.name}? Phriend is where you hire a verified local by the hour for ${list(acts.slice(0, 3).map((a) => a.toLowerCase()))} and more. ${city.name} is ${city.blurb}, and a Phriend who lives there knows where to go, what it costs and how to get around. You agree on the plan in the chat, meet in a public place, and pay in cash when you meet.`
      : `Phriend is where you hire a verified local by the hour for ${c.label.toLowerCase()}: ${list(acts.slice(0, 4).map((a) => a.toLowerCase()))}. Every Phriend on this page confirmed their identity and age with a government ID, and a person approved their profile before it went live. You agree on the plan in the chat, meet in a public place, and pay in cash when you meet. Nothing romantic, nothing sexual: platonic company and legit side gigs only.`,
    what: `A ${c.label} Phriend is a local who does this for real: ${list(acts.map((a) => a.toLowerCase()))}. Each profile lists the services they offer with a price per hour or per session, the languages they speak, their non-negotiables and their weekly availability, so you know what you are booking before you send the request${cities.length ? `. Right now there are Phriends for ${c.label.toLowerCase()} in ${list(cities)}` : ""}.`,
    how: [
      `Browse the profiles below or open the full list in the app. Filter by city, language, age and rate, and read the reviews left by other members.`,
      `Sign in and verify your ID (it takes about two minutes), then message the Phriend. Say what you have in mind, when, and where you want to meet.`,
      `Send a booking request with the date, start time, number of hours and a public meeting place. The Phriend accepts or declines, and it goes into your calendar.`,
      `Meet in public. Hand over 50% in cash when you arrive and the rest after. Then leave a review so the next member knows what to expect.`,
    ],
    rates: `Phriends for ${c.label.toLowerCase()} in ${where} currently charge ${rate}. The rate is per hour of company; food, tickets and fares are on you unless a service says otherwise. Phriend does not take a cut, so the rate you see is what the Phriend keeps.`,
    safety: `Every member is ID-verified, meetups happen in public places only, and the chat keeps the record of what was agreed. If someone shows up with people who were not agreed in the chat, do not proceed: leave and report. Never pay more than half upfront, and only to the account the Phriend shared in the chat.`,
    faq: [
      { q: `How much does a ${c.label.toLowerCase()} Phriend cost in ${where}?`, a: `Between ${rate}. The rate is set by each Phriend and shown on their profile, together with the services they offer and any minimum booking.` },
      { q: `Is renting a friend for ${c.label.toLowerCase()} legal in the Philippines?`, a: `Yes. Phriend is paid, platonic company by the hour, like hiring a guide, a tutor or an assistant. Romantic, sexual or escort services are banned and get an account removed.` },
      { q: `How do I know the Phriend is who they say they are?`, a: `Every member verifies their identity and age with a government ID and a selfie before they can chat or book, and a person approves each Phriend profile before it shows. Verified profiles carry the badge.` },
    ],
  };
}

/** JSON-LD for a landing page: breadcrumbs, the service offered, the Phriends listed, and the FAQ. */
export function landingJsonLd(c: Category, path: string, phriends: Phriend[], copy: ReturnType<typeof landingCopy>, city?: CityPage) {
  const url = `${SITE_URL}${path}`;
  const crumbs = [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    ...(city ? [{ "@type": "ListItem", position: 2, name: city.name, item: `${SITE_URL}/${city.slug}` }] : [{ "@type": "ListItem", position: 2, name: "Rent a friend", item: `${SITE_URL}/rent-a-friend/${activitySlug(c.label)}` }]),
    { "@type": "ListItem", position: city ? 3 : 2, name: copy.h1, item: url },
  ].filter((x, i, a) => a.findIndex((y) => y.item === x.item) === i);
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "BreadcrumbList", itemListElement: crumbs },
      {
        "@type": "Service",
        name: copy.h1,
        serviceType: `${c.label} companion, paid by the hour`,
        provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        areaServed: city ? { "@type": "City", name: city.name, containedInPlace: { "@type": "Country", name: "Philippines" } } : { "@type": "Country", name: "Philippines" },
        url,
        ...(phriends.length ? { offers: { "@type": "AggregateOffer", priceCurrency: "PHP", lowPrice: Math.min(...phriends.map((p) => p.pricePerHour)), highPrice: Math.max(...phriends.map((p) => p.pricePerHour)), offerCount: phriends.length } } : {}),
      },
      {
        "@type": "ItemList",
        name: `${c.label} Phriends${city ? ` in ${city.name}` : ""}`,
        itemListElement: phriends.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: appProfileUrl(p), name: p.workName, image: p.imagePath[0] })),
      },
      { "@type": "FAQPage", mainEntity: copy.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    ],
  });
}

export const LANDING_CTA = { browse: (c: Category) => appCategoryUrl(c), become: POST_URL };
