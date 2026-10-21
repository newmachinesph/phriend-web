import type { Metadata } from "next";
import Link from "next/link";
import { Callout, Legal } from "@/components/legal";
import { APP_URL, CONTACT_EMAIL, LAST_UPDATED, PROVIDER_URL, pageMeta } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Delete your Phriend account",
  description: "How to delete your Phriend account and the data that goes with it, in the app or by email, and what we keep afterwards.",
  path: "/delete-account",
});

/** Linked from both store listings (SPEC 13e §2.2): where to delete in each app, what is erased and when, and the support email. */
export default function DeleteAccountPage() {
  return (
    <Legal
      eyebrow="Your data"
      title="Delete your account"
      path="/delete-account"
      updated={LAST_UPDATED}
      intro="You can delete your Phriend account and its data at any time, from the app or by emailing us. This page explains both routes and exactly what is removed."
      summary={`Open Settings → Delete account in the Phriend app, at web.phriend.app, in the Phriend Provider app or at provider.phriend.app, or email ${CONTACT_EMAIL} from your account address. Your name, photos, saved details and verification documents are deleted, and your profile and services are taken down.`}
    >
      <h2>1. Delete it yourself, in the app</h2>
      <p>
        <strong>Clients</strong>, in the Phriend app or at <a href={APP_URL}>web.phriend.app</a>:
      </p>
      <ol>
        <li>Sign in and open the <strong>Account</strong> tab.</li>
        <li>
          Open <strong>Settings</strong> and tap <strong>Delete account</strong>.
        </li>
        <li>
          Choose a reason if you like, type <code>DELETE</code> to confirm and tap <strong>Delete forever</strong>. You are signed out on every device.
        </li>
      </ol>
      <p>
        <strong>Providers</strong>, in the Phriend Provider app or at <a href={PROVIDER_URL}>provider.phriend.app</a>: open <strong>Settings</strong> &rarr;{" "}
        <strong>Delete account</strong> and confirm the same way.
      </p>

      <h2>2. Or ask us to do it</h2>
      <p>
        If you cannot sign in, email <a href={`mailto:${CONTACT_EMAIL}?subject=Delete my account`}>{CONTACT_EMAIL}</a> from the address on your account with the
        subject &ldquo;Delete my account&rdquo;. We verify that the request comes from the account holder and respond within 15 working days, as required by the
        Data Privacy Act of 2012.
      </p>

      <h2>3. What happens when you delete</h2>
      <p>Right away:</p>
      <ul>
        <li>You are signed out on every device, and the account cannot be signed into again.</li>
        <li>Your profile and services are taken down, so no one can see or book them.</li>
        <li>Open bookings are cancelled, and the other side is told.</li>
      </ul>
      <p>Shortly after, by an automated job:</p>
      <ul>
        <li>Your name (replaced with &ldquo;Deleted account&rdquo;), photo, email address, phone number, password and Google or Apple sign-in are deleted.</li>
        <li>Your service photos, review photos and the images you sent in chat are deleted from storage.</li>
        <li>Your verification documents and their files are deleted from our private storage.</li>
        <li>Your saved addresses, saved services, gigs, notes, payment details, FAQ answers and devices are deleted.</li>
      </ul>

      <h2>4. What stays, and why</h2>
      <ul>
        <li>
          <strong>Reviews</strong> you wrote, and reviews about you, stay under &ldquo;Deleted account&rdquo;. They are part of the record other members rely on.
        </li>
        <li>
          <strong>Bookings</strong> stay on record for the member on the other side, shown as &ldquo;Deleted account&rdquo;.
        </li>
        <li>
          <strong>Chats</strong> stay readable for the other person, under &ldquo;Deleted account&rdquo;.
        </li>
        <li>
          <strong>The moderation and audit log</strong> keeps a record of any action taken on the account, by id only, so a banned member cannot return under a new
          one.
        </li>
        <li>
          <strong>Server logs</strong> are kept for up to 90 days, then deleted.
        </li>
      </ul>

      <h2>5. Download your data first</h2>
      <p>
        Before you delete, you can download a copy of your data from <strong>Settings</strong> &rarr; <strong>Download my data</strong>, once a day.
      </p>

      <Callout>Deleting is final: a deleted account cannot be reopened. Providers who only want a break can pause their services instead.</Callout>

      <p>
        For everything else we hold and how long we hold it, see the <Link href="/privacy">Privacy Policy</Link>.
      </p>
    </Legal>
  );
}
