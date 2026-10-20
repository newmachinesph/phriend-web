// Run: node --test lib/blog-filter.test.mjs   (plain JS so the Next type-check never sees a .ts import path)
import assert from "node:assert/strict";
import { test } from "node:test";
import { isOnProduct, OFF_PRODUCT } from "./blog-filter.ts";

const post = (bodyMd, extra = {}) => ({ title: "How much does aircon cleaning cost?", description: "Prices per unit in Metro Manila.", bodyMd, tags: [], ...extra });

test("keeps an on-product article", () => {
  assert.equal(isOnProduct(post("Book a verified provider, compare prices and pay them directly. Accommodating schedules, updated daily.")), true);
});

test("hides an article with any off-product word, in any case or field", () => {
  const words = [
    "dating",
    "karaoke",
    "rent a friend",
    "Rent-a-Friend",
    "food trip",
    "foodtrip",
    "friend for hire",
    "friends for hire",
    "spend time",
    "spending time",
    "kasama",
    "company for",
    "buddy",
    "buddies",
    "meetup",
    "meetups",
    "companion",
    "companions",
    "Phriends",
  ];
  for (const w of words) {
    assert.match(w, OFF_PRODUCT, w);
    assert.equal(isOnProduct(post(`Something about ${w} here.`)), false, `body: ${w}`);
    assert.equal(isOnProduct(post("Clean body.", { title: `A ${w.toUpperCase()} guide` })), false, `title: ${w}`);
  }
  assert.equal(isOnProduct(post("Clean body.", { tags: ["food-trip"] })), false, "tags");
});

test("does not match inside longer words", () => {
  for (const w of ["accommodating", "kasamahan", "spendthrift"]) assert.doesNotMatch(w, OFF_PRODUCT, w);
});
