import type { ReactNode } from "react";
import { breadcrumbJsonLd } from "@/lib/site";

/** Shared shell for long-form pages: eyebrow, display title, updated date, then `.legal` prose styles from globals.css. */
export function Legal({
  eyebrow,
  title,
  path,
  updated,
  intro,
  summary,
  children,
}: {
  eyebrow: string;
  title: string;
  /** Route path, e.g. "/safety". Emits Home › Page breadcrumb JSON-LD. */
  path?: string;
  updated?: string;
  intro?: string;
  /** One-paragraph "In short" answer for readers and answer engines. */
  summary?: string;
  children: ReactNode;
}) {
  return (
    <main id="main" className="mx-auto w-full max-w-3xl flex-1 px-5 pb-12 pt-8 sm:px-8 sm:py-16">
      {path && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(title, path) }} />}
      <header className="border-b border-line pb-8">
        <p className="text-sm font-extrabold uppercase tracking-wider text-brand-text">{eyebrow}</p>
        <h1 className="mt-2 font-display text-h1 font-bold text-ink">{title}</h1>
        {updated && (
          <p className="mt-3 text-sm font-bold text-muted">
            Last updated{" "}
            {new Date(updated).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}
          </p>
        )}
        {intro && <p className="mt-5 text-lg leading-relaxed">{intro}</p>}
        {summary && (
          <p id="in-short" className="mt-5 rounded-2xl border border-brand/30 bg-brand-soft px-5 py-4 text-base leading-relaxed">
            <strong className="text-ink">In short:</strong> {summary}
          </p>
        )}
      </header>
      <div className="legal pt-2">{children}</div>
    </main>
  );
}

/** Highlighted box for disclaimers, emergency numbers and similar callouts. */
export function Callout({ tone = "brand", children }: { tone?: "brand" | "verify"; children: ReactNode }) {
  const tones = {
    brand: "border-brand/30 bg-brand-soft",
    verify: "border-verify/30 bg-verify-soft",
  };
  return <div className={`my-6 rounded-2xl border px-5 py-4 text-base leading-relaxed ${tones[tone]}`}>{children}</div>;
}
