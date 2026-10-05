import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Phriend photos on the landing pages come from the app's CDN.
  images: { remotePatterns: [{ protocol: "https", hostname: "cdn.phriend.app" }] },
  // phriend.app/@name is the short form of a Phriend's vanity link; the app serves it.
  // Icons and logos keep their names across deploys: a day in the browser instead of a revalidation on every visit.
  async headers() {
    const headers = [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }];
    return ["/icon.png", "/icon.svg", "/apple-icon.png", "/brand/:path*", "/creators/sample-frame.jpg"].map((source) => ({ source, headers }));
  },
  async redirects() {
    return [
      { source: "/@:username", destination: "https://web.phriend.app/@:username", permanent: false },
      // The activity landing pages moved to /services when the product became a local-services marketplace.
      { source: "/rent-a-friend/:activity*", destination: "/services/:activity*", permanent: true },
    ];
  },
};

export default nextConfig;
