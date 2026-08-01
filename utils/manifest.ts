import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { ImageManifest } from "@/types";

/**
 * SERVER-ONLY helpers for reading public/images-manifest.json (hero, banners,
 * gallery and logo files). Products are NOT managed here anymore – they come
 * from src/data/products.ts (single source of truth).
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
