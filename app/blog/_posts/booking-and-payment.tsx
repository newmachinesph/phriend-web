import Link from "next/link";
import { CalendarClock, MapPin, MessageCircle, Search } from "lucide-react";
import { Callout, Steps } from "@/components/blog";
import { blogPhoto } from "./photo";
import type { Post } from "./index";

export const bookingAndPayment: Post = {
  slug: "how-booking-and-payment-work-on-phriend",
  title: "How booking and payment work on Phriend, from your first message to paying the provider",
  description:
    "A plain guide to booking a service on Phriend: picking a time, sending a request, agreeing the details in the chat, and paying the provider directly, as agreed.",
  seoTitle: "How booking and payment work on Phriend",
  seoDescription: "Pick a service and a time, agree the details in the chat and pay the provider directly. Phriend takes no commission and never holds your money.",
  ogTitle: "How booking and paying work on Phriend",
  date: "2026-10-23",
  readingMinutes: 5,
  audience: "client",
  category: { slug: "all", path: "/services", label: "all" },
  tags: ["Guides", "Booking", "Payments", "How it works"],
  hero: {
    src: blogPhoto("how-booking-and-payment-work-on-phriend"),
    alt: "Two women at a cafe table by the window laugh as one shows the other something on her phone, with iced coffee and a slice of cake between them",
  },
  faqTitle: "Questions about booking and paying",
  faq: [
    {
      q: "Do I pay Phriend when I book a service?",
      a: "No, you pay the provider, not Phriend. Phriend does not process payments and takes no commission: the price and how you pay are agreed in the chat, and you pay the provider directly, as agreed.",
    },
    {
      q: "How long does a provider have to answer my request?",
      a: "A provider has up to 24 hours, or until the booking's start time if that comes first. A request that is not answered by then expires, and you can send one to another service straight away.",
    },
    {
      q: "Can I book a service for someone at a different address?",
      a: "Yes. Save their address with a label such as \"Mama's house\", choose it when you book, and say in the chat who will be there to meet the provider.",
    },
    {
      q: "Can I cancel a booking?",
      a: "Yes, you can cancel a booking from the app. Send the provider a short message in the chat as well, so they know the time is free again.",
    },
    {
      q: "Does it cost anything to use Phriend as a client?",
      a: "No. Browsing services, chatting with providers and sending booking requests are free; the only thing you pay for is the service itself, directly to the provider.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <p className="lead">
        You found a cleaner whose photos look right, or a tutor whose schedule fits your child&apos;s afternoons. Now what? Who do you pay, when, and what happens if the provider never answers? This guide walks through a booking on Phriend from the first tap to the last peso, so nothing about it is a surprise.
      </p>

      <p>
        The short answer: on Phriend you pick a service, pick a time from that service&apos;s schedule, choose where it happens and send a request. The provider accepts or declines. The price, the hours and what is included are agreed in the in-app chat, and you pay the provider directly, as agreed. Phriend takes no commission, does not process payments and never holds your money.
      </p>

      <h2>From search to a confirmed booking</h2>
      <p>
        Everything starts with a service, not a person. Each service on Phriend has its own price (per job, per hour or per session), its own photos, its own schedule and the area it covers. You can browse <Link href="/services">every category</Link> on the web at web.phriend.app in any browser, or in the Android app; an iOS app is coming.
      </p>
      <Steps
        steps={[
          {
            icon: Search,
            title: "Choose a service",
            text: "Compare services by price, photos, area and reviews. Save the ones you like so you can come back to them later.",
          },
          {
            icon: CalendarClock,
            title: "Pick a time",
            text: "Choose a slot from that service's schedule. You only see times the provider has opened for that service.",
          },
          {
            icon: MapPin,
            title: "Choose where",
            text: "For a service at your place, pick one of your saved addresses. Some services are online, and some happen at the provider's place.",
          },
          {
            icon: MessageCircle,
            title: "Send the request",
            text: "The provider accepts or declines. Once accepted, the booking gets an Add to Calendar button so it lands in your own calendar.",
          },
        ]}
      />
      <p>
        A request that is not answered within 24 hours, or by its start time if that is sooner, expires on its own. You are never left waiting on a booking that will not happen: if it expires or the provider declines, send the request to another service.
      </p>

      <h2>Where the service happens</h2>
      <p>
        Every service says how it is delivered: at your place, at the provider&apos;s place, or online. For services at your place, such as <Link href="/services/home-cleaning">home cleaning</Link> or aircon cleaning, you choose from your saved addresses. You can keep up to 10, with one set as your default, and give each one a label like &ldquo;Condo&rdquo; or &ldquo;Office&rdquo;. If an address is outside the area a provider covers, the app will not accept it for that service, so nobody travels to the wrong side of the city.
      </p>
      <p>
        The address does not have to be yours. You can book for a parent, a partner or a tenant: save that address with a label such as &ldquo;Mama&apos;s house&rdquo;, choose it when you book, and say in the chat who will be there. We cover this in more detail in <Link href="/blog/booking-a-service-for-someone-else">booking a service for someone else</Link>.
      </p>


      <h2>Agree the details in the chat</h2>
      <p>
        The chat is where a booking becomes specific. It carries text and photos, so you can send a picture of the sink that leaks or the room that needs cleaning. Providers can set up FAQ chips, up to eight quick questions that answer instantly, such as what is included or what to prepare. You never need to share your phone number.
      </p>
      <p>Before the day, make sure the chat answers these:</p>
      <ul>
        <li>
          <strong>The price.</strong> Per job, per hour or per session, and the total you expect. A cleaner who charges ₱450 per hour for four hours comes to ₱1,800.
        </li>
        <li>
          <strong>The hours.</strong> When the provider arrives and how long the job should take.
        </li>
        <li>
          <strong>What is included.</strong> Materials, travel, extra rooms, a second visit. If it matters to you, write it down.
        </li>
        <li>
          <strong>How you will pay.</strong> Cash on the day, a bank transfer or an e-wallet, before or after the job: whatever the two of you agree.
        </li>
      </ul>

      <h2>Paying the provider directly</h2>
      <p>
        Phriend does not sit between you and the provider&apos;s money. There is no checkout, no card form and no payout delay. You pay the provider directly, in the amount and the way you agreed in the chat, and the provider keeps all of it. That is why prices on Phriend can stay close to what the work is worth: there is no platform cut to cover.
      </p>
      <Callout title="The chat is your record">
        Because Phriend never holds the money, the agreement in the chat is what both of you go back to. Write the price, the hours and what is included there, not in a call, so neither side has to remember it later.
      </Callout>

      <h2>If plans change</h2>
      <p>
        Plans change on both sides, and the app handles each case plainly:
      </p>
      <ul>
        <li>
          <strong>The provider declines.</strong> The time was taken, or the job is outside what they do. Send the same request to another service; your saved address and your notes are still there.
        </li>
        <li>
          <strong>Nobody answers.</strong> The request expires after 24 hours, or at its start time if that is sooner, so it never sits open while you wait.
        </li>
        <li>
          <strong>You need to cancel.</strong> Cancel the booking in the app and send the provider a line in the chat, so they can offer the time to someone else.
        </li>
        <li>
          <strong>The details move.</strong> A later start or an extra room is agreed in the chat first, the same way the original booking was.
        </li>
      </ul>

      <h2>After the job</h2>
      <p>
        When a booking is completed, you can rate the provider and attach up to four photos of the result, which helps the next client decide. Providers review clients too, so a clear brief and an on-time payment count in your favour. Services you liked can be saved and booked again in a few taps.
      </p>
      <p>
        If something goes wrong, report and block are in every profile and every chat. Every provider has verified their identity before their services go live; <Link href="/blog/how-phriend-verifies-providers">how Phriend verifies providers</Link> explains what each badge means, and the <Link href="/safety">safety page</Link> covers what happens when you report someone.
      </p>
      <p>
        That is the whole flow: a service, a time, a place, a request, a conversation and a direct payment. Nothing is charged to you by Phriend at any point, and nothing is confirmed until the provider accepts.
      </p>
    </>
  );
}
