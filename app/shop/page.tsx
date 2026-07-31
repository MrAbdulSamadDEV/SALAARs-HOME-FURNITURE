import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ShopBrowser from "@/components/products/ShopBrowser";
import { getManifest, getAllProducts } from "@/utils/manifest";

export const metadata: Metadata = {
  title: "Shop All Furniture",
  description:
    "Browse the full SALAAR's HOME collection – bedroom sets, wardrobes, side tables and dressers. Filter by category, price, material or color.",
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
        eyebrow="The Collection"
        title="Shop All Furniture"
        description="Every piece in our showroom, in one place. Filter by category, price or material to find exactly what your home needs."
        image={manifest.banners[1] ?? null}
      />
      <Breadcrumb items={[{ label: "Shop" }]} />

      {/* Interactive grid: filters + search + sorting (products from the server) */}
      <ShopBrowser products={products} initialQuery={q ?? ""} />
    </>
  );
}
