import Link from "next/link";
import { buttonCream, buttonInk, buttonPanel, container, h2, h2Large, sizeLg, sizeMd } from "../ui";

// Closing call to action: a dark band (default) or a plain light row.
export default function CtaBand({
  title,
  text,
  primary,
  secondary,
  tone = "dark",
  large = false,
}: {
  title: string;
  text: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
  tone?: "dark" | "light";
  large?: boolean;
}) {
  const dark = tone === "dark";
  const inner = (
    <div className={`${container} flex flex-wrap items-center justify-between gap-10 ${dark ? "py-26" : "py-28"}`}>
      <div className="reveal flex-[2_1_min(520px,100%)]">
        <h2 className={`${large ? h2Large : h2} mb-3.5`}>{title}</h2>
        <p className={`m-0 max-w-[52ch] leading-relaxed ${dark ? "text-mist" : "text-body"}`}>{text}</p>
      </div>
      <div className="reveal flex flex-wrap gap-3 [--i:1]">
        <Link href={primary.href} className={`${dark ? buttonCream : buttonInk} ${sizeLg}`}>
          {primary.label}
        </Link>
        {secondary && (
          <Link href={secondary.href} className={`${buttonPanel} ${sizeMd}`}>
            {secondary.label}
          </Link>
        )}
      </div>
    </div>
  );

  return dark ? <section className="bg-night text-cream">{inner}</section> : <section>{inner}</section>;
}
