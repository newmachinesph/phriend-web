import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Landing } from "@/components/landing";
import { NodeIcon, ServiceCards } from "@/components/services";
import { activityPath, activitySlug, appGroupUrl, findCategory, getCategories, getGroups, getPhriends, groupPath } from "@/lib/landing";
import { pageMeta, POST_URL, SITE_URL } from "@/lib/site";

export const revalidate = 600;
export const dynamicParams = true;

// /services/<segment> is a group page (/services/errands) or a service page (/services/tour-guide). Group slugs are
// chosen so they never equal a service's segment; a group wins if they ever did.

const list = (xs: string[]) => (xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`);
const findGroup = async (segment: string) => (await getGroups()).find((g) => g.slug === segment);

export async function generateStaticParams() {
  const [groups, categories] = await Promise.all([getGroups(), getCategories()]);
  return [...groups.map((g) => ({ activity: g.slug })), ...categories.map((c) => ({ activity: activitySlug(c.label) }))];
}

export async function generateMetadata({ params }: { params: Promise<{ activity: string }> }): Promise<Metadata> {
  const segment = (await params).activity;
  const group = await findGroup(segment);
  if (group) {
    return pageMeta({
      title: `${group.label}: book verified local pros`.slice(0, 60),
      description: `${list(group.categories.slice(0, 4).map((c) => c.label))} and more, from ID-verified locals across the Philippines. Booked by the hour, paid in person.`.slice(0, 155),
      path: groupPath(group),
    });
  }
  const category = await findCategory(segment);
  if (!category) return { title: "Not found", robots: { index: false } };
  return pageMeta({
    title: `Book a local ${category.label} pro in the Philippines`.slice(0, 60),
    description: `Book a verified local for ${category.label.toLowerCase()} by the hour. ID-checked pros, price agreed in the chat. See who is available today.`.slice(0, 150),
    path: `/services/${activitySlug(category.label)}`,
  });
}

export default async function ActivityPage({ params }: { params: Promise<{ activity: string }> }) {
  const segment = (await params).activity;
  const group = await findGroup(segment);
  if (group) return <GroupPage group={group} others={(await getGroups()).filter((g) => g.slug !== group.slug)} />;
  const [category, others] = await Promise.all([findCategory(segment), getCategories()]);
  if (!category) notFound();
  const phriends = await getPhriends({ category: category.slug });
  return <Landing category={category} phriends={phriends} path={`/services/${activitySlug(category.label)}`} others={others} />;
}

type Group = Awaited<ReturnType<typeof getGroups>>[number];

/** A group's page: what it covers, each service in it, and the other groups. Services first, no profile photos. */
function GroupPage({ group, others }: { group: Group; others: Group[] }) {
  const names = group.categories.map((c) => c.label.toLowerCase());
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
          { "@type": "ListItem", position: 3, name: group.label, item: `${SITE_URL}${groupPath(group)}` },
        ],
      },
      {
        "@type": "ItemList",
        name: group.label,
        itemListElement: group.categories.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, url: `${SITE_URL}${activityPath(c)}` })),
      },
    ],
  }).replace(/</g, "\\u003c"); // labels come from the API

  return (
    <main id="main" className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <nav aria-label="Breadcrumb" className="text-sm font-semibold text-muted">
        <Link href="/" className="hover:text-ink">
          Home
        </Link>
        {" › "}
        <Link href="/services" className="hover:text-ink">
          Services
        </Link>
        {" › "}
        <span className="text-ink">{group.label}</span>
      </nav>
      <div className="mt-4 flex items-center gap-4">
        <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-brand-soft text-brand">
          <NodeIcon node={group.iconNode} size={28} aria-hidden="true" />
        </span>
        <h1 className="font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">{group.label}</h1>
      </div>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed">
        Find ID-verified locals for {list(names)}, across the Philippines. Agree the plan and the price in the chat, meet, and pay in person: Phriend
        never holds your money and takes no cut.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href={appGroupUrl(group)} className="btn-primary inline-flex items-center gap-2 rounded-full px-5 py-3 font-bold">
          See who is available <ArrowRight size={18} aria-hidden="true" />
        </a>
        <a href={POST_URL} className="inline-flex items-center gap-2 rounded-full border-2 border-line px-5 py-3 font-bold text-ink hover:border-brand">
          Offer one of these services
        </a>
      </div>

      <section aria-labelledby="services-title" className="mt-14">
        <h2 id="services-title" className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          Services in {group.label}
        </h2>
        <div className="mt-6">
          <ServiceCards categories={group.categories} />
        </div>
      </section>

      <section aria-labelledby="more-title" className="mt-14">
        <h2 id="more-title" className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          Other services
        </h2>
        <ul className="mt-5 flex flex-wrap gap-2">
          {others.map((g) => (
            <li key={g.slug}>
              <Link href={groupPath(g)} className="inline-flex items-center gap-1.5 rounded-full border-2 border-line px-4 py-1.5 text-sm font-bold text-ink hover:border-brand">
                <NodeIcon node={g.iconNode} size={15} aria-hidden="true" />
                {g.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
