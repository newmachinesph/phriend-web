/**
 * Articles written for the earlier product (people as the listing, companions, meetups, a third-party ID check) can stay
 * published in Ops until they are rewritten; the site leaves them out (list, page, sitemap) so it describes only the
 * services marketplace. Kept free of imports so `node --test lib/blog-filter.test.mjs` can load it.
 */
export const OFF_PRODUCT =
  /\b(companions?|companionship|kasama|buddy|buddies|meetups?|meet-ups?|hang ?outs?|dating|karaoke|rent[ -]a[ -]friends?|food[ -]?trips?|friends? for hire|spend(?:ing)? time|didit|verification partner)\b|\bPhriends\b|\bthe Phriend\b|\bcompany for\b/i;

type PostText = { title: string; description: string; bodyMd: string; tags?: string[] | null };

/** Whether an Ops article fits the services marketplace (none of the OFF_PRODUCT words in its title, description, tags or body). */
export const isOnProduct = (p: PostText) => !OFF_PRODUCT.test([p.title, p.description, (p.tags ?? []).join(" "), p.bodyMd].join("\n"));
