import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import en from "@/dictionaries/en.json";
import it from "@/dictionaries/it.json";
import { buttonChip, buttonInk, container, sizeMd } from "@/components/ui";
import { images } from "@/images";
import { themeScript } from "@/theme";
import "./globals.css";

const geist = Geist({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: `${en.notFound.title} · ${it.notFound.title} | ItalBridge Partners`,
};

// Any URL that matches no page. The request carries no reliable language, so
// the page speaks both, in the same layout as the rest of the site.
export default function GlobalNotFound() {
  return (
    <html lang="en" className={geist.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased">
        <div className="bg-night py-5">
          <div className={container}>
            <Link
              href="/en"
              className="inline-flex items-center gap-3 text-lg font-semibold text-white"
            >
              <Image src={images.logo} alt="" width={29} height={24} />
              ItalBridge Partners
            </Link>
          </div>
        </div>
        <main className={`${container} flex flex-col gap-10 sm:gap-12 pt-10 sm:pt-20 pb-18 sm:pb-32`}>
          <p className="m-0 text-[clamp(64px,10vw,140px)] leading-none font-semibold tracking-[-0.05em] text-steel">
            404
          </p>
          <div className="flex flex-wrap gap-x-10 sm:gap-x-16 gap-y-10 sm:gap-y-12">
            {[
              { lang: "en", copy: en.notFound, primary: true },
              { lang: "it", copy: it.notFound, primary: false },
            ].map(({ lang, copy, primary }) => {
              // One page heading: English is the h1, the Italian twin an h2 that looks the same.
              const Heading = primary ? "h1" : "h2";
              return (
                <section
                  key={lang}
                  lang={lang}
                  className="flex flex-[1_1_min(360px,100%)] flex-col items-start gap-4"
                >
                  <Heading className="m-0 text-[clamp(30px,3.4vw,44px)] leading-tight font-semibold tracking-[-0.03em]">
                    {copy.title}
                  </Heading>
                  <p className="m-0 max-w-[46ch] text-lg text-body">
                    {copy.text}
                  </p>
                  <Link
                    href={`/${lang}`}
                    className={`${primary ? buttonInk : buttonChip} ${sizeMd}`}
                  >
                    {copy.cta}
                  </Link>
                </section>
              );
            })}
          </div>
        </main>
      </body>
    </html>
  );
}
