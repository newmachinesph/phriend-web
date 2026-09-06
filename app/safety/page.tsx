import type { Metadata } from "next";
import Link from "next/link";
import { Callout, Legal } from "@/components/legal";
import { LAST_UPDATED, pageMeta } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Safety and transaction rules",
  description:
    "How Phriend meetups and payments work: public places only, 50% cash on a first meetup, e-wallet only for repeat Phriends, late arrivals and cancellations.",
  path: "/safety",
});

export default function SafetyPage() {
  return (
    <Legal
      eyebrow="Safety"
      title="Safety and transaction rules"
      path="/safety"
      updated={LAST_UPDATED}
      summary="Meet in public. Only the people agreed in the chat come along; if extra companions show up, cancel, leave and report. On a first meetup pay half in cash when you meet and half after, never more than half upfront. E-wallets are for repeat Phriends you trust, and only to the account saved in the chat. Tell a friend where you are, and report anything that feels wrong."
      intro="These rules apply to every member, on both sides of a meetup. They are short on purpose. Breaking them gets an account removed. Phriend is a platform only: it is not a party to any meetup or payment and is not liable for any loss, injury, dispute, unpaid balance or harm between members. You use the service at your own risk, and your prudence is your protection."
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

      <h2>2. Unagreed companions</h2>
      <p>
        Who is coming is agreed in the chat, like everything else. If the other member arrives with people who were not
        agreed in the chat, a friend, a &quot;cousin&quot;, a driver who stays, <strong>be prudent: do not proceed.</strong>{" "}
        Cancel the meetup, leave, and report the profile. This applies to both sides; a client who shows up with extra
        people is treated the same way.
      </p>
      <p>
        A cancellation for this reason counts as a safety concern under section 9: any downpayment already paid is
        refunded in full.
      </p>

      <h2>3. Payments: 50% at the start, 50% after</h2>
      <ul>
        <li>
          Agree on the rate per hour and the number of hours <strong>in the chat</strong>, so both sides have a record.
        </li>
        <li>
          The client pays <strong>50% at the start</strong> of the meetup and the remaining <strong>50% after</strong> it
          ends.
        </li>
        <li>
          <strong>First meetup: the 50% downpayment is handed over in cash, in person, when the members meet.</strong>{" "}
          Nothing is transferred before you have met.
        </li>
        <li>
          E-wallets (GCash, Maya) or bank transfer are for{" "}
          <strong>repeat Phriends the client has already met and trusts</strong>, for convenience. Even then, never more
          than 50% upfront, and only to the account saved in the chat.
        </li>
        <li>
          <strong>Never pay more than 50% upfront.</strong> No member may ask for full payment, a &quot;reservation
          fee&quot; on top of the downpayment, or any other advance. A member who pushes for a transfer before a first
          meetup is a red flag: be prudent and report them.
        </li>
        <li>The downpayment is deducted from the total. It is not an extra charge.</li>
        <li>
          Phriend does not process payments and does not hold money. Payments happen directly between members.
        </li>
      </ul>

      <h2>4. Pay only the account saved in the chat</h2>
      <p>
        When a transfer is appropriate, that is with a repeat Phriend you trust, the Phriend saves their GCash, Maya or
        bank account inside the chat. <strong>Send money only to that account.</strong> Any request to pay a different
        number, a relative&apos;s account, a &quot;company&quot; account, a link, a QR code sent by SMS or Messenger, or
        anything outside the chat is a scam. Stop, do not pay, and report the member.
      </p>

      <h2>5. Tell someone your plan</h2>
      <p>
        Before you go, share the meetup place, the time, the other member&apos;s profile and your expected return with a
        friend or family member. Keep your phone charged and your location sharing on. Trust your instincts: if
        something feels off, leave.
      </p>

      <h2>6. Identity verification</h2>
      <p>
        Members verify their identity and age through <strong>Didit</strong>, an independent identity verification
        provider. Didit checks a government ID and a selfie and confirms the member is 18 or older. Verified profiles
        show a blue badge. Prefer verified members, and verify yourself so others can trust you.
      </p>

      <h2>7. Report and block</h2>
      <p>
        Every profile and every chat has a report button. Use it for anything that breaks these rules or the{" "}
        <Link href="/community-guidelines">community guidelines</Link>: requests for private meetups, unagreed
        companions, romantic or sexual propositions, off-platform payment requests, harassment, impersonation, or a
        member who looks under 18. Blocking stops all contact immediately. Reports are reviewed by a person, and serious
        cases are passed to the authorities.
      </p>

      <h2>8. Late arrivals</h2>
      <ul>
        <li>
          If a member is more than <strong>30 minutes late</strong> without notice, the other member may cancel the
          meetup.
        </li>
        <li>If the Phriend is the one late, any downpayment already paid is refunded in full.</li>
        <li>
          If the client is the one late and the Phriend waited, the agreed hours still count from the agreed start
          time.
        </li>
      </ul>

      <h2>9. Cancellations</h2>
      <ul>
        <li>
          Cancel at least <strong>24 hours</strong> before the meetup, in the chat.
        </li>
        <li>
          If the client cancels with less than 24 hours&apos; notice, the Phriend may keep any downpayment already paid.
        </li>
        <li>
          If the Phriend cancels with less than 24 hours&apos; notice, any downpayment already paid is refunded in full.
          Repeated late cancellations lead to removal.
        </li>
        <li>
          Cancellations because of typhoons, floods, unagreed companions or any other safety concern are refunded in
          full, no questions asked.
        </li>
      </ul>

      <h2>10. Emergencies</h2>
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

      <h2>11. The short version</h2>
      <ol>
        <li>Meet in public.</li>
        <li>Only the people agreed in the chat. Extra companions: cancel, leave, report.</li>
        <li>First meetup: half in cash when you meet, half after. Never more than half.</li>
        <li>E-wallet only for repeat Phriends you trust, and only to the account saved in the chat.</li>
        <li>Tell a friend where you are.</li>
        <li>Report anything that feels wrong.</li>
      </ol>
    </Legal>
  );
}
