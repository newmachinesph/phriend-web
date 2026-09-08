import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

/** The marketing site's own web app manifest (the audit flagged the "add to home screen" pitch without one). The app at web.phriend.app has its own. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0d2251",
    icons: [
      { src: "/icon.png", sizes: "192x192", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
  };
}
