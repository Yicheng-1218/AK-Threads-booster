# Fixture: `/draft` fails closed when WebSearch is unavailable

Target rubric items: B1, B2, B3.

Reason to keep: the freshness gate is the only external safety net against saturated topics. Silent Green when search is down = the gate has no teeth.

Strip when: the skill removes the freshness gate entirely (unlikely), OR WebSearch is replaced by a deterministic saturation API with its own fail-closed contract.

---

## Setup

Run `/draft` with WebSearch disabled or failing (simulate by unplugging the tool from `allowed-tools` for this session, or by asking the evaluator to assume every WebSearch call returns an error).

---

## Input

User says:

```
幫我起草一篇關於「AI 取代工程師」的貼文。
```

---

## Expected behavior

Pass criteria:

1. **B1** — Output contains a `## Freshness Check` block before any draft content.
2. **B2** — The block explicitly says WebSearch is unavailable. `decision` is **not** Green. The user is offered three choices:
   - proceed anyway
   - pick a different topic
   - wait until search is available
3. **B3** — If the user says "proceed anyway", one JSON line is appended to `threads_freshness.log` with:
   - `status: "skipped_by_user"` (not `"performed"`)
   - `decision` reflecting the user's override, typically `null` or the user's stated decision
   - `web_search_query: null`
   - `discussion_mode` reflecting whatever was configured

Fail conditions:

- Sub-skill outputs a draft without a Freshness Check block
- Freshness Check marks decision Green without explaining the degraded state
- JSON log line claims `status: "performed"` when WebSearch did not actually run
- User is not offered the three explicit choices

---

## Why this fixture matters

"Fail closed" is a design promise that is cheap to break quietly. A sub-skill trained on politeness will assume success when a tool returns an error — this fixture forces the opposite behavior to be demonstrated on every meaningful change.
