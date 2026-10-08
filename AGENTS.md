# Instructions for coding agents and contributors

This file is read by Codex, Claude Code (through `CLAUDE.md`), GitHub Copilot (through
`.github/copilot-instructions.md`), Cursor, and similar tools. Humans: start with
`CONTRIBUTING.md`, which covers the same ground in prose.

## What this repository is

The source of the Dataverse Project website at https://iqss.github.io/dataverse.org/ (a
vinext/React app, server-rendered at build time and prerendered to static HTML for GitHub
Pages). It describes the open-source Dataverse software, its installation network, and its
community. It is not the Dataverse repository software itself (that is IQSS/dataverse) and it
does not change production dataverse.org.

## Persistent website requirements

Before changing anything visible, read `DESIGN_REQUIREMENTS.md`. Preserve the confirmed review
decisions there, including Dwayne's feedback, the owner's subsequent decisions, and the Harvard
WCAG 2.1 AA accessibility target.

Do not claim full accessibility conformance from a build, a contrast calculation, or automated
checks alone. Record remaining gaps honestly. Keep decorative borders distinct from control
boundaries and focus indicators.

Do not publish private roadmap source spreadsheets. Preserve the existing site's identity and
audience. GitHub Pages publishing was authorized by the owner on 2026-10-08:
`scripts/export-static.mjs` prerenders this same app into a static folder and
`.github/workflows/pages.yml` deploys it on every push to `main` or `daily-metrics`. It is not a
Hugo conversion; the app source stays the single source of truth. A Hugo migration would still
need separate authorization.

## Working in this repository

- Node.js 22.13 or later. Install with `npm ci`; never commit `node_modules`, `dist`, or
  `site-static`.
- `npm run dev` serves http://localhost:3000. `npm run build` must pass before a pull request.
- Tests: `npm test` (builds, then runs every file in `tests/`) or `npm run test:only` after a
  build. The tests load the built worker in Node through `scripts/node-cloudflare-shim.mjs`,
  which stands in for the `cloudflare:` runtime modules; two template tests about the Codex
  preview skeleton skip themselves outside Codex. All tests must pass.
- Lint: `npm run lint`. Plain `<img>` tags are accepted for logos (same pattern as
  `JournalBanner.tsx`); keyboard-scrollable containers with `role="region"` or `role="group"`
  and an accessible name may carry `tabIndex={0}`.
- Static export: `npm run export` writes `site-static/` for the site root; the Pages workflow
  passes `--base /dataverse.org` for the repository subpath. If you add a new way of referencing
  an asset or route, run the export with a base path and open it under that path to confirm the
  rewrite still covers it.
- Dependencies are pinned to exact versions; Dependabot opens weekly update pull requests.
  `npm audit` findings that remain are inside the vinext build toolchain (fast-glob/braces,
  satori/@vercel/og) with no upstream fix; they never run on the published static site. Do not
  downgrade vinext to clear them.
- Keep changes small and in the existing style: raw `<a href>` links (no client-side router),
  CSS in `app/*.css` with the existing tokens, and content in `data/` or `content/` rather than
  in components.

## Where things live

- Homepage and pages: `app/page.tsx`, `app/numbers`, `app/releases`, `app/roadmap`,
  `app/community-calls`; migrated pages render from `data/archive.json` through
  `app/archive-data.ts` and `app/[...slug]/page.tsx`.
- Community calls: `content/community-calls.md` (hand-edited Markdown).
- Featured journals, institutions, integrations, partners: `app/components/*Banner.tsx`, with
  logo provenance in `data/*-logo-sources.md`. Any new logo needs a row there: original source
  URL, local file, and the relationship it identifies. Never recolour or redraw an official mark.
- Installation map: `data/installation-map.json`, from the IQSS/dataverse-installations registry.
- Use cases: `data/use-cases.ts` (titles, audiences, summaries, images, citations) plus the
  Markdown bodies in `content/use-cases/<slug>.md` and images in `public/use-cases/<slug>/images/`,
  copied from https://github.com/IQSS/dataverse-use-cases with image paths rewritten and HTML
  size attributes mirrored as inline styles (Tailwind preflight forces `img { height: auto }`).
  To add one: copy its folder the same way, add an entry to `data/use-cases.ts`, and set
  `featured` on at most three for the homepage.
- Tests: `tests/*.test.mjs` render pages through the built worker and assert on the HTML.

## Generated files: do not hand-edit

`data/headline-metrics.ts` and `data/headline-metrics.json` are produced daily by the Harvard
Dataverse knowledge-graph pipeline (`kg_box_app/scripts/export_site_metrics.py`, outside this
repository) and pushed to the `daily-metrics` branch, which also deploys. Keep the exported shape
of `headlineMetrics` unchanged. Read `headline-metrics.json` (`as_of.citations`,
`as_of.network_sweep`) to show an "as of" date next to the figures. Do not build a second
metrics refresh. Since 2026-10-08 the export also carries `networkFiles`, `networkDownloads`,
`networkAccounts` and `respondingInstallationsAccounts`, summed over the installation registry the
same way as `networkDatasets`. Accounts are registered user accounts (depositors and other
sign-ups), not visitors or readers, and only about 86 of 150 installations report them; any copy
that shows the figure must say so.
Usage figures come from Make Data Count (`harvardViews`, `harvardUniqueViews`,
`harvardUniqueViewsPeople`, `harvardDownloads`, `harvardUniqueDownloads`,
`harvardUniqueDownloadsPeople`, plus `networkUniqueViews`, `networkUniqueDownloads` and
`installationsReportingUsage`). "Unique" means unique sessions per dataset per month since MDC
was enabled (Harvard: mid-2020), "People" excludes machine traffic, and the network values are a
floor because only about 14 installations report usage. Copy that shows them must say "since
2020" and must not call them unique people.

## Pull requests

- One topic per pull request, with a short description of what changed and why, and a
  screenshot for anything visible.
- Say which checks you ran. If you used an AI agent, say so in the description; that is
  welcome, and the reviewer still reads the diff.
- Do not change `DESIGN_REQUIREMENTS.md` decisions without the owner; add to it when a new
  decision is made.
