import type { Metadata } from "next";
import Link from "next/link";
import { Callout, Legal } from "@/components/legal";
import { LAST_UPDATED, pageMeta } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Safety and transaction rules for meetups",
  description:
    "How Phriend meetups and payments work: public places only, a downpayment of up to 50% agreed in the chat, the rest in cash after, the red flags to watch for, late arrivals and cancellations.",
  path: "/safety",
});

export default function SafetyPage() {
  return (
    <Legal
      eyebrow="Safety"
      title="Safety and transaction rules"
      path="/safety"
      updated={LAST_UPDATED}
      summary="Meet in public. Only the people agreed in the chat come along; if extra people not agreed in chat show up, cancel, leave and report. On a first meetup pay half in cash when you meet and half after, never more than half upfront. E-wallets are for repeat Phriends you trust, and only to the account shared in the chat. Tell a friend where you are, and report anything that feels wrong."
      intro="These rules apply to every member, on both sides of a meetup. They are short on purpose. Breaking them gets an account removed. Phriend is a platform only: it is not a party to any meetup or payment and is not liable for any loss, injury, dispute, unpaid balance or harm between members. You use the service at your own risk, and your prudence is your protection."
    >
      <h2>1. Public places only</h2>
      <p>
        Every meetup happens in a public place: a mall, a cafe, a restaurant, a
        park, a trail, a gym, a hospital lobby, a venue.{" "}
        <strong>
          Never a private residence, a hotel room or a private vehicle you do
          not both trust.
        </strong>{" "}
        If a member asks to move somewhere private, decline and report them.
      </p>
      <p>
        For out-of-town trips, hikes and beach days, agree on the meeting point
        and the route in the chat before the day, and keep the group in public
        spaces throughout.
      </p>

      <h2>2. Extra people not agreed in chat</h2>
      <p>
        Who is coming is agreed in the chat, like everything else. If the other
        member arrives with people who were not agreed in the chat, a friend, a
        &quot;cousin&quot;, a driver who stays,{" "}
        <strong>be prudent: do not proceed.</strong> Cancel the meetup, leave,
        and report the profile. This applies to both sides; a client who shows
        up with extra people is treated the same way.
      </p>
      <p>
        A cancellation for this reason counts as a safety concern under section
        9: any downpayment already paid is refunded in full.
      </p>

      <h2>3. Payments: a downpayment of up to 50%, the rest in cash after</h2>
      <ul>
        <li>
          Agree on the rate and the number of hours{" "}
          <strong>in the chat and in the meetup card</strong>, so both sides
          have a record.
        </li>
        <li>
          The downpayment is the Phriend&apos;s call,{" "}
          <strong>up to 50% of the total</strong>. Many Phriends take nothing
          until you meet; some ask for 50% in cash at the start; some ask for a
          50% transfer once the meetup is agreed, so a client who never shows up
          does not cost them the fare and the evening. All three are within the
          rules.
        </li>
        <li>
          <strong>
            The remaining balance is paid in cash when the meetup ends.
          </strong>{" "}
          Never before.
        </li>
        <li>
          <strong>Never pay more than 50% before you meet.</strong> No member
          may ask for full payment in advance, a &quot;reservation fee&quot; on
          top of the downpayment, or any other advance. A member who does is
          breaking the rules: do not pay, and report them.
        </li>
        <li>
          The downpayment is deducted from the total. It is not an extra charge.
        </li>
        <li>
          Phriend does not process payments and does not hold money. Payments
          happen directly between members.
        </li>
      </ul>

      <h2>4. Before you send a downpayment: the red flags</h2>
      <p>
        The app shows this checklist every time you book, and it is worth
        reading every time. A scam works in the two minutes between
        &quot;agreed&quot; and &quot;sent&quot;.
      </p>
      <ul>
        <li>
          <strong>Pay only after the meetup is agreed in the chat</strong>, with
          a date, a time and a public place, and only from the meetup card or
          the chat, never from a profile line alone.
        </li>
        <li>
          <strong>
            Send only to the e-wallet the Phriend shares in the chat, under
            their own name.
          </strong>{" "}
          A relative&apos;s account, a &quot;company&quot; account, a different
          number, a link, or a QR code sent by SMS or Messenger is a scam. Stop,
          do not pay, and report the member.
        </li>
        <li>
          <strong>Never more than 50%, never a fee on top.</strong> &quot;Full
          payment first&quot;, &quot;reservation fee&quot;, &quot;just send the
          rest now so it is settled&quot;: all red flags.
        </li>
        <li>
          <strong>Keep the conversation in the app until you have met.</strong>{" "}
          Someone who pushes to move to Messenger, Telegram or WhatsApp before a
          first meetup is moving you away from the record.
        </li>
        <li>
          <strong>Look at the track record.</strong> Profiles show completed
          meetups and no-shows. A brand-new profile asking for a transfer
          deserves more caution than one with twenty completed meetups.
        </li>
        <li>
          <strong>If the Phriend does not show up,</strong> mark the meetup as a
          no-show in the booking. Two no-shows limit an account until the team
          reviews it. Report it as well if you sent a downpayment; the team can
          act on the account.
        </li>
      </ul>

      <h2>4b. For Phriends: protecting yourself from no-shows</h2>
      <ul>
        <li>
          You may ask for a downpayment of up to 50% once the meetup is agreed
          in the chat. State the amount and your own e-wallet name plainly; a
          client who reads the checklist will expect exactly that.
        </li>
        <li>
          If the client cancels within 24 hours or does not show, you keep the
          downpayment and you mark the no-show in the booking. Two no-shows
          limit the client&apos;s ability to book.
        </li>
        <li>
          Never ask for more than 50% before you meet, for a fee on top, or for
          money outside the chat. Those lines get a profile taken down.
        </li>
      </ul>

      <h2>5. Tell someone your plan</h2>
      <p>
        Before you go, share the meetup place, the time, the other member&apos;s
        profile and your expected return with a friend or family member. Keep
        your phone charged and your location sharing on. Trust your instincts:
        if something feels off, leave.
      </p>

      <h2>6. Identity verification</h2>
      <p>
        Members verify their identity and age through <strong>Didit</strong>, an
        independent identity verification provider. Didit checks a government ID
        and a selfie and confirms the member is 18 or older. Verified profiles
        show a blue badge. Prefer verified members, and verify yourself so
        others can trust you.
      </p>

      <h2>7. Report and block</h2>
      <p>
        Every profile and every gig has a report button, and the chat menu leads
        to it. Use it for anything that breaks these rules or the{" "}
        <Link href="/community-guidelines">community guidelines</Link>: requests
        for private meetups, extra people not agreed in chat, romantic or sexual
        propositions, off-platform payment requests, harassment, impersonation,
        or a member who looks under 18. You can attach up to 4 photos as
        evidence. Blocking, from the chat menu, hides the member&apos;s profile
        and chats and stops their messages reaching you. Reports get an AI first
        pass; anything unclear goes to a person on the moderation team, and
        serious cases are passed to the authorities.
      </p>

      <h2>8. Late arrivals</h2>
      <ul>
        <li>
          If a member is more than <strong>30 minutes late</strong> without
          notice, the other member may cancel the meetup.
        </li>
        <li>
          If the Phriend is the one late, any downpayment already paid is
          refunded in full.
        </li>
        <li>
          If the client is the one late and the Phriend waited, the agreed hours
          still count from the agreed start time.
        </li>
      </ul>

      <h2>9. Cancellations</h2>
      <ul>
        <li>
          Cancel at least <strong>24 hours</strong> before the meetup: cancel
          the booking in the app with a reason, and say so in the chat.
        </li>
        <li>
          If the client cancels with less than 24 hours&apos; notice, the
          Phriend may keep any downpayment already paid.
        </li>
        <li>
          If the Phriend cancels with less than 24 hours&apos; notice, any
          downpayment already paid is refunded in full. Repeated late
          cancellations lead to removal.
        </li>
        <li>
          Cancellations because of typhoons, floods, extra people not agreed in
          chat or any other safety concern are refunded in full, no questions asked.
        </li>
      </ul>

      <h2>10. Emergencies</h2>
      <Callout>
        <p className="mb-2 font-extrabold text-ink">
          If you are in danger, call for help first and report to Phriend later.
        </p>
        <ul className="mb-0">
          <li>
            <strong>911</strong>: national emergency hotline, connects to the
            Philippine National Police.
          </li>
          <li>
            <strong>PNP hotline</strong>: 911, or text 0998 598 8888.
          </li>
          <li>
            Contact your nearest police station or barangay hall for local
            assistance.
          </li>
        </ul>
      </Callout>
      <p>
        After you are safe, report the member in the app and email{" "}
        <a href="mailto:support@phriend.app">support@phriend.app</a> with the
        profile name and what happened. We cooperate with law enforcement.
      </p>

      <h2>11. The short version</h2>
      <ol>
        <li>Meet in public.</li>
        <li>
          Only the people agreed in the chat. Extra people not agreed in chat:
          cancel, leave, report.
        </li>
        <li>
          First meetup: half in cash when you meet, half after. Never more than
          half.
        </li>
        <li>
          E-wallet only for repeat Phriends you trust, and only to the account
          shared in the chat.
        </li>
        <li>Tell a friend where you are.</li>
        <li>Report anything that feels wrong.</li>
      </ol>
    </Legal>
  );
}
