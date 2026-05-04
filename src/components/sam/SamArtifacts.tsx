"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTimeline } from "@/components/timeline/TimelineProvider";
import { SAM_PHASES } from "@/data/sam-phases";

const fade = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
  transition: { duration: 0.32, ease: [0.2, 0.8, 0.2, 1] as const },
};

function CalendarCard() {
  const { phase } = useTimeline();
  const data = SAM_PHASES[phase];
  return (
    <div className="relative rounded-md border border-ink/15 bg-cream p-5 shadow-[0_2px_6px_-2px_rgba(26,26,26,0.18)] sm:p-6">
      <div className="flex items-center justify-between border-b border-ink/10 pb-3">
        <div className="font-display text-lg tracking-tight text-ink sm:text-xl">
          this week
        </div>
        <span className="font-body text-xs uppercase tracking-wider text-ink-mute sm:text-sm">
          calendar
        </span>
      </div>
      <AnimatePresence mode="wait">
        <motion.ul key={phase} {...fade} className="mt-3 space-y-2 sm:space-y-2.5">
          {data.calendar.map((c, i) => (
            <li
              key={i}
              className="flex gap-2.5 font-body text-base leading-relaxed text-ink-soft sm:text-[17px]"
            >
              <span className="select-none text-terracotta">·</span>
              <span>{c}</span>
            </li>
          ))}
        </motion.ul>
      </AnimatePresence>
    </div>
  );
}

function SlackCard() {
  const { phase } = useTimeline();
  const data = SAM_PHASES[phase];
  return (
    <div className="relative rounded-md border border-ink/15 bg-cream p-5 shadow-[0_2px_6px_-2px_rgba(26,26,26,0.18)] sm:p-6">
      <div className="flex items-center justify-between border-b border-ink/10 pb-3">
        <div className="font-display text-lg tracking-tight text-ink sm:text-xl">
          slack
        </div>
        <span className="font-body text-xs uppercase tracking-wider text-ink-mute sm:text-sm">
          {data.slack.length === 0
            ? "no channels yet"
            : `${data.slack.length} channels`}
        </span>
      </div>
      <AnimatePresence mode="wait">
        <motion.ul key={phase} {...fade} className="mt-3 space-y-3">
          {data.slack.map((s, i) => (
            <li
              key={i}
              className="flex items-start justify-between gap-3 border-b border-ink/5 pb-2.5 last:border-b-0"
            >
              <div className="min-w-0 flex-1">
                <div className="font-body text-sm font-medium uppercase tracking-wider text-ink sm:text-base">
                  {s.channel}
                </div>
                <div className="mt-1 line-clamp-2 font-body text-base leading-snug text-ink-soft sm:text-[17px]">
                  {s.preview}
                </div>
              </div>
              {s.unread > 0 && (
                <span className="shrink-0 rounded-full bg-terracotta px-2 py-0.5 font-body text-xs font-medium text-cream sm:text-sm">
                  {s.unread}
                </span>
              )}
            </li>
          ))}
        </motion.ul>
      </AnimatePresence>
    </div>
  );
}

function VisibleCard() {
  const { phase } = useTimeline();
  const data = SAM_PHASES[phase];
  return (
    <div className="relative rounded-md border border-ink/15 bg-cream-warm/70 p-5 shadow-[0_2px_6px_-2px_rgba(26,26,26,0.18)] sm:p-6">
      <div className="font-body text-xs uppercase tracking-[0.2em] text-ink-mute sm:text-sm">
        on the desk
      </div>
      <AnimatePresence mode="wait">
        <motion.ul key={phase} {...fade} className="mt-3 space-y-2">
          {data.visible.map((v, i) => (
            <li
              key={i}
              className="flex gap-2.5 font-hand text-lg leading-snug text-ink sm:text-xl"
            >
              <span className="select-none text-terracotta">·</span>
              <span>{v}</span>
            </li>
          ))}
        </motion.ul>
      </AnimatePresence>
    </div>
  );
}

export function SamArtifacts() {
  return (
    <div className="grid gap-5 sm:gap-6">
      <CalendarCard />
      <SlackCard />
      <VisibleCard />
    </div>
  );
}
