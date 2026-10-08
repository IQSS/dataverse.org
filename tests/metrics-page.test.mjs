import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import worker from "../dist/server/index.js";

async function render(path) {
  const response = await worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  }, { waitUntil() {}, passThroughOnException() {} });
  assert.equal(response.status, 200);
  return response.text();
}

const metricsSource = await readFile(new URL("../data/headline-metrics.ts", import.meta.url), "utf8");
const metrics = Object.fromEntries([...metricsSource.matchAll(/^\s*(\w+): ("?)([^",\n]+)\2,?$/gm)].map(([, key, quote, value]) => [key, quote ? value : Number(value)]));
const number = (value) => value.toLocaleString("en-US");

test("headline links reach rendered, sourced explanations", async () => {
  const home = await render("/");
  const page = await render("/numbers");
  // The data-DOI citation count is explained on the numbers page but, by decision, not shown on the homepage.
  for (const id of ["installations", "scholarly-citations", "network-datasets", "harvard-datasets"]) {
    assert.match(home, new RegExp(`href="/numbers#${id}"`));
  }
  for (const id of ["installations", "scholarly-citations", "network-datasets", "dataset-citations", "harvard-datasets"]) {
    assert.match(page, new RegExp(`id="${id}"`));
  }
  assert.doesNotMatch(home, /href="\/numbers#dataset-citations"/);
  for (const count of [metrics.installations, number(metrics.scholarlyCitations), number(metrics.networkDatasets), number(metrics.harvardDatasets)]) {
    assert.ok(home.includes(count), count);
    assert.ok(page.includes(count), count);
  }
  assert.ok(page.includes(number(metrics.datasetCitations)));
  assert.ok(!home.includes(`${number(metrics.datasetCitations)}</strong>`));
  assert.ok(!page.includes("4,950,890"));
  assert.ok(!page.includes("1,118,838"));
  assert.ok(!page.includes("lower when counted by publication"));
  assert.ok(page.includes("From shared data to scholarly reach"));
  assert.ok(page.includes(number(metrics.datasetsWithScholarlyCitations)));
  assert.ok(page.includes(number(metrics.citationStudyDatasets - metrics.datasetsWithDatasetCitations)));
  assert.ok(page.includes("citing papers are not deduplicated"));
  assert.ok(page.includes("123 responding installations"));
  assert.ok(page.includes("support.datacite.org/docs/consuming-citations-and-references"));
  assert.ok(page.includes("guides.dataverse.org/en/latest/api/metrics.html"));
  assert.ok(!home.includes("reported by all installations"));
  assert.ok(!page.includes("docs.google.com/spreadsheets"));
  assert.ok(!page.includes("knowledge graph"));
});

test("installation figure covers each of the map's 150 entries once", async () => {
  const map = JSON.parse(await readFile(new URL("../data/installation-map.json", import.meta.url), "utf8"));
  assert.equal(map.installations.length, 150);
  const counts = {};
  for (const installation of map.installations) counts[installation.country] = (counts[installation.country] || 0) + 1;
  const values = Object.values(counts).sort((a, b) => b - a);
  assert.deepEqual(values.slice(0, 6), [21, 15, 14, 14, 9, 7]);
  assert.equal(values.slice(6).reduce((sum, n) => sum + n, 0), 70);
});

test("every installation dot links to its own repository", async () => {
  const map = JSON.parse(await readFile(new URL("../data/installation-map.json", import.meta.url), "utf8"));
  const home = await render("/");
  const links = [...home.matchAll(/<a\b[^>]*class="map-repository-link"[^>]*>/g)].map(match => match[0]);
  assert.equal(links.length, map.installations.length);
  for (const [index, installation] of map.installations.entries()) {
    assert.equal(new URL(installation.url).protocol, "https:");
    assert.ok(links[index].includes(`href="${installation.url}"`));
    assert.ok(links[index].includes('target="_blank"'));
    assert.ok(links[index].includes('rel="noopener noreferrer"'));
    assert.ok(links[index].includes('aria-label="'));
  }
  assert.ok(!home.includes('class="installation-map-link"'));
  assert.ok(home.includes('role="group" aria-labelledby="installation-map-title"'));
});

test("homepage thanks all eight partners with locally hosted logos", async () => {
  const home = await render("/");
  assert.ok(home.includes("Thanks to our Partners"));
  for (const name of ["Google", "firebrand.ai", "NSF", "NIH", "GREI", "GDCC", "Bertarelli Foundation", "Harvard FAS"]) {
    assert.ok(home.includes(`alt="${name}"`));
  }
  for (const file of ["google.png", "firebrand-cream.svg", "nsf.png", "nih.png", "grei.png", "gdcc.png", "bertarelli.png", "fas.png"]) {
    assert.ok(home.includes(`/partners/${file}`));
    const asset = await readFile(new URL(`../dist/client/partners/${file}`, import.meta.url));
    assert.ok(asset.length > 100);
  }
  assert.ok(home.indexOf('id="partners"') < home.indexOf("<footer"));
});
