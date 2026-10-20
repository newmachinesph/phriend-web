import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Ellipsis, Icon, MapPin, Star, type LucideProps } from "lucide-react";
import { activityPath, appServiceUrl, groupPath, type Category, type CategoryGroup, type IconNode, type ServiceItem } from "@/lib/landing";
import { peso } from "@/lib/price";

type Group = CategoryGroup & { categories: Category[] };

/** A category or group icon from the Lucide node the API sends (the ellipsis when there is none). */
export function NodeIcon({ node, ...props }: { node?: IconNode } & Omit<LucideProps, "ref">) {
  if (!node?.length) return <Ellipsis {...props} />;
  return <Icon iconNode={node as Parameters<typeof Icon>[0]["iconNode"]} {...props} />;
}

/** Groups with a photo (public/groups/<slug>.jpg, the same set the app uses); a group added in Ops later gets a tinted header. */
const GROUP_PHOTOS = new Set([
  "errands", "repairs", "cleaning", "care", "pets", "events", "food", "performance", "photo-video", "beauty", "tutoring",
  "lessons", "sports-fitness", "water-sports", "tours", "trips", "rides", "auto", "freelance", "others",
]);
export const groupPhoto = (slug: string) => (GROUP_PHOTOS.has(slug) ? `/groups/${slug}.jpg` : null);

const list = (xs: string[]) => (xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`);

/** The service groups as cards: the photo behind the icon and name, the first few services below on white. */
export function ServiceGroups({ groups, limit }: { groups: Group[]; limit?: number }) {
  const shown = limit ? groups.slice(0, limit) : groups;
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {shown.map((g) => {
        const photo = groupPhoto(g.slug);
        return (
          <li key={g.slug}>
            <Link href={groupPath(g)} className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-white transition-colors hover:border-brand">
              <div className={`relative flex h-40 items-end gap-3 px-5 pb-4 ${photo ? "text-white" : "bg-brand-soft text-ink"}`}>
                {photo && (
                  <>
                    <Image src={photo} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                    <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                  </>
                )}
                <span className={`relative grid size-11 shrink-0 place-items-center rounded-tile ${photo ? "bg-white/20 text-white backdrop-blur-sm" : "bg-white text-brand"}`}>
                  <NodeIcon node={g.iconNode} size={22} aria-hidden="true" />
                </span>
                <h3 className="relative font-display text-h3 font-bold drop-shadow-sm">{g.label}</h3>
              </div>
              <p className="flex-1 px-5 py-4 text-base leading-relaxed">
                {g.categories.length > 4
                  ? `${g.categories.slice(0, 4).map((c) => c.label).join(", ")} and ${g.categories.length - 4} more`
                  : list(g.categories.map((c) => c.label))}
              </p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** A group's services as cards: icon, name, its activities, links to the category page. */
export function ServiceCards({ categories }: { categories: Category[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((c) => (
        <li key={c.slug}>
          <Link href={activityPath(c)} className="flex h-full flex-col rounded-card border border-line bg-white p-6 transition-colors hover:border-brand">
            <span className="grid size-11 place-items-center rounded-tile bg-surface text-ink">
              <NodeIcon node={c.iconNode} size={22} aria-hidden="true" />
            </span>
            <h3 className="mt-4 font-display text-h3 font-bold text-ink">{c.label}</h3>
            {c.activities.length > 0 && <p className="mt-1.5 text-base leading-relaxed">{c.activities.slice(0, 5).join(", ")}</p>}
          </Link>
        </li>
      ))}
    </ul>
  );
}

const VISIT = { in_person: "In person", online: "Online", hybrid: "Hybrid" } as const;
/** Only CDN photos go through next/image (next.config.ts allows that host); anything else falls back to the icon or initial. */
const cdnPhoto = (url: string | null | undefined) => (url && url.startsWith("https://cdn.phriend.app/") ? url : null);

/** Where a service happens, in a few words: "Nationwide", "Cebu City: Lahug, IT Park +2", "Makati". */
export function serviceArea(s: ServiceItem) {
  const city = s.city || s.provider.city;
  if (s.scope === "nationwide") return "Nationwide";
  if (s.scope === "areas" && s.coverage?.length) return `${city}: ${s.coverage.slice(0, 2).join(", ")}${s.coverage.length > 2 ? ` +${s.coverage.length - 2}` : ""}`;
  return city;
}

/** One service on a landing page: its photo (or the category icon, never the person), title, price, area, and who offers it with a small round avatar. */
export function ServiceTile({ item, icon }: { item: ServiceItem; icon?: IconNode }) {
  const photo = cdnPhoto(item.photo);
  const avatar = cdnPhoto(item.provider.photo);
  const p = item.provider;
  return (
    <a href={appServiceUrl(item)} title={item.title} className="group flex h-full min-w-0 flex-col overflow-hidden [contain:inline-size] rounded-card border border-line bg-white transition-colors hover:border-brand">
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-soft">
        {/* the category icon always sits underneath: a photo that fails to load (alt="") leaves it showing, never a broken image */}
        <span className="absolute inset-0 grid place-items-center text-brand">
          <NodeIcon node={icon} size={44} aria-hidden="true" />
        </span>
        {photo && <Image src={photo} alt="" fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />}
        {item.visitType && <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-xs font-bold text-ink">{VISIT[item.visitType]}</span>}
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-4">
        <p className="line-clamp-2 font-display text-h3 font-bold text-ink wrap-anywhere">{item.title}</p>
        {/* up to ₱1,000,000: the amount never breaks, the unit drops to the next line when the tile is narrow */}
        <p className="mt-1 font-bold text-ink">
          <span className="whitespace-nowrap">{peso(item.price)}</span>
          <wbr />
          <span className="whitespace-nowrap text-xs font-semibold text-muted">{item.unit === "hour" ? "/hr" : " per job"}</span>
        </p>
        <p className="mt-0.5 flex min-w-0 items-center gap-1 text-sm text-muted" title={serviceArea(item)}>
          <MapPin size={14} className="shrink-0 text-brand" aria-hidden="true" />
          <span className="min-w-0 truncate">{serviceArea(item)}</span>
        </p>
        <p className="mt-auto flex min-w-0 items-center gap-1.5 pt-3 text-sm" title={p.workName}>
          {/* the initial sits under the photo, so a photo that fails to load still shows the initial */}
          <span aria-hidden="true" className="relative grid size-6 shrink-0 place-items-center overflow-hidden rounded-full bg-brand-soft text-xs font-bold text-brand-text">
            {p.workName.slice(0, 1)}
            {avatar && <Image src={avatar} alt="" width={24} height={24} className="absolute inset-0 size-6 object-cover" />}
          </span>
          {/* avatar, name, verified: no "by" before the provider (owner rule, same as the apps) */}
          <b className="min-w-0 truncate text-ink">{p.workName}</b>
          {p.verified && <BadgeCheck size={14} className="shrink-0 fill-verify text-white" aria-label="Verified" />}
          <span className="ml-auto inline-flex shrink-0 items-center gap-1 font-bold text-body">
            <Star size={13} className="fill-mango text-mango" aria-hidden="true" /> {p.reviewCount ? p.rating.toFixed(1) : "New"}
          </span>
        </p>
      </div>
    </a>
  );
}
