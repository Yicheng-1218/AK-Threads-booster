# Shared File Discovery Pattern

> Single reference for how every AK-Threads-Booster sub-skill locates knowledge files, compiled memory, user data, and scripts. Sub-skills read this file instead of restating the full discovery block.

---

## Knowledge Files

Use Glob to locate, relative to the plugin root:

- `**/knowledge/_shared/principles.md` - consultant principles (load first)
- `**/knowledge/_shared/config.md` - shared runtime toggles
- `**/knowledge/_shared/runtime-budget.md` - runtime depth, compiled memory, and output-mode policy
- `**/knowledge/_shared/red-lines.md` - canonical red-line and signal definitions
- `**/knowledge/data-confidence.md` - shared data-confidence rubric
- `**/knowledge/cards/algorithm-card.md` - low-token algorithm checklist
- `**/knowledge/cards/psychology-card.md` - low-token psychology checklist
- `**/knowledge/cards/ai-tone-card.md` - low-token AI-tone checklist
- `**/knowledge/psychology.md` - deep psychology knowledge base
- `**/knowledge/algorithm.md` - deep Meta algorithm knowledge base
- `**/knowledge/ai-detection.md` - deep AI-tone knowledge base
- `**/knowledge/chrome-selectors.md` - Chrome MCP selectors (only `/refresh` needs this)

Each sub-skill only reads the files it actually needs. In `lite` and `standard` runtime, prefer quick cards over the full `psychology.md`, `algorithm.md`, and `ai-detection.md` files. Load full knowledge only in `deep` mode, on ambiguity, or when the user explicitly asks for a deep diagnostic.

---

## Compiled Memory Files

When `runtime.compiled_memory` is `prefer` or `require_fresh`, look for these in the working directory:

- `compiled/account_wiki.md`
- `compiled/post_feature_index.jsonl`
- `compiled/cluster_wiki.json`
- `compiled/exemplar_bank.md`
- `compiled/recent_window.md`

These are derived views from `threads_daily_tracker.json`. Use them first for low-token runs, but treat the tracker as the source of truth when values conflict.

---

## User Data Files

Glob from the user's working directory:

- `threads_daily_tracker.json` - core post history + metrics + comments
- `style_guide.md` - quantitative style reference, produced by `/setup`
- `concept_library.md` - previously explained concepts, produced by `/setup` + `/review`
- `brand_voice.md` - qualitative voice profile, produced by `/voice`
- `threads_refresh.log` - last-run health of `/refresh` (may not exist)

Optional user-managed files (skip silently if absent):

- `*topic*`, `*idea*`, `*選題*` - user-maintained topic banks, supported by `/draft` and `/topics`

---

## Script References

Scripts live at `**/scripts/`:

- `fetch_threads.py` - Meta API import
- `parse_export.py` - Meta export import
- `render_companions.py` - render tracker into human-readable markdown
- `update_snapshots.py` - periodic metrics refresh (API)
- `update_topic_freshness.py` - semantic cluster + freshness scoring
- `build_compiled_memory.py` - builds low-token `compiled/` memory from the tracker

---

## Discovery Order

When a sub-skill starts:

1. Load `_shared/principles.md` first.
2. Load `_shared/config.md` and `_shared/runtime-budget.md` when the skill supports low-token runtime.
3. Locate compiled memory files when enabled. Validate freshness metadata before relying on them.
4. Load quick cards for `lite` / `standard`; load full knowledge only for `deep`, ambiguity, or explicit deep requests.
5. Load `data-confidence.md` if the skill makes claims based on the user's history.
6. Locate user data files. Tracker is the common backbone; style/voice/concept files are upgrades.
7. If a required file is missing, degrade per the fallback rules in the sub-skill's own SKILL.md. Never invent data.

## reason + strip_when

Reason: Discovery is the main token gate. Keeping compact runtime files and deep sources separate prevents accidental full-context loading.

Strip when: The platform offers reliable section-level retrieval with provenance and no meaningful token cost.
