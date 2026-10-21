// Run: node --test lib/read-capped.test.mjs   (plain JS so the Next type-check never sees a .ts import path)
import assert from "node:assert/strict";
import { test } from "node:test";
import { readCapped } from "./read-capped.ts";

/** A streamed body of `chunks` chunks of `size` bytes, with no content-length (as a chunked response). */
const streamed = (chunks, size) => {
  let sent = 0;
  let pulled = 0;
  const body = new ReadableStream({
    pull(c) {
      pulled++;
      if (sent === chunks) return c.close();
      sent++;
      c.enqueue(new Uint8Array(size).fill(7));
    },
  });
  return { res: new Response(body), pulls: () => pulled };
};

test("returns the whole body when it fits", async () => {
  const out = await readCapped(new Response(new Uint8Array(1000).fill(1)), 1000);
  assert.equal(out?.byteLength, 1000);
  assert.equal(out?.[999], 1);
});

test("refuses a body whose content-length is over the cap without reading it", async () => {
  const { res, pulls } = streamed(10, 1000);
  const declared = new Response(res.body, { headers: { "content-length": "10000" } });
  assert.equal(await readCapped(declared, 5000), null);
  assert.ok(pulls() <= 1, `read ${pulls()} chunks`);
});

test("stops reading a streamed body as soon as it passes the cap", async () => {
  const { res, pulls } = streamed(1000, 1000); // 1 MB if read whole
  assert.equal(await readCapped(res, 5000), null);
  assert.ok(pulls() < 10, `read ${pulls()} chunks`);
});

test("an empty body is empty, not null", async () => {
  const out = await readCapped(new Response(new Uint8Array(0)), 10);
  assert.equal(out?.byteLength ?? 0, 0);
});
