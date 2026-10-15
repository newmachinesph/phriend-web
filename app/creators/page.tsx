import type { Metadata } from "next";
import Image from "next/image";
import { BadgeCheck, Clapperboard, Coffee, Download, Map as MapIcon, MessageCircle, ShoppingBag, Utensils, type LucideIcon } from "lucide-react";
import { OverlayTool } from "@/components/overlay-tool";
import { breadcrumbJsonLd, cdn, pageMeta, POST_URL } from "@/lib/site";
import { ButtonLink, Container } from "@/components/ui";

const TITLE = "Be the creator people book";
const DESCRIPTION =
  "For TikTok and Facebook Reels creators in the Philippines: join Phriend, post one video with your Phriend profile card, and give one follower a free session, a photo shoot or a guided tour. Make your profile overlay here.";
const SHARE_TITLE = "Be the creator people book. One follower wins a free session.";
const SHARE_DESCRIPTION = "Post one video with your Phriend profile card. Your followers comment for a week and the best comment wins a free session with you: a photo shoot, a guided tour, whatever you offer. #BeMyPhriend";
// pageMeta sets the site-wide share image; this page has its own (app/creators/opengraph-image.tsx)
const OG = { url: "/creators/opengraph-image", width: 1200, height: 630, alt: "Be the creator people book: Phriend creator collab" };

const base = pageMeta({ title: TITLE, description: DESCRIPTION, path: "/creators" });
export const metadata: Metadata = {
  ...base,
  keywords: ["content creator Philippines", "TikTok creator collab", "Facebook Reels creator", "creator side income", "BeMyPhriend", "Phriend creators"],
  openGraph: { ...base.openGraph, title: SHARE_TITLE, description: SHARE_DESCRIPTION, images: [OG] },
  twitter: { card: "summary_large_image", title: SHARE_TITLE, description: SHARE_DESCRIPTION, images: [OG.url] },
};

const KIT_PDF = cdn("/creators/Phriend-Creator-Collab-Kit.pdf");
const MESSENGER = "https://m.me/phriendapp";

const STEPS = [
  { title: "Become a verified Phriend", text: "Sign up, verify your ID in about two minutes, and set a username so your link reads web.phriend.app/@yourname." },
  { title: "Post one video", text: "A TikTok or Reel with your Phriend profile card on screen. Make the card below in a few seconds." },
  { title: "Followers comment for 7 days", text: "They follow you and Phriend, like the video, and comment which of your services they'd book." },
  { title: "Best comment wins a free session", text: "You pick the winner on day 8. They book you on Phriend, free for them, and Phriend pays your rate." },
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

      <section className="overflow-hidden bg-navy-gradient text-white">
        <Container className="grid items-center gap-12 pb-16 pt-14 sm:pt-20 lg:grid-cols-[1.15fr_0.85fr] lg:pb-20">
          <div>
          <p className="text-sm font-extrabold uppercase tracking-wider text-mango">#BeMyPhriend · Creator collab</p>
          <h1 className="mt-3 font-display text-[44px] font-semibold leading-[1.02] tracking-tight sm:text-6xl">
            Be the creator <br className="hidden sm:block" />
            <span className="text-brand-light">people book.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85">
            Post one video with your Phriend profile card on screen. For a week your followers comment for a chance to book you, and
            the best comment wins a free session: a photo shoot, a guided tour, whatever you offer.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#overlay" className="text-lg">
              Make your overlay
            </ButtonLink>
            <a
              href={KIT_PDF}
              download
              className="inline-flex items-center justify-center gap-2 rounded-control border-2 border-white/30 px-6 py-3 text-lg font-bold text-white transition-colors hover:bg-white/10"
            >
              <Download size={20} aria-hidden="true" /> Creator kit (PDF)
            </a>
          </div>
          </div>

          {/* AI-generated creator and the sample overlay card, not a real member */}
          <div className="relative mx-auto w-full max-w-[420px] pl-10 sm:pl-16 lg:max-w-none">
            <Image
              src={cdn("/creators/hero.jpg")}
              alt="A creator filming vertical video of herself on a phone in a ring light at a street food stall"
              width={800}
              height={1000}
              priority
              sizes="(min-width: 1024px) 420px, 90vw"
              className="aspect-[4/5] w-full rounded-card object-cover shadow-float"
            />
            <Image
              src={cdn("/creators/og-card.png")}
              alt="Example Phriend profile overlay card with a Win a free session with me tag"
              width={320}
              height={547}
              sizes="(min-width: 1024px) 190px, 40vw"
              className="absolute bottom-8 left-0 w-[42%] max-w-[190px] -rotate-6 drop-shadow-2xl"
            />
          </div>
        </Container>
      </section>

      <section aria-labelledby="how-title">
        <Container className="py-16 sm:py-20">
          <p className={eyebrow}>How it works</p>
          <h2 id="how-title" className={h2}>
            One video. One week. One winner.
          </h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.title} className="rounded-card border border-line bg-white p-5">
                <span className="grid size-10 place-items-center rounded-tile bg-brand font-display text-lg font-bold text-white">{i + 1}</span>
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
          <ButtonLink href={POST_URL} variant="secondary" className="mt-6">
            Become a Phriend
          </ButtonLink>
        </Container>
      </section>

      <section aria-labelledby="bookings-title" className="bg-surface">
        <Container className="py-16 sm:py-20">
          <p className={eyebrow}>What followers can book</p>
          <h2 id="bookings-title" className={h2}>
            Top 5 bookings that make good content.
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed">List these on your profile. The winner&apos;s session turns into your next video.</p>
          <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-5">
            {TOP_BOOKINGS.map((b) => (
              <li key={b.title} className="rounded-card border border-line bg-white p-5 text-center">
                <b.icon size={32} className="mx-auto text-brand" aria-hidden="true" />
                <h3 className="mt-3 font-extrabold text-ink">{b.title}</h3>
                <p className="mt-1 text-sm text-muted">{b.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section id="overlay" aria-labelledby="overlay-title" className="scroll-mt-4">
        <Container className="py-16 sm:py-20">
          <p className={eyebrow}>Overlay tool</p>
          <h2 id="overlay-title" className={h2}>
            Your Phriend card, ready for your video.
          </h2>
          <p className="mt-4 mb-8 max-w-2xl leading-relaxed">
            Paste your profile link and download a transparent overlay for CapCut, or upload your clip and export the video with the card on it.
            Your video never leaves your device.
          </p>
          <OverlayTool />
        </Container>
      </section>

      <section aria-labelledby="help-title" className="bg-surface">
        <Container className="py-16 sm:py-20">
          <div className="flex flex-col items-start justify-between gap-6 rounded-card border border-line bg-white p-8 sm:p-12 lg:flex-row lg:items-center">
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
            <a href={MESSENGER} rel="noreferrer" className="btn-primary inline-flex shrink-0 items-center gap-2 rounded-control px-6 py-3 text-lg font-extrabold">
              <MessageCircle size={20} aria-hidden="true" /> Message us
            </a>
          </div>
        </Container>
      </section>
    </main>
  );
}
