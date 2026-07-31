import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import FeatureCard from "@/components/ui/FeatureCard";
import SmartImage from "@/components/ui/SmartImage";
import { FEATURES, STATS } from "@/constants/content";
import { CONTACT, SITE } from "@/constants/site";
import { getManifest } from "@/utils/manifest";
import { buildTelLink } from "@/utils/links";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "SALAAR's HOME is a family-run furniture showroom in Canberra. Explore our story, our workshop values and why thousands of locals furnish with us.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const manifest = getManifest();
  const gallery = manifest.gallery;

  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="Furnishing Homes With Care"
        description="A family-run showroom where timeless design meets honest craftsmanship."
        image={manifest.banners[0] ?? null}
      />
      <Breadcrumb items={[{ label: "About" }]} />

      {/* Story */}
      <section className="bg-linen py-16 sm:py-20 lg:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div>
              <p className="eyebrow">
                <span className="h-px w-8 bg-gold-deep" aria-hidden="true" />
                Welcome to {SITE.name}
              </p>
              <h2 className="title-lg">Built on craftsmanship, trust and a simple promise.</h2>
              <p className="mt-6 leading-relaxed text-stone">
                What began as a small family workshop has grown into one of the area&apos;s most loved
                furniture destinations. We design and build every piece in our own workshop, so quality
                is never a guess – it&apos;s a guarantee.
              </p>
              <p className="mt-4 leading-relaxed text-stone">
                From bedroom sets to statement wardrobes, each item is made with solid, sustainable
                materials and finished by hand. When you buy from us, you deal directly with the makers –
                no middlemen, no inflated prices.
              </p>
              <Link href="/contact" className="btn-gold mt-8">
                Get in Touch
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
                    alt={`Inside the ${SITE.name} showroom`}
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
                Why We Exist
              </p>
              <h2 className="mt-4 font-display text-2xl font-semibold text-ink sm:text-3xl">Our Mission</h2>
              <p className="mt-5 leading-relaxed text-stone">
                To make beautiful, honest, solid-wood furniture accessible to every home. We believe
                quality should never be a luxury reserved for a few – so we build in our own workshop,
                sell directly, and keep prices fair without ever cutting corners.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100} className="h-full">
            <div className="card card-hover h-full p-8 sm:p-10">
              <p className="eyebrow">
                <span className="h-px w-8 bg-gold-deep" aria-hidden="true" />
                Where We&apos;re Going
              </p>
              <h2 className="mt-4 font-display text-2xl font-semibold text-ink sm:text-3xl">Our Vision</h2>
              <p className="mt-5 leading-relaxed text-stone">
                To become the most trusted furniture name in the region – the showroom families visit
                first, for their first home and for every home after that. Every piece we make carries
                our name, so every piece has to be right.
              </p>
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
                Why Choose Us
                <span className="h-px w-8 bg-gold-deep" aria-hidden="true" />
              </p>
              <h2 className="title-lg">Furniture worth living with</h2>
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
                    Visit the Showroom
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">Come and feel the quality yourself</h2>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-stone">
                    {CONTACT.address} · {CONTACT.hours}. Prefer a chat first? Call{" "}
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
                    View on Google Maps
                  </a>
                  <a href={buildTelLink()} className="btn-outline-dark">
                    Call {CONTACT.phoneDisplay}
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
