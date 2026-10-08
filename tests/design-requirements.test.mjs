import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import worker from "../dist/server/index.js";

const read = file => readFile(new URL(`../${file}`, import.meta.url), "utf8");
function luminance(hex) {
  const [r, g, b] = hex.match(/../g).map(value => parseInt(value, 16) / 255)
    .map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
  return .2126 * r + .7152 * g + .0722 * b;
}
function contrast(a, b) {
  const pair = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (pair[0] + .05) / (pair[1] + .05);
}

test("brand, control contrast and reduced-motion guardrails persist", async () => {
  const css = await read("app/feedback.css");
  const theme = await read("app/midcentury.css");
  const token = name => css.match(new RegExp(`--${name}: #([a-f0-9]{6});`))[1];
  assert.equal(token("dv-orange"), "c55b28");
  assert.equal(token("dv-border"), "dcc9bd");
  for (const background of ["ffffff", token("dv-orange-soft")]) {
    assert.ok(contrast(token("dv-orange-ink"), background) >= 4.5);
    assert.ok(contrast(token("dv-control-border"), background) >= 3);
  }
  assert.ok(theme.includes("--mcm-outline: 1px solid var(--dv-border)"));
  assert.ok(theme.includes("prefers-reduced-motion: reduce"));
  assert.ok(theme.includes("outline: 3px solid var(--dv-orange-ink)"));
  assert.ok(theme.includes("0 #dedede"));
  assert.ok(!/box-shadow:[^;]*#e2b49c/.test(theme));
  assert.ok(theme.includes(".verified-stats .stat-emphasis { border-radius: 0; margin: 0; transform: none; }"));
  assert.ok((await read("public/dataverse-motion.js")).includes("if (preference.matches"));
});

test("key templates preserve skip navigation and the accessibility policy link", async () => {
  for (const path of ["/", "/about", "/events", "/community-calls", "/numbers", "/roadmap", "/releases", "/blog"]) {
    const response = await worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    }, { waitUntil() {}, passThroughOnException() {} });
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.ok(html.includes('href="#main-content">Skip to main content</a>'), path);
    assert.equal((html.match(/id="main-content"/g) || []).length, 1, path);
    assert.ok(html.includes('href="https://accessibility.huit.harvard.edu/digital-accessibility-policy"'), path);
  }
});

test("community calls render from hand-editable Markdown without losing the meeting archive", async () => {
  const render = async path => {
    const response = await worker.fetch(new Request(`http://localhost${path}`), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
    assert.equal(response.status, 200, path);
    return response.text();
  };
  const community = await render("/events");
  for (const href of ["/community-calls", "https://dataverse.zulipchat.com/", "https://groups.google.com/g/dataverse-dev", "/events/dataverse-community-meeting-2026"]) assert.ok(community.includes(`href="${href}"`));
  assert.ok(!community.includes("<iframe"));
  const markdown = await read("content/community-calls.md");
  const calls = await render("/community-calls");
  assert.ok(markdown.startsWith("# Community Calls"));
  assert.ok(calls.includes("<h1>Community Calls</h1>"));
  assert.ok(calls.includes("September 1, 2026 Notes"));
  assert.ok(calls.includes("March 1, 2016 Notes"));
  assert.equal((calls.match(/<li>/g) || []).length, markdown.split("\n").filter(line => line.startsWith("- ")).length);
  assert.ok(!calls.includes("/content/community-calls.md"));
  const home = await render("/");
  assert.ok(home.includes("https://guides.dataverse.org/en/latest/container/running/demo.html#quickstart"));
  assert.ok(home.includes("<h3>Dataverse Network</h3>"));
  for (const label of ["SHARE", "PRESERVE", "CITE", "DISCOVER"]) assert.match(home, new RegExp(`<a href="[^"]+">${label}</a>`));
  assert.ok(home.replaceAll("<!-- -->", "").includes("Browse all 150 repositories (in alphabetical order)"));
});
