/**
 * Global site information.
 * Edit this file to change contact details, social links, etc.
 */

export const SITE = {
  name: "SALAAR's HOME",
  tagline: "Premium Furniture Showroom",
  /**
   * Used for SEO metadata (Open Graph, sitemap, JSON-LD).
   * Replace with your real domain when you deploy.
   */
  url: "https://salaars-home.vercel.app",
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
};

export const CONTACT = {
  /** Displayed phone number (as given by the owner). */
  phone: "0370804453",
  /** Formatted for display. */
  phoneDisplay: "037 080 4453",
  /** International format for tel: links (no +, no leading 0). */
  phoneIntl: "84370804453",
  facebook: "https://www.facebook.com/profile.php?id=61590742701515",
  facebookLabel: "SALAAR's HOME",
  tiktok: "https://www.tiktok.com/@salaars_farnichar",
  tiktokLabel: "@salaars_farnichar",
  /** Optional email – leave null to hide it. */
  email: null as string | null,
  /** Shown on the contact page and in the footer. */
  address: "Furniture Showroom",
  /** Open hours displayed on the contact page. */
  hours: "Every day · 8:00 AM – 9:00 PM",
  /**
   * Google Maps embed URL (no API key needed).
   * Replace `q=...` with your showroom address, e.g.
   * https://www.google.com/maps?q=Your+Street+City&output=embed
   */
  mapEmbed:
    "https://www.google.com/maps?q=Furniture+Showroom&output=embed",
};

/** Navigation links shown in the header. */
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/shop", label: "Shop" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
];
