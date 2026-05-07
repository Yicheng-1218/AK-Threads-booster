# Next Move Engine

Version: 1.0.0

Use this when `/topics`, `/draft`, `/analyze`, or `/review` needs to recommend what kind of post should come next.

The engine is not a formula bank. It is a decision layer:

```text
Red-Line Filter -> Signal Targeting -> Psychology Fit -> Anti-AI Texture -> Next Move
```

## Core Rule

A next move is valid only when it can answer all four questions:

1. Which R risks must be avoided?
2. Which S signal should this post strengthen?
3. Which audience psychology mechanism makes that signal plausible?
4. Which anti-AI texture prevents the post from sounding templated?

If a proposed move cannot name its R risks and S targets, do not put it in the queue.

## Three-Axis State

Read `compiled/account_state.md` when available. It summarizes:

- Algorithm state: reach, reply behavior, share behavior, freshness pressure, and red-line watch.
- Audience psychology state: hook payoff, useful tension, concrete experience, and retellability.
- Anti-AI state: possible template feel, over-polish, generic phrasing, and missing personal judgment.

The tracker remains the source of truth. If the compiled state is stale or weak, say so and verify against `threads_daily_tracker.json`.

## Personal Signal Memory

Read `compiled/personal_signal_memory.md` when available.

This file stores personal account signals only. It must not become:

- a generic case-study library
- a universal growth advice file
- a formula list
- a reason to copy wording from old posts

Use it as a compact memory of what repeatedly seems to matter for this account.

## Queue Files

Read `compiled/next_move_queue.md` when available.

Each move should include:

- Algorithm Target: positive S signals to strengthen
- Must Avoid: R risks to check before drafting
- Use When: account-state condition
- Good For: likely business or audience effect
- Human Texture: anti-AI and psychology guidance

## Default Moves

### 補人格判斷

Use when the account has enough information value but lacks personal judgment, constraint, or lived texture.

- Targets: S2 deep-comment trigger, S3 dwell time, S8 trust graph
- Avoid: R4 low-originality, R10 unlabeled AI content, R12 stacked soft risks
- Human texture: concrete experience, tradeoff, limitation, or a small moment of uncertainty

### 澄清分歧

Use when the account needs better discussion quality without turning into engagement bait or rage bait.

- Targets: S2 deep-comment trigger, S7 semantic consistency, S9 recommendability to strangers
- Avoid: R1 engagement bait, R2 clickbait, R7 sensationalist sensitive-topic framing, R8 negative feedback trigger, R12 stacked soft risks
- Human texture: a real distinction with evidence, not a broad attack or artificial controversy

### 擴散型實用觀點

Use when the account needs stranger-fit and shareability, and the topic still has freshness budget.

- Targets: S1 DM-sharing potential, S3 dwell time, S9 recommendability to strangers, S14 topic freshness budget
- Avoid: R3 hook-content mismatch, R4 low-originality, R5 consecutive same-topic posting, R6 low-quality external links, R9 topic mixing
- Human texture: one clear retellable point plus personal judgment; avoid generic AI checklist structure

## User-Facing Language

Mirror the user's language in the current run.

If the user writes in Chinese, use clear Chinese and avoid unnecessary English jargon. If an English term or internal ID is necessary, explain it in Chinese the first time:

- `S2` means "深留言觸發", or whether a post can invite real, detailed replies.
- `S9` means "陌生人推薦性", or whether people who do not know the account can still understand why the post matters.
- `R1` means "互動誘導", such as asking people to comment, like, share, or tag only to boost reach.

If the user writes in English, use normal English professional terms freely. Still explain internal IDs such as `S2` or `R1` the first time because those are AK體-specific labels.

Avoid dumping internal labels into user-facing output. Internal labels are for precision; the user should receive clear decisions.

## reason + strip_when

Reason: AK's next-step recommendations must be algorithm-based without becoming a template or formula system.

Strip when: The skill no longer recommends next-post direction, or the R/S signal system is replaced by a better canonical decision layer.
