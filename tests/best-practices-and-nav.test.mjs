import assert from "node:assert/strict";
import test from "node:test";
import worker from "../dist/server/index.js";

async function render(path) {
  const response = await worker.fetch(new Request(`http://localhost${path}`), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
  assert.equal(response.status, 200, path);
  return response.text();
}

test("data citation page renders the rewritten Markdown with working links", async () => {
  const html = await render("/best-practices/data-citation");
  for (const gone of ["omnuum9946", "dataverse.org/http:", "replication-abs.shtml", "datascience.iq.harvard.edu", "Links and files"]) assert.ok(!html.includes(gone), gone);
  for (const href of [
    "https://gking.harvard.edu/publication/replication-replication/",
    "https://gking.harvard.edu/publication/a-proposed-standard-for-the-scholarly-citation-of-quantitative-data/",
    "https://gking.harvard.edu/publication/when-can-history-be-our-guide-the-pitfalls-of-counterfactual-inference/",
    "https://doi.org/10.29173/iq504",
    "https://doi.org/10.1007/978-1-4020-8741-7_57",
    "https://doi.org/10.17226/13564",
    "https://doi.org/10.7910/DVN/EK886K",
  ]) assert.ok(html.includes(`href="${href}"`), href);
  assert.ok(html.includes("<h2>References and Further Reading</h2>"));
  assert.ok(html.includes("Other best practices"));
  assert.ok(html.includes('href="/best-practices/academic-credit"'));
  // The handle as printed stays text: Harvard's handle server does not resolve it.
  assert.ok(!html.includes('href="http://hdl.handle.net/1902.1/DXRXCFAWPK"'));
});

test("top navigation: no People, short Research label, search icon with an accessible name", async () => {
  for (const path of ["/", "/about"]) {
    const html = await render(path);
    const nav = html.match(/<nav aria-label="Main navigation">[\s\S]*?<\/nav>/)[0];
    assert.ok(!nav.includes("people.dataverse.org"), `${path}: People removed`);
    assert.ok(nav.includes('href="/research-projects">Research</a>'), `${path}: Research label`);
    assert.ok(/<a class="nav-search" href="\/search" aria-label="Search"[^>]*><svg aria-hidden="true"/.test(nav), `${path}: search icon`);
  }
});

test("About's release roadmap link goes to the on-site roadmap", async () => {
  const about = await render("/about");
  assert.ok(!about.includes("iq.harvard.edu/roadmap-dataverse-project"));
  assert.ok(/href="\/roadmap"[^>]*>release roadmap<\/a>/.test(about));
});
