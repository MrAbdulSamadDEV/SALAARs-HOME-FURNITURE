"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/constants/categories";
import { SearchIcon } from "@/components/icons";

/**
 * Full-screen search overlay – opens from the navbar search button,
 * navigates to /shop?q=… on submit.
 */
export default function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(query.trim() ? `/shop?q=${encodeURIComponent(query.trim())}` : "/shop");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-ink/80 px-4 pt-24 backdrop-blur-md sm:pt-32"
      role="dialog"
      aria-modal="true"
      aria-label="Search products"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-6 right-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-gold hover:text-gold"
        aria-label="Close search"
      >
        ✕
      </button>

      <form
        onSubmit={submit}
        className="w-full max-w-2xl animate-fade-up rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
      >
        <p className="eyebrow">
          <span className="h-px w-8 bg-gold-deep" aria-hidden="true" />
          Search the Showroom
        </p>
        <label className="flex items-center gap-3 border-b-2 border-ink/15 pb-3 focus-within:border-gold">
          <span className="sr-only">Search products</span>
          <SearchIcon className="h-5 w-5 shrink-0 text-gold-deep" />
          <input
            type="search"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search bedroom sets, wardrobes, side tables…"
            className="w-full bg-transparent font-display text-xl text-ink placeholder:text-stone/60 focus:outline-none sm:text-2xl"
          />
        </label>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.slice(0, 4).map((cat) => (
              <button
                key={cat.slug}
                type="button"
                onClick={() => {
                  router.push(`/shop?q=${encodeURIComponent(cat.name)}`);
                  onClose();
                }}
                className="rounded-full border border-line bg-cream px-4 py-2 text-xs font-semibold tracking-wide text-stone transition-colors hover:border-gold hover:text-gold-deep"
              >
                {cat.name}
              </button>
            ))}
          </div>
          <button type="submit" className="btn-gold !px-6 !py-2.5">
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
