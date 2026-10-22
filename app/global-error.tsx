"use client";

import Link from "next/link";
import "./globals.css";

/**
 * The last-resort page when the root layout itself fails (its header reads api2's app config). Self-contained: its own
 * <html> and <body>, no error detail (the message and digest stay in the server log).
 */
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en-PH">
      <body className="flex min-h-full flex-col bg-white">
        <main id="main" className="mx-auto w-full max-w-3xl flex-1 px-5 pb-16 pt-12 sm:px-8 sm:py-24">
          <p className="text-sm font-extrabold uppercase tracking-wider text-brand-text">Phriend</p>
          <h1 className="mt-3 font-display text-h1 font-bold text-ink">This page is taking a moment</h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed">We couldn&apos;t load it just now. Try again in a minute, or browse the services in the app.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button type="button" onClick={reset} className="btn-primary inline-flex h-11 shrink-0 items-center justify-center rounded-control px-5 font-extrabold">
              Try again
            </button>
            <a href="https://web.phriend.app" className="btn-secondary inline-flex h-11 shrink-0 items-center justify-center rounded-control px-5 font-extrabold">
              Open the app
            </a>
          </div>
          <p className="mt-10 text-sm font-bold">
            <Link href="/" className="text-brand-text underline underline-offset-4">
              Go to the home page
            </Link>
          </p>
        </main>
      </body>
    </html>
  );
}
