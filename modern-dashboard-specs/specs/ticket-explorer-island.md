# Ticket Explorer Island

SPEC-05 status: complete.

## Goal

The ticket explorer island makes the Astro preview useful for release scanning. It now supports a parent-first card board for active QA scanning and a dense TanStack Table view for spreadsheet-style review.

## Implemented

- React island inside the Astro dashboard shell.
- View toggle between parent-first cards and the dense TanStack Table grid.
- Parent ticket cards with subtasks collapsed under the matching main ticket by default.
- TanStack Table grid with sortable columns and pagination.
- Filters for text, status, assignee, priority, component, parent, and changed-since-last-pull state.
- Saved presets for QA testing, code review, status moves, and unassigned work.
- Selected-ticket detail panel with Jira link, current-board action link, checklist count, parent, assignee, priority, status, and description preview.

## Acceptance Notes

The `/modern/` preview remains static and reads `dashboard-data.json`. Jira and current-board action links stay available, so checklist and assignee workflows can remain on the generated dashboard until the modern workflow reaches parity. The default card view keeps the board short by showing main tickets first and hiding subtasks until the user expands a parent ticket.

## Next Dependency

SPEC-12 can use the card/table toggle as part of read-parity signoff before any future cutover promotion.
