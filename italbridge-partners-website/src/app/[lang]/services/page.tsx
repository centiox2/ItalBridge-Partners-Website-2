import { notFound } from "next/navigation";
import { getDictionary, getPage } from "@/dictionaries";
import { hasLocale } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";
import { href } from "@/site";
import CtaBand from "@/components/page/CtaBand";
import PageHeader from "@/components/page/PageHeader";
import StageTabs from "@/components/page/StageTabs";
import { container, h2, stagger } from "@/components/ui";
import { images } from "@/images";

export const generateMetadata = ({ params }: PageProps<"/[lang]/services">) =>
  pageMetadata(params, "services");

// One photo per stage, in stage order.
const photos = [
  images.nairobi,
  images.engineer,
  images.cncMachining,
  images.conveyorLine,
  images.containerPort,
  images.roboticArm,
];

export default async function Services({ params }: PageProps<"/[lang]/services">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const [{ nav, stage }, page] = await Promise.all([getDictionary(lang), getPage(lang, "services")]);
  const { hero, faq, cta } = page;

  return (
    <>
      <PageHeader lang={lang} nav={nav} crumb={nav.services} title={hero.title} text={hero.text} className="pb-24" />

      <section className="bg-paper">
        <div className={`${container} flex flex-wrap gap-12 pt-24 pb-32`}>
          <StageTabs
            label={page.tabsLabel}
            stageLabel={stage}
            weDo={page.weDo}
            youGet={page.youGet}
            stages={page.stages.map((s, i) => ({ ...s, image: photos[i] }))}
          />
        </div>
      </section>

      <section className={`${container} flex flex-wrap gap-14 py-32`}>
        <h2 className={`${h2} reveal flex-[1_1_300px]`}>{faq.title}</h2>
        <div className="draw flex-[2_1_min(640px,100%)] border-t border-ink [--bw:1px]">
          {faq.items.map((item, i) => (
            <details key={item.q} className="reveal border-b border-line py-5.5" style={stagger(i)}>
              <summary className="flex justify-between gap-6 text-[19px] font-medium">
                {item.q}
                <span aria-hidden className="plus text-2xl leading-none">
                  +
                </span>
              </summary>
              <p className="mt-3.5 mb-0 max-w-[60ch] leading-[1.65] text-body">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <CtaBand
        title={cta.title}
        text={cta.text}
        primary={{ href: href(lang, "contact"), label: cta.primary }}
        secondary={{ href: href(lang, "industries"), label: cta.secondary }}
      />
    </>
  );
}
