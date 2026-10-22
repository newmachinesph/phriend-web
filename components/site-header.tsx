import Image from "next/image";
import Link from "next/link";
import { APP_URL, cdn } from "@/lib/site";
import { ButtonLink, Container } from "@/components/ui";
import { MobileMenu } from "@/components/mobile-menu";
import { StoreBadges } from "@/components/store-badges";
import { getFeatures } from "@/lib/catalogue";

export const NAV = [
  { href: "/services", label: "Services" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#safety", label: "Safety" },
  { href: "/#for-providers", label: "For providers" },
  { href: "/occasions", label: "Occasions" },
  { href: "/teams", label: "Teams" },
  { href: "/#faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
] as const;

/** The nav as the iOS app would show it: Teams only while the client app has teams on (off in v2.0 on iOS). */
export async function navItems() {
  const { teams } = await getFeatures();
  return teams ? NAV : NAV.filter((n) => n.href !== "/teams");
}

const LOGO_RATIO = 1774 / 470;

/** Horizontal Phriend logo at a given pixel height; width follows the source aspect ratio. */
export function Logo({
  height = 32,
  alt = "Phriend",
  className = "",
  priority = false,
}: {
  height?: number;
  alt?: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={cdn("/brand/logo-horizontal.png")}
      alt={alt}
      width={Math.round(height * LOGO_RATIO)}
      height={height}
      priority={priority}
      className={className}
      // Both sides pinned to the attributes: a CSS-only height with `w-auto` rounds the width and trips next/image's aspect-ratio warning.
      style={{ width: Math.round(height * LOGO_RATIO), height }}
    />
  );
}

export async function SiteHeader() {
  const nav = await navItems();
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-white/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label="Phriend home" className="rounded-md">
          <Logo height={32} priority />
        </Link>

        {/* from xl only: with "Book a service" beside it the full nav does not fit at 1024px, so lg keeps the menu */}
        <nav aria-label="Primary" className="hidden items-center gap-6 whitespace-nowrap text-base font-bold text-ink xl:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="rounded-md py-1 transition-colors hover:text-brand-text">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href={APP_URL} size="sm" className="hidden h-11 items-center sm:inline-flex">
            Book a service
          </ButtonLink>
          <MobileMenu>
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="rounded-control px-3 py-2.5 font-bold text-ink hover:bg-surface">
                {n.label}
              </Link>
            ))}
            <Link href="/download" className="rounded-control px-3 py-2.5 font-bold text-ink hover:bg-surface">
              Get the app
            </Link>
            <ButtonLink href={APP_URL} size="sm" className="mt-1 inline-flex h-11 items-center justify-center">
              Book a service
            </ButtonLink>
            <StoreBadges className="mt-2 px-1" />
          </MobileMenu>
        </div>
      </Container>
    </header>
  );
}
