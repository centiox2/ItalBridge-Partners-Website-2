import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/dictionaries";
import type { Locale } from "@/i18n";
import { contact, href, socials, type Route } from "@/site";
import { container } from "./ui";
import { images } from "@/images";

async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

const heading = "mb-1 font-medium text-white";
const column = "flex flex-col items-start gap-1";
const link = "py-1.5 hover:text-white";

export default async function Footer({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const year = await currentYear();
  const { nav, footer } = dict;
  // Footer links skip prefetching: it would compete with page images on slow connections.
  const pageLink = (route: Route, label: string) => (
    <Link key={route} prefetch={false} href={href(lang, route)} className={link}>
      {label}
    </Link>
  );

  return (
    <footer className="bg-ink-deep text-[15px] text-mist">
      <div className={`${container} grid grid-cols-2 gap-10 pt-10 pb-8 sm:grid-cols-[repeat(auto-fit,minmax(190px,1fr))] sm:pt-18`}>
        <div className="max-sm:col-span-2">
          <Image src={images.logo} alt={nav.logoAlt} width={64} height={54} className="mb-3.5 block h-auto w-16" />
          <div className="font-semibold text-white">ItalBridge Partners</div>
          <p className="mt-1.5 mb-0 leading-relaxed">{footer.tagline}</p>
        </div>
        <div className={column}>
          <strong className={heading}>{footer.company}</strong>
          {pageLink("about", nav.about)}
          {pageLink("services", nav.services)}
          {pageLink("industries", nav.industries)}
          {pageLink("marketInsight", nav.marketInsight)}
        </div>
        <div className={column}>
          <strong className={heading}>{footer.work}</strong>
          {pageLink("manufacturers", nav.manufacturers)}
          {pageLink("buyers", nav.buyers)}
          {pageLink("contact", nav.contact)}
        </div>
        <div className={`${column} max-sm:col-span-2`}>
          <strong className={heading}>{footer.contact}</strong>
          {contact.emails.map((email) => (
            <a key={email} href={`mailto:${email}`} className={`${link} break-all`}>
              {email}
            </a>
          ))}
          <span>
            {contact.phones.map((phone, i) => (
              <span key={phone.tel}>
                {i > 0 && " · "}
                <a href={`tel:${phone.tel}`} className={link}>
                  {phone.display}
                </a>
              </span>
            ))}
          </span>
        </div>
      </div>
      <div className={`${container} flex flex-wrap justify-between gap-x-8 gap-y-4 border-t border-rule-dark pt-6 pb-10 text-sm`}>
        <span>© {year} ItalBridge Partners</span>
        <ul aria-label={footer.social} className="m-0 flex list-none flex-wrap gap-5 p-0">
          {socials.map((s) => (
            <li key={s.href}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className={`${link} inline-block min-w-6 text-center underline`}>
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <nav aria-label={footer.legal} className="flex flex-wrap gap-5 underline">
          {pageLink("privacy", footer.privacy)}
          {pageLink("terms", footer.terms)}
          {pageLink("cookies", footer.cookies)}
          {pageLink("dataRequest", footer.dataRequest)}
        </nav>
      </div>
    </footer>
  );
}
