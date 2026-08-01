"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getCategoryNavHref, NAV_CATEGORIES } from "@/data/category-navigation";
import { NAV_LABELS, NAV_LINKS, PRIMARY_LINKS } from "@/data/navigation";
import { CONTACT } from "@/data/contact";
import { SITE } from "@/data/site";
import { buildTelLink, buildWhatsAppLink } from "@/utils/links";
import {
  ChevronDownIcon,
  CloseIcon,
  FacebookIcon,
  MenuIcon,
  PhoneIcon,
  SearchIcon,
  TikTokIcon,
  WhatsAppIcon,
} from "@/components/icons";
import { SOCIAL } from "@/data/social";

/* Search overlay is only needed after the user opens it – load it lazily. */
const SearchOverlay = dynamic(() => import("./SearchOverlay"), {
  ssr: false,
  loading: () => null,
});

/**
 * Premium sticky navbar – solid white with a subtle shadow and bottom border
 * from the very start. Includes search overlay, category dropdown and mobile menu.
 */
export default function Header({ logoUrl }: { logoUrl: string | null }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open || searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, searchOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const linkClass = (href: string) =>
    `relative py-2 text-[13px] font-semibold tracking-[0.02em] transition-colors duration-300 ${
      isActive(href) ? "text-gold-deep" : "text-ink/75 hover:text-ink"
    }`;

  const indicator = (href: string) => (
    <span
      className={`absolute inset-x-0 -bottom-0.5 h-[2px] origin-left rounded-full bg-gold transition-transform duration-300 ${
        isActive(href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
      }`}
      aria-hidden="true"
    />
  );

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white shadow-soft">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-6 px-4 sm:px-6 md:h-[72px] lg:px-8 xl:px-12">
        {/* Logo */}
        <Link href="/" prefetch className="group flex items-center gap-3">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={`${SITE.name} logo`}
              width={46}
              height={46}
              className="h-11 w-11 rounded-xl object-contain"
            />
          ) : (
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 bg-gold/10 font-display text-lg font-bold text-gold">
              S
            </span>
          )}
          <span className="leading-none">
            <span className="block font-display text-lg font-bold tracking-[0.04em] text-ink sm:text-xl">
              {SITE.name}
            </span>
            <span className="mt-1 block text-[9px] font-semibold tracking-[0.32em] text-gold-deep uppercase">
              {SITE.taglineShort}
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 lg:flex xl:gap-7" aria-label="Main">
          {PRIMARY_LINKS.filter((link) => ["/", "/about"].includes(link.href)).map((link) => (
            <Link key={link.href} href={link.href} prefetch className={`group ${linkClass(link.href)}`}>
              {link.label}
              {indicator(link.href)}
            </Link>
          ))}

          {/* Shop + Collections dropdown */}
          <div className="group relative">
            <Link href="/shop" prefetch className={`flex items-center gap-1.5 ${linkClass("/shop")}`}>
              Shop
              <ChevronDownIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180" />
            </Link>
            <div className="pointer-events-none invisible absolute top-full left-1/2 w-96 -translate-x-1/2 translate-y-3 overflow-hidden rounded-2xl border border-line bg-white opacity-0 shadow-card-hover transition-all duration-300 group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <p className="px-6 pt-4 pb-2 text-[10px] font-semibold tracking-[0.3em] text-mist uppercase">
                {NAV_LABELS.collections}
              </p>
              <div className="grid grid-cols-2 border-b border-line/70">
                {NAV_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={getCategoryNavHref(cat.slug)}
                    prefetch
                    className="group/cat flex items-center justify-between border-b border-line/70 px-6 py-3 text-[13px] font-medium text-ink/80 transition-colors even:border-l last:border-b-0 hover:bg-cream hover:text-gold-deep"
                  >
                    {cat.label}
                    <span className="translate-x-1 text-gold opacity-0 transition-all duration-300 group-hover/cat:translate-x-0 group-hover/cat:opacity-100">
                      →
                    </span>
                  </Link>
                ))}
              </div>
              <Link
                href="/shop"
                prefetch
                className="block bg-gold/10 px-6 py-3.5 text-[13px] font-semibold text-gold-deep transition-colors hover:bg-gold hover:text-ink"
              >
                {NAV_LABELS.viewAll}
              </Link>
            </div>
          </div>

          {NAV_LINKS.filter((link) => ["/contact", "/faq"].includes(link.href)).map((link) => (
            <Link key={link.href} href={link.href} prefetch className={`group ${linkClass(link.href)}`}>
              {link.label}
              {indicator(link.href)}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-ink shadow-soft transition-all duration-300 hover:border-gold hover:text-gold-deep"
            aria-label={NAV_LABELS.search}
          >
            <SearchIcon className="h-4 w-4" />
          </button>
          <Link href="/shop" prefetch className="btn-gold hidden !px-6 !py-2.5 xl:inline-flex">
            {NAV_LABELS.shopAll}
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-ink shadow-soft transition-all duration-300 hover:border-gold hover:text-gold-deep lg:hidden"
            aria-label={NAV_LABELS.openMenu}
          >
            <MenuIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-[70] bg-ink/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={`fixed top-0 right-0 z-[70] flex h-full w-[88%] max-w-md flex-col overflow-y-auto overscroll-contain bg-white text-ink shadow-2xl transition-transform duration-400 ease-out lg:hidden ${
          open ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
        aria-label="Mobile menu"
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <span className="font-display text-lg font-bold">
            {SITE.name} <span className="text-gold-deep">·</span>
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-gold hover:text-gold-deep"
            aria-label={NAV_LABELS.closeMenu}
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 px-6 py-6" aria-label="Mobile">
          <p className="mb-2 text-[10px] font-semibold tracking-[0.3em] text-mist uppercase">
            Menu
          </p>
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              prefetch
              onClick={() => setOpen(false)}
              aria-current={isActive(link.href) ? "page" : undefined}
              style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms" }}
              className={`flex items-center justify-between border-b border-line/70 py-3.5 font-display text-lg transition-all duration-500 ${
                isActive(link.href) ? "text-gold-deep" : "text-ink hover:text-gold-deep"
              } ${open ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"}`}
            >
              {link.label}
              <span className="text-gold/50">→</span>
            </Link>
          ))}

          <p className="mt-8 mb-2 text-[10px] font-semibold tracking-[0.3em] text-mist uppercase">
            {NAV_LABELS.collections}
          </p>
          {NAV_CATEGORIES.map((cat, i) => {
            const href = getCategoryNavHref(cat.slug);
            return (
              <Link
                key={cat.slug}
                href={href}
                prefetch
                onClick={() => setOpen(false)}
                aria-current={isActive(href) ? "page" : undefined}
                style={{ transitionDelay: open ? `${320 + i * 40}ms` : "0ms" }}
                className={`flex items-center justify-between border-b border-line/70 py-3 text-[15px] transition-all duration-500 hover:text-gold-deep ${
                  isActive(href) ? "font-semibold text-gold-deep" : "text-stone"
                } ${open ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"}`}
              >
                {cat.label}
                <span className="text-gold/50">→</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-line px-6 py-5">
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
