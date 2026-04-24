# Algorithm Quick Card

Version: 1.0.0

Use this for `lite` and `standard` runtime. Load `knowledge/algorithm.md` only in `deep` mode or when an edge case is unclear.

---

## Round 1: Direct Red Lines

Canonical definitions and warning format still live in `knowledge/_shared/red-lines.md`.

Scan first for:

- R1 engagement bait: explicit comment/like/share requests, "+1", "tell me in comments".
- R2 clickbait: curiosity gap with no real payoff.
- R3 hook-content mismatch: hook promises one thing, body delivers another.
- R4 duplicate / low-originality repost.
- R5 consecutive same-topic posts with no clear reframe.
- R6 low-quality external link dependency.
- R7 sensationalist sensitive-topic framing.
- R10 realistic AI-generated media without label.
- R11 media/text mismatch.

If triggered, warn directly. Do not soften red-line language.

## Round 2: Suppression Risks

Flag as risks, not commands:

- R8 negative feedback triggers: condescending framing, avoidable hostility, vague attacks.
- R9 topic mixing: multiple unrelated claims competing for attention.
- R12 stacked soft risks: raise when 2 or more weak risks appear together.
- Topic freshness decay: same semantic cluster too recent.
- Low stranger-fit: requires too much follower context.
- Low share incentive: useful only to the author or existing followers.
- Weak body payoff: strong hook, thin second paragraph.

## Round 3: Positive Signals

Look for:

- S1 DM share potential.
- S2 in-depth comment trigger.
- S3 dwell time from useful detail or narrative motion.
- S6 text/media combination when media exists.
- S7 semantic neighborhood consistency.
- S8 account consistency / trust graph.
- S9 recommendability to strangers.
- S14 topic freshness budget.

## Load Full Algorithm When

- A red-line hit is ambiguous.
- Sensitive topics, realistic media, or external links are central.
- The user asks for a deep algorithm audit.
- Quick card and tracker evidence conflict.

## reason + strip_when

Reason: Most runs need the checklist, not the full explanatory algorithm knowledge base.

Strip when: The full knowledge file becomes small enough to load routinely, or retrieval can fetch only the relevant section without prompt cost.
