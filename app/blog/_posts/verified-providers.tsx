import Link from "next/link";
import { BadgeCheck, ClipboardCheck, FileText, Star } from "lucide-react";
import { Callout, Steps } from "@/components/blog";
import { blogPhoto } from "./photo";
import type { Post } from "./index";

export const verifiedProviders: Post = {
  slug: "how-phriend-verifies-providers",
  title: "How Phriend verifies providers, and what the badges mean when you book",
  description:
    "Every provider on Phriend checks their identity with a government ID and a selfie, and every service is reviewed by a person before it goes live. Here is what each step and badge tells you.",
  seoTitle: "How Phriend verifies providers",
  seoDescription: "ID and selfie checks, document badges, a person reviewing every listing, two-way reviews, report and block: what each one means for you.",
  ogTitle: "How Phriend verifies its providers",
  date: "2026-10-23",
  readingMinutes: 5,
  audience: "client",
  category: { slug: "all", path: "/services", label: "all" },
  tags: ["Guides", "Verification", "Trust", "How it works"],
  hero: {
    src: blogPhoto("how-phriend-verifies-providers"),
    alt: "A smiling man and woman sit on blue plastic chairs in a busy government office, the man holding a thick folder of documents",
  },
  faqTitle: "Questions about verification",
  faq: [
    {
      q: "Is every provider on Phriend verified?",
      a: "Yes. Every provider verifies their identity with a government ID and a selfie before any of their services can go live, and a person reviews each service listing before it is published.",
    },
    {
      q: "What does a document badge mean?",
      a: "A document badge means the provider uploaded that document and the Phriend team approved it. Each approved document, such as an NBI clearance, a certificate, a licence or a business permit, earns its own badge on the profile.",
    },
    {
      q: "Does every provider have an NBI clearance?",
      a: "No, an NBI clearance is optional. Providers who upload one and have it approved show a badge for it, so you can see at a glance who has.",
    },
    {
      q: "Do providers review clients too?",
      a: "Yes. After a completed booking, both sides can leave a review, so how a client behaves counts as much as how a provider works.",
    },
    {
      q: "What can I do if something is wrong?",
      a: "Use report or block, which are in every profile and every chat. A report goes to the Phriend team, and blocking ends contact with that person in the app.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <p className="lead">
        When you let someone into your home to fix the aircon, or book a tutor for your child, you want to know who is coming. Phriend is built so that you can see that before you send a request, not after. Here is what happens to a provider before their first service appears, and how to read what you see on a profile.
      </p>

      <p>
        In short: every provider on Phriend verifies their identity with a government ID and a selfie before any of their services can go live. They can add documents such as an NBI clearance, certificates, licences or business permits, and each one the Phriend team approves shows as its own badge. A person reviews every service listing before it is published. After that, reviews from completed bookings, and report and block in every profile and chat, keep the picture up to date.
      </p>

      <h2>The four layers, in order</h2>
      <Steps
        steps={[
          {
            icon: BadgeCheck,
            title: "Identity check",
            text: "The provider signs in at provider.phriend.app and submits a government ID and a selfie. Until that is done, none of their services can go live.",
          },
          {
            icon: FileText,
            title: "Document badges",
            text: "Providers may add an NBI clearance, certificates, licences or business permits. Each document the Phriend team approves earns its own badge.",
          },
          {
            icon: ClipboardCheck,
            title: "Listing review",
            text: "Every service, with its price, photos, schedule, area and how it is delivered, is checked by a person before clients can book it.",
          },
          {
            icon: Star,
            title: "Reviews after each booking",
            text: "When a booking is completed, the client can rate the provider and attach up to four photos, and the provider reviews the client too.",
          },
        ]}
      />

      <h2>Identity: who the provider is</h2>
      <p>
        The government ID and the selfie answer one question: is this provider the person they say they are? The face on the profile is the face on the ID. Providers on Phriend have one profile photo, which is their face, a short title and an About section, so you know who will arrive rather than looking at a logo.
      </p>
      <p>
        The profile also lists the languages the provider speaks, which matters more than it sounds. If you are booking for a parent who is most comfortable in Cebuano or Ilocano, you can see before you send a request whether the provider can talk with them easily. The same profile carries every badge and every review, so one screen tells you who the provider is, what they have shown the Phriend team, and what earlier clients said.
      </p>

      <h2>Document badges: what has been shown</h2>
      <p>
        Documents are optional, and that is what makes them useful: a badge tells you a provider went further than the minimum. Look for the ones that fit the job you are booking.
      </p>
      <ul>
        <li>
          <strong>NBI clearance</strong> for anyone working inside your home, such as <Link href="/services/home-cleaning">home cleaning</Link>, repairs or senior care help.
        </li>
        <li>
          <strong>Licences</strong> where the work calls for one, such as a professional driver&apos;s licence for a <Link href="/services/driver">driver</Link>.
        </li>
        <li>
          <strong>Certificates</strong> for skills: a TESDA certificate for an electrician or a teaching certificate for a <Link href="/services/tutor">tutor</Link>.
        </li>
        <li>
          <strong>Business permits</strong> for providers who run a registered business, such as a mayor&apos;s or barangay permit.
        </li>
      </ul>
      <p>
        A badge tells you what was checked. The reviews tell you how the work went. Read both.
      </p>


      <h2>A person reviews every listing</h2>
      <p>
        Verification is about the provider; the listing review is about the service. Before a service goes live, someone on the Phriend team looks at it: the title, the price (per job, per hour or per session), the up to six photos, the schedule, the area it covers and how it is delivered, whether at your place, at the provider&apos;s place or online. Each service is reviewed on its own, so a provider who offers both aircon cleaning and appliance repair has had both listings checked, each with its own price, photos and area. The result is that what you browse on <Link href="/services">the services page</Link> is a real offer with a real price, not a vague post asking you to message for details.
      </p>

      <h2>What this means when you book</h2>
      <p>
        The checks do their work before you arrive. Your part is choosing well among verified providers:
      </p>
      <ul>
        <li>
          <strong>Match the badge to the job.</strong> A driver with an approved licence, a cleaner with an approved NBI clearance.
        </li>
        <li>
          <strong>Read the reviews and their photos.</strong> They come only from completed bookings, so they describe real work.
        </li>
        <li>
          <strong>Compare a few services.</strong> Save two or three, then look at their badges, reviews and prices side by side before you choose.
        </li>
        <li>
          <strong>Ask in the chat.</strong> The provider&apos;s FAQ chips answer common questions instantly; anything else, ask directly. You never need to share your phone number.
        </li>
        <li>
          <strong>Agree everything in writing.</strong> The price, the hours and what is included go in the chat. <Link href="/blog/how-booking-and-payment-work-on-phriend">How booking and payment work</Link> walks through it.
        </li>
      </ul>
      <p>
        Booking for someone else adds one more step: tell the provider in the chat who will be there and what they need. If you are arranging help for an older parent, our list of <Link href="/blog/questions-to-ask-before-booking-senior-care-help">questions to ask before booking senior care help</Link> shows how to use the chat, the FAQ chips, the documents and the reviews together before you commit.
      </p>
      <Callout title="Reviews go both ways">
        Providers review clients after a completed booking too. A clear brief, a correct address and paying as agreed make you a client providers are glad to accept.
      </Callout>

      <h2>Report and block</h2>
      <p>
        Report and block are in every profile and every chat, for clients and providers alike. A report goes to the Phriend team to look into, and blocking ends contact with that person in the app. The <Link href="/safety">safety page</Link> covers verification, payments and reports in more detail.
      </p>
      <p>
        Verification is not a single moment. It starts with an ID and a selfie, grows with every approved document and every completed booking, and stays open to correction through reports. That is what the badges on a profile add up to.
      </p>
    </>
  );
}
