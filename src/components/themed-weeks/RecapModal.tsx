"use client";

import { Modal } from "@/components/ui/Modal";
import { Sketch } from "@/components/cafe/sketches";
import { recapForWeekId } from "@/data/themed-week-recaps";
import type { ThemedWeek } from "@/lib/types";

interface Props {
  week: ThemedWeek | null;
  onClose: () => void;
}

export function RecapModal({ week, onClose }: Props) {
  const recap = week ? recapForWeekId(week.id) : null;
  const open = Boolean(week && recap);
  const titleId = "recap-title";

  return (
    <Modal open={open} onClose={onClose} labelledBy={titleId}>
      {week && recap ? (
        <div>
          <div className="flex items-baseline justify-between gap-4 border-b border-ink/10 pb-4">
            <div>
              <div className="font-body text-[10px] uppercase tracking-[0.22em] text-ink-mute">
                Recap · #{week.number.toString().padStart(2, "0")}
              </div>
              <h3
                id={titleId}
                className="mt-1 font-display text-3xl tracking-tight text-ink"
              >
                {week.title}
              </h3>
              <div className="mt-1 font-body text-sm text-ink-soft">
                {week.location} · {week.monthLabel}
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close recap"
              className="rounded-full border border-ink/20 px-3 py-1 font-body text-xs text-ink-soft hover:bg-ink hover:text-cream"
            >
              close
            </button>
          </div>

          <div className="mt-5 grid gap-6 sm:grid-cols-[1.4fr_1fr]">
            <div>
              <div>
                <div className="font-body text-[10px] uppercase tracking-[0.18em] text-ink-mute">
                  Partners
                </div>
                <div className="mt-1 font-body text-sm text-ink-soft">
                  {recap.partners.join(" · ")}
                </div>
              </div>

              <div className="mt-5">
                <div className="font-body text-[10px] uppercase tracking-[0.18em] text-ink-mute">
                  By the numbers
                </div>
                <ul className="mt-2 space-y-1.5 font-body text-sm text-ink-soft">
                  {recap.stats.map((s, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="select-none text-terracotta">·</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5">
                <div className="font-body text-[10px] uppercase tracking-[0.18em] text-ink-mute">
                  Builds
                </div>
                <ul className="mt-2 space-y-3 font-body text-sm text-ink-soft">
                  {recap.builds.map((b, i) => (
                    <li key={i}>
                      <div className="font-body text-xs uppercase tracking-wider text-ink">
                        {b.builder}
                      </div>
                      <div className="mt-0.5 leading-relaxed">
                        {b.description}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <blockquote className="mt-6 border-l-2 border-terracotta pl-4">
                <p className="font-display text-lg leading-snug text-ink">
                  “{recap.pullQuote.text}”
                </p>
                <footer className="mt-2 font-body text-xs uppercase tracking-wider text-ink-mute">
                  — {recap.pullQuote.attribution}
                </footer>
              </blockquote>
            </div>

            <div className="flex flex-col items-stretch gap-3">
              <div className="font-body text-[10px] uppercase tracking-[0.18em] text-ink-mute">
                Photos
              </div>
              <div className="grid grid-cols-2 gap-3">
                {recap.photos.map((sk, i) => {
                  const rotation = ((i * 53) % 9) - 4;
                  return (
                    <div
                      key={i}
                      className="relative bg-cream p-1.5 pb-3 shadow-[0_2px_6px_-1px_rgba(26,26,26,0.25)]"
                      style={{ transform: `rotate(${rotation}deg)` }}
                    >
                      <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pin" />
                      <div className="aspect-square w-full bg-cream-warm">
                        <Sketch id={sk} />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="mt-2 font-hand text-base text-ink-mute">
                workshop, week of {week.monthLabel}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </Modal>
  );
}
