"use client";

import { useEffect, useState } from "react";
import Image, { type ImageProps } from "next/image";

type SmartImageProps = Omit<ImageProps, "src" | "onError"> & {
  src: string;
  /** Shown if the image is missing or was renamed. */
  fallback?: string;
};

/**
 * Next.js Image wrapper that gracefully falls back to a brand placeholder
 * when a file is missing – so you can freely add / replace / delete images
 * in public/ without ever seeing a broken image icon.
 */
export default function SmartImage({ src, fallback = "/placeholders/fallback.svg", alt, quality = 80, ...props }: SmartImageProps) {
  const [current, setCurrent] = useState(src);

  useEffect(() => {
    setCurrent(src);
  }, [src]);

  return (
    <Image
      {...props}
      src={current}
      alt={alt}
      quality={quality}
      onError={() => {
        if (current !== fallback) setCurrent(fallback);
      }}
    />
  );
}
