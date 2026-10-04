import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AppLink } from "@/components/app-link";
import { cdn } from "@/lib/site";

export const NAV = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#safety", label: "Safety" },
  { href: "/#for-phriends", label: "For Phriends" },
  { href: "/#faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
] as const;

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
      className={`w-auto ${className}`}
      style={{ height }}
    />
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" aria-label="Phriend home" className="rounded-md">
          <Logo height={32} priority />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 text-[15px] font-bold text-ink md:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="rounded-md py-1 transition-colors hover:text-brand-text">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <AppLink className="btn-primary hidden rounded-full px-5 py-2.5 text-[15px] font-bold sm:inline-flex" />
          {/* ponytail: native <details> menu, no client JS. It stays open after tapping a same-page link; swap for a client component if that bites. */}
          <details className="group relative md:hidden">
            <summary
              aria-label="Menu"
              className="grid size-11 cursor-pointer list-none place-items-center rounded-full bg-surface text-ink [&::-webkit-details-marker]:hidden"
            >
              <Menu className="group-open:hidden" aria-hidden="true" />
              <X className="hidden group-open:block" aria-hidden="true" />
            </summary>
            <nav
              aria-label="Mobile"
              className="absolute right-0 mt-2 flex w-60 flex-col gap-1 rounded-2xl border border-line bg-white p-2 shadow-float"
            >
              {NAV.map((n) => (
                <Link key={n.href} href={n.href} className="rounded-xl px-3 py-2.5 font-bold text-ink hover:bg-surface">
                  {n.label}
                </Link>
              ))}
              <AppLink className="btn-primary mt-1 rounded-xl px-3 py-2.5 text-center font-bold" />
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
