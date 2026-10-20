import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Briefcase, CalendarClock, CalendarDays, ChevronDown, CircleCheck, FileCheck, Flag, Lock, MessageCircle, PenLine, Search, Tag, Users, Wallet, Zap, type LucideIcon } from "lucide-react";
import { TeamTile } from "@/components/teams";
import { ServiceGroups } from "@/components/services";
import { getGroups, getTeams } from "@/lib/landing";
import { APP_URL, cdn, pageMeta, PROVIDER_URL, SITE_DESCRIPTION, SITE_URL } from "@/lib/site";
import { ButtonLink, Container } from "@/components/ui";

export const metadata: Metadata = pageMeta({ description: SITE_DESCRIPTION, path: "/" });

const TRUST: { icon: LucideIcon; label: string }[] = [
  { icon: BadgeCheck, label: "Verified providers" },
  { icon: Tag, label: "Priced per job, hour or session" },
  { icon: MessageCircle, label: "Book and chat in the app" },
];

const CLIENT_STEPS: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Search, title: "Browse", text: "Search services by what you need and where. Each one shows its price, up to six photos of the work, whether it is online, in person or hybrid, and the provider's badges." },
  { icon: MessageCircle, title: "Chat", text: "Message the provider in the app. Their FAQ answers reply instantly to the usual questions: how to pay, the minimum booking, where they work." },
  { icon: CalendarDays, title: "Book", text: "Pick a time from the service's own schedule and, for an at-home service, one of your saved addresses. Online services need none. The provider accepts or declines." },
  { icon: CircleCheck, title: "Get it done", text: "The work happens online or in person. Pay the provider directly, as you agreed with them, then leave a review." },
];

const PROVIDER_STEPS: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: BadgeCheck, title: "Verify", text: "Verify your identity with a government ID and a selfie. Add clearances, certificates or business documents to earn a badge for each one our team checks." },
  { icon: PenLine, title: "Profile", text: "Keep it lean: one round face photo, your name, a title like \"Online Bookkeeper\", a short About me and the languages you speak." },
  { icon: Briefcase, title: "Services", text: "List each service with its own price per job, hour or session, up to six photos of your work, a visit type, a schedule and an area." },
  { icon: CalendarClock, title: "Bookings", text: "Accept requests, chat with clients and let your FAQ answers reply instantly. Clients pay you directly; your bookings and earnings are tracked in one place." },
];

const RULES: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: BadgeCheck, title: "Verified providers", text: "Our team checks a government ID and a selfie before a provider gets the Verified badge, and a person approves every listing before it shows." },
  { icon: FileCheck, title: "Document badges", text: "NBI clearance, police clearance, barangay certificate, certificates, business documents and proof of address each earn a badge once our team checks them. Not every provider needs every one." },
  { icon: MessageCircle, title: "The chat is the record", text: "The price, the time and what is included are agreed in the chat and the booking, so both sides can see what was agreed." },
  { icon: Wallet, title: "Pay the provider, as agreed", text: "Payment is agreed with the provider and paid to them directly. Phriend never holds your money." },
  { icon: Lock, title: "Only the provider's own account", text: "Paying by e-wallet or bank? Send money only to the account the provider gave you in the Phriend chat. Anything else is a scam." },
  { icon: Flag, title: "Report and block", text: "Report a profile or a job post, and block anyone from the chat. Every report is reviewed by a person." },
];

const FEATURES: { title: string; text: string }[] = [
  { title: "Services first", text: "Browse services, not profiles. Each one has its own price, photos of the work, visit type, schedule and area." },
  { title: "Online, in person or hybrid", text: "Online services cover the whole country. In-person ones list the areas they cover, or a whole city." },
  { title: "Saved addresses", text: "Save Home, Work and any other address for at-home services. Online services need no address." },
  { title: "Bookings", text: "Pick a time from the service's schedule. Accept, decline or cancel with a reason, and add it to your calendar." },
  { title: "Chat", text: "Message the provider in the app, with photos, read receipts and typing indicators. Archive or block anyone." },
  { title: "Instant FAQ answers", text: "Providers set answers to the usual questions, like how to pay, the minimum booking or where they work, and the chat replies with them right away." },
  { title: "Verified and document badges", text: "Verified means our team checked a government ID and a selfie. Document badges show what else was checked." },
  { title: "Reviews", text: "A star rating, a few words and photos, left after a booking." },
  { title: "Post a job", text: "Describe what you need with a budget and a date. Providers reply in the chat." },
  { title: "Phriend Provider", text: "Providers list services and manage bookings, earnings and verification at provider.phriend.app." },
  { title: "Notifications", text: "A bell in the app and an email for every message, booking update and review." },
  { title: "Your account", text: "Sign in with Google or email. Delete your account yourself at any time; everything goes with it." },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "What can I book on Phriend?",
    a: "Local services, each listed with its own price: aircon cleaning and repair, appliance check-ups, bookkeeping and tax filing, tutoring, photography and video, driving, errands and deliveries, moving help, tour guiding, event coordination and more. Some are done in person, some online, some both. Phriend is for legitimate services only; anything sexual or illegal gets an account removed immediately.",
  },
  {
    q: "How does booking work?",
    a: "Open a service, pick a time from its schedule and, for an at-home service, one of your saved addresses (online services need none). Add a note and send the request; the provider accepts or declines. Either side can cancel with a reason, and every booking can be added to your calendar.",
  },
  {
    q: "How do I pay?",
    a: "Payment is agreed with the provider and paid to them directly: cash, e-wallet or bank transfer, whatever you agree. Phriend never holds your money. If you pay by e-wallet or bank, send only to the account the provider gave you in the Phriend chat.",
  },
  {
    q: "How are prices set?",
    a: "Each provider prices each service: per job, per hour or per session. The price, and any minimum booking, shows on the service before you book.",
  },
  {
    q: "Does Phriend take a commission?",
    a: "Not yet. Providers keep everything clients pay them. If this changes we will announce it well ahead of time.",
  },
  {
    q: "What does the Verified badge mean?",
    a: "Our team checked the provider's government ID and a selfie. Document badges show what else was checked: NBI clearance, police clearance, barangay certificate, certificates, business documents or proof of address. Not every provider has every badge, and each one only shows after our team reviews the document.",
  },
  {
    q: "What are FAQ answers?",
    a: "Answers a provider writes to the questions clients ask most, such as how to pay, the minimum booking or where they work. Ask in the chat and the answer arrives instantly; the provider can follow up from there.",
  },
  {
    q: "Do online services need an address?",
    a: "No. Online and remote services happen over video call, phone or shared files and can be booked from anywhere in the Philippines. For at-home services, save as many addresses as you need, like Home and Work, and pick one when you book.",
  },
  {
    q: "How do I offer my services?",
    a: "Go to provider.phriend.app (the Phriend Provider app is coming to the app stores). Verify your identity, set up a short profile with one face photo, a title, an About me and your languages, then list your services with their prices, photos, schedule and area. A person reviews each listing before it goes live.",
  },
  {
    q: "What if the provider is late or cancels?",
    a: "You may cancel if the other side is more than 30 minutes late without notice, and anything already paid to a provider who is late or cancels late is refunded in full. Cancel at least 24 hours ahead. The full rules are on the safety page.",
  },
  {
    q: "Do I need to install anything?",
    a: "No. Phriend runs in the browser at web.phriend.app on any phone or computer; add it to your home screen and it works like an app. On Android you can also get the Phriend app from Google Play.",
  },
  {
    q: "How do I delete my account?",
    a: "Open My profile, tap Delete account and type DELETE. It permanently removes your account, provider profile, services, photos, favorites, reviews, bookings, notes and job posts. It cannot be undone.",
  },
];

const JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    {
      "@type": "HowTo",
      name: "How to book a local service on Phriend",
      description: "Book a local service from a verified provider in four steps: browse, chat, book, get it done.",
      url: `${SITE_URL}/#how-it-works`,
      step: CLIENT_STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.text })),
    },
  ],
});

function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[272px] sm:w-[300px]">
      <div className="rounded-[2.75rem] border-[6px] border-ink bg-ink p-1.5 shadow-float ring-1 ring-white/25">
        {/* a real phone viewport (390x844), so the screenshot fills the frame at its own proportions and nothing is cropped */}
        <div className="aspect-[390/844] overflow-hidden rounded-[2.2rem] bg-white">
          <Image
            src="/screens/home-v9.png"
            alt="The Phriend app home screen: a search bar, the service groups from errands to food and catering, and services near you with their prices"
            width={390}
            height={844}
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 640px) 300px, 272px"
            className="size-full object-cover object-top"
          />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute -left-14 top-[30%] hidden w-52 rounded-card border border-line bg-white p-3 text-xs leading-snug text-body shadow-float sm:block lg:-left-24"
      >
        <p className="mb-1 flex items-center gap-1.5 font-extrabold text-ink">
          <Image src={cdn("/photos/kyla-1.jpg")} alt="Kyla" width={24} height={24} className="size-6 rounded-full object-cover" />
          Kyla <BadgeCheck size={12} className="fill-verify text-white" />
          <span className="ml-auto font-bold text-muted">2:14 pm</span>
        </p>
        <p>Monthly books and BIR filing for your shop: ₱2,500 per job, done online. Send your receipts here.</p>
      </div>
      <div
        aria-hidden="true"
        className="absolute -right-8 bottom-[18%] hidden rounded-card border border-line bg-white px-3 py-2.5 text-xs text-body shadow-float sm:block lg:-right-16"
      >
        <p className="flex items-center gap-1.5 font-extrabold text-ink">
          <Zap size={14} className="text-success" />
          Instant FAQ answer
        </p>
        <p className="mt-0.5 text-muted">How to pay, minimum booking, where they work</p>
      </div>
    </div>
  );
}

function StepTile({ n, icon: Icon, title, text, className = "" }: { n: number; icon: LucideIcon; title: string; text: string; className?: string }) {
  return (
    <li className={`flex flex-col rounded-card border border-line bg-white p-6 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="grid size-11 place-items-center rounded-tile bg-brand-soft text-brand">
          <Icon size={22} aria-hidden="true" />
        </span>
        <span className="font-display text-3xl font-semibold text-line">0{n}</span>
      </div>
      <h3 className="mt-5 font-display text-h2 font-bold text-ink">{title}</h3>
      <p className="mt-2 text-base leading-relaxed">{text}</p>
    </li>
  );
}

const h2 = "font-display text-h2 font-bold text-ink";

export default async function Home() {
  const [{ teams }, groups] = await Promise.all([getTeams({ limit: 3 }), getGroups()]);
  const serviceCount = groups.reduce((n, g) => n + g.categories.length, 0);
  return (
    <main id="main" className="flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON_LD }} />
      {/* Hero */}
      <section className="bg-navy-gradient relative overflow-hidden text-white">
        <Container className="grid items-center gap-10 pb-12 pt-10 sm:gap-12 sm:pb-16 sm:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:pb-24 lg:pt-24">
          <div className="max-w-xl">
            <h1 className="font-display text-display font-extrabold text-white">
              Local services, from verified providers
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/80 sm:mt-5 sm:text-lg">
              Book trusted local pros for aircon cleaning, tutoring, photo and video, errands and more. See prices and photos, then book
              in the app.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
              <ButtonLink href={APP_URL} className="h-12 py-0 text-[0.9375rem] leading-5">
                Find a service
              </ButtonLink>
              <ButtonLink href={PROVIDER_URL} variant="secondary" className="h-12 py-0 text-[0.9375rem] leading-5">
                List your services
              </ButtonLink>
            </div>
            <ul className="mt-6 grid gap-2.5 text-sm font-semibold text-white sm:mt-8 sm:flex sm:flex-wrap sm:gap-x-6">
              {TRUST.map((t) => (
                <li key={t.label} className="flex items-center gap-2.5">
                  <t.icon size={18} className="shrink-0 text-brand-light" aria-hidden="true" />
                  {t.label}
                </li>
              ))}
            </ul>
          </div>
          <PhoneMockup />
        </Container>
      </section>

      {/* Services: the groups, live from Ops */}
      <section aria-labelledby="services-title" className="bg-surface">
        <Container className="py-16 sm:py-24">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <h2 id="services-title" className={h2}>
                What do you need done?
              </h2>
              <p className="mt-3 text-base leading-relaxed text-body">
                {serviceCount} kinds of service in {groups.length} groups, from aircon cleaning and appliance check-ups to bookkeeping, tutoring, photo and
                video, driving and errands. Pick one to see the services on offer.
              </p>
            </div>
            <Link href="/services" className="font-bold text-brand-text hover:underline">
              See all services
            </Link>
          </div>
          <div className="mt-10">
            <ServiceGroups groups={groups} limit={9} />
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section id="how-it-works" aria-labelledby="how-title">
        <Container className="py-16 sm:py-24">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
            <div className="max-w-2xl">
              <h2 id="how-title" className={h2}>
                How Phriend works
              </h2>
              <p className="mt-3 text-lg leading-relaxed">Four steps, whichever side you are on.</p>
            </div>
            <div className="relative aspect-[3/2] overflow-hidden rounded-card lg:aspect-[2/1]">
              <Image
                src="/groups/repairs.jpg"
                alt="A technician cleaning a split-type aircon unit in a condo living room, his tool bag on a step ladder"
                width={1280}
                height={720}
                sizes="(min-width: 1280px) 600px, (min-width: 1024px) 50vw, 100vw"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <li className="flex flex-col justify-between rounded-card bg-navy p-6 text-white md:col-span-2 lg:col-span-1">
              <Users size={28} className="text-brand-light" aria-hidden="true" />
              <div className="mt-10">
                <h3 className="font-display text-h2 font-bold">Need something done?</h3>
                <p className="mt-2 text-base leading-relaxed text-white/85">From a search to a booked service in a few minutes.</p>
              </div>
            </li>
            {CLIENT_STEPS.map((s, i) => (
              <StepTile key={s.title} n={i + 1} {...s} className={i === CLIENT_STEPS.length - 1 ? "lg:col-span-2" : ""} />
            ))}
            <li className="flex flex-col justify-between rounded-card bg-brand-soft p-6 md:col-span-2 lg:col-span-2">
              <p className="font-display text-h2 font-bold text-ink">Start with a search.</p>
              <p className="mt-2 text-base leading-relaxed text-body">
                Every provider is verified by our team, and every service shows its price before you book.
              </p>
              <ButtonLink href={APP_URL} className="mt-6 w-fit">
                Find a service
              </ButtonLink>
            </li>
          </ol>

          <ol className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <li className="flex flex-col justify-between rounded-card bg-brand-soft p-6 text-ink md:col-span-2 lg:col-span-1">
              <Wallet size={28} className="text-brand" aria-hidden="true" />
              <div className="mt-10">
                <h3 className="font-display text-h2 font-bold">Offer a service?</h3>
                <p className="mt-2 text-base leading-relaxed text-body">Set your prices, your hours and your area, and keep everything clients pay you.</p>
              </div>
            </li>
            {PROVIDER_STEPS.map((s, i) => (
              <StepTile key={s.title} n={i + 1} {...s} className={i === PROVIDER_STEPS.length - 1 ? "lg:col-span-2" : ""} />
            ))}
            <li className="flex flex-col justify-between rounded-card bg-navy p-6 text-white md:col-span-2 lg:col-span-2">
              <p className="font-display text-h2 font-bold">List your services.</p>
              <p className="mt-2 text-base leading-relaxed text-white/85">
                Providers work in Phriend Provider, on the web at provider.phriend.app: list services, manage bookings, earnings and verification.
              </p>
              <ButtonLink href={PROVIDER_URL} className="mt-6 w-fit">
                Go to provider.phriend.app
              </ButtonLink>
            </li>
          </ol>
        </Container>
      </section>

      {/* Features: a plain list, not a wall of identical cards */}
      <section id="features" aria-labelledby="features-title" className="bg-surface">
        <Container className="grid gap-10 py-16 sm:py-24 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="max-w-md self-start lg:sticky lg:top-24">
            <h2 id="features-title" className={h2}>
              From first message to finished job, in one app.
            </h2>
            <p className="mt-4 text-lg leading-relaxed">Booking, chat and scheduling happen in the app. Payment goes straight to the provider.</p>
          </div>
          <dl className="grid gap-x-10 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <div key={f.title} className="border-t border-line py-5">
                <dt className="font-extrabold text-ink">{f.title}</dt>
                <dd className="mt-1 text-base leading-relaxed">{f.text}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Book a team: renders nothing until the API has live teams */}
      {teams.length > 0 && (
        <section aria-labelledby="teams-title">
          <Container className="py-16 sm:py-24">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <h2 id="teams-title" className={h2}>
                  Book a team.
                </h2>
                <p className="mt-3 text-base leading-relaxed text-body">
                  Weddings, events, tours and moves often need more than one provider. A team sells packages and books as one: one chat, one price, one booking. Every member is a verified provider you can also book on their own.
                </p>
              </div>
              <Link href="/teams" className="font-bold text-brand-text hover:underline">
                See all teams
              </Link>
            </div>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {teams.map((t) => (
                <li key={t.id}>
                  <TeamTile team={t} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {/* Safety */}
      <section id="safety" aria-labelledby="safety-title" className="bg-navy-soft">
        <Container className="py-16 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 id="safety-title" className={h2}>
                Trust, built in
              </h2>
              <p className="mt-4 text-lg leading-relaxed">Providers are checked by our team, what you agree is on record, and anything wrong is one tap from a report.</p>
              <ButtonLink href="/safety" variant="secondary" className="mt-6">
                Read the safety rules
              </ButtonLink>
              <div className="relative mt-8 aspect-[4/5] max-w-sm overflow-hidden rounded-card">
                <Image
                  src={cdn("/photos/life-verified.jpg")}
                  alt="A smiling woman in a cafe holding her phone and giving a thumbs up"
                  width={1024}
                  height={1536}
                  sizes="(min-width: 640px) 384px, 100vw"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <ul className="divide-y divide-navy/15 border-y border-navy/15 self-start">
              {RULES.map((r) => (
                <li key={r.title} className="flex gap-4 py-5">
                  <r.icon size={22} className="mt-0.5 shrink-0 text-brand-text" aria-hidden="true" />
                  <div>
                    <h3 className="font-extrabold text-ink">{r.title}</h3>
                    <p className="mt-1 text-base leading-relaxed">{r.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* For providers + pricing */}
      <section id="for-providers" aria-labelledby="providers-title">
        <Container className="py-16 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 id="providers-title" className={h2}>
                Offer your services on Phriend.
              </h2>
              <p className="mt-4 text-lg leading-relaxed">
                Clean aircons, keep books, teach, shoot photos and video, drive or run errands? List each service with its own price, photos,
                schedule and area, then take bookings and chat with clients in Phriend Provider.
              </p>
              <ul className="mt-6 space-y-3 text-base font-semibold text-ink">
                {[
                  "Each service with its own price per job, per hour or per session",
                  "Up to six photos of your work on every service",
                  "Online, in person or hybrid, with its own schedule",
                  "Listed areas, a whole city, or nationwide for online work",
                  "FAQ answers that reply to clients instantly in the chat",
                  "A Verified badge and a badge for every document our team checks",
                  "Bookings, earnings and verification in one place",
                  "Clients pay you directly, and Phriend takes no cut",
                  "The Phriend Provider app is coming to the stores; until then, use provider.phriend.app",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <BadgeCheck size={20} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
              <ButtonLink href={PROVIDER_URL} className="mt-8 text-lg">
                Go to provider.phriend.app
              </ButtonLink>
            </div>

            <div className="flex flex-col gap-4">
              <div className="relative aspect-[3/2] overflow-hidden rounded-card">
                <Image
                  src="/groups/freelance.jpg"
                  alt="A bookkeeper working on a laptop at a desk by a window over the city, a notebook and an iced coffee beside her"
                  width={1280}
                  height={720}
                  sizes="(min-width: 1280px) 600px, (min-width: 1024px) 50vw, 100vw"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="rounded-card border border-line bg-surface p-6 sm:p-8">
                <h3 className="font-display text-h2 font-bold text-ink">Providers keep 100%</h3>
                <p className="mt-3 leading-relaxed">
                  Phriend takes no commission yet. Providers set their own prices, clients book in the app, and payment is agreed with
                  the provider and paid to them directly.
                </p>
                <dl className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-tile bg-white p-4">
                    <dt className="text-sm font-bold text-muted">Pricing</dt>
                    <dd className="mt-1 text-xl font-extrabold text-ink">Per job, per hour or per session</dd>
                  </div>
                  <div className="rounded-tile bg-white p-4">
                    <dt className="text-sm font-bold text-muted">Payment</dt>
                    <dd className="mt-1 text-xl font-extrabold text-ink">Agreed with the provider, paid directly</dd>
                  </div>
                </dl>
                <p className="mt-4 text-sm text-muted">
                  Each provider prices each service. Bookings happen in the app; payments go to the provider.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section id="faq" aria-labelledby="faq-title" className="bg-surface">
        <Container className="py-16 sm:py-24">
          <p id="what-is-phriend" className="mb-10 max-w-4xl rounded-card border border-line bg-white p-5 text-lg leading-relaxed sm:p-6">
            <strong className="text-ink">What is Phriend?</strong> Phriend is a marketplace for local services in the Philippines.
            Clients browse services, each with its own price, photos, visit type, schedule and area, then book and chat with the
            provider in the app and pay the provider directly. Every provider is verified by our team.
          </p>
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <h2 id="faq-title" className={h2}>
                Common questions
              </h2>
              <p className="mt-4 leading-relaxed">
                Something else? Email{" "}
                <a href="mailto:support@phriend.app" className="font-bold text-brand-text underline underline-offset-4">
                  support@phriend.app
                </a>
                .
              </p>
            </div>
            <div className="flex max-w-3xl flex-col gap-3">
              {FAQ.map((f) => (
                <details key={f.q} className="group rounded-card border border-line bg-white">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-lg font-extrabold text-ink [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <ChevronDown size={20} className="shrink-0 text-muted transition-transform group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <p className="px-5 pb-5 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section aria-labelledby="cta-title">
        <Container className="py-16 sm:py-24">
          <div className="bg-navy-gradient overflow-hidden rounded-card px-6 py-14 text-center text-white sm:px-12 sm:py-20">
            <h2 id="cta-title" className="font-display text-h2 font-bold">
              Ready to get it done?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/85">
              Open the app, search for the service you need and message the provider. Browsing is free, and so is listing your services.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href={APP_URL} className="text-lg">
                Open the app
              </ButtonLink>
              <ButtonLink href={PROVIDER_URL} variant="secondary" className="text-lg">
                List your services
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
