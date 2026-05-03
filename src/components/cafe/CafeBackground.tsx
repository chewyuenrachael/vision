/**
 * Hand-coded cafe interior. SPEC §4.1.
 * Single SVG, ink strokes only. Counter back-right, window left, corkboard
 * frame on back wall (rendered separately by <Corkboard /> at the same coords
 * so polaroids can sit inside).
 *
 * viewBox is 0..1000 wide × 0..700 tall. Silhouettes share this space.
 */

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export function CafeBackground({ className = "", children }: Props) {
  return (
    <svg
      viewBox="0 0 1000 700"
      className={`absolute inset-0 h-full w-full ${className}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <pattern id="floor-grid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path
            d="M 0 0 L 48 0 M 0 0 L 0 48"
            stroke="var(--color-ink)"
            strokeWidth="0.4"
            opacity="0.18"
          />
        </pattern>
      </defs>

      {/* Back wall */}
      <rect x="0" y="0" width="1000" height="240" fill="var(--color-paper)" opacity="0.45" />
      {/* Floor */}
      <rect x="0" y="240" width="1000" height="460" fill="url(#floor-grid)" opacity="0.6" />
      <line x1="0" y1="240" x2="1000" y2="240" stroke="var(--color-ink)" strokeWidth="1.2" />

      {/* Window left */}
      <g stroke="var(--color-ink)" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x="40" y="60" width="220" height="160" strokeWidth="1.6" />
        <line x1="150" y1="60" x2="150" y2="220" strokeWidth="1.2" />
        <line x1="40" y1="140" x2="260" y2="140" strokeWidth="1.2" />
        {/* light hatching */}
        {Array.from({ length: 9 }).map((_, i) => (
          <line
            key={i}
            x1={56 + i * 22}
            y1="64"
            x2={36 + i * 22}
            y2="84"
            strokeWidth="0.6"
            opacity="0.45"
          />
        ))}
      </g>

      {/* Counter back-right */}
      <g stroke="var(--color-ink)" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M 600 240 L 620 200 L 940 200 L 960 240 Z"
          strokeWidth="1.6"
          fill="var(--color-cream-warm)"
          opacity="0.55"
        />
        <rect x="620" y="200" width="320" height="14" strokeWidth="1.2" />
        {/* Espresso machine */}
        <rect x="700" y="160" width="80" height="40" strokeWidth="1.4" fill="var(--color-cream)" />
        <circle cx="720" cy="180" r="4" strokeWidth="1.2" />
        <circle cx="760" cy="180" r="4" strokeWidth="1.2" />
        {/* Pendant lamps */}
        <line x1="660" y1="0" x2="660" y2="80" strokeWidth="0.8" />
        <line x1="820" y1="0" x2="820" y2="60" strokeWidth="0.8" />
        <line x1="900" y1="0" x2="900" y2="100" strokeWidth="0.8" />
        <path d="M 650 80 L 670 80 L 666 96 L 654 96 Z" strokeWidth="1.2" fill="var(--color-cream)" />
        <path d="M 810 60 L 830 60 L 826 76 L 814 76 Z" strokeWidth="1.2" fill="var(--color-cream)" />
        <path d="M 890 100 L 910 100 L 906 116 L 894 116 Z" strokeWidth="1.2" fill="var(--color-cream)" />
        {/* Menu board */}
        <rect x="610" y="100" width="80" height="60" strokeWidth="1.2" fill="var(--color-paper)" opacity="0.7" />
        {[112, 122, 132, 142, 150].map((y, i) => (
          <line key={i} x1="616" y1={y} x2={i === 1 ? 668 : 682} y2={y} strokeWidth="0.6" opacity="0.6" />
        ))}
      </g>

      {/* Tables (flat ovals on floor) */}
      <g stroke="var(--color-ink)" fill="var(--color-cream)" strokeLinecap="round">
        {[
          [180, 380, 70, 22],
          [320, 360, 70, 22],
          [460, 380, 70, 22],
          [620, 380, 70, 22],
          [780, 380, 70, 22],
          [180, 520, 80, 26],
          [340, 540, 80, 26],
          [520, 540, 80, 26],
          [700, 540, 80, 26],
          [860, 540, 80, 26],
        ].map(([cx, cy, rx, ry], i) => (
          <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} strokeWidth="1.2" />
        ))}
      </g>

      {/* Corkboard frame on back wall — children rendered inside its bbox */}
      <g>
        <rect
          x="280"
          y="40"
          width="300"
          height="160"
          rx="2"
          fill="var(--color-paper)"
          stroke="var(--color-ink)"
          strokeWidth="1.6"
        />
        <rect
          x="280"
          y="40"
          width="300"
          height="160"
          fill="none"
          stroke="var(--color-terracotta)"
          strokeWidth="0.6"
          opacity="0.4"
        />
        {/* Corkboard texture dots */}
        {Array.from({ length: 30 }).map((_, i) => {
          const x = 286 + (i * 47) % 290;
          const y = 48 + Math.floor((i * 47) / 290) * 24 + (i % 3) * 4;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="0.6"
              fill="var(--color-ink)"
              opacity="0.25"
            />
          );
        })}
      </g>

      {/* Floorboards */}
      <g stroke="var(--color-ink)" strokeWidth="0.4" opacity="0.25">
        {[300, 360, 420, 480, 540, 600, 660].map((y) => (
          <line key={y} x1="0" y1={y} x2="1000" y2={y} />
        ))}
      </g>

      {children}
    </svg>
  );
}
