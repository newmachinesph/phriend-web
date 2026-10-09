import type { Metadata } from "next";
import Link from "next/link";
import { Callout, Legal } from "@/components/legal";
import { LAST_UPDATED, pageMeta } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Community guidelines: what Phriend allows",
  description:
    "What's allowed on Phriend and what isn't: legitimate local services and activities only. No romantic or sexual services, no dating, no escort services.",
  path: "/community-guidelines",
});

export default function CommunityGuidelinesPage() {
  return (
    <Legal
      eyebrow="Community"
      title="Community guidelines"
      path="/community-guidelines"
      updated={LAST_UPDATED}
      summary="Phriend is for legitimate local services and activities booked by the hour between adults, in public places or at the client's home for home services: guided tours, photo and video shoots, tutoring and lessons, hiking, driving, errands and the like. Any sexual or romantic service, compensated dating, escort services, drugs, private-place meetups, scams and impersonation are banned and get an account removed immediately, with a report to the authorities where the law requires it."
      intro="Phriend is for legitimate local services: work and activities you book by the hour, done in public or at the client's home, between adults. This page says exactly what that means."
    >
      <h2>1. What Phriend is for</h2>
      <p>
        A Phriend is a local you book and pay by the hour for a service or an activity: a tour, a shoot, a lesson, a
        hike, a drive, an errand. The relationship is professional and public. If you would not do it in front of your
        parents or a police officer, it does not belong on Phriend.
      </p>

      <h2>2. Allowed activities</h2>
      <ul>
        <li>Food tours, market and street-food guiding, cooking lessons</li>
        <li>City tours, local guiding, out-of-town day trips, beach and island trips</li>
        <li>Hiking and trail guiding, camping, personal training, sports coaching</li>
        <li>Photography, videography and content creation work</li>
        <li>Event, wedding and convention coverage, hosting and on-site help</li>
        <li>Driving, riding and airport transfers</li>
        <li>Tutoring, lessons, language practice, consulting and coaching</li>
        <li>Errands, shopping runs, queueing, moving and delivery help</li>
        <li>Hospital and clinic assistance, elderly care help, waiting-room assistance</li>
        <li>Dog walking and pet sitting</li>
        <li>Online sessions such as tutoring or language practice over video call</li>
      </ul>
      <p>
        If your idea is not on the list but is a legal, professional service done in public or at the client&apos;s home, it is probably
        fine. When in doubt, email <a href="mailto:support@phriend.app">support@phriend.app</a> before posting.
      </p>

      <h2>3. Prohibited</h2>
      <p>The following are banned. Offering, requesting or hinting at any of them gets an account removed.</p>
      <ul>
        <li>
          <strong>Any sexual or romantic service.</strong> This includes anything &quot;intimate&quot;, &quot;private&quot;,
          &quot;special&quot;, cuddling, massage, or any physical contact beyond a normal greeting.
        </li>
        <li>
          <strong>Compensated dating.</strong> Phriend is not a dating service. Any arrangement where romance,
          affection or intimacy is exchanged for money, gifts or favours is banned.
        </li>
        <li>
          <strong>Escort services</strong> of any kind, including &quot;overnight&quot; bookings, trips with shared
          rooms, or hotel meetups.
        </li>
        <li>
          <strong>Drugs</strong>: buying, selling, using or being under the influence during a meetup.
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
          <strong>Off-platform payment scams</strong>: asking for more than 50% upfront, asking for payment to an
          account not shared in the chat, sending payment links or QR codes outside the app, or requesting gift cards
          and crypto.
        </li>
        <li>Meetups in hotel rooms, overnight stays or the Phriend&apos;s own place, and home visits for anything that is not a home service.</li>
        <li>Fake reviews, fake profiles, and multiple accounts for the same person.</li>
      </ul>

      <h2>4. Profiles and photos</h2>
      <ul>
        <li>Use recent photos of yourself. No swimsuit, lingerie or suggestive photos.</li>
        <li>Describe what you actually offer, at the rate you actually charge.</li>
        <li>No phone numbers, social handles or payment details in your public Phriend profile. Share them in the chat instead.</li>
      </ul>

      <h2>5. Teams</h2>
      <p>
        A team is a few ID-verified Phriends who offer a service together, for example a guide, a photographer and a
        driver for one day out. Every member follows the same rules as on their own profile.
      </p>
      <ul>
        <li>
          The team lead is responsible for the team page: the members, roles, prices and payment terms must be real and
          accurate.
        </li>
        <li>
          One booking covers the members named on it. If anyone else turns up, do not proceed: leave and report, as on
          any booking.
        </li>
        <li>
          The downpayment, at most 50% and paid in cash, in person, goes to the team lead, and the team splits it
          among themselves. Phriend never holds the money.
        </li>
        <li>Either side can cancel as with any booking. If a member cannot make it, the team lead cancels or rebooks.</li>
      </ul>

      <h2>6. Zero tolerance for objectionable content and abusive behaviour</h2>
      <p>
        <strong>Objectionable content and abusive behaviour are not tolerated on Phriend.</strong> Profiles, photos,
        gigs and chat messages pass an automated filter, and a person approves every Phriend profile before it goes
        live. Any member can report a profile, gig, review or message from the report button in the app, or by email to{" "}
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
        Use the report button on any profile or gig, or email <a href="mailto:support@phriend.app">support@phriend.app</a>.
        Tell us the profile name and what happened. Reports are confidential. See the{" "}
        <Link href="/safety">safety and transaction rules</Link> for what to do in an emergency.
      </p>
    </Legal>
  );
}
