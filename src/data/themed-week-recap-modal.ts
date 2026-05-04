import type { SketchId } from "@/lib/types";

/** Rich modal content — ambassador voice + proof stack (pairs with THEMED_WEEK_RECAPS). */
export interface RecapModalAugment {
  ambassadorRecap: string;
  outcomeBullets: [string, string, string];
  studentSpotlight: { sketchId: SketchId; caption: string };
  runBy: string;
}

export const RECAP_MODAL_AUGMENT: Record<string, RecapModalAugment> = {
  ml: {
    ambassadorRecap:
      "We didn’t hand CMU a deck — we built the week with them. By Friday the faculty hosts were pitching Cursor-shaped assignments to each other in the hallway.",
    outcomeBullets: [
      "Two MLD labs committed to Composer-first refactor Fridays.",
      "Neubig’s group shipped a teaching fork of a workshop build into the intro grad syllabus.",
      "Six product observations from TAs cleared Beacon’s router with severity tags for eng.",
    ],
    studentSpotlight: {
      sketchId: "paper-highlight",
      caption: "Wei, CMU — RLHF harness adopted next morning.",
    },
    runBy: "Sam, Cohort 1 · CMU",
  },
  neuro: {
    ambassadorRecap:
      "UCSD rotations are brutal on setup time. We structured the week so “first plot from raw EEG” happened in one sitting — rotations felt it immediately.",
    outcomeBullets: [
      "CogSci adopted Priya’s spike visualizer into next quarter’s lab section.",
      "Salk visitors took two builds back; one became a paper appendix.",
      "Fourteen feedback items tagged ‘notebook agents’ hit the weekly engineering digest.",
    ],
    studentSpotlight: {
      sketchId: "brain-cluster",
      caption: "Renata, UCSD — first-plot notebook for rotations.",
    },
    runBy: "Priya, Cohort 1 · UCSD",
  },
  robotics: {
    ambassadorRecap:
      "Stanford ME and SAIL don’t usually share rigs. This week they merged launch-file templates so sim-to-real stopped being a tribal ritual.",
    outcomeBullets: [
      "Five manipulation rigs ran off the same ROS2 starter graph by Friday.",
      "Two labs filed internal ‘Cursor standard’ notes to their PIs.",
      "Hardware TA office hours moved into Composer with tracked suggestions.",
    ],
    studentSpotlight: {
      sketchId: "studio-tool",
      caption: "Hannah, Stanford — sim harness → paper appendix.",
    },
    runBy: "Kai, Cohort 1 · Stanford",
  },
  climate: {
    ambassadorRecap:
      "xarray isn’t a vibe — it’s infrastructure. We turned a week of lectures into repeatable notebooks the department can defend in curriculum review.",
    outcomeBullets: [
      "Atmospheric Sciences promoted two notebooks into reviewed teaching materials.",
      "NOAA visitor flagged three NetCDF edge cases; two shipped as template fixes.",
      "eScience ran a follow-up clinic without Cursor staff on-site.",
    ],
    studentSpotlight: {
      sketchId: "satellite",
      caption: "Eli, UW — seasonal ensemble script cut to 90s.",
    },
    runBy: "Eli, Cohort 1 · UW",
  },
  humanities: {
    ambassadorRecap:
      "Cornell humanities doesn’t need ‘AI hype’ — it needs diacritics, alignment, and respect for editions. We proved the toolchain could keep up with seminar pace.",
    outcomeBullets: [
      "Comparative lit adopted a corpus-alignment build for spring syllabus.",
      "Three departments asked for spring ‘office hours in Cursor’ slots.",
      "Classics TA pilot logged the Greek-token issue that later shipped Unicode-wide.",
    ],
    studentSpotlight: {
      sketchId: "greek-margin",
      caption: "Theo, Cornell — Greek annotator → spring seminar.",
    },
    runBy: "Theo, Cohort 1 · Cornell",
  },
  wetlab: {
    ambassadorRecap:
      "Wet labs don’t forgive fragile glue code. We kept demos short, notebooks versioned, and let benches steal scripts bench-to-bench without shame.",
    outcomeBullets: [
      "Whitehead benches adopted a confluence triage script within a week.",
      "MIT Biology folded a PCR protocol sidecar into two rotation flows.",
      "Seven observations on long-run agents became a single ‘incubator’ eng ticket.",
    ],
    studentSpotlight: {
      sketchId: "protein-helix",
      caption: "Yusuf, Whitehead — imaging triage on real stacks.",
    },
    runBy: "Priya, Cohort 1 · MIT Biology",
  },
  law: {
    ambassadorRecap:
      "Columbia Law runs on clinical credibility. We earned calendar time by routing every build through faculty review language they already trust.",
    outcomeBullets: [
      "Transactional clinic piloted a redline viewer for a semester cohort.",
      "Two builds entered clinical workflow review with named faculty sponsors.",
      "Citation tooling request became the MCP template story engineering knows by name.",
    ],
    studentSpotlight: {
      sketchId: "contract-clause",
      caption: "Reem, Columbia Law — clause comparator under review.",
    },
    runBy: "Reem, Cohort 1 · Columbia Law",
  },
  design: {
    ambassadorRecap:
      "RISD and Brown share students but not tools. We made the week bilingual — studio craft on one wall, CS rigor on the other — without either feeling like a guest.",
    outcomeBullets: [
      "Three studio classes adopted workshop builds before grades were due.",
      "Variable-font sandbox picked up by a Brown design course mid-semester.",
      "Faculty asked for a repeating ‘spring critique’ slot — self-serve template in Library v1.2.",
    ],
    studentSpotlight: {
      sketchId: "studio-tool",
      caption: "Jordan, RISD — printable layouts from moodboards.",
    },
    runBy: "Marcus, Cohort 1 · Brown",
  },
  bio: {
    ambassadorRecap:
      "UCSF and Stanford Med don’t need more demos — they need IRB-respecting velocity. We kept every build inside approvable notebooks.",
    outcomeBullets: [
      "Four lab pipelines refactored on the closing day with named PIs watching.",
      "AlphaFold browser viewer replaced a brittle local install for twelve grad students.",
      "Clinical fellows adopted a cohort-builder with logging the IRB contact signed off on.",
    ],
    studentSpotlight: {
      sketchId: "protein-helix",
      caption: "Sofia, UCSF — AlphaFold viewer → daily driver.",
    },
    runBy: "Sofia, Cohort 1 · UCSF",
  },
  music: {
    ambassadorRecap:
      "Berklee and Media Lab care about performance, not slides. We optimized for ‘rehearsal night’: builds had to survive a real room, not a screenshot.",
    outcomeBullets: [
      "Three builds appeared in a public concert the same week as workshops.",
      "Berklee ensemble adopted a cue-scheduler for chamber lighting.",
      "Media Lab vocal performance shipped a DSL chain students still extend.",
    ],
    studentSpotlight: {
      sketchId: "tab-stream",
      caption: "Lila, MIT Media Lab — live vocal FX rack.",
    },
    runBy: "Maya, Cohort 1 · MIT",
  },
  astro: {
    ambassadorRecap:
      "Caltech proposal week is a stress test. If the tools week survived that calendar, it wasn’t decorative — it was load-bearing.",
    outcomeBullets: [
      "Transit-search assistant re-triaged an existing Kepler subset on Friday.",
      "JPL education adopted a telemetry viewer for three student mission teams.",
      "Four faculty sent ‘run again next year’ notes without Cursor staff prompting.",
    ],
    studentSpotlight: {
      sketchId: "satellite",
      caption: "Pria, Caltech — light-curve triage in one session.",
    },
    runBy: "Pria, Cohort 1 · Caltech",
  },
  hardware: {
    ambassadorRecap:
      "Europe wasn’t a junket — it was a pilot with receipts. ETH and TUM treated the week as infrastructure review, not marketing.",
    outcomeBullets: [
      "First non-US Cursor week completed with faculty sign-off in both cities.",
      "Two thesis chapters adopted a test-rig generator the same month.",
      "FPGA wrapper build became the reference for ‘long-file hardware’ feedback.",
    ],
    studentSpotlight: {
      sketchId: "satellite",
      caption: "Hana, ETH — climate analysis compressed to a weekend.",
    },
    runBy: "Lukas, Cohort 1 · TU Munich",
  },
};
