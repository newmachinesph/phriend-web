// Run: node --test lib/creator-link.test.mjs   (plain JS so the Next type-check never sees a .ts import path)
import assert from "node:assert/strict";
import { test } from "node:test";
import { parseCreatorLink } from "./creator-link.ts";

test("reads a service link, with or without the scheme", () => {
  for (const link of ["https://web.phriend.app/services/7K3M9QXA", "web.phriend.app/services/7k3m9qxa", "  http://web.phriend.app/services/7K3M-9QXA/  ", "web.phriend.app/services/7K3M9QXA?ref=tiktok"]) {
    assert.deepEqual(parseCreatorLink(link), { kind: "service", code: "7K3M9QXA" }, link);
  }
  assert.deepEqual(parseCreatorLink("web.phriend.app/services/7K3MOQXL"), { kind: "service", code: "7K3M0QX1" }, "O reads 0, L reads 1");
});

test("reads a provider link", () => {
  assert.deepEqual(parseCreatorLink("https://web.phriend.app/p/ana.reyes"), { kind: "provider", handle: "ana.reyes" });
  assert.deepEqual(parseCreatorLink("web.phriend.app/p/@Ana_Reyes"), { kind: "provider", handle: "ana_reyes" });
});

test("refuses anything else", () => {
  for (const link of [
    "",
    "ana.reyes",
    "https://evil.example/services/7K3M9QXA",
    "https://web.phriend.app.evil.example/p/ana",
    "https://phriend.app/services/aircon-cleaning",
    "web.phriend.app/@ana", // the v1 profile link
    "web.phriend.app/phriends/12",
    "web.phriend.app/services/short",
    "web.phriend.app/p/a",
    "web.phriend.app/p/ana/reviews",
    "javascript:alert(1)",
    "web.phriend.app/p/%E0%A4%A", // a malformed escape: refused, never a thrown URIError
    "web.phriend.app/services/%",
    "web.phriend.app/p/%40", // "@" alone is not a handle
    `web.phriend.app/p/${"a".repeat(400)}`,
  ]) {
    assert.equal(parseCreatorLink(link), null, link);
  }
});
