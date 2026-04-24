# Style Guide + Concept Library + Companions (`/setup` Steps 3, 4, 4.5, 4.6)

---

## Step 3: Auto-Generate Style Guide (M2)

Read all historical posts from the tracker and generate `style_guide.md`.

Analyze:

- catchphrases
- hook types and their performance
- hook-promise fulfillment patterns in strong posts
- pronoun density
- ending patterns and their performance
- register
- paragraph structure
- word-count distribution
- content-type mix
- emotional arcs
- share / DM-forward drivers in the strongest posts
- topic clusters and repetition pressure
- topic freshness budget / semantic-cluster fatigue
- posting-time windows if timing data is reliable

Use the psychology knowledge base as the classification baseline.

Key rule:

- Describe what the user's style **is**, not what it should be.
- High-performing patterns should be annotated, not turned into commands.

Template reference: Glob `**/templates/style-guide-template.md`.

---

## Step 4: Build Concept Library (M3)

Auto-extract into `concept_library.md`:

1. Explained concepts
2. Used analogies
3. Repeated concept clusters
4. Concepts that were only lightly explained and may need deeper treatment later

Template reference: Glob `**/templates/concept-library-template.md`.

---

## Step 4.5: Generate Human-Readable Companion Files

The JSON tracker is for skills; the user cannot skim it comfortably. After the tracker is written, always generate three markdown companions in the same directory so the user can read, grep, and cross-reference their own data.

### Default: shell out to `scripts/render_companions.py`

Deterministic, handles backup-if-modified, safe to re-run:

```bash
python scripts/render_companions.py \
  --tracker "<user-working-dir>/threads_daily_tracker.json" \
  --output-dir "<user-working-dir>" \
  --lang zh
```

Use `--lang en` only if the user's existing companion files already use English names. The script auto-detects existing filename convention (Chinese vs English) and preserves whichever the user already has. `--lang` only decides names when creating the files for the first time.

### Produced files

1. **`歷史貼文-按時間排序.md`** (or `posts_by_date.md`) — full post archive, newest first, month-grouped, metrics inline.
2. **`歷史貼文-按主題分類.md`** (or `posts_by_topic.md`) — topic-grouped index pointing back to the date archive.
3. **`留言記錄.md`** (or `comments.md`) — flat comment log, newest first, plus a `未配對留言` section for `unmatched_comments[]`.

All three carry a header notice that they are auto-generated and will be overwritten. The script backs up any companion file modified after the tracker's last write (assumes user hand-edits) before rewriting.

### Fallback (script unavailable)

If `render_companions.py` cannot be located or Python is unavailable, produce the same three files inline by reading the tracker and rendering them yourself. This is slower and costs tokens — only fall back when the script is genuinely missing, not as a preference.

These files double as the migration source in Path E for users running the legacy manual-download + Claude-Code-reformat workflow. Producing them by default makes future migrations trivial.

---

## Step 4.6: Generate Low-Token Compiled Memory

After companion files are generated, run:

```bash
python scripts/build_compiled_memory.py --tracker "<user-working-dir>/threads_daily_tracker.json"
```

This creates:

1. `compiled/account_wiki.md`
2. `compiled/post_feature_index.jsonl`
3. `compiled/cluster_wiki.json`
4. `compiled/exemplar_bank.md`
5. `compiled/recent_window.md`

These files are derived runtime caches. They are not sources of truth and should not be hand-edited. Every generated file must include provenance metadata: `generated_at`, `source_tracker_hash`, `posts_count`, `confidence_level`, and `coverage_notes`.

If `build_compiled_memory.py` cannot be located or Python is unavailable, do not fail setup. Report that downstream skills will run in tracker-only fallback and recommend rebuilding compiled memory later.
