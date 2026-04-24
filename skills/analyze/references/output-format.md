# `/analyze` Output Format

Runtime note: `analyze.output_mode` controls how much of this format is emitted.

- `brief` emits Sections 1, 2, 3, 4, a compact Section 9 density line, and Section 10.
- `standard` emits all sections, but each section stays compact.
- `full` emits the complete format below.

Present the analysis in exactly this section order.

1. **Algorithm Red Lines**
2. **Decision Summary**
3. **Proposed Changes (Pointed)**
4. **Highest-Upside Comparisons**
5. **Suppression Risks**
6. **Style Matching Summary**
7. **Psychology Analysis**
8. **Algorithm Signal Assessment**
9. **AI-Tone Detection**
10. **Reference Strength**
11. **Questions for You (discussion-mode-gated)**

---

## 1. Algorithm Red Lines

- List only triggered red lines.
- If none: `No red lines triggered.`

## 2. Decision Summary

Short and high-signal:

- strongest upside driver
- main expansion blocker
- whether this reads more like a follower-fit post, a stranger-fit post, or both

## 3. Proposed Changes (Pointed)

Most important actionable section. Each item must be **granular** so the user can accept or reject individually. Do not bundle many edits. **Do not output a rewritten full version here.**

Format each proposed change as:

```text
- **Where:** [paragraph N / sentence N / the phrase "<verbatim snippet>"]
  **Issue:** [what the problem is — e.g. hook/payoff gap, R1 engagement-bait phrasing, low stranger-fit opener]
  **Suggested change:** [a concrete alternative — one line or a short rewrite of *that specific piece only*]
  **Why:** [reason, preferably grounded in the user's data — e.g. "Your top-quartile posts open with a concrete claim; your current opener is a rhetorical question, which historically underperforms for this topic cluster."]
  **Priority:** [Must-fix (red line) / High (distribution blocker) / Medium (upside) / Low (polish)]
```

Rules:

- Only include changes materially worth making. If the post is already solid, say "No pointed changes required." — do not manufacture problems.
- Sort by priority, highest first.
- Keep every suggestion scoped to that *one spot*. Do not cascade rewrites.
- Never combine "change this + change that" into a full alternate version. If you find yourself drafting a whole new post, stop and split it back into pointed items.
- If a fix would require restructuring the whole post (rare), say so explicitly and ask the user whether they want that scope before proposing it.

## 4. Highest-Upside Comparisons

Compare the draft against nearest-neighbor posts, the user's top-quartile posts, and the strongest historical pattern it resembles. Focus on factors that most affect expansion: hook quality, hook promise fulfillment, novelty vs repetition, topic freshness remaining, practical value, identity signal, DM-share potential.

## 5. Suppression Risks

List the most likely reasons the post could underperform even if it is "good":

- repeated topic framing
- semantic-cluster fatigue / low topic freshness
- weak second paragraph / low body payoff
- diffuse topic focus
- follower-only context
- low share incentive
- shallow comment trigger

## 6. Style Matching Summary

Keep it factual and based on the user's own writing history.

## 7. Psychology Analysis

Explain which psychological triggers are active and how that maps to the user's audience response history.

## 8. Algorithm Signal Assessment

Advisory tone only. Do not turn signals into commands.

## 9. AI-Tone Detection

```text
## AI-Tone Detection

### Definite AI-Tone
- [Specific sentence or paragraph] -> [Trigger] -> [Brief explanation]

### Possible AI-Tone
- [Specific sentence or paragraph] -> [Trigger] -> [Brief explanation]

### Overall Density
- Triggered items: X total (Y definite / Z possible)
- Density: Low / Medium / High
```

## 10. Reference Strength

State:

- which data path was used
- how many historical posts were available
- how many comparable posts were actually used
- which judgments are strong versus weak

## 11. Questions for You (discussion-mode-gated)

Gated by `analyze.discussion_mode` from `threads_booster_config.json`. Canonical semantics (prompting, persistence): `knowledge/_shared/config.md`.

`/analyze` is read-only for the config file. If the user says "always on / always off" here, acknowledge for this run and point them to `/draft` (which has write permission) or manual edit.

When the section runs, append 2–3 targeted questions whose answer would meaningfully change the take. Examples:

- "You posted this at [time]. Was the timing intentional for [audience segment]? Your posts at [other-time] have historically done better."
- "This is the third post in a row on [topic cluster]. Was that deliberate series framing, or accidental repetition?"
- "The hook is softer than your top-quartile pattern. Was that a voice choice, or do you want me to propose sharper alternatives?"

Questions must be specific to this post, not generic. Skip the section entirely if nothing is genuinely worth asking.
