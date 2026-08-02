import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Reveal from "@/components/ui/Reveal";
import JsonLd from "@/components/seo/JsonLd";
import ProductGallery from "@/components/products/ProductGallery";
import RelatedProducts from "@/components/products/RelatedProducts";
import { getCategory } from "@/data/categories";
import { CONTACT } from "@/data/contact";
import { PRODUCT_PAGE, PRODUCT_PERKS, PRODUCT_CARD, BREADCRUMB_HOME } from "@/data/settings";
import { SITE } from "@/data/site";
import { getAllProducts, getProductBySlug, getProductImages, getRelatedProducts } from "@/data/products";
import { buildTelLink, formatPrice } from "@/utils/links";
import { CheckIcon, ClockIcon, HammerIcon, PhoneIcon, RulerIcon, TruckIcon } from "@/components/icons";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

/** Pre-generates every product details page at build time. */
export function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
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
  const galleryImages = getProductImages(product);
  const related = getRelatedProducts(product);

  const productUrl = `${SITE.url}/product/${product.slug}`;
  const schemaAvailability =
    product.availability === "In Stock"
      ? "https://schema.org/InStock"
      : "https://schema.org/PreOrder";

  /* Structured data for search engines – Product + BreadcrumbList. */
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: galleryImages.map((img) => `${SITE.url}${img}`),
    description: product.description ?? category?.short,
    brand: { "@type": "Brand", name: SITE.name },
    category: category?.name ?? product.category,
    material: product.material ?? category?.material,
    color: product.color ?? undefined,
    sku: product.id,
    offers: {
      "@type": "Offer",
      url: productUrl,
      itemCondition: "https://schema.org/NewCondition",
      availability: schemaAvailability,
      ...(product.price
        ? { price: product.price, priceCurrency: SITE.business.currency }
        : {}),
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: BREADCRUMB_HOME, item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Shop", item: `${SITE.url}/shop` },
      {
        "@type": "ListItem",
        position: 3,
        name: category?.name ?? "Products",
        item: `${SITE.url}/${product.category}`,
      },
      { "@type": "ListItem", position: 4, name: product.name, item: productUrl },
    ],
  };

  const specItems = [
    { icon: HammerIcon, label: PRODUCT_PAGE.specs.material, value: product.material ?? category?.material },
    { icon: RulerIcon, label: PRODUCT_PAGE.specs.dimensions, value: product.dimensions ?? category?.dimensions },
    { icon: TruckIcon, label: PRODUCT_PAGE.specs.delivery, value: product.deliveryTime ?? category?.deliveryTime },
    { icon: ClockIcon, label: PRODUCT_PAGE.specs.availability, value: product.availability ?? "In Stock" },
  ];

  return (
    <>
      <Breadcrumb
        items={[
          { label: BREADCRUMB_HOME, href: "/" },
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
                {product.price ? formatPrice(product.price) : PRODUCT_CARD.priceOnRequest}
              </p>
              <p className="mt-2 text-sm text-stone">
                {product.price ? PRODUCT_PAGE.priceNoteWithPrice : PRODUCT_PAGE.priceNoteNoPrice}
              </p>

              <p className="mt-8 leading-relaxed text-stone">
                {product.description ??
                  `${category?.description ?? ""} ${category?.short ?? ""}`}
              </p>
            </Reveal>

            {/* Specifications */}
            <Reveal>
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
            <Reveal>
              <div className="mt-6 rounded-2xl bg-linen p-6 shadow-soft ring-1 ring-line">
                <h2 className="text-[11px] font-semibold tracking-[0.25em] text-mist uppercase">
                  {PRODUCT_PAGE.featuresTitle}
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
            <Reveal>
              <div className="mt-9 flex flex-wrap gap-4">
                <a href={buildTelLink()} className="btn-gold">
                  <PhoneIcon className="h-4 w-4" />
                  {PRODUCT_PAGE.call.replace("{phone}", CONTACT.phoneDisplay)}
                </a>
                <Link href="/contact" prefetch className="btn-outline-dark">
                  {PRODUCT_PAGE.contactUs}
                </Link>
              </div>
              <p className="mt-5 text-xs leading-relaxed text-stone">{PRODUCT_PAGE.customNote}</p>
            </Reveal>
          </div>
        </Container>
      </section>

      <RelatedProducts products={related} />

      <JsonLd data={productJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
    </>
  );
}
