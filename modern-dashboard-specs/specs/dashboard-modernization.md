# Modern Jira Dashboard Migration Specs

## North Star

Migrate the current generated Jira dashboards into a modern, static-first dashboard system that keeps the existing GitHub Pages deployment path, preserves Cloudflare bridge actions, and gives QA a faster way to triage release work.

## Recommended Path

1. Polish the current generator with shared design tokens, compact layout, and stronger dashboard information architecture.
2. Split generated Jira data from generated markup so the same snapshot can power current HTML and future components.
3. Introduce an Astro static shell once the data contract is stable.
4. Use React islands only for interactivity that earns its cost: ticket exploration, checklist editing, comment preview, and operational health.
5. Add TanStack Table for dense ticket scanning and Apache ECharts for release analytics.
6. Keep current 122 and 123 dashboards live until parity is verified.

## Spec Index

### SPEC-00 Baseline Current Dashboard Contract

Status: Complete.

Problem: Current behavior is spread across `pull-jira-release-tickets.cjs`, generated `index.html`, GitHub Actions, the Cloudflare bridge, Slack notifications, and the shared template.

Contract: [`current-dashboard-contract.md`](current-dashboard-contract.md)

Deliverables:

- Inventory 122, 123, and template repo responsibilities.
- Define fields required by every generated board.
- Capture current bridge and notification dependencies.
- Publish the baseline current dashboard contract.

Acceptance:

- Specs name the files that own each behavior.
- Future boards can be created without rediscovering infrastructure assumptions.
- Bridge login, assignee updates, comments, Slack, and Pages deploys are represented.
- Hosted checklist marks SPEC-00 complete by default.

### SPEC-01 Design Token System

Status: Complete.

Problem: Visual rules are currently embedded directly in generated pages, making future boards harder to keep consistent.

Contract: [`design-tokens.md`](design-tokens.md)

Deliverables:

- Token map for status, priority, bridge state, checklist state, and board health.
- Compact spacing scale for repeated QA use.
- Accessible focus and button states.
- Publish the design token map.

Acceptance:

- 122 and 123 boards share token names.
- Text and controls do not shift or overflow on mobile.
- Status and priority colors meet contrast expectations.
- Hosted checklist marks SPEC-01 complete by default.

### SPEC-02 Information Architecture Refresh

Status: Complete.

Problem: The dashboard needs to prioritize release scanning over long-form page reading.

Contract: [`information-architecture.md`](information-architecture.md)

Deliverables:

- First viewport layout for active release work.
- Board directory expanded into a release navigator.
- Ticket detail hierarchy for description, images, checklist, and Jira actions.
- Publish the information architecture contract.

Acceptance:

- A QA user can find changed tickets without reading every card.
- Board links and data pull metadata are visible but not dominant.
- Action controls stay near the ticket they affect.
- Hosted checklist marks SPEC-02 complete by default.

### SPEC-03 Data Artifact Separation

Status: Complete.

Problem: Embedded JSON inside HTML makes future framework migration harder.

Contract: [`dashboard-data-schema.md`](dashboard-data-schema.md)

Deliverables:

- Versioned dashboard-data JSON schema.
- Compatibility layer for embedded data while old boards remain live.
- Schema notes for pullDiff, issue cards, images, checklist entries, and board registry.
- Publish the dashboard data schema.

Acceptance:

- The generator can emit both `index.html` and a standalone JSON artifact.
- The modern dashboard can load the same snapshot without re-pulling Jira.
- Schema changes are backward-compatible or versioned.
- Hosted checklist marks SPEC-03 complete by default.

### SPEC-04 Astro Migration Shell

Problem: A modern component architecture is useful, but only after the static data contract is stable.

Deliverables:

- Astro project structure in the shared template.
- Static build workflow for GitHub Pages.
- Initial components for layout, tickets, filters, and metadata.

Acceptance:

- Built output is static and GitHub Pages compatible.
- Current board links and bridge actions still work.
- The old generator remains available as fallback until parity is proven.

### SPEC-05 Ticket Explorer Island

Problem: Card scanning does not scale well as ticket counts grow.

Deliverables:

- Dense ticket grid with status, assignee, priority, component, parent, and changed-since-last-pull filters.
- Saved view presets for QA testing, code review, status moves, and unassigned work.
- Side panel details for selected ticket.

Acceptance:

- Users can scan 50 plus tickets without the page feeling heavy.
- Filters update without losing ticket context.
- Rows link to Jira and preserve checklist actions.

### SPEC-06 Checklist Workspace Upgrade

Problem: Checklist work should feel like a QA workspace, not a simple modal.

Deliverables:

- Checklist state model for imported and manual test cases.
- Evidence and concern fields per ticket.
- Comment preview that mirrors Jira output before submission.

Acceptance:

- Checklist comments remain posted through the Cloudflare bridge.
- Manual checklist entries can be edited before submission.
- Users can distinguish draft, ready, submitted, and failed states.

### SPEC-07 Release Analytics Band

Problem: QA needs fast release signals without opening every ticket.

Deliverables:

- Assignee workload chart.
- Status movement chart from pullDiff history.
- Component and priority distribution summaries.

Acceptance:

- Charts answer release questions without crowding ticket controls.
- Chart colors reuse design tokens.
- Charts degrade into readable tables if JavaScript fails.

### SPEC-08 Operations Health Center

Problem: Bridge auth, Actions health, Pages deploys, and Jira pulls can look like one outage when they are separate systems.

Deliverables:

- Dashboard health panel with latest pull and deploy status.
- Bridge state copy that distinguishes login required from offline.
- Links to relevant workflows and Cloudflare login.

Acceptance:

- Users can tell whether data refresh and Jira write paths are separate.
- Historical failed workflow emails are not mistaken for current outages.
- The bridge status never falls back to localhost.

### SPEC-09 Multi-board Registry

Problem: Past and future boards need a durable registry instead of hand-edited links.

Deliverables:

- `boards.json` registry with release, URL, status, owner, and notes.
- Shared board directory component.
- Automation hook for new board creation.

Acceptance:

- 122 and 123 appear as first registry entries.
- Future boards can be added without editing each generated page manually.
- The shared template owns the default directory structure.

### SPEC-10 Accessibility and Responsive QA

Problem: UI changes need repeatable verification before they land on active QA dashboards.

Deliverables:

- Playwright screenshot coverage for dashboard, filters, modal, and footer.
- Keyboard focus smoke tests for action controls.
- Responsive checks for text overflow and sticky controls.

Acceptance:

- No overlapping text or clipped controls at mobile widths.
- Interactive controls have visible focus states.
- Screenshots are saved as review artifacts for risky UI changes.

### SPEC-11 Rollout and Fallback Plan

Problem: Replacing the current board too quickly would create risk for active QA work.

Deliverables:

- Parallel preview URL for the modern dashboard.
- Parity checklist against 122 and 123 boards.
- Fallback instructions for returning to current static generator output.

Acceptance:

- Current dashboards remain available throughout migration.
- Modern preview uses the same Jira snapshot as the current board.
- Cutover only happens after action paths and read paths are verified.

## Definition Of Ready

- The spec names affected repos and files.
- The Jira data shape needed by the feature is known.
- The acceptance checks can be verified locally or through GitHub Pages.
- The change does not depend on laptop-local services.

## Definition Of Done

- Generator and shared template changes are committed.
- Current active boards are regenerated where needed.
- GitHub Actions and Pages deployments are green.
- Browser QA covers desktop and mobile layouts for visible UI changes.
- Rollback path is clear.
