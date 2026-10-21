import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { BadgeCheck, Ellipsis, icons, MapPin, Star, type LucideProps } from "lucide-react";
import { formatPeso, PRICING_SUFFIX, type Category, type ServiceCard } from "@/lib/phriend2";
import { isCdnImage, safeImageUrl } from "@/lib/api";
import type { Group } from "@/lib/catalogue";
import { appServiceUrl, categoryPath, groupPath } from "@/lib/links";
import { list } from "@/lib/landing";

/** A category or group icon by its Lucide name from api2 ("AirVent"); the ellipsis when the name is unknown or missing. */
export function CatalogIcon({ name, ...props }: { name: string | null | undefined } & Omit<LucideProps, "ref" | "name">) {
  const Glyph = name && Object.hasOwn(icons, name) ? icons[name as keyof typeof icons] : Ellipsis;
  return <Glyph {...props} />;
}

/** Groups with a photo (public/groups/<slug>.jpg, the same set the apps use); a group added in Ops later gets a tinted header. */
const GROUP_PHOTOS = new Set([
  "errands", "repairs", "cleaning", "care", "pets", "events", "food", "performance", "photo-video", "beauty", "tutoring",
  "lessons", "sports-fitness", "water-sports", "tours", "trips", "rides", "auto", "freelance", "others",
]);
export const groupPhoto = (slug: string | undefined) => (slug && GROUP_PHOTOS.has(slug) ? `/groups/${slug}.jpg` : null);

/** The line shown where a list is empty because api2 did not answer (SPEC 13e §2.1). */
export const LOADING_NOTE = "Services are loading. Browse them in the app.";

/** The service groups as cards: the photo behind the icon and name, the first few categories below on white. */
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
                    <Image src={photo} alt="" fill quality={60} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                    <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                  </>
                )}
                <span className={`relative grid size-11 shrink-0 place-items-center rounded-tile ${photo ? "bg-white/20 text-white backdrop-blur-sm" : "bg-white text-brand"}`}>
                  <CatalogIcon name={g.icon} size={22} aria-hidden="true" />
                </span>
                <h3 className="relative min-w-0 font-display text-h3 font-bold drop-shadow-sm wrap-anywhere">{g.label}</h3>
              </div>
              <p className="flex-1 px-5 py-4 text-base leading-relaxed">
                {g.categories.length > 4
                  ? `${g.categories
                      .slice(0, 4)
                      .map((c) => c.label)
                      .join(", ")} and ${g.categories.length - 4} more`
                  : list(g.categories.map((c) => c.label))}
              </p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** A group's categories as cards linking to their landing pages. */
export function CategoryCards({ categories }: { categories: Category[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((c) => (
        <li key={c.slug}>
          <Link href={categoryPath(c)} className="flex h-full items-center gap-4 rounded-card border border-line bg-white p-5 transition-colors hover:border-brand">
            <span className="grid size-11 shrink-0 place-items-center rounded-tile bg-surface text-ink">
              <CatalogIcon name={c.icon} size={22} aria-hidden="true" />
            </span>
            <h3 className="min-w-0 font-display text-h3 font-bold text-ink wrap-anywhere">{c.label}</h3>
          </Link>
        </li>
      ))}
    </ul>
  );
}

const VISIT = { in_person: "In person", online: "Online", hybrid: "Hybrid" } as const;

/** Where a service happens, in a few words: "Nationwide", "Cebu City". */
const serviceArea = (s: ServiceCard) => (s.scope === "nationwide" ? "Nationwide" : (s.city?.name ?? "Online"));

/** A stored image URL that is safe to render, with how next/image should load it (the CDN is optimised, local MinIO is not). */
function photoProps(url: string | null | undefined) {
  const src = safeImageUrl(url);
  return src ? { src, unoptimized: !isCdnImage(src) } : null;
}

/**
 * One service on a landing page (the feed card shape, SPEC 13b §2): its photo or the category tile (never the person),
 * title, price on one line, area and visit type, and who offers it with a small round avatar, the Verified badge and
 * the rating ("New" before the first review). Book opens the service in the client web app.
 */
export function ServiceTile({ item, icon }: { item: ServiceCard; icon?: string | null }) {
  const photo = photoProps(item.photo?.url);
  const avatar = photoProps(item.seller.avatar?.url);
  const s = item.seller;
  const href = appServiceUrl(item.code);
  return (
    <article className="group relative flex h-full min-w-0 flex-col overflow-hidden [contain:inline-size] rounded-card border border-line bg-white transition-colors hover:border-brand">
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-soft">
        {/* the category tile always sits underneath: a photo that fails to load (alt="") leaves it showing, never a broken image */}
        <span className="absolute inset-0 grid place-items-center text-brand">
          <CatalogIcon name={icon} size={44} aria-hidden="true" />
        </span>
        {photo && <Image {...photo} alt="" fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />}
        <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-xs font-bold text-ink">{VISIT[item.visitType]}</span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-4">
        <h3 className="line-clamp-2 font-display text-h3 font-bold text-ink wrap-anywhere" title={item.title}>
          {/* the whole card is the link (stretched), so Book and the title go to the same place */}
          <a href={href} className="after:absolute after:inset-0">
            {item.title}
          </a>
        </h3>
        {/* up to "from ₱1,000,000/hr": the amount never breaks, the unit drops to the next line only when the card is narrow */}
        <p className="mt-1 font-bold tabular-nums text-ink">
          <span className="text-xs font-semibold text-muted">from </span>
          <span className="whitespace-nowrap">{formatPeso(item.priceCentavos)}</span>
          <wbr />
          <span className="whitespace-nowrap text-xs font-semibold text-muted">{PRICING_SUFFIX[item.pricing]}</span>
        </p>
        <p className="mt-0.5 flex min-w-0 items-center gap-1 text-sm text-muted" title={serviceArea(item)}>
          <MapPin size={14} className="shrink-0 text-brand" aria-hidden="true" />
          <span className="min-w-0 truncate">{serviceArea(item)}</span>
        </p>
        <p className="mt-auto flex min-w-0 items-center gap-1.5 pt-3 text-sm" title={s.name}>
          {/* the initial sits under the photo, so a photo that fails to load still shows the initial */}
          <span aria-hidden="true" className="relative grid size-6 shrink-0 place-items-center overflow-hidden rounded-full bg-brand-soft text-xs font-bold text-brand-text">
            {Array.from(s.name)[0]?.toUpperCase()}
            {avatar && <Image {...avatar} alt="" width={24} height={24} className="absolute inset-0 size-6 object-cover" />}
          </span>
          <b className="min-w-0 truncate text-ink">{s.name}</b>
          {s.verified && <BadgeCheck size={14} className="shrink-0 fill-verify text-white" aria-label="Verified" />}
          <span className="ml-auto inline-flex shrink-0 items-center gap-1 font-bold text-body">
            <Star size={13} className="fill-mango text-mango" aria-hidden="true" /> {s.reviewCount > 0 && s.rating !== null ? s.rating.toFixed(1) : "New"}
          </span>
        </p>
        <span aria-hidden="true" className="btn-primary mt-3 inline-flex h-11 shrink-0 items-center justify-center rounded-control px-4 text-[0.9375rem] font-extrabold leading-5">
          Book
        </span>
      </div>
    </article>
  );
}

/** A grid of service cards, or the right empty line: nothing listed yet, or api2 not answering. */
export function ServiceGrid({ services, ok, iconFor, empty }: { services: ServiceCard[]; ok: boolean; iconFor: (s: ServiceCard) => string | null | undefined; empty: ReactNode }) {
  if (!ok) return <p className="mt-3 max-w-2xl leading-relaxed">{LOADING_NOTE}</p>;
  if (services.length === 0) return <div className="mt-3 max-w-2xl leading-relaxed">{empty}</div>;
  return (
    <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((s) => (
        <li key={s.id}>
          <ServiceTile item={s} icon={iconFor(s)} />
        </li>
      ))}
    </ul>
  );
}
