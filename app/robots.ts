import type { MetadataRoute } from "next";
import { SITE } from "@/constants/site";

/** robots.txt – allow everything. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
