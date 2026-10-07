import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { OCCASION_IMAGE, OCCASIONS, occasionImage } from "@/lib/occasions";
import { breadcrumbJsonLd, pageMeta } from "@/lib/site";

const meta = pageMeta({
  title: "Book pros for weddings, debuts and parties",
  description: "Plan a wedding, debut, birthday, baptism, graduation or company event with ID-verified local pros: hosts, makeup, photo, video and more.",
  path: "/occasions",
});
const shareImage = { url: occasionImage("occasions"), ...OCCASION_IMAGE, alt: "Planning a Filipino celebration" };
export const metadata: Metadata = { ...meta, openGraph: { ...meta.openGraph, images: [shareImage] }, twitter: { card: "summary_large_image", images: [shareImage.url] } };

export default function OccasionsPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd("Occasions", "/occasions") }} />
      <nav aria-label="Breadcrumb" className="text-sm font-semibold text-muted">
        <Link href="/" className="hover:text-ink">
          Home
        </Link>
        {" › "}
        <span className="text-ink">Occasions</span>
      </nav>
      <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">Book the pros for your occasion</h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed">
        Weddings, debuts, birthdays and company events each need a different set of people. Pick the occasion to see who to book, what to agree on, and the
        questions people ask most. Every Phriend is ID-verified and booked by the hour.
      </p>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {OCCASIONS.map((o) => (
          <li key={o.slug}>
            <Link href={`/occasions/${o.slug}`} className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card transition-colors hover:border-brand">
              <div className="relative h-44 overflow-hidden bg-navy-soft">
                <Image src={occasionImage(o.slug)} alt={`${o.name} in the Philippines`} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h2 className="font-display text-xl font-semibold text-ink">{o.name}</h2>
                <p className="mt-2 line-clamp-3 flex-1 text-[15px] leading-relaxed">{o.intro}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 font-bold text-brand-text">
                  Who to book <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
