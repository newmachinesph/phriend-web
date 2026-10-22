import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Landing } from "@/components/landing";
import { CatalogIcon, CategoryCards, groupPhoto, ServiceGrid } from "@/components/services";
import { findCategory, findGroup, getCatalog, getServices, groupOf, type Catalog, type Group, type Services } from "@/lib/catalogue";
import { escapeJsonLd, itemListJsonLd, list } from "@/lib/landing";
import { appGroupUrl, categoryPath, groupPath } from "@/lib/links";
import { NOINDEX_FOLLOW, pageMeta, PROVIDER_URL, SITE_URL } from "@/lib/site";
import { ButtonLink, Container } from "@/components/ui";

export const revalidate = 600;
export const dynamicParams = true;

// /services/<slug> is a group page (/services/errands) or a category page (/services/aircon-cleaning). Group and
// category slugs are distinct in Ops; a group wins if they ever matched. Anything else is a 404.

export async function generateStaticParams() {
  const catalog = await getCatalog();
  return [...catalog.groups.map((g) => ({ activity: g.slug })), ...catalog.categories.map((c) => ({ activity: c.slug }))];
}

type Params = { params: Promise<{ activity: string }> };

/** The page's data: one cached catalogue read and one feed read (the same requests generateMetadata makes). */
async function load(slug: string) {
  const catalog = await getCatalog();
  // api2 not answering: fail the render instead of a 404, so ISR keeps serving the last good page (a 404 would replace it)
  if (!catalog.ok) throw new Error("The catalogue is unavailable: api2 did not answer.");
  const group = findGroup(catalog, slug);
  if (group) return { kind: "group" as const, catalog, group, services: await getServices({ group: group.slug }) };
  const category = findCategory(catalog, slug);
  if (category) return { kind: "category" as const, catalog, category, services: await getServices({ category: [category.slug] }) };
  return null;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const r = await load((await params).activity);
  if (!r) return { title: "Not found", robots: { index: false } };
  // a landing page with no services is noindex, follow (SPEC 13e §2.1)
  const robots = r.services.items.length ? {} : { robots: NOINDEX_FOLLOW };
  if (r.kind === "group") {
    return {
      ...pageMeta({
        title: `${r.group.label}: local services`.slice(0, 60),
        description: `${list(r.group.categories.slice(0, 4).map((c) => c.label))} and more, from verified providers across the Philippines.`.slice(0, 155),
        path: groupPath(r.group),
      }),
      ...robots,
    };
  }
  return {
    ...pageMeta({
      title: `${r.category.label} services in the Philippines`.slice(0, 60),
      description: `Book ${r.category.label.toLowerCase()} from verified providers. Each service shows its price, photos, visit type and area. Book and chat in the app.`.slice(0, 155),
      path: categoryPath(r.category),
    }),
    ...robots,
  };
}

export default async function ActivityPage({ params }: Params) {
  const r = await load((await params).activity);
  if (!r) notFound();
  if (r.kind === "group") return <GroupPage group={r.group} catalog={r.catalog} services={r.services} />;
  return <Landing category={r.category} group={groupOf(r.catalog, r.category)} services={r.services} path={categoryPath(r.category)} others={r.catalog.categories} />;
}

/** A group's page: its live services, each kind of service in it, and the other groups. Services first, no profile photos. */
function GroupPage({ group, catalog, services }: { group: Group; catalog: Catalog; services: Services }) {
  const names = group.categories.map((c) => c.label.toLowerCase());
  const others = catalog.groups.filter((g) => g.slug !== group.slug);
  const photo = groupPhoto(group.slug);
  const iconOf = new Map(catalog.categories.map((c) => [c.id, c.icon]));
  const jsonLd = escapeJsonLd(
    JSON.stringify({
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
        itemListJsonLd(`${group.label} services`, services.items),
      ],
    }),
  );

  return (
    <Container as="main" id="main" className="pb-14 pt-8 sm:py-20">
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
          <CatalogIcon name={group.icon} size={28} aria-hidden="true" />
        </span>
        <h1 className="min-w-0 font-display text-h1 font-bold text-ink wrap-anywhere">{group.label}</h1>
      </div>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed">
        Book {list(names)} from verified providers across the Philippines. Each service shows its own price, photos of the work, visit type and area. Book and
        chat in the app, and pay the provider directly: Phriend never holds your money and takes no cut.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <ButtonLink href={appGroupUrl(group)}>See the services in the app</ButtonLink>
        <ButtonLink href={PROVIDER_URL} variant="secondary">
          Offer one of these services
        </ButtonLink>
      </div>
      {photo && (
        <div className="relative mt-10 aspect-[3/2] max-h-[440px] w-full overflow-hidden rounded-card bg-navy-soft sm:aspect-[21/9]">
          <Image src={photo} alt={`${group.label} in the Philippines`} fill priority sizes="(min-width: 1280px) 1216px, 100vw" className="object-cover" />
        </div>
      )}

      <section aria-labelledby="live-title" className="mt-14">
        <h2 id="live-title" className="font-display text-h2 font-bold text-ink">
          {group.label} services right now
        </h2>
        <ServiceGrid
          services={services.items}
          ok={services.ok}
          iconFor={(s) => iconOf.get(s.categoryId) ?? group.icon}
          empty={<p>No {group.label.toLowerCase()} services listed yet. Pick a kind of service below to read more about it.</p>}
        />
      </section>

      <section aria-labelledby="services-title" className="mt-14">
        <h2 id="services-title" className="font-display text-h2 font-bold text-ink">
          What {group.label} covers
        </h2>
        <div className="mt-6">
          <CategoryCards categories={group.categories} />
        </div>
      </section>

      <section aria-labelledby="more-title" className="mt-14">
        <h2 id="more-title" className="font-display text-h2 font-bold text-ink">
          Other service groups
        </h2>
        <ul className="mt-5 flex flex-wrap gap-2">
          {others.map((g) => (
            <li key={g.slug}>
              <Link href={groupPath(g)} className="inline-flex items-center gap-1.5 rounded-full border-2 border-line px-4 py-1.5 text-sm font-bold text-ink hover:border-brand">
                <CatalogIcon name={g.icon} size={15} aria-hidden="true" />
                {g.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}
