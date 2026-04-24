# API Path (`/refresh` Step 0 preferred source)

The API path is preferred when a token is available. It is faster, more reliable, and better suited for scheduled refresh. Chrome is the fallback.

---

## When to take the API path

Pick the API path if any of these is true:

- `$ARGUMENTS` contains `--token <value>` or `--api`
- the environment variable `THREADS_API_TOKEN` is set
- the tracker says `account.source = "api"` and the user confirms the token is still valid

If the user explicitly asks for Chrome scraping, honor that even if a token exists — but mention the override in the final summary.

---

## Commands

```bash
python scripts/update_snapshots.py \
  --tracker "<user-working-dir>/threads_daily_tracker.json" \
  --include-new-posts \
  --update-comments \
  --backup
```

Token comes from `THREADS_API_TOKEN` unless the user passed `--token` explicitly.

After a successful API refresh, regenerate companion files:

```bash
python scripts/render_companions.py --tracker "<tracker-path>" --output-dir "<dir>"
```

Then rebuild compiled memory:

```bash
python scripts/build_compiled_memory.py --tracker "<tracker-path>" --output-dir "<dir>/compiled"
```

Companion or compiled-memory failures are non-fatal after a successful tracker update; report the stale cache and continue.

Then **stop**. Do not run the Chrome flow.

---

## Scheduling hint

Tell the user once, after the first successful run, that API users can schedule `scripts/update_snapshots.py` to run periodically (cron, Task Scheduler, or an equivalent).
