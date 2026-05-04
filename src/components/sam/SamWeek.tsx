"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTimeline } from "@/components/timeline/TimelineProvider";
import { SAM_PHASES } from "@/data/sam-phases";
import { SamPanel } from "./SamPanel";
import { SamArtifacts } from "./SamArtifacts";
import { PaperTexture } from "@/components/ui/PaperTexture";
import { SceneTag } from "@/components/ui/SceneTag";

const SAM_TICKER =
  "Maya (MIT) is also running Cursor × ML this week → Theo (Cornell) just shipped his Cohort 1 first event → Sofia (UCSF) converted 8 bio grad students yesterday → ";

function SelfServeLibraryStamp() {
  return (
    <div className="mt-4 rounded-md border border-ink/12 bg-cream/90 px-4 py-3">
      <p className="font-body text-sm leading-snug text-ink-soft">
        Sam ran this week without me. The{" "}
        <span className="font-medium text-ink">Self-Serve Library</span> template
        is what made it possible.
      </p>
      <div className="mt-3 flex items-center gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-terracotta/35 bg-terracotta/10 text-terracotta"
          aria-hidden
        >
          {/* Book glyph — paired with Beacon “signal” geometry */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 6.5c-1.2-.9-2.8-1.4-4.5-1.4C5 5.1 3 6.2 3 8v10.5c1.3-.8 3-.1 4.5.2 1.8.4 3.5 0 4.5-.9V7.4c-.9-.5-2-.9-3.2-.9-1 0-2 .2-2.8.6"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 6.5c1.2-.9 2.8-1.4 4.5-1.4C19 5.1 21 6.2 21 8v10.5c-1.3-.8-3-.1-4.5.2-1.8.4-3.5 0-4.5-.9V7.4c.9-.5 2-.9 3.2-.9 1 0 2 .2 2.8.6"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <div className="font-display text-sm text-ink">Self-Serve Library</div>
          <div className="mt-0.5 font-body text-[11px] text-ink-mute">
            v1.2 · 8 playbooks · 30% ambassador-contributed · accessed by Sam 14
            times this week
          </div>
        </div>
      </div>
    </div>
  );
}

function CohortTicker() {
  return (
    <div className="mt-4 overflow-hidden border-t border-ink/10 pt-3">
      <div className="font-body text-[11px] uppercase tracking-[0.12em] text-ink-mute">
        Same week · 45-person cohort
      </div>
      <div className="relative mt-2 overflow-hidden">
        <div className="sam-ticker-track flex w-max">
          <span className="whitespace-nowrap pr-20 font-body text-[12px] text-ink-soft">
            {SAM_TICKER}
          </span>
          <span className="whitespace-nowrap pr-20 font-body text-[12px] text-ink-soft">
            {SAM_TICKER}
          </span>
        </div>
      </div>
    </div>
  );
}

export function SamWeek() {
  const { phase } = useTimeline();
  const data = SAM_PHASES[phase];
  const showTicker = phase === "q2" || phase === "year1" || phase === "future";

  return (
    <section
      id="sam"
      className="scene-snap relative isolate w-full bg-cream-warm/60 px-4 py-20"
    >
      <PaperTexture opacity={0.05} />
      <SceneTag />

      <div className="relative mx-auto w-full max-w-7xl">
        <div className="flex items-baseline justify-between gap-6">
          <div>
            <div className="font-body text-xs uppercase tracking-[0.22em] text-ink-mute">
              Scene 3
            </div>
            <h2 className="scene-title mt-1 text-3xl tracking-tight text-ink sm:text-4xl">
              A day in Sam’s week
            </h2>
            <p className="mt-3 max-w-2xl font-body text-base text-ink-soft">
              Sophomore at CMU. First Cohort 1 ambassador. His face stays
              constant. The world around him compounds.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[5fr_4fr]">
          <div className="relative">
            <div className="relative overflow-hidden rounded-md border border-ink/15 bg-cream shadow-[0_8px_24px_-12px_rgba(26,26,26,0.25)]">
              <div className="aspect-[6/7] w-full">
                <SamPanel phase={phase} />
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={phase}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.32 }}
                  className="border-t border-ink/10 px-5 py-4"
                >
                  <div className="font-body text-[10px] uppercase tracking-[0.22em] text-ink-mute">
                    setting
                  </div>
                  <p className="mt-1 font-body text-sm text-ink-soft">
                    {data.setting}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              <motion.p
                key={phase}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.32 }}
                className="mt-4 max-w-xl font-display text-base italic leading-snug text-ink-soft sm:text-lg"
              >
                {data.caption}
              </motion.p>
            </AnimatePresence>

            {phase === "q2" ? <SelfServeLibraryStamp /> : null}
            {showTicker ? <CohortTicker /> : null}
          </div>

          <SamArtifacts />
        </div>
      </div>
    </section>
  );
}
