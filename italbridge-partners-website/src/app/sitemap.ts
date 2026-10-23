import type { MetadataRoute } from "next";
import { locales } from "@/i18n";
import { routes, siteUrl } from "@/site";

// Every page in every language, each listing its translations.
export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(routes).flatMap((path) =>
    locales.map((lang) => ({
      url: `${siteUrl}/${lang}${path}`,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${siteUrl}/${l}${path}`])),
      },
    })),
  );
}
