import type { Locale } from "@/i18n";
import type en from "./en.json";

export type Dictionary = typeof en;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./en.json").then((m) => m.default),
  it: () => import("./it.json").then((m) => m.default),
};

export const getDictionary = (locale: Locale) => dictionaries[locale]();

// Per-page copy lives in en/<page>.json and it/<page>.json.
const pages = {
  about: { en: () => import("./en/about.json"), it: () => import("./it/about.json") },
  services: { en: () => import("./en/services.json"), it: () => import("./it/services.json") },
  industries: { en: () => import("./en/industries.json"), it: () => import("./it/industries.json") },
  manufacturers: {
    en: () => import("./en/manufacturers.json"),
    it: () => import("./it/manufacturers.json"),
  },
  buyers: { en: () => import("./en/buyers.json"), it: () => import("./it/buyers.json") },
  marketInsight: {
    en: () => import("./en/marketInsight.json"),
    it: () => import("./it/marketInsight.json"),
  },
  contact: { en: () => import("./en/contact.json"), it: () => import("./it/contact.json") },
  privacy: { en: () => import("./en/privacy.json"), it: () => import("./it/privacy.json") },
  terms: { en: () => import("./en/terms.json"), it: () => import("./it/terms.json") },
  cookies: { en: () => import("./en/cookies.json"), it: () => import("./it/cookies.json") },
  dataRequest: {
    en: () => import("./en/dataRequest.json"),
    it: () => import("./it/dataRequest.json"),
  },
};

export type PageName = keyof typeof pages;
export type PageDictionary<P extends PageName> = Awaited<
  ReturnType<(typeof pages)[P]["en"]>
>["default"];

export async function getPage<P extends PageName>(
  locale: Locale,
  page: P,
): Promise<PageDictionary<P>> {
  const mod = await pages[page][locale]();
  return mod.default as PageDictionary<P>;
}
