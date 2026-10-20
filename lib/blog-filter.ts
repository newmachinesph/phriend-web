/**
 * Articles written for the earlier product (people as the listing, companions, meetups, a third-party ID check) can stay
 * published in Ops until they are rewritten; the site leaves them out (list, page, sitemap) so it describes only the
 * services marketplace. Kept free of imports so `node --test lib/blog-filter.test.mjs` can load it.
 */
const PATTERNS = [
  // words that only the earlier product used
  String.raw`\b(?:companions?|companionship|kasama|buddy|buddies|meetups?|meet-ups?|hang ?outs?|dating|karaoke|rent[ -]a[ -]friends?|food[ -]?trips?|friends? for hire|didit|verification partner)\b`,
  // time spent WITH someone, not "spend time comparing quotes"
  String.raw`\bspend(?:s|ing)? (?:quality |more |some )?time (?:with|together)\b`,
  // company as in being with someone ("arrange company for your parent", "Company for the trip"), not a business
  // ("a cleaning company for your office"): only after a verb of arranging it or at the start of a sentence
  String.raw`(?:^|[.!?:*]\s*|\b(?:arrange[sd]?|arranging|book(?:s|ed|ing)?|need(?:s|ed)?|want(?:s|ed)?|find|finding|hire[sd]?|hiring|get|getting|send|sending|worth)\s+)company for\b`,
  // people as the listing: "Phriends", "message the Phriend", "the Phriend's profile"; not "in the Phriend app"
  String.raw`\bPhriends\b`,
  String.raw`\bthe Phriend\b(?![ -](?:apps?|web ?apps?|website|site|team|platform|account|blog|support|help|pwa|store|feed)\b)`,
];
export const OFF_PRODUCT = new RegExp(PATTERNS.join("|"), "i");

type PostText = { title: string; description: string; bodyMd: string; tags?: string[] | null };

/** Whether an Ops article fits the services marketplace (none of the OFF_PRODUCT words in its title, description, tags or body). */
export const isOnProduct = (p: PostText) => !OFF_PRODUCT.test([p.title, p.description, (p.tags ?? []).join(" "), p.bodyMd].join("\n"));
