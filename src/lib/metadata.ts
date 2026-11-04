import type { Metadata } from "next";
import { getPage, type PageName } from "@/dictionaries";
import { defaultLocale, hasLocale, locales, type Locale } from "@/i18n";
import { images } from "@/images";
import { routes, type Route } from "@/site";

const siteName = "ItalBridge Partners";
const ogLocale: Record<Locale, string> = { en: "en_GB", it: "it_IT" };

// Link previews (WhatsApp, LinkedIn, email): Next does not merge these from
// the layout or derive them from the title, so every page sets its own.
export function socialMetadata(lang: Locale, path: string, title: string, description: string): Metadata {
  return {
    openGraph: {
      type: "website",
      siteName,
      locale: ogLocale[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocale[l]),
      url: `/${lang}${path}`,
      title,
      description,
      images: [{ url: images.nairobi.src, width: images.nairobi.width, height: images.nairobi.height, alt: "Nairobi" }],
    },
    twitter: { card: "summary_large_image", title, description, images: [images.nairobi.src] },
  };
}

// Title, description and per-page canonical/hreflang links for a sub-page.
export async function pageMetadata(
  params: Promise<{ lang: string }>,
  page: PageName & Route,
): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = await getPage(lang, page);
  const path = routes[page];
  return {
    title: meta.title,
    description: meta.description,
    ...socialMetadata(lang, path, `${meta.title} | ${siteName}`, meta.description),
    alternates: {
      canonical: `/${lang}${path}`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `/${l}${path}`])),
        "x-default": `/${defaultLocale}${path}`,
      },
    },
  };
}
