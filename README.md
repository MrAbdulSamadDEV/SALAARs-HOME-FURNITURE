# SALAAR's HOME

Premium furniture showroom website — built with **Next.js 15 (App Router)**, **TypeScript** and **Tailwind CSS v4**.

A beautiful, fast, fully responsive showroom site (NOT e-commerce — no login, cart, checkout or backend).

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
| `public/hero/` | Home page hero slider (auto-rotating, one slide per image). |
| `public/banners/` | "Latest Collections" cards + inner page banners. |
| `public/products/bedroom-sets/` | Bedroom Sets products |
| `public/products/beds/` | Beds products |
| `public/products/wardrobes/` | Wardrobes products |
| `public/products/side-tables/` | Side Tables products |
| `public/products/dressers-mirrors/` | Dressers & Mirrors products |
| `public/gallery/` | Welcome/About section images |
| `public/icons/` | Your own custom icons (optional) |

### How it works

1. A script (`scripts/generate-images.mjs`) scans those folders and writes
   `public/images-manifest.json`.
2. Every page reads that manifest and renders the images automatically.
3. The script runs automatically before `npm run dev` and `npm run build`
   (also runs on Vercel builds). Or refresh manually anytime with `npm run images`.

Example — add three photos as `1.jpg`, `2.jpg`, `3.jpg` inside `public/products/beds/`:

- 3 new product cards appear on the Home page, Shop and /beds pages.
- Each product gets its own details page (`/product/beds-1`, …) with gallery, specs,
  WhatsApp and Call buttons, plus related products.
- Product images use the **Next.js Image** component — lazy loading, responsive
  sizes, WebP/AVIF optimization — all automatic.

While a folder is empty, beautiful brand placeholders are shown so the site always
looks finished. They disappear the moment you add real photos.

### Product names & prices (optional)

To give products real names/prices **without touching code**, add an `info.json`
inside a product folder (e.g. `public/products/beds/info.json`):

```json
[
  { "file": "1.jpg", "name": "Royal King Bed", "price": 24500000 },
  { "file": "2.jpg", "name": "Classic Queen Bed", "price": 18900000 },
  { "file": "3.jpg", "name": "Walnut Platform Bed", "price": 21500000, "material": "Solid walnut", "dimensions": "180 x 200 cm" }
]
```

- `file` is matched to the image name (with or without extension).
- `name` — shown on cards and pages. `price` — shown when set (VND).
- `material`, `dimensions`, `description` are optional per-product overrides.
- Run `npm run images` after adding it.

### Replacing / deleting images

- Replace a photo: overwrite the same file name.
- Delete a photo: delete the file, run `npm run images` (or rebuild).
- Missing/renamed images never show a broken icon — a graceful "coming soon"
  placeholder is used automatically.

---

## Editing Content

Everything is plain data files — no database:

| File | What to edit |
| --- | --- |
| `constants/site.ts` | Phone, WhatsApp, Facebook, TikTok, address, map embed, SEO base URL |
| `constants/categories.ts` | Category names, descriptions, materials, dimensions, SEO text |
| `constants/content.ts` | Welcome text, features, stats, collections, reviews, all FAQ answers |
| `styles/globals.css` | Brand colors (ink / cream / wood / gold), fonts, buttons |
| `types/index.ts` | Shared TypeScript types |

To change the map on the Contact page, edit `mapEmbed` in `constants/site.ts`:

```ts
mapEmbed: "https://www.google.com/maps?q=Your+Street+City&output=embed"
```

---

## Pages

- `/` — Home (hero, welcome, categories, featured products, why choose us, collections, reviews, contact CTA)
- `/about` — About Us (story, mission, vision, why choose us, gallery)
- `/shop` — full catalog with category filter + instant search
- `/bedroom-sets`, `/beds`, `/wardrobes`, `/side-tables`, `/dressers-mirrors` — category pages
- `/product/[slug]` — details: gallery, material, dimensions, related products, WhatsApp & Call buttons
- `/contact` — form (opens WhatsApp), call / Facebook / TikTok buttons, Google Map
- `/faq` — accordion (delivery, custom furniture, payments, contact, delivery time, warranty)

---

## Tech notes

- **SEO**: per-page metadata, Open Graph, JSON-LD structured data (FurnitureStore +
  Product), `sitemap.xml` + `robots.txt` generated automatically (products included).
- **Performance**: static generation for every page (~103 kB shared JS),
  lazy-loaded optimized images, smooth CSS-only animations, `next/font` for
  zero-layout-shift typography (Playfair Display + Jost).
- **Icons**: inline SVG components in `components/icons/` — no icon library needed.
- No backend, no database, no auth — a pure frontend showroom.

## Contact

- WhatsApp / Call: **0370 804 453**
- Facebook: https://www.facebook.com/profile.php?id=61590742701515
- TikTok: https://www.tiktok.com/@salaars_farnichar
