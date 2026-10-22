import { getCreatorCard } from "@/lib/creator-card";

/** A card is public data that changes rarely: shared caches serve repeats for 2 minutes, so a burst of the same link hits api2 once. */
const CARD_CACHE = "public, max-age=0, s-maxage=120, stale-while-revalidate=600";

/** GET /creators/card?link=<a Phriend service or profile link> -> the data the creator overlay draws. */
export async function GET(request: Request) {
  const result = await getCreatorCard(new URL(request.url).searchParams.get("link") ?? "");
  return Response.json(result.ok ? result.card : { error: result.error }, {
    status: result.ok ? 200 : result.status,
    headers: {
      "X-Robots-Tag": "noindex", // a card names a real provider
      "Cache-Control": result.ok ? CARD_CACHE : "no-store",
    },
  });
}
