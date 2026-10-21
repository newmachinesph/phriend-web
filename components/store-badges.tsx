import Image from "next/image";
import { APP_STORE_URL, PLAY_URL } from "@/lib/site";

/**
 * The client app in the stores (SPEC 13e §2.4). Google's badge is used as supplied (keep the proportions, no restyling).
 * The App Store link is a site constant that stays null until the owner publishes the iOS app; until then a plain
 * "coming" label stands in for Apple's badge, which may only link to a live listing.
 */
export function StoreBadges({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {APP_STORE_URL ? (
        <a href={APP_STORE_URL} className="inline-flex h-11 items-center gap-2 rounded-control bg-ink px-4 font-bold text-white" aria-label="Download on the App Store">
          Download on the App Store
        </a>
      ) : (
        <span className="inline-flex h-11 items-center gap-2 rounded-control border border-line bg-white px-4 text-sm font-bold text-body">
          Coming to the App Store
        </span>
      )}
      {/* -my-1: the PNG carries its own transparent margin, so the visible badge lines up with the App Store pill */}
      <a href={PLAY_URL} className="-my-1 inline-block shrink-0 rounded-md" aria-label="Get it on Google Play">
        <Image src="/badges/google-play.png" alt="Get it on Google Play" width={646} height={250} className="h-[52px] w-auto" />
      </a>
    </div>
  );
}
