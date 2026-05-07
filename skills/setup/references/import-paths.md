# Data Import Paths A–D (`/setup` Step 1)

Path E (migration) is in `references/migration.md`. If `threads_daily_tracker.json` already exists and matches Path E's legacy heuristics, run migration instead.

---

## Path A: Meta Threads API (recommended — full metrics + comments, refreshable)

Walk the user through each step. Do not assume prior Meta developer experience.

### A.1 Create the developer app

1. Open https://developers.facebook.com/ and log in with the Meta account that owns the Threads profile.
2. Top nav → **My Apps** → **Create App**.
3. Use case: **Other** → Next → App type: **Business** → Next.
4. Name the app (e.g., "ak-threads-booster-personal"). Contact email matches the Meta account.

### A.2 Add the Threads product

1. Inside the new app → **Dashboard** → scroll to **Add a product**.
2. Find **Threads API** → **Set up**.
3. Under **Threads API → Use cases**, add at minimum: `threads_basic`, `threads_content_publish`, `threads_read_replies`, `threads_manage_insights`.

### A.3 Add the account as a Threads Tester

1. In the Threads API panel, open **Roles** (sometimes labeled **Threads Tester**).
2. Add the Threads handle (e.g., `@yourname`) as a tester.
3. Open threads.com on the account → **Settings → Account → Website permissions → Invitations**, accept the tester invite. If no invite appears, re-check that the Threads handle in the developer dashboard matches the account exactly.

### A.4 Generate a short-lived user access token

1. Developer dashboard → **Threads API → User Token Generator**.
2. Confirm the 4 scopes are checked.
3. **Generate token**, authorize on threads.com, copy the token. Valid for 1 hour.

### A.5 (Optional) Exchange for a long-lived token

Long-lived tokens last 60 days and can be refreshed. The user needs the **App Secret** from **App settings → Basic**. `fetch_threads.py` exchanges when `--app-secret` is passed.

### A.6 Run the fetch script

```bash
python scripts/fetch_threads.py \
  --token USER_TOKEN \
  --app-secret APP_SECRET_OPTIONAL \
  --output "<user-working-dir>/threads_daily_tracker.json"
```

Replace `<user-working-dir>` with the user's actual working directory. Ask if unsure.

### A.7 Common API errors

| Error | Cause | Fix |
|-------|-------|-----|
| `400 Bad Request — permissions` | Missing scope | Re-generate token with all 4 scopes checked |
| `401 Unauthorized` | Token expired (1h short / 60d long) | Regenerate short token or run exchange again |
| `403 user not a tester` | Tester invite not accepted | Accept invite on threads.com Settings |
| `429 Too Many Requests` | 250 calls/user/hour limit hit | Wait an hour, or reduce `--recent N` |
| Empty `posts` list | Account has no public original posts, only replies | Expected — reply-only accounts not supported |

---

## Path B: Meta account data export (no metrics, good for read-only accounts)

### B.1 Request the export

1. Open https://accountscenter.meta.com/info_and_permissions/dyi/ while logged in as the Threads account.
2. **Download or transfer information**.
3. Pick the Threads account → **Next**.
4. **Some of your information** → **Threads activity** → check all Threads categories (posts, replies, followers if wanted).
5. Destination: **Download to device**.
6. Date range: **All time**.
7. Format: **JSON**.
8. Media quality: **Low**.
9. Submit. Meta takes 15 minutes to 48 hours; user gets an email when ready.

### B.2 Download and unzip

1. Download the zip, fully extract (not just browse inside the zip, or paths will not resolve).
2. Note the extracted folder's path — this is `USER_EXPORT_PATH`.

### B.3 Run the parser

```bash
python scripts/parse_export.py \
  --input "USER_EXPORT_PATH" \
  --output "<user-working-dir>/threads_daily_tracker.json"
```

### B.4 Known limitations

- No engagement metrics (views / likes / replies / reposts / shares) — must be backfilled by `/review` checkpoints or `/refresh` through browser automation.
- Exports are point-in-time. For fresh comments and metrics later, repeat the export (rate-limited to one per ~3 days), or switch to the API / `/refresh` path.
- Very old posts may lack metadata; the parser leaves those fields `null`.

---

## Path C: Existing data provided directly

If the user already has JSON, CSV, spreadsheet, notes, or text files:

1. Read the provided file(s).
2. Convert into the standard tracker schema (`references/tracker-schema.md`).
3. Preserve any available metrics.
4. Write `threads_daily_tracker.json`.

At minimum, capture post text and creation date. If metrics are missing, leave them as `0` or `null` per the schema guidance.

---

## Path D: Browser-driven profile scrape (no API, no export wait)

If the user has browser automation available and is logged into Threads, `/refresh` can scrape their profile directly.

1. Verify browser automation is active in the current session.
2. Run `/refresh` with the user's Threads handle.
3. `/refresh` creates or updates `threads_daily_tracker.json` with visible posts and metrics.

See `skills/refresh/SKILL.md`. Can be scheduled daily via an OS-level scheduler invoking `/refresh --headless` so the tracker stays fresh without manual runs.
