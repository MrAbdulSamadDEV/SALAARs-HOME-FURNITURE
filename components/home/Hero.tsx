"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import SmartImage from "@/components/ui/SmartImage";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";

/** Rotating copy shown across slides (animates on every slide change). */
const SLIDE_COPY = [
  {
    eyebrow: "Premium Furniture Showroom",
    title: "Timeless Furniture, Crafted for Your Home",
    description:
      "Discover handcrafted bedroom sets, wardrobes and more – built from solid wood to bring warmth and elegance to every room.",
  },
  {
    eyebrow: "Honest Materials · Skilled Hands",
    title: "Solid Wood That Ages Beautifully",
    description:
      "Every piece is finished by artisans who respect the wood and the people who will live with it – made to last for generations.",
  },
  {
    eyebrow: "Designed Around Your Home",
    title: "Custom Pieces, Made to Measure",
    description:
      "Special sizes, finishes and colors – tell us what your space needs and we will craft it exactly for you.",
  },
];

/**
 * Full-width hero slider fed by the banner images in public/banners/.
 * The section adapts to the banners' ~2:1 aspect ratio (object-cover,
 * no distortion) with a responsive height on mobile and tablet.
 * Auto-plays every 5 seconds, supports arrows, dots and swipe. Pauses on hover.
 * A single image renders as a static banner instead.
 */
export default function Hero({ initialSlides }: { initialSlides: string[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const slides = initialSlides;
  const isSlider = slides.length > 1;

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + slides.length) % slides.length),
    [slides.length]
  );

  // Auto-play every 5s – resets whenever the slide changes manually
  useEffect(() => {
    if (!isSlider || paused) return;
    const timer = setInterval(() => go(1), 5000);
    return () => clearInterval(timer);
  }, [isSlider, paused, index, go]);

  if (slides.length === 0) return null;

  const copy = SLIDE_COPY[index % SLIDE_COPY.length];

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
        {/* Banner stage – aspect ratio adapts to the ~2:1 banner images */}
        <div className="relative flex aspect-[4/3] w-full items-center sm:aspect-[16/9] lg:aspect-[2/1]">
          {/* Slides */}
          {slides.map((slide, i) => (
            <div
              key={slide}
              className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
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
                className={`h-full w-full object-cover ${i === index ? "animate-zoom-slow" : ""}`}
              />
            </div>
          ))}

          {/* Overlays */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/50 to-ink/15"
            aria-hidden="true"
          />
          <div
            className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink/60 to-transparent"
            aria-hidden="true"
          />

          {/* Content – keyed to re-animate on every slide change */}
          <div className="relative mx-auto w-full max-w-[1400px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
            <div key={index} className="max-w-2xl">
              <p className="animate-hero-in inline-flex items-center gap-2.5 rounded-full border border-gold/40 bg-ink/30 px-4 py-2 text-[11px] font-semibold tracking-[0.28em] text-gold uppercase backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
                {copy.eyebrow}
              </p>

              <h1 className="mt-6 animate-hero-in font-display text-[2.1rem] leading-[1.12] font-semibold text-white text-balance sm:text-5xl lg:text-6xl [animation-delay:120ms]">
                <span className="text-gold-gradient">{copy.title}</span>
              </h1>

              <p className="mt-5 max-w-xl animate-hero-in text-[15px] leading-relaxed text-white/75 sm:text-lg [animation-delay:240ms]">
                {copy.description}
              </p>

              <div className="mt-9 flex animate-hero-in flex-wrap items-center gap-4 [animation-delay:360ms]">
                <Link href="/shop" className="btn-gold">
                  Shop Collection
                </Link>
                <Link href="/contact" className="btn-outline-light">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Arrows */}
        {isSlider && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous slide"
              className="absolute top-1/2 left-3 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:border-gold hover:bg-gold hover:text-ink sm:left-6 sm:h-12 sm:w-12"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next slide"
              className="absolute top-1/2 right-3 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:border-gold hover:bg-gold hover:text-ink sm:right-6 sm:h-12 sm:w-12"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Dots */}
        {isSlider && (
          <div className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2.5">
            {slides.map((slide, i) => (
              <button
                key={slide}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-all duration-500 ${
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
