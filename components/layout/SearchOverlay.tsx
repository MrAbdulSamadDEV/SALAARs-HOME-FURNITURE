"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getCategoryNavHref, NAV_CATEGORIES } from "@/data/category-navigation";
import { searchProducts } from "@/data/products";
import { SEARCH, SEARCH_OVERLAY } from "@/data/settings";
import { CloseIcon, SearchIcon } from "@/components/icons";
import { formatPrice } from "@/utils/links";

/**
 * Full-screen search overlay with INSTANT results:
 * searches by product name, category, price, delivery time and material,
 * showing a live list of matching pieces as you type.
 */
export default function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const results = useMemo(
    () => (query.trim().length >= SEARCH.minQueryLength ? searchProducts(query, SEARCH.maxResults) : []),
    [query]
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(query.trim() ? `/shop?q=${encodeURIComponent(query.trim())}` : "/shop");
    onClose();
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-ink/85 px-4 pt-20 backdrop-blur-md sm:pt-24"
      role="dialog"
      aria-modal="true"
      aria-label={SEARCH_OVERLAY.placeholder}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-6 right-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-gold hover:text-gold"
        aria-label={SEARCH_OVERLAY.close}
      >
        <CloseIcon className="h-4 w-4" />
      </button>

      <form
        onSubmit={submit}
        className="w-full max-w-2xl animate-fade-up rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
      >
        <p className="eyebrow">
          <span className="h-px w-8 bg-gold-deep" aria-hidden="true" />
          {SEARCH_OVERLAY.eyebrow}
        </p>
        <label className="flex items-center gap-3 border-b-2 border-ink/15 pb-3 focus-within:border-gold">
          <span className="sr-only">{SEARCH_OVERLAY.placeholder}</span>
          <SearchIcon className="h-5 w-5 shrink-0 text-gold-deep" />
          <input
            type="search"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={SEARCH_OVERLAY.placeholder}
            className="w-full bg-transparent font-display text-xl text-ink placeholder:text-stone/60 focus:outline-none sm:text-2xl"
          />
        </label>

        {/* Instant results */}
        {query.trim().length >= SEARCH.minQueryLength && (
          <div className="mt-5">
            {results.length > 0 ? (
              <ul className="max-h-[46vh] space-y-2 overflow-y-auto pr-1">
                {results.map((product) => (
                  <li key={product.id}>
                    <Link
                      href={`/product/${product.slug}`}
                      prefetch
                      onClick={onClose}
                      className="group flex items-center gap-4 rounded-2xl p-3 transition-colors hover:bg-beige/70"
                    >
                      <span className="relative block h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-beige">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="56px"
                          loading="lazy"
                          className="object-contain p-1"
                        />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-ink">
                          {product.name}
                        </span>
                        <span className="mt-0.5 block text-[11px] font-medium tracking-wide text-stone uppercase">
                          {product.category.replace(/-/g, " ")}
                        </span>
                      </span>
                      <span className="shrink-0 text-sm font-semibold text-gold-deep">
                        {product.price ? formatPrice(product.price) : "–"}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="rounded-2xl bg-cream px-5 py-4 text-sm text-stone">
                {SEARCH_OVERLAY.noResults}
              </p>
            )}

            <button
              type="submit"
              className="mt-4 w-full rounded-full border border-ink/15 py-3 text-xs font-semibold tracking-[0.16em] text-ink uppercase transition-colors hover:border-gold hover:text-gold-deep"
            >
              {SEARCH_OVERLAY.seeAll} ({searchProducts(query).length})
            </button>
          </div>
        )}

        {/* Popular categories */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <span className="self-center text-[10px] font-semibold tracking-[0.2em] text-mist uppercase">
              {SEARCH_OVERLAY.popular}
            </span>
            {NAV_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={getCategoryNavHref(cat.slug)}
                onClick={onClose}
                className="rounded-full border border-line bg-cream px-4 py-2 text-xs font-semibold tracking-wide text-stone transition-colors hover:border-gold hover:text-gold-deep"
              >
                {cat.label}
              </Link>
            ))}
          </div>
          <button type="submit" className="btn-gold !px-6 !py-2.5">
            {SEARCH_OVERLAY.submit}
          </button>
        </div>
      </form>
    </div>
  );
}
