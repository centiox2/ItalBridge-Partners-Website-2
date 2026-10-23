"use client";

import { useLayoutEffect, useRef } from "react";

const duration = 1400;

// Counts the number inside a figure ("€117M", "+94,8%", "KSh 139.1B") up from
// zero when it scrolls into view, keeping its prefix, suffix, decimals and
// decimal separator. A figure already on screen when the page opens stays as
// it is: resetting a number the visitor can already read would make it jump.
// Screen readers get the final figure only.
export default function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const shown = useRef<HTMLSpanElement>(null);

  // Before paint, so a figure below the fold never shows its final value first.
  useLayoutEffect(() => {
    const match = /\d+(?:[.,]\d+)?/.exec(value);
    const el = ref.current;
    const text = shown.current;
    if (!match || !el || !text || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    const [whole, fraction = ""] = match[0].split(/[.,]/);
    const separator = match[0].includes(",") ? "," : ".";
    const target = Number(`${whole}.${fraction || 0}`);
    const before = value.slice(0, match.index);
    const after = value.slice(match.index + match[0].length);
    const format = (n: number) => before + n.toFixed(fraction.length).replace(".", separator) + after;

    // Written straight to the DOM each frame: a React render per frame for
    // every figure on the page is wasted work for a text change.
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        text.textContent = format(target * (1 - (1 - progress) ** 3));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    text.textContent = format(0);
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      text.textContent = value;
    };
  }, [value]);

  return (
    // The final figure, invisible, holds the width while the visible copy counts.
    <span ref={ref} className="inline-grid tabular-nums">
      <span aria-hidden className="invisible col-start-1 row-start-1">
        {value}
      </span>
      <span ref={shown} aria-hidden className="col-start-1 row-start-1">
        {value}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
