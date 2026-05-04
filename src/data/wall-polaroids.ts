import type { WallPolaroid } from "@/lib/types";

/**
 * Seven polaroids on the cafe corkboard — the visible “surface area” of the
 * Wall of Awe. Each maps to a Cohort 1 voice in cafe-bubbles.ts.
 */

export const WALL_POLAROIDS: WallPolaroid[] = [
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
      "Aug 26 — Stanford NLP lab adoption. Lin (Cohort 1, Stanford) ran a 30-min Cafe demo. Twelve grad students moved their day-to-day refactoring into Cursor over a single Friday standup.",
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
    id: "p-vinh",
    bubbleId: "vinh",
    caption: "Vinh · UIUC",
    date: "Nov 26",
    description:
      "UIUC sysadmin club rebuilt the department lab image with a Cursor-forward toolchain. Faculty briefing landed on the registrar’s risk log as a positive footnote.",
    sketchId: "paper-highlight",
    rotation: 2,
    position: { x: 64, y: 44 },
    firstVisibleAt: "q2",
  },
  {
    id: "p-zoe",
    bubbleId: "zoe",
    caption: "Zoe · Princeton",
    date: "Nov 26",
    description:
      "ORFE teaching staff standardized Cursor for problem-set scaffolding. A quarter of the enrolled class adopted it inside two weeks — tracked in TF office-hour sign-ins.",
    sketchId: "studio-tool",
    rotation: -5,
    position: { x: 38, y: 70 },
    firstVisibleAt: "q2",
  },
];
