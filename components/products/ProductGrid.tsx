import ProductCard from "@/components/products/ProductCard";
import type { ProductItem } from "@/types";

/**
 * Responsive product grid – 1 / 2 / 3 / 4 columns with equal card heights.
 */
export default function ProductGrid({ products }: { products: ProductItem[] }) {
  if (products.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-line bg-linen px-6 py-20 text-center shadow-soft">
        <p className="title-md text-ink">No products match your filters</p>
        <p className="mx-auto mt-3 max-w-md text-sm text-stone">
          Try adjusting your search or clearing some filters to see more pieces.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
