import Link from "next/link";
import { CalendarCheck, MapPin, MessageSquare } from "lucide-react";
import { Callout, Steps } from "@/components/blog";
import { blogPhoto } from "./photo";
import type { Post } from "./index";

export const bookForSomeoneElse: Post = {
  slug: "booking-a-service-for-someone-else",
  title: "Booking a service for someone else: a parent, a partner, a friend or a tenant",
  description:
    "How to book cleaning, a repair, an errand or a driver for someone at a different address on Phriend: save their address, brief the provider in the chat and say who will be there.",
  seoTitle: "How to book a service for someone else",
  seoDescription: "Book a service for a parent, partner, friend or tenant at their address: save it, brief the provider in the chat, say who will be there.",
  ogTitle: "Book a service for someone else",
  date: "2026-10-23",
  readingMinutes: 5,
  audience: "client",
  category: { slug: "all", path: "/services", label: "all" },
  related: ["senior-care", "home-cleaning", "aircon-cleaning"],
  tags: ["Guides", "Family", "Booking", "Saved addresses"],
  hero: {
    src: blogPhoto("booking-a-service-for-someone-else"),
    alt: "A smiling young woman shakes hands with an older woman outside a building while a man beside her gestures as he introduces them",
  },
  faqTitle: "Questions people ask when booking for someone else",
  faq: [
    {
      q: "Can I book a service for an address that is not mine?",
      a: "Yes, any service on Phriend can be booked for a different address. Save the address with a label, pick it when you book, and say in the chat who will be there.",
    },
    {
      q: "How many addresses can I save?",
      a: "Up to 10, with one set as your default. Label each one clearly, like \"Mama's house\" or \"Condo unit 12B\", so you always pick the right one.",
    },
    {
      q: "Does the person I book for need the app?",
      a: "No, only you need an account, because you are the client. Give them the provider's name and the time, and keep the details in your chat with the provider.",
    },
    {
      q: "Who pays the provider?",
      a: "You agree that in the chat, and the booking stays yours either way. Settle it before the day, so the person at home is never surprised by a request to pay.",
    },
    {
      q: "What if the address is outside the provider's area?",
      a: "The app refuses it before the request goes out. Look for another provider of the same service who covers that city or barangay.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <p className="lead">
        Your mother&apos;s aircon is dripping in Davao and you are at work in Makati. Your partner&apos;s apartment needs a deep clean before their family visits. A friend is recovering at home and cannot get to the grocery. The tenant in your condo unit messages about a leaking faucet. Plenty of the services people book are for a home that is not theirs, and Phriend is built for that.
      </p>
      <p>
        You can book any service on Phriend for someone else at a different address. Save their address in the app with a clear label, like &quot;Mama&apos;s house&quot;, choose it when you book, and tell the provider in the chat who will be there, how to find the door and what the job is. You stay the client: you agree the price in the chat and pay the provider directly, as agreed.
      </p>

      <h2>Who people book for</h2>
      <ul>
        <li>
          <strong>Parents.</strong> Aircon cleaning, a plumber, a weekly clean, an errand run, <Link href="/services/senior-care">senior care help</Link> or a driver for a day out. Families in Manila book for parents in the province, and OFWs book from abroad; <Link href="/blog/booking-help-for-your-parents-from-abroad">booking help for your parents from abroad</Link> covers that case in detail.
        </li>
        <li>
          <strong>A partner or a sibling.</strong> Help with a move, laundry in a heavy work week, someone to set up a new laptop and the home Wi-Fi.
        </li>
        <li>
          <strong>A friend.</strong> Groceries and errands while they recover at home, a cleaner after they move in, a cake delivered on their birthday.
        </li>
        <li>
          <strong>A tenant or a unit you own.</strong> Repairs, <Link href="/services/aircon-cleaning">aircon cleaning</Link> and a clean between tenants, booked by the owner, with the tenant or the building admin letting the provider in.
        </li>
      </ul>
      <p>
        The service works the same whoever it is for. The price, the schedule, the photos and the area are the service&apos;s own, so you compare and choose exactly as you would for your own home. The only differences are the address you pick and the message you send.
      </p>

      <h2>How to book for another address</h2>
      <Steps
        steps={[
          {
            icon: MapPin,
            title: "Save their address",
            text: "In your saved addresses, add theirs with a label you will recognise. You can keep up to 10, with one default. The app refuses an address outside a provider's area, so you find out before the request goes out.",
          },
          {
            icon: CalendarCheck,
            title: "Pick the service, the time and the address",
            text: "Open the service, choose a time from its schedule and pick the saved address for this booking. Send the request; the provider accepts or declines, and a request not answered within 24 hours, or by its start time, expires.",
          },
          {
            icon: MessageSquare,
            title: "Say who will be there",
            text: "In the chat, give the name of the person at the address, the landmark, the gate or unit number, and what needs doing. Photos of the problem help the provider bring the right tools.",
          },
        ]}
      />
      <p>
        Some services happen online or at the provider&apos;s own place, so no address is needed. For those, say in the chat who will join the call or who will drop by, and when. Everything else works the same way: the booking, the chat and the review all sit in your account.
      </p>


      <h2>Brief the provider well</h2>
      <p>
        The provider only knows what you tell them, and you will not be there to explain at the gate. A short message in the chat saves a confused call later. Include:
      </p>
      <ul>
        <li>
          <strong>Who will open the door.</strong> Their name, how they prefer to be addressed, and whether they are most comfortable in Tagalog, Cebuano, Ilocano or English. Providers list their languages on their profile, so you can pick one who matches.
        </li>
        <li>
          <strong>How to find the place.</strong> A landmark, the gate colour, the unit number, the guard house rules and where to park.
        </li>
        <li>
          <strong>The job itself.</strong> What needs doing, photos of it, which rooms are off limits, and what &quot;done&quot; looks like.
        </li>
        <li>
          <strong>How you want to hear back.</strong> A photo in the chat when the provider arrives and another when the job is finished is easy to ask for.
        </li>
      </ul>
      <p>
        Providers can set up FAQ chips in the chat that answer the usual questions instantly: what is included, what to prepare, how payment works. Read those first; they often answer what the person at home would have asked.
      </p>

      <Callout title="Tell both sides">
        A booking for someone else only goes wrong when one side is surprised. Tell the person at home who is coming, when, and what they will do. Tell the provider who will open the door. Add the booking to your calendar with the Add to Calendar button, and send the person at home the time too, since the booking lives in your app, not theirs.
      </Callout>

      <h2>Paying and reviewing when you are not there</h2>
      <p>
        You agree the price, the hours and what is included in the chat, and you pay the provider directly, as agreed. Phriend does not process payments and never holds money, so settle how the payment will happen before the day, especially if you are in another city. The person at home should never be handed a bill they did not expect. <Link href="/blog/how-booking-and-payment-work-on-phriend">How booking and payment work on Phriend</Link> goes through the whole flow.
      </p>
      <p>
        After the job, ask the person at home how it went, then rate the provider; you can attach up to four photos, and the provider reviews you as a client too. If you will book the same provider for the same address again, save the service. Every provider has verified their identity with a government ID and a selfie, many add documents such as an NBI clearance for a badge, and report and block are in every profile and chat. <Link href="/blog/how-phriend-verifies-providers">How Phriend verifies providers</Link> explains each check.
      </p>
      <p>
        Being far away does not have to mean being unable to help. With the right address saved and a clear message in the chat, fixing the aircon at your parents&apos; house takes the same few minutes as fixing your own.
      </p>
    </>
  );
}
