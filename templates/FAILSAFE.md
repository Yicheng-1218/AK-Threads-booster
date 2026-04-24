# FAILSAFE — Persistent-State Write Policy

Every sub-skill that mutates a file on disk (tracker, style guide, concept library, brand voice, logs, config) must follow this policy. One policy file, one enforcement point.

Version: 1.0.0

---

## Files under this policy

Destructive writes — require backup + atomic replace:

- `threads_daily_tracker.json`
- `style_guide.md`
- `concept_library.md`
- `brand_voice.md`
- `threads_booster_config.json`

Append-only logs — require atomic append, no backup needed:

- `threads_freshness.log`
- `threads_refresh.log`
- `threads_skill_learnings.log`

Companion markdown (human-readable archives generated from tracker) — rebuild, not mutate:

- `posts_by_date.md`
- `posts_by_topic.md`
- `comments.md`

Compiled memory (low-token runtime cache) — rebuild, not hand-edit:

- `compiled/account_wiki.md`
- `compiled/post_feature_index.jsonl`
- `compiled/cluster_wiki.json`
- `compiled/exemplar_bank.md`
- `compiled/recent_window.md`

---

## Policy — destructive writes

Every write to a destructive-writes file must follow this sequence:

1. **Backup.** Copy the current file to `<filename>.bak-<ISO>` in the same directory.
   - ISO format is compact UTC: `20260422T143012Z`.
   - If the backup copy fails (disk full, permission denied, path invalid), **abort**. Do not proceed with the write. Tell the user which file failed and why.
2. **Write to temp.** Write the new content to `<filename>.tmp-<ISO>` in the same directory.
3. **Atomic rename.** Rename `.tmp-<ISO>` over `<filename>`. This is the atomic commit point.
4. **Prune.** Keep at most the **5 most recent** `.bak-*` files per filename. Delete older backups.

If any step 1–3 fails, the user's data is unchanged because the atomic rename has not happened. Report the failure and do not retry silently.

### Multi-file writes (e.g. `/review`)

When a single sub-skill mutates multiple destructive-writes files in one pass, **back up all of them first** before writing any of them. If backup fails on file N, abort the entire write phase — do not leave the set partially updated.

Reason: `/review` writes tracker + style_guide + concept_library in one go. A half-written state across those three files is worse than no write. This is already enforced in `skills/review/SKILL.md` Step 3.5 Backup Before Write; this file is the canonical policy it implements.

---

## Policy — append-only logs

1. Read-modify-write is **not** allowed for logs. Always open in append mode and write one JSON line (newline-terminated).
2. Do not rewrite old entries. If an entry is later discovered to be wrong, write a new entry that supersedes it (include the prior `run_id` in a `supersedes` field), rather than editing in place.
3. No backup needed — the append-only nature is the safety mechanism.

---

## Policy — companion markdown

`posts_by_date.md`, `posts_by_topic.md`, and `comments.md` are views of the tracker, not sources of truth. Rebuild them from the tracker when they change. Do not hand-edit or patch in place.

If a rebuild is in progress and fails halfway, the prior copy is still on disk — only rename the fresh file into place at the end of a successful rebuild (same atomic-rename pattern as destructive writes).

---

## Policy — compiled memory

Compiled memory files are derived from `threads_daily_tracker.json`; the tracker always wins.

1. Rebuild with `scripts/build_compiled_memory.py` after `/setup`, `/refresh`, `/review`, or `/predict` changes the tracker.
2. Every compiled file must include `generated_at`, `source_tracker_hash`, `posts_count`, `confidence_level`, and `coverage_notes`.
3. If a compiled write fails, keep the old compiled files and report that the runtime cache is stale. Do not roll back the tracker write.
4. If compiled memory disagrees with tracker, ignore the compiled claim and rebuild.

---

## Recovery

If a user reports a corrupted file:

1. Ask which file and when the corruption was first noticed.
2. List the available `.bak-*` copies in that directory.
3. Let the user pick which backup to restore. Do not auto-pick.
4. Before overwriting, back up the **current (corrupted)** file as `<filename>.bak-<ISO>-corrupted` so the user can still inspect it.

---

## Reason to keep

Persistent state is the one thing this skill cannot recover from. Losing a tracker silently (via a half-written JSON, or a sub-skill that patches in place without backup) deletes months of user data. This policy exists because there is no git history to fall back on in the user's working directory.

## Strip when

Any of:

1. Tracker + derived state moves to a transactional store (sqlite with WAL, Postgres) where atomic commit is a native property.
2. The skill stops writing to local files entirely.

Until then, every sub-skill with `Write` or `Edit` in `allowed-tools` must honor this policy.
