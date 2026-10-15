import assert from "node:assert/strict";
import test from "node:test";
import worker from "../dist/server/index.js";

async function render(path) {
  const response = await worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  }, { waitUntil() {}, passThroughOnException() {} });
  return { status: response.status, html: await response.text() };
}

test("search page exists, is linked from both navs, and carries the index", async () => {
  for (const path of ["/", "/about"]) assert.ok((await render(path)).html.includes('href="/search"'), `${path} links to /search`);
  const page = await render("/search");
  assert.equal(page.status, 200);
  assert.ok(page.html.includes('role="search"'));
  assert.ok(page.html.includes("Data Citation"));
  assert.ok(page.html.includes("Borealis"));
});
