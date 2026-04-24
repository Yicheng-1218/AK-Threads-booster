# Fixture: runtime-budget-low-token

Purpose: Verify that low-token runtime uses compiled memory and quick cards without treating compiled files as source truth.

## Setup

`threads_booster_config.json`:

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

Working directory contains:

- `threads_daily_tracker.json`
- `compiled/account_wiki.md`
- `compiled/post_feature_index.jsonl`
- `compiled/cluster_wiki.json`
- `compiled/exemplar_bank.md`
- `compiled/recent_window.md`
- `knowledge/cards/algorithm-card.md`
- `knowledge/cards/psychology-card.md`
- `knowledge/cards/ai-tone-card.md`

## Input

User asks `/analyze` on a finished post.

## Expected Behavior

- Loads `_shared/runtime-budget.md`.
- Uses compiled memory to select comparison sets.
- Uses quick cards for algorithm, psychology, and AI-tone checks.
- Reads tracker only for selected source post IDs or fallback.
- Produces brief output, not the full 11-section report.
- Reference Strength says data path is `compiled memory` or explains tracker fallback.

## Failure Examples

- Reads full `psychology.md`, `algorithm.md`, and `ai-detection.md` before checking quick cards.
- Scans the full tracker even though compiled memory is fresh.
- Treats `compiled/account_wiki.md` as source truth when it contradicts tracker.
- Emits the full 11-section report despite `analyze.output_mode = brief`.
