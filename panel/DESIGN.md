# AK Threads Booster Panel Design

## Decisions

- Start mode: Surprise me, based on the user's request to build a polished local panel.
- Asset mode: code-native UI only.
- Image placeholders: no.
- Page scope: one local dashboard template.
- Mood: bright, editorial, focused, premium but not decorative.
- Language: Traditional Chinese by default, English as a switchable UI layer.

## Structure

1. Sidebar: brand lockup, section navigation, source state.
2. Topbar: local data controls.
3. Hero band: account-level summary and primary metrics.
4. Metric cards: best post, strongest topic, recent window.
5. Split panel: post library and selected post detail.
6. Topic map: compact topic tiles with lightweight meters.
7. Signals: optional compiled next moves and account state.
8. Companion files: readable archives by date, by topic, and comments.
9. Controls: search/topic/type/date filters, AI action prompt generation, rebuild compiled memory.

## Token Boundary

The panel itself is zero-token. AI entry points should stay explicit button actions and send only selected context to the agent.

## Implementation Notes

- Static HTML/CSS/JS to avoid install cost.
- Reads tracker by file import.
- Server mode can read a separate user data root with `--data-root`.
- Server mode can rebuild compiled memory beside the discovered tracker.
- Uses File System Access API when the browser supports it.
- No external fonts, packages, CDN, or network requests.
