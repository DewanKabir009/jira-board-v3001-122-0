# Ticket Explorer Island

SPEC-05 status: complete.

## Goal

The ticket explorer island makes the Astro preview useful for release scanning. It replaces the simple card preview with a dense React island backed by TanStack Table.

## Implemented

- React island inside the Astro dashboard shell.
- TanStack Table grid with sortable columns and pagination.
- Filters for text, status, assignee, priority, component, parent, and changed-since-last-pull state.
- Saved presets for QA testing, code review, status moves, and unassigned work.
- Selected-ticket detail panel with Jira link, current-board action link, checklist count, parent, assignee, priority, status, and description preview.

## Acceptance Notes

The `/modern/` preview remains static and reads `dashboard-data.json`. Jira and current-board action links stay available, so checklist and assignee workflows can remain on the generated dashboard until the modern workflow reaches parity.

## Next Dependency

SPEC-06 can now use the React island state model to upgrade checklist work into a QA workspace.
