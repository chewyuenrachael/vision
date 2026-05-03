"use client";

import { useCallback, useEffect, useRef } from "react";
import { useTimeline } from "./TimelineProvider";
import { CANONICAL_STOPS } from "@/lib/phases";
import { T_MAX_EXTENDED, T_MAX_NORMAL } from "@/lib/dates";

/**
 * Sticky timeline slider — the spine. Custom-rendered (not native input) so we
 * can render labeled tick marks at the four canonical stops and a dashed
 * extension to April 2030 when extended mode is on.
 *
 * Keyboard ←/→/1/2/3/4 are wired in <TimelineProvider>.
 * Pointer drag updates t via RAF-batched setter.
 */

export function TimelineSlider() {
  const { t, setT, max, phase, phaseLabel, dateLabel, extended } = useTimeline();
  const railRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);

  const updateFromClientX = useCallback(
    (clientX: number) => {
      const rail = railRef.current;
      if (!rail) return;
      const rect = rail.getBoundingClientRect();
      const ratio = (clientX - rect.left) / rect.width;
      const next = Math.round(ratio * max);
      setT(next);
    },
    [max, setT],
  );

  useEffect(() => {
    function onMove(e: PointerEvent) {
      if (!draggingRef.current) return;
      updateFromClientX(e.clientX);
    }
    function onUp() {
      draggingRef.current = false;
    }
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [updateFromClientX]);

  const fillPct = (t / max) * 100;
  const normalRangePct = extended ? (T_MAX_NORMAL / T_MAX_EXTENDED) * 100 : 100;

  return (
    <div
      className="sticky top-0 z-50 border-b border-ink/10 bg-cream/85 backdrop-blur"
      role="region"
      aria-label="Vision timeline"
    >
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-4">
        <div className="hidden flex-shrink-0 items-baseline gap-2 sm:flex">
          <span className="font-display text-xl tracking-tight text-ink">
            Cursor Campus
          </span>
          <span className="font-hand text-base text-terracotta">vision</span>
        </div>

        <div className="flex flex-1 items-center gap-4">
          <div
            ref={railRef}
            className="group relative h-12 flex-1 cursor-pointer touch-none select-none"
            onPointerDown={(e) => {
              draggingRef.current = true;
              (e.currentTarget as HTMLDivElement).setPointerCapture(
                e.pointerId,
              );
              updateFromClientX(e.clientX);
            }}
            role="slider"
            tabIndex={0}
            aria-valuemin={0}
            aria-valuemax={max}
            aria-valuenow={t}
            aria-valuetext={`${phaseLabel} — ${dateLabel}`}
          >
            {/* Rail */}
            <div className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 bg-ink/15" />

            {/* Normal-range solid fill */}
            <div
              className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2 bg-ink/30"
              style={{ width: `${normalRangePct}%` }}
            />

            {/* Extended dashed segment when extended mode is on */}
            {extended && (
              <div
                className="absolute top-1/2 h-[2px] -translate-y-1/2 bg-[length:8px_2px] bg-repeat-x opacity-50"
                style={{
                  left: `${normalRangePct}%`,
                  right: 0,
                  backgroundImage:
                    "linear-gradient(to right, var(--color-ink) 50%, transparent 50%)",
                }}
              />
            )}

            {/* Filled progress in terracotta */}
            <div
              className="absolute left-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-terracotta"
              style={{ width: `${fillPct}%` }}
            />

            {/* Canonical tick marks. When extended, only Now/+360 labels show
                to prevent collision; +90/+180 stay as unlabeled ticks. */}
            {CANONICAL_STOPS.map((stop) => {
              const stopPct = (stop.t / max) * 100;
              const isActive = phase === stop.phase;
              const isPassed = t >= stop.t;
              const showLabel =
                !extended ||
                stop.phase === "now" ||
                stop.phase === "year1" ||
                isActive;
              return (
                <div
                  key={stop.phase}
                  className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${stopPct}%` }}
                >
                  <div
                    className={`h-3 w-3 rounded-full border-2 transition-colors ${
                      isActive
                        ? "border-terracotta bg-terracotta"
                        : isPassed
                          ? "border-terracotta bg-cream"
                          : "border-ink/30 bg-cream"
                    }`}
                  />
                  {showLabel && (
                    <div
                      className={`absolute left-1/2 mt-1.5 -translate-x-1/2 whitespace-nowrap font-body text-[11px] uppercase tracking-wider ${
                        isActive ? "text-terracotta" : "text-ink-mute"
                      }`}
                    >
                      {stop.label}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Extended end-marker for April 2030 */}
            {extended && (
              <div
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ left: "100%" }}
              >
                <div
                  className={`h-3 w-3 rotate-45 border-2 ${
                    t >= T_MAX_EXTENDED
                      ? "border-terracotta bg-terracotta"
                      : "border-ink/30 bg-cream"
                  }`}
                />
                <div className="absolute left-1/2 mt-1.5 -translate-x-1/2 whitespace-nowrap font-body text-[11px] uppercase tracking-wider text-ink-mute">
                  Apr 2030
                </div>
              </div>
            )}

            {/* Thumb */}
            <div
              className="pointer-events-none absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${fillPct}%` }}
            >
              <div className="flex flex-col items-center">
                <div className="h-5 w-5 rounded-full border-2 border-terracotta bg-cream shadow-[0_2px_8px_rgba(196,100,74,0.35)]" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-shrink-0 flex-col items-end leading-tight">
          <div className="font-display text-base tracking-tight text-ink">
            {dateLabel}
          </div>
          <div className="font-body text-[11px] uppercase tracking-widest text-ink-mute">
            {phaseLabel}
          </div>
        </div>
      </div>
    </div>
  );
}
