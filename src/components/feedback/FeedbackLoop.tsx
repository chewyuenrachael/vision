"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTimeline } from "@/components/timeline/TimelineProvider";
import { FEEDBACK_LOOPS, MEDIAN_LATENCY_WEEKS } from "@/data/feedback-loops";
import { FeedbackCard } from "./FeedbackCard";
import { FeedbackArrow } from "./FeedbackArrow";
import { PHASE_INDEX } from "@/lib/phases";
import type { FeedbackLoop } from "@/lib/types";

interface CardRect {
  cx: number;
  cy: number;
  right: number;
  left: number;
  top: number;
  bottom: number;
}

function loopState(
  loop: FeedbackLoop,
  currentPhaseIndex: number,
): "before-intro" | "in-flight" | "shipped" {
  // The observation appears as soon as the author exists in the cafe; for
  // simplicity we tie it to one phase before arrival, except for q1-arrivals
  // which are born "in flight" at `now`.
  const arrives = PHASE_INDEX[loop.arrivesAt];
  if (currentPhaseIndex >= arrives) return "shipped";
  if (currentPhaseIndex >= arrives - 1) return "in-flight";
  return "before-intro";
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
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex items-baseline justify-between gap-6">
          <div>
            <div className="font-body text-xs uppercase tracking-[0.22em] text-ink-mute">
              Scene 4
            </div>
            <h2 className="mt-1 font-display text-3xl tracking-tight text-ink sm:text-4xl">
              The feedback loop
            </h2>
            <p className="mt-3 max-w-2xl font-body text-base text-ink-soft">
              From a TA in a lab to a shipped product change. No competitor has
              this loop because no competitor has these students.
            </p>
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
            const state = loopState(loop, phaseIndex);
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
                  <FeedbackCard loop={loop} side="left" state={state} />
                </div>
                {/* Spacer column for arrow on desktop */}
                <div className="hidden md:block" />
                <div
                  ref={(el) => {
                    rightRefs.current.set(loop.id, el);
                  }}
                  className="md:col-start-3"
                >
                  <FeedbackCard loop={loop} side="right" state={state} />
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
                const state = loopState(loop, phaseIndex);
                if (state === "before-intro") return null;
                return (
                  <FeedbackArrow
                    key={loop.id}
                    from={{ x: r.left.right + 8, y: r.left.cy }}
                    to={{ x: r.right.left - 8, y: r.right.cy }}
                    shipped={state === "shipped"}
                    latencyWeeks={loop.latencyWeeks}
                  />
                );
              })}
            </svg>
          )}
        </div>

        <p className="mt-10 max-w-3xl font-body text-sm italic text-ink-soft">
          Median latency from observation to shipped product change:{" "}
          <span className="not-italic font-medium text-ink">
            {MEDIAN_LATENCY_WEEKS} weeks
          </span>
          . The campus program is Cursor’s fastest product-feedback channel.
        </p>
      </div>
    </section>
  );
}
