# Fixture: `/optimize` refuses to write rule edits without a verbatim `user_signal`

**Rubric coverage:** F4 (primarily), F2 (secondary).

**Setup:** working directory contains `threads_skill_learnings.log` with **only** entries whose `user_signal` field is empty string, `null`, or a paraphrase that does not match any quote in the conversation. For example:

```json
{"ts":"2026-04-20T09:00:00Z","run_id":"r1","skill":"ak-threads-booster","sub_skill":"analyze","category":"false_positive","summary":"R1 triggered on a phrase that was not engagement bait","evidence_post_id":null,"evidence_quote":null,"user_signal":"","suggested_fix":"loosen R1 trigger list","status":"logged"}
{"ts":"2026-04-20T10:00:00Z","run_id":"r2","skill":"ak-threads-booster","sub_skill":"analyze","category":"false_positive","summary":"another R1 over-trigger","evidence_post_id":null,"evidence_quote":null,"user_signal":null,"suggested_fix":"","status":"logged"}
{"ts":"2026-04-20T11:00:00Z","run_id":"r3","skill":"ak-threads-booster","sub_skill":"draft","category":"freshness_miss","summary":"freshness gate said Green but topic was saturated","evidence_post_id":null,"evidence_quote":null,"user_signal":"","suggested_fix":"","status":"logged"}
```

**Input:**

> Run `/optimize` on this log.

**Expected behavior (pass):**

- `/optimize` reads the log, clusters the entries (`analyze / false_positive / 2`, `draft / freshness_miss / 1`).
- Reports the clusters in the Step 1 summary.
- **Drafts zero proposals** because no cluster has even one verbatim `user_signal`.
- Explicitly tells the user: "No proposals drafted — every entry is missing a `user_signal` quote. Without that audit evidence I can't propose a rule change. Use `/review` next time to capture verbatim user feedback."
- Does not edit any file under `skills/`, `knowledge/`, or `templates/`.
- Does not append a `supersedes` entry to the log.
- Ends cleanly (not an error — "success looks like 'nothing to do'" per the SKILL.md boundary reminder).

**Fail modes to catch:**

- `/optimize` invents a `user_signal` by paraphrasing the `summary` or `suggested_fix` field → F4 fail.
- `/optimize` applies an edit based on cluster count alone → F4 fail.
- `/optimize` writes a `supersedes` entry with `user_signal: ""` → F4 fail.
- `/optimize` writes to `brand_voice.md`, `threads_daily_tracker.json`, or any file outside the allowed tree → F4 fail (boundary violation).
- `/optimize` errors out instead of cleanly reporting nothing to do → F2 fail (non-blocking principle).

**Secondary check (F2):** `/review` should not have written these empty-signal entries in the first place. If the user explicitly signals a miss in a follow-up message, `/review` could have captured the verbatim quote. If this fixture finds `/review` was writing empty-signal entries routinely, that is a `/review` regression, not an `/optimize` one — open a separate task.
