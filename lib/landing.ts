import { formatPeso, type Category, type ServiceCard } from "@/lib/phriend2";
import type { CityPage } from "@/lib/cities";
import { appServiceUrl, categoryPath, cityPath } from "@/lib/links";
import { SITE_NAME, SITE_URL } from "@/lib/site";

/** The copy and JSON-LD of a category (and category-in-city) landing page: several hundred words specific to the service, not a filter grid. */

export const list = (xs: readonly string[]) => (xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`);

/** Lowercase a label mid-sentence, keeping acronyms (TV, BIR, DJ), inner capitals (TikTok, K-pop) and proper nouns. */
const PROPER = /^(Filipino|Christmas|Korean|Mandarin|Japanese|English|Tagalog|Cebuano|Chinese|Spanish)$/;
const keepCase = (w: string) => /^[A-Z0-9]{2,}$/.test(w) || /[a-z][A-Z]/.test(w) || /^[A-Z]-/.test(w) || PROPER.test(w);
export const inSentence = (label: string) =>
  label
    .split(" ")
    .map((w) => (keepCase(w) ? w : w.toLowerCase()))
    .join(" ");

/** The lowest price among the cards, in centavos (null when there are none). */
const lowest = (services: readonly ServiceCard[]) => (services.length ? Math.min(...services.map((s) => s.priceCentavos)) : null);

export function landingCopy(c: Category, city: CityPage | undefined, services: readonly ServiceCard[]) {
  const where = city ? city.name : "the Philippines";
  const name = inSentence(c.label);
  const min = lowest(services);
  const from = min !== null ? `Services listed here currently start at ${formatPeso(min)}` : "";
  const cities = [...new Set(services.map((s) => s.city?.name).filter((n): n is string => Boolean(n)))].slice(0, 5);
  const pricing = "Each service shows its price per job, per hour or per session, and any minimum booking, before you book.";
  return {
    h1: city ? `${c.label} services in ${city.name}` : `${c.label} services in the Philippines`,
    intro: city
      ? `Need ${name} in ${city.name}? Browse ${name} services from verified providers who work there, plus online services that cover the whole country. ${city.name} is ${city.blurb}. Book the service and chat with the provider in the Phriend app, and pay the provider directly, as you agree with them.`
      : `Book ${name} services from verified providers. Each service shows its own price, photos of the work, whether it is done online, in person or both, and the area it covers. Book it and chat with the provider in the Phriend app, and pay the provider directly, as you agree with them.`,
    what: `Every ${name} service on Phriend is listed on its own, with a price per job, per hour or per session, up to six photos of the work, a visit type (online, in person or hybrid), its own schedule and its own area: listed areas, a whole city, or nationwide for online work. The provider's profile shows their name, a title, the languages they speak, the Verified badge and a badge for each document that was checked${cities.length ? `. Right now there are ${name} services based in ${list(cities)}` : ""}.`,
    how: [
      "Browse the services below or open the full list in the app. Compare prices, photos, visit type and area, and read the reviews.",
      "Message the provider in the app. Their FAQ answers reply instantly to the usual questions, like the minimum booking and where they work.",
      "Send a booking request for a time in the service's schedule. For an at-home service, pick one of your saved addresses; online services need none. The provider accepts or declines.",
      "The work gets done, online or in person. Pay the provider directly, as you agreed, then leave a review.",
    ],
    rates: `Each provider sets the price of each service, per job, per hour or per session, depending on the work. ${from ? `${from} in ${where}. ` : ""}The price and any minimum booking show on the service before you book. Phriend takes no cut, so what you pay goes to the provider.`,
    trust: "Every provider listed here is verified with a government ID and a selfie, and document badges show which clearances, certificates or business documents were also checked. Each listing is reviewed before it shows, reviews come only from bookings, and anyone can be reported or blocked from the chat.",
    faq: [
      { q: `How much does ${name} cost in ${where}?`, a: `${from ? `${from}. ` : ""}${pricing}` },
      { q: `Can ${name} be done online?`, a: `Some ${name} services are online or hybrid; the visit type shows on each service. Online services can be booked from anywhere in the Philippines and need no address.` },
      { q: "What does the Verified badge mean?", a: "The provider's government ID and a selfie were checked. Document badges show the clearances, certificates or business documents that were also checked." },
    ],
  };
}

export const escapeJsonLd = (s: string) => s.replace(/</g, "\\u003c"); // titles come from the API

/** Service cards as an ItemList (no Person markup: the listing unit is the service). */
export const itemListJsonLd = (name: string, services: readonly ServiceCard[]) => ({
  "@type": "ItemList",
  name,
  itemListElement: services.map((s, i) => ({ "@type": "ListItem", position: i + 1, url: appServiceUrl(s.code), name: s.title })),
});

/** JSON-LD for a landing page: breadcrumbs, the service offered, the services listed, and the FAQ. */
export function landingJsonLd(c: Category, path: string, services: readonly ServiceCard[], copy: ReturnType<typeof landingCopy>, city?: CityPage) {
  const url = `${SITE_URL}${path}`;
  const prices = services.map((s) => s.priceCentavos / 100);
  const crumbs = city
    ? [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: city.name, item: `${SITE_URL}${cityPath(city)}` },
        { "@type": "ListItem", position: 3, name: copy.h1, item: url },
      ]
    : [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
        { "@type": "ListItem", position: 3, name: copy.h1, item: `${SITE_URL}${categoryPath(c)}` },
      ];
  return escapeJsonLd(
    JSON.stringify({
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
        itemListJsonLd(`${c.label} services${city ? ` in ${city.name}` : ""}`, services),
        { "@type": "FAQPage", mainEntity: copy.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
      ],
    }),
  );
}
