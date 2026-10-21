import type { Metadata } from "next";
import Link from "next/link";
import { Callout, Legal } from "@/components/legal";
import { LAST_UPDATED, pageMeta } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Community guidelines: what Phriend allows",
  description:
    "What's allowed on Phriend and what isn't: legitimate local services only. No sexual services, no paid romance or escort services, no scams.",
  path: "/community-guidelines",
});

export default function CommunityGuidelinesPage() {
  return (
    <Legal
      eyebrow="Community"
      title="Community guidelines"
      path="/community-guidelines"
      updated={LAST_UPDATED}
      summary="Phriend is for legitimate local services between adults, done online or in person: aircon cleaning and repairs, appliance check-ups, bookkeeping and tax filing, tutoring, photo and video, driving, errands and the like. Any sexual service, paid romance or intimacy, escort services, drugs, scams and impersonation are banned and get an account removed immediately, with a report to the authorities where the law requires it."
      intro="Phriend is for legitimate local services: work you book from a verified provider, done online or in person, between adults. This page says exactly what that means."
    >
      <h2>1. What Phriend is for</h2>
      <p>
        A service on Phriend is work you book from a provider: a repair, a cleaning, a lesson, a shoot, a tax filing, a
        drive, an errand. The relationship is professional. If you would not do it in front of your parents or a police
        officer, it does not belong on Phriend.
      </p>

      <h2>2. Allowed services</h2>
      <ul>
        <li>Aircon cleaning and repair, appliance check-ups and repair, plumbing, electrical and handyman work</li>
        <li>Home cleaning, laundry and ironing, moving help</li>
        <li>Bookkeeping, tax filing, virtual assistance, graphic design, social media management and consulting</li>
        <li>Tutoring, lessons, language classes and coaching, online or in person</li>
        <li>Photography, videography and content creation work</li>
        <li>Event coordination, hosting, hair and makeup, catering and baking</li>
        <li>Driving, airport transfers, errands, deliveries and queueing</li>
        <li>Tour guiding, hiking and trip guiding</li>
        <li>Hospital and clinic assistance, senior care help</li>
        <li>Pet care, grooming and dog training</li>
        <li>Car wash and detailing, mechanics and motorcycle repair</li>
      </ul>
      <p>
        If your service is not on the list but is a legal, professional service, it is probably fine. When in doubt, email{" "}
        <a href="mailto:support@phriend.app">support@phriend.app</a> before listing it.
      </p>

      <h2>3. Prohibited</h2>
      <p>The following are banned. Offering, requesting or hinting at any of them gets an account removed.</p>
      <ul>
        <li>
          <strong>Any sexual or romantic service.</strong> This includes anything &quot;intimate&quot;, &quot;private&quot;,
          &quot;special&quot;, cuddling, massage, or any physical contact beyond a normal greeting.
        </li>
        <li>
          <strong>Paid romance or intimacy.</strong> Any arrangement where romance, affection or intimacy is
          exchanged for money, gifts or favours is banned.
        </li>
        <li>
          <strong>Escort services</strong> of any kind, including &quot;overnight&quot; bookings, trips with shared
          rooms, or hotel-room bookings.
        </li>
        <li>
          <strong>Drugs</strong>: buying, selling, using or being under the influence during a booking.
        </li>
        <li>
          <strong>Alcohol with minors.</strong> Phriend is 18+, and any listing built around drinking that targets or
          involves anyone under 18 is banned. Drinking is never the point of a booking, and a member who is drunk may
          be asked to leave.
        </li>
        <li>
          <strong>Anything illegal under Philippine law</strong>, including gambling arrangements, smuggling, fraud
          and human trafficking.
        </li>
        <li>
          <strong>Harassment</strong>: unwanted contact, threats, stalking, hate speech, or sharing someone&apos;s
          private information.
        </li>
        <li>
          <strong>Impersonation</strong>: using someone else&apos;s photos, name or ID, or pretending to be a company
          or a Phriend staff member.
        </li>
        <li>
          <strong>Off-platform payment scams</strong>: asking for more upfront than was agreed in the chat, adding fees
          nobody agreed, asking for payment to an account not shared in the chat, sending payment links or QR codes
          outside the app, or requesting gift cards and crypto.
        </li>
        <li>
          <strong>Listings that sell a person&apos;s company rather than a service</strong>, and any booking where the
          service is a pretext for something else, including hotel-room bookings and overnight stays.
        </li>
        <li>Fake reviews, fake profiles, and multiple accounts for the same person.</li>
      </ul>

      <h2>4. Profiles and photos</h2>
      <ul>
        <li>
          Use a recent, clear photo of your face for your profile, and real photos of your own work on your services. No
          swimsuit, lingerie or suggestive photos.
        </li>
        <li>Describe what you actually offer, at the price you actually charge.</li>
        <li>No emojis in your title, About me or service descriptions.</li>
        <li>
          No phone numbers, social handles or payment details in your public profile or services. Share them in the chat
          instead.
        </li>
      </ul>

      <h2>5. Teams</h2>
      <p>
        A team is a few verified providers who offer a service together, for example a photographer, a videographer and
        a host for one event. Every member follows the same rules as on their own profile.
      </p>
      <ul>
        <li>
          The team lead is responsible for the team page: the members, roles, prices and payment terms must be real and
          accurate.
        </li>
        <li>One booking covers the members named on it.</li>
        <li>
          Payment is agreed with the team lead in the chat and paid to the team directly, and the team splits it among
          themselves. Phriend never holds the money.
        </li>
        <li>Either side can cancel as with any booking. If a member cannot make it, the team lead cancels or rebooks.</li>
      </ul>

      <h2>6. Zero tolerance for objectionable content and abusive behaviour</h2>
      <p>
        <strong>Objectionable content and abusive behaviour are not tolerated on Phriend.</strong> Profiles, services,
        photos, job posts and chat messages pass automated checks, and anything uncertain goes to a person before it goes
        live. Any member can report a profile, job post, review or message from the report button in the app, or by email to{" "}
        <a href="mailto:support@phriend.app">support@phriend.app</a>, and can block another member instantly from the
        chat. <strong>We review every report within 24 hours</strong>, remove the offending content, and remove the
        account of any member who breaks these rules. There is no warning for the items in section 3.
      </p>

      <h2>7. Consequences</h2>
      <Callout>
        <p className="mb-0">
          Breaking these guidelines leads to <strong>immediate removal</strong> of the account and any related accounts.
          Where the law requires it, or where someone&apos;s safety is at risk, we <strong>report to the authorities</strong>{" "}
          and cooperate fully with investigations.
        </p>
      </Callout>
      <p>
        There is no warning system for the prohibited items in section 3. Offensive language in chat is refused
        automatically: the first two attempts only warn, then the sender is muted for 1 hour, 24 hours, 7 days and 30
        days in turn, and our moderators review every flag and can ban. For other lesser issues such as a late
        cancellation, we may warn first, then suspend, then remove.
      </p>

      <h2>8. Reporting</h2>
      <p>
        Use the report button on any profile or job post, or email <a href="mailto:support@phriend.app">support@phriend.app</a>.
        Tell us the profile name and what happened. Reports are confidential. See the{" "}
        <Link href="/safety">trust, safety and transaction rules</Link> for what to do in an emergency.
      </p>
    </Legal>
  );
}
