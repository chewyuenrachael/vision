"use client";

import { Modal } from "@/components/ui/Modal";
import { Sketch } from "@/components/cafe/sketches";
import { recapForWeekId } from "@/data/themed-week-recaps";
import { RECAP_MODAL_AUGMENT } from "@/data/themed-week-recap-modal";
import type { ThemedWeek } from "@/lib/types";

interface Props {
  week: ThemedWeek | null;
  onClose: () => void;
}

export function RecapModal({ week, onClose }: Props) {
  const recap = week ? recapForWeekId(week.id) : null;
  const extra = week ? RECAP_MODAL_AUGMENT[week.id] : undefined;
  const open = Boolean(week && recap && extra);
  const titleId = "recap-title";

  return (
    <Modal open={open} onClose={onClose} labelledBy={titleId}>
      {week && recap && extra ? (
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

          <div className="mt-5 grid gap-6 sm:grid-cols-[1.35fr_1fr]">
            <div>
              <p className="font-hand text-[17px] italic leading-relaxed text-ink">
                {extra.ambassadorRecap}
              </p>

              <div className="mt-5">
                <div className="font-body text-[10px] uppercase tracking-[0.18em] text-ink-mute">
                  Outcomes
                </div>
                <ul className="mt-2 space-y-2 font-body text-sm text-ink-soft">
                  {extra.outcomeBullets.map((line, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="select-none text-terracotta">·</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 border-t border-ink/10 pt-4">
                <div className="font-body text-[10px] uppercase tracking-[0.18em] text-ink-mute">
                  Run by
                </div>
                <p className="mt-1 font-body text-sm font-medium text-ink">
                  {extra.runBy}
                </p>
              </div>

              <blockquote className="mt-6 border-l-2 border-terracotta/50 pl-4">
                <p className="font-display text-base leading-snug text-ink">
                  “{recap.pullQuote.text}”
                </p>
                <footer className="mt-2 font-body text-xs uppercase tracking-wider text-ink-mute">
                  — {recap.pullQuote.attribution}
                </footer>
              </blockquote>
            </div>

            <div>
              <div className="font-body text-[10px] uppercase tracking-[0.18em] text-ink-mute">
                Student spotlight
              </div>
              <div
                className="relative mt-3 max-w-[220px] bg-cream p-1.5 pb-3 shadow-[0_2px_6px_-1px_rgba(26,26,26,0.25)]"
                style={{ transform: "rotate(-1.5deg)" }}
              >
                <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pin" />
                <div className="aspect-square w-full bg-cream-warm">
                  <Sketch id={extra.studentSpotlight.sketchId} />
                </div>
              </div>
              <p className="mt-3 font-body text-sm text-ink-soft">
                {extra.studentSpotlight.caption}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </Modal>
  );
}
