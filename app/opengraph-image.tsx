import { ImageResponse } from "next/og";

export const alt = "Phriend: Find a friend for anything";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// ponytail: Satori's bundled default font; @fontsource/fredoka is not installed. Install it and pass `fonts` to ImageResponse to match the site wordmark.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          background: "#0d2251",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 56, fontWeight: 700 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: "#fe6138" }} />
          Phriend
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 40, fontSize: 88, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
          <div>Find a friend for</div>
          <div style={{ color: "#fe6138" }}>anything</div>
        </div>
        <div style={{ marginTop: 44, fontSize: 30, color: "rgba(255,255,255,0.75)" }}>
          Verified locals across the Philippines · phriend.app
        </div>
      </div>
    ),
    size,
  );
}
