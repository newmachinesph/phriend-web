"use client";

import { useRef, type ReactNode } from "react";
import { Menu, X } from "lucide-react";

/**
 * The phone menu: a native <details> (works before hydration), closed again when a link inside it is tapped. The header
 * stays mounted across client navigations, so without this the menu stayed open over the next page and over same-page
 * anchors (How it works, FAQ). Closing it (a link, or Esc anywhere inside) hands focus back to the menu button, so
 * keyboard and screen reader users are not left on a link that is no longer shown.
 */
export function MobileMenu({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const button = useRef<HTMLElement>(null);
  const close = () => {
    if (!ref.current?.open) return false;
    ref.current.open = false;
    button.current?.focus({ preventScroll: true });
    return true;
  };
  return (
    <details
      ref={ref}
      className="group relative xl:hidden"
      onKeyDown={(e) => {
        if (e.key === "Escape" && close()) e.preventDefault();
      }}
    >
      <summary
        ref={button}
        aria-label="Menu"
        className="grid size-11 cursor-pointer list-none place-items-center rounded-full bg-surface text-ink [&::-webkit-details-marker]:hidden"
      >
        <Menu className="group-open:hidden" aria-hidden="true" />
        <X className="hidden group-open:block" aria-hidden="true" />
      </summary>
      <nav
        aria-label="Mobile"
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a")) close();
        }}
        className="absolute right-0 mt-2 flex w-60 flex-col gap-1 rounded-card border border-line bg-white p-2 shadow-float"
      >
        {children}
      </nav>
    </details>
  );
}
