# SALAAR's HOME

Premium furniture showroom website for SALAAR's HOME, Karachi – built with **Next.js 15 (App Router)**, **TypeScript** and **Tailwind CSS v4**.

A beautiful, fast, fully responsive showroom site (NOT e-commerce – no login, cart, checkout or backend).

---

## Quick Start

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build:

```bash
npm run build
npm run start
```

The site is ready for one-click deployment on **Vercel**.

---

## Managing Images (no code changes needed)

**Just drop image files into the `public/` folders.** That's it.

| Folder | What appears there |
| --- | --- |
| `public/logo/` | The header logo (first image found). Empty → elegant text logo. |
| `public/banners/` | Home page hero slider (one slide per image) + inner-page hero banners. |
| `public/products/bedroom-sets/` | Bedroom Sets products |
| `public/products/wardrobes/` | Wardrobes products |
| `public/products/side-tables/` | Side Tables products |
| `public/products/dressers-mirrors/` | Dressers & Mirrors products |
| `public/gallery/` | About page showroom photos |

### How it works

1. `scripts/generate-images.mjs` scans those folders and writes `public/images-manifest.json`.
2. Pages read that manifest and render the images automatically.
3. The script runs automatically before `npm run dev` and `npm run build` (also on Vercel builds). Refresh manually anytime with `npm run images`.

Example – add three photos as `1.jpg`, `2.jpg`, `3.jpg` inside `public/products/bedroom-sets/`:

- New product cards appear on the Home page, Shop and category pages.
- Each product gets its own details page (`/product/bedroom-sets-1`, …) with gallery, specs, WhatsApp and Call buttons, plus related products.
- Product images use the **Next.js Image** component – lazy loading, responsive sizes, WebP/AVIF optimization – all automatic.

While a folder is empty, elegant brand placeholders are shown so the site always looks finished. They disappear the moment you add real photos.

> **Note:** after adding images you also need to refresh the products list. Either edit `src/data/products.ts` manually, or run `node scripts/generate-products-data.mjs` to re-scaffold it from the manifest (it then becomes editable by hand; it is NOT run automatically so your edits are never overwritten).

### Product names & prices (optional)

To give products real names/prices **without touching code**, add an `info.json` inside a product folder (e.g. `public/products/bedroom-sets/info.json`):

```json
[
  { "file": "1.jpg", "name": "Royal King Bed", "price": 245000 },
  { "file": "2.jpg", "name": "Classic Queen Bed", "price": 189000, "material": "Solid Oak", "dimensions": "160 x 200 cm" }
]
```

- `file` is matched to the image name (with or without extension).
- `name` – shown on cards and pages. `price` – shown when set (PKR). `null` → "Price on request".
- `material`, `dimensions`, `description`, `color`, `deliveryTime`, `availability` are optional per-product overrides.
- Run `npm run images` (and regenerate `src/data/products.ts` if you want it committed) after adding it.

### Replacing / deleting images

- Replace a photo: overwrite the same file name.
- Delete a photo: delete the file, run `npm run images` (or rebuild).
- Missing/renamed images never show a broken icon – a graceful "coming soon" placeholder is used automatically.

---

## Editing Content

Everything is plain data files – no database:

| File | What to edit |
| --- | --- |
| `src/data/site.ts` | Site name, tagline, base URL, description, keywords, business address/geo/hours for LocalBusiness SEO |
| `src/data/contact.ts` | Phone numbers, address, opening hours, Google Maps embed |
| `src/data/social.ts` | Facebook, TikTok and the floating WhatsApp button |
| `src/data/navigation.ts` | Main header links (Home, About, Shop, Contact, FAQ) |
| `src/data/category-navigation.ts` | Category bar below the header (creates `/category/<slug>` pages) |
| `src/data/categories.ts` | Product category copy, materials, dimensions, SEO text |
| `src/data/products.ts` | THE single source of truth for every product |
| `src/data/home.ts` | Hero slides, features, stats, home section copy |
| `src/data/about.ts` | About page copy |
| `src/data/faq.ts` | FAQ groups (also feed the FAQPage JSON-LD) |
| `src/data/settings.ts` | Currency, price ranges, search, UI strings |
| `src/data/seo.ts` | Default SEO copy + per-page titles/descriptions |
| `src/data/theme.ts` | Brand colors, fonts, shadows (regenerates `styles/tokens.css`) |
| `styles/globals.css` | Base styles, buttons, reusable component classes |

To change the map on the Contact page, edit `mapEmbed` in `src/data/contact.ts`:

```ts
mapEmbed: "https://www.google.com/maps?q=Your+Street+City&output=embed"
```

---

## Pages

- `/` – Home (hero slider, shop by category, best sellers, why choose us, contact CTA)
- `/about` – About Us (story, mission, vision, stats, values, visit us)
- `/shop` – full catalog with filters (category, price, delivery, material, color, availability, tags), instant search and sorting
- `/category/<slug>` – Bed Sets, Beds, Side Tables, Dressers, Mirrors, Wardrobes, TV Units (coming soon), Study Tables (coming soon)
- `/bedroom-sets`, `/wardrobes`, `/side-tables`, `/dressers-mirrors` – product-category pages
- `/product/[slug]` – details: gallery + lightbox, specs, features, call / contact buttons, related products
- `/contact` – info cards, WhatsApp / call / social buttons, Google Map embed
- `/faq` – accordion (delivery, custom furniture, payments, contact, delivery time, warranty)
- `/sitemap.xml`, `/robots.txt` – generated automatically (all pages + products)

---

## Tech notes

- **SEO**: per-page metadata + canonicals, Open Graph + Twitter cards, JSON-LD structured data (Organization, WebSite, FurnitureStore, Product, BreadcrumbList, ContactPage, FAQPage), `sitemap.xml` + `robots.txt` generated automatically (products included).
- **Performance**: static generation for every page, lazy-loaded optimized images, CSS-only animations, `next/font` for zero-layout-shift typography (Cormorant Garamond + Inter, `display: swap`).
- **Icons**: inline SVG components in `components/icons/` – no icon library needed (Font Awesome is only used in the footer social icons).
- No backend, no database, no auth – a pure frontend showroom.

## Contact

- WhatsApp / Call: **037 080 4453**
- Facebook: https://www.facebook.com/profile.php?id=61590742701515
- TikTok: https://www.tiktok.com/@salaars_farnichar
