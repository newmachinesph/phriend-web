import Image from "next/image";
import Link from "next/link";
import { Logo, NAV } from "@/components/site-header";
import { AppLink } from "@/components/app-link";
import { PLAY_URL, PROVIDER_URL } from "@/lib/site";
import { Container } from "@/components/ui";

const LEGAL = [
  { href: "/terms", label: "Terms of Use" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/safety", label: "Safety rules" },
  { href: "/community-guidelines", label: "Community guidelines" },
  { href: "/delete-account", label: "Delete your account" },
] as const;

// Only accounts that exist are rendered; add the TikTok URL here once that page is live.
const SOCIAL = [
  { href: "https://facebook.com/phriendapp", label: "Facebook" },
  { href: "https://instagram.com/phriendapp", label: "Instagram" },
  { href: "", label: "TikTok" },
] as const;

const link = "rounded-md text-base font-semibold text-body transition-colors hover:text-brand-text";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Link href="/" aria-label="Phriend home" className="inline-block rounded-md">
              <Logo height={36} />
            </Link>
            <p className="mt-3 text-base leading-relaxed">
              Local services across the Philippines, from aircon cleaning and tutoring to bookkeeping, photo and video. Verified
              providers, booked and chatted in the app.
            </p>
            {/* Google's badge, used as supplied: keep the proportions, no restyling (Play brand guidelines). -ml-2 cancels the PNG's own 8px transparent margin so the badge lines up with the text. */}
            <a href={PLAY_URL} className="-ml-2 mt-5 inline-block rounded-md" aria-label="Get it on Google Play">
              <Image src="/badges/google-play.png" alt="Get it on Google Play" width={646} height={250} className="h-12 w-auto" />
            </a>
          </div>

          <nav aria-labelledby="footer-product" className="flex flex-col gap-2.5">
            <h2 id="footer-product" className="font-extrabold text-ink">
              Product
            </h2>
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className={link}>
                {n.label}
              </Link>
            ))}
            <AppLink className={link} />
            <a href={PROVIDER_URL} className={link}>
              List your services
            </a>
          </nav>

          <nav aria-labelledby="footer-legal" className="flex flex-col gap-2.5">
            <h2 id="footer-legal" className="font-extrabold text-ink">
              Legal
            </h2>
            {LEGAL.map((n) => (
              <Link key={n.href} href={n.href} className={link}>
                {n.label}
              </Link>
            ))}
          </nav>

          <nav aria-labelledby="footer-social" className="flex flex-col gap-2.5">
            <h2 id="footer-social" className="font-extrabold text-ink">
              Company
            </h2>
            {SOCIAL.filter((s) => s.href).map((n) => (
              <a key={n.href} href={n.href} rel="noreferrer" className={link}>
                {n.label}
              </a>
            ))}
            <Link href="/press" className={link}>
              Press
            </Link>
            <Link href="/creators" className={link}>
              Creators
            </Link>
          </nav>
        </div>

        <p className="mt-12 flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-line pt-6 text-sm font-semibold text-body">
          <span>© 2026 Phriend. Made in the Philippines.</span>
        </p>
      </Container>
    </footer>
  );
}
