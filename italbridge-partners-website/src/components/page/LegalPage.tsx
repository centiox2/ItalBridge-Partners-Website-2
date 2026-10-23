import Link from "next/link";
import type { Dictionary } from "@/dictionaries";
import type { Locale } from "@/i18n";
import { contact, href, type Route } from "@/site";
import PageHeader from "./PageHeader";
import { container } from "../ui";

type Doc = Extract<Route, "privacy" | "terms" | "cookies" | "dataRequest">;

const label = "mb-2 text-sm font-semibold text-sub";

// Shared layout for the Privacy, Terms and Cookie pages: sticky sidebar
// with the other legal documents and a table of contents.
export default function LegalPage({
  lang,
  current,
  dict,
  title,
  intro,
  lastUpdated,
  sections,
}: {
  lang: Locale;
  current: Doc;
  dict: Dictionary;
  title: string;
  intro: string;
  lastUpdated: string;
  sections: { title: string; text: string }[];
}) {
  const { nav, legal, footer } = dict;
  const docs: { route: Doc; label: string }[] = [
    { route: "privacy", label: footer.privacy },
    { route: "terms", label: footer.terms },
    { route: "cookies", label: footer.cookies },
    { route: "dataRequest", label: footer.dataRequest },
  ];
  const email = contact.emails[0];

  return (
    <>
      <PageHeader lang={lang} nav={nav} crumb={title} title={title} text={intro} />
      <div className={`${container} flex flex-wrap items-start gap-x-16 gap-y-10 pb-28`}>
        <aside className="w-full rounded-xl bg-paper p-7 text-[15px] md:sticky md:top-6 md:w-auto md:flex-[0_1_320px]">
          <div className={label}>{legal.documents}</div>
          <nav aria-label={legal.documents} className="mb-6">
            {docs.map((d) => (
              <Link
                key={d.route}
                href={href(lang, d.route)}
                aria-current={d.route === current ? "page" : undefined}
                className={`block py-1.5 ${d.route === current ? "font-semibold" : "text-body hover:text-ink hover:underline"}`}
              >
                {d.label}
              </Link>
            ))}
          </nav>
          <div className={label}>{legal.lastUpdated}</div>
          <div className="mb-6 text-body">{lastUpdated}</div>
          <div className={label}>{legal.onThisPage}</div>
          <nav aria-label={legal.onThisPage}>
            {sections.map((s, i) => (
              <a key={s.title} href={`#s${i + 1}`} className="block py-1.5 text-body hover:text-ink hover:underline">
                {i + 1}. {s.title}
              </a>
            ))}
          </nav>
        </aside>
        <article className="flex-[1_1_min(560px,100%)] border-t border-ink">
          {sections.map((s, i) => (
            <section key={s.title} id={`s${i + 1}`} className="scroll-mt-6 border-b border-line py-7">
              <h2 className="m-0 mb-2.5 text-2xl font-semibold tracking-[-0.02em]">
                {i + 1}. {s.title}
              </h2>
              <p className="m-0 max-w-[70ch] text-[17px] leading-[1.65] text-body">{s.text}</p>
            </section>
          ))}
          <p className="mt-10 mb-0 text-lg">
            <strong className="font-semibold">{legal.questions}</strong> {legal.contactUs}{" "}
            <a href={`mailto:${email}`} className="font-medium underline hover:text-hover">
              {email}
            </a>
            .
          </p>
        </article>
      </div>
    </>
  );
}
