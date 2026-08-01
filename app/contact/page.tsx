import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { CONTACT, CONTACT_PAGE } from "@/data/contact";
import { PAGE_SEO } from "@/data/seo";
import { SITE } from "@/data/site";
import { SOCIAL } from "@/data/social";
import { getManifest } from "@/utils/manifest";
import { buildTelLink } from "@/utils/links";
import {
  ClockIcon,
  FacebookIcon,
  MapPinIcon,
  PhoneIcon,
  TikTokIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: PAGE_SEO.contact.title,
  description: `Get in touch with ${SITE.name} – visit the showroom or call us on ${CONTACT.phoneDisplay}. We usually reply within minutes.`,
  alternates: { canonical: "/contact" },
};

/** Icon map for the data-driven contact cards (keys stored in src/data/contact.ts). */
const contactItems = CONTACT_PAGE.cards.map((card) => {
  switch (card.icon) {
    case "map-pin":
      return {
        icon: MapPinIcon,
        title: card.title,
        lines: [CONTACT.address],
        href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.address)}`,
        cta: card.cta,
        external: true,
      };
    case "phone":
      return {
        icon: PhoneIcon,
        title: card.title,
        lines: card.lines,
        href: buildTelLink(),
        cta: card.cta,
      };
    case "clock":
      return {
        icon: ClockIcon,
        title: card.title,
        lines: card.lines,
        cta: card.cta,
      };
    case "facebook":
      return {
        icon: FacebookIcon,
        title: card.title,
        lines: card.lines,
        href: SOCIAL.facebook.url,
        cta: card.cta,
        external: true,
      };
    case "tiktok":
      return {
        icon: TikTokIcon,
        title: card.title,
        lines: card.lines,
        href: SOCIAL.tiktok.url,
        cta: card.cta,
        external: true,
      };
    default:
      return null;
  }
}).filter(Boolean) as {
  icon: typeof MapPinIcon;
  title: string;
  lines: string[];
  href?: string;
  cta?: string;
  external?: boolean;
}[];

export default function ContactPage() {
  const manifest = getManifest();

  return (
    <>
      <PageHero
        eyebrow={CONTACT_PAGE.hero.eyebrow}
        title={CONTACT_PAGE.hero.title}
        description={CONTACT_PAGE.hero.description}
        image={manifest.banners[2] ?? null}
      />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: CONTACT_PAGE.hero.title }]} />

      {/* Contact info cards */}
      <section className="bg-linen py-16 sm:py-20">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {contactItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={i * 70} className="h-full">
                  <div className="card card-hover flex h-full flex-col p-8">
                    <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-gold-pale text-gold-deep">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="title-md mt-6 text-ink">{item.title}</h3>
                    <div className="mt-3 space-y-1 text-sm leading-relaxed text-stone">
                      {item.lines.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                    {item.href && (
                      <a
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noopener noreferrer" : undefined}
                        className="btn-gold mt-6 self-start"
                      >
                        {item.cta}
                      </a>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Map */}
      <section className="bg-cream pb-16 sm:pb-24">
        <Container>
          <Reveal>
            <div className="overflow-hidden rounded-[24px] shadow-soft ring-1 ring-line">
              <iframe
                title={`${SITE.name} on Google Maps`}
                src={CONTACT.mapEmbed}
                className="h-[380px] w-full border-0 sm:h-[460px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
