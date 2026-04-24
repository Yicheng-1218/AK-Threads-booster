# Log-Hygiene Checks (`/review` Steps 6.5 + 6.6)

Both checks are advisory. They surface patterns in the final report but never block the review.

---

## Step 6.5 — Freshness-gate hygiene

Glob `threads_freshness.log` in the working directory. If absent, skip this step silently.

Read the last 30 entries. Group by `run_id`, then count:

- how many distinct runs recorded at least one `status: performed` (**healthy**)
- how many distinct runs recorded only `unavailable` or `skipped_by_user` across all entries (**degraded**)
- any runs whose entries mention the current post's topic slug

Group by `run_id` rather than counting lines — one `/topics` invocation can write 5 entries for 5 candidates, and treating that as 5 runs skews the ratio. If an entry predates the `run_id` field (missing key), fall back to grouping by `ts` rounded to the minute.

**Flag patterns:**

- More than 30% of recent runs degraded → "Freshness check has been running in degraded mode — this weakens the topic-selection safety net." Suggest installing WebSearch access or stopping skipping.
- Current post has no matching freshness-check entry → "This post was drafted without the gate — any underperformance may trace to a missed saturation signal."

---

## Step 6.6 — Refresh-log health

Glob `threads_refresh.log` in the working directory. If absent, skip silently — expected for users on the API or checkpoint path.

If the user ran `/refresh` with a non-default `--log-file PATH`, use that path from the user's input instead of the default glob.

Read the last 30 entries and count:

- runs with `ok: true`
- runs with `ok: false` and which `reason` values dominate: `login_wall`, `handle_mismatch`, `selector_health_failed`, `timeout`, `backup_failed`, `no_chrome_mcp`, `other`
- time since the last `ok: true` run

**Flag patterns:**

- More than 30% of recent runs `ok: false` → "Auto-refresh is degraded. Tracker metrics may be stale."
- Last `ok: true` older than 48 hours → "Tracker has not been refreshed in 2+ days — recent metrics may be missing."
- Any `reason: selector_health_failed` in the last 5 entries → "Threads DOM may have drifted — `knowledge/chrome-selectors.md` likely needs updating."

---

## Where the flags go

Both checks' findings land in the `### Signal Validation` or a dedicated `### Log Hygiene` subsection of the Step 7 report. Do not invent a subsection if there are no findings — stay silent when logs are clean.
