"use client";

import { useEffect, useState } from "react";
import { ChevronDownIcon } from "@/components/icons";

/**
 * Small back-to-top pill shown in the footer – only appears after scrolling.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`group inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-[11px] font-semibold tracking-[0.18em] text-stone uppercase transition-all duration-300 hover:border-gold hover:text-gold-deep ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-label="Back to top"
    >
      Back to top
      <ChevronDownIcon className="h-3.5 w-3.5 rotate-180 transition-transform duration-300 group-hover:-translate-y-0.5" />
    </button>
  );
}
