import type { FeedbackLoop } from "@/lib/types";

/**
 * The 7 feedback loops. SPEC §7.2 — verbatim. All early loops are US.
 * International voices appear only in loops landing at +360.
 */

export const FEEDBACK_LOOPS: FeedbackLoop[] = [
  {
    id: "loop-1",
    number: 1,
    observation: {
      author: "Sam",
      affiliation: "CMU",
      text: "Composer struggles with PyTorch type hints in research code.",
    },
    shipped: {
      feature: "Composer 2.1",
      description: "Type-aware completions for typed Python.",
    },
    arrivesAt: "q1",
    latencyWeeks: 6,
  },
  {
    id: "loop-2",
    number: 2,
    observation: {
      author: "Lin",
      affiliation: "Stanford NLP lab",
      text: "Lab's tokenizer code is too long for context window during refactor.",
    },
    shipped: {
      feature: "Larger context mode",
      description: "Long-file refactor mode shipped.",
    },
    arrivesAt: "q1",
    latencyWeeks: 8,
  },
  {
    id: "loop-3",
    number: 3,
    observation: {
      author: "Theo",
      affiliation: "Cornell classics",
      text: "Cursor doesn't recognize ancient Greek diacritics in strings.",
    },
    shipped: {
      feature: "Unicode-aware tokenization",
      description: "Non-Latin text handled correctly across the editor.",
    },
    arrivesAt: "q2",
    latencyWeeks: 7,
  },
  {
    id: "loop-4",
    number: 4,
    observation: {
      author: "Eli",
      affiliation: "UW Atmospheric Sciences",
      text: "NetCDF and Zarr workflows are common in our lab; Cursor's autocomplete misses the conventions.",
    },
    shipped: {
      feature: "Domain-pack: scientific Python",
      description: "xarray, scipy, netCDF added to default templates.",
    },
    arrivesAt: "q2",
    latencyWeeks: 9,
  },
  {
    id: "loop-5",
    number: 5,
    observation: {
      author: "MIT 6.5840 TAs",
      affiliation: "MIT",
      text: "Students keep accepting suggestions without reading them. Hard for grading.",
    },
    shipped: {
      feature: "Learning Mode (beta)",
      description:
        "Opt-in mode that asks Socratic questions before generating.",
    },
    arrivesAt: "q2",
    latencyWeeks: 11,
  },
  {
    id: "loop-6",
    number: 6,
    observation: {
      author: "Sofia",
      affiliation: "UCSF computational bio",
      text: "Protein-folding repos use Jupyter heavily; agent loses state across cells.",
    },
    shipped: {
      feature: "Notebook-aware agent context",
      description: "Agent reads full notebook state across cells.",
    },
    arrivesAt: "year1",
    latencyWeeks: 8,
  },
  {
    id: "loop-7",
    number: 7,
    observation: {
      author: "Reem",
      affiliation: "Columbia Law",
      text: "Legal-pack: contract clause autocomplete for transactional clinics.",
    },
    shipped: {
      feature: "MCP server template",
      description:
        "In development — reference template for jurisdiction-aware citation tooling (ETA Q2 2027).",
    },
    arrivesAt: "year1",
    latencyWeeks: 10,
    productPending: true,
  },
];

export const MEDIAN_LATENCY_WEEKS = 8.2;
