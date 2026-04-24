# Headless Mode Contract

`/refresh` runs in one of two modes. Interactive mode may ask questions and pause. Headless mode must not.

---

## Interactive mode

Triggered when the user invokes `/refresh` directly in a live session. Interactive mode may:

- ask for missing handle or confirmation
- tell the user to log in and retry
- pause for user action

## Headless mode

Triggered when `/refresh` is invoked by a scheduler, another skill, or with `--headless` in `$ARGUMENTS`. Headless mode must:

- not ask questions
- not pause for user action
- read inputs from the tracker or exit fast
- fail within bounded time if login or selector health checks fail

### Recognized headless arguments

| Arg | Meaning | Default |
|-----|---------|---------|
| `--headless` | headless mode | off |
| `--handle @name` | target profile handle | tracker value |
| `--max-posts N` | stop after N posts | 200 |
| `--max-minutes N` | hard runtime limit | 5 |
| `--force` | bypass recent-refresh skip | off |
| `--log-file PATH` | log file path | `threads_refresh.log` |

### Log contract

When headless mode aborts, append one JSON line to the log file:

```json
{"ts":"<ISO>","ok":false,"reason":"login_wall|handle_mismatch|no_chrome_mcp|selector_health_failed|timeout|backup_failed|other","detail":"<short>"}
```

On success, append:

```json
{"ts":"<ISO>","ok":true,"posts_scraped":N,"new_posts":X,"updated_posts":Y,"replies_added":Z}
```

`/review` reads `threads_refresh.log` in Step 6.6 — do not skip logging in headless mode.

Follow `templates/FAILSAFE.md` append-only log policy: open in append mode, write one newline-terminated line, close. No backup, no rewrite.

---

## Scheduling hint

Chrome users can schedule `/refresh --headless`. Chrome must already be running and logged in when the headless job fires.

---

## Preconditions (run before Chrome flow starts)

Verify all of the following. In headless mode each failure maps to a specific `reason` value for the log entry.

1. **Chrome MCP exists** — Chrome tools in `allowed-tools` must be callable.
   - Interactive: tell the user to install Chrome MCP.
   - Headless: log `no_chrome_mcp` and exit.
2. **Threads is logged in** — navigate to `https://www.threads.com/` and confirm the page is a logged-in feed.
   - Interactive: tell the user to log in and retry.
   - Headless: log `login_wall` and exit.
3. **Logged-in account matches the target handle** — read the signed-in handle from the page.
   - Interactive: ask which account to use.
   - Headless: log `handle_mismatch` and exit.
4. **The target handle is known**.
   - Interactive may ask.
   - Headless requires `--handle` or `account.handle` in the tracker.
