"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTimeline } from "@/components/timeline/TimelineProvider";
import { FEEDBACK_LOOPS } from "@/data/feedback-loops";
import { FeedbackCard } from "./FeedbackCard";
import { FeedbackArrow } from "./FeedbackArrow";
import { SceneTag } from "@/components/ui/SceneTag";
import { PHASE_INDEX } from "@/lib/phases";
import type { FeedbackLoop } from "@/lib/types";

function cardStates(
  loop: FeedbackLoop,
  currentPhaseIndex: number,
): { left: "before-intro" | "in-flight" | "shipped"; right: "before-intro" | "in-flight" | "shipped" } {
  const arrives = PHASE_INDEX[loop.arrivesAt];
  const leftBefore = currentPhaseIndex < arrives - 1;
  const left: "before-intro" | "in-flight" | "shipped" = leftBefore
    ? "before-intro"
    : currentPhaseIndex >= arrives
      ? "shipped"
      : "in-flight";
  let right: "before-intro" | "in-flight" | "shipped";
  if (currentPhaseIndex < arrives - 1) right = "before-intro";
  else if (currentPhaseIndex >= arrives && !loop.productPending)
    right = "shipped";
  else right = "in-flight";
  return { left, right };
}

interface CardRect {
  cx: number;
  cy: number;
  right: number;
  left: number;
  top: number;
  bottom: number;
}

export function FeedbackLoopScene() {
  const { phase } = useTimeline();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const leftRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());
  const rightRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [rects, setRects] = useState<
    Map<string, { left: CardRect; right: CardRect }>
  >(new Map());

  const phaseIndex = PHASE_INDEX[phase];

  useLayoutEffect(() => {
    function measure() {
      if (!containerRef.current) return;
      const cRect = containerRef.current.getBoundingClientRect();
      setSize({ w: cRect.width, h: cRect.height });
      const next = new Map<
        string,
        { left: CardRect; right: CardRect }
      >();
      for (const loop of FEEDBACK_LOOPS) {
        const lEl = leftRefs.current.get(loop.id);
        const rEl = rightRefs.current.get(loop.id);
        if (!lEl || !rEl) continue;
        const l = lEl.getBoundingClientRect();
        const r = rEl.getBoundingClientRect();
        next.set(loop.id, {
          left: {
            cx: l.right - cRect.left,
            cy: l.top + l.height / 2 - cRect.top,
            right: l.right - cRect.left,
            left: l.left - cRect.left,
            top: l.top - cRect.top,
            bottom: l.bottom - cRect.top,
          },
          right: {
            cx: r.left - cRect.left,
            cy: r.top + r.height / 2 - cRect.top,
            right: r.right - cRect.left,
            left: r.left - cRect.left,
            top: r.top - cRect.top,
            bottom: r.bottom - cRect.top,
          },
        });
      }
      setRects(next);
    }
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [phase]);

  // Recompute on font load shifts
  useEffect(() => {
    const id = setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 250);
    return () => clearTimeout(id);
  }, []);

  return (
    <section
      id="feedback"
      className="scene-snap relative w-full bg-cream px-4 py-20"
    >
      <SceneTag />
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="font-body text-xs uppercase tracking-[0.22em] text-ink-mute">
              Scene 4
            </div>
            <h2 className="scene-title mt-1 text-3xl tracking-tight text-ink sm:text-4xl">
              The feedback loop
            </h2>
            <p className="mt-3 max-w-2xl font-body text-base text-ink-soft">
              From a TA in a lab to a shipped product change. No competitor has
              this loop because no competitor has these students.
            </p>
          </div>
          <div className="max-w-md rounded-md border border-terracotta/25 bg-terracotta/[0.06] px-4 py-3 font-body text-sm leading-snug text-ink-soft">
            <span className="font-medium text-ink">Median: 8.2 weeks</span> from
            observation to shipped change.{" "}
            <span className="text-ink">
              Anthropic&apos;s median: unmeasurable — they don&apos;t have this
              data structure.
            </span>
          </div>
        </div>

        <div
          ref={containerRef}
          className="relative mt-10 grid grid-cols-1 items-stretch gap-x-6 gap-y-4 md:grid-cols-[1fr_120px_1fr] md:gap-y-6"
        >
          {/* Column headers */}
          <div className="font-body text-[11px] uppercase tracking-[0.22em] text-ink-mute md:col-start-1">
            From the ground
          </div>
          <div className="hidden md:block" />
          <div className="font-body text-[11px] uppercase tracking-[0.22em] text-ink-mute md:col-start-3">
            Into the product
          </div>

          {FEEDBACK_LOOPS.map((loop) => {
            const { left, right } = cardStates(loop, phaseIndex);
            return (
              <div
                key={loop.id}
                className="contents"
              >
                <div
                  ref={(el) => {
                    leftRefs.current.set(loop.id, el);
                  }}
                  className="md:col-start-1"
                >
                  <FeedbackCard loop={loop} side="left" state={left} />
                </div>
                {/* Spacer column for arrow on desktop */}
                <div className="hidden md:block" />
                <div
                  ref={(el) => {
                    rightRefs.current.set(loop.id, el);
                  }}
                  className="md:col-start-3"
                >
                  <FeedbackCard loop={loop} side="right" state={right} />
                </div>
              </div>
            );
          })}

          {/* Arrows overlay (desktop only) */}
          {size.w > 0 && (
            <svg
              className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
              viewBox={`0 0 ${size.w} ${size.h}`}
            >
              {FEEDBACK_LOOPS.map((loop) => {
                const r = rects.get(loop.id);
                if (!r) return null;
                const { left, right } = cardStates(loop, phaseIndex);
                if (left === "before-intro" || right === "before-intro")
                  return null;
                return (
                  <FeedbackArrow
                    key={loop.id}
                    from={{ x: r.left.right + 8, y: r.left.cy }}
                    to={{ x: r.right.left - 8, y: r.right.cy }}
                    shipped={right === "shipped"}
                    latencyWeeks={loop.latencyWeeks}
                  />
                );
              })}
            </svg>
          )}
        </div>

        <p className="mt-10 max-w-3xl font-body text-sm italic text-ink-soft">
          The campus program is Cursor&apos;s fastest product-feedback channel —
          because every row above is reconstructible from Beacon&apos;s
          append-only log.
        </p>
      </div>
    </section>
  );
}
