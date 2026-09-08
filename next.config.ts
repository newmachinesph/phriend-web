import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Phriend photos on the landing pages come from the app's CDN.
  images: { remotePatterns: [{ protocol: "https", hostname: "cdn.phriend.app" }] },
  // phriend.app/@name is the short form of a Phriend's vanity link; the app serves it.
  async redirects() {
    return [{ source: "/@:username", destination: "https://web.phriend.app/@:username", permanent: false }];
  },
};

export default nextConfig;
