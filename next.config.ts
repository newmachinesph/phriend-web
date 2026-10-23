import type { NextConfig } from "next";
import { LEGACY_REDIRECTS } from "./legacy-redirects";
import { securityHeaders } from "./lib/security-headers";

// A plain object, not a phase function: Hostinger's build replaces a function-form config with its own (standalone
// output only), which dropped the image hosts, redirects and headers below. There is no default API (SPEC 13e §2.1):
// lib/api.ts throws when API_URL is unset, so a build without it fails and a local build never reads production.
const security = securityHeaders({ dev: process.env.NODE_ENV === "development" });

const config: NextConfig = {
  poweredByHeader: false,
  // Phriend photos on the landing pages come from the app's CDN.
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.phriend.app" }],
    // 480: the home phone mockup (272-300 CSS px) on a 1.75x phone needs ~480 px, which otherwise rounds up to 640
    imageSizes: [32, 48, 64, 96, 128, 256, 384, 480],
    // 60 for photos under a dark gradient (service group cards), 75 (the default) for everything else
    qualities: [60, 75],
  },
  // Hostinger counts threads against the account's process limit (shared by every site), and sharp would otherwise
  // start half the server's cores worth of threads per process; the build's page workers likewise without `cpus`.
  experimental: { imgOptConcurrency: 1, cpus: 2 },
  // Icons and logos keep their names across deploys: a day in the browser instead of a revalidation on every visit.
  async headers() {
    // CSP, HSTS, framing and the rest on every response (lib/security-headers.ts); long-lived icons on top
    const headers = [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }];
    return [
      { source: "/:path*", headers: security },
      ...["/icon.png", "/icon.svg", "/apple-icon.png", "/brand/:path*"].map((source) => ({ source, headers })),
    ];
  },
  async redirects() {
    return [
      // The Android page is now the download page (old links from the web app).
      { source: "/android", destination: "/download", permanent: true },
      // The activity landing pages moved to /services when the product became a local-services marketplace.
      { source: "/rent-a-friend/:activity*", destination: "/services/:activity*", permanent: true },
      // Old articles, category pages and city pages: to the v2 page that replaced each one (legacy-redirects.ts).
      ...LEGACY_REDIRECTS,
    ];
  },
};

export default config;
