# PDFs restored from the old dataverse.org

The old Drupal site served presentation, publication and report PDFs from
`/sites/g/files/omnuum9946/files/`. They broke when dataverse.org moved to GitHub Pages
(2026-11-03). Joe at HUIT packaged that folder from the old server (2026-11-12, shared on the
Dataverse Google Drive), and all 162 PDFs the site links to are copied from it, unchanged, to the same
paths under `public/`, so the links in `data/archive.json` work as they are.

The package's other files were not copied: the old theme's CSS, JavaScript, PHP and image
derivatives; about 100 logos, icons and photos the new site does not use; and these documents that
no page links to:

- `2026-09/Journal Collections & Review Workflows on Harvard Dataverse.pdf`
- `dataverseorg/files/dataverse_in_china-v1.0.pptx.pdf`
- `dataverseorg/files/g5wittenbergmarion.pdf`
- `dataverseorg/files/gdccdataciteclientapplication.pdf`
- `dataverseorg/files/iassist2015-dataverse-garnett.pdf`
- `dataverseorg/files/iassist_2015_dataverse_presentation_final-alberta.pdf`
- `dataverseorg/files/membership_form_global_dataverse_community_consortium.pdf`
- `dataverseorg/files/dlfdataverse_quigley.pptx`
- `dataverseorg/files/future_of_dataverse-tcdl.pptx`

The PDFs take about 740 MB of the 1 GB GitHub Pages allows for a published site.
