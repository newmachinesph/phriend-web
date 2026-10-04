"use client";
import { useSyncExternalStore, type ReactNode } from "react";
import { ANDROID_PACKAGE, APP_URL, PLAY_URL } from "@/lib/site";

const noop = () => () => {};
const isAndroid = () => /android/i.test(navigator.userAgent);
/** True on an Android browser, after hydration (the pages are static, so the server renders the web-app version). */
const useAndroid = () => useSyncExternalStore(noop, isAndroid, () => false);

/** "Open the app": the Play Store on Android, the web app on iPhone and desktop. */
export function AppLink({ className, children }: { className?: string; children?: ReactNode }) {
  const android = useAndroid();
  return (
    <a href={android ? PLAY_URL : APP_URL} className={className}>
      {android ? "Get the Android app" : "Open the app"}
      {children}
    </a>
  );
}

/** Only an in-app path may ride along into the intent link. */
const safePath = (to: string | null) => (to && /^\/[\w@./%-]*$/.test(to) ? to : "/");
const toParam = () => safePath(new URLSearchParams(location.search).get("to"));

/**
 * The button on /android. On Android it is an intent link: it opens the installed app at the page the visitor was
 * heading to (web.phriend.app passes it as ?to=), and falls back to the Play Store when the app is not installed.
 * Anywhere else it is the plain Play Store link.
 */
export function AndroidAppButton({ className, children }: { className?: string; children: ReactNode }) {
  const android = useAndroid();
  const to = useSyncExternalStore(noop, toParam, () => "/");
  const intent = `intent://web.phriend.app${to}#Intent;scheme=https;package=${ANDROID_PACKAGE};S.browser_fallback_url=${encodeURIComponent(PLAY_URL)};end`;
  return (
    <a href={android ? intent : PLAY_URL} className={className}>
      {children}
    </a>
  );
}
