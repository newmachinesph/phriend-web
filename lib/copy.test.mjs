// Run: node --test lib/copy.test.mjs   (plain JS so the Next type-check never sees a .ts import path)
// The site's own copy (pages, components, lib and the llms files) stays on product: no words from the earlier,
// people-as-the-listing product, no emojis, no spoon-feeding safety lines (Apple 1.1.4, AGENT-RULES-v2).
import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { test } from "node:test";
import { OFF_PRODUCT } from "./off-product.ts";

const ROOT = join(import.meta.dirname, "..");
const SKIP = new Set(["lib/phriend2", "lib/off-product.ts"]);

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    const rel = relative(ROOT, path).replaceAll("\\", "/");
    if (SKIP.has(rel) || /\.test\.mjs$/.test(name)) return [];
    if (statSync(path).isDirectory()) return walk(path);
    return /\.(tsx?|mjs)$/.test(name) ? [rel] : [];
  });
}

const FILES = [...["app", "components", "lib"].flatMap((d) => walk(join(ROOT, d))), "public/llms.txt", "public/llms-full.txt"];

/** The text a visitor can read: comments are dropped (they may name what the site leaves out). */
const copyOf = (rel) => {
  const src = readFileSync(join(ROOT, rel), "utf8");
  if (rel.endsWith(".txt")) return src;
  return src
    .replace(/\/\*[\s\S]*?\*\//g, " ")
    .replace(/\{\s*\/\*[\s\S]*?\*\/\s*\}/g, " ")
    .replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
};

const SPOON_FEEDING = /\b(?:meet in a public place|public place|tell a friend where you|share your location with a friend|trust your instincts|never go alone)\b/i;
const EMOJI = /\p{Extended_Pictographic}/u;
// symbols the site draws on purpose (not emoji presentation): © ™ ® and the check and arrow glyphs are not used either
const ALLOWED_SYMBOLS = new Set(["©", "®", "™", "↗", "→", "←", "↑", "↓", "✓"]);

test("the copy has none of the earlier product's words", () => {
  const hits = [];
  for (const rel of FILES) {
    const text = copyOf(rel);
    const re = new RegExp(OFF_PRODUCT.source, "gim");
    for (const m of text.matchAll(re)) hits.push(`${rel}: "${m[0].trim()}"`);
  }
  assert.deepEqual(hits, []);
});

test("no spoon-feeding safety lines", () => {
  const hits = FILES.filter((rel) => SPOON_FEEDING.test(copyOf(rel)));
  assert.deepEqual(hits, []);
});

test("no emojis", () => {
  const hits = [];
  for (const rel of FILES) {
    for (const m of copyOf(rel).matchAll(new RegExp(EMOJI.source, "gu"))) if (!ALLOWED_SYMBOLS.has(m[0])) hits.push(`${rel}: ${m[0]}`);
  }
  assert.deepEqual(hits, []);
});

test("no v1 API routes or the old profile links", () => {
  const V1 = /["'`]\/api\/(?!og\b)|\/@\$\{|web\.phriend\.app\/@|\/phriends\//;
  const hits = FILES.filter((rel) => !rel.endsWith(".txt") && V1.test(copyOf(rel)));
  assert.deepEqual(hits, []);
});

test("the scan covers the pages", () => {
  for (const rel of ["app/page.tsx", "app/services/[activity]/page.tsx", "app/[slug]/page.tsx", "components/landing.tsx", "lib/landing.ts", "lib/occasions.ts"]) {
    assert.ok(FILES.includes(rel), rel);
  }
});
