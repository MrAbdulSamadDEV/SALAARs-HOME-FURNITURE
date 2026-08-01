/**
 * SALAAR'S HOME – Products Data Generator
 * =======================================
 * Scaffolds src/data/products.ts from public/images-manifest.json so the
 * file can be edited by hand afterwards. Products.ts is the single source
 * of truth – this script is only needed when re-scaffolding from scratch:
 *
 *   node scripts/generate-products-data.mjs
 *
 * It is NOT wired into predev/prebuild, so your manual edits to
 * src/data/products.ts are never overwritten.
 */
import fs from "node:fs";
import path from "node:path";

const MANIFEST_PATH = path.join(process.cwd(), "public", "images-manifest.json");
const OUT_PATH = path.join(process.cwd(), "src", "data", "products.ts");

const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));

const toTs = (value) => JSON.stringify(value);

const lines = [];
lines.push(`/**
 * SALAAR'S HOME – Products
 * =========================
 * THE single source of truth for every product on the website.
 *
 * HOW IT WORKS
 * ------------
 * Add one object to PRODUCTS and the product automatically appears on:
 *   • Home (Best Selling section)   • Shop (with filters & search)
 *   • Category pages                • Search overlay (instant results)
 *   • Product details page          • Sitemap
 *
 * EDITABLE FIELDS (per product)
 * -----------------------------
 *   name, price (VND or null), image (path in /public), gallery (extra photos),
 *   description, material, dimensions, color, deliveryTime, availability,
 *   tags { featured, bestSelling, isNew }, order (sorting position).
 *
 * Images live in /public – reference them as "/products/<category>/<file>".
 * A missing image automatically falls back to a branded placeholder.
 */
import type { ProductItem } from "@/types";
import { getCategory } from "@/data/categories";
import { formatPrice } from "@/utils/links";

export const PRODUCTS: ProductItem[] = [`);

const categories = Object.keys(manifest.products);
for (const slug of categories) {
  lines.push(`  /* ------------------------------ ${slug} ------------------------------ */`);
  for (const p of manifest.products[slug]) {
    const tags =
      p.tags && typeof p.tags === "object"
        ? `{ featured: ${Boolean(p.tags.featured)}, bestSelling: ${Boolean(
            p.tags.bestSelling
          )}, isNew: ${Boolean(p.tags.isNew)} }`
        : "{}";
    lines.push(
      `  { id: ${toTs(p.id)}, slug: ${toTs(p.slug)}, category: ${toTs(
        p.category
      )}, name: ${toTs(p.name)}, price: ${p.price ?? "null"}, image: ${toTs(
        p.image
      )}, material: ${toTs(p.material)}, dimensions: ${toTs(p.dimensions)}, color: ${toTs(
        p.color
      )}, deliveryTime: ${toTs(p.deliveryTime)}, availability: ${toTs(
        p.availability
      )}, tags: ${tags}, order: ${p.order ?? 0} },`
    );
  }
  lines.push("");
}

lines.push(`];

/* ------------------------------ helpers ------------------------------- */

/** All products across every category. */
export function getAllProducts(): ProductItem[] {
  return PRODUCTS;
}

/** All products of a given category slug. */
export function getCategoryProducts(categorySlug: string): ProductItem[] {
  return PRODUCTS.filter((p) => p.category === categorySlug);
}

/** Finds one product by its URL slug. */
export function getProductBySlug(slug: string): ProductItem | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

/**
 * Related products: same category first, then others – excluding the current
 * product, limited to \`limit\` items.
 */
export function getRelatedProducts(product: ProductItem, limit = 4): ProductItem[] {
  const others = PRODUCTS.filter((p) => p.slug !== product.slug);
  const sameCategory = others.filter((p) => p.category === product.category);
  const rest = others.filter((p) => p.category !== product.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

/**
 * Gallery images for a product – its own photo first, then its optional
 * \`gallery\` field, then the other photos of the same category (deduplicated).
 */
export function getProductImages(product: ProductItem): string[] {
  const seen = new Set<string>();
  const list: string[] = [];
  const push = (src: string) => {
    if (!src || seen.has(src)) return;
    seen.add(src);
    list.push(src);
  };
  push(product.image);
  for (const src of product.gallery ?? []) push(src);
  for (const other of getCategoryProducts(product.category)) push(other.image);
  return list;
}

/** Turns a VND price token like "25tr", "25 trieu", "25m" or "25.000.000" into a number. */
function parsePriceToken(token: string): number | null {
  const t = token.replace(/,/g, ".").trim().toLowerCase();
  const match = t.match(/^(\\d+(?:\\.\\d+)?)\\s*(tr|trieu|triệu|m|milion|million|k|nghin)?$/);
  if (!match) return null;
  let value = parseFloat(match[1]);
  const unit = match[2];
  if (unit === "tr" || unit === "trieu" || unit === "triệu" || unit === "m" || unit === "milion" || unit === "million") {
    value *= 1_000_000;
  } else if (unit === "k" || unit === "nghin") {
    value *= 1_000;
  }
  return value;
}

/**
 * True when a product matches a free-text query. Searches:
 * name, category, price, delivery time, material, color and description.
 */
export function matchesProductQuery(product: ProductItem, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;

  const haystack: string[] = [product.name, product.category.replace(/-/g, " ")];
  const category = getCategory(product.category);
  if (category) haystack.push(category.name, category.short);
  if (product.material) haystack.push(product.material);
  if (product.deliveryTime) haystack.push(product.deliveryTime);
  if (product.color) haystack.push(product.color);
  if (product.description) haystack.push(product.description);

  if (haystack.some((text) => text.toLowerCase().includes(q))) return true;

  /* Price matching – "25tr", "25m", "25.000.000" or raw digits */
  if (product.price !== null) {
    const token = parsePriceToken(q);
    if (token !== null && product.price === token) return true;
    const digits = q.replace(/\\D/g, "");
    if (digits && formatPrice(product.price).replace(/\\D/g, "").includes(digits)) return true;
  }

  return false;
}

/** Search helper with light relevance ranking – used by the shop and the search overlay. */
export function searchProducts(query: string, limit?: number): ProductItem[] {
  const q = query.trim().toLowerCase();
  const scored = PRODUCTS.map((product) => {
    let score = 0;
    if (!q) score = 0;
    else {
      if (product.name.toLowerCase().includes(q)) score += 3;
      if (matchesProductQuery(product, q)) score += 1;
      if (product.tags?.bestSelling) score += 2;
      if (product.tags?.featured) score += 1;
      if (product.tags?.isNew) score += 1;
    }
    return { product, score };
  })
    .filter((entry) => !q || entry.score > 0)
    .sort((a, b) => b.score - a.score || (b.product.order ?? 0) - (a.product.order ?? 0))
    .map((entry) => entry.product);

  return limit ? scored.slice(0, limit) : scored;
}
`);

fs.writeFileSync(OUT_PATH, lines.join("\n"), "utf8");
console.log(`\n  Products data → src/data/products.ts (${categories.length} categories)`);
for (const slug of categories) {
  console.log(`  ${slug.padEnd(17)}: ${manifest.products[slug].length} item(s)`);
}
console.log("\n");
