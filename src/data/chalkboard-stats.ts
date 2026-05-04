import type { Phase } from "@/lib/types";

/** “Soon-to-be advocates surfaced this month” — keyed to timeline phase. */
export const SURFACED_ADVOCATES_BY_PHASE: Record<Phase, number> = {
  now: 127,
  q1: 162,
  q2: 210,
  year1: 340,
  future: 340,
};
