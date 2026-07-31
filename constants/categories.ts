import type { CategoryInfo } from "@/types";

/**
 * The four product categories.
 * Edit the copy here to change descriptions, materials, etc.
 * The `slug` must match the folder name inside public/products/.
 */
export const CATEGORIES: CategoryInfo[] = [
  {
    slug: "bedroom-sets",
    name: "Bedroom Sets",
    tagline: "Complete bedroom collections, perfectly matched",
    short:
      "Full bedroom suites – bed, wardrobe, dresser and side tables designed to work as one harmonious set.",
    description:
      "A bedroom set from SALAAR's HOME turns an empty room into a complete, elegant retreat. Every set is designed as one cohesive collection – bed, wardrobe, dresser and side tables – so the finish, hardware and style always match perfectly. Choose from classic wood tones or modern minimal designs, all handcrafted from solid wood with premium fittings.",
    material: "Solid wood (oak, acacia or walnut finish) with premium MDF accents and smooth, durable lacquer.",
    dimensions: "Sets are made in full, queen and king sizes – exact dimensions vary by model.",
    deliveryTime: "7–20 days",
    colors: ["Walnut", "Natural Oak", "Smoked Oak", "Mahogany"],
    seoTitle: "Bedroom Sets – Complete Collections",
    seoDescription:
      "Explore handcrafted bedroom sets at SALAAR's HOME – beds, wardrobes, dressers and side tables designed as complete, matching collections.",
  },
  {
    slug: "wardrobes",
    name: "Wardrobes",
    tagline: "Storage that keeps your space beautiful",
    short:
      "Spacious wardrobes with sliding or hinged doors, built-in mirrors and smart internal storage.",
    description:
      "A well-designed wardrobe quietly keeps your home organized and calm. Our wardrobes combine generous storage with clean, beautiful lines – soft-close doors, adjustable shelves, drawers and hanging space for everything you own. From slim two-door designs to full wall-to-wall wardrobes, every piece is built to last a lifetime.",
    material: "Solid wood frame with premium laminate or lacquer finishes and soft-close hardware.",
    dimensions: "From 1.2 m to 2.4 m wide, 2.1 m to 2.7 m tall – custom dimensions available.",
    deliveryTime: "7–20 days",
    colors: ["Walnut", "Natural Oak", "Mahogany", "White Gloss"],
    seoTitle: "Wardrobes – Spacious & Elegant Storage",
    seoDescription:
      "Discover quality wardrobes at SALAAR's HOME – sliding and hinged door designs, smart internal storage, made to measure.",
  },
  {
    slug: "side-tables",
    name: "Side Tables",
    tagline: "Small pieces, big character",
    short:
      "Elegant bedside and accent tables in solid wood – the finishing touch for any room.",
    description:
      "The right side table finishes a room. Handcrafted from solid wood with clean joins and smooth finishes, our side tables bring warmth and function to the bedside, the sofa corner or the hallway. Available in a range of heights and styles to match any interior – simple, elegant and built to last.",
    material: "Solid wood tops with durable lacquer finish; metal or wood legs depending on design.",
    dimensions: "Approx. 40 x 40 x 55 cm – multiple styles and heights available.",
    deliveryTime: "1–3 days",
    colors: ["Natural Oak", "Walnut", "Light Oak", "Black"],
    seoTitle: "Side Tables – Elegant Accent Pieces",
    seoDescription:
      "Shop elegant solid wood side tables at SALAAR's HOME – bedside and accent tables in many styles and finishes.",
  },
  {
    slug: "dressers-mirrors",
    name: "Dressers & Mirrors",
    tagline: "Where beauty meets everyday function",
    short:
      "Dressers with storage plus matching mirrors – a classic, elegant corner for your room.",
    description:
      "A dresser is more than a place to get ready in the morning – it is a statement piece. Our dressers offer deep, smooth-gliding drawers for all your essentials, topped with a beautiful vanity mirror that completes the look. Classic and contemporary designs available in rich wood tones that grow more beautiful with age.",
    material: "Solid wood construction with hand-finished lacquer and premium mirror glass.",
    dimensions: "Dressers approx. 120 x 45 x 80 cm; mirrors approx. 90 x 110 cm – models vary.",
    deliveryTime: "3–7 days",
    colors: ["Walnut", "Mahogany", "Natural Oak", "White Gloss"],
    seoTitle: "Dressers & Mirrors – Classic Vanity Pieces",
    seoDescription:
      "Browse dressers and vanity mirrors at SALAAR's HOME – classic wooden dressers with elegant matching mirrors.",
  },
];

/** Looks up a category by its slug. */
export function getCategory(slug: string): CategoryInfo | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
