import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import { BadgeCheck, Download, FileCheck, Mail, Wallet, type LucideIcon } from "lucide-react";
import { Logo } from "@/components/site-header";
import { API_PLATFORM, API_URL, APP_URL, apiHeaders, breadcrumbJsonLd, cdn, CONTACT_EMAIL, pageMeta, PROVIDER_URL, SITE_URL } from "@/lib/site";
import { ButtonLink, Container } from "@/components/ui";

export const metadata: Metadata = pageMeta({
  title: "Press kit: logos, facts and photos",
  description:
    "Phriend press kit: boilerplate, fast facts, product features, logo downloads, brand colors, product images, trust and safety stance, quotable lines and media contact.",
  path: "/press",
});

const BOILERPLATE =
  "Phriend is a local services marketplace in the Philippines. Clients browse services, not profiles: aircon cleaning and repair, appliance check-ups, bookkeeping and tax filing, tutoring, photography and video, driving, errands and deliveries, moving help, tour guiding, event coordination and more. Each service has its own price per job, per hour or per session, photos of the work, a visit type (online, in person or hybrid), its own schedule and its own area. Clients book and chat with the provider in the app and pay the provider directly, as agreed. Every provider is verified by Phriend's team, with document badges for the clearances and permits checked. Phriend launched in 2026. The client app is Phriend, also on the web at web.phriend.app; providers work in Phriend Provider at provider.phriend.app.";

const facts = (n: number): { label: string; value: string }[] => [
  { label: "Founded", value: "2026" },
  { label: "Based in", value: "Metro Manila, nationwide" },
  { label: "Service categories", value: `${n}+` },
  { label: "Pricing", value: "Per job, per hour or per session" },
  { label: "Visit types", value: "Online, in person or hybrid" },
  { label: "Verification", value: "Checked by Phriend's team" },
  { label: "Commission", value: "None yet" },
];

const product = (n: number) => [
  `Services: ${n}+ service categories. Each service has its own price per job, per hour or per session, up to 6 photos of the work, a visit type (online, in person or hybrid), its own schedule and its own area: listed areas, a whole city, or nationwide for online work.`,
  "Provider profiles: lean on purpose. One round face photo, a name, a title such as \"Online Bookkeeper\", a short About me without emojis, the languages spoken, the provider's services, a Verified badge and document badges.",
  "Verification: Phriend's team checks a government ID and a selfie for the Verified badge, and reviews optional documents for their own badges: NBI clearance, police clearance, barangay certificate, certificates, business documents and proof of address.",
  "Bookings: a client picks a time from the service's schedule and, for an at-home service, one of their saved addresses (Home, Work and more); online services need none. The provider accepts or declines; either side can cancel with a reason. Every booking can be added to a calendar.",
  "Chat: client and provider chat in the app, with photos, read receipts, archive and block. Providers set FAQ answers (how to pay, minimum booking, where they work) that reply instantly in the chat.",
  "Reviews: a star rating, text and up to 4 photos after a booking.",
  "Job posts: clients describe what they need with a budget and a date; providers reply in the chat.",
  "Phriend Provider: a separate provider app (coming to the app stores) and provider.phriend.app, where providers list services and manage bookings, earnings and verification.",
  "Moderation: every listing is approved by a person; reports get an automated first pass, a human review queue and an audit log.",
  "Payments: none in the app. Payment is agreed with the provider and paid to them directly.",
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

const SCREENSHOTS: { src: string; alt: string; caption: string; size: string }[] = [
  {
    src: "/screens/home-v8.png",
    alt: "The Phriend app home screen: a search bar asking what you need help with, and the service groups from errands to food and catering",
    caption: "Home: search and service groups",
    size: "PNG, 780×1688",
  },
];

const PHOTOS: { src: string; alt: string; caption: string; size: string }[] = [
  {
    src: "/groups/repairs.jpg",
    alt: "A technician cleaning a split-type aircon unit in a condo living room, his tool bag on a step ladder",
    caption: "Aircon cleaning at home",
    size: "JPG, 1280×720",
  },
  {
    src: "/groups/freelance.jpg",
    alt: "A bookkeeper working on a laptop at a desk by a window over the city, a notebook and an iced coffee beside her",
    caption: "Online bookkeeping",
    size: "JPG, 1280×720",
  },
  {
    src: "/groups/tutoring.jpg",
    alt: "A tutor going over math notes with a high-school student at a table by the window, a laptop showing a graph",
    caption: "Tutoring session",
    size: "JPG, 1280×720",
  },
];

const STANCE: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: BadgeCheck,
    title: "Verified providers",
    text: "Phriend's team checks a government ID and a selfie before a provider gets the Verified badge, and a person approves every listing. Phriend is strictly a marketplace for legitimate services; anything sexual or illegal gets an account removed.",
  },
  {
    icon: FileCheck,
    title: "Documents, shown as badges",
    text: "Providers can add an NBI clearance, a police clearance, a barangay certificate, certificates, business documents or proof of address. Each one our team checks shows as its own badge, so clients see exactly what was verified.",
  },
  {
    icon: Wallet,
    title: "Paid directly, platform only",
    text: "Payment is agreed with the provider and paid to them directly. Phriend does not process payments, is not a party to any booking and takes no commission yet.",
  },
];

const QUOTES = [
  "Finding a good aircon technician or a bookkeeper still runs on Facebook groups and a cousin's number. Phriend puts the service, the price and the photos of the work on one screen.",
  "Clients browse services, not people. Every service says what it costs, where it is done and when, so the first message is about the job.",
  "For many Filipinos a skill is a second income: fixing, teaching, shooting, filing taxes. Phriend takes no cut, so providers keep all of it.",
];

const eyebrow = "text-sm font-extrabold uppercase tracking-wider text-brand-text";
const h2 = "mt-2 font-display text-h2 font-bold text-ink";
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
    <li className="overflow-hidden rounded-card border border-line bg-white">
      <div className={`grid h-48 place-items-center p-6 ${dark ? "bg-navy" : "bg-surface"}`}>
        {dark ? <div className="rounded-card bg-white px-6 py-4">{children}</div> : children}
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
    const res = await fetch(`${API_URL}/api/categories?platform=${API_PLATFORM}`, { headers: apiHeaders(), next: { revalidate: 3600 } });
    const d = (await res.json()) as { categories?: unknown[] };
    return d.categories?.length || 60;
  } catch {
    return 60;
  }
}

export default async function PressPage() {
  const n = await categoryCount();
  return (
    <main id="main" className="flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd("Press kit", "/press") }} />
      {/* Hero + boilerplate */}
      <section className="bg-navy-gradient text-white">
        <Container className="pb-16 pt-14 sm:pt-20 lg:pb-20">
          <p className="text-sm font-extrabold uppercase tracking-wider text-brand-light">Press kit</p>
          <h1 className="mt-3 font-display text-display font-extrabold">
            Phriend press kit
          </h1>
          <p id="boilerplate" className="mt-6 max-w-3xl text-lg leading-relaxed text-white/85">
            {BOILERPLATE}
          </p>
          <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-base font-bold">
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
              <dt className="text-white/60">Providers</dt>
              <dd>
                <a href={PROVIDER_URL} className="underline underline-offset-4 hover:text-brand-light">
                  provider.phriend.app
                </a>
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-white/60">Launch</dt>
              <dd>2026, Philippines</dd>
            </div>
          </dl>
        </Container>
      </section>

      {/* Fast facts */}
      <section id="facts" aria-labelledby="facts-title">
        <Container className="py-16 sm:py-20">
          <p className={eyebrow}>Fast facts</p>
          <h2 id="facts-title" className={h2}>
            Phriend in numbers.
          </h2>
          <dl className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            {facts(n).map((f) => (
              <div key={f.label} className="rounded-card border border-line bg-white p-4">
                <dt className="text-xs font-extrabold uppercase tracking-wider text-muted">{f.label}</dt>
                <dd className="mt-1 text-xl font-extrabold text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>

          <h3 className="mt-12 font-display text-h2 font-bold text-ink">Product</h3>
          <ul className="mt-4 max-w-3xl space-y-3 text-base font-semibold text-ink">
            {product(n).map((p) => (
              <li key={p} className="flex items-start gap-2.5">
                <BadgeCheck size={20} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Brand assets */}
      <section id="brand" aria-labelledby="brand-title" className="bg-surface">
        <Container className="py-16 sm:py-20">
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

          <h3 className="mt-12 font-display text-h2 font-bold text-ink">Colors</h3>
          <ul className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
            {COLORS.map((c) => (
              <li key={c.hex} className="overflow-hidden rounded-card border border-line bg-white">
                <div className="h-20" style={{ background: c.hex }} />
                <div className="p-4">
                  <p className="font-extrabold text-ink">{c.name}</p>
                  <p className="font-mono text-sm font-bold text-body">{c.hex}</p>
                  <p className="mt-1 text-sm text-muted">{c.use}</p>
                </div>
              </li>
            ))}
          </ul>

          <h3 className="mt-12 font-display text-h2 font-bold text-ink">Typography</h3>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            <li className="rounded-card border border-line bg-white p-6">
              <p className="text-xs font-extrabold uppercase tracking-wider text-muted">Display · Plus Jakarta Sans</p>
              <p className="mt-3 font-display text-h1 font-bold text-ink">Local services, verified pros</p>
            </li>
            <li className="rounded-card border border-line bg-white p-6">
              <p className="text-xs font-extrabold uppercase tracking-wider text-muted">Body · Inter</p>
              <p className="mt-3 text-lg leading-relaxed">
                Aircon cleaning, bookkeeping, tutoring, photo and video, driving and errands. Booked in the app, paid to the provider.
              </p>
            </li>
          </ul>
          <p className="mt-3 text-sm text-muted">Both typefaces are free on Google Fonts.</p>

          <h3 className="mt-12 font-display text-h2 font-bold text-ink">Usage rules</h3>
          <ul className="mt-4 space-y-3 text-base font-semibold text-ink">
            {USAGE.map((u) => (
              <li key={u} className="flex items-start gap-2.5">
                <BadgeCheck size={20} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
                {u}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Product images */}
      <section id="images" aria-labelledby="images-title">
        <Container className="py-16 sm:py-20">
          <p className={eyebrow}>Product images</p>
          <h2 id="images-title" className={h2}>
            Screenshots and lifestyle photos.
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed">
            Free to use in coverage of Phriend, credit &quot;Phriend&quot;. Previews are cropped to fit; every image
            links to the original file.
          </p>

          <h3 className="mt-10 font-display text-h2 font-bold text-ink">App screenshots</h3>
          <ul className="mt-4 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            {SCREENSHOTS.map((s) => (
              <li key={s.src}>
                <figure>
                  <a href={s.src} download className="block overflow-hidden rounded-card border border-line bg-surface">
                    <Image
                      src={s.src}
                      alt={s.alt}
                      width={390}
                      height={844}
                      sizes="(min-width: 640px) 192px, 45vw"
                      className="h-auto w-full"
                    />
                  </a>
                  <figcaption className="mt-2 text-sm font-semibold text-muted">
                    {s.caption} · {s.size}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>

          <h3 className="mt-10 font-display text-h2 font-bold text-ink">Lifestyle photos</h3>
          <ul className="mt-4 grid gap-4 sm:grid-cols-3">
            {PHOTOS.map((p) => (
              <li key={p.src}>
                <figure>
                  <a href={p.src} download className="relative block aspect-[3/2] overflow-hidden rounded-card">
                    <Image
                      src={p.src}
                      alt={p.alt}
                      width={1280}
                      height={720}
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
        </Container>
      </section>

      {/* Safety and community stance */}
      <section id="stance" aria-labelledby="stance-title" className="bg-navy-soft">
        <Container className="py-16 sm:py-20">
          <p className={eyebrow}>Trust and safety</p>
          <h2 id="stance-title" className={h2}>
            Where Phriend stands.
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {STANCE.map((s) => (
              <li key={s.title} className="rounded-card border border-line bg-white p-5">
                <s.icon size={22} className="text-brand" aria-hidden="true" />
                <h3 className="mt-3 font-extrabold text-ink">{s.title}</h3>
                <p className="mt-1 text-base leading-relaxed">{s.text}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/safety">Trust and safety rules</ButtonLink>
            <ButtonLink href="/community-guidelines" variant="secondary">
              Community guidelines
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* Quotable lines */}
      <section id="quotes" aria-labelledby="quotes-title">
        <Container className="py-16 sm:py-20">
          <p className={eyebrow}>Quotable lines</p>
          <h2 id="quotes-title" className={h2}>
            Attribute to Phriend.
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {QUOTES.map((q) => (
              <li key={q} className="flex flex-col rounded-card border border-line bg-white p-6">
                <figure className="flex h-full flex-col">
                  <blockquote className="flex-1 text-lg leading-relaxed text-ink">
                    <span aria-hidden="true" className="font-display text-4xl leading-none text-brand">
                      &ldquo;
                    </span>
                    <p>{q}</p>
                  </blockquote>
                  <figcaption className="mt-4 text-sm font-extrabold uppercase tracking-wider text-muted">
                    Phriend
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Media contact */}
      <section id="contact" aria-labelledby="contact-title" className="bg-surface">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-8 rounded-card border border-line bg-white p-8 sm:p-12 lg:grid-cols-[1.2fr_0.8fr]">
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
                className="btn-primary mt-6 inline-flex items-center gap-2 rounded-control px-6 py-3 text-lg font-extrabold"
              >
                <Mail size={20} aria-hidden="true" />
                {CONTACT_EMAIL}
              </a>
            </div>
            <div>
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-ink">Social</h3>
              <ul className="mt-3 space-y-2 text-base font-bold">
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
        </Container>
      </section>
    </main>
  );
}
