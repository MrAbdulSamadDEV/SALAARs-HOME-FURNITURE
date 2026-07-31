import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import ProductCard from "@/components/products/ProductCard";
import type { ProductItem } from "@/types";

/**
 * "You may also like" grid shown on the product details page.
 */
export default function RelatedProducts({ products }: { products: ProductItem[] }) {
  if (products.length === 0) return null;

  return (
    <section className="bg-beige py-16 sm:py-20">
      <Container>
        <SectionHeading eyebrow="Continue Browsing" title="You May Also Like" />
        <div className="mt-12 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
