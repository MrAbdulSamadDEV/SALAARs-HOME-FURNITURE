/**
 * SALAAR'S HOME – SEO configuration.
 * Edit this file to change titles, descriptions and social sharing metadata.
 */

export const SEO = {
  defaultTitle: "Premium Furniture Showroom",
  titleSeparator: "|",
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
    "furniture showroom",
    "SALAAR's HOME",
  ],
  openGraph: {
    type: "website",
    siteName: "SALAAR's HOME",
  },
  twitter: {
    card: "summary_large_image",
    site: "@salaars_home",
  },
};

/** Per-page SEO copy. */
export const PAGE_SEO = {
  home: {
    title: "",
    description: SEO.description,
  },
  shop: {
    title: "Shop All Furniture",
    description:
      "Browse the full SALAAR's HOME collection in Karachi – bedroom sets, beds, wardrobes, side tables and dressers. Filter by category, price, material or color.",
  },
  about: {
    title: "About Us",
    description:
      "SALAAR's HOME is a family-run furniture showroom in Karachi, Pakistan. Explore our story, our workshop values and why thousands of families furnish with us.",
  },
  contact: {
    title: "Contact Us",
    description:
      "Get in touch with SALAAR's HOME in Karachi – visit the showroom or call us. We usually reply within minutes.",
  },
  faq: {
    title: "Frequently Asked Questions",
    description:
      "Answers about delivery, custom furniture, payment methods, contact details, delivery times and warranty at SALAAR's HOME in Karachi.",
  },
  notFound: {
    title: "Page Not Found",
  },
};
