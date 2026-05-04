// Discipline check — runs against the source seed files.
// SPEC §4.3 / §7.6: no international voice before +360. SPEC §4.6 / §6.5:
// no marketing diction in student bubbles or Sam captions.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

function read(p) {
  return readFileSync(resolve(root, p), "utf8");
}

const bubblesSrc = read("src/data/cafe-bubbles.ts");
const polaroidsSrc = read("src/data/wall-polaroids.ts");
const loopsSrc = read("src/data/feedback-loops.ts");
const samSrc = read("src/data/sam-phases.ts");
const recapsSrc = read("src/data/themed-week-recaps.ts");
const weeksSrc = read("src/data/themed-weeks.ts");

const errors = [];

// 1. International bubbles must be firstVisibleAt: "year1"
const intlSchools = [
  "Tsinghua",
  "ETH",
  "IIT",
  "TU Munich",
  "NUS",
  "Cambridge",
  "Waterloo",
];
for (const school of intlSchools) {
  const re = new RegExp(`school:\\s*"[^"]*${school}[^"]*"[\\s\\S]*?firstVisibleAt:\\s*"(\\w+)"`);
  const m = bubblesSrc.match(re);
  if (m && m[1] !== "year1") {
    errors.push(`bubbles: ${school} appears with firstVisibleAt=${m[1]}, must be year1`);
  }
}

// 2. International schools on polaroids (if any) must be firstVisibleAt: year1
if (/caption:[^\n]*Tsinghua|ETH Zürich|IIT Bombay/.test(polaroidsSrc)) {
  const blocks = polaroidsSrc.split(/\{\s*id:\s*"p-/);
  for (const block of blocks.slice(1)) {
    if (!/caption:/.test(block)) continue;
    if (
      /Tsinghua|ETH Zürich|IIT Bombay/.test(block) &&
      !/firstVisibleAt:\s*"year1"/.test(block)
    ) {
      errors.push(
        "polaroids: international caption must use firstVisibleAt: year1",
      );
      break;
    }
  }
}

// 3. Themed weeks before April 2027 must be at US institutions
const usWeekIds = [
  "ml",
  "neuro",
  "robotics",
  "climate",
  "humanities",
  "wetlab",
  "law",
  "design",
  "bio",
  "music",
  "astro",
];
for (const id of usWeekIds) {
  const re = new RegExp(`id:\\s*"${id}"[\\s\\S]*?location:\\s*"([^"]+)"`);
  const m = weeksSrc.match(re);
  if (!m) {
    errors.push(`weeks: ${id} not found`);
    continue;
  }
  if (
    /Tsinghua|ETH|IIT|TU Munich|NUS|Cambridge|Waterloo|Europe/.test(m[1]) &&
    id !== "hardware"
  ) {
    errors.push(
      `weeks: ${id} should be at a US institution, found "${m[1]}"`,
    );
  }
}

// 4. Feedback loops landing at q1 / q2 must not name international authors
const loopBlocks = loopsSrc.split(/\{\s*id:\s*"loop-/).slice(1);
for (const block of loopBlocks) {
  const idM = block.match(/^([^"]+)/);
  const arrivesM = block.match(/arrivesAt:\s*"(\w+)"/);
  const affilM = block.match(/affiliation:\s*"([^"]+)"/);
  if (!idM || !arrivesM || !affilM) continue;
  const id = "loop-" + idM[1];
  const arrives = arrivesM[1];
  const affil = affilM[1];
  if (arrives === "q1" || arrives === "q2") {
    if (
      /Tsinghua|ETH|IIT|TU Munich|NUS|Cambridge|Waterloo/.test(affil)
    ) {
      errors.push(
        `feedback: ${id} arrives at ${arrives} but affiliation "${affil}" is international`,
      );
    }
  }
}

// 5. Marketing diction sweep — bubbles, sam captions, themed-week recaps.
const banned = [
  /\bamazing\b/i,
  /\bincredible\b/i,
  /\btransformative\b/i,
  /\brevolutionary\b/i,
  /\bgame[- ]chang/i,
];
for (const [name, src] of [
  ["bubbles", bubblesSrc],
  ["sam", samSrc],
  ["recaps", recapsSrc],
]) {
  for (const re of banned) {
    const m = src.match(re);
    if (m) {
      errors.push(`${name}: marketing diction "${m[0]}" found`);
    }
  }
}

if (errors.length > 0) {
  console.error("DISCIPLINE ERRORS:");
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}

console.log("Discipline check passed:");
console.log("  - geographic discipline: no intl voices before +360");
console.log("  - themed weeks: only Apr 2027 Europe pilot is non-US");
console.log("  - feedback loops: no early intl affiliations");
console.log("  - marketing diction sweep clean");
