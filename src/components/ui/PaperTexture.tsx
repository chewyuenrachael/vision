/**
 * Subtle paper grain. SPEC §10.3.
 * Server-renderable inline SVG; no extra requests.
 */
export function PaperTexture({
  opacity = 0.06,
  className = "",
}: {
  opacity?: number;
  className?: string;
}) {
  return (
    <svg
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ mixBlendMode: "multiply", opacity }}
    >
      <filter id="paper-grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.85"
          numOctaves="2"
          stitchTiles="stitch"
        />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.10
                  0 0 0 0 0.10
                  0 0 0 0 0.10
                  0 0 0 0.85 0"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#paper-grain)" />
    </svg>
  );
}
