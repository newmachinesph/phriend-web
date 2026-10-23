// URLs of the earlier site that search engines still list, moved permanently to their v2 pages. Kept outside app/,
// components/ and lib/ because the old slugs carry words the copy test keeps out of the site's own text.
import type { NextConfig } from "next";

type Redirect = Awaited<ReturnType<NonNullable<NextConfig["redirects"]>>>[number];

/** Old article slug -> the article that replaced it (several old ones fold into one where the topics overlap). */
const ARTICLES: Record<string, string> = {
  "how-phriend-bookings-and-payment-work": "how-booking-and-payment-work-on-phriend",
  "is-phriend-safe": "how-phriend-verifies-providers",
  "is-rent-a-friend-legal-in-the-philippines": "how-phriend-verifies-providers",
  "legit-side-hustles-for-students-in-the-philippines": "side-income-services-students-can-offer",
  "how-much-do-tour-guides-charge-in-cebu": "tour-guide-prices-in-cebu",
  "how-ofws-can-arrange-company-for-aging-parents": "booking-help-for-your-parents-from-abroad",
  "companion-for-mom-or-dad-beyond-video-calls": "booking-help-for-your-parents-from-abroad",
  "who-can-accompany-your-parent-to-a-checkup": "hospital-assistance-for-a-checkup",
  "book-a-kasama-for-your-checkup": "hospital-assistance-for-a-checkup",
  "what-a-nonmedical-companion-can-help-with": "what-senior-care-help-covers",
  "arrange-company-for-a-senior-loved-one-while-working": "what-senior-care-help-covers",
  "questions-to-ask-before-booking-a-companion-for-your-parent": "questions-to-ask-before-booking-senior-care-help",
  "days-out-for-your-senior-parent-with-a-companion": "booking-a-driver-for-a-parents-day-out",
  "kasama-for-errands-tasks-you-can-book-a-companion-for": "errands-you-can-book-on-phriend",
  "need-a-shopping-buddy": "errands-you-can-book-on-phriend",
  "booking-a-companion-for-someone-else": "booking-a-service-for-someone-else",
  "working-from-home-coffee-break-with-company": "services-that-free-up-your-work-from-home-day",
  "new-to-manila-explore-with-a-local-companion": "new-to-manila-first-month-services",
  "just-moved-for-work-your-first-month-with-company": "new-to-manila-first-month-services",
  "your-first-gym-visit-doesnt-have-to-be-solo": "learn-a-sport-or-skill-with-a-coach",
  "bring-a-companion-to-your-first-class": "learn-a-sport-or-skill-with-a-coach",
  "visiting-the-philippines-solo": "visiting-the-philippines-book-a-local-tour-guide",
  "birthday-plans-fell-through": "plan-a-party-with-local-services",
  "attending-an-event-alone": "plan-a-party-with-local-services",
  "going-to-a-concert-alone": "plan-a-party-with-local-services",
};

/**
 * v1 built landing segments from the category label ("Laundry & Ironing" -> laundry-and-ironing); v2 uses the
 * category slug. Old segment -> v2 category, renamed or folded into the nearest category that is still listed.
 */
const CATEGORIES: Record<string, string> = {
  "laundry-and-ironing": "laundry",
  "senior-care-help": "senior-care",
  "host-and-emcee": "host-emcee",
  "baker-and-cakes": "baker",
  musician: "music",
  "hair-and-makeup": "hair-makeup",
  "nails-and-grooming": "nails-grooming",
  "arts-and-crafts": "arts-crafts",
  "swimming-lessons": "swimming",
  "pickleball-coach": "pickleball",
  "courier-and-pasabuy": "courier",
  "car-wash-and-detailing": "car-wash",
  "social-media-manager": "social-media",
  "language-exchange": "tutor",
  "study-coach": "tutor",
  "conversation-practice": "tutor",
  "eat-and-travel": "tour-guide",
  "walking-tour": "tour-guide",
  "museum-and-culture": "tour-guide",
  shopping: "errand",
};

/** Old segments whose category v2 dropped: to the service group that covers them (in a city, to the city page). */
const GROUPS: Record<string, string> = {
  workout: "sports-fitness",
  sports: "sports-fitness",
  "dive-and-freedive": "water-sports",
  "fishing-trip": "water-sports",
  hiking: "tours",
  camping: "tours",
  "out-of-town": "tours",
  "travel-abroad": "tours",
  "island-hopping": "tours",
  "motorbike-tour": "tours",
  trips: "tours",
};

/** Old segments with no v2 counterpart: to the services directory (in a city, to the city page). */
const RETIRED = ["cafe", "coworking", "lunch-and-dine", "virtual-meetup", "movie", "bar", "beach", "gamer", "board-games", "mindfulness", "model", "fortune-teller", "volunteer", "etc", "hangouts", "others", "karaoke"];

const CITIES = ["manila", "quezon-city", "cebu-city", "makati", "davao-city", "baguio"];

const moved = (source: string, destination: string): Redirect => ({ source, destination, permanent: true });

export const LEGACY_REDIRECTS: Redirect[] = [
  ...Object.entries(ARTICLES).map(([from, to]) => moved(`/blog/${from}`, `/blog/${to}`)),
  ...Object.entries(CATEGORIES).flatMap(([from, to]) => [moved(`/services/${from}`, `/services/${to}`), ...CITIES.map((c) => moved(`/${from}-in-${c}`, `/${to}-in-${c}`))]),
  ...Object.entries(GROUPS).flatMap(([from, to]) => [moved(`/services/${from}`, `/services/${to}`), ...CITIES.map((c) => moved(`/${from}-in-${c}`, `/${c}`))]),
  ...RETIRED.flatMap((from) => [moved(`/services/${from}`, "/services"), ...CITIES.map((c) => moved(`/${from}-in-${c}`, `/${c}`))]),
];
