# Runtime Budget Policy

> Shared policy for keeping AK-Threads-Booster usable on low-allowance agents.

Version: 1.0.0

---

## Purpose

Daily runs should use compact, source-linked summaries by default. The tracker and deep knowledge files remain the source of truth, but they are not the default runtime surface.

## Default Modes

Read `threads_booster_config.json` if present. If a key is absent, use:

```json
{
  "runtime": {
    "depth": "standard",
    "compiled_memory": "prefer"
  },
  "analyze": {
    "output_mode": "brief"
  }
}
```

## `runtime.depth`

| Value | Behavior |
|---|---|
| `lite` | Read compiled memory + quick cards only. Use at most 3 comparable posts. Do not read full knowledge files unless a red line or factual uncertainty requires it. |
| `standard` | Read compiled memory + quick cards. Use 3-5 comparable posts. Read targeted tracker excerpts only when provenance is needed. |
| `deep` | Full analysis mode. Read tracker, relevant companion files, and full knowledge files as needed. Use when the user asks for depth or when compact context is insufficient. |

## `runtime.compiled_memory`

| Value | Behavior |
|---|---|
| `prefer` | Use `compiled/` files first. Fall back to tracker when missing, stale, or insufficient. |
| `require_fresh` | Use compiled memory only if its `source_tracker_hash` matches the current tracker hash. Otherwise rebuild or stop and ask. |
| `off` | Ignore compiled memory and use source files directly. |

## `analyze.output_mode`

| Value | Behavior |
|---|---|
| `brief` | Output only red lines, decision summary, pointed changes, highest-upside comparisons, AI-tone density, and reference strength. |
| `standard` | Output the normal analysis sections, but keep each section compact. |
| `full` | Output the complete 11-section report from `skills/analyze/references/output-format.md`. |

## Compiled Memory Files

Expected location: `compiled/` in the working directory.

- `account_wiki.md` - compact account baseline and source-linked conclusions.
- `post_feature_index.jsonl` - one feature/metrics row per post.
- `cluster_wiki.json` - semantic clusters, freshness, representative posts.
- `exemplar_bank.md` - a capped set of representative posts.
- `recent_window.md` - recent posts and repetition risk.

These files are derived views. They are never the source of truth.

## Freshness Rules

Compiled memory is fresh only when:

1. `source_tracker_hash` matches the current `threads_daily_tracker.json` hash.
2. `posts_count` matches the current tracker post count.
3. `generated_at` is present.

If any check fails:

- `lite`: say compiled memory is stale and switch to tracker-only fallback for the smallest needed excerpt.
- `standard`: read tracker enough to verify the relevant claim, then recommend rebuilding compiled memory.
- `deep`: use source files directly and recommend rebuilding compiled memory after the run.

## Source-Truth Rule

When compiled memory and tracker disagree, the tracker wins. Report the mismatch briefly and rebuild compiled memory before using that compiled claim again.

## reason + strip_when

| Component | Reason | Strip when |
|---|---|---|
| Runtime depth modes | Lets low-allowance agents avoid loading full history and deep knowledge on routine runs. | Agent pricing/context limits stop being a practical constraint, or telemetry shows users consistently choose `deep`. |
| Compiled memory preference | Historical comparison sets are mostly deterministic and can be precomputed with provenance. | Tracker moves to a queryable store with native retrieval and cheap filtered reads. |
| Brief analyze output | Output tokens are a meaningful part of total cost; many runs only need the decision layer. | Users consistently request full reports, or UI-level collapsible sections make output tokens cheap. |
