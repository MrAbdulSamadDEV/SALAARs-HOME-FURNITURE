import Link from "next/link";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { CONTACT } from "@/data/contact";
import { CONTACT_CTA } from "@/data/home";
import { buildTelLink } from "@/utils/links";
import { PhoneIcon } from "@/components/icons";

/**
 * Contact call-to-action – dark rounded card shown at the bottom of the home page.
 */
export default function ContactCTA() {
  const { eyebrow, titleStart, titleAccent, description, callNow, contactUs } = CONTACT_CTA;
  return (
    <section className="bg-cream px-4 pb-16 sm:px-6 sm:pb-20 sm:pt-4 lg:px-8 xl:px-12">
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[24px] bg-ink px-6 py-16 text-center text-white sm:py-24">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gold/10 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-wood/25 blur-3xl" aria-hidden="true" />

        <Container className="relative">
          <Reveal>
            <p className="eyebrow-dark justify-center">
              <span className="h-px w-8 bg-gold" aria-hidden="true" />
              {eyebrow}
              <span className="h-px w-8 bg-gold" aria-hidden="true" />
            </p>
            <h2 className="mx-auto max-w-2xl text-[2rem] leading-[1.14] font-semibold text-balance sm:text-4xl lg:text-5xl">
              {titleStart} <span className="text-gold-gradient">{titleAccent}</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-mist sm:text-lg">
              {description}
            </p>

            <p className="mt-9 font-display text-3xl font-semibold tracking-wide text-gold sm:text-4xl">
              {CONTACT.phoneDisplay}
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a href={buildTelLink()} className="btn-gold">
                <PhoneIcon className="h-4 w-4" />
                {callNow}
              </a>
              <Link href="/contact" prefetch className="btn-outline-light">
                {contactUs}
              </Link>
            </div>
          </Reveal>
        </Container>
      </div>
    </section>
  );
}
