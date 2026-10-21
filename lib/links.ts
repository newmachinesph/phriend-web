import { APP_URL } from "@/lib/site";
import type { CityPage } from "@/lib/cities";

/** Site paths for the landing pages (the category and group slugs come from api2). */
export const categoryPath = (c: { slug: string }) => `/services/${c.slug}`;
export const groupPath = (g: { slug: string }) => `/services/${g.slug}`;
export const cityPath = (city: CityPage) => `/${city.slug}`;
export const comboPath = (c: { slug: string }, city: CityPage) => `/${c.slug}-in-${city.slug}`;

/**
 * Links into the client web app, which owns these pages, their SSR and their share images (SPEC 13c §1.2, 13e §2.1).
 * The site never renders a service, provider or team page itself.
 */
const enc = encodeURIComponent;
export const appServiceUrl = (code: string) => `${APP_URL}/services/${enc(code)}`;
export const appProviderUrl = (handle: string) => `${APP_URL}/p/${enc(handle)}`;
export const appTeamUrl = (slug: string) => `${APP_URL}/teams/${enc(slug)}`;
export const appGroupUrl = (g: { slug: string }) => `${APP_URL}/categories/${enc(g.slug)}`;
export const appCategoryUrl = (group: { slug: string }, c: { slug: string }) => `${APP_URL}/categories/${enc(group.slug)}/${enc(c.slug)}`;
export const appCityUrl = (cityId: number) => `${APP_URL}/search?city=${cityId}`;
/** Where a seller's name links: the provider page or the team page in the app. */
export const appSellerUrl = (s: { kind: "individual" | "team"; handle: string | null; slug: string | null }) =>
  s.kind === "team" && s.slug ? appTeamUrl(s.slug) : s.handle ? appProviderUrl(s.handle) : APP_URL;
