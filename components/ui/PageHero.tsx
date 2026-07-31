import Container from "@/components/ui/Container";
import SmartImage from "@/components/ui/SmartImage";

/**
 * Dark rounded banner shown at the top of inner pages with an optional
 * background image from the banners folder. Sits below the sticky navbar.
 */
export default function PageHero({
  eyebrow,
  title,
  description,
  image,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  image?: string | null;
}) {
  return (
    <section className="px-0 pt-0 sm:px-6 sm:pt-6">
      <div className="relative mx-auto flex max-w-[1400px] flex-col justify-end overflow-hidden bg-ink max-sm:rounded-none sm:rounded-[24px]">
        <div className="relative px-5 pt-16 pb-14 sm:px-8 sm:pt-20 sm:pb-16 lg:px-12">
          {image && (
            <div className="absolute inset-0">
              <SmartImage
                src={image}
                alt=""
                fill
                sizes="100vw"
                priority
                className="object-cover opacity-30"
              />
              <div
                className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/40"
                aria-hidden="true"
              />
            </div>
          )}

          <Container className="relative">
            <p className="eyebrow-dark animate-fade-up">
              <span className="h-px w-8 bg-gold" aria-hidden="true" />
              {eyebrow}
            </p>
            <h1 className="max-w-3xl animate-fade-up font-display text-[2rem] leading-[1.12] font-semibold text-white text-balance sm:text-5xl lg:text-6xl [animation-delay:120ms]">
              {title}
            </h1>
            {description && (
              <p className="mt-6 max-w-2xl animate-fade-up text-[15px] leading-relaxed text-white/70 sm:text-lg [animation-delay:220ms]">
                {description}
              </p>
            )}
          </Container>
        </div>
      </div>
    </section>
  );
}
