import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Landing } from "@/components/landing";
import Image from "next/image";
import { groupPhoto, NodeIcon, ServiceCards } from "@/components/services";
import { activityPath, activitySlug, appGroupUrl, findCategory, getCategories, getGroups, getServices, groupPath } from "@/lib/landing";
import { pageMeta, PROVIDER_URL, SITE_URL } from "@/lib/site";
import { ButtonLink, Container } from "@/components/ui";

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
      title: `${group.label}: local services`.slice(0, 60),
      description: `${list(group.categories.slice(0, 4).map((c) => c.label))} and more, from verified providers across the Philippines. Priced per job, hour or session.`.slice(0, 155),
      path: groupPath(group),
    });
  }
  const category = await findCategory(segment);
  if (!category) return { title: "Not found", robots: { index: false } };
  return pageMeta({
    title: `${category.label} services in the Philippines`.slice(0, 60),
    description: `Book ${category.label.toLowerCase()} from verified providers. Each service shows its price, photos, visit type and area. Book and chat in the app.`.slice(0, 150),
    path: `/services/${activitySlug(category.label)}`,
  });
}

export default async function ActivityPage({ params }: { params: Promise<{ activity: string }> }) {
  const segment = (await params).activity;
  const group = await findGroup(segment);
  if (group) return <GroupPage group={group} others={(await getGroups()).filter((g) => g.slug !== group.slug)} />;
  const [category, others] = await Promise.all([findCategory(segment), getCategories()]);
  if (!category) notFound();
  const services = await getServices({ category: category.slug });
  return <Landing category={category} services={services} path={`/services/${activitySlug(category.label)}`} others={others} />;
}

type Group = Awaited<ReturnType<typeof getGroups>>[number];

/** A group's page: what it covers, each kind of service in it, and the other groups. Services first, no profile photos. */
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
    <Container as="main" id="main" className="py-14 sm:py-20">
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
        <span className="grid size-14 shrink-0 place-items-center rounded-tile bg-brand-soft text-brand">
          <NodeIcon node={group.iconNode} size={28} aria-hidden="true" />
        </span>
        <h1 className="font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">{group.label}</h1>
      </div>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed">
        Book {list(names)} from verified providers across the Philippines. Each service shows its own price, photos of the work, visit type and area.
        Book and chat in the app, and pay the provider directly: Phriend never holds your money and takes no cut.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <ButtonLink href={appGroupUrl(group)}>See the services</ButtonLink>
        <ButtonLink href={PROVIDER_URL} variant="secondary">
          Offer one of these services
        </ButtonLink>
      </div>
      {groupPhoto(group.slug) && (
        <div className="relative mt-10 aspect-[3/2] max-h-[440px] w-full overflow-hidden rounded-card bg-navy-soft sm:aspect-[21/9]">
          <Image src={groupPhoto(group.slug)!} alt={`${group.label} in the Philippines`} fill priority sizes="(min-width: 1280px) 1216px, 100vw" className="object-cover" />
        </div>
      )}

      <section aria-labelledby="services-title" className="mt-14">
        <h2 id="services-title" className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          What {group.label} covers
        </h2>
        <div className="mt-6">
          <ServiceCards categories={group.categories} />
        </div>
      </section>

      <section aria-labelledby="more-title" className="mt-14">
        <h2 id="more-title" className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          Other service groups
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
    </Container>
  );
}
