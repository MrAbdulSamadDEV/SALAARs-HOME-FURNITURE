import { CONTACT } from "@/constants/site";

/** Builds a click-to-call link. */
export function buildTelLink(): string {
  return `tel:+${CONTACT.phoneIntl}`;
}

/**
 * Formats a price for display.
 * Prices are treated as VND by default – change `currency` if needed.
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
}
