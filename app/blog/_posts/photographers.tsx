import { BadgeCheck, CalendarCheck, Camera } from "lucide-react";
import { Callout, Figure, PhoneShots, RateTable } from "@/components/blog";
import { Steps } from "@/components/blog";
import { cdn } from "@/lib/site";
import type { Post } from "./index";

export const photographers: Post = {
  slug: "photographers-and-videographers-earn-with-phriend",
  title: "Photographers and videographers: turn your free weekends into paid shoots",
  description:
    "How Filipino photographers and videographers book portrait sessions, event coverage and content days on Phriend, set their own hourly rate, keep 100% of it and stay safe doing it.",
  seoTitle: "Photographers: earn per hour on Phriend",
  seoDescription: "Book portrait, event and content shoots by the hour, set your own rate and keep all of it. A guide for Filipino photographers and videographers.",
  ogTitle: "Turn your free weekends into paid shoots",
  date: "2026-09-08",
  readingMinutes: 6,
  category: { slug: "photographer", path: "/photographer", label: "Photographer" },
  tags: ["For Phriends", "Photography", "Videography", "Side income"],
  hero: {
    src: cdn("/blog/photographers-hero.jpg"),
    alt: "A photographer shows a smiling client the portrait he just took on his camera screen, on a sunlit Intramuros street",
  },
  faq: [
    {
      q: "Do I need to be a full-time professional?",
      a: "No. Most photographers on Phriend shoot on weekends around a day job or school. You need a camera you know well, a set of photos you are proud of, and a government ID for verification.",
    },
    {
      q: "Does Phriend take a commission?",
      a: "No. Phriend does not process payments at all. The client pays you in cash when you meet, 50% at the start and 50% after, and you keep the whole amount.",
    },
    {
      q: "What about editing time?",
      a: "Price it into your rate or list editing as its own service with a per-session price. Many photographers list 'Portrait session, 20 edited photos' as one service and 'Raw files only' as a cheaper one.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <p className="lead">
        Somewhere in your area right now, a family wants graduation photos, a small online seller needs product shots, and a couple wants a prenup preview before they commit to a big package. They are asking in Facebook groups, getting three replies and a lot of ghosting. You have the camera, the eye and a free Saturday. Phriend is where those two facts meet.
      </p>

      <h2>What clients actually book</h2>
      <p>
        Phriend lists <strong>Photographer</strong> as one of its activity categories, with Portrait, Event and Product as the sub-activities clients filter by. In practice the bookings look like this:
      </p>
      <ul>
        <li>
          <strong>Travel portraits.</strong> Visitors and balikbayans who want good photos of themselves in Intramuros, Vigan, Cebu or Siargao, without carrying a tripod around. Two hours, one location.
        </li>
        <li>
          <strong>Milestones.</strong> Graduation shoots, birthdays, a baby’s first year, a couple’s anniversary dinner. The client already has the place; they need someone who knows where the light is.
        </li>
        <li>
          <strong>Event coverage.</strong> Small weddings, debuts, company outings and product launches that cannot justify a full studio package but still want someone with a real camera for four hours.
        </li>
        <li>
          <strong>Content days.</strong> Creators, real estate agents and cafe owners who need a batch of photos and short clips every month. This is where videographers with a gimbal get repeat clients.
        </li>
        <li>
          <strong>Product shots.</strong> Shopee and TikTok Shop sellers with forty items and a white wall. Fast, repeatable, and they come back every new drop.
        </li>
      </ul>

      <Figure
        src={cdn("/blog/photographers-video.jpg")}
        alt="A videographer films a garden wedding reception with a mirrorless camera on a gimbal at golden hour"
        caption="Event coverage by the hour: four hours at a garden wedding in Tagaytay is a typical Phriend booking."
      />

      <h2>What you can charge</h2>
      <p>
        You set your own hourly rate between ₱300 and ₱1,500, and you can list up to twelve services with their own price, either per hour or per session, plus a minimum number of hours. Clients see the rate before they message you, so there is no haggling in the chat. Here is what common sessions come to:
      </p>
      <RateTable
        rows={[
          { session: "Travel portraits, one location", hours: 2, rate: 800 },
          { session: "Graduation shoot with family", hours: 3, rate: 700 },
          { session: "Small wedding or debut coverage", hours: 4, rate: 1200 },
          { session: "Monthly content day for a cafe", hours: 3, rate: 1000 },
          { session: "Product shots, 40 items", hours: 2, rate: 600 },
        ]}
      />
      <p>
        Two bookings on a Saturday at those rates is ₱4,000 to ₱6,000 in cash, with no platform fee and no waiting for a payout. Editing, extra locations and travel outside your city are things you price in yourself. Write them into the service description so the client knows what is included.
      </p>

      <h2>How a booking works</h2>
      <Steps
        steps={[
          {
            icon: BadgeCheck,
            title: "Verify your ID",
            text: "Sign in with Google or email, then scan a government ID and take a selfie through Didit. It takes about two minutes and you only do it once.",
          },
          {
            icon: Camera,
            title: "Post your profile",
            text: "Up to eight of your best photos, your city, your services and rates, the days and hours you shoot. Phriend's moderators review it before it goes live.",
          },
          {
            icon: CalendarCheck,
            title: "Accept bookings",
            text: "Clients pick a service, date, hours and a public meeting place. You accept or decline from your dashboard, and every booking has an Add to Calendar button.",
          },
        ]}
      />
      <p>
        Bookings only land inside the hours you set, never on a date you locked out, and never on top of one you already accepted. Clients can book up to sixty days ahead. Chat, photo sharing and saved replies are built in, so you never have to give out your number to someone you have not met.
      </p>

      <PhoneShots
        shots={[
          {
            src: cdn("/blog/shot-photographer-feed.webp"),
            alt: "The Phriend app filtered to the Photographer category, showing verified profiles with hourly rates",
            caption: "Clients filter by Photographer, then by Portrait, Event or Product.",
          },
          {
            src: cdn("/blog/shot-photographer-profile.webp"),
            alt: "A photographer's profile on Phriend with a gallery, a rating, an hourly rate and a Chat button",
            caption: "Your profile: gallery, rating, rate, services and a Chat button.",
          },
        ]}
      />

      <h2>Safety rules, in your favor</h2>
      <p>
        The rules that protect clients protect you just as much. Every meetup is in a public place. The client pays 50% in cash when you arrive and 50% when you wrap, so a no-show costs you a commute, not a day’s work. Who is coming is agreed in the chat beforehand, and if someone extra turns up, the rule is to be prudent, leave and report. Every member you talk to has passed the same ID check you did.
      </p>
      <Callout title="Bring a second shooter">
        For event coverage, list “second shooter” as a service at its own rate and bring a friend who is also on Phriend. Two verified members, one booking, twice the angles, and the client gets both names in the chat before the day.
      </Callout>

      <Figure
        src={cdn("/blog/photographers-travel.jpg")}
        alt="A photographer takes travel portraits of two travelers posing in front of colorful jeepneys and a street mural in Manila"
        caption="Travel portraits are the fastest bookings to fill: one location, two hours, cash on the day."
      />

      <h2>Get booked faster</h2>
      <ul>
        <li>
          <strong>Use all eight photo slots</strong> for your work, not your face. Your first photo is your thumbnail in search; make it the one that stops a scroll.
        </li>
        <li>
          <strong>Name your services the way clients search.</strong> “Graduation shoot, 30 edited photos” beats “Photography package A”.
        </li>
        <li>
          <strong>Set your schedule honestly.</strong> Weekends only is fine. A profile that is always available but never answers loses reviews.
        </li>
        <li>
          <strong>Reply within the hour.</strong> Saved replies help: one for your rates, one for what is included, one for your meeting spots.
        </li>
        <li>
          <strong>Ask for the review.</strong> After a completed booking the client can rate you and attach up to four photos. Three good reviews move you from a stranger to a safe pick.
        </li>
      </ul>
      <p>
        Your gear is already paid for. Your weekends are already free. The only thing missing is a place where the people who need you can find you, see your rate and book you without a back-and-forth. That is the whole idea.
      </p>
    </>
  );
}
