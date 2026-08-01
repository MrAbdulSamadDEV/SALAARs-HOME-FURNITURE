import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import FeatureCard from "@/components/ui/FeatureCard";
import SmartImage from "@/components/ui/SmartImage";
import { ABOUT_PAGE } from "@/data/about";
import { CONTACT } from "@/data/contact";
import { FEATURES, STATS } from "@/data/home";
import { PAGE_SEO } from "@/data/seo";
import { SITE } from "@/data/site";
import { getManifest } from "@/utils/manifest";
import { buildTelLink } from "@/utils/links";

export const metadata: Metadata = {
  title: PAGE_SEO.about.title,
  description: PAGE_SEO.about.description,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const manifest = getManifest();
  const gallery = manifest.gallery;

  return (
    <>
      <PageHero
        eyebrow={ABOUT_PAGE.hero.eyebrow}
        title={ABOUT_PAGE.hero.title}
        description={ABOUT_PAGE.hero.description}
        image={manifest.banners[0] ?? null}
      />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: ABOUT_PAGE.hero.title }]} />

      {/* Story */}
      <section className="bg-linen py-16 sm:py-20 lg:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div>
              <p className="eyebrow">
                <span className="h-px w-8 bg-gold-deep" aria-hidden="true" />
                {ABOUT_PAGE.story.eyebrowPrefix} {SITE.name}
              </p>
              <h2 className="title-lg">{ABOUT_PAGE.story.title}</h2>
              {ABOUT_PAGE.story.paragraphs.map((paragraph, i) => (
                <p key={i} className={`leading-relaxed text-stone ${i === 0 ? "mt-6" : "mt-4"}`}>
                  {paragraph}
                </p>
              ))}
              <Link href="/contact" prefetch className="btn-gold mt-8">
                {ABOUT_PAGE.story.cta}
              </Link>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="grid grid-cols-2 gap-4">
              {gallery.slice(0, 2).map((image, i) => (
                <div
                  key={image}
                  className={`relative overflow-hidden rounded-[20px] shadow-soft ring-1 ring-line ${i === 1 ? "mt-8" : ""}`}
                >
                  <SmartImage
                    src={image}
                    alt={`${ABOUT_PAGE.galleryAltPrefix} – ${i + 1}`}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="bg-cream py-16 sm:py-20">
        <Container className="grid gap-6 lg:grid-cols-2">
          <Reveal className="h-full">
            <div className="card card-hover h-full p-8 sm:p-10">
              <p className="eyebrow">
                <span className="h-px w-8 bg-gold-deep" aria-hidden="true" />
                {ABOUT_PAGE.mission.eyebrow}
              </p>
              <h2 className="mt-4 font-display text-2xl font-semibold text-ink sm:text-3xl">
                {ABOUT_PAGE.mission.title}
              </h2>
              <p className="mt-5 leading-relaxed text-stone">{ABOUT_PAGE.mission.text}</p>
            </div>
          </Reveal>
          <Reveal delay={100} className="h-full">
            <div className="card card-hover h-full p-8 sm:p-10">
              <p className="eyebrow">
                <span className="h-px w-8 bg-gold-deep" aria-hidden="true" />
                {ABOUT_PAGE.vision.eyebrow}
              </p>
              <h2 className="mt-4 font-display text-2xl font-semibold text-ink sm:text-3xl">
                {ABOUT_PAGE.vision.title}
              </h2>
              <p className="mt-5 leading-relaxed text-stone">{ABOUT_PAGE.vision.text}</p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Stats */}
      <section className="bg-ink py-14 sm:py-16">
        <Container>
          <div className="grid gap-10 text-center sm:grid-cols-3">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-4xl font-semibold text-gold sm:text-5xl">{stat.value}</p>
                <p className="mt-2 text-xs font-semibold tracking-[0.3em] text-white/60 uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-cream py-16 sm:py-20">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="eyebrow justify-center">
                <span className="h-px w-8 bg-gold-deep" aria-hidden="true" />
                {ABOUT_PAGE.values.eyebrow}
                <span className="h-px w-8 bg-gold-deep" aria-hidden="true" />
              </p>
              <h2 className="title-lg">{ABOUT_PAGE.values.title}</h2>
            </div>
          </Reveal>

          <div className="mt-12 grid items-stretch gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {FEATURES.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 80} className="h-full">
                <FeatureCard feature={feature} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Visit us */}
      <section className="bg-linen pb-16 sm:pb-20">
        <Container>
          <Reveal>
            <div className="rounded-[24px] bg-white p-8 shadow-soft ring-1 ring-line sm:p-10">
              <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
                <div>
                  <p className="eyebrow">
                    <span className="h-px w-8 bg-gold-deep" aria-hidden="true" />
                    {ABOUT_PAGE.visit.eyebrow}
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
                    {ABOUT_PAGE.visit.title}
                  </h2>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-stone">
                    {CONTACT.address} · {CONTACT.hours}. Prefer a chat first? {ABOUT_PAGE.visit.call}{" "}
                    <a href={buildTelLink()} className="font-semibold text-gold-deep underline-offset-2 hover:underline">
                      {CONTACT.phoneDisplay}
                    </a>{" "}
                    – we reply quickly.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold"
                  >
                    {ABOUT_PAGE.visit.maps}
                  </a>
                  <a href={buildTelLink()} className="btn-outline-dark">
                    {ABOUT_PAGE.visit.call} {CONTACT.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
