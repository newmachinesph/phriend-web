import { profileKey } from "@/lib/profile-link";
import { API_URL, APP_URL, apiHeaders } from "@/lib/site";

/** What the creator overlay draws: the provider's first service. The photo is inlined as a data URI so the browser canvas stays exportable. */
export type CreatorCard = {
  id: number;
  name: string;
  /** The service the card advertises (the first listed service, else the profile title, else the first activity or category). */
  service: string | null;
  city: string;
  /** The service's price and unit ("session" reads "per job", as in the app); the listing's standard rate when it has no service. */
  rate: number;
  unit: "hour" | "session";
  rating: number;
  reviewCount: number;
  verified: boolean;
  username: string | null;
  profileUrl: string;
  photo: string | null;
};

type Result = { ok: true; card: CreatorCard } | { ok: false; status: number; error: string };

const PHOTO_HOSTS = new Set([new URL(API_URL).host, "cdn.phriend.app"]);
const MAX_PHOTO_BYTES = 4_000_000;

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
const num = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : null);
const firstStr = (v: unknown) => (Array.isArray(v) ? (v.map(str).find(Boolean) ?? null) : null);

/** Photos are either on the CDN or served by the API at /api/img/...; anything else is refused. */
async function inlinePhoto(path: unknown): Promise<string | null> {
  if (typeof path !== "string" || !path) return null;
  let url: URL;
  try {
    url = new URL(path, API_URL);
  } catch {
    return null;
  }
  if (!PHOTO_HOSTS.has(url.host) || !["https:", new URL(API_URL).protocol].includes(url.protocol)) return null;
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    const type = res.headers.get("content-type") ?? "";
    if (!res.ok || !type.startsWith("image/")) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    return buf.byteLength > MAX_PHOTO_BYTES ? null : `data:${type.split(";")[0]};base64,${buf.toString("base64")}`;
  } catch {
    return null;
  }
}

export async function getCreatorCard(link: string): Promise<Result> {
  const key = profileKey(link);
  if (!key) return { ok: false, status: 400, error: "That doesn't look like a Phriend profile link. It should look like web.phriend.app/@yourname." };

  let res: Response;
  try {
    // visit=0: building a card is not a profile view
    res = await fetch(`${API_URL}/api/pages/phriend/${encodeURIComponent(key)}?visit=0`, { headers: apiHeaders(), next: { revalidate: 120 } });
  } catch {
    return { ok: false, status: 502, error: "We couldn't reach Phriend just now. Try again in a minute." };
  }
  if (res.status === 404) return { ok: false, status: 404, error: "No live profile at that link. Check the link, and make sure your profile is posted and not on a break." };
  if (!res.ok) return { ok: false, status: 502, error: "We couldn't load that profile just now. Try again in a minute." };

  const data = (await res.json().catch(() => null)) as { post?: Record<string, unknown>; offerings?: Record<string, unknown>[] } | null;
  const post = data?.post;
  const first = Array.isArray(data?.offerings) ? data.offerings[0] : undefined;
  const id = num(post?.id);
  const name = str(post?.workName);
  if (!post || !id || !name) return { ok: false, status: 502, error: "We couldn't read that profile. Try again in a minute." };
  if (post.sample === true) return { ok: false, status: 404, error: "That's a sample profile. Paste the link to your own profile." };

  const username = str(post.username) || null;
  return {
    ok: true,
    card: {
      id,
      name,
      service: str(first?.title) || str(post.title) || firstStr(post.activities) || firstStr(post.categories),
      city: str(post.city),
      rate: (first ? num(first.price) : null) ?? num(post.pricePerHour) ?? 0,
      unit: first?.unit === "session" ? "session" : "hour",
      rating: num(post.averageStarRating) ?? 0,
      reviewCount: num(post.reviewCount) ?? 0,
      verified: post.verified === true,
      username,
      profileUrl: username ? `${APP_URL}/@${username}` : `${APP_URL}/phriends/${id}`,
      // the service's own photo first: the card shows the work, the provider's face only when there is none
      photo: await inlinePhoto(str(first?.photo) || (Array.isArray(first?.photos) ? first.photos[0] : null) || (Array.isArray(post.imagePath) ? post.imagePath[0] : null)),
    },
  };
}
