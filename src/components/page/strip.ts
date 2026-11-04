// Picker lists become a sideways-scrolling row on phones (StageTabs,
// IndustryPicker). Brings the selected item fully into that row; does
// nothing where the list is not scrolling sideways, and never scrolls the page.
export function showInStrip(strip: HTMLElement | null, index: number) {
  const item = strip?.children[index];
  if (!strip || !item || strip.scrollWidth <= strip.clientWidth) return;
  const box = strip.getBoundingClientRect();
  const at = item.getBoundingClientRect();
  const pad = parseFloat(getComputedStyle(strip).scrollPaddingLeft) || 0;
  let left = 0;
  if (at.left < box.left + pad) left = at.left - box.left - pad;
  else if (at.right > box.right - pad) left = at.right - box.right + pad;
  if (!left) return;
  const smooth = !matchMedia("(prefers-reduced-motion: reduce)").matches;
  strip.scrollBy({ left, behavior: smooth ? "smooth" : "instant" });
}
