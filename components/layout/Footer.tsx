import Link from "next/link";
import Container from "@/components/ui/Container";
import { CATEGORIES } from "@/constants/categories";
import { CONTACT, NAV_LINKS, SITE } from "@/constants/site";
import { buildTelLink } from "@/utils/links";
import {
  ClockIcon,
  FacebookIcon,
  MapPinIcon,
  PhoneIcon,
  TikTokIcon,
} from "@/components/icons";
import BackToTop from "./BackToTop";

/**
 * Premium minimal footer – beige background, thin top border,
 * generous spacing.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-beige text-ink">
      <div className="h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" aria-hidden="true" />
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10 lg:py-24">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/15 font-display text-lg font-bold text-gold-deep">
              S
            </span>
            <span className="leading-none">
              <span className="block font-display text-lg font-bold tracking-[0.04em]">{SITE.name}</span>
              <span className="mt-1 block text-[9px] font-semibold tracking-[0.32em] text-gold-deep uppercase">
                Premium Furniture
              </span>
            </span>
          </div>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-stone">
            Handcrafted solid-wood furniture for every room of your home – bedroom sets,
            wardrobes and more, built to be loved for generations.
          </p>
          <div className="mt-7 flex items-center gap-3">
            <a
              href={CONTACT.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-gold hover:text-white"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a
              href={CONTACT.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-gold hover:text-white"
            >
              <TikTokIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Quick links */}
        <nav aria-label="Footer – quick links">
          <h3 className="mb-6 text-[11px] font-semibold tracking-[0.3em] text-gold-deep uppercase">Quick Links</h3>
          <ul className="space-y-3.5 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="link-underline text-stone hover:text-ink">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Categories */}
        <nav aria-label="Footer – categories">
          <h3 className="mb-6 text-[11px] font-semibold tracking-[0.3em] text-gold-deep uppercase">Categories</h3>
          <ul className="space-y-3.5 text-sm">
            {CATEGORIES.map((cat) => (
              <li key={cat.slug}>
                <Link href={`/${cat.slug}`} className="link-underline text-stone hover:text-ink">
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h3 className="mb-6 text-[11px] font-semibold tracking-[0.3em] text-gold-deep uppercase">Contact</h3>
          <ul className="space-y-4 text-sm text-stone">
            <li className="flex items-start gap-3">
              <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
              <a href={buildTelLink()} className="link-underline hover:text-ink">
                {CONTACT.phoneDisplay}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
              <span>{CONTACT.address}</span>
            </li>
            <li className="flex items-start gap-3">
              <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
              <span>{CONTACT.hours}</span>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-ink/10">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 text-xs tracking-wider text-stone sm:flex-row">
          <p>
            © {year} {SITE.name}. All rights reserved.
          </p>
          <p className="tracking-[0.2em] uppercase">
            Handcrafted <span className="text-gold-deep">·</span> Solid Wood{" "}
            <span className="text-gold-deep">·</span> Timeless Design
          </p>
          <BackToTop />
        </Container>
      </div>
    </footer>
  );
}
