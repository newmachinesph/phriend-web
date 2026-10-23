import Link from "next/link";
import { Logo, navItems } from "@/components/site-header";
import { APP_URL, PROVIDER_STORE, PROVIDER_URL } from "@/lib/site";
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
  { href: "", label: "TikTok" },
] as const;

const link = "rounded-md text-base font-semibold text-body transition-colors hover:text-brand-text";

export async function SiteFooter() {
  const nav = await navItems();
  const providerStores = [PROVIDER_STORE.ios && { href: PROVIDER_STORE.ios, label: "Phriend Provider on the App Store" }, PROVIDER_STORE.android && { href: PROVIDER_STORE.android, label: "Phriend Provider on Google Play" }].filter(
    (x): x is { href: string; label: string } => Boolean(x),
  );
  return (
    <footer className="border-t border-line bg-surface">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Link href="/" aria-label="Phriend home" className="inline-block rounded-md">
              <Logo height={36} />
            </Link>
            <p className="mt-3 text-base leading-relaxed">
              Local services across the Philippines, from aircon cleaning and tutoring to bookkeeping, photo and video. Verified providers, booked and chatted in the
              app.
            </p>
          </div>

          <nav aria-labelledby="footer-product" className="flex flex-col gap-2.5">
            <h2 id="footer-product" className="font-extrabold text-ink">
              Product
            </h2>
            <a href={APP_URL} className={link}>
              Book a service
            </a>
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className={link}>
                {n.label}
              </Link>
            ))}
            <Link href="/download" className={link}>
              Get the app
            </Link>
          </nav>

          <nav aria-labelledby="footer-providers" className="flex flex-col gap-2.5">
            <h2 id="footer-providers" className="font-extrabold text-ink">
              For providers
            </h2>
            <a href={PROVIDER_URL} className={link}>
              provider.phriend.app
            </a>
            {providerStores.length ? (
              providerStores.map((s) => (
                <a key={s.href} href={s.href} className={link}>
                  {s.label}
                </a>
              ))
            ) : (
              <p className="text-sm leading-relaxed text-muted">The Phriend Provider app is coming to the app stores.</p>
            )}
            <Link href="/creators" className={link}>
              Creators
            </Link>
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
          </nav>
        </div>

        <p className="mt-12 flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-line pt-6 text-sm font-semibold text-body">
          <span>© 2026 Phriend. Made in the Philippines.</span>
        </p>
      </Container>
    </footer>
  );
}
