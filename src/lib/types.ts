/**
 * Shared types for Cursor Campus Vision.
 * The phase abstraction (SPEC §3.3) is the spine. Most scenes never touch dates;
 * they pick a phase-keyed object of content.
 */

export type Phase = "now" | "q1" | "q2" | "year1" | "future";

export type PhaseLabel = "Now" | "+90" | "+180" | "+360" | "+future";

export interface CafeBubble {
  id: string;
  name: string;
  school: string;
  short: string;
  long: string;
  firstVisibleAt: Phase;
  origin: "us" | "intl";
  domain: "cs" | "non-cs";
}

export type SilhouettePosture =
  | "seated-laptop"
  | "seated-laptop-back"
  | "standing-counter"
  | "leaning-conversation"
  | "at-window"
  | "walking";

export interface CafeSilhouette {
  id: string;
  posture: SilhouettePosture;
  x: number; // % of cafe svg viewBox width
  y: number; // % of cafe svg viewBox height
  scale?: number;
  flip?: boolean;
  firstVisibleAt: Phase;
  bubbleId?: string; // links to a CafeBubble
}

export interface WallPolaroid {
  id: string;
  bubbleId: string; // matches CafeBubble.id — the cafe and the wall are one community
  caption: string; // builder name + school in handwriting
  date: string; // short date string
  description: string; // expanded on hover
  sketchId: SketchId;
  rotation: number; // degrees, -6 to +6
  position: { x: number; y: number }; // % within corkboard region
  firstVisibleAt: Phase;
  overflow?: boolean; // overflows beyond corkboard frame at +360
}

export type SketchId =
  | "paper-highlight"
  | "neural-net"
  | "office-hours"
  | "demo-flyer"
  | "argument"
  | "greek-margin"
  | "brain-cluster"
  | "studio-tool"
  | "protein-helix"
  | "contract-clause"
  | "freshman-laptop"
  | "tab-stream"
  | "satellite"
  | "translator";

export interface ThemedWeek {
  id: string;
  number: number;
  title: string;
  location: string;
  /** Month start the week occupies (Date in UTC). */
  monthDate: Date;
  /** Human-readable month label, e.g. "Sept 2026" */
  monthLabel: string;
  firstVisibleAt: Phase;
}

export interface RecapBuild {
  builder: string;
  description: string;
}

export interface ThemedWeekRecap {
  weekId: string;
  partners: string[];
  stats: string[];
  builds: RecapBuild[];
  pullQuote: { text: string; attribution: string };
  photos: SketchId[];
}

export interface FeedbackLoop {
  id: string;
  number: number;
  observation: { author: string; affiliation: string; text: string };
  shipped: { feature: string; description: string };
  arrivesAt: Phase;
  latencyWeeks: number;
}

export interface SamPhaseContent {
  phase: Phase;
  setting: string;
  caption: string;
  visible: string[];
  calendar: string[];
  slack: { channel: string; preview: string; unread: number }[];
}

export interface CounterfactualEndpoint {
  with: string[];
  without: string[];
  delta: { headline: string; sub: string };
}
