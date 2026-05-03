import type { Phase, PhaseLabel } from "./types";
import { T_NOW, T_Q1, T_Q2, T_YEAR1 } from "./dates";

/**
 * Phase math. SPEC §3.3 — last-passed canonical stop is the active phase.
 */

export const PHASE_ORDER: Phase[] = ["now", "q1", "q2", "year1", "future"];

export const PHASE_INDEX: Record<Phase, number> = {
  now: 0,
  q1: 1,
  q2: 2,
  year1: 3,
  future: 4,
};

export function phaseFromT(t: number): Phase {
  if (t >= T_YEAR1 + 1) return "future";
  if (t >= T_YEAR1) return "year1";
  if (t >= T_Q2) return "q2";
  if (t >= T_Q1) return "q1";
  return "now";
}

export function phaseLabel(p: Phase): PhaseLabel {
  switch (p) {
    case "now":
      return "Now";
    case "q1":
      return "+90";
    case "q2":
      return "+180";
    case "year1":
      return "+360";
    case "future":
      return "+future";
  }
}

/**
 * Returns true if a content item with `firstVisibleAt` should be shown at the
 * current phase. e.g. a +180 bubble shows at +180, +360, and beyond — but not at +90.
 */
export function isVisibleAt(firstVisibleAt: Phase, current: Phase): boolean {
  return PHASE_INDEX[current] >= PHASE_INDEX[firstVisibleAt];
}

export const CANONICAL_STOPS: { phase: Phase; t: number; label: string }[] = [
  { phase: "now", t: T_NOW, label: "Now" },
  { phase: "q1", t: T_Q1, label: "+90" },
  { phase: "q2", t: T_Q2, label: "+180" },
  { phase: "year1", t: T_YEAR1, label: "+360" },
];
