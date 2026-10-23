import Link from "next/link";
import { CalendarCheck, ClipboardList, MessageCircle, Wallet } from "lucide-react";
import { Callout, Figure, Steps } from "@/components/blog";
import { blogPhoto } from "./photo";
import type { Post } from "./index";

export const partyServices: Post = {
  slug: "plan-a-party-with-local-services",
  title: "Plan a party on short notice with local services: food, cake, a host and the photos",
  description:
    "A birthday, a debut or a company event in two weeks: which services to book on Phriend, in what order, what to agree in the chat, and how paying the providers works.",
  seoTitle: "Plan a party on short notice with local services",
  seoDescription: "Catering, cakes, a host and emcee, a party entertainer, a photographer and a coordinator: what to book first for a party in two weeks.",
  ogTitle: "A party in two weeks? Book it in this order",
  date: "2026-10-23",
  readingMinutes: 5,
  audience: "client",
  category: { slug: "events", path: "/services/events", label: "event" },
  related: ["catering", "baker", "photographer"],
  tags: ["Guides", "Events", "Birthdays", "Party planning"],
  hero: {
    src: blogPhoto("plan-a-party-with-local-services"),
    alt: "Two women laugh at a restaurant table as one holds up a small chocolate cake with a lit candle and Happy Birthday piped on top",
  },
  faqTitle: "Questions party planners ask",
  faq: [
    {
      q: "What should I book first for a party?",
      a: "Book the services that fill up first: catering, the host or emcee, and the photographer. The cake, decorations and an entertainer can usually be booked a little later.",
    },
    {
      q: "How do I pay the caterer and the other providers?",
      a: "You pay each provider directly, in the amount and the way you agreed in the chat. Phriend takes no commission and never holds the money.",
    },
    {
      q: "Can I book for a party at someone else's house?",
      a: "Yes. Save that address in the app with a label, such as \"Tita's house\", choose it when you book, and say in the chat who will be there to receive the provider.",
    },
    {
      q: "What if the provider does not answer my request?",
      a: "A request expires if it is not answered within 24 hours, or by its start time. On short notice, send requests early and have a second choice saved.",
    },
    {
      q: "Does Phriend book the venue?",
      a: "No. Phriend lists services from providers, such as catering, cakes, hosting, entertainment and photography; the venue is yours to arrange.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <p className="lead">
        Somebody’s birthday is in two weeks and the plan so far is “something at home”. Or the office outing got moved up, or a debut lost its caterer. Short notice is normal for Filipino celebrations. What helps is knowing who to book, in which order, and what to agree before the day so nothing is a surprise.
      </p>
      <p>
        <strong>The short answer:</strong> to plan a party on short notice, book in this order: the food (catering), the host or emcee, the photographer, then the cake, then an entertainer if there are children. On Phriend each of these is a service with its own price per job, per hour or per session, photos, schedule and area. You agree the details in the chat, send a request for your date, and pay each provider directly. If the event is big, an event coordinator can run the day for you.
      </p>

      <h2>Who to book</h2>
      <ul>
        <li>
          <strong><Link href="/services/catering">Catering</Link>.</strong> The biggest line in most budgets and the first thing to lock. Agree the menu, the headcount, whether the service includes serving staff, plates and chafing dishes, and what time the food arrives.
        </li>
        <li>
          <strong><Link href="/services/baker">Cakes</Link>.</strong> A baker needs the design, the size and the flavour, and a few days to make it. Ask about delivery and whether it needs a fridge on arrival.
        </li>
        <li>
          <strong><Link href="/services/host-emcee">A host or emcee</Link>.</strong> The person who keeps the program moving: the welcome, the games, the 18 roses, the speeches, the raffle. A good one turns a crowd of relatives and officemates into one room.
        </li>
        <li>
          <strong>A party entertainer.</strong> For children’s parties: magic, games, balloon twisting, face painting. Agree the length of the set and the age of the kids.
        </li>
        <li>
          <strong>A photographer.</strong> Someone whose only job is to get the photos, including the ones where the celebrant is in the frame.
        </li>
        <li>
          <strong>An <Link href="/services/event-coordinator">event coordinator</Link>.</strong> For a debut, a wedding anniversary or a company event: they hold the schedule on the day, talk to the other providers, and keep you out of the kitchen.
        </li>
      </ul>

      <p>
        Not every party needs all six. A small family birthday might be catering and a cake. A seventh birthday with thirty children needs the entertainer more than the emcee. A company event needs a host, a photographer and someone to hold the schedule. Start with the guests: who is coming, how many, and what they will remember. Book the services that serve that, and skip the rest.
      </p>

      <Callout title="Short notice? Book in this order">
        Food first, host second, photographer third, then the cake and the entertainer. Send all your requests early in the same day: a request expires if the provider has not answered in 24 hours, or by its start time, and you want time for a second choice.
      </Callout>

      <h2>What to agree in the chat</h2>
      <p>
        Every price on Phriend is set by the provider and shown on the service. The chat is where the details are agreed and kept, so both sides have the record:
      </p>
      <ul>
        <li>
          <strong>The hours.</strong> Arrival time, setup, the start of the program, and when they leave. Overtime is easier to agree before than during.
        </li>
        <li>
          <strong>What is included.</strong> Staff, equipment, sound system, delivery, cleanup. If it is not written, ask.
        </li>
        <li>
          <strong>The address and access.</strong> Parking, the floor, the guard who needs a name on a list.
        </li>
        <li>
          <strong>How and when to pay.</strong> You pay the provider directly, as you agree. Settle the amount and the timing in the chat.
        </li>
      </ul>
      <p>
        Providers can set up FAQ answers that reply instantly, for questions like “Do you bring your own sound system?” or “How many guests per tray?”. Tap one before you type.
      </p>

      <h2>An example budget, with made-up numbers</h2>
      <p>
        To show how a total comes together, here is an example for a 40-guest birthday at home. These are not market rates; real prices are on each service.
      </p>
      <ul>
        <li>
          <strong>Catering</strong> for 40 at ₱350 per head: ₱14,000.
        </li>
        <li>
          <strong>Host and emcee</strong> at ₱5,000 per event, three hours: ₱5,000.
        </li>
        <li>
          <strong>Photographer</strong> at ₱1,200 per hour for three hours: ₱3,600.
        </li>
        <li>
          <strong>Cake</strong> from a home baker: ₱2,500.
        </li>
      </ul>
      <p>
        In this example the services come to ₱25,100, each paid to the provider who did the work, with no platform fee on top. Swap any line for your real quotes and you have your budget.
      </p>

      <Figure
        src={blogPhoto("event-venue")}
        alt="Guests in business attire chat and laugh with iced drinks under strings of warm lights in a hotel function room"
        caption="A company event: a host keeps the program on time while a photographer covers the room."
      />

      <h2>How to book each service</h2>
      <Steps
        steps={[
          {
            icon: ClipboardList,
            title: "List what you need",
            text: "Food, host, photos, cake, entertainer. Browse each category and save the services you like so you can compare them.",
          },
          {
            icon: MessageCircle,
            title: "Agree the details",
            text: "Message each provider with the date, the headcount and the address. Agree the price, the hours and what is included.",
          },
          {
            icon: CalendarCheck,
            title: "Send the requests",
            text: "Pick a time from each service's schedule and the address of the party. Each provider accepts or declines; accepted bookings have an Add to Calendar button.",
          },
          {
            icon: Wallet,
            title: "Pay and review",
            text: "Pay each provider directly, as agreed. Afterwards rate them and add up to four photos from the party.",
          },
        ]}
      />
      <p>
        If the party is at a parent’s or a relative’s house, save that address with a label and say in the chat who will open the gate. The app refuses an address outside a provider’s area, so you never book a caterer who cannot reach you. Our guide on{" "}
        <Link href="/blog/booking-a-service-for-someone-else">booking a service for someone else</Link> covers the details.
      </p>

      <h2>Who you are booking</h2>
      <p>
        Every provider has verified their identity with a government ID and a selfie, and a person on the Phriend team reviews each service before it goes live. Some add business permits, certificates or an NBI clearance, each shown as a badge once approved. Reviews from past clients sit on every profile, and report and block are in every profile and chat.
      </p>
      <p>
        Two weeks is enough. Lock the food, the host and the photographer this week, the cake and the extras next week, and on the day, the only thing left for you to do is be there.
      </p>
    </>
  );
}
