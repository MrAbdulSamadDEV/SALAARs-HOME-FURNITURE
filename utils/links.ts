import { CONTACT } from "@/data/contact";
import { SOCIAL } from "@/data/social";
import { CURRENCY } from "@/data/settings";

/** Builds a click-to-call link. */
export function buildTelLink(): string {
  return `tel:+${CONTACT.phoneIntl}`;
}

/**
 * Builds the WhatsApp chat link from src/data/social.ts –
 * never hardcode the URL, edit social.ts instead.
 */
export function buildWhatsAppLink(): string {
  const { phone, message } = SOCIAL.whatsapp;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/**
 * Formats a price for display.
 * Prices are treated as PKR by default – change CURRENCY in src/data/settings.ts.
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat(CURRENCY.locale, {
    style: "currency",
    currency: CURRENCY.code,
    maximumFractionDigits: 0,
  }).format(price);
}
