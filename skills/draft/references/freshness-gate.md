# Freshness Gate + Freshness Audit Log (`/draft` Step 2.5)

Before researching or drafting, check whether the topic is still worth writing. The gate must produce a decision AND must append one JSON line to `threads_freshness.log`.

---

## Freshness Gate

Run WebSearch on the topic's main keywords and classify:

- **Green** — still developing, still under-covered, or the user has a genuinely fresh angle
- **Yellow** — saturated, but a reframed angle still looks viable
- **Red** — saturated and the user does not yet have a fresh angle

Also cross-check the user's tracker:

- in low-token runtime, read `compiled/cluster_wiki.json` and `compiled/recent_window.md` first
- if a similar semantic cluster appeared in the last 5 posts, flag self-repetition risk
- if `algorithm_signals.topic_freshness.fatigue_risk = high`, surface it

When compiled memory is stale or missing, fall back to tracker freshness fields and say the check used tracker-only fallback.

Output before drafting:

```text
## Freshness Check
- External saturation: [Low / Medium / High]
- Self-repetition risk: [None / Recent (N posts ago) / High]
- Decision: [Green proceed / Yellow reframe to X / Red pick another topic]
- Evidence: [1-3 search results or tracker references]
- freshness_check_status: performed | unavailable | skipped_by_user
```

Only proceed when the decision is Green, or the user explicitly accepts the Yellow reframe.

### If WebSearch is unavailable

**Fail closed.**

- do not silently mark the topic Green
- tell the user the external freshness check could not run
- offer three choices: proceed anyway, pick a different topic, or wait until search is available
- if the user proceeds anyway, log it as `skipped_by_user`

---

## Freshness Audit Log

`threads_freshness.log` is draft-scoped: `/draft` writes it; `/review` reads it for the Draft-Time Decision Audit. No other skill writes here. Follow `templates/FAILSAFE.md` append-only log policy.

Every `/draft` run must append one JSON line:

```json
{
  "ts": "<ISO>",
  "run_id": "<uuid4>",
  "skill": "draft",
  "topic": "<slug>",
  "status": "performed|unavailable|skipped_by_user",
  "decision": "green|yellow|red",
  "web_search_query": "<query or null>",
  "discussion_mode": "ask|always_on|always_off",
  "discussion_ran": true,
  "user_decisions": [
    "kept_angle: <angle>",
    "dropped_claim: <claim>",
    "accepted_missed_angle: <angle>",
    "confirmed_personal_fact: <fact>"
  ],
  "personal_fact_conflicts": []
}
```

- `discussion_ran` — whether Step 3c actually ran this time
- `user_decisions` — short tags for each substantive choice the user made; lets `/review` correlate decisions to outcomes
- `personal_fact_conflicts` — any case where the user's posts disagreed with each other or with your draft assumption

**Do not fake `performed` when search did not actually run. Do not fake `discussion_ran: true` when the mode was `always_off`.**
