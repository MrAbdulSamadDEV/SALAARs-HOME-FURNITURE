/**
 * SALAAR'S HOME – Home page content.
 * Edit this file to change the hero, features, stats and section copy.
 */

/* ------------------------------- hero -------------------------------- */

/** Rotating copy shown across hero slides (one per banner image). */
export const HERO_SLIDES = [
  {
    eyebrow: "Premium Furniture Showroom",
    title: "Timeless Furniture, Crafted for Your Home",
    description:
      "Discover handcrafted bedroom sets, wardrobes and more – built from solid wood to bring warmth and elegance to every room.",
  },
  {
    eyebrow: "Honest Materials · Skilled Hands",
    title: "Solid Wood That Ages Beautifully",
    description:
      "Every piece is finished by artisans who respect the wood and the people who will live with it – made to last for generations.",
  },
  {
    eyebrow: "Designed Around Your Home",
    title: "Custom Pieces, Made to Measure",
    description:
      "Special sizes, finishes and colors – tell us what your space needs and we will craft it exactly for you.",
  },
];

/** Hero autoplay interval in milliseconds. */
export const HERO_AUTOPLAY_MS = 5000;

/** Buttons shown on the hero. */
export const HERO_ACTIONS = {
  shop: { label: "Shop Collection", href: "/shop" },
  contact: { label: "Contact Us", href: "/contact" },
};

/* --------------------------- home sections ---------------------------- */

/** "Shop by Category" section. */
export const FEATURED_CATEGORIES_SECTION = {
  eyebrow: "Browse by Category",
  title: "Shop by Category",
  viewAll: "View All Products",
  explore: "Explore",
  piece: "Piece",
  pieces: "Pieces",
};

/** "Best Selling Products" section. */
export const BEST_SELLING_SECTION = {
  eyebrow: "Customer Favorites",
  title: "Best Selling Products",
  viewAll: "View All Products",
  allTab: "All",
};

/** "Why Choose Us" section. */
export const WHY_CHOOSE_SECTION = {
  eyebrow: "The SALAAR's Difference",
  title: "Why Choose SALAAR's HOME",
  description:
    "Furniture is a long-term relationship. We build every piece as if it were going into our own home – because that is exactly where it is headed.",
};

/** Feature cards shown in "Why Choose Us". */
export const FEATURES = [
  {
    icon: "hammer",
    title: "Premium Craftsmanship",
    text: "Every joint, edge and finish is handled by skilled craftsmen who take pride in their work.",
  },
  {
    icon: "shield",
    title: "Honest Materials",
    text: "Solid wood, quality hardware and durable finishes – no shortcuts, no hidden surprises.",
  },
  {
    icon: "ruler",
    title: "Custom Furniture",
    text: "Need a special size or finish? We build custom pieces to fit your space perfectly.",
  },
  {
    icon: "truck",
    title: "Delivery & Assembly",
    text: "Careful transport to your door with professional assembly – you simply enjoy it.",
  },
  {
    icon: "tag",
    title: "Fair, Transparent Pricing",
    text: "Honest showroom prices, discussed openly. No hidden costs, ever.",
  },
  {
    icon: "phone",
    title: "Dedicated Support",
    text: "Questions before or after your purchase? Our team is one message away.",
  },
];

/** Numbers shown in the "Why Choose Us" stats band. */
export const STATS = [
  { value: 12, suffix: "+", label: "Years of Craftsmanship" },
  { value: 5, suffix: "", label: "Signature Categories" },
  { value: 800, suffix: "+", label: "Handcrafted Designs" },
  { value: 1000, suffix: "+", label: "Happy Homes" },
];

/* ------------------------------ CTA -------------------------------- */

/** Contact call-to-action at the bottom of the home page. */
export const CONTACT_CTA = {
  eyebrow: "Let's Talk",
  titleStart: "Let's Create the Home",
  titleAccent: "You Love",
  description:
    "Visit our showroom or give us a call – we are happy to help you find the perfect piece for your space.",
  callNow: "Call Now",
  contactUs: "Contact Us",
};
