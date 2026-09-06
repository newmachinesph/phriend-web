import type { ReactNode } from "react";

/** Shared shell for long-form pages: eyebrow, display title, updated date, then `.legal` prose styles from globals.css. */
export function Legal({
  eyebrow,
  title,
  updated,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  updated?: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <main id="main" className="mx-auto w-full max-w-3xl flex-1 px-5 py-12 sm:px-8 sm:py-16">
      <header className="border-b border-line pb-8">
        <p className="text-sm font-extrabold uppercase tracking-wider text-brand-text">{eyebrow}</p>
        <h1 className="mt-2 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">{title}</h1>
        {updated && (
          <p className="mt-3 text-sm font-bold text-muted">
            Last updated{" "}
            {new Date(updated).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}
          </p>
        )}
        {intro && <p className="mt-5 text-lg leading-relaxed">{intro}</p>}
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
  return <div className={`my-6 rounded-2xl border px-5 py-4 text-[15px] leading-relaxed ${tones[tone]}`}>{children}</div>;
}
