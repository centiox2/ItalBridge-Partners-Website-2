import { notFound } from "next/navigation";
import { getDictionary, getPage } from "@/dictionaries";
import { hasLocale } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";
import LegalPage from "@/components/page/LegalPage";

export const generateMetadata = ({ params }: PageProps<"/[lang]/cookie-policy">) =>
  pageMetadata(params, "cookies");

export default async function Cookies({ params }: PageProps<"/[lang]/cookie-policy">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const [dict, page] = await Promise.all([getDictionary(lang), getPage(lang, "cookies")]);

  return (
    <LegalPage
      lang={lang}
      current="cookies"
      dict={dict}
      title={page.title}
      intro={page.intro}
      lastUpdated={page.lastUpdated}
      sections={page.sections}
    />
  );
}
