// Run: node --test lib/markdown.test.mjs   (plain JS so the Next type-check never sees a .ts import path)
import assert from "node:assert/strict";
import { test } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ArticleBody, isExternalHref, readingMinutes, safeHref, safeImageSrc } from "./markdown.ts";

const render = (markdown) => renderToStaticMarkup(createElement(ArticleBody, { markdown }));

/** No script, no event handler, no dangerous scheme anywhere in the output. */
function assertInert(html) {
  assert.doesNotMatch(html, /<script|<iframe|<object|<embed|<svg|<style|<form|<input/i);
  // every tag must read as name="value" pairs (an unescaped quote would leave a stray attribute), and none is on*
  const tags = [...html.matchAll(/<[a-z0-9]+([^>]*)>/g)];
  for (const [tag, attrs] of tags) {
    assert.match(attrs, /^(?:\s+[a-zA-Z:-]+="[^"]*")*\s*\/?$/, tag);
    for (const [, name] of attrs.matchAll(/\s([a-zA-Z:-]+)="/g)) assert.doesNotMatch(name, /^on/i, tag);
  }
  assert.doesNotMatch(html, /(?:href|src)="\s*(?:javascript|vbscript|data|file):/i);
}

test("renders the safe subset", () => {
  const html = render("# Title\n\nSome **bold** and *em*.\n\n- one\n- two\n\n> quote\n\n`code`\n\n---");
  assert.match(html, /<h2>Title<\/h2>/);
  assert.match(html, /<strong>bold<\/strong>/);
  assert.match(html, /<ul>\s*<li>one<\/li>/);
  assert.match(html, /<blockquote>/);
  assert.match(html, /<hr\/>/);
});

test("drops raw HTML: script, event handlers, iframes, comments", () => {
  for (const body of [
    "Hi <script>alert(1)</script> there",
    "<script>alert(1)</script>",
    '<img src=x onerror="alert(1)">',
    '<a href="javascript:alert(1)">x</a>',
    "<iframe src=https://evil.example></iframe>",
    "<svg onload=alert(1)>",
    "<!-- <script>alert(1)</script> -->",
    '<div style="background:url(javascript:alert(1))">x</div>',
    "<style>body{display:none}</style>",
  ]) {
    const html = render(body);
    assertInert(html);
    assert.doesNotMatch(html, /alert\(1\)<\/script>/);
  }
});

test("javascript and other schemes lose the link but keep the text", () => {
  for (const url of [
    "javascript:alert(1)",
    "JaVaScRiPt:alert(1)",
    "&#106;avascript:alert(1)",
    "javascript&colon;alert(1)",
    "vbscript:msgbox(1)",
    "data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==",
    "file:///etc/passwd",
    "//evil.example/x",
    "<javascript:alert(1)>",
  ]) {
    const html = render(`[click](${url})`);
    assertInert(html);
    assert.doesNotMatch(html, /<a /, url);
    assert.match(html, /click/);
  }
  assertInert(render("<javascript:alert(1)>"));
  assertInert(render("[x][r]\n\n[r]: javascript:alert(1)"));
  assert.doesNotMatch(render("[x][r]\n\n[r]: javascript:alert(1)"), /<a /);
});

test("allowed links: https, http, mailto and site paths; external ones get rel", () => {
  const ext = render("[a](https://example.com/x)");
  assert.match(ext, /<a href="https:\/\/example.com\/x" rel="noopener nofollow">a<\/a>/);
  assert.match(render("[a](http://example.com)"), /rel="noopener nofollow"/);
  assert.match(render("[a](mailto:support@phriend.app)"), /<a href="mailto:support@phriend.app">a<\/a>/);
  assert.match(render("[a](/services)"), /<a href="\/services">a<\/a>/);
  assert.match(render("[a](https://phriend.app/blog)"), /<a href="https:\/\/phriend.app\/blog">a<\/a>/);
  assert.match(render("<https://example.com>"), /<a href="https:\/\/example.com" rel="noopener nofollow">/);
});

test("percent-encoded schemes stay a path on this site", () => {
  assert.match(render("[c](java%0ascript:alert(1))"), /href="java%0ascript/);
});

test("a link title cannot break out of its attribute", () => {
  const html = render('[a](https://example.com "x\\" onmouseover=\\"alert(1)")');
  assertInert(html);
});

test("images: https on the CDN only, otherwise the alt text", () => {
  assert.match(render("![a cat](https://cdn.phriend.app/v2/blog_cover/2026/10/x.webp)"), /<img src="https:\/\/cdn.phriend.app\/v2\/blog_cover\/2026\/10\/x.webp" alt="a cat"/);
  for (const src of ["http://cdn.phriend.app/x.webp", "https://evil.example/x.png", "javascript:alert(1)", "data:image/svg+xml,<svg onload=alert(1)>", "//cdn.phriend.app/x.webp", "https://user:pw@cdn.phriend.app/v2/blog_cover/x.webp", "https://cdn.phriend.app/v2/avatar/2026/10/x.webp", "https://cdn.phriend.app:8443/v2/blog_cover/x.webp"]) {
    const html = render(`![a cat](${src})`);
    assertInert(html);
    assert.doesNotMatch(html, /<img/, src);
    assert.match(html, /a cat/);
  }
  assertInert(render('![x" onerror="alert(1)](https://cdn.phriend.app/v2/blog_cover/2026/10/x.webp)'));
});

test("url helpers", () => {
  assert.equal(safeHref(" https://a.example "), "https://a.example");
  assert.equal(safeHref("java\tscript:alert(1)"), undefined);
  assert.equal(safeHref("a\\b"), undefined);
  assert.equal(safeHref("#section"), "#section");
  assert.equal(safeImageSrc("https://cdn.phriend.app/v2/blog_cover/x.webp"), "https://cdn.phriend.app/v2/blog_cover/x.webp");
  assert.equal(safeImageSrc("https://cdn.phriend.app/v2/kyc/x.webp"), undefined);
  assert.equal(safeImageSrc("https://cdn.phriend.app.evil.example/x.webp"), undefined);
  assert.equal(isExternalHref("https://www.phriend.app/x"), false);
  assert.equal(isExternalHref("/x"), false);
  assert.equal(isExternalHref("https://example.com"), true);
});

test("reading time", () => {
  assert.equal(readingMinutes("short"), 1);
  assert.equal(readingMinutes(Array(1000).fill("word").join(" ")), 5);
});
