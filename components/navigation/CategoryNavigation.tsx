"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getCategoryNavHref, HEADER_CATEGORIES } from "@/data/category-navigation";

/**
 * Category Navigation Bar – sticky directly below the main navbar.
 *
 * – Single horizontal row, white background, thin bottom border.
 * – Mobile/tablet: swipeable row with snap scrolling, hidden scrollbar,
 *   equal spacing, categories never cut off (shrink-0, no wrapping).
 * – Desktop: all six categories in one centered row – no scrolling needed.
 * – Active category gets a gold underline; the active item scrolls into
 *   view when the page changes.
 * – Mouse wheel scrolls the row horizontally when it overflows.
 */
export default function CategoryNavigation() {
  const pathname = usePathname();
  const scrollerRef = useRef<HTMLElement>(null);

  /* Mouse wheel scrolls the bar horizontally (only when it overflows) */
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      const canScroll = el.scrollWidth > el.clientWidth + 1;
      if (!canScroll) return;
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  /* Keep the active category visible on mobile after navigation */
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || el.scrollWidth <= el.clientWidth + 1) return;
    const activeEl = el.querySelector<HTMLAnchorElement>('[aria-current="page"]');
    activeEl?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [pathname]);

  return (
    <nav
      ref={scrollerRef}
      aria-label="Categories"
      className="no-scrollbar sticky top-16 z-40 flex h-12 w-full snap-x snap-proximity items-center gap-x-8 overflow-x-auto border-b border-line bg-white px-4 sm:gap-x-10 sm:px-6 md:top-[76px] md:h-14 lg:snap-none lg:justify-center lg:gap-x-12 lg:overflow-visible lg:px-8 xl:px-12"
    >
      {HEADER_CATEGORIES.map((cat) => {
        const href = getCategoryNavHref(cat.slug);
        const active = pathname === href;

        return (
          <Link
            key={cat.slug}
            href={href}
            prefetch
            aria-current={active ? "page" : undefined}
            className={`group relative flex shrink-0 snap-start cursor-pointer items-center self-stretch whitespace-nowrap text-[15px] font-medium tracking-[0.01em] transition-colors duration-200 md:text-[16px] ${
              active ? "text-gold-deep" : "text-ink/70 hover:text-gold-deep"
            }`}
          >
            {cat.label}
            {/* Gold underline – slides in from the left */}
            <span
              aria-hidden="true"
              className={`absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gold transition-transform duration-200 ease-out ${
                active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              }`}
            />
          </Link>
        );
      })}
    </nav>
  );
}
