/**
 * SALAAR'S HOME – Settings & UI copy.
 * Edit this file to change prices format, search behaviour, gallery behaviour
 * and every visible UI string (buttons, labels, empty states…).
 */

/* ------------------------------- currency ------------------------------ */

export const CURRENCY = {
  /** ISO currency code used for price formatting. */
  code: "VND",
  /** Locale used for number formatting. */
  locale: "vi-VN",
};

/* ------------------------------- search -------------------------------- */

export const SEARCH = {
  /** Minimum characters before live results appear. */
  minQueryLength: 1,
  /** Maximum instant results shown in the search overlay. */
  maxResults: 8,
  /** Fields searched: name, category, price, delivery time, material, color. */
  fields: ["name", "category", "price", "deliveryTime", "material", "color"],
};

/* ---------------------------- product cards ---------------------------- */

export const PRODUCT_CARD = {
  viewDetails: "View Details",
  priceOnRequest: "Price on request",
  delivery: "Delivery: {time}",
};

/* ---------------------------- product page ----------------------------- */

/** Standard perks shown on every product details page. */
export const PRODUCT_PERKS = [
  "Solid wood construction",
  "Custom sizes available",
  "Professional assembly",
  "Structural warranty",
];

export const PRODUCT_PAGE = {
  priceNoteWithPrice: "Best price confirmed directly – give us a call.",
  priceNoteNoPrice: "Call us – we will share the best price for this piece.",
  featuresTitle: "Features",
  customNote: "Custom sizes and finishes available for this piece – just ask!",
  call: "Call {phone}",
  contactUs: "Contact Us",
  relatedEyebrow: "Continue Browsing",
  relatedTitle: "You May Also Like",
  specs: {
    material: "Material",
    dimensions: "Dimensions",
    delivery: "Delivery",
    availability: "Availability",
  },
  galleryAlt: "photo {index} of {total}",
};

/* ----------------------------- gallery -------------------------------- */

export const GALLERY = {
  /** Maximum thumbnails shown under the main image. */
  maxThumbnails: 8,
  openLightbox: "Open fullscreen view",
  closeLightbox: "Close (Esc)",
  previous: "Previous photo",
  next: "Next photo",
  counter: "{index} / {total}",
  zoomHint: "Scroll to zoom · Drag to move · Esc to close",
};

/* -------------------------------- shop --------------------------------- */

export const SHOP = {
  hero: {
    eyebrow: "The Collection",
    title: "Shop All Furniture",
    description:
      "Every piece in our showroom, in one place. Filter by category, price or material to find exactly what your home needs.",
  },
  filtersTitle: "Filters",
  searchTitle: "Search Product",
  searchPlaceholder: "Search products…",
  categoryTitle: "Category",
  allCategories: "All Categories",
  priceTitle: "Price Range",
  deliveryTitle: "Delivery Time",
  materialTitle: "Material",
  colorTitle: "Color",
  availabilityTitle: "Availability",
  availabilityAll: "All",
  collectionsTitle: "Collections",
  clearAll: "Clear All Filters",
  sortBy: "Sort by",
  showFilters: "Show Filters",
  hideFilters: "Hide Filters",
  closeFilters: "Close filters",
  productsFound: "{count} products found",
  productFound: "{count} product found",
  mobileCountSingular: "product",
  mobileCountPlural: "products",
  emptyTitle: "No products match your filters",
  emptyText:
    "Try adjusting your search or clearing some filters to see more pieces.",
  helpTitle: "Can't find what you need?",
  helpText: "We build custom pieces to your exact size and finish.",
  helpCta: "Contact Us",
};

/** Price range filters shown in the shop sidebar. */
export const PRICE_RANGES = [
  { id: "any", label: "Any price" },
  { id: "lt10", label: "Under 10M" },
  { id: "10-30", label: "10M – 30M" },
  { id: "30-60", label: "30M – 60M" },
  { id: "gt60", label: "Above 60M" },
] as const;

/** Sorting options shown in the shop. */
export const SORT_OPTIONS = [
  { id: "newest", label: "Newest" },
  { id: "oldest", label: "Oldest" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "az", label: "Name: A – Z" },
  { id: "za", label: "Name: Z – A" },
] as const;

/** Featured / Best Selling / Latest collection filters. */
export const SHOP_TAGS = [
  { id: "featured", label: "Featured" },
  { id: "bestSelling", label: "Best Selling" },
  { id: "isNew", label: "Latest" },
] as const;

/* ---------------------------- search overlay --------------------------- */

export const SEARCH_OVERLAY = {
  eyebrow: "Search the Showroom",
  placeholder: "Search bedroom sets, wardrobes, side tables…",
  submit: "Search",
  close: "Close search",
  popular: "Popular",
  resultsLabel: "Results",
  noResults: "No products match your search.",
  seeAll: "See all results",
};

/* ------------------------------- misc ---------------------------------- */

export const BREADCRUMB_HOME = "Home";

export const NOT_FOUND = {
  title: "This page seems to have moved",
  text: "The page you are looking for does not exist. Let us guide you back to the furniture.",
  backHome: "Back to Home",
  browseShop: "Browse the Shop",
};

export const PRODUCTS_EMPTY = {
  title: "No products yet",
  text: "Add a product object to src/data/products.ts and it will appear here automatically.",
};
