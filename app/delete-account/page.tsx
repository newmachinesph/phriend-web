import type { Metadata } from "next";
import Link from "next/link";
import { Callout, Legal } from "@/components/legal";
import { APP_URL, CONTACT_EMAIL, LAST_UPDATED, PROVIDER_URL, pageMeta } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Delete your Phriend account",
  description:
    "How to delete your Phriend account and the data that goes with it, in the app or by email, and what we keep afterwards.",
  path: "/delete-account",
});

export default function DeleteAccountPage() {
  return (
    <Legal
      eyebrow="Your data"
      title="Delete your account"
      path="/delete-account"
      updated={LAST_UPDATED}
      intro="You can delete your Phriend account and its data at any time, from the app or by emailing us. This page explains both routes and exactly what is removed."
      summary={`Open Profile → Delete account in the Phriend app, or email ${CONTACT_EMAIL} from your account address. Your name, photos, verification documents, saved addresses and favorites are deleted right away, and your profile, services and job posts are taken down.`}
    >
      <h2>1. Delete it yourself, in the app</h2>
      <ol>
        <li>Open the Phriend app (or <a href={APP_URL}>web.phriend.app</a>) and sign in.</li>
        <li>Go to the <strong>Profile</strong> tab and scroll to the bottom.</li>
        <li>Tap <strong>Delete account</strong>, choose a reason, type <code>DELETE</code> to confirm.</li>
        <li>Tap <strong>Delete forever</strong>. You are signed out on every device immediately.</li>
      </ol>

      <h2>2. Or ask us to do it</h2>
      <p>
        If you cannot sign in, email <a href={`mailto:${CONTACT_EMAIL}?subject=Delete my account`}>{CONTACT_EMAIL}</a>{" "}
        from the address on your account with the subject &ldquo;Delete my account&rdquo;. We verify that the request
        comes from the account holder and respond within 15 working days, as required by the Data Privacy Act of 2012.
      </p>

      <h2>3. Delete only some of your data</h2>
      <p>You do not have to close your account to remove things. Signed in, you can delete:</p>
      <ul>
        <li>
          Your provider profile or any one service, in the Phriend Provider app or at{" "}
          <a href={PROVIDER_URL}>provider.phriend.app</a>
        </li>
        <li>Individual work photos, from the photo grid on each service</li>
        <li>Saved addresses, from <strong>Profile</strong> &rarr; <strong>Addresses</strong></li>
        <li>Messages you sent, by long-pressing them in a chat</li>
        <li>Job posts you posted, booking notes, favorites and blocked members</li>
        <li>Your push notification token, by turning notifications off in <strong>Settings</strong></li>
      </ul>

      <h2>4. What is deleted</h2>
      <p>Deleted immediately and permanently:</p>
      <ul>
        <li>
          Your name (replaced with &ldquo;Deleted account&rdquo;), profile photo, password and Google or Apple sign-in
          links; every session is signed out
        </li>
        <li>Your work photos and the photos you sent in chat</li>
        <li>Your verification documents, files and records, from our private storage</li>
        <li>
          Your saved addresses, favorites, notifications, push notification devices, FAQ answers, auto-reply, saved
          replies, payment account details and feed preferences
        </li>
      </ul>
      <p>Taken down, so no one can see or book them:</p>
      <ul>
        <li>Your provider profile and services, and your job posts</li>
        <li>Your place on any team; a team you lead is hidden and its members are told</li>
      </ul>

      <h2>5. What stays, and why</h2>
      <ul>
        <li>
          <strong>Reviews and reports written about you</strong> stay. They belong to the members who wrote them; your
          name and photo are removed from every one.
        </li>
        <li>
          <strong>Bookings</strong> stay on record for the member on the other side, shown as &ldquo;Deleted
          account&rdquo;.
        </li>
        <li>
          <strong>Chat messages</strong> stay readable for the person on the other side, shown as &ldquo;Deleted
          account&rdquo;. They are stored by Ably under its message retention.
        </li>
        <li>
          <strong>Your email address</strong> stays on the closed account, so the account cannot be signed into again.
        </li>
        <li>
          <strong>An ID fingerprint</strong>, only for accounts verified before Phriend&apos;s own document check: a
          one-way hash of the verified ID stays, so a new account made with the same ID is flagged to our team.
        </li>
        <li>
          <strong>The moderation log</strong> keeps a record of any action taken on the account, so a banned member
          cannot return under a new one.
        </li>
        <li>
          <strong>Server logs</strong> are kept for up to 90 days, then deleted.
        </li>
      </ul>

      <Callout>
        Deleting is final: a closed account cannot be reopened. If you only want a break, pause your services instead.
      </Callout>

      <p>
        For everything else we hold and how long we hold it, see the <Link href="/privacy">Privacy Policy</Link>.
      </p>
    </Legal>
  );
}
