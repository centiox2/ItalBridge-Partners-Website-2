import Image from "next/image";
import { notFound } from "next/navigation";
import { getDictionary, getPage } from "@/dictionaries";
import { hasLocale } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";
import { href } from "@/site";
import CtaBand from "@/components/page/CtaBand";
import PageHeader from "@/components/page/PageHeader";
import { container, h2, photo } from "@/components/ui";
import { images } from "@/images";

export const generateMetadata = ({ params }: PageProps<"/[lang]/about">) =>
  pageMetadata(params, "about");

export default async function About({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const [{ nav }, { hero, why, different, vetting, cta }] = await Promise.all([
    getDictionary(lang),
    getPage(lang, "about"),
  ]);

  return (
    <>
      <PageHeader lang={lang} nav={nav} crumb={nav.about} title={hero.title} text={hero.text} />

      <figure className={container}>
        <Image
          src={images.nairobi}
          alt={hero.imageAlt}
          placeholder="blur"
          preload
          fetchPriority="high"
          sizes="(min-width: 1400px) 1336px, 100vw"
          className={`${photo} settle aspect-[21/8] min-h-[220px]`}
        />
        <figcaption className="mt-3 text-sm text-faint">{hero.caption}</figcaption>
      </figure>

      <section className={`${container} flex flex-wrap gap-16 py-32`}>
        <h2 className={`${h2} reveal flex-[1_1_320px]`}>{why.title}</h2>
        <div className="flex flex-[2_1_min(640px,100%)] flex-col gap-7 text-[19px] leading-[1.65] text-body">
          {why.paragraphs.map((p) => (
            <p key={p} className="reveal m-0">
              {p}
            </p>
          ))}
          <p className="reveal m-0 font-medium text-ink">
            {why.conclusion}
          </p>
        </div>
      </section>

      <section className="bg-paper">
        <div className={`${container} py-32`}>
          <h2 className={`${h2} reveal mb-14 max-w-[700px]`}>{different.title}</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-x-14 gap-y-11">
            {different.items.map((item, i) => (
              <div
                key={item.title}
                className={`reveal pt-5 ${i < 3 ? "draw border-t-2 border-ink" : "border-t border-rule"}`}
              >
                <h3 className="m-0 mb-2 text-xl font-semibold">{item.title}</h3>
                <p className="m-0 leading-relaxed text-body">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${container} flex flex-wrap items-center gap-12 py-32`}>
        <Image
          src={images.engineer}
          alt={vetting.imageAlt}
          placeholder="blur"
          sizes="(min-width: 1400px) 685px, (min-width: 900px) 48vw, 100vw"
          className={`${photo} reveal-img aspect-[4/3] min-w-0 flex-[1_1_min(420px,100%)]`}
        />
        <div className="reveal flex-[1_1_min(420px,100%)]">
          <h2 className={`${h2} mb-4.5`}>{vetting.title}</h2>
          <p className="m-0 mb-6 max-w-[50ch] text-[17px] leading-[1.65] text-body">{vetting.text}</p>
          <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3.5 p-0">
            {vetting.criteria.map((c) => (
              <li key={c} className="rounded-lg bg-paper px-5 py-4.5 font-medium">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title={cta.title}
        text={cta.text}
        primary={{ href: href(lang, "contact"), label: cta.primary }}
        secondary={{ href: href(lang, "services"), label: cta.secondary }}
      />
    </>
  );
}
