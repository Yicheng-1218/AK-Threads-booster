# Fixture: `/voice` Creation Genome Distillation

## Purpose

Verify that `/voice` uses deterministic voice fingerprint data before interpretation and produces a `/draft`-usable creation genome, not only a descriptive style report.

## Input

User asks:

```text
幫我重新跑 brand voice，讓 /draft 之後寫得更像我。
```

Tracker fixture characteristics:

- At least 30 posts.
- Metrics exist for views, likes, replies, and shares/reposts.
- Top-engagement posts contain repeated judgment markers such as "我覺得", "本質", "不是...而是".
- Older posts use a question ending often, but recent posts usually end with a clean-cut statement.
- Existing `brand_voice.md` contains a non-empty `## Manual Refinements (user-edited)` section.

## Expected Behavior

- Loads or rebuilds `compiled/voice_fingerprint.md` before heavy analysis.
- Reports whether voice fingerprint was fresh, rebuilt, stale, or unavailable.
- Uses engagement-weighted evidence for major claims.
- Marks the older question-ending pattern as historical-only if recent posts no longer use it.
- Produces `Cognitive Core`, `Voice Fingerprint`, `Anti-Voice / Forbidden Zone`, `/draft Quick-Reference Pack`, and `Calibration Pairs`.
- Preserves Manual Refinements verbatim.

## Pass Criteria

Rubric items: H1, H2, H3, H4, H5, H6, H7.

## Fail Signals

- Treats all posts equally without acknowledging engagement.
- Produces only the original 14 style sections.
- Turns absence-based phrases into hard taboos without evidence or user confirmation.
- Overwrites Manual Refinements.
- Gives `/draft` only vague style prose instead of opening/ending/anchor/checklist material.
