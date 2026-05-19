# Operations Health Center

SPEC-08 status: complete.

## Purpose

The modern dashboard now separates operational health into visible cards so a failed GitHub Actions email, Cloudflare Access login prompt, stale Pages deploy, and Jira data pull are not mistaken for one outage.

## Delivered

- Jira data pull health card with latest snapshot and data artifact link.
- GitHub Pages preview card with live board and deployment links.
- Jira write bridge card that shows hosted Worker auth as `Cloudflare Login` instead of offline.
- Workflow runs card linking to refresh and Actions history.
- Slack notifications card linking to the notification workflow.
- Localhost bridge detection that flags local endpoints as a bad live-board configuration.

## Acceptance

- Users can tell whether data refresh and Jira write paths are separate.
- Historical failed workflow emails are not mistaken for current outages.
- The bridge status never falls back to localhost.
- Hosted checklist marks SPEC-08 complete by default.

## Next Dependency

SPEC-09 can now promote board links into a multi-board registry with clear ownership and status metadata.
