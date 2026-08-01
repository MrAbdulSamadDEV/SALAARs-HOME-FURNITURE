import Link from "next/link";
import SmartImage from "@/components/ui/SmartImage";
import { getCategory } from "@/data/categories";
import { PRODUCT_CARD } from "@/data/settings";
import { TruckIcon } from "@/components/icons";
import type { ProductItem } from "@/types";
import { formatPrice } from "@/utils/links";

const fill = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));

/**
 * Premium product card – 20px radius, soft shadow, equal heights.
 * The image area is a fixed 4:3 frame with object-contain, so both 4:3 and
 * 3:4 photos always display fully – no stretching, no cropping – while every
 * card stays perfectly aligned.
 */
export default function ProductCard({ product }: { product: ProductItem }) {
  const category = getCategory(product.category);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[20px] bg-white shadow-soft ring-1 ring-line transition-all duration-500 will-change-transform hover:-translate-y-1.5 hover:shadow-card-hover hover:ring-gold/40">
      {/* Image – always visible, never stretched or cropped */}
      <Link
        href={`/product/${product.slug}`}
        prefetch
        className="relative block aspect-[4/3] overflow-hidden bg-beige"
        aria-label={`View details – ${product.name}`}
      >
        <SmartImage
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
          loading="lazy"
          fallbacks={product.gallery ?? []}
          className="object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-[1.06] sm:p-5"
        />
        <span
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          aria-hidden="true"
        />
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-[10px] font-semibold tracking-[0.22em] text-stone uppercase">
          {category?.name ?? product.category}
        </p>

        <h3 className="mt-2 font-display text-lg leading-snug font-semibold text-ink sm:text-xl">
          <Link href={`/product/${product.slug}`} prefetch className="transition-colors hover:text-gold-deep">
            {product.name}
          </Link>
        </h3>

        <p className="mt-2 text-[15px] font-semibold text-gold-deep">
          {product.price ? formatPrice(product.price) : PRODUCT_CARD.priceOnRequest}
        </p>

        <p className="mt-2.5 flex items-center gap-1.5 text-xs text-stone">
          <TruckIcon className="h-3.5 w-3.5 text-gold-deep" />
          {fill(PRODUCT_CARD.delivery, { time: product.deliveryTime ?? "1–3 days" })}
        </p>

        <Link
          href={`/product/${product.slug}`}
          prefetch
          className="btn-dark mt-5 flex-1 !px-4 !py-3 !text-[11px] sm:mt-6"
        >
          {PRODUCT_CARD.viewDetails}
        </Link>
      </div>
    </article>
  );
}
