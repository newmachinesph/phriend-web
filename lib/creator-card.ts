import "server-only";
import { API_PLATFORM, catalogue, safeImageUrl } from "@/lib/api";
import { parseCreatorLink } from "@/lib/creator-link";
import { readCapped } from "@/lib/read-capped";
import { appProviderUrl, appServiceUrl } from "@/lib/links";
import { formatPeso, PRICING_SUFFIX, type ClientError, type Pricing, type ServiceCard } from "@/lib/phriend2";

/** What the creator overlay draws: one service. The photo is inlined as a data URI so the browser canvas stays exportable. */
export type CreatorCard = {
  /** the service code or the provider handle (the export file name) */
  key: string;
  /** the provider (or team) name */
  name: string;
  /** the service title */
  service: string;
  /** the service's city, "Online" for an online service, or "" */
  city: string;
  /** "₱1,500" and "/hr", drawn side by side */
  price: string;
  unit: string;
  rating: number | null;
  reviewCount: number;
  verified: boolean;
  /** the link the card shows: the service, or the provider's profile */
  shareUrl: string;
  photo: string | null;
};

type Result = { ok: true; card: CreatorCard } | { ok: false; status: number; error: string };

const CARD_REVALIDATE_S = 120;
const PHOTO_TIMEOUT_MS = 8_000;
/** Service photos are stored at well under this; a larger body is refused before it is buffered whole. */
export const MAX_PHOTO_BYTES = 1_500_000;
/** Only raster types the canvas can draw (no SVG). */
const PHOTO_TYPES = /^image\/(?:jpeg|png|webp|avif|gif)$/;
const NOT_FOUND = "Nothing live at that link. Check the link, and make sure the service is listed and not hidden.";
const UNREACHABLE = "We couldn't reach Phriend just now. Try again in a minute.";

/** Our own stored images only (safeImageUrl); anything else is refused and the card shows the empty tile. */
export async function inlinePhoto(raw: string | null | undefined): Promise<string | null> {
  const url = safeImageUrl(raw);
  if (!url) return null;
  try {
    // no-store: Next's data cache would buffer the whole body; the card response itself is cached (route.ts).
    // redirect "error": an allowed host must not bounce the request elsewhere.
    const res = await fetch(url, { cache: "no-store", redirect: "error", signal: AbortSignal.timeout(PHOTO_TIMEOUT_MS) });
    const type = (res.headers.get("content-type") ?? "").split(";")[0].trim().toLowerCase();
    if (!res.ok || !PHOTO_TYPES.test(type)) {
      await res.body?.cancel().catch(() => {});
      return null;
    }
    const bytes = await readCapped(res, MAX_PHOTO_BYTES);
    return bytes && bytes.byteLength > 0 ? `data:${type};base64,${Buffer.from(bytes).toString("base64")}` : null;
  } catch {
    return null;
  }
}

/** A 404 (or a hidden listing) reads as not found; anything else as api2 not answering. */
const failed = (e: ClientError): Result => (e.kind === "api" && e.status === 404 ? { ok: false, status: 404, error: NOT_FOUND } : { ok: false, status: 502, error: UNREACHABLE });

const place = (s: { visitType: string; city: { name: string } | null }) => s.city?.name ?? (s.visitType === "online" ? "Online" : "");
const priceOf = (centavos: number, pricing: Pricing) => ({ price: formatPeso(centavos), unit: PRICING_SUFFIX[pricing] });

async function serviceCard(code: string): Promise<Result> {
  const r = await catalogue(CARD_REVALIDATE_S).service(code, API_PLATFORM);
  if (!r.ok) return failed(r.error);
  const s = r.data;
  return {
    ok: true,
    card: {
      key: s.code,
      name: s.seller.name,
      service: s.title,
      city: place(s),
      ...priceOf(s.priceCentavos, s.pricing),
      rating: s.rating,
      reviewCount: s.reviewCount,
      verified: s.seller.verified,
      shareUrl: appServiceUrl(s.code),
      photo: await inlinePhoto(s.photos[0]?.url),
    },
  };
}

/** A provider link advertises their first listed service, and the card links to the profile. */
async function providerCard(handle: string): Promise<Result> {
  const r = await catalogue(CARD_REVALIDATE_S).provider(handle, API_PLATFORM);
  if (!r.ok) return failed(r.error);
  const p = r.data;
  const first: ServiceCard | undefined = p.services[0];
  if (!first) return { ok: false, status: 404, error: "That profile has no live service yet. List a service in the Provider app first." };
  return {
    ok: true,
    card: {
      key: p.handle,
      name: p.name,
      service: first.title,
      city: place(first),
      ...priceOf(first.priceCentavos, first.pricing),
      rating: p.rating,
      reviewCount: p.reviewCount,
      verified: p.verified,
      shareUrl: appProviderUrl(p.handle),
      // the service's own photo first: the card shows the work, the provider's face only when there is none
      photo: await inlinePhoto(first.photo?.url ?? p.avatar?.url),
    },
  };
}

export async function getCreatorCard(link: string): Promise<Result> {
  const parsed = parseCreatorLink(link);
  if (!parsed) return { ok: false, status: 400, error: "That doesn't look like a Phriend link. Paste web.phriend.app/services/YOURCODE or web.phriend.app/p/yourhandle." };
  return parsed.kind === "service" ? serviceCard(parsed.code) : providerCard(parsed.handle);
}
