# Astro Migration Shell

SPEC-04 status: complete.

## Goal

The Astro migration shell creates the modern dashboard foundation without replacing the current generated board. It gives us a component-based app that reads the stable `dashboard-data.json` artifact while preserving the existing GitHub Pages root and hosted Cloudflare bridge behavior.

## Implemented

- Added `modern-dashboard/` to the shared template as the first Astro app structure.
- Added static Astro configuration with GitHub Pages base-path support.
- Added the initial page layout, release metadata, filter controls, status lanes, and ticket-card preview components.
- Added a client loader that reads `dashboard-data.json` without re-pulling Jira.
- Added `Modern Dashboard Static Build`, a manual and pull-request workflow that builds the Astro app and uploads the static artifact.

## Hosting Strategy

The modern shell is designed to live under `/modern/` during migration:

```text
/index.html
/dashboard-data.json
/modern/
```

That means the current generated dashboard remains the production root, while the Astro build can share the same published data artifact.

## Fallback Rule

The existing generator remains the fallback until the Astro shell reaches parity for ticket scanning, filters, media, Jira links, assignee updates, checklist comments, and board navigation.

## Next Dependency

SPEC-05 can now build the dense ticket explorer island inside this shell instead of adding more complexity to the legacy generated HTML.
