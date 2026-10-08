# Dataverse Project website redesign

A working prototype for the open-source Dataverse Project, its installation network, and research community. Includes migrated project pages and archives, linked statistics and methodology, community calls, roadmap and release pages, and journal, institution, integration, and partner sections.

## Status

The site is published with GitHub Pages at https://iqss.github.io/dataverse.org/ from a
prerendered static export of this React/Vinext app (`scripts/export-static.mjs`,
`.github/workflows/pages.yml`); every push to `main` or `daily-metrics` redeploys it. It is
**not a Hugo site** and does not change production dataverse.org. A future Hugo migration should
preserve content, routes, links, and `DESIGN_REQUIREMENTS.md`. Do not publish private roadmap
source spreadsheets.

## Contributing

See `CONTRIBUTING.md`. Coding agents (Codex, Claude Code, Copilot, Cursor) pick up the shared
instructions in `AGENTS.md` automatically.

## Development

Requires Node.js 22.13 or later.

```sh
npm ci
npm run dev
npm run build
npm test              # build + all tests
npm run export        # static copy in site-static/
```

The local preview runs at http://localhost:3000. The former ChatGPT-hosted preview has been deleted; `.openai/hosting.json` only records its old project id and contains no credentials. Do not commit dependencies, build output, or `site-static/`.

## Editing

- Community calls: `content/community-calls.md` (hand-edited Markdown).
- Migrated content: `data/archive.json`, rendered through `app/archive-data.ts`.
- Statistics: `data/headline-metrics.ts` is generated daily (see `AGENTS.md`); the methodology copy is in `app/numbers/page.tsx`.
- Installation map: `data/installation-map.json`.
- Featured journals and institutions: `app/components/JournalBanner.tsx` and `InstitutionBanner.tsx`.
- Layouts/styles: `app/`, including `feedback.css` and `midcentury.css`.
- Logo provenance: `data/*logo-sources.md`.

The original imported text remains in the archive. `app/archive-cleanup.ts` removes accidentally captured Drupal navigation from rendered project pages. Journal content is formatted without rewriting its source prose.

## Accessibility and brand review

Harvard's WCAG 2.1 AA target is tracked in `DESIGN_REQUIREMENTS.md`. Automated tests do not establish conformance. Manual screen-reader, zoom, keyboard, document, and recording reviews remain necessary before institutional launch. Logos remain the property of their respective organizations; their use identifies collections, integrations, or acknowledged partners and does not establish endorsement.
