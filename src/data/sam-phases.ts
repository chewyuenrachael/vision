import type { Phase, SamPhaseContent } from "@/lib/types";

/**
 * Sam's four phases. SPEC §6.3 — verbatim. The protagonist isn't Sam, it's the
 * system; Sam is its proof. His face stays constant; his world thickens.
 */

export const SAM_PHASES: Record<Phase, SamPhaseContent> = {
  now: {
    phase: "now",
    setting: "Coffee shop in Pittsburgh, Sunday morning.",
    caption:
      "Sam, 19, just accepted into Cohort 1. He's read the playbook three times.",
    visible: [
      "Open laptop with onboarding playbook PDF",
      "Notebook with handwritten goals",
      "A coffee",
    ],
    calendar: ["Wed — first call with Rachael"],
    slack: [
      {
        channel: "DM · Rachael",
        preview: "Welcome to Cohort 1. Onboarding link inside →",
        unread: 1,
      },
    ],
  },
  q1: {
    phase: "q1",
    setting: "Same desk. Door open behind him to a campus office.",
    caption:
      "First Cafe Cursor next week. He's nervous about turnout. 27 will show. 31 will RSVP after.",
    visible: [
      "Laptop showing a Cafe Cursor flyer he designed",
      "Phone showing 27 RSVPs for his first event",
    ],
    calendar: [
      "Mon — flyer drop, GHC bulletin",
      "Wed — AI Society co-host sync",
      "Thu — Cafe Cursor (CMU GHC) · 6pm",
      "Fri — coffee with Prof. Neubig",
    ],
    slack: [
      {
        channel: "#ambassadors-cohort-1",
        preview: "Sam shared a flyer template. 4 reacts.",
        unread: 12,
      },
      {
        channel: "DM · Maya, MIT",
        preview: "Thanks for running the meetup, my advisor noticed.",
        unread: 1,
      },
    ],
  },
  q2: {
    phase: "q2",
    setting:
      "A small whiteboard in his apartment, scribbled with a Cursor × ML week run-of-show.",
    caption:
      "Running his first themed week with two professors. He hasn't asked Rachael for help in three weeks.",
    visible: [
      "Whiteboard: Cursor × ML run-of-show",
      "Three Post-its: talk to Dr. K's lab · confirm catering · ask Maya about demo",
    ],
    calendar: [
      "Mon-Fri — Cursor × ML Week",
      "Co-hosting with HKN, ACM, AI Society",
      "Tue — site visit, Dr. Kalra's lab",
      "Wed — catering confirm, GHC 4307",
      "Thu — closing showcase prep with Maya",
    ],
    slack: [
      {
        channel: "#cursor-x-ml-week",
        preview: "Schedule v3 in pinned. Dry run Tuesday.",
        unread: 38,
      },
      {
        channel: "#ambassadors-cohort-1",
        preview: "Stanford ambassador sharing a recap template.",
        unread: 24,
      },
      {
        channel: "DM · Columbia ambassador",
        preview: "Stealing your speaker-confirm script, hope that's ok.",
        unread: 4,
      },
      {
        channel: "DM · Maya, MIT",
        preview: "Demo deck v2 attached. See you Thursday.",
        unread: 2,
      },
    ],
  },
  year1: {
    phase: "year1",
    setting:
      "Same desk, slightly more lived-in. A Cursor × ML Week poster on the wall. A small framed photo of his Cohort 1 group.",
    caption:
      "Sam graduates in 14 months. He's interviewing his successor. The CMU community will outlast him — and the US foundation, now ~100 ambassadors across 30 schools, is finally strong enough that the first international pilots are coming online.",
    visible: [
      "Notion doc: Cohort 2 — CMU lead succession plan",
      "Zoom: 3 candidate ambassador interviewees",
      "Post-its layered three deep",
    ],
    calendar: [
      "Mon — Cohort 2 weekly",
      "Tue — Interview: junior CS, AI Society VP · 2pm",
      "Thu — Hand-off lunch with Lily (Cohort 2)",
      "Fri — Office hours with three new freshmen ambassadors",
      "Sat — Talk at HackCMU",
    ],
    slack: [
      {
        channel: "#ambassadors-cohort-2",
        preview: "Sam answering a Brown ambassador's q before Rachael sees it.",
        unread: 47,
      },
      {
        channel: "#intl-pilot",
        preview: "ETH and Tsinghua leads added. Sam reading, not posting yet.",
        unread: 12,
      },
      {
        channel: "#alumni-cohort-1",
        preview: "Three Cohort 1 alums shared their first OpenAI/Cursor week.",
        unread: 8,
      },
      {
        channel: "DM · Lily (Cohort 2 CMU)",
        preview: "Hand-off doc draft. Want to review Thursday?",
        unread: 2,
      },
    ],
  },
  // Counterfactual scene drives the slider into "future" but Sam's panel does
  // not extrapolate past Year 1 (SPEC §6.5). We mirror the year1 content here.
  future: {
    phase: "future",
    setting:
      "Same desk, slightly more lived-in. A Cursor × ML Week poster on the wall. A small framed photo of his Cohort 1 group.",
    caption:
      "Sam graduates in 14 months. He's interviewing his successor. The CMU community will outlast him — and the US foundation, now ~100 ambassadors across 30 schools, is finally strong enough that the first international pilots are coming online.",
    visible: [
      "Notion doc: Cohort 2 — CMU lead succession plan",
      "Zoom: 3 candidate ambassador interviewees",
      "Post-its layered three deep",
    ],
    calendar: [
      "Mon — Cohort 2 weekly",
      "Tue — Interview: junior CS, AI Society VP · 2pm",
      "Thu — Hand-off lunch with Lily (Cohort 2)",
      "Fri — Office hours with three new freshmen ambassadors",
      "Sat — Talk at HackCMU",
    ],
    slack: [
      {
        channel: "#ambassadors-cohort-2",
        preview: "Sam answering a Brown ambassador's q before Rachael sees it.",
        unread: 47,
      },
      {
        channel: "#intl-pilot",
        preview: "ETH and Tsinghua leads added. Sam reading, not posting yet.",
        unread: 12,
      },
      {
        channel: "#alumni-cohort-1",
        preview: "Three Cohort 1 alums shared their first OpenAI/Cursor week.",
        unread: 8,
      },
      {
        channel: "DM · Lily (Cohort 2 CMU)",
        preview: "Hand-off doc draft. Want to review Thursday?",
        unread: 2,
      },
    ],
  },
};
