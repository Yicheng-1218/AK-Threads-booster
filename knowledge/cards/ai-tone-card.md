# AI-Tone Quick Card

Version: 1.0.0

Use this for `lite` and `standard` runtime. Load `knowledge/ai-detection.md` only in `deep` mode or when the user asks for a sentence-level AI-tone audit.

---

## Definite AI-Tone Patterns

- Fixed phrase clusters: "not just X, but Y", "in today's world", "the key is".
- Over-balanced contrast pairs repeated across paragraphs.
- Consecutive quote-like lines with identical rhythm.
- Formal connectors stacked in casual writing: moreover, furthermore, ultimately.
- Philosophical ending that does not grow from the body.
- Abstract judgment without a concrete example.

## Possible AI-Tone Patterns

- Too many complete, polished sentences in a row.
- Repeated rhetorical questions that replace argument.
- Even paragraph lengths across the whole post.
- Emotion labels instead of felt details.
- One-sided explanation that never shows friction or constraint.
- Generic "valuable lesson" closure.

## Density Rule

- Low: 0-2 possible items, no definite pattern.
- Medium: 1 definite or 3-5 possible items.
- High: 2+ definite patterns, or the whole structure reads templated.

## Report Discipline

Flag only materially noticeable patterns. Do not rewrite unless the user explicitly asks. Name the sentence or phrase that triggered the flag.

## Load Full AI Detection When

- The user asks to humanize/de-AI deeply.
- Output mode is `full`.
- The post is high-stakes or unusually polished.
- Quick card produces a Medium/High density call and needs sentence-level support.

## reason + strip_when

Reason: Most AI-tone checks only need a compact trigger list; the full file is too expensive for default runs.

Strip when: AI-tone detection moves to a separate evaluator or retrieval can fetch exact trigger sections cheaply.
