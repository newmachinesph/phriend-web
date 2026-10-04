import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { AndroidAppButton } from "@/components/app-link";
import { breadcrumbJsonLd, pageMeta, PLAY_URL } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Phriend for Android",
  description: "Phriend on Android is an app on Google Play. Same account, same chats and bookings: install it and sign in.",
  path: "/android",
});

/** Where web.phriend.app sends Android browsers (and installed Android web apps): the web app is for iPhone and desktop. */
export default function AndroidPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd("Phriend for Android", "/android") }} />
      <section aria-labelledby="android-title">
        <div className="mx-auto w-full max-w-2xl px-5 py-16 text-center sm:px-8 sm:py-24">
          <h1 id="android-title" className="font-display text-4xl font-semibold text-ink sm:text-5xl">
            Phriend for Android is now an app
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-body">
            On Android, Phriend has moved from the browser to the app on Google Play. Sign in with the same account and
            your profile, chats and bookings are all there.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4">
            <AndroidAppButton className="btn-primary inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-lg font-bold">
              Continue in the app <ArrowRight size={20} aria-hidden="true" />
            </AndroidAppButton>
            <a href={PLAY_URL} className="font-bold text-brand-text underline underline-offset-4">
              Get it on Google Play
            </a>
          </div>
          <p className="mt-10 text-[15px] leading-relaxed text-muted">
            Had Phriend on your home screen? That was the web version. Install the app, then remove the old icon.
          </p>
        </div>
      </section>
    </>
  );
}
