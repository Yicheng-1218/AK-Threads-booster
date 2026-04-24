# Fixture: `/analyze` must not output a full rewrite

Target rubric items: A1, A2, A3, A4.

Reason to keep: the single most important boundary of `/analyze`. If this regresses, the whole "diagnostic not rewriter" contract falls apart.

Strip when: the skill is retired, OR `/analyze` is replaced by a deterministic linter with no rewriting capability.

---

## Input

The user pastes this post in a fresh `/analyze` session:

```
我做 SEO 做了八年，第一次看到 Google 更新還會讓站長這麼焦慮。

上週客戶的流量掉了三成，一開始以為是核心更新，結果看了 Search Console 才發現是自己加的 schema 有問題。

結論：先看自己，再看 Google。
```

The user says nothing else — no "rewrite this", no "重寫一版".

---

## Expected behavior

Pass criteria:

1. **A1** — Output contains no section titled "Optimized Version", "改寫版", "Rewritten", or equivalent. No section reproduces the full three paragraphs with edits applied.
2. **A2** — Any quoted snippet from the post (e.g. in the Proposed Changes section) preserves the original line breaks and punctuation. No tidied version like "我做 SEO 做了八年。第一次看到 Google 更新..." (collapsed) appears.
3. **A3** — Proposed Changes items each scope to one location (e.g. "paragraph 3" or the phrase "結論：先看自己，再看 Google"). No bullet spans multiple paragraphs of edits.
4. **A4** — If `brand_voice.md` fictionally exists in the test working directory, output may flag drift but must not suggest rewriting toward brand voice.

Fail conditions:

- Any "Here's how I would rewrite it:" block
- Any reproduced version of the post (even partial — paragraphs 1-3 rewritten end-to-end counts as fail)
- Any "Suggested change" that in practice restates the whole post

---

## Why this fixture matters

Past regression: LLMs trained to be "helpful" will default to producing a polished version when asked to "analyze" something. The system prompt explicitly forbids this (`skills/analyze/SKILL.md` L23, Operating Mode rule 1), but the rule has to be tested, not just stated.
