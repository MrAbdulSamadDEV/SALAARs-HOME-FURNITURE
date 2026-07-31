import { HammerIcon, PhoneIcon, RulerIcon, ShieldIcon, TagIcon, TruckIcon } from "@/components/icons";

const ICONS = {
  hammer: HammerIcon,
  shield: ShieldIcon,
  ruler: RulerIcon,
  truck: TruckIcon,
  tag: TagIcon,
  phone: PhoneIcon,
} as const;

export interface Feature {
  icon: string;
  title: string;
  text: string;
}

/**
 * Premium feature card – clean white, soft shadow, gold icon chip,
 * subtle lift on hover. Reused on the home page and About page.
 */
export default function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = ICONS[feature.icon as keyof typeof ICONS] ?? HammerIcon;

  return (
    <div className="card card-hover group relative h-full overflow-hidden p-8">
      <span
        className="absolute top-0 left-0 h-0.5 w-0 bg-gold transition-all duration-500 group-hover:w-full"
        aria-hidden="true"
      />
      <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-gold-pale text-gold-deep transition-all duration-300 group-hover:bg-gold group-hover:text-ink group-hover:shadow-gold">
        <Icon className="h-6 w-6" />
      </span>
      <h3 className="title-md mt-6 text-ink">{feature.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-stone">{feature.text}</p>
    </div>
  );
}
