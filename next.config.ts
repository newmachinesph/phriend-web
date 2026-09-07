import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // phriend.app/@name is the short form of a Phriend's vanity link; the app serves it.
  async redirects() {
    return [{ source: "/@:username", destination: "https://web.phriend.app/@:username", permanent: false }];
  },
};

export default nextConfig;
