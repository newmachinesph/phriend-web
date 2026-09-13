"use client";
import { useState, useSyncExternalStore } from "react";
import { Check, Link2, Share2 } from "lucide-react";

// icon-only on small phones so the row never wraps; labels from sm up
const btn = "inline-flex h-10 shrink-0 items-center gap-2 rounded-full border border-line bg-white px-3 text-sm font-bold text-ink transition hover:border-brand hover:text-brand-text sm:px-4";
const label = "hidden sm:inline";

const Facebook = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.6 1.6-1.6h1.7V4.4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v2.3H7.4V14h2.8v8h3.3z" />
  </svg>
);
const XLogo = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="M17.5 3h3l-6.8 7.8L21.7 21h-6.2l-4.9-6.4L5 21H2l7.3-8.4L1.9 3h6.4l4.4 5.8L17.5 3zm-1.1 16.2h1.7L7 4.7H5.2l11.2 14.5z" />
  </svg>
);
/** Share an article: Facebook and X, a copy button, and the native sheet (Instagram, Messenger, etc.) for everything else. */
export function ShareBar({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const canShare = useSyncExternalStore(
    () => () => {},
    () => "share" in navigator,
    () => false,
  ); // the native sheet exists on phones; false during server render
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };
  const native = async () => {
    try {
      await navigator.share({ title, url });
    } catch {}
  };
  return (
    <div className="flex flex-nowrap items-center gap-2">
      <span className="mr-1 shrink-0 text-sm font-bold text-muted">Share</span>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${u}`} target="_blank" rel="noopener noreferrer" className={btn} aria-label="Share on Facebook">
        <Facebook /> <span className={label}>Facebook</span>
      </a>
      <a href={`https://twitter.com/intent/tweet?url=${u}&text=${t}`} target="_blank" rel="noopener noreferrer" className={btn} aria-label="Share on X (Twitter)">
        <XLogo /> <span className={label}>X</span>
      </a>
      <button type="button" onClick={copy} className={btn} aria-label="Copy link">
        {copied ? <Check size={16} /> : <Link2 size={16} />} <span className={label}>{copied ? "Copied" : "Copy link"}</span>
      </button>
      {canShare && (
        <button type="button" onClick={native} className={btn} aria-label="More ways to share">
          <Share2 size={16} /> <span className={label}>More</span>
        </button>
      )}
      <span className="sr-only" aria-live="polite">{copied ? "Link copied" : ""}</span>
    </div>
  );
}
