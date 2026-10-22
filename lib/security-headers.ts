/**
 * The response headers every page carries (next.config.ts `headers()`). Kept free of imports so next.config and
 * `node --test lib/security-headers.test.mjs` can load it.
 *
 * Script CSP uses 'unsafe-inline', not nonces: Next.js applies nonces only to dynamically rendered pages, which would
 * turn off static generation and ISR for the whole site (node_modules/next/dist/docs/01-app/02-guides/
 * content-security-policy.md, "Static vs Dynamic Rendering with CSP"). The inline scripts are Next's own hydration
 * payload, the GA bootstrap and JSON-LD data blocks (built from escaped API text).
 */

const GA = ["https://www.googletagmanager.com", "https://*.google-analytics.com", "https://*.analytics.google.com"];
const CDN = "https://cdn.phriend.app";

export function contentSecurityPolicy({ dev }: { dev: boolean }): string {
  const directives: [string, string[]][] = [
    ["default-src", ["'self'"]],
    // 'unsafe-eval' in development only: React rebuilds server error stacks with eval there
    ["script-src", ["'self'", "'unsafe-inline'", ...(dev ? ["'unsafe-eval'"] : []), "https://www.googletagmanager.com"]],
    ["style-src", ["'self'", "'unsafe-inline'"]],
    // data: and blob: for the creator overlay (inlined card photo, the uploaded clip and frame)
    ["img-src", ["'self'", "data:", "blob:", CDN, ...GA, ...(dev ? ["http://localhost:9000"] : [])]],
    ["media-src", ["'self'", "blob:"]],
    ["font-src", ["'self'", "data:"]],
    ["connect-src", ["'self'", ...GA, ...(dev ? ["ws:", "wss:"] : [])]],
    ["worker-src", ["'self'", "blob:"]],
    ["object-src", ["'none'"]],
    ["base-uri", ["'self'"]],
    ["form-action", ["'self'"]],
    ["frame-src", ["'none'"]],
    ["frame-ancestors", ["'none'"]],
    // no upgrade-insecure-requests: HSTS covers the live site, and it would break `next start` on http://localhost
  ];
  return directives.map(([name, values]) => [name, ...values].join(" ")).join("; ");
}

export function securityHeaders({ dev }: { dev: boolean }): { key: string; value: string }[] {
  return [
    { key: "Content-Security-Policy", value: contentSecurityPolicy({ dev }) },
    // phriend.app and www are served over HTTPS only (Hostinger). No includeSubDomains: the subdomains are other apps.
    ...(dev ? [] : [{ key: "Strict-Transport-Security", value: "max-age=31536000" }]),
    { key: "X-Frame-Options", value: "DENY" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()" },
  ];
}
