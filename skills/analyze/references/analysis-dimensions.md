# Analysis Flow Dimensions (`/analyze` Steps 1–6)

---

## Step 1: Extract Post Features

Extract and label:

- content type · hook type · hook promise · topic tags · semantic cluster · word count · paragraph count · emotional arc · ending pattern · comment trigger type · likely sharing motivation

## Step 2: Build Comparison Sets

Construct from the user's history when possible:

1. **Nearest neighbors** — 3–5 posts most similar on content type, hook type, topic, word count, emotional arc.
2. **Top-quartile reference set** — user's top 25% posts by views, or strongest available proxy if views are missing.
3. **Recent repetition set** — last 5–10 posts to measure topic freshness and collision risk.
4. **Semantic-cluster freshness set** — recent posts semantically close even if wording differs.

If one set cannot be built, say so explicitly and continue with the sets that are available.

---

## Step 3: Dimension 1 — Style Matching

Compare the draft against the user's own style patterns:

- hook type performance
- hook promise fulfillment versus historically strong posts
- word count range
- ending pattern
- pronoun usage density
- paragraph structure
- content type performance
- emotional arc performance
- signature phrases / recurring phrasing

Use phrasing like:

- "This post uses a direct-statement opening. Your similar direct-statement posts averaged X views, while your top-quartile question hooks averaged Y, for your reference."
- "Word count is 380. Your strongest range in similar posts is 320–430, for your reference."

---

## Step 4: Dimension 2 — Psychology Analysis Lens

Use the psychology knowledge base to analyze:

- hook mechanism identification
- hook/payoff gap
- emotional arc strength
- sharing motivation
- share motive split
- trust-building elements
- cognitive bias usage
- likely comment depth
- retellability

Anchor in the user's history whenever possible:

- "Based on your data, your audience responds most strongly to information-gap hooks."
- "Your highest-share posts usually combined practical value with identity signaling. This post leans more toward X than Y, for your reference."

---

## Step 5: Dimension 3 — Algorithm Alignment Check

Load canonical red-line and signal definitions from `knowledge/_shared/red-lines.md` (Glob `**/knowledge/_shared/red-lines.md`). Do not inline an R-list — that file is the single source of truth shared with `/draft`.

Run three rounds:

- **Round 1: Red Line Scan** — walk the Round 1 table (R1, R2, R3, R4, R5, R6, R7, R10, R11). Warn directly on any hit, using the canonical warning format defined in `red-lines.md`.
- **Round 2: Suppression Risk Scan** — walk the Round 2 table (R8, R9, R12 stacking) plus unnumbered risks (topic freshness decay, freshness-budget / cluster fatigue, low stranger-fit, low shareability). When R12 applies, raise it **in addition to** the individual risks, not instead of them.
- **Round 3: Signal Assessment** — walk the Round 3 table (S1, S2, S3, S6, S7, S8, S9, S14). Use advisory tone only — signals are diagnostic, not commands.

---

## Step 6: Dimension 4 — AI-Tone Detection

Run sentence-level, structure-level, and content-level scanning using the AI-detection knowledge base.

Flag:

- fixed phrase hits
- consecutive quotable lines
- overly balanced contrast pairs
- performative pivots
- rhetorical questions that stand in for argument
- overly complete judgments
- excessive formal connectors
- emotion-label words
- philosophical endings
- overly uniform lists
- overly even paragraph rhythm
- stacked closing functions
- one-sided evidence
- abstract judgments without concrete support
- unnecessary knowledge display

Report only what is materially noticeable. If AI-tone density is low, say so briefly.
