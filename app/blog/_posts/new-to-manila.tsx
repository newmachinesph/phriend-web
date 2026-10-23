import Link from "next/link";
import { CalendarCheck, MapPin, MessageCircle, Search } from "lucide-react";
import { Callout, Figure, Steps } from "@/components/blog";
import { blogPhoto } from "./photo";
import type { Post } from "./index";

export const newToManila: Post = {
  slug: "new-to-manila-first-month-services",
  title: "New to Metro Manila for work? The services that make your first month easier",
  description:
    "Moving to Manila, Makati or Quezon City for a new job: the services you can book on Phriend for viewing units, moving in, cleaning, aircon, laundry, tech setup and learning your way around the city.",
  seoTitle: "New to Manila? Services for your first month",
  seoDescription: "Moving to Metro Manila for work? Book property viewing, moving help, cleaning, aircon, laundry, tech help and a city tour from verified providers.",
  ogTitle: "New to Manila? Your first month, sorted",
  date: "2026-10-23",
  readingMinutes: 5,
  audience: "client",
  category: { slug: "moving-help", path: "/services/moving-help", label: "Moving Help" },
  related: ["home-cleaning", "aircon-cleaning", "property-viewing", "laundry"],
  tags: ["Guides", "Moving", "Metro Manila", "First month"],
  hero: {
    src: blogPhoto("new-to-manila-first-month-services"),
    alt: "A young man with a backpack and a laptop sleeve talks with an older woman over coffee at a window table, Manila high-rises behind them",
  },
  faqTitle: "Questions new arrivals ask",
  faq: [
    {
      q: "Can I book someone to view a unit for me before I move?",
      a: "Yes, property viewing is a service category on Phriend. A provider goes to see the unit at the time you book and sends you photos and notes in the chat, so you can shortlist from the province or from abroad.",
    },
    {
      q: "How do I pay for a moving or cleaning service?",
      a: "You pay the provider directly, the amount you agreed in the chat. Phriend takes no commission and never holds the money.",
    },
    {
      q: "Do I need a permanent address to book?",
      a: "You need the address where the work happens, saved in the app. You can save up to 10 addresses, such as your old boarding house and your new condo, and pick one for each booking.",
    },
    {
      q: "Why did the app refuse my address?",
      a: "The address is outside the area that service covers. Each provider sets the area for each service, so look for a service whose area includes your new place.",
    },
    {
      q: "Is there an app for iPhone?",
      a: "Not yet; an iOS app is coming. On an iPhone, open web.phriend.app in Safari and use Add to Home Screen, and on Android you can use the app.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <p className="lead">
        The offer letter says Makati, or BGC, or Ortigas, and the start date is three weeks away. You need a place, you need your things in it, and you need to learn a city where a 6-kilometre trip can take an hour. The first month in Metro Manila is mostly logistics, and most of that logistics can be booked.
      </p>
      <p>
        <strong>The short answer:</strong> in your first month in Metro Manila you can book property viewing to check units before you sign, moving help to carry and set up, a move-in cleaning, aircon cleaning, tech help for internet and devices, laundry, errands, and a tour guide to learn the city. On Phriend each of these is a service with its own price, schedule and area, from a provider who has verified their identity, and you pay the provider directly.
      </p>

      <h2>Before you sign: let someone see the unit</h2>
      <p>
        Listing photos are taken on the best day of the year. A <Link href="/services/property-viewing">property viewing</Link> service sends someone to the unit at the time you book, while you are still in the province or abroad. Ask them to check what photos leave out:
      </p>
      <ul>
        <li>
          <strong>Water and power.</strong> Pressure at the shower, whether the outlets work, where the meter is.
        </li>
        <li>
          <strong>Noise and light.</strong> What the street sounds like at rush hour and which way the windows face.
        </li>
        <li>
          <strong>Signal and internet.</strong> Mobile data inside the unit, and which providers serve the building.
        </li>
        <li>
          <strong>The commute.</strong> How far the walk really is to the MRT, the jeepney stop or the Grab pickup point.
        </li>
      </ul>
      <p>The photos and notes come back in the chat, so you can compare three units side by side before you pay a deposit.</p>

      <h2>Week one: moving in</h2>
      <p>
        <Link href="/services/moving-help">Moving help</Link> covers the heavy part: carrying boxes up from the lobby, getting a bed frame through a narrow door, assembling the shelf you bought online. Providers price it per job or per hour, so describe the load in the chat (how many boxes, which floor, whether there is a service elevator) and agree the price before the day.
      </p>
      <p>
        Book a move-in <Link href="/services/home-cleaning">home cleaning</Link> for the day before your things arrive, when the unit is empty and every corner can be reached. If the unit has a split-type or window aircon, book aircon cleaning in the same week. A unit that has been empty for months usually needs it, and you will run it every night until the rainy season.
      </p>

      <Callout title="Save your new address first">
        At-home services go to one of your saved addresses. You can save up to 10, with one default, so add the new unit as soon as you have it, and keep the old one if you are moving things across. The app refuses an address outside a service’s area, which saves you a booking with a provider who cannot come.
      </Callout>

      <h2>Week two: get connected and set up</h2>
      <p>
        <strong>Tech help</strong> is the service most people forget they need. A provider can set up your router and wifi, connect the smart TV, move your files to a new laptop, or install the apps your company uses. If you work from home some days, it is worth an hour. Our guide to{" "}
        <Link href="/blog/services-that-free-up-your-work-from-home-day">services that free up your work-from-home day</Link> covers the rest of that routine.
      </p>
      <p>
        <strong>Errands</strong> fill the gaps while you are at work: picking up the bed you ordered, buying the things a new kitchen needs, queueing for a document, or a pasabuy from the shop across the city you have not found yet.
      </p>

      <h2>Weeks three and four: a routine that holds</h2>
      <ul>
        <li>
          <strong>Laundry and ironing.</strong> Most condos have no space for a washer. A laundry and ironing service can pick up, wash and iron on a schedule you agree, so your work shirts are ready every Monday.
        </li>
        <li>
          <strong>Regular cleaning.</strong> Once a week or every two weeks, same provider, same day. Save the service so it is easy to book again.
        </li>
        <li>
          <strong>Repairs.</strong> The faucet that drips, the outlet that sparks: plumbing, electrical and handyman services are there when the building admin is slow to answer.
        </li>
      </ul>

      <h2>Learn the city on foot</h2>
      <p>
        The fastest way to stop feeling new is to walk the old parts of the city with someone who knows them. A two- or three-hour tour through Intramuros, Binondo and Quiapo shows you how Manila fits together, and a good guide will also teach you the practical things: how jeepney routes are signed, which MRT exits to use, where to eat near the office.
      </p>
      <Figure
        src={blogPhoto("intramuros-walking-tour")}
        alt="A guide points out the old stone walls to a visitor on a cobbled Intramuros street, a horse-drawn kalesa behind them"
        caption="A weekend walk through Intramuros: two hours, one guide, and the city starts to make sense."
      />
      <p>
        Tour guides price per hour or per tour, and entrance fees and transport are usually separate unless the service says otherwise. See what is on offer on the <Link href="/manila">Manila page</Link>.
      </p>

      <h2>How to book any of these</h2>
      <Steps
        steps={[
          {
            icon: Search,
            title: "Find the service",
            text: "Browse by category or by city. Each service shows its price (per job, per hour or per session), photos, schedule and the area it covers.",
          },
          {
            icon: MessageCircle,
            title: "Agree the details in the chat",
            text: "Describe the job, ask what is included, and agree the price and the hours. FAQ answers the provider has set up reply instantly.",
          },
          {
            icon: MapPin,
            title: "Pick a time and an address",
            text: "Choose a time from the service's schedule and one of your saved addresses for at-home work, then send the request.",
          },
          {
            icon: CalendarCheck,
            title: "Get the answer",
            text: "The provider accepts or declines. A request with no answer in 24 hours, or by its start time, expires, so book the urgent things first.",
          },
        ]}
      />
      <p>
        On the day, you pay the provider directly, as agreed. Afterwards you can rate them and add up to four photos, and providers review clients too. Every provider has verified their identity with a government ID and a selfie, and report and block are in every profile and chat. By the end of the month, the city is still big, but your part of it works.
      </p>
    </>
  );
}
