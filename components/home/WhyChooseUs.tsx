import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import FeatureCard from "@/components/ui/FeatureCard";
import { FEATURES, STATS, WHY_CHOOSE_SECTION } from "@/data/home";

/**
 * "Why Choose SALAAR's HOME" – feature grid on a beige background with an
 * animated statistics band.
 */
export default function WhyChooseUs() {
  return (
    <section className="bg-beige py-16 sm:py-20 lg:py-24">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center">
              <span className="h-px w-8 bg-gold-deep" aria-hidden="true" />
              {WHY_CHOOSE_SECTION.eyebrow}
              <span className="h-px w-8 bg-gold-deep" aria-hidden="true" />
            </p>
            <h2 className="title-lg">{WHY_CHOOSE_SECTION.title}</h2>
            <p className="mt-5 text-[15px] leading-relaxed text-stone sm:text-base">
              {WHY_CHOOSE_SECTION.description}
            </p>
          </div>
        </Reveal>

        {/* Feature grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <Reveal key={feature.title}>
              <FeatureCard feature={feature} />
            </Reveal>
          ))}
        </div>

        {/* Stats band */}
        <Reveal>
          <div className="mt-14 grid grid-cols-2 overflow-hidden rounded-3xl bg-ink shadow-card ring-1 ring-gold/30 sm:grid-cols-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="border-b border-white/10 px-6 py-10 text-center text-white transition-colors duration-300 hover:bg-ink-2 sm:border-r sm:[&:nth-child(4)]:border-r-0 max-sm:[&:nth-child(n+3)]:border-b-0"
              >
                <p className="font-display text-4xl font-semibold text-gold sm:text-5xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-3 text-[11px] font-semibold tracking-[0.25em] text-mist uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
