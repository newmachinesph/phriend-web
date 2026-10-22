import { createElement, type ReactElement, type ReactNode } from "react";
import Markdown, { type Components } from "react-markdown";

/**
 * The blog's Markdown renderer (SPEC 13e §2.2 "Blog"): the second line behind api2's `blogBodyProblem`, never the only
 * one. It renders React elements, never an HTML string, and allows only the safe subset the API enforces:
 * - no raw HTML: HTML in the Markdown is dropped (`skipHtml`), and only the element list below survives;
 * - links: https, http, mailto or a path on this site; anything else keeps its text and loses the link;
 *   links off phriend.app get `rel="noopener nofollow"`;
 * - images: https from the CDN only (the site's CSP `img-src`); anything else shows its alt text.
 *
 * Kept free of `@/` and relative imports so `node --test lib/markdown.test.mjs` can load it (no JSX for the same reason).
 */

const SITE_HOSTS = new Set(["phriend.app", "www.phriend.app"]);
const IMAGE_HOSTS = new Set(["cdn.phriend.app"]);
const LINK_SCHEMES = new Set(["https", "http", "mailto"]);
const SCHEME = /^([a-z][a-z0-9+.-]*):/i;

/** The Markdown elements an article may produce. A body `#` heading renders as h2: the page owns the h1. */
const ALLOWED = ["p", "h1", "h2", "h3", "h4", "h5", "h6", "strong", "em", "del", "a", "img", "ul", "ol", "li", "blockquote", "code", "pre", "hr", "br"];

/** A control character, a backslash or whitespace can hide a scheme from a check but not from a browser. */
function hasHiddenParts(url: string): boolean {
  return url.includes("\\") || [...url].some((ch) => ch.charCodeAt(0) <= 32 || ch.charCodeAt(0) === 127);
}

/** The href to render, or undefined to drop the link (its text stays). Entities are already decoded here. */
export function safeHref(raw: string): string | undefined {
  const url = raw.trim();
  if (url === "" || hasHiddenParts(url)) return undefined;
  const scheme = SCHEME.exec(url)?.[1]?.toLowerCase();
  if (scheme !== undefined) return LINK_SCHEMES.has(scheme) ? url : undefined;
  // a path on this site; `//host` is another site without a scheme, so it is refused
  return url.startsWith("//") ? undefined : url;
}

/** The image src to render, or undefined (the alt text shows instead): https on an allowed host only. */
export function safeImageSrc(raw: string): string | undefined {
  const url = raw.trim();
  if (hasHiddenParts(url) || !/^https:\/\//i.test(url)) return undefined;
  try {
    const u = new URL(url);
    return u.protocol === "https:" && IMAGE_HOSTS.has(u.hostname) && u.username === "" && u.password === "" ? u.href : undefined;
  } catch {
    return undefined;
  }
}

/** Whether a (safe) href leaves phriend.app, so it gets `rel="noopener nofollow"`. */
export function isExternalHref(href: string): boolean {
  if (!/^https?:\/\//i.test(href)) return false;
  try {
    return !SITE_HOSTS.has(new URL(href).hostname);
  } catch {
    return true;
  }
}

const urlTransform = (url: string, key: string): string | undefined => (key === "src" ? safeImageSrc(url) : key === "href" ? safeHref(url) : undefined);

function heading(tag: "h2" | "h3" | "h4") {
  return function Heading({ children }: { children?: ReactNode }) {
    return createElement(tag, null, children);
  };
}

const components: Components = {
  h1: heading("h2"),
  h2: heading("h2"),
  h3: heading("h3"),
  h4: heading("h4"),
  h5: heading("h4"),
  h6: heading("h4"),
  a: ({ href, title, children }) => {
    if (typeof href !== "string" || href === "") return createElement("span", null, children);
    const rel = isExternalHref(href) ? "noopener nofollow" : undefined;
    return createElement("a", { href, title, rel }, children);
  },
  img: ({ src, alt, title }) => {
    const text = typeof alt === "string" ? alt : "";
    if (typeof src !== "string" || src === "") return text ? createElement("span", { className: "article-img-missing" }, text) : null;
    // a stored blog image on the CDN; plain <img> keeps it out of the image optimizer (sizes are unknown)
    return createElement("img", { src, alt: text, title, loading: "lazy", decoding: "async", referrerPolicy: "no-referrer" });
  },
};

/** An article body, rendered with the rules above. */
export function ArticleBody({ markdown }: { markdown: string }): ReactElement {
  return createElement(Markdown, { allowedElements: ALLOWED, unwrapDisallowed: true, skipHtml: true, urlTransform, components }, markdown);
}

const WORDS_PER_MINUTE = 200;

/** Minutes to read a Markdown body (at least 1). */
export function readingMinutes(markdown: string): number {
  const words = markdown.replace(/[#*_>`~\-[\]()!]/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
