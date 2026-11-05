import assert from "node:assert/strict";
import test from "node:test";
import worker from "../dist/server/index.js";
import { latestTopics, sanitize } from "../app/zulip-topics.mjs";

async function render(path) {
  const response = await worker.fetch(new Request(`http://localhost${path}`), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
  assert.equal(response.status, 200, path);
  return response.text();
}

test("Community page holds a hidden Zulip section between the community cards and meetings", async () => {
  const community = await render("/events");
  const at = community.indexOf('id="zulip-latest"');
  assert.ok(community.indexOf('id="community-connections-heading"') < at && at < community.indexOf('id="community-meetings-heading"'));
  assert.match(community, /<section[^>]*id="zulip-latest"[^>]*hidden=""/);
  assert.ok(community.includes('href="https://dataverse.zulipchat.com">Browse the full Zulip archive'));
  assert.ok(!community.includes("<iframe"));
});

test("latest Zulip topics stay off the homepage", async () => {
  assert.ok(!(await render("/")).includes("zulip-latest"));
});

test("topic names use Zulip's narrow encoding", () => {
  assert.equal(sanitize("#Dataverse2026"), ".23Dataverse2026");
  assert.equal(sanitize("move dataverse.org to GitHub?"), "move.20dataverse.2Eorg.20to.20GitHub.3F");
  assert.equal(sanitize("dataverse.org website redesign!"), "dataverse.2Eorg.20website.20redesign.21");
  assert.equal(sanitize("HEAL Data Packaging Framework & App"), "HEAL.20Data.20Packaging.20Framework.20.26.20App");
});

test("latest topics link into Zulip with each topic's newest message, or without one if it is unavailable", async () => {
  const index = {
    time: 1793903150.06,
    streams: {
      community: { id: 375707, latest_id: 900, topic_data: { "newest": { latest_date: 1793900000, size: 3 }, "older": { latest_date: 1793850000, size: 5 }, "broken": { latest_date: 1793700000, size: 1 }, "oldest": { latest_date: 1793000000, size: 2 } } },
      "large data": { id: 432390, latest_id: 800, topic_data: { "meetings": { latest_date: 1793600000, size: 9 } } },
    },
  };
  const requested = [];
  const fetch = async url => {
    requested.push(url.replace("https://gdcc.github.io/zulip-archive/zulip_json/", ""));
    if (url.endsWith("stream_index.json")) return Response.json(index);
    if (url.endsWith("/older.json")) return Response.json([{ id: 850 }, { id: 851 }]);
    return new Response("Not found", { status: 404 });
  };
  const topics = await latestTopics({ fetch, limit: 4 });
  const base = "https://dataverse.zulipchat.com/#narrow/channel/";
  assert.deepEqual(topics.map(t => [t.topic, t.url.replace(base, "")]), [
    ["newest", "375707-community/topic/newest/with/900"],
    ["older", "375707-community/topic/older/with/851"],
    ["broken", "375707-community/topic/broken"],
    ["meetings", "432390-large-data/topic/meetings/with/800"],
  ]);
  assert.deepEqual(topics[0], { channel: "community", topic: "newest", latest: new Date(1793900000 * 1000).toISOString(), messages: 3, url: `${base}375707-community/topic/newest/with/900` });
  assert.deepEqual(requested.sort(), ["375707-community/broken.json", "375707-community/older.json", "stream_index.json"]);
});
