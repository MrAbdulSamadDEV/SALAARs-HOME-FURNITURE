"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ProductGrid from "@/components/products/ProductGrid";
import Container from "@/components/ui/Container";
import { CATEGORIES } from "@/constants/categories";
import { CloseIcon, SearchIcon } from "@/components/icons";
import type { ProductItem } from "@/types";

interface ShopBrowserProps {
  products: ProductItem[];
  initialQuery?: string;
}

const PRICE_RANGES = [
  { id: "any", label: "Any price", test: () => true },
  { id: "lt10", label: "Under 10M", test: (p: number) => p < 10_000_000 },
  { id: "10-30", label: "10M – 30M", test: (p: number) => p >= 10_000_000 && p < 30_000_000 },
  { id: "30-60", label: "30M – 60M", test: (p: number) => p >= 30_000_000 && p < 60_000_000 },
  { id: "gt60", label: "Above 60M", test: (p: number) => p >= 60_000_000 },
];

const SORT_OPTIONS = [
  { id: "newest", label: "Newest" },
  { id: "oldest", label: "Oldest" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "az", label: "Name: A – Z" },
  { id: "za", label: "Name: Z – A" },
];

const TAG_OPTIONS = [
  { id: "featured", label: "Featured" },
  { id: "bestSelling", label: "Best Selling" },
  { id: "isNew", label: "Latest" },
] as const;

type TagId = (typeof TAG_OPTIONS)[number]["id"];

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-stone transition-colors hover:text-ink">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 shrink-0 cursor-pointer rounded border-line accent-gold-deep"
      />
      {label}
    </label>
  );
}

function SidebarTitle({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-[11px] font-semibold tracking-[0.25em] text-ink uppercase">{children}</p>;
}

/**
 * Interactive shop browser – smart filter sidebar (category, price, delivery,
 * material, color, availability, tags), search and sorting.
 * Products are passed in from the server (no extra requests).
 */
export default function ShopBrowser({ products, initialQuery = "" }: ShopBrowserProps) {
  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState("any");
  const [deliveries, setDeliveries] = useState<string[]>([]);
  const [materials, setMaterials] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [availability, setAvailability] = useState<string>("all");
  const [tags, setTags] = useState<TagId[]>([]);
  const [sort, setSort] = useState("newest");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const uniqueDeliveries = useMemo(
    () => [...new Set(products.map((p) => p.deliveryTime).filter(Boolean))] as string[],
    [products]
  );
  const uniqueMaterials = useMemo(
    () => [...new Set(products.map((p) => p.material).filter(Boolean))] as string[],
    [products]
  );
  const uniqueColors = useMemo(
    () => [...new Set(products.map((p) => p.color).filter(Boolean))] as string[],
    [products]
  );

  const toggle = (list: string[], value: string, setter: (v: string[]) => void) =>
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const priceTest = PRICE_RANGES.find((r) => r.id === priceRange)?.test ?? (() => true);

    const list = products.filter((product) => {
      const matchesQuery =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.category.replace(/-/g, " ").includes(q);
      if (!matchesQuery) return false;

      if (activeCategory !== "all" && product.category !== activeCategory) return false;

      if (product.price !== null && !priceTest(product.price)) return false;
      if (product.price === null && priceRange !== "any") return false;

      if (deliveries.length > 0 && product.deliveryTime && !deliveries.includes(product.deliveryTime))
        return false;
      if (materials.length > 0 && product.material && !materials.includes(product.material)) return false;
      if (colors.length > 0 && product.color && !colors.includes(product.color)) return false;

      if (availability !== "all" && product.availability !== availability) return false;

      for (const tag of tags) {
        if (!product.tags?.[tag]) return false;
      }

      return true;
    });

    switch (sort) {
      case "oldest":
        return [...list].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      case "price-asc":
        return [...list].sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
      case "price-desc":
        return [...list].sort((a, b) => (b.price ?? -1) - (a.price ?? -1));
      case "az":
        return [...list].sort((a, b) => a.name.localeCompare(b.name));
      case "za":
        return [...list].sort((a, b) => b.name.localeCompare(a.name));
      default:
        return [...list].sort((a, b) => (b.order ?? 0) - (a.order ?? 0));
    }
  }, [products, query, activeCategory, priceRange, deliveries, materials, colors, availability, tags, sort]);

  const hasActiveFilters =
    query !== "" ||
    activeCategory !== "all" ||
    priceRange !== "any" ||
    deliveries.length > 0 ||
    materials.length > 0 ||
    colors.length > 0 ||
    availability !== "all" ||
    tags.length > 0;

  const clearAll = () => {
    setQuery("");
    setActiveCategory("all");
    setPriceRange("any");
    setDeliveries([]);
    setMaterials([]);
    setColors([]);
    setAvailability("all");
    setTags([]);
  };

  const filterPanel = (
    <div className="space-y-7">
      {/* Search */}
      <div>
        <SidebarTitle>Search Product</SidebarTitle>
        <label className="relative block">
          <span className="sr-only">Search products</span>
          <SearchIcon className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-mist" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products…"
            className="w-full rounded-full border border-line bg-cream py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-mist focus:border-gold focus:ring-2 focus:ring-gold/25 focus:outline-none"
          />
        </label>
      </div>

      {/* Category */}
      <div>
        <SidebarTitle>Category</SidebarTitle>
        <div className="space-y-2.5">
          {[{ slug: "all", name: "All Categories" }, ...CATEGORIES].map((cat) => (
            <label
              key={cat.slug}
              className={`flex cursor-pointer items-center justify-between rounded-full border px-4 py-2 text-sm transition-all duration-300 ${
                activeCategory === cat.slug
                  ? "border-gold bg-gold/10 font-semibold text-gold-deep"
                  : "border-line bg-white text-stone hover:border-gold/60 hover:text-ink"
              }`}
            >
              {cat.name}
              <input
                type="radio"
                name="category"
                checked={activeCategory === cat.slug}
                onChange={() => setActiveCategory(cat.slug)}
                className="sr-only"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <SidebarTitle>Price Range</SidebarTitle>
        <div className="space-y-2.5">
          {PRICE_RANGES.map((range) => (
            <label
              key={range.id}
              className={`flex cursor-pointer items-center justify-between rounded-full border px-4 py-2 text-sm transition-all duration-300 ${
                priceRange === range.id
                  ? "border-gold bg-gold/10 font-semibold text-gold-deep"
                  : "border-line bg-white text-stone hover:border-gold/60 hover:text-ink"
              }`}
            >
              {range.label}
              <input
                type="radio"
                name="price"
                checked={priceRange === range.id}
                onChange={() => setPriceRange(range.id)}
                className="sr-only"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Delivery time */}
      {uniqueDeliveries.length > 0 && (
        <div>
          <SidebarTitle>Delivery Time</SidebarTitle>
          <div className="space-y-2.5">
            {uniqueDeliveries.map((d) => (
              <Checkbox
                key={d}
                label={d}
                checked={deliveries.includes(d)}
                onChange={() => toggle(deliveries, d, setDeliveries)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Material */}
      {uniqueMaterials.length > 0 && (
        <div>
          <SidebarTitle>Material</SidebarTitle>
          <div className="space-y-2.5">
            {uniqueMaterials.map((m) => (
              <Checkbox
                key={m}
                label={m}
                checked={materials.includes(m)}
                onChange={() => toggle(materials, m, setMaterials)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Color */}
      {uniqueColors.length > 0 && (
        <div>
          <SidebarTitle>Color</SidebarTitle>
          <div className="space-y-2.5">
            {uniqueColors.map((c) => (
              <Checkbox
                key={c}
                label={c}
                checked={colors.includes(c)}
                onChange={() => toggle(colors, c, setColors)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Availability */}
      <div>
        <SidebarTitle>Availability</SidebarTitle>
        <div className="space-y-2.5">
          {["all", "In Stock", "Made to Order"].map((a) => (
            <label
              key={a}
              className={`flex cursor-pointer items-center justify-between rounded-full border px-4 py-2 text-sm transition-all duration-300 ${
                availability === a
                  ? "border-gold bg-gold/10 font-semibold text-gold-deep"
                  : "border-line bg-white text-stone hover:border-gold/60 hover:text-ink"
              }`}
            >
              {a === "all" ? "All" : a}
              <input
                type="radio"
                name="availability"
                checked={availability === a}
                onChange={() => setAvailability(a)}
                className="sr-only"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Featured / Best Selling / Latest */}
      <div>
        <SidebarTitle>Collections</SidebarTitle>
        <div className="space-y-2.5">
          {TAG_OPTIONS.map((tag) => (
            <Checkbox
              key={tag.id}
              label={tag.label}
              checked={tags.includes(tag.id)}
              onChange={() =>
                setTags(tags.includes(tag.id) ? tags.filter((t) => t !== tag.id) : [...tags, tag.id])
              }
            />
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={clearAll}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-ink/15 py-2.5 text-xs font-semibold tracking-[0.14em] text-ink uppercase transition-colors hover:border-gold hover:text-gold-deep"
        >
          <CloseIcon className="h-3.5 w-3.5" />
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <section className="py-12 sm:py-16">
      <Container>
        {/* Mobile filter toggle */}
        <div className="mb-6 flex items-center justify-between gap-4 lg:hidden">
          <button
            type="button"
            onClick={() => setFiltersOpen((v) => !v)}
            className="btn-outline-dark !px-5 !py-2.5 !text-[11px]"
            aria-expanded={filtersOpen}
          >
            {filtersOpen ? "Hide Filters" : "Show Filters"}
          </button>
          <p className="text-xs font-semibold tracking-[0.2em] text-stone uppercase">
            {filtered.length} {filtered.length === 1 ? "product" : "products"}
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
          {/* Sidebar */}
          <aside className={`${filtersOpen ? "block" : "hidden"} lg:block lg:w-[280px] lg:shrink-0`}>
            <div className="rounded-3xl bg-linen p-6 shadow-soft ring-1 ring-line sm:p-7 lg:sticky lg:top-24">
              <div className="mb-7 flex items-center justify-between">
                <h2 className="font-display text-xl font-semibold">Filters</h2>
                <button
                  type="button"
                  onClick={() => setFiltersOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-stone lg:hidden"
                  aria-label="Close filters"
                >
                  <CloseIcon className="h-4 w-4" />
                </button>
              </div>
              {filterPanel}
            </div>
          </aside>

          {/* Results */}
          <div className="min-w-0 flex-1">
            {/* Sort bar */}
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <p className="hidden text-xs font-semibold tracking-[0.25em] text-stone uppercase lg:block">
                {filtered.length} {filtered.length === 1 ? "product" : "products"} found
              </p>
              <label className="flex items-center gap-3 text-xs font-semibold tracking-[0.14em] text-ink uppercase">
                Sort by
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="rounded-full border border-line bg-white px-4 py-2.5 text-xs font-semibold text-ink uppercase tracking-wide focus:border-gold focus:ring-2 focus:ring-gold/25 focus:outline-none"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <ProductGrid products={filtered} />

            {/* Help card */}
            <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-3xl bg-beige px-8 py-8 text-center sm:flex-row sm:text-left">
              <div>
                <h3 className="font-display text-xl font-semibold text-ink">Can&rsquo;t find what you need?</h3>
                <p className="mt-1.5 text-sm text-stone">
                  We build custom pieces to your exact size and finish.
                </p>
              </div>
              <Link href="/contact" className="btn-dark shrink-0 !px-6 !py-3 !text-[11px]">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
