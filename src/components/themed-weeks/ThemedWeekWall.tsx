"use client";

import { useMemo, useState } from "react";
import { ThemedWeekCard } from "./ThemedWeekCard";
import { RecapModal } from "./RecapModal";
import { THEMED_WEEKS } from "@/data/themed-weeks";
import { useTimeline } from "@/components/timeline/TimelineProvider";
import { isVisibleAt } from "@/lib/phases";
import { dateFromT } from "@/lib/dates";
import type { Phase, ThemedWeek } from "@/lib/types";
import { WALL_OUTCOMES_BY_PHASE } from "@/data/wall-outcomes";
import { SceneTag } from "@/components/ui/SceneTag";

function statusFor(
  week: ThemedWeek,
  current: Date,
  phase: Phase,
): "upcoming" | "running" | "happened" {
  if (week.id === "wetlab" && phase === "q2") return "running";
  const start = week.monthDate;
  const end = new Date(
    Date.UTC(
      start.getUTCFullYear(),
      start.getUTCMonth() + 1,
      0,
      23,
      59,
      59,
    ),
  );
  if (current < start) return "upcoming";
  if (current > end) return "happened";
  return "running";
}

export function ThemedWeekWall() {
  const { phase, t } = useTimeline();
  const [openWeek, setOpenWeek] = useState<ThemedWeek | null>(null);
  const wallStats = WALL_OUTCOMES_BY_PHASE[phase];

  const cards = useMemo(() => {
    const current = dateFromT(t);
    return THEMED_WEEKS.map((w) => ({
      week: w,
      visible: isVisibleAt(w.firstVisibleAt, phase),
      status: statusFor(w, current, phase),
    }));
  }, [phase, t]);

  return (
    <section
      id="themed-weeks"
      className="scene-snap relative isolate w-full bg-cream px-4 pb-20 pt-16"
    >
      <SceneTag />
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl flex-1">
            <div className="font-body text-xs uppercase tracking-[0.22em] text-ink-mute">
              Scene 2
            </div>
            <h2 className="scene-title mt-1 text-3xl tracking-tight text-ink sm:text-4xl">
              The themed week wall
            </h2>
            <p className="mt-3 max-w-2xl font-body text-base text-ink-soft">
              Twelve weeks. Each in a department where Cursor doesn’t
              naturally belong. Every week through March 2027 is at a US
              institution; Europe is a deliberate Q3 pilot, not a wish.
            </p>
          </div>
          <div className="w-full shrink-0 rounded-md border border-ink/15 bg-cream-cool/50 px-4 py-3 font-body text-sm leading-relaxed text-ink-soft sm:max-w-sm">
            <div className="font-body text-[10px] uppercase tracking-[0.2em] text-ink-mute">
              Wrapped weeks · cumulative proof
            </div>
            <p className="mt-2 text-[13px] text-ink">
              <span className="font-medium text-terracotta">
                {wallStats.wrappedWeeks} weeks wrapped
              </span>
              {" · "}
              {wallStats.studentsTouched.toLocaleString()} students touched
              {" · "}
              {wallStats.labDemos} lab demos run
              {" · "}
              {wallStats.feedbackRouted} product feedback items routed to
              engineering
              {" · "}
              {wallStats.ambassadorsDiscovered} cohort 1 ambassadors discovered
              through these weeks
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ week, visible, status }, i) =>
            visible ? (
              <ThemedWeekCard
                key={week.id}
                week={week}
                status={status}
                index={i}
                pulseHappening={
                  phase === "q2" &&
                  week.id === "wetlab" &&
                  status === "running"
                }
                onClick={() => setOpenWeek(week)}
              />
            ) : (
              <div
                key={week.id}
                aria-hidden
                className="rounded-md border border-dashed border-ink/15 bg-cream-cool/30 px-5 py-5 opacity-60"
                style={{ minHeight: 156 }}
              >
                <div className="font-body text-[10px] uppercase tracking-wider text-ink-mute">
                  reveals later
                </div>
                <div className="mt-2 font-display text-base text-ink-mute">
                  scheduled
                </div>
              </div>
            ),
          )}
        </div>

        <p className="mt-8 max-w-3xl font-body text-sm italic text-ink-soft">
          The grid being full is itself a message.
        </p>
      </div>

      <RecapModal week={openWeek} onClose={() => setOpenWeek(null)} />
    </section>
  );
}
