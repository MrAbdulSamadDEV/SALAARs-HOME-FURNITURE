/**
 * SALAAR'S HOME – Image Manifest Generator
 * =========================================
 *
 * HOW IT WORKS
 * ------------
 * 1. This script scans every folder inside /public.
 * 2. It writes a single JSON file: public/images-manifest.json
 * 3. The website reads that manifest and renders the images automatically.
 *
 * 4. Just copy your images into the folders (e.g. public/products/bedroom-sets/1.jpg)
 *    and they appear on the website. No code changes are needed.
 *
 * 5. When a folder is empty, elegant SVG placeholders are used so the site
 *    always looks complete. They disappear automatically once you add photos.
 *
 * RUN
 * ---
 *   npm run images      → refresh the manifest manually
 *   npm run dev         → runs automatically before starting
 *   npm run build       → runs automatically before building (Vercel included)
 *
 * OPTIONAL: PRODUCT NAMES & PRICES
 * --------------------------------
 * To give products real names/prices without touching code, add an info.json
 * inside a product folder, e.g. public/products/bedroom-sets/info.json:
 *
 *   [
 *     { "file": "1.jpg", "name": "Royal King Bed", "price": 24500000 },
 *     { "file": "2.jpg", "name": "Classic Queen Bed", "price": 18900000, "material": "Solid Oak", "dimensions": "160 x 200 cm" }
 *   ]
 *
 * "file" is matched against the image file name (with or without extension).
 * Everything else is optional.
 */
import fs from "node:fs";
import path from "node:path";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const PLACEHOLDER_DIR = path.join(PUBLIC_DIR, "placeholders");
const MANIFEST_PATH = path.join(PUBLIC_DIR, "images-manifest.json");

const IMAGE_EXTS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".avif",
  ".svg",
  ".gif",
]);

const CATEGORIES = [
  {
    slug: "bedroom-sets",
    label: "Bedroom Sets",
    shape: "bed",
    material:
      "Solid wood (oak, acacia or walnut finish) with premium MDF accents and smooth, durable lacquer.",
    dimensions: "Sets are made in full, queen and king sizes – exact dimensions vary by model.",
    deliveryTime: "7–20 days",
    colors: ["Walnut", "Natural Oak", "Smoked Oak", "Mahogany"],
  },
  {
    slug: "wardrobes",
    label: "Wardrobes",
    shape: "wardrobe",
    material: "Solid wood frame with premium laminate or lacquer finishes and soft-close hardware.",
    dimensions: "From 1.2 m to 2.4 m wide, 2.1 m to 2.7 m tall – custom dimensions available.",
    deliveryTime: "7–20 days",
    colors: ["Walnut", "Natural Oak", "Mahogany", "White Gloss"],
  },
  {
    slug: "side-tables",
    label: "Side Tables",
    shape: "table",
    material: "Solid wood tops with durable lacquer finish; metal or wood legs depending on design.",
    dimensions: "Approx. 40 x 40 x 55 cm – multiple styles and heights available.",
    deliveryTime: "1–3 days",
    colors: ["Natural Oak", "Walnut", "Light Oak", "Black"],
  },
  {
    slug: "dressers-mirrors",
    label: "Dressers & Mirrors",
    shape: "dresser",
    material: "Solid wood construction with hand-finished lacquer and premium mirror glass.",
    dimensions: "Dressers approx. 120 x 45 x 80 cm; mirrors approx. 90 x 110 cm – models vary.",
    deliveryTime: "3–7 days",
    colors: ["Walnut", "Mahogany", "Natural Oak", "White Gloss"],
  },
];

const BANNER_COUNT = 3;
const GALLERY_COUNT = 4;
const PRODUCT_PLACEHOLDERS_PER_CATEGORY = 3;

/* ---------------------------------- utils --------------------------------- */

const ensureDir = (dir) => fs.mkdirSync(dir, { recursive: true });

const naturalSort = (a, b) =>
  a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });

/** Lists image files inside a folder (sorted, natural order: 1,2,3,...10). */
function listImages(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => IMAGE_EXTS.has(path.extname(f).toLowerCase()))
    .sort(naturalSort);
}

/** Absolute path → public URL (always forward slashes). */
const toUrl = (absPath) =>
  "/" + path.relative(PUBLIC_DIR, absPath).split(path.sep).join("/");

const urlOf = (...parts) => "/" + parts.join("/");

/* ------------------------------ placeholders ------------------------------ */

/** Creates an elegant brand-style SVG placeholder (only if it doesn't exist). */
function writePlaceholderSvg(fileName, { main, sub, w = 1200, h = 900, shape }) {
  const file = path.join(PLACEHOLDER_DIR, fileName);
  if (fs.existsSync(file)) return false;

  const shapeSvg = shapeSvgFor(shape);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1b1712"/>
      <stop offset="1" stop-color="#0d0b09"/>
    </linearGradient>
    <linearGradient id="glow" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#e3c877"/>
      <stop offset="0.5" stop-color="#c9a227"/>
      <stop offset="1" stop-color="#8a6a1c"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <rect x="2.5%" y="2.5%" width="95%" height="95%" fill="none" stroke="url(#glow)" stroke-opacity="0.4" stroke-width="2"/>
  <rect x="4%" y="4%" width="92%" height="92%" fill="none" stroke="#c9a227" stroke-opacity="0.14" stroke-width="1"/>
  ${shapeSvg}
  <text x="50%" y="62%" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="${Math.round(Math.min(w, h) * 0.07)}" fill="#ece5d8" letter-spacing="2">${escapeXml(main)}</text>
  <text x="50%" y="70%" text-anchor="middle" font-family="Verdana, Arial, sans-serif" font-size="${Math.round(Math.min(w, h) * 0.026)}" fill="#c9a227" letter-spacing="7" text-transform="uppercase">${escapeXml(sub)}</text>
  <text x="50%" y="${h - 32}" text-anchor="middle" font-family="Georgia, serif" font-size="${Math.round(Math.min(w, h) * 0.028)}" fill="#8a8578" letter-spacing="5">S A L A A R ' S   H O M E</text>
</svg>
`;
  fs.mkdirSync(PLACEHOLDER_DIR, { recursive: true });
  fs.writeFileSync(file, svg, "utf8");
  return true;
}

const escapeXml = (s) =>
  String(s).replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c]);

/** Minimal line-art for each furniture category. */
function shapeSvgFor(shape) {
  const common = 'stroke="#c9a227" stroke-opacity="0.55" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"';
  switch (shape) {
    case "bed":
      return `<g ${common} transform="translate(0,-40)">
        <path d="M 340 560 h 520 v 60 h -520 z"/>
        <path d="M 340 560 v -140 h 60 v 140"/>
        <path d="M 460 470 a 34 34 0 1 1 68 0"/>
        <path d="M 560 470 a 34 34 0 1 1 68 0"/>
        <path d="M 720 430 h 140 v 130"/>
      </g>`;
    case "wardrobe":
      return `<g ${common} transform="translate(0,-40)">
        <rect x="360" y="360" width="480" height="280" rx="6"/>
        <path d="M 600 360 v 280"/>
        <path d="M 470 420 v 140 M 730 420 v 140"/>
      </g>`;
    case "table":
      return `<g ${common} transform="translate(0,-40)">
        <rect x="400" y="420" width="400" height="26" rx="6"/>
        <path d="M 440 446 v 190 M 760 446 v 190"/>
      </g>`;
    case "dresser":
      return `<g ${common} transform="translate(0,-40)">
        <rect x="380" y="360" width="440" height="280" rx="6"/>
        <path d="M 600 360 v 280"/>
        <path d="M 600 420 h 220 M 600 500 h 220"/>
        <path d="M 470 390 h 34 M 470 470 h 34 M 470 550 h 34"/>
        <path d="M 690 470 h 34 M 690 550 h 34"/>
      </g>`;
    default:
      return "";
  }
}

/** Ensures placeholder files exist and returns their public URLs. */
function ensurePlaceholders(kind, label, count) {
  const urls = [];
  for (let i = 1; i <= count; i++) {
    const fileName = `${kind}-${i}.svg`;
    writePlaceholderSvg(fileName, {
      main: `${label}`,
      sub: i > 1 ? `Piece 0${i}` : "Featured",
      w: 1200,
      h: 900,
      shape: kind === "banners" ? "bed" : undefined,
    });
    urls.push(urlOf("placeholders", fileName));
  }
  return urls;
}

/* --------------------------------- builder -------------------------------- */

/** Rotating marketing tags so placeholders look realistic. */
const TAG_ROTATION = [
  { featured: true, bestSelling: true, isNew: true },
  { featured: false, bestSelling: true, isNew: false },
  { featured: false, bestSelling: false, isNew: true },
];

let orderCounter = 0;

/**
 * Adds premium display fields to a product (material, dimensions, color,
 * delivery time, availability, tags) using the category defaults.
 */
function enrichProduct(item, cat, index) {
  const i = index ?? 0;
  return {
    ...item,
    material: item.material ?? cat.material,
    dimensions: item.dimensions ?? cat.dimensions,
    color: item.color ?? cat.colors[i % cat.colors.length],
    deliveryTime: item.deliveryTime ?? cat.deliveryTime,
    availability: item.availability ?? (i % 3 === 2 ? "Made to Order" : "In Stock"),
    tags: item.tags ?? TAG_ROTATION[i % TAG_ROTATION.length],
    order: item.order ?? orderCounter++,
  };
}

function buildProductItems(slug, label) {
  const dir = path.join(PUBLIC_DIR, "products", slug);
  const cat = CATEGORIES[slug] ?? { material: "Solid Wood", dimensions: "Custom", deliveryTime: "5–10 days", colors: ["Natural"] };

  // Optional info.json → custom names / prices / materials (see header comment)
  let info = {};
  const infoPath = path.join(dir, "info.json");
  if (fs.existsSync(infoPath)) {
    try {
      const rows = JSON.parse(fs.readFileSync(infoPath, "utf8"));
      for (const row of rows) {
        if (row.file) info[String(row.file)] = row;
      }
    } catch (err) {
      console.warn(`  ⚠ ${slug}/info.json is not valid JSON – skipped (${err.message})`);
    }
  }

  const files = listImages(dir).filter((f) => f.toLowerCase() !== "info.json");
  const items = files.map((file, i) => {
    const stem = path.basename(file, path.extname(file));
    const meta = info[stem] ?? info[file] ?? null;
    const num = parseInt(stem, 10) || i + 1;
    const base = {
      id: `${slug}-${stem}`,
      slug: `${slug}-${stem}`,
      category: slug,
      name: meta?.name || `${label} – Design ${num}`,
      price: typeof meta?.price === "number" ? meta.price : null,
      image: toUrl(path.join(dir, file)),
      ...(meta?.material ? { material: meta.material } : {}),
      ...(meta?.dimensions ? { dimensions: meta.dimensions } : {}),
      ...(meta?.description ? { description: meta.description } : {}),
      ...(meta?.color ? { color: meta.color } : {}),
      ...(meta?.deliveryTime ? { deliveryTime: meta.deliveryTime } : {}),
      ...(meta?.availability ? { availability: meta.availability } : {}),
    };
    return enrichProduct(base, cat, i);
  });

  // Empty folder → serve placeholders so the site always looks complete
  if (items.length === 0) {
    const placeholders = ensurePlaceholders(`products-${slug}`, label, PRODUCT_PLACEHOLDERS_PER_CATEGORY);
    for (let i = 0; i < placeholders.length; i++) {
      items.push(
        enrichProduct(
          {
            id: `${slug}-ph-${i + 1}`,
            slug: `${slug}-ph-${i + 1}`,
            category: slug,
            name: `${label} – Model ${i + 1}`,
            price: null,
            image: placeholders[i],
          },
          cat,
          i
        )
      );
    }
  }

  return items;
}

function buildManifest() {
  // Logo (optional) – first image in public/logo is used as the header logo
  const logoFiles = listImages(path.join(PUBLIC_DIR, "logo"));
  const logo = logoFiles.length ? toUrl(path.join(PUBLIC_DIR, "logo", logoFiles[0])) : null;

  // Hero slides – sourced from public/banners/ (the site hero renders banner images)
  const bannerFiles = listImages(path.join(PUBLIC_DIR, "banners"));
  const bannerUrls = bannerFiles.length
    ? bannerFiles.map((f) => toUrl(path.join(PUBLIC_DIR, "banners", f)))
    : ensurePlaceholders("banner", "The Collection", BANNER_COUNT);
  const hero = bannerUrls;

  // Banner / collection images
  const banners = bannerUrls;

  // Gallery images
  const galleryFiles = listImages(path.join(PUBLIC_DIR, "gallery"));
  const gallery = galleryFiles.length
    ? galleryFiles.map((f) => toUrl(path.join(PUBLIC_DIR, "gallery", f)))
    : ensurePlaceholders("gallery", "Inside the Showroom", GALLERY_COUNT);

  // Fallback used when a file is missing or renamed
  writePlaceholderSvg("fallback.svg", {
    main: "Image coming soon",
    sub: "New photos arriving",
    w: 1200,
    h: 900,
  });

  // Products
  const products = {};
  for (const cat of CATEGORIES) {
    products[cat.slug] = buildProductItems(cat.slug, cat.label);
  }

  return {
    generatedAt: new Date().toISOString(),
    logo,
    hero,
    banners,
    gallery,
    products,
  };
}

/* ----------------------------------- main ---------------------------------- */

ensureDir(PUBLIC_DIR);

const manifest = buildManifest();
fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), "utf8");

// Summary
const count = (arr) => arr.length;
console.log("\n  SALAAR'S HOME – image manifest generated");
console.log("  " + "─".repeat(44));
console.log(`  logo            : ${manifest.logo ? "found" : "not set (text logo used)"}`);
console.log(`  hero            : ${count(manifest.hero)} image(s)`);
console.log(`  banners         : ${count(manifest.banners)} image(s)`);
console.log(`  gallery         : ${count(manifest.gallery)} image(s)`);
for (const cat of CATEGORIES) {
  const items = manifest.products[cat.slug];
  const placeholders = items.filter((i) => i.slug.includes("-ph-")).length;
  const real = items.length - placeholders;
  console.log(
    `  ${cat.slug.padEnd(17)}: ${items.length} item(s)` +
      (placeholders ? `  (${real} real, ${placeholders} placeholder)` : "")
  );
}
console.log("  " + "─".repeat(44));
console.log("  → public/images-manifest.json ready\n");
console.log("  Tip: drop images into public/ folders and run `npm run images`.\n");
