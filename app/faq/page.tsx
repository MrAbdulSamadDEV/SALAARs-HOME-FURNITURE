import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import FaqList from "@/components/home/FaqList";
import { FAQ_GROUPS } from "@/constants/content";
import { CONTACT } from "@/constants/site";
import { getManifest } from "@/utils/manifest";
import { buildTelLink } from "@/utils/links";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers about delivery, custom furniture, payment methods, contact details, delivery times and warranty at SALAAR's HOME.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const manifest = getManifest();

  return (
    <>
      <PageHero
        eyebrow="Good to Know"
        title="Frequently Asked Questions"
        description="Everything you need to know about delivery, custom orders, payment and warranty."
        image={manifest.banners[2] ?? null}
      />
      <Breadcrumb items={[{ label: "FAQ" }]} />

      <section className="bg-linen py-16 sm:py-20">
        <Container className="max-w-4xl">
          <div className="space-y-12">
            {FAQ_GROUPS.map((group, i) => (
              <Reveal key={group.title} delay={i * 60}>
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
                Still have a question?
              </h2>
              <p className="mt-3 text-sm text-white/70">
                Call us on{" "}
                <a href={buildTelLink()} className="font-semibold text-gold hover:underline">
                  {CONTACT.phoneDisplay}
                </a>{" "}
                – we usually reply within minutes.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-4">
                <a href={buildTelLink()} className="btn-gold">
                  Call {CONTACT.phoneDisplay}
                </a>
                <Link href="/contact" className="btn-outline-light">
                  Contact Page
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
