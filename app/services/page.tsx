import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CatalogIcon, groupPhoto, LOADING_NOTE } from "@/components/services";
import { DIRECTORY_REVALIDATE_S, getCatalog } from "@/lib/catalogue";
import { escapeJsonLd } from "@/lib/landing";
import { categoryPath, groupPath } from "@/lib/links";
import { APP_URL, breadcrumbJsonLd, pageMeta, PROVIDER_URL, SITE_URL } from "@/lib/site";
import { ButtonLink, Container } from "@/components/ui";

export const revalidate = 60; // category, group and platform hiding set in Ops shows within a minute (DIRECTORY_REVALIDATE_S)

export const metadata: Metadata = pageMeta({
  title: "All services: local services from verified providers",
  description: "Every service on Phriend, from aircon cleaning and appliance repair to bookkeeping, tutoring, photo and video, driving and errands. Verified providers.",
  path: "/services",
});

/** The services directory: every group with every kind of service in it. */
export default async function ServicesPage() {
  const catalog = await getCatalog(DIRECTORY_REVALIDATE_S);
  const { groups } = catalog;
  const count = catalog.categories.length;
  const jsonLd = escapeJsonLd(
    JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Services on Phriend",
      itemListElement: groups.map((g, i) => ({ "@type": "ListItem", position: i + 1, name: g.label, url: `${SITE_URL}${groupPath(g)}` })),
    }),
  );

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
        {count > 0 ? `${count} kinds of service in ${groups.length} groups. ` : ""}Each service shows its price, photos, visit type and area; you book and chat with
        the provider in the app, and pay the provider directly.
      </p>

      {!catalog.ok ? (
        <div className="mt-10 max-w-2xl rounded-card border border-line bg-surface p-6">
          <p className="leading-relaxed">{LOADING_NOTE}</p>
          <ButtonLink href={APP_URL} className="mt-4">
            Open the app
          </ButtonLink>
        </div>
      ) : (
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((g) => {
            const photo = groupPhoto(g.slug);
            return (
              <li key={g.slug} className="min-w-0 overflow-hidden rounded-card border border-line bg-white">
                <Link href={groupPath(g)} className={`group relative flex h-40 items-end gap-3 px-5 pb-4 ${photo ? "text-white" : "bg-brand-soft text-ink"}`}>
                  {photo && (
                    <>
                      <Image src={photo} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                      <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                    </>
                  )}
                  <span className={`relative grid size-11 shrink-0 place-items-center rounded-tile ${photo ? "bg-white/20 text-white backdrop-blur-sm" : "bg-white text-brand"}`}>
                    <CatalogIcon name={g.icon} size={22} aria-hidden="true" />
                  </span>
                  <h2 className="relative min-w-0 font-display text-h3 font-bold drop-shadow-sm wrap-anywhere">{g.label}</h2>
                </Link>
                <ul className="flex flex-wrap gap-2 p-4">
                  {g.categories.map((c) => (
                    <li key={c.slug} className="min-w-0 max-w-full">
                      <Link href={categoryPath(c)} className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-sm font-bold text-ink hover:border-brand">
                        <CatalogIcon name={c.icon} size={15} className="shrink-0" aria-hidden="true" />
                        <span className="min-w-0 truncate">{c.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      )}

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
