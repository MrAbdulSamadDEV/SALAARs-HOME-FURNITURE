import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import ProductGrid from "@/components/products/ProductGrid";
import {
  getCategoryNavHref,
  getCategoryNavItem,
  NAV_CATEGORIES,
} from "@/data/category-navigation";
import { BREADCRUMB_HOME, NOT_FOUND, SHOP } from "@/data/settings";
import { getCategoryProducts } from "@/data/products";
import { getManifest } from "@/utils/manifest";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

/** Pre-generates every /category/<slug> page at build time. */
export function generateStaticParams() {
  return NAV_CATEGORIES.map((cat) => ({ slug: cat.slug }));
}

/** SEO metadata per category. */
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getCategoryNavItem(slug);
  if (!item) return {};
  return {
    title: item.seoTitle,
    description: item.seoDescription,
    alternates: { canonical: getCategoryNavHref(item.slug) },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const item = getCategoryNavItem(slug);
  if (!item) notFound();

  const products = item.source ? getCategoryProducts(item.source) : [];
  const manifest = getManifest();

  return (
    <>
      <PageHero
        eyebrow={item.tagline}
        title={item.label}
        description={item.short}
        image={manifest.banners[2] ?? null}
      />
      <Breadcrumb
        items={[
          { label: BREADCRUMB_HOME, href: "/" },
          { label: "Shop", href: "/shop" },
          { label: item.label },
        ]}
      />

      {/* Description */}
      <section className="bg-linen py-16 sm:py-20">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="eyebrow justify-center">
                <span className="h-px w-8 bg-gold-deep" aria-hidden="true" />
                The {item.label} Collection
                <span className="h-px w-8 bg-gold-deep" aria-hidden="true" />
              </p>
              <h2 className="title-lg">{item.tagline}</h2>
              <p className="mt-6 leading-relaxed text-stone">{item.description}</p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Products or premium "coming soon" state */}
      <section className="pb-16 sm:pb-24">
        <Container>
          {products.length > 0 ? (
            <>
              <p className="mb-8 flex items-center gap-3 text-xs font-semibold tracking-[0.25em] text-stone uppercase">
                {products.length} {products.length === 1 ? "piece" : "pieces"} in this collection
                <span className="h-px flex-1 bg-gradient-to-r from-ink/10 to-transparent" aria-hidden="true" />
              </p>
              <ProductGrid products={products} />
            </>
          ) : (
            <Reveal>
              <div className="mx-auto max-w-2xl rounded-3xl border border-line bg-white px-6 py-16 text-center shadow-soft sm:py-20">
                <p className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                  {item.emptyTitle ?? "This collection is coming soon"}
                </p>
                <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-stone">
                  {item.emptyText ?? SHOP.helpText}
                </p>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                  <Link href="/contact" prefetch className="btn-gold">
                    {SHOP.helpCta}
                  </Link>
                  <Link href="/shop" prefetch className="btn-outline-dark">
                    {NOT_FOUND.browseShop}
                  </Link>
                </div>
              </div>
            </Reveal>
          )}
        </Container>
      </section>
    </>
  );
}
