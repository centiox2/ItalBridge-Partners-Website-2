"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { buttonInk, sizeMd, stagger } from "../ui";

type Industry = {
  name: string;
  body: string;
  items: string[];
  cats: string;
  image: StaticImageData;
};

// Industries page: a card per industry; the selected one is shown in detail.
// Links like /industries?industry=3 open at the top of the page with that
// industry selected.
export default function IndustryPicker({
  label,
  equipment,
  categories,
  discuss,
  deliver,
  industries,
}: {
  label: string;
  equipment: string;
  categories: string;
  discuss: { href: string; label: string };
  deliver: { href: string; label: string };
  industries: Industry[];
}) {
  const [picked, setPicked] = useState(0);
  const cur = industries[picked];

  useEffect(() => {
    const index = Number(new URLSearchParams(window.location.search).get("industry")) - 1;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the query is read after hydration so the page can stay static
    if (index >= 0 && index < industries.length) setPicked(index);
  }, [industries.length]);

  return (
    <>
      <ul aria-label={label} className="m-0 mb-10 grid list-none grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-3 p-0">
        {industries.map((ind, i) => {
          const active = i === picked;
          return (
            <li key={ind.name}>
              <button
                type="button"
                aria-pressed={active}
                aria-controls="industry-detail"
                onClick={() => setPicked(i)}
                className={`group w-full cursor-pointer overflow-hidden rounded-[10px] border-2 p-0 text-left transition-colors ${
                  active ? "border-ink bg-night text-white" : "border-line bg-card text-ink hover:border-ink"
                }`}
              >
                <span className="block overflow-hidden">
                  <Image
                    src={ind.image}
                    alt=""
                    // The first card is the largest element on a phone's first screen.
                    preload={i === 0}
                    fetchPriority={i === 0 ? "high" : undefined}
                    placeholder="blur"
                    sizes="(min-width: 1200px) 220px, (min-width: 640px) 33vw, 100vw"
                    className="zoom block aspect-[16/10] w-full object-cover"
                  />
                </span>
                <span className="block px-4 py-3.5 font-medium">{ind.name}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <div
        id="industry-detail"
        key={picked}
        aria-live="polite"
        className="flex flex-wrap gap-12 rounded-xl bg-paper p-6 sm:p-12"
      >
        <div className="fade flex-[1_1_min(380px,100%)]">
          <h2 className="m-0 mb-3.5 text-[34px] leading-tight font-semibold tracking-[-0.03em]">{cur.name}</h2>
          <p className="m-0 mb-6 max-w-[50ch] text-[17px] leading-[1.65] text-body">{cur.body}</p>
          <div className="flex flex-wrap gap-3">
            <Link href={discuss.href} className={`${buttonInk} ${sizeMd}`}>
              {discuss.label}
            </Link>
            <Link href={deliver.href} className={`btn inline-flex min-h-11 items-center rounded-md bg-card text-ink ${sizeMd}`}>
              {deliver.label}
            </Link>
          </div>
        </div>
        <div className="fade flex-[1_1_min(380px,100%)]" style={stagger(2)}>
          <h3 className="m-0 mb-3.5 text-base font-semibold">{equipment}</h3>
          <ul className="m-0 mb-7 list-none border-t border-ink p-0">
            {cur.items.map((item, i) => (
              <li key={item} className="fade border-b border-line-strong py-3.5" style={stagger(i + 3)}>
                {item}
              </li>
            ))}
          </ul>
          <h3 className="m-0 mb-2.5 text-base font-semibold">{categories}</h3>
          <p className="m-0 text-body">{cur.cats}</p>
        </div>
      </div>
    </>
  );
}
