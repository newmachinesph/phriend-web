import type { Metadata } from "next";

export const SITE_URL = "https://phriend.app";
export const APP_URL = "https://web.phriend.app";
/** Static site images and files live on the CDN under site/ (upload with scripts/upload-to-cdn.mjs). Dynamic OG images and canvas inputs stay in public/. */
const CDN_URL = "https://cdn.phriend.app/site";
/**
 * "/blog/x.jpg" -> the CDN copy; full URLs pass through (Ops covers may be either). The service-group photos stay in
 * public/groups (phriend.app/groups/*, which the apps load too), so an Ops cover there is served by the site itself.
 */
export const cdn = (path: string) =>
  /^https?:\/\//.test(path) || path.startsWith("/groups/") ? path : `${CDN_URL}${path.startsWith("/") ? "" : "/"}${path}`;
/** The client app (app.phriend.mobile) on Google Play. The web app (APP_URL) works on every phone too. */
export const PLAY_URL = "https://play.google.com/store/apps/details?id=app.phriend.mobile";
/** The client app on the App Store: null until the owner publishes it (OWNER-STEPS); the header and /download then say it is coming. */
export const APP_STORE_URL: string | null = null;
/** Providers list services and manage bookings, earnings and verification here. */
export const PROVIDER_URL = "https://provider.phriend.app";
/** The Phriend Provider app in the stores: null until the owner publishes it; until then the site says it is coming. */
export const PROVIDER_STORE: { ios: string | null; android: string | null } = { ios: null, android: null };
export const CONTACT_EMAIL = "support@phriend.app";
export const LAST_UPDATED = "2026-10-21";

export const SITE_NAME = "Phriend";
export const SITE_TITLE = "Phriend: Book Local Services in the Philippines";
export const SITE_DESCRIPTION =
  "Book local services from verified providers across the Philippines: aircon cleaning, bookkeeping, tutoring, photo and video, driving, errands and more.";

/** Rendered by app/opengraph-image.tsx; listed here because a page-level `openGraph` drops the file-convention image (see pageMeta). */
export const OG_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: "Phriend: local services from verified providers" };

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

/** A page that answers 200 and stays linked but has nothing to list yet (a landing page with no services): out of the index, links still followed. */
export const NOINDEX_FOLLOW = { index: false, follow: true } as const satisfies Metadata["robots"];

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
