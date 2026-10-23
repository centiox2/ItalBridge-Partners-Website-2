import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Dictionary } from "@/dictionaries";
import type { Locale } from "@/i18n";
import { Breadcrumb } from "./PageHeader";
import { buttonChip, buttonInk, container, h1, photo, sizeMd } from "../ui";

// Audience pages: copy and two calls to action beside a photo.
export default function SplitHero({
  lang,
  nav,
  crumb,
  title,
  text,
  primary,
  secondary,
  image,
  imageAlt,
}: {
  lang: Locale;
  nav: Dictionary["nav"];
  crumb: ReactNode;
  title: string;
  text: string;
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
  image: StaticImageData;
  imageAlt: string;
}) {
  return (
    <section className={`${container} flex flex-wrap items-center gap-14 pt-18 pb-28`}>
      <div className="min-w-0 flex-[6_1_min(520px,100%)]">
        <Breadcrumb lang={lang} nav={nav}>
          {crumb}
        </Breadcrumb>
        <h1 className={`${h1} enter max-w-[720px] [--i:1]`}>{title}</h1>
        <p className="enter mt-6.5 mb-0 max-w-[54ch] text-[19px] leading-[1.6] text-body [--i:2]">{text}</p>
        <div className="enter mt-9 flex flex-wrap gap-3 [--i:3]">
          <Link href={primary.href} className={`${buttonInk} ${sizeMd}`}>
            {primary.label}
          </Link>
          <Link href={secondary.href} className={`${buttonChip} ${sizeMd}`}>
            {secondary.label}
          </Link>
        </div>
      </div>
      <Image
        src={image}
        alt={imageAlt}
        preload
        fetchPriority="high"
        placeholder="blur"
        sizes="(min-width: 1400px) 560px, (min-width: 1000px) 42vw, 100vw"
        className={`${photo} settle aspect-[5/4] min-w-0 flex-[5_1_min(420px,100%)]`}
      />
    </section>
  );
}
