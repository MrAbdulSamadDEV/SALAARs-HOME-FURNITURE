"use client";

import { useEffect, useMemo, useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import SmartImage from "@/components/ui/SmartImage";
import { GALLERY } from "@/data/settings";
import { ChevronLeftIcon, ChevronRightIcon, MaximizeIcon } from "@/components/icons";

interface ProductGalleryProps {
  /** Every photo of the product, own photo first. */
  images: string[];
  productName: string;
  /** Optional URL of the photo that should be shown first. */
  activeImage?: string;
}

const fill = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));

/**
 * Premium product gallery:
 * – Large main image (Next.js Image, object-contain: no crop, no stretch)
 * – Hover zoom on desktop, expand button, image counter
 * – Thumbnail strip – click to switch photo
 * – Fullscreen lightbox (react-photo-view): prev/next arrows, keyboard arrows
 *   + ESC, mouse-wheel zoom, drag to pan, pinch-to-zoom on touch, pull-to-close.
 */
export default function ProductGallery({
  images,
  productName,
  activeImage,
}: ProductGalleryProps) {
  const safe = useMemo(() => [...new Set(images.filter(Boolean))], [images]);
  const [active, setActive] = useState(() =>
    Math.max(0, activeImage ? safe.indexOf(activeImage) : 0)
  );

  /* Keep the shown photo in sync when navigating between products */
  useEffect(() => {
    const index = activeImage ? safe.indexOf(activeImage) : 0;
    setActive(Math.max(0, index));
  }, [images, activeImage, safe]);

  if (safe.length === 0) return null;

  const currentIndex = Math.min(active, safe.length - 1);
  const counterLabel = fill(GALLERY.counter, {
    index: currentIndex + 1,
    total: safe.length,
  });

  return (
    <PhotoProvider
      loop
      maskOpacity={0.94}
      maskClosable
      pullClosable
      photoClosable={false}
      speed={() => 320}
      easing={(type) =>
        type === 2 ? "cubic-bezier(0.22, 1, 0.36, 1)" : "cubic-bezier(0.25, 0.8, 0.25, 1)"
      }
      onIndexChange={setActive}
    >
      <div>
        {/* Main image – click opens the lightbox at the current photo */}
        {safe.map((img, i) => (
          <PhotoView key={img} src={img}>
            {i === currentIndex ? (
              <button
                type="button"
                aria-label={fill(GALLERY.openLightbox, { name: productName })}
                className="group relative block aspect-[4/5] w-full cursor-zoom-in overflow-hidden rounded-[24px] bg-beige text-left shadow-soft ring-1 ring-line"
              >
                <SmartImage
                  src={img}
                  alt={`${productName} – ${counterLabel}`}
                  fill
                  priority={i === 0}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-contain p-4 transition-transform duration-300 ease-out group-hover:scale-[1.04] sm:p-6"
                />

                {/* Expand / zoom hint */}
                <span
                  className="pointer-events-none absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/85 text-ink shadow-card backdrop-blur-sm transition-all duration-300 group-hover:bg-gold group-hover:text-ink sm:top-5 sm:right-5"
                  aria-hidden="true"
                >
                  <MaximizeIcon className="h-4.5 w-4.5" />
                </span>

                {/* Image counter */}
                <span className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-ink/75 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.14em] text-white uppercase backdrop-blur-sm">
                  {counterLabel}
                </span>
              </button>
            ) : (
              <span className="hidden" aria-hidden="true" />
            )}
          </PhotoView>
        ))}

        {/* Thumbnails */}
        {safe.length > 1 && (
          <div className="mt-4 grid grid-cols-4 gap-2.5 sm:grid-cols-5 lg:grid-cols-8 lg:gap-3">
            {safe.slice(0, GALLERY.maxThumbnails).map((img, i) => (
              <button
                key={img}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`${productName} – photo ${i + 1}`}
                aria-pressed={i === currentIndex}
                className={`relative aspect-square overflow-hidden rounded-xl bg-beige ring-2 transition-all duration-300 ${
                  i === currentIndex
                    ? "ring-gold shadow-gold"
                    : "ring-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <SmartImage
                  src={img}
                  alt=""
                  fill
                  sizes="96px"
                  loading="lazy"
                  className="object-contain p-1.5"
                />
              </button>
            ))}
          </div>
        )}

        {/* Hint – wheel zoom / drag / Esc inside the lightbox */}
        <p className="mt-4 hidden items-center gap-2 text-[11px] font-semibold tracking-[0.18em] text-mist uppercase sm:flex">
          <ChevronLeftIcon className="h-3.5 w-3.5" />
          {GALLERY.zoomHint}
          <ChevronRightIcon className="h-3.5 w-3.5" />
        </p>
      </div>
    </PhotoProvider>
  );
}
