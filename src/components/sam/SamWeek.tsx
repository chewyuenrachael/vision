"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTimeline } from "@/components/timeline/TimelineProvider";
import { SAM_PHASES } from "@/data/sam-phases";
import { SamPanel } from "./SamPanel";
import { SamArtifacts } from "./SamArtifacts";
import { PaperTexture } from "@/components/ui/PaperTexture";

export function SamWeek() {
  const { phase } = useTimeline();
  const data = SAM_PHASES[phase];

  return (
    <section
      id="sam"
      className="scene-snap relative isolate w-full bg-cream-warm/60 px-4 py-20"
    >
      <PaperTexture opacity={0.05} />

      <div className="relative mx-auto w-full max-w-7xl">
        <div className="flex items-baseline justify-between gap-6">
          <div>
            <div className="font-body text-xs uppercase tracking-[0.22em] text-ink-mute">
              Scene 3
            </div>
            <h2 className="mt-1 font-display text-3xl tracking-tight text-ink sm:text-4xl">
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
          </div>

          <SamArtifacts />
        </div>
      </div>
    </section>
  );
}
