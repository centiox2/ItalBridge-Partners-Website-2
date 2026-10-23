import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/dictionaries";
import { hasLocale } from "@/i18n";
import { href } from "@/site";
import CountUp from "@/components/CountUp";
import AudienceHero from "@/components/home/AudienceHero";
import CtaBand from "@/components/page/CtaBand";
import { ArrowLabel, CheckList } from "@/components/page/icons";
import { buttonCream, buttonInk, container, h2Large, photo, stagger, stat, textLink } from "@/components/ui";
import { images } from "@/images";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { home, stage } = await getDictionary(lang);
  const { audience, manufacturer, buyer, card, photos, numbers, audiences, stages, industries, cta } = home;
  const contactHref = href(lang, "contact");

  return (
    <>
      <section className={`${container} flex flex-wrap items-center gap-16 pt-20 pb-26`}>
        <AudienceHero
          label={audience.label}
          options={[
            {
              label: audience.manufacturer,
              title: manufacturer.title,
              text: manufacturer.text,
              primary: { href: href(lang, "manufacturers"), label: manufacturer.primary },
              secondary: { href: contactHref, label: manufacturer.secondary },
            },
            {
              label: audience.buyer,
              title: buyer.title,
              text: buyer.text,
              primary: { href: href(lang, "buyers"), label: buyer.primary },
              secondary: { href: contactHref, label: buyer.secondary },
            },
          ]}
        />
        <aside className="enter flex min-w-0 flex-[4_1_min(360px,100%)] flex-col gap-6.5 rounded-[10px] bg-night p-9 text-cream [--i:2]">
          <Image src={images.logo} alt={card.logoAlt} width={92} height={77} loading="eager" className="h-[77px] w-[92px]" />
          <div>
            <p className="m-0 mb-2 text-sm text-[#a3a9b4]">{card.label}</p>
            <div className="flex flex-wrap items-baseline gap-x-3.5">
              <span className="text-5xl font-semibold tracking-[-0.03em]">
                <CountUp value={card.value} />
              </span>
              <span className="font-medium text-ice">{card.change}</span>
            </div>
          </div>
          <p className="m-0 text-[15px] leading-relaxed text-mist">{card.text}</p>
          <Link href={href(lang, "marketInsight")} className={`${textLink} self-start hover:text-white`}>
            <ArrowLabel text={card.link} />
          </Link>
        </aside>
      </section>

      <figure className={`${container} flex flex-wrap gap-4`}>
        <Image
          src={images.nairobi}
          alt={photos.nairobi}
          // Not preloaded: on phones it sits well below the first screen, and on
          // desktop it loads straight away as it reaches the viewport.
          placeholder="blur"
          sizes="(min-width: 1400px) 840px, (min-width: 900px) 62vw, 100vw"
          className={`${photo} settle aspect-[16/7] min-w-0 flex-[2_1_min(520px,100%)]`}
        />
        <Image
          src={images.containerPort}
          alt={photos.port}
          placeholder="blur"
          sizes="(min-width: 1400px) 460px, (min-width: 900px) 32vw, 100vw"
          className={`${photo} settle aspect-[4/3.5] min-w-0 flex-[1_1_min(300px,100%)]`}
        />
      </figure>

      <section className="mt-24 bg-paper">
        <div className={`${container} flex flex-wrap gap-10 py-24`}>
          <div className="reveal flex-[1_1_300px]">
            <h2 className="m-0 mb-4 text-[32px] leading-[1.1] font-semibold tracking-[-0.03em]">{numbers.title}</h2>
            <Link href={href(lang, "marketInsight")} className={textLink}>
              <ArrowLabel text={numbers.link} />
            </Link>
          </div>
          <div className="grid flex-[3_1_min(760px,100%)] grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-8 gap-y-9">
            {numbers.items.map((item, i) => (
              <div key={item.value} className="reveal draw border-t-2 border-ink pt-4" style={stagger(i)}>
                <div className={stat}>
                  <CountUp value={item.value} />
                </div>
                <p className="mt-1.5 mb-0 text-[15px] text-body">{item.text}</p>
              </div>
            ))}
            <p className="col-span-full m-0 text-[13px] text-faint">{numbers.sources}</p>
          </div>
        </div>
      </section>

      <section className={`${container} flex flex-wrap gap-6 py-32`}>
        <article className="reveal lift flex flex-[1.2_1_min(460px,100%)] flex-col gap-5 rounded-[10px] border border-line p-8 sm:p-11">
          <h2 className="m-0 text-[30px] font-semibold tracking-[-0.03em]">{audiences.manufacturers.title}</h2>
          <p className="m-0 max-w-[52ch] leading-relaxed text-body">{audiences.manufacturers.text}</p>
          <CheckList items={audiences.manufacturers.points} />
          <Link href={href(lang, "manufacturers")} className={`${buttonInk} mt-2 self-start px-5.5 py-3.5 font-medium`}>
            {audiences.manufacturers.cta}
          </Link>
        </article>
        <article style={stagger(1)} className="reveal lift flex flex-[1_1_min(400px,100%)] flex-col gap-5 rounded-[10px] bg-night p-8 text-cream sm:p-11">
          <h2 className="m-0 text-[30px] font-semibold tracking-[-0.03em]">{audiences.buyers.title}</h2>
          <p className="m-0 max-w-[52ch] leading-relaxed text-mist">{audiences.buyers.text}</p>
          <CheckList items={audiences.buyers.points} iconClass="stroke-ice" />
          <Link href={href(lang, "buyers")} className={`${buttonCream} mt-2 self-start px-5.5 py-3.5 font-medium`}>
            {audiences.buyers.cta}
          </Link>
        </article>
      </section>

      <section className="bg-paper">
        <div className={`${container} py-32`}>
          <div className="reveal mb-14 flex flex-wrap items-end justify-between gap-6">
            <h2 className={`${h2Large} max-w-[700px]`}>{stages.title}</h2>
            <Link href={href(lang, "services")} className={textLink}>
              <ArrowLabel text={stages.link} />
            </Link>
          </div>
          <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-x-6 gap-y-8 p-0">
            {stages.items.map((item, i) => (
              <li key={item.title} className="reveal draw border-t-[3px] border-ink pt-5 [--bw:3px]" style={stagger(i)}>
                <span className="text-sm font-semibold text-sub">
                  {stage} {i + 1}
                </span>
                <h3 className="mt-2 mb-1.5 text-lg font-semibold">{item.title}</h3>
                <p className="m-0 text-[15px] leading-[1.55] text-body">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`${container} flex flex-wrap gap-14 py-32`}>
        <div className="reveal flex-[1_1_320px]">
          <h2 className={`${h2Large} mb-4`}>{industries.title}</h2>
          <p className="m-0 max-w-[40ch] leading-relaxed text-body">{industries.text}</p>
        </div>
        <ul className="draw m-0 flex-[2_1_min(640px,100%)] list-none border-t border-ink p-0 [--bw:1px]">
          {industries.items.map((item, i) => (
            <li key={item.title} className="reveal" style={stagger(i)}>
              <Link
                href={`${href(lang, "industries")}?industry=${i + 1}`}
                className="idx flex flex-wrap justify-between gap-x-6 gap-y-2 border-b border-line px-2 py-6 hover:bg-chip"
              >
                <strong className="text-[22px] font-medium tracking-[-0.02em]">{item.title}</strong>
                <span className="text-sub">
                  <ArrowLabel text={`${item.text} →`} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand large title={cta.title} text={cta.text} primary={{ href: contactHref, label: cta.button }} />
    </>
  );
}
