import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/dictionaries";
import type { Locale } from "@/i18n";
import { contact, href } from "@/site";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileMenu from "./MobileMenu";
import NavLinks from "./NavLinks";
import ThemeToggle from "./ThemeToggle";
import { buttonInk, container, sizeSm } from "./ui";
import { images } from "@/images";

export default function Header({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const { nav } = dict;
  const links = [
    { href: href(lang, "about"), label: nav.about },
    { href: href(lang, "services"), label: nav.services },
    { href: href(lang, "industries"), label: nav.industries },
    { href: href(lang, "manufacturers"), label: nav.manufacturers },
    { href: href(lang, "buyers"), label: nav.buyers },
    { href: href(lang, "marketInsight"), label: nav.marketInsight },
  ];
  const [email] = contact.emails;
  const [phone] = contact.phones;

  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-btn px-4 py-3 font-medium text-btn-fg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {nav.skip}
      </a>
      <div className="bg-night text-[13px] text-mist">
        <div className={`${container} flex flex-wrap justify-between gap-x-6 gap-y-2 py-2.5`}>
          <span className="flex items-center gap-2">
            <span aria-hidden className="pulse inline-block size-[7px] rounded-full bg-steel" />
            {nav.office}
          </span>
          <span className="flex flex-wrap items-center gap-x-2">
            <a href={`mailto:${email}`} className="hover:text-white">{email}</a>
            <span aria-hidden>·</span>
            <a href={`tel:${phone.tel}`} className="hover:text-white">{phone.display}</a>
            <span aria-hidden>·</span>
            <LanguageSwitcher current={lang} label={nav.language} />
          </span>
        </div>
      </div>
      {/* One row at every width: logo, then the links (wide screens) and the actions.
          Below the "nav" breakpoint the links move into MobileMenu; on phones the
          consultation button does too. */}
      <header className="relative border-b border-line">
        <div className={`${container} flex items-center justify-between gap-3 py-4 min-[380px]:gap-4 nav:gap-5 nav:py-4.5`}>
          <Link
            href={href(lang, "home")}
            aria-label={nav.homeLabel}
            // Slightly smaller below 380px, so the row fits a 320px phone.
            className="flex shrink-0 items-center gap-2.5 text-[15px] font-semibold tracking-[-0.01em] min-[380px]:gap-3 min-[380px]:text-lg"
          >
            <span className="flex size-9 items-center justify-center rounded-md bg-night min-[380px]:size-[42px]">
              <Image src={images.logo} alt="" width={29} height={24} loading="eager" className="h-auto w-[29px]" />
            </span>
            ItalBridge Partners
          </Link>
          <NavLinks label={nav.menu} links={links} />
          <div className="flex items-center gap-1.5 min-[380px]:gap-2 sm:gap-3">
            <ThemeToggle toDark={nav.toDark} toLight={nav.toLight} />
            <Link href={href(lang, "contact")} className={`${buttonInk} ${sizeSm} max-sm:hidden`}>
              {nav.cta}
            </Link>
            <MobileMenu
              label={nav.menu}
              openLabel={nav.openMenu}
              closeLabel={nav.closeMenu}
              links={links}
              cta={{ href: href(lang, "contact"), label: nav.cta }}
            />
          </div>
        </div>
      </header>
    </>
  );
}
