import type { Metadata } from "next";
import Image from "next/image";
import { BadgeCheck, Camera, GraduationCap, Map as MapIcon, MessageCircle, PartyPopper, Wrench, type LucideIcon } from "lucide-react";
import { OverlayTool } from "@/components/overlay-tool";
import { breadcrumbJsonLd, cdn, pageMeta, PROVIDER_URL } from "@/lib/site";
import { ButtonLink, Container } from "@/components/ui";

const TITLE = "Show your service, get it booked";
const DESCRIPTION =
  "Creators in the Philippines who offer a service: list it on Phriend, post a TikTok or Reel with your service card, and give one follower a free booking.";
const SHARE_TITLE = "Show your service, get it booked. One follower wins a free booking.";
const SHARE_DESCRIPTION = "Post one video of your work with your Phriend service card. Your followers comment for a week and the best comment wins a free booking of your service: a photo shoot, a lesson, a cleaning, whatever you offer. #BookOnPhriend";
// pageMeta sets the site-wide share image; this page has its own (app/creators/opengraph-image.tsx)
const OG = { url: "/creators/opengraph-image", width: 1200, height: 630, alt: "Show your service, get it booked: Phriend creator collab" };

const base = pageMeta({ title: TITLE, description: DESCRIPTION, path: "/creators" });
export const metadata: Metadata = {
  ...base,
  keywords: ["content creator Philippines", "TikTok creator collab", "Facebook Reels creator", "creator side income", "BookOnPhriend", "Phriend creators"],
  openGraph: { ...base.openGraph, title: SHARE_TITLE, description: SHARE_DESCRIPTION, images: [OG] },
  twitter: { card: "summary_large_image", title: SHARE_TITLE, description: SHARE_DESCRIPTION, images: [OG.url] },
};

const MESSENGER = "https://m.me/phriendapp";

const STEPS = [
  { title: "List your service", text: "At provider.phriend.app, verify your identity, list your service with its price and photos, and set a username so your link reads web.phriend.app/@yourname." },
  { title: "Post one video of your work", text: "A TikTok or Reel showing the service, with your Phriend service card on screen. Make the card below in a few seconds." },
  { title: "Followers comment for 7 days", text: "They follow you and Phriend, like the video, and comment which of your services they'd book." },
  { title: "Best comment wins a free booking", text: "You pick the winner on day 8. They book your service on Phriend, free for them, and Phriend pays your price." },
];

const TOP_BOOKINGS: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Camera, title: "Photo & Video", text: "Portraits, product shots, event coverage" },
  { icon: Wrench, title: "Repairs & Cleaning", text: "Aircon cleaning, appliance check-ups, before and after" },
  { icon: GraduationCap, title: "Tutoring & Lessons", text: "Math, languages, music, a sample lesson" },
  { icon: MapIcon, title: "Tour Guide", text: "City tour, food tour, heritage tour" },
  { icon: PartyPopper, title: "Events", text: "Hosting, coordination, hair and makeup" },
];

const eyebrow = "text-sm font-extrabold uppercase tracking-wider text-brand-text";
const h2 = "mt-2 font-display text-h2 font-bold text-ink";

export default function CreatorsPage() {
  return (
    <main id="main" className="flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd("Creators", "/creators") }} />

      <section className="overflow-hidden bg-navy-gradient text-white">
        <Container className="grid items-center gap-12 pb-16 pt-14 sm:pt-20 lg:grid-cols-[1.15fr_0.85fr] lg:pb-20">
          <div>
          <p className="text-sm font-extrabold uppercase tracking-wider text-mango">#BookOnPhriend · Creator collab</p>
          <h1 className="mt-3 font-display text-display font-extrabold">
            Show your service, <br className="hidden sm:block" />
            <span className="text-brand-light">get it booked.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85">
            Post one video of your work with your Phriend service card on screen. For a week your followers comment for a chance to
            book it, and the best comment wins a free booking: a photo shoot, a lesson, a cleaning, whatever you offer.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#overlay" className="text-lg">
              Make your overlay
            </ButtonLink>
            {/* the earlier creator kit PDF described the old product; questions and the full rules go to Messenger until a new kit is made */}
            <a
              href={MESSENGER}
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-control border-2 border-white/30 px-6 py-3 text-lg font-bold text-white transition-colors hover:bg-white/10"
            >
              <MessageCircle size={20} aria-hidden="true" /> Ask us on Messenger
            </a>
          </div>
          </div>

          {/* AI-generated creator, not a real member */}
          <div className="relative mx-auto w-full max-w-[420px] lg:max-w-none">
            <Image
              src={cdn("/creators/hero.jpg")}
              alt="A creator filming vertical video of herself on a phone in a ring light at a street food stall"
              width={800}
              height={1000}
              priority
              sizes="(min-width: 1024px) 420px, 90vw"
              className="aspect-[4/5] w-full rounded-card object-cover shadow-float"
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
                <p className="mt-1 text-base leading-relaxed">{s.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 flex items-start gap-2.5 text-base font-semibold text-ink">
            <BadgeCheck size={20} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
            The prize is one booking of a service you list, at its listed price. Say where you work in your caption before comments open, so
            the winner is someone you can serve. Message us for the full rules.
          </p>
          <ButtonLink href={PROVIDER_URL} variant="secondary" className="mt-6">
            List your services
          </ButtonLink>
        </Container>
      </section>

      <section aria-labelledby="bookings-title" className="bg-surface">
        <Container className="py-16 sm:py-20">
          <p className={eyebrow}>What followers can book</p>
          <h2 id="bookings-title" className={h2}>
            Top 5 services that make good content.
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed">Work you can show on camera. The winner&apos;s booking turns into your next video.</p>
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
            Your service card, ready for your video.
          </h2>
          <p className="mt-4 mb-8 max-w-2xl leading-relaxed">
            Paste your Phriend link and download a transparent overlay for CapCut, or upload your clip and export the video with the card on it.
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
