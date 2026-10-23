import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Geist } from "next/font/google";
import { getDictionary } from "@/dictionaries";
import { defaultLocale, hasLocale, locales } from "@/i18n";
import { socialMetadata } from "@/lib/metadata";
import { siteUrl } from "@/site";
import { themeScript } from "@/theme";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Motion from "@/components/Motion";
import ScrollReset from "@/components/ScrollReset";
import "../globals.css";

const geist = Geist({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-geist",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    metadataBase: new URL(siteUrl),
    title: { default: dict.meta.title, template: `%s | ${dict.meta.title}` },
    description: dict.meta.description,
    ...socialMetadata(lang, "", dict.meta.title, dict.meta.description),
    alternates: {
      canonical: `/${lang}`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `/${l}`])),
        "x-default": `/${defaultLocale}`,
      },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <html
      lang={lang}
      // Lets Next skip smooth scrolling on route changes (e.g. switching language).
      data-scroll-behavior="smooth"
      className={geist.variable}
      // The head script sets data-theme before React hydrates.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body id="top" className="font-sans antialiased">
        <Header lang={lang} dict={dict} />
        {/* Motion fades each new page in. */}
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer lang={lang} dict={dict} />
        <Motion />
        <ScrollReset />
      </body>
    </html>
  );
}
