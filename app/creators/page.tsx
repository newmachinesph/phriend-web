import type { Metadata } from "next";
import { ArrowRight, BadgeCheck, Clapperboard, Coffee, Download, Map as MapIcon, MessageCircle, ShoppingBag, Utensils, type LucideIcon } from "lucide-react";
import { OverlayTool } from "@/components/overlay-tool";
import { breadcrumbJsonLd, pageMeta, POST_URL } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Creators: Be the creator people book",
  description:
    "For TikTok and Facebook Reels creators in the Philippines: join Phriend, post one video with your Phriend profile card, and give one follower 2 hours with you. Make your profile overlay here.",
  path: "/creators",
});

const KIT_PDF = "/creators/Phriend-Creator-Collab-Kit.pdf";
const MESSENGER = "https://m.me/phriendapp";

const STEPS = [
  { title: "Become a verified Phriend", text: "Sign up, verify your ID in about two minutes, and set a username so your link reads web.phriend.app/@yourname." },
  { title: "Post one video", text: "A TikTok or Reel with your Phriend profile card on screen. Make the card below in a few seconds." },
  { title: "Followers comment for 7 days", text: "They follow you and Phriend, like the video, and comment where they'd take you for 2 hours." },
  { title: "Best comment wins 2 hours", text: "You pick the winner on day 8. They book you on Phriend, free for them, and Phriend pays your rate." },
];

const TOP_BOOKINGS: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Clapperboard, title: "Content Creator", text: "Vlog, TikTok, photoshoot" },
  { icon: Utensils, title: "Eat & Travel", text: "Food trip, street food, cafe hopping" },
  { icon: MapIcon, title: "Tour Guide", text: "City tour, food tour, heritage tour" },
  { icon: Coffee, title: "Cafe", text: "Coffee chat, dessert run, board games" },
  { icon: ShoppingBag, title: "Shopping", text: "Mall, ukay-ukay, Divisoria run" },
];

const eyebrow = "text-sm font-extrabold uppercase tracking-wider text-brand-text";
const h2 = "mt-2 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl";

export default function CreatorsPage() {
  return (
    <main id="main" className="flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd("Creators", "/creators") }} />

      <section className="bg-navy-gradient text-white">
        <div className="mx-auto w-full max-w-6xl px-5 pb-16 pt-14 sm:px-8 sm:pt-20 lg:pb-20">
          <p className="text-sm font-extrabold uppercase tracking-wider text-mango">#BeMyPhriend · Creator collab</p>
          <h1 className="mt-3 font-display text-[44px] font-semibold leading-[1.02] tracking-tight sm:text-6xl">
            Be the creator <span className="text-brand-light">people book.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85">
            Post one video with your Phriend profile card on screen. For a week your followers comment for a chance to hang out with you, and
            the best comment wins 2 hours with you, booked on Phriend.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#overlay" className="btn-primary inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-lg font-bold">
              Make your overlay <ArrowRight size={20} aria-hidden="true" />
            </a>
            <a
              href={KIT_PDF}
              download
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 px-7 py-3.5 text-lg font-bold text-white transition-colors hover:bg-white/10"
            >
              <Download size={20} aria-hidden="true" /> Creator kit (PDF)
            </a>
          </div>
        </div>
      </section>

      <section aria-labelledby="how-title">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <p className={eyebrow}>How it works</p>
          <h2 id="how-title" className={h2}>
            One video. One week. One winner.
          </h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.title} className="rounded-2xl border border-line bg-white p-5 shadow-card">
                <span className="grid size-10 place-items-center rounded-xl bg-brand font-display text-lg font-bold text-white">{i + 1}</span>
                <h3 className="mt-3 font-extrabold text-ink">{s.title}</h3>
                <p className="mt-1 text-[15px] leading-relaxed">{s.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 flex items-start gap-2.5 text-[15px] font-semibold text-ink">
            <BadgeCheck size={20} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
            Limiting who can win, for example women 18+ only? Say it in your caption before comments open, matching your &quot;Who can book
            you&quot; setting. Full rules are in the creator kit.
          </p>
          <a href={POST_URL} className="btn-secondary mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold">
            Become a Phriend <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section aria-labelledby="bookings-title" className="bg-surface">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <p className={eyebrow}>What followers can book</p>
          <h2 id="bookings-title" className={h2}>
            Top 5 bookings that make good content.
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed">List these on your profile. The winner&apos;s 2 hours turn into your next video.</p>
          <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-5">
            {TOP_BOOKINGS.map((b) => (
              <li key={b.title} className="rounded-2xl border border-line bg-white p-5 text-center shadow-card">
                <b.icon size={32} className="mx-auto text-brand" aria-hidden="true" />
                <h3 className="mt-3 font-extrabold text-ink">{b.title}</h3>
                <p className="mt-1 text-sm text-muted">{b.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="overlay" aria-labelledby="overlay-title" className="scroll-mt-4">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <p className={eyebrow}>Overlay tool</p>
          <h2 id="overlay-title" className={h2}>
            Your Phriend card, ready for your video.
          </h2>
          <p className="mt-4 mb-8 max-w-2xl leading-relaxed">
            Paste your profile link and download a transparent overlay for CapCut, or upload your clip and export the video with the card on it.
            Your video never leaves your device.
          </p>
          <OverlayTool />
        </div>
      </section>

      <section aria-labelledby="help-title" className="bg-surface">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="flex flex-col items-start justify-between gap-6 rounded-[2rem] border border-line bg-white p-8 shadow-card sm:p-12 lg:flex-row lg:items-center">
            <div>
              <p className={eyebrow}>We can help</p>
              <h2 id="help-title" className={h2}>
                Need a hand with the edit?
              </h2>
              <p className="mt-4 max-w-xl leading-relaxed">
                Just let us know. Send your raw clip and your Phriend link and we&apos;ll help with the video editing. Same inbox for joining the
                collab and any questions.
              </p>
            </div>
            <a href={MESSENGER} rel="noreferrer" className="btn-primary inline-flex shrink-0 items-center gap-2 rounded-full px-7 py-3.5 text-lg font-bold">
              <MessageCircle size={20} aria-hidden="true" /> Message us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
