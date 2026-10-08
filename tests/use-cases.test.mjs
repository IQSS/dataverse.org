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
  assert.ok(home.includes("Dataverse in practice"));

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
