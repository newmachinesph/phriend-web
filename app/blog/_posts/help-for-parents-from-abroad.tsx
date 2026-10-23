import Link from "next/link";
import { CalendarCheck, House, MessageCircle, Search } from "lucide-react";
import { Callout, Steps } from "@/components/blog";
import { blogPhoto } from "./photo";
import type { Post } from "./index";

export const helpForParentsFromAbroad: Post = {
  slug: "booking-help-for-your-parents-from-abroad",
  title: "Working abroad? How to book practical help for your parents back home",
  description:
    "A guide for OFWs and children living far away: how to book errands, cleaning, aircon cleaning, repairs, hospital assistance, senior care help and tech help for your parents' house in the Philippines.",
  seoTitle: "Book help for your parents from abroad",
  seoDescription: "OFWs and children far from home can book errands, cleaning, repairs, hospital assistance and senior care help for parents in the Philippines.",
  ogTitle: "Help for your parents, booked from abroad",
  date: "2026-10-23",
  readingMinutes: 5,
  audience: "client",
  category: { slug: "senior-care", path: "/services/senior-care", label: "Senior Care Help" },
  related: ["errand", "aircon-cleaning", "home-cleaning", "hospital-assistance", "tech-help"],
  tags: ["Guides", "OFW families", "Senior Care Help", "Booking for family"],
  hero: {
    src: blogPhoto("booking-help-for-your-parents-from-abroad"),
    alt: "An older woman in a floral blouse walks through a bright mall beside a laughing younger woman with a tote bag on her shoulder",
  },
  faqTitle: "Questions OFW families ask",
  faq: [
    {
      q: "Can I book a service for my parents while I am outside the Philippines?",
      a: "Yes, you can book from anywhere with an internet connection. Save your parents' address in your account, pick a service and a time, and tell the provider in the chat who will be at home.",
    },
    {
      q: "How does the provider get paid if I am abroad?",
      a: "You and the provider agree how payment works in the chat, and the provider is paid directly. Phriend takes no commission and never holds the money, so some families leave cash with a parent and others send the amount themselves, whichever the two of you agreed.",
    },
    {
      q: "Do my parents need the app?",
      a: "No, only the person booking needs an account. You handle the request and the chat; your parents only need to know who is coming and when.",
    },
    {
      q: "Is senior care help the same as a nurse?",
      a: "No, senior care help on Phriend is non-medical practical help. It covers errands, simple meals, light housework, getting to appointments and help with a phone, not nursing, medicine or medical advice.",
    },
    {
      q: "What if a provider is not in my parents' area?",
      a: "The app will not let you book an at-home service for an address outside the provider's area. Look for another provider whose service covers your parents' city; the service card shows its area before you book.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <p className="lead">
        You call every Sunday. Mama says she is fine, Papa says the aircon is &ldquo;okay lang&rdquo;, and you find out three weeks later that the bills were paid late because nobody could line up at the payment center. When you work in Dubai, Singapore or Toronto, the hard part is not the money. It is the small jobs at home that need someone to show up.
      </p>

      <p>
        Here is the short answer: you can book practical help for your parents&apos; house in the Philippines from wherever you are. On Phriend you save their address, choose a service such as errands, home cleaning, aircon cleaning, repairs, hospital assistance, senior care help or tech help, pick a time from that service&apos;s schedule, and explain in the chat who will be at home. The provider does the job at your parents&apos; place and is paid directly, the way you agreed in the chat.
      </p>

      <h2>What you can book for them</h2>
      <p>
        Every listing on Phriend is a service with its own price, photos, schedule and area, offered by a provider who has verified their identity. For parents living on their own, these are the ones families use most:
      </p>
      <ul>
        <li>
          <strong>Errands.</strong> Paying bills, picking up groceries from a list, a pasabuy from the market, dropping off documents, or holding a place in a long queue. See <Link href="/services/errand">errand services</Link>.
        </li>
        <li>
          <strong>Home cleaning and laundry.</strong> A proper clean of the kitchen and bathroom, or a load of laundry washed and ironed, so your parents are not on a ladder or bent over a batya.
        </li>
        <li>
          <strong>Aircon cleaning and repairs.</strong> A tired aircon, a leaking faucet, a light that keeps flickering. <Link href="/services/aircon-cleaning">Aircon cleaning</Link>, plumbing, electrical and handyman services are all listed on their own.
        </li>
        <li>
          <strong>Hospital assistance.</strong> Someone to go with your parent to a checkup, handle the queues and forms, carry the bags and send you notes afterwards. Our guide to <Link href="/blog/hospital-assistance-for-a-checkup">hospital assistance for a checkup</Link> walks through a full day.
        </li>
        <li>
          <strong>Senior care help.</strong> Non-medical help around the house for a few hours: errands, simple meals, light housework and a hand with the phone. Read <Link href="/blog/what-senior-care-help-covers">what senior care help covers</Link> before you book.
        </li>
        <li>
          <strong>Tech help.</strong> Setting up a new phone, fixing the Wi-Fi, or teaching Papa how to answer a video call without turning the camera to the ceiling.
        </li>
      </ul>
      <p>
        You can browse all of these on the <Link href="/services/care">care services page</Link> and the other category pages without an account. Browsing is free.
      </p>

      <h2>How to book from abroad</h2>
      <Steps
        steps={[
          {
            icon: House,
            title: "Save your parents' address",
            text: "In your account, add their address with a label you will recognise, like \"Mama's house\". You can keep up to 10 saved addresses, so a parent in Batangas and an aunt in Cavite each get their own.",
          },
          {
            icon: Search,
            title: "Pick a service and a time",
            text: "Open a service, check its price, photos and area, then choose a slot from its schedule and the saved address. The app refuses an address outside the provider's area, so you will not book someone who cannot reach the house.",
          },
          {
            icon: MessageCircle,
            title: "Brief the provider in the chat",
            text: "Say who will open the gate, what needs doing and anything the house needs them to know. Agree the price, the hours, what is included and how payment will work.",
          },
          {
            icon: CalendarCheck,
            title: "Wait for the provider to accept",
            text: "The provider accepts or declines. A request that is not answered within 24 hours, or by its start time, expires. Once it is accepted, tap Add to Calendar so the booking sits next to your own shifts.",
          },
        ]}
      />
      <p>
        Time zones are the easy mistake. Check that the slot you pick is the hour you mean at your parents&apos; house, not in the city where you work, and choose a time when you are awake to answer a message if the provider has a question.
      </p>


      <h2>Briefing a provider you cannot meet first</h2>
      <p>
        When you cannot be there, the chat does the work. The provider sees your messages and photos, and you can attach a photo of the leaking pipe, the grocery list in Mama&apos;s handwriting or the clinic appointment slip. Providers can also set up FAQ answers that reply instantly, so questions about what is included or how they like to be paid are answered before you even type.
      </p>
      <ul>
        <li>
          <strong>Who will be there.</strong> Your parent&apos;s name, whether a helper or a sibling might answer the door instead, and how they prefer to be addressed.
        </li>
        <li>
          <strong>What done looks like.</strong> &ldquo;Aircon in the master bedroom only&rdquo; or &ldquo;groceries from this list, receipt photographed&rdquo; is easier to deliver than &ldquo;help my mother&rdquo;.
        </li>
        <li>
          <strong>How you want to hear back.</strong> A photo when the job is finished, or a short note in the chat after a checkup. You never need to share your phone number for this.
        </li>
      </ul>

      <Callout title="Tell your parents before the first booking">
        Call home before the day and give your parents the provider&apos;s name, the service and the time. A visitor they were expecting is a help; a stranger they were not told about is a worry. After two or three bookings with the same provider, it becomes routine.
      </Callout>

      <h2>Checking who you are booking</h2>
      <p>
        Every provider on Phriend has verified their identity with a government ID and a selfie, and a person on the Phriend team reviews each service before it goes live. Providers can add documents such as an NBI clearance or certificates, and each one that is approved earns a badge on their profile. Reviews come from clients who completed a booking, sometimes with photos. Our page on <Link href="/safety">how Phriend handles safety</Link> explains the checks, and report and block are on every profile and chat.
      </p>
      <p>
        For senior care help in particular, it is worth a few questions in the chat before you send the request. We collected the useful ones in <Link href="/blog/questions-to-ask-before-booking-senior-care-help">questions to ask before booking senior care help</Link>.
      </p>

      <h2>Make it a routine, not a rescue</h2>
      <p>
        The families who get the most out of this do not wait for the aircon to die. They book aircon cleaning before summer, an errand run on the day pensions and bills fall due, and senior care help on the weekdays when the house is quiet. Save the services that worked so they are easy to find and book again, and after each booking leave a rating so the next OFW family knows who showed up.
      </p>
      <p>
        You cannot be home for every small job. You can make sure someone is.
      </p>
    </>
  );
}
