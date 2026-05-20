# Multi-board Registry

SPEC-09 status: complete.

## Purpose

Release board navigation now comes from a shared `boards.json` registry instead of hardcoded links. This gives current, past, and future boards a durable source of truth.

## Delivered

- `boards.json` registry seeded with 122 and 123.
- Registry entries include release, URL, status, owner, notes, modern preview URL, and repository slug.
- Modern Astro preview loads the registry and renders a board directory.
- Current board highlighting based on the loaded dashboard version.
- Spin-up hook notes for appending future boards before first publish.

## Acceptance

- 122 and 123 appear as first registry entries.
- Future boards can be added without editing each generated page manually.
- The shared template owns the default directory structure.
- Hosted checklist marks SPEC-09 complete by default.

## Next Dependency

SPEC-10 can now add repeatable accessibility and responsive QA checks across the full modern dashboard surface.
