"use client";

import { motion } from "framer-motion";
import type { Phase } from "@/lib/types";

/**
 * Sam — three-quarter view, head + shoulders + sweater + mug. SPEC §6.4: his
 * face stays constant. The world around him compounds.
 *
 * "World around him" lives in two places: the artifacts panel beside him AND
 * the background visible behind him in this very portrait. Per phase we fade
 * in a different setting: coffee-shop window → office door → apartment
 * whiteboard → poster + framed Cohort 1 photo. Sam himself never moves.
 */

const STROKE = "var(--color-ink)";

interface SamPanelProps {
  phase: Phase;
}

export function SamPanel({ phase }: SamPanelProps) {
  return (
    <svg
      viewBox="0 0 240 280"
      className="h-full w-full"
      aria-hidden
    >
      {/* Background plate (blank desk wall) */}
      <rect x="0" y="0" width="240" height="280" fill="var(--color-paper)" opacity="0.4" />

      {/* Soft light from camera-left */}
      <ellipse cx="60" cy="80" rx="80" ry="60" fill="var(--color-cream)" opacity="0.55" />

      {/* Phase-keyed backgrounds. Each fades in/out; Sam stays put. */}
      <BgCoffeeShop active={phase === "now"} />
      <BgCampusOffice active={phase === "q1"} />
      <BgWhiteboard active={phase === "q2"} />
      <BgYear1Wall active={phase === "year1" || phase === "future"} />

      <SamFigure showHat={phase !== "now"} />
    </svg>
  );
}

/**
 * Coffee shop in Pittsburgh, Sunday morning. A tall window pane behind him
 * with morning light coming through, a hint of a coffee bar to one side.
 */
function BgCoffeeShop({ active }: { active: boolean }) {
  return (
    <motion.g
      initial={false}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.45 }}
      style={{ pointerEvents: "none" }}
      stroke={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    >
      {/* Large window pane behind, upper right */}
      <rect
        x="138"
        y="14"
        width="92"
        height="110"
        strokeWidth="1.4"
        fill="var(--color-cream)"
        fillOpacity="0.6"
      />
      {/* Mullions */}
      <line x1="184" y1="14" x2="184" y2="124" strokeWidth="1" />
      <line x1="138" y1="68" x2="230" y2="68" strokeWidth="1" />
      {/* Morning light hatching */}
      {Array.from({ length: 7 }).map((_, i) => (
        <line
          key={i}
          x1={146 + i * 11}
          y1="20"
          x2={138 + i * 11}
          y2="32"
          strokeWidth="0.55"
          opacity="0.5"
        />
      ))}
      {/* Counter line, bottom-left, behind him */}
      <line x1="0" y1="96" x2="46" y2="96" strokeWidth="1.2" />
      <line x1="0" y1="100" x2="46" y2="100" strokeWidth="0.6" opacity="0.5" />
      {/* A jar/teapot silhouette on the counter */}
      <path d="M 14 92 L 14 80 L 30 80 L 30 92" strokeWidth="1.1" />
      <ellipse cx="22" cy="80" rx="8" ry="2" strokeWidth="1" fill="var(--color-cream)" />
      {/* Tiny chalkboard menu, top-left */}
      <rect
        x="6"
        y="22"
        width="42"
        height="32"
        rx="2"
        strokeWidth="1"
        fill="var(--color-ink)"
        fillOpacity="0.75"
      />
      {[30, 36, 42, 48].map((y) => (
        <line
          key={y}
          x1="10"
          y1={y}
          x2={y === 36 ? 36 : 42}
          y2={y}
          stroke="var(--color-cream)"
          strokeWidth="0.5"
          opacity="0.85"
        />
      ))}
    </motion.g>
  );
}

/**
 * +90: same desk, door open behind him to a campus office. Doorframe on the
 * right, hallway hint through it, a flyer on the wall.
 */
function BgCampusOffice({ active }: { active: boolean }) {
  return (
    <motion.g
      initial={false}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.45 }}
      style={{ pointerEvents: "none" }}
      stroke={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    >
      {/* Door frame, right side */}
      <line x1="172" y1="10" x2="172" y2="200" strokeWidth="1.4" />
      <line x1="230" y1="10" x2="230" y2="200" strokeWidth="1.4" />
      <line x1="172" y1="10" x2="230" y2="10" strokeWidth="1.4" />
      {/* Open door, hinged left */}
      <path
        d="M 172 200 L 178 12 L 196 14 L 188 200 Z"
        strokeWidth="1.1"
        fill="var(--color-cream-warm)"
        fillOpacity="0.55"
      />
      {/* Hallway through door — far wall and floor line */}
      <line x1="196" y1="40" x2="230" y2="32" strokeWidth="0.8" opacity="0.7" />
      <line x1="200" y1="200" x2="230" y2="190" strokeWidth="0.8" opacity="0.6" />
      {/* Flyer on the wall, left of Sam */}
      <rect
        x="14"
        y="22"
        width="44"
        height="56"
        strokeWidth="1.1"
        fill="var(--color-cream)"
        fillOpacity="0.85"
      />
      <text
        x="22"
        y="38"
        fontFamily="Inter, sans-serif"
        fontSize="6"
        fill="var(--color-ink)"
        opacity="0.85"
        stroke="none"
      >
        CAFE
      </text>
      <text
        x="22"
        y="46"
        fontFamily="Inter, sans-serif"
        fontSize="6"
        fontWeight="600"
        fill="var(--color-terracotta)"
        opacity="0.95"
        stroke="none"
      >
        CURSOR
      </text>
      {[54, 60, 66].map((y) => (
        <line
          key={y}
          x1="20"
          y1={y}
          x2={y === 60 ? 46 : 50}
          y2={y}
          strokeWidth="0.5"
          opacity="0.55"
        />
      ))}
      {/* Pin */}
      <circle cx="36" cy="22" r="1.6" fill="var(--color-pin)" stroke="none" />
      {/* A second small notice, lower-left */}
      <rect
        x="18"
        y="92"
        width="30"
        height="22"
        strokeWidth="0.9"
        fill="var(--color-cream)"
        fillOpacity="0.8"
      />
      {[100, 104, 108].map((y) => (
        <line key={y} x1="22" y1={y} x2="44" y2={y} strokeWidth="0.5" opacity="0.5" />
      ))}
    </motion.g>
  );
}

/**
 * +180: small whiteboard in his apartment, scribbled with a Cursor × ML week
 * run-of-show. Three Post-its visible.
 */
function BgWhiteboard({ active }: { active: boolean }) {
  return (
    <motion.g
      initial={false}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.45 }}
      style={{ pointerEvents: "none" }}
      stroke={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    >
      {/* Whiteboard frame — wide, behind Sam's head */}
      <rect
        x="14"
        y="10"
        width="212"
        height="92"
        rx="2"
        strokeWidth="1.6"
        fill="var(--color-cream)"
        fillOpacity="0.92"
      />
      {/* Inner edge */}
      <rect x="18" y="14" width="204" height="84" strokeWidth="0.5" opacity="0.4" />

      {/* Title — handwritten-ish */}
      <text
        x="26"
        y="28"
        fontFamily="var(--font-lora), Georgia, serif"
        fontSize="11"
        fill="var(--color-terracotta)"
        opacity="0.9"
        stroke="none"
      >
        Cursor × ML Week
      </text>
      {/* Underline */}
      <path
        d="M 26 32 Q 70 30, 110 33"
        strokeWidth="0.9"
        stroke="var(--color-terracotta)"
        opacity="0.7"
      />

      {/* Run-of-show grid — scribble style */}
      {[
        ["Mon", "kickoff", 42],
        ["Tue", "Dr. K lab", 52],
        ["Wed", "panel", 62],
        ["Thu", "demo", 72],
        ["Fri", "showcase", 82],
      ].map(([day, label, y]) => (
        <g key={day as string}>
          <text
            x="26"
            y={y as number}
            fontFamily="var(--font-lora), Georgia, serif"
            fontSize="8"
            fill="var(--color-ink)"
            opacity="0.85"
            stroke="none"
          >
            {day}
          </text>
          <line
            x1="50"
            y1={(y as number) - 2}
            x2="56"
            y2={(y as number) - 2}
            strokeWidth="0.6"
            opacity="0.6"
          />
          <text
            x="60"
            y={y as number}
            fontFamily="var(--font-lora), Georgia, serif"
            fontSize="8"
            fill="var(--color-ink)"
            opacity="0.7"
            stroke="none"
          >
            {label}
          </text>
        </g>
      ))}

      {/* Arrow + side annotation */}
      <path
        d="M 132 50 Q 156 48, 178 56"
        strokeWidth="0.9"
        stroke="var(--color-ink)"
        opacity="0.7"
      />
      <path
        d="M 174 52 L 180 56 L 174 60"
        strokeWidth="0.9"
        stroke="var(--color-ink)"
        opacity="0.7"
      />
      <text
        x="148"
        y="46"
        fontFamily="var(--font-lora), Georgia, serif"
        fontSize="7"
        fill="var(--color-ink)"
        opacity="0.7"
        stroke="none"
      >
        speaker confirm
      </text>

      {/* Small column on the right — to-dos */}
      <text
        x="186"
        y="46"
        fontFamily="var(--font-lora), Georgia, serif"
        fontSize="7"
        fill="var(--color-ink)"
        opacity="0.7"
        stroke="none"
      >
        catering ✓
      </text>
      <text
        x="186"
        y="58"
        fontFamily="var(--font-lora), Georgia, serif"
        fontSize="7"
        fill="var(--color-ink)"
        opacity="0.7"
        stroke="none"
      >
        room GHC 4307
      </text>
      <text
        x="186"
        y="70"
        fontFamily="var(--font-lora), Georgia, serif"
        fontSize="7"
        fill="var(--color-ink)"
        opacity="0.7"
        stroke="none"
      >
        Maya: deck v2
      </text>

      {/* Three Post-its on the side */}
      <g transform="translate(0, 0)">
        <rect
          x="2"
          y="118"
          width="34"
          height="30"
          fill="#f3d97a"
          opacity="0.85"
          stroke="var(--color-ink)"
          strokeWidth="0.5"
          transform="rotate(-3 19 133)"
        />
        <rect
          x="38"
          y="124"
          width="34"
          height="30"
          fill="#f0a987"
          opacity="0.78"
          stroke="var(--color-ink)"
          strokeWidth="0.5"
          transform="rotate(2 55 139)"
        />
        <rect
          x="74"
          y="120"
          width="34"
          height="30"
          fill="#cfe5d5"
          opacity="0.78"
          stroke="var(--color-ink)"
          strokeWidth="0.5"
          transform="rotate(-1 91 135)"
        />
      </g>
    </motion.g>
  );
}

/**
 * +360: same desk, lived-in. Cursor × ML Week poster on the wall, framed
 * Cohort 1 group photo. The wall has accumulated a year.
 */
function BgYear1Wall({ active }: { active: boolean }) {
  return (
    <motion.g
      initial={false}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.45 }}
      style={{ pointerEvents: "none" }}
      stroke={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    >
      {/* Cursor × ML Week poster, top-left, slightly tilted */}
      <g transform="rotate(-2 40 64)">
        <rect
          x="8"
          y="14"
          width="66"
          height="92"
          strokeWidth="1.2"
          fill="var(--color-cream)"
          fillOpacity="0.95"
        />
        <text
          x="14"
          y="32"
          fontFamily="Fraunces, serif"
          fontSize="9"
          fontWeight="600"
          fill="var(--color-ink)"
          stroke="none"
        >
          Cursor
        </text>
        <text
          x="14"
          y="44"
          fontFamily="Fraunces, serif"
          fontSize="9"
          fontWeight="600"
          fill="var(--color-terracotta)"
          stroke="none"
        >
          × ML
        </text>
        <text
          x="14"
          y="56"
          fontFamily="Fraunces, serif"
          fontSize="9"
          fontWeight="600"
          fill="var(--color-ink)"
          stroke="none"
        >
          Week
        </text>
        {/* Poster glyph — abstract diagonal */}
        <path
          d="M 14 70 L 64 70"
          strokeWidth="0.8"
          stroke="var(--color-ink)"
          opacity="0.5"
        />
        <path
          d="M 18 80 Q 32 74, 46 80 T 64 78"
          strokeWidth="1"
          stroke="var(--color-terracotta)"
          opacity="0.7"
        />
        <text
          x="14"
          y="96"
          fontFamily="Inter, sans-serif"
          fontSize="5"
          fill="var(--color-ink)"
          opacity="0.7"
          stroke="none"
        >
          OCT 2026 · CMU
        </text>
        {/* Tape strips */}
        <rect x="6" y="10" width="14" height="6" fill="var(--color-cream-warm)" opacity="0.7" stroke="none" />
        <rect x="62" y="10" width="14" height="6" fill="var(--color-cream-warm)" opacity="0.7" stroke="none" />
      </g>

      {/* Framed Cohort 1 photo, top-right */}
      <g transform="rotate(1 195 56)">
        <rect
          x="166"
          y="20"
          width="58"
          height="72"
          strokeWidth="1.2"
          fill="var(--color-cream-warm)"
        />
        <rect
          x="172"
          y="26"
          width="46"
          height="52"
          strokeWidth="0.8"
          fill="var(--color-cream)"
        />
        {/* Stick-figure group inside the frame */}
        {[
          [180, 56],
          [188, 54],
          [196, 56],
          [204, 54],
          [212, 56],
        ].map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy - 8} r="2" strokeWidth="0.6" fill="var(--color-cream)" />
            <line x1={cx} y1={cy - 6} x2={cx} y2={cy + 4} strokeWidth="0.6" />
            <line x1={cx - 3} y1={cy} x2={cx + 3} y2={cy} strokeWidth="0.5" />
          </g>
        ))}
        {/* Caption strip */}
        <text
          x="195"
          y="86"
          fontFamily="var(--font-lora), Georgia, serif"
          fontSize="6"
          fill="var(--color-ink)"
          opacity="0.85"
          stroke="none"
          textAnchor="middle"
        >
          Cohort 1
        </text>
      </g>

      {/* A small layered Post-it stack between the two — lived-in feel */}
      <g transform="translate(96, 24) rotate(-4)">
        <rect width="38" height="30" fill="#f3d97a" opacity="0.85" stroke="var(--color-ink)" strokeWidth="0.5" />
        <rect x="2" y="2" width="38" height="30" fill="#f0a987" opacity="0.7" stroke="var(--color-ink)" strokeWidth="0.5" />
        <rect x="-2" y="4" width="38" height="30" fill="#cfe5d5" opacity="0.7" stroke="var(--color-ink)" strokeWidth="0.5" />
      </g>

      {/* A faint pinned note lower-left */}
      <g transform="translate(8, 118) rotate(-6)">
        <rect width="34" height="22" fill="var(--color-cream)" stroke="var(--color-ink)" strokeWidth="0.5" />
        {[6, 10, 14, 18].map((y) => (
          <line key={y} x1="3" y1={y} x2="30" y2={y} strokeWidth="0.4" opacity="0.5" />
        ))}
        <circle cx="17" cy="0" r="1.4" fill="var(--color-pin)" stroke="none" />
      </g>
    </motion.g>
  );
}

/**
 * Sam himself — face and body stay fixed; Cursor cap appears after Day 0 (+90 onward).
 */
function SamFigure({ showHat }: { showHat: boolean }) {
  return (
    <g
      stroke={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      strokeWidth="1.6"
    >
      {/* Mug, foreground */}
      <ellipse cx="60" cy="248" rx="20" ry="6" fill="var(--color-cream)" />
      <path d="M 40 248 L 44 220 L 76 220 L 80 248" fill="var(--color-cream)" />
      <path d="M 76 226 C 92 226, 92 240, 76 240" />
      <path d="M 44 222 C 56 218, 64 218, 76 222" strokeWidth="1.2" />
      <path
        d="M 54 215 C 56 210, 60 208, 58 204"
        strokeWidth="1"
        opacity="0.7"
      />
      <path
        d="M 64 215 C 66 210, 70 208, 68 204"
        strokeWidth="1"
        opacity="0.7"
      />

      {/* Sweater — heavy ribbed crewneck */}
      <path
        d="M 60 270 L 50 200 C 60 180, 80 174, 120 174 C 160 174, 180 180, 190 200 L 200 270"
        fill="var(--color-cream-warm)"
      />
      <path d="M 102 178 C 112 188, 138 188, 148 178" />
      <path d="M 100 182 C 112 192, 138 192, 150 182" strokeWidth="1.1" />
      {[60, 80, 110, 140, 170, 190].map((x, i) => (
        <line
          key={i}
          x1={x}
          y1={i === 0 || i === 5 ? 230 : 200}
          x2={x + (i % 2 === 0 ? 2 : -2)}
          y2={i === 0 || i === 5 ? 270 : 240}
          strokeWidth="0.6"
          opacity="0.45"
        />
      ))}

      {/* Neck */}
      <path d="M 110 170 L 110 184" />
      <path d="M 140 170 L 140 184" />
      <path
        d="M 108 170 C 110 162, 140 162, 142 170"
        fill="var(--color-cream)"
      />

      {/* Head — soft oval */}
      <path
        d="M 92 132 C 92 100, 158 100, 158 132 C 158 158, 142 174, 125 174 C 108 174, 92 158, 92 132 Z"
        fill="var(--color-cream)"
      />

      {/* Hair — one continuous mass, hugs crown and forehead hairline (no floating arc) */}
      <path
        d="M 94 130
          C 94 106, 108 93, 125 91.5
          C 142 93, 156 106, 156 130
          C 156 120, 146 113, 125 111.5
          C 104 113, 94 120, 94 130 Z"
        fill={STROKE}
        opacity="0.9"
      />
      {/* A few short strand breaks at the crown so it reads as hair, not a solid helmet */}
      <path
        d="M 108 100 C 118 96, 132 96, 142 100"
        strokeWidth="0.7"
        opacity="0.35"
        fill="none"
      />
      <path
        d="M 112 104 Q 125 100, 138 104"
        strokeWidth="0.55"
        opacity="0.28"
        fill="none"
      />

      {/* Cursor cap — pops on after Day 0 */}
      <motion.g
        initial={false}
        animate={
          showHat
            ? { opacity: 1, scale: 1, y: 0 }
            : { opacity: 0, scale: 0.55, y: -14 }
        }
        transition={{ type: "spring", stiffness: 380, damping: 20, mass: 0.8 }}
        style={{ transformOrigin: "125px 98px", transformBox: "fill-box" }}
      >
        {/* Crown */}
        <path
          d="M 94 102 C 94 82, 110 72, 126 72 C 144 72, 158 86, 158 102 L 156 108 C 140 100, 112 100, 96 108 Z"
          fill="var(--color-terracotta)"
          stroke={STROKE}
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        {/* Visor */}
        <path
          d="M 96 106 Q 126 122, 162 108 L 160 104 Q 126 118, 98 104 Z"
          fill="var(--color-terracotta)"
          stroke={STROKE}
          strokeWidth="1"
          opacity="0.95"
        />
        {/* Subtle crown highlight */}
        <path
          d="M 102 88 Q 126 78, 150 92"
          stroke="var(--color-cream)"
          strokeWidth="0.55"
          opacity="0.35"
          fill="none"
        />
        {/* “Cursor” mark — paired chevrons */}
        <g stroke="var(--color-cream)" strokeWidth="1.2" fill="none" opacity="0.95">
          <path d="M 116 94 L 122 99 L 116 104" />
          <path d="M 136 94 L 130 99 L 136 104" />
        </g>
      </motion.g>

      {/* Glasses */}
      <rect
        x="103"
        y="134"
        width="18"
        height="13"
        rx="2"
        strokeWidth="1.2"
        fill="var(--color-cream)"
      />
      <rect
        x="129"
        y="134"
        width="18"
        height="13"
        rx="2"
        strokeWidth="1.2"
        fill="var(--color-cream)"
      />
      <line x1="121" y1="140" x2="129" y2="140" strokeWidth="1" />

      {/* Eyes */}
      <circle cx="112" cy="141" r="1.1" fill={STROKE} stroke="none" />
      <circle cx="138" cy="141" r="1.1" fill={STROKE} stroke="none" />

      {/* Brows */}
      <line x1="105" y1="131" x2="119" y2="131" strokeWidth="1.1" />
      <line x1="131" y1="131" x2="145" y2="131" strokeWidth="1.1" />

      {/* Ear */}
      <path d="M 92 138 C 86 142, 86 152, 92 156" />
      <path d="M 158 138 C 164 142, 164 152, 158 156" />

      {/* Nose hint */}
      <path d="M 124 148 C 122 156, 124 160, 128 160" strokeWidth="0.9" />

      {/* Mouth */}
      <path d="M 116 166 C 122 168, 130 168, 134 166" strokeWidth="1.1" />

      {/* Slight chin shadow */}
      <path d="M 100 168 C 110 178, 142 178, 152 168" strokeWidth="0.7" opacity="0.5" />
    </g>
  );
}
