import Link from "next/link";
import type { ReactNode } from "react";
import type { Dictionary } from "@/dictionaries";
import type { Locale } from "@/i18n";
import { href } from "@/site";
import { container, h1 } from "../ui";

// "Home / About" trail above a page title.
export function Breadcrumb({
  lang,
  nav,
  children,
}: {
  lang: Locale;
  nav: Dictionary["nav"];
  children: ReactNode;
}) {
  return (
    <nav aria-label={nav.breadcrumb} className="enter mb-5 text-[15px] text-sub">
      <Link href={href(lang, "home")} className="underline underline-offset-[3px] hover:text-ink">
        {nav.home}
      </Link>{" "}
      / <span aria-current="page">{children}</span>
    </nav>
  );
}

// Title on the left, intro on the right, bottom-aligned.
export default function PageHeader({
  lang,
  nav,
  crumb,
  title,
  text,
  className = "pb-18",
}: {
  lang: Locale;
  nav: Dictionary["nav"];
  crumb: string;
  title: string;
  text: string;
  className?: string;
}) {
  return (
    <section className={`${container} pt-18 ${className}`}>
      <Breadcrumb lang={lang} nav={nav}>
        {crumb}
      </Breadcrumb>
      <div className="flex flex-wrap items-end gap-12">
        <h1 className={`${h1} enter flex-[3_1_min(600px,100%)]`}>{title}</h1>
        <p className="enter m-0 flex-[2_1_min(340px,100%)] text-lg leading-[1.65] text-body">
          {text}
        </p>
      </div>
    </section>
  );
}
