"use client";

import { motion } from "framer-motion";
import type { FeedbackLoop } from "@/lib/types";

interface Props {
  loop: FeedbackLoop;
  side: "left" | "right";
  state: "before-intro" | "in-flight" | "shipped";
}

export function FeedbackCard({ loop, side, state }: Props) {
  const visible = state !== "before-intro";

  if (side === "left") {
    return (
      <motion.div
        initial={false}
        animate={{
          opacity: visible ? 1 : 0,
          y: visible ? 0 : 8,
        }}
        transition={{ duration: 0.32 }}
        className={`relative rounded-md border ${
          visible ? "border-ink/15 bg-cream" : "border-dashed border-ink/15 bg-cream-warm/40"
        } p-4 shadow-[0_2px_6px_-2px_rgba(26,26,26,0.18)]`}
      >
        <div className="flex items-baseline justify-between gap-3">
          <div>
            <div className="font-display text-sm tracking-tight text-ink">
              {loop.observation.author}
            </div>
            <div className="font-body text-[11px] uppercase tracking-wider text-ink-mute">
              {loop.observation.affiliation}
            </div>
          </div>
          <span className="font-body text-[10px] uppercase tracking-wider text-ink-mute">
            #{loop.number}
          </span>
        </div>
        <p className="mt-2 font-body text-[13px] leading-snug text-ink-soft">
          “{loop.observation.text}”
        </p>
        {state === "shipped" && (
          <div className="mt-3 inline-flex items-center gap-1 font-body text-[10px] uppercase tracking-wider text-terracotta">
            → shipped
          </div>
        )}
      </motion.div>
    );
  }

  // right side
  const isShipped = state === "shipped";
  return (
    <motion.div
      initial={false}
      animate={{
        opacity: visible ? 1 : 0.55,
        y: visible ? 0 : 8,
      }}
      transition={{ duration: 0.32 }}
      className={`relative rounded-md border p-4 transition-colors ${
        isShipped
          ? "border-ink/20 bg-ink text-cream shadow-[0_4px_14px_-6px_rgba(26,26,26,0.45)]"
          : "border-dashed border-ink/30 bg-cream-warm/40 text-ink-mute"
      }`}
    >
      <div className="flex items-baseline justify-between gap-3">
        <div>
          <div
            className={`font-display text-sm tracking-tight ${
              isShipped ? "text-cream" : ""
            }`}
          >
            {loop.shipped.feature}
          </div>
          <div
            className={`font-body text-[11px] uppercase tracking-wider ${
              isShipped ? "text-cream/70" : ""
            }`}
          >
            cursor product
          </div>
        </div>
        {isShipped && (
          <span className="rounded-full border border-cream/30 bg-cream/10 px-2 py-0.5 font-body text-[10px] uppercase tracking-wider text-cream">
            ✓ shipped
          </span>
        )}
      </div>
      <p
        className={`mt-2 font-body text-[13px] leading-snug ${
          isShipped ? "text-cream/85" : ""
        }`}
      >
        {loop.shipped.description}
      </p>
    </motion.div>
  );
}
