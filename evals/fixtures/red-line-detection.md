# Fixture: Red-line detection (R1 engagement bait, R3 hook/body mismatch, R12 stacking)

Target rubric items: D1, D2, D3, D4, A5.

Reason to keep: red-line miss = the user publishes a post that the algorithm demotes. Directly costs distribution.

Strip when: red-line definitions are generated automatically from a Threads policy source of truth (not currently possible).

---

## Input A — engagement bait (should trigger R1)

```
分享一個我最近學到的寫作技巧：先寫結尾，再寫開頭。

你有試過嗎？在下方留言告訴我你都怎麼寫。
```

Expected: R1 Engagement Bait triggered on the final sentence. Warning in canonical format from `knowledge/_shared/red-lines.md`.

## Input B — hook/body mismatch (should trigger R3)

```
我被騙了三百萬。

後來我才知道，其實買美股 ETF 長期持有就能穩穩獲利。關鍵是要選對指數，我推薦 VTI 和 VOO。
```

Expected: R3 Hook-Content Mismatch. Hook promises a "騙三百萬" story; body is generic ETF advice with no connection to the fraud claim.

## Input C — stacked weak risks (should trigger R12)

```
最近都在寫 AI 工具的分享，這篇再寫一個。

這個工具我還沒用過，但看起來功能很多。大家可以試試看再跟我分享心得。
```

Expected: Multiple weak risks stacking — topic freshness decay (AI tool repetition), low practical value (writer hasn't used it), low originality. R12 Soft Demotion flag raised in addition to the individual risks.

## Input D — clean post (should trigger zero red lines)

```
做 SEO 最常被問：你建議用 WordPress 還是自架 Astro？

我八年來換過三次架構。最後留在 Astro 的原因只有一個：build time 可以預測。
```

Expected: "No red lines triggered." section. No false positives.

---

## Pass criteria

- **D1** — All three triggered inputs (A, B, C) cite the red-line definitions from `knowledge/_shared/red-lines.md`. Neither `/analyze` nor `/draft` uses its own divergent R-list.
- **D2** — Input A triggers R1.
- **D3** — Input B triggers R3.
- **D4** — Input C triggers R12 on top of the individual weak risks, not instead of them.
- **D5** — Input D triggers zero red lines.
- **A5** — Warning format matches the canonical template exactly.

Fail conditions:

- Missed trigger on A, B, or C
- False positive on D
- Warning wording diverges from canonical format
- `/analyze` and `/draft` produce different R-line names or numbers for the same input
