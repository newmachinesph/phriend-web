import Link from "next/link";
import { CalendarCheck, MessageCircle, Search, Wallet } from "lucide-react";
import { Callout, Steps } from "@/components/blog";
import { blogPhoto } from "./photo";
import type { Post } from "./index";

export const cebuTourGuides: Post = {
  slug: "tour-guide-prices-in-cebu",
  title: "Tour guide prices in Cebu City: how guides charge, and what the price covers",
  description:
    "How Cebu City tour guides on Phriend price a walking tour or a day around the city, what is usually included, what is usually extra, and how to read a price before you book.",
  seoTitle: "Tour guide prices in Cebu City: how they work",
  seoDescription: "Per hour or per tour, what is included, and what is usually extra, like entrance fees and transport. Read a Cebu guide's price before you book.",
  ogTitle: "What a Cebu City tour guide costs, and why",
  date: "2026-10-23",
  readingMinutes: 5,
  audience: "client",
  category: { slug: "tour-guide", path: "/services/tour-guide", label: "Tour Guide" },
  tags: ["Guides", "Cebu City", "Tour guides", "Travel"],
  hero: {
    src: blogPhoto("tour-guide-prices-in-cebu"),
    alt: "A local guide points up at the bell tower of an old stone church while a visitor with a backpack listens, on a cobbled heritage street",
  },
  faqTitle: "Questions visitors ask about Cebu guides",
  faq: [
    {
      q: "How much does a tour guide in Cebu City cost?",
      a: "Each guide on Phriend sets their own price, per hour or per tour, and it is shown on the service before you book. For the prices guides are charging right now, open the Tour Guide in Cebu City page and compare the services there.",
    },
    {
      q: "Are entrance fees included in the guide's price?",
      a: "Usually not, unless the service description says they are. Entrance fees, transport, meals and drinks are normally paid separately, so ask in the chat if the description does not say.",
    },
    {
      q: "Is the price per person or per group?",
      a: "It depends on the guide, so check the service description and ask in the chat. Many guides price per group up to a set size, and a few charge more for a bigger group.",
    },
    {
      q: "Does Phriend add a booking fee?",
      a: "No. Phriend takes no commission and does not process payments: you pay the guide directly, the amount you agreed in the chat.",
    },
    {
      q: "Can I book a guide before I arrive in Cebu?",
      a: "Yes. You can browse, chat and send a booking request from anywhere, in any browser at web.phriend.app or in the Android app, and the guide accepts or declines.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <p className="lead">
        You have one free day in Cebu City and a list that starts at Magellan’s Cross and ends somewhere up in the hills at Tops Lookout. A guide who knows the order to see things in, where the queues form and which streets are faster on foot can turn that list into a good day. The first question is what it will cost, and the honest answer is that it depends on how the guide prices the tour.
      </p>
      <p>
        <strong>The short answer:</strong> on Phriend, every Cebu City guide sets the price of each tour they list, either per hour or per tour, and the price is shown on the service before you book. That price pays for the guide’s time and knowledge. Entrance fees, transport, meals and drinks are usually separate unless the service says they are included. For the prices guides are charging today, see{" "}
        <Link href="/tour-guide-in-cebu-city">tour guides in Cebu City</Link>.
      </p>

      <h2>The two ways Cebu guides price a tour</h2>
      <p>Every tour on Phriend is listed as a service with its own price, photos, schedule and area. Guides pick one of two models:</p>
      <ul>
        <li>
          <strong>Per hour.</strong> You pay for the hours you book, often with a minimum of two or three hours. This suits a flexible day: you can stay longer at the Basilica del Santo Niño or skip a stop without renegotiating.
        </li>
        <li>
          <strong>Per tour.</strong> One price for a set route and length, such as a heritage walk downtown or a half day that ends at a viewpoint. This suits a first visit, because you know the total before you start.
        </li>
      </ul>
      <p>
        Neither is cheaper by nature. A per-hour price looks lower on the card but adds up over a long day; a per-tour price looks higher but already counts the hours. Compare them by working out what your day would cost under each.
      </p>

      <h2>What the price usually covers, and what it usually does not</h2>
      <p>The guide’s price is for the guide. Here is how the rest of the day normally splits:</p>
      <ul>
        <li>
          <strong>Included:</strong> the guide’s time, the route they plan, the history and stories at each stop, and help with getting from one place to the next.
        </li>
        <li>
          <strong>Usually extra:</strong> entrance fees at sites that charge them, such as Fort San Pedro, and anything you buy along the way at Carbon Market.
        </li>
        <li>
          <strong>Usually extra:</strong> transport. The downtown heritage sites are close enough to walk between, but the Taoist Temple in Beverly Hills and Tops Lookout in Busay are not. You pay for the Grab, taxi or car, and sometimes the guide’s fare too.
        </li>
        <li>
          <strong>Usually extra:</strong> meals and drinks, for you and, on a long day, often for the guide.
        </li>
      </ul>
      <p>
        If a guide includes any of these, it will be in the service description. If the description is silent, assume it is extra and ask in the chat.
      </p>

      <Callout title="Example arithmetic, not current prices">
        The numbers below are made up to show how a total is built. They are not Cebu rates. The real prices are on each guide’s service.
      </Callout>

      <h2>Two example days, worked out</h2>
      <p>
        <strong>Example 1, per hour.</strong> Say a guide charges ₱600 per hour with a three-hour minimum, and you book a downtown walk: Magellan’s Cross, the Basilica del Santo Niño, Fort San Pedro and a loop through Carbon Market. Three hours at ₱600 is ₱1,800 for the guide. Add the Fort San Pedro entrance fee for each person in your group and a ride back to your hotel. If you stay an extra hour, that is another ₱600, but only if you agree it with the guide first.
      </p>
      <p>
        <strong>Example 2, per tour.</strong> Say another guide lists a half-day city tour at ₱3,000 per tour, covering the downtown sites in the morning and the Taoist Temple and Tops Lookout in the afternoon. The ₱3,000 is the guide. Because the hill stops need a car, you add transport: a car and driver for the afternoon, or rides booked as you go. If the description says “transport included”, the ₱3,000 is closer to your full day.
      </p>
      <p>
        Same city, two very different totals, and both are fair. What matters is that you know what you are paying for before the day starts.
      </p>

      <h2>What to ask in the chat before you book</h2>
      <p>
        Guides can set up FAQ answers that reply instantly, so some of these may already be answered. For the rest, ask:
      </p>
      <ul>
        <li>
          <strong>Group size.</strong> Is the price per group or per person, and up to how many people?
        </li>
        <li>
          <strong>Start and end points.</strong> Will the guide meet you at your hotel, or at the first stop?
        </li>
        <li>
          <strong>Transport.</strong> Who arranges it, who pays, and is the guide’s own fare on you?
        </li>
        <li>
          <strong>Overtime.</strong> What happens if you want to stay longer than booked?
        </li>
        <li>
          <strong>Language and pace.</strong> Which languages the guide speaks, and whether the route suits older parents or small children.
        </li>
      </ul>
      <p>
        Whatever you agree goes in the chat, so you both have the record. There is no need to share phone numbers.
      </p>

      <h2>How booking works</h2>
      <Steps
        steps={[
          {
            icon: Search,
            title: "Compare Cebu tours",
            text: "Open the tour guide services in Cebu City. Each card shows the price, per hour or per tour, with photos, the schedule and the area the guide covers.",
          },
          {
            icon: MessageCircle,
            title: "Ask in the chat",
            text: "Confirm what is included, the group size and where you will start. The price, the hours and what is included are agreed here.",
          },
          {
            icon: CalendarCheck,
            title: "Send the request",
            text: "Pick a time from the service's schedule and send it. The guide accepts or declines; a request with no answer in 24 hours, or by its start time, expires.",
          },
          {
            icon: Wallet,
            title: "Pay the guide directly",
            text: "On the day, you pay the guide the amount you agreed, in the way you agreed. Phriend never holds the money and takes no cut.",
          },
        ]}
      />
      <p>
        Once a guide accepts, the booking has an Add to Calendar button, and you can cancel if your plans change. Every guide has verified their identity with a government ID and a selfie, and some show badges for documents the Phriend team approved. You can read more on <Link href="/safety">how Phriend keeps bookings safe</Link>, and on{" "}
        <Link href="/blog/how-booking-and-payment-work-on-phriend">how booking and payment work</Link>.
      </p>

      <h2>After the tour</h2>
      <p>
        Rate the guide and add up to four photos from the day. Your review is how the next visitor decides, and it is worth more to a good guide than a tip. If you are planning more of the country, our guide to{" "}
        <Link href="/blog/visiting-the-philippines-book-a-local-tour-guide">booking a local tour guide when visiting the Philippines</Link> covers drivers, photographers and interpreters too, and the <Link href="/cebu-city">Cebu City page</Link> lists everything else you can book while you are there.
      </p>
    </>
  );
}
