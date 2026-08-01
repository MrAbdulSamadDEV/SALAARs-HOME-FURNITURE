import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTiktok, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Container from "@/components/ui/Container";
import { getCategoryNavHref, NAV_CATEGORIES } from "@/data/category-navigation";
import { CONTACT } from "@/data/contact";
import { FOOTER } from "@/data/footer";
import { NAV_LINKS } from "@/data/navigation";
import { SITE } from "@/data/site";
import { SOCIAL } from "@/data/social";
import { buildTelLink, buildWhatsAppLink } from "@/utils/links";
import { ClockIcon, MapPinIcon, PhoneIcon } from "@/components/icons";
import BackToTop from "./BackToTop";

/**
 * Premium minimal footer – beige background, thin top border,
 * generous spacing.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  /* Social icons – same size, equal spacing, open in a new tab */
  const socialLinks = [
    { icon: faFacebookF, label: "Facebook", href: SOCIAL.facebook.url },
    { icon: faTiktok, label: "TikTok", href: SOCIAL.tiktok.url },
    { icon: faWhatsapp, label: SOCIAL.whatsapp.label, href: buildWhatsAppLink() },
  ];

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
                {SITE.taglineShort}
              </span>
            </span>
          </div>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-stone">{FOOTER.brand.blurb}</p>
          <div className="mt-7 flex items-center justify-start gap-3">
            {socialLinks.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-gold hover:text-white"
              >
                <FontAwesomeIcon icon={icon} className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <nav aria-label="Footer – quick links">
          <h3 className="mb-6 text-[11px] font-semibold tracking-[0.3em] text-gold-deep uppercase">
            {FOOTER.columns.quickLinks}
          </h3>
          <ul className="space-y-3.5 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} prefetch className="link-underline text-stone hover:text-ink">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Categories */}
        <nav aria-label="Footer – categories">
          <h3 className="mb-6 text-[11px] font-semibold tracking-[0.3em] text-gold-deep uppercase">
            {FOOTER.columns.categories}
          </h3>
          <ul className="space-y-3.5 text-sm">
            {NAV_CATEGORIES.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={getCategoryNavHref(cat.slug)}
                  prefetch
                  className="link-underline text-stone hover:text-ink"
                >
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h3 className="mb-6 text-[11px] font-semibold tracking-[0.3em] text-gold-deep uppercase">
            {FOOTER.columns.contact}
          </h3>
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
            © {year} {SITE.name}. {FOOTER.bottom.rights}
          </p>
          <p className="tracking-[0.2em] uppercase">
            {FOOTER.bottom.tagline} <span className="text-gold-deep">{FOOTER.bottom.taglineSeparator}</span>{" "}
            {FOOTER.bottom.taglineMiddle} <span className="text-gold-deep">{FOOTER.bottom.taglineSeparator}</span>{" "}
            {FOOTER.bottom.taglineEnd}
          </p>
          <BackToTop />
        </Container>
      </div>
    </footer>
  );
}
