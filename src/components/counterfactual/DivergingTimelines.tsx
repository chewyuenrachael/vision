"use client";

import { motion } from "framer-motion";
import { useTimeline } from "@/components/timeline/TimelineProvider";
import {
  COUNTERFACTUAL_WITHOUT_MARKERS,
  COUNTERFACTUAL_WITH_MARKERS,
} from "@/data/counterfactual";
import { T_MAX_EXTENDED, T_YEAR1 } from "@/lib/dates";

const VIEW_W = 1000;
const VIEW_H = 280;
/** Left inset — must fit longest axis label (“without” + tracking) inside viewBox when textAnchor="end". */
const PAD_X = 102;

export function DivergingTimelines() {
  const { t } = useTimeline();

  const xForT = (tDays: number) =>
    PAD_X + (tDays / T_MAX_EXTENDED) * (VIEW_W - PAD_X * 2);

  // Divergence ramp: top line stays flat through Year 1 (t <= T_YEAR1), then rises.
  const topY = (tDays: number) => {
    if (tDays <= T_YEAR1) return VIEW_H / 2 - 20;
    const frac = (tDays - T_YEAR1) / (T_MAX_EXTENDED - T_YEAR1);
    return VIEW_H / 2 - 20 - frac * 70;
  };
  const bottomY = (tDays: number) => {
    if (tDays <= T_YEAR1) return VIEW_H / 2 + 20;
    const frac = (tDays - T_YEAR1) / (T_MAX_EXTENDED - T_YEAR1);
    return VIEW_H / 2 + 20 + frac * 12;
  };

  // Build the path for each line by sampling
  const samples: number[] = [];
  for (let i = 0; i <= 60; i++) samples.push((i / 60) * T_MAX_EXTENDED);
  const topPath =
    `M ${xForT(0)} ${topY(0)}` +
    samples
      .map((s) => `L ${xForT(s)} ${topY(s)}`)
      .join(" ");
  const bottomPath =
    `M ${xForT(0)} ${bottomY(0)}` +
    samples.map((s) => `L ${xForT(s)} ${bottomY(s)}`).join(" ");

  // Reveal length tracks current t position
  const revealRatio = Math.min(1, t / T_MAX_EXTENDED);

  // Visible markers (only those whose tDays <= current t)
  const visibleTopMarkers = COUNTERFACTUAL_WITH_MARKERS.filter(
    (m) => m.tDays <= t,
  );
  const visibleBottomMarkers = COUNTERFACTUAL_WITHOUT_MARKERS.filter(
    (m) => m.tDays <= t,
  );

  // End delta only renders when we're past Year 1
  const showDelta = t > T_YEAR1;

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      className="h-full w-full"
      aria-label="Two diverging timelines from May 2026 to April 2030"
    >
      <defs>
        <linearGradient id="reveal-gradient" x1="0" x2="1" y1="0" y2="0">
          <stop offset={`${revealRatio * 100}%`} stopColor="black" />
          <stop offset={`${revealRatio * 100}%`} stopColor="black" stopOpacity="0" />
        </linearGradient>
        <mask id="reveal-mask">
          <rect width={VIEW_W} height={VIEW_H} fill="url(#reveal-gradient)" />
        </mask>
      </defs>

      {/* Year 1 marker — divergence point */}
      <line
        x1={xForT(T_YEAR1)}
        y1={20}
        x2={xForT(T_YEAR1)}
        y2={VIEW_H - 40}
        stroke="var(--color-ink)"
        strokeWidth="0.6"
        strokeDasharray="3 4"
        opacity="0.4"
      />
      <text
        x={xForT(T_YEAR1) + 8}
        y={28}
        fontSize="11"
        fontFamily="var(--font-body)"
        fill="var(--color-ink-mute)"
        letterSpacing="0.12em"
        style={{ textTransform: "uppercase" }}
      >
        Apr 2027 — divergence
      </text>

      {/* Faint full lines (background) */}
      <path
        d={topPath}
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="1"
        opacity="0.18"
        strokeLinecap="round"
      />
      <path
        d={bottomPath}
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="1"
        opacity="0.18"
        strokeLinecap="round"
      />

      {/* Revealed lines */}
      <g mask="url(#reveal-mask)">
        <path
          d={topPath}
          fill="none"
          stroke="var(--color-terracotta)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d={bottomPath}
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.7"
        />
      </g>

      {/* Top markers */}
      {visibleTopMarkers.map((m, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <circle
            cx={xForT(m.tDays)}
            cy={topY(m.tDays)}
            r="4"
            fill="var(--color-terracotta)"
            stroke="var(--color-cream)"
            strokeWidth="1.5"
          />
          <text
            x={xForT(m.tDays)}
            y={topY(m.tDays) - 14}
            textAnchor="middle"
            fontSize="10"
            fontFamily="var(--font-body)"
            fill="var(--color-ink)"
          >
            {m.label}
          </text>
        </motion.g>
      ))}

      {/* Bottom markers */}
      {visibleBottomMarkers.map((m, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <circle
            cx={xForT(m.tDays)}
            cy={bottomY(m.tDays)}
            r="3"
            fill="var(--color-ink)"
            opacity="0.7"
          />
          <text
            x={xForT(m.tDays)}
            y={bottomY(m.tDays) + 18}
            textAnchor="middle"
            fontSize="10"
            fontFamily="var(--font-body)"
            fill="var(--color-ink-mute)"
          >
            {m.label}
          </text>
        </motion.g>
      ))}

      {/* Axis labels at start/end */}
      <text
        x={xForT(0)}
        y={VIEW_H - 14}
        textAnchor="start"
        fontSize="10"
        fontFamily="var(--font-body)"
        fill="var(--color-ink-mute)"
        letterSpacing="0.12em"
        style={{ textTransform: "uppercase" }}
      >
        May 2026
      </text>
      <text
        x={xForT(T_MAX_EXTENDED)}
        y={VIEW_H - 14}
        textAnchor="end"
        fontSize="10"
        fontFamily="var(--font-body)"
        fill="var(--color-ink-mute)"
        letterSpacing="0.12em"
        style={{ textTransform: "uppercase" }}
      >
        Apr 2030
      </text>

      {/* Top/bottom axis lane labels — x must leave room for full “WITHOUT” when anchored end */}
      <text
        x={PAD_X - 4}
        y={VIEW_H / 2 - 24}
        textAnchor="end"
        fontSize="11"
        fontFamily="var(--font-body)"
        fill="var(--color-terracotta)"
        letterSpacing="0.14em"
        style={{ textTransform: "uppercase" }}
      >
        with
      </text>
      <text
        x={PAD_X - 4}
        y={VIEW_H / 2 + 28}
        textAnchor="end"
        fontSize="11"
        fontFamily="var(--font-body)"
        fill="var(--color-ink-mute)"
        letterSpacing="0.14em"
        style={{ textTransform: "uppercase" }}
      >
        without
      </text>

      {/* Delta arrow at the end */}
      {showDelta && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <line
            x1={xForT(T_MAX_EXTENDED) - 6}
            y1={topY(T_MAX_EXTENDED) + 4}
            x2={xForT(T_MAX_EXTENDED) - 6}
            y2={bottomY(T_MAX_EXTENDED) - 4}
            stroke="var(--color-terracotta)"
            strokeWidth="1.4"
            strokeDasharray="3 3"
          />
          <path
            d={`M ${xForT(T_MAX_EXTENDED) - 10} ${topY(T_MAX_EXTENDED) + 8} L ${xForT(T_MAX_EXTENDED) - 6} ${topY(T_MAX_EXTENDED) + 4} L ${xForT(T_MAX_EXTENDED) - 2} ${topY(T_MAX_EXTENDED) + 8}`}
            stroke="var(--color-terracotta)"
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={`M ${xForT(T_MAX_EXTENDED) - 10} ${bottomY(T_MAX_EXTENDED) - 8} L ${xForT(T_MAX_EXTENDED) - 6} ${bottomY(T_MAX_EXTENDED) - 4} L ${xForT(T_MAX_EXTENDED) - 2} ${bottomY(T_MAX_EXTENDED) - 8}`}
            stroke="var(--color-terracotta)"
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.g>
      )}
    </svg>
  );
}
