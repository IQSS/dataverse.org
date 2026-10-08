# Persistent website requirements

Before changing this Site, read `DESIGN_REQUIREMENTS.md`. Preserve the confirmed review decisions there, including Dwayne's feedback, the owner's subsequent decisions, and the Harvard WCAG 2.1 AA accessibility target.

Do not claim full accessibility conformance from a build, a contrast calculation, or automated checks alone. Record remaining gaps honestly. Keep decorative borders distinct from control boundaries and focus indicators. Do not undo these requirements during a Hugo migration.

Do not publish private roadmap source spreadsheets. Preserve the existing Site's identity and audience. GitHub Pages publishing was authorized by the owner on 2026-10-08: `scripts/export-static.mjs` prerenders this same app into a static folder and `.github/workflows/pages.yml` deploys it on every push to main. It is not a Hugo conversion; the app source stays the single source of truth. A Hugo migration would still need separate authorization.

## Headline numbers (owned by the kg_box_app pipeline, not by site edits)

`data/headline-metrics.ts` and `data/headline-metrics.json` are generated daily by
`kg_box_app/scripts/export_site_metrics.py` (in Danny's KnowledgeGraph folder) and pushed to the
`daily-metrics` branch of IQSS/dataverse.org. Do not hand-edit the values. Keep the exported shape
of `headlineMetrics` unchanged. Read `headline-metrics.json` (`as_of.citations`,
`as_of.network_sweep`) to show an "as of" date next to the figures, and drop the "not live
counters" wording once that lands. Merge or deploy from `daily-metrics`; do not build a second
metrics refresh.
