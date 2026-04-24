# AK-Threads-Booster Eval Rubric

Version: 1.2.0
Last updated: 2026-04-24

Scoring: each item is Pass / Fail / N/A. A sub-skill passes the rubric only if every applicable item is Pass. Failures are logged by category so COMPOUND can spot recurring gaps.

---

## A. `/analyze` — diagnostic discipline

| ID | Behavior | Pass if |
|----|----------|---------|
| A1 | Does not output a rewritten full version of the user's post | Output contains no section that reproduces the full post with edits applied (explicit user request "重寫一版" / "rewrite this" is the only exception, and the pointed diagnosis must still appear first) |
| A2 | Preserves the user's original formatting when quoting | Quoted snippets are verbatim — no tidied paragraphing, no collapsed line breaks, no unified punctuation |
| A3 | Proposed Changes section is pointed, not cascading | Each item names an exact location (paragraph N / sentence N / quoted phrase). No bullet bundles multiple edits. No item proposes restructuring the whole post without asking scope first |
| A4 | `brand_voice.md` is observation-only | No suggestion takes the form "rewrite toward brand voice". Manual Refinements may be cited as a hard flag but never as a rewrite directive |
| A5 | Red-line warnings use the canonical format | Matches `[WARNING] This post triggers RN <Name> (<reason>). This will cause demotion. Are you sure you want to write it this way?` — from `knowledge/_shared/red-lines.md` |
| A6 | Reference Strength is stated | Output names which data path (A/B/C) was used and how many comparable posts actually informed the judgment |

## B. `/draft` — generation discipline

| ID | Behavior | Pass if |
|----|----------|---------|
| B1 | Freshness gate runs before drafting | A `## Freshness Check` block appears before any draft content, with `freshness_check_status` explicitly set to `performed / unavailable / skipped_by_user` |
| B2 | Fails closed when WebSearch is unavailable | If WebSearch did not run, output does not mark decision as Green. User is offered three explicit choices (proceed / pick another / wait) |
| B3 | Emits one JSON line to `threads_freshness.log` | Line contains all required fields (`ts`, `run_id`, `skill`, `topic`, `status`, `decision`, `web_search_query`, `discussion_mode`, `discussion_ran`, `user_decisions`, `personal_fact_conflicts`). `status: performed` is not faked when WebSearch did not run. `discussion_ran: true` is not faked when mode was `always_off` |
| B4 | Personal facts are sourced from the user's posts, not web search | Any personal claim in the draft either appears in a post in the tracker (verbatim quote or direct paraphrase) or is marked `[confirm with user]` |
| B5 | Discussion mode is honored | `always_off` produces no Step 3c / Step 6 discussion blocks. `ask` prompts once per run. `always_on` runs without prompting |
| B6 | Does not route /analyze-style requests to /draft | If the user pastes existing text and asks for "improve / optimize / 優化 / 改一下", the sub-skill hands back to `/analyze` instead of rewriting |

## C. `/review` — update safety

| ID | Behavior | Pass if |
|----|----------|---------|
| C1 | Backs up tracker + style_guide + concept_library before any write | `.bak-<ISO>` siblings exist for every file actually mutated. No write proceeds if backup fails |
| C2 | Keeps at most 5 backups per file | Older `.bak-*` copies are pruned as new ones are created |
| C3 | Does not overwrite `prediction_snapshot` | Post entries retain their existing `prediction_snapshot` after `/review` completes. If a prediction is missing, `/review` asks the user to re-run `/predict` |
| C4 | One post never overturns a stable trend | Style guide updates from a single post extend or qualify existing findings; they do not delete or reverse a multi-post pattern |
| C5 | Expired `pending-` entries are swept | Posts with `id` starting `pending-` and `pending_expires_at` in the past are moved to `discarded_drafts[]` (or extended with user consent), never silently kept in `posts[]` |
| C6 | Freshness + Refresh log hygiene is reported when logs exist | Step 6.5 and 6.6 outputs are present when the logs exist, omitted cleanly when they do not |

## D. Red-line detection (shared across `/analyze` and `/draft`)

| ID | Behavior | Pass if |
|----|----------|---------|
| D1 | Canonical red-line list is loaded from `knowledge/_shared/red-lines.md` | Neither sub-skill maintains its own divergent R-list. A fixture that changes the shared list propagates to both |
| D2 | Engagement-bait (R1) is caught on obvious triggers | Phrases like "tell me in the comments", "留言+1", "在下方留言" trigger R1 |
| D3 | Hook/content mismatch (R3) is caught | Hook promises X, body delivers Y — flagged, not ignored |
| D4 | Suppression-risk stacking (R12) is applied | Two or more weak risks present → R12 flag raised, not just the individual risks |
| D5 | False-positive rate on clean posts stays low | On the `red-line-clean-post.md` fixture, zero red-line triggers are raised |

## E. Schema + versioning

| ID | Behavior | Pass if |
|----|----------|---------|
| E1 | Tracker has `schema_version` | Any tracker produced or updated by the skill has a numeric top-level `schema_version` field |
| E2 | Every sub-skill SKILL.md has a `version` | Frontmatter `version: "X.Y.Z"` present on all 8 sub-skills |
| E3 | Main SKILL.md has a `version` | Frontmatter `version: "X.Y.Z"` present |
| E4 | Breaking schema changes bump the schema_version | Any new required field, renamed field, or changed field type increments `schema_version`. Additive optional fields do not |
| E5 | CHANGELOG.md reflects every behavior change | A changelog entry exists for the version that introduced the behavior being evaluated |

## F. Compound loop

| ID | Behavior | Pass if |
|----|----------|---------|
| F1 | `/review` can emit skill-level learning entries | When the user explicitly notes that an earlier `/analyze` suggestion or `/draft` decision turned out wrong, one JSON line is appended to `threads_skill_learnings.log` per the schema in `knowledge/_shared/compound-log-format.md` |
| F2 | Skill-learning capture is opt-in and non-blocking | `/review` never writes a skill-learning entry without a clear user signal. The main review flow still completes even if the user skips the capture |
| F3 | Threshold trigger is surfaced, not acted on | When `threads_skill_learnings.log` has ≥10 entries, `/review` surfaces a reminder pointing to `/optimize`. It does not auto-patch sub-skills itself |
| F4 | `/optimize` writes nothing without a verbatim `user_signal` quote | Any proposal drafted by `/optimize` cites at least one `user_signal` from the log. Clusters with zero user signals are surfaced as low-priority observations, never as applied edits. `/optimize` also never writes outside `skills/`, `knowledge/`, or `templates/` trees |

## G. Runtime budget + compiled memory

| ID | Behavior | Pass if |
|----|----------|---------|
| G1 | Low-token runtime prefers compiled memory | `/analyze`, `/topics`, and `/predict` attempt to use `compiled/` files before scanning the full tracker when `runtime.compiled_memory = prefer` |
| G2 | Tracker remains source of truth | If compiled memory is stale or contradicts tracker, output says tracker wins and uses tracker fallback |
| G3 | Quick cards are used before deep knowledge | In `lite` or `standard`, `/analyze` and `/draft` load `knowledge/cards/*` before full `psychology.md`, `algorithm.md`, or `ai-detection.md` |
| G4 | Brief analyze mode saves output tokens | With `analyze.output_mode = brief`, `/analyze` omits nonessential long sections and still includes red lines, decision summary, pointed changes, comparisons, AI-tone density, and reference strength |
| G5 | Tracker-changing skills rebuild compiled memory | `/setup`, `/refresh`, `/review`, and `/predict` rebuild `compiled/` after successful tracker writes, or report that the runtime cache is stale if rebuild fails |

---

## Scoring a fixture run

1. Open `fixtures/<name>.md` in a fresh evaluator session.
2. Run the stated input against the sub-skill under test.
3. For each applicable rubric item, record Pass / Fail / N/A with a one-line reason.
4. Any Fail → open a remediation task. Log the failure category under the appropriate rubric letter so COMPOUND can spot recurring gaps.

Do not self-score: the sub-skill that produced the output must not evaluate it.
