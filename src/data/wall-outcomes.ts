import type { Phase } from "@/lib/types";

/** Aggregated proof numbers for the themed-week wall — phase-keyed. */
export interface WallOutcomes {
  wrappedWeeks: number;
  studentsTouched: number;
  labDemos: number;
  feedbackRouted: number;
  ambassadorsDiscovered: number;
}

export const WALL_OUTCOMES_BY_PHASE: Record<Phase, WallOutcomes> = {
  now: {
    wrappedWeeks: 0,
    studentsTouched: 0,
    labDemos: 0,
    feedbackRouted: 0,
    ambassadorsDiscovered: 0,
  },
  q1: {
    wrappedWeeks: 2,
    studentsTouched: 128,
    labDemos: 19,
    feedbackRouted: 8,
    ambassadorsDiscovered: 2,
  },
  q2: {
    wrappedWeeks: 5,
    studentsTouched: 312,
    labDemos: 47,
    feedbackRouted: 18,
    ambassadorsDiscovered: 4,
  },
  year1: {
    wrappedWeeks: 12,
    studentsTouched: 749,
    labDemos: 113,
    feedbackRouted: 43,
    ambassadorsDiscovered: 10,
  },
  future: {
    wrappedWeeks: 12,
    studentsTouched: 749,
    labDemos: 113,
    feedbackRouted: 43,
    ambassadorsDiscovered: 10,
  },
};
