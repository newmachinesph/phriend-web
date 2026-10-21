import type { Metadata } from "next";
import { StoreBadges } from "@/components/store-badges";
import { ButtonLink, Container } from "@/components/ui";
import { APP_URL, breadcrumbJsonLd, pageMeta, PROVIDER_STORE, PROVIDER_URL } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Get the Phriend app",
  description: "Get the Phriend app for iPhone and Android, or use Phriend in your browser at web.phriend.app. Book local services from verified providers.",
  path: "/download",
});

/** The client app on iOS and Android, the web app, and a smaller block for providers (SPEC 13e §2.4). Old /android links land here. */
export default function DownloadPage() {
  const providerApp = PROVIDER_STORE.ios || PROVIDER_STORE.android;
  return (
    <Container as="main" id="main" className="pb-14 pt-8 sm:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd("Get the app", "/download") }} />
      <section aria-labelledby="download-title" className="mx-auto max-w-2xl text-center">
        <h1 id="download-title" className="font-display text-h1 font-bold text-ink">
          Get the Phriend app
        </h1>
        <p className="mt-5 text-lg leading-relaxed">
          Find a service, chat with the provider and book, all in one app. Sign in with the same account on every device and your chats and bookings are there.
        </p>
        <StoreBadges className="mt-8 justify-center" />
        <p className="mt-10 text-base leading-relaxed">
          Or use it in your browser at <a href={APP_URL} className="font-bold text-brand-text underline underline-offset-4">web.phriend.app</a>, on any phone or
          computer. On a phone, choose Add to Home Screen in the browser menu to keep it like an app.
        </p>
        <ButtonLink href={APP_URL} className="mt-6 inline-flex h-12 items-center">
          Book a service
        </ButtonLink>
      </section>

      <section aria-labelledby="providers-title" className="mx-auto mt-16 max-w-2xl rounded-card border border-line bg-surface p-6 sm:p-8">
        <h2 id="providers-title" className="font-display text-h3 font-bold text-ink">
          Are you a provider?
        </h2>
        <p className="mt-2 text-base leading-relaxed">
          Providers list services and manage bookings, earnings and verification in Phriend Provider, at{" "}
          <a href={PROVIDER_URL} className="font-bold text-brand-text underline underline-offset-4">
            provider.phriend.app
          </a>
          .{" "}
          {providerApp ? (
            <>
              {PROVIDER_STORE.ios && (
                <a href={PROVIDER_STORE.ios} className="font-bold text-brand-text underline underline-offset-4">
                  Phriend Provider on the App Store
                </a>
              )}
              {PROVIDER_STORE.ios && PROVIDER_STORE.android && " · "}
              {PROVIDER_STORE.android && (
                <a href={PROVIDER_STORE.android} className="font-bold text-brand-text underline underline-offset-4">
                  Phriend Provider on Google Play
                </a>
              )}
            </>
          ) : (
            "The Phriend Provider app is coming to the app stores."
          )}
        </p>
      </section>
    </Container>
  );
}
