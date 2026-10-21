import "server-only";
import { catalogueApi, appConfigApi, createClient, createSafeImageUrl, type CataloguePlatform } from "@/lib/phriend2";

/**
 * The site reads api2's public /v1 routes from the Next server only (SPEC 13e §2.1): no session, no BFF secret, no
 * server key. `API_URL` is required: there is no default, so a local build can never read production. Locally it is
 * http://localhost:8040 (`npm run dev:v2`).
 */
const RAW_API_URL = process.env.API_URL?.trim();
if (!RAW_API_URL) throw new Error("API_URL is not set. The site reads the Phriend API from it (locally http://localhost:8040, see `npm run dev:v2`).");
export const API_URL = RAW_API_URL.replace(/\/+$/, "");

/** The platform the site asks for: the iOS store policy, so the site lists exactly what the App Store build shows. */
export const API_PLATFORM: CataloguePlatform = "ios";

/**
 * A local dev run (API on loopback) also renders photos from the local MinIO bucket api2 writes to. Never in a
 * production build, so a misconfigured server cannot widen the allowed image origins.
 */
const LOCAL_API = process.env.NODE_ENV !== "production" && /^http:\/\/(?:localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/.test(API_URL);
const CDN_BASE = "https://cdn.phriend.app";
const LOCAL_MEDIA_BASE = "http://localhost:9000/phriend";

/** Our own stored images only (a `v2/` key on the CDN, or local MinIO in a local run); anything else is null and the page shows the fallback. */
export const safeImageUrl = createSafeImageUrl({ bases: LOCAL_API ? [CDN_BASE, LOCAL_MEDIA_BASE] : [CDN_BASE] });

/** Whether next/image may optimise this URL (next.config allows the CDN only); local MinIO photos are served as they are. */
export const isCdnImage = (url: string) => url.startsWith(`${CDN_BASE}/`);

/** A typed api2 client whose reads are cached by Next for `revalidate` seconds (ISR). */
function clientFor(revalidate: number) {
  return createClient({
    baseUrl: API_URL,
    fetch: (input, init) => fetch(input, { ...init, next: { revalidate } }),
  });
}

/** The catalogue reads (categories, cities, feed, services, providers, teams), cached for `revalidate` seconds. */
export const catalogue = (revalidate: number) => catalogueApi(clientFor(revalidate));
/** GET /v1/app/config, cached for `revalidate` seconds. */
export const appConfig = (revalidate: number) => appConfigApi(clientFor(revalidate));
