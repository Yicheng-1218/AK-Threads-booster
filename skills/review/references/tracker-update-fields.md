# Tracker Update Fields (`/review` Step 4)

When updating the relevant post in `threads_daily_tracker.json`, touch only the fields below. Do not break the schema. Preserve existing fields you are not explicitly updating.

`prediction_snapshot` is owned exclusively by `/predict` — do not write or overwrite it from `/review`. If a prediction needs to be recorded after the fact, ask the user to re-run `/predict` with the post.

---

## Post-level fields

- `metrics`
- `comments` if new comments are available
- `content_type` and `topics` if correction is needed
- optional enriched fields if they are now known

## Algorithm signals

- `algorithm_signals.discovery_surface`
- `algorithm_signals.topic_graph`
- `algorithm_signals.topic_freshness`
- `algorithm_signals.originality_risk`

## Psychology signals

- `psychology_signals.hook_payoff`
- `psychology_signals.share_motive_split`
- `psychology_signals.retellability`

## Snapshot + windows

- `snapshots[]` when an API-backed refresh was run
- `performance_windows.24h`, `72h`, or `7d` if the timing matches

## Review state

- `review_state.last_reviewed_at`
- `review_state.actual_checkpoint_hours`
- `review_state.deviation_summary`
- `review_state.calibration_notes`
- `review_state.validated_signals.*_notes`

## Top-level

- `last_updated`

---

## Deviation-analysis checklist (Step 3)

When explaining why the actual diverged from the prediction, check these factors:

- posting time
- hook payoff quality
- topic fatigue or novelty
- topic freshness budget / semantic-cluster fatigue
- external events
- deep-comment ratio
- account trend
- follower-fit vs stranger-fit
- discovery surface if known (`algorithm_signals.discovery_surface`)
- topic graph clarity (`algorithm_signals.topic_graph`)
- originality / spam-risk weak points (`algorithm_signals.originality_risk`)
- share-motive split (`psychology_signals.share_motive_split`)
- retellability and whether readers could easily restate the post (`psychology_signals.retellability`)

Phrase findings as observations, not verdicts:

> "This post outperformed baseline by 40% on views. That may relate to the stronger hook payoff and higher stranger-fit than your recent average, for your reference."

---

## Style-guide refresh scope (Step 5)

Update `style_guide.md` only when the new post adds a meaningful data point on one of these dimensions:

- hook performance
- hook-promise fulfillment patterns
- hook/payoff gap patterns
- word-count range
- paragraph structure
- content-type performance
- emotional arc
- share / DM-forward drivers
- retellability drivers
- topic-graph clarity versus actual distribution
- topic freshness budget and semantic-cluster fatigue patterns
- timing windows

One post can extend a trend. It should not overturn a stable trend by itself.
