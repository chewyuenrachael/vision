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
    <div className="relative rounded-md border border-ink/15 bg-cream p-4 shadow-[0_2px_6px_-2px_rgba(26,26,26,0.18)]">
      <div className="flex items-center justify-between border-b border-ink/10 pb-2">
        <div className="font-display text-sm tracking-tight text-ink">
          this week
        </div>
        <span className="font-body text-[10px] uppercase tracking-wider text-ink-mute">
          calendar
        </span>
      </div>
      <AnimatePresence mode="wait">
        <motion.ul key={phase} {...fade} className="mt-2 space-y-1.5">
          {data.calendar.map((c, i) => (
            <li
              key={i}
              className="flex gap-2 font-body text-[12px] leading-snug text-ink-soft"
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
    <div className="relative rounded-md border border-ink/15 bg-cream p-4 shadow-[0_2px_6px_-2px_rgba(26,26,26,0.18)]">
      <div className="flex items-center justify-between border-b border-ink/10 pb-2">
        <div className="font-display text-sm tracking-tight text-ink">
          slack
        </div>
        <span className="font-body text-[10px] uppercase tracking-wider text-ink-mute">
          {data.slack.length === 0
            ? "no channels yet"
            : `${data.slack.length} channels`}
        </span>
      </div>
      <AnimatePresence mode="wait">
        <motion.ul key={phase} {...fade} className="mt-2 space-y-2">
          {data.slack.map((s, i) => (
            <li
              key={i}
              className="flex items-start justify-between gap-3 border-b border-ink/5 pb-1.5 last:border-b-0"
            >
              <div className="min-w-0 flex-1">
                <div className="font-body text-[11px] uppercase tracking-wider text-ink">
                  {s.channel}
                </div>
                <div className="mt-0.5 truncate font-body text-[12px] text-ink-soft">
                  {s.preview}
                </div>
              </div>
              {s.unread > 0 && (
                <span className="rounded-full bg-terracotta px-1.5 py-0.5 font-body text-[10px] font-medium text-cream">
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
    <div className="relative rounded-md border border-ink/15 bg-cream-warm/70 p-4 shadow-[0_2px_6px_-2px_rgba(26,26,26,0.18)]">
      <div className="font-body text-[10px] uppercase tracking-[0.2em] text-ink-mute">
        on the desk
      </div>
      <AnimatePresence mode="wait">
        <motion.ul key={phase} {...fade} className="mt-2 space-y-1.5">
          {data.visible.map((v, i) => (
            <li
              key={i}
              className="flex gap-2 font-hand text-base leading-tight text-ink"
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
    <div className="grid gap-4">
      <CalendarCard />
      <SlackCard />
      <VisibleCard />
    </div>
  );
}
