import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { ImageManifest, ProductItem } from "@/types";

/**
 * SERVER-ONLY helpers for reading public/images-manifest.json.
 * Use these in server components (pages, sitemap, metadata).
 * Client components should use hooks/useManifest.ts instead.
 */

const MANIFEST_PATH = path.join(process.cwd(), "public", "images-manifest.json");

let cached: ImageManifest | null = null;

export function getManifest(): ImageManifest {
  if (cached) return cached;
  try {
    cached = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8")) as ImageManifest;
  } catch {
    cached = { logo: null, hero: [], banners: [], gallery: [], products: {} };
  }
  return cached;
}

/** All products of a given category slug. */
export function getCategoryItems(categorySlug: string): ProductItem[] {
  return getManifest().products[categorySlug] ?? [];
}

/** All products across every category. */
export function getAllProducts(): ProductItem[] {
  return Object.values(getManifest().products).flat();
}

/** Finds one product by its URL slug. */
export function getProductBySlug(slug: string): ProductItem | undefined {
  return getAllProducts().find((p) => p.slug === slug);
}

/**
 * Related products: same category first, then others – excluding the current
 * product, limited to `limit` items.
 */
export function getRelatedProducts(product: ProductItem, limit = 4): ProductItem[] {
  const all = getAllProducts().filter((p) => p.slug !== product.slug);
  const sameCategory = all.filter((p) => p.category === product.category);
  const others = all.filter((p) => p.category !== product.category);
  return [...sameCategory, ...others].slice(0, limit);
}
