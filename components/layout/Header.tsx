"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import SearchOverlay from "./SearchOverlay";
import { getCategoryNavHref, HEADER_CATEGORIES } from "@/data/category-navigation";
import { NAV_LABELS, NAV_LINKS } from "@/data/navigation";
import { CONTACT } from "@/data/contact";
import { SITE } from "@/data/site";
import { SOCIAL } from "@/data/social";
import { buildTelLink, buildWhatsAppLink } from "@/utils/links";
import {
  CloseIcon,
  FacebookIcon,
  MenuIcon,
  PhoneIcon,
  SearchIcon,
  TikTokIcon,
  WhatsAppIcon,
} from "@/components/icons";

/**
 * Premium sticky navbar – ONE compact row on every screen size.
 *
 * – Mobile: small logo (40px icon + stacked wordmark), search, Shop All,
 *   hamburger – all on a single 64px line, no wrapping.
 * – Desktop: logo left, Home/About/Shop/Contact/FAQ centered, search +
 *   Shop All right (76px tall). No dropdowns – every link works on the
 *   first click.
 * – Mobile menu is a LEFT slide drawer (200ms) with overlay, ESC and
 *   body-scroll lock; closes after any link click.
 */
export default function Header({ logoUrl }: { logoUrl: string | null }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  /* Close everything on route change */
  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  /* Lock body scroll while the drawer or search overlay is open */
  useEffect(() => {
    document.body.style.overflow = open || searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, searchOpen]);

  /* ESC closes the mobile drawer */
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const linkClass = (href: string) =>
    `relative px-1.5 py-1 text-[13.5px] font-semibold tracking-[0.02em] transition-colors duration-200 ${
      isActive(href) ? "text-gold-deep" : "text-ink/75 hover:text-ink"
    }`;

  const indicator = (href: string) => (
    <span
      className={`absolute inset-x-1.5 -bottom-[7px] h-[2px] origin-left rounded-full bg-gold transition-transform duration-200 ${
        isActive(href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
      }`}
      aria-hidden="true"
    />
  );

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-3 px-4 sm:gap-5 sm:px-6 md:h-[76px] lg:px-8 xl:px-12">
        {/* Logo – compact, never wraps */}
        <Link href="/" prefetch className="flex min-w-0 shrink items-center gap-2.5 sm:gap-3">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={`${SITE.name} logo`}
              width={44}
              height={44}
              className="h-10 w-10 shrink-0 rounded-xl object-contain md:h-11 md:w-11"
            />
          ) : (
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-gold/10 font-display text-base font-bold text-gold md:h-11 md:w-11 md:text-lg">
              S
            </span>
          )}
          <span className="flex min-w-0 flex-col leading-none">
            <span className="truncate font-display text-[15px] font-bold tracking-[0.03em] whitespace-nowrap text-ink sm:text-[17px] md:text-lg">
              {SITE.name}
            </span>
            <span className="mt-1 truncate text-[8px] font-semibold tracking-[0.26em] whitespace-nowrap text-gold-deep uppercase sm:text-[9px]">
              {SITE.taglineShort}
            </span>
          </span>
        </Link>

        {/* Desktop nav – flat links, no dropdowns */}
        <nav className="hidden items-center gap-6 lg:flex xl:gap-8" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} prefetch className={`group ${linkClass(link.href)}`}>
              {link.label}
              {indicator(link.href)}
            </Link>
          ))}
        </nav>

        {/* Right side – search, Shop All, hamburger */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors duration-200 hover:border-gold hover:text-gold-deep"
            aria-label={NAV_LABELS.search}
          >
            <SearchIcon className="h-4 w-4" />
          </button>
          <Link
            href="/shop"
            prefetch
            className="btn-gold !px-3.5 !py-2 !text-[10px] whitespace-nowrap sm:!px-5 sm:!py-2.5 sm:!text-[11px]"
          >
            {NAV_LABELS.shopAll}
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors duration-200 hover:border-gold hover:text-gold-deep lg:hidden"
            aria-label={NAV_LABELS.openMenu}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <MenuIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile menu – left slide drawer */}
      <div
        className={`fixed inset-0 z-[70] bg-ink/50 backdrop-blur-sm transition-opacity duration-200 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <aside
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
        className={`fixed top-0 left-0 z-[70] flex h-full w-[85%] max-w-sm flex-col overflow-y-auto overscroll-contain bg-white text-ink shadow-2xl transition-transform duration-200 ease-out lg:hidden ${
          open ? "translate-x-0" : "pointer-events-none -translate-x-full"
        }`}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-line px-5 py-4 sm:px-6">
          <span className="truncate font-display text-lg font-bold">
            {SITE.name} <span className="text-gold-deep">·</span>
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-gold hover:text-gold-deep"
            aria-label={NAV_LABELS.closeMenu}
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-5 py-5 sm:px-6" aria-label="Mobile">
          <p className="mb-1 text-[10px] font-semibold tracking-[0.3em] text-mist uppercase">
            {NAV_LABELS.menu}
          </p>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              prefetch
              onClick={() => setOpen(false)}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`flex items-center justify-between border-b border-line/70 py-3.5 font-display text-lg transition-colors duration-200 ${
                isActive(link.href) ? "text-gold-deep" : "text-ink hover:text-gold-deep"
              }`}
            >
              {link.label}
              <span className="text-gold/50">→</span>
            </Link>
          ))}

          <p className="mt-6 mb-1 text-[10px] font-semibold tracking-[0.3em] text-mist uppercase">
            {NAV_LABELS.collections}
          </p>
          {HEADER_CATEGORIES.map((cat) => {
            const href = getCategoryNavHref(cat.slug);
            return (
              <Link
                key={cat.slug}
                href={href}
                prefetch
                onClick={() => setOpen(false)}
                aria-current={isActive(href) ? "page" : undefined}
                className={`flex items-center justify-between border-b border-line/70 py-3 text-[15px] transition-colors duration-200 hover:text-gold-deep ${
                  isActive(href) ? "font-semibold text-gold-deep" : "text-stone"
                }`}
              >
                {cat.label}
                <span className="text-gold/50">→</span>
              </Link>
            );
          })}
        </nav>

        <div className="shrink-0 border-t border-line px-5 py-4 sm:px-6">
          <a
            href={buildTelLink()}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-ink/20 px-4 py-3 text-xs font-semibold tracking-[0.12em] text-ink uppercase transition-colors hover:border-gold hover:text-gold-deep"
          >
            <PhoneIcon className="h-4 w-4" />
            {NAV_LABELS.call} {CONTACT.phoneDisplay}
          </a>
          <div className="mt-4 flex items-center justify-center gap-5 text-stone">
            <a
              href={SOCIAL.facebook.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="transition-colors hover:text-gold-deep"
            >
              <FacebookIcon className="h-5 w-5" />
            </a>
            <a
              href={SOCIAL.tiktok.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="transition-colors hover:text-gold-deep"
            >
              <TikTokIcon className="h-5 w-5" />
            </a>
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={SOCIAL.whatsapp.label}
              className="transition-colors hover:text-gold-deep"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </aside>

      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </header>
  );
}
