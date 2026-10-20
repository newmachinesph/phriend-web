import { API_URL, apiHeaders } from "@/lib/site";

/**
 * The switches the apps read (GET /api/auth/me `features`, public when signed out); teams stays hidden until Ops turns
 * it on. Off when the API is unreachable, as in the apps.
 */
export async function getFeatures(): Promise<{ teams: boolean }> {
  try {
    const r = await fetch(`${API_URL}/api/auth/me`, { headers: apiHeaders(), next: { revalidate: 600 } });
    if (!r.ok) return { teams: false };
    const d = (await r.json()) as { features?: { teams?: unknown } };
    return { teams: d.features?.teams === true };
  } catch {
    return { teams: false };
  }
}
