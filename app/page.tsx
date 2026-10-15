import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, CalendarClock, CalendarDays, ChevronDown, Flag, Lock, MapPin, MessageCircle, PenLine, Search, ShieldCheck, Users, UserX, Wallet, type LucideIcon } from "lucide-react";
import { TeamTile } from "@/components/teams";
import { ServiceGroups } from "@/components/services";
import { getGroups, getTeams } from "@/lib/landing";
import { APP_URL, cdn, pageMeta, POST_URL, SITE_DESCRIPTION, SITE_URL } from "@/lib/site";
import { ButtonLink, Container } from "@/components/ui";

export const metadata: Metadata = pageMeta({ description: SITE_DESCRIPTION, path: "/" });

const TRUST: { icon: LucideIcon; label: string }[] = [
  { icon: BadgeCheck, label: "Everyone is ID-verified" },
  { icon: MapPin, label: "Public places, or your home for home services" },
  { icon: Wallet, label: "Agree the price in chat, pay in person" },
];

const CLIENT_STEPS: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Search, title: "Browse", text: "Filter by city, activity, language and rate. Every profile shows the verified badge, reviews and the Phriend's services with prices." },
  { icon: MessageCircle, title: "Chat", text: "Sign in, verify your ID in a couple of minutes, then agree on the plan in the chat so both sides have the record." },
  { icon: CalendarDays, title: "Book", text: "Send the date, start time, hours and a meeting place: a public place, or your address for a home service. The Phriend accepts or declines, and it goes in your calendar." },
  { icon: MapPin, title: "Meet", text: "Meet up (or welcome them home for a home service), pay half in cash when they arrive and the rest after. Then leave a review." },
];

const PHRIEND_STEPS: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: BadgeCheck, title: "Verify", text: "A quick ID check confirms you are 18 or older. Every member verifies, and a profile cannot go live without it." },
  { icon: PenLine, title: "Profile", text: "Claim your @username, add photos, pick activities and non-negotiables, set your rate and services. A person approves it, usually within a day." },
  { icon: CalendarClock, title: "Schedule", text: "Set your weekly availability and lock out busy dates. Requests arrive in the app and by email; accept or decline with one tap." },
  { icon: Wallet, title: "Earn", text: "Meet in public or at the client's home for a home service, and get paid in cash, directly. Your dashboard tracks bookings, reviews and earnings. Phriend takes no cut." },
];

const RULES: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: MapPin, title: "Public places, or your home", text: "Malls, cafes, parks, trails and venues, or your own home when you book a home service. Never a hotel room, an overnight stay or the Phriend's own place." },
  { icon: UserX, title: "Extra people not agreed in chat", text: "If someone arrives with people not agreed in the chat, do not proceed. Leave and report. On a team booking, the teammates named on the booking are agreed; anyone else is not." },
  { icon: Wallet, title: "Half before, half after", text: "50% in cash when you meet, 50% after. E-wallets only for repeat Phriends you trust." },
  { icon: Lock, title: "Pay only the shared account", text: "Send money only to the account shared in the chat. Anything else is a scam." },
  { icon: BadgeCheck, title: "ID verification", text: "Everyone verifies their identity and age before they get the badge or a profile goes live." },
  { icon: Users, title: "Tell someone your plan", text: "Share where you are going, who you are meeting and when you expect to be back." },
  { icon: Flag, title: "Report and block", text: "Report a profile or a gig, block a member from the chat. Every profile is reviewed by a person before it shows." },
];

const FEATURES: { title: string; text: string }[] = [
  { title: "Search and favorites", text: "Filter by city, activity, language and rate. Favorite profiles and share a Phriend's @username link." },
  { title: "Bookings", text: "Pick a service, date, time and a public place or the client's address. Accept, decline or cancel with a reason, and add it to your calendar." },
  { title: "Schedule", text: "Phriends set weekly hours and lock out dates. Requests outside those hours are refused automatically." },
  { title: "Services and rates", text: "An hourly rate, plus services with their own price per hour or per session and a minimum booking." },
  { title: "Chat", text: "Photos, emoji reactions, read receipts, saved replies and typing indicators. Archive or block anyone." },
  { title: "Reviews", text: "A star rating, a few words and photos. It shows once the Phriend approves it." },
  { title: "Manage dashboard", text: "Profile views, favorites, reviews to approve, bookings by status, earnings and private notes." },
  { title: "Gigs board", text: "Post what you need with a budget and date. Phriends apply in the chat with the gig pinned as the subject." },
  { title: "Notifications", text: "A bell in the app and an email for every message, booking update, review and profile decision." },
  { title: "Safety", text: "Everyone is ID-verified. Profiles, photos and reports get an automated check, and a person approves each profile." },
  { title: "Your account", text: "Sign in with Google or email. Delete your account yourself at any time; everything goes with it." },
  { title: "Cash, in person", text: "Money never moves in the app. Half in cash when you meet, half after. Never more than half upfront." },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "What can I book on Phriend?",
    a: "Local services and activities, by the hour: guided city and food tours, photo and video shoots, tutoring and lessons, hiking and trail guiding, personal training, driving and airport transfers, errands and queueing, event coverage and on-site help. Phriend is not a dating service. Romantic or sexual services, compensated dating and escort services are banned and get an account removed immediately.",
  },
  {
    q: "How do bookings work?",
    a: "Send a booking request with the date, start time, hours, a meeting place (a public place, or your address for a home service) and a note. If the Phriend lists services, pick one. The Phriend accepts or declines, either side can cancel with a reason, and after the meetup either side marks it completed. Every booking can be added to your calendar.",
  },
  {
    q: "How do I pay?",
    a: "Directly between members, never through Phriend. On a first meetup, hand over 50% in cash when you meet and pay the rest after. E-wallets and bank transfers are for repeat Phriends you already trust, and only to the account shared in the chat. Never pay more than half upfront.",
  },
  {
    q: "What if my Phriend brings someone else?",
    a: "Do not proceed. If the other member arrives with people who were not agreed in the chat, be prudent: cancel the meetup, leave, and report the profile. The same applies to a client who shows up with extra people. On a team booking, the teammates named on the booking are the agreed people; anyone else still is not. A cancellation for this reason is refunded in full.",
  },
  {
    q: "Does Phriend take a commission?",
    a: "Not yet. Members agree on a rate per hour, typically between ₱300 and ₱1,500 depending on the activity and the city, and keep all of it. If this changes we will announce it well ahead of time.",
  },
  {
    q: "Can I set my own rates and services?",
    a: "Yes. Set your hourly rate and list services with their own price per hour or per session, a minimum booking if you want one, and a photo. You also set your weekly availability and lock out busy dates. Phriend takes no cut, so what you list is what you keep.",
  },
  {
    q: "How does verification work?",
    a: "Members submit a government ID and a selfie through our identity verification partner. It takes about two minutes and confirms the member is 18 or older; the verified badge then shows on their profile. Everyone verifies: you need it to chat, book, review or post a gig, and a Phriend profile cannot go live without it. Details are on the safety and privacy pages.",
  },
  {
    q: "What do Phriends agree to?",
    a: "Before a profile goes live, every Phriend ticks an agreement: 18 or older and ID-verified; legitimate activities only, nothing romantic, sexual or illegal; public places, or the client's home for a home service, and nobody who was not agreed in the chat; half at the start and half after, cash in person on a first meetup; and prudence if a client shows up with extra people not agreed in the chat. The full text is on the safety page.",
  },
  {
    q: "What are non-negotiables?",
    a: "Rules a Phriend pins to the top of their profile so clients agree before they chat. They pick from: public meet-up only, no physical contact, cash downpayment on arrival, daytime only, no alcohol, no smoking, groups must be agreed in chat, no riding in client vehicles, ID check on arrival, and no overnight or out-of-town.",
  },
  {
    q: "What are gigs?",
    a: "A gig is a request a client posts: what they need, the activity, city, budget per hour and date. Phriends with a live profile apply in the chat, with the gig pinned as the subject of that conversation. Anyone can report a gig, and you can edit or delete the gigs you posted.",
  },
  {
    q: "What if my Phriend is late or cancels?",
    a: "You may cancel if the other member is more than 30 minutes late without notice, and a late Phriend refunds any downpayment already paid in full. Cancellations should happen at least 24 hours before the meetup. The full rules are on the safety page.",
  },
  {
    q: "Do I need to install anything?",
    a: "No. Phriend runs in the browser at web.phriend.app on any phone, Android or iPhone. Add it to your home screen and it works like an app, with chat, bookings and in-app notifications. An early Android app is also on Google Play if you prefer one.",
  },
  {
    q: "How do I delete my account?",
    a: "Open My profile, tap Delete account and type DELETE. It permanently removes your account, Phriend profile, photos, favorites, reviews, bookings, notes and gigs. It cannot be undone.",
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
      name: "How to book a local guide or pro on Phriend",
      description: "Book a verified local guide or pro by the hour in four steps: browse, chat, book, meet.",
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
            src={cdn("/photos/shot-home-v7.png")}
            alt="The Phriend home screen: a search bar, service categories and verified local pros with their hourly rate"
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
        <p>Free this Saturday for a Binondo food crawl? ₱350/hr, we meet at Ongpin.</p>
      </div>
      <div
        aria-hidden="true"
        className="absolute -right-8 bottom-[18%] hidden rounded-card border border-line bg-white px-3 py-2.5 text-xs text-body shadow-float sm:block lg:-right-16"
      >
        <p className="flex items-center gap-1.5 font-extrabold text-ink">
          <ShieldCheck size={14} className="text-success" />
          Price agreed in chat
        </p>
        <p className="mt-0.5 text-muted">Paid in person when you meet</p>
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
      <h3 className="mt-5 font-display text-2xl font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed">{text}</p>
    </li>
  );
}

const h2 = "font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl lg:text-5xl";

export default async function Home() {
  const [{ teams }, groups] = await Promise.all([getTeams({ limit: 3 }), getGroups()]);
  const serviceCount = groups.reduce((n, g) => n + g.categories.length, 0);
  return (
    <main id="main" className="flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON_LD }} />
      {/* Hero */}
      <section className="bg-navy-gradient relative overflow-hidden text-white">
        <Container className="grid items-center gap-12 pb-16 pt-14 sm:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:pb-24 lg:pt-24">
          <div className="max-w-xl">
            <h1 className="font-display text-[44px] font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-[64px]">
              Book a verified local pro, by the hour
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-white/80 sm:text-xl">
              Errands, pet care, events, lessons, photo shoots, rides and more, all from ID-verified locals across the Philippines. You
              agree the price in the chat and pay in person.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={APP_URL} className="text-lg">
                Find a local pro
              </ButtonLink>
              <ButtonLink href={POST_URL} variant="secondary" className="text-lg">
                Become a Phriend
              </ButtonLink>
            </div>
            <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-3 text-[14px] font-bold text-white sm:flex sm:flex-wrap sm:gap-x-6">
              {TRUST.map((t) => (
                <li key={t.label} className="flex items-center gap-2">
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
              <p className="mt-3 text-[15px] leading-relaxed text-body">
                {serviceCount} services in {groups.length} groups, from errands and pet care to weddings, lessons, tours and freelance work. Pick one to see who
                is available.
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
                src={cdn("/photos/life-food-trip.jpg")}
                alt="A food-tour guide and their client laughing over grilled skewers at a night street-food stall, a jeepney behind them"
                width={1536}
                height={1024}
                sizes="(min-width: 1280px) 600px, (min-width: 1024px) 50vw, 100vw"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <li className="flex flex-col justify-between rounded-card bg-navy p-6 text-white md:col-span-2 lg:col-span-1">
              <Users size={28} className="text-brand-light" aria-hidden="true" />
              <div className="mt-10">
                <h3 className="font-display text-2xl font-semibold">Need a local pro?</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/85">From scrolling to a booked meet-up in an afternoon.</p>
              </div>
            </li>
            {CLIENT_STEPS.map((s, i) => (
              <StepTile key={s.title} n={i + 1} {...s} className={i === CLIENT_STEPS.length - 1 ? "lg:col-span-2" : ""} />
            ))}
            <li className="flex flex-col justify-between rounded-card bg-brand-soft p-6 md:col-span-2 lg:col-span-2">
              <p className="font-display text-2xl font-semibold text-ink">Start with a search.</p>
              <p className="mt-2 text-[15px] leading-relaxed text-body">
                Every pro is ID-verified. You meet in a public place, or at your home for a home service.
              </p>
              <ButtonLink href={APP_URL} className="mt-6 w-fit">
                Find a local pro
              </ButtonLink>
            </li>
          </ol>

          <ol className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <li className="flex flex-col justify-between rounded-card bg-brand-soft p-6 text-ink md:col-span-2 lg:col-span-1">
              <Wallet size={28} className="text-brand" aria-hidden="true" />
              <div className="mt-10">
                <h3 className="font-display text-2xl font-semibold">Want to be a Phriend?</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-body">Set your rate, pick your hours, keep everything you earn.</p>
              </div>
            </li>
            {PHRIEND_STEPS.map((s, i) => (
              <StepTile key={s.title} n={i + 1} {...s} className={i === PHRIEND_STEPS.length - 1 ? "lg:col-span-2" : ""} />
            ))}
            <li className="flex flex-col justify-between rounded-card bg-navy p-6 text-white md:col-span-2 lg:col-span-2">
              <p className="font-display text-2xl font-semibold">List your services.</p>
              <p className="mt-2 text-[15px] leading-relaxed text-white/85">
                Verify once, set your rate and weekly hours, and take bookings in the app. You get paid in person and keep 100%.
              </p>
              <ButtonLink href={POST_URL} className="mt-6 w-fit">
                Become a Phriend
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
              From first message to review, in one app.
            </h2>
            <p className="mt-4 text-lg leading-relaxed">Bookings, schedules and chat happen in the app. Money never does.</p>
          </div>
          <dl className="grid gap-x-10 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <div key={f.title} className="border-t border-line py-5">
                <dt className="font-extrabold text-ink">{f.title}</dt>
                <dd className="mt-1 text-[15px] leading-relaxed">{f.text}</dd>
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
                <p className="mt-3 text-[15px] leading-relaxed text-body">
                  Some days need more than one pro. A team books as one: one chat, one price, one booking. Every member is an ID-verified Phriend you can also book alone.
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
                Safety rules for both sides
              </h2>
              <p className="mt-4 text-lg leading-relaxed">The rules are short and strict, and they apply to clients and Phriends alike.</p>
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
                    <p className="mt-1 text-[15px] leading-relaxed">{r.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* For Phriends + pricing */}
      <section id="for-phriends" aria-labelledby="phriends-title">
        <Container className="py-16 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 id="phriends-title" className={h2}>
                Turn free time into a side gig.
              </h2>
              <p className="mt-4 text-lg leading-relaxed">
                Know your city, take good photos or drive a clean car? Set up your Phriend profile once, list your services and rates, then take bookings, meet clients and get paid.
              </p>
              <ul className="mt-6 space-y-3 text-[15px] font-semibold text-ink">
                {[
                  "List your services with your own rate per hour or per session",
                  "Pin your non-negotiables to the top of your profile",
                  "Set your weekly schedule and lock out the dates you are busy",
                  "Accept or decline booking requests, cancel with a reason if you must",
                  "Get a notification and an email for every booking request and review",
                  "Keep 100% of what you earn, no commission",
                  "One dashboard for views, favorites, reviews, bookings, an earnings estimate and your private notes",
                  "Your profile runs for 90 days; renew it in one tap",
                  "Verify once, get the badge everywhere",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <BadgeCheck size={20} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
              <ButtonLink href={POST_URL} className="mt-8 text-lg">
                Become a Phriend
              </ButtonLink>
            </div>

            <div className="flex flex-col gap-4">
              <div className="relative aspect-[3/2] overflow-hidden rounded-card">
                <Image
                  src={cdn("/photos/life-hiking.jpg")}
                  alt="Three people taking a selfie on a hilltop trail above rice terraces and the sea"
                  width={1536}
                  height={1024}
                  sizes="(min-width: 1280px) 600px, (min-width: 1024px) 50vw, 100vw"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="rounded-card border border-line bg-surface p-6 sm:p-8">
                <h3 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Phriends keep 100%</h3>
                <p className="mt-3 leading-relaxed">
                  Phriend takes no cut yet. Phriends list their own rates, members confirm the plan in the chat and the booking, and pay
                  each other directly: cash on a first meetup, GCash, Maya or bank transfer for repeat Phriends they already trust.
                </p>
                <dl className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-tile bg-white p-4">
                    <dt className="text-sm font-bold text-muted">Typical rate</dt>
                    <dd className="mt-1 text-xl font-extrabold text-ink">₱300 to ₱1,500 an hour</dd>
                  </div>
                  <div className="rounded-tile bg-white p-4">
                    <dt className="text-sm font-bold text-muted">Payment</dt>
                    <dd className="mt-1 text-xl font-extrabold text-ink">Agreed in chat, paid in person</dd>
                  </div>
                </dl>
                <p className="mt-4 text-sm text-muted">
                  Rates depend on the activity, the city and the Phriend. Bookings happen in the app; payments never do.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section id="faq" aria-labelledby="faq-title" className="bg-surface">
        <Container className="py-16 sm:py-24">
          <p id="what-is-phriend" className="mb-10 max-w-4xl rounded-card border border-line bg-white p-5 text-[17px] leading-relaxed sm:p-6">
            <strong className="text-ink">What is Phriend?</strong> Phriend is a Philippine app for booking ID-verified local pros by
            the hour: errands, pet care, events, lessons, photo shoots, tours, rides and more. Members are 18+, agree the price in
            the chat, meet in public places or at home for home services, and pay in person.
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
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[17px] font-extrabold text-ink [&::-webkit-details-marker]:hidden">
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
            <h2 id="cta-title" className="font-display text-3xl font-semibold leading-tight sm:text-5xl">
              Ready to book someone local?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/85">
              Open the app, pick your city and message a Phriend. Browsing is free, and so is listing your services.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href={APP_URL} className="text-lg">
                Open the app
              </ButtonLink>
              <ButtonLink href={POST_URL} variant="secondary" className="text-lg">
                Become a Phriend
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
