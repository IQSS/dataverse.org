import assert from "node:assert/strict";
import test from "node:test";
import worker from "../dist/server/index.js";

async function render(path) {
  const response = await worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  }, { waitUntil() {}, passThroughOnException() {} });
  return { status: response.status, html: await response.text() };
}

test("presentations show the full date and venue where the archive has them (#88)", async () => {
  const list = await render("/presentations");
  assert.equal(list.status, 200);
  assert.ok(list.html.includes("May 1, 2024 · AI @ FAS Symposium at Harvard University"));
  const detail = await render("/presentations/applications-generative-ai-dataverse-and-research-projects");
  assert.ok(detail.html.includes("May 1, 2024"));
});
