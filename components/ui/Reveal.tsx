import type { ReactNode } from "react";

/**
 * Section wrapper – kept for structure only. Scroll-triggered animations
 * were removed for instant, fast page rendering.
 */
export default function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
