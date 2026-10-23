import type { Locale } from "@/i18n";

// Public URL of the site, used for canonical and hreflang links, link
// previews, robots.txt and the sitemap. Set NEXT_PUBLIC_SITE_URL to override;
// on Vercel it defaults to the project's production domain (the custom domain
// once one is connected), so those links point at the site that serves them.
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? (vercelUrl ? `https://${vercelUrl}` : "https://italbridgepartners.co.ke");

export const contact = {
  emails: ["info@italbridgepartners.co.ke", "sales@italbridgepartners.co.ke"],
  phones: [
    { display: "+254 785 605 999", international: "+254 785 605 999", tel: "+254785605999" },
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
