# Release Analytics Band

SPEC-07 status: complete.

## Purpose

QA now gets a compact release analytics band in the Astro preview before the ticket explorer. It highlights current ownership, recent pull movement, priority mix, and component concentration without pushing ticket controls down into a separate workflow.

## Delivered

- Assignee load chart from the current ticket snapshot.
- Status movement history from retained `pullHistory`, with `pullDiff` as the fallback.
- Priority distribution summary.
- Component concentration summary.
- Readable table fallback under every chart.

## Acceptance

- Charts answer release questions without crowding ticket controls.
- Chart colors reuse design tokens.
- Charts degrade into readable tables because the data is rendered as semantic HTML, not canvas-only output.
- Hosted checklist marks SPEC-07 complete by default.

## Next Dependency

SPEC-08 can now focus on operations health: GitHub Actions, Pages deploy freshness, bridge auth, and Jira pull status.
