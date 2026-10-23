import { lang } from "next/root-params";
import { getDictionary } from "@/dictionaries";
import { defaultLocale, hasLocale } from "@/i18n";
import { buttonInk, container, h1, sizeMd } from "@/components/ui";

export default async function NotFound() {
  const value = await lang();
  const locale = hasLocale(value) ? value : defaultLocale;
  const { notFound } = await getDictionary(locale);

  return (
    <section className={`${container} flex flex-col items-start gap-6 pt-10 sm:pt-20 pb-18 sm:pb-32`}>
      <p className="m-0 text-[clamp(64px,10vw,140px)] leading-none font-semibold tracking-[-0.05em] text-steel">
        404
      </p>
      <h1 className={h1}>{notFound.title}</h1>
      <p className="m-0 max-w-[560px] text-lg text-body">{notFound.text}</p>
      <a href={`/${locale}`} className={`${buttonInk} ${sizeMd}`}>
        {notFound.cta}
      </a>
    </section>
  );
}
