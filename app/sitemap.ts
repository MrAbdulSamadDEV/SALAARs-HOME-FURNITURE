import type { MetadataRoute } from "next";
import { CATEGORIES } from "@/data/categories";
import { NAV_CATEGORIES } from "@/data/category-navigation";
import { SITE } from "@/data/site";
import { getAllProducts } from "@/data/products";

/** XML sitemap – includes every product automatically. */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE.url}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE.url}/shop`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE.url}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE.url}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE.url}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${SITE.url}/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const navCategoryRoutes: MetadataRoute.Sitemap = NAV_CATEGORIES.map((cat) => ({
    url: `${SITE.url}/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = getAllProducts()
    .filter((p) => !p.slug.includes("-ph-"))
    .map((product) => ({
      url: `${SITE.url}/product/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  return [...staticRoutes, ...navCategoryRoutes, ...categoryRoutes, ...productRoutes];
}
