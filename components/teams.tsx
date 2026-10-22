import Image from "next/image";
import { MapPin, Star, Users } from "lucide-react";
import { formatPeso, PRICING_SUFFIX, type TeamCard } from "@/lib/phriend2";
import { isCdnImage, safeImageUrl } from "@/lib/api";
import { appTeamUrl } from "@/lib/links";

/** One team on a list: its logo (or the initial), name, city, member count, rating and lowest price. Links to the team in the app. */
export function TeamTile({ team: t }: { team: TeamCard }) {
  const logo = safeImageUrl(t.logo?.url);
  return (
    <a href={appTeamUrl(t.slug)} title={t.name} className="group flex h-full min-w-0 flex-col [contain:inline-size] rounded-card border border-line bg-white p-5 transition-colors hover:border-brand">
      <div className="flex min-w-0 items-center gap-3">
        {/* the initial sits under the logo, so a logo that fails to load still shows the initial */}
        <span aria-hidden="true" className="relative grid size-12 shrink-0 place-items-center overflow-hidden rounded-tile bg-brand-soft font-display text-lg font-bold text-brand-text">
          {Array.from(t.name)[0]?.toUpperCase()}
          {logo && <Image src={logo} unoptimized={!isCdnImage(logo)} alt="" width={48} height={48} className="absolute inset-0 size-12 object-cover" />}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-h3 font-bold text-ink">{t.name}</p>
          {t.title && <p className="truncate text-sm text-muted">{t.title}</p>}
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 text-sm font-bold text-body">
          <Star size={14} className="fill-mango text-mango" aria-hidden="true" /> {t.reviewCount > 0 && t.rating !== null ? t.rating.toFixed(1) : "New"}
        </span>
      </div>
      <p className="mt-3 flex min-w-0 flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
        {t.city && (
          <span className="inline-flex min-w-0 items-center gap-1">
            <MapPin size={14} className="shrink-0 text-brand" aria-hidden="true" /> <span className="truncate">{t.city.name}</span>
          </span>
        )}
        <span className="inline-flex shrink-0 items-center gap-1">
          <Users size={14} className="shrink-0 text-brand" aria-hidden="true" /> {t.membersCount} {t.membersCount === 1 ? "member" : "members"}
        </span>
      </p>
      {t.fromPrice && (
        <p className="mt-auto pt-3 font-bold tabular-nums text-ink">
          <span className="text-xs font-semibold text-muted">from </span>
          <span className="whitespace-nowrap">{formatPeso(t.fromPrice.priceCentavos)}</span>
          <wbr />
          <span className="whitespace-nowrap text-xs font-semibold text-muted">{PRICING_SUFFIX[t.fromPrice.pricing]}</span>
        </p>
      )}
    </a>
  );
}
