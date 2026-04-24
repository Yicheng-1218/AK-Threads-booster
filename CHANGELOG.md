# Changelog

What changed in AK-Threads-Booster, in plain language.

---

## 2026-04-24 — 低 Token Runtime：讓日常分析更省、更快、也更不容易把用量燒完

這次更新的核心，是讓 AK-Threads-Booster 不再每次都把完整歷史資料和大型知識庫重新讀一遍。對用量比較少的 Agent 訂閱者來說，這會明顯降低日常使用成本，讓他們不會分析一兩篇貼文就把額度花完。

### 新增 `compiled/` 低 token 記憶層

`/setup`、`/refresh`、`/review`、`/predict` 現在會在 tracker 更新後重建一組低 token runtime cache：

- `compiled/account_wiki.md`
- `compiled/post_feature_index.jsonl`
- `compiled/cluster_wiki.json`
- `compiled/exemplar_bank.md`
- `compiled/recent_window.md`

這些檔案不是新的真相來源，而是從 `threads_daily_tracker.json` 編譯出來的「AI 快速索引」。日常 `/analyze`、`/topics`、`/predict` 可以先讀這些摘要與特徵，不需要每次掃整份歷史貼文。

### Tracker 仍然是唯一真相

為了避免 wiki 變舊導致 AI 自信地錯，所有 compiled memory 都會帶 `generated_at`、`source_tracker_hash`、`posts_count`、`confidence_level`、`coverage_notes`。如果 compiled memory 缺失、過期，或跟 tracker 衝突，系統會回到 tracker-only fallback。規則很清楚：`threads_daily_tracker.json` 永遠贏。

### 新增 quick cards，避免每次載入大型知識庫

新增三張低 token 判斷卡：

- `knowledge/cards/algorithm-card.md`
- `knowledge/cards/psychology-card.md`
- `knowledge/cards/ai-tone-card.md`

日常 `lite` / `standard` 模式會優先讀 quick cards。只有在 red line 不確定、使用者要求 deep analysis，或真的需要深度判斷時，才讀完整的 `psychology.md`、`algorithm.md`、`ai-detection.md`。

### `/analyze` 預設變成更省輸出的 brief mode

新增 `analyze.output_mode`：`brief` 只輸出最關鍵決策層，`standard` 完整但精簡，`full` 回到完整 11-section report。預設是 `brief`，讓日常檢查貼文更快、更省，也比較適合低用量 Agent。

### 新增 runtime 設定

`threads_booster_config.json` 現在支援 `runtime.depth`、`runtime.compiled_memory`、`analyze.output_mode`。預設是 `standard + prefer + brief`：省 token，但不犧牲基本判斷品質。

### `/AGENTS.md` 變輕了

`AGENTS.md` 現在只做 routing、核心原則、低 token runtime 提醒，不再內嵌整份 `/analyze` 流程。這可以減少支援 AGENTS.md 的工具一進場就讀到重複規則。

### 新增 runtime budget eval

`evals/rubric.md` 新增 G 組檢查，確認 low-token runtime 會先用 compiled memory、tracker 仍是 source of truth、quick cards 會先於 deep knowledge 使用、brief output 不會偷偷輸出完整長報告。

### 版本

- Main `SKILL.md`：`1.1.0` → `1.2.0`
- `setup` / `analyze` / `draft` / `review` / `refresh`：`1.1.0` → `1.2.0`
- `topics` / `predict`：`1.0.0` → `1.1.0`
- Eval rubric：`1.1.0` → `1.2.0`

---

---

## 2026-04-23 — Harness 加固 Phase 2（瘦身 + 自我優化閉環）

Phase 1 把骨架變穩，這次 Phase 2 做兩件事：**把肥的 sub-skill 瘦下來**，以及**把 compound 閉環第四步變成 skill 內建的功能**，不再需要任何外部工具。

### 6 個 sub-skill 都瘦身到 150 行以內

之前 `setup`（526 行）、`analyze`（375）、`draft`（346）、`review`（327）、`refresh`（303）、`voice`（288）長到不好維護——每次要改一條規則都得在長檔案裡翻半天，也容易漏改。

這次把每個 sub-skill 的長流程、長清單、輸出格式樣板都搬進各自的 `references/` 資料夾，SKILL.md 只留「怎麼判斷、要做哪幾步、每一步指到哪個 reference」。改完以後：

- `setup` 526 → 111 行
- `analyze` 375 → 82 行
- `draft` 346 → 115 行
- `review` 327 → 113 行
- `refresh` 303 → 71 行
- `voice` 288 → 73 行

行為沒變，能做的事一樣。只是現在每個 SKILL.md 打開來，15 秒內就能看完整個流程。

### 新增 `/optimize` sub-skill——compound 閉環第四步

Phase 1 做的是 compound 閉環的「記錄」部分：`/review` 把「sub-skill 建議錯了」的事件寫進 `threads_skill_learnings.log`，累積 10 條會提醒你。但**怎麼把 log 變成真正的規則修改**，之前只給三條建議、其中有一條還要依賴外部 meta-skill。

現在有了 `/optimize`——直接內建在這個 skill 裡，不需要裝別的東西。流程：

1. 讀 `threads_skill_learnings.log`，照 `(sub_skill, category)` 分群
2. 每個群至少 2 條才值得動；少於 2 條會列出來但標低優先
3. 針對每個值得動的群，起草「具體要改哪個檔案的哪一段、改成什麼、為什麼、什麼時候該把這條規則拿掉」的提案
4. 等你回覆要應用哪幾條（`all` / 編號 / `skip`）
5. 你同意的才照 `templates/FAILSAFE.md` 備份+寫入，被否決的寫進 `rejected-proposals.md` 以免下次又重新提案
6. 應用成功後，在 log 裡 append 一條 `supersedes` 指向原本的 run_id——append-only，舊記錄不改

鐵律兩條：**沒有 `user_signal` 逐字引用，就不能提案規則改動**；**所有改動都要你明確同意，不會自動執行**。

### `/review` 的閉環提示改成單路徑

以前累積 10 條時，`/review` 會給你三個選擇（自己翻 log、交給維護者、有 meta-skill 的話用它跑）。現在單路徑：「跑 `/optimize`」。少一層選擇、行動更明確。你自己想手動翻 log 當然還是可以，但預設推薦路徑只剩一條。

### 主 SKILL.md 加了 `/optimize` 的 routing

Intent Routing 表多了一行：「Optimize the skill itself / compound pass / 優化 skill / 自我優化 / 閉環」→ `/optimize`。觸發詞大致是這些。

### 新增 F4 rubric + fixture

`evals/rubric.md` 多了 F4：`/optimize` 不能在沒有 `user_signal` 逐字引用的情況下寫規則。新的 fixture `optimize-requires-user-signal.md` 餵一個全是空 `user_signal` 的 log 進去，看 `/optimize` 會不會守線——應該要回報「沒什麼可做的」然後乾淨退出，不能編造 signal、不能硬改檔案。

### 版本號

- 主 SKILL.md：1.0.0 → 1.1.0
- `setup` / `analyze` / `draft` / `review` / `refresh` / `voice`：1.0.0 → 1.1.0（瘦身）
- `optimize`：新 1.0.0
- `predict` / `topics`：維持 1.0.0（沒動）

### 可能影響你使用的地方

- **指令列表多一個 `/optimize`**。平時不用管，等到 `/review` 告訴你 log 滿 10 條再跑——跑了就會看到分群提案，決定要不要改。
- **sub-skill 運作感覺沒變**，但如果你之前有改過 skill 檔案，要改的位置可能搬到 `references/` 裡了。主檔案會指過去。
- **rubric 多了 F4**。自己跑 eval 時記得 `/optimize` 要過這條。

---

## 2026-04-22 — Harness 加固 Phase 1（內部結構）

這次不是功能變更，是把整個 skill 的骨架變更穩。使用上的變化很少，但之後每次改東西都會比較安全、比較容易看出有沒有壞掉。

### 加了「版本號」

主 `SKILL.md` 和 8 個 sub-skill 的 frontmatter 現在都有 `version: "1.0.0"`。`templates/tracker-template.json` 也加了 `schema_version: 1`。以後改東西時，版本號會跟著動——讓你（和我）一眼看出眼前的 tracker / skill 是哪一版的規則。

### 紅線規則從「兩邊各寫一份」改成「一份」

以前 `/analyze` 和 `/draft` 各自維護一份紅線清單（R1–R12），改一邊忘了另一邊就會漂移。現在統一搬到 `knowledge/_shared/red-lines.md`，兩邊都從那裡讀。同一段話在兩個 sub-skill 判讀結果應該一致了。

### 加了 evals 層

`evals/` 是新的資料夾。裡面有：

- `rubric.md`——所有 sub-skill 該有的行為檢查清單（分 A–F 六組）
- `fixtures/`——4 個最小測試案例（`/analyze` 不得全文改寫、`/draft` WebSearch 壞掉時要 fail closed、紅線偵測、`/review` 備份安全）
- `README.md` 和 `runbook.md`——怎麼跑 eval

用法：每次改完 sub-skill 行為規則，開新的 Claude Code session 跑一輪 rubric 對應的 fixture。不要在同一個 session 裡讓 sub-skill 自我評估——executor 和 evaluator 必須分開。

### 加了持久狀態寫入政策

新檔案 `templates/FAILSAFE.md`。所有會改檔案的 sub-skill（`/review`、`/refresh`、`/voice`、`/setup`、`/predict`）現在都要照這份政策走：備份 → 寫 temp → atomic rename → 只留最近 5 份備份。一個檔案備份失敗就全部中止，不做部分寫入。

`/review` 的 Step 3.5 Backup Before Write 早就在做這件事，這次只是把政策拉出來變成所有寫入 sub-skill 的共通契約。

### 加了 Compound 閉環（第四步）

以前的流程是 `/topics`（Plan）→ `/draft`（Work）→ `/review`（Review）。第四步「Compound」——也就是「這次 skill 本身做錯了什麼」——沒地方寫。

現在 `/review` 多了 Step 8 Skill-Level Learning Capture。條件很嚴格：**只有你明確告訴我 sub-skill 的建議事後證實是錯的**，才會寫一條進 `threads_skill_learnings.log`。我不會自己猜。

累積到 10 條，`/review` 會在報告末尾提醒你有一份值得回顧的 log，並提供三條自助的閉環路徑：自己翻 log 改對應的 sub-skill 規則 / 把 log 交給 skill 維護者 / 有裝 meta-skill 的話用它跑。不綁定任何外部工具——這個 skill 可以獨立運作。

### 主 SKILL.md 多了三個新段落

- **Tools Surface**——說明為什麼主檔的 `allowed-tools` 只列 `Read, Glob, Grep`（各 sub-skill 會自己擴充）
- **Persistent-State Policy**——指向 `templates/FAILSAFE.md`
- **Shared Knowledge**——紅線和 compound log schema 住哪裡
- **Precedence and Conflicts**——5 層優先順序（主 SKILL → sub-skill → `_shared/` → `knowledge/` → `templates/`），衝突時上層贏

### 可能影響你使用的地方

- **紅線判讀一致性**：`/analyze` 說某句話踩 R1，`/draft` 也應該避開同一個 R1。如果發現兩邊不一致，那就是 bug——告訴我，我去修。
- **備份檔變多**：你的工作資料夾裡會看到 `*.bak-20260422T143012Z` 這種檔案。每個會被寫入的檔案最多 5 份，舊的會自動清。如果誤刪重要資料，從 `.bak-*` 還原。
- **`/review` 有機會問你一句關於「skill 本身做錯什麼」**：完全 opt-in，不想理就說「skip」。

---

## 2026-04-22

### `/draft` 變聰明了

- **寫稿前會先跟你討論**。找完 research、做完 fact-check 以後，不會直接開寫，會先問你 2-4 個關鍵問題（要不要用這個角度、這個說法查不到你有沒有第一手經驗、要不要預先回應留言區會吵的反駁），等你回覆再下筆。
- **寫完以後會再回問你 3-5 個針對這篇的改進問題**。不是「還可以嗎？」這種罐頭，是針對這篇的 hook、證據、立場強度、結尾寫法去問。
- **主動丟你可能沒想到的角度**。research 時會挑 2-3 個你原本沒提到的切入方式給你選（反直覺、歷史對照、產業類比……），能用就用，不想用就不用。
- **不會亂你自己說過的事**。fact-check 的時候，只要是你講過的個人事實或事件順序，以你自己的貼文為準，網路搜尋不會推翻你。查不到的個人細節會標 `[confirm with user]` 來問你，不自己猜。

### 你可以決定 `/draft` 要不要跟你聊

這些討論功能都是可開關的。第一次會問你要不要開，你可以回答：

- **只這次**——答完這次，下次再問
- **always on**——以後都要討論
- **always off**——以後都不討論，直接給稿

選擇會存在 `threads_booster_config.json`，隨時改。

> 想要快就選 always off，想要深就選 always on。預設是每次問你一次。

### `/voice` 生成更細、也更誠實

- **現在會說清楚「這是參考初稿，不是定稿」**。LLM 從外面看你的貼文一定漏東西，你自己才最懂自己。
- **分析維度加深**。除了原本的結構/語氣/情緒等，還會幫你抓：高頻字詞 top 15-20（含出現次數）、開場/收尾/標點習慣、中英夾雜模式、論證慣性。
- **新增 Manual Refinements 區塊**。檔案最下面留一塊給你自己填（分析哪裡寫錯了、漏了什麼、哪些是你「絕對不會講」的話）。你填的內容優先級最高，`/draft` 寫稿會當成硬規則。
- **重跑 `/voice` 不會蓋掉你的手動修改**。會先讀舊檔、保留你動過的地方，再跟你確認才覆蓋。

### `/analyze` 和 `/review` 也會主動問問題

和 `/draft` 一樣的邏輯：分析完/檢討完，可以選要不要補問 2-3 個針對這篇/這次表現的追問。同一個開關控制，設定方式一樣。

### `/review` 會回看 `/draft` 當初的決定

檢討實際表現時，會拉出你當初在 `/draft` 討論階段做過的選擇（「接受了這個角度」「丟了那個說法」），對照貼文實際表現回頭看當初的判斷是不是對的。下次類似情境就知道怎麼選。

### 新檔案

- `threads_booster_config.json`——存你的偏好設定
- `CHANGELOG.md`——就是你在看的這個

---

### 為什麼做這些改動

使用者反饋兩件事：`/draft` 寫太快、太少跟人討論，有時候會把貼文角度帶偏、甚至搞錯你講過的個人細節；`/voice` 生出來的 brand voice 又粗、又會被當成定稿用。

這次的核心想法：

1. **對話不是義務，是選項**——想要就開，不想要就關
2. **你自己的話才是最終依據**——不管是 brand voice 還是個人事實
3. **AI 的產出是初稿，你的手動修改優先級最高**
