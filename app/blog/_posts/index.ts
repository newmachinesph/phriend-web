import type { ComponentType } from "react";
import { photographers } from "./photographers";

/** One article per activity niche: the blog is the funnel that invites people with that skill to become Phriends. */
export type Post = {
  slug: string;
  title: string;
  description: string;
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
