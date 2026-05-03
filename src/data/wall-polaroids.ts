import type { WallPolaroid } from "@/lib/types";

/**
 * 12 polaroids on the cafe corkboard. SPEC §4.4.
 * Each shares a `bubbleId` with cafe-bubbles.ts so hovering Maya's bubble lights
 * up Maya's polaroid. By +360 four polaroids overflow the corkboard frame.
 *
 * Position is % within the corkboard region (rendered inside CafeBackground).
 * 0,0 = top-left of corkboard.
 */

export const WALL_POLAROIDS: WallPolaroid[] = [
  // q1 — first 3 pinned
  {
    id: "p-maya",
    bubbleId: "maya",
    caption: "Maya · MIT",
    date: "Jul 26",
    description:
      "A weekend reproduction of a CSAIL paper. Composer caught a bug in the original code; the paper authors confirmed the fix.",
    sketchId: "paper-highlight",
    rotation: -4,
    position: { x: 12, y: 18 },
    firstVisibleAt: "q1",
  },
  {
    id: "p-lin",
    bubbleId: "lin",
    caption: "Lin · Stanford NLP",
    date: "Aug 26",
    description:
      "Stanford NLP lab adoption — twelve grad students moved their day-to-day refactoring into Cursor over a single Friday standup.",
    sketchId: "neural-net",
    rotation: 3,
    position: { x: 38, y: 16 },
    firstVisibleAt: "q1",
  },
  {
    id: "p-devon",
    bubbleId: "devon",
    caption: "Devon · MIT 6.1010",
    date: "Aug 26",
    description:
      "A new office-hours pattern from a 6.1010 TA: students come in with their Cursor session open and a question about why their fix is wrong.",
    sketchId: "office-hours",
    rotation: -2,
    position: { x: 64, y: 18 },
    firstVisibleAt: "q1",
  },

  // q2 — 11 more (overall 14)
  {
    id: "p-marcus",
    bubbleId: "marcus",
    caption: "Marcus · Howard",
    date: "Sep 26",
    description:
      "A Cursor power-user demo posted by a Howard senior turned into an internship offer. The clip is being passed around in our recruiting Slack.",
    sketchId: "demo-flyer",
    rotation: 5,
    position: { x: 12, y: 44 },
    firstVisibleAt: "q2",
  },
  {
    id: "p-kai",
    bubbleId: "kai",
    caption: "Kai · Berkeley",
    date: "Oct 26",
    description:
      "Berkeley philosophy + CS double major using Cursor as a thinking partner. The argument got better; the syntax got out of the way.",
    sketchId: "argument",
    rotation: -3,
    position: { x: 38, y: 44 },
    firstVisibleAt: "q2",
  },
  {
    id: "p-theo",
    bubbleId: "theo",
    caption: "Theo · Cornell",
    date: "Nov 26",
    description:
      "An ancient Greek text annotator. Built for one classics thesis, picked up by the department for next semester's intro seminar.",
    sketchId: "greek-margin",
    rotation: 2,
    position: { x: 64, y: 44 },
    firstVisibleAt: "q2",
  },
  {
    id: "p-priya",
    bubbleId: "priya",
    caption: "Priya · UCSD",
    date: "Oct 26",
    description:
      "Cursor × Neuro week pulled a CS junior into a CogSci lab. Now contributing to two computational neuro projects.",
    sketchId: "brain-cluster",
    rotation: -5,
    position: { x: 12, y: 70 },
    firstVisibleAt: "q2",
  },
  {
    id: "p-jordan",
    bubbleId: "jordan",
    caption: "Jordan · RISD",
    date: "Dec 26",
    description:
      "A studio-class prototype tool by a non-CS design major. Three classmates use it weekly. The studio professor wants to bring it to next year's curriculum.",
    sketchId: "studio-tool",
    rotation: 4,
    position: { x: 38, y: 70 },
    firstVisibleAt: "q2",
  },
  {
    id: "p-sofia",
    bubbleId: "sofia",
    caption: "Sofia · UCSF",
    date: "Nov 26",
    description:
      "A bio PhD's protein-folding visualization. Vibe-coded over a weekend, twelve thousand likes on Twitter, two follow-up requests from pharma.",
    sketchId: "protein-helix",
    rotation: -1,
    position: { x: 64, y: 70 },
    firstVisibleAt: "q2",
  },
  {
    id: "p-reem",
    bubbleId: "reem",
    caption: "Reem · Columbia Law",
    date: "Dec 26",
    description:
      "A clause comparator built by a Columbia Law student. Runs against contract pairs; a professor asked permission to share it with her seminar.",
    sketchId: "contract-clause",
    rotation: 3,
    position: { x: 88, y: 18 },
    firstVisibleAt: "q2",
  },
  {
    id: "p-aisha",
    bubbleId: "aisha",
    caption: "Aisha · Georgia Tech",
    date: "Sep 26",
    description:
      "Georgia Tech freshman onboarded onto Cursor at orientation. She has no other muscle memory; this is the only IDE she's known.",
    sketchId: "freshman-laptop",
    rotation: -4,
    position: { x: 88, y: 44 },
    firstVisibleAt: "q2",
  },

  // year1 — 4 international + overflow
  {
    id: "p-chen",
    bubbleId: "chen",
    caption: "Chen · Tsinghua",
    date: "Feb 27",
    description:
      "A Tsinghua sophomore writing Rust faster than her TA. Found Cursor on Twitter. Half her dorm followed within a month.",
    sketchId: "tab-stream",
    rotation: 6,
    position: { x: 88, y: 70 },
    firstVisibleAt: "year1",
  },
  {
    id: "p-hana",
    bubbleId: "hana",
    caption: "Hana · ETH Zürich",
    date: "Mar 27",
    description:
      "Satellite imagery analysis at ETH's climate department compressed from a month to a weekend. Our first formal European partnership.",
    sketchId: "satellite",
    rotation: -3,
    position: { x: 24, y: 90 },
    firstVisibleAt: "year1",
    overflow: true,
  },
  {
    id: "p-aditya",
    bubbleId: "aditya",
    caption: "Aditya · IIT Bombay",
    date: "Mar 27",
    description:
      "IIT Bombay freshman who never wrote code before October. Shipped a Hindi-English translator his grandmother actually uses.",
    sketchId: "translator",
    rotation: 5,
    position: { x: 50, y: 92 },
    firstVisibleAt: "year1",
    overflow: true,
  },
];
