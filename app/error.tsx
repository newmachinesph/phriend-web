"use client";

import Link from "next/link";
import { APP_URL } from "@/lib/site";
import { ButtonLink, Container } from "@/components/ui";

/**
 * A page that could not load (usually api2 not answering on a page with nothing cached yet). It shows no error detail:
 * the message and digest stay in the server log.
 */
export default function PageError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Container as="main" id="main" className="flex-1 pb-16 pt-12 sm:py-24">
      <h1 className="max-w-2xl font-display text-h1 font-bold text-ink">This page is taking a moment</h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed">
        We couldn&apos;t load it just now. Try again in a minute, or browse the services in the app.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button type="button" onClick={reset} className="btn-primary inline-flex h-11 shrink-0 items-center justify-center rounded-control px-5 font-extrabold">
          Try again
        </button>
        <ButtonLink href={APP_URL} variant="secondary">
          Open the app
        </ButtonLink>
      </div>
      <p className="mt-10 text-sm font-bold">
        <Link href="/" className="text-brand-text underline underline-offset-4">
          Go to the home page
        </Link>
      </p>
    </Container>
  );
}
