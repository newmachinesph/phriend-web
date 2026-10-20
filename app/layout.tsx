import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { APP_URL, cdn, CONTACT_EMAIL, pageMeta, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s | ${SITE_NAME}` },
  applicationName: SITE_NAME,
  keywords: [
    "local services Philippines",
    "aircon cleaning",
    "appliance repair",
    "bookkeeping and tax filing",
    "tutor",
    "photographer for hire",
    "errand service",
    "verified service providers",
  ],
  ...pageMeta({ description: SITE_DESCRIPTION, path: "/" }),
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

export const viewport: Viewport = {
  themeColor: "#0d2251",
};

const JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: cdn("/brand/logo-mark.png"),
      sameAs: ["https://facebook.com/phriendapp", "https://instagram.com/phriendapp"],
      contactPoint: { "@type": "ContactPoint", contactType: "customer support", email: CONTACT_EMAIL, areaServed: "PH" },
    },
    { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    {
      "@type": "WebApplication",
      name: SITE_NAME,
      url: APP_URL,
      description: SITE_DESCRIPTION,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, Android, iOS",
      offers: { "@type": "Offer", price: 0, priceCurrency: "PHP" },
      areaServed: { "@type": "Country", name: "Philippines" },
    },
  ],
});

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-PH" className={`${inter.variable} ${jakarta.variable} h-full antialiased`}>
      <head>
        <link rel="dns-prefetch" href={APP_URL} />
      </head>
      <body className="flex min-h-full flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON_LD }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:font-bold focus:text-white"
        >
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        {/* Analytics once the page has loaded and the browser is idle. The default strategy preloaded the 174 KB tag in
            <head>, where it competed with the CSS, fonts and first paint on a phone. */}
        {GA_ID && (
          <>
            <Script id="ga-init" strategy="lazyOnload">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}');`}</Script>
            <Script id="ga" src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="lazyOnload" />
          </>
        )}
      </body>
    </html>
  );
}
