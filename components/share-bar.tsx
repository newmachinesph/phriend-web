"use client";
import { useState, useSyncExternalStore } from "react";
import { Check, Link2, Share2 } from "lucide-react";

const btn = "inline-flex h-10 items-center gap-2 rounded-full border border-line bg-white px-4 text-sm font-bold text-ink transition hover:border-brand hover:text-brand-text";

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
const WhatsApp = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 1.8a8.2 8.2 0 0 1 0 16.4c-1.5 0-2.9-.4-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 0 1 12 3.8zm-3.2 4.3c-.2 0-.5 0-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3 2.4 1 2.9.8 3.4.7.5 0 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3l-1.9-.9c-.3-.1-.5-.2-.7.1l-.9 1.1c-.2.2-.3.2-.6.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.6-1.1.1-.2 0-.4 0-.5l-.9-2.1c-.2-.5-.4-.5-.6-.5z" />
  </svg>
);
const Viber = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M12 2.2c-3.6 0-6.8.9-8.3 2.4C2.5 5.9 2 8.3 2 11.6c0 2.9.4 5.2 1.6 6.6.7.8 1.7 1.4 3 1.8v3l3.1-2.4c.7.1 1.5.1 2.3.1 3.6 0 6.8-.9 8.3-2.4 1.2-1.3 1.7-3.7 1.7-7s-.5-5.7-1.7-7C18.8 3.1 15.6 2.2 12 2.2zm0 1.9c3.2 0 6 .8 7 1.8.8.9 1.2 3 1.2 5.7s-.4 4.8-1.2 5.7c-1 1-3.8 1.8-7 1.8-.8 0-1.6-.1-2.4-.2l-.4-.1-1.7 1.3v-1.8l-.6-.2c-1.1-.3-1.9-.7-2.4-1.3-.8-.9-1.2-3-1.2-5.6s.4-4.8 1.2-5.7c1-1 3.8-1.8 7.5-1.8zm-3.1 3.6c-.2 0-.5.1-.7.3-.6.5-1.1 1.2-1.1 2 0 .3.1.6.2.9.9 2.5 2.7 4.5 5.1 5.6.4.2.8.3 1.2.3.8 0 1.5-.5 2-1.1.2-.2.3-.5.3-.7 0-.2-.1-.4-.3-.5l-1.7-1.1c-.2-.1-.4-.2-.6-.2-.3 0-.5.1-.7.3l-.4.4c-.1.1-.2.1-.4 0-1-.5-1.9-1.4-2.4-2.4-.1-.1 0-.3 0-.4l.4-.4c.3-.3.4-.7.2-1.1L9.5 8c-.2-.2-.4-.3-.6-.3zm3.4-.4a.5.5 0 0 0 0 1c1.6.1 2.9 1.4 3 3a.5.5 0 0 0 1 0c-.1-2.1-1.8-3.9-4-4zm.2 1.8a.5.5 0 0 0-.1 1c.6.1 1.1.6 1.2 1.2a.5.5 0 0 0 1-.1 2.3 2.3 0 0 0-2.1-2.1z" />
  </svg>
);

/** Share an article: the native sheet on phones, the networks people here actually use on desktop, and a copy button. */
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
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm font-bold text-muted">Share</span>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${u}`} target="_blank" rel="noopener noreferrer" className={btn} aria-label="Share on Facebook">
        <Facebook /> Facebook
      </a>
      <a href={`https://twitter.com/intent/tweet?url=${u}&text=${t}`} target="_blank" rel="noopener noreferrer" className={btn} aria-label="Share on X">
        <XLogo /> X
      </a>
      <a href={`https://wa.me/?text=${t}%20${u}`} target="_blank" rel="noopener noreferrer" className={btn} aria-label="Share on WhatsApp">
        <WhatsApp /> WhatsApp
      </a>
      <a href={`viber://forward?text=${t}%20${u}`} className={btn} aria-label="Share on Viber">
        <Viber /> Viber
      </a>
      <button type="button" onClick={copy} className={btn} aria-label="Copy link">
        {copied ? <Check size={16} /> : <Link2 size={16} />} {copied ? "Copied" : "Copy link"}
      </button>
      {canShare && (
        <button type="button" onClick={native} className={btn} aria-label="More ways to share">
          <Share2 size={16} /> More
        </button>
      )}
    </div>
  );
}
