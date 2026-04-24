# Discussion Mode — Steps 3c and 6 (`/draft`)

Both Step 3c (discuss research) and Step 6 (proactive improvement questions) are gated by `draft.discussion_mode`. Canonical semantics of `ask` / `always_on` / `always_off`, including how to prompt and persist, live in `knowledge/_shared/config.md`.

**Safety carve-out**: regardless of mode, always surface fact-check conflicts and `[confirm with user]` personal-fact items. These are safety checks, not discussion.

---

## Step 3c — Discuss Research with the User

When the discussion runs, pick 2–4 of the most decision-relevant questions, tailored to the topic:

- "Which of these angles actually matches what you want to say? Any you want to rule out?"
- "I found [surprising fact / counter-evidence]. Does that change how you want to frame this? Or should we still go with your original take?"
- "This claim [X] could not be verified. Do you have first-hand experience or a source? Otherwise I will drop it."
- "Recent change: [Y]. Do you want the post to address this, or stay on the evergreen angle?"
- "Counter-argument you will hear in comments: [Z]. Do you want to pre-empt it in the post or handle it in replies?"
- "One of the missed angles above — [A] — looks like it could lift this post. Want to fold it in, or keep scope tight?"

Wait for the user's answers (or an explicit "just draft it") before moving on. Record the user's choices and use them as constraints in Step 4.

When explaining the toggle, frame the purpose as: richer posts, surfaced angles the user may not have thought of, pressure-tested facts, correctly captured personal details — opt-in because sometimes speed wins.

---

## Step 6 — Proactive Improvement Questions (after the draft)

When the step runs (`ask` confirmed for this run, or `always_on`), proactively ask 3–5 targeted questions to help the user strengthen the draft before they publish.

Tailor questions to the specific draft. Useful angles:

- **Hook sharpness** — "The opening leans on [X]. Is there a more specific hook from your own experience we could swap in?"
- **Personal evidence** — "Paragraph 2 makes a general claim. Do you have a concrete case, number, or story that would make it land harder?"
- **Opinion strength** — "Right now the stance is [mild/strong]. Do you want to push further, or pull back? This affects reach vs polarization."
- **Audience-specific detail** — "Your audience is [inferred from voice data]. Is there jargon/context I should add or remove for them?"
- **Ending choice** — "The current ending [describes ending]. Would you rather end on [alternative — question / cliffhanger / punchline]?"
- **Fact/claim to pressure-test** — "I wasn't fully sure about [X]. Is that from your own experience, or should we verify or soften it?"
- **Comment-trigger design** — "What reaction do you want in the comments? We can tune the post to invite that specifically."

Format:

```text
## Questions to Sharpen the Draft
1. [specific question about this draft]
2. [specific question about this draft]
3. [specific question about this draft]

Answer any of these and I will revise. Or tell me to stop and you will take it from here.
```

Keep questions concrete and tied to specific lines in the draft. Generic questions ("does this sound good?") are not acceptable.

If the user answers, revise the draft accordingly and deliver again. If the user declines, stop cleanly.
