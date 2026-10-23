import Link from "next/link";
import { BadgeCheck, MessageCircle, MessagesSquare, Send } from "lucide-react";
import { Callout, Figure, Steps } from "@/components/blog";
import { blogPhoto } from "./photo";
import type { Post } from "./index";

export const seniorCareQuestions: Post = {
  slug: "questions-to-ask-before-booking-senior-care-help",
  title: "Questions to ask in the chat before you book senior care help for a parent",
  description:
    "What to check on the service, which FAQ answers to tap, and the questions worth asking a senior care help provider in the chat before you send a booking request for your mother or father.",
  seoTitle: "Questions to ask before booking senior care help",
  seoDescription: "What to check on the listing, which FAQ answers to tap and what to ask in the chat before booking senior care help for a parent.",
  ogTitle: "Ask these before you book senior care help",
  date: "2026-10-23",
  readingMinutes: 5,
  audience: "client",
  category: { slug: "senior-care", path: "/services/senior-care", label: "Senior Care Help" },
  related: ["hospital-assistance"],
  tags: ["Guides", "Senior Care Help", "Senior parents", "Before you book"],
  hero: {
    src: blogPhoto("questions-to-ask-before-booking-senior-care-help"),
    alt: "A younger woman shows an older woman something on a phone as they sit side by side on a living room sofa",
  },
  faqTitle: "Questions families ask",
  faq: [
    {
      q: "What should I ask before booking senior care help?",
      a: "Ask what the service includes, how long the provider stays, what they will and will not do, how they handle money for errands, and how they will report back to you. Agree the price and the hours in the chat so both of you have them in writing.",
    },
    {
      q: "What are the FAQ answers in the chat?",
      a: "They are quick answers a provider sets up in advance, up to eight, that reply instantly when you tap them. Tap them first; they often cover price, inclusions and payment before you type anything.",
    },
    {
      q: "How do I know the provider is who they say they are?",
      a: "Every provider on Phriend has verified their identity with a government ID and a selfie. Approved documents such as an NBI clearance show as badges on their profile, and reviews come from clients who completed a booking.",
    },
    {
      q: "Do I need to share my phone number?",
      a: "No, the in-app chat handles messages and photos, so you can ask everything and agree the details without exchanging numbers.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <p className="lead">
        Booking help for your own mother or father is not like booking an aircon cleaning. You are choosing who will be in the kitchen with her, or walking beside him in the market. A few good questions in the chat, asked before you send the request, turn a stranger&apos;s profile into someone you have a clear agreement with.
      </p>

      <p>
        The short version: before you book senior care help, ask what the service includes and leaves out, how long the provider stays, how they handle money for errands, what they need to know about your parent, and how they will report back to you. Read the service and the reviews first, tap the provider&apos;s FAQ answers, then ask the rest in the chat and agree the price and hours in writing.
      </p>

      <h2>Read the service before you message</h2>
      <p>
        Half your questions are answered on the service itself. On Phriend each service shows its price (per hour, per job or per session), up to six photos, its schedule, its area and how it is delivered. The provider&apos;s profile shows a face photo, their languages and an About section. Look for:
      </p>
      <ul>
        <li>
          <strong>The Verified badge.</strong> Every provider has checked their identity with a government ID and a selfie before they can list.
        </li>
        <li>
          <strong>Document badges.</strong> An NBI clearance, certificates or licences earn a badge each once the Phriend team approves them. They are optional, so a badge tells you the provider went a step further.
        </li>
        <li>
          <strong>Reviews.</strong> Ratings come from clients after completed bookings, some with photos. Read what people say about punctuality and how the provider communicates, not only the stars.
        </li>
        <li>
          <strong>The area and the schedule.</strong> If your parent&apos;s address is outside the service&apos;s area, the app will not accept the booking, so check this first.
        </li>
      </ul>
      <p>
        If you are not sure what senior care help usually covers, read <Link href="/blog/what-senior-care-help-covers">what senior care help covers</Link> first. It is non-medical help: errands, simple meals, light housework, appointments and tech help, not nursing or medicine.
      </p>

      <h2>Questions worth asking in the chat</h2>
      <p>
        Providers can set up FAQ answers, up to eight, that reply instantly when you tap them. Start there. Then ask what is left, grouped roughly like this:
      </p>
      <ul>
        <li>
          <strong>About the work.</strong> What exactly is included in the price? Do you cook, and what kinds of dishes? Is laundry part of light housework, or extra? Is there anything you do not do?
        </li>
        <li>
          <strong>About the day.</strong> How many hours is a session? What happens if a checkup or errand runs past the booked time? Do you arrive by commute, and is the fare included?
        </li>
        <li>
          <strong>About money for errands.</strong> If you buy groceries or pay bills for my parent, how do you handle the cash and the receipts? A photo of each receipt in the chat is a simple habit to agree on.
        </li>
        <li>
          <strong>About your parent.</strong> Tell the provider how your parent gets around, what language they are most comfortable in, what they like to eat, and any habits worth knowing. Then ask: have you worked with someone in a similar situation?
        </li>
        <li>
          <strong>About reporting back.</strong> Can you send a short note in the chat at the end of each booking, with a photo of anything that needs attention?
        </li>
        <li>
          <strong>About payment.</strong> How would you like to be paid, and when? The client pays the provider directly, as agreed; Phriend takes no commission and never holds the money.
        </li>
      </ul>

      <Figure
        src={blogPhoto("hospital-paperwork")}
        alt="Two women talk in the seats of a hospital corridor, a folder of papers and a bottle of water on the small table between them"
        caption="The best bookings start with a clear brief: where, how long, what is included and how the provider reports back."
      />

      <h2>From questions to a booking</h2>
      <Steps
        steps={[
          {
            icon: BadgeCheck,
            title: "Check the service and the badges",
            text: "Price, photos, schedule, area and how it is delivered, plus the Verified badge, any document badges and the reviews.",
          },
          {
            icon: MessagesSquare,
            title: "Tap the FAQ answers",
            text: "The provider's quick answers reply instantly. They usually cover what is included, how to pay and where the provider works.",
          },
          {
            icon: MessageCircle,
            title: "Ask the rest and agree the details",
            text: "Price, hours, what is included and how they report back, written in the chat so both of you have the record.",
          },
          {
            icon: Send,
            title: "Send the request",
            text: "Pick a slot from the service's schedule and your parent's saved address. The provider accepts or declines, and an unanswered request expires after 24 hours or at its start time.",
          },
        ]}
      />

      <Callout title="When a service is not the right fit">
        Senior care help is non-medical. If a provider offers nursing or to manage your parent&apos;s medicine, or cannot say what the price includes, it is not the service you are looking for: choose another one. If something in a chat is not right, report and block are on every profile and chat.
      </Callout>

      <h2>After the first booking</h2>
      <p>
        The first booking answers the questions a chat cannot: whether your parent was comfortable, whether the provider was on time, and whether the note at the end told you what you needed. Ask your parent how it went. If it went well, save the service so you can book it again, and leave a rating with up to four photos so other families can see it. Providers review clients too, so a clear brief and an on-time payment build your side of the record.
      </p>
      <p>
        Once a provider works out, ask in the chat which days they usually keep free and book those regularly. Your parent sees the same face each week, the provider learns where the rice and the receipts are kept, and your briefs get shorter. If the provider sets time off, you will see it on the schedule before you send the next request.
      </p>
      <p>
        If your parent also has checkups coming up, our guide to <Link href="/blog/hospital-assistance-for-a-checkup">hospital assistance for a checkup</Link> covers what to ask for a hospital day. Booking from overseas? Start with <Link href="/blog/booking-help-for-your-parents-from-abroad">booking help for your parents from abroad</Link>. And <Link href="/safety">our safety page</Link> explains how verification, badges, reviews and reports work together.
      </p>
    </>
  );
}
