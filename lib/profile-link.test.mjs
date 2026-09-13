// Run: node --test lib/profile-link.test.mjs   (plain JS so the Next type-check never sees a .ts import path)
import assert from "node:assert/strict";
import { test } from "node:test";
import { profileKey } from "./profile-link.ts";

test("reads every link shape a creator might paste", () => {
  const cases = [
    ["https://web.phriend.app/@BiancaEats", "@biancaeats"],
    ["web.phriend.app/@biancaeats?utm=tiktok", "@biancaeats"],
    ["phriend.app/@biancaeats/", "@biancaeats"],
    ["https://web.phriend.app/u/biancaeats", "@biancaeats"],
    ["@biancaeats", "@biancaeats"],
    ["biancaeats", "@biancaeats"],
    ["  https://web.phriend.app/phriends/482  ", "482"],
    ["https://web.phriend.app/post/482", "482"],
    ["482", "482"],
  ];
  for (const [input, want] of cases) assert.equal(profileKey(input), want, input);
});

test("rejects other sites and junk", () => {
  for (const input of ["", "https://tiktok.com/@biancaeats", "evil.com/phriends/1", "https://phriend.app.evil.com/@abc", "@ab", "0", "hello world", "web.phriend.app/earn", "javascript:alert(1)"]) {
    assert.equal(profileKey(input), null, input);
  }
});
