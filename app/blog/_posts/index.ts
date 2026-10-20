import type { ComponentType } from "react";
import { photographers } from "./photographers";

/** One article per service niche: the blog is the funnel that invites people with that skill to list their services. */
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
  /** The app category the article recruits for; the closing call to action links to its landing page. */
  category: { slug: string; path: string; label: string };
  tags: string[];
  hero: { src: string; alt: string };
  faq: { q: string; a: string }[];
  Body: ComponentType;
};

export const POSTS: Post[] = [photographers];

export const findPost = (slug: string) => POSTS.find((p) => p.slug === slug);
