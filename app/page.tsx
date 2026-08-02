import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import FeaturedCategories, {
  type FeaturedCategory,
} from "@/components/home/FeaturedCategories";
import BestSellingProducts from "@/components/home/BestSellingProducts";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ContactCTA from "@/components/home/ContactCTA";
import JsonLd from "@/components/seo/JsonLd";
import { CATEGORIES } from "@/data/categories";
import { CONTACT } from "@/data/contact";
import { SITE } from "@/data/site";
import { SOCIAL } from "@/data/social";
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
  "@id": `${SITE.url}/#furniturestore`,
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  telephone: `+${CONTACT.phoneIntl}`,
  priceRange: SITE.business.priceRange,
  currenciesAccepted: SITE.business.currency,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.business.address.streetAddress,
    addressLocality: SITE.business.address.addressLocality,
    addressRegion: SITE.business.address.addressRegion,
    postalCode: SITE.business.address.postalCode,
    addressCountry: SITE.business.address.addressCountry,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: SITE.business.geo.latitude,
    longitude: SITE.business.geo.longitude,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "08:00",
      closes: "21:00",
    },
  ],
  areaServed: SITE.business.areaServed,
  sameAs: [SOCIAL.facebook.url, SOCIAL.tiktok.url],
  parentOrganization: { "@id": `${SITE.url}/#organization` },
};

export default function HomePage() {
  // Manifest is read on the server so all images are in the initial HTML
  const manifest = getManifest();

  /* Compact category data for the client – the full manifest (all products)
     never leaves the server, keeping the home page payload tiny. */
  const featuredCategories: FeaturedCategory[] = CATEGORIES.map((cat) => ({
    slug: cat.slug,
    name: cat.name,
    image: manifest.products?.[cat.slug]?.[0]?.image ?? null,
    count: manifest.products?.[cat.slug]?.length ?? 0,
  }));

  return (
    <>
      <Hero initialSlides={manifest.hero} />
      <FeaturedCategories categories={featuredCategories} />
      <BestSellingProducts />
      <WhyChooseUs />
      <ContactCTA />
      <JsonLd data={jsonLd} />
    </>
  );
}
