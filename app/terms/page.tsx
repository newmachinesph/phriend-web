import type { Metadata } from "next";
import Link from "next/link";
import { Callout, Legal } from "@/components/legal";
import { CONTACT_EMAIL, LAST_UPDATED, pageMeta } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Terms of Use for the Phriend platform",
  description:
    "Terms for using Phriend, a platform for adults in the Philippines to book local services from verified providers. Not a party to any booking or payment.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <Legal
      eyebrow="Legal"
      title="Terms of Use"
      path="/terms"
      updated={LAST_UPDATED}
      summary="Phriend is a listing, messaging and booking platform for adults (18+) in the Philippines to book local services from verified providers: aircon cleaning and repair, appliance check-ups, bookkeeping and tax filing, tutoring, photo and video, driving, errands and similar work. Phriend is not a party to any booking or payment, holds no money, takes no commission, and is not liable for any loss, injury, dispute or unpaid balance between members. You use the service at your own risk, and your prudence is your protection."
      intro="Please read these terms before using Phriend. By creating an account or using the app you agree to them. If you do not agree, do not use Phriend."
    >
      <Callout tone="verify">
        <p className="mb-0">
          <strong>Not legal advice.</strong> This document is a plain-English draft written by Phriend. It is
          not legal advice and should be reviewed by a lawyer licensed in the Philippines before launch.
        </p>
      </Callout>

      <h2>1. Who we are and what Phriend is</h2>
      <p>
        Phriend (&quot;Phriend&quot;, &quot;we&quot;, &quot;us&quot;) operates the website phriend.app, the web apps at
        web.phriend.app and provider.phriend.app, and the Phriend and Phriend Provider apps (together, the
        &quot;Service&quot;). The Service is a listing, messaging and booking platform where adults in the Philippines can
        list local services, each with its own price, photos, visit type, schedule and area, such as aircon cleaning and
        repair, bookkeeping and tax filing, tutoring, photo and video, driving and errands (&quot;providers&quot;), and
        other adults can find those services and book them (&quot;clients&quot;). Both are &quot;members&quot;.
      </p>

      <h2>2. Eligibility</h2>
      <p>
        You must be of legal age in the Philippines to use the Service. Republic Act No. 6809 sets the age of majority
        at <strong>18 years</strong>. By using the Service you confirm you are 18 or older. Listing services requires
        verifying your identity and age: a government ID and a selfie are checked and stored privately; any
        member may verify. Providers may also submit optional documents, such as an NBI clearance, certificates or
        business documents, which show as badges once they are approved. We
        may suspend or remove accounts that we reasonably believe belong to a minor.
      </p>

      <h2>3. Your account</h2>
      <p>
        You sign in with your Google account or with your email and a password; keep them secure, because you are
        responsible for everything done under
        your Phriend account. One person, one account, one provider profile, with accurate information. Tell us at{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> if you think your account has been used without your
        permission.
      </p>

      <h2>4. Phriend is a platform, not a party</h2>
      <p>
        <strong>
          Phriend only provides the platform. We are not a party to any agreement, booking, payment or other
          arrangement between members.
        </strong>{" "}
        We do not employ providers, act as anyone&apos;s agent, or vouch for any member. Identity verification confirms
        that an ID matched a face on a given day, and a document badge confirms that the document was checked; neither
        is a guarantee of anyone&apos;s work or behaviour.
      </p>
      <p>
        You decide whom to book, for what, when and for how much. You are responsible for your own safety, for
        following the <Link href="/safety">trust, safety and transaction rules</Link>, and for obeying the law.
      </p>

      <h2>5. Payments</h2>
      <p>
        <strong>There are no in-app payments. Bookings made in the app are a schedule between members, not a contract with Phriend.</strong> Members arrange and settle payments
        directly with each other, for example through GCash, Maya or bank transfer. Phriend does not hold money, does
        not process payments and, at the time of writing, does not charge a commission.
      </p>
      <p>
        <strong>Payment is agreed with the provider and paid to them directly</strong>: the amount, any deposit, the
        method and the timing are set in the chat and the booking. No member may ask for more upfront than was agreed in
        the chat, for a fee on top of the agreed price, or for payment to an account other than the one shared in the
        chat. Phriend is not responsible for refunds, disputes, chargebacks, unpaid balances or losses arising from
        payments between members. Be prudent: your prudence is your protection.
      </p>

      <h2>6. Services and conduct</h2>
      <ul>
        <li>
          Each service states how and where it is done: online, at the client&apos;s address, at the provider&apos;s place,
          or either, and the area it covers. The client decides whether to book a service at their address. Bookings never
          take place in hotel rooms or as overnight stays.
        </li>
        <li>
          The Service is for <strong>legitimate local services and activities</strong> as described in the{" "}
          <Link href="/community-guidelines">community guidelines</Link>.
        </li>
        <li>Treat other members with respect. No harassment, threats, discrimination or hate speech.</li>
        <li>Agree on the work, the time and the price in the chat and in the booking request so both sides have a record.</li>
        <li>
          Before their services go live, a provider accepts the provider agreement shown in the app, which restates these
          rules, the payment terms and this platform-only status.
        </li>
      </ul>

      <h2>7. Teams</h2>
      <p>
        A team is a group of verified providers offering a service together, with one team page, packages and a group
        chat. Each member keeps their own provider profile and services, and can still be booked alone.
      </p>
      <ul>
        <li>
          The team lead is responsible for the team page, its members and its payment terms being accurate and kept up
          to date.
        </li>
        <li>
          Every member follows the same rules as on their own profile: these terms, the{" "}
          <Link href="/safety">trust, safety and transaction rules</Link> and the{" "}
          <Link href="/community-guidelines">community guidelines</Link>.
        </li>
        <li>One booking covers the members named on it. Anyone else is not part of the booking.</li>
        <li>
          Payment is agreed with the team lead in the chat and paid to the team directly, and the team splits it among
          themselves. Phriend never holds the money and is not a party to how a team divides it.
        </li>
        <li>
          Either side can cancel a team booking as with any booking. If a member cannot make it, the team lead cancels
          the booking or rebooks it.
        </li>
      </ul>

      <h2>8. Prohibited uses</h2>
      <p>You may not use the Service to:</p>
      <ul>
        <li>offer, request or arrange sexual services, paid romance or intimacy, or escort services;</li>
        <li>do anything illegal under the laws of the Republic of the Philippines;</li>
        <li>list time with a person rather than a defined service, or use a service as a pretext for anything else, including hotel-room bookings and overnight stays;</li>
        <li>request payment outside the rules in section 5, or run any payment scam;</li>
        <li>impersonate any person or organisation, or use another person&apos;s photos or ID;</li>
        <li>post false, misleading or infringing content, fake reviews, or operate multiple accounts;</li>
        <li>scrape, copy, reverse engineer or interfere with the Service or its security;</li>
        <li>contact members for advertising, recruitment or anything unrelated to a legitimate booking.</li>
      </ul>

      <h2>8b. Zero tolerance for objectionable content and abusive behaviour</h2>
      <p>
        <strong>Objectionable content and abusive behaviour are not tolerated on Phriend.</strong> Profiles, services,
        photos, job posts and chat messages pass automated checks, and anything uncertain goes to a person before it goes
        live. Any member can report a profile, job post, review or message from the report button in the app, or by email to{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>, and can block another member instantly from the chat.{" "}
        <strong>We review every report within 24 hours</strong>, remove the offending content, and remove the account of
        any member who breaks these terms or the <Link href="/community-guidelines">community guidelines</Link>. There
        is no warning for the prohibited uses listed above.
      </p>

      <h2>9. Your content</h2>
      <p>
        You keep ownership of the photos and text you upload. By uploading them you give Phriend a worldwide,
        non-exclusive, royalty-free licence to host, store, display, resize and distribute that content within the
        Service so other members can see your profile and services. The licence ends when you delete the content or your
        account, except for short-lived backup copies or where the law requires retention. You confirm you have the
        right to post what you upload.
      </p>

      <h2>10. Termination</h2>
      <p>
        You can delete your account at any time from your profile screen by typing DELETE; this permanently removes
        your account, provider profile, services, photos, saved addresses, favorites, reviews, bookings, notes and job
        posts. We may hide your profile, a service or a job post, mute you in chat, cancel a booking, or suspend or remove your account if you breach these
        terms, the community guidelines or the safety rules, if we receive a credible report about you, or if the law
        requires it. Breaches involving sexual or romantic services, minors,
        scams or violence mean immediate removal and, where required, a report to the authorities.
      </p>

      <h2>11. Disclaimer and limitation of liability</h2>
      <p>
        The Service is provided &quot;as is&quot; and &quot;as available&quot;. We do not promise that it will be
        uninterrupted, error-free or secure, or that any member is who they say they are.
      </p>
      <p>
        <strong>
          To the fullest extent permitted by Philippine law, Phriend, its owners, staff and partners are not liable for
          any booking, service, payment, damage, injury, loss, theft, dispute or other harm arising from your use of the Service
          or from any interaction with another member, online or offline.
        </strong>{" "}
        Where liability cannot be excluded, it is limited to the amount you paid Phriend in the 12 months before the
        claim, which at present is nothing.
      </p>
      <p>
        In plain words: Phriend is a platform only. It is not a party to any booking or payment and is not liable for
        any loss, injury, dispute, unpaid balance or harm between members. You use the Service at your own risk, and
        your prudence is your protection.
      </p>

      <h2>12. Indemnity</h2>
      <p>
        You agree to indemnify and hold harmless Phriend, its owners, staff and partners from any claims, damages,
        losses and expenses, including reasonable legal fees, arising from your use of the Service, your content, your
        bookings and services, or your breach of these terms or of the law.
      </p>

      <h2>13. Changes to the Service and these terms</h2>
      <p>
        We may change or discontinue parts of the Service, and we may update these terms. When we do, the date at the
        top changes and material changes are announced in the app or by email. Continuing to use the Service after a
        change means you accept the new terms.
      </p>

      <h2>14. Governing law</h2>
      <p>
        These terms are governed by the laws of the <strong>Republic of the Philippines</strong>, and disputes go
        before the proper Philippine courts. Nothing here limits rights you have under mandatory Philippine law.
      </p>

      <h2>15. Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Privacy questions:{" "}
        <Link href="/privacy">see the Privacy Policy</Link>.
      </p>
    </Legal>
  );
}
