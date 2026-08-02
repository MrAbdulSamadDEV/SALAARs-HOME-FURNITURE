"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import SmartImage from "@/components/ui/SmartImage";
import { HERO_ACTIONS, HERO_AUTOPLAY_MS, HERO_SLIDES } from "@/data/home";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";

type Orientation = "landscape" | "portrait";

/**
 * Full-width hero slider fed by the banner images in public/banners/.
 *
 * – Auto-detects every image's orientation once it loads:
 *   landscape (incl. wide banners) → object-cover, portrait (3:4, 4:5) → object-contain,
 *   so no faces or furniture are ever cropped and the whole image stays visible.
 * – Reduced height on mobile (16/10) → taller on tablet and desktop (2:1).
 * – Smooth 400ms fade between slides, autoplay (paused on hover), swipe on touch
 *   devices, arrow buttons on desktop only, pagination dots everywhere.
 */
export default function Hero({ initialSlides }: { initialSlides: string[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [orientation, setOrientation] = useState<Record<string, Orientation>>({});
  const touchX = useRef<number | null>(null);
  const slides = initialSlides;
  const isSlider = slides.length > 1;

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + slides.length) % slides.length),
    [slides.length]
  );

  /* Auto-play – resets whenever the slide changes manually */
  useEffect(() => {
    if (!isSlider || paused) return;
    const timer = setInterval(() => go(1), HERO_AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [isSlider, paused, index, go]);

  if (slides.length === 0) return null;

  const copy = HERO_SLIDES[index % HERO_SLIDES.length];

  return (
    <section className="px-0 pt-0 sm:px-6 sm:pt-6">
      <div
        className="relative mx-auto w-full max-w-[1400px] select-none overflow-hidden bg-ink max-sm:rounded-none sm:rounded-[24px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onPointerDown={(e) => {
          touchX.current = e.clientX;
        }}
        onPointerUp={(e) => {
          if (touchX.current === null) return;
          const dx = e.clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 50) go(dx > 0 ? -1 : 1);
        }}
        style={{ touchAction: "pan-y" }}
      >
        {/* Banner stage – shorter on mobile, wide on desktop */}
        <div className="relative flex aspect-[16/10] w-full items-center sm:aspect-[16/9] lg:aspect-[2/1]">
          {/* Slides */}
          {slides.map((slide, i) => {
            const fit =
              orientation[slide] === "portrait" ? "object-contain" : "object-cover";

            return (
              <div
                key={slide}
                className={`absolute inset-0 transition-opacity duration-[400ms] ease-out ${
                  i === index ? "opacity-100" : "opacity-0"
                }`}
                aria-hidden={i !== index}
              >
                <SmartImage
                  src={slide}
                  alt=""
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  onLoad={(e) => {
                    const img = e.currentTarget;
                    if (!img || orientation[slide]) return;
                    setOrientation((prev) => ({
                      ...prev,
                      [slide]:
                        img.naturalWidth >= img.naturalHeight ? "landscape" : "portrait",
                    }));
                  }}
                  className={`h-full w-full ${fit}`}
                />
              </div>
            );
          })}

          {/* Overlays */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/50 to-ink/15"
            aria-hidden="true"
          />
          <div
            className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink/60 to-transparent"
            aria-hidden="true"
          />

          {/* Content */}
          <div className="relative mx-auto w-full max-w-[1400px] px-5 py-10 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2.5 rounded-full border border-gold/40 bg-ink/30 px-4 py-2 text-[11px] font-semibold tracking-[0.28em] text-gold uppercase backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
                {copy.eyebrow}
              </p>

              <h1 className="mt-5 font-display text-[1.9rem] leading-[1.12] font-semibold text-white text-balance sm:text-5xl lg:text-6xl">
                <span className="text-gold-gradient">{copy.title}</span>
              </h1>

              <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-white/75 sm:mt-5 sm:text-lg">
                {copy.description}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <Link href={HERO_ACTIONS.shop.href} prefetch className="btn-gold">
                  {HERO_ACTIONS.shop.label}
                </Link>
                <Link href={HERO_ACTIONS.contact.href} prefetch className="btn-outline-light">
                  {HERO_ACTIONS.contact.label}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Arrows – desktop & tablet only */}
        {isSlider && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous slide"
              className="absolute top-1/2 left-3 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition-colors duration-200 hover:border-gold hover:bg-gold hover:text-ink sm:left-6 sm:flex sm:h-12 sm:w-12"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next slide"
              className="absolute top-1/2 right-3 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition-colors duration-200 hover:border-gold hover:bg-gold hover:text-ink sm:right-6 sm:flex sm:h-12 sm:w-12"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Dots – all devices */}
        {isSlider && (
          <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2.5 sm:bottom-7">
            {slides.map((slide, i) => (
              <button
                key={slide}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-9 bg-gold" : "w-3.5 bg-white/40 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
