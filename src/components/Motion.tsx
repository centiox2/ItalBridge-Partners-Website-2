"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";

const selector = ".reveal, .draw, .reveal-img, .grow-bar";

// Arms the scroll-in animations in globals.css by marking elements with
// data-in, an attribute React never renders: a class would clash with the
// className React hydrates, wherever part of the page hydrates after this runs.
// Elements already on screen are
// marked as shown before arming, so only content below the fold starts hidden;
// the rest animates in as it enters the viewport. Runs again after each page
// change, for the new page's content, and fades that page in.
export default function Motion() {
  const pathname = usePathname();
  const firstPage = useRef(true);

  useLayoutEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Stagger only what enters together, in reading order: a card that
        // scrolls in on its own (one column on a phone) shows at once.
        const shown = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left);
        shown.forEach((entry, i) => {
          const el = entry.target as HTMLElement;
          el.style.setProperty("--in", String(Math.min(i, 6)));
          el.setAttribute("data-in", "");
          observer.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    const arm = () => {
      const fold = window.innerHeight * 0.92;
      for (const el of document.querySelectorAll<HTMLElement>(selector)) {
        if (el.hasAttribute("data-in")) continue;
        if (el.getBoundingClientRect().top < fold) el.setAttribute("data-in", "");
        else observer.observe(el);
      }
      document.documentElement.dataset.motion = "";
    };

    // First load: wait until the browser is idle, by which time React has
    // hydrated every part of the page; marking server-rendered elements
    // earlier makes React report a hydration mismatch. Nothing on screen
    // changes meanwhile: the page is complete as the server sent it.
    if (firstPage.current) {
      firstPage.current = false;
      const idle = window.requestIdleCallback ?? ((run: () => void) => window.setTimeout(run, 200));
      const cancel = window.cancelIdleCallback ?? window.clearTimeout;
      const id = idle(arm, { timeout: 500 });
      return () => {
        cancel(id);
        observer.disconnect();
      };
    }

    // Page change: React rendered the new page itself, so arm at once, before
    // paint, and fade the page in. A Web Animation on <main> rather than
    // React's <ViewTransition>: that one made every update on the page (each
    // frame of a counting figure, say) restyle the whole document.
    arm();
    document.querySelector("main")?.animate(
      [
        { opacity: 0, transform: "translateY(14px)" },
        { opacity: 1, transform: "none" },
      ],
      { duration: 320, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
    );
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
