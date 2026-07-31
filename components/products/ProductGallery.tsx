"use client";

import { useState } from "react";
import SmartImage from "@/components/ui/SmartImage";

/**
 * Product image gallery – rounded main image with selectable thumbnails.
 * The product's own photo is shown first; the next 8 images of the
 * product's category folder act as additional views.
 */
export default function ProductGallery({
  images,
  productName,
  activeImage,
}: {
  images: string[];
  productName: string;
  activeImage?: string;
}) {
  const safe = images.length > 0 ? images : [];
  const initialIndex = activeImage ? Math.max(0, safe.indexOf(activeImage)) : 0;
  const [active, setActive] = useState(initialIndex);

  const thumbStart = Math.min(Math.max(initialIndex - 3, 0), Math.max(safe.length - 8, 0));
  const thumbnails = safe.slice(thumbStart, thumbStart + 8);
  const current = safe[Math.min(active, safe.length - 1)];

  if (!current) return null;

  return (
    <div>
      {/* Main image */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-beige shadow-soft ring-1 ring-line">
        <SmartImage
          src={current}
          alt={`${productName} – photo ${active + 1}`}
          fill
          priority={active === initialIndex}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      {/* Thumbnails */}
      {thumbnails.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5 lg:grid-cols-8">
          {thumbnails.map((img, i) => {
            const idx = thumbStart + i;
            return (
              <button
                key={`${img}-${i}`}
                type="button"
                onClick={() => setActive(idx)}
                aria-label={`Show photo ${idx + 1}`}
                aria-pressed={idx === active}
                className={`relative aspect-square overflow-hidden rounded-xl bg-beige ring-2 transition-all duration-300 ${
                  idx === active ? "ring-gold shadow-gold" : "ring-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <SmartImage src={img} alt="" fill sizes="96px" loading="lazy" className="object-cover" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
