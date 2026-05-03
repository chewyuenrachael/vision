import type { CafeSilhouette } from "@/lib/types";

/**
 * 50 silhouettes for the cafe at peak (+360). SPEC §4.2.
 *
 * Phase counts (cumulative): now=5, q1=12, q2=28, year1=50.
 * Bubble silhouettes match cafe-bubbles.ts ids; their visibility is gated by the
 * bubble's own firstVisibleAt, but we mirror the same phase here for clarity.
 *
 * Coordinate system: 0..1000 viewBox, percentages in this file.
 *   - Back wall (window / corkboard / counter): y < 34%  — KEEP CLEAR.
 *   - Floor zone:    y ∈ [34%, 100%].
 *   - Top-row tables:    centers ≈ x=18,32,46,62,78  y≈54%.
 *   - Bottom-row tables: centers ≈ x=18,34,52,70,86  y≈77%.
 *   - Aisle between rows:  y≈68%.
 *   - Front aisle:         y≈90%.
 *
 * Every silhouette anchor sits at y ≥ 56% so its dot (rendered ~5% above)
 * still lands on the floor, near a table — never on the back wall.
 *
 * The original at-window / standing-counter postures pulled silhouettes onto
 * the back wall (where the dots floated by the corkboard). We keep posture
 * variety but only ever place silhouettes in the seating area.
 */

export const CAFE_SILHOUETTES: CafeSilhouette[] = [
  // ── NOW (5) — the quiet morning ──────────────────────────────────────────
  {
    id: "s-now-1",
    posture: "seated-laptop",
    x: 30,
    y: 58,
    firstVisibleAt: "now",
    bubbleId: "maya",
  },
  {
    id: "s-now-2",
    posture: "walking",
    x: 68,
    y: 70,
    firstVisibleAt: "now",
  },
  {
    id: "s-now-3",
    posture: "seated-laptop",
    x: 18,
    y: 58,
    firstVisibleAt: "now",
  },
  {
    id: "s-now-4",
    posture: "seated-laptop-back",
    x: 46,
    y: 58,
    firstVisibleAt: "now",
  },
  {
    id: "s-now-5",
    posture: "seated-laptop",
    x: 78,
    y: 58,
    firstVisibleAt: "now",
    bubbleId: "lin",
  },

  // ── +90 adds 7 → 12 total ────────────────────────────────────────────────
  {
    id: "s-q1-1",
    posture: "seated-laptop",
    x: 34,
    y: 82,
    firstVisibleAt: "q1",
    bubbleId: "devon",
  },
  {
    id: "s-q1-2",
    posture: "leaning-conversation",
    x: 60,
    y: 82,
    firstVisibleAt: "q1",
    bubbleId: "marcus",
  },
  {
    id: "s-q1-3",
    posture: "leaning-conversation",
    x: 64,
    y: 82,
    flip: true,
    firstVisibleAt: "q1",
    bubbleId: "kai",
  },
  {
    id: "s-q1-4",
    posture: "walking",
    x: 46,
    y: 70,
    firstVisibleAt: "q1",
  },
  {
    id: "s-q1-5",
    posture: "walking",
    x: 82,
    y: 70,
    firstVisibleAt: "q1",
  },
  {
    id: "s-q1-6",
    posture: "seated-laptop",
    x: 18,
    y: 82,
    firstVisibleAt: "q1",
  },
  {
    id: "s-q1-7",
    posture: "seated-laptop-back",
    x: 86,
    y: 82,
    firstVisibleAt: "q1",
  },

  // ── +180 adds 16 → 28 total ──────────────────────────────────────────────
  {
    id: "s-q2-1",
    posture: "seated-laptop",
    x: 8,
    y: 82,
    firstVisibleAt: "q2",
    bubbleId: "theo",
  },
  {
    id: "s-q2-2",
    posture: "seated-laptop",
    x: 24,
    y: 58,
    firstVisibleAt: "q2",
    bubbleId: "priya",
  },
  {
    id: "s-q2-3",
    posture: "leaning-conversation",
    x: 42,
    y: 66,
    firstVisibleAt: "q2",
    bubbleId: "jordan",
  },
  {
    id: "s-q2-4",
    posture: "seated-laptop-back",
    x: 52,
    y: 82,
    firstVisibleAt: "q2",
    bubbleId: "sofia",
  },
  {
    id: "s-q2-5",
    posture: "seated-laptop",
    x: 62,
    y: 58,
    firstVisibleAt: "q2",
    bubbleId: "reem",
  },
  {
    id: "s-q2-6",
    posture: "seated-laptop",
    x: 86,
    y: 58,
    firstVisibleAt: "q2",
    bubbleId: "aisha",
  },
  {
    id: "s-q2-7",
    posture: "leaning-conversation",
    x: 46,
    y: 66,
    flip: true,
    firstVisibleAt: "q2",
  },
  {
    id: "s-q2-8",
    posture: "seated-laptop",
    x: 8,
    y: 66,
    firstVisibleAt: "q2",
  },
  {
    id: "s-q2-9",
    posture: "walking",
    x: 58,
    y: 70,
    firstVisibleAt: "q2",
  },
  {
    id: "s-q2-10",
    posture: "walking",
    x: 22,
    y: 70,
    firstVisibleAt: "q2",
  },
  {
    id: "s-q2-11",
    posture: "seated-laptop-back",
    x: 78,
    y: 82,
    firstVisibleAt: "q2",
  },
  {
    id: "s-q2-12",
    posture: "seated-laptop",
    x: 70,
    y: 58,
    firstVisibleAt: "q2",
  },
  {
    id: "s-q2-13",
    posture: "seated-laptop",
    x: 92,
    y: 92,
    firstVisibleAt: "q2",
  },
  {
    id: "s-q2-14",
    posture: "leaning-conversation",
    x: 26,
    y: 72,
    firstVisibleAt: "q2",
  },
  {
    id: "s-q2-15",
    posture: "leaning-conversation",
    x: 30,
    y: 72,
    flip: true,
    firstVisibleAt: "q2",
  },
  {
    id: "s-q2-16",
    posture: "walking",
    x: 74,
    y: 72,
    firstVisibleAt: "q2",
  },

  // ── +360 adds 22 → 50 total ──────────────────────────────────────────────
  {
    id: "s-y1-1",
    posture: "seated-laptop",
    x: 12,
    y: 90,
    firstVisibleAt: "year1",
    bubbleId: "chen",
  },
  {
    id: "s-y1-2",
    posture: "seated-laptop-back",
    x: 44,
    y: 82,
    firstVisibleAt: "year1",
    bubbleId: "hana",
  },
  {
    id: "s-y1-3",
    posture: "seated-laptop",
    x: 58,
    y: 82,
    firstVisibleAt: "year1",
    bubbleId: "aditya",
  },
  {
    id: "s-y1-4",
    posture: "leaning-conversation",
    x: 36,
    y: 58,
    firstVisibleAt: "year1",
  },
  {
    id: "s-y1-5",
    posture: "leaning-conversation",
    x: 40,
    y: 58,
    flip: true,
    firstVisibleAt: "year1",
  },
  {
    id: "s-y1-6",
    posture: "seated-laptop",
    x: 50,
    y: 58,
    firstVisibleAt: "year1",
  },
  {
    id: "s-y1-7",
    posture: "seated-laptop-back",
    x: 66,
    y: 58,
    firstVisibleAt: "year1",
  },
  {
    id: "s-y1-8",
    posture: "walking",
    x: 14,
    y: 68,
    firstVisibleAt: "year1",
  },
  {
    id: "s-y1-9",
    posture: "walking",
    x: 92,
    y: 70,
    firstVisibleAt: "year1",
  },
  {
    id: "s-y1-10",
    posture: "seated-laptop",
    x: 4,
    y: 88,
    firstVisibleAt: "year1",
  },
  {
    id: "s-y1-11",
    posture: "seated-laptop",
    x: 56,
    y: 90,
    firstVisibleAt: "year1",
  },
  {
    id: "s-y1-12",
    posture: "seated-laptop",
    x: 82,
    y: 58,
    firstVisibleAt: "year1",
  },
  {
    id: "s-y1-13",
    posture: "leaning-conversation",
    x: 14,
    y: 72,
    firstVisibleAt: "year1",
  },
  {
    id: "s-y1-14",
    posture: "leaning-conversation",
    x: 18,
    y: 72,
    flip: true,
    firstVisibleAt: "year1",
  },
  {
    id: "s-y1-15",
    posture: "seated-laptop-back",
    x: 28,
    y: 82,
    firstVisibleAt: "year1",
  },
  {
    id: "s-y1-16",
    posture: "walking",
    x: 36,
    y: 70,
    firstVisibleAt: "year1",
  },
  {
    id: "s-y1-17",
    posture: "seated-laptop",
    x: 76,
    y: 90,
    firstVisibleAt: "year1",
  },
  {
    id: "s-y1-18",
    posture: "seated-laptop",
    x: 32,
    y: 90,
    firstVisibleAt: "year1",
  },
  {
    id: "s-y1-19",
    posture: "leaning-conversation",
    x: 84,
    y: 90,
    firstVisibleAt: "year1",
  },
  {
    id: "s-y1-20",
    posture: "leaning-conversation",
    x: 88,
    y: 90,
    flip: true,
    firstVisibleAt: "year1",
  },
  {
    id: "s-y1-21",
    posture: "seated-laptop-back",
    x: 74,
    y: 58,
    firstVisibleAt: "year1",
  },
  {
    id: "s-y1-22",
    posture: "walking",
    x: 66,
    y: 70,
    firstVisibleAt: "year1",
  },
];
