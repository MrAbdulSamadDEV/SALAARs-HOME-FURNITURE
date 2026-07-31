import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Reveal from "@/components/ui/Reveal";
import ProductGallery from "@/components/products/ProductGallery";
import RelatedProducts from "@/components/products/RelatedProducts";
import { getCategory } from "@/constants/categories";
import { getCategoryItems, getManifest, getProductBySlug, getRelatedProducts } from "@/utils/manifest";
import { buildTelLink, formatPrice } from "@/utils/links";
import { PRODUCT_PERKS } from "@/constants/content";
import { CONTACT, SITE } from "@/constants/site";
import { CheckIcon, ClockIcon, HammerIcon, PhoneIcon, RulerIcon, TruckIcon } from "@/components/icons";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

/** Pre-generates every product details page at build time. */
export function generateStaticParams() {
  const manifest = getManifest();
  return Object.values(manifest.products)
    .flat()
    .map((product) => ({ slug: product.slug }));
}

/** SEO metadata + Open Graph image for the product page. */
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  const category = getCategory(product.category);
  const description =
    product.description ??
    `${product.name} – ${category?.short ?? "Handcrafted furniture"} Made by ${SITE.name}. ${category?.material ?? ""}`;

  return {
    title: product.name,
    description,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      title: `${product.name} | ${SITE.name}`,
      description,
      type: "website",
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const galleryImages = getCategoryItems(product.category).map((p) => p.image);
  const related = getRelatedProducts(product);

  /* Structured data for search engines */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: [product.image],
    description: product.description ?? category?.short,
    brand: { "@type": "Brand", name: SITE.name },
    offers: {
      "@type": "Offer",
      price: product.price ?? undefined,
      priceCurrency: "VND",
      availability: "https://schema.org/InStock",
      url: `${SITE.url}/product/${product.slug}`,
    },
  };

  const specItems = [
    { icon: HammerIcon, label: "Material", value: product.material ?? category?.material },
    { icon: RulerIcon, label: "Dimensions", value: product.dimensions ?? category?.dimensions },
    { icon: TruckIcon, label: "Delivery", value: product.deliveryTime ?? category?.deliveryTime },
    { icon: ClockIcon, label: "Availability", value: product.availability ?? "In Stock" },
  ];

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Shop", href: "/shop" },
          { label: category?.name ?? "Products", href: `/${product.category}` },
          { label: product.name },
        ]}
      />

      <section className="bg-cream py-12 sm:py-16 lg:py-20">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Gallery */}
          <Reveal>
            <ProductGallery images={galleryImages} productName={product.name} activeImage={product.image} />
          </Reveal>

          {/* Details */}
          <div>
            <Reveal>
              <p className="eyebrow">
                <span className="h-px w-8 bg-gold-deep" aria-hidden="true" />
                {category?.name ?? product.category}
              </p>
              <h1 className="text-[1.9rem] leading-[1.14] font-semibold text-balance sm:text-4xl lg:text-5xl">
                {product.name}
              </h1>

              <p className="mt-6 font-display text-2xl font-semibold tracking-wide text-gold-deep sm:text-3xl">
                {product.price ? formatPrice(product.price) : "Price on request"}
              </p>
              <p className="mt-2 text-sm text-stone">
                {product.price
                  ? "Best price confirmed directly – give us a call."
                  : "Call us – we will share the best price for this piece."}
              </p>

              <p className="mt-8 leading-relaxed text-stone">
                {product.description ??
                  `${category?.description ?? ""} ${category?.short ?? ""}`}
              </p>
            </Reveal>

            {/* Specifications */}
            <Reveal delay={100}>
              <div className="mt-10 overflow-hidden rounded-2xl bg-linen shadow-soft ring-1 ring-line">
                {specItems.map(({ icon: Icon, label, value }, i) => (
                  <div
                    key={label}
                    className={`flex items-start gap-4 px-6 py-5 ${i > 0 ? "border-t border-line" : ""}`}
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-pale text-gold-deep">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-[11px] font-semibold tracking-[0.25em] text-mist uppercase">{label}</p>
                      <p className="mt-1 text-sm font-medium text-ink">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Features */}
            <Reveal delay={140}>
              <div className="mt-6 rounded-2xl bg-linen p-6 shadow-soft ring-1 ring-line">
                <h2 className="text-[11px] font-semibold tracking-[0.25em] text-mist uppercase">
                  Features
                </h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {PRODUCT_PERKS.map((perk) => (
                    <li key={perk} className="flex items-center gap-2.5 text-sm font-medium text-stone">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-pale text-gold-deep">
                        <CheckIcon className="h-3.5 w-3.5" />
                      </span>
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Actions */}
            <Reveal delay={180}>
              <div className="mt-9 flex flex-wrap gap-4">
                <a href={buildTelLink()} className="btn-gold">
                  <PhoneIcon className="h-4 w-4" />
                  Call {CONTACT.phoneDisplay}
                </a>
                <Link href="/contact" className="btn-outline-dark">
                  Contact Us
                </Link>
              </div>
              <p className="mt-5 text-xs leading-relaxed text-stone">
                Custom sizes and finishes available for this piece – just ask!
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <RelatedProducts products={related} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
