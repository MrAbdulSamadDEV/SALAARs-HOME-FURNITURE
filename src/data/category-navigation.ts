/**
 * SALAAR'S HOME – Category Navigation Bar.
 * =========================================
 * THE single source of truth for the premium category bar below the main
 * navbar. Adding or removing a category only requires editing this array.
 *
 * Routes are /category/<slug> (e.g. /category/bed-sets).
 * `source` links a nav category to the product category from
 * src/data/categories.ts whose products are displayed on its page.
 * Set `source: null` for "coming soon" collections.
 */

export interface CategoryNavItem {
  /** URL slug – creates /category/<slug>. */
  slug: string;
  /** Label shown in the navigation bar. */
  label: string;
  /**
   * Product category slug (from src/data/categories.ts) whose products are
   * shown on this page, or null for a "coming soon" collection.
   */
  source: string | null;
  /** Small eyebrow / tagline shown on the page hero. */
  tagline: string;
  /** One-line description shown on the page hero. */
  short: string;
  /** Longer description shown below the hero. */
  description: string;
  /** Title + text shown when the collection has no products yet. */
  emptyTitle?: string;
  emptyText?: string;
  /** SEO title / description for the category page. */
  seoTitle: string;
  seoDescription: string;
}

export const NAV_CATEGORIES: CategoryNavItem[] = [
  {
    slug: "bed-sets",
    label: "Bed Sets",
    source: "bedroom-sets",
    tagline: "Complete bedroom collections, perfectly matched",
    short:
      "Full bedroom suites – bed, wardrobe, dresser and side tables designed to work as one harmonious set.",
    description:
      "A bed set from SALAAR's HOME turns an empty room into a complete, elegant retreat. Every set is designed as one cohesive collection – bed, wardrobe, dresser and side tables – so the finish, hardware and style always match perfectly. Choose from classic wood tones or modern minimal designs, all handcrafted from solid wood with premium fittings.",
    seoTitle: "Bed Sets – Complete Bedroom Collections",
    seoDescription:
      "Explore handcrafted bed sets at SALAAR's HOME – beds, wardrobes, dressers and side tables designed as complete, matching collections.",
  },
  {
    slug: "beds",
    label: "Beds",
    source: "bedroom-sets",
    tagline: "The heart of your bedroom",
    short:
      "Beautiful solid-wood beds – queen, king and custom sizes – built for comfort and made to last.",
    description:
      "A great bed anchors the whole bedroom. Our beds are built from solid wood with reinforced frames and elegant headboards, available in queen, king and custom sizes. Whether you prefer a classic panel design or a modern upholstered silhouette, every bed is finished by hand and delivered with professional assembly.",
    seoTitle: "Beds – Solid Wood Beds for Every Bedroom",
    seoDescription:
      "Discover quality solid-wood beds at SALAAR's HOME – queen, king and custom sizes, handcrafted and delivered with assembly.",
  },
  {
    slug: "side-tables",
    label: "Side Tables",
    source: "side-tables",
    tagline: "Small pieces, big character",
    short:
      "Elegant bedside and accent tables in solid wood – the finishing touch for any room.",
    description:
      "The right side table finishes a room. Handcrafted from solid wood with clean joins and smooth finishes, our side tables bring warmth and function to the bedside, the sofa corner or the hallway. Available in a range of heights and styles to match any interior – simple, elegant and built to last.",
    seoTitle: "Side Tables – Elegant Accent Pieces",
    seoDescription:
      "Shop elegant solid wood side tables at SALAAR's HOME – bedside and accent tables in many styles and finishes.",
  },
  {
    slug: "dressers",
    label: "Dressers",
    source: "dressers-mirrors",
    tagline: "Where beauty meets everyday function",
    short:
      "Dressers with deep, smooth-gliding drawers – classic storage for your everyday essentials.",
    description:
      "A dresser is more than a place to get ready in the morning – it is a statement piece. Our dressers offer deep, smooth-gliding drawers for all your essentials, topped with a beautiful vanity mirror that completes the look. Classic and contemporary designs available in rich wood tones that grow more beautiful with age.",
    seoTitle: "Dressers – Classic Storage With Elegance",
    seoDescription:
      "Browse classic wooden dressers at SALAAR's HOME – deep smooth-gliding drawers and hand-finished solid wood.",
  },
  {
    slug: "mirrors",
    label: "Mirrors",
    source: "dressers-mirrors",
    tagline: "Reflections that elevate a room",
    short:
      "Elegant standing and vanity mirrors that add light, depth and character to any space.",
    description:
      "The right mirror makes a room feel larger, brighter and more composed. Our mirrors pair premium mirror glass with hand-finished wooden frames – from slim vanity mirrors to full-length standing designs. Each piece is carefully packed and delivered with care.",
    seoTitle: "Mirrors – Premium Framed Vanity Mirrors",
    seoDescription:
      "Discover premium mirrors at SALAAR's HOME – vanity and standing mirrors with hand-finished wooden frames.",
  },
  {
    slug: "wardrobes",
    label: "Wardrobes",
    source: "wardrobes",
    tagline: "Storage that keeps your space beautiful",
    short:
      "Spacious wardrobes with sliding or hinged doors, built-in mirrors and smart internal storage.",
    description:
      "A well-designed wardrobe quietly keeps your home organized and calm. Our wardrobes combine generous storage with clean, beautiful lines – soft-close doors, adjustable shelves, drawers and hanging space for everything you own. From slim two-door designs to full wall-to-wall wardrobes, every piece is built to last a lifetime.",
    seoTitle: "Wardrobes – Spacious & Elegant Storage",
    seoDescription:
      "Discover quality wardrobes at SALAAR's HOME – sliding and hinged door designs, smart internal storage, made to measure.",
  },
  {
    slug: "tv-units",
    label: "TV Units",
    source: null,
    tagline: "The centerpiece of your living room",
    short:
      "Elegant TV stands and entertainment units with smart cable management and generous storage.",
    description:
      "A beautifully crafted TV unit keeps your living room tidy and stylish. Our entertainment units combine clean lines, soft-close drawers and smart cable management – designed to hold today's screens while complementing your decor. New designs are added regularly.",
    emptyTitle: "This collection is coming soon",
    emptyText:
      "We are crafting a new selection of TV units. Meanwhile, our team can build a custom piece to your exact size and finish – just ask.",
    seoTitle: "TV Units – Elegant Entertainment Storage",
    seoDescription:
      "TV units at SALAAR's HOME – elegant entertainment stands with smart storage, arriving soon. Custom sizes available.",
  },
  {
    slug: "study-tables",
    label: "Study Tables",
    source: null,
    tagline: "A calm corner to think and work",
    short:
      "Solid-wood study desks with clean lines, cable management and room to focus.",
    description:
      "The right desk turns a corner into a workspace. Our study tables pair solid wood surfaces with clean, minimalist legs and practical cable management – made for focus, made to last. New designs are added regularly.",
    emptyTitle: "This collection is coming soon",
    emptyText:
      "We are crafting a new selection of study tables. Meanwhile, our team can build a custom piece to your exact size and finish – just ask.",
    seoTitle: "Study Tables – Solid Wood Desks",
    seoDescription:
      "Study tables at SALAAR's HOME – solid wood desks with clean lines, arriving soon. Custom sizes available.",
  },
];

/** Href for a category nav item. */
export function getCategoryNavHref(slug: string): string {
  return `/category/${slug}`;
}

/** Looks up a category nav item by slug. */
export function getCategoryNavItem(slug: string): CategoryNavItem | undefined {
  return NAV_CATEGORIES.find((c) => c.slug === slug);
}

/**
 * Categories shown in the header category bar, the mobile menu and the
 * search overlay – the six core collections. The footer still lists all
 * NAV_CATEGORIES.
 */
export const HEADER_CATEGORIES: CategoryNavItem[] = NAV_CATEGORIES.filter((cat) =>
  ["bed-sets", "beds", "wardrobes", "side-tables", "dressers", "mirrors"].includes(cat.slug)
);
