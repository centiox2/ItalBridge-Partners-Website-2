"use client";

import { useState } from "react";
import { h2, stagger } from "../ui";

// Buyers page: tick off what you already know; a meter shows how ready the requirement is.
export default function RequirementChecklist({
  title,
  text,
  of,
  verdicts,
  items,
}: {
  title: string;
  text: string;
  of: string;
  // For none ticked, a few, and most.
  verdicts: string[];
  items: { title: string; hint: string }[];
}) {
  const [ticked, setTicked] = useState<boolean[]>(() => items.map(() => false));
  const done = ticked.filter(Boolean).length;
  const verdict = verdicts[done === 0 ? 0 : done < 4 ? 1 : 2];

  return (
    <>
      <div className="reveal flex-[1_1_min(340px,100%)]">
        <h2 className={`${h2} mb-4`}>{title}</h2>
        <p className="m-0 mb-6 max-w-[40ch] leading-relaxed text-body">{text}</p>
        <div aria-live="polite" className="rounded-[10px] bg-paper p-6">
          <div className="text-[40px] font-semibold tracking-[-0.03em]">
            <span key={done} className="pop inline-block">{done}</span> {of} {items.length}
          </div>
          <p className="mt-1.5 mb-3.5 text-body">{verdict}</p>
          <div aria-hidden className="h-2 overflow-hidden rounded-full bg-track">
            <div className="meter h-full rounded-full bg-ink" style={{ width: `${(done / items.length) * 100}%` }} />
          </div>
        </div>
      </div>
      <ul className="m-0 grid flex-[1.6_1_min(560px,100%)] list-none grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-3 p-0">
        {items.map((item, i) => {
          const on = ticked[i];
          return (
            <li key={item.title} className="reveal" style={stagger(i)}>
              <button
                type="button"
                aria-pressed={on}
                onClick={() => setTicked((t) => t.map((v, k) => (k === i ? !v : v)))}
                className={`flex h-full w-full cursor-pointer items-start gap-3.5 rounded-[10px] border-2 p-5 text-left transition-colors ${
                  on ? "border-ink bg-night text-white" : "border-line bg-card text-ink hover:border-ink"
                }`}
              >
                <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden fill="none" className={`shrink-0 ${on ? "pop" : ""}`}>
                  {on ? (
                    <>
                      <rect x="1" y="1" width="20" height="20" rx="5" className="fill-cream" />
                      <path d="M6 11.5l3.5 3.5L16 8" className="stroke-night" strokeWidth="2" />
                    </>
                  ) : (
                    <rect x="1.5" y="1.5" width="19" height="19" rx="5" className="stroke-steel" strokeWidth="1.5" />
                  )}
                </svg>
                <span>
                  <strong className="block font-medium">{item.title}</strong>
                  <span className={`mt-1 block text-[15px] ${on ? "text-mist" : "text-sub"}`}>{item.hint}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
