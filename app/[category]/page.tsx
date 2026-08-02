import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import JsonLd from "@/components/seo/JsonLd";
import ProductGrid from "@/components/products/ProductGrid";
import { CATEGORIES, getCategory } from "@/data/categories";
import { BREADCRUMB_HOME } from "@/data/settings";
import { SITE } from "@/data/site";
import { getCategoryProducts } from "@/data/products";
import { getManifest } from "@/utils/manifest";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

/** Pre-generates the category pages at build time. */
export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category: category.slug }));
}

/** SEO metadata per category. */
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const info = getCategory(category);
  if (!info) return {};
  return {
    title: info.seoTitle,
    description: info.seoDescription,
    alternates: { canonical: `/${info.slug}` },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const info = getCategory(slug);
  if (!info) notFound();

  const items = getCategoryProducts(info.slug);
  const manifest = getManifest();
  const categoryUrl = `${SITE.url}/${info.slug}`;

  /* Structured data for search engines – BreadcrumbList. */
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: BREADCRUMB_HOME, item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Shop", item: `${SITE.url}/shop` },
      { "@type": "ListItem", position: 3, name: info.name, item: categoryUrl },
    ],
  };

  return (
    <>
      <PageHero
        eyebrow={info.tagline}
        title={info.name}
        description={info.short}
        image={manifest.banners[2] ?? null}
      />
      <Breadcrumb
        items={[{ label: BREADCRUMB_HOME, href: "/" }, { label: "Shop", href: "/shop" }, { label: info.name }]}
      />

      {/* Description */}
      <section className="bg-linen py-16 sm:py-20">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="eyebrow justify-center">
                <span className="h-px w-8 bg-gold-deep" aria-hidden="true" />
                The {info.name} Collection
                <span className="h-px w-8 bg-gold-deep" aria-hidden="true" />
              </p>
              <h2 className="title-lg">{info.tagline}</h2>
              <p className="mt-6 leading-relaxed text-stone">{info.description}</p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Products */}
      <section className="pb-16 sm:pb-24">
        <Container>
          <p className="mb-8 flex items-center gap-3 text-xs font-semibold tracking-[0.25em] text-stone uppercase">
            {items.length} {items.length === 1 ? "piece" : "pieces"} in this collection
            <span className="h-px flex-1 bg-gradient-to-r from-ink/10 to-transparent" aria-hidden="true" />
          </p>
          <ProductGrid products={items} />
        </Container>
      </section>

      <JsonLd data={breadcrumbJsonLd} />
    </>
  );
}
