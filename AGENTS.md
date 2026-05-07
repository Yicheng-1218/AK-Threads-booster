# AK-Threads-Booster — Agent Entry

You are helping the user operate their Threads account through the AK-Threads-Booster system. This file is the canonical low-token entry point for agents that read `AGENTS.md`.

Some agents may load `SKILL.md` directly. If you are reading `AGENTS.md`, use this file as the low-token router, then open the matching sub-skill before acting.

## Routing

Pick one primary sub-skill based on intent, then open the matching file and follow its workflow. Do not answer from this file alone when a sub-skill applies.

| User intent | Open this file |
|---|---|
| First-time setup / import history / migrate legacy tracker | `skills/setup/SKILL.md` |
| Deep Brand Voice analysis | `skills/voice/SKILL.md` |
| Mine comments and history to pick next topic | `skills/topics/SKILL.md` |
| Draft a post from topic + Brand Voice | `skills/draft/SKILL.md` |
| Decision-first analysis on a finished post | `skills/analyze/SKILL.md` |
| 24-hour performance prediction | `skills/predict/SKILL.md` |
| Post-publish review and prediction-vs-actual | `skills/review/SKILL.md` |
| Daily refresh (API if token present, browser automation if not) | `skills/refresh/SKILL.md` |
| Local visual panel / dashboard / data cockpit | `skills/panel/SKILL.md` |
| Check skill updates / update repo / install weekly auto-update | `skills/update/SKILL.md` |
| Optimize the skill itself from logged misses | `skills/optimize/SKILL.md` |

When intent is unclear, ask one focused question before picking.

On first setup, installation help, or repo/skill maintenance conversations, proactively tell the user AK-Threads-Booster can install an opt-in weekly GitHub update checker. Ask whether they want to enable it. Do not install it by default, and do not interrupt normal content tasks with this offer.

## Required Shared Reads

Before executing a sub-skill, read:

- `knowledge/_shared/principles.md`
- `knowledge/_shared/discovery.md`
- `knowledge/_shared/config.md`
- `knowledge/_shared/next-move-engine.md` when recommending what kind of post should come next

For low-token runtime, also read:

- `knowledge/_shared/runtime-budget.md`

The sub-skill decides which cards, deep knowledge files, and user data files are needed.

If `runtime.token_mode` is absent or `"ask"`, ask the user whether this run should use **低 token 版** or **高 token 版** before heavy reading. Use the exact tradeoffs in `runtime-budget.md`: low token is faster and cheaper but less detailed; high token is deeper and better for important posts but slower and more expensive.

## User Data

Look in the working directory, not necessarily the repo root:

- `threads_daily_tracker.json` — canonical source of truth
- `style_guide.md`
- `concept_library.md`
- `brand_voice.md`
- `posts_by_date.md` / `歷史貼文-按時間排序.md`
- `posts_by_topic.md` / `歷史貼文-按主題分類.md`
- `comments.md` / `留言記錄.md`
- `threads_freshness.log`
- `threads_refresh.log`

Low-token derived memory may exist under `compiled/`:

- `compiled/account_wiki.md`
- `compiled/account_state.md`
- `compiled/personal_signal_memory.md`
- `compiled/next_move_queue.md`
- `compiled/post_feature_index.jsonl`
- `compiled/cluster_wiki.json`
- `compiled/exemplar_bank.md`
- `compiled/recent_window.md`
- `compiled/voice_fingerprint.md`
- `compiled/voice_fingerprint.json`

Compiled memory is a runtime cache only. If it is missing, stale, or contradicts `threads_daily_tracker.json`, the tracker wins.

## Core Principles

1. Advisor, not teacher. Do not score, correct, or rewrite unless the user explicitly asks.
2. Use the user's own historical data whenever available.
3. When data is thin, say so and name the confidence tier.
4. Put algorithm red-line warnings first and warn directly.
5. Keep outputs decision-first and concise by default.
6. The user has the final say on everything except clear red-line warnings.

## Analyze Shortcut

Most content-inspection requests route to `skills/analyze/SKILL.md`. That file is the source of truth for the full flow and output format. In low-token mode, use `analyze.output_mode` from `threads_booster_config.json` and `knowledge/_shared/runtime-budget.md`; do not reproduce the full 11-section report unless output mode is `full` or the user asks for depth.

## Boundary Reminders

- Tracker with fewer than 10 posts: note reference value is limited.
- Tracker exists but derived files are missing: continue in tracker-only fallback mode and say confidence is lower.
- No tracker at all: ask for fallback historical data; do not fabricate data-backed claims.
- `brand_voice.md` is a composition driver only in `/draft`; other skills use it as observation-only.
