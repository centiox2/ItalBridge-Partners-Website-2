import type { CSSProperties } from "react";

// Shared class strings matching the design's buttons and type scale.
export const container = "mx-auto max-w-[1400px] px-4 sm:px-8";

// Buttons: a colour plus a size, e.g. `${buttonInk} ${sizeMd}`.
const button = "btn inline-flex min-h-11 items-center justify-center rounded-md";

export const buttonInk = `${button} bg-btn text-btn-fg hover:bg-btn-hover`;
export const buttonChip = `${button} bg-chip text-ink hover:bg-chip-hover`;
// On dark bands.
export const buttonCream = `${button} bg-cream text-night`;
export const buttonPanel = `${button} bg-panel-raised text-white`;

export const sizeSm = "px-5 py-3 text-sm font-medium";
export const sizeMd = "px-6 py-4 font-medium";
// Closing calls to action.
export const sizeLg = "px-7 py-4.5 font-semibold";

export const h1 =
  "m-0 text-[clamp(40px,4.6vw,64px)] leading-[1.03] font-semibold tracking-[-0.04em]";
export const h2 =
  "m-0 text-[clamp(32px,3.4vw,46px)] leading-[1.05] font-semibold tracking-[-0.035em]";
// Home page section headings are a step larger.
export const h2Large =
  "m-0 text-[clamp(34px,3.6vw,48px)] leading-[1.05] font-semibold tracking-[-0.035em]";

// Inline text link ("Read the market insight →").
export const textLink = "font-medium underline underline-offset-[3px] hover:text-hover";

// Large figure in a stat ("€117M").
export const stat = "text-[40px] leading-tight font-semibold tracking-[-0.03em]";

export const photo = "block w-full rounded-[10px] object-cover";

// Delay for the nth item of a staggered animation (see --i in globals.css).
export const stagger = (i: number) => ({ "--i": i }) as CSSProperties;
