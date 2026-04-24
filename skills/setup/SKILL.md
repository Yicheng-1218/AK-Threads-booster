---
name: setup
description: "Initialize AK-Threads-Booster: import historical posts, normalize them into the tracker schema, auto-generate a personalized style guide, and build a concept library. Run on first use or whenever the user wants to backfill account history."
version: "1.2.0"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, WebFetch
---

# AK-Threads-Booster Initialization Module (M1 + M2 + M3)

You are the initialization guide for the AK-Threads-Booster system. Help the user import account history, normalize it into a stable tracker, generate a style guide, and build a concept library.

---

## Principles & Knowledge

Load `knowledge/_shared/principles.md` before running. Follow discovery order in `knowledge/_shared/discovery.md`. For `/setup` specifically:

- Always load `data-confidence.md` (to report the dataset gate in the completion report)
- Load `psychology.md` when generating `style_guide.md` (Step 3)
- Load `ai-detection.md` only if the user asks for a first-pass AI-tone survey during setup

Skill-specific addendum: prefer a stable tracker schema over ad-hoc one-off parsing.

---

## Automation Scripts

The `scripts/` directory is a sibling of `skills/`. Use Glob to locate:

- Glob `**/scripts/fetch_threads.py` — fetch posts via Meta Threads API
- Glob `**/scripts/parse_export.py` — parse Meta account data export
- Glob `**/scripts/render_companions.py` — render tracker into human-readable markdown
- Glob `**/scripts/build_compiled_memory.py` — build low-token compiled memory under `compiled/`

Python 3.9+ and the `requests` package are required for the API path.

---

## Execution Flow

### Step 1: Choose Data Import Path

**Before presenting options**, Glob for `threads_daily_tracker.json` in the working directory. If one exists, run the Path E detection heuristics first — an existing legacy file means migration, not import. Only offer Paths A–D when no tracker is present or the existing file is already v1-schema.

Paths:

- **Paths A–D** — full flow in `references/import-paths.md`: A Meta Threads API (recommended), B Meta account data export, C existing data provided directly, D Chrome-driven profile scrape via `/refresh`.
- **Path E** — legacy tracker migration. Full detection heuristics and E.1–E.6 steps (backup, field transform, missing-text handling, companion-markdown enrichment, validate, continue) in `references/migration.md`.

After migration, continue to Step 3 + Step 4 using the migrated tracker.

### Step 2: Normalize into the Tracker Schema

Regardless of import path, the result must be a valid `threads_daily_tracker.json` that matches the v1 schema in `references/tracker-schema.md` — including `schema_version: 1`, the full post-entry shape, and the required-vs-optional field split (required core: `id`, `text`, `created_at`, `metrics`, `comments`, `content_type`, `topics`).

Template reference: Glob `**/templates/tracker-template.json`.

After import, read the file, verify it is structurally valid, and report the number of imported posts.

### Step 3: Auto-Generate Style Guide (M2)

Follow `references/generation-steps.md` Step 3. Analyze catchphrases, hook types and performance, pronoun density, ending patterns, register, paragraph structure, word-count distribution, content-type mix, emotional arcs, share drivers, topic clusters, freshness budget, and posting-time windows. **Describe what the user's style is, not what it should be** — high-performing patterns are annotated, not turned into commands.

Template reference: Glob `**/templates/style-guide-template.md`.

### Step 4: Build Concept Library (M3)

Follow `references/generation-steps.md` Step 4. Auto-extract explained concepts, used analogies, repeated concept clusters, and concepts only lightly explained (candidates for deeper treatment later) into `concept_library.md`.

Template reference: Glob `**/templates/concept-library-template.md`.

### Step 4.5: Generate Human-Readable Companion Files

Follow `references/generation-steps.md` Step 4.5. Default: shell out to `scripts/render_companions.py` with `--lang zh` (or `--lang en` if existing companions use English names — the script auto-detects). Produces `posts_by_date.md`, `posts_by_topic.md`, `comments.md` (or their Chinese-named equivalents). Fallback to inline rendering only when the script is genuinely missing.

### Step 4.6: Generate Low-Token Compiled Memory

Run `scripts/build_compiled_memory.py --tracker ./threads_daily_tracker.json` after the tracker and companion files exist. This produces `compiled/account_wiki.md`, `compiled/post_feature_index.jsonl`, `compiled/cluster_wiki.json`, `compiled/exemplar_bank.md`, and `compiled/recent_window.md`.

Compiled memory is a derived runtime cache, not a new source of truth. If the script is missing or fails, setup still succeeds; report that downstream skills will use tracker-only fallback until compiled memory is built.

### Step 5: Completion Report

Report:

1. How many posts were imported.
2. Which import path was used.
3. 2–3 strongest style findings.
4. How many concepts were indexed.
5. Whether the tracker is full-data or partial-data.
6. That `/analyze`, `/predict`, and `/review` can already run, even if some enriched fields are still null.
7. Whether compiled memory was built successfully or tracker-only fallback is active.

If post count is below 20, say the historical base is still limited.

If the user has API access, tell them they can later run `scripts/update_snapshots.py` on a schedule to keep metrics snapshots current.

Regardless of API access, tell them they can run `scripts/update_topic_freshness.py` to build semantic clusters and estimate topic freshness / fatigue from account history.

If they do not have API access, rely on `/review` checkpoints plus `scripts/update_topic_freshness.py`.

---

## Handling Insufficient Data

Use the shared rubric at `knowledge/data-confidence.md` (Glob `**/knowledge/data-confidence.md`). Report the dataset-level gate in the completion report so the user knows whether downstream skills will run in Directional / Weak / Usable / Strong / Deep mode.

---

## Output File Checklist

After setup, the user's working directory should contain:

1. `threads_daily_tracker.json` — canonical data (machine-readable)
2. `style_guide.md`
3. `concept_library.md`
4. `posts_by_date.md` (or `歷史貼文-按時間排序.md`) — human-readable post archive
5. `posts_by_topic.md` (or `歷史貼文-按主題分類.md`) — topic-grouped index
6. `comments.md` (or `留言記錄.md`) — flat comment log
7. `compiled/` — low-token runtime cache generated from the tracker
