import Link from "next/link";
import { CalendarCheck, MessageCircle, Search, Star } from "lucide-react";
import { Callout, Figure, Steps } from "@/components/blog";
import { blogPhoto } from "./photo";
import type { Post } from "./index";

export const coachLessons: Post = {
  slug: "learn-a-sport-or-skill-with-a-coach",
  title: "Learn a sport or a skill with a coach: how to book your first lessons",
  description:
    "Swimming, pickleball, golf, surfing, arts and crafts or music: how coaches on Phriend price a lesson, where lessons happen, what to tell the coach first, and how to book.",
  seoTitle: "Book your first lesson with a coach",
  seoDescription: "Swimming, pickleball, golf, surf, arts and crafts and music lessons: how coaches price a session, what is included and how to book.",
  ogTitle: "Learn something new, one lesson at a time",
  date: "2026-10-23",
  readingMinutes: 5,
  audience: "client",
  category: { slug: "lessons", path: "/services/lessons", label: "lesson" },
  related: ["pickleball", "golf", "surf-coach"],
  tags: ["Guides", "Lessons", "Sports", "Hobbies"],
  hero: {
    src: blogPhoto("learn-a-sport-or-skill-with-a-coach"),
    alt: "A coach shows a smiling beginner how to set the weight on a cable machine, beside the tall windows of a city gym",
  },
  faqTitle: "Questions first-time learners ask",
  faq: [
    {
      q: "How much is a lesson with a coach?",
      a: "Each coach sets their own price, per session or per hour, and it is shown on the service before you book. Court fees, green fees, board rental and materials are usually separate unless the service says they are included.",
    },
    {
      q: "Can I book lessons for my child?",
      a: "Yes. Book the service yourself, choose the address where the lesson happens, and say in the chat who the learner is, how old they are and who will be there with them.",
    },
    {
      q: "Do I need my own equipment?",
      a: "Not always, so ask in the chat. Some coaches bring paddles, boards or instruments for beginners, and others expect you to bring or rent your own.",
    },
    {
      q: "Can lessons be online?",
      a: "Some can. Each service says how it is delivered: at your place, at the coach's place, or online, which suits music and some arts lessons.",
    },
    {
      q: "How do I pay the coach?",
      a: "You pay the coach directly, the amount you agreed in the chat. Phriend takes no commission and never holds the money.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <p className="lead">
        Everyone has the thing they keep meaning to learn. Swimming properly, not just floating. The pickleball game the whole office suddenly plays. A golf swing that does not embarrass you at the company outing. Surfing on the next trip to La Union or Siargao. Clay, paint or a guitar, for the evenings. The hard part is never the wanting; it is finding a patient coach, a time that fits and a price you know before you start.
      </p>
      <p>
        <strong>The short answer:</strong> on Phriend you book a lesson as a service. Each coach lists what they teach with a price per session or per hour, photos, a schedule, the area they cover and where the lesson happens. You agree the details in the in-app chat, send a request for a time on their schedule, and pay the coach directly. Your first session is a normal booking; if it clicks, you book the next one.
      </p>

      <h2>What you can learn</h2>
      <ul>
        <li>
          <strong>Swimming.</strong> For adults who never learned, children before summer, or anyone who wants a stroke that lasts more than one lap. Lessons happen at a pool the coach uses or at your condo or subdivision pool. See <Link href="/services/swimming">swimming lessons</Link>.
        </li>
        <li>
          <strong>Pickleball.</strong> Quick to start, hard to play well. A coach teaches the serve, the dink and where to stand, usually on a court you book or one they use. See <Link href="/services/pickleball">pickleball coaches</Link>.
        </li>
        <li>
          <strong>Golf.</strong> Range sessions for grip and swing first, then a few holes once you can keep the ball straight. Range and green fees are typically yours to pay.
        </li>
        <li>
          <strong>Surfing.</strong> A surf coach picks the right waves for a beginner, teaches you to pop up on the sand first, and stays with you in the water. Board rental is often a separate cost.
        </li>
        <li>
          <strong>Arts and crafts.</strong> Pottery, painting, calligraphy, crochet and more, often at the coach’s own studio where the tools already are.
        </li>
        <li>
          <strong>Music.</strong> Guitar, piano, ukulele, voice, at your home or online. A good choice for children, and for adults who stopped at age twelve.
        </li>
      </ul>

      <Figure
        src={blogPhoto("pottery-lesson")}
        alt="Two learners laugh as they shape a clay bowl together on a potter's wheel in a sunlit studio lined with shelves of pots"
        caption="An arts and crafts session at the coach's studio. Ask whether clay, glazing and firing are included in the price."
      />

      <h2>How coaches price a lesson</h2>
      <p>
        Coaches set their own prices, per session or per hour, and the price is on the service before you message anyone. What the price covers varies, so read the description:
      </p>
      <ul>
        <li>
          <strong>The coach’s time</strong> is always the core of it.
        </li>
        <li>
          <strong>The venue</strong> (court fees, pool entry, range or green fees) is usually separate unless the service says it is included.
        </li>
        <li>
          <strong>Equipment and materials</strong> (paddles, boards, clay, paint, a spare guitar) may be included for beginners, rented, or yours to bring.
        </li>
      </ul>
      <p>
        <strong>An example, with made-up numbers:</strong> a pickleball coach who charges ₱700 per session of one hour, on a court that costs ₱400 per hour to book, comes to ₱1,100 for your first lesson, or ₱700 if the court fee is included. If two of you share the session and the coach prices per session rather than per person, each of you pays half. Check how the coach counts it before you book.
      </p>

      <Callout title="Tell the coach your level, honestly">
        “Total beginner, afraid of deep water” and “I play twice a week, my backhand is the problem” are two very different first lessons. Say it in the chat, along with your goal and any injury, and the coach can plan the hour instead of spending it finding out.
      </Callout>

      <h2>Where lessons happen</h2>
      <p>Every service says how it is delivered, and that changes what you need to arrange:</p>
      <ul>
        <li>
          <strong>At your place.</strong> Music lessons in your living room, swimming at your building’s pool. Save the address in the app; it refuses an address outside the coach’s area.
        </li>
        <li>
          <strong>At the coach’s place.</strong> A studio, a court or a range the coach uses. You go to them; the address is agreed in the chat.
        </li>
        <li>
          <strong>Online.</strong> Some music and arts lessons work well on a video call. You only need a quiet corner and a stable connection.
        </li>
      </ul>
      <p>
        Booking for a child, a parent or a partner works the same way: save the address where the lesson happens with a label, such as “Lola’s house”, and say in the chat who the learner is and who will be there. Our guide on{" "}
        <Link href="/blog/booking-a-service-for-someone-else">booking a service for someone else</Link> covers the details.
      </p>

      <h2>How to book a first lesson</h2>
      <Steps
        steps={[
          {
            icon: Search,
            title: "Find a coach",
            text: "Browse lessons or a sport by city. Compare the price, the photos, where the lesson happens and the reviews from past learners.",
          },
          {
            icon: MessageCircle,
            title: "Ask before you book",
            text: "Share your level and your goal, and ask what the price covers. The coach's FAQ answers reply instantly to the common questions.",
          },
          {
            icon: CalendarCheck,
            title: "Pick a time",
            text: "Choose a slot from the service's schedule and send the request. The coach accepts or declines; an unanswered request expires after 24 hours or at its start time.",
          },
          {
            icon: Star,
            title: "Learn, pay, review",
            text: "Pay the coach directly, as agreed. Afterwards rate the coach and add up to four photos, so the next beginner can choose well.",
          },
        ]}
      />

      <h2>Making it stick</h2>
      <p>
        One lesson teaches you what you do not know; three or four make it a habit. Save the coach’s service after the first session so it is easy to book again, and book the next one while the last is still fresh. Accepted bookings have an Add to Calendar button, which helps more than willpower.
      </p>
      <p>
        Between sessions, practise the one thing the coach gave you to work on, even for ten minutes. Then open the next lesson by showing them where you are. Coaches can plan a better hour around real progress than around a fresh start every week, and you will feel the difference by the third session.
      </p>
      <p>
        Every coach on Phriend has verified their identity with a government ID and a selfie, and some add certificates or licences that earn a badge once the Phriend team approves them. Read more on <Link href="/safety">how Phriend checks providers</Link>, then pick the thing you have been meaning to learn and book the first hour.
      </p>
    </>
  );
}
