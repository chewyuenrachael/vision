/**
 * Tiny identity anchor — bottom-right of each scene (per polish spec).
 */
export function SceneTag({ variant = "light" }: { variant?: "light" | "dark" }) {
  const cls =
    variant === "dark"
      ? "pointer-events-none absolute bottom-3 right-4 z-10 font-display text-xs font-normal italic leading-none text-cream opacity-30"
      : "pointer-events-none absolute bottom-3 right-4 z-10 font-display text-xs font-normal italic leading-none text-ink opacity-30";
  return <p className={cls}>Cursor on Campus</p>;
}
