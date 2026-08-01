import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import CategoryNavigation from "@/components/navigation/CategoryNavigation";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import { SITE } from "@/data/site";
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
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} – ${SITE.tagline}`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
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

  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        <Header logoUrl={logoUrl} />
        <CategoryNavigation />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
