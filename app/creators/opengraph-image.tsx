import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Show your service, get it booked: Phriend creator collab, one follower wins a free booking";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const read = (p: string) => readFileSync(join(process.cwd(), "public", p));
const jakarta = read("fonts/PlusJakartaSans-Bold.ttf");
const inter = read("fonts/Inter-SemiBold.ttf");
const uri = (p: string, type: string) => `data:${type};base64,${read(p).toString("base64")}`;
const logo = uri("brand/logo-mark.png", "image/png");
const hero = uri("creators/og-hero.jpg", "image/jpeg"); // AI-generated creator, not a real member
/** Share card for /creators: the campaign line on navy, the creator photo on the right. */
export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#0d2251", color: "#fff", fontFamily: "Plus Jakarta Sans" }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain <img> */}
        <img src={hero} alt="" width={640} height={800} style={{ position: "absolute", top: -90, left: 630, width: 640, height: 800, objectFit: "cover" }} />
        <div style={{ position: "absolute", top: 0, left: 610, width: 190, height: 630, display: "flex", backgroundImage: "linear-gradient(90deg, rgba(13,34,81,1), rgba(13,34,81,0.55), rgba(13,34,81,0))" }} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 120, display: "flex", background: "linear-gradient(0deg, rgba(13,34,81,0.85) 0%, rgba(13,34,81,0) 100%)" }} />

        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", width: 640, height: "100%", padding: "52px 0 48px 64px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 30 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 48, height: 48, borderRadius: 12, background: "#ffffff" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logo} alt="" width={30} height={33} />
            </div>
            Phriend
            <span style={{ marginLeft: 6, padding: "4px 14px", borderRadius: 999, background: "rgba(255,255,255,0.14)", fontFamily: "Inter", fontSize: 20 }}>Creators</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ fontSize: 22, letterSpacing: 4, color: "#ffb627", fontFamily: "Inter" }}>#BOOKONPHRIEND · CREATOR COLLAB</div>
            <div style={{ display: "flex", flexDirection: "column", fontSize: 60, lineHeight: 1.04, letterSpacing: -1.5 }}>
              <div>Show your service,</div>
              <div style={{ color: "#fe6138" }}>get it booked.</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", fontFamily: "Inter", fontSize: 28, lineHeight: 1.3, color: "rgba(255,255,255,0.85)" }}>
              <div>One video. One week.</div>
              <div>One follower wins a free booking.</div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", padding: "12px 26px", borderRadius: 999, background: "#fe6138", fontFamily: "Inter", fontSize: 24 }}>Make your overlay</div>
            <div style={{ fontFamily: "Inter", fontSize: 22, color: "rgba(255,255,255,0.75)" }}>phriend.app/creators</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Plus Jakarta Sans", data: jakarta, weight: 700, style: "normal" },
        { name: "Inter", data: inter, weight: 600, style: "normal" },
      ],
    },
  );
}
