"use client";

import { motion } from "framer-motion";

interface Props {
  from: { x: number; y: number };
  to: { x: number; y: number };
  shipped: boolean;
  latencyWeeks: number;
}

/**
 * SVG arrow from observation card to product card.
 * Pre-arrival = grey dashed; shipped = solid terracotta with animated draw.
 */
export function FeedbackArrow({ from, to, shipped, latencyWeeks }: Props) {
  const midX = (from.x + to.x) / 2;
  const path = `M ${from.x} ${from.y} C ${midX} ${from.y}, ${midX} ${to.y}, ${to.x} ${to.y}`;
  const stroke = shipped ? "var(--color-terracotta)" : "var(--color-ink)";

  return (
    <g>
      <motion.path
        d={path}
        stroke={stroke}
        strokeWidth={shipped ? 1.6 : 1}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={shipped ? "0" : "4 4"}
        initial={false}
        animate={{
          pathLength: shipped ? 1 : 0.92,
          opacity: shipped ? 1 : 0.4,
        }}
        transition={{ duration: shipped ? 0.7 : 0.3, ease: "easeOut" }}
      />
      {/* Arrowhead at destination */}
      {shipped && (
        <motion.g
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.55, duration: 0.25 }}
        >
          <path
            d={`M ${to.x - 8} ${to.y - 5} L ${to.x} ${to.y} L ${to.x - 8} ${to.y + 5}`}
            stroke={stroke}
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.g>
      )}

      {/* Latency badge */}
      <g transform={`translate(${midX}, ${(from.y + to.y) / 2 - 12})`}>
        <rect
          x="-30"
          y="-10"
          width="60"
          height="20"
          rx="10"
          fill="var(--color-cream)"
          stroke={shipped ? stroke : "var(--color-ink)"}
          strokeOpacity={shipped ? 1 : 0.35}
          strokeWidth="1"
        />
        <text
          x="0"
          y="4"
          textAnchor="middle"
          fontFamily="var(--font-body)"
          fontSize="10"
          fill={shipped ? stroke : "var(--color-ink-mute)"}
          letterSpacing="0.05em"
          style={{ textTransform: "uppercase" }}
        >
          {latencyWeeks} weeks
        </text>
      </g>
    </g>
  );
}
