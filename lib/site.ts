import type { Metadata } from "next";

export const SITE_URL = "https://phriend.app";
export const APP_URL = "https://web.phriend.app";
export const POST_URL = `${APP_URL}/earn`;
export const CONTACT_EMAIL = "support@phriend.app";
export const LAST_UPDATED = "2026-09-07";

export const SITE_NAME = "Phriend";
export const SITE_TITLE = "Phriend: Find a friend for anything in the Philippines";
export const SITE_DESCRIPTION =
  "Find a verified local friend for food trips, city tours, gigs, hikes, errands and more across the Philippines. Paid by the hour, met in public, always legit.";

/** Rendered by app/opengraph-image.tsx; listed here because a page-level `openGraph` drops the file-convention image (see pageMeta). */
export const OG_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: "Phriend: Find a friend for anything" };

/** Per-page metadata. Next replaces nested `openGraph` and `alternates` wholesale per segment, so each page restates the shared bits here. */
export function pageMeta({ title, description, path }: { title?: string; description: string; path: string }): Metadata {
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path, languages: { "en-PH": path } },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_PH",
      url: path,
      title: title ? `${title} | ${SITE_NAME}` : SITE_TITLE,
      description,
      images: [OG_IMAGE],
    },
  };
}

/** Home › Page breadcrumb JSON-LD for inner pages. */
export function breadcrumbJsonLd(name: string, path: string) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name, item: `${SITE_URL}${path}` },
    ],
  });
}
