import Link from "next/link";
import Container from "@/components/ui/Container";
import { ChevronRightIcon } from "@/components/icons";

export interface Crumb {
  label: string;
  href?: string;
}

/**
 * Light breadcrumb bar used under the inner-page hero.
 */
export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <div className="border-b border-line bg-cream">
      <Container className="flex flex-wrap items-center gap-2 py-4 text-xs font-semibold tracking-[0.1em] uppercase">
        <Link href="/" className="text-mist transition-colors hover:text-gold-deep">
          Home
        </Link>
        {items.map((item, i) => (
          <span key={`${item.label}-${i}`} className="flex items-center gap-2">
            <ChevronRightIcon className="h-3 w-3 text-gold/70" />
            {item.href ? (
              <Link href={item.href} className="text-mist transition-colors hover:text-gold-deep">
                {item.label}
              </Link>
            ) : (
              <span className="text-gold-deep">{item.label}</span>
            )}
          </span>
        ))}
      </Container>
    </div>
  );
}
