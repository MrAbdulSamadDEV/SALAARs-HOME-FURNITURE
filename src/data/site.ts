/**
 * SALAAR'S HOME – Global site information.
 * Edit this file to change the site name, tagline, URL or local business details.
 */

export const SITE = {
  name: "SALAAR's HOME",
  tagline: "Premium Furniture Showroom",
  /** Short label used under the logo (also in the footer). */
  taglineShort: "Premium Furniture",
  /** Used for SEO metadata, sitemap and JSON-LD. Replace with your real domain. */
  url: "https://salaars-home.vercel.app",
  description:
    "SALAAR's HOME is a premium furniture showroom in Karachi, Pakistan offering handcrafted bedroom sets, beds, wardrobes, side tables and dressers in solid wood. Luxury wooden furniture delivered nationwide with professional assembly.",
  keywords: [
    "Furniture Karachi",
    "Bedroom Sets Karachi",
    "Beds Karachi",
    "Wardrobes Karachi",
    "Side Tables Karachi",
    "Dressers Karachi",
    "Wooden Furniture Karachi",
    "Luxury Furniture Karachi",
    "Premium Furniture Pakistan",
    "SALAAR's HOME",
  ],
  /** Local business details – used by the LocalBusiness / FurnitureStore JSON-LD. */
  business: {
    type: "FurnitureStore",
    address: {
      streetAddress: "Furniture Showroom",
      addressLocality: "Karachi",
      addressRegion: "Sindh",
      postalCode: "74000",
      addressCountry: "PK",
    },
    /** Approximate city centre coordinates – update with your exact showroom location. */
    geo: {
      latitude: 24.8607,
      longitude: 67.0011,
    },
    areaServed: ["Karachi", "Pakistan"],
    /** Schema.org opening hours – matches CONTACT.hours (every day 8 AM – 9 PM). */
    openingHours: ["Mo-Su 08:00-21:00"],
    priceRange: "$$",
    currency: "PKR",
  },
};
