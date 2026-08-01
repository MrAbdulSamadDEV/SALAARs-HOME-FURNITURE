"use client";

import { useEffect, useState } from "react";
import Image, { type ImageProps } from "next/image";

type SmartImageProps = Omit<ImageProps, "src" | "onError"> & {
  src: string;
  /** Shown if the image is missing or was renamed. */
  fallback?: string;
  /**
   * Extra candidate paths tried in order before the placeholder,
   * e.g. the product's own gallery images.
   */
  fallbacks?: string[];
};

/**
 * Next.js Image wrapper that gracefully falls back to a brand placeholder
 * when a file is missing – so you can freely add / replace / delete images
 * in public/ without ever seeing a broken image icon.
 *
 * Fallback order: src → fallbacks[0..n] → fallback placeholder.
 */
export default function SmartImage({
  src,
  fallback = "/placeholders/fallback.svg",
  fallbacks,
  alt,
  ...props
}: SmartImageProps) {
  const chain = [src, ...(fallbacks ?? []), fallback];
  const [attempt, setAttempt] = useState(0);
  const [current, setCurrent] = useState(src);

  useEffect(() => {
    setCurrent(src);
    setAttempt(0);
  }, [src]);

  return (
    <Image
      {...props}
      src={current}
      alt={alt}
      onError={() => {
        const next = attempt + 1;
        if (next < chain.length) {
          setAttempt(next);
          setCurrent(chain[next]);
        }
      }}
    />
  );
}
