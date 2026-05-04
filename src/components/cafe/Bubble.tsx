"use client";

import { motion } from "framer-motion";
import type { CafeBubble, Phase } from "@/lib/types";
import { PHASE_INDEX } from "@/lib/phases";

/**
 * Speech bubble. SPEC §4.3: tiny ambient shape that hover-expands to a story
 * card. Only one expanded at a time — `expanded` is controlled by parent.
 *
 * The dot's own pulse speeds up as the cafe gets louder (phase advances).
 */

interface BubbleProps {
  bubble: CafeBubble;
  x: number; // px in absolute container
  y: number;
  expanded: boolean;
  onEnter: () => void;
  onLeave: () => void;
  phase: Phase;
}

export function Bubble({ bubble, x, y, expanded, onEnter, onLeave, phase }: BubbleProps) {
  const i = PHASE_INDEX[phase];
  const pulseDuration = 3.0 - Math.min(i, 3) * 0.45; // 3.0s now → 1.65s year1
  const pulseScale = 1.5 + Math.min(i, 3) * 0.15; // 1.5× → 1.95×
  return (
    <motion.div
      className="pointer-events-auto absolute"
      style={{
        left: x,
        top: y,
        transform: "translate(-50%, -100%)",
        /* Collapsed: above floor/advocates (15). Expanded: above every other bubble dot. */
        zIndex: expanded ? 500 : 40,
      }}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      initial={false}
      animate={{ scale: expanded ? 1 : 1 }}
    >
      {!expanded && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="relative flex h-3 w-3 items-center justify-center rounded-full bg-terracotta shadow-[0_0_0_3px_rgba(196,100,74,0.18)]"
          aria-label={`Story by ${bubble.name} at ${bubble.school}`}
        >
          <motion.span
            className="absolute inset-0 rounded-full bg-terracotta opacity-50"
            animate={{
              scale: [1, pulseScale, 1],
              opacity: [0.55, 0, 0.55],
            }}
            transition={{
              duration: pulseDuration,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        </motion.div>
      )}

      {expanded && (
        <motion.div
          initial={{ opacity: 0, y: 4, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative isolate w-72 rounded-md border border-ink/15 bg-cream p-4 shadow-[0_18px_40px_-12px_rgba(26,26,26,0.4)]"
        >
          <div className="flex items-baseline justify-between gap-3">
            <div>
              <div className="font-display text-base text-ink">
                {bubble.name}
              </div>
              <div className="font-body text-xs uppercase tracking-wider text-ink-mute">
                {bubble.school}
              </div>
            </div>
            <span
              className={`rounded-full px-2 py-0.5 font-body text-[10px] uppercase tracking-wider ${
                bubble.origin === "intl"
                  ? "border border-teal/30 bg-teal/10 text-teal"
                  : "border border-terracotta/30 bg-terracotta/10 text-terracotta"
              }`}
            >
              {bubble.origin === "intl" ? "intl" : "us"}
            </span>
          </div>
          <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">
            “{bubble.long.replace(/^[^—]+—\s*/, "").replace(/^"|"$/g, "")}”
          </p>
          {/* Tail */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
            <svg width="16" height="10" viewBox="0 0 16 10">
              <path
                d="M 0 0 L 16 0 L 8 10 Z"
                fill="var(--color-cream)"
                stroke="rgba(26,26,26,0.15)"
                strokeWidth="1"
              />
            </svg>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
