import Link from "next/link";
import { Logo, NAV } from "@/components/site-header";
import { APP_URL, POST_URL } from "@/lib/site";

const LEGAL = [
  { href: "/terms", label: "Terms of Use" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/safety", label: "Safety rules" },
  { href: "/community-guidelines", label: "Community guidelines" },
] as const;

// Only accounts that exist are rendered; add the TikTok URL here once that page is live.
const SOCIAL = [
  { href: "https://facebook.com/phriendapp", label: "Facebook" },
  { href: "https://instagram.com/phriendapp", label: "Instagram" },
  { href: "", label: "TikTok" },
] as const;

const link = "rounded-md text-[15px] font-semibold text-body transition-colors hover:text-brand-text";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Link href="/" aria-label="Phriend home" className="inline-block rounded-md">
              <Logo height={36} />
            </Link>
            <p className="mt-3 text-[15px] leading-relaxed">
              Find a verified local friend for food trips, tours, gigs and errands across the Philippines. Paid by the
              hour, met in public, always legit.
            </p>
          </div>

          <nav aria-labelledby="footer-product" className="flex flex-col gap-2.5">
            <h2 id="footer-product" className="text-sm font-extrabold uppercase tracking-wider text-ink">
              Product
            </h2>
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className={link}>
                {n.label}
              </Link>
            ))}
            <a href={APP_URL} className={link}>
              Open the app
            </a>
            <a href={POST_URL} className={link}>
              Become a Phriend
            </a>
          </nav>

          <nav aria-labelledby="footer-legal" className="flex flex-col gap-2.5">
            <h2 id="footer-legal" className="text-sm font-extrabold uppercase tracking-wider text-ink">
              Legal
            </h2>
            {LEGAL.map((n) => (
              <Link key={n.href} href={n.href} className={link}>
                {n.label}
              </Link>
            ))}
          </nav>

          <nav aria-labelledby="footer-social" className="flex flex-col gap-2.5">
            <h2 id="footer-social" className="text-sm font-extrabold uppercase tracking-wider text-ink">
              Follow
            </h2>
            {SOCIAL.filter((s) => s.href).map((n) => (
              <a key={n.href} href={n.href} rel="noreferrer" className={link}>
                {n.label}
              </a>
            ))}
            <Link href="/press" className={link}>
              Press
            </Link>
          </nav>
        </div>

        <p className="mt-12 flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-line pt-6 text-sm font-semibold text-muted">
          <span>© 2026 Phriend · Made in the Philippines</span>
        </p>
      </div>
    </footer>
  );
}
