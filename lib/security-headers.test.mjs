// Run: node --test lib/security-headers.test.mjs   (plain JS so the Next type-check never sees a .ts import path)
import assert from "node:assert/strict";
import { test } from "node:test";
import { contentSecurityPolicy, securityHeaders } from "./security-headers.ts";

const directive = (csp, name) => csp.split("; ").find((d) => d === name || d.startsWith(`${name} `));

test("production: enforced CSP, no eval, framing refused, HSTS sent", () => {
  const headers = Object.fromEntries(securityHeaders({ dev: false }).map((h) => [h.key, h.value]));
  const csp = headers["Content-Security-Policy"];
  assert.equal(directive(csp, "frame-ancestors"), "frame-ancestors 'none'");
  assert.equal(directive(csp, "object-src"), "object-src 'none'");
  assert.ok(!csp.includes("unsafe-eval"), "no unsafe-eval in production");
  assert.ok(!csp.includes("localhost"), "no local origins in production");
  assert.match(headers["Strict-Transport-Security"], /^max-age=\d{8,}/);
  assert.equal(headers["X-Frame-Options"], "DENY");
  assert.equal(headers["X-Content-Type-Options"], "nosniff");
  assert.equal(headers["Referrer-Policy"], "strict-origin-when-cross-origin");
  assert.equal(headers["Content-Security-Policy-Report-Only"], undefined, "enforced, not report-only");
});

test("images: the CDN and the overlay's data and blob URLs; nothing else off-site but GA", () => {
  const img = directive(contentSecurityPolicy({ dev: false }), "img-src").split(" ").slice(1);
  for (const src of ["'self'", "data:", "blob:", "https://cdn.phriend.app"]) assert.ok(img.includes(src), src);
  assert.ok(img.every((s) => !s.startsWith("http") || s === "https://cdn.phriend.app" || /google/.test(s)), img.join(" "));
});

test("development: eval and HMR allowed, no HSTS on localhost", () => {
  const headers = Object.fromEntries(securityHeaders({ dev: true }).map((h) => [h.key, h.value]));
  assert.match(directive(headers["Content-Security-Policy"], "script-src"), /'unsafe-eval'/);
  assert.match(directive(headers["Content-Security-Policy"], "connect-src"), /ws:/);
  assert.equal(headers["Strict-Transport-Security"], undefined);
});
