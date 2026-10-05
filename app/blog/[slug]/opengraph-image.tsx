import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { cdn } from "@/lib/site";
import { findCategory } from "@/lib/landing";
import { findDbPost, readingMinutes } from "@/lib/blog-db";
import { POSTS, findPost } from "../_posts";

export const alt = "Phriend blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
// A share card was rendered again on every request (1.2 MB, about 0.6 s). Static posts are built once; an Ops post
// is cached for an hour.
export const revalidate = 3600;
export const generateStaticParams = () => POSTS.map((p) => ({ slug: p.slug }));

const read = (p: string) => readFileSync(join(process.cwd(), "public", p));
const fredoka = read("fonts/Fredoka-Bold.ttf");
const nunito = read("fonts/Nunito-Bold.ttf");
const logo = `data:image/png;base64,${read("brand/logo-mark.png").toString("base64")}`;

/** Share card for an article: the hero photo with a navy wash, the headline, the logo tile and a read prompt, at 1.91:1. */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const post = findPost(slug);
  const db = post ? null : await findDbPost(slug);
  // Heroes and Ops covers live on the CDN; an Ops cover may still be stored as a path (e.g. /blog/is-phriend-safe.jpg), which cdn() resolves.
  const photo = post ? post.hero.src : db?.cover ? cdn(db.cover) : null;
  const headline = post?.ogTitle ?? post?.title ?? db?.title ?? "Guides for people who could be earning on Phriend";
  // The kicker and read time mirror the blog index card: static posts carry a category, Ops posts a niche and tags.
  const category = db?.niche ? await findCategory(db.niche) : undefined;
  const kicker = post ? `${post.category.label} · Side income` : db ? `${category?.label ?? "Phriend"} · ${db.tags[0] ?? "Guide"}` : "For Phriends · Side income";
  const minutes = post?.readingMinutes ?? (db ? readingMinutes(db.bodyMd) : null);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#0d2251", color: "#fff", fontFamily: "Fredoka" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {photo && <img src={photo} alt="" width={1200} height={630} style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, objectFit: "cover" }} />}
        <div style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, display: "flex", background: "linear-gradient(90deg, rgba(13,34,81,0.97) 0%, rgba(13,34,81,0.9) 40%, rgba(13,34,81,0.45) 68%, rgba(13,34,81,0.05) 100%)" }} />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", width: 760, height: "100%", padding: "52px 0 48px 64px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 30 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 48, height: 48, borderRadius: 12, background: "#ffffff" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logo} alt="" width={30} height={33} />
            </div>
            Phriend
            <span style={{ marginLeft: 6, padding: "4px 14px", borderRadius: 999, background: "rgba(255,255,255,0.14)", fontFamily: "Nunito", fontSize: 20 }}>Blog</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ fontSize: 24, letterSpacing: 4, color: "#ff8a66", fontFamily: "Nunito" }}>{kicker.toUpperCase()}</div>
            <div style={{ fontSize: headline.length > 48 ? 56 : 66, lineHeight: 1.06 }}>{headline}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 6 }}>
              <div style={{ display: "flex", alignItems: "center", padding: "12px 26px", borderRadius: 999, background: "#fe6138", fontFamily: "Nunito", fontSize: 24 }}>Read the guide</div>
              {minutes && <div style={{ fontFamily: "Nunito", fontSize: 22, color: "rgba(255,255,255,0.8)" }}>{`${minutes} min read`}</div>}
            </div>
          </div>
          <div style={{ fontFamily: "Nunito", fontSize: 22, color: "rgba(255,255,255,0.7)" }}>phriend.app/blog</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fredoka", data: fredoka, weight: 700, style: "normal" },
        { name: "Nunito", data: nunito, weight: 700, style: "normal" },
      ],
    },
  );
}
