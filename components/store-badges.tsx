/**
 * App Store and Google Play placeholders: the native apps are not published yet, so these are "coming soon" badges in
 * the stores' shape, not the official downloadable badges (those may only be used once the app is live).
 */
const Apple = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" className="shrink-0" aria-hidden="true">
    <path d="M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.3-.9-1.7 0-3.3 1-4.2 2.5-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8s2 .8 3.3.8c1.4 0 2.3-1.3 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9-.1 0-2.7-1-2.7-4zM13.9 5c.7-.8 1.2-2 1-3.1-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.9-1 3 1.1.1 2.2-.6 2.9-1.4z" />
  </svg>
);
const Play = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" className="shrink-0" aria-hidden="true">
    <path fill="#00d4ff" d="M3.6 2.4 13.2 12l-9.6 9.6c-.3-.3-.5-.7-.5-1.2V3.6c0-.5.2-.9.5-1.2z" />
    <path fill="#00f076" d="M16.4 8.8 13.2 12 3.6 2.4c.4-.3 1-.4 1.6 0l11.2 6.4z" />
    <path fill="#ff3a44" d="M16.4 15.2 5.2 21.6c-.6.4-1.2.3-1.6 0l9.6-9.6 3.2 3.2z" />
    <path fill="#ffc700" d="M20.4 10.4c.9.5.9 1.7 0 2.2l-4 2.6L13.2 12l3.2-3.2 4 1.6z" />
  </svg>
);

const badge = "flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-white/20 bg-black px-3 py-2 text-left text-white opacity-90 sm:flex-none sm:gap-2.5 sm:px-3.5";

/** Two "coming soon" store badges with a line that points at the web app for now. `dark` when they sit on the navy hero. */
export function StoreBadges({ dark = false, className = "" }: { dark?: boolean; className?: string }) {
  return (
    <div className={className}>
      <div className="flex gap-2">
        <span className={badge} aria-label="Coming soon on the App Store">
          <Apple />
          <span className="leading-tight">
            <span className="block text-[9px] uppercase tracking-wide opacity-80 sm:text-[10px]">Coming soon on the</span>
            <span className="block whitespace-nowrap text-sm font-bold sm:text-base">App Store</span>
          </span>
        </span>
        <span className={badge} aria-label="Coming soon on Google Play">
          <Play />
          <span className="leading-tight">
            <span className="block text-[9px] uppercase tracking-wide opacity-80 sm:text-[10px]">Coming soon on</span>
            <span className="block whitespace-nowrap text-sm font-bold sm:text-base">Google Play</span>
          </span>
        </span>
      </div>
      <p className={`mt-2 text-xs font-semibold ${dark ? "text-white/80" : "text-muted"}`}>The apps are being finished. Use Phriend from the web for now: open web.phriend.app on your phone and add it to your home screen.</p>
    </div>
  );
}
