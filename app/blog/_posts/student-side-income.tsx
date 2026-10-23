import Link from "next/link";
import { BadgeCheck, CalendarCheck, ListPlus, UserRound } from "lucide-react";
import { Callout, RateTable, Steps } from "@/components/blog";
import { blogPhoto } from "./photo";
import type { Post } from "./index";

export const studentSideIncome: Post = {
  slug: "side-income-services-students-can-offer",
  title: "Side income for students: services you can offer on Phriend between classes",
  description:
    "Tutoring, graphic design, social media, virtual assistance, photography, music lessons and errands: how Filipino students list what they are already good at as services, set their own price and keep all of it.",
  seoTitle: "Side income for students: services to offer",
  seoDescription: "Tutoring, design, social media, VA work, photography, music lessons and errands: list them free on Phriend, set your price and keep 100%.",
  ogTitle: "Side income for students, between classes",
  date: "2026-10-23",
  readingMinutes: 5,
  audience: "provider",
  category: { slug: "tutor", path: "/services/tutor", label: "Tutor" },
  related: ["graphic-design", "social-media", "virtual-assistant", "music-lessons"],
  tags: ["For providers", "Students", "Side income", "Tutoring"],
  hero: {
    src: blogPhoto("side-income-services-students-can-offer"),
    alt: "A young man points at a notebook of handwritten equations while a smiling student takes notes beside him at a cafe table with a laptop, in late afternoon light",
  },
  faqTitle: "Questions students ask",
  faq: [
    {
      q: "Does it cost anything to list a service?",
      a: "No, listing on Phriend is free. Phriend takes no commission either: the client pays you directly, as agreed in the chat, and you keep the whole amount.",
    },
    {
      q: "Can I offer my services online only?",
      a: "Yes. Each service says how it is delivered: at the client's place, at your place, or online. Tutoring, graphic design, social media and virtual assistance all work well online.",
    },
    {
      q: "What if I have exams or a busy week?",
      a: "Set time off, or decline the requests you cannot take. Each service has its own schedule, so clients can only request times you have opened.",
    },
    {
      q: "Do I need a certificate to tutor or teach?",
      a: "No, a certificate is not required to list. If you have one, upload it: each document the Phriend team approves shows as a badge on your profile.",
    },
    {
      q: "How do I get paid?",
      a: "The client pays you directly, in the amount and the way you agreed in the chat. Phriend does not process payments, so there is no payout to wait for.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <p className="lead">
        You already explain fractions to your younger cousins, design the org&apos;s pubmats, and run your tita&apos;s online shop page for free. Somewhere near your campus, a parent is looking for exactly that, and is ready to pay for it. A side income as a student does not need a new skill. It needs a place where people can find the skills you have.
      </p>

      <p>
        Services that fit a student&apos;s skills and schedule include tutoring, graphic design, social media management, virtual assistance, photography, music lessons and errands. On Phriend you can list each one for free as its own service, with your own price per job, per hour or per session and a schedule that fits around your classes. Clients book a time, you agree the details in the chat, and you keep 100% of what the client pays.
      </p>

      <h2>Services that fit around classes</h2>
      <ul>
        <li>
          <strong>Tutoring.</strong> Grade school math, high school science, English, entrance exam review. Online or at the client&apos;s home, after school hours, which is exactly when you are free. See <Link href="/services/tutor">tutor services</Link>.
        </li>
        <li>
          <strong>Graphic design.</strong> Logos for small businesses, menus for a carinderia, invitations for a debut. Your portfolio goes straight into the service&apos;s photos. <Link href="/services/graphic-design">Graphic design</Link> can be done entirely online.
        </li>
        <li>
          <strong>Social media.</strong> Small shops and home bakers want regular posts but have no time to make them. A monthly plan of posts and captions is a service of its own under <Link href="/services/social-media">social media manager</Link>.
        </li>
        <li>
          <strong>Virtual assistance.</strong> Inbox sorting, scheduling, data entry, research. Hourly work you can do from a dorm with a laptop and good Wi-Fi.
        </li>
        <li>
          <strong>Photography.</strong> Graduation photos, product shots for online sellers, small events. Our guide for <Link href="/blog/photographers-and-videographers-earn-with-phriend">photographers and videographers</Link> goes deeper.
        </li>
        <li>
          <strong>Music lessons.</strong> Beginner guitar, piano or ukulele for kids and adults, at their place or online.
        </li>
        <li>
          <strong>Errands.</strong> Pasabuy, bill payments, queueing for documents, grocery runs. Good for a free afternoon with no laptop needed.
        </li>
      </ul>

      <h2>What you could earn</h2>
      <p>
        You set the price for every service. Here are examples of how a student might price a few of them; they are illustrations, not market rates, so check what similar services near you charge before you settle on yours.
      </p>
      <RateTable
        rows={[
          { service: "Grade 6 math tutoring, 2 hours", pricing: "₱350 per hour", total: 700 },
          { service: "Logo and three social media posts", pricing: "Per job", total: 1500 },
          { service: "Inbox and calendar help, 8 hours a week", pricing: "₱250 per hour", total: 2000 },
          { service: "Beginner guitar lesson", pricing: "Per session", total: 500 },
          { service: "Grocery pasabuy, one trip", pricing: "Per job", total: 300 },
        ]}
      />
      <p>
        Two tutoring sessions a week at those example rates come to ₱1,400, paid to you directly, with no platform fee taken off. Travel, materials and extra revisions are yours to price in: write them into the service description so the client knows what is included before they book.
      </p>

      <h2>Pricing your first service</h2>
      <p>
        It is easy to underprice a first service. A few things help you land on a fair number:
      </p>
      <ul>
        <li>
          <strong>Pick the right unit.</strong> Per hour suits tutoring and virtual assistance, per session suits lessons, and per job suits a logo, a set of posts or an errand with a clear end.
        </li>
        <li>
          <strong>Count the hidden time.</strong> Preparing a lesson, revising a design and travelling to a client&apos;s home are part of the work. Build them into the price or list them separately.
        </li>
        <li>
          <strong>Be specific about what is included.</strong> &ldquo;Logo, two revisions, files for print and social media&rdquo; avoids a third and fourth round you did not plan for.
        </li>
        <li>
          <strong>Raise it as reviews come in.</strong> Your price is yours to change. A service with good reviews can charge more than it did on day one.
        </li>
      </ul>

      <h2>How to list your first service</h2>
      <Steps
        steps={[
          {
            icon: BadgeCheck,
            title: "Verify your identity",
            text: "Sign in at provider.phriend.app with Google or email, then upload a government ID and a selfie. Certificates you add earn a badge each once approved.",
          },
          {
            icon: UserRound,
            title: "Write a short profile",
            text: "One face photo, a title such as \"Math and Science Tutor\", an About section and the languages you speak.",
          },
          {
            icon: ListPlus,
            title: "List each service",
            text: "Its price, up to six photos, its schedule, its area and how it is delivered. A person reviews it before it goes live.",
          },
          {
            icon: CalendarCheck,
            title: "Accept requests",
            text: "Clients request a time from your schedule. You accept or decline, and you can see your earnings as bookings add up.",
          },
        ]}
      />


      <h2>Make it fit your semester</h2>
      <p>
        Each service has its own schedule, so you can open tutoring on weekday afternoons and errands on Saturday mornings only. When a request comes in, you accept or decline; a request you do not answer within 24 hours expires on its own. Online services save you the commute entirely, which matters when your classes are in one city and your clients in another, say in <Link href="/quezon-city">Quezon City</Link> or <Link href="/manila">Manila</Link>.
      </p>
      <p>
        For services at the client&apos;s place, such as home tutoring, music lessons or errands, you set the area you cover. Keep it to places you can reach on a jeepney or the MRT between classes; the app will not accept a booking at an address outside it, so you are never asked to cross the city for a one-hour session.
      </p>
      <Callout title="Exam week">
        Set time off before midterms and finals. Clients will not be able to request those days, and you will not have to decline a parent who booked in good faith.
      </Callout>

      <h2>Get your first reviews</h2>
      <ul>
        <li>
          <strong>Show the work.</strong> Use the photo slots for real samples: designs you made, photos you took, a worksheet you wrote.
        </li>
        <li>
          <strong>Name the service the way clients search.</strong> &ldquo;Grade 4-6 math tutoring, online&rdquo; beats &ldquo;Tutorial services&rdquo;.
        </li>
        <li>
          <strong>Set up FAQ chips.</strong> Up to eight quick answers, such as what to prepare or how to pay, that reply instantly while you are in class.
        </li>
        <li>
          <strong>Add your documents.</strong> A certificate from a course or a competition earns a badge once approved, and parents can see it on your profile.
        </li>
        <li>
          <strong>Ask for the review.</strong> After a completed booking the client can rate you and attach up to four photos. A few good reviews make you an easier pick.
        </li>
      </ul>
      <p>
        You have the skills and some free hours each week. Listing costs nothing, and every peso a client pays stays with you.
      </p>
    </>
  );
}
