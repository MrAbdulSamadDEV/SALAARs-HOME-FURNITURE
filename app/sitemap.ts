import type { MetadataRoute } from "next";
import { CATEGORIES } from "@/data/categories";
import { NAV_CATEGORIES } from "@/data/category-navigation";
import { SITE } from "@/data/site";
import { getAllProducts } from "@/data/products";

/** XML sitemap – includes every product automatically. */
export default function sitemap(): MetadataRoute.Sitemap {
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

  const navCategoryRoutes = NAV_CATEGORIES.map((cat) => ({
    url: `${SITE.url}/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const productRoutes = getAllProducts()
    .filter((p) => !p.slug.includes("-ph-"))
    .map((product) => ({
      url: `${SITE.url}/product/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [...staticRoutes, ...navCategoryRoutes, ...categoryRoutes, ...productRoutes];
}
