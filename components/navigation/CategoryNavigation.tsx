"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getCategoryNavHref, NAV_CATEGORIES } from "@/data/category-navigation";

/**
 * Premium Category Navigation Bar – sticky directly below the main navbar.
 *
 * – Single horizontal row, centered vertically, white background,
 *   thin #EAEAEA bottom border (56–64px tall).
 * – Active category gets a gold underline that slides in smoothly.
 * – Hover transitions text color to gold with a sliding underline.
 * – Overflow: hidden scrollbar, mouse wheel scrolls horizontally,
 *   scroll-snap for smooth touch swiping on mobile.
 * – Fades in once when the page loads.
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

  return (
    <nav
      ref={scrollerRef}
      aria-label="Categories"
      className="no-scrollbar sticky top-16 z-40 -mt-px flex h-14 w-full snap-x snap-mandatory items-center gap-x-8 overflow-x-auto border-b border-[#EAEAEA] bg-white px-4 animate-fade-in sm:px-6 md:top-[72px] lg:h-16 lg:snap-none lg:gap-x-10 lg:px-8 xl:px-12"
    >
      {NAV_CATEGORIES.map((cat) => {
        const href = getCategoryNavHref(cat.slug);
        const active = pathname === href;

        return (
          <Link
            key={cat.slug}
            href={href}
            prefetch
            aria-current={active ? "page" : undefined}
            className={`group relative flex shrink-0 cursor-pointer items-center self-stretch text-[16px] font-medium tracking-[0.01em] transition-colors duration-300 ${
              active ? "text-gold-deep" : "text-ink/70 hover:text-gold-deep"
            }`}
          >
            {cat.label}
            {/* Gold underline – slides in from the left */}
            <span
              aria-hidden="true"
              className={`absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gold transition-transform duration-300 ease-out ${
                active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              }`}
            />
          </Link>
        );
      })}
    </nav>
  );
}
