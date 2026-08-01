/**
 * SALAAR'S HOME – SEO configuration.
 * Edit this file to change titles, descriptions and social sharing metadata.
 */

export const SEO = {
  defaultTitle: "Premium Furniture Showroom",
  titleSeparator: "|",
  description:
    "SALAAR's HOME is a premium furniture showroom offering handcrafted bedroom sets, wardrobes, side tables and dressers. Solid wood, timeless design, delivered and assembled with care.",
  keywords: [
    "furniture showroom",
    "bedroom sets",
    "wardrobes",
    "side tables",
    "dressers",
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
      "Browse the full SALAAR's HOME collection – bedroom sets, wardrobes, side tables and dressers. Filter by category, price, material or color.",
  },
  about: {
    title: "About Us",
    description:
      "SALAAR's HOME is a family-run furniture showroom in Canberra. Explore our story, our workshop values and why thousands of locals furnish with us.",
  },
  contact: {
    title: "Contact Us",
    description: "Get in touch with SALAAR's HOME – visit the showroom or call us.",
  },
  faq: {
    title: "Frequently Asked Questions",
    description:
      "Answers about delivery, custom furniture, payment methods, contact details, delivery times and warranty at SALAAR's HOME.",
  },
  notFound: {
    title: "Page Not Found",
  },
};
