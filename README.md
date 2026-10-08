# Dataverse Project website redesign

A working prototype for the open-source Dataverse Project, its installation network, and research community. Includes migrated project pages and archives, linked statistics and methodology, community calls, roadmap and release pages, and journal, institution, integration, and partner sections.

## Status

This is the React/Vinext prototype, **not yet a Hugo site**. This source handoff does not change production dataverse.org or enable GitHub Pages. A future Hugo migration should preserve content, routes, links, and `DESIGN_REQUIREMENTS.md`. Do not publish private roadmap source spreadsheets.

## Development

Requires Node.js 22.13 or later.

```sh
npm ci
npm run dev
npm run build
node --test tests/metrics-page.test.mjs tests/releases-page.test.mjs tests/design-requirements.test.mjs tests/community-expansion.test.mjs
```

The local preview runs at http://localhost:3000. `.openai/hosting.json` identifies the existing hosted preview and contains no credentials. Only its owner should publish changes to that Site. Do not commit dependencies or build output.

## Editing

- Community calls: `content/community-calls.md` (hand-edited Markdown).
- Migrated content: `data/archive.json`, rendered through `app/archive-data.ts`.
- Statistics: `data/headline-metrics.ts` and `app/numbers/page.tsx`.
- Installation map: `data/installation-map.json`.
- Featured journals and institutions: `app/components/JournalBanner.tsx` and `InstitutionBanner.tsx`.
- Layouts/styles: `app/`, including `feedback.css` and `midcentury.css`.
- Logo provenance: `data/*logo-sources.md`.

The original imported text remains in the archive. `app/archive-cleanup.ts` removes accidentally captured Drupal navigation from rendered project pages. Journal content is formatted without rewriting its source prose.

## Accessibility and brand review

Harvard's WCAG 2.1 AA target is tracked in `DESIGN_REQUIREMENTS.md`. Automated tests do not establish conformance. Manual screen-reader, zoom, keyboard, document, and recording reviews remain necessary before institutional launch. Logos remain the property of their respective organizations; their use identifies collections, integrations, or acknowledged partners and does not establish endorsement.
