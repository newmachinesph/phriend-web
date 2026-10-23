import Link from "next/link";
import { CalendarCheck, MessageCircle, Repeat, Search } from "lucide-react";
import { Callout, Figure, Steps } from "@/components/blog";
import { blogPhoto } from "./photo";
import type { Post } from "./index";

export const seniorCareHelp: Post = {
  slug: "what-senior-care-help-covers",
  title: "What senior care help covers, and what it does not, while the family is at work",
  description:
    "Senior care help on Phriend is non-medical practical help for an older parent at home: errands, simple meals, light housework, getting to appointments and help with the phone. Here is what to expect and how to book it.",
  seoTitle: "What senior care help covers (and what it does not)",
  seoDescription: "Errands, simple meals, light housework, appointments and tech help for an older parent: what non-medical senior care help includes.",
  ogTitle: "What senior care help covers",
  date: "2026-10-23",
  readingMinutes: 5,
  audience: "client",
  category: { slug: "senior-care", path: "/services/senior-care", label: "Senior Care Help" },
  related: ["hospital-assistance", "errand", "cooking"],
  tags: ["Guides", "Senior Care Help", "Senior parents", "Working families"],
  hero: {
    src: blogPhoto("what-senior-care-help-covers"),
    alt: "An older woman talks with her hands while a younger woman listens across a cafe table with coffee and a basket of bread rolls, jeepneys passing outside the window",
  },
  faqTitle: "Questions families ask",
  faq: [
    {
      q: "What is senior care help?",
      a: "Senior care help is non-medical, practical help for an older person at home or out on errands. It covers things like groceries and bills, simple meals, light housework, getting to appointments and help with a phone or tablet.",
    },
    {
      q: "Does senior care help include nursing or medicine?",
      a: "No, senior care help on Phriend does not include nursing, medical care or handling medicine. If your parent needs those, arrange them with licensed health professionals through their doctor.",
    },
    {
      q: "Can I book senior care help for a parent who lives in another city?",
      a: "Yes, you can book a service for someone else at their address. Save the address with a label like \"Mama's house\", book a service whose area covers it, and say in the chat who will be at home.",
    },
    {
      q: "How much does senior care help cost?",
      a: "Each provider sets their own price per hour, per job or per session, and shows it on the service. You agree the hours and what is included in the chat and pay the provider directly; Phriend takes no commission.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <p className="lead">
        Your father still insists on going to the palengke himself. Your mother can cook, but standing at the stove for an hour is harder than it used to be. And you are in the office from eight to six, or across the country, or across an ocean. Most families do not need a nurse. They need a capable person for a few hours who can carry the groceries, wipe down the kitchen and make sure the TV remote and the phone both work.
      </p>

      <p>
        That is what senior care help on Phriend covers: non-medical, practical help for an older parent, booked by the hour, the job or the session. A provider can run errands with or for your parent, prepare simple meals, do light housework, go with them to appointments and help with a phone or tablet. It does not include nursing, medical care or handling medicine.
      </p>

      <h2>What a senior care help service covers</h2>
      <p>
        Every provider describes exactly what their service includes, and you agree the details in the chat. These are the jobs families usually book:
      </p>
      <ul>
        <li>
          <strong>Errands.</strong> The market, the grocery, paying bills, collecting documents, picking up a parcel. Your parent can go along, or hand over a list and rest at home. For errands alone, <Link href="/services/errand">errand services</Link> may be the better fit.
        </li>
        <li>
          <strong>Simple meals.</strong> Cooking lunch from what is in the kitchen, or preparing a few days of ulam to reheat. Tell the provider in the chat what your parent likes and anything the doctor told the family to avoid.
        </li>
        <li>
          <strong>Light housework.</strong> Washing the dishes, sweeping, tidying, changing the bedsheets, folding laundry. For a full deep clean, book <Link href="/services/home-cleaning">home cleaning</Link> as its own service.
        </li>
        <li>
          <strong>Getting to appointments.</strong> Going with your parent to the doctor, the bank, the barangay hall or the SSS office, and waiting with them. For hospital visits there is a dedicated category; our guide to <Link href="/blog/hospital-assistance-for-a-checkup">hospital assistance for a checkup</Link> explains it.
        </li>
        <li>
          <strong>Tech help.</strong> Charging and updating the phone, setting up video calls with the grandchildren, sorting out the Wi-Fi or the remote.
        </li>
      </ul>

      <Figure
        src={blogPhoto("senior-care-help-outdoors")}
        alt="An older man and a young man laugh together on a wooden park bench under shade trees"
        caption="Errands on foot go at your parent's pace, with a rest in the shade on the way back from the market."
      />

      <h2>What senior care help is not</h2>
      <p>
        Being plain about the limits keeps everyone comfortable. A senior care help provider on Phriend is not booked to:
      </p>
      <ul>
        <li>
          <strong>Give nursing or medical care,</strong> including wound care, injections, checking vital signs or lifting someone who needs trained staff.
        </li>
        <li>
          <strong>Handle medicine,</strong> whether giving it, measuring it or deciding anything about it.
        </li>
        <li>
          <strong>Diagnose or advise</strong> on health questions. Those go to your parent&apos;s doctor.
        </li>
      </ul>
      <p>
        If your parent needs any of these, arrange them with licensed health professionals through their doctor. Senior care help can sit alongside that, taking the errands and the housework off everyone&apos;s plate.
      </p>

      <h2>A week of help while the family works</h2>
      <p>
        Most families start with one short booking and build from there. A typical rhythm for a parent who lives alone might look like this:
      </p>
      <ul>
        <li>
          <strong>Monday morning:</strong> market and groceries together, then lunch cooked for two days.
        </li>
        <li>
          <strong>Wednesday afternoon:</strong> light housework, the laundry folded, the phone charged and a video call with you set up for 7:00 in the evening.
        </li>
        <li>
          <strong>Friday:</strong> the checkup, booked as hospital assistance, with notes sent to you in the chat afterwards.
        </li>
      </ul>
      <p>
        Prices are set by each provider. For example, a provider who charges ₱250 per hour for a four-hour morning comes to ₱1,000; another might price a half day as one session. You agree the hours and what is included in the chat and pay the provider directly. Phriend takes no commission and never holds the money.
      </p>

      <h2>How to book it</h2>
      <Steps
        steps={[
          {
            icon: Search,
            title: "Find a service that covers the address",
            text: "Browse Senior Care Help and open a few services. Check the price, what is included, the area and the reviews. For an at-home service the app only accepts an address inside the provider's area.",
          },
          {
            icon: MessageCircle,
            title: "Ask your questions in the chat",
            text: "Tap the provider's FAQ answers first, then ask what is left: what they cook, how they handle errands with money, how long they stay. Agree the price and the hours.",
          },
          {
            icon: CalendarCheck,
            title: "Send a short first booking",
            text: "Pick a slot from the service's schedule and your parent's saved address. The provider accepts or declines; an unanswered request expires after 24 hours or at its start time.",
          },
          {
            icon: Repeat,
            title: "Rate it and book again",
            text: "After the booking, rate the provider and add up to four photos. Save the service if it went well, so the next booking is quick.",
          },
        ]}
      />

      <Callout title="Start with one morning">
        A first booking of three or four hours lets your parent get used to a new face without a whole day of it. Ask the provider to send a short note in the chat at the end: what was done, what is running low in the kitchen, anything your parent mentioned. After a few bookings the routine settles, and you know who is coming.
      </Callout>

      <h2>Who you are booking</h2>
      <p>
        Every provider on Phriend has verified their identity with a government ID and a selfie, and a person on the Phriend team reviews each service before it goes live. Providers can add documents such as an NBI clearance or certificates, each of which earns a badge once approved, and reviews come from clients after completed bookings. Report and block are on every profile and chat; <Link href="/safety">our safety page</Link> explains how it works.
      </p>
      <p>
        Before you send the first request, read our list of <Link href="/blog/questions-to-ask-before-booking-senior-care-help">questions to ask before booking senior care help</Link>. And if you are booking from overseas, <Link href="/blog/booking-help-for-your-parents-from-abroad">our guide for families abroad</Link> covers the rest of the house, from aircon to repairs.
      </p>
    </>
  );
}
