"use client";
import { useSyncExternalStore, type ReactNode } from "react";
import { APP_URL } from "@/lib/site";

/** "Open the app": the web app on every phone and computer. The Android app on Google Play is offered only as an extra. */
export function AppLink({ className, children }: { className?: string; children?: ReactNode }) {
  return (
    <a href={APP_URL} className={className}>
      Open the app
      {children}
    </a>
  );
}

const noop = () => () => {};
/** Only an in-app path may ride along (old links to /android pass the page they were heading to as ?to=). */
const safePath = (to: string | null) => (to && /^\/[\w@./%-]*$/.test(to) && !to.startsWith("//") ? to : "/");
const toParam = () => safePath(new URLSearchParams(location.search).get("to"));

/** The button on /android: back into the web app, at the page the visitor was heading to. */
export function ContinueInWebApp({ className, children }: { className?: string; children: ReactNode }) {
  const to = useSyncExternalStore(noop, toParam, () => "/");
  return (
    <a href={`${APP_URL}${to}`} className={className}>
      {children}
    </a>
  );
}
