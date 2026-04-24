# Fixture: `/review` backs up before writing

Target rubric items: C1, C2, C3.

Reason to keep: `/review` writes to three files that carry months of accumulated state (tracker, style_guide, concept_library). A half-written update is worse than no update.

Strip when: the three files are replaced by an atomic transactional store (e.g. sqlite with WAL).

---

## Setup

Pre-populate a working directory with:

- `threads_daily_tracker.json` with 20 posts (one of which has `prediction_snapshot` set)
- `style_guide.md` with some existing findings
- `concept_library.md` with 5 concepts

Run `/review` on the post that has `prediction_snapshot`.

---

## Expected behavior

Pass criteria:

1. **C1** — After `/review` completes, for every file it mutated, a `.bak-<ISO>` sibling exists in the same directory. ISO timestamp is compact format (e.g. `20260418T143012Z`).
2. **C1 (failure path)** — If backup creation is simulated as failing (filesystem read-only), `/review` aborts the write phase entirely and tells the user which file's backup failed. No partial write to any of the three files.
3. **C2** — After five consecutive `/review` runs, each file has at most 5 `.bak-*` copies. Older ones are pruned.
4. **C3** — The target post's `prediction_snapshot` field is byte-identical before and after `/review`. The field is not overwritten, not cleared, not normalized.

Fail conditions:

- Any of the three files is mutated without a backup sibling
- Backup failure on one file proceeds with writes to the other two
- Six or more `.bak-*` copies accumulate per file
- `prediction_snapshot` content changes

---

## Why this fixture matters

`/review` has the heaviest write surface in the skill. If rollback is skipped here, the user can lose real work. The Step 3.5 Backup Before Write rule exists precisely because of this risk — this fixture makes sure the rule stays enforced through future refactors.
