import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import JsonLd from "@/components/seo/JsonLd";
import FaqList from "@/components/home/FaqList";
import { FAQ_GROUPS, FAQ_PAGE } from "@/data/faq";
import { CONTACT } from "@/data/contact";
import { PAGE_SEO } from "@/data/seo";
import { getManifest } from "@/utils/manifest";
import { buildTelLink } from "@/utils/links";

export const metadata: Metadata = {
  title: PAGE_SEO.faq.title,
  description: PAGE_SEO.faq.description,
  alternates: { canonical: "/faq" },
};

/** Structured data for search engines – FAQPage from FAQ_GROUPS. */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_GROUPS.flatMap((group) => group.items).map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function FaqPage() {
  const manifest = getManifest();
  const hero = FAQ_PAGE.hero;
  const still = FAQ_PAGE.stillHaveQuestion;

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        image={manifest.banners[2] ?? null}
      />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: hero.title }]} />

      <section className="bg-linen py-16 sm:py-20">
        <Container className="max-w-4xl">
          <div className="space-y-12">
            {FAQ_GROUPS.map((group) => (
              <Reveal key={group.title}>
                <div>
                  <h2 className="mb-5 flex items-center gap-3 font-display text-xl font-semibold text-ink sm:text-2xl">
                    <span className="h-px w-8 bg-gold-deep" aria-hidden="true" />
                    {group.title}
                  </h2>
                  <FaqList items={group.items} />
                </div>
              </Reveal>
            ))}
          </div>

          {/* Still have questions? */}
          <Reveal>
            <div className="mt-14 rounded-[24px] bg-ink p-8 text-center sm:p-10">
              <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
                {still.title}
              </h2>
              <p className="mt-3 text-sm text-white/70">
                {still.description.replace("{phone}", CONTACT.phoneDisplay)}
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-4">
                <a href={buildTelLink()} className="btn-gold">
                  {still.call.replace("{phone}", CONTACT.phoneDisplay)}
                </a>
                <Link href="/contact" prefetch className="btn-outline-light">
                  {still.contactPage}
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
