import Image from "next/image";
import { BadgeCheck, MapPin, Star } from "lucide-react";
import { appTeamUrl, type TeamCard } from "@/lib/landing";

const peso = (n: number) => `₱${n.toLocaleString("en-PH")}`;

/** One team on a list: cover, member avatars, roles, rating and the lowest package price. Links to the team in the app. */
export function TeamTile({ team: t }: { team: TeamCard }) {
  const roles = [...new Set(t.roles)];
  return (
    <a href={appTeamUrl(t.slug)} title={t.name} className="group block h-full min-w-0 overflow-hidden [contain:inline-size] rounded-card border border-line bg-white transition-colors hover:border-brand">
      {/* the avatars sit outside the cover's overflow-hidden box, so the half that hangs below it is not clipped */}
      <div className="relative">
        <div className="relative h-40 overflow-hidden bg-navy-soft">
          <Image src={t.photo} alt={`${t.name}, a team in ${t.city}`} width={640} height={320} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
          <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-xs font-bold text-verify">
            <BadgeCheck size={14} aria-hidden="true" /> Verified members
          </span>
          <span className="absolute bottom-2 right-2 rounded-full bg-ink/80 px-2 py-0.5 text-xs font-bold text-white">{t.memberCount} members</span>
        </div>
        {t.avatars.length > 0 && (
          <span className="absolute bottom-0 left-3 z-10 flex translate-y-1/2" aria-hidden="true">
            {t.avatars.slice(0, 4).map((a, i) => (
              <Image key={`${a}-${i}`} src={a} alt="" width={48} height={48} className={`size-12 rounded-full border-[3px] border-white bg-surface object-cover ${i ? "-ml-3" : ""}`} />
            ))}
          </span>
        )}
      </div>
      <div className="p-4 pt-8">
        <p className="flex items-center justify-between gap-2 font-display text-lg font-semibold text-ink">
          <span className="line-clamp-2 min-w-0">{t.name}</span>
          {t.rating !== null && (
            <span className="inline-flex shrink-0 items-center gap-1 text-sm font-bold text-body">
              <Star size={14} className="fill-mango text-mango" aria-hidden="true" /> {t.rating.toFixed(1)}
              <span className="font-medium text-muted">({t.reviewCount})</span>
            </span>
          )}
        </p>
        <p className="mt-0.5 flex min-w-0 items-center gap-1 text-sm text-muted" title={t.city}>
          <MapPin size={14} className="shrink-0 text-brand" aria-hidden="true" /> <span className="min-w-0 truncate">{t.city}</span>
        </p>
        {roles.length > 0 && <p className="mt-1 line-clamp-2 text-sm">{roles.join(", ")}</p>}
        {t.priceFrom !== null && (
          <p className="mt-2 font-bold text-ink">
            <span className="whitespace-nowrap">from {peso(t.priceFrom)}</span>
            <wbr />
            <span className="whitespace-nowrap text-xs font-semibold text-muted"> per package</span>
          </p>
        )}
      </div>
    </a>
  );
}
