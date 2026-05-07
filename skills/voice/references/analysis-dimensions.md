# Brand Voice Analysis Dimensions (Step 2)

Analyze the user's writing style across every dimension below. Each dimension must include specific original post excerpts as evidence. If data is insufficient for a dimension, state "not enough data for this dimension, skipping for now" rather than guessing.

Start from `compiled/voice_fingerprint.md` / `.json` when available. For each important claim, add an evidence tag:

- **High-engagement pattern** — appears in the engagement-weighted corpus.
- **Recent-stable pattern** — still appears in the recent third of posts.
- **Historical-only pattern** — appears mostly in older posts; keep as context, not a hard `/draft` rule.
- **Thin evidence** — fewer than 3 examples or no engagement support.

Use deterministic counts from the fingerprint for mechanical features. Use model judgment for interpretation, meaning, and `/draft` implications.

---

## 2.1 Sentence Structure Preferences

- Ratio of short vs long sentences (approximate % if data allows)
- How compound sentences are connected (commas, periods for breaks, conjunctions)
- Whether the user deliberately fragments sentences across multiple lines, and what effect that creates
- Average sentence length distribution (longest, shortest, typical range)
- Preferred sentence templates (e.g., "When... then...", "Rather than... better to...") — list the top 5–8 with counts
- Use of parentheses, em-dashes, ellipses, or inline asides — frequency + function (softening, humor, clarification)
- Line-break convention inside a single paragraph (does the user press enter mid-thought? where?)
- Whether questions are used structurally (rhetorical, genuine, or as paragraph transitions)

## 2.2 Tone Switching Patterns

- In what context does the user use a serious tone
- In what context does the user switch to self-deprecation
- In what context does the user get confrontational or sarcastic
- How tone transitions work (abrupt switches vs gradual buildup)
- Ratio of serious vs playful content

## 2.3 Emotional Expression Style

- How they express happiness/pride (direct statement vs subtle hints)
- How they express anger/frustration (do they name the target, or stay abstract?)
- How they express helplessness/resignation
- How they express excitement/surprise
- How they express uncertainty/reservation (hedging words, qualifiers, "maybe"-style markers)
- Emotional intensity preference (easily excited vs calm and restrained)
- Whether emotion is placed at the opening, middle, or ending of a post
- Whether emotion is first-person ("I feel…") or projected ("this industry is…")
- Recurring "emotional tells" — phrases that signal the user is actually fired up vs performing

## 2.4 Knowledge Presentation Style

- How they introduce technical concepts (drop jargon directly, build context first, or use analogies)
- Translation-to-layman techniques (what kinds of metaphors, what kinds of examples)
- Tone when demonstrating expertise (confident and direct, self-deprecating, or deliberately understated)
- Assumed audience knowledge level (how much they expect readers to already know)

## 2.5 Tone Differences: Fans vs Critics

- Tone characteristics when replying to supporters
- Tone characteristics when replying to skeptics
- Tone characteristics when replying to trolls/haters
- Whether there are fixed reply patterns or catchphrases
- When the user chooses not to reply

## 2.6 Common Analogies and Metaphor Style

- Preferred metaphor source domains (daily life, gaming, sports, business, science, etc.)
- Specificity of analogies (abstract metaphors vs concrete scene descriptions)
- Whether certain metaphors are used repeatedly
- Length of analogies (one-liner vs expanded into a paragraph)

## 2.7 Humor and Wit Style

- Humor type (self-deprecation, sarcasm, contrast, absurdist, dry humor, meme references)
- Where jokes are placed (end of paragraph, in parentheses, sudden interjection)
- Frequency of humor (almost every post, occasional, rarely)
- Whether emoji or emoticons support humor

## 2.8 Self-Reference and Audience Address

- How they refer to themselves
- How they refer to readers
- When they use "we" (pulling readers into the same camp)
- Whether there are specific terms for subgroups of their audience

## 2.9 Taboo Phrases

- Words or sentence patterns the user never uses
- Expression styles the user clearly avoids
- Language completely incompatible with the user's style (e.g., too formal, too literary, too cutesy)

## 2.10 Paragraph Rhythm Micro-Features

- First sentence length (word count range)
- Sentences in the opening paragraph
- How the middle section develops (argument stacking, case studies, conversational progression)
- How the ending paragraph wraps up (clean cut, cliffhanger, rhetorical question, CTA)
- Transition style between paragraphs (conjunctions, direct jumps, blank-line breaks)
- Preferred paragraph count
- Ratio of single-line to multi-line paragraphs
- Whether the user uses "reveal" structure (bury the point, then surface it) vs "lead" structure (state the point, then defend it)
- Pacing signature — does the rhythm speed up, slow down, or stay even?

## 2.11 Comment Reply Tone Characteristics

- Tone differences between posts and comment replies (replies usually more casual)
- Reply length preference
- Distinctive language features in replies
- Whether there are fixed opening or closing patterns
- When they write long replies vs short replies

## 2.12 Signature Words and Phrase Inventory

Build a concrete, countable inventory — this is what makes `/draft` output recognizable.

- Top 15–20 content words or short phrases that appear disproportionately often (with counts)
- Opener phrases (first 3–5 words of posts)
- Closer phrases (last 3–5 words of posts)
- Transition words the user actually uses (vs ones they avoid)
- Function words / tics that are part of the voice (e.g., "其實", "說真的", "老實說", "honestly", "look,")
- Punctuation signatures ("!", "?", "…", emoji — and when)

## 2.13 Cultural and Linguistic Register

- Primary language; any second language mixed in, and in what context
- Register mix (formal / casual / vulgar / internet-native / industry-jargon) — what ratio
- References the user assumes the audience will get (memes, TV, industry events, historical moments)
- Regional or community markers (specific slang, platform-native phrasing)
- Whether code-switching has a pattern (emphasis? humor? technical precision?)

## 2.14 Argumentation Style

- How the user establishes credibility (experience anecdote, data, authority citation, or just assertion)
- How the user handles disagreement inside a post (steelman first, or dismiss first)
- Whether claims are hedged or unhedged
- Use of concessions ("I'll grant that…") vs flat opposition
- Whether the user argues through stories or through points

## 2.15 Cognitive Layer: Core Beliefs, Judgment Frames, and Tensions

This is the main bridge from "style profile" to "personal creation genome." It should answer how the user thinks before it answers how the user phrases things.

Use `compiled/voice_fingerprint.md` sections:

- `Cognitive Layer Seed`
- `Engagement-Weighted Corpus`
- `Temporal Shift`
- `source_excerpt_index` from `.json` when exact source IDs are needed

Extract:

- 3-7 core beliefs or repeated stances, ideally each supported by 2+ source posts.
- For every belief, mark whether it appears in high-engagement posts, recent posts, or only historical posts.
- 1+ tension pair when evidence exists. A tension pair is a real-seeming contrast inside the user's own thinking, not a bug to smooth away.
- Judgment frames: how the user usually decides what matters (for example: cost/benefit, personal experience first, anti-template, practical leverage, audience trust).
- Belief boundaries: claims the user has not earned, would not naturally say, or would need `[confirm with user]`.
- Application notes for `/draft`: when a belief should guide topic selection, hook choice, argument structure, or ending.

Do not:

- Turn generic advice into a "core belief."
- Treat one viral post as a stable worldview.
- Invent a tension pair just because it sounds sophisticated.
- Use a belief in `/draft` when the topic is outside the sampled evidence; mark it as out of coverage instead.
