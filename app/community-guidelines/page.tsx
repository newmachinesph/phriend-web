import type { Metadata } from "next";
import Link from "next/link";
import { Callout, Legal } from "@/components/legal";
import { LAST_UPDATED } from "@/lib/site";

export const metadata: Metadata = {
  title: "Community guidelines",
  description:
    "What is allowed on Phriend and what is not. Strictly legit side gigs: no sexual or romantic services, no compensated dating, no escort services, nothing illegal under Philippine law.",
  alternates: { canonical: "/community-guidelines" },
};

export default function CommunityGuidelinesPage() {
  return (
    <Legal
      eyebrow="Community"
      title="Community guidelines"
      updated={LAST_UPDATED}
      intro="Phriend is for strictly legitimate side gigs: paid-by-the-hour company and help, in public, between adults. This page says exactly what that means."
    >
      <h2>1. What Phriend is for</h2>
      <p>
        A Phriend is a local you pay per hour for a platonic activity or a legit service. The relationship is
        friendly, professional and public. If you would not do it in front of your parents or a police officer, it
        does not belong on Phriend.
      </p>

      <h2>2. Allowed activities</h2>
      <ul>
        <li>Food trips, cafe hopping, restaurant company, cooking together</li>
        <li>City tours, local guiding, out-of-town day trips, beach and island trips</li>
        <li>Hiking, camping, workouts, gym partners, sports and games</li>
        <li>Photography, videography and content creation help</li>
        <li>Concerts, events, weddings, parties and conventions as a plus-one or companion</li>
        <li>Karaoke, movies, board games, video games in public venues</li>
        <li>Tutoring, study buddies, language exchange, consulting and coaching</li>
        <li>Errands, shopping company, queueing, moving help</li>
        <li>Hospital companions, elderly care company, waiting-room company</li>
        <li>Pet buddies, dog walking company</li>
        <li>Virtual meetups such as language practice or study sessions over video call</li>
      </ul>
      <p>
        If your idea is not on the list but is legal, platonic and happens in public, it is probably fine. When in
        doubt, email <a href="mailto:support@phriend.app">support@phriend.app</a> before posting.
      </p>

      <h2>3. Prohibited</h2>
      <p>The following are banned. Offering, requesting or hinting at any of them gets an account removed.</p>
      <ul>
        <li>
          <strong>Any sexual or romantic service.</strong> This includes anything &quot;intimate&quot;, &quot;private&quot;,
          &quot;special&quot;, cuddling, massage, or any physical contact beyond a normal greeting.
        </li>
        <li>
          <strong>Compensated dating</strong> and any arrangement where romance, affection or companionship of a
          sexual nature is exchanged for money, gifts or favours.
        </li>
        <li>
          <strong>Escort services</strong> of any kind, including &quot;overnight&quot;, &quot;travel companion&quot; with
          shared rooms, or hotel meetups.
        </li>
        <li>
          <strong>Drugs</strong>: buying, selling, using or being under the influence during a meetup.
        </li>
        <li>
          <strong>Alcohol with minors.</strong> Phriend is 18+, and &quot;drinking buddy&quot; posts that target or
          involve anyone under 18 are banned. Drinking is never the point of a meetup, and a member who is drunk may be
          asked to leave.
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
          account not saved in the chat, sending payment links or QR codes outside the app, or requesting gift cards
          and crypto.
        </li>
        <li>Meetups in private residences, hotel rooms or other private places.</li>
        <li>Fake reviews, fake profiles, and multiple accounts for the same person.</li>
      </ul>

      <h2>4. Profiles and photos</h2>
      <ul>
        <li>Use recent photos of yourself. No swimsuit, lingerie or suggestive photos.</li>
        <li>Describe what you actually offer, at the rate you actually charge.</li>
        <li>No phone numbers, social handles or payment details in public posts. Share them in the chat instead.</li>
      </ul>

      <h2>5. Consequences</h2>
      <Callout>
        <p className="mb-0">
          Breaking these guidelines leads to <strong>immediate removal</strong> of the account and any related accounts.
          Where the law requires it, or where someone&apos;s safety is at risk, we <strong>report to the authorities</strong>{" "}
          and cooperate fully with investigations.
        </p>
      </Callout>
      <p>
        There is no warning system for the prohibited items in section 3. For lesser issues such as a rude message or
        a late cancellation, we may warn first, then suspend, then remove.
      </p>

      <h2>6. Reporting</h2>
      <p>
        Use the report button on any profile or chat, or email <a href="mailto:support@phriend.app">support@phriend.app</a>.
        Tell us the profile name and what happened. Reports are confidential. See the{" "}
        <Link href="/safety">safety and transaction rules</Link> for what to do in an emergency.
      </p>
    </Legal>
  );
}
