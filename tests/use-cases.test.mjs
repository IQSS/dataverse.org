import assert from "node:assert/strict";
import test from "node:test";
import worker from "../dist/server/index.js";

async function render(path) {
  const response = await worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  }, { waitUntil() {}, passThroughOnException() {} });
  return { status: response.status, html: await response.text() };
}

test("use cases are listed, linked from the homepage, and render with their images", async () => {
  const home = (await render("/")).html;
  assert.ok(home.includes('href="/use-cases"'));
  assert.ok(home.includes("Dataverse in Practice"));

  const index = await render("/use-cases");
  assert.equal(index.status, 200);
  const links = index.html.match(/href="\/use-cases\/[a-z_]+"/g) || [];
  assert.equal(new Set(links).size, 8);

  const detail = await render("/use-cases/cafe_grei");
  assert.equal(detail.status, 200);
  assert.ok(detail.html.includes("CAFE RCC"));
  assert.ok(detail.html.includes('src="/use-cases/cafe_grei/images/'));
  assert.ok(detail.html.includes("zenodo.18489235"));
  assert.ok(!detail.html.includes('src="images/'));

  assert.equal((await render("/use-cases/not-a-case")).status, 404);
});

test("the Indigenous data card links to the Local Contexts guide and both archived talks", async () => {
  const home = (await render("/")).html.replaceAll("<!-- -->", "");
  assert.ok(home.includes("Indigenous Data With Local Contexts Labels and Notices"));
  assert.ok(home.includes('href="https://guides.dataverse.org/en/latest/installation/localcontexts.html"'));
  for (const slug of ["australian-data-archive-ada-and-australian-national-university-anu-and", "establishing-means-providing-suitable-representation-indigenous-knowledge"]) {
    assert.ok(home.includes(`href="/presentations/${slug}"`));
    assert.equal((await render(`/presentations/${slug}`)).status, 200);
  }
});
