import type { Metadata } from "next";
import Link from "next/link";
import { NodeIcon } from "@/components/services";
import { activityPath, getGroups, groupPath } from "@/lib/landing";
import { breadcrumbJsonLd, pageMeta, POST_URL, SITE_URL } from "@/lib/site";

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
    <main id="main" className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
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

      <div className="mt-12 flex flex-col gap-10">
        {groups.map((g) => (
          <section key={g.slug} aria-labelledby={`g-${g.slug}`}>
            <Link href={groupPath(g)} className="group inline-flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl bg-brand-soft text-brand">
                <NodeIcon node={g.iconNode} size={22} aria-hidden="true" />
              </span>
              <h2 id={`g-${g.slug}`} className="font-display text-2xl font-semibold text-ink group-hover:text-brand-text">
                {g.label}
              </h2>
            </Link>
            <ul className="mt-4 flex flex-wrap gap-2">
              {g.categories.map((c) => (
                <li key={c.slug}>
                  <Link href={activityPath(c)} className="inline-flex items-center gap-1.5 rounded-full border-2 border-line px-4 py-1.5 text-sm font-bold text-ink hover:border-brand">
                    <NodeIcon node={c.iconNode} size={15} aria-hidden="true" />
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <section className="mt-16 rounded-3xl bg-brand-soft p-6 sm:p-10">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Offer a service</h2>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed">Listing is free and you keep 100% of what you earn. Verify your ID, set your services and rates, and clients find you here.</p>
        <a href={POST_URL} className="btn-primary mt-6 inline-flex items-center rounded-full px-6 py-3 font-bold">
          Become a Phriend
        </a>
      </section>
    </main>
  );
}
