import Link from "next/link";
import { CalendarCheck, ListChecks, Receipt } from "lucide-react";
import { Callout, Steps } from "@/components/blog";
import { blogPhoto } from "./photo";
import type { Post } from "./index";

export const errands: Post = {
  slug: "errands-you-can-book-on-phriend",
  title: "Errands you can book on Phriend: bills, documents, queues, groceries, personal shopping and pasabuy",
  description:
    "The errands people hand over on Phriend, from paying bills and lining up for documents to groceries, personal shopping and pasabuy, and how to book one.",
  seoTitle: "Errands you can book on Phriend",
  seoDescription: "Bills, document queues, groceries, personal shopping and pasabuy: what errand providers do, how they price and how to book one.",
  ogTitle: "Hand over the errands that eat your day",
  date: "2026-10-23",
  readingMinutes: 5,
  audience: "client",
  category: { slug: "errand", path: "/services/errand", label: "Errand" },
  related: ["courier"],
  tags: ["Guides", "Errands", "Pasabuy", "Personal shopping"],
  hero: {
    src: blogPhoto("errands-you-can-book-on-phriend"),
    alt: "Two young women in a sunlit clothing store hold a patterned short-sleeved blouse up to a standing mirror",
  },
  faqTitle: "Questions people ask about errands",
  faq: [
    {
      q: "What counts as an errand on Phriend?",
      a: "Any practical task someone can do for you outside the house: paying bills, lining up for documents, groceries, personal shopping, pickups and returns. Each provider lists what their Errand service covers, and you confirm the details in the chat.",
    },
    {
      q: "Can an errand provider get documents for me?",
      a: "Often yes, at offices that release documents to a representative with an authorization letter and IDs. Check the office's rules first, then say in the chat exactly what the provider needs to bring.",
    },
    {
      q: "How do I pay for the things they buy?",
      a: "You agree it in the chat before the errand: send the shopping money ahead, or repay against receipt photos. The provider's own fee is paid directly to them, as agreed; Phriend never handles the money.",
    },
    {
      q: "What is the difference between Errand and Courier & Pasabuy?",
      a: "Errand providers do tasks such as paying, queuing and shopping, while Courier & Pasabuy providers mostly pick up and deliver items. Plenty of jobs fit either, so read the service description and ask in the chat.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <p className="lead">
        Some errands take ten minutes of doing and four hours of getting there, waiting and getting back. Paying a bill at the counter, picking up a released document, lining up for an appointment slot, buying the exact brand of milk Lola insists on. None of it needs you in person. It needs someone reliable who does it the way you asked and sends you a photo of the receipt.
      </p>
      <p>
        On Phriend you can book an errand provider to pay bills, line up for documents and appointments, do the groceries, shop for something specific, or pick up and drop off items. Each Errand service shows its price, per job or per hour, and the area it covers. You agree the details and the shopping budget in the chat, and you pay the provider directly, as agreed.
      </p>

      <h2>What people book errand providers for</h2>
      <ul>
        <li>
          <strong>Bills and payments.</strong> Electricity, water, internet, association dues, tuition: paid over the counter, with the receipt photographed and sent in the chat.
        </li>
        <li>
          <strong>Documents and queues.</strong> A barangay clearance, a document ready for release at the city hall, a place held in a long line. Some offices only deal with the person themselves, or with a representative carrying an authorization letter and IDs, so check the rules and say in the chat what to bring.
        </li>
        <li>
          <strong>Groceries and the market.</strong> A weekly list from the supermarket or the palengke, with brands, sizes and what to buy instead if something is out.
        </li>
        <li>
          <strong>Pickups and returns.</strong> A repaired phone, a parcel to send back, a cake ordered for Sunday, a document to drop off at an office.
        </li>
        <li>
          <strong>Household runs.</strong> The hardware store for the right faucet part, printing and photocopies, a refill of the water jugs.
        </li>
      </ul>


      <h2>Personal shopping and pasabuy</h2>
      <p>
        Personal shopping is an errand with taste involved. The provider goes to the mall or the store, sends photos of the options in the chat, and buys what you pick: a blouse in the right size for your mother&apos;s birthday, a school uniform, a gift for a ninong, a replacement for the rice cooker that finally gave up. Agree the store, the budget and how many photos you want to see before they go, and whether they should wait for your reply or use their judgement.
      </p>
      <p>
        Pasabuy is the version everyone already knows: asking someone who is going somewhere to buy for you. Pasalubong from a province, the ensaymada that one bakery branch sells, a find from a weekend bazaar. On Phriend it is booked like any other service. Errand providers cover the buying; <Link href="/services/courier">Courier &amp; Pasabuy</Link> providers focus on picking up and delivering items across the city, so look there when the job is mostly the trip.
      </p>

      <h2>How to book an errand</h2>
      <Steps
        steps={[
          {
            icon: ListChecks,
            title: "Pick the service",
            text: "Browse Errand services in your area. Each one shows its price, per job or per hour, its photos, its schedule, the area it covers, and the provider's reviews and badges.",
          },
          {
            icon: CalendarCheck,
            title: "Choose a time and send the request",
            text: "Pick a start time from the service's schedule and the saved address where the errand starts or ends. The provider accepts or declines; a request not answered within 24 hours, or by its start time, expires.",
          },
          {
            icon: Receipt,
            title: "Brief the errand in the chat",
            text: "Send the list, the addresses, the budget for what will be bought and how you will settle it. Ask for receipt photos. Pay the provider directly when it is done, as agreed.",
          },
        ]}
      />
      <p>
        Prices are each provider&apos;s own. As an example, an errand provider who charges ₱250 per hour comes to ₱750 for a three-hour run of bills and groceries, with the groceries themselves paid on top. A provider who prices per job might list a fixed fee for one bills payment or one pickup. Whatever the arrangement, you see it on the service before you message anyone, and the details are agreed in the chat before the errand starts.
      </p>

      <Callout title="Settle the shopping money first">
        The provider&apos;s fee and the money for what they buy are two different things. Agree in the chat how the shopping money is handled, whether you send it ahead or repay against the receipts, and keep the receipt photos in the same chat. Phriend never holds money, so the chat is the record both of you can point to.
      </Callout>

      <h2>Where errands are booked</h2>
      <p>
        Errand providers list in many cities. Start at the <Link href="/services/errand">Errand</Link> category, or look at <Link href="/errand-in-manila">errands in Manila</Link> and <Link href="/errand-in-cebu-city">errands in Cebu City</Link>. The wider <Link href="/services/errands">errands group</Link> also covers tech help, property viewing and moving help, which often come up in the same week as the errands do.
      </p>
      <p>
        Plenty of errands are booked for someone else: groceries for a parent across town, bills paid for a relative who cannot get to the counter, a pickup for a family member who works nights. Save that person&apos;s address in the app with a clear label and say in the chat who will be there. If the someone else is a parent and you are working abroad, <Link href="/blog/booking-help-for-your-parents-from-abroad">booking help for your parents from abroad</Link> walks through it.
      </p>

      <h2>Why the errand comes back right</h2>
      <ul>
        <li>
          <strong>Verified providers.</strong> Every provider has verified their identity with a government ID and a selfie, and some add an NBI clearance, which earns a badge once the Phriend team approves it.
        </li>
        <li>
          <strong>A written brief.</strong> The list, the brands and the budget sit in the chat, not in a phone call nobody remembers. Photos go both ways.
        </li>
        <li>
          <strong>Reviews.</strong> After the job, rate the provider and attach up to four photos. Errand providers who send the receipt every time show it in their reviews.
        </li>
        <li>
          <strong>Report and block.</strong> They are in every profile and chat, if something goes wrong.
        </li>
      </ul>
      <p>
        When you find an errand provider who gets the brand of milk right the first time, save the service. Next week&apos;s list is then a request away, and the morning you would have spent in a queue is yours again.
      </p>
    </>
  );
}
