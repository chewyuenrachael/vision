import type { ThemedWeek } from "@/lib/types";

/**
 * The 12 themed weeks. SPEC §5.2 — verbatim title, location, date.
 * monthDate uses the first of the month for status logic.
 *
 * Year-1 sequencing made visible: every week through March 2027 is at a US
 * institution. The first international week (Cursor × Hardware at ETH × TU
 * Munich) appears only at +360, framed as a "Europe pilot."
 */

export const THEMED_WEEKS: ThemedWeek[] = [
  {
    id: "ml",
    number: 1,
    title: "Cursor × ML",
    location: "CMU SCS",
    monthDate: new Date(Date.UTC(2026, 8, 1)),
    monthLabel: "Sept 2026",
    firstVisibleAt: "q1",
  },
  {
    id: "neuro",
    number: 2,
    title: "Cursor × Neuro",
    location: "UCSD CogSci",
    monthDate: new Date(Date.UTC(2026, 9, 1)),
    monthLabel: "Oct 2026",
    firstVisibleAt: "q1",
  },
  {
    id: "robotics",
    number: 3,
    title: "Cursor × Robotics",
    location: "Stanford SAIL",
    monthDate: new Date(Date.UTC(2026, 10, 1)),
    monthLabel: "Nov 2026",
    firstVisibleAt: "q2",
  },
  {
    id: "climate",
    number: 4,
    title: "Cursor × Climate",
    location: "UW Atmospheric Sciences",
    monthDate: new Date(Date.UTC(2026, 10, 1)),
    monthLabel: "Nov 2026",
    firstVisibleAt: "q2",
  },
  {
    id: "humanities",
    number: 5,
    title: "Cursor × Humanities",
    location: "Cornell CIS",
    monthDate: new Date(Date.UTC(2026, 11, 1)),
    monthLabel: "Dec 2026",
    firstVisibleAt: "q2",
  },
  {
    id: "wetlab",
    number: 6,
    title: "Cursor × Wet Lab",
    location: "MIT CSAIL × Whitehead",
    monthDate: new Date(Date.UTC(2027, 0, 1)),
    monthLabel: "Jan 2027",
    firstVisibleAt: "q2",
  },
  {
    id: "law",
    number: 7,
    title: "Cursor × Law",
    location: "Columbia Law",
    monthDate: new Date(Date.UTC(2027, 1, 1)),
    monthLabel: "Feb 2027",
    firstVisibleAt: "year1",
  },
  {
    id: "design",
    number: 8,
    title: "Cursor × Design",
    location: "RISD × Brown",
    monthDate: new Date(Date.UTC(2027, 1, 1)),
    monthLabel: "Feb 2027",
    firstVisibleAt: "year1",
  },
  {
    id: "bio",
    number: 9,
    title: "Cursor × Bio",
    location: "UCSF × Stanford Med",
    monthDate: new Date(Date.UTC(2027, 2, 1)),
    monthLabel: "Mar 2027",
    firstVisibleAt: "year1",
  },
  {
    id: "music",
    number: 10,
    title: "Cursor × Music",
    location: "Berklee × MIT Media Lab",
    monthDate: new Date(Date.UTC(2027, 2, 1)),
    monthLabel: "Mar 2027",
    firstVisibleAt: "year1",
  },
  {
    id: "astro",
    number: 11,
    title: "Cursor × Astro",
    location: "Caltech × JPL",
    monthDate: new Date(Date.UTC(2027, 3, 1)),
    monthLabel: "Apr 2027",
    firstVisibleAt: "year1",
  },
  {
    id: "hardware",
    number: 12,
    title: "Cursor × Hardware (Europe pilot)",
    location: "ETH Zürich × TU Munich",
    monthDate: new Date(Date.UTC(2027, 3, 1)),
    monthLabel: "Apr 2027",
    firstVisibleAt: "year1",
  },
];
