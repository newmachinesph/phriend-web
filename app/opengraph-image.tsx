import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { OG_IMAGE } from "@/lib/site";

export const alt = OG_IMAGE.alt;
export const size = { width: OG_IMAGE.width, height: OG_IMAGE.height };
export const contentType = "image/png";

// Static instances (Plus Jakarta Sans Bold, Inter SemiBold): Satori ignores variable-font axes and would draw the default instance.
const read = (p: string) => readFileSync(join(process.cwd(), "public", p));
const jakarta = read("fonts/PlusJakartaSans-Bold.ttf");
const inter = read("fonts/Inter-SemiBold.ttf");
const logo = `data:image/png;base64,${read("brand/logo-mark.png").toString("base64")}`;

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 88px",
          background: "#0d2251",
          color: "#ffffff",
          fontFamily: "Plus Jakarta Sans",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 128,
              height: 128,
              borderRadius: 32,
              background: "#ffffff",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain <img>, next/image does not apply here */}
            <img src={logo} width={82} height={90} alt="" />
          </div>
          <div style={{ fontSize: 72, letterSpacing: -1 }}>Phriend</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", fontSize: 104, lineHeight: 1.02, letterSpacing: -3 }}>
          <div>Local services,</div>
          <div style={{ color: "#fe6138" }}>verified pros</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, fontFamily: "Inter" }}>
          <div style={{ fontSize: 30, color: "rgba(255,255,255,0.8)" }}>Priced per job, hour or session · booked in the app</div>
          <div style={{ fontSize: 26, color: "#ff8a66" }}>phriend.app</div>
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
