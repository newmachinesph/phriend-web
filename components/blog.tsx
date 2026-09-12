import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { APP_URL, POST_URL } from "@/lib/site";

/** Building blocks for blog articles: figures, phone mockups, callouts, steps and the closing call to action. */

export function Figure({ src, alt, caption, priority = false }: { src: string; alt: string; caption?: string; priority?: boolean }) {
  return (
    <figure className="my-10">
      <div className="relative aspect-[16/9] overflow-hidden rounded-3xl shadow-card">
        <Image src={src} alt={alt} width={1600} height={900} sizes="(min-width: 768px) 768px, 100vw" className="h-full w-full object-cover" priority={priority} />
      </div>
      {caption && <figcaption className="mt-3 text-center text-sm font-semibold text-muted">{caption}</figcaption>}
    </figure>
  );
}

/** Two app screenshots side by side in phone frames, with a caption under each. */
export function PhoneShots({ shots }: { shots: { src: string; alt: string; caption: string }[] }) {
  return (
    <div className="my-10 rounded-3xl bg-navy-gradient px-6 py-10 sm:px-10">
      <div className="mx-auto grid max-w-2xl gap-8 sm:grid-cols-2">
        {shots.map((s) => (
          <figure key={s.src} className="mx-auto w-full max-w-[260px]">
            <div className="rounded-[2.2rem] bg-[#081a3f] p-2.5 shadow-float">
              <div className="relative aspect-[390/780] overflow-hidden rounded-[1.8rem] bg-white">
                <Image src={s.src} alt={s.alt} width={390} height={780} sizes="260px" className="h-full w-full object-cover object-top" />
              </div>
            </div>
            <figcaption className="mt-4 text-center text-sm font-bold text-white/85">{s.caption}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export function Callout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <aside className="my-8 rounded-2xl border-2 border-brand/30 bg-brand-soft px-6 py-5">
      <p className="text-sm font-extrabold uppercase tracking-wider text-brand-text">{title}</p>
      <div className="mt-2 text-[17px] leading-relaxed text-ink">{children}</div>
    </aside>
  );
}

export function Steps({ steps }: { steps: { icon: LucideIcon; title: string; text: string }[] }) {
  return (
    <ol className="my-10 grid gap-5 sm:grid-cols-3">
      {steps.map((s, i) => (
        <li key={s.title} className="flex flex-col rounded-3xl border border-line bg-white px-7 py-8 shadow-card">
          <div className="flex items-center justify-between">
            <span className="grid size-12 place-items-center rounded-2xl bg-brand-soft text-brand-text">
              <s.icon size={24} strokeWidth={2} aria-hidden="true" />
            </span>
            <span className="font-display text-3xl font-semibold text-line">{String(i + 1).padStart(2, "0")}</span>
          </div>
          <h3 className="mt-6 font-display text-xl font-semibold text-ink">{s.title}</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-body">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

/** Worked earnings examples: what a session is, the rate, and the take-home. Phriend takes no cut, so the take-home is the total. */
export function RateTable({ rows }: { rows: { session: string; hours: number; rate: number }[] }) {
  const peso = (n: number) => `₱${n.toLocaleString("en-PH")}`;
  return (
    <div className="my-10 overflow-hidden rounded-3xl border border-line shadow-card">
      <table className="w-full text-left text-[15px]">
        <thead className="bg-surface text-xs font-extrabold uppercase tracking-wider text-muted">
          <tr>
            <th className="px-5 py-3">Session</th>
            <th className="px-5 py-3">Hours</th>
            <th className="px-5 py-3">Your rate</th>
            <th className="px-5 py-3 text-right">You keep</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rows.map((r) => (
            <tr key={r.session} className="bg-white">
              <td className="px-5 py-3.5 font-bold text-ink">{r.session}</td>
              <td className="px-5 py-3.5 text-body">{r.hours}</td>
              <td className="px-5 py-3.5 text-body">{peso(r.rate)}/hr</td>
              <td className="px-5 py-3.5 text-right font-display text-lg font-semibold text-brand-text">{peso(r.hours * r.rate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="bg-surface px-5 py-3 text-sm font-semibold text-muted">Cash in person: 50% when you meet, 50% after. Phriend takes no cut.</p>
    </div>
  );
}

export function ArticleCta({ category, headline = "Put your camera on Phriend this week." }: { category: { path: string; label: string }; headline?: string }) {
  return (
    <div className="mt-14 rounded-3xl bg-navy-gradient px-6 py-10 text-white sm:px-10">
      <p className="text-sm font-extrabold uppercase tracking-wider text-brand-light">Ready when you are</p>
      <h2 className="mt-2 font-display text-3xl font-semibold leading-tight sm:text-4xl">{headline}</h2>
      <p className="mt-3 max-w-xl text-white/80">
        Verify your ID in about two minutes, list your services and rates, and take bookings that fit around your day job. Your profile is reviewed by a person before it goes live.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href={POST_URL} className="btn-primary rounded-full px-6 py-3 font-bold">
          Become a Phriend <ArrowRight size={18} className="ml-1.5" aria-hidden="true" />
        </a>
        <a href={`${APP_URL}${category.path}`} className="btn-secondary inline-flex items-center rounded-full px-6 py-3 font-bold">
          See {category.label} Phriends
        </a>
      </div>
    </div>
  );
}

export function BackToBlog() {
  return (
    <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-text hover:underline">
      <ArrowRight size={16} className="rotate-180" aria-hidden="true" /> All articles
    </Link>
  );
}
