# Cutover Readiness Validation

SPEC-12 status: ready.

## Purpose

The modern dashboard should not be promoted from preview until live evidence proves the read path, Jira writes, checklist comments, Slack notifications, and fallback path for the active boards.

## Delivered

- Cutover validation panel in the Astro preview.
- Evidence-required gates for assignee writes, checklist comments, Slack delivery, and final signoff.
- Links from the preview to the current board, Cloudflare bridge status, GitHub Actions workflows, and this runbook.
- Custom compact dropdowns, Jira assignee avatars, and refreshed dashboard color tokens for the modern preview.

## Validation Gates

| Gate | Evidence required before signoff |
| --- | --- |
| Read parity snapshot | Modern preview loads the same `dashboard-data.json` snapshot as the current board for 122 and 123. |
| Assignee write | A named test ticket is reassigned from the current board, Jira readback confirms the assignee, and the expected Slack tag is sent. |
| Checklist comment | A checklist comment is posted from a named test ticket and the Jira comment body is confirmed. |
| Slack delivery | `core-qa-dream-team` receives assignee-update and dashboard-refresh notifications from live workflows. |
| Final cutover signoff | Evidence links are attached before the modern board is promoted beyond preview. |

## Evidence Log

| Date | Release | Test ticket | Gate | Result | Evidence |
| --- | --- | --- | --- | --- | --- |
| Pending | v3001.122.0 | Pending | Assignee write | Pending | Requires named test ticket. |
| Pending | v3001.122.0 | Pending | Checklist comment | Pending | Requires named test ticket. |
| Pending | v3001.123.0 | Pending | Assignee write | Pending | Requires named test ticket. |
| Pending | v3001.123.0 | Pending | Checklist comment | Pending | Requires named test ticket. |
| Pending | Both | Pending | Slack delivery | Pending | Requires workflow run and Slack receipt. |

## Acceptance

- Modern previews display the cutover validation gates.
- Modern preview dropdowns are custom controls, not native browser select menus, and assignee options show Jira avatars when the data artifact includes them.
- Write gates stay evidence-required until a named test ticket proves the mutation.
- Current boards remain available as the fallback path.
- SPEC-12 appears on the hosted checklist as the next release gate.
