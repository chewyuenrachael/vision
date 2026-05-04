"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTimeline } from "@/components/timeline/TimelineProvider";
import { COUNTERFACTUAL } from "@/data/counterfactual";
import { T_YEAR1 } from "@/lib/dates";
import { DivergingTimelines } from "./DivergingTimelines";
import { SceneTag } from "@/components/ui/SceneTag";

export function Counterfactual() {
  const { setExtended, t } = useTimeline();
  const sectionRef = useRef<HTMLElement | null>(null);

  // When this section enters the viewport, unlock extended slider range.
  useEffect(() => {
    if (!sectionRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setExtended(true);
          }
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, [setExtended]);

  const showDelta = t > T_YEAR1;

  return (
    <section
      ref={sectionRef}
      id="counterfactual"
      className="scene-snap relative w-full bg-ink px-4 py-20 text-cream"
    >
      <SceneTag variant="dark" />
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex items-baseline justify-between gap-6">
          <div>
            <div className="font-body text-xs uppercase tracking-[0.22em] text-cream/60">
              Closer
            </div>
            <h2 className="scene-title mt-1 text-3xl tracking-tight sm:text-4xl">
              The world we forfeit if we don’t
            </h2>
            <p className="mt-3 max-w-2xl font-body text-base text-cream/80">
              Drag past April 2027. The two timelines diverge. Same enterprise
              revenue. Different generation.
            </p>
          </div>
          <div className="hidden text-right font-body text-xs leading-tight text-cream/60 sm:block">
            <div>Slider extends to April 2030 here only.</div>
            <div className="mt-1">Press 5 to jump to the end.</div>
          </div>
        </div>

        <div className="mt-10 rounded-md border border-cream/10 bg-ink p-4 sm:p-6">
          <div className="aspect-[10/3.2] w-full">
            <DivergingTimelines />
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div>
            <div className="font-body text-[11px] uppercase tracking-[0.22em] text-terracotta">
              With · April 2030
            </div>
            <ul className="mt-3 space-y-2.5 font-body text-[15px] leading-relaxed text-cream/90">
              {COUNTERFACTUAL.with.map((line, i) => (
                <li key={i} className="flex gap-3">
                  <span className="select-none text-terracotta">·</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-body text-[11px] uppercase tracking-[0.22em] text-cream/60">
              Without · April 2030
            </div>
            <ul className="mt-3 space-y-2.5 font-body text-[15px] leading-relaxed text-cream/70">
              {COUNTERFACTUAL.without.map((line, i) => (
                <li key={i} className="flex gap-3">
                  <span className="select-none text-cream/40">·</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {showDelta && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-12 border-t border-cream/15 pt-8"
          >
            <p className="font-display text-[clamp(1.7rem,4vw,2.8rem)] leading-tight tracking-tight">
              {COUNTERFACTUAL.delta.headline}
            </p>
            <p className="mt-3 font-body text-sm uppercase tracking-[0.18em] text-cream/60">
              {COUNTERFACTUAL.delta.sub}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
