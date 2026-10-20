import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { groupPhoto, NodeIcon } from "@/components/services";
import { activityPath, getGroups, groupPath } from "@/lib/landing";
import { breadcrumbJsonLd, pageMeta, PROVIDER_URL, SITE_URL } from "@/lib/site";
import { ButtonLink, Container } from "@/components/ui";

export const revalidate = 60; // category, group and platform hiding set in Ops shows within a minute (lib/landing.ts getCatalog)

export const metadata: Metadata = pageMeta({
  title: "All services: local services from verified providers",
  description: "Every service on Phriend, from aircon cleaning and appliance repair to bookkeeping, tutoring, photo and video, driving and errands. Verified providers.",
  path: "/services",
});

/** The services directory: every group with every service in it. */
export default async function ServicesPage() {
  const groups = await getGroups();
  const count = groups.reduce((n, g) => n + g.categories.length, 0);
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Services on Phriend",
    itemListElement: groups.map((g, i) => ({ "@type": "ListItem", position: i + 1, name: g.label, url: `${SITE_URL}${groupPath(g)}` })),
  }).replace(/</g, "\\u003c"); // labels come from the API

  return (
    <Container as="main" id="main" className="pb-14 pt-8 sm:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd("Services", "/services") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <nav aria-label="Breadcrumb" className="text-sm font-semibold text-muted">
        <Link href="/" className="hover:text-ink">
          Home
        </Link>
        {" › "}
        <span className="text-ink">Services</span>
      </nav>
      <h1 className="mt-4 max-w-3xl font-display text-h1 font-bold text-ink">Every service, from verified providers</h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed">
        {count} kinds of service in {groups.length} groups. Each service shows its price, photos, visit type and area; you book and chat with the provider in the
        app, and pay the provider directly.
      </p>

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((g) => {
          const photo = groupPhoto(g.slug);
          return (
            <li key={g.slug} className="overflow-hidden rounded-card border border-line bg-white">
              <Link href={groupPath(g)} className={`group relative flex h-40 items-end gap-3 px-5 pb-4 ${photo ? "text-white" : "bg-brand-soft text-ink"}`}>
                {photo && (
                  <>
                    <Image src={photo} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                    <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                  </>
                )}
                <span className={`relative grid size-11 shrink-0 place-items-center rounded-tile ${photo ? "bg-white/20 text-white backdrop-blur-sm" : "bg-white text-brand"}`}>
                  <NodeIcon node={g.iconNode} size={22} aria-hidden="true" />
                </span>
                <h2 className="relative font-display text-h3 font-bold drop-shadow-sm">{g.label}</h2>
              </Link>
              <ul className="flex flex-wrap gap-2 p-4">
                {g.categories.map((c) => (
                  <li key={c.slug}>
                    <Link href={activityPath(c)} className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-sm font-bold text-ink hover:border-brand">
                      <NodeIcon node={c.iconNode} size={15} aria-hidden="true" />
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>

      <section className="mt-16 rounded-card bg-brand-soft p-6 sm:p-10">
        <h2 className="font-display text-h2 font-bold text-ink">Offer a service</h2>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed">
          Listing is free and you keep 100% of what clients pay you. Verify your identity, list your services with their prices, photos, schedule and area at
          provider.phriend.app, and clients find them here.
        </p>
        <ButtonLink href={PROVIDER_URL} className="mt-6">
          List your services
        </ButtonLink>
      </section>
    </Container>
  );
}
