import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import BestSellingProducts from "@/components/home/BestSellingProducts";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ContactCTA from "@/components/home/ContactCTA";
import { CONTACT, SITE } from "@/constants/site";
import { getManifest } from "@/utils/manifest";

export const metadata: Metadata = {
  title: `${SITE.name} – ${SITE.tagline}`,
  description: SITE.description,
  alternates: {
    canonical: "/",
  },
};

/** Structured data for search engines (JSON-LD). */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FurnitureStore",
  name: SITE.name,
  url: SITE.url,
  telephone: CONTACT.phone,
  sameAs: [CONTACT.facebook, CONTACT.tiktok],
  priceRange: "$$",
};

export default function HomePage() {
  // Manifest is read on the server so all images are in the initial HTML
  const manifest = getManifest();

  return (
    <>
      <Hero initialSlides={manifest.hero} />
      <FeaturedCategories manifest={manifest} />
      <BestSellingProducts manifest={manifest} />
      <WhyChooseUs />
      <ContactCTA />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
