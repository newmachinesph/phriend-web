import type { Metadata } from "next";
import Link from "next/link";
import { APP_URL } from "@/lib/site";
import { ButtonLink, Container } from "@/components/ui";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

const LINKS = [
  { href: "/services", label: "All services" },
  { href: "/occasions", label: "Occasions" },
  { href: "/blog", label: "Blog" },
  { href: "/safety", label: "Trust and safety" },
];

/** The site's 404: a short note and the places people usually meant to go. */
export default function NotFound() {
  return (
    <Container as="main" id="main" className="flex-1 pb-16 pt-12 sm:py-24">
      <p className="text-sm font-extrabold uppercase tracking-wider text-brand-text">404</p>
      <h1 className="mt-3 max-w-2xl font-display text-h1 font-bold text-ink">This page could not be found</h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed">
        The link may be old or mistyped. Find a service from the list, or open the app and search for what you need.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <ButtonLink href={APP_URL}>Open the app</ButtonLink>
        <ButtonLink href="/" variant="secondary">
          Go to the home page
        </ButtonLink>
      </div>
      <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold">
        {LINKS.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-brand-text underline underline-offset-4">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
