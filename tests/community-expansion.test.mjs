import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import worker from "../dist/server/index.js";

async function render(path) {
  const response = await worker.fetch(new Request(`http://localhost${path}`), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
  assert.equal(response.status, 200, path);
  return response.text();
}

test("homepage involvement, seven ecosystem satellites and integration assets remain connected", async () => {
  const home = await render("/");
  assert.ok(home.indexOf('class="ecosystem-map-panel"') < home.indexOf('id="get-involved"'));
  assert.ok(home.indexOf('id="get-involved"') < home.indexOf('id="institutions"'));
  assert.ok(home.indexOf('id="institutions"') < home.indexOf('id="research"'));
  assert.equal((home.match(/id="institutions"/g) || []).length, 1);
  assert.ok(!home.includes('class="ecosystem-context"'));
  assert.ok(!home.includes('class="resilience-note"'));
  assert.ok(home.includes("How to Get Involved"));
  for (const label of ["Containerization", "Documentation", "Internationalization", "Large Data Support", "pyDataverse", "Sensitive Data"]) assert.ok(home.includes(`>${label}</a>`));
  assert.equal((home.match(/class="ecosystem-node node-/g) || []).length, 8);
  assert.ok(home.includes('class="ecosystem-node node-partners" href="#partners"'));
  assert.ok(home.includes('class="ecosystem-node node-integrations" href="https://guides.dataverse.org/en/latest/admin/integrations.html"'));
  assert.ok(home.indexOf('id="integrations"') < home.indexOf('id="partners"'));
  const assets = [...home.matchAll(/src="(\/integrations\/[^\"]+)"/g)].map(match => match[1]);
  assert.equal(assets.length, 27);
  for (const asset of assets) assert.ok((await readFile(new URL(`../public${asset}`, import.meta.url))).length > 100, asset);
  assert.ok(home.includes("Roadmap collaboration"));
  assert.ok(home.includes("Experimental"));
  assert.ok(home.includes("In development"));
});

test("People, Danny's website and Dataverse TV are easy to reach", async () => {
  const about = await render("/about");
  const community = await render("/events");
  const tv = await render("/dataversetv");
  assert.ok(about.includes('class="people-button" href="https://people.dataverse.org/">People</a>'));
  assert.equal((about.match(/href="https:\/\/dannyebanks.com\/"/g) || []).length, 2);
  assert.ok(about.includes('id="team">The Team</h2>'));
  assert.ok(about.includes('href="https://people.dataverse.org/">people.dataverse.org</a>'));
  assert.ok(community.includes('href="/dataversetv">Watch Dataverse TV</a>'));
  assert.ok(tv.includes('href="https://iqss.github.io/dataverse-tv/"'));
});

test("migrated pages omit the captured Drupal menu; audience banners link to real repositories", async () => {
  for (const path of ["/researchers", "/journals", "/institutions", "/developers", "/reports"]) {
    const html = await render(path);
    assert.ok(!html.includes("expand_more"), path);
    assert.ok(!html.includes("About\nAbout"), path);
  }
  const journal = await render("/journals");
  assert.equal((journal.match(/class="journal-workflow"/g) || []).length, 4);
  assert.ok(journal.includes("Preserve data and make it citable"));
  assert.ok(journal.includes("funders’ data sharing mandates"));
  assert.ok(journal.includes("Set up a Journal Dataverse Collection with data curation"));
  const home = await render("/");
  for (const html of [home, journal]) {
    assert.ok(html.includes("Journals and Proceedings"));
    assert.ok(html.includes("NeurIPS"));
    assert.ok(html.includes("Frontiers"));
    assert.ok(html.includes('href="https://neurips.cc/Conferences/2026/EvaluationsDatasetsHosting"'));
    assert.ok(html.includes("View a published example"));
    assert.ok(html.includes("Authors publish supporting research data on Harvard Dataverse."));
    for (const alias of ["ajps", "pan", "qje"]) assert.ok(html.includes(`href="https://dataverse.harvard.edu/dataverse/${alias}"`));
    for (const file of ["ajps.jpg", "political-analysis.jpg", "qje.png", "neurips.png", "frontiers.png"]) assert.ok(html.includes(`/journals/${file}`));
  }
  assert.ok(home.indexOf('id="institutions"') < home.indexOf('id="journals"'));
  assert.ok(home.indexOf('id="journals"') < home.indexOf('id="integrations"'));
  assert.ok(home.indexOf('id="integrations"') < home.indexOf('id="partners"'));
  assert.match(home, /class="journal-scroll" role="region" aria-label="Journals and proceedings — scroll to browse" tabindex="0"/);
  const institutions = await render("/institutions");
  for (const heading of ["Long-term institutional commitment", "NIH &amp; GREI", "Google Dataset Search", "Keeping research data available"]) assert.ok(institutions.includes(heading));
  for (const label of ["Borealis", "Recherche Data Gouv", "NASA Jet Propulsion Laboratory", "Harvard University", "University of North Carolina"]) assert.ok(institutions.includes(label));
});
