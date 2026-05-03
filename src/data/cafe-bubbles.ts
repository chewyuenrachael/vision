import type { CafeBubble } from "@/lib/types";

/**
 * The 14 cafe bubbles. SPEC §4.3 — verbatim.
 * Geographic discipline: US foundation visible from +90; one international voice
 * at +180; the rest of the international wedge only at +360.
 */

export const CAFE_BUBBLES: CafeBubble[] = [
  // US foundation — visible from +90 onward
  {
    id: "maya",
    name: "Maya",
    school: "MIT",
    short: "Reproduced a CSAIL paper in a weekend.",
    long:
      "Maya, CS sophomore @ MIT — “Reproduced a CSAIL paper in a weekend. Composer caught a bug in the original code.”",
    firstVisibleAt: "q1",
    origin: "us",
    domain: "cs",
  },
  {
    id: "lin",
    name: "Lin",
    school: "Stanford NLP",
    short: "My whole lab moved to Cursor in November.",
    long:
      "Lin, PhD @ Stanford NLP — “My whole lab moved to Cursor in November. Saved me a quarter on my thesis chapter.”",
    firstVisibleAt: "q1",
    origin: "us",
    domain: "cs",
  },
  {
    id: "devon",
    name: "Devon",
    school: "MIT 6.1010 TA",
    short: "Office hours are different now.",
    long:
      "Devon, TA for 6.1010 @ MIT — “Office hours are different now. Students bring better questions.”",
    firstVisibleAt: "q1",
    origin: "us",
    domain: "cs",
  },
  {
    id: "marcus",
    name: "Marcus",
    school: "Howard",
    short: "Got my first internship offer from a Cursor demo.",
    long:
      "Marcus, CS senior @ Howard — “Got my first internship offer from a Cursor power-user demo I posted.”",
    firstVisibleAt: "q1",
    origin: "us",
    domain: "cs",
  },
  {
    id: "kai",
    name: "Kai",
    school: "Berkeley (phil + CS)",
    short: "I cared about the argument. Cursor handled the syntax.",
    long:
      "Kai, philosophy + CS @ Berkeley — “I cared about the argument. Cursor handled the syntax. We disagree about what ‘thinking’ means now.”",
    firstVisibleAt: "q1",
    origin: "us",
    domain: "non-cs",
  },
  // US category expansion — visible from +180
  {
    id: "theo",
    name: "Theo",
    school: "Cornell classics",
    short: "Built a Greek-text annotator for my thesis.",
    long:
      "Theo, classics major @ Cornell — “Built a Greek-text annotator for my thesis. The classics professor is using it next semester.”",
    firstVisibleAt: "q2",
    origin: "us",
    domain: "non-cs",
  },
  {
    id: "priya",
    name: "Priya",
    school: "UCSD",
    short: "Cursor × Neuro week made me switch labs.",
    long:
      "Priya, CS junior @ UCSD — “Cursor × Neuro week made me switch labs. Now I’m doing computational neuro.”",
    firstVisibleAt: "q2",
    origin: "us",
    domain: "non-cs",
  },
  {
    id: "jordan",
    name: "Jordan",
    school: "RISD",
    short: "I’m not a CS student. I built a prototype tool.",
    long:
      "Jordan, design major @ RISD — “I’m not a CS student. I built a prototype tool for our studio class. Three classmates use it.”",
    firstVisibleAt: "q2",
    origin: "us",
    domain: "non-cs",
  },
  {
    id: "sofia",
    name: "Sofia",
    school: "UCSF",
    short: "Vibe-coded a protein folding viz over a weekend.",
    long:
      "Sofia, bio PhD @ UCSF — “Vibe-coded a protein folding viz over a weekend. Twelve thousand likes on Twitter.”",
    firstVisibleAt: "q2",
    origin: "us",
    domain: "non-cs",
  },
  {
    id: "reem",
    name: "Reem",
    school: "Columbia Law",
    short: "Built a contract-clause comparator.",
    long:
      "Reem, law student @ Columbia — “Built a contract-clause comparator. My professor asked if she could share it.”",
    firstVisibleAt: "q2",
    origin: "us",
    domain: "non-cs",
  },
  {
    id: "aisha",
    name: "Aisha",
    school: "Georgia Tech",
    short: "Started Cursor at orientation. I’ve never coded any other way.",
    long:
      "Aisha, CS freshman @ Georgia Tech — “Started Cursor at orientation. I’ve never coded any other way.”",
    firstVisibleAt: "q2",
    origin: "us",
    domain: "cs",
  },
  // International wedge — visible only from +360. The Q3 deliberate move.
  {
    id: "chen",
    name: "Chen",
    school: "Tsinghua",
    short: "Tab is faster than I can think.",
    long:
      "Chen, sophomore @ Tsinghua — “Tab is faster than I can think. I write better Rust than my TA. Found Cursor on Twitter, then half my dorm joined.”",
    firstVisibleAt: "year1",
    origin: "intl",
    domain: "cs",
  },
  {
    id: "hana",
    name: "Hana",
    school: "ETH Zürich",
    short: "Satellite imagery used to take a month. Now a weekend.",
    long:
      "Hana, climate science @ ETH Zürich — “Satellite imagery analysis used to take a month. Now it takes a weekend. Our department’s the first in Europe Cursor formally partnered with.”",
    firstVisibleAt: "year1",
    origin: "intl",
    domain: "non-cs",
  },
  {
    id: "aditya",
    name: "Aditya",
    school: "IIT Bombay",
    short: "Never wrote code before October.",
    long:
      "Aditya, freshman @ IIT Bombay — “Never wrote code before October. Just shipped a Hindi-English translator my grandmother actually uses. Cursor Pro is the first paid software I’ve ever owned.”",
    firstVisibleAt: "year1",
    origin: "intl",
    domain: "cs",
  },
];

export function bubbleById(id: string): CafeBubble | undefined {
  return CAFE_BUBBLES.find((b) => b.id === id);
}
