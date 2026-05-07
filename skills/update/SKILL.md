---
name: update
description: "Check AK-Threads-Booster for upstream GitHub updates, safely fast-forward the local skill repo, or install an opt-in weekly Codex automation that keeps the skill on the latest version. Trigger words: update skill, check updates, auto update, weekly update, 更新 skill, 自動更新, 每週檢查更新."
version: "2.0.0"
allowed-tools: Read, Grep, Glob, Bash
---

# AK-Threads-Booster Update Module

Use this module when the user wants to check whether AK-Threads-Booster has a newer version, update the local skill repo, or install an opt-in weekly update checker.

Repository:

```text
https://github.com/akseolabs-seo/AK-Threads-booster
```

## Safety Rules

- Never reset, rebase, stash, checkout over, or discard local files automatically.
- Never overwrite a dirty working tree.
- Only apply updates when the repo is clean and the upstream update can fast-forward.
- If local-only commits, untracked files, uncommitted edits, or conflicts exist, stop and report the blocker.
- Updating the skill code is separate from `/refresh`, which updates Threads tracker data.

## User Intents

| Intent | Action |
|---|---|
| Check once / 有沒有新版 | Run one-time check, no apply unless user asks |
| Update now / 更新到最新版 | Run safe updater with `--apply --validate` |
| Install weekly auto-update / 每週自動檢查更新 | Create a Codex cron automation, only after explicit user request |
| Remove weekly auto-update / 取消自動更新 | Find and delete the matching automation |

## Proactive Auto-Update Offer

After any successful one-time update check or update attempt, ask the user once:

```text
要不要順手開啟每週自動檢查 AK-Threads-Booster 更新？

開啟後，每週會自動檢查 GitHub。有新版且本地 repo 乾淨時才會 fast-forward 更新；如果有本地修改、衝突或 local commits，會停下回報，不會覆蓋你的東西。
```

If the user says yes, install the weekly automation. If the user says no, do not ask again in the same run. Do not install by default.

When the user is in a non-interactive/headless context, do not install automation. Report that auto-update is available and requires explicit opt-in.

## One-Time Check

Run from the repository root:

```bash
python scripts/check_skill_update.py --remote origin --branch main
```

Interpret:

- `up_to_date`: no update.
- `update_available`: upstream has commits; ask whether to apply.
- `blocked_*`: do not apply; report blockers and recommended next step.

## Update Now

Run:

```bash
python scripts/check_skill_update.py --remote origin --branch main --apply --validate
```

Afterward, summarize:

- status
- upstream commits pulled
- changed files
- validation results
- current git status

If status starts with `blocked_`, do not try another git strategy without the user's explicit instruction.

## Weekly Auto-Update Installation

Only install this when the user explicitly asks for a recurring updater.

In Codex app environments, use the automation tool to create a weekly cron automation:

- Name: `AK-Threads weekly GitHub update check`
- Workspace: current AK-Threads-Booster repo path
- Environment: local
- Default cadence: weekly, Monday 09:00 local time unless the user asks for a different day/time
- Prompt:

```text
Check the local AK-Threads-Booster repository against https://github.com/akseolabs-seo/AK-Threads-booster once. Run `python scripts/check_skill_update.py --remote origin --branch main --apply --validate` from the repository root. If the script reports `updated`, summarize pulled commits, changed files, validation results, and current git status. If the script reports `up_to_date`, report that clearly. If the script reports any `blocked_*` status, do not reset, rebase, stash, or overwrite files; report the blocker, dirty files or local commits, and the safest next step. Preserve all local user changes.
```

If the automation tool is not available, explain that this environment cannot install the recurring job automatically and provide the one-time check command instead.

## Automation Update Rules

Before creating a new automation, check existing automations for a matching name or prompt. Prefer updating an existing matching automation over creating a duplicate.

For deletion, delete only a matching AK-Threads update automation. Do not delete unrelated reminders or scheduled jobs.

## Completion

Keep the final answer short:

- For one-time check: `current status + update availability + blockers if any`.
- For successful update: `updated + commit summary + validation`.
- For automation install: `installed + schedule + safety rules`.
- For automation delete: `removed`.
