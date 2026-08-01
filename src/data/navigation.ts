/**
 * SALAAR'S HOME – Navigation.
 * Edit this file to change the links shown in the header and mobile menu.
 */

/** Main navigation links (desktop + mobile menus). */
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/shop", label: "Shop" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
];

/** Links shown in the header desktop nav (subset, Collections is a dropdown). */
export const PRIMARY_LINKS = NAV_LINKS.filter((link) =>
  ["/", "/about", "/shop", "/contact", "/faq"].includes(link.href)
);

/** Labels used by the header UI. */
export const NAV_LABELS = {
  collections: "Collections",
  viewAllProducts: "View All Products",
  viewAll: "View All Products →",
  shopAll: "Shop All",
  search: "Search products",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  call: "Call",
};
