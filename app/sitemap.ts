import type { MetadataRoute } from "next";
import { CATEGORIES } from "@/constants/categories";
import { SITE } from "@/constants/site";
import { getManifest } from "@/utils/manifest";

/** XML sitemap – includes every product automatically. */
export default function sitemap(): MetadataRoute.Sitemap {
  const manifest = getManifest();
  const staticRoutes = ["", "/about", "/shop", "/contact", "/faq"].map((route) => ({
    url: `${SITE.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const categoryRoutes = CATEGORIES.map((cat) => ({
    url: `${SITE.url}/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const productRoutes = Object.values(manifest.products)
    .flat()
    .filter((p) => !p.slug.includes("-ph-"))
    .map((product) => ({
      url: `${SITE.url}/product/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
