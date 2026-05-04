import type { Phase } from "@/lib/types";
import { CAFE_BUBBLES } from "@/data/cafe-bubbles";

const BUBBLE_FIRST_VISIBLE: Record<string, Phase> = Object.fromEntries(
  CAFE_BUBBLES.map((b) => [b.id, b.firstVisibleAt]),
);

export interface AmbassadorDot {
  id: string;
  x: number;
  y: number;
  firstVisibleAt: Phase;
  bubbleId?: string;
}

export interface AdvocateDot {
  id: string;
  x: number;
  y: number;
  firstVisibleAt: Phase;
  hoverLine: string;
}

export interface PropagationEdge {
  fromAdotId: string;
  toAdvocateId: string;
}

const TABLE_CENTERS: [number, number][] = [
  [18, 54],
  [32, 52],
  [46, 54],
  [62, 54],
  [78, 54],
  [18, 74],
  [34, 76],
  [52, 76],
  [70, 76],
  [86, 76],
];

const JIT: [number, number][] = [
  [-5, -3],
  [5, -4],
  [-4, 5],
  [4, 5],
];

function phaseForAmbassadorIndex(i: number): Phase {
  if (i < 8) return "now";
  if (i < 18) return "q1";
  if (i < 30) return "q2";
  return "year1";
}

const rawAmbassadors: Omit<AmbassadorDot, "bubbleId">[] = TABLE_CENTERS.flatMap(
  ([cx, cy], ti) =>
    JIT.map(([jx, jy], ji) => {
      const i = ti * 4 + ji;
      const x = Math.min(93, Math.max(7, cx + jx));
      const y = Math.min(91, Math.max(52, cy + jy));
      return {
        id: `adot-${i + 1}`,
        x: Math.round(x * 10) / 10,
        y: Math.round(y * 10) / 10,
        firstVisibleAt: phaseForAmbassadorIndex(i),
      };
    }),
);

const BUBBLE_ON_ADOT: Record<string, string> = {
  "adot-1": "vinh",
  "adot-2": "maya",
  "adot-3": "zoe",
  "adot-5": "lin",
  "adot-8": "devon",
  "adot-11": "marcus",
  "adot-14": "kai",
  "adot-17": "theo",
  "adot-20": "priya",
  "adot-23": "jordan",
  "adot-26": "sofia",
  "adot-29": "reem",
  "adot-32": "aisha",
  "adot-37": "chen",
  "adot-39": "hana",
  "adot-40": "aditya",
};

export const CAFE_AMBASSADOR_DOTS: AmbassadorDot[] = rawAmbassadors.map((d) => {
  const bid = BUBBLE_ON_ADOT[d.id];
  if (!bid) return d;
  const firstVisibleAt = BUBBLE_FIRST_VISIBLE[bid] ?? d.firstVisibleAt;
  return { ...d, bubbleId: bid, firstVisibleAt };
});

const ADV_LINES = [
  "Priya, UCSD CS — first heard of Cursor at this cafe. 3 weeks later: lab adoption.",
  "Jordan, RISD — sketching UI flows during Cafe Cursor. Converted in 12 days.",
  "Elena, Brown pre-med — brought back the flyer; three lab mates installed Cursor that Sunday.",
  "James, Princeton — heard Lin’s ten-minute demo; thesis repo migrated before winter break.",
  "Alex, UIUC — “I thought it was another Copilot.” Switched after one pairing session with Devon’s script.",
  "Samira, UCSF — met Sofia here; now runs Cursor in two rotation labs.",
  "Chris, Cornell Ag — non-CS PI asked for a Cursor lab walkthrough after seeing Theo’s printout.",
  "Noor, Columbia — watched Reem’s clause diff; adopted for legal research memos.",
  "Vik, Georgia Tech — orientation line at this counter; Aisha sat next to him. Cursor before first midterm.",
  "Hannah, Caltech — overheard a robotics postmortem; joined the themed-week waitlist.",
];

function phaseForAdvocateIndex(i: number): Phase {
  if (i < 10) return "now";
  if (i < 26) return "q1";
  if (i < 48) return "q2";
  return "year1";
}

function advPos(i: number): { x: number; y: number } {
  const a = (i * 47) % 97;
  const b = (i * 31) % 83;
  const x = 8 + (a / 97) * 84;
  let y = 54 + (b / 83) * 36;
  if (x > 26 && x < 58 && y < 26) {
    y += 30;
  }
  return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
}

export const CAFE_ADVOCATE_DOTS: AdvocateDot[] = Array.from(
  { length: 60 },
  (_, i) => {
    const pos = advPos(i);
    return {
      id: `adv-${i + 1}`,
      ...pos,
      firstVisibleAt: phaseForAdvocateIndex(i),
      hoverLine: ADV_LINES[i % ADV_LINES.length],
    };
  },
);

export const CAFE_PROPAGATION: PropagationEdge[] = [
  { fromAdotId: "adot-2", toAdvocateId: "adv-3" },
  { fromAdotId: "adot-5", toAdvocateId: "adv-7" },
  { fromAdotId: "adot-8", toAdvocateId: "adv-11" },
  { fromAdotId: "adot-11", toAdvocateId: "adv-14" },
  { fromAdotId: "adot-14", toAdvocateId: "adv-18" },
  { fromAdotId: "adot-17", toAdvocateId: "adv-22" },
  { fromAdotId: "adot-20", toAdvocateId: "adv-28" },
  { fromAdotId: "adot-23", toAdvocateId: "adv-31" },
  { fromAdotId: "adot-26", toAdvocateId: "adv-35" },
  { fromAdotId: "adot-29", toAdvocateId: "adv-41" },
  { fromAdotId: "adot-32", toAdvocateId: "adv-44" },
  { fromAdotId: "adot-1", toAdvocateId: "adv-51" },
];
