import type { NextConfig } from "next";
import { PHASE_PRODUCTION_BUILD } from "next/constants";

/** Slugs of articles from the earlier product that search engines may still list: they go to the blog index. */
const DROPPED_ARTICLES = [
  "how-phriend-bookings-and-payment-work",
  "is-phriend-safe",
  "legit-side-hustles-for-students-in-the-philippines",
  "how-much-do-tour-guides-charge-in-cebu",
  "how-ofws-can-arrange-company-for-aging-parents",
  "who-can-accompany-your-parent-to-a-checkup",
  "companion-for-mom-or-dad-beyond-video-calls",
  "arrange-company-for-a-senior-loved-one-while-working",
  "days-out-for-your-senior-parent-with-a-companion",
  "kasama-for-errands-tasks-you-can-book-a-companion-for",
  "what-a-nonmedical-companion-can-help-with",
  "book-a-kasama-for-your-checkup",
  "questions-to-ask-before-booking-a-companion-for-your-parent",
  "booking-a-companion-for-someone-else",
  "is-rent-a-friend-legal-in-the-philippines",
  "new-to-manila-explore-with-a-local-companion",
  "just-moved-for-work-your-first-month-with-company",
  "going-to-a-concert-alone",
  "your-first-gym-visit-doesnt-have-to-be-solo",
  "visiting-the-philippines-solo",
  "bring-a-companion-to-your-first-class",
  "birthday-plans-fell-through",
  "need-a-shopping-buddy",
  "working-from-home-coffee-break-with-company",
  "attending-an-event-alone",
];

const nextConfig = (phase: string): NextConfig => {
  // The site reads api2 at build time and on revalidation, and there is no default API (SPEC 13e §2.1): a build without
  // API_URL fails here, so a local build can never read production by accident.
  if (phase === PHASE_PRODUCTION_BUILD && !process.env.API_URL?.trim()) {
    throw new Error("API_URL is not set. Build with the api2 origin, e.g. API_URL=http://localhost:8040 for a local build.");
  }
  return config;
};

const config: NextConfig = {
  // Phriend photos on the landing pages come from the app's CDN.
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.phriend.app" }],
    // 480: the home phone mockup (272-300 CSS px) on a 1.75x phone needs ~480 px, which otherwise rounds up to 640
    imageSizes: [32, 48, 64, 96, 128, 256, 384, 480],
    // 60 for photos under a dark gradient (service group cards), 75 (the default) for everything else
    qualities: [60, 75],
  },
  // Hostinger counts threads against the account's process limit (shared by every site), and sharp would otherwise
  // start half the server's cores worth of threads per process.
  experimental: { imgOptConcurrency: 1 },
  // Icons and logos keep their names across deploys: a day in the browser instead of a revalidation on every visit.
  async headers() {
    const headers = [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }];
    return ["/icon.png", "/icon.svg", "/apple-icon.png", "/brand/:path*"].map((source) => ({ source, headers }));
  },
  async redirects() {
    return [
      // The Android page is now the download page (old links from the web app).
      { source: "/android", destination: "/download", permanent: true },
      // The activity landing pages moved to /services when the product became a local-services marketplace.
      { source: "/rent-a-friend/:activity*", destination: "/services/:activity*", permanent: true },
      // Old articles (not carried into v2): to the blog index. Temporary, so browsers do not hold on to them.
      ...DROPPED_ARTICLES.map((slug) => ({ source: `/blog/${slug}`, destination: "/blog", permanent: false })),
    ];
  },
};

export default nextConfig;
