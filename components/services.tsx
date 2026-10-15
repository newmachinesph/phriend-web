import Image from "next/image";
import Link from "next/link";
import { Ellipsis, Icon, type LucideProps } from "lucide-react";
import { activityPath, groupPath, type Category, type CategoryGroup, type IconNode } from "@/lib/landing";

type Group = CategoryGroup & { categories: Category[] };

/** A category or group icon from the Lucide node the API sends (the ellipsis when there is none). */
export function NodeIcon({ node, ...props }: { node?: IconNode } & Omit<LucideProps, "ref">) {
  if (!node?.length) return <Ellipsis {...props} />;
  return <Icon iconNode={node as Parameters<typeof Icon>[0]["iconNode"]} {...props} />;
}

/** Groups with a photo (public/groups/<slug>.jpg, the same set the app uses); a group added in Ops later gets a tinted header. */
const GROUP_PHOTOS = new Set([
  "errands", "repairs", "cleaning", "care", "pets", "events", "food", "performance", "photo-video", "beauty", "tutoring",
  "lessons", "sports-fitness", "water-sports", "tours", "trips", "rides", "auto", "freelance", "hangouts", "others",
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
                <h3 className="relative font-display text-xl font-semibold leading-tight drop-shadow-sm">{g.label}</h3>
              </div>
              <p className="flex-1 px-5 py-4 text-[15px] leading-relaxed">
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
            <h3 className="mt-4 font-display text-xl font-semibold text-ink">{c.label}</h3>
            {c.activities.length > 0 && <p className="mt-1.5 text-[15px] leading-relaxed">{c.activities.slice(0, 5).join(", ")}</p>}
          </Link>
        </li>
      ))}
    </ul>
  );
}
