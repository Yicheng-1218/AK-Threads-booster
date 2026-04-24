# Evals

Purpose: independent evaluation layer for the AK-Threads-Booster skill. Executors (analyze, draft, predict, review, voice, topics, refresh, setup) do the work; this directory holds the rubric and fixtures that judge whether they did it correctly.

This is intentionally separated from the executors. A sub-skill must never self-evaluate.

---

## Structure

- `rubric.md` — the canonical scoring rubric. Versioned. Every meaningful behavior change to a sub-skill should be reflected here.
- `fixtures/` — minimal reproducible test cases. Each fixture states: input → expected behavior → what counts as a pass/fail.
- `runbook.md` — how to actually run an eval pass (manual or with an evaluator agent).

---

## When to run evals

- Before merging any change that touches sub-skill behavior rules (not pure docs / comments).
- After a `/review` COMPOUND trigger fires (see `knowledge/_shared/compound-log-format.md`).
- On request — the user can ask "run evals on /analyze" and a clean evaluator session can walk the relevant fixtures.

Do **not** run evals from inside the executor skill that is being evaluated. Open a fresh session or use a separate evaluator agent. The executor and evaluator must not share context.

---

## Strip when

This evals layer exists to catch silent regressions in LLM-judged behavior. Strip it when:

1. All remaining sub-skill behavior is deterministic (pure code, no LLM judgment left), OR
2. The skill is being retired.

Until then, treat a rubric miss as a real failure, not a nit.
