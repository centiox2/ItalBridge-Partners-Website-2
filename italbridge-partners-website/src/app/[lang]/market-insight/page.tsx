import { notFound } from "next/navigation";
import { getDictionary, getPage } from "@/dictionaries";
import { hasLocale } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";
import { href } from "@/site";
import CountUp from "@/components/CountUp";
import CtaBand from "@/components/page/CtaBand";
import PageHeader from "@/components/page/PageHeader";
import { container, h2, stagger } from "@/components/ui";

export const generateMetadata = ({ params }: PageProps<"/[lang]/market-insight">) =>
  pageMetadata(params, "marketInsight");

const tip = "tip rounded-md bg-night px-2.5 py-1.5 text-[13px] text-white";

// Bar widths, to scale: Q3 imports (KSh 96.3B of 139.1B), and the highlighted
// share of each split bar (Italy €17M of €117M; machinery ~$55M of ~$154M).
const importWidths = ["69.2%", "100%"];
const shareWidths = ["14.5%", "35.7%"];

export default async function MarketInsight({ params }: PageProps<"/[lang]/market-insight">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const [{ nav }, { hero, imports, stats, position, sources, cta }] = await Promise.all([
    getDictionary(lang),
    getPage(lang, "marketInsight"),
  ]);

  return (
    <>
      <PageHeader lang={lang} nav={nav} crumb={nav.marketInsight} title={hero.title} text={hero.text} />

      <section className={`${container} flex flex-wrap gap-5 pb-14 sm:pb-24`}>
        <figure className="flex-[1.3_1_min(520px,100%)] rounded-xl bg-paper p-6 sm:p-10">
          <figcaption className="mb-8">
            <strong className="block text-[19px] font-semibold">{imports.title}</strong>
            <span className="text-sm text-faint">{imports.unit}</span>
          </figcaption>
          <div className="flex flex-col gap-6.5">
            {imports.bars.map((bar, i) => {
              const latest = i === imports.bars.length - 1;
              return (
                <div key={bar.label} tabIndex={0} aria-label={bar.aria} className="bar relative">
                  <div className={`mb-2 flex justify-between text-sm ${latest ? "font-medium" : "text-body"}`}>
                    <span>{bar.label}</span>
                    <span>{bar.value}</span>
                  </div>
                  <div className="h-10 rounded-r bg-track">
                    <div
                      className={`grow-bar h-full rounded-r ${latest ? "bg-ink" : "bg-steel"}`}
                      style={{ width: importWidths[i], ...stagger(i) }}
                    />
                  </div>
                  <span className={tip}>{bar.tip}</span>
                </div>
              );
            })}
          </div>
          <p className="mt-7 mb-0 text-body">{imports.note}</p>
        </figure>
        <div className="flex flex-[1_1_min(340px,100%)] flex-col gap-5">
          {stats.map((s, i) => (
            <div key={s.value} className={`flex-1 rounded-xl p-8 ${i === 0 ? "bg-night text-cream" : "bg-paper"}`}>
              <div className="text-[52px] leading-tight font-semibold tracking-[-0.04em]">
                <CountUp value={s.value} />
              </div>
              <p className={`mt-2 mb-0 leading-normal ${i === 0 ? "text-mist" : "text-body"}`}>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-paper">
        <div className={`${container} flex flex-wrap gap-10 sm:gap-14 py-16 sm:py-28`}>
          <div className="reveal flex-[1_1_min(360px,100%)]">
            <h2 className={`${h2} mb-4`}>{position.title}</h2>
            <p className="m-0 max-w-[44ch] leading-relaxed text-body">{position.text}</p>
          </div>
          <div className="flex flex-[1.6_1_min(560px,100%)] flex-col gap-10">
            {position.charts.map((chart, i) => (
              <figure key={chart.title} className="reveal">
                <figcaption className="mb-3.5 font-semibold">{chart.title}</figcaption>
                <div className="flex h-11 gap-0.5">
                  <div
                    tabIndex={0}
                    aria-label={chart.part.aria}
                    className="bar grow-bar relative rounded-l bg-ink"
                    style={{ width: shareWidths[i], ...stagger(i * 2 + 1) }}
                  >
                    <span className={tip}>{chart.part.tip}</span>
                  </div>
                  <div
                    tabIndex={0}
                    aria-label={chart.rest.aria}
                    className="bar grow-bar relative flex-1 rounded-r bg-bar-rest"
                    style={stagger(i * 2 + 2)}
                  >
                    <span className={tip}>{chart.rest.tip}</span>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-6 text-sm text-body">
                  <span className="flex items-center gap-2">
                    <span aria-hidden className="inline-block size-3 rounded-[3px] bg-ink" />
                    {chart.part.legend}
                  </span>
                  <span className="flex items-center gap-2">
                    <span aria-hidden className="inline-block size-3 rounded-[3px] bg-bar-rest" />
                    {chart.rest.legend}
                  </span>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className={`${container} py-16 sm:py-28`}>
        <h2 className={`${h2} reveal mb-8`}>{sources.title}</h2>
        {/* On phones each row is a small card, its cells labelled with the column names. */}
        <div className="reveal overflow-x-auto rounded-[10px] border border-line">
          <table className="w-full border-collapse text-left text-[15px] max-sm:block sm:min-w-[640px]">
            <thead className="max-sm:sr-only">
              <tr className="bg-paper">
                {sources.head.map((h) => (
                  <th key={h} scope="col" className="px-4.5 py-3.5 font-medium text-sub">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="max-sm:block">
              {sources.rows.map((row) => (
                <tr key={row[0]} className="border-t border-line max-sm:block max-sm:px-4.5 max-sm:py-4 max-sm:first:border-t-0">
                  {row.map((cell, i) => (
                    <td
                      key={i}
                      data-label={sources.head[i]}
                      className={`px-4.5 py-3.5 max-sm:block max-sm:p-0 ${
                        i === 0
                          ? "max-sm:mb-2 max-sm:font-medium"
                          : "max-sm:mt-1.5 max-sm:flex max-sm:gap-3 max-sm:before:w-20 max-sm:before:shrink-0 max-sm:before:text-sub max-sm:before:content-[attr(data-label)]"
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <CtaBand title={cta.title} text={cta.text} primary={{ href: href(lang, "contact"), label: cta.button }} />
    </>
  );
}
