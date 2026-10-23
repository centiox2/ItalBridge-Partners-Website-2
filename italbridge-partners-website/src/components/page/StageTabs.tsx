"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";
import { Arrow, Check } from "./icons";
import { stagger } from "../ui";

type Stage = {
  name: string;
  body: string;
  we: string[];
  you: string[];
  image: StaticImageData;
  alt: string;
};

// Services page: list of the six stages; the selected one is shown in detail.
export default function StageTabs({
  label,
  stageLabel,
  weDo,
  youGet,
  stages,
}: {
  label: string;
  stageLabel: string;
  weDo: string;
  youGet: string;
  stages: Stage[];
}) {
  const [picked, setPicked] = useState(0);
  const cur = stages[picked];
  const list = "m-0 flex list-none flex-col gap-2.5 p-0 text-body";

  return (
    <>
      <ol aria-label={label} className="m-0 flex flex-[1_1_min(340px,100%)] list-none flex-col gap-1 p-0">
        {stages.map((s, i) => {
          const active = i === picked;
          return (
            <li key={s.name}>
              <button
                type="button"
                aria-pressed={active}
                aria-controls="stage-detail"
                onClick={() => setPicked(i)}
                className={`flex w-full cursor-pointer items-baseline gap-4 rounded-lg border-0 px-5 py-4.5 text-left transition-colors ${
                  active ? "bg-btn text-btn-fg" : "bg-transparent text-ink hover:bg-chip-hover"
                }`}
              >
                <span className={`min-w-[54px] text-sm ${active ? "text-btn-fg/70" : "text-faint"}`}>
                  {stageLabel} {i + 1}
                </span>
                <span className={`text-lg ${active ? "font-medium" : ""}`}>{s.name}</span>
              </button>
            </li>
          );
        })}
      </ol>
      <div
        id="stage-detail"
        key={picked}
        aria-live="polite"
        className="min-w-0 flex-[1.8_1_min(560px,100%)] overflow-hidden rounded-xl bg-card"
      >
        {/* Keyed panel: on each switch the photo eases in and the text follows in sequence. */}
        <div className="overflow-hidden">
          <Image
            src={cur.image}
            alt={cur.alt}
            placeholder="blur"
            sizes="(min-width: 1400px) 875px, (min-width: 1100px) 62vw, 100vw"
            className="zoom-out block aspect-[16/7] w-full object-cover"
          />
        </div>
        <div className="p-6 sm:p-10">
          <p className="fade m-0 mb-2 font-medium text-sub">
            {stageLabel} {picked + 1}
          </p>
          <h2 className="fade m-0 mb-3.5 text-[32px] leading-tight font-semibold tracking-[-0.03em]" style={stagger(1)}>
            {cur.name}
          </h2>
          <p className="fade m-0 mb-7 max-w-[60ch] text-[17px] leading-[1.65] text-body" style={stagger(2)}>
            {cur.body}
          </p>
          <div className="fade flex flex-wrap gap-8" style={stagger(3)}>
            <div className="flex-[1_1_240px]">
              <h3 className="m-0 mb-3 text-base font-semibold">{weDo}</h3>
              <ul className={list}>
                {cur.we.map((t) => (
                  <li key={t} className="flex gap-2.5">
                    <Check size={18} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-[1_1_240px]">
              <h3 className="m-0 mb-3 text-base font-semibold">{youGet}</h3>
              <ul className={list}>
                {cur.you.map((t) => (
                  <li key={t} className="flex gap-2.5">
                    <Arrow />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
