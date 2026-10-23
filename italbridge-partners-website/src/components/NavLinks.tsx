"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Main navigation; marks the link for the current page.
export default function NavLinks({
  label,
  links,
}: {
  label: string;
  links: { href: string; label: string }[];
}) {
  const pathname = usePathname();

  // Wide screens only; MobileMenu takes over below the "nav" breakpoint.
  return (
    <nav aria-label={label} className="hidden gap-x-7 text-[15px] font-medium nav:flex">
      {links.map((link) => {
        const current = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={current ? "page" : undefined}
            // Underline grows from the left on hover; it stays drawn on the current page.
            className={`relative py-1.5 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:transition-transform after:duration-300 after:ease-[var(--ease-out)] motion-reduce:after:transition-none ${
              current ? "after:bg-ink" : "after:scale-x-0 after:bg-steel hover:after:scale-x-100"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
