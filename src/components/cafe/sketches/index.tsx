/**
 * Tiny abstract polaroid sketches. Each is a small SVG keyed by SketchId.
 * They aren't literal — they're gestural. SPEC §4.4: "muted screenshot or sketch
 * of the project."
 *
 * All draw inside a 100x100 viewBox; the polaroid frame scales them.
 */

import type { SketchId } from "@/lib/types";

const STROKE = "var(--color-ink)";

interface SketchProps {
  className?: string;
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className="h-full w-full"
      style={{ color: "var(--color-ink)" }}
      aria-hidden
    >
      {children}
    </svg>
  );
}

function PaperHighlight() {
  return (
    <Frame>
      <rect
        x="20"
        y="14"
        width="60"
        height="76"
        rx="2"
        stroke={STROKE}
        strokeWidth="1.4"
        fill="none"
      />
      {[24, 30, 36, 48, 54, 60, 72, 78, 84].map((y, i) => (
        <line
          key={i}
          x1="26"
          y1={y}
          x2={i === 4 ? 62 : 74}
          y2={y}
          stroke={STROKE}
          strokeWidth="1"
          strokeLinecap="round"
        />
      ))}
      <rect x="25" y="42" width="50" height="6" fill="var(--color-terracotta)" opacity="0.45" />
    </Frame>
  );
}

function NeuralNet() {
  return (
    <Frame>
      {[28, 50, 72].map((y) =>
        [22, 50, 78].map((x) => (
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r="3"
            stroke={STROKE}
            strokeWidth="1.2"
            fill="var(--color-cream)"
          />
        )),
      )}
      {[22, 50, 78].map((x1) =>
        [22, 50, 78].map((x2) => (
          <line
            key={`${x1}-${x2}-1`}
            x1={x1}
            y1="28"
            x2={x2}
            y2="50"
            stroke={STROKE}
            strokeWidth="0.6"
            opacity="0.5"
          />
        )),
      )}
      {[22, 50, 78].map((x1) =>
        [22, 50, 78].map((x2) => (
          <line
            key={`${x1}-${x2}-2`}
            x1={x1}
            y1="50"
            x2={x2}
            y2="72"
            stroke={STROKE}
            strokeWidth="0.6"
            opacity="0.5"
          />
        )),
      )}
    </Frame>
  );
}

function OfficeHours() {
  return (
    <Frame>
      <line x1="10" y1="78" x2="90" y2="78" stroke={STROKE} strokeWidth="1.2" />
      <circle cx="30" cy="44" r="6" stroke={STROKE} strokeWidth="1.4" fill="none" />
      <path
        d="M 22 76 C 22 60, 38 60, 38 76"
        stroke={STROKE}
        strokeWidth="1.4"
        fill="none"
      />
      <circle cx="62" cy="44" r="6" stroke={STROKE} strokeWidth="1.4" fill="none" />
      <path
        d="M 54 76 C 54 60, 70 60, 70 76"
        stroke={STROKE}
        strokeWidth="1.4"
        fill="none"
      />
      <path
        d="M 38 50 Q 50 38, 62 50"
        stroke="var(--color-terracotta)"
        strokeWidth="1.4"
        fill="none"
        strokeDasharray="2 3"
      />
      <text x="50" y="20" textAnchor="middle" fontSize="9" fontFamily="serif" fill={STROKE}>
        ?
      </text>
    </Frame>
  );
}

function DemoFlyer() {
  return (
    <Frame>
      <rect
        x="18"
        y="14"
        width="64"
        height="72"
        stroke={STROKE}
        strokeWidth="1.4"
        fill="none"
      />
      <text x="50" y="34" textAnchor="middle" fontSize="11" fontFamily="serif" fill={STROKE}>
        DEMO
      </text>
      <line x1="26" y1="48" x2="74" y2="48" stroke={STROKE} strokeWidth="0.6" />
      <line x1="26" y1="56" x2="74" y2="56" stroke={STROKE} strokeWidth="0.6" />
      <line x1="26" y1="64" x2="60" y2="64" stroke={STROKE} strokeWidth="0.6" />
      <rect x="34" y="74" width="32" height="8" fill="var(--color-terracotta)" opacity="0.6" />
    </Frame>
  );
}

function Argument() {
  return (
    <Frame>
      <path
        d="M 16 70 C 22 50, 32 42, 44 48 C 56 54, 64 50, 70 38"
        stroke={STROKE}
        strokeWidth="1.4"
        fill="none"
      />
      <path
        d="M 70 38 L 76 30 M 70 38 L 78 42"
        stroke={STROKE}
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
      />
      <text x="20" y="84" fontSize="8" fontFamily="serif" fill={STROKE} fontStyle="italic">
        if A then B
      </text>
    </Frame>
  );
}

function GreekMargin() {
  return (
    <Frame>
      <line x1="36" y1="16" x2="36" y2="84" stroke={STROKE} strokeWidth="0.6" />
      <text x="44" y="26" fontSize="9" fontFamily="serif" fill={STROKE}>
        ἀρχή
      </text>
      <text x="44" y="38" fontSize="9" fontFamily="serif" fill={STROKE}>
        λόγος
      </text>
      <text x="44" y="50" fontSize="9" fontFamily="serif" fill={STROKE}>
        νοῦς
      </text>
      <text x="44" y="62" fontSize="9" fontFamily="serif" fill={STROKE}>
        ψυχή
      </text>
      <text x="14" y="50" fontSize="6" fontFamily="serif" fill="var(--color-terracotta)" fontStyle="italic">
        annot.
      </text>
    </Frame>
  );
}

function BrainCluster() {
  return (
    <Frame>
      <path
        d="M 30 44 C 22 36, 22 28, 32 24 C 42 18, 56 18, 64 24 C 74 28, 76 38, 70 46 C 76 54, 70 64, 62 66 C 56 76, 40 76, 32 68 C 22 66, 20 54, 30 44 Z"
        stroke={STROKE}
        strokeWidth="1.4"
        fill="none"
      />
      <line x1="48" y1="24" x2="48" y2="68" stroke={STROKE} strokeWidth="0.6" opacity="0.5" />
      {[
        [34, 38],
        [44, 46],
        [56, 38],
        [40, 56],
        [60, 56],
      ].map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="2"
          fill="var(--color-terracotta)"
          opacity="0.7"
        />
      ))}
    </Frame>
  );
}

function StudioTool() {
  return (
    <Frame>
      <rect
        x="18"
        y="22"
        width="64"
        height="46"
        stroke={STROKE}
        strokeWidth="1.4"
        fill="none"
      />
      <line x1="36" y1="22" x2="36" y2="68" stroke={STROKE} strokeWidth="0.6" />
      <line x1="18" y1="34" x2="36" y2="34" stroke={STROKE} strokeWidth="0.6" />
      <rect
        x="42"
        y="28"
        width="14"
        height="14"
        fill="var(--color-terracotta)"
        opacity="0.5"
      />
      <rect
        x="60"
        y="28"
        width="14"
        height="22"
        stroke={STROKE}
        strokeWidth="0.8"
        fill="none"
      />
      <rect
        x="42"
        y="48"
        width="32"
        height="14"
        stroke={STROKE}
        strokeWidth="0.8"
        fill="none"
      />
    </Frame>
  );
}

function ProteinHelix() {
  return (
    <Frame>
      {[0, 1, 2, 3, 4].map((i) => {
        const y = 18 + i * 14;
        return (
          <g key={i}>
            <path
              d={`M 26 ${y} Q 50 ${y - 6}, 74 ${y}`}
              stroke={STROKE}
              strokeWidth="1.2"
              fill="none"
            />
            <path
              d={`M 26 ${y} Q 50 ${y + 6}, 74 ${y}`}
              stroke={STROKE}
              strokeWidth="1.2"
              fill="none"
              opacity="0.5"
            />
            <circle cx="26" cy={y} r="2" fill={STROKE} />
            <circle cx="74" cy={y} r="2" fill="var(--color-terracotta)" />
          </g>
        );
      })}
    </Frame>
  );
}

function ContractClause() {
  return (
    <Frame>
      <rect x="14" y="14" width="34" height="72" stroke={STROKE} strokeWidth="1.2" fill="none" />
      <rect x="52" y="14" width="34" height="72" stroke={STROKE} strokeWidth="1.2" fill="none" />
      {[22, 28, 34, 40, 46, 52, 58, 64, 70, 76].map((y, i) => (
        <g key={i}>
          <line x1="18" y1={y} x2="44" y2={y} stroke={STROKE} strokeWidth="0.5" />
          <line x1="56" y1={y} x2="82" y2={y} stroke={STROKE} strokeWidth="0.5" />
        </g>
      ))}
      <rect x="18" y="38" width="26" height="6" fill="var(--color-terracotta)" opacity="0.45" />
      <rect x="56" y="50" width="26" height="6" fill="var(--color-terracotta)" opacity="0.45" />
    </Frame>
  );
}

function FreshmanLaptop() {
  return (
    <Frame>
      <path
        d="M 18 60 L 82 60 L 78 30 L 22 30 Z"
        stroke={STROKE}
        strokeWidth="1.4"
        fill="var(--color-cream)"
      />
      <path d="M 14 64 L 86 64 L 82 70 L 18 70 Z" stroke={STROKE} strokeWidth="1.4" fill="none" />
      {[36, 42, 48, 54].map((y, i) => (
        <line
          key={i}
          x1="28"
          y1={y}
          x2={i === 1 ? 62 : 70}
          y2={y}
          stroke={STROKE}
          strokeWidth="0.6"
        />
      ))}
      <text x="78" y="22" fontSize="9" fontFamily="cursive" fill="var(--color-terracotta)">
        ✦
      </text>
    </Frame>
  );
}

function TabStream() {
  return (
    <Frame>
      {[
        [16, 22],
        [22, 32],
        [16, 42],
        [28, 52],
        [16, 62],
        [22, 72],
      ].map(([x, y], i) => (
        <g key={i}>
          <line x1={x} y1={y} x2={x + 50} y2={y} stroke={STROKE} strokeWidth="0.8" />
          <text x={x + 54} y={y + 3} fontSize="6" fontFamily="monospace" fill="var(--color-terracotta)">
            ▸ tab
          </text>
        </g>
      ))}
    </Frame>
  );
}

function Satellite() {
  return (
    <Frame>
      <circle cx="50" cy="56" r="22" stroke={STROKE} strokeWidth="1.4" fill="none" />
      <ellipse
        cx="50"
        cy="56"
        rx="22"
        ry="6"
        stroke={STROKE}
        strokeWidth="0.8"
        fill="none"
        opacity="0.6"
      />
      <circle cx="50" cy="22" r="3" fill="var(--color-terracotta)" />
      <line
        x1="50"
        y1="22"
        x2="50"
        y2="56"
        stroke={STROKE}
        strokeWidth="0.6"
        strokeDasharray="2 2"
      />
      <path
        d="M 38 56 Q 50 48, 62 56"
        stroke={STROKE}
        strokeWidth="0.8"
        fill="none"
      />
    </Frame>
  );
}

function Translator() {
  return (
    <Frame>
      <text
        x="26"
        y="44"
        fontSize="14"
        fontFamily="serif"
        fill={STROKE}
        textAnchor="middle"
      >
        EN
      </text>
      <path
        d="M 38 42 L 60 42 M 56 38 L 62 42 L 56 46"
        stroke="var(--color-terracotta)"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="76"
        y="44"
        fontSize="14"
        fontFamily="serif"
        fill={STROKE}
        textAnchor="middle"
      >
        हि
      </text>
      <line x1="20" y1="60" x2="80" y2="60" stroke={STROKE} strokeWidth="0.4" />
      <text
        x="50"
        y="76"
        fontSize="7"
        fontFamily="serif"
        fill={STROKE}
        fontStyle="italic"
        textAnchor="middle"
      >
        for अम्मा
      </text>
    </Frame>
  );
}

const SKETCHES: Record<SketchId, () => React.ReactNode> = {
  "paper-highlight": PaperHighlight,
  "neural-net": NeuralNet,
  "office-hours": OfficeHours,
  "demo-flyer": DemoFlyer,
  argument: Argument,
  "greek-margin": GreekMargin,
  "brain-cluster": BrainCluster,
  "studio-tool": StudioTool,
  "protein-helix": ProteinHelix,
  "contract-clause": ContractClause,
  "freshman-laptop": FreshmanLaptop,
  "tab-stream": TabStream,
  satellite: Satellite,
  translator: Translator,
};

export function Sketch({ id, className }: { id: SketchId } & SketchProps) {
  const C = SKETCHES[id];
  if (!C) return null;
  return <div className={className}>{C()}</div>;
}
