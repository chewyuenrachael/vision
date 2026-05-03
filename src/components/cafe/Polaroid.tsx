"use client";

import { motion } from "framer-motion";
import type { WallPolaroid } from "@/lib/types";
import { Sketch } from "./sketches";

/**
 * Single corkboard polaroid. SPEC §4.4.
 * Pin-drop entrance, hover-lift via layoutId.
 */

interface Props {
  polaroid: WallPolaroid;
  highlight: boolean;
  onEnter: () => void;
  onLeave: () => void;
  containerSize: { w: number; h: number };
}

export function Polaroid({
  polaroid,
  highlight,
  onEnter,
  onLeave,
  containerSize,
}: Props) {
  const { x, y } = polaroid.position;
  const left = (x / 100) * containerSize.w;
  const top = (y / 100) * containerSize.h;

  return (
    <motion.div
      layoutId={`polaroid-${polaroid.id}`}
      className="absolute pointer-events-auto"
      style={{
        left,
        top,
        transform: `translate(-50%, -50%) rotate(${polaroid.rotation}deg)`,
        zIndex: highlight ? 30 : 10,
      }}
      initial={{ opacity: 0, scale: 0.85, y: -6 }}
      animate={{
        opacity: 1,
        scale: highlight ? 1.18 : 1,
        y: highlight ? -6 : 0,
      }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{
        opacity: { duration: 0.4 },
        scale: { duration: 0.22, ease: [0.2, 0.8, 0.2, 1] },
        y: { duration: 0.22 },
      }}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
    >
      <div className="relative w-[78px] bg-cream p-1.5 pb-3 shadow-[0_4px_10px_-4px_rgba(26,26,26,0.35)] sm:w-[88px]">
        {/* Push pin */}
        <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pin shadow-[0_1px_2px_rgba(26,26,26,0.4)]" />
        <div className="aspect-square w-full bg-cream-warm">
          <Sketch id={polaroid.sketchId} />
        </div>
        <div className="mt-1 px-0.5 text-center font-hand text-[10px] leading-tight text-ink">
          {polaroid.caption}
        </div>
      </div>

      {highlight && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-full top-1/2 ml-3 w-56 -translate-y-1/2 rounded-md border border-ink/15 bg-cream p-3 text-left shadow-[0_18px_40px_-12px_rgba(26,26,26,0.4)]"
          style={{ transform: `translateY(-50%) rotate(${-polaroid.rotation}deg)` }}
        >
          <div className="font-body text-[10px] uppercase tracking-wider text-ink-mute">
            {polaroid.date}
          </div>
          <p className="mt-1 font-body text-xs leading-relaxed text-ink-soft">
            {polaroid.description}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
