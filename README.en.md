[Chinese](README.md) | [English](README.en.md)

# AK體 2.0 - Threads Algorithm Content Decision Skill

`AK-Threads-Booster` remains the internal package name and install id.

AK-Threads-Booster is an AI skill system for Threads creators who want better posting decisions, not just faster text generation.

Its job is to help users:

- find stronger topic angles faster
- avoid obvious repetition and red-line mistakes
- draft in a voice closer to their own
- learn from real post performance over time

It does not guarantee viral posts.

It turns topic selection, drafting, analysis, prediction, and review into a repeatable system backed by the user's own Threads history.

---

## Who It Is For

- creators already posting on Threads who want a steadier content process
- users who want to know which topic types actually travel for their account
- users tired of guessing what to post next
- users who want their post history to become a usable decision asset

If the goal is to choose better topics, improve distribution odds, and stop wasting posts on stale or repetitive angles, this skill is built for that.

---

## Core Modules

### `/topics`
Find the next most worthwhile topic by combining historical performance, comment demand, self-repetition risk, and external freshness.

### `/draft`
Generate a draft from the user's brand voice, style guide, and historical data. Before drafting: a freshness gate, a fact-check that **never overrides the user's own stated personal facts or event chronology**, and a research step that surfaces 2-3 angles the user may not have considered. After drafting: 3-5 targeted questions to sharpen the post. All dialogue is toggleable via `threads_booster_config.json` (`ask` / `always_on` / `always_off`).

### `/analyze`
Run decision-first analysis on a finished draft. It checks algorithm red lines, upside drivers, suppression risks, style fit, and AI-tone traces.

### `/predict`
Estimate likely 24-hour performance from comparable historical posts so expectations are anchored in data.

### `/review`
Compare actual results against the prediction and write the learning back into the tracker.

### `/refresh`
Update `threads_daily_tracker.json` through the Threads API when available, or through an authenticated browser automation environment when API access is not available.

---

## What Setup Produces

After `/setup`, the working directory typically contains:

- `threads_daily_tracker.json`
- `style_guide.md`
- `concept_library.md`
- `brand_voice.md` after `/voice`
- `posts_by_date.md`
- `posts_by_topic.md`
- `comments.md`

The tracker is the canonical file. The rest exist to make the data easier to use and review.

---

## Recommended Flow

### First-time setup

```text
/setup
/voice
```

This builds the tracker first, then deepens the brand-voice layer for better drafting. The newer `/voice` flow first builds a local voice fingerprint, then uses AI judgment for cognitive core, anti-voice boundaries, and the `/draft` quick-reference pack.

`/voice` produces a **first-draft reference** `brand_voice.md`, not a verdict. An outside LLM always misses things the author knows about themselves. Expected usage:

- Edit anywhere it feels wrong — your edits win.
- Fill in the **Manual Refinements** section at the bottom with taboos, must-do rules, and "not me" phrases.
- Re-runs of `/voice` preserve your edits and the Manual Refinements section.

`/draft` treats Manual Refinements as hard constraints, ranked above other generated sections. It then reads Cognitive Core, the Quick-Reference Pack, Anti-Voice, and Voice Fingerprint.

### Before posting

```text
/topics
/draft
/analyze
```

Use `/topics` to find the best next angle, `/draft` to create a starting point, and `/analyze` to pressure-test the finished draft before publishing.

### Skill Updates

Use `/update` to check whether AK-Threads-Booster has a newer version.

After a check, `/update` will proactively ask whether you want to enable weekly auto-update checks. If enabled, it only fast-forwards when the local repo is clean and safe to update. If local edits, local-only commits, or conflicts exist, it stops and reports the blocker instead of overwriting anything.

### After posting

```text
/predict
/review
```

This closes the loop and makes the next decision better.

---

## Data Sources

Users can build the system from:

- Threads Developer API token
- Meta official export zip
- existing JSON / Markdown / CSV
- an authenticated browser automation environment logged into Threads
- legacy tracker migration

API access is optional, but it makes refresh much easier.

---

## Product Positioning

This is not a "guaranteed viral post" tool.

The durable promise is:

**help creators find better topics faster and improve the odds that their posts are worth sharing, saving, and discussing.**

That is a stronger and more honest product promise than claiming guaranteed results.

---

## Installation

Give this GitHub repo to your agent:

```text
https://github.com/akseolabs-seo/AK-Threads-booster
```

Agents that support repo instructions or skill directories can read `AGENTS.md` or `SKILL.md`, then route into `/setup`, `/voice`, `/topics`, `/draft`, `/analyze`, and the other modules.

You can also clone it manually:

```bash
git clone https://github.com/akseolabs-seo/AK-Threads-booster.git
```

Place the repo in the skill or agent-instructions directory used by the target tool.

---

## Directory

```text
AK-Threads-booster/
|- SKILL.md
|- AGENTS.md
|- skills/
|  |- setup/SKILL.md
|  |- refresh/SKILL.md
|  |- analyze/SKILL.md
|  |- draft/SKILL.md
|  |- predict/SKILL.md
|  |- review/SKILL.md
|  |- topics/SKILL.md
|  |- voice/SKILL.md
|  |- panel/SKILL.md
|  |- update/SKILL.md
|- knowledge/
|  |- _shared/
|  |- psychology.md
|  |- algorithm.md
|  |- ai-detection.md
|  |- data-confidence.md
|  |- chrome-selectors.md
|- scripts/
|  |- fetch_threads.py
|  |- parse_export.py
|  |- build_compiled_memory.py
|  |- build_voice_distillation.py
|  |- check_skill_update.py
|  |- panel_server.py
|  |- update_snapshots.py
|  |- update_topic_freshness.py
|  |- render_companions.py
|- panel/
|- templates/
|- examples/
```

---

## License

MIT License. See [LICENSE](./LICENSE).
