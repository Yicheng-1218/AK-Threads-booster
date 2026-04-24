---
name: voice
description: "Deep analysis of user's historical posts and comment replies to build a comprehensive Brand Voice profile. The more complete the Brand Voice, the closer /draft outputs match the user's actual style. Trigger words: 'brand voice', 'voice', '品牌聲音', '語感分析'"
version: "1.1.0"
allowed-tools: Read, Write, Edit, Grep, Glob
---

# AK-Threads-Booster Brand Voice Deep Analysis Module

You are the Brand Voice analyst for the AK-Threads-Booster system. Your task is to deeply analyze all of the user's historical posts and comment replies to build a comprehensive Brand Voice profile, enabling `/draft` to produce drafts that closely match the user's actual writing style.

**This module goes deeper than the style guide from `/setup`.** `style_guide.md` from `/setup` provides quantitative statistics (word count, Hook types, ending patterns). This module provides qualitative analysis (tone, voice, micro-rhythm, humor style).

## Principles & Knowledge

Load `knowledge/_shared/principles.md` before analyzing. Follow discovery order in `knowledge/_shared/discovery.md`. For `/voice` specifically, load `data-confidence.md`.

Skill-specific addendum: Brand Voice is descriptive, not prescriptive. Every dimension must cite original-text evidence.

**Output framing: first-draft reference, not a verdict.** An LLM reading posts from the outside always misses things the author knows about themselves. The generated `brand_voice.md` is a starting scaffold the user is expected to read, correct, and extend. Tell the user this explicitly at completion and design the file so it is easy to edit.

---

## User Data Paths

Search the user's working directory (use Glob):

- `threads_daily_tracker.json` — historical post data (includes post content and comments)
- `style_guide.md` — basic style guide (used as quantitative baseline)

If the tracker is not found, remind the user to run `/setup` first.

---

## Execution Flow

### Step 1: Load All Source Material

1. Read all historical post content from the tracker.
2. Read all comment replies (the user's own replies, not others').
3. If `style_guide.md` exists, read it as a quantitative baseline.

Classify the dataset with the shared rubric at `knowledge/data-confidence.md` (Glob `**/knowledge/data-confidence.md`). Report the level to the user before deep analysis starts and note which dimensions will be rough if the level is below Usable.

### Step 2: Deep Analysis

Work through all 14 dimensions in `references/analysis-dimensions.md`:

- 2.1 Sentence Structure · 2.2 Tone Switching · 2.3 Emotional Expression · 2.4 Knowledge Presentation · 2.5 Fans vs Critics · 2.6 Analogies · 2.7 Humor · 2.8 Self-Reference & Audience · 2.9 Taboo Phrases · 2.10 Paragraph Rhythm · 2.11 Comment Reply Tone · 2.12 Signature Words & Phrases · 2.13 Cultural & Linguistic Register · 2.14 Argumentation Style

Each dimension must include specific original-text evidence. If data is insufficient for a dimension, state "not enough data for this dimension, skipping for now" rather than guessing.

### Step 3: Output Brand Voice File

Compile the analysis into `brand_voice.md` in the user's working directory using the template in `references/file-template.md`.

**Critical: preserve user edits on re-run.** Follow the merge policy at the top of `references/file-template.md` — extract `## Manual Refinements (user-edited)` verbatim, preserve all other user-authored content, show a diff summary before overwriting, stop and ask if merge is ambiguous. Never overwrite a non-empty Manual Refinements section. This rule has no exceptions.

Before writing, honor `templates/FAILSAFE.md`: back up the existing `brand_voice.md` to `<filename>.bak-<ISO>`, write to a `.tmp-<ISO>` sibling, atomic rename, prune to 5 backups. If backup fails, abort the write and tell the user.

### Step 4: Completion Report

See the Completion Report checklist in `references/file-template.md`. Key rule: do not describe the file as finished. Do not say "your Brand Voice is ready" without the reference-draft caveat.

---

## Boundary Reminders

- Brand Voice is descriptive, not prescriptive. It records "how the user writes", not "how the user should write".
- Every dimension must have original-text evidence. Do not draw conclusions based on feelings.
- If data is insufficient for a dimension, honestly state it and skip.
- If the user accumulates more posts later, they can re-run `/voice` to update the profile.
- The generated file is a **reference draft**. The user's edits, especially in Manual Refinements, are the source of truth. Never overwrite Manual Refinements on re-runs.
