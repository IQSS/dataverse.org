# Contributing to the Dataverse Project website

Thanks for helping. This repository holds the source of https://iqss.github.io/dataverse.org/,
the website of the open-source Dataverse Project. Content fixes, accessibility improvements,
new community links, and corrections to the migrated archive are all welcome. The Dataverse
software itself lives at https://github.com/IQSS/dataverse; please report software issues there.

## Set up

Node.js 22.13 or later.

```sh
git clone git@github.com:IQSS/dataverse.org.git
cd dataverse.org
npm ci
npm run dev        # http://localhost:3000
```

## Make a change

1. Branch from `main`.
2. Edit. Most content changes do not touch components:
   - community calls: `content/community-calls.md`
   - migrated pages, blog, presentations, publications, events: `data/archive.json`
   - releases and roadmap: `data/releases.json`, `app/roadmap/page.tsx`
   - featured journals, institutions, integrations, partners: `app/components/*Banner.tsx`,
     with the logo's source recorded in `data/*-logo-sources.md`
3. Check it:
   ```sh
   npm run build
   node --test tests/*.test.mjs
   npm run lint
   ```
   Two tests in `tests/rendered-html.test.mjs` expect a `codex-preview` meta tag that only the
   Codex preview environment adds; they fail elsewhere and can be ignored. Everything else
   should pass.
4. Open a pull request against `main` with a short description and, for visible changes, a
   screenshot. Merged pull requests deploy to GitHub Pages automatically.

## Design and accessibility

`DESIGN_REQUIREMENTS.md` records the review decisions the site must keep (brand colour, type
sizes, focus indicators, Harvard's WCAG 2.1 AA target, what the headline numbers may claim).
Read it before changing anything visible, and add to it rather than silently reversing a
decision. Logos belong to their organisations and identify collections, installations,
integrations, or partners; they do not assert endorsement, and official marks are never
recoloured or redrawn.

## Headline numbers

The figures on the homepage and the numbers page are generated once a day by the Harvard
Dataverse knowledge-graph pipeline and pushed to the `daily-metrics` branch as
`data/headline-metrics.ts` and `data/headline-metrics.json`. Do not edit them by hand; if a
number looks wrong, open an issue describing which one and what you expected.

## Working with AI coding agents

Agents are welcome here. `AGENTS.md` at the repository root is the shared instruction file that
Codex, Claude Code (`CLAUDE.md`), GitHub Copilot (`.github/copilot-instructions.md`), Cursor and
similar tools pick up automatically, so an agent started in a clone of this repository already
knows the build, test, design and provenance rules above. Say in the pull request that an agent
was used; the reviewer reads the diff either way.

## Questions

Open an issue in this repository, or ask in the Dataverse community channels linked from the
site's Community page.
