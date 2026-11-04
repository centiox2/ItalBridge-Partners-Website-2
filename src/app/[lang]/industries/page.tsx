import { notFound } from "next/navigation";
import { getDictionary, getPage } from "@/dictionaries";
import { hasLocale } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";
import { href } from "@/site";
import CtaBand from "@/components/page/CtaBand";
import IndustryPicker from "@/components/page/IndustryPicker";
import PageHeader from "@/components/page/PageHeader";
import { container, h2 } from "@/components/ui";
import { images } from "@/images";

export const generateMetadata = ({ params }: PageProps<"/[lang]/industries">) =>
  pageMetadata(params, "industries");

// One photo per industry, in the order of the copy.
const photos = [
  images.bottlingLine,
  images.conveyorLine,
  images.roboticArm,
  images.cncMachining,
  images.workshop,
  images.milling,
];

export default async function Industries({ params }: PageProps<"/[lang]/industries">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const [{ nav }, page] = await Promise.all([getDictionary(lang), getPage(lang, "industries")]);
  const { hero, network, cta } = page;
  const contactHref = href(lang, "contact");

  return (
    <>
      <PageHeader lang={lang} nav={nav} crumb={nav.industries} title={hero.title} text={hero.text} className="pb-10 sm:pb-16" />

      <section className={`${container} pb-16 sm:pb-28`}>
        <IndustryPicker
          label={page.pickerLabel}
          equipment={page.equipment}
          categories={page.categories}
          discuss={{ href: contactHref, label: page.discuss }}
          deliver={{ href: href(lang, "services"), label: page.deliver }}
          industries={page.items.map((item, i) => ({ ...item, image: photos[i] }))}
        />
      </section>

      <section className="bg-night text-cream">
        <div className={`${container} flex flex-wrap items-center gap-10 sm:gap-14 py-16 sm:py-28`}>
          <div className="reveal flex-[1_1_min(380px,100%)]">
            <h2 className={`${h2} mb-4`}>{network.title}</h2>
            <p className="m-0 max-w-[48ch] leading-[1.65] text-mist">{network.text}</p>
          </div>
          <ul className="m-0 grid flex-[1.3_1_min(480px,100%)] list-none grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3 p-0">
            {network.categories.map((c) => (
              <li key={c} className="reveal rounded-lg bg-panel p-5 font-medium">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand tone="light" title={cta.title} text={cta.text} primary={{ href: contactHref, label: cta.button }} />
    </>
  );
}
