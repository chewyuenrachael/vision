"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTimeline } from "@/components/timeline/TimelineProvider";
import { CAFE_SILHOUETTES } from "@/data/cafe-silhouettes";
import { CAFE_BUBBLES } from "@/data/cafe-bubbles";
import {
  CAFE_ADVOCATE_DOTS,
  CAFE_AMBASSADOR_DOTS,
  CAFE_PROPAGATION,
} from "@/data/cafe-density";
import { SURFACED_ADVOCATES_BY_PHASE } from "@/data/chalkboard-stats";
import { isVisibleAt, PHASE_INDEX } from "@/lib/phases";
import type { Phase } from "@/lib/types";
import { Silhouette } from "./Silhouette";
import { Bubble } from "./Bubble";
import { Corkboard } from "./Corkboard";
import { CafeBackground } from "./CafeBackground";
import { PaperTexture } from "@/components/ui/PaperTexture";
import { SceneTag } from "@/components/ui/SceneTag";

const VIEWBOX_W = 1000;
const VIEWBOX_H = 700;
const DOT_OFFSET_PX = 36;

function buzzFor(phase: Phase) {
  const i = PHASE_INDEX[phase];
  return {
    duration: 4.4 - Math.min(i, 3) * 0.55,
    opacity: 0.35 + Math.min(i, 3) * 0.12,
    expand: 1.6 + Math.min(i, 3) * 0.18,
  };
}

function ambassadorDotVisible(phase: Phase, dot: (typeof CAFE_AMBASSADOR_DOTS)[number]): boolean {
  return isVisibleAt(dot.firstVisibleAt, phase);
}

export function Cafe() {
  const { phase } = useTimeline();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [hoveredBubbleId, setHoveredBubbleId] = useState<string | null>(null);
  const [highlightedFromWall, setHighlightedFromWall] = useState<string | null>(
    null,
  );
  const [hoveredAdvocateId, setHoveredAdvocateId] = useState<string | null>(
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

  const bubbleById = useMemo(() => {
    const map = new Map<string, (typeof CAFE_BUBBLES)[number]>();
    for (const b of CAFE_BUBBLES) map.set(b.id, b);
    return map;
  }, []);

  const visibleSilhouettes = useMemo(
    () => CAFE_SILHOUETTES.filter((s) => isVisibleAt(s.firstVisibleAt, phase)),
    [phase],
  );

  const visibleAmbassadorDots = useMemo(
    () =>
      CAFE_AMBASSADOR_DOTS.filter((d) => ambassadorDotVisible(phase, d)),
    [phase],
  );

  const visibleAdvocates = useMemo(
    () =>
      CAFE_ADVOCATE_DOTS.filter((d) => isVisibleAt(d.firstVisibleAt, phase)),
    [phase],
  );

  const adotById = useMemo(() => {
    const m = new Map<string, (typeof CAFE_AMBASSADOR_DOTS)[number]>();
    for (const d of CAFE_AMBASSADOR_DOTS) m.set(d.id, d);
    return m;
  }, []);

  const advocateById = useMemo(() => {
    const m = new Map<string, (typeof CAFE_ADVOCATE_DOTS)[number]>();
    for (const d of CAFE_ADVOCATE_DOTS) m.set(d.id, d);
    return m;
  }, []);

  const highlightedBubbleId = hoveredBubbleId ?? highlightedFromWall;

  const activePropagation = useMemo(() => {
    if (!highlightedBubbleId) return new Set<string>();
    const edgeKeys = new Set<string>();
    for (const e of CAFE_PROPAGATION) {
      const from = adotById.get(e.fromAdotId);
      if (from?.bubbleId === highlightedBubbleId) {
        edgeKeys.add(`${e.fromAdotId}-${e.toAdvocateId}`);
      }
    }
    return edgeKeys;
  }, [highlightedBubbleId, adotById]);

  const showArcs = phase !== "now";

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
        if (Math.abs(a.x - b.x) <= 6 && Math.abs(a.y - b.y) <= 4) {
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

  const surfacedCount = SURFACED_ADVOCATES_BY_PHASE[phase];

  return (
    <section
      id="cafe"
      className="scene-snap relative isolate w-full overflow-hidden border-y border-ink/10"
      style={{ background: "var(--atmosphere)" }}
    >
      <PaperTexture opacity={0.07} />
      <SceneTag />

      <div className="relative mx-auto w-full max-w-7xl px-4 pt-8 sm:pt-10">
        <div className="flex items-baseline justify-between gap-6">
          <div>
            <div className="font-body text-xs uppercase tracking-[0.22em] text-ink-mute">
              Scene 1
            </div>
            <h2 className="scene-title mt-1 text-3xl tracking-tight text-ink sm:text-4xl">
              Cafe Cursor
            </h2>
          </div>
          <div className="hidden max-w-xs text-right font-body text-[11px] leading-snug text-ink-mute sm:block">
            <div className="flex flex-col items-end gap-1">
              <div>
                <span className="inline-block h-2 w-2 translate-y-[-1px] rounded-full bg-terracotta align-middle" />{" "}
                Solid terracotta — Cohort 1 ambassador
              </div>
              <div>
                <span
                  className="inline-block h-2 w-2 translate-y-[-1px] rounded-full bg-terracotta align-middle"
                  style={{ opacity: 0.25 }}
                />{" "}
                Light terracotta — Soon-to-be Cursor advocate (caught at this
                cafe, converted within 30 days)
              </div>
            </div>
            <div className="mt-2">
              Hover an ambassador or advocate. Hover a polaroid to find its
              author.
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-10 pt-4 sm:pb-14">
        <div
          ref={containerRef}
          className="relative aspect-[10/7] w-full overflow-hidden rounded-md border border-ink/15 bg-cream-warm shadow-[inset_0_0_60px_rgba(26,26,26,0.05)]"
        >
          {/* Chalkboard — HTML overlay, back wall right */}
          <div
            className="pointer-events-none absolute right-[4%] top-[4%] z-[5] w-[28%] max-w-[220px] rounded-sm border border-ink/25 bg-paper/95 px-2.5 py-2 shadow-[inset_0_0_0_1px_rgba(26,26,26,0.06)]"
            aria-hidden
          >
            <p className="font-hand text-[11px] leading-snug text-ink sm:text-xs">
              Cohort 1 — 45 ambassadors · 18 schools · Aug 2026
            </p>
            <p className="mt-1 font-hand text-[9px] leading-snug text-ink-soft sm:text-[10px]">
              Soon-to-be advocates surfaced this month: {surfacedCount}
            </p>
          </div>

          <CafeBackground>
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
            {CAFE_PROPAGATION.map((e, i) => {
              const a = adotById.get(e.fromAdotId);
              const v = advocateById.get(e.toAdvocateId);
              if (!a || !v) return null;
              if (!ambassadorDotVisible(phase, a)) return null;
              if (!isVisibleAt(v.firstVisibleAt, phase)) return null;
              const x1 = (a.x / 100) * VIEWBOX_W;
              const y1 = (a.y / 100) * VIEWBOX_H - 24;
              const x2 = (v.x / 100) * VIEWBOX_W;
              const y2 = (v.y / 100) * VIEWBOX_H - 20;
              const lit = activePropagation.has(
                `${e.fromAdotId}-${e.toAdvocateId}`,
              );
              return (
                <path
                  key={i}
                  d={`M ${x1} ${y1} Q ${(x1 + x2) / 2} ${(y1 + y2) / 2 - 28} ${x2} ${y2}`}
                  stroke="var(--color-terracotta)"
                  strokeWidth={lit ? 1.2 : 0.9}
                  strokeDasharray="3 5"
                  fill="none"
                  opacity={lit ? 0.75 : 0.3}
                />
              );
            })}
            {CAFE_SILHOUETTES.map((s) => (
              <Silhouette
                key={s.id}
                silhouette={s}
                width={VIEWBOX_W}
                height={VIEWBOX_H}
                visible={isVisibleAt(s.firstVisibleAt, phase)}
                highlight={
                  s.bubbleId !== undefined &&
                  s.bubbleId === highlightedBubbleId
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

          <Corkboard
            highlightedBubbleId={highlightedBubbleId}
            setHighlightedBubbleId={setHighlightedFromWall}
          />

          {size.w > 0 &&
            visibleAmbassadorDots
              .filter((d) => !d.bubbleId)
              .map((d, i) => {
                const px = (d.x / 100) * size.w;
                const py = (d.y / 100) * size.h - DOT_OFFSET_PX;
                const { duration, opacity, expand } = buzzFor(phase);
                return (
                  <div
                    key={d.id}
                    className="pointer-events-none absolute z-10"
                    style={{
                      left: px,
                      top: py,
                      transform: "translate(-50%, -50%)",
                    }}
                    aria-hidden
                  >
                    <div className="relative h-2 w-2">
                      <div className="absolute inset-0 rounded-full bg-terracotta" />
                      <motion.span
                        className="absolute inset-0 rounded-full bg-terracotta"
                        animate={{
                          scale: [1, expand * 0.85, 1],
                          opacity: [opacity, 0, opacity],
                        }}
                        transition={{
                          duration,
                          repeat: Infinity,
                          ease: "easeOut",
                          delay: (i % 7) * 0.32,
                        }}
                      />
                    </div>
                  </div>
                );
              })}

          {size.w > 0 &&
            visibleAdvocates.map((adv) => {
              const px = (adv.x / 100) * size.w;
              const py = (adv.y / 100) * size.h - DOT_OFFSET_PX;
              const pulsed = [...activePropagation].some((k) =>
                k.endsWith(`-${adv.id}`),
              );
              return (
                <div
                  key={adv.id}
                  className="absolute"
                  style={{
                    left: px,
                    top: py,
                    transform: "translate(-50%, -50%)",
                    zIndex: 15,
                  }}
                >
                  <motion.div
                    className="pointer-events-auto relative"
                    animate={pulsed ? { scale: [1, 1.25, 1] } : { scale: 1 }}
                    transition={
                      pulsed
                        ? { duration: 0.9, repeat: Infinity, ease: "easeInOut" }
                        : undefined
                    }
                    onPointerEnter={() => setHoveredAdvocateId(adv.id)}
                    onPointerLeave={() => setHoveredAdvocateId(null)}
                  >
                    <div
                      className="h-2 w-2 cursor-default rounded-full bg-terracotta"
                      style={{ opacity: 0.25 }}
                    />
                    {hoveredAdvocateId === adv.id && (
                      <div className="absolute bottom-full left-1/2 z-40 mb-2 w-64 -translate-x-1/2 rounded-md border border-ink/15 bg-cream p-3 shadow-lg">
                        <p className="font-body text-xs leading-relaxed text-ink-soft">
                          {adv.hoverLine}
                        </p>
                      </div>
                    )}
                  </motion.div>
                </div>
              );
            })}

          {size.w > 0 &&
            visibleAmbassadorDots
              .filter((d) => d.bubbleId)
              .map((d) => {
                const bubble = bubbleById.get(d.bubbleId!);
                if (!bubble) return null;
                const px = (d.x / 100) * size.w;
                const py = (d.y / 100) * size.h - DOT_OFFSET_PX;
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
