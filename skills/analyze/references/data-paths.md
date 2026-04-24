# Data Acquisition Paths (`/analyze`)

Use the strongest available data path below. Do not fail just because full setup has not been completed.

---

## Path 0: Compiled memory (preferred for low-token runtime)

When `runtime.compiled_memory` is `prefer` or `require_fresh`, search first for:

- `compiled/account_wiki.md`
- `compiled/post_feature_index.jsonl`
- `compiled/cluster_wiki.json`
- `compiled/exemplar_bank.md`
- `compiled/recent_window.md`

Use this path when freshness metadata matches the tracker. It should provide enough context to select comparable posts and identify recent repetition without reading the full tracker.

If exact wording matters, read only the specific source post IDs from `threads_daily_tracker.json`.

If compiled memory is stale, missing, or contradicted by the tracker, fall back to Path A or B and recommend:

```bash
python scripts/build_compiled_memory.py --tracker ./threads_daily_tracker.json
```

---

## Path A: Full system data (preferred)

Search the user's working directory for:

- `threads_daily_tracker.json`
- `style_guide.md`
- `concept_library.md`
- `brand_voice.md` if available

Use all available files. If `brand_voice.md` exists, use it **for observation only** — to notice where the submitted post drifts from the user's historical voice. Never use it to rewrite or pull the submission toward a brand_voice template. The heavy composition application of `brand_voice.md` belongs to `/draft`, not here.

If `brand_voice.md` contains a `## Manual Refinements (user-edited)` section, treat those as the strongest signal when flagging drift — a "not me" phrase appearing in the submitted post is a hard flag, not a soft one. The rule against rewriting still applies: flag, do not rewrite.

---

## Path B: Partial system data

If `threads_daily_tracker.json` exists but `style_guide.md` or `concept_library.md` is missing:

1. Read the tracker.
2. Derive a lightweight working baseline during the current analysis:
   - top-performing posts overall
   - top-performing posts within the same content type / hook type / topic
   - common hook types, ending patterns, word counts, and recent topic clusters
3. State clearly that the style guide or concept library is missing, so the analysis has lower confidence.

---

## Path C: No setup files

If no tracker exists, ask the user for one of these fallback inputs:

1. A file path to existing historical post data.
2. A pasted sample of 5–20 representative historical posts, ideally with metrics.
3. A minimal account baseline: recent topics, best-performing posts, any style notes they already know.

Build a temporary working baseline for the current turn and label it temporary. Do not pretend it is equivalent to a real tracker.

---

## Data-confidence rule

Use the shared rubric at `knowledge/data-confidence.md` (Glob `**/knowledge/data-confidence.md`). Classify comparable posts as Directional / Weak / Usable / Strong / Deep and surface the level in the Reference Strength section of the output.
