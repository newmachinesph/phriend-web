import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { groupPhoto, NodeIcon } from "@/components/services";
import { activityPath, getGroups, groupPath } from "@/lib/landing";
import { breadcrumbJsonLd, pageMeta, POST_URL, SITE_URL } from "@/lib/site";
import { ButtonLink, Container } from "@/components/ui";

export const revalidate = 3600;

export const metadata: Metadata = pageMeta({
  title: "All services: book verified local pros",
  description: "Every service on Phriend, from errands and pet care to weddings, lessons, tours and freelance work. Booked by the hour with ID-verified locals.",
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
    <Container as="main" id="main" className="py-14 sm:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd("Services", "/services") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <nav aria-label="Breadcrumb" className="text-sm font-semibold text-muted">
        <Link href="/" className="hover:text-ink">
          Home
        </Link>
        {" › "}
        <span className="text-ink">Services</span>
      </nav>
      <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">Every service, from verified locals</h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed">
        {count} services in {groups.length} groups. Every Phriend has passed an ID check, you agree the price in the chat, and you pay in person.
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
                <h2 className="relative font-display text-xl font-semibold leading-tight drop-shadow-sm">{g.label}</h2>
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
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Offer a service</h2>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed">Listing is free and you keep 100% of what you earn. Verify your ID, set your services and rates, and clients find you here.</p>
        <ButtonLink href={POST_URL} className="mt-6">
          Become a Phriend
        </ButtonLink>
      </section>
    </Container>
  );
}
