# `/review` Output Format (Step 7)

Use this exact structure for the final Post-Publish Feedback Report. Omit subsections cleanly when the underlying data does not exist — never invent placeholders.

---

```text
## Post-Publish Feedback Report

### Actual Data
- [summary]

### Prediction Comparison
- [comparison table or "no prior prediction recorded"]

### Deviation Analysis
- [main reasons]

### Data Updates
- Tracker: Updated / Needs update
- Style guide: [what changed]
- Concept library: [what changed]
- Compiled memory: rebuilt / stale / skipped

### Signal Validation
- Discovery surface: [what seems to have driven distribution]
- Topic graph / freshness / originality: [what the checkpoint confirmed or weakened]
- Hook/payoff + share motive + retellability: [what the checkpoint validated]

### Timing Notes
- [best historical window versus this post's publish time]

### Cumulative Learning
- Tracker now contains X posts
- Calibration trend: [improving / stable / still noisy]
- [Skill-learnings threshold notice if ≥10 entries — see skill-learning-capture.md]

### Draft-Time Decision Audit (if draft entries exist)
- Read `threads_freshness.log` entries for this post's `run_id` if present.
- List `user_decisions` recorded at draft time (e.g., `accepted_missed_angle: historical_parallel`, `dropped_claim: stat_X`).
- For each, briefly note whether the outcome suggests the decision helped or hurt — advisory only, one line each.
- If `personal_fact_conflicts` were flagged at draft time, check whether they affected how the post landed.

### Questions for You (discussion-mode-gated)
Gated by `review.discussion_mode`. Canonical semantics: `knowledge/_shared/config.md`. `/review` does not write the config file — if the user chooses a persistent mode here, point them to `/draft` or manual edit.

When the section runs, append 2-3 specific questions that would sharpen the next post. Examples:
  - "This post beat baseline by [X]%. Do you want me to lock in the hook pattern for the next 3 posts, or treat it as a one-off?"
  - "The comment section skewed toward [topic]. Want the next post to follow that thread, or switch topics?"
  - "At draft time you chose to drop claim [Y]. In hindsight, do you wish we had kept it? Affects how I handle similar calls next time."
```

---

## Prediction-vs-actual table (Step 2)

When `posts[i].prediction_snapshot` exists, read `predicted_at`, `confidence_level`, `comparable_posts_used` (shows the user how solid the prediction was), `ranges.*.baseline / conservative / optimistic`, and `upside_drivers` + `uncertainty_factors`.

```text
## Prediction vs Actual
Prediction source: predicted_at=<ISO>, confidence=<Level>, comparable_posts=<N>

| Metric  | Conservative | Baseline | Optimistic | Actual | Band hit? | Deviation vs baseline |
|---------|--------------|----------|------------|--------|-----------|-----------------------|
| Views   | X            | X        | X          | Y      | In / Over / Under | +Z% / -Z% |
| Likes   | X            | X        | X          | Y      | ...       | ...       |
| Replies | X            | X        | X          | Y      | ...       | ...       |
| Reposts | X            | X        | X          | Y      | ...       | ...       |
| Shares  | X            | X        | X          | Y      | ...       | ...       |

Upside drivers that played out: [...]
Uncertainty factors that mattered: [...]
```

If no `prediction_snapshot` exists, skip this section cleanly and say so. Do not invent a prior prediction.
