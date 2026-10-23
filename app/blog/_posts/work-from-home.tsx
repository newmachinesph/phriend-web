import Link from "next/link";
import { CalendarCheck, House, Search } from "lucide-react";
import { Callout, Steps } from "@/components/blog";
import { blogPhoto } from "./photo";
import type { Post } from "./index";

export const workFromHome: Post = {
  slug: "services-that-free-up-your-work-from-home-day",
  title: "Services that free up your work-from-home day: cleaning, laundry, aircon, tech help, errands and a virtual assistant",
  description:
    "Working from home means the house never stops asking for things. These are the services to book on Phriend so the workday stays a workday, and how to schedule them around your calls.",
  seoTitle: "Services that free up a work-from-home day",
  seoDescription: "Cleaning, laundry, aircon cleaning, tech help, errands and a virtual assistant: what to book so your work-from-home day stays a workday.",
  ogTitle: "Keep your work-from-home day for work",
  date: "2026-10-23",
  readingMinutes: 5,
  audience: "client",
  category: { slug: "home-cleaning", path: "/services/home-cleaning", label: "Home Cleaning" },
  related: ["laundry", "aircon-cleaning", "tech-help", "virtual-assistant"],
  tags: ["Guides", "Work from home", "Cleaning", "Home services"],
  hero: {
    src: blogPhoto("services-that-free-up-your-work-from-home-day"),
    alt: "Two people work on laptops at a long wooden table in a plant-filled cafe, one of them looking out the window with a pen in hand",
  },
  faqTitle: "Questions remote workers ask",
  faq: [
    {
      q: "Which service saves the most time when I work from home?",
      a: "Usually a regular home cleaning, because it removes the chore that keeps pulling you away from your desk. Laundry and errands come next, since both repeat every week.",
    },
    {
      q: "Can I book a service while I am on calls?",
      a: "Yes, as long as you schedule around them. Pick a start time from the service's schedule that falls on a quieter day, and add the accepted booking to your calendar so no meeting lands on top of it.",
    },
    {
      q: "Does a virtual assistant need to come to my home?",
      a: "No, a virtual assistant service is delivered online. You agree the tasks, the hours and the tools in the chat, and the work happens remotely.",
    },
    {
      q: "How do I pay for these services?",
      a: "You pay each provider directly, the amount and the way you agreed in the chat. Phriend takes no commission and never holds the money.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <p className="lead">
        Work from home and the house turns into a second job. The laundry is in your eyeline during the ten o&apos;clock call, the aircon starts dripping beside your desk in the middle of month-end, the Wi-Fi drops right before a presentation, and the bills are due on the one afternoon you are fully booked. None of it is big. Together it eats the hours you thought working from home would give back.
      </p>
      <p>
        The services that free up a work-from-home day are the ones that take recurring chores and one-off problems off your plate: home cleaning, laundry and ironing, aircon cleaning, tech help, errands, and a virtual assistant for the admin. On Phriend you book each one as a service with its own price and schedule, agree the details in the chat, and pay the provider directly, as agreed.
      </p>

      <h2>The services worth booking</h2>
      <ul>
        <li>
          <strong>Home cleaning.</strong> A weekly or every-other-week <Link href="/services/home-cleaning">home cleaning</Link> is the booking that changes the week. Put it on a focus day rather than your heaviest call day, and ask the cleaner to leave your work corner for last.
        </li>
        <li>
          <strong>Laundry and ironing.</strong> Picked up and brought back, or done at your place, depending on the service. Office shirts pressed for the days you do go in.
        </li>
        <li>
          <strong>Aircon cleaning.</strong> Every few months, and before the hot season. A unit that cools properly and does not drip on your desk is part of your work setup; <Link href="/services/aircon-cleaning">aircon cleaning</Link> services list a price per unit or per job.
        </li>
        <li>
          <strong>Tech help.</strong> Router placement, a mesh setup that reaches the bedroom office, a printer that will not connect, files moved to a new laptop. <Link href="/services/tech-help">Tech help</Link> is often a one-visit job that pays for itself in the first dropped call it prevents.
        </li>
        <li>
          <strong>Errands.</strong> Bills, pickups, groceries and the government queue that would cost you a whole morning. <Link href="/blog/errands-you-can-book-on-phriend">Errands you can book on Phriend</Link> lists what errand providers take on.
        </li>
        <li>
          <strong>A virtual assistant.</strong> Inbox clean-up, scheduling, data entry, research for a side business. It is delivered online, so nobody needs to open the gate; see <Link href="/services/virtual-assistant">virtual assistant</Link> services.
        </li>
      </ul>


      <h2>Schedule services around your calendar</h2>
      <p>
        The trick with home services when you work from home is timing. Each service on Phriend has a schedule its provider sets, and you pick a start time from it, so you can see before you book whether it fits your week.
      </p>
      <ul>
        <li>
          <strong>Match noise to quiet hours.</strong> Aircon cleaning and repairs are loud. Put them on a day with no client calls, or start them right after your morning stand-up.
        </li>
        <li>
          <strong>Stack the visits.</strong> If the cleaner comes Tuesday morning, have the laundry picked up the same morning. One interruption beats three.
        </li>
        <li>
          <strong>Use Add to Calendar.</strong> Every accepted booking has an Add to Calendar button. Put it in your work calendar as a block, so nobody schedules a meeting on top of the visit.
        </li>
        <li>
          <strong>Let the chat do the talking.</strong> Providers set up FAQ chips that answer instantly: what is included, what to prepare, how payment works. You can read them between meetings, and you never have to take a phone call mid-presentation.
        </li>
      </ul>
      <p>
        A little preparation makes each visit shorter. For a clean, clear the floors and say which room is your office. For aircon cleaning, move the desk and anything electronic away from the unit, and know which units you want done. For tech help, write down the network name, the problem and when it happens; a photo of the error message in the chat beats a description of it. For laundry, set aside what needs ironing and mention anything delicate.
      </p>

      <h2>How to book</h2>
      <Steps
        steps={[
          {
            icon: Search,
            title: "Choose the service",
            text: "Browse by category and compare prices (per job, per hour or per session), photos, reviews and the area each service covers.",
          },
          {
            icon: House,
            title: "Pick your address and a time",
            text: "Choose one of your saved addresses and a time from the service's schedule, then send the request. The provider accepts or declines; a request not answered within 24 hours, or by its start time, expires.",
          },
          {
            icon: CalendarCheck,
            title: "Add it to your calendar",
            text: "Once it is accepted, add the booking to your calendar and agree the details in the chat. When the job is done, pay the provider directly, as agreed.",
          },
        ]}
      />
      <p>
        Prices are set by each provider and shown on the service before you message anyone. As an example, a cleaner who charges ₱500 per hour comes to ₱2,000 for a four-hour clean, and an aircon cleaning listed at ₱800 per unit comes to ₱1,600 for a bedroom and a living room unit. Phriend adds nothing on top: browsing is free, and the provider keeps what you pay.
      </p>

      <Callout title="Treat it like a meeting">
        Block the time in your calendar and give the provider the first ten minutes: walk them through the job, show them where things are, agree what &quot;done&quot; looks like. Ten minutes of handover at nine buys you a quiet afternoon.
      </Callout>

      <h2>Make it a routine</h2>
      <p>
        The first booking is the one that takes thinking. After that, save the services you liked so you can book the same provider again next week or next quarter. Rate each provider after the job and attach up to four photos; a review that says the cleaner worked around your calls is exactly what the next remote worker is looking for. Every provider has verified their identity with a government ID and a selfie, and report and block are in every profile and chat.
      </p>
      <p>
        If you are setting up a home office in a new city from scratch, <Link href="/blog/new-to-manila-first-month-services">services for your first month in Metro Manila</Link> covers moving help, the first deep clean and getting connected.
      </p>
      <p>
        Working from home was supposed to give you back the commute. Booking out the chores is how you get back the rest of the day too.
      </p>
    </>
  );
}
