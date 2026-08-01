"use client";

import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import SmartImage from "@/components/ui/SmartImage";
import Container from "@/components/ui/Container";
import { CATEGORIES } from "@/data/categories";
import { FEATURED_CATEGORIES_SECTION } from "@/data/home";
import type { ImageManifest } from "@/types";

/**
 * "Shop by Category" – premium category cards in one responsive row.
 */
export default function FeaturedCategories({ manifest }: { manifest: ImageManifest }) {
  const imageFor = (slug: string) => manifest.products?.[slug]?.[0]?.image ?? null;
  const { eyebrow, title, viewAll, explore, piece, pieces } = FEATURED_CATEGORIES_SECTION;

  return (
    <section className="bg-linen py-16 sm:py-20 lg:py-24">
      <Container>
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">
                <span className="h-px w-8 bg-gold-deep" aria-hidden="true" />
                {eyebrow}
              </p>
              <h2 className="title-lg">{title}</h2>
            </div>
            <Link href="/shop" prefetch className="btn-outline-dark shrink-0">
              {viewAll}
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-5 lg:gap-6">
          {CATEGORIES.map((cat, i) => {
            const image = imageFor(cat.slug);
            const count = manifest.products?.[cat.slug]?.length ?? 0;

            return (
              <Reveal key={cat.slug} delay={i * 80}>
                <Link
                  href={`/${cat.slug}`}
                  prefetch
                  className="group relative block aspect-[3/4] overflow-hidden rounded-2xl bg-beige shadow-soft ring-1 ring-line transition-all duration-500 hover:-translate-y-1.5 hover:shadow-card-hover hover:ring-gold/50 sm:aspect-[4/5]"
                >
                  <div className="absolute inset-0">
                    {image ? (
                      <SmartImage
                        src={image}
                        alt={cat.name}
                        fill
                        loading="lazy"
                        sizes="(min-width: 1280px) 20vw, (min-width: 768px) 33vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="h-full w-full animate-pulse bg-beige" />
                    )}
                  </div>
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent"
                    aria-hidden="true"
                  />

                  <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
                    <p className="text-[10px] font-semibold tracking-[0.25em] text-gold uppercase">
                      {count} {count === 1 ? piece : pieces}
                    </p>
                    <h3 className="mt-1.5 font-display text-lg leading-tight font-semibold sm:text-xl">
                      {cat.name}
                    </h3>
                    <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[10px] font-semibold tracking-[0.18em] text-ink uppercase transition-all duration-300 group-hover:bg-gold">
                      {explore}
                      <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
