"use client";

import { Modal } from "@/components/ui/Modal";

/**
 * About this artifact. SPEC §9 — the intellectual-honesty layer, verbatim.
 */
export function AboutModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const titleId = "about-title";
  return (
    <Modal open={open} onClose={onClose} labelledBy={titleId}>
      <div className="flex items-baseline justify-between gap-4 border-b border-ink/10 pb-4">
        <div>
          <div className="font-body text-[10px] uppercase tracking-[0.22em] text-ink-mute">
            About
          </div>
          <h3
            id={titleId}
            className="mt-1 font-display text-2xl tracking-tight text-ink"
          >
            About this artifact
          </h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close about"
          className="rounded-full border border-ink/20 px-3 py-1 font-body text-xs text-ink-soft hover:bg-ink hover:text-cream"
        >
          close
        </button>
      </div>

      <div className="mt-5 space-y-4 font-body text-base leading-relaxed text-ink-soft">
        <p className="italic">
          Sam is composite. The cafe bubbles are aspirational specificity —
          names invented, builds authored to feel like real student work. The
          themed weeks are vision, not committed roadmap. The feedback loop
          latency number (8.2 weeks) is a claim I intend to make true.
        </p>
        <p className="italic">
          Beacon is real and live. The 30-60-90 plan is real and committed. The
          DHVC math is real.
        </p>
      </div>

      <div className="mt-6 border-t border-ink/10 pt-4">
        <p className="font-body text-xs text-ink-mute">
          The signal: I’m not selling fiction. I’m showing the world I’ll
          build, while telling you which parts are which.
        </p>
      </div>
    </Modal>
  );
}
