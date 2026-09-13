import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, BadgeCheck, Bell, BookOpen, CalendarClock, CalendarDays, Camera, ChevronDown, ClipboardList, Dumbbell, Flag,
  GraduationCap, Hospital, LayoutDashboard, Lock, Map, MapPin, Megaphone, MessageCircle, Mic, Mountain, PenLine, Search, ShieldCheck,
  Star, Tag, Umbrella, Users, UserX, Utensils, Wallet, type LucideIcon,
  Footprints, Laptop, MessagesSquare, Sandwich,
} from "lucide-react";
import { StoreBadges } from "@/components/store-badges";
import { APP_URL, cdn, pageMeta, POST_URL, SITE_DESCRIPTION, SITE_URL } from "@/lib/site";

export const metadata: Metadata = pageMeta({ description: SITE_DESCRIPTION, path: "/" });

const TRUST: { icon: LucideIcon; label: string }[] = [
  { icon: BadgeCheck, label: "Everyone is ID-verified" },
  { icon: MapPin, label: "Public meet-ups only" },
  { icon: Wallet, label: "50% downpayment, 50% after" },
  { icon: ShieldCheck, label: "18+ only" },
];

const CLIENT_STEPS: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Search, title: "Browse", text: "Filter by city, activity, language and rate. Every profile shows the verified badge, reviews and the Phriend's services with prices." },
  { icon: MessageCircle, title: "Chat", text: "Sign in, verify your ID in a couple of minutes, then agree on the plan in the chat so both sides have the record." },
  { icon: CalendarDays, title: "Book", text: "Send the date, start time, hours and a public meeting place. The Phriend accepts or declines, and it goes in your calendar." },
  { icon: MapPin, title: "Meet", text: "Meet in public, pay half in cash when you arrive and the rest after. Then leave a review." },
];

const PHRIEND_STEPS: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: BadgeCheck, title: "Verify", text: "A quick ID check confirms you are 18 or older. Every member verifies, and a profile cannot go live without it." },
  { icon: PenLine, title: "Profile", text: "Claim your @username, add photos, pick activities and non-negotiables, set your rate and services. A person approves it, usually within a day." },
  { icon: CalendarClock, title: "Schedule", text: "Set your weekly availability and lock out busy dates. Requests arrive in the app and by email; accept or decline with one tap." },
  { icon: Wallet, title: "Earn", text: "Meet in public and get paid in cash, directly. Your dashboard tracks bookings, reviews and earnings. Phriend takes no cut." },
];

const ACTIVITIES: { icon: LucideIcon; label: string; slug: string }[] = [
  { icon: Utensils, label: "Eat & Travel", slug: "eat_and_travel" },
  { icon: Laptop, label: "Coworking", slug: "coworking" },
  { icon: Footprints, label: "Walk & Talk", slug: "walk-and-talk" },
  { icon: Sandwich, label: "Lunch Buddy", slug: "lunch-buddy" },
  { icon: MessagesSquare, label: "Kwentuhan", slug: "kwentuhan" },
  { icon: Camera, label: "Photographer", slug: "photographer" },
  { icon: Map, label: "Tour Guide", slug: "tour-guide" },
  { icon: Dumbbell, label: "Workout", slug: "workout" },
  { icon: Mic, label: "Karaoke", slug: "karaoke" },
  { icon: Umbrella, label: "Beach", slug: "beach" },
  { icon: Mountain, label: "Hiking", slug: "hiking" },
  { icon: GraduationCap, label: "Tutor", slug: "tutor" },
  { icon: BookOpen, label: "Study Buddy", slug: "study-buddy" },
  { icon: ClipboardList, label: "Errand", slug: "errand" },
  { icon: Hospital, label: "Hospital Buddy", slug: "hospital_asst" },
  { icon: CalendarDays, label: "Event", slug: "event" },
];

const RULES: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: MapPin, title: "Public places only", text: "Malls, cafes, parks, trails, events. Never a private residence or a hotel room." },
  { icon: UserX, title: "Unagreed companions", text: "If someone arrives with people not agreed in the chat, do not proceed. Leave and report." },
  { icon: Wallet, title: "Half before, half after", text: "50% in cash when you meet, 50% after. E-wallets only for repeat Phriends you trust." },
  { icon: Lock, title: "Pay only the shared account", text: "Send money only to the account shared in the chat. Anything else is a scam." },
  { icon: BadgeCheck, title: "ID verification", text: "Everyone verifies their identity and age before they get the badge or a profile goes live." },
  { icon: Users, title: "Tell someone your plan", text: "Share where you are going, who you are meeting and when you expect to be back." },
  { icon: Flag, title: "Report and block", text: "Report a profile or a gig, block a member from the chat. Every profile is reviewed by a person before it shows." },
];

const FEATURES: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Search, title: "Search and favorites", text: "Filter by city, activity, language, age and rate. Favorite profiles and share a Phriend's @username link." },
  { icon: CalendarDays, title: "Bookings", text: "Pick a service, date, time and a public place. Accept, decline or cancel with a reason, and add it to your calendar." },
  { icon: CalendarClock, title: "Schedule", text: "Phriends set weekly hours and lock out dates. Requests outside those hours are refused automatically." },
  { icon: Tag, title: "Services and rates", text: "An hourly rate, plus services with their own price per hour or per session and a minimum booking." },
  { icon: MessageCircle, title: "Chat", text: "Photos, emoji reactions, read receipts, saved replies, typing and online indicators. Archive or block anyone." },
  { icon: Star, title: "Reviews", text: "A star rating, a few words and photos. It shows once the Phriend approves it." },
  { icon: LayoutDashboard, title: "Manage dashboard", text: "Profile views, favorites, reviews to approve, bookings by status, earnings and private notes." },
  { icon: Megaphone, title: "Gigs board", text: "Post what you need with a budget and date. Phriends apply in the chat with the gig pinned as the subject." },
  { icon: Bell, title: "Notifications", text: "A bell in the app and an email for every message, booking update, review and profile decision." },
  { icon: ShieldCheck, title: "Safety", text: "Everyone is ID-verified. Profiles, photos and reports get an automated check, and a person approves each profile." },
  { icon: UserX, title: "Your account", text: "Sign in with Google or email. Delete your account yourself at any time; everything goes with it." },
  { icon: Wallet, title: "Cash, in person", text: "Money never moves in the app. Half in cash when you meet, half after. Never more than half upfront." },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "Is Phriend a dating app?",
    a: "No. Phriend is for platonic, paid-by-the-hour company and legit side gigs: a buddy for a food trip, a tour guide, a study partner, someone to keep you company at the hospital. Romantic or sexual services, compensated dating and escort services are banned and get an account removed immediately.",
  },
  {
    q: "How do bookings work?",
    a: "Send a booking request with the date, start time, hours, a public meeting place and a note. If the Phriend lists services, pick one. The Phriend accepts or declines, either side can cancel with a reason, and after the meetup either side marks it completed. Every booking can be added to your calendar.",
  },
  {
    q: "How do I pay?",
    a: "Directly between members, never through Phriend. On a first meetup, hand over 50% in cash when you meet and pay the rest after. E-wallets and bank transfers are for repeat Phriends you already trust, and only to the account shared in the chat. Never pay more than half upfront.",
  },
  {
    q: "What if my Phriend brings someone else?",
    a: "Do not proceed. If the other member arrives with people who were not agreed in the chat, be prudent: cancel the meetup, leave, and report the profile. The same applies to a client who shows up with extra people. A cancellation for this reason is refunded in full.",
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
    a: "Before a profile goes live, every Phriend ticks an agreement: 18 or older and ID-verified; legitimate activities only, nothing romantic, sexual or illegal; public places only and nobody who was not agreed in the chat; half at the start and half after, cash in person on a first meetup; and prudence if a client shows up with unagreed companions. The full text is on the safety page.",
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
    a: "Not yet. Phriend runs in the browser at web.phriend.app on any phone. Add it to your home screen and it works like an app, with chat, bookings and in-app notifications. The App Store and Google Play apps are coming soon.",
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
      name: "How to find a companion on Phriend",
      description: "Hire a verified local companion by the hour in four steps: browse, chat, book, meet in public.",
      url: `${SITE_URL}/#how-it-works`,
      step: CLIENT_STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.text })),
    },
  ],
});

function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[272px] sm:w-[300px]">
      <div className="rounded-[2.75rem] border-[6px] border-ink bg-ink p-1.5 shadow-float ring-1 ring-white/25">
        <div className="aspect-[43/90] overflow-hidden rounded-[2.2rem] bg-white">
          <Image
            src={cdn("/photos/shot-home-v2.png")}
            alt="Phriend app home screen"
            width={430}
            height={900}
            preload
            sizes="(min-width: 640px) 300px, 272px"
            className="size-full object-cover object-top"
          />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute -left-14 top-[30%] hidden w-52 rounded-2xl border border-line bg-white p-3 text-xs leading-snug text-body shadow-float sm:block lg:-left-24"
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
        className="absolute -right-8 bottom-[18%] hidden rounded-2xl border border-line bg-white px-3 py-2.5 text-xs text-body shadow-float sm:block lg:-right-16"
      >
        <p className="flex items-center gap-1.5 font-extrabold text-ink">
          <ShieldCheck size={14} className="text-success" />
          50% downpayment
        </p>
        <p className="mt-0.5 text-muted">Balance after the meetup</p>
      </div>
    </div>
  );
}

function StepTile({ n, icon: Icon, title, text, className = "" }: { n: number; icon: LucideIcon; title: string; text: string; className?: string }) {
  return (
    <li className={`flex flex-col rounded-3xl border border-line bg-white p-6 shadow-card ${className}`}>
      <div className="flex items-center justify-between">
        <span className="grid size-11 place-items-center rounded-2xl bg-brand-soft text-brand">
          <Icon size={22} aria-hidden="true" />
        </span>
        <span className="font-display text-3xl font-semibold text-line">0{n}</span>
      </div>
      <h3 className="mt-5 font-display text-2xl font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed">{text}</p>
    </li>
  );
}

const eyebrow = "text-sm font-extrabold uppercase tracking-wider text-brand-text";
const h2 = "mt-2 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl lg:text-5xl";

export default function Home() {
  return (
    <main id="main" className="flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON_LD }} />
      {/* Hero */}
      <section className="bg-navy-gradient relative overflow-hidden text-white">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 pb-16 pt-14 sm:px-8 sm:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:pb-24 lg:pt-24">
          <div className="max-w-xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[13px] font-extrabold leading-none text-white ring-1 ring-white/15">
              <BadgeCheck size={16} className="shrink-0 text-brand-light" aria-hidden="true" />
              Verified locals across the Philippines
            </p>
            <h1 className="mt-5 font-display text-[44px] font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Find a companion for <span className="text-brand-light">anything</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-white/80 sm:text-xl">
              Food trips, city tours, gigs, hikes, errands and more, with verified locals across the Philippines. Paid by
              the hour, met in public, always legit.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={APP_URL} className="btn-primary inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-lg font-bold">
                Open the app
                <ArrowRight size={20} aria-hidden="true" />
              </a>
              <a href={POST_URL} className="btn-secondary inline-flex items-center justify-center rounded-full px-7 py-3.5 text-lg font-bold">
                Become a Phriend
              </a>
            </div>
            <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-3 text-[14px] font-bold text-white sm:flex sm:flex-wrap sm:gap-x-6">
              {TRUST.map((t) => (
                <li key={t.label} className="flex items-center gap-2">
                  <t.icon size={18} className="shrink-0 text-brand-light" aria-hidden="true" />
                  {t.label}
                </li>
              ))}
            </ul>
            <StoreBadges dark className="mt-8" />
          </div>
          <div className="relative">
            <div aria-hidden="true" className="absolute inset-x-8 top-6 h-[92%] rounded-[3rem] bg-white/5" />
            <PhoneMockup />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" aria-labelledby="how-title" className="bg-surface">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
            <div className="max-w-2xl">
              <p className={eyebrow}>How it works</p>
              <h2 id="how-title" className={h2}>
                Four steps, whichever side you are on.
              </h2>
            </div>
            <div className="relative aspect-[3/2] overflow-hidden rounded-3xl shadow-card">
              <Image
                src={cdn("/photos/life-food-trip.jpg")}
                alt="A client and their companion laughing over grilled skewers at a night street-food stall, a jeepney behind them"
                width={1536}
                height={1024}
                sizes="(min-width: 1024px) 560px, 100vw"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <li className="flex flex-col justify-between rounded-3xl bg-navy p-6 text-white md:col-span-2 lg:col-span-1">
              <Users size={28} className="text-brand-light" aria-hidden="true" />
              <div className="mt-10">
                <h3 className="font-display text-2xl font-semibold">Looking for a companion?</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/85">From scrolling to a real meet-up in an afternoon.</p>
              </div>
            </li>
            {CLIENT_STEPS.map((s, i) => (
              <StepTile key={s.title} n={i + 1} {...s} className={i === CLIENT_STEPS.length - 1 ? "lg:col-span-2" : ""} />
            ))}
            <li className="flex flex-col justify-between rounded-3xl bg-brand-soft p-6 md:col-span-2 lg:col-span-2">
              <p className="font-display text-2xl font-semibold text-ink">Ready when you are.</p>
              <p className="mt-2 text-[15px] leading-relaxed text-body">Verified locals, public places, 50% downpayment. Everything else is up to you and your Phriend.</p>
              <a href={APP_URL} className="btn-primary mt-6 inline-flex w-fit items-center justify-center rounded-full px-6 py-3 font-bold">
                Open the app
              </a>
            </li>
          </ol>

          <ol className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <li className="flex flex-col justify-between rounded-3xl bg-brand-soft p-6 text-ink md:col-span-2 lg:col-span-1">
              <Wallet size={28} className="text-brand" aria-hidden="true" />
              <div className="mt-10">
                <h3 className="font-display text-2xl font-semibold">Want to be a Phriend?</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-body">Set your rate, pick your hours, keep everything you earn.</p>
              </div>
            </li>
            {PHRIEND_STEPS.map((s, i) => (
              <StepTile key={s.title} n={i + 1} {...s} className={i === PHRIEND_STEPS.length - 1 ? "lg:col-span-2" : ""} />
            ))}
            <li className="flex flex-col justify-between rounded-3xl bg-navy p-6 text-white md:col-span-2 lg:col-span-2">
              <p className="font-display text-2xl font-semibold">Your rate, your hours, your rules.</p>
              <p className="mt-2 text-[15px] leading-relaxed text-white/85">Publish once, manage bookings and your schedule in the app, get paid in person.</p>
              <a href={POST_URL} className="btn-primary mt-6 inline-flex w-fit items-center justify-center rounded-full px-6 py-3 font-bold">
                Become a Phriend
              </a>
            </li>
          </ol>
        </div>
      </section>

      {/* Features */}
      <section id="features" aria-labelledby="features-title">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="max-w-2xl">
            <p className={eyebrow}>What you can do</p>
            <h2 id="features-title" className={h2}>
              From first message to review, in one app.
            </h2>
            <p className="mt-4 text-lg leading-relaxed">Bookings, schedules and chat happen in the app. Money never does.</p>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <li key={f.title} className="rounded-2xl border border-line bg-white p-5 shadow-card">
                <f.icon size={22} className="text-brand" aria-hidden="true" />
                <h3 className="mt-3 font-extrabold text-ink">{f.title}</h3>
                <p className="mt-1 text-[15px] leading-relaxed">{f.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Popular activities */}
      <section aria-labelledby="activities-title" className="bg-surface">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className={eyebrow}>Popular activities</p>
              <h2 id="activities-title" className={h2}>
                Whatever the plan, there is a Phriend for it.
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-body">
                Working from home? Cowork at a cafe, take a lunch or walking break, or just have kwentuhan with someone new. 46+ categories, each with its own sub-activities.
              </p>
            </div>
            <a href={APP_URL} className="inline-flex items-center gap-1.5 font-bold text-brand-text hover:underline">
              Browse all activities <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {ACTIVITIES.map((a) => (
              <li key={a.slug}>
                <a
                  href={`${APP_URL}/${a.label.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`} // the app's friendly category landing (same slug rule as web.phriend.app)
                  className="group flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3.5 font-bold text-ink transition-colors hover:border-brand hover:bg-brand-soft"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-surface text-brand transition-colors group-hover:bg-white">
                    <a.icon size={20} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  {a.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Safety */}
      <section id="safety" aria-labelledby="safety-title" className="bg-navy-soft">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className={eyebrow}>Safety</p>
              <h2 id="safety-title" className={h2}>
                Safe by design, not by luck.
              </h2>
              <p className="mt-4 text-lg leading-relaxed">
                Every rule exists because of a real scenario. They are short, they are strict, and they apply to both
                sides.
              </p>
              <Link
                href="/safety"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 font-bold text-white transition-colors hover:bg-navy-light"
              >
                Read the full safety rules <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <div className="relative mt-8 aspect-[4/5] max-w-sm overflow-hidden rounded-3xl shadow-card">
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
            <ul className="grid gap-4 sm:grid-cols-2">
              {RULES.map((r) => (
                <li key={r.title} className="rounded-2xl border border-line bg-white p-5 shadow-card sm:last:odd:col-span-2">
                  <r.icon size={22} className="text-brand" aria-hidden="true" />
                  <h3 className="mt-3 font-extrabold text-ink">{r.title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed">{r.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* For Phriends + pricing */}
      <section id="for-phriends" aria-labelledby="phriends-title">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className={eyebrow}>For Phriends</p>
              <h2 id="phriends-title" className={h2}>
                Turn free time into a side gig.
              </h2>
              <p className="mt-4 text-lg leading-relaxed">
                Know your city, take good photos, speak three languages, or just make waiting rooms less lonely. Set up
                your Phriend profile once, list your services, take bookings, meet in public, get paid.
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
                  "Your profile runs for 30 days; save it again to renew",
                  "Verify once, get the badge everywhere",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <BadgeCheck size={20} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
              <a href={POST_URL} className="btn-primary mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-lg font-bold">
                Become a Phriend <ArrowRight size={20} aria-hidden="true" />
              </a>
            </div>

            <div className="flex flex-col gap-4">
              <div className="relative aspect-[3/2] overflow-hidden rounded-3xl shadow-card">
                <Image
                  src={cdn("/photos/life-hiking.jpg")}
                  alt="Three people taking a selfie on a hilltop trail above rice terraces and the sea"
                  width={1536}
                  height={1024}
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
                <p className="text-sm font-extrabold uppercase tracking-wider text-muted">Pricing</p>
                <p className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">
                  ₱0 <span className="text-2xl text-muted sm:text-3xl">from Phriend</span>
                </p>
                <p className="mt-3 leading-relaxed">
                  Phriend takes no cut yet. Phriends list their own rates, members confirm the plan in the chat and the
                  booking, and pay each other directly: cash on a first meetup, GCash, Maya or bank transfer for repeat
                  Phriends they already trust.
                </p>
                <dl className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-white p-4">
                    <dt className="text-xs font-extrabold uppercase tracking-wider text-muted">Typical rate</dt>
                    <dd className="mt-1 text-xl font-extrabold text-ink">₱300 to ₱1,500 / hr</dd>
                  </div>
                  <div className="rounded-2xl bg-white p-4">
                    <dt className="text-xs font-extrabold uppercase tracking-wider text-muted">Payment split</dt>
                    <dd className="mt-1 text-xl font-extrabold text-ink">50% downpayment, 50% after</dd>
                  </div>
                </dl>
                <p className="mt-4 text-sm text-muted">
                  Rates depend on the activity, the city and the Phriend. Bookings happen in the app; payments never do.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" aria-labelledby="faq-title" className="bg-surface">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <p id="what-is-phriend" className="mb-10 rounded-2xl border border-line bg-white p-5 text-[17px] leading-relaxed shadow-card sm:p-6">
            <strong className="text-ink">What is Phriend?</strong> Phriend is a Philippine app for hiring a verified local companion
            by the hour for legit activities such as food trips, city tours, events, tutoring and errands. Members are 18+, meet
            in public places, and pay 50% in cash on a first meetup and 50% after.
          </p>
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className={eyebrow}>FAQ</p>
              <h2 id="faq-title" className={h2}>
                Quick answers.
              </h2>
              <p className="mt-4 leading-relaxed">
                Something else? Email{" "}
                <a href="mailto:support@phriend.app" className="font-bold text-brand-text underline underline-offset-4">
                  support@phriend.app
                </a>
                .
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {FAQ.map((f) => (
                <details key={f.q} className="group rounded-2xl border border-line bg-white open:shadow-card">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[17px] font-extrabold text-ink [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <ChevronDown size={20} className="shrink-0 text-muted transition-transform group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <p className="px-5 pb-5 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section aria-labelledby="cta-title">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="bg-navy-gradient relative overflow-hidden rounded-[2rem] px-6 py-14 text-center text-white sm:px-12 sm:py-20">
            <div aria-hidden="true" className="absolute -right-16 -top-16 size-64 rounded-full bg-brand/20" />
            <div aria-hidden="true" className="absolute -bottom-20 -left-10 size-56 rounded-full bg-white/5" />
            <h2 id="cta-title" className="relative font-display text-3xl font-semibold leading-tight sm:text-5xl">
              Your next food trip buddy is one message away.
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-lg text-white/85">
              Open the app, pick a city, and say hi. It is free to browse and free to become a Phriend.
            </p>
            <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={APP_URL} className="btn-primary inline-flex items-center justify-center rounded-full px-7 py-3.5 text-lg font-bold">
                Open the app
              </a>
              <a href={POST_URL} className="inline-flex items-center justify-center rounded-full border-2 border-white/70 px-7 py-3.5 text-lg font-bold text-white hover:bg-white/10">
                Become a Phriend
              </a>
            </div>
            <StoreBadges dark className="relative mt-8 [&>div]:justify-center" />
          </div>
        </div>
      </section>
    </main>
  );
}
