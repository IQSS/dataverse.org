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

test("release timeline preserves all 79 source entries and exposes every release note", async () => {
  const releases = JSON.parse(await readFile(new URL("../data/releases.json", import.meta.url), "utf8"));
  assert.equal(releases.length, 79);
  assert.equal(new Set(releases.map(r => r.tag)).size, 79);
  assert.deepEqual(releases[0], {date: "2026-09-17", tag: "v6.12"});
  assert.deepEqual(releases.at(-1), {date: "2015-05-20", tag: "4.0"});
  const page = await render("/releases");
  const expectedCounts = [6,8,9,8,11,7,7,6,4,4,5,4];
  for (let year = 2015; year <= 2026; year++) {
    assert.equal(releases.filter(r => r.date.startsWith(String(year))).length, expectedCounts[year-2015]);
  }
  for (const release of releases) {
    assert.equal((page.match(new RegExp(`href="https://github.com/IQSS/dataverse/releases/tag/${release.tag.replaceAll(".", "\\.")}"`, "g")) || []).length, 2);
    assert.ok(page.includes(`dateTime="${release.date}"`) || page.includes(`datetime="${release.date}"`));
  }
  assert.ok(page.includes("Dataverse Users Community"));
  assert.ok(page.includes("Git-tag history"));
  assert.ok(page.includes("plans to release quarterly"));
  assert.ok(page.includes('href="/roadmap"'));
});

test("homepage and shared navigation reach the new releases page", async () => {
  for (const path of ["/", "/roadmap", "/numbers"]) {
    const page = await render(path);
    assert.ok(page.includes('href="/releases"'));
    assert.ok(page.includes('midcentury'));
    assert.ok(page.includes('src="/dataverse-motion.js"'));
  }
});
