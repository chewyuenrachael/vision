"use client";

import { motion } from "framer-motion";
import { memo } from "react";
import type { CafeSilhouette, SilhouettePosture } from "@/lib/types";

/**
 * One silhouette in the cafe. Posture variants drawn from primitives.
 * SPEC §4.5: "head circle + body trapezoid + arm strokes" — must read as a
 * person in a place, not a data-viz dot.
 */

const STROKE = "var(--color-ink)";
const FILL = "var(--color-teal)";
const FILL_OPACITY = 0.78;

function PostureSeatedLaptop({ highlight }: { highlight: boolean }) {
  return (
    <g
      stroke={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={highlight ? "var(--color-terracotta)" : FILL}
      fillOpacity={FILL_OPACITY}
    >
      <line x1="0" y1="-3" x2="0" y2="-26" strokeWidth="2" fill="none" />
      <path d="M -10 -3 L 10 -3 L 8 -19 L -8 -19 Z" strokeWidth="2" />
      <circle cx="0" cy="-26" r="6" strokeWidth="2" fill={highlight ? "var(--color-terracotta)" : FILL} fillOpacity={FILL_OPACITY} />
      <path d="M -7 -16 Q -12 -12, -10 -7" strokeWidth="1.6" fill="none" />
      <path d="M 7 -16 Q 12 -12, 10 -7" strokeWidth="1.6" fill="none" />
      <path
        d="M -12 -5 L 12 -5 L 14 0 L -14 0 Z"
        strokeWidth="1.4"
        fill="var(--color-cream)"
        fillOpacity={1}
      />
      <path d="M -10 -5 L -8 -12 L 8 -12 L 10 -5" strokeWidth="1.2" fill="var(--color-ink)" fillOpacity={0.85} />
    </g>
  );
}

function PostureSeatedLaptopBack({ highlight }: { highlight: boolean }) {
  const fill = highlight ? "var(--color-terracotta)" : FILL;
  return (
    <g
      stroke={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={fill}
      fillOpacity={FILL_OPACITY}
    >
      <path d="M -12 -5 L 12 -5 L 10 -26 L -10 -26 Z" strokeWidth="2" />
      <line x1="-10" y1="-26" x2="-10" y2="-34" strokeWidth="1.6" fill="none" />
      <line x1="10" y1="-26" x2="10" y2="-34" strokeWidth="1.6" fill="none" />
      <circle cx="0" cy="-34" r="6" strokeWidth="2" />
    </g>
  );
}

function PostureStandingCounter({ highlight }: { highlight: boolean }) {
  const fill = highlight ? "var(--color-terracotta)" : FILL;
  return (
    <g
      stroke={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={fill}
      fillOpacity={FILL_OPACITY}
    >
      <line x1="-4" y1="0" x2="-4" y2="-16" strokeWidth="2" fill="none" />
      <line x1="4" y1="0" x2="4" y2="-16" strokeWidth="2" fill="none" />
      <path d="M -9 -16 L 9 -16 L 8 -32 L -8 -32 Z" strokeWidth="2" />
      <circle cx="0" cy="-37" r="6" strokeWidth="2" />
      <path d="M 8 -28 Q 16 -26, 16 -20" strokeWidth="1.6" fill="none" />
    </g>
  );
}

function PostureLeaning({ flip, highlight }: { flip: boolean; highlight: boolean }) {
  const fill = highlight ? "var(--color-terracotta)" : FILL;
  return (
    <g
      stroke={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={fill}
      fillOpacity={FILL_OPACITY}
      transform={flip ? "scale(-1, 1)" : undefined}
    >
      <line x1="0" y1="-3" x2="0" y2="-26" strokeWidth="2" fill="none" />
      <path d="M -8 -3 L 8 -3 L 14 -16 L -2 -18 Z" strokeWidth="2" />
      <circle cx="11" cy="-23" r="6" strokeWidth="2" />
      <path d="M 10 -12 Q 20 -10, 24 -6" strokeWidth="1.6" fill="none" />
    </g>
  );
}

function PostureAtWindow({ highlight }: { highlight: boolean }) {
  const fill = highlight ? "var(--color-terracotta)" : FILL;
  return (
    <g
      stroke={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={fill}
      fillOpacity={FILL_OPACITY}
    >
      <line x1="-4" y1="0" x2="-4" y2="-16" strokeWidth="2" fill="none" />
      <line x1="4" y1="0" x2="4" y2="-16" strokeWidth="2" fill="none" />
      <path d="M -9 -16 L 9 -16 L 9 -32 L -9 -32 Z" strokeWidth="2" />
      <circle cx="0" cy="-37" r="6" strokeWidth="2" />
      <path d="M -9 -25 L -18 -25" strokeWidth="1.6" fill="none" />
    </g>
  );
}

function PostureWalking({ highlight }: { highlight: boolean }) {
  const fill = highlight ? "var(--color-terracotta)" : FILL;
  return (
    <g
      stroke={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={fill}
      fillOpacity={FILL_OPACITY}
    >
      <line x1="-6" y1="0" x2="-2" y2="-16" strokeWidth="2" fill="none" />
      <line x1="6" y1="0" x2="2" y2="-16" strokeWidth="2" fill="none" />
      <path d="M -8 -16 L 8 -16 L 7 -30 L -7 -30 Z" strokeWidth="2" />
      <circle cx="-1" cy="-35" r="6" strokeWidth="2" />
      <path d="M -6 -25 Q -14 -20, -12 -12" strokeWidth="1.6" fill="none" />
      <path d="M 6 -25 Q 14 -20, 12 -12" strokeWidth="1.6" fill="none" />
    </g>
  );
}

const POSTURE_RENDER: Record<
  SilhouettePosture,
  (props: { highlight: boolean; flip: boolean }) => React.ReactNode
> = {
  "seated-laptop": ({ highlight }) => <PostureSeatedLaptop highlight={highlight} />,
  "seated-laptop-back": ({ highlight }) => <PostureSeatedLaptopBack highlight={highlight} />,
  "standing-counter": ({ highlight }) => <PostureStandingCounter highlight={highlight} />,
  "leaning-conversation": ({ flip, highlight }) => <PostureLeaning flip={flip} highlight={highlight} />,
  "at-window": ({ highlight }) => <PostureAtWindow highlight={highlight} />,
  walking: ({ highlight }) => <PostureWalking highlight={highlight} />,
};

interface SilhouetteProps {
  silhouette: CafeSilhouette;
  width: number; // svg viewBox width
  height: number;
  highlight?: boolean;
  visible: boolean;
  onHover?: () => void;
  onLeave?: () => void;
}

function _Silhouette({
  silhouette,
  width,
  height,
  highlight = false,
  visible,
  onHover,
  onLeave,
}: SilhouetteProps) {
  const cx = (silhouette.x / 100) * width;
  const cy = (silhouette.y / 100) * height;
  const scale = silhouette.scale ?? 1.4;
  const flip = silhouette.flip ?? false;

  return (
    <motion.g
      transform={`translate(${cx}, ${cy}) scale(${scale})`}
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        scale: visible ? scale : scale * 0.92,
      }}
      transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
      style={{ pointerEvents: visible ? "auto" : "none" }}
      onPointerEnter={onHover}
      onPointerLeave={onLeave}
    >
      {POSTURE_RENDER[silhouette.posture]({ highlight, flip })}
    </motion.g>
  );
}

export const Silhouette = memo(_Silhouette);
