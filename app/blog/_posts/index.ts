import type { ComponentType } from "react";
import { bookForSomeoneElse } from "./book-for-someone-else";
import { bookingAndPayment } from "./booking-and-payment";
import { cebuTourGuides } from "./cebu-tour-guides";
import { coachLessons } from "./coach-lessons";
import { driverDayOut } from "./driver-day-out";
import { errands } from "./errands";
import { helpForParentsFromAbroad } from "./help-for-parents-from-abroad";
import { hospitalAssistance } from "./hospital-assistance";
import { newToManila } from "./new-to-manila";
import { partyServices } from "./party-services";
import { photographers } from "./photographers";
import { seniorCareHelp } from "./senior-care-help";
import { seniorCareQuestions } from "./senior-care-questions";
import { studentSideIncome } from "./student-side-income";
import { verifiedProviders } from "./verified-providers";
import { visitingThePhilippines } from "./visiting-the-philippines";
import { workFromHome } from "./work-from-home";

/**
 * Guides for the two sides: `client` articles help someone book a kind of service, `provider` articles invite people
 * with that skill to list it. The audience picks the closing call to action.
 */
export type Post = {
  slug: string;
  title: string;
  description: string;
  /** Search and share copy: title under 60 characters, description under 150; the long title stays on the page as the H1. */
  seoTitle: string;
  seoDescription: string;
  /** Headline on the share card (two short lines); falls back to seoTitle. */
  ogTitle?: string;
  date: string; // ISO, Philippine time
  readingMinutes: number;
  audience: "client" | "provider";
  /** The category the article is about; the closing call to action links to its landing page on this site. */
  category: { slug: string; path: string; label: string };
  /** Other category slugs the article covers: their landing pages list it under Guides too. */
  related?: string[];
  tags: string[];
  hero: { src: string; alt: string };
  /** Heading over the FAQ, e.g. "Questions photographers ask". */
  faqTitle: string;
  faq: { q: string; a: string }[];
  /** Headline of the closing call to action; each audience has a default. */
  ctaHeadline?: string;
  Body: ComponentType;
};

export const POSTS: Post[] = [
  bookingAndPayment,
  verifiedProviders,
  bookForSomeoneElse,
  errands,
  hospitalAssistance,
  seniorCareHelp,
  seniorCareQuestions,
  helpForParentsFromAbroad,
  driverDayOut,
  workFromHome,
  newToManila,
  cebuTourGuides,
  visitingThePhilippines,
  coachLessons,
  partyServices,
  studentSideIncome,
  photographers,
];

export const findPost = (slug: string) => POSTS.find((p) => p.slug === slug);

/** The articles for a category landing page (at most 4): about the category first, then about its group, then naming it as related. */
export function guidesFor(categorySlug: string, groupSlug?: string): Post[] {
  const about = POSTS.filter((p) => p.category.slug === categorySlug);
  const group = POSTS.filter((p) => groupSlug && p.category.slug === groupSlug);
  const related = POSTS.filter((p) => p.related?.includes(categorySlug));
  return [...new Set([...about, ...group, ...related])].slice(0, 4);
}
