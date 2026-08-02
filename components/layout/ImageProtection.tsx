"use client";

import { useEffect } from "react";

/**
 * Global image protection – blocks right-click, drag and long-press save on
 * every <img> on the page (including lightbox images). No web method can make
 * downloading impossible, but these guards make it deliberately difficult.
 */
export default function ImageProtection() {
  useEffect(() => {
    const block = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (target && target.tagName === "IMG") e.preventDefault();
    };
    const blockDrag = (e: DragEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.tagName === "IMG") e.preventDefault();
    };

    /* Capture phase: runs before any other handler, so lightbox images are covered too. */
    document.addEventListener("contextmenu", block, true);
    document.addEventListener("dragstart", blockDrag, true);
    return () => {
      document.removeEventListener("contextmenu", block, true);
      document.removeEventListener("dragstart", blockDrag, true);
    };
  }, []);

  return null;
}
