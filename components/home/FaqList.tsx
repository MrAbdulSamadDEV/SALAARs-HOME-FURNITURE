"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@/components/icons";

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * FAQ accordion – one open item at a time, smooth height animation.
 */
export default function FaqList({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div className="overflow-hidden rounded-2xl bg-linen shadow-soft ring-1 ring-ink/5">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.question} className="border-b border-ink/5 last:border-b-0">
            <button
              type="button"
              onClick={() => setOpenIndex(open ? -1 : i)}
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-gold/5 sm:px-7"
            >
              <span className={`text-sm font-semibold sm:text-base ${open ? "text-gold-deep" : "text-ink"}`}>
                {item.question}
              </span>
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                  open ? "rotate-180 border-gold bg-gold text-ink" : "border-ink/15 text-gold-deep"
                }`}
              >
                <ChevronDownIcon className="h-4 w-4" />
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-6 text-sm leading-relaxed text-stone sm:px-7">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
