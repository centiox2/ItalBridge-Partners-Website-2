import { notFound } from "next/navigation";
import { getDictionary, getPage } from "@/dictionaries";
import { hasLocale } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";
import LegalPage from "@/components/page/LegalPage";

export const generateMetadata = ({ params }: PageProps<"/[lang]/terms-of-use">) =>
  pageMetadata(params, "terms");

export default async function Terms({ params }: PageProps<"/[lang]/terms-of-use">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const [dict, page] = await Promise.all([getDictionary(lang), getPage(lang, "terms")]);

  return (
    <LegalPage
      lang={lang}
      current="terms"
      dict={dict}
      title={page.title}
      intro={page.intro}
      lastUpdated={page.lastUpdated}
      sections={page.sections}
    />
  );
}
