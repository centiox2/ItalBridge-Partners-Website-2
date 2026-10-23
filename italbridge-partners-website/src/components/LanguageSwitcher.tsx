"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Fragment } from "react";
import { locales, type Locale } from "@/i18n";

// "EN / IT" in the top bar; the current language is bold white.
export default function LanguageSwitcher({
  current,
  label,
}: {
  current: Locale;
  label: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  // Swap the leading locale segment, keeping the rest of the path.
  const rest = pathname.split("/").slice(2).join("/");

  return (
    <span role="group" aria-label={label} className="inline-flex gap-1">
      {locales.map((l, i) => (
        <Fragment key={l}>
          {i > 0 && <span aria-hidden>/</span>}
          <Link
            href={`/${l}${rest ? `/${rest}` : ""}`}
            hrefLang={l}
            aria-current={l === current ? "true" : undefined}
            // The query (e.g. ?industry=3) is read at click time, so the
            // prerendered link stays static.
            onClick={(event) => {
              if (!window.location.search || event.metaKey || event.ctrlKey || event.shiftKey) return;
              event.preventDefault();
              router.push(`/${l}${rest ? `/${rest}` : ""}${window.location.search}`);
            }}
            className={`uppercase ${l === current ? "font-semibold text-white" : "hover:text-white"}`}
          >
            {l}
          </Link>
        </Fragment>
      ))}
    </span>
  );
}
