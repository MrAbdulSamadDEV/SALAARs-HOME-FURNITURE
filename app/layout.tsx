import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import CategoryNavigation from "@/components/navigation/CategoryNavigation";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import ImageProtection from "@/components/layout/ImageProtection";
import JsonLd from "@/components/seo/JsonLd";
import { CONTACT } from "@/data/contact";
import { SITE } from "@/data/site";
import { SOCIAL } from "@/data/social";
import { THEME } from "@/data/theme";
import { getManifest } from "@/utils/manifest";
import "@/styles/globals.css";

/* Premium typography – loaded with next/font for zero layout shift.
   Headings use Cormorant Garamond, body and buttons use Inter. */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} – ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: SITE.keywords,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} – ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
    images: [{ url: "/banners/1.webp", width: 1600, height: 800, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} – ${SITE.tagline}`,
    description: SITE.description,
    images: ["/banners/1.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: THEME.colors.background,
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Optional logo from public/logo/ – falls back to a text logo
  const logoUrl = getManifest().logo;

  /* Organization + WebSite structured data – global on every page. */
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    url: SITE.url,
    logo: logoUrl ? `${SITE.url}${logoUrl}` : undefined,
    sameAs: [SOCIAL.facebook.url, SOCIAL.tiktok.url],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: `+${CONTACT.phoneIntl}`,
      contactType: "sales",
      areaServed: "PK",
      availableLanguage: ["en", "ur"],
    },
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    name: SITE.name,
    url: SITE.url,
    publisher: { "@id": `${SITE.url}/#organization` },
    inLanguage: "en",
  };

  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        <Header logoUrl={logoUrl} />
        <CategoryNavigation />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
        <ImageProtection />
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
      </body>
    </html>
  );
}
