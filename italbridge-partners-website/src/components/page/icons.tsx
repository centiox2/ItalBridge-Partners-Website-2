// Tick before a list item; `className` sets the stroke colour.
export function Check({ className = "stroke-ink", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      aria-hidden
      fill="none"
      strokeWidth={2}
      className={`mt-0.5 shrink-0 ${className}`}
    >
      <path d="M4 10.5l4 4 8-9" />
    </svg>
  );
}

export function Arrow({ className = "stroke-steel" }: { className?: string }) {
  return (
    <svg width={18} height={18} viewBox="0 0 20 20" aria-hidden fill="none" strokeWidth={2} className={`mt-[3px] shrink-0 ${className}`}>
      <path d="M5 10h10M11 6l4 4-4 4" />
    </svg>
  );
}

// List with a tick before each item.
export function CheckList({
  items,
  className = "",
  iconClass,
}: {
  items: string[];
  className?: string;
  iconClass?: string;
}) {
  return (
    <ul className={`m-0 flex list-none flex-col gap-3 p-0 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <Check className={iconClass} />
          {item}
        </li>
      ))}
    </ul>
  );
}

// Link text ending in "→": the arrow nudges forward on hover.
export function ArrowLabel({ text }: { text: string }) {
  const label = text.replace(/\s*→$/, "");
  if (label === text) return text;
  return (
    <>
      {label}{" "}
      <span aria-hidden className="nudge inline-block">
        →
      </span>
    </>
  );
}
