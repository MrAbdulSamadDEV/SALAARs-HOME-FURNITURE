"use client";

import { SOCIAL } from "@/data/social";
import { WhatsAppIcon } from "@/components/icons";
import { buildWhatsAppLink } from "@/utils/links";

/**
 * The single floating WhatsApp button – fixed bottom right.
 * Configure phone / message / visibility in src/data/social.ts.
 */
export default function WhatsAppFloat() {
  const { enabled, label } = SOCIAL.whatsapp;
  if (!enabled) return null;

  return (
    <a
      href={buildWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group fixed right-5 bottom-5 z-[60] flex items-center gap-3 sm:right-7 sm:bottom-7"
    >
      {/* Tooltip */}
      <span className="pointer-events-none hidden translate-x-2 rounded-full bg-ink px-4 py-2 text-xs font-semibold tracking-wide text-white opacity-0 shadow-card transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
        {label}
      </span>

      {/* Button */}
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-card transition-transform duration-200 will-change-transform hover:scale-105 sm:h-16 sm:w-16">
        <WhatsAppIcon className="relative h-7 w-7 sm:h-8 sm:w-8" />
      </span>
    </a>
  );
}
