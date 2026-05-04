"use client";

import { motion } from "framer-motion";
import type { ThemedWeek } from "@/lib/types";

type Status = "upcoming" | "running" | "happened";

interface Props {
  week: ThemedWeek;
  status: Status;
  onClick: () => void;
  index: number;
  pulseHappening?: boolean;
}

export function ThemedWeekCard({
  week,
  status,
  onClick,
  index,
  pulseHappening = false,
}: Props) {
  const isClickable = status === "happened";
  const rotation = ((index * 37) % 5) - 2;

  const styles = (() => {
    switch (status) {
      case "upcoming":
        return {
          bg: "bg-cream-warm/60",
          border: "border-ink/15",
          accent: "text-ink-mute",
          tag: "scheduled",
          tagClass: "border-ink/15 bg-cream text-ink-mute",
        };
      case "running":
        return {
          bg: "bg-terracotta/10",
          border: "border-terracotta/40",
          accent: "text-terracotta",
          tag: "happening now",
          tagClass:
            "border-terracotta/30 bg-terracotta text-cream",
        };
      case "happened":
        return {
          bg: "bg-cream",
          border: "border-ink/20",
          accent: "text-ink-soft",
          tag: "✓ wrapped",
          tagClass: "border-ink/20 bg-cream-warm text-ink-soft",
        };
    }
  })();

  return (
    <motion.button
      type="button"
      onClick={isClickable ? onClick : undefined}
      disabled={!isClickable}
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0, rotate: rotation }}
      transition={{ duration: 0.35, delay: index * 0.02 }}
      whileHover={isClickable ? { y: -4, rotate: rotation } : undefined}
      className={`group relative flex h-full flex-col items-start gap-3 rounded-md border ${styles.border} ${styles.bg} px-5 py-5 text-left transition-shadow ${
        pulseHappening ? "happening-now-pulse " : ""
      }${
        isClickable
          ? "cursor-pointer shadow-[0_2px_6px_-2px_rgba(26,26,26,0.18)] hover:shadow-[0_12px_28px_-12px_rgba(26,26,26,0.4)]"
          : "shadow-[0_1px_3px_-1px_rgba(26,26,26,0.12)]"
      }`}
      style={{ minHeight: 156 }}
      aria-label={`${week.title} at ${week.location}, ${status}`}
    >
      {/* Push pin */}
      <div className="absolute left-4 top-0 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-pin shadow-[0_1px_2px_rgba(26,26,26,0.4)]" />

      <div className="flex w-full items-center justify-between gap-2">
        <span
          className={`rounded-full border px-2 py-0.5 font-body text-[10px] uppercase tracking-wider ${styles.tagClass}`}
        >
          {styles.tag}
        </span>
        <span className="font-body text-[10px] uppercase tracking-wider text-ink-mute">
          #{week.number.toString().padStart(2, "0")}
        </span>
      </div>

      <div>
        <h3 className="font-display text-xl leading-tight tracking-tight text-ink">
          {week.title}
        </h3>
        <div className={`mt-1 font-body text-xs ${styles.accent}`}>
          {week.location}
        </div>
      </div>

      <div className="mt-auto font-body text-xs uppercase tracking-wider text-ink-mute">
        {week.monthLabel}
      </div>

      {isClickable && (
        <div className="mt-1 font-hand text-base text-terracotta opacity-0 transition-opacity group-hover:opacity-100">
          read recap →
        </div>
      )}
    </motion.button>
  );
}
