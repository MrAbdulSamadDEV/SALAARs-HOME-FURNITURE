/**
 * SALAAR'S HOME – Theme
 * ======================
 * THE single source of truth for the visual theme.
 *
 * Editing this file updates the entire website:
 *   npm run build  → styles/tokens.css is regenerated automatically
 *   npm run dev    → same, before the dev server starts
 *
 * Colors
 * ------
 * background  – page background            (#F8F6F2)
 * primary     – primary brand (walnut)     (#5C4033)
 * secondary   – wood brown                 (#8B6B4A)
 * accent      – champagne gold             (#C9A96A)
 * text        – near-black ink             (#1A1A1A)
 * border      – warm sand line             (#E7E2D9)
 *
 * Derived tones below (…Deep / …Soft / …Pale) are used for hovers and chips.
 */

export const THEME = {
  colors: {
    background: "#F8F6F2",
    surface: "#FFFFFF",
    section: "#EFE8DD",
    text: "#1A1A1A",
    primary: "#5C4033",
    primaryDark: "#3A2E24",
    secondary: "#8B6B4A",
    secondaryDeep: "#6E5233",
    secondaryLight: "#A68A68",
    accent: "#C9A96A",
    accentSoft: "#D9BE8A",
    accentDeep: "#A9884A",
    accentPale: "#F3EBDC",
    muted: "#6F6B64",
    mutedLight: "#9A958C",
    border: "#E7E2D9",
    success: "#2F9E5F",
  },

  fonts: {
    headingsName: "Cormorant Garamond",
    bodyName: "Inter",
    buttonsName: "Inter SemiBold",
    headings:
      "var(--font-cormorant), Georgia, 'Times New Roman', serif",
    body: "var(--font-inter), ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
    buttons: "var(--font-inter), ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
  },

  shadows: {
    soft: "0 2px 12px -2px rgb(26 26 26 / 0.07)",
    card: "0 12px 32px -14px rgb(26 26 26 / 0.14)",
    cardHover: "0 28px 56px -24px rgb(26 26 26 / 0.24)",
    gold: "0 12px 28px -10px rgb(201 169 106 / 0.5)",
  },

  animations: {
    duration: {
      fast: "300ms",
      normal: "500ms",
      slow: "700ms",
    },
    easing: {
      default: "cubic-bezier(0.22, 1, 0.36, 1)",
      smooth: "cubic-bezier(0.25, 0.8, 0.25, 1)",
    },
  },
};
