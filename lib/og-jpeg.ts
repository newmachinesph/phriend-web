import "server-only";
import sharp from "sharp";

/**
 * Share cards with a full-bleed photo come out of ImageResponse as a ~1 MB PNG. The same card as a JPEG is about a
 * tenth of that, and every link scraper (Facebook, X, LinkedIn, WhatsApp, Viber) reads JPEG, which is not true of WebP.
 * Cards that are flat colour and text stay PNG.
 */
export async function asJpeg(card: Response): Promise<Response> {
  const png = Buffer.from(await card.arrayBuffer());
  const jpeg = await sharp(png).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  const headers = new Headers(card.headers);
  headers.set("Content-Type", "image/jpeg");
  headers.delete("Content-Length");
  return new Response(new Uint8Array(jpeg), { status: card.status, headers });
}
