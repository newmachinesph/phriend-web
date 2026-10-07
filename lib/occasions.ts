import { cdn } from "@/lib/site";

/**
 * Occasion pages (/occasions/<slug>): the pros people book for one event, grouped. Each lists category slugs from the API;
 * a slug Ops deletes or renames simply drops off the page. The copy is written per occasion so no two pages read alike.
 */
export type Occasion = {
  slug: string;
  name: string;
  title: string; // <title>, under 60 characters with the site name
  description: string; // meta description, under 155 characters
  intro: string;
  book: string[]; // category slugs, most needed first
  tips: string[];
  faq: { q: string; a: string }[];
};

export const OCCASIONS: Occasion[] = [
  {
    slug: "wedding",
    name: "Wedding",
    title: "Book wedding pros in the Philippines",
    description: "Hair and makeup, photographer, videographer, host and coordinator for your wedding. ID-verified local pros, booked by the hour.",
    intro:
      "A Filipino wedding runs on a team of people: hair and makeup at dawn, a photographer and videographer from the preparation to the last dance, a host who keeps the program moving, and a coordinator who keeps the suppliers on time. Book each of them on Phriend, or a team that comes together.",
    book: ["hair-makeup", "photographer", "videographer", "host-emcee", "event-coordinator", "music", "driver"],
    tips: [
      "Book hair and makeup and the photographer first: good ones fill their wedding season months ahead.",
      "Agree in the chat on the hours, the call time and what is delivered (edited photos, a same-day edit, a full video) so both sides have the record.",
      "Meet at the venue or a public place for the ocular, never at a private home.",
    ],
    faq: [
      { q: "Can I book several wedding pros together?", a: "Yes. Book each Phriend on their own, or book a team: several Phriends who sell one package together, with one chat, one price and one booking." },
      { q: "How do I pay a wedding supplier on Phriend?", a: "Directly, in person. On a first booking the downpayment is at most 50% in cash when you meet, and the rest after. Phriend never holds the money." },
    ],
  },
  {
    slug: "prenup-shoot",
    name: "Prenup shoot",
    title: "Book a prenup photographer and team",
    description: "Photographer, videographer, hair and makeup and a driver for your prenup shoot, in the city or out of town. ID-verified local pros.",
    intro:
      "A prenup shoot is a day out: a photographer who knows the light, often a videographer for a short film, hair and makeup that lasts through outfit changes, and someone to drive you between locations. Popular spots are Tagaytay, Intramuros, the beaches of Batangas and La Union, and Cebu's heritage streets.",
    book: ["photographer", "videographer", "hair-makeup", "driver", "out-of-town", "island-hopping"],
    tips: [
      "Pick two or three locations close together; travel eats the golden hour.",
      "Ask the photographer for a sample gallery from the same kind of location and time of day.",
      "Agree on the number of edited photos and when they are delivered before the day.",
    ],
    faq: [
      { q: "Can the photographer travel out of town?", a: "Many do. Say where in the chat and agree on the hours and travel before you book." },
      { q: "Do I need a permit to shoot?", a: "Some heritage sites, parks and resorts ask for one. Check with the place; your photographer often knows which ones do." },
    ],
  },
  {
    slug: "debut",
    name: "Debut",
    title: "Book debut pros: host, makeup, photo and video",
    description: "Plan an 18th birthday debut with a host, hair and makeup, photographer, videographer and coordinator. ID-verified local pros.",
    intro:
      "A debut has a program to keep: the entrance, the 18 roses, the 18 candles, the cotillion. A host who has run debuts before keeps it on time, while hair and makeup, a photographer and a videographer make sure the night is remembered. A coordinator handles the suppliers so the family can enjoy it.",
    book: ["host-emcee", "hair-makeup", "photographer", "videographer", "event-coordinator", "dance", "music"],
    tips: [
      "Send the host the program and the list of roses and candles a week ahead.",
      "Book a dance coach early if there is a cotillion: it needs several practice sessions.",
      "Plan the photographer's hours to cover preparation, the program and the party.",
    ],
    faq: [
      { q: "Who hosts the 18 roses and 18 candles?", a: "The host or emcee runs the whole program, including the roses and candles. Share the names and order with them before the day." },
      { q: "Can I book a cotillion dance coach?", a: "Yes. Look under Dance, and agree on the number of practice sessions and where they happen." },
    ],
  },
  {
    slug: "birthday-party",
    name: "Birthday party",
    title: "Book pros for a birthday party",
    description: "Host, photographer, musician, karaoke and food for a birthday party in the Philippines. ID-verified local pros, booked by the hour.",
    intro:
      "From a milestone 30th to a lola's 80th, a birthday party goes better with a few extra hands: a host for the games and the program, a photographer, a musician or DJ, and someone who can cook or run the food. Book only what the party needs, for the hours you need it.",
    book: ["host-emcee", "photographer", "music", "cooking", "event-coordinator", "videographer"],
    tips: [
      "Book by the hour: a host and a photographer are often only needed for the program itself.",
      "Tell the musician the kind of crowd and songs; a playlist for the lola is not the one for the barkada.",
      "Agree on the place and the hours in the chat so the booking matches the plan.",
    ],
    faq: [
      { q: "Can I book a host for just two hours?", a: "Yes. Every Phriend is booked by the hour; send the start time and number of hours in the booking." },
      { q: "Are the pros verified?", a: "Every Phriend has passed an ID check, and their profile shows reviews from people they met." },
    ],
  },
  {
    slug: "kids-party",
    name: "Kids' party",
    title: "Book a kids' party host and pros",
    description: "A kids' party host with games, a photographer, a musician and an event coordinator. ID-verified local pros for children's parties.",
    intro:
      "A children's party is all about the program: games, prizes and a host who can hold a room of seven-year-olds. Add a photographer so the parents can join in, and a coordinator for the food, the cake and the giveaways.",
    book: ["host-emcee", "photographer", "event-coordinator", "music", "videographer"],
    tips: [
      "Ask the host which games they run and what they bring; agree on the prizes and who buys them.",
      "Keep the program short: 60 to 90 minutes of games is plenty for young kids.",
      "A parent or guardian should stay with the children for the whole party.",
    ],
    faq: [
      { q: "Do kids' party hosts bring their own games?", a: "Most do. Ask in the chat what is included and what you need to prepare." },
      { q: "Can I book a magician or clown?", a: "Look for hosts who list it in their profile, or ask in the chat before you book." },
    ],
  },
  {
    slug: "baptism",
    name: "Baptism",
    title: "Book a photographer for a baptism",
    description: "Photographer, videographer and event coordinator for a binyag and the reception after. ID-verified local pros in the Philippines.",
    intro:
      "A binyag is short at the church and longer at the reception. A photographer covers the ceremony and the family photos with the ninongs and ninangs; a videographer and a coordinator help when the reception is big.",
    book: ["photographer", "videographer", "event-coordinator", "cooking", "host-emcee"],
    tips: [
      "Check the church's rules on photography during the rite before the day, and share them with the photographer.",
      "List the family photos you want, sponsors included, so none are missed.",
      "Book enough hours to cover both the church and the reception.",
    ],
    faq: [
      { q: "Can the photographer shoot inside the church?", a: "It depends on the parish. Ask the church office and tell your photographer what is allowed." },
      { q: "How many hours should I book?", a: "Most families book the ceremony plus the start of the reception, about three to four hours." },
    ],
  },
  {
    slug: "graduation",
    name: "Graduation",
    title: "Book a graduation photographer",
    description: "Graduation photos, hair and makeup and a party host in the Philippines. ID-verified local pros, booked by the hour.",
    intro:
      "Graduation season fills every studio. Book a photographer for campus photos in your toga, hair and makeup for the day, and a host or musician if there is a party after.",
    book: ["photographer", "hair-makeup", "videographer", "host-emcee", "music"],
    tips: [
      "Book early: March to June is the busiest season for graduation shoots.",
      "Check your school's rules for photos on campus and during the ceremony.",
      "Agree on how many edited photos you get and when.",
    ],
    faq: [
      { q: "Can I book a shoot on campus?", a: "Many schools allow it outside the ceremony. Check the rules, and agree on the place with the photographer in the chat." },
      { q: "Can I book hair and makeup for the morning only?", a: "Yes. Send the call time and the number of hours you need." },
    ],
  },
  {
    slug: "corporate-event",
    name: "Corporate event",
    title: "Book pros for a corporate event",
    description: "Host, photographer, videographer, interpreter and coordinator for company events, launches and team buildings in the Philippines.",
    intro:
      "Product launches, town halls and team buildings need people who can run a program and capture it: a professional host, a photographer and a videographer for the content, an interpreter for foreign guests, and a coordinator who handles the day.",
    book: ["host-emcee", "photographer", "videographer", "event-coordinator", "interpreter", "content_creator"],
    tips: [
      "Send the host the run of show and the names to pronounce ahead of time.",
      "Agree on usage rights for photos and video, and the delivery date, in the chat.",
      "Book the host and photographer for the full run of show, including setup and the group photo.",
    ],
    faq: [
      { q: "Can I book an interpreter for foreign guests?", a: "Yes. Look under Interpreter for Korean, Mandarin, Japanese and other languages." },
      { q: "Can several pros come as one booking?", a: "Yes, book a team: several Phriends who sell one package together, with one chat and one price." },
    ],
  },
  {
    slug: "christmas-party",
    name: "Christmas party",
    title: "Book a host for your Christmas party",
    description: "Host, games, photographer and musician for an office or family Christmas party in the Philippines. ID-verified local pros.",
    intro:
      "The Christmas party season starts in November. A host with games, raffles and an exchange-gift program keeps it fun; a photographer and a musician or band finish it off. Book early: December weekends go first.",
    book: ["host-emcee", "music", "photographer", "event-coordinator", "dance", "videographer"],
    tips: [
      "Book by October for December weekends.",
      "Share the raffle, the games and any awards with the host before the night.",
      "Tell the musician the length of each set and the breaks.",
    ],
    faq: [
      { q: "Can the host run the raffle and games?", a: "Most party hosts do. Agree on the program and what they bring in the chat." },
      { q: "Can I book a band or DJ?", a: "Look under Musician; many list DJ sets and band gigs." },
    ],
  },
  {
    slug: "reunion",
    name: "Reunion",
    title: "Book pros for a family or class reunion",
    description: "Host, photographer, food and a tour guide for family and class reunions, including balikbayan visits. ID-verified local pros.",
    intro:
      "Reunions bring people home: balikbayan relatives, classmates from abroad, three generations at one table. A host keeps the program moving, a photographer gets everyone in the frame, and a tour guide or driver helps visiting family get around.",
    book: ["host-emcee", "photographer", "cooking", "tour-guide", "driver", "videographer"],
    tips: [
      "Plan the big group photo early in the day, while everyone is still there.",
      "For visiting relatives, book a driver or tour guide for airport runs and day trips.",
      "Agree on the hours and the place in the chat for each booking.",
    ],
    faq: [
      { q: "Can I book a driver for relatives coming home?", a: "Yes. Book a Driver for airport pickups and trips, or a Tour Guide for a day out." },
      { q: "Can visitors from abroad book too?", a: "Yes. International visitors can book with their passport; Phriends who take international clients say so on their profile." },
    ],
  },
];

export const findOccasion = (slug: string) => OCCASIONS.find((o) => o.slug === slug);

/** The occasion photos live on the CDN at site/occasions/<slug>.jpg (1536x1024); "occasions" is the hub's. */
export const occasionImage = (slug: string) => cdn(`/occasions/${slug}.jpg`);
export const OCCASION_IMAGE = { width: 1536, height: 1024 } as const;
