# Rollout and Fallback Plan

SPEC-11 status: complete.

## Purpose

The modern dashboard can now keep running beside the current generated board while the team verifies read paths, Jira write paths, checklist comments, Slack notifications, and Pages deploy behavior.

## Delivered

- Rollout readiness section in the modern preview.
- Parallel preview URLs for 122 and 123.
- Parity checklist for 122 and 123.
- Fallback runbook for returning attention to the current static generator output.

## Preview URLs

| Release | Current board | Modern preview |
| --- | --- | --- |
| v3001.122.0 | https://dewankabir009.github.io/jira-board-v3001-122-0/ | https://dewankabir009.github.io/jira-board-v3001-122-0/modern/ |
| v3001.123.0 | https://dewankabir009.github.io/jira-board-v3001-123-0/ | https://dewankabir009.github.io/jira-board-v3001-123-0/modern/ |

## Cutover Gate

- The current root board remains published.
- The modern preview reads the same `dashboard-data.json` snapshot.
- SPEC-10 responsive QA passes for 122 and 123.
- Jira links, Cloudflare write bridge paths, checklist comments, and Slack notifications are verified.

## Fallback

If parity fails, keep the current root board as the official QA surface, stop promoting `/modern/`, regenerate the static board output, and republish the root `index.html` plus `dashboard-data.json`.

## Acceptance

- Current dashboards remain available throughout migration.
- Modern preview uses the same Jira snapshot as the current board.
- Cutover only happens after action paths and read paths are verified.
- Hosted checklist marks SPEC-11 complete by default.
