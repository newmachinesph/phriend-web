import type { Metadata } from "next";
import Link from "next/link";
import { Callout, Legal } from "@/components/legal";
import { CONTACT_EMAIL, LAST_UPDATED, pageMeta } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Terms of Use for the Phriend platform",
  description:
    "Terms for using Phriend, a platform for adults in the Philippines to book local services and activities by the hour. Not a party to any booking or payment.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <Legal
      eyebrow="Legal"
      title="Terms of Use"
      path="/terms"
      updated={LAST_UPDATED}
      summary="Phriend is a listing, messaging and booking platform for adults (18+) in the Philippines to book local services and activities by the hour: guided tours, photo and video shoots, tutoring and lessons, hikes, driving, errands and similar work. Phriend is not a party to any booking or payment, holds no money, takes no commission, and is not liable for any loss, injury, dispute or unpaid balance between members. You use the service at your own risk, and your prudence is your protection."
      intro="Please read these terms before using Phriend. By creating an account or using the app you agree to them. If you do not agree, do not use Phriend."
    >
      <Callout tone="verify">
        <p className="mb-0">
          <strong>Not legal advice.</strong> This document is a plain-English draft written by the Phriend team. It is
          not legal advice and should be reviewed by a lawyer licensed in the Philippines before launch.
        </p>
      </Callout>

      <h2>1. Who we are and what Phriend is</h2>
      <p>
        Phriend (&quot;Phriend&quot;, &quot;we&quot;, &quot;us&quot;) operates the website phriend.app and the web app at
        web.phriend.app (together, the &quot;Service&quot;). The Service is a listing, messaging and booking platform where adults
        in the Philippines can publish a Phriend profile offering local services and activities by the hour, such as guided
        tours, photo and video shoots, tutoring and lessons, hiking guiding, driving and errands
        (&quot;Phriends&quot;), and other adults can find them and book them (&quot;clients&quot;). Both are
        &quot;members&quot;.
      </p>

      <h2>2. Eligibility</h2>
      <p>
        You must be of legal age in the Philippines to use the Service. Republic Act No. 6809 sets the age of majority
        at <strong>18 years</strong>. By using the Service you confirm you are 18 or older. Publishing a Phriend profile
        requires verifying your identity and age through our verification partner, Didit; any member may verify. We
        may suspend or remove accounts that we reasonably believe belong to a minor.
      </p>

      <h2>3. Your account</h2>
      <p>
        You sign in with your Google account or with your email and a password; keep them secure, because you are
        responsible for everything done under
        your Phriend account. One person, one account, one Phriend profile, with accurate information. Tell us at{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> if you think your account has been used without your
        permission.
      </p>

      <h2>4. Phriend is a platform, not a party</h2>
      <p>
        <strong>
          Phriend only provides the platform. We are not a party to any agreement, meetup, payment or other
          arrangement between members.
        </strong>{" "}
        We do not employ Phriends, act as anyone&apos;s agent, or vouch for any member. Identity verification confirms
        that an ID matched a face on a given day; it is not a background check or a guarantee of behaviour.
      </p>
      <p>
        You decide whom to meet, where, for how long and for how much. You are responsible for your own safety, for
        following the <Link href="/safety">safety and transaction rules</Link>, and for obeying the law.
      </p>

      <h2>5. Payments</h2>
      <p>
        <strong>There are no in-app payments. Bookings made in the app are a schedule between members, not a contract with Phriend.</strong> Members arrange and settle payments
        directly with each other, for example through GCash, Maya or bank transfer. Phriend does not hold money, does
        not process payments and, at the time of writing, does not charge a commission.
      </p>
      <p>
        We recommend, and the safety rules require, <strong>50% at the start of the meetup and 50% after</strong>, with
        the downpayment deducted from the total and never more than 50% paid in advance. On a{" "}
        <strong>first meetup the downpayment is handed over in cash, in person, when the members meet</strong>.
        E-wallets such as GCash or Maya, or bank transfer, are for repeat Phriends the client has already met and
        trusts, for convenience, and only ever to the account the other member has shared in the chat. Phriend is not
        responsible for refunds, disputes, chargebacks, unpaid balances or losses arising from payments between
        members. Be prudent: your prudence is your protection.
      </p>

      <h2>6. Meetups and conduct</h2>
      <ul>
        <li>Meetups take place in public places only.</li>
        <li>
          The Service is for <strong>legitimate local services and activities</strong> as described in the{" "}
          <Link href="/community-guidelines">community guidelines</Link>.
        </li>
        <li>Treat other members with respect. No harassment, threats, discrimination or hate speech.</li>
        <li>Agree on the plan, hours and rate in the chat and in the booking request so both sides have a record.</li>
        <li>
          Before a Phriend profile goes live, the member accepts the seven-point Phriend agreement shown in the app,
          which restates these rules, the payment terms and this platform-only status.
        </li>
      </ul>

      <h2>7. Prohibited uses</h2>
      <p>You may not use the Service to:</p>
      <ul>
        <li>offer, request or arrange sexual or romantic services, compensated dating or escort services;</li>
        <li>do anything illegal under the laws of the Republic of the Philippines;</li>
        <li>arrange private, residential or hotel-room meetups;</li>
        <li>request payment outside the rules in section 5, or run any payment scam;</li>
        <li>impersonate any person or organisation, or use another person&apos;s photos or ID;</li>
        <li>post false, misleading or infringing content, fake reviews, or operate multiple accounts;</li>
        <li>scrape, copy, reverse engineer or interfere with the Service or its security;</li>
        <li>contact members for advertising, recruitment or anything unrelated to a legitimate meetup.</li>
      </ul>

      <h2>7b. Zero tolerance for objectionable content and abusive behaviour</h2>
      <p>
        <strong>Objectionable content and abusive behaviour are not tolerated on Phriend.</strong> Profiles, photos,
        gigs and chat messages pass an automated filter, and a person approves every Phriend profile before it goes
        live. Any member can report a profile, gig, review or message from the report button in the app, or by email to{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>, and can block another member instantly from the chat.{" "}
        <strong>We review every report within 24 hours</strong>, remove the offending content, and remove the account of
        any member who breaks these terms or the <Link href="/community-guidelines">community guidelines</Link>. There
        is no warning for the prohibited uses listed above.
      </p>

      <h2>8. Your content</h2>
      <p>
        You keep ownership of the photos and text you upload. By uploading them you give Phriend a worldwide,
        non-exclusive, royalty-free licence to host, store, display, resize and distribute that content within the
        Service so other members can see your Phriend profile. The licence ends when you delete the content or your
        account, except for short-lived backup copies or where the law requires retention. You confirm you have the
        right to post what you upload.
      </p>

      <h2>9. Termination</h2>
      <p>
        You can delete your account at any time from your profile screen by typing DELETE; this permanently removes
        your account, Phriend profile, photos, favorites, reviews, bookings, notes and gigs. We may hide your Phriend
        profile or gig, mute you in chat, cancel a booking, or suspend or remove your account if you breach these
        terms, the community guidelines or the safety rules, if we receive a credible report about you, or if the law
        requires it. Breaches involving sexual or romantic services, minors,
        scams or violence mean immediate removal and, where required, a report to the authorities.
      </p>

      <h2>10. Disclaimer and limitation of liability</h2>
      <p>
        The Service is provided &quot;as is&quot; and &quot;as available&quot;. We do not promise that it will be
        uninterrupted, error-free or secure, or that any member is who they say they are.
      </p>
      <p>
        <strong>
          To the fullest extent permitted by Philippine law, Phriend, its owners, staff and partners are not liable for
          any meetup, payment, damage, injury, loss, theft, dispute or other harm arising from your use of the Service
          or from any interaction with another member, online or offline.
        </strong>{" "}
        Where liability cannot be excluded, it is limited to the amount you paid Phriend in the 12 months before the
        claim, which at present is nothing.
      </p>
      <p>
        In plain words: Phriend is a platform only. It is not a party to any meetup or payment and is not liable for
        any loss, injury, dispute, unpaid balance or harm between members. You use the Service at your own risk, and
        your prudence is your protection.
      </p>

      <h2>11. Indemnity</h2>
      <p>
        You agree to indemnify and hold harmless Phriend, its owners, staff and partners from any claims, damages,
        losses and expenses, including reasonable legal fees, arising from your use of the Service, your content, your
        meetups, or your breach of these terms or of the law.
      </p>

      <h2>12. Changes to the Service and these terms</h2>
      <p>
        We may change or discontinue parts of the Service, and we may update these terms. When we do, the date at the
        top changes and material changes are announced in the app or by email. Continuing to use the Service after a
        change means you accept the new terms.
      </p>

      <h2>13. Governing law</h2>
      <p>
        These terms are governed by the laws of the <strong>Republic of the Philippines</strong>, and disputes go
        before the proper Philippine courts. Nothing here limits rights you have under mandatory Philippine law.
      </p>

      <h2>14. Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Privacy questions:{" "}
        <Link href="/privacy">see the Privacy Policy</Link>.
      </p>
    </Legal>
  );
}
