# Design and accessibility requirements

This is a maintained implementation checklist, not public website copy or a conformance certification. Updated 2026-10-08. Preserve it in any Hugo migration. Later explicit owner decisions supersede earlier visual suggestions.

## Review sources

- Dwayne/Sonia feedback supplied by the owner: https://docs.google.com/document/d/1WNjUoQ32djq2ck0LMzToTeIarQJs1-kp6wYlP3-BZQ4/edit
- Harvard Digital Accessibility Policy: https://accessibility.huit.harvard.edu/digital-accessibility-policy
- WCAG 2.1 AA: https://www.w3.org/TR/WCAG21/

The feedback document's text was retrieved and reviewed. Its embedded screenshot examples and the separately mentioned original Dwayne mockup have not been fully compared. No separate Harvard requirements attachment is available in the current conversation; use the published policy and request any additional supplied requirements before asserting an exhaustive match.

## Persistent review decisions

| Feedback | Implementation / status |
| --- | --- |
| Use Dataverse burnt orange, not bright orange | Brand accent remains #C55B28. The existing darker companion #A84A1D is used for orange text and white-text backgrounds to improve contrast. |
| Remove the askew block | Hero card and ecosystem frame are upright. Hero is now a compact callout per the owner's later request. |
| Avoid tiny, thin type | Hero principles/navigation use 14px, stronger weights; body copy generally 16px+. Remaining archive/chart metadata needs a full readability review. |
| Make arrows clear and Run Dataverse recognizably a button | Both hero actions have full visible borders, robust labels, and matching hover/focus treatment. Do not replace the outlined button with unstyled text. |
| Align the triptych and establish consistent margins | Headline cards share one grid; sections use --content-gutter. Preserve positions and centered figures. |
| Give the ecosystem frame complete edges; connect all nodes; scale properly | Full frame and centered SVG connections retained. Narrow screens use a keyboard-focusable scroll region. Full 400% zoom and assistive-technology review still required. |
| Avoid inconsistent hover effects | Shared control styling and reduced-motion-aware hover lifts. Do not introduce isolated rotations, marquee motion, or loops. |
| Reduce accidental information redundancy | Not fully resolved: existing owner-approved homepage repeats Harvard/project messaging. Requires an editorial decision, not silent copy removal. |
| Dataverse logo in header, IQSS in footer, rings present | Implemented. Favicon is the IQSS helix only. |
| Softer edges (latest owner request) | Decorative borders #DCC9BD, usually 1px; controls #A87960; focus #A84A1D. Never soften functional focus indicators to decorative contrast. |

## Other owner decisions to preserve

- White pages, pale-orange panels, rounded edges, shadows and restrained animation; no beige panels, italics, section numbering or asymmetrical figures.
- This is the open-source Dataverse project site, not just the Harvard repository. Keep existing approved wording and all migrated pages.
- No knowledge-graph foregrounding, no live-date banners, and no public links to private roadmap spreadsheets.
- Actual citation counts, honest methodology, linked headline figures, and all 150 installation links must remain intact.
- Decision 2026-10-08 (Gary King, agreed by the owner): the DataCite dataset-DOI citation count (about 15,000) is no longer shown on the homepage, where it read as a small number beside the scholarly-citation total rather than as a different measure; the "Search beyond the record" block that existed to hold it was removed with it. It stays on the numbers page as "Citations of the data itself", because it is the only figure that counts citations of the data rather than of linked papers and the scholarly-citation methodology depends on keeping the two apart.
- Decision 2026-10-08 (Gary King, agreed by the owner): the Harvard-only "published datasets" count (about 116,000) is also off the homepage; next to the 600k network total it invited the wrong comparison. It stays on the numbers page, where the two scopes are explained.
- Compact horizontal partner strip, official logos, and all ten partners retained.
- Grey shadows (#DEDEDE with neutral translucent shadows), not orange-tinted shadows. The central citations card is flush with its neighbors; round only the outer triptych corners.
- Map heading is **Dataverse Network**. Every dot remains linked; retain the expandable text directory and skip-map link for overlapping locations.
- Hero SHARE / PRESERVE / CITE / DISCOVER are links. Run Dataverse targets https://guides.dataverse.org/en/latest/container/running/demo.html#quickstart.
- Community links to Zulip, Dataverse Dev on Google Groups, and `/community-calls`. Calls are hand-edited in `content/community-calls.md`; preserve the annual meeting archive. Zulip sends `X-Frame-Options: DENY`, so use a linked card, not a broken or proxied iframe.
- About team includes Danny Ebanks, Research Associate, after Ceilyn Boyd; preserve all other team listings.
- Keep “How to Get Involved” immediately below the installation map, with community links and all six active GDCC working groups. Link to GDCC's directory for inactive groups rather than presenting them as active.
- People is a visible top-navigation button linking to https://people.dataverse.org/. Danny Ebanks links to https://dannyebanks.com/ in About's team text and Links and files. Community links to the locally ported Dataverse TV page.
- The centered ecosystem figure has seven surrounding cards: Harvard, installations, GDCC/community, software, researchers, integrations, and partners. Integrations links to the admin guide; Partners links to the partner strip.
- The bottom integrations strip covers all named entries in the guide, plus the requested Google Data Commons roadmap collaboration. Use verified official artwork, neutral shadows, accessible labels, and local horizontal scrolling. Do not label planned/experimental capabilities as generally available or imply endorsement. Asset provenance and brand-review notes are in `data/integration-logo-sources.md`.
- Spotlights (owner decision 2026-10-08): the homepage journal and institution sections are headed "Journal and proceedings spotlight" and "Institution spotlight", with intro copy saying they show a few examples, so nobody reads them as a complete list. The partner strip is headed "Thanks for the Generous Support From".
- Use cases (owner request 2026-10-08): a "Use Cases" top-navigation item and `/use-cases`, rendering the eight published use cases from IQSS/dataverse-use-cases with their own images; the homepage shows three featured ones ("Dataverse in practice") between the Harvard story and the collections section. Cards use real screenshots where the repository has them and the GREI mark otherwise, never a cropped text banner.
- Journals and Proceedings sits immediately above Integrations on the homepage. Its five cards form one horizontal, keyboard- and touch-scrollable row; preserve their logos, wording, links, and distinctions between collections, hosting guidance, and author use.

## Accessibility target and release gate

- Remove captured Drupal navigation from migrated page prose and resource links, preserving substantive text.
- “Journals and Proceedings” has workflow cards and selected verified Harvard Dataverse collections with original logos, also on the homepage. NeurIPS is labelled as listing Harvard Dataverse as a preferred hosting platform for its Evaluations & Datasets track; Frontiers is labelled as author use, linked to a published example—not a publisher-wide recommendation or partnership. Do not imply an exhaustive list.
- Institutions highlights Borealis, national/government repositories, a laboratory, and universities. Its homepage banner follows How to Get Involved, replacing the institutional support/data-resilience block. That block is preserved on the Institutions page. These are network examples, not funding or endorsement claims. Five of the six institution cards show the installation’s or institution’s own logo (sources in `data/institution-logo-sources.md`) inside the unchanged pale-orange card; images are decorative (`alt=""`) within links labelled by the visible institution name. The Colombian ministry publishes only a white-on-transparent logo, which fails on the pale panel, so its card stays text-only until a colour version is supplied; do not recolour official marks.
- GitHub source handoff is a prototype branch, not a Hugo conversion or a change to production dataverse.org.
- GitHub Pages (authorized 2026-10-08) serves a prerendered static export of the app (`scripts/export-static.mjs`, `.github/workflows/pages.yml`). Root-relative links are rewritten for the repository subpath at export time; set the repository variable `SITE_BASE_PATH` to `/` when a custom domain is attached. Production dataverse.org is unchanged.

Harvard's published web target is WCAG 2.1 Level AA. Do not label this mockup compliant yet.

Implemented safeguards: semantic links, per-dot repository names, text alternatives for figures, labelled search input, visible focus, site-wide skip navigation, reduced-motion handling, and an accessibility-policy footer link. Key revised color pairs: #A84A1D/white 5.73:1, #A84A1D/#FFF1E9 5.19:1; control border #A87960/white 3.77:1 and on #FFF1E9 3.41:1. Decorative borders are not relied on to identify controls.

Before official release, complete a full audit of representative templates and all unique content: keyboard order and activation, visible/unclipped focus, screen-reader reading and figure descriptions, 200% text resizing and 400% zoom/reflow, text/non-text contrast including SVGs and hover states, meaningful links, accessible downloadable documents, captions/transcripts, and manual review of the private-source-derived roadmap image. Dense overlapping map dots and small timeline labels remain usability review items. Automated checks cannot certify this entire content archive.

## Validation in this update

- axe-core WCAG 2.0/2.1 A/AA rules run on home, Community, Community Calls, About, Numbers, Roadmap, Releases, and Blog at desktop and 320 CSS-pixel widths. Fixed detected text contrast, metric label-in-name failures, and unsupported labels on generic containers.
- 320 CSS-pixel reflow checks found no page-level horizontal overflow on these eight templates. Diagrams and the partner strip scroll within labelled, keyboard-focusable regions; repository/release text directories provide alternatives.
- Tested skip-link activation and focus transfer to main content, live announcement of filtered event results, Community-to-calls navigation and historical notes. Removed opacity fading on text-bearing panels so entry animation does not temporarily lower text contrast. Reduced motion remains supported.
- Reviewed automated manual-check flags: icon-only arrow links retain descriptive accessible names; SVG release labels are #333/#555 on white or #FFF6F0. SVG labels may still merit usability improvements, and external downloads/recordings have not been remediated.
- A clean build and targeted regression tests are the release checks. Standalone `tsc --noEmit` is currently blocked by pre-existing missing Cloudflare worker type declarations in `db/index.ts` and `worker/index.ts`.

This is a remediation record, not a full WCAG conformance statement. A screen-reader audit and review/remediation of all third-party documents, recordings and unique archive content remain necessary before an institutional conformance claim.
