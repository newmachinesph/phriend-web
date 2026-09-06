import type { Metadata } from "next";
import Link from "next/link";
import { Callout, Legal } from "@/components/legal";
import { DPO_EMAIL, LAST_UPDATED } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Phriend collects, uses, shares and keeps your personal data under the Philippine Data Privacy Act of 2012 (RA 10173), and the rights you have over it.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <Legal
      eyebrow="Legal"
      title="Privacy Policy"
      updated={LAST_UPDATED}
      intro="This policy explains what personal data Phriend collects, why, who sees it and how long we keep it. It is written to comply with the Data Privacy Act of 2012 (Republic Act No. 10173) and its implementing rules."
    >
      <h2>1. Who is responsible</h2>
      <p>
        Phriend is the personal information controller for data processed through phriend.app and web.phriend.app. Our
        Data Protection Officer can be reached at <a href={`mailto:${DPO_EMAIL}`}>{DPO_EMAIL}</a>.
      </p>

      <h2>2. What we collect</h2>
      <ul>
        <li>
          <strong>Account data</strong>: your email address, password hash, display name, and the sign-in method you
          use.
        </li>
        <li>
          <strong>Profile and post data</strong>: name or nickname, age, gender, city and area, languages, activities,
          hourly rate, bio, and the photos you upload.
        </li>
        <li>
          <strong>Chat messages</strong>: the messages, images and payment account details you exchange with other
          members. Chat is delivered through Ably, our real-time messaging provider.
        </li>
        <li>
          <strong>Identity verification data</strong>: if you verify, you submit a government ID and a selfie to
          Didit, our verification partner. Didit checks them and stores the ID data on Phriend&apos;s behalf. Phriend
          receives the result (verified or not), your verified age bracket, and a reference number, not a copy of your
          ID.
        </li>
        <li>
          <strong>Device and usage data</strong>: IP address, browser and device type, pages viewed, approximate
          location derived from IP, crash and performance logs.
        </li>
        <li>
          <strong>Reports and support</strong>: anything you send us when you report a member or contact support.
        </li>
      </ul>

      <h2>3. Why we use it</h2>
      <p>We process your data to:</p>
      <ul>
        <li>run your account and show your posts and profile to other members (performance of our contract with you);</li>
        <li>deliver chat between members;</li>
        <li>verify age and identity, prevent fraud, and keep minors off the Service (legal obligation and legitimate interest);</li>
        <li>review reports, enforce the terms and community guidelines, and cooperate with lawful requests;</li>
        <li>keep the Service secure and working, and fix bugs;</li>
        <li>send you service emails such as verification results, security alerts and policy changes.</li>
      </ul>
      <p>We do not sell personal data and we do not use it for third-party advertising.</p>

      <h2>4. Who we share it with</h2>
      <p>
        We share data only with processors that help us run the Service, under contracts that limit what they can do
        with it:
      </p>
      <ul>
        <li>
          <strong>Ably</strong>: real-time chat delivery.
        </li>
        <li>
          <strong>Didit</strong>: identity and age verification.
        </li>
        <li>
          <strong>Cloudflare R2</strong>: storage of uploaded photos.
        </li>
        <li>
          <strong>Neon</strong>: database hosting.
        </li>
        <li>
          <strong>Our email provider</strong>: delivery of account and service emails.
        </li>
      </ul>
      <p>
        Other members see your profile, posts and the messages you send them. We may also disclose data when Philippine
        law, a court order or a lawful law-enforcement request requires it, or to protect members&apos; safety. Some
        processors store data outside the Philippines under contractual safeguards consistent with the Data Privacy
        Act.
      </p>

      <h2>5. How long we keep it</h2>
      <ul>
        <li>
          <strong>Posts</strong> expire after 30 days unless you renew them, and are deleted shortly after expiry.
        </li>
        <li>
          <strong>Verification data</strong> is retained only as long as needed to confirm the result and handle
          disputes, then deleted by Didit on our instruction.
        </li>
        <li>
          <strong>Account, profile and chat data</strong> are kept while your account is active and deleted within 30
          days of account deletion, except where we must keep records of a report or a legal matter.
        </li>
        <li>
          <strong>Logs</strong> are kept for up to 90 days.
        </li>
      </ul>

      <h2>6. Your rights</h2>
      <p>Under the Data Privacy Act you have the right to:</p>
      <ul>
        <li>be informed about how your data is processed;</li>
        <li>
          <strong>access</strong> the personal data we hold about you;
        </li>
        <li>
          <strong>correct</strong> inaccurate or outdated data;
        </li>
        <li>
          <strong>erase or block</strong> data that is unlawfully obtained, no longer necessary, or being misused;
        </li>
        <li>
          <strong>object</strong> to processing, including for direct marketing or profiling;
        </li>
        <li>
          <strong>data portability</strong>: obtain a copy of your data in a commonly used electronic format;
        </li>
        <li>be indemnified for damages caused by inaccurate, incomplete or unlawfully obtained data;</li>
        <li>
          <strong>file a complaint</strong> with the National Privacy Commission (privacy.gov.ph).
        </li>
      </ul>
      <p>
        To exercise any of these, email <a href={`mailto:${DPO_EMAIL}`}>{DPO_EMAIL}</a> from the address on your
        account; we respond within 15 working days. You can also delete your account from the settings screen.
      </p>

      <h2>7. Cookies</h2>
      <p>
        We use <strong>essential cookies</strong> (a session cookie that keeps you signed in and one that remembers
        your preferences) and <strong>Google Analytics 4</strong> to count visits and see which pages are used. Analytics sets
        first-party <code>_ga</code> cookies, uses no advertising or cross-site tracking cookies, and Google does not store
        IP addresses. You can block it in your browser or with an extension without affecting the site.
      </p>

      <h2>8. Children</h2>
      <Callout>
        <p className="mb-0">
          Phriend is for adults only. <strong>We do not knowingly allow anyone under 18 to use the Service.</strong> If
          you believe a minor has an account, email <a href={`mailto:${DPO_EMAIL}`}>{DPO_EMAIL}</a> and we will remove it.
        </p>
      </Callout>

      <h2>9. Security</h2>
      <p>
        Data is encrypted in transit, passwords are hashed, production access is limited to the people who need it, and
        ID documents never pass through our own servers. If a breach affects you we will notify you and the National
        Privacy Commission as the law requires.
      </p>

      <h2>10. Changes and contact</h2>
      <p>
        We will update this policy when our practices change and show the new date at the top. Material changes are
        announced in the app or by email. Questions: <a href={`mailto:${DPO_EMAIL}`}>{DPO_EMAIL}</a>. See also our{" "}
        <Link href="/terms">Terms of Use</Link>.
      </p>
    </Legal>
  );
}
