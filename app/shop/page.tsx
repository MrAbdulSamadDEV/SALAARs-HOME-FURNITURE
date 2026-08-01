import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ShopBrowser from "@/components/products/ShopBrowser";
import { BREADCRUMB_HOME, SHOP } from "@/data/settings";
import { PAGE_SEO } from "@/data/seo";
import { getAllProducts } from "@/data/products";
import { getManifest } from "@/utils/manifest";

export const metadata: Metadata = {
  title: PAGE_SEO.shop.title,
  description: PAGE_SEO.shop.description,
  alternates: { canonical: "/shop" },
};

interface ShopPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { q } = await searchParams;
  const manifest = getManifest();
  const products = getAllProducts();

  return (
    <>
      <PageHero
        eyebrow={SHOP.hero.eyebrow}
        title={SHOP.hero.title}
        description={SHOP.hero.description}
        image={manifest.banners[1] ?? null}
      />
      <Breadcrumb items={[{ label: BREADCRUMB_HOME, href: "/" }, { label: SHOP.hero.title }]} />

      {/* Interactive grid: filters + search + sorting (products from the server) */}
      <ShopBrowser products={products} initialQuery={q ?? ""} />
    </>
  );
}
