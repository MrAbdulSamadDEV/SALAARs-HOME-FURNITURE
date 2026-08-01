"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import ProductCard from "@/components/products/ProductCard";
import Container from "@/components/ui/Container";
import { CATEGORIES } from "@/data/categories";
import { BEST_SELLING_SECTION } from "@/data/home";
import { getAllProducts } from "@/data/products";
import type { ProductItem } from "@/types";

/**
 * "Best Selling Products" – tabbed product browser fed by src/data/products.ts.
 * Products tagged `bestSelling` are prioritized.
 */
export default function BestSellingProducts() {
  const [tab, setTab] = useState("all");

  const allProducts: ProductItem[] = useMemo(() => getAllProducts(), []);

  const products = useMemo(() => {
    const list = tab === "all" ? allProducts : allProducts.filter((p) => p.category === tab);
    return [...list]
      .sort((a, b) => Number(b.tags?.bestSelling ?? false) - Number(a.tags?.bestSelling ?? false))
      .slice(0, 8);
  }, [allProducts, tab]);

  const tabs = [{ slug: "all", name: BEST_SELLING_SECTION.allTab }, ...CATEGORIES];

  return (
    <section className="bg-linen py-16 sm:py-20 lg:py-24">
      <Container>
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">
                <span className="h-px w-8 bg-gold-deep" aria-hidden="true" />
                {BEST_SELLING_SECTION.eyebrow}
              </p>
              <h2 className="title-lg">{BEST_SELLING_SECTION.title}</h2>
            </div>
            <Link href="/shop" prefetch className="btn-outline-dark shrink-0">
              {BEST_SELLING_SECTION.viewAll}
            </Link>
          </div>
        </Reveal>

        {/* Tabs */}
        <Reveal delay={100}>
          <div className="no-scrollbar mt-10 flex gap-2.5 overflow-x-auto" role="tablist" aria-label="Product categories">
            {tabs.map((tabItem) => (
              <button
                key={tabItem.slug}
                type="button"
                role="tab"
                aria-selected={tab === tabItem.slug}
                onClick={() => setTab(tabItem.slug)}
                className={`shrink-0 rounded-full border px-5 py-2.5 text-xs font-semibold tracking-[0.14em] uppercase transition-all duration-300 ${
                  tab === tabItem.slug
                    ? "border-gold bg-gold text-ink shadow-gold"
                    : "border-line bg-white text-stone hover:border-gold hover:text-gold-deep"
                }`}
              >
                {tabItem.name}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {products.map((product, i) => (
            <Reveal key={product.id} delay={Math.min(i, 3) * 80}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
