# Threads Algorithm Red Lines & Suppression Risks (shared)

Single source of truth for red-line (R) and signal (S) definitions used by `/analyze` and `/draft`. If you are updating a red line, update it **here** — do not patch per-sub-skill copies.

Version: 1.0.0

---

## How to load

```
Glob **/knowledge/_shared/red-lines.md
```

Both `/analyze` (red-line scan, suppression-risk scan, signal assessment) and `/draft` (algorithm alignment at generation time) must reference this file. If a sub-skill finds itself repeating R-definitions inline, it has drifted — fix it back to a reference.

---

## Round 1 — Hard Red Lines (will cause demotion)

Trigger any of these and warn the user directly.

| ID | Name | Trigger |
|----|------|---------|
| R1 | Engagement bait | Explicit asks for likes/comments/shares ("tell me in the comments", "留言+1", "在下方留言", "幫我點讚", "tag 一個朋友") |
| R2 | Clickbait | Hook overpromises drama, revelation, or stakes that the body does not deliver |
| R3 | Hook-content mismatch | Hook and body are on different topics, or the hook promises X and body delivers Y |
| R4 | Obvious repost / low-quality original | Post is a near-duplicate of a recent post by the same user or a known source, with only minor edits |
| R5 | Consecutive same-topic posting | Third or later post in a row from the same semantic cluster without a deliberate series framing |
| R6 | Low-quality external links | Links to clickbait aggregators, content farms, or sites known to be demoted by Meta |
| R7 | Sensationalist framing of sensitive topics | Health, suicide, violence, politics framed for shock value rather than substantive treatment |
| R10 | Unlabeled AI content | AI-generated media or text presented as the user's own without disclosure |
| R11 | Image-text mismatch | Attached image does not relate to the post text, or image is used as bait |

### Canonical warning format

Use this exactly when a red line triggers:

```
[WARNING] This post triggers R<N> <Name> ('<quoted trigger>'). This will cause demotion. Are you sure you want to write it this way?
```

---

## Round 2 — Suppression Risks (soft demotion)

Not hard bans. Flag and advise — do not auto-block.

| ID | Name | Trigger |
|----|------|---------|
| R8 | Negative feedback trigger | Language likely to generate "don't recommend", "hide", or reports |
| R9 | Topic mixing | Two or more unrelated topic clusters in one post, diluting topic-graph clarity |
| R12 | Soft demotion (stacking) | **Two or more** weak risks present simultaneously. Raise R12 **in addition to** the individual risks, not instead of them |

Also flag (not R-numbered but treated at this tier):

- Topic freshness decay versus the last 5–10 posts
- Topic freshness budget / semantic-cluster fatigue
- Low stranger-fit (understandable to followers but weak for non-followers)
- Low shareability (useful to read, weak reason to forward)

---

## Round 3 — Positive Signals to Assess

Not risks — these are what `/analyze` checks for upside, and what `/draft` should actively shape.

| ID | Name |
|----|------|
| S1 | DM-sharing potential |
| S2 | Deep-comment trigger |
| S3 | Dwell time |
| S6 | Image-text combination |
| S7 | Semantic neighborhood consistency |
| S8 | Trust Graph alignment |
| S9 | Recommendability to strangers |
| S14 | Topic freshness budget |

---

## Reason to keep

Red-line definitions were previously duplicated in `skills/analyze/SKILL.md` and `skills/draft/SKILL.md`. When the two drifted (different wording, missing IDs), `/analyze` and `/draft` would disagree on the same input. Keeping this shared file means a change in one place propagates; both sub-skills must load via Glob rather than inline their own list.

## Strip when

- Threads publishes an official, machine-readable policy spec that we can consume directly (not currently available).
- OR the skill is retired.

Until then, this file is the source of truth. Any PR that modifies `/analyze` or `/draft` red-line behavior without updating this file is incomplete.
