import Link from "next/link";
import { CalendarCheck, MessageCircle, Plane, Wallet } from "lucide-react";
import { Callout, Figure, Steps } from "@/components/blog";
import { blogPhoto } from "./photo";
import type { Post } from "./index";

export const visitingThePhilippines: Post = {
  slug: "visiting-the-philippines-book-a-local-tour-guide",
  title: "Visiting the Philippines? Book a local tour guide, a driver or a photographer before you land",
  description:
    "For first-time visitors and balikbayans coming home: how to book a verified local tour guide, driver, travel photographer or interpreter on Phriend, what to agree in the chat, and how paying works.",
  seoTitle: "Visiting the Philippines? Book a local guide",
  seoDescription: "Tour guides, drivers, travel photographers and interpreters for visitors and balikbayans. Book ahead, agree the price in chat, pay the provider.",
  ogTitle: "Visiting the Philippines? Book a local guide",
  date: "2026-10-23",
  readingMinutes: 5,
  audience: "client",
  category: { slug: "tour-guide", path: "/services/tour-guide", label: "Tour Guide" },
  related: ["driver", "photographer", "interpreter"],
  tags: ["Guides", "Travel", "Tour guides", "Balikbayan"],
  hero: {
    src: blogPhoto("visiting-the-philippines-book-a-local-tour-guide"),
    alt: "A local guide points across turquoise water from the bow of an outrigger boat while a visitor holding a camera looks on, limestone islands behind them",
  },
  faqTitle: "Questions visitors ask",
  faq: [
    {
      q: "Can I book a tour guide in the Philippines before I arrive?",
      a: "Yes. You can browse, chat with providers and send booking requests from anywhere, in a browser at web.phriend.app or in the Android app.",
    },
    {
      q: "How do I pay a guide or driver on Phriend?",
      a: "You pay the provider directly, in the way and the amount you agreed in the chat. Phriend does not process payments, takes no commission and never holds the money.",
    },
    {
      q: "Are entrance fees and fuel included in the price?",
      a: "Only if the service description says so. Ask in the chat about entrance fees, fuel, tolls, parking and meals before you book.",
    },
    {
      q: "Can I book a service for my family while I am still abroad?",
      a: "Yes. Save their address in the app with a label, book the service there, and say in the chat who will be at home.",
    },
    {
      q: "How do I know a provider is who they say they are?",
      a: "Every provider verifies their identity with a government ID and a selfie before listing. Some add documents such as an NBI clearance or a licence that earn a badge once the Phriend team approves them.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <p className="lead">
        Maybe it is your first trip to the Philippines and you have ten days, three islands and no idea which ferry is the right one. Maybe you are a balikbayan coming home after six years, with a partner who has never been, a list of relatives to visit and a city that has changed while you were away. Either way, the trip goes better with someone local who knows the roads, the timing and the stories.
      </p>
      <p>
        <strong>The short answer:</strong> on Phriend you can book a verified local tour guide, a driver, a travel photographer or an interpreter before you land. Each one is a service with its own price (per hour, per job or per session), photos, schedule and area. You agree the details in the in-app chat, send a request for a time on their schedule, and pay the provider directly on the day. Phriend takes no commission.
      </p>

      <h2>Who to book, and for what</h2>
      <ul>
        <li>
          <strong>A tour guide</strong> for the parts of a place you would walk past on your own: the churches, forts and markets of old Manila, the heritage streets of Cebu City, the hills of Baguio, the islands on a boat day. Guides price per hour or per tour; entrance fees and transport are usually separate unless the service says otherwise.
        </li>
        <li>
          <strong>A <Link href="/services/driver">driver</Link></strong> for days with many stops: airport to the province, a round of relatives in three towns, a day trip to Tagaytay. Agree the hours, the route, and who pays fuel, tolls and parking.
        </li>
        <li>
          <strong>A travel <Link href="/services/photographer">photographer</Link></strong> for the photos you never get when one of you is always holding the phone. Two hours, one place, and the whole family in the frame.
        </li>
        <li>
          <strong>An <Link href="/services/interpreter">interpreter</Link></strong> when a partner or a parent-in-law does not speak Tagalog, Cebuano or Ilocano, for a family celebration, a long lunch with the relatives, or a day of errands in town.
        </li>
      </ul>

      <h2>Book before you land</h2>
      <p>
        You do not need to be in the country to book. Browsing is free, and the chat works from anywhere, so you can sort the first days of the trip from home:
      </p>
      <Steps
        steps={[
          {
            icon: Plane,
            title: "Shortlist from home",
            text: "Browse by city: Manila, Cebu City, Davao City, Baguio and more. Compare prices, photos, reviews and the area each service covers.",
          },
          {
            icon: MessageCircle,
            title: "Agree it in the chat",
            text: "Tell the provider your dates, group size and plans. Agree the price, the hours and what is included. No need to share phone numbers.",
          },
          {
            icon: CalendarCheck,
            title: "Send the request",
            text: "Pick a time on the service's schedule. The provider accepts or declines; a request with no answer in 24 hours, or by its start time, expires.",
          },
          {
            icon: Wallet,
            title: "Pay on the day",
            text: "Pay the provider directly, as agreed. Then rate them and add up to four photos from the trip.",
          },
        ]}
      />
      <p>
        Accepted bookings have an Add to Calendar button, which helps when you are changing time zones. If your flight moves, you can cancel the booking and say why in the chat.
      </p>
      <p>
        Where to start depends on the trip. Landing in Manila, a half-day walk through Intramuros and Binondo is a gentle first day while you adjust to the heat and the time zone. In Cebu City the heritage sites downtown sit close together, while the hills above the city need a car. In Baguio, a guide knows which markets and viewpoints are worth the early start. The <Link href="/manila">Manila page</Link> and the other city pages list what you can book in each place.
      </p>

      <Callout title="Agree the extras in writing">
        The service price covers the provider. Entrance fees, fuel, tolls, parking, boat fees and meals are usually separate unless the description says otherwise. Ask about each one in the chat, so the total is clear to both of you before the day.
      </Callout>

      <h2>For balikbayans: the trip is also errands</h2>
      <p>
        Coming home is rarely just a holiday. There is the aircon at your parents’ house that has not been cleaned in a year, the documents to sort, the groceries for the big family dinner. The same app books those too: save your parents’ address with a label like “Mama’s house”, book aircon cleaning, a home cleaning or an errand there, and say in the chat who will be at home. You can keep doing it after you fly back; our guide on{" "}
        <Link href="/blog/booking-help-for-your-parents-from-abroad">booking help for your parents from abroad</Link> shows how.
      </p>

      <Figure
        src={blogPhoto("manila-street-tour")}
        alt="A man and a woman talk and laugh as they walk along a Manila sidewalk, jeepneys parked on the street beside them"
        caption="A street-level walk through old Manila: jeepneys, shopfronts and the stories behind them."
      />

      <h2>What makes a good guide booking</h2>
      <ul>
        <li>
          <strong>Be specific about your group.</strong> Two backpackers and a family of seven with a lola need different pace, transport and stops.
        </li>
        <li>
          <strong>Share what you already planned.</strong> A guide who knows you have a boat booked at 7 in the morning can plan the day around it.
        </li>
        <li>
          <strong>Ask about the weather plan.</strong> From June to November a rainy afternoon is likely. A good guide has an indoor version of the day.
        </li>
        <li>
          <strong>Read the reviews.</strong> Past clients can rate the provider and attach photos after a completed booking, and providers review clients too.
        </li>
      </ul>
      <p>
        If Cebu is on your route, our breakdown of{" "}
        <Link href="/blog/tour-guide-prices-in-cebu">tour guide prices in Cebu City</Link> shows how to read a guide’s price and work out the real total for the day.
      </p>

      <h2>Trust, without the guesswork</h2>
      <p>
        Every provider has verified their identity with a government ID and a selfie, and a person on the Phriend team reviews each service before it goes live. Some providers add an NBI clearance, a driver’s licence or certificates, and each approved document shows as a badge on their profile. Report and block are in every profile and chat. The price, the hours and what is included stay in the chat as your record, and the money goes straight from you to the person who did the work.
      </p>
      <p>
        The islands, the food and the people are the reason for the trip. A local who knows them is the easiest way to see them properly.
      </p>
    </>
  );
}
