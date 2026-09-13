import { getCreatorCard } from "@/lib/creator-card";

/** GET /creators/card?link=<Phriend profile link> -> the data the creator overlay draws. */
export async function GET(request: Request) {
  const result = await getCreatorCard(new URL(request.url).searchParams.get("link") ?? "");
  return Response.json(result.ok ? result.card : { error: result.error }, {
    status: result.ok ? 200 : result.status,
    headers: { "X-Robots-Tag": "noindex" }, // a card is a real person's profile
  });
}
