import type { Metadata } from "next";
import Link from "next/link";
import { Callout, Legal } from "@/components/legal";
import { CONTACT_EMAIL, LAST_UPDATED, pageMeta } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Privacy Policy: how Phriend handles your data",
  description:
    "How Phriend collects, uses, shares and keeps your personal data under the Philippine Data Privacy Act of 2012 (RA 10173), and the rights you have over it.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <Legal
      eyebrow="Legal"
      title="Privacy Policy"
      path="/privacy"
      updated={LAST_UPDATED}
      intro="This policy explains what personal data Phriend collects, why, who sees it and how long we keep it. It is written to comply with the Data Privacy Act of 2012 (Republic Act No. 10173) and its implementing rules."
    >
      <h2>1. Who is responsible</h2>
      <p>
        Phriend is the personal information controller for data processed through phriend.app, web.phriend.app,
        provider.phriend.app and the Phriend and Phriend Provider apps. Our
        Data Protection Officer can be reached at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>

      <h2>2. What we collect</h2>
      <ul>
        <li>
          <strong>Account data</strong>: the name, email address and profile photo of the Google account you sign in
          with, or the name, email address and password you register with (the password is stored only as a scrypt
          hash), plus the display name, gender, birth date and avatar you set.
        </li>
        <li>
          <strong>Provider profile and service data</strong>: your name, a face photo, a title, an About me, the
          languages you speak and your base city; for each service, its title, description, price, up to 6 photos, visit
          type, schedule, area and lockout dates; and the FAQ answers you set for the chat. Profiles created before the
          current version may also hold an age, gender, activities, non-negotiables, an hourly rate, working hours and up
          to 8 photos. Age and gender are never shown to other members.
        </li>
        <li>
          <strong>Saved addresses</strong>: the addresses you save for at-home services (Home, Work and others). An
          address is shared with a provider only for a booking you make at that address.
        </li>
        <li>
          <strong>Bookings, reviews, favorites, job posts and notes</strong>: the date, time, hours, address or place,
          note and status of each booking request; the reviews you write, with up to 4 photos; the profiles and services
          you favorite; the job posts (gigs) you post; and your private notes, which only you can read.
        </li>
        <li>
          <strong>Chat messages</strong>: the messages, images and payment account details you exchange with other
          members. Chat is delivered through Ably, our real-time messaging provider. A message that contains listed
          offensive words is refused and recorded, with the matched words, for moderation.
        </li>
        <li>
          <strong>Identity verification data</strong>: if you verify, you submit a government ID and a selfie to
          Phriend. Phriend&apos;s team reviews each provider&apos;s documents (the government ID and selfie, plus any
          optional clearances and certificates: NBI clearance, police clearance, barangay certificate, certificates,
          business documents and proof of address) and records the result. The documents are stored privately: only our
          reviewers can open them, and every access is logged.
        </li>
        <li>
          <strong>Device and usage data</strong>: IP address, browser and device type, pages viewed, approximate
          location derived from IP, crash and performance logs.
        </li>
        <li>
          <strong>Reports and support</strong>: the reason and up to 4 photos you attach when you report a profile or
          a job post, and anything you send support.
        </li>
      </ul>

      <h2>3. Why we use it</h2>
      <p>We process your data to:</p>
      <ul>
        <li>run your account and show your provider profile and services to other members (performance of our contract with you);</li>
        <li>deliver chat and booking requests between members;</li>
        <li>verify age and identity, prevent fraud, and keep minors off the Service (legal obligation and legitimate interest);</li>
        <li>
          review reports, profiles, services, documents and job posts, including an automated first pass, enforce the terms and community
          guidelines, and cooperate with lawful requests;
        </li>
        <li>keep the Service secure and working, limit abusive request rates, and fix bugs;</li>
        <li>
          send you service emails (a welcome on first sign-in, verification results and booking updates) and in-app
          notifications for bookings and reviews, and announce policy changes.
        </li>
      </ul>
      <p>We do not sell personal data and we do not use it for third-party advertising.</p>

      <h2>4. Who we share it with</h2>
      <p>
        We share data only with processors that help us run the Service, under contracts that limit what they can do
        with it:
      </p>
      <ul>
        <li>
          <strong>Google</strong>: sign-in. We receive your name, email address and profile photo from your Google
          account.
        </li>
        <li>
          <strong>Ably</strong>: real-time chat delivery.
        </li>
        <li>
          <strong>OpenAI</strong>: the automated first-pass review of reports, provider profiles, services and job posts run by our
          moderators.
        </li>
        <li>
          <strong>Upstash</strong>: request rate limiting, which keeps short-lived counters keyed by your account or IP
          address.
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
        Other members see your profile, your provider profile and services, and the messages you send them; a provider
        also sees the address you pick for a booking with them. We may also disclose data when Philippine
        law, a court order or a lawful law-enforcement request requires it, or to protect members&apos; safety. Some
        processors store data outside the Philippines under contractual safeguards consistent with the Data Privacy
        Act.
      </p>

      <h2>5. How long we keep it</h2>
      <ul>
        <li>
          <strong>Provider profiles</strong> leave the feed after 90 days (or the period shown on your profile) unless you renew or save them again; the profile stays
          on your account until you delete it or your account.
        </li>
        <li>
          <strong>Verification data</strong> is retained only as long as needed to confirm the result and handle
          disputes, then deleted from our private storage.
        </li>
        <li>
          <strong>Account data</strong> is kept while your account is active. When you delete your account, your
          account, provider profile, services, photos, saved addresses, favorites, reviews, bookings, notes, job posts and reports are removed right
          away, except the moderation log, which keeps a record of any action taken on the account. Chat messages are
          delivered and stored by Ably under its message retention; deleting your account does not itself erase them.
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
        To exercise any of these, email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> from the address on your
        account; we respond within 15 working days. You can also delete your account from your profile screen by
        typing DELETE.
      </p>

      <h2 id="cookies" className="scroll-mt-24">7. Cookies</h2>
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
          you believe a minor has an account, email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and we will remove it.
        </p>
      </Callout>

      <h2>9. Security</h2>
      <p>
        Data is encrypted in transit, Google sign-in never gives us a password and email passwords are stored only as
        scrypt hashes, production access is
        limited to the people who need it, and verification documents are kept in private storage that only our reviewers
        can open, with every access logged. If a breach affects you we will notify you and the National
        Privacy Commission as the law requires.
      </p>

      <h2>10. Changes and contact</h2>
      <p>
        We will update this policy when our practices change and show the new date at the top. Material changes are
        announced in the app or by email. Questions: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. See also our{" "}
        <Link href="/terms">Terms of Use</Link>.
      </p>
    </Legal>
  );
}
