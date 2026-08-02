import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import ProductCard from "@/components/products/ProductCard";
import { PRODUCT_PAGE } from "@/data/settings";
import type { ProductItem } from "@/types";

/**
 * "You may also like" grid shown on the product details page.
 */
export default function RelatedProducts({ products }: { products: ProductItem[] }) {
  if (products.length === 0) return null;

  return (
    <section className="bg-beige py-16 sm:py-20">
      <Container>
        <SectionHeading eyebrow={PRODUCT_PAGE.relatedEyebrow} title={PRODUCT_PAGE.relatedTitle} />
        <div className="mt-12 grid grid-cols-2 items-stretch gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
