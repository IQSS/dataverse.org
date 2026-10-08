Follow `AGENTS.md` at the repository root; it is the single set of instructions for all coding
agents working on the Dataverse Project website.

Essentials: Node 22.13+, `npm ci`, `npm run build`, `node --test tests/*.test.mjs` (the two
`codex-preview` meta-tag tests fail outside the Codex preview and are not regressions). Read
`DESIGN_REQUIREMENTS.md` before visible changes. Never hand-edit `data/headline-metrics.*`; they
are generated daily. Document any new logo in `data/*-logo-sources.md`.
