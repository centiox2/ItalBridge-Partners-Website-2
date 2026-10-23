"use client";

import Link from "next/link";
import { useState } from "react";
import { buttonChip, buttonInk, sizeMd } from "../ui";

type Copy = {
  title: string;
  text: string;
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
};

// Hero copy for whichever audience the visitor picks; manufacturers first.
export default function AudienceHero({
  label,
  options,
}: {
  label: string;
  options: (Copy & { label: string })[];
}) {
  const [picked, setPicked] = useState(0);
  const copy = options[picked];

  return (
    <div className="min-w-0 flex-[7_1_min(560px,100%)]">
      <div role="group" aria-label={label} className="enter mb-8 inline-flex flex-wrap gap-1 rounded-lg bg-chip p-1">
        {options.map((o, i) => (
          <button
            key={o.label}
            type="button"
            aria-pressed={i === picked}
            onClick={() => setPicked(i)}
            className={`cursor-pointer rounded-md border-0 px-4 py-2.5 text-sm font-medium ${
              i === picked ? "bg-pill text-ink shadow-[0_2px_6px_-2px_rgba(21,27,38,0.18)]" : "bg-transparent text-sub hover:text-ink"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
      {/* Keyed so the copy replays its entrance when the audience changes. */}
      <div key={picked}>
        <h1 className="enter m-0 max-w-[780px] text-[clamp(42px,4.8vw,68px)] leading-[1.02] font-semibold tracking-[-0.04em] [--i:1]">
          {copy.title}
        </h1>
        <p className="enter mt-7 mb-0 max-w-[56ch] text-[19px] leading-[1.6] text-body [--i:2]">{copy.text}</p>
        <div className="enter mt-10 flex flex-wrap gap-3 [--i:3]">
          <Link href={copy.primary.href} className={`${buttonInk} ${sizeMd}`}>
            {copy.primary.label}
          </Link>
          <Link href={copy.secondary.href} className={`${buttonChip} ${sizeMd}`}>
            {copy.secondary.label}
          </Link>
        </div>
      </div>
    </div>
  );
}
