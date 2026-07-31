import type { ReactNode } from "react";

/**
 * Page-width wrapper with consistent horizontal padding.
 * Comfortable width (1400px) for premium showroom layouts on large screens.
 */
export default function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 xl:px-12 ${className}`}>
      {children}
    </div>
  );
}
