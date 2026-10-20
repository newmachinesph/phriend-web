import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { ContinueInWebApp } from "@/components/app-link";
import { breadcrumbJsonLd, NOINDEX_FOLLOW, pageMeta, PLAY_URL } from "@/lib/site";

// Not in the sitemap and noindex: the page only catches old links (?to=), and the home page FAQ already covers Android and Google Play.
export const metadata: Metadata = {
  ...pageMeta({
    title: "Phriend for Android",
    description: "Phriend runs in your phone's browser at web.phriend.app, on Android too. Add it to your home screen; an early Android app is also on Google Play.",
    path: "/android",
  }),
  robots: NOINDEX_FOLLOW,
};

/** Kept for old links (web.phriend.app used to send Android browsers here): the web app is the default on Android too. */
export default function AndroidPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd("Phriend for Android", "/android") }} />
      <section aria-labelledby="android-title">
        <div className="mx-auto w-full max-w-2xl px-5 py-16 text-center sm:px-8 sm:py-24">
          <h1 id="android-title" className="font-display text-h1 font-bold text-ink">
            Phriend works right in your browser
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-body">
            On Android, iPhone and computers, Phriend runs at web.phriend.app. Sign in with the same account and your profile,
            chats and bookings are all there. In Chrome, tap Install (or Add to Home screen) to keep it on your phone like an app.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4">
            <ContinueInWebApp className="btn-primary inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-lg font-bold">
              Open Phriend <ArrowRight size={20} aria-hidden="true" />
            </ContinueInWebApp>
            <a href={PLAY_URL} className="text-base font-semibold text-muted underline underline-offset-4 hover:text-ink">
              Prefer an app? Try the early Android app on Google Play
            </a>
          </div>
          <p className="mt-10 text-base leading-relaxed text-muted">
            Already have Phriend on your home screen? Keep using it: that is the web app, and it is always up to date.
          </p>
        </div>
      </section>
    </>
  );
}
