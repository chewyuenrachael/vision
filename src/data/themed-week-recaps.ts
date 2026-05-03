import type { ThemedWeekRecap } from "@/lib/types";

/**
 * 12 themed-week recaps. SPEC §5.4 — newsletter voice. Slightly boring, no jokes,
 * no marketing diction. Every recap carries at least one detail a CS-only campus
 * program couldn't produce.
 */

export const THEMED_WEEK_RECAPS: ThemedWeekRecap[] = [
  {
    weekId: "ml",
    partners: ["CMU SCS", "AI Society", "MLD"],
    stats: [
      "212 attendees across five days",
      "6 faculty speakers, 2 industry visitors",
      "11 demos at the Friday showcase",
      "9 new student clubs invited Cursor staff to followup events",
    ],
    builds: [
      {
        builder: "Maya, MIT (visiting)",
        description:
          "A reproducibility checker that pulls a paper's released code and re-runs the headline experiment in a single Composer session.",
      },
      {
        builder: "Sam, CMU",
        description:
          "Workshop scaffolding for the AI Society — a session template that takes a beginner from empty repo to running model in eighty minutes.",
      },
      {
        builder: "Wei, CMU MLD",
        description:
          "A small evaluation harness for the lab's RLHF experiments. Generated overnight, used by two grad students the next morning.",
      },
    ],
    pullQuote: {
      text: "It was the first event our department co-hosted with a tools company where the workshops felt like our workshops.",
      attribution: "Prof. Graham Neubig, Faculty Host, CMU LTI",
    },
    photos: ["paper-highlight", "neural-net", "demo-flyer"],
  },
  {
    weekId: "neuro",
    partners: ["UCSD CogSci", "Salk Institute (visiting)"],
    stats: [
      "168 attendees across four days",
      "4 faculty speakers, 1 PI panel",
      "8 demos at the closing showcase",
      "3 students switched lab affiliations after the week",
    ],
    builds: [
      {
        builder: "Priya, UCSD",
        description:
          "A spike-train visualizer for an introductory computational neuroscience course. The CogSci department is folding it into next quarter's lab section.",
      },
      {
        builder: "Renata, UCSD",
        description:
          "An MNE-Python wrapper that takes new lab rotations from EEG file to first plot in a single guided notebook.",
      },
      {
        builder: "Jin, Salk (visiting)",
        description:
          "A small annotation tool for fluorescence microscopy stacks. Used by two rotation students for a paper draft the following month.",
      },
    ],
    pullQuote: {
      text: "Our rotations usually lose a week to environment setup. This week three rotations skipped the setup week entirely.",
      attribution: "Dr. Ana Martinez, PI, UCSD CogSci",
    },
    photos: ["brain-cluster", "office-hours", "demo-flyer"],
  },
  {
    weekId: "robotics",
    partners: ["Stanford SAIL", "Stanford ME", "ICRA student chapter"],
    stats: [
      "194 attendees across five days",
      "3 faculty speakers, 4 industry visitors",
      "9 demos at the closing showcase",
      "5 lab demo rigs ported to a shared template by Friday",
    ],
    builds: [
      {
        builder: "Alex, Stanford ME",
        description:
          "A ROS2 launch-file generator that reads a hardware spec sheet and emits a starter graph. Two SAIL labs adopted it during the week.",
      },
      {
        builder: "Hannah, Stanford CS",
        description:
          "A small simulator harness for sim-to-real transfer. The author and her advisor extended it into a paper appendix the following month.",
      },
      {
        builder: "Diego, Stanford ME",
        description:
          "Auto-generated test fixtures for a manipulation pipeline that used to take two grad students half a week to maintain.",
      },
    ],
    pullQuote: {
      text: "The students who came out of this week have a different working relationship with our codebases than the ones who didn't.",
      attribution: "Prof. Karen Liu, Faculty Host, Stanford SAIL",
    },
    photos: ["studio-tool", "paper-highlight", "demo-flyer"],
  },
  {
    weekId: "climate",
    partners: ["UW Atmospheric Sciences", "UW eScience Institute"],
    stats: [
      "146 attendees across four days",
      "5 faculty speakers, 1 NOAA visitor",
      "7 demos at the closing showcase",
      "2 lab notebooks promoted into reviewed teaching materials",
    ],
    builds: [
      {
        builder: "Eli, UW Atmospheric Sciences",
        description:
          "A small toolkit that batch-converts NetCDF and Zarr archives into reproducible analysis notebooks for the department's intro graduate course.",
      },
      {
        builder: "Mira, UW Earth & Space",
        description:
          "An xarray-aware refactor of the lab's seasonal forecast scripts. Cut runtime per ensemble member from twelve minutes to ninety seconds.",
      },
      {
        builder: "Tomás, UW eScience",
        description:
          "A teaching-only fork of the lab's data pipeline that strips authentication and runs against a cached subset for first-year students.",
      },
    ],
    pullQuote: {
      text: "We've been writing the same xarray boilerplate for years. This week was the first time it stopped being a tax on our science.",
      attribution: "Dr. Cecilia Bitz, Atmospheric Sciences, UW",
    },
    photos: ["satellite", "neural-net", "office-hours"],
  },
  {
    weekId: "humanities",
    partners: [
      "Cornell CIS",
      "Cornell Department of Comparative Literature",
      "Cornell Society for the Humanities",
    ],
    stats: [
      "118 attendees across four days",
      "6 faculty speakers from four departments",
      "9 demos at the closing showcase",
      "4 builds will be used in spring teaching",
    ],
    builds: [
      {
        builder: "Theo, Cornell Classics",
        description:
          "A Greek-text annotator that aligns critical apparatus with a working translation. The classics department picked it up for next semester's intro seminar.",
      },
      {
        builder: "Esme, Cornell Comparative Literature",
        description:
          "A corpus-alignment tool that pairs translations of the same text across editions for a comparative-literature paper draft.",
      },
      {
        builder: "Anders, Cornell Linguistics",
        description:
          "A morphology explorer for under-resourced languages, built around the department's existing field recordings.",
      },
    ],
    pullQuote: {
      text: "The week ended with three of my graduate students writing code without flinching. That sentence has never been true about a Cornell humanities cohort I've taught.",
      attribution:
        "Prof. Caroline Levine, Department of Literatures in English, Cornell",
    },
    photos: ["greek-margin", "argument", "paper-highlight"],
  },
  {
    weekId: "wetlab",
    partners: ["MIT CSAIL", "Whitehead Institute", "MIT Biology"],
    stats: [
      "138 attendees across four days",
      "4 faculty speakers, 2 staff scientists",
      "7 demos at the closing showcase",
      "5 wet-lab protocols moved into version-controlled notebooks",
    ],
    builds: [
      {
        builder: "Yusuf, Whitehead",
        description:
          "A microscopy-image triage script that scores cell-confluence images and flags batches that need a re-imaging pass.",
      },
      {
        builder: "Priya, MIT Biology",
        description:
          "A protocol-versioning sidecar for the lab's PCR workflows. Used by two benches the following week and by all four by month end.",
      },
      {
        builder: "Devon, MIT 6.1010 (visiting)",
        description:
          "A Slack bot that pings benches when long-running incubations complete. Built in two evenings during the week.",
      },
    ],
    pullQuote: {
      text: "I have never described a tools workshop to my wet-lab cohort and seen all of them stay through the demos. This is the first time.",
      attribution: "Dr. Iain Cheeseman, Whitehead Institute",
    },
    photos: ["protein-helix", "office-hours", "demo-flyer"],
  },
  {
    weekId: "law",
    partners: ["Columbia Law", "Columbia Engineering"],
    stats: [
      "92 attendees across three days",
      "5 faculty speakers, 2 visiting practitioners",
      "6 demos at the closing showcase",
      "2 builds entered the law school's clinical workflow review",
    ],
    builds: [
      {
        builder: "Reem, Columbia Law",
        description:
          "A clause comparator that aligns contract pairs against a small library of jurisdiction-aware annotations. Now reviewed for clinical use.",
      },
      {
        builder: "Jon, Columbia Law",
        description:
          "A redline-aware diff viewer that preserves margin comments. Adopted by a transactional clinic for a semester pilot.",
      },
      {
        builder: "Nora, Columbia Engineering",
        description:
          "A citation extractor that turns a brief into a structured table of authority. Built from one professor's paper requirements.",
      },
    ],
    pullQuote: {
      text: "We have not before given a software workshop time on our clinical schedule. We will again.",
      attribution: "Prof. Eben Moglen, Columbia Law",
    },
    photos: ["contract-clause", "argument", "paper-highlight"],
  },
  {
    weekId: "design",
    partners: ["RISD", "Brown CS", "Brown Center for Computational Design"],
    stats: [
      "126 attendees across four days",
      "4 faculty speakers from two institutions",
      "8 demos at the closing showcase",
      "3 studio classes adopted a workshop build",
    ],
    builds: [
      {
        builder: "Jordan, RISD",
        description:
          "A studio prototyping tool that generates printable layout templates from a moodboard. Three classmates use it weekly.",
      },
      {
        builder: "Aiden, Brown CS",
        description:
          "A typography sandbox that makes variable-font axes feel like sliders rather than configuration. Picked up by a Brown design course.",
      },
      {
        builder: "Saskia, RISD",
        description:
          "An exhibition-planner that lays out gallery walls from a CSV of works. Used to plan the spring graduation show.",
      },
    ],
    pullQuote: {
      text: "The studio professors who came in skeptical left asking when the next one is. That is rare here.",
      attribution: "Anastasia Azure, Faculty, RISD",
    },
    photos: ["studio-tool", "demo-flyer", "argument"],
  },
  {
    weekId: "bio",
    partners: ["UCSF Computational Biology", "Stanford Medicine"],
    stats: [
      "164 attendees across five days",
      "6 faculty speakers across two campuses",
      "10 demos at the closing showcase",
      "4 lab pipelines refactored on the closing day",
    ],
    builds: [
      {
        builder: "Sofia, UCSF",
        description:
          "An AlphaFold viewer the lab now opens in browser instead of running locally. Twelve thousand likes on the public version's demo clip.",
      },
      {
        builder: "Hassan, Stanford Medicine",
        description:
          "A patient-cohort builder that turns IRB-approved query plans into reusable notebooks. Two clinical fellows have adopted it.",
      },
      {
        builder: "Ling, UCSF",
        description:
          "A small wrapper around the lab's variant-calling pipeline that logs reproducibility metadata into the lab's existing electronic notebook.",
      },
    ],
    pullQuote: {
      text: "We do not normally let tools workshops on the wards. We will host the next one in our reading room.",
      attribution: "Dr. Atul Butte, UCSF",
    },
    photos: ["protein-helix", "neural-net", "office-hours"],
  },
  {
    weekId: "music",
    partners: ["Berklee", "MIT Media Lab Opera of the Future"],
    stats: [
      "108 attendees across four days",
      "5 faculty speakers across two institutions",
      "7 demos at the closing showcase",
      "3 builds shown in a public concert",
    ],
    builds: [
      {
        builder: "Cyrus, Berklee",
        description:
          "A conductor-cue scheduler that drives ensemble lighting from a score's bar lines. Used in a Berklee chamber concert.",
      },
      {
        builder: "Lila, MIT Media Lab",
        description:
          "A real-time vocal-effect rack with a small DSL for chaining filters. Built for a Media Lab vocal performance.",
      },
      {
        builder: "Kazuki, Berklee",
        description:
          "A practice-room logger that lets students annotate their own rehearsal recordings without leaving the practice room.",
      },
    ],
    pullQuote: {
      text: "I expected the music students to humor the workshop. They left with rehearsal tools they brought back to their ensembles.",
      attribution: "Tod Machover, MIT Media Lab",
    },
    photos: ["studio-tool", "demo-flyer", "tab-stream"],
  },
  {
    weekId: "astro",
    partners: ["Caltech Astronomy", "JPL Education Office"],
    stats: [
      "84 attendees across three days",
      "4 faculty speakers, 3 JPL engineers",
      "5 demos at the closing showcase",
      "2 builds used to triage a pre-existing dataset on Friday",
    ],
    builds: [
      {
        builder: "Pria, Caltech",
        description:
          "A transit-search assistant that screens light curves against the lab's existing detection criteria. Used to re-triage a Kepler subset.",
      },
      {
        builder: "Owen, Caltech",
        description:
          "A small helper for exoplanet atmosphere retrievals that wraps the lab's most-used MCMC routines.",
      },
      {
        builder: "Sasha, JPL",
        description:
          "A telemetry-replay viewer for student spacecraft mission projects. Used by three project teams the following week.",
      },
    ],
    pullQuote: {
      text: "I wasn't sure a tools week could survive being scheduled the week before the Caltech proposal deadline. It was the right week.",
      attribution: "Prof. Heather Knutson, Caltech Astronomy",
    },
    photos: ["satellite", "paper-highlight", "demo-flyer"],
  },
  {
    weekId: "hardware",
    partners: [
      "ETH Zürich Department of Information Technology",
      "TU Munich Chair of Robotics",
    ],
    stats: [
      "126 attendees across four days",
      "5 faculty speakers across two institutions",
      "8 demos at the closing showcase",
      "First Cursor-hosted week outside the United States",
    ],
    builds: [
      {
        builder: "Hana, ETH Zürich",
        description:
          "A satellite-imagery analyzer compressing a month-long climate analysis into a weekend. The first build from our European partner department.",
      },
      {
        builder: "Lukas, TU Munich",
        description:
          "A test-rig generator for the chair's manipulation lab. Two PhD students adopted it for their thesis chapters in the same week.",
      },
      {
        builder: "Marit, ETH Zürich",
        description:
          "An FPGA toolchain wrapper that takes a hardware student from synthesis to deployment without leaving the editor.",
      },
    ],
    pullQuote: {
      text: "We agreed to host this week as a pilot. We are already in conversations about doing it twice next year.",
      attribution: "Prof. Onur Mutlu, ETH Zürich",
    },
    photos: ["satellite", "studio-tool", "tab-stream"],
  },
];

export function recapForWeekId(
  weekId: string,
): ThemedWeekRecap | undefined {
  return THEMED_WEEK_RECAPS.find((r) => r.weekId === weekId);
}
