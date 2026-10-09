import Link from "next/link";
import { ArrowRight, Ellipsis, Icon, type LucideProps } from "lucide-react";
import { activityPath, groupPath, type Category, type CategoryGroup, type IconNode } from "@/lib/landing";

type Group = CategoryGroup & { categories: Category[] };

/** A category or group icon from the Lucide node the API sends (the ellipsis when there is none). */
export function NodeIcon({ node, ...props }: { node?: IconNode } & Omit<LucideProps, "ref">) {
  if (!node?.length) return <Ellipsis {...props} />;
  return <Icon iconNode={node as Parameters<typeof Icon>[0]["iconNode"]} {...props} />;
}

/** The service groups as cards: icon, name, the first few services, a link to the group's page. */
export function ServiceGroups({ groups, limit }: { groups: Group[]; limit?: number }) {
  const shown = limit ? groups.slice(0, limit) : groups;
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {shown.map((g) => (
        <li key={g.slug}>
          <Link href={groupPath(g)} className="group flex h-full flex-col rounded-3xl border border-line bg-white p-6 shadow-card transition-colors hover:border-brand">
            <span className="grid size-12 place-items-center rounded-2xl bg-brand-soft text-brand">
              <NodeIcon node={g.iconNode} size={24} aria-hidden="true" />
            </span>
            <h3 className="mt-4 font-display text-xl font-semibold text-ink">{g.label}</h3>
            <p className="mt-1.5 flex-1 text-[15px] leading-relaxed">
              {g.categories
                .slice(0, 4)
                .map((c) => c.label)
                .join(" · ")}
              {g.categories.length > 4 ? ` · +${g.categories.length - 4} more` : ""}
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-text">
              See {g.label.toLowerCase()} <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** A group's services as cards: icon, name, its activities, links to the category page. */
export function ServiceCards({ categories }: { categories: Category[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((c) => (
        <li key={c.slug}>
          <Link href={activityPath(c)} className="flex h-full flex-col rounded-3xl border border-line bg-white p-6 shadow-card transition-colors hover:border-brand">
            <span className="grid size-11 place-items-center rounded-2xl bg-surface text-ink">
              <NodeIcon node={c.iconNode} size={22} aria-hidden="true" />
            </span>
            <h3 className="mt-4 font-display text-xl font-semibold text-ink">{c.label}</h3>
            {c.activities.length > 0 && <p className="mt-1.5 text-[15px] leading-relaxed">{c.activities.slice(0, 5).join(" · ")}</p>}
          </Link>
        </li>
      ))}
    </ul>
  );
}
