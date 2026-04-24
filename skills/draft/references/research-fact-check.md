# Research and Fact-Check (`/draft` Step 3)

---

## 3a. Local Research

1. Read `concept_library.md` — has the concept already been explained?
2. Use any relevant local research or notes as source material.
3. Read the tracker for the user's own prior statements on this topic — follow the Personal-Fact Guardrails below.

### Personal-Fact Guardrails (required when referencing the user's own life)

When fact-checking or referencing anything the user has said about themselves, **never overwrite or reorder what they already stated**. LLMs frequently hallucinate timelines, scrambling "I did A then B" into "B then A".

Rules:

- **Source of truth for personal facts = the user's own posts in the tracker, plus `brand_voice.md` → Manual Refinements.** Web search never overrides these.
- **Chronology** — when two or more posts describe a sequence of events, preserve the order stated. If posts disagree, flag the conflict to the user; do not silently pick one.
- **Attribution** — do not attribute a fact to the user unless there is a direct post or reply saying it. Inference from tone or topic is not enough.
- **Dates** — treat dates and ages as fragile. Use absolute dates from posts; do not compute "last year" or "3 years ago" yourself unless the post states it that way.
- **Identifying details** (company names, family, location) — quote exactly as the user wrote them. No paraphrasing.
- When in doubt, ask before drafting rather than guessing.

If the draft needs a personal fact you cannot verify from the tracker, mark it `[confirm with user]` in the research output and ask in Step 3c.

---

## 3b. Online Research

Before drafting:

1. verify any claims, stats, or technical details
2. collect 2–3 useful source links
3. verify whether time-sensitive details are still current
4. briefly check common objections or counter-arguments
5. if `research_angle_expansion` is enabled (default), actively surface 2–3 angles the user may not have considered

### Missed-Angle Expansion

Make the post richer, not hijack the user's take. During research, look for:

- adjacent framings the user has not used (counter-intuitive take, smaller-audience angle, historical parallel, industry comparison)
- data points or examples that would strengthen the user's existing stance
- a question the audience will ask that the user has not addressed
- a failure mode / edge case that would make the post more credible if acknowledged

Present these as *options*, not replacements. The user chooses.

### Research output format

```text
## Research Results

### Fact-Check
- [Claim] -> [Verified / Needs correction / Could not verify]
- [Personal fact from user's own posts] -> [quoted verbatim, source post ID/date]

### Recommended Source Material
1. [Title + URL] -> why it helps
2. [Title + URL] -> why it helps

### Freshness Notes
- [Any recent change or caution]

### Angles You Might Not Have Considered
1. [Angle] -> [why it could strengthen the post]
2. [Angle] -> [why it could strengthen the post]
3. [Angle] -> [why it could strengthen the post]

### Items to Confirm with You
- [confirm with user]: [specific personal fact or framing question]
```

Do not insert unverified claims into the draft. Do not insert a missed angle into the draft unless the user accepts it in Step 3c.
