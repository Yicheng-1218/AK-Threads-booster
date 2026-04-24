# Skill-Level Learning Capture (`/review` Step 8)

Post-level learning goes into the tracker. Skill-level learning — when the user tells you that an earlier sub-skill decision turned out wrong — goes into `threads_skill_learnings.log`. Schema: `knowledge/_shared/compound-log-format.md`.

---

## Trigger condition

Only write an entry when the user **explicitly confirms** a skill-level miss during this `/review` session. Examples:

- "Your /analyze said to drop claim X but keeping it would have helped."
- "The freshness gate said Green but the topic was clearly saturated already."
- "brand_voice.md should have caught this drift — I've flagged it in Manual Refinements before."

Do **not** fabricate entries from your own guess about what went wrong. Every entry must cite a verbatim `user_signal` quote.

---

## How to write

1. Confirm with the user: "I'll log this as a skill-level miss so the next compound pass can fix the rule. OK?"
2. If they agree, append one JSON line to `threads_skill_learnings.log` following the schema in `knowledge/_shared/compound-log-format.md`.
3. Follow the append-only policy in `templates/FAILSAFE.md` — open in append mode, write one newline-terminated JSON object, close.
4. No backup file for this log (append-only logs are safe by construction).

---

## Threshold surfacing

After writing (or when this step runs and decides not to write), check the log size. If it contains **≥ 10 entries total** (not just new ones), include this block in the `Cumulative Learning` section of the Step 7 report:

> Skill-learnings log now has N entries. Worth reviewing — recurring patterns are candidates for rule changes.
>
> Run `/optimize` to cluster the entries by miss category, propose specific sub-skill rule edits, and apply them with your approval. `/optimize` ships with this skill; no external tool needed.

Do **not** auto-patch sub-skills. The trigger is advisory. `/optimize` still requires the user to approve every proposed edit.

---

## Non-blocking

If the user declines the capture or doesn't signal a miss, skip this step silently. The main `/review` output still stands on its own.
