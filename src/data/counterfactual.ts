import type { CounterfactualEndpoint } from "@/lib/types";

/**
 * Counterfactual endpoints. SPEC §8.2 — verbatim.
 */

export const COUNTERFACTUAL: CounterfactualEndpoint = {
  with: [
    "220 declared-standard labs across 60 institutions — 50 US (the Year 1 foundation, now mature) + 10 international (the Year 2–3 deliberate expansion).",
    "4,200 DHVC actives — concentrated at US top-20 in Years 1–2, expanding to ~25% international by Year 3 as the foundation supports it.",
    "Cohort 1 (US, 2026–2027) alumni now at OpenAI, Anthropic, Cursor, NVIDIA, three frontier labs, and 14 founded startups — all power users.",
    "The international ambassador network (started Q3 of Year 1, scaled in Years 2–3) covers ETH, Tsinghua, NUS, IIT Bombay, Waterloo, Cambridge — built on the playbook the US foundation produced.",
    "Cursor is the default answer when a 2030 grad is asked “what do you code with?”",
  ],
  without: [
    "Same enterprise revenue trajectory (this is the honest framing — enterprise growth doesn't depend on this program in the short run).",
    "No generational moat.",
    "The 2030 grad reaches for whatever Anthropic captured in 2026–2027.",
    "Cursor's procurement story relies on individual switching, which has 10× the CAC.",
  ],
  delta: {
    headline: "4,200 DHVC actives. None recoverable through marketing.",
    sub: "By April 2030, with the campus program vs. without.",
  },
};

/**
 * Discrete markers along the top "with" line, anchored to dates from May 2026
 * → April 2030. Each marker has a t-day offset and a short label.
 */
export const COUNTERFACTUAL_WITH_MARKERS: { tDays: number; label: string }[] = [
  { tDays: 92, label: "Cohort 1 launches · 45 ambassadors · 18 schools" },
  { tDays: 153, label: "First themed week · CMU" },
  { tDays: 214, label: "12 themed weeks running · 30 declared labs" },
  { tDays: 335, label: "Year 1 close · 100 ambassadors · 30 schools" },
  { tDays: 700, label: "Cohort 2 · first international pilots scaled" },
  { tDays: 1065, label: "120 declared-standard labs · 4 continents" },
  { tDays: 1431, label: "220 labs · 4,200 DHVC actives" },
];

export const COUNTERFACTUAL_WITHOUT_MARKERS: {
  tDays: number;
  label: string;
}[] = [
  { tDays: 92, label: "Marketing as usual" },
  { tDays: 700, label: "Same revenue, no generational moat" },
  { tDays: 1431, label: "2030 grad reaches for whatever Anthropic captured" },
];
