"use client";

import { useMemo, useState } from "react";
import { ThemedWeekCard } from "./ThemedWeekCard";
import { RecapModal } from "./RecapModal";
import { THEMED_WEEKS } from "@/data/themed-weeks";
import { useTimeline } from "@/components/timeline/TimelineProvider";
import { isVisibleAt } from "@/lib/phases";
import { dateFromT } from "@/lib/dates";
import type { ThemedWeek } from "@/lib/types";

function statusFor(
  week: ThemedWeek,
  current: Date,
): "upcoming" | "running" | "happened" {
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

  const cards = useMemo(() => {
    const current = dateFromT(t);
    return THEMED_WEEKS.map((w) => ({
      week: w,
      visible: isVisibleAt(w.firstVisibleAt, phase),
      status: statusFor(w, current),
    }));
  }, [phase, t]);

  return (
    <section
      id="themed-weeks"
      className="scene-snap relative isolate w-full bg-cream px-4 pb-20 pt-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex items-baseline justify-between gap-6">
          <div>
            <div className="font-body text-xs uppercase tracking-[0.22em] text-ink-mute">
              Scene 2
            </div>
            <h2 className="mt-1 font-display text-3xl tracking-tight text-ink sm:text-4xl">
              The themed week wall
            </h2>
            <p className="mt-3 max-w-2xl font-body text-base text-ink-soft">
              Twelve weeks. Each in a department where Cursor doesn’t
              naturally belong. Every week through March 2027 is at a US
              institution; Europe is a deliberate Q3 pilot, not a wish.
            </p>
          </div>
          <div className="hidden text-right font-body text-xs leading-tight text-ink-mute sm:block">
            <div>Click a wrapped week to read its recap.</div>
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
