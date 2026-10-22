// Run: node --test lib/off-product.test.mjs   (plain JS so the Next type-check never sees a .ts import path)
import assert from "node:assert/strict";
import { test } from "node:test";
import { isOnProduct, OFF_PRODUCT } from "./off-product.ts";

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
    "spend time with",
    "spending quality time together",
    "kasama",
    "arrange company for",
    "worth booking company for",
    "buddy",
    "buddies",
    "meetup",
    "meetups",
    "companion",
    "companions",
    "Phriends",
    "message the Phriend",
    "the Phriend's profile",
  ];
  for (const w of words) {
    assert.match(w, OFF_PRODUCT, w);
    assert.equal(isOnProduct(post(`Something about ${w} here.`)), false, `body: ${w}`);
    assert.equal(isOnProduct(post("Clean body.", { title: `A ${w.toUpperCase()} guide` })), false, `title: ${w}`);
  }
  assert.equal(isOnProduct(post("Clean body.", { tags: ["food-trip"] })), false, "tags");
  assert.equal(isOnProduct(post("A bank form that needs two visits. Company for the trip, and someone to check the papers.")), false, "sentence start");
});

test("keeps normal service copy that shares a word with the earlier product", () => {
  for (const text of [
    "book in the Phriend app",
    "Book in the Phriend app or on the Phriend website.",
    "spend time comparing quotes",
    "Spending time on three quotes saves money.",
    "a cleaning company for your office",
    "Hire a moving company for a condo move.",
    "Ask the company for a written quote.",
    "Download the Phriend Provider app.",
    "Keep it in the Phriend chat.",
    "Use the Phriend and Phriend Provider apps.",
  ]) {
    assert.doesNotMatch(text, OFF_PRODUCT, text);
    assert.equal(isOnProduct(post(text)), true, text);
  }
});

test("does not match inside longer words", () => {
  for (const w of ["accommodating", "kasamahan", "spendthrift"]) assert.doesNotMatch(w, OFF_PRODUCT, w);
});
