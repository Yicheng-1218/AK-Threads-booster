# AK Threads Booster Local Panel

Bright local dashboard template for `threads_daily_tracker.json` and optional `compiled/` memory files.

## Open

Open `panel/index.html` in a browser.

Or run a local server from the workspace root:

```bash
python scripts/panel_server.py --open
```

For a separate user data folder:

```bash
python scripts/panel_server.py --data-root "D:\SEO\threads data" --open
```

## Data

- Use `Tracker` to import `threads_daily_tracker.json`.
- Use `Folder` in Chromium browsers to read the workspace folder directly.
- The folder mode tries to read:
  - `threads_daily_tracker.json`
  - `compiled/next_move_queue.md`
  - `compiled/account_state.md`
- Server mode searches `--data-root` for:
  - `threads_daily_tracker.json`
  - `brand_voice.md`
  - `style_guide.md` / `寫作風格指南.md`
  - `posts_by_date.md` / `歷史貼文-按時間排序.md`
  - `posts_by_topic.md` / `歷史貼文-按主題分類.md`
  - `comments.md` / `留言記錄.md`

The panel is local-only. It does not call an AI model, API, or network service.

## Coverage

The tracker-only layer always powers the main analysis blocks when `threads_daily_tracker.json` exists:

- account totals
- median views, recent average, and P90 high bar
- performance distribution
- posting time slots
- content type performance
- topic ranking
- top and low-performing posts
- conversation and reply signals
- filters for search, topic, content type, and date window
- recent momentum chart
- selected-post snapshot growth chart
- AI action prompts for `/analyze`, `/predict`, and `/review`

Companion files and compiled memory add context, but they are optional.

## Actions

Server mode exposes a local-only rebuild action:

```text
POST /__action/rebuild-compiled
```

The action runs `scripts/build_compiled_memory.py` against the discovered tracker and writes `compiled/` beside that tracker.

## Design Direction

- Bright editorial cockpit, not a dark analytics SaaS clone.
- Tracker data stays primary.
- Compiled memory is optional display context.
- AI actions are visible but disabled placeholders for the next integration step.
