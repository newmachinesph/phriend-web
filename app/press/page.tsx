import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Download, Mail, MapPin, Wallet, type LucideIcon } from "lucide-react";
import { Logo } from "@/components/site-header";
import { API_URL, APP_URL, apiHeaders, breadcrumbJsonLd, cdn, CONTACT_EMAIL, pageMeta, SITE_URL } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Press kit: logos, facts and photos",
  description:
    "Phriend press kit: boilerplate, fast facts, product features, logo downloads, brand colors, product images, safety stance, quotable lines and media contact.",
  path: "/press",
});

const BOILERPLATE =
  "Phriend is a Philippine app for booking ID-verified local guides and pros by the hour: city and food tours, photo and video shoots, tutoring and lessons, hiking guides, drivers, errand helpers and more. Members are 18 and older, ID-verified through Didit, meet in public places only, and pay 50% upfront, 50% after: cash in person on a first meetup, e-wallet only once they already trust each other. Phriend is a platform only and is not a party to the meetups. It launched in 2026 in the Philippines. The company site is phriend.app and the app runs in the browser at web.phriend.app.";

const facts = (n: number): { label: string; value: string }[] => [
  { label: "Founded", value: "2026" },
  { label: "Based in", value: "Metro Manila, nationwide" },
  { label: "Activity categories", value: `${n}+` },
  { label: "Typical rate", value: "₱300 to ₱1,500 / hr" },
  { label: "ID verification", value: "Didit" },
  { label: "Meet-ups", value: "Public places only" },
  { label: "Age", value: "18+ only" },
];

const product = (n: number) => [
  `Profiles: ${n}+ activity categories with sub-activities, up to 8 photos, languages, non-negotiables pinned to the top, an hourly rate, and a seven-point Phriend agreement plus ID verification before a profile goes live. Profiles run for 30 days and are renewed by saving them again.`,
  "Bookings: a client picks a service, a date, start time, 1 to 8 hours, a public meeting place and a note, up to 60 days ahead; the Phriend accepts or declines; either side can cancel with a reason and mark the meetup completed afterwards. Every booking has Add to Google Calendar and an .ics download.",
  "Schedule: Phriends set weekly days and hours and lock out dates up to a year ahead. Requests outside those hours, on a locked-out date or over an accepted booking are refused.",
  "Services and rates: each Phriend lists up to 12 services with their own price per hour or per session, a minimum number of hours and an optional photo.",
  "Manage dashboard for Phriends: profile views, favorites, reviews, bookings by status, an earnings estimate (cash, paid in person), private notes linkable to a booking, and an activity log.",
  "Reviews: any signed-in member can review a Phriend with a star rating, text and up to 4 photos, one review per member per Phriend.",
  "Gigs: clients post what they need with an activity, city, budget per hour, date and details; Phriends with a live profile mark interest and chat; gigs can be reported.",
  "Chat: photos, emojis, saved replies, delete for everyone, archive, block, typing and online indicators, and a profanity filter that warns twice, then mutes for escalating periods.",
  "Notifications: an in-app bell and an email for every booking update and new review. Members delete their own account in the app by typing DELETE.",
  "Safety: Google or email sign-in, ID verification through Didit, sample profiles marked as samples and unbookable, and moderation with an AI first pass on reports, profiles and gigs, a human review queue and an audit log.",
  "Payments: none in the app. 50% in cash on a first meetup, 50% after; e-wallets only for repeat, trusted Phriends.",
];

const MARK_FILES = [
  { href: cdn("/brand/logo-mark.svg"), label: "SVG" },
  { href: cdn("/brand/logo-mark.png"), label: "PNG, 894×975" },
];
const HORIZONTAL_FILES = [{ href: cdn("/brand/logo-horizontal.png"), label: "PNG, 1774×470" }];

const COLORS: { name: string; hex: string; use: string }[] = [
  { name: "Navy", hex: "#0d2251", use: "Headings, hero, wordmark" },
  { name: "Orange", hex: "#fe6138", use: "Buttons, highlights, logo mark" },
  { name: "Mango", hex: "#ffb627", use: "Stars and accents" },
  { name: "Cream", hex: "#fdfbf7", use: "Soft backgrounds" },
];

const USAGE = [
  "Keep clear space around the logo, at least a quarter of its height on every side.",
  "Do not recolor, stretch, rotate, outline or redraw it. On dark backgrounds, keep it on a white or cream tile as shown above.",
  "Do not use the logo or the name to imply that Phriend endorses, sponsors or partners with a product, person or event.",
];

const SCREENSHOTS: { src: string; alt: string; caption: string }[] = [
  {
    src: cdn("/photos/shot-home-v3.png"),
    alt: "The Phriend home screen: a search bar, service categories and verified local pros with their hourly rate",
    caption: "Home: search and verified pros",
  },
  {
    src: cdn("/photos/shot-post-v3.png"),
    alt: "A tour guide's listing showing photos, the services they offer, the city and the hourly rate, with a Book button",
    caption: "Listing: services, rate, booking",
  },
  {
    src: cdn("/photos/shot-hiking-v3.png"),
    alt: "A hiking guide's listing with trail photos, the routes they guide and the hourly rate",
    caption: "Listing: a hiking guide",
  },
];

const PHOTOS: { src: string; alt: string; caption: string; size: string }[] = [
  {
    src: cdn("/photos/life-food-trip.jpg"),
    alt: "A food-tour guide and their client laughing over grilled skewers at a night street-food stall, a jeepney behind them",
    caption: "Night street-food trip",
    size: "JPG, 1536×1024",
  },
  {
    src: cdn("/photos/life-hiking.jpg"),
    alt: "Three people taking a selfie on a hilltop trail above rice terraces and the sea",
    caption: "Hiking day with a Phriend",
    size: "JPG, 1536×1024",
  },
  {
    src: cdn("/photos/life-verified.jpg"),
    alt: "A smiling woman in a cafe holding her phone and giving a thumbs up",
    caption: "Verified and ready to meet",
    size: "JPG, 1024×1536, portrait",
  },
];

const STANCE: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: BadgeCheck,
    title: "Verified members, 18+ only",
    text: "Members submit a government ID and a selfie through Didit before they get the badge. Phriend is strictly 18+ and strictly a services marketplace: dating, romantic or sexual services get an account removed.",
  },
  {
    icon: MapPin,
    title: "Public places, agreed people",
    text: "Every meetup happens in a public place, and who is coming is agreed in the chat. If the other member arrives with extra people not agreed in chat, the rule is simple: be prudent, do not proceed, leave and report.",
  },
  {
    icon: Wallet,
    title: "Cash first, platform only",
    text: "On a first meetup the client pays 50% in cash on arrival and 50% after, never more than half upfront. Phriend does not process payments, is not a party to any meetup and is not liable for what happens between members.",
  },
];

const QUOTES = [
  "Paying a local to show you the best lechon in Cebu is not strange. Tour guides, photographers and tutors have always worked this way. Phriend puts them on one screen.",
  "We wrote the rules before we wrote the code: public places, verified IDs, half in cash when you meet, leave if something is off. Safety is the product.",
  "For many Filipinos this is a side income built on what they already have: their city, their free time and their stories. Phriend takes no cut, so they keep all of it.",
];

const eyebrow = "text-sm font-extrabold uppercase tracking-wider text-brand-text";
const h2 = "mt-2 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl";
const pill =
  "inline-flex items-center gap-1.5 rounded-full border-2 border-line bg-white px-3.5 py-1.5 text-sm font-bold text-ink transition-colors hover:border-brand hover:bg-brand-soft";

function AssetCard({
  title,
  dark = false,
  files,
  children,
}: {
  title: string;
  dark?: boolean;
  files: { href: string; label: string }[];
  children: ReactNode;
}) {
  return (
    <li className="overflow-hidden rounded-3xl border border-line bg-white shadow-card">
      <div className={`grid h-48 place-items-center p-6 ${dark ? "bg-navy" : "bg-surface"}`}>
        {dark ? <div className="rounded-2xl bg-white px-6 py-4">{children}</div> : children}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 p-5">
        <h3 className="font-extrabold text-ink">{title}</h3>
        <div className="flex flex-wrap gap-2">
          {files.map((f) => (
            <a key={f.href} href={f.href} download className={pill}>
              <Download size={14} aria-hidden="true" />
              {f.label}
            </a>
          ))}
        </div>
      </div>
    </li>
  );
}

function Mark({ height }: { height: number }) {
  return (
    <Image
      src={cdn("/brand/logo-mark.png")}
      alt="Phriend logo mark"
      width={Math.round((height * 894) / 975)}
      height={height}
      className="w-auto"
      style={{ height }}
    />
  );
}

/** Live category count from the app, refreshed hourly, so the numbers never drift from the product. */
async function categoryCount() {
  try {
    const res = await fetch(`${API_URL}/api/categories`, { headers: apiHeaders(), next: { revalidate: 3600 } });
    const d = (await res.json()) as { categories?: unknown[] };
    return d.categories?.length || 46;
  } catch {
    return 46;
  }
}

export default async function PressPage() {
  const n = await categoryCount();
  return (
    <main id="main" className="flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd("Press kit", "/press") }} />
      {/* Hero + boilerplate */}
      <section className="bg-navy-gradient text-white">
        <div className="mx-auto w-full max-w-6xl px-5 pb-16 pt-14 sm:px-8 sm:pt-20 lg:pb-20">
          <p className="text-sm font-extrabold uppercase tracking-wider text-brand-light">Press kit</p>
          <h1 className="mt-3 font-display text-[44px] font-semibold leading-[1.02] tracking-tight sm:text-6xl">
            Phriend press kit
          </h1>
          <p id="boilerplate" className="mt-6 max-w-3xl text-lg leading-relaxed text-white/85">
            {BOILERPLATE}
          </p>
          <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[15px] font-bold">
            <div className="flex gap-2">
              <dt className="text-white/60">Website</dt>
              <dd>
                <a href={SITE_URL} className="underline underline-offset-4 hover:text-brand-light">
                  phriend.app
                </a>
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-white/60">App</dt>
              <dd>
                <a href={APP_URL} className="underline underline-offset-4 hover:text-brand-light">
                  web.phriend.app
                </a>
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-white/60">Launch</dt>
              <dd>2026, Philippines</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Fast facts */}
      <section id="facts" aria-labelledby="facts-title">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <p className={eyebrow}>Fast facts</p>
          <h2 id="facts-title" className={h2}>
            Phriend in numbers.
          </h2>
          <dl className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            {facts(n).map((f) => (
              <div key={f.label} className="rounded-2xl border border-line bg-white p-4 shadow-card">
                <dt className="text-xs font-extrabold uppercase tracking-wider text-muted">{f.label}</dt>
                <dd className="mt-1 text-xl font-extrabold text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>

          <h3 className="mt-12 font-display text-2xl font-semibold text-ink">Product</h3>
          <ul className="mt-4 max-w-3xl space-y-3 text-[15px] font-semibold text-ink">
            {product(n).map((p) => (
              <li key={p} className="flex items-start gap-2.5">
                <BadgeCheck size={20} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Brand assets */}
      <section id="brand" aria-labelledby="brand-title" className="bg-surface">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <p className={eyebrow}>Brand assets</p>
          <h2 id="brand-title" className={h2}>
            Logos, colors and type.
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            <AssetCard title="Logo mark on light" files={MARK_FILES}>
              <Mark height={96} />
            </AssetCard>
            <AssetCard title="Logo mark on navy" dark files={MARK_FILES}>
              <Mark height={72} />
            </AssetCard>
            <AssetCard title="Horizontal logo on light" files={HORIZONTAL_FILES}>
              <Logo height={48} />
            </AssetCard>
            <AssetCard title="Horizontal logo on navy" dark files={HORIZONTAL_FILES}>
              <Logo height={40} />
            </AssetCard>
          </ul>

          <h3 className="mt-12 font-display text-2xl font-semibold text-ink">Colors</h3>
          <ul className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
            {COLORS.map((c) => (
              <li key={c.hex} className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
                <div className="h-20" style={{ background: c.hex }} />
                <div className="p-4">
                  <p className="font-extrabold text-ink">{c.name}</p>
                  <p className="font-mono text-sm font-bold text-body">{c.hex}</p>
                  <p className="mt-1 text-sm text-muted">{c.use}</p>
                </div>
              </li>
            ))}
          </ul>

          <h3 className="mt-12 font-display text-2xl font-semibold text-ink">Typography</h3>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            <li className="rounded-2xl border border-line bg-white p-6 shadow-card">
              <p className="text-xs font-extrabold uppercase tracking-wider text-muted">Display · Fredoka</p>
              <p className="mt-3 font-display text-4xl font-semibold leading-tight text-ink">Book local guides and pros</p>
            </li>
            <li className="rounded-2xl border border-line bg-white p-6 shadow-card">
              <p className="text-xs font-extrabold uppercase tracking-wider text-muted">Body · Nunito</p>
              <p className="mt-3 text-lg leading-relaxed">
                Tours, photo shoots, lessons, hikes, errands and driving. Booked by the hour, met in public, paid in person.
              </p>
            </li>
          </ul>
          <p className="mt-3 text-sm text-muted">Both typefaces are free on Google Fonts.</p>

          <h3 className="mt-12 font-display text-2xl font-semibold text-ink">Usage rules</h3>
          <ul className="mt-4 space-y-3 text-[15px] font-semibold text-ink">
            {USAGE.map((u) => (
              <li key={u} className="flex items-start gap-2.5">
                <BadgeCheck size={20} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
                {u}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Product images */}
      <section id="images" aria-labelledby="images-title">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <p className={eyebrow}>Product images</p>
          <h2 id="images-title" className={h2}>
            Screenshots and lifestyle photos.
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed">
            Free to use in coverage of Phriend, credit &quot;Phriend&quot;. Previews are cropped to fit; every image
            links to the original file.
          </p>

          <h3 className="mt-10 font-display text-2xl font-semibold text-ink">App screenshots</h3>
          <ul className="mt-4 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            {SCREENSHOTS.map((s) => (
              <li key={s.src}>
                <figure>
                  <a href={s.src} download className="block overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
                    <Image
                      src={s.src}
                      alt={s.alt}
                      width={430}
                      height={900}
                      sizes="(min-width: 640px) 192px, 45vw"
                      className="h-auto w-full"
                    />
                  </a>
                  <figcaption className="mt-2 text-sm font-semibold text-muted">
                    {s.caption} · PNG, 1720×3600
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>

          <h3 className="mt-10 font-display text-2xl font-semibold text-ink">Lifestyle photos</h3>
          <ul className="mt-4 grid gap-4 sm:grid-cols-3">
            {PHOTOS.map((p) => (
              <li key={p.src}>
                <figure>
                  <a href={p.src} download className="relative block aspect-[3/2] overflow-hidden rounded-2xl shadow-card">
                    <Image
                      src={p.src}
                      alt={p.alt}
                      width={1536}
                      height={1024}
                      sizes="(min-width: 1024px) 352px, (min-width: 640px) 33vw, 100vw"
                      className="h-full w-full object-cover"
                    />
                  </a>
                  <figcaption className="mt-2 text-sm font-semibold text-muted">
                    {p.caption} · {p.size}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Safety and community stance */}
      <section id="stance" aria-labelledby="stance-title" className="bg-navy-soft">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <p className={eyebrow}>Safety and community</p>
          <h2 id="stance-title" className={h2}>
            Where Phriend stands.
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {STANCE.map((s) => (
              <li key={s.title} className="rounded-2xl border border-line bg-white p-5 shadow-card">
                <s.icon size={22} className="text-brand" aria-hidden="true" />
                <h3 className="mt-3 font-extrabold text-ink">{s.title}</h3>
                <p className="mt-1 text-[15px] leading-relaxed">{s.text}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/safety"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-navy px-6 py-3 font-bold text-white transition-colors hover:bg-navy-light"
            >
              Safety and transaction rules <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link
              href="/community-guidelines"
              className="btn-secondary inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-bold"
            >
              Community guidelines <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Quotable lines */}
      <section id="quotes" aria-labelledby="quotes-title">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <p className={eyebrow}>Quotable lines</p>
          <h2 id="quotes-title" className={h2}>
            Attribute to the Phriend team.
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {QUOTES.map((q) => (
              <li key={q} className="flex flex-col rounded-3xl border border-line bg-white p-6 shadow-card">
                <figure className="flex h-full flex-col">
                  <blockquote className="flex-1 text-[17px] leading-relaxed text-ink">
                    <span aria-hidden="true" className="font-display text-4xl leading-none text-brand">
                      &ldquo;
                    </span>
                    <p>{q}</p>
                  </blockquote>
                  <figcaption className="mt-4 text-sm font-extrabold uppercase tracking-wider text-muted">
                    Phriend team
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Media contact */}
      <section id="contact" aria-labelledby="contact-title" className="bg-surface">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="grid gap-8 rounded-[2rem] border border-line bg-white p-8 shadow-card sm:p-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className={eyebrow}>Media contact</p>
              <h2 id="contact-title" className={h2}>
                Interviews, quotes, assets.
              </h2>
              <p className="mt-4 leading-relaxed">
                One inbox for all media enquiries. We reply within 2 business days.
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="btn-primary mt-6 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-lg font-bold"
              >
                <Mail size={20} aria-hidden="true" />
                {CONTACT_EMAIL}
              </a>
            </div>
            <div>
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-ink">Social</h3>
              <ul className="mt-3 space-y-2 text-[15px] font-bold">
                <li>
                  <a href="https://facebook.com/phriendapp" rel="noreferrer" className="text-brand-text underline underline-offset-4">
                    facebook.com/phriendapp
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com/phriendapp" rel="noreferrer" className="text-brand-text underline underline-offset-4">
                    instagram.com/phriendapp
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
