import Link from "next/link";
import { CalendarCheck, MapPin, Search } from "lucide-react";
import { Callout, Steps } from "@/components/blog";
import { blogPhoto } from "./photo";
import type { Post } from "./index";

export const driverDayOut: Post = {
  slug: "booking-a-driver-for-a-parents-day-out",
  title: "Booking a driver for your parent's day out: the market, church, the mall, relatives and a checkup",
  description:
    "How to plan a senior parent's day of stops around a driver you book on Phriend, and how to brief the driver in the chat so the day runs on time.",
  seoTitle: "Booking a driver for a parent's day out",
  seoDescription: "Plan a parent's day of market, church, mall, relatives and a checkup, book a driver on Phriend and brief them in the chat.",
  ogTitle: "A driver for your parent's day out",
  date: "2026-10-23",
  readingMinutes: 5,
  audience: "client",
  category: { slug: "driver", path: "/services/driver", label: "Driver" },
  related: ["senior-care"],
  tags: ["Guides", "Driver", "Seniors", "Family"],
  hero: {
    src: blogPhoto("booking-a-driver-for-a-parents-day-out"),
    alt: "An older woman in a straw hat and a younger woman carrying woven baskets point at fresh greens at a busy wet market stall",
  },
  faqTitle: "Questions families ask",
  faq: [
    {
      q: "Can I book a driver for my parent if I am not there?",
      a: "Yes, you can book from anywhere and have the driver pick your parent up at their address. Save their address with a label like \"Papa's house\", choose it when you book, and say in the chat who will be waiting at the gate.",
    },
    {
      q: "How much does a driver cost for a full day?",
      a: "Each driver sets their own price, per hour or per job, and it is shown on the service. As an example, a driver who charges ₱350 per hour comes to ₱2,800 for eight hours; fuel, parking and tolls are agreed in the chat.",
    },
    {
      q: "Will the driver go into the clinic with my parent?",
      a: "No, a driver's service is the driving and the waiting. For help through the clinic, the queues and the forms, book a hospital assistance service for that part of the day as well.",
    },
    {
      q: "How do I pay the driver?",
      a: "You pay the driver directly, in the amount and the way you agreed in the chat. Phriend does not process payments, takes no commission and never holds the money.",
    },
    {
      q: "What if the driver does not answer my request?",
      a: "A request that is not answered within 24 hours, or by its start time, expires. Send a request to another Driver service that covers the same area; saving a few services makes this quick.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <p className="lead">
        Mama&apos;s Saturday has a shape. The palengke before the heat, the ten o&apos;clock Mass, the bank and the grocery at the mall, a visit to Tita in the next barangay, and every few months a checkup she keeps moving because nobody is free to drive her. When everyone in the family is at work, in another city or abroad, the day turns into tricycle rides, a Grab at every stop and bags of vegetables on her lap. A driver booked for the whole day fixes the part that is actually hard: getting from one stop to the next.
      </p>
      <p>
        You can book a driver for a parent&apos;s day out on Phriend. Open a Driver service that covers your parent&apos;s area, pick a start time from its schedule, choose the pickup address and send the request. In the chat, agree the stops, the hours, whose car and the price. The driver drives, waits between stops and brings your parent home, and you pay the provider directly, as you agreed.
      </p>

      <h2>Plan the day before you book</h2>
      <p>
        A driver is booked by the hour or by the job, so the plan is the booking. Write the day down the way your parent would actually live it, with rough times:
      </p>
      <ul>
        <li>
          <strong>The market first.</strong> The wet market is best early, before the heat and the crowd. Allow an hour; she knows her suki and will not be rushed.
        </li>
        <li>
          <strong>Church.</strong> Mass times are fixed, so build the rest of the day around them. The driver drops her at the door and waits, or comes back when Mass ends.
        </li>
        <li>
          <strong>The mall.</strong> The bank, the bills counter, groceries and lunch, all under one roof. Malls have pickup bays, which makes the hand-off easy.
        </li>
        <li>
          <strong>Relatives.</strong> A visit to a sister or a godchild across town is often the real reason for the day. Put that address in the plan so the driver can work out the route.
        </li>
        <li>
          <strong>A checkup.</strong> If there is a clinic appointment, put it in first. Everything else moves around it.
        </li>
      </ul>
      <p>
        Then add it up. A day with the market at six, Mass at ten, the mall after lunch and a visit in the afternoon is about eight hours. As an example, a driver who charges ₱350 per hour comes to ₱2,800 for that day. Whether fuel, parking and tolls are included is written in the service description or agreed in the chat, so ask before you send the request, not at the end of the day. Read the description for whose car it is too: some drivers bring their own, others drive the family&apos;s car.
      </p>

      <h2>How to book the driver</h2>
      <Steps
        steps={[
          {
            icon: Search,
            title: "Find a Driver service near your parent",
            text: "Browse Driver services in your parent's city. Each service shows its price, its photos, its schedule and the area it covers, along with the provider's Verified badge and reviews.",
          },
          {
            icon: MapPin,
            title: "Save the pickup address",
            text: "Add your parent's home as a saved address with a label like \"Mama's house\". The app refuses an address outside the provider's area, so you know before you send that the driver covers it.",
          },
          {
            icon: CalendarCheck,
            title: "Pick a time and send the request",
            text: "Choose a start time from the service's schedule and send it. The driver accepts or declines. A request not answered within 24 hours, or by its start time, expires; accepted bookings have an Add to Calendar button.",
          },
        ]}
      />
      <p>
        Start at the <Link href="/services/driver">Driver</Link> category, or go straight to a city, such as <Link href="/driver-in-quezon-city">drivers in Quezon City</Link> or <Link href="/driver-in-cebu-city">drivers in Cebu City</Link>. Book a few days ahead for a Sunday or a holiday, so the driver has time to plan the route and you have time to compare if the first request is declined.
      </p>

      <h2>Brief the driver in the chat</h2>
      <p>
        The chat is where the day gets agreed, and it stays as a record for both of you. Text and photos are enough; you do not need to swap phone numbers to sort it out. A good brief covers:
      </p>
      <ul>
        <li>
          <strong>The stops, in order.</strong> Addresses, landmarks and the times that cannot move, like Mass and the appointment.
        </li>
        <li>
          <strong>Who will be in the car.</strong> Your parent&apos;s name, how they like to be called, and whether anyone else is coming along. If you are booking from another city or from abroad, say so plainly; <Link href="/blog/booking-a-service-for-someone-else">booking a service for someone else</Link> covers the details.
        </li>
        <li>
          <strong>How your parent gets around.</strong> If she uses a cane, prefers the front seat or takes her time getting in and out, say it. If a folding wheelchair or walker goes in the trunk, say that too.
        </li>
        <li>
          <strong>Whose car, and the costs.</strong> Whether the driver brings a car or drives yours, and who pays for fuel, parking and tolls.
        </li>
        <li>
          <strong>How you want updates.</strong> A photo in the chat when she is dropped off at each stop is easy to ask for and easy to give.
        </li>
      </ul>
      <p>
        Many drivers set up FAQ chips in the chat that answer the usual questions instantly: what the hourly rate includes, how far they go, how payment works. Tap those first, then ask what is left.
      </p>

      <Callout title="The driver drives">
        A driver&apos;s service is the driving and the waiting. If your parent also needs someone to walk them through the clinic, stand in the queue and fill in the forms, book <Link href="/services/hospital-assistance">hospital assistance</Link> for that part of the day, and give both providers the same time and place.
      </Callout>


      <h2>On the day, and after</h2>
      <p>
        Check the booking the night before: the calendar entry has the time, and the chat has the plan. If anything changes, say so in the chat as early as you can. If the day is off, cancel the booking so the driver can take other work.
      </p>
      <p>
        At the end of the day, pay the driver directly, the amount and the way you agreed. Phriend takes no commission and never holds the money, so nothing is taken out of what the driver earns. Then rate the driver; a line about how they treated your parent is exactly what the next family wants to read. If the day went well, save the service so next month&apos;s day out is quick to book. Every driver has verified their identity with a government ID and a selfie, and report and block are in every profile and chat; <Link href="/blog/how-phriend-verifies-providers">how Phriend verifies providers</Link> explains the rest.
      </p>
      <p>
        Your parent does not need a day planned around her. She needs a car at the church door when Mass ends, a trunk for the groceries and someone who knows the way to Tita&apos;s house. That part you can book.
      </p>
    </>
  );
}
