import type { Locale } from "@/i18n";

// Public URL of the site, used for canonical and hreflang links.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://italbridgepartners.co.ke";

export const contact = {
  emails: ["info@italbridgepartners.co.ke", "sales@italbridgepartners.co.ke"],
  phones: [
    { display: "0729 324 033", international: "+254 729 324 033", tel: "+254729324033" },
    { display: "0788 888 802", international: "+254 788 888 802", tel: "+254788888802" },
  ],
};

export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/italbridgepartners/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/italbridgepartners" },
  { label: "Facebook", href: "https://www.facebook.com/italbridgepartners" },
  { label: "X", href: "https://x.com/italbridge" },
];

export const routes = {
  home: "",
  about: "/about",
  services: "/services",
  industries: "/industries",
  manufacturers: "/manufacturers",
  buyers: "/buyers",
  marketInsight: "/market-insight",
  contact: "/contact",
  privacy: "/privacy-policy",
  terms: "/terms-of-use",
  cookies: "/cookie-policy",
  dataRequest: "/data-request",
} as const;

export type Route = keyof typeof routes;

export const href = (lang: Locale, route: Route, hash?: string) =>
  `/${lang}${routes[route]}${hash ? `#${hash}` : ""}`;
