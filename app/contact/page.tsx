import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { CONTACT, SITE } from "@/constants/site";
import { getManifest } from "@/utils/manifest";
import { buildTelLink } from "@/utils/links";
import { ClockIcon, FacebookIcon, MapPinIcon, PhoneIcon, TikTokIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${SITE.name} – visit the showroom or call us on ${CONTACT.phoneDisplay}. We usually reply within minutes.`,
  alternates: { canonical: "/contact" },
};

const contactItems = [
  {
    icon: MapPinIcon,
    title: "Visit the Showroom",
    lines: [CONTACT.address],
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.address)}`,
    cta: "View on Google Maps",
    external: true,
  },
  {
    icon: PhoneIcon,
    title: "Call Us",
    lines: [`Phone: ${CONTACT.phoneDisplay}`, "We pick up during opening hours."],
    href: buildTelLink(),
    cta: "Call now",
  },
  {
    icon: ClockIcon,
    title: "Opening Hours",
    lines: [CONTACT.hours],
  },
  {
    icon: FacebookIcon,
    title: "Facebook",
    lines: ["Follow us for new arrivals and offers."],
    href: CONTACT.facebook,
    cta: "Follow us",
    external: true,
  },
  {
    icon: TikTokIcon,
    title: "TikTok",
    lines: ["Behind-the-scenes and fresh drops."],
    href: CONTACT.tiktok,
    cta: "Follow us",
    external: true,
  },
];

export default function ContactPage() {
  const manifest = getManifest();

  return (
    <>
      <PageHero
        eyebrow="We're Here to Help"
        title="Contact Us"
        description="Call or drop by the showroom – we usually reply within minutes."
        image={manifest.banners[2] ?? null}
      />
      <Breadcrumb items={[{ label: "Contact" }]} />

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
