/**
 * Section heading with gold eyebrow, title and optional description.
 * Pass `dark` for headings on dark backgrounds, `center` to center content.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  dark = false,
  center = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  dark?: boolean;
  center?: boolean;
}) {
  const align = center ? "items-center text-center" : "items-start text-left";
  return (
    <div className={`flex flex-col ${align}`}>
      <p className={dark ? "eyebrow-dark" : "eyebrow"}>
        <span className={`h-px w-8 ${dark ? "bg-gold" : "bg-gold-deep"}`} aria-hidden="true" />
        {eyebrow}
        {center && <span className={`h-px w-8 ${dark ? "bg-gold" : "bg-gold-deep"}`} aria-hidden="true" />}
      </p>
      <h2 className={`title-lg ${dark ? "text-white" : "text-ink"}`}>{title}</h2>
      {description && (
        <p
          className={`mt-5 max-w-2xl text-[15px] leading-relaxed sm:text-base ${
            dark ? "text-mist" : "text-stone"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
