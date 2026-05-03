"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTimeline } from "@/components/timeline/TimelineProvider";
import { CAFE_SILHOUETTES } from "@/data/cafe-silhouettes";
import { CAFE_BUBBLES } from "@/data/cafe-bubbles";
import { isVisibleAt, PHASE_INDEX } from "@/lib/phases";
import type { Phase } from "@/lib/types";
import { Silhouette } from "./Silhouette";
import { Bubble } from "./Bubble";
import { Corkboard } from "./Corkboard";
import { CafeBackground } from "./CafeBackground";
import { PaperTexture } from "@/components/ui/PaperTexture";

const VIEWBOX_W = 1000;
const VIEWBOX_H = 700;

/**
 * Buzz intensity per phase. Drives ripple-dot pulse speed/strength so the cafe
 * audibly "buzzes louder" as time advances (SPEC §4.2 "louder").
 */
function buzzFor(phase: Phase) {
  const i = PHASE_INDEX[phase]; // 0..4
  return {
    // Faster pulses at higher phase index
    duration: 4.4 - Math.min(i, 3) * 0.55, // 4.4s at now → 2.75s at year1
    // Brighter ripples
    opacity: 0.35 + Math.min(i, 3) * 0.12, // 0.35 at now → 0.71 at year1
    // Slightly larger ripples at peak
    expand: 1.6 + Math.min(i, 3) * 0.18, // 1.6× → 2.14×
  };
}

/**
 * Light terracotta circle — represents someone in the cafe receiving the
 * ripple effects of an ambassador's work. They aren't authored characters with
 * stories; they're the broader community that the ambassadors influence.
 */
function RippleDot({
  x,
  y,
  phase,
  delay = 0,
}: {
  x: number;
  y: number;
  phase: Phase;
  delay?: number;
}) {
  const { duration, opacity, expand } = buzzFor(phase);
  return (
    <div
      className="pointer-events-none absolute"
      style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}
      aria-hidden
    >
      <div className="relative h-[7px] w-[7px]">
        <div
          className="absolute inset-0 rounded-full bg-terracotta-soft"
          style={{ opacity: 0.55 }}
        />
        <motion.span
          className="absolute inset-0 rounded-full bg-terracotta-soft"
          animate={{
            scale: [1, expand, 1],
            opacity: [opacity, 0, opacity],
          }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "easeOut",
            delay,
          }}
        />
      </div>
    </div>
  );
}

export function Cafe() {
  const { phase } = useTimeline();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [hoveredBubbleId, setHoveredBubbleId] = useState<string | null>(null);
  const [highlightedFromWall, setHighlightedFromWall] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const ro = new ResizeObserver(() => {
      setSize({ w: el.clientWidth, h: el.clientHeight });
    });
    ro.observe(el);
    setSize({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, []);

  const visibleSilhouettes = useMemo(
    () => CAFE_SILHOUETTES.filter((s) => isVisibleAt(s.firstVisibleAt, phase)),
    [phase],
  );

  const bubbleById = useMemo(() => {
    const map = new Map<string, (typeof CAFE_BUBBLES)[number]>();
    for (const b of CAFE_BUBBLES) map.set(b.id, b);
    return map;
  }, []);

  // Conversation arcs start as a hint at +90 and intensify at +180 / +360.
  const showArcs = phase !== "now";

  // Collect adjacency arcs between leaning-conversation pairs
  const arcs = useMemo(() => {
    if (!showArcs) return [];
    const leans = visibleSilhouettes.filter(
      (s) => s.posture === "leaning-conversation",
    );
    const result: { x1: number; y1: number; x2: number; y2: number }[] = [];
    for (let i = 0; i < leans.length; i++) {
      for (let j = i + 1; j < leans.length; j++) {
        const a = leans[i];
        const b = leans[j];
        const dx = Math.abs(a.x - b.x);
        const dy = Math.abs(a.y - b.y);
        if (dx <= 6 && dy <= 4) {
          result.push({
            x1: (a.x / 100) * VIEWBOX_W,
            y1: (a.y / 100) * VIEWBOX_H - 18,
            x2: (b.x / 100) * VIEWBOX_W,
            y2: (b.y / 100) * VIEWBOX_H - 18,
          });
        }
      }
    }
    return result;
  }, [visibleSilhouettes, showArcs]);

  const highlightedBubbleId = hoveredBubbleId ?? highlightedFromWall;

  return (
    <section
      id="cafe"
      className="scene-snap relative isolate w-full overflow-hidden border-y border-ink/10"
      style={{ background: "var(--atmosphere)" }}
    >
      <PaperTexture opacity={0.07} />

      <div className="relative mx-auto w-full max-w-7xl px-4 pt-8 sm:pt-10">
        <div className="flex items-baseline justify-between gap-6">
          <div>
            <div className="font-body text-xs uppercase tracking-[0.22em] text-ink-mute">
              Scene 1
            </div>
            <h2 className="mt-1 font-display text-3xl tracking-tight text-ink sm:text-4xl">
              Cafe Cursor
            </h2>
          </div>
          <div className="hidden text-right font-body text-xs leading-tight text-ink-mute sm:block">
            <div>
              <span className="inline-block h-2 w-2 translate-y-[-1px] rounded-full bg-terracotta align-middle" />{" "}
              ambassadors
              <span className="mx-2 text-ink-mute/40">·</span>
              <span className="inline-block h-2 w-2 translate-y-[-1px] rounded-full bg-terracotta-soft align-middle" />{" "}
              the cafe they’re changing
            </div>
            <div className="mt-1">
              Hover an ambassador. Hover a polaroid to find its author.
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-10 pt-4 sm:pb-14">
        <div
          ref={containerRef}
          className="relative aspect-[10/7] w-full overflow-hidden rounded-md border border-ink/15 bg-cream-warm shadow-[inset_0_0_60px_rgba(26,26,26,0.05)]"
        >
          <CafeBackground>
            {/* Conversation arcs between adjacent leaning silhouettes.
                Arc opacity follows the buzz curve — quiet at q1, vivid at q2+. */}
            {arcs.map((arc, i) => {
              const arcOpacity =
                phase === "q1" ? 0.35 : phase === "q2" ? 0.6 : 0.78;
              return (
                <path
                  key={i}
                  d={`M ${arc.x1} ${arc.y1} Q ${(arc.x1 + arc.x2) / 2} ${
                    Math.min(arc.y1, arc.y2) - 30
                  }, ${arc.x2} ${arc.y2}`}
                  stroke="var(--color-terracotta)"
                  strokeWidth="0.9"
                  strokeDasharray="2 4"
                  fill="none"
                  opacity={arcOpacity}
                />
              );
            })}
            {/* Silhouettes */}
            {CAFE_SILHOUETTES.map((s) => (
              <Silhouette
                key={s.id}
                silhouette={s}
                width={VIEWBOX_W}
                height={VIEWBOX_H}
                visible={isVisibleAt(s.firstVisibleAt, phase)}
                highlight={
                  s.bubbleId !== undefined && s.bubbleId === highlightedBubbleId
                }
                onHover={
                  s.bubbleId ? () => setHoveredBubbleId(s.bubbleId!) : undefined
                }
                onLeave={
                  s.bubbleId ? () => setHoveredBubbleId(null) : undefined
                }
              />
            ))}
          </CafeBackground>

          {/* Corkboard overlay (HTML for layoutId animation + tooltip text) */}
          <Corkboard
            highlightedBubbleId={highlightedBubbleId}
            setHighlightedBubbleId={setHighlightedFromWall}
          />

          {/* Ripple-dot overlay — every silhouette without a bubble gets a
              lighter terracotta circle. These represent the broader cafe
              community, the people receiving the ripple effects of the
              ambassadors. As phase advances the dots pulse faster and
              brighter — the cafe buzzes louder. */}
          {size.w > 0 &&
            visibleSilhouettes
              .filter((s) => !s.bubbleId)
              .map((s, i) => {
                const px = (s.x / 100) * size.w;
                const py = (s.y / 100) * size.h - 36;
                // Stagger pulse phase so the room doesn't pulse in unison.
                const delay = (i % 7) * 0.32;
                return (
                  <RippleDot
                    key={s.id}
                    x={px}
                    y={py}
                    phase={phase}
                    delay={delay}
                  />
                );
              })}

          {/* Bubble overlay — the dark terracotta dots are the ambassadors
              with authored stories. */}
          {size.w > 0 &&
            visibleSilhouettes
              .filter((s) => s.bubbleId)
              .map((s) => {
                const bubble = bubbleById.get(s.bubbleId!);
                if (!bubble) return null;
                const px = (s.x / 100) * size.w;
                const py = (s.y / 100) * size.h - 36;
                return (
                  <Bubble
                    key={bubble.id}
                    bubble={bubble}
                    x={px}
                    y={py}
                    phase={phase}
                    expanded={
                      hoveredBubbleId === bubble.id ||
                      highlightedFromWall === bubble.id
                    }
                    onEnter={() => setHoveredBubbleId(bubble.id)}
                    onLeave={() => setHoveredBubbleId(null)}
                  />
                );
              })}
        </div>

        <CafeFootnote />
      </div>
    </section>
  );
}

function CafeFootnote() {
  const { phase } = useTimeline();
  const phrase = (() => {
    switch (phase) {
      case "now":
        return "May 2026 — almost nothing exists yet. Five people, two open laptops.";
      case "q1":
        return "August 2026 — first wedges. Twelve voices. The corkboard has its first three pins.";
      case "q2":
        return "December 2026 — texture. Twenty-eight people, fourteen polaroids, the room reads as a community.";
      case "year1":
      case "future":
        return "April 2027 — fifty silhouettes, polaroids overflowing the corkboard. Three international voices, eighty percent still US. The geographic discipline made visible.";
    }
  })();

  return (
    <p className="mt-4 max-w-2xl font-body text-sm italic text-ink-soft">
      {phrase}
    </p>
  );
}
