import { BadgeCheck, CalendarCheck, Camera } from "lucide-react";
import { Callout, Figure, RateTable } from "@/components/blog";
import { Steps } from "@/components/blog";
import { cdn } from "@/lib/site";
import type { Post } from "./index";

export const photographers: Post = {
  slug: "photographers-and-videographers-earn-with-phriend",
  title: "Photographers and videographers: turn your free weekends into paid shoots",
  description:
    "How Filipino photographers and videographers list portrait sessions, event coverage and content days as services on Phriend, set their own prices, keep 100% of what clients pay and get booked.",
  seoTitle: "Photographers: list your shoots on Phriend",
  seoDescription: "List portrait, event and content shoots as services with your own price and photos, and keep all of it. A guide for Filipino photographers.",
  ogTitle: "Turn your free weekends into paid shoots",
  date: "2026-09-08",
  readingMinutes: 6,
  category: { slug: "photographer", path: "/services/photographer", label: "Photographer" },
  tags: ["For providers", "Photography", "Videography", "Side income"],
  hero: {
    src: cdn("/blog/photographers-hero.jpg"),
    alt: "A photographer shows a smiling client the portrait he just took on his camera screen, on a sunlit Intramuros street",
  },
  faq: [
    {
      q: "Do I need to be a full-time professional?",
      a: "No. Many photographers on Phriend shoot on weekends around a day job or school. You need a camera you know well, a set of photos you are proud of, and a government ID for verification.",
    },
    {
      q: "Does Phriend take a commission?",
      a: "No. Phriend does not process payments at all. The client pays you directly, as you agree in the chat, and you keep the whole amount.",
    },
    {
      q: "What about editing time?",
      a: "Price it into the service, or list editing as a service of its own. Many photographers list 'Portrait session, 20 edited photos' as one service and 'Raw files only' as a cheaper one.",
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
        <strong>Photographer</strong> is one of Phriend&apos;s service categories, with Portrait, Event and Product as the kinds of shoot clients filter by. In practice the bookings look like this:
      </p>
      <ul>
        <li>
          <strong>Travel portraits.</strong> Visitors and balikbayans who want good photos of themselves in Intramuros, Vigan, Cebu or Siargao, without carrying a tripod around. Two hours, one location.
        </li>
        <li>
          <strong>Milestones.</strong> Graduation shoots, birthdays, a baby’s first year, a family reunion. The client already has the place; they need someone who knows where the light is.
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
        caption="Event coverage: four hours at a garden wedding in Tagaytay is a typical booking."
      />

      <h2>What you can charge</h2>
      <p>
        You set your own price for every service you list: per job, per hour or per session, with a minimum booking if you want one. Each service carries up to six photos of your work, so clients see the price and the style before they message you, and there is no haggling in the chat. Here is what common shoots come to:
      </p>
      <RateTable
        rows={[
          { service: "Travel portraits, one location, 2 hours", pricing: "Per job", total: 1600 },
          { service: "Graduation shoot with family, 3 hours", pricing: "Per job", total: 2100 },
          { service: "Small wedding or debut coverage", pricing: "₱1,200 per hour, 4 hours", total: 4800 },
          { service: "Monthly content day for a cafe", pricing: "Per session", total: 3000 },
          { service: "Product shots, 40 items", pricing: "Per job", total: 1200 },
        ]}
      />
      <p>
        Two bookings on a Saturday at those prices come to ₱3,000 to ₱6,000, paid to you directly, with no platform fee and no waiting for a payout. Editing, extra locations and travel outside your area are things you price in yourself. Write them into the service description so the client knows what is included.
      </p>

      <h2>How a booking works</h2>
      <Steps
        steps={[
          {
            icon: BadgeCheck,
            title: "Verify your identity",
            text: "Sign in at provider.phriend.app with Google or email, then upload a government ID and a selfie. Add an NBI clearance, certificates or business documents to earn a badge for each one that is approved.",
          },
          {
            icon: Camera,
            title: "List your services",
            text: "A short profile with one face photo, a title like \"Event Photographer\", an About me and your languages. Then each service with its price, up to six photos of your work, its schedule and its area. A person reviews it before it goes live.",
          },
          {
            icon: CalendarCheck,
            title: "Accept bookings",
            text: "Clients pick a time from your service's schedule and send a request with the address or venue. You accept or decline in Phriend Provider, and every booking has an Add to Calendar button.",
          },
        ]}
      />
      <p>
        Bookings only land inside the schedule you set for that service, never on a date you blocked, and never on top of one you already accepted. Chat, photo sharing and FAQ answers that reply instantly are built in, so you never have to give out your number to a client you have not worked with.
      </p>

      <h2>Trust that works for you</h2>
      <p>
        Clients see your Verified badge and a badge for every approved document, so a clearance or a business permit is worth uploading. The price, the hours and what is delivered are agreed in the chat, so both sides have the record, and payment comes to you directly, as you agreed. If anything goes wrong, report and block are one tap away.
      </p>
      <Callout title="Bring a second shooter">
        For event coverage, list “second shooter” as a service of its own, or start a team with another photographer on Phriend. One booking, twice the angles, and the client sees both names before the day.
      </Callout>

      <Figure
        src={cdn("/blog/photographers-travel.jpg")}
        alt="A photographer takes travel portraits of two travelers posing in front of colorful jeepneys and a street mural in Manila"
        caption="Travel portraits are the fastest bookings to fill: one location, two hours, one price."
      />

      <h2>Get booked faster</h2>
      <ul>
        <li>
          <strong>Use all six photo slots</strong> on each service for your work. The first photo is the service&apos;s thumbnail in search; make it the one that stops a scroll.
        </li>
        <li>
          <strong>Name your services the way clients search.</strong> “Graduation shoot, 30 edited photos” beats “Photography package A”.
        </li>
        <li>
          <strong>Set your schedule honestly.</strong> Weekends only is fine. A service that is always available but never answers loses reviews.
        </li>
        <li>
          <strong>Set up your FAQ answers.</strong> One for how to pay, one for what is included, one for where you shoot: they reply instantly, even mid-shoot.
        </li>
        <li>
          <strong>Ask for the review.</strong> After a completed booking the client can rate you and attach up to four photos. Three good reviews move you from a stranger to a safe pick.
        </li>
      </ul>
      <p>
        Your gear is already paid for. Your weekends are already free. The only thing missing is a place where the people who need a photographer can find your services, see the price and book without a back-and-forth. That is the whole idea.
      </p>
    </>
  );
}
