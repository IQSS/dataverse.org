import assert from "node:assert/strict";
import test from "node:test";
import worker from "../dist/server/index.js";

async function render(path) {
  const response = await worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  }, { waitUntil() {}, passThroughOnException() {} });
  return { status: response.status, html: await response.text() };
}

test("journal spotlight includes APSR and keeps Frontiers last; /journals lists every journal collection", async () => {
  const home = (await render("/")).html;
  const spot = home.slice(home.indexOf('id="journals"'), home.indexOf('id="technical"'));
  const names = [...spot.matchAll(/<strong>([^<]+)<\/strong>/g)].map((m) => m[1]);
  assert.ok(names.includes("American Political Science Review"));
  assert.equal(names.at(-1), "Frontiers");
  assert.ok(spot.includes('href="https://dataverse.harvard.edu/dataverse/the_review"'));
  const page = await render("/journals");
  assert.equal(page.status, 200);
  assert.ok(page.html.replace(/<!-- -->/g, "").includes("All 160 journal collections on Harvard Dataverse"));
  const start = page.html.indexOf('class="journal-collections"');
  const list = page.html.slice(start, page.html.indexOf("</section>", start));
  assert.ok(!/@[a-z0-9-]+\.(org|edu|com)/i.test(list), "no contact emails in the journal list");
});
