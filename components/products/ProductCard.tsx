import Link from "next/link";
import SmartImage from "@/components/ui/SmartImage";
import { getCategory } from "@/data/categories";
import { PRODUCT_CARD } from "@/data/settings";
import { ArrowRightIcon, TruckIcon } from "@/components/icons";
import type { ProductItem } from "@/types";
import { formatPrice } from "@/utils/links";

const fill = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));

/**
 * Premium product card – 20px radius, soft shadow, equal heights.
 * The image area is a fixed 4:3 frame with object-contain, so both 4:3 and
 * 3:4 photos always display fully – no stretching, no cropping – while every
 * card stays perfectly aligned. Exactly 2 cards per row on mobile.
 */
export default function ProductCard({ product }: { product: ProductItem }) {
  const category = getCategory(product.category);

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[16px] bg-white shadow-soft ring-1 ring-line transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover hover:ring-gold/40 sm:rounded-[20px]">
      {/* Image – always visible, never stretched or cropped */}
      <Link
        href={`/product/${product.slug}`}
        prefetch
        className="relative block aspect-[4/3] overflow-hidden bg-beige"
        aria-label={`View details – ${product.name}`}
      >
        <SmartImage
          src={product.image}
          alt={`${product.name} – ${category?.name ?? "Premium Furniture"} – SALAAR's HOME Karachi`}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
          loading="lazy"
          fallbacks={product.gallery ?? []}
          className="object-contain p-3 transition-transform duration-300 ease-out group-hover:scale-[1.03] sm:p-5"
        />
        <span
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden="true"
        />
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col p-3.5 sm:p-6">
        <p className="truncate text-[9px] font-semibold tracking-[0.2em] text-stone uppercase sm:text-[10px] sm:tracking-[0.22em]">
          {category?.name ?? product.category}
        </p>

        <h3 className="mt-1.5 font-display text-[15px] leading-snug font-semibold text-ink sm:mt-2 sm:text-xl">
          <Link
            href={`/product/${product.slug}`}
            prefetch
            className="transition-colors duration-200 hover:text-gold-deep"
          >
            {product.name}
          </Link>
        </h3>

        <p className="mt-1.5 text-sm font-semibold text-gold-deep sm:mt-2 sm:text-[15px]">
          {product.price ? formatPrice(product.price) : PRODUCT_CARD.priceOnRequest}
        </p>

        <p className="mt-2 flex items-center gap-1.5 text-[11px] text-stone sm:mt-2.5 sm:text-xs">
          <TruckIcon className="h-3.5 w-3.5 shrink-0 text-gold-deep" />
          <span className="truncate">
            {fill(PRODUCT_CARD.delivery, { time: product.deliveryTime ?? "1–3 days" })}
          </span>
        </p>

        {/* Action – pinned to the card bottom with a fixed, consistent height */}
        <div className="mt-auto pt-4 sm:pt-5">
          <Link
            href={`/product/${product.slug}`}
            prefetch
            className="btn-card w-full"
          >
            {PRODUCT_CARD.viewDetails}
            <ArrowRightIcon className="h-3.5 w-3.5 shrink-0" />
          </Link>
        </div>
      </div>
    </article>
  );
}
