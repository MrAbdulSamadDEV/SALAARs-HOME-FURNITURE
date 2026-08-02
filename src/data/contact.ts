/**
 * SALAAR'S HOME – Contact details.
 * Edit this file to change phone numbers, address, hours or the map embed.
 */

export const CONTACT = {
  /** Displayed phone number (as given by the owner). */
  phone: "0370804453",
  /** Formatted for display. */
  phoneDisplay: "037 080 4453",
  /** International format for tel: links (no +, no leading 0). */
  phoneIntl: "92370804453",
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
  mapEmbed: "https://www.google.com/maps?q=Furniture+Showroom&output=embed",
  /** Link used for "View on Google Maps" buttons. */
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Furniture+Showroom",
};

/** Copy shown on the contact page. */
export const CONTACT_PAGE = {
  hero: {
    eyebrow: "We're Here to Help",
    title: "Contact Us",
    description: "Call or drop by the showroom – we usually reply within minutes.",
  },
  cards: [
    {
      icon: "map-pin",
      title: "Visit the Showroom",
      lines: [CONTACT.address],
      cta: "View on Google Maps",
      external: true,
    },
    {
      icon: "phone",
      title: "Call Us",
      lines: [`Phone: ${CONTACT.phoneDisplay}`, "We pick up during opening hours."],
      cta: "Call now",
    },
    {
      icon: "clock",
      title: "Opening Hours",
      lines: [CONTACT.hours],
    },
    {
      icon: "facebook",
      title: "Facebook",
      lines: ["Follow us for new arrivals and offers."],
      cta: "Follow us",
      external: true,
    },
    {
      icon: "tiktok",
      title: "TikTok",
      lines: ["Behind-the-scenes and fresh drops."],
      cta: "Follow us",
      external: true,
    },
  ],
  mapTitle: "Find us on Google Maps",
};
