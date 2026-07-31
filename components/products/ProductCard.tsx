import Link from "next/link";
import SmartImage from "@/components/ui/SmartImage";
import { getCategory } from "@/constants/categories";
import { TruckIcon } from "@/components/icons";
import type { ProductItem } from "@/types";
import { formatPrice } from "@/utils/links";

/**
 * Minimal premium product card – 20px radius, soft shadow, equal heights.
 * The image area is a fixed square with object-contain, so both 4:3 and 3:4
 * photos fit without cropping or stretching while every card stays aligned.
 */
export default function ProductCard({ product }: { product: ProductItem }) {
  const category = getCategory(product.category);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[20px] bg-white shadow-soft ring-1 ring-line transition-all duration-500 will-change-transform hover:-translate-y-1.5 hover:shadow-card-hover hover:ring-gold/40">
      {/* Image */}
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-beige/60"
        aria-label={`View details – ${product.name}`}
      >
        <SmartImage
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
          loading="lazy"
          className="object-contain p-5 transition-transform duration-700 ease-out group-hover:scale-[1.04] sm:p-7"
        />
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-[10px] font-semibold tracking-[0.22em] text-stone uppercase">
          {category?.name ?? product.category}
        </p>

        <h3 className="mt-2 font-display text-lg leading-snug font-semibold text-ink sm:text-xl">
          <Link href={`/product/${product.slug}`} className="transition-colors hover:text-gold-deep">
            {product.name}
          </Link>
        </h3>

        <p className="mt-2 text-[15px] font-semibold text-gold-deep">
          {product.price ? formatPrice(product.price) : "Price on request"}
        </p>

        <p className="mt-2.5 flex items-center gap-1.5 text-xs text-stone">
          <TruckIcon className="h-3.5 w-3.5 text-gold-deep" />
          Delivery: {product.deliveryTime ?? "1–3 days"}
        </p>

        <Link
          href={`/product/${product.slug}`}
          className="btn-dark mt-5 flex-1 !px-4 !py-3 !text-[11px] sm:mt-6"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
