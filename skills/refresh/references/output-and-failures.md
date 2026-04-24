# Report Shape + Failure Modes (`/refresh` Step 8)

---

## Step 8: Report

```text
## Refresh Summary
- Handle: @<handle>
- Posts scraped: X (Y new, Z updated)
- Replies added: N (M from the account itself, available to /topics as validated demand)
- Performance windows filled: 24h=<k>, 72h=<k>, 7d=<k>
- Compiled memory: rebuilt / stale / skipped
- Tracker level: <Directional / Weak / Usable / Strong / Deep>
- last_updated: <ISO>
```

If the refresh was partial, list the failed post IDs or the failed stage.

---

## Failure Modes

| Symptom | Likely cause | Action |
|---------|--------------|--------|
| `navigate` lands on a login page | Chrome session lost login | tell user to log in and retry |
| Scroll stops early | Threads soft rate-limit | save partial state and report it |
| Timestamps all look wrong | relative-time selector drift | update selector mapping |
| Numbers parse as `NaN` | metric parser missed a unit | extend parser before writing |
| Refresh ran within the last 10 minutes | redundant refresh | skip unless `--force` |
