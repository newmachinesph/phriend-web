import type { Metadata } from "next";
import Link from "next/link";
import { Callout, Legal } from "@/components/legal";
import { LAST_UPDATED, pageMeta } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Trust, safety and transaction rules",
  description:
    "How Phriend checks providers, how bookings and payments work, the scam red flags to watch for, late arrivals, cancellations, and how to report a problem.",
  path: "/safety",
});

export default function SafetyPage() {
  return (
    <Legal
      eyebrow="Safety"
      title="Trust, safety and transaction rules"
      path="/safety"
      updated={LAST_UPDATED}
      summary="Every provider is verified by our team, and document badges show what else was checked. Agree the price, the time and what is included in the chat and the booking, so both sides have the record. Payment is agreed with the provider and paid to them directly; never pay more upfront than you agreed in the chat, and only to the account the provider gave you there. Late by more than 30 minutes or cancelled late: anything already paid is refunded. Report anything that breaks these rules."
      intro="These rules apply to every member, clients and providers alike. They are short on purpose. Breaking them gets an account removed. Phriend is a platform only: it is not a party to any booking or payment and is not liable for any loss, injury, dispute, unpaid balance or harm between members. You use the service at your own risk."
    >
      <h2>1. Verified providers and document badges</h2>
      <p>
        Before a provider gets the <strong>Verified</strong> badge, our team checks a government ID and a selfie of them
        holding it. Providers can also submit an NBI clearance, a police clearance, a barangay certificate, certificates,
        business documents or proof of address; each one our team approves shows as its own badge on the
        provider&apos;s profile. Not every provider needs every document, so look for the badges that matter for the job.
        A person approves every listing before it goes live.
      </p>
      <p>
        Verification confirms that a document matched a person on a given day. It is not a guarantee of anyone&apos;s
        work or behaviour, which is why reviews and the rules below matter too.
      </p>

      <h2>2. Where services happen</h2>
      <p>
        Every service says how it is done: <strong>online</strong> (over video call, phone or shared files),{" "}
        <strong>in person</strong>, or <strong>hybrid</strong>. An in-person service also says where: at your place, at the
        provider&apos;s place, or either, and the area it covers. Book only what the service lists; if a member asks to move
        a booking somewhere else, agree it in the chat first.
      </p>
      <p>For a service at your address:</p>
      <ul>
        <li>Pick one of your saved addresses when you book. It is shared with the provider for that booking only.</li>
        <li>Check that the person at the door is the verified provider you booked: the name and photo on the booking.</li>
        <li>Providers: if anything about a booking is not what was agreed, you may decline to start it and report it in the app.</li>
      </ul>

      <h2>3. Payments: agreed with the provider, paid to them directly</h2>
      <ul>
        <li>
          Agree on the price, the time and what is included <strong>in the chat and in the booking</strong>, so both sides
          have a record. The price on the service, per job, per hour or per session, is the starting point.
        </li>
        <li>
          How and when you pay is agreed with the provider: cash, e-wallet such as GCash or Maya, or bank transfer. Many
          providers explain it in their FAQ answers.
        </li>
        <li>
          <strong>Never pay more upfront than what was agreed in the chat.</strong> No member may ask for a
          &quot;reservation fee&quot; on top of the agreed price, or for money the chat does not show. A member who does is
          breaking the rules: do not pay, and report them.
        </li>
        <li>
          Phriend does not process payments and does not hold money. Payments happen directly between the client and the
          provider.
        </li>
        <li>On a team booking, payment is agreed with the team lead, who is responsible for the team&apos;s terms.</li>
      </ul>

      <h2>4. Before you send money: the red flags</h2>
      <ul>
        <li>
          <strong>Pay only once the booking is agreed in the app</strong>, with a date, a time and the price, never from a
          profile line alone.
        </li>
        <li>
          <strong>Send only to the account the provider gave you in the Phriend chat, under their own name.</strong> A
          relative&apos;s account, a &quot;company&quot; account, a different number, a link, or a QR code sent by SMS or
          Messenger is a scam. Stop, do not pay, and report the member.
        </li>
        <li>
          <strong>No fees on top.</strong> &quot;Reservation fee&quot;, &quot;processing fee&quot;, &quot;just send the rest now
          so it is settled&quot;: all red flags.
        </li>
        <li>
          <strong>Keep the conversation in the app.</strong> Someone who pushes to move to Messenger, Telegram or WhatsApp
          before a first booking is moving you away from the record.
        </li>
        <li>
          <strong>Look at the track record.</strong> Reviews, completed bookings and document badges all show on the
          profile. A brand-new provider asking for a large transfer deserves more caution.
        </li>
        <li>
          <strong>If the provider does not show up,</strong> mark the booking as a no-show. Two no-shows limit an account
          until Phriend reviews it. Report it as well if you sent money; Phriend can act on the account.
        </li>
      </ul>

      <h2>5. For providers: protecting yourself from no-shows</h2>
      <ul>
        <li>
          If you need a deposit, say so before the booking, in the service description or your FAQ answers, and agree the
          amount and your own account in the chat. A client who reads these rules will expect exactly that.
        </li>
        <li>
          If the client cancels within 24 hours or does not show, you may keep a deposit that was agreed in the chat, and
          you mark the no-show in the booking. Two no-shows limit the client&apos;s ability to book.
        </li>
        <li>
          Never ask for more than what was agreed, for a fee on top, or for money outside the chat. Those lines get a
          listing taken down.
        </li>
      </ul>

      <h2>6. Report and block</h2>
      <p>
        Every profile and job post has a report button, and the chat menu leads to it. Use it for anything that
        breaks these rules or the <Link href="/community-guidelines">community guidelines</Link>: off-platform payment
        requests, fees nobody agreed, harassment, impersonation, a service that is not what it says, or anything sexual or
        illegal. You can attach up to 4 photos as evidence. Blocking, from the chat menu, hides the member&apos;s profile and
        chats and stops their messages reaching you. Reports get an automated first pass; anything unclear goes to one of
        our moderators, and serious cases are passed to the authorities.
      </p>

      <h2>7. Late arrivals</h2>
      <ul>
        <li>
          If either side is more than <strong>30 minutes late</strong> without notice, the other may cancel the booking.
        </li>
        <li>If the provider is the one late, anything already paid is refunded in full.</li>
        <li>
          If the client is the one late and the provider waited, a service priced per hour still counts from the agreed
          start time.
        </li>
      </ul>

      <h2>8. Cancellations</h2>
      <ul>
        <li>
          Cancel at least <strong>24 hours</strong> before the booking: cancel it in the app with a reason, and say so in
          the chat.
        </li>
        <li>
          If the client cancels with less than 24 hours&apos; notice, the provider may keep a deposit that was agreed in the
          chat.
        </li>
        <li>
          If the provider cancels with less than 24 hours&apos; notice, anything already paid is refunded in full. Repeated
          late cancellations lead to removal.
        </li>
        <li>
          Cancellations because of typhoons, floods or any other safety concern are refunded in full, no questions asked.
        </li>
      </ul>

      <h2>9. Emergencies</h2>
      <Callout>
        <p className="mb-2 font-extrabold text-ink">If you are in danger, call for help first and report to Phriend later.</p>
        <ul className="mb-0">
          <li>
            <strong>911</strong>: the national emergency hotline for police, fire and medical emergencies.
          </li>
          <li>
            <strong>PNP hotline</strong>: 911, or text 0998 598 8888.
          </li>
          <li>Contact your nearest police station or barangay hall for local assistance.</li>
        </ul>
      </Callout>
      <p>
        After you are safe, report the member in the app and email <a href="mailto:support@phriend.app">support@phriend.app</a>{" "}
        with the profile name and what happened. We cooperate with law enforcement.
      </p>

      <h2>10. The short version</h2>
      <ol>
        <li>Book verified providers, and check the document badges that matter for the job.</li>
        <li>Agree the price, the time and what is included in the chat and the booking.</li>
        <li>Pay the provider directly, as agreed, and only to the account they gave you in the chat.</li>
        <li>Never pay more upfront than agreed, and never a fee on top.</li>
        <li>Report anything that breaks these rules.</li>
      </ol>
    </Legal>
  );
}
