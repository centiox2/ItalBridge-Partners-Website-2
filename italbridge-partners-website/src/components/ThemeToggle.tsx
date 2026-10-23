"use client";

import { useSyncExternalStore } from "react";
import { themeKey } from "@/theme";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

const isDark = () => document.documentElement.dataset.theme === "dark";

// Header button that switches between light and dark mode. The choice is kept
// for later visits; until then the site follows the device setting.
export default function ThemeToggle({ toDark, toLight }: { toDark: string; toLight: string }) {
  const dark = useSyncExternalStore(subscribe, isDark, () => false);

  function toggle() {
    const next = dark ? "light" : "dark";
    try {
      localStorage.setItem(themeKey, next);
    } catch {}
    const apply = () => {
      const root = document.documentElement;
      // Switch with colour transitions off (globals.css), so the crossfade
      // captures the finished colours; reading layout applies them now.
      root.dataset.themeSwitch = "";
      root.dataset.theme = next;
      void root.offsetWidth;
      delete root.dataset.themeSwitch;
    };
    // Crossfade the whole page where the browser supports it (none with reduced motion, see globals.css).
    if (document.startViewTransition) document.startViewTransition(apply);
    else apply();
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dark}
      aria-label={dark ? toLight : toDark}
      title={dark ? toLight : toDark}
      className="btn inline-flex size-10 cursor-pointer min-[380px]:size-11 items-center justify-center rounded-md border border-line bg-transparent text-ink hover:bg-chip"
    >
      {/* Moon in light mode, sun in dark mode: the icon shows where the button takes you. */}
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {dark ? (
          <>
            <circle cx="12" cy="12" r="4.2" />
            <path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6" />
          </>
        ) : (
          <path d="M20.3 14.6A8.5 8.5 0 0 1 9.4 3.7a8.5 8.5 0 1 0 10.9 10.9Z" />
        )}
      </svg>
    </button>
  );
}
