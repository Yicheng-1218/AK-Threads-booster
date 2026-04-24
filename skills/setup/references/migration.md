# Path E: Legacy Tracker Migration (`/setup` Step 1)

Triggered automatically when `threads_daily_tracker.json` already exists but does not match the current schema.

## Detection heuristics

Treat the file as legacy if **any** of these is true:

- top-level `posts` is a JSON object (dict) rather than an array
- top-level `_meta` exists and top-level `account` does not
- at least one post entry has `data_snapshots` but no `metrics`
- at least one post entry has `my_replies` as an array (legacy reply objects) rather than a boolean flag

If detected, do not overwrite. Walk the user through migration below.

---

## E.1 Backup first

Copy the file to `threads_daily_tracker.json.legacy-<ISO>` in the same directory. Never begin the migration without a rollback point.

---

## E.2 Field-by-field transform

| Legacy | → | v1 | Notes |
|---|---|---|---|
| `_meta.account` (e.g. `@name`) | → | `account.handle` | set `account.source = "legacy-migration"`, `account.timezone = "UTC"` unless user confirms otherwise |
| `_meta.last_updated` | → | root `last_updated` | normalize to ISO; if only a date, append `T00:00:00Z` |
| `posts` (dict keyed by id) | → | `posts` (array) | each key becomes `posts[i].id` |
| `posts[id].title` | → | `posts[i].text` | **imperfect** — see E.3 |
| `posts[id].date` (e.g. `"2026-04-17 13:36"`) | → | `posts[i].created_at` | treat as local time, convert to ISO with `Z` |
| `posts[id].topic` | → | `posts[i].topics: [<topic>]` | wrap single string into an array |
| `posts[id].type` | → | `posts[i].content_type` | pass through as free text; downstream skills re-classify |
| `posts[id].data_snapshots` (array) | → | `posts[i].snapshots` | rename `snapshot_date` → `captured_at`; rename `replies_count` → `replies`; derive `hours_since_publish` from `created_at` |
| last entry of `data_snapshots` | → | `posts[i].metrics` | populate `views/likes/replies/reposts/shares`; missing values stay as `0` |
| `posts[id].my_replies` (array of reply objects) | → | `posts[i].author_replies` (array) + `posts[i].my_replies: true` | preserve full reply objects so `/topics` Validated-Demand logic can still read them; also set the boolean flag so downstream checks work |

Fill all other required and optional fields per the v1 schema (`references/tracker-schema.md`) with `null` defaults.

---

## E.3 Missing post text

The legacy schema only stores `title`, not full post text. After transform, count posts where `text` equals `title` and their length is under 80 characters — those are suspect. Surface to the user:

```text
## Migration warning
- X of Y posts have only a short title as their `text` field.
- This limits what /voice, /draft, and /analyze can learn from them.
- If you have the full post bodies elsewhere (exports, archives, screenshots), paste them in or provide a file path and the migration will merge them.
```

Do not block — thin text is still better than nothing. The user can enrich later.

---

## E.4 Companion markdown files (legacy workflow enrichment)

Many users of the old workflow keep hand-curated markdown companions:

- time-sorted post archive (`歷史貼文-按時間排序.md`, `posts-by-date.md`, `history*.md`)
- topic-grouped post archive (`歷史貼文-按主題分類.md`, `posts-by-topic.md`)
- full comment log from other users (`留言記錄.md`, `comments.md`)

Glob in the tracker's directory and one level up. Match patterns: `*貼文*.md`, `*留言*.md`, `*posts*.md`, `*comment*.md`, `*history*.md`. Use as enrichment sources — do not treat as authoritative over tracker fields that already have values.

### E.4a Backfill post text from the time-sorted archive

Typical format: date header `### YYYY-MM-DD HH:MM`, then `**分類：** <topic>`, then body until `---`. Parse into (date, topic, body) tuples.

For each tuple:

1. Find the tracker post whose `created_at` matches the same date and hour (±60 min tolerance for timezone drift).
2. If matched and the tracker's `text` equals `title` or is under 80 chars, replace `text` with the archive body. Keep `title` as a new optional field for reference.
3. If not matched (archive has a post the tracker does not), append a new post entry with `source.import_path = "legacy-markdown"`, `metrics` all zero, `snapshots: []`, and flag it so downstream skills know metrics are unrecoverable.

### E.4b Attach comment records

Comment archives are usually timestamped anonymous comments, not grouped by post. For each comment:

1. Find the nearest prior post by `created_at` within a 72-hour window — that is the most likely parent.
2. Append to `posts[i].comments[]` with `{user: null, text: <body>, created_at: <ISO>, likes: 0}` if the username is not recoverable.
3. Comments that cannot be assigned go into a root-level `unmatched_comments[]` array so `/topics` can still mine them as general-demand signal.

Warn the user that comment→post assignment is heuristic and may be wrong for posts published close together in time. The user can correct manually later.

### E.4c Skip the topic-grouped archive (usually redundant)

The topic-grouped file is almost always a re-view of the time-sorted file. Do not ingest twice. Only use it if the time-sorted file is missing — in that case, parse by topic blocks and fall back to the same (date, topic, body) logic.

---

## E.5 Validate and write

After transform and enrichment:

1. Validate against the v1 schema: `posts` is an array, every entry has `id`, `text`, `created_at`, `metrics`, `comments` (may be `[]`).
2. Write to `threads_daily_tracker.json` (the E.1 legacy backup is the rollback).
3. Report:
   - posts migrated from tracker
   - posts added from markdown archive
   - author_replies preserved
   - comments attached (and how many went to `unmatched_comments[]`)
   - text-thin posts remaining
   - `last_updated` value used

---

## E.6 Continue to Step 3

After migration, continue to Step 3 (style guide) and Step 4 (concept library) using the migrated tracker. Downstream skills will see a v1 tracker and run normally.
