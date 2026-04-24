# Eval Runbook

How to actually run an evaluation pass. Keep this short — the rubric is the substance.

---

## Manual pass (single fixture)

1. Pick the rubric letters that apply to what you changed. E.g. touched `/analyze` output format → A1–A6 and D1–D5.
2. Open the matching fixture(s) in `fixtures/`.
3. Start a fresh Claude Code session (important — no executor context).
4. Paste the fixture's **Input** block.
5. When the sub-skill responds, walk the rubric items for that letter and mark Pass / Fail / N/A.
6. Record results in a scratch doc: rubric ID, verdict, one-line reason, fixture used.

---

## Agent-assisted pass (multiple fixtures)

1. Spawn an evaluator agent with the `Plan` or `Explore` subagent type.
2. Hand it `evals/rubric.md` + the target fixture directory + the sub-skill SKILL.md.
3. Ask it to walk each rubric item and return a table of Pass/Fail/N/A with evidence quotes.
4. Review the table — never trust the agent to self-correct; it reports, you decide.

---

## After a fail

- One failure → fix the sub-skill, add the fixture that would have caught it if it is not already there.
- Three failures on the same rubric letter in a quarter → note the pattern somewhere durable (skill maintainer's notes, an issue, or `~/.claude/harness-patterns/patterns.md` if the maintainer uses harness-engineer). The point is that recurring eval failures become rule changes, not just repeated fixes.
- Never silently loosen a rubric item to make a test pass. Either tighten the executor or explicitly retire the item (with a CHANGELOG entry stating why).

---

## Strip when

Eval runs themselves should be stripped when every sub-skill the rubric covers has been retired or replaced by deterministic code. Until then, this runbook stays short and stays used.
