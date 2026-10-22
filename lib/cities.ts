/** The six curated city pages (SPEC 13e §2.2). Their api2 ids are looked up by name (lib/catalogue.ts getCityIds). */
export const CITY_PAGES = [
  { slug: "manila", name: "Manila", blurb: "the capital, from Intramuros and Binondo to Ermita, Malate and the Bay area" },
  { slug: "quezon-city", name: "Quezon City", blurb: "the biggest city in Metro Manila, with Maginhawa, Katipunan, Cubao and the UP campus" },
  { slug: "cebu-city", name: "Cebu City", blurb: "the Queen City of the South, gateway to the beaches and islands of the Visayas" },
  { slug: "makati", name: "Makati", blurb: "the business district, with Ayala, Poblacion and Legazpi Village" },
  { slug: "davao-city", name: "Davao City", blurb: "the biggest city in Mindanao, with Samal Island and Mount Apo close by" },
  { slug: "baguio", name: "Baguio", blurb: "the summer capital in the mountains, with Session Road, Burnham Park and the strawberry farms" },
] as const;
export type CityPage = (typeof CITY_PAGES)[number];
export const findCity = (slug: string): CityPage | undefined => CITY_PAGES.find((c) => c.slug === slug);

/** "/aircon-cleaning-in-cebu-city" -> the category slug and the city, or null. */
export function parseCombo(segment: string): { categorySlug: string; city: CityPage } | null {
  for (const city of CITY_PAGES) {
    const suffix = `-in-${city.slug}`;
    if (segment.endsWith(suffix) && segment.length > suffix.length) return { categorySlug: segment.slice(0, -suffix.length), city };
  }
  return null;
}
