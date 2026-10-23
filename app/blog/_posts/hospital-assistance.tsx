import Link from "next/link";
import { CalendarCheck, ClipboardList, MessageCircle, Search } from "lucide-react";
import { Callout, Figure, Steps } from "@/components/blog";
import { blogPhoto } from "./photo";
import type { Post } from "./index";

export const hospitalAssistance: Post = {
  slug: "hospital-assistance-for-a-checkup",
  title: "Hospital assistance for a checkup: what the helper does from the front door to the last queue",
  description:
    "What a hospital assistance service covers on a checkup day in the Philippines: getting there, registration and queues, forms, carrying things and notes for the family. Practical help, not medical care.",
  seoTitle: "Hospital assistance for a checkup: what it covers",
  seoDescription: "Getting there, queues, forms, carrying things and notes for the family: what a hospital assistance service does on a checkup day.",
  ogTitle: "Hospital assistance for a checkup day",
  date: "2026-10-23",
  readingMinutes: 5,
  audience: "client",
  category: { slug: "hospital-assistance", path: "/services/hospital-assistance", label: "Hospital Assistance" },
  related: ["senior-care"],
  tags: ["Guides", "Hospital Assistance", "Senior parents", "Checkups"],
  hero: {
    src: blogPhoto("hospital-assistance-for-a-checkup"),
    alt: "A man in a face mask points at a floor map on the wall while a young woman beside him looks on, at the reception desk of a sunlit hospital lobby",
  },
  faqTitle: "Questions families ask",
  faq: [
    {
      q: "What does hospital assistance cover?",
      a: "Hospital assistance is practical, non-medical help on the day of an appointment. The helper travels with the patient or meets them there, lines up at registration, billing and the lab, helps with forms, carries bags and papers, and writes down what the patient wants the family to know.",
    },
    {
      q: "Is the helper a nurse?",
      a: "No, a hospital assistance provider is not booked as a nurse and does not give medical care, medicine or advice. The doctor and hospital staff handle everything medical; the helper handles the logistics around it.",
    },
    {
      q: "How long should I book for a checkup?",
      a: "Book for the whole visit, travel included, and add some margin. A consultation with a lab test or an x-ray can take most of a morning; agree in the chat what happens if the day runs longer than booked.",
    },
    {
      q: "Can I book hospital assistance for my parent if I will not be there?",
      a: "Yes, you can book for someone else at their address. Save your parent's address, book the service, and tell the provider in the chat who they are going with, which hospital and what time.",
    },
    {
      q: "How is the provider paid?",
      a: "The client pays the provider directly, as agreed in the chat. Phriend takes no commission and does not process payments.",
    },
  ],
  Body,
};

function Body() {
  return (
    <>
      <p className="lead">
        A checkup is rarely just a checkup. There is the ride to the hospital, the line at registration, a form that asks for the same details three times, a lab on another floor, a cashier with its own queue, and a doctor who runs two hours late. For a parent in their seventies, or anyone who is not feeling their best, the logistics are the tiring part.
      </p>

      <p>
        Hospital assistance on Phriend is practical help with exactly that. A provider goes with the patient to the appointment, or meets them at the entrance, and takes care of the queues, the forms, the bags and the walking between stations, then writes down what the patient wants the family to know. It is non-medical: the helper is not booked as a nurse and does not give medical care, handle medicine or explain results. The doctor does the medicine. The helper does the day.
      </p>

      <h2>What the helper does on a checkup day</h2>
      <ul>
        <li>
          <strong>Getting there.</strong> Riding with your parent in a Grab or taxi, or meeting them at the hospital entrance at an agreed time. Agree in the chat which it is and who pays the fare.
        </li>
        <li>
          <strong>Registration and queues.</strong> Getting the queue number, holding a place in line at registration, billing, the lab and the cashier, and keeping an ear out for your parent&apos;s name while they sit down.
        </li>
        <li>
          <strong>Forms and papers.</strong> Helping fill in patient information sheets from the details your parent gives, keeping the folder of past results in order, and having the PhilHealth ID, senior citizen ID and referral slip ready when the counter asks.
        </li>
        <li>
          <strong>Carrying and walking.</strong> The bag, the folder, the water, the umbrella. Walking at your parent&apos;s pace between the clinic, the lab and the x-ray, and finding the elevator instead of the stairs.
        </li>
        <li>
          <strong>Notes for the family.</strong> Writing down the next appointment date, the tests that still need scheduling and anything your parent asks to pass on, then sending it to you in the chat, with a photo of the appointment slip if that helps.
        </li>
      </ul>

      <Figure
        src={blogPhoto("hospital-assistance-waiting-room")}
        alt="An older man holds a thick folder of papers in a waiting area while the woman seated beside him writes in a notebook"
        caption="Most of a checkup day is waiting. A helper keeps the papers in order and the notes for the family as it goes."
      />

      <h2>What hospital assistance does not cover</h2>
      <p>
        Being clear about this up front makes the booking easier for everyone. A hospital assistance provider on Phriend does not:
      </p>
      <ul>
        <li>
          <strong>Give medical care.</strong> No nursing, no wound care, no checking vital signs, no lifting a patient who needs trained staff.
        </li>
        <li>
          <strong>Handle medicine.</strong> They do not give, measure or manage medicine, and they do not decide anything about it.
        </li>
        <li>
          <strong>Interpret results or advise.</strong> Questions about a diagnosis go to the doctor. If you want to hear the consultation yourself, arrange with your parent to call you from the clinic.
        </li>
      </ul>
      <p>
        If your parent needs medical care at home or during the visit, that is a job for licensed health professionals arranged through their doctor or the hospital.
      </p>

      <h2>How to book it</h2>
      <Steps
        steps={[
          {
            icon: Search,
            title: "Choose a service near the hospital",
            text: "Open Hospital Assistance and look at each service's price, area, photos and reviews. Check that the provider's area covers your parent's home or the hospital, whichever the day starts from.",
          },
          {
            icon: CalendarCheck,
            title: "Pick a time and the address",
            text: "Choose a slot from the service's schedule that starts early enough for the travel. If you are booking for a parent, pick their saved address, for example one labelled \"Papa's house\".",
          },
          {
            icon: ClipboardList,
            title: "Brief the day in the chat",
            text: "Hospital name, clinic or doctor, appointment time, which papers and IDs to bring, and how your parent gets around. Agree the price, the hours and what happens if the doctor runs late.",
          },
          {
            icon: MessageCircle,
            title: "Stay in touch on the day",
            text: "The provider accepts or declines your request. On the day, the chat is where updates and the notes for the family arrive, with photos if needed, without sharing phone numbers.",
          },
        ]}
      />

      <Callout title="Book the whole day, not the appointment time">
        A 10:00 consultation usually means leaving the house well before, waiting past 11:00, and a lab or cashier queue after. Book the hours from door to door with some margin, and agree in the chat how extra time is charged if the day runs long. A helper who has to leave at noon cannot help with the 1:00 queue.
      </Callout>

      <h2>What it costs</h2>
      <p>
        Each provider sets their own price, per hour, per job or per session, and it is shown on the service before you book. For example, a provider who charges ₱300 per hour and spends six hours on a checkup day, travel included, comes to ₱1,800. Another might price a half-day hospital visit as one job. Fares, parking and food on the day are worth agreeing in the chat before the booking, so nobody is surprised.
      </p>
      <p>
        The client pays the provider directly, as agreed. Phriend takes no commission and never holds the money, which is also why the chat matters: the price, the hours and what is included are written there for both of you.
      </p>

      <h2>When families book it</h2>
      <ul>
        <li>
          <strong>Regular checkups</strong> for a parent who lives alone or whose children work office hours.
        </li>
        <li>
          <strong>Lab days and imaging,</strong> where most of the time goes to queues on different floors.
        </li>
        <li>
          <strong>Families abroad.</strong> OFWs who cannot fly home for every appointment book a helper and get the notes in the chat that evening. Our guide to <Link href="/blog/booking-help-for-your-parents-from-abroad">booking help for your parents from abroad</Link> covers the rest of the house too.
        </li>
        <li>
          <strong>Alongside senior care help,</strong> when the same parent also needs errands or simple meals on other days. See <Link href="/blog/what-senior-care-help-covers">what senior care help covers</Link>.
        </li>
      </ul>
      <p>
        Every provider has verified their identity with a government ID and a selfie, and document badges such as an NBI clearance show on their profile once approved. Reviews come from clients after completed bookings. If you want to know what to ask before you send the request, read <Link href="/blog/questions-to-ask-before-booking-senior-care-help">questions to ask before booking senior care help</Link>; most of them apply here too. You can browse the services by city too, for example <Link href="/hospital-assistance-in-quezon-city">hospital assistance in Quezon City</Link>.
      </p>
    </>
  );
}
