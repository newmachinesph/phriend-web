/**
 * Reads the link a creator pastes into the overlay tool: a service (`web.phriend.app/services/<code>`) or a provider
 * profile (`web.phriend.app/p/<handle>`), with or without the scheme. Kept free of imports so
 * `node --test lib/creator-link.test.mjs` can load it.
 */

export type CreatorLink = { kind: "service"; code: string } | { kind: "provider"; handle: string };

const HOSTS = new Set(["web.phriend.app", "www.web.phriend.app"]);
/** The 8-character service code (Crockford-style alphabet, as in contracts ids.ts). */
const CODE = /^[0-9A-HJKMNP-TV-Z]{8}$/;
/** A provider handle: 3-30 letters, digits, dots and underscores (limits.ts). */
const HANDLE = /^[A-Za-z0-9_.]{3,30}$/;

/** A code as typed by a person: upper case, I and L read as 1, O as 0, hyphens dropped. */
const normaliseCode = (s: string) => {
  const c = s.toUpperCase().replace(/-/g, "").replace(/[IL]/g, "1").replace(/O/g, "0");
  return CODE.test(c) ? c : null;
};

export function parseCreatorLink(input: string): CreatorLink | null {
  const raw = input.trim();
  if (!raw || raw.length > 300) return null;
  let url: URL;
  try {
    url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
  } catch {
    return null;
  }
  if (!HOSTS.has(url.hostname.toLowerCase())) return null;
  const parts = url.pathname.split("/").filter(Boolean);
  if (parts.length !== 2) return null;
  const kind = parts[0].toLowerCase();
  let value: string;
  try {
    value = decodeURIComponent(parts[1]);
  } catch {
    return null; // a malformed escape ("%E0%A4%A") is not a link, not a server error
  }
  if (kind === "services") {
    const code = normaliseCode(value);
    return code ? { kind: "service", code } : null;
  }
  if (kind === "p") {
    const handle = value.replace(/^@/, "");
    return HANDLE.test(handle) ? { kind: "provider", handle: handle.toLowerCase() } : null;
  }
  return null;
}
