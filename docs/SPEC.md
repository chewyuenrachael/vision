# Cursor Campus — Vision Artifact Build Spec

**Author:** Rachael Chew
**Repo target:** `vision` → deployed to Vercel
**Stack:** Next.js (App Router) + React + Tailwind + Framer Motion. Single-page, single-route. No backend.
**Working title (URL):** `cursor-campus.vercel.app` or `campus-vision.vercel.app`

---

## 0 · Why this artifact exists

This is not a marketing site. It is the **vision layer** that anchors my 30-60-90 plan to a thesis a viewer can feel in 90 seconds.

Beacon shows *how the role operates*. This artifact shows *what world the role creates*.

The two are complementary. Beacon is the cockpit. This is the map of the territory.

The strategic bet, restated for the artifact's purpose:

> The students who'll choose tools at frontier labs and AI-native startups in 2030 are TAs and lab members at MIT, Stanford, CMU, Berkeley, Columbia *right now*. There are roughly 5,000 of them — DHVC. Get Cursor into those labs, that classroom AI policy, and that Twitter feed, and we own the next decade.

Two emotional anchors carry the artifact:

- **Awe** — the surface emotion. Students reimagining what software is, with Cursor as the tool that lets them.
- **Compounding** — the mechanism underneath. One PI → 20 grad students → 60 undergrads/section → cluster norms → graduating cohort → enterprise procurement.

If a viewer leaves without feeling both, the artifact has failed.

---

## 1 · Strategic frame the artifact must communicate

These are the four claims the artifact has to land. Every scene is a vehicle for at least one of them.

| # | Claim | Scene that carries it |
|---|---|---|
| 1 | Cascade is the mechanism — labs and TAs propagate downward in a way individual outreach can't | Cafe (back wall density), Sam's Week (his world compounds while he stays one person), Counterfactual |
| 2 | The category is bigger than CS — biotech, climate, humanities, neuro builders are part of the future | Themed Week Wall, Cafe (non-CS bubbles), Wall fragments inside cafe |
| 3 | The campus program is a product feedback channel no competitor has | Feedback Loop |
| 4 | Freshmen are the moat — the lock-in window is closing right now | Implicit through Sam's progression and the cafe's growing first-year cohort |
| 5 | Year 1 is anchored on US top-20 schools; international expansion is deliberate, sequenced, and starts only after the US foundation is strong (~Dec 2026) | Cafe composition by phase, themed week sequencing, Sam staying in CMU while peers spread |

The Cascade Map and Living Discord and Year-1 Lock visualizations from the earlier brainstorm are **deferred** — they're either too engineering-aesthetic (Cascade Map) or duplicate emotional work the chosen scenes already do (Living Discord, Wall of Awe standalone). Decision rationale documented in §13.

---

## 2 · What ships (the four scenes)

Four scenes, in this order, on a single scrolling page. A persistent timeline slider at the top of the viewport drives all four simultaneously.

1. **Buzzing Cafe** — the emotional anchor. A scene that breathes.
2. **Themed Week Wall** — strategic ambition. Cursor isn't just for CS.
3. **Sam's Week** — human-scale answer to "who runs this?"
4. **The Feedback Loop** — proves the program makes the *product* better.

Below the four scenes, a fifth section: a **Counterfactual strip** as the closer. Two timelines diverging. Single drag.

A small fixed footer carries the actual 30-60-90 anchor links — Beacon, ambassador program design, this spec — so a viewer can drill from vision to mechanism.

---

## 3 · The global timeline slider (the spine of the whole artifact)

Every scene reacts to one piece of state: a single date `t`. The slider controls `t`. Everything else is derivative.

### 3.1 Range

`t` ranges from **May 2026** to **April 2027**, anchored at four canonical stops:

| Label | Date | What it represents |
|---|---|---|
| **Now** | May 2026 | Day 1 of the role. Almost nothing exists. |
| **+90** | August 2026 | End of Q1. First wedges. Cohort 1. First lab declarations. |
| **+180** | December 2026 | End of Q2. Themed weeks running. Cafe has texture. |
| **+360** | April 2027 | End of Year 1. Wall is wallpaper. Sam is interviewing his successor. |

A secondary mode unlocks the slider to extend to **April 2030** for the Counterfactual scene only. The first four scenes don't extrapolate past April 2027 — keep the in-year claims grounded.

### 3.2 Implementation

- One React context: `<TimelineProvider>` exposes `{ t, setT, label, phase }` where `phase ∈ { now, q1, q2, year1, future }`.
- Slider component is `position: sticky; top: 0` with a translucent backdrop (`bg-white/80 backdrop-blur`).
- Drag is throttled to ~60fps. State updates via `requestAnimationFrame` to avoid jank when many scenes animate at once.
- Keyboard: `←` / `→` step ±15 days. `1` `2` `3` `4` jump to the four canonical stops.
- The slider rail shows four labeled tick marks at the canonical stops with their phase names. Active phase tick is filled.

### 3.3 The "phase" abstraction

Most scenes don't care about exact dates — they care about which phase they're in. Each scene reads `phase` and picks a phase-keyed object of content (e.g. `cafeContent[phase]`). Smooth visual interpolation between phases handled by Framer Motion `<AnimatePresence>` with `mode="popLayout"`.

This makes content authoring radically simpler: I write four states per scene, not 360.

---

## 4 · Scene 1 — The Buzzing Cafe

The emotional anchor. If a viewer remembers one image, it's this one.

### 4.1 What it is

One fixed-camera scene. Warm lighting, slight grain texture, the muted Cursor palette (cream / charcoal / one accent). Aerial-ish three-quarter view of a cafe interior — **think a single hand-drawn illustration, not a 3D render**. Tables, chairs, a counter at the back, a corkboard on the back wall.

Abstract human silhouettes — minimal, no faces, gestural. Each silhouette has a small speech bubble that fades in on hover. The cafe gets denser and louder as `t` advances.

### 4.2 What changes with `t`

| Phase | Silhouettes | Bubbles visible | Back wall | Geographic mix | Atmosphere |
|---|---|---|---|---|---|
| **Now** | 5 | 2 | empty corkboard | 100% US (MIT, Stanford) | quiet, warm |
| **+90** | 12 | 5 | 3 polaroids | 100% US — top-5 schools | conversations forming |
| **+180** | 28 | 9 | 14 polaroids | ~90% US (top-20 spread) + 1 ambient international | overlapping clusters |
| **+360** | 50 | 14 | 40+ polaroids overflowing the corkboard | ~80% US + 3 international (deliberate Q3 wedge) | full, alive, slightly chaotic |

Visual signals of "louder":
- Background hue shifts subtly warmer
- Faint lines indicating overlapping conversations between silhouettes (curved dotted arcs)
- Small ambient details fade in — coffee cups, laptops, a Cursor sticker on a closed laptop lid in +180+

### 4.3 The bubbles (this is where the awe lives)

Each bubble is a one-liner attached to one silhouette. Hover reveals a small card with the longer story. **Aspirational specificity** — name, school, what they built. They don't need to be real students. They need to feel like real students.

Authoring rules:
- **Geographic discipline is the spine.** Year 1 is anchored on US top-20. International appears only as the slider crosses into +180 (December 2026), and even then sparingly. By +360 (April 2027) the cafe still reads as predominantly US, with ~3 international voices visible — the first wave of deliberate expansion. This is not an oversight; it is the strategy.
  - **+90 (Aug 2026):** 100% US. MIT, Stanford, CMU, Berkeley, Columbia. No international voices yet.
  - **+180 (Dec 2026):** ~90% US. One international bubble appears (a single Tsinghua or ETH voice), framed as ambient — a student who found Cursor independently. Signals the international demand is real and pulling on us, not the other way around.
  - **+360 (Apr 2027):** ~80% US, ~20% international. Three international voices visible. The international cohort is the Q3 wave we deliberately seeded — the foundation under it is unmistakably US.
- Mix experience levels: first-year who'd never coded, sophomore TA, PhD student, postdoc.
- Mix CS and non-CS deliberately — the *category* expansion (CS → bio, neuro, humanities) happens earlier and faster than the *geographic* expansion. By +180, ~30% non-CS. By +360, ~40% non-CS. This matters: we go *wider* in the US before we go *farther* outside it.
- Concrete builds, not vague claims. "A Greek-text annotator" not "a literature tool."

Authored bubbles for `+360` (write all 14 in the seed file `data/cafe-bubbles.ts`). Each bubble carries a `firstVisibleAt` field — `now`, `+90`, `+180`, or `+360` — so the cafe's geographic and category mix unfolds correctly as the slider advances.

**US foundation (visible from +90 onward — Year 1's spine):**

1. Maya, CS sophomore @ MIT — "Reproduced a CSAIL paper in a weekend. Composer caught a bug in the original code." *(visible from +90)*
2. Lin, PhD @ Stanford NLP — "My whole lab moved to Cursor in November. Saved me a quarter on my thesis chapter." *(visible from +90)*
3. Devon, TA for 6.1010 @ MIT — "Office hours are different now. Students bring better questions." *(visible from +90)*
4. Marcus, CS senior @ Howard — "Got my first internship offer from a Cursor power-user demo I posted." *(visible from +90)*
5. Kai, philosophy + CS @ Berkeley — "I cared about the argument. Cursor handled the syntax. We disagree about what 'thinking' means now." *(visible from +90)*

**US category expansion — the cafe goes wider before it goes farther (visible from +180):**

6. Theo, classics major @ Cornell — "Built a Greek-text annotator for my thesis. The classics professor is using it next semester." *(visible from +180)*
7. Priya, CS junior @ UCSD — "Cursor × Neuro week made me switch labs. Now I'm doing computational neuro." *(visible from +180)*
8. Jordan, design major @ RISD — "I'm not a CS student. I built a prototype tool for our studio class. Three classmates use it." *(visible from +180)*
9. Sofia, bio PhD @ UCSF — "Vibe-coded a protein folding viz over a weekend. Twelve thousand likes on Twitter." *(visible from +180)*
10. Reem, law student @ Columbia — "Built a contract-clause comparator. My professor asked if she could share it." *(visible from +180)*
11. Aisha, CS freshman @ Georgia Tech — "Started Cursor at orientation. I've never coded any other way." *(visible from +180)*

**The international wedge — appears only after the US foundation is strong (visible from +360):**

12. Chen, sophomore @ Tsinghua — "Tab is faster than I can think. I write better Rust than my TA. Found Cursor on Twitter, then half my dorm joined." *(visible from +360 — the inbound signal that justifies our Q3 international move)*
13. Hana, climate science @ ETH Zürich — "Satellite imagery analysis used to take a month. Now it takes a weekend. Our department's the first in Europe Cursor formally partnered with." *(visible from +360 — first deliberate international partnership)*
14. Aditya, freshman @ IIT Bombay — "Never wrote code before October. Just shipped a Hindi-English translator my grandmother actually uses. Cursor Pro is the first paid software I've ever owned." *(visible from +360 — the access wedge: the discount program closing the international gap)*

For phases earlier than `+360`, show a strict subset of these (their indices baked in per phase). The point isn't completeness; it's that the cafe has texture and the texture grows.

### 4.4 The corkboard / back wall (the embedded Wall of Awe)

This is how Wall of Awe gets represented in the artifact without building a standalone library.

Visual: a corkboard on the back wall. Polaroids pinned at slight rotations. Each polaroid has:
- A muted screenshot or sketch of the project
- The builder's name and school in small handwriting font
- A date

As `t` advances, polaroids appear with a subtle pin-drop animation. By `+360` they overflow the corkboard frame onto the wall around it.

Hover any polaroid → it lifts forward slightly, the project description expands.

The 12 polaroids for `+360` (subset shown in earlier phases) live in `data/wall-polaroids.ts`. They share names with the bubble authors — i.e., when you hover Maya's bubble, you can see her polaroid on the wall, and vice versa. Reinforces that the cafe and the wall are one community, not two features.

### 4.5 Implementation notes

- Single SVG illustration as the base layer. Hand-illustrated or generated then heavily edited. Either way, **must look bespoke, not stock**.
- Silhouettes as separate SVG elements layered on top, each absolutely positioned with phase-keyed coordinates.
- Bubbles are `<motion.div>` with `whileHover` expanding to story card. Pointer events on bubble; bubble does not block underlying silhouettes for click.
- Polaroids: small image + text, slight skew via `transform`, drop shadow. `framer-motion` `layoutId` for the lift-on-hover effect.
- Performance: ~50 silhouettes + 40 polaroids at peak = ~90 absolutely positioned animated elements. Test on mid-range laptop. If laggy, drop bubble counts to 30 and polaroids to 30.
- Do NOT add ambient sound. Tempting; wrong call. Sound is friction in any context where this is opened on a laptop in a meeting.

### 4.6 Failure modes to avoid

- **Generic stock illustration.** Kills it instantly. Better to have a rougher hand-drawn cafe than a polished generic one.
- **Too many bubbles open at once.** Bubble density should suggest noise; only one expanded story card at a time. All others are tiny ambient bubbles.
- **Silhouettes that look like data viz.** They should look like *people in a place*. Posture variation matters. One leaning over a laptop. One mid-conversation. One at the counter.
- **Captions that read like marketing.** No "amazing," "incredible," "transformative." The bubbles speak in students' voices.

---

## 5 · Scene 2 — The Themed Week Wall

The strategic-ambition scene. This is where I show that the campus program isn't just CS clubs — it's Cursor entering departments and communities where it doesn't naturally belong.

### 5.1 What it is

A grid of cards. Each card is a themed week. Each card has a status that depends on `t`: `upcoming`, `running`, or `happened`.

Visual: corkboard or pinboard aesthetic, slightly different from the cafe wall. Cards slightly larger, with more text. Imagine event flyers pinned to a grad-school department bulletin board.

### 5.2 The 12 themed weeks (full grid)

| # | Title | Location | Date | Phase first appears |
|---|---|---|---|---|
| 1 | Cursor × ML | CMU SCS | Sept 2026 | +90 |
| 2 | Cursor × Neuro | UCSD CogSci | Oct 2026 | +90 |
| 3 | Cursor × Robotics | Stanford SAIL | Nov 2026 | +180 |
| 4 | Cursor × Climate | UW Atmospheric Sciences | Nov 2026 | +180 |
| 5 | Cursor × Humanities | Cornell CIS | Dec 2026 | +180 |
| 6 | Cursor × Wet Lab | MIT CSAIL × Whitehead | Jan 2027 | +180 |
| 7 | Cursor × Law | Columbia Law | Feb 2027 | +360 |
| 8 | Cursor × Design | RISD × Brown | Feb 2027 | +360 |
| 9 | Cursor × Bio | UCSF × Stanford Med | Mar 2027 | +360 |
| 10 | Cursor × Music | Berklee × MIT Media Lab | Mar 2027 | +360 |
| 11 | Cursor × Astro | Caltech × JPL | Apr 2027 | +360 |
| 12 | Cursor × Hardware (Europe pilot) | ETH Zürich × TU Munich | Apr 2027 | +360 |

The **Year 1 sequencing** is the strategy made visible: every themed week through March 2027 is at a US institution. The first international themed week — Cursor × Hardware at ETH × TU Munich — appears only at the +360 mark, framed as a "Europe pilot." This is not aesthetic preference. It is the geographic discipline of the role: the US foundation has to be unmistakable before any international expansion is committed to.

Status logic: a week is `upcoming` until its month is reached, `running` for the month it occupies, `happened` after.

### 5.3 Card states

**Upcoming:** muted color, just title + location + date + a small "scheduled" tag.

**Running:** highlighted color (subtle warm glow), small "happening now" indicator.

**Happened:** desaturated cream background, a small "✓ wrapped" tag, and a click target — clicking opens the recap.

### 5.4 The recap modal

Click a `happened` card → modal opens with a fake-but-credible recap. Each recap has:

- **Header:** week name, dates, location, partner labs/departments.
- **By the numbers:** 3-4 stats. (e.g., "180 students, 4 professors, 11 demos.")
- **Builds:** 3 short descriptions of standout projects with builder names.
- **A pull quote** from a domain practitioner. (e.g., a UCSD neuroscience PI for Cursor × Neuro.)
- **Photos:** 2-3 placeholder polaroids — gestural sketches of "students at workshop," not literal stock photos. Hand-drawn aesthetic matches the cafe.

Authoring rule: every recap has at least one detail a CS-only campus program couldn't produce. Cursor × Wet Lab includes a build that processes microscopy images. Cursor × Humanities includes a build that does corpus alignment for a comparative-literature paper. The non-CS-ness has to be earned in the details.

Write all 12 recaps in `data/themed-week-recaps.ts`. Even the `upcoming` ones get a recap drafted — it just doesn't render until the card status changes. Easier than authoring conditionally.

### 5.5 Implementation

- Grid: CSS Grid, 4 columns desktop, 2 tablet, 1 mobile.
- Card: framer-motion `<motion.div>` with status-keyed background colors.
- Modal: portal rendered at root, escape closes, click-outside closes.
- Stagger entrance animation when a phase change reveals new cards.
- Don't paginate. 12 cards fit on one screen at desktop. The grid being full is itself a message.

### 5.6 Failure modes to avoid

- **Too-clever recap copy.** Real-feeling means slightly boring. Avoid jokes. Avoid em-dashes. Match the tone of a department newsletter.
- **Same domain expert quoted across multiple weeks.** Different week, different voice.
- **Fake metrics that don't add up.** A week that says "1,400 students" is not credible at a single department. Realistic numbers: 80–250 attendees per week at a real department. 6–14 builds.

---

## 6 · Scene 3 — A Day in Sam's Week

The human-scale answer to "who runs this?" If the cafe is the *world* the program creates, Sam is the *person* who runs the corner of it.

### 6.1 What it is

A composite character at one fixed location: a small panel/portrait of Sam at his desk or at a campus location. Around him: artifacts of his week — calendar entries, Slack notifications, a coffee cup, a notebook page, a laptop screen showing what he's working on.

His face stays constant across the four phases. **The world around him compounds.**

This is the visual answer to the network-effects question. The viewer feels: "Sam is one person. By April 2027 he's running infrastructure. He didn't have to become five people."

### 6.2 Who Sam is

- Sophomore at CMU, CS major, minor in HCI.
- First Cursor Campus Ambassador in the Cohort 1 wave — a US-only cohort by design, ~45 ambassadors across 18 top-20 US programs, weighted toward density at MIT/Stanford/Berkeley/CMU/Columbia.
- Joined because a friend forwarded him the application after seeing a Cafe Cursor flyer.
- Previously: ran the CMU AI club's beginner workshop series. Active on Twitter. Built a small open-source tool a few hundred people use.
- Why he matters: he's the median strong ambassador in the US foundation, not the standout. The viewer should feel "we have ~45 of these people in Year 1, all in the US, and the international wave only gets seeded after they're running."

### 6.3 The four phases (Sam's panel content)

**May 2026 — Now**
- Setting: coffee shop in Pittsburgh, Sunday morning.
- Visible: open laptop with onboarding playbook PDF, a notebook with handwritten goals, a coffee.
- Calendar: empty except "first call with Rachael — Wed."
- Slack: small DM with onboarding link.
- Caption (small italic, beneath): *"Sam, 19, just accepted into Cohort 1. He's read the playbook three times."*

**August 2026 — +90**
- Setting: same desk. Door open behind him to a campus office.
- Visible: laptop showing a Cafe Cursor flyer he designed; phone showing "27 RSVPs" for his first event.
- Calendar: 4 entries this week including "Cafe Cursor (CMU GHC) — Thu 6pm" and "Coffee with Prof. Neubig — Fri."
- Slack: an active channel with ~12 unread, including one DM that says "thanks for running the meetup, my advisor noticed."
- Caption: *"First Cafe Cursor next week. He's nervous about turnout. 27 will show. 31 will RSVP after."*

**December 2026 — +180**
- Setting: a small whiteboard in his apartment, scribbled with a Cursor × ML week run-of-show. Three Post-its: "talk to Dr. K's lab," "confirm catering," "ask Maya about demo."
- Calendar: dense. Including "Cursor × ML Week — Mon-Fri" and "co-hosting with HKN, ACM, AI Society."
- Slack: 4 channels, 80+ unread; ambassador peers from Stanford and Columbia in his DMs trading playbook tweaks.
- Caption: *"Running his first themed week with two professors. He hasn't asked Rachael for help in three weeks."*

**April 2027 — +360**
- Setting: same desk, now slightly more lived-in. A Cursor × ML Week poster on the wall. A small framed photo of his Cohort 1 group.
- Visible: laptop showing a Notion doc titled "Cohort 2 — CMU lead succession plan." A Zoom window with three candidate ambassador interviewees in it.
- Calendar: "Interview: junior CS, AI Society VP — 2pm" / "Hand-off lunch with Lily (Cohort 2) — Thu" / "talk at HackCMU — Sat."
- Slack: a thread where Sam is answering a question another ambassador asked, before Rachael sees it. Tab open to a new "intl-pilot" channel where ETH and Tsinghua ambassadors have just been added — Sam is reading, not posting yet. The US Cohort 1 is the foundation; the international wave is forming around them.
- Caption: *"Sam graduates in 14 months. He's interviewing his successor. The CMU community will outlast him — and the US foundation, now ~100 ambassadors across 30 schools, is finally strong enough that the first international pilots are coming online."*

### 6.4 Implementation

- One main illustrated panel of Sam (consistent across all four phases). Hand-drawn or carefully composited. Same posture, same mug, same sweater.
- Surrounding "artifacts" (calendar, Slack, whiteboard, etc.) as separate elements that swap by phase with crossfade.
- Don't animate Sam's face. Keep him as a constant. The change is everything around him.
- Caption is small, italic, beneath the panel. It carries the meta-narration.
- Let the viewer drag through Sam's four phases and watch his world thicken. The drag is the experience.

### 6.5 Failure modes to avoid

- **Sam looking like a caricature.** Keep him understated. He's not a "hustle culture" ambassador. He's a kind, slightly serious sophomore who likes building things.
- **Captions that explain too much.** Two sentences max. Trust the visual.
- **Treating Sam as the protagonist.** He isn't. The protagonist is the *system*. Sam is its proof.
- **Adding more than four phases.** Tempting to add a "Year 2" phase. Don't. The artifact lives in Year 1. Counterfactual scene handles longer-horizon storytelling.

---

## 7 · Scene 4 — The Feedback Loop

This is the scene that distinguishes the campus program from "marketing dressed as community." It proves the program makes the *product* better.

### 7.1 What it is

Two columns. Left column: "From the ground." Right column: "Into the product." Animated arrows ferry items left → right when the slider crosses certain dates.

Each item is a card. Left-side cards are observations from ambassadors and labs. Right-side cards are product changes Cursor shipped in response.

### 7.2 The seven feedback loops (full set)

Authoring rule: every loop has a specific student/lab name on the left and a specific product change on the right. Specificity is the point. **Geographic rule: every loop landing at +90 or +180 names a US student/lab. Loops landing at +360 may include international voices, mirroring the cafe's staged geography.**

| # | Left (observation) | Right (product change) | Arrow lands |
|---|---|---|---|
| 1 | "Sam, CMU: Composer struggles with PyTorch type hints in research code." | "Composer 2.1 ships type-aware completions for typed Python." | +90 |
| 2 | "Lin, Stanford NLP lab: lab's tokenizer code is too long for context window during refactor." | "Larger context mode shipped for long-file refactors." | +90 |
| 3 | "Theo, Cornell classics: Cursor doesn't recognize ancient Greek diacritics in strings." | "Unicode-aware tokenization for non-Latin text." | +180 |
| 4 | "Eli, UW Atmospheric Sciences: NetCDF and Zarr workflows are common in our lab; Cursor's autocomplete misses the conventions." | "Domain-pack: scientific Python (xarray, scipy, netCDF) added to default templates." | +180 |
| 5 | "MIT 6.5840 TAs: students keep accepting suggestions without reading them. Hard for grading." | "Learning Mode (beta) — opt-in mode that asks Socratic questions before generating." | +180 |
| 6 | "Reem, Columbia Law: my legal-research workflow needs jurisdiction-aware citation formatting." | "MCP server template for citation tooling." | +360 |
| 7 | "Sofia, UCSF computational bio: protein-folding repos use Jupyter heavily; agent loses state across cells." | "Notebook-aware agent context." | +360 |

Loops 1–2 land at +90. Loops 3–5 land at +180. Loops 6–7 land at +360. By the end, all seven are connected.

### 7.3 Visual

- Two vertical columns. Left items stack at the top, right items at the bottom; arrows curve across.
- Pre-arrival: the right card is greyed-out / outlined / "in progress."
- On phase change: the arrow animates left to right, the right card lights up, the left card gets a small "→ shipped" indicator.
- A tiny number on each arrow showing the latency: "6 weeks," "11 weeks," etc. This is the meta-message — the latency is short.

### 7.4 The embedded message

The viewer should leave thinking: *no other AI coding company has this loop.* Anthropic gets feedback through enterprise customers. Cursor gets it from PhD students in the lab where the next research idea will be born. That's the moat — visible in one scene.

A small caption beneath the scene reads:

> *"Median latency from observation to shipped product change: 8.2 weeks. The campus program is Cursor's fastest product-feedback channel."*

(Make this number up but plausible. Anchor it to "8 weeks" as a claim that's defensible if a real version of this metric is tracked.)

### 7.5 Implementation

- 7 cards on each side; only some visible per phase.
- Arrow animation: SVG path with `stroke-dasharray` animated. Curve from left card to right card across the gutter.
- The phase-change reveal uses Framer Motion `<AnimatePresence>` with custom variants.
- Don't include a real product roadmap. The right-side items should sound *like* Cursor shipped them, not be verifiable claims.

### 7.6 Failure modes to avoid

- **Right-side items that read as marketing taglines.** Concrete features only. "Type-aware completions for typed Python" is good. "Smarter Cursor for everyone" is bad.
- **More than seven loops.** Seven is the cap. The scene reads as overwhelming above that.
- **Generic left-side names.** Reuse the cafe authors. Sam appears here because Sam was in the cafe and in his week panel. Coherence across scenes is part of the artifact's quality signal.
- **Geographic incoherence.** A loop landing at +90 or +180 from an international student would contradict the cafe's staged geography. All early loops are US. Save international voices for +360 if you add them at all.

---

## 8 · The Counterfactual closer

A single horizontal strip at the bottom of the page, after the four scenes. The slider extends to **April 2030** here only.

### 8.1 What it is

Two parallel timelines, top and bottom. Top: "With the campus program." Bottom: "Without."

As the slider advances past April 2027, the two timelines diverge.

### 8.2 The diverging endpoints (April 2030)

**Top — with:**
- 220 declared-standard labs across 60 institutions — 50 US (the Year 1 foundation, now mature) + 10 international (the Year 2–3 deliberate expansion).
- 4,200 DHVC actives — concentrated at US top-20 in Years 1–2, expanding to ~25% international by Year 3 as the foundation supports it.
- Cohort 1 (US, 2026–2027) alumni now at OpenAI, Anthropic, Cursor, NVIDIA, three frontier labs, and 14 founded startups — all power users.
- The international ambassador network (started Q3 of Year 1, scaled in Years 2–3) covers ETH, Tsinghua, NUS, IIT Bombay, Waterloo, Cambridge — built on the playbook the US foundation produced.
- Cursor is the default answer when a 2030 grad is asked "what do you code with?"

**Bottom — without:**
- Same enterprise revenue trajectory (this is the honest framing — enterprise growth doesn't depend on this program in the short run).
- No generational moat.
- The 2030 grad reaches for whatever Anthropic captured in 2026–2027.
- Cursor's procurement story relies on individual switching, which has 10× the CAC.

### 8.3 Visual

- Two horizontal lines. Time on x-axis. Above each line: small markers at key dates.
- As the slider moves past April 2027, the top line rises (more markers, denser annotations) and the bottom line stays flat.
- A "delta" arrow between them at April 2030 with the headline number: e.g., "**4,200 DHVC actives. None recoverable through marketing.**"

### 8.4 Why this scene closes the artifact

It's the only scene that explicitly states what's lost by *not* doing this. Every other scene shows the world we're building. The counterfactual shows the world we forfeit if we don't.

### 8.5 Failure modes to avoid

- **Doomy framing.** The bottom line isn't "Cursor dies." It's "Cursor remains a strong tool, but loses the next generation." Honest is more credible than apocalyptic.
- **Numbers that aren't traceable.** Each top-line endpoint should have a thread back to the strategic doc — the 220 labs corresponds to 4× growth from the Q1 target of ~40, the 4,200 DHVC corresponds to a Year-1 baseline projecting forward at modest growth, etc.

---

## 9 · The footer (the proof layer)

A small fixed footer at the bottom of the page with three links:

1. **Beacon →** `beacon-campus.vercel.app` (the operating system)
2. **30-60-90 plan →** in-page anchor or PDF link
3. **About this artifact →** modal explaining what's real, what's directional, what's aspirational

The "About this artifact" modal is important. It says explicitly:

> *Sam is composite. The cafe bubbles are aspirational specificity — names invented, builds authored to feel like real student work. The themed weeks are vision, not committed roadmap. The feedback loop latency number (8.2 weeks) is a claim I intend to make true.
>
> Beacon is real and live. The 30-60-90 plan is real and committed. The DHVC math is real.*

This is the artifact's intellectual honesty layer. The signal: *I'm not selling fiction. I'm showing the world I'll build, while telling you which parts are which.*

---

## 10 · Visual / brand direction

Anchor on Cursor's existing brand without copying it. The artifact should feel **adjacent to Cursor — clearly Rachael's**.

### 10.1 Palette

- Background: warm cream (`#FAF7F2`) — Cursor-adjacent but slightly warmer.
- Primary text: charcoal (`#1A1A1A`).
- Accent: a single warm accent color, not Cursor's. Suggest terracotta (`#C4644A`) — pulled from Buddy's design system. Signals "this is Rachael's work, not a Cursor marketing artifact."
- Cafe scene: introduces a second muted accent (a deep teal or olive) for ambient warmth.

### 10.2 Type

- Display / hero: Fraunces (variable, warm serif). Used for scene titles, the closing counterfactual headline.
- Body / UI: Inter or DM Sans (neutral grotesque). Used for everything else.
- Handwritten flourish: Caveat (Google Fonts). Used sparingly — Sam's whiteboard, the polaroid handwriting on Wall fragments. Adds humanity.

### 10.3 Texture

- Subtle paper grain on the cafe scene background.
- Slight rotation on polaroids, sticky notes.
- Light pencil-sketch quality to silhouettes and Sam's panel.

### 10.4 Don'ts

- No glassmorphism. No neon. No gradients except the slight warm/cool shift in the cafe atmosphere.
- No 3D. No Three.js. No floating particles.
- No emoji in UI copy. (Emoji in student bubbles is fine — students use emoji.)

---

## 11 · Page structure (top to bottom)

```
┌─────────────────────────────────────────────────────┐
│  [Sticky timeline slider — May 2026 → April 2027]  │
├─────────────────────────────────────────────────────┤
│                                                      │
│  HERO                                                │
│  "Reimagine what students will build."               │
│  One subhead, two sentences, max.                    │
│                                                      │
├─────────────────────────────────────────────────────┤
│  SCENE 1 — The Cafe (full-width, ~85vh)             │
├─────────────────────────────────────────────────────┤
│  SCENE 2 — Themed Week Wall (grid, ~80vh)           │
├─────────────────────────────────────────────────────┤
│  SCENE 3 — A Day in Sam's Week (panel, ~70vh)       │
├─────────────────────────────────────────────────────┤
│  SCENE 4 — The Feedback Loop (two-column, ~70vh)    │
├─────────────────────────────────────────────────────┤
│  COUNTERFACTUAL (slider extends to 2030, ~50vh)     │
├─────────────────────────────────────────────────────┤
│  FOOTER (Beacon, 30-60-90, About)                   │
└─────────────────────────────────────────────────────┘
```

### 11.1 The hero

```
Reimagine what students will build.

The next generation of engineers is in a lab right now,
choosing the tool they'll use for the next decade.
This is the world we're building for them — and with them.

[drag the slider →]
```

Three lines. The third is the call to action. It doesn't need a button.

### 11.2 Scroll behavior

- Each scene snaps softly into the viewport on scroll. (CSS `scroll-snap-type: y proximity;`)
- The slider stays sticky. Scrolling reveals scenes; sliding changes time within the current scene and globally.
- The first scroll past the hero scrolls into the cafe. From there, normal scroll.

---

## 12 · Decisions documented (the "why not the other ideas" log)

For my own future reference and for any hand-off to Claude Code:

**Cascade Map (idea #1 from brainstorm) — cut.** The leverage math is already implicit in Sam's panel (his world thickens) and the cafe (back wall fills). A separate cascade map would be the engineering aesthetic — node graphs and edges — which conflicts with the awe register. Beacon is the engineering aesthetic. This artifact isn't.

**Wall of Awe standalone (idea #4) — folded into cafe.** Standalone version risks duplicating the cafe's emotional work. The corkboard inside the cafe scene carries the same message at lower cost.

**Awe Moments Reel (idea #5) — folded into the cafe and themed-week recaps.** The specific dated moments live as bubble stories and recap quotes. A separate reel would be a third "list of accomplishments" surface, which is one too many.

**Living Discord (idea #8) — cut.** A faked Slack window is the easiest scene to do badly and the hardest to do well. The atmosphere it produces (community alive without me) is already produced by the cafe at +360.

**Year-1 Lock (idea #9) — cut as standalone, folded into Counterfactual.** The freshman lock-in argument is strong but doesn't visualize cleanly without becoming a chart. Better to have it as a sentence in the Counterfactual ("the lock-in window closes by the end of freshman year") than a separate visualization.

**Counterfactual (idea #10) — kept as closer.** Single drag, single message, ends the artifact on the strategic stakes.

---

## 13 · The viewer's 90 seconds (what they actually do)

Imagine someone opens this on a Tuesday afternoon between meetings.

- **0–10s:** reads the hero. Drags the slider once to feel it. Sees the cafe transform.
- **10–30s:** hovers a few bubbles in the cafe. Reads Maya's story. Reads Theo's. Notices the cafe is not a CS scene.
- **30–50s:** scrolls past, sees the themed week grid. Clicks Cursor × Wet Lab. Reads the recap. Notices the partner labs are real institutions.
- **50–70s:** scrolls to Sam. Drags the slider through Sam's four phases. *Sees what one ambassador becomes.*
- **70–85s:** sees the feedback loop. Reads two arrows. Notices the latency number.
- **85–90s:** sees the counterfactual divergence. Closes the tab.
- **Next:** wants to talk about it.

If the artifact produces that final action, it has worked.

---

## 14 · Anchor back to the role

Every claim in this artifact maps to something I've already written or built:

| Artifact element | Anchor doc |
|---|---|
| The cafe's lab-and-TA composition | Strategic diagnosis §"Why labs and TAs, not students" |
| Themed weeks as a primitive | Strategic bets — Bet 1 — themed weeks at monthly cadence |
| Sam's progression (acceptance → first event → themed week → succession) | 30-60-90 plan + ambassador program design |
| The seven feedback loops | Strategic bets — campus as product feedback channel |
| The counterfactual divergence | Strategic diagnosis §"Consequences of failure" |
| The "About this artifact" honesty layer | Success metrics framework — attribution decision rules |

This is the rule for cuts and additions: **if a scene doesn't anchor back to one of those docs, cut it.** The artifact's job is to make the existing strategy *felt*, not to invent new strategy.

