import type { Metadata } from "next";
import Link from "next/link";
import { Callout, Legal } from "@/components/legal";
import { LAST_UPDATED } from "@/lib/site";

export const metadata: Metadata = {
  title: "Safety and transaction rules",
  description:
    "How Phriend meetups and payments work: public places only, 50% downpayment and 50% after, pay only the account saved in chat, ID verification, and what to do when someone is late or cancels.",
  alternates: { canonical: "/safety" },
};

export default function SafetyPage() {
  return (
    <Legal
      eyebrow="Safety"
      title="Safety and transaction rules"
      updated={LAST_UPDATED}
      intro="These rules apply to every member, on both sides of a meetup. They are short on purpose. Breaking them gets an account removed."
    >
      <h2>1. Public places only</h2>
      <p>
        Every meetup happens in a public place: a mall, a cafe, a restaurant, a park, a trail, a gym, a hospital lobby, a
        venue. <strong>Never a private residence, a hotel room or a private vehicle you do not both trust.</strong> If a
        member asks to move somewhere private, decline and report them.
      </p>
      <p>
        For out-of-town trips, hikes and beach days, agree on the meeting point and the route in the chat before the
        day, and keep the group in public spaces throughout.
      </p>

      <h2>2. Payments: 50% before, 50% after</h2>
      <ul>
        <li>
          Agree on the rate per hour and the number of hours <strong>in the chat</strong>, so both sides have a record.
        </li>
        <li>
          The client sends a <strong>50% downpayment</strong> via GCash, Maya or bank transfer before the meetup, and
          the remaining <strong>50% after</strong> the meetup ends.
        </li>
        <li>
          <strong>Never send more than 50% upfront.</strong> No member may ask for full payment, a &quot;reservation
          fee&quot; on top of the downpayment, or any other advance.
        </li>
        <li>The downpayment is deducted from the total. It is not an extra charge.</li>
        <li>
          Phriend does not process payments and does not hold money. Payments happen directly between members.
        </li>
      </ul>

      <h2>3. Pay only the account saved in the chat</h2>
      <p>
        A Phriend saves their GCash, Maya or bank account inside the chat. <strong>Send money only to that account.</strong>{" "}
        Any request to pay a different number, a relative&apos;s account, a &quot;company&quot; account, a link, a QR code
        sent by SMS or Messenger, or anything outside the chat is a scam. Stop, do not pay, and report the member.
      </p>

      <h2>4. Tell someone your plan</h2>
      <p>
        Before you go, share the meetup place, the time, the other member&apos;s profile and your expected return with a
        friend or family member. Keep your phone charged and your location sharing on. Trust your instincts: if
        something feels off, leave.
      </p>

      <h2>5. Identity verification</h2>
      <p>
        Members verify their identity and age through <strong>Didit</strong>, an independent identity verification
        provider. Didit checks a government ID and a selfie and confirms the member is 18 or older. Verified profiles
        show a blue badge. Prefer verified members, and verify yourself so others can trust you.
      </p>

      <h2>6. Report and block</h2>
      <p>
        Every profile and every chat has a report button. Use it for anything that breaks these rules or the{" "}
        <Link href="/community-guidelines">community guidelines</Link>: requests for private meetups, romantic or
        sexual propositions, off-platform payment requests, harassment, impersonation, or a member who looks under 18.
        Blocking stops all contact immediately. Reports are reviewed by a person, and serious cases are passed to the
        authorities.
      </p>

      <h2>7. Late arrivals</h2>
      <ul>
        <li>
          If a member is more than <strong>30 minutes late</strong> without notice, the other member may cancel the
          meetup.
        </li>
        <li>If the Phriend is the one late, they refund the downpayment in full.</li>
        <li>
          If the client is the one late and the Phriend waited, the agreed hours still count from the agreed start
          time.
        </li>
      </ul>

      <h2>8. Cancellations</h2>
      <ul>
        <li>
          Cancel at least <strong>24 hours</strong> before the meetup, in the chat.
        </li>
        <li>If the client cancels with less than 24 hours&apos; notice, the Phriend may keep the downpayment.</li>
        <li>
          If the Phriend cancels with less than 24 hours&apos; notice, they refund the downpayment in full. Repeated
          late cancellations lead to removal.
        </li>
        <li>Cancellations because of typhoons, floods, or a safety concern are refunded in full, no questions asked.</li>
      </ul>

      <h2>9. Emergencies</h2>
      <Callout>
        <p className="mb-2 font-extrabold text-ink">If you are in danger, call for help first and report to Phriend later.</p>
        <ul className="mb-0">
          <li>
            <strong>911</strong>: national emergency hotline, connects to the Philippine National Police.
          </li>
          <li>
            <strong>PNP hotline</strong>: 911, or text 0998 598 8888.
          </li>
          <li>Contact your nearest police station or barangay hall for local assistance.</li>
        </ul>
      </Callout>
      <p>
        After you are safe, report the member in the app and email{" "}
        <a href="mailto:support@phriend.app">support@phriend.app</a> with the profile name and what happened. We
        cooperate with law enforcement.
      </p>

      <h2>10. The short version</h2>
      <ol>
        <li>Meet in public.</li>
        <li>Half before, half after, never more than half.</li>
        <li>Pay only the account saved in the chat.</li>
        <li>Tell a friend where you are.</li>
        <li>Report anything that feels wrong.</li>
      </ol>
    </Legal>
  );
}
