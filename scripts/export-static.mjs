#!/usr/bin/env node
// Prerender the built site into a static folder for GitHub Pages.
//
// `npm run build` produces a server-rendered Cloudflare worker (dist/server) plus client
// assets (dist/client) and no HTML. This script loads that worker in-process, crawls every
// internal link starting from "/", writes each page as <out>/<path>/index.html, copies the
// client assets, and (when --base is set) rewrites root-relative URLs so the site works
// under a repository subpath such as https://iqss.github.io/dataverse.org/.
//
//   node scripts/export-static.mjs --out site-static --base /dataverse.org
//   node scripts/export-static.mjs --out site-static --base /          # custom domain
import "./node-cloudflare-shim.mjs"; // must run before the worker is imported
import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, extname, join } from "node:path";
import { pathToFileURL } from "node:url";

const args = Object.fromEntries(process.argv.slice(2).map((a, i, all) => a.startsWith("--") ? [a.slice(2), all[i + 1] !== undefined && !all[i + 1].startsWith("--") ? all[i + 1] : "true"] : []).filter(Boolean));
const out = args.out || "site-static";
const base = (args.base ?? process.env.SITE_BASE_PATH ?? "").replace(/\/+$/, ""); // "/" or "" means the site root
const seeds = ["/", "/numbers", "/community-calls", "/releases", "/roadmap", "/404"];

const workerUrl = pathToFileURL(join(process.cwd(), "dist/server/index.js"));
workerUrl.searchParams.set("export", String(Date.now()));
const { default: worker } = await import(workerUrl.href);
const env = { ASSETS: { fetch: async () => new Response("", { status: 404 }) }, DB: null, IMAGES: null };
const ctx = { waitUntil() {}, passThroughOnException() {} };

const render = async (path) => {
  const res = await worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), env, ctx);
  return { status: res.status, html: await res.text(), type: res.headers.get("content-type") || "" };
};

const normalize = (href) => {
  const clean = href.replace(/[#?].*$/, "");
  if (!clean.startsWith("/") || clean.startsWith("//")) return null;
  if (/\.[a-z0-9]{2,5}$/i.test(clean) && !clean.endsWith(".html")) return null; // asset, not a page
  return clean.length > 1 ? clean.replace(/\/+$/, "") : "/";
};

const queue = [...seeds];
const seen = new Set(queue);
const pages = new Map();
const failures = [];
const started = Date.now();

while (queue.length) {
  const batch = queue.splice(0, 16);
  await Promise.all(batch.map(async (path) => {
    try {
      const { status, html, type } = await render(path);
      if (!type.includes("text/html")) return;
      if (status !== 200 && path !== "/404") { failures.push(`${status} ${path}`); return; }
      pages.set(path, html);
      for (const [, href] of html.matchAll(/\bhref="([^"]+)"/g)) {
        const next = normalize(href);
        if (next && !seen.has(next)) { seen.add(next); queue.push(next); }
      }
    } catch (error) {
      failures.push(`ERR ${path}: ${error.message}`);
    }
  }));
}

const rewrite = (text) => base
  ? text
    .replace(/((?:href|src|content|action|data-src)=")\/(?!\/)/g, `$1${base}/`)
    .replace(/url\(\s*(['"]?)\/(?!\/)/g, `url($1${base}/`)
    // Inside the inlined React payload (escaped JSON) only URL props and asset hints are paths;
    // visible text such as "/api/info/metrics/datasets" must stay as rendered or hydration fails.
    .replace(/\\"(href|src|action|content|data-src)\\":\\"\/(?!\/)/g, `\\"$1\\":\\"${base}/`)
    .replace(/:HL\[\\"\/(?!\/)/g, `:HL[\\"${base}/`) // React preload hints (stylesheets, images); before the _next rule
    .replace(/\\"\/_next\//g, `\\"${base}/_next/`)
  : text;
// Vite's dependency maps hold "_next/..." strings that the preload helper prefixes with "/",
// so they get the base without its leading slash; "/_next/..." strings get the full base.
const rewriteJs = (text) => base
  ? text.replace(/(["'`])\/_next\//g, `$1${base}/_next/`).replace(/(["'`])_next\//g, `$1${base.slice(1)}/_next/`)
  : text;

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp("dist/client", out, { recursive: true, filter: (src) => !src.endsWith("/_headers") });

for (const [path, html] of pages) {
  const file = path === "/404" ? join(out, "404.html") : join(out, path === "/" ? "index.html" : `${path}/index.html`);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, rewrite(html));
}

if (base) {
  for (const entry of await readdir(join(out, "_next"), { recursive: true, withFileTypes: true })) {
    if (!entry.isFile()) continue;
    const file = join(entry.parentPath ?? entry.path, entry.name);
    const ext = extname(file);
    if (ext === ".css") await writeFile(file, rewrite(await readFile(file, "utf8")));
    if (ext === ".js" || ext === ".json") await writeFile(file, rewriteJs(await readFile(file, "utf8")));
  }
}
await writeFile(join(out, ".nojekyll"), "");

console.log(`exported ${pages.size} pages to ${out}/ in ${Math.round((Date.now() - started) / 1000)}s; base path ${base ? `"${base}"` : "(root)"}`);
if (failures.length) console.log(`skipped ${failures.length} link targets:\n  ${failures.slice(0, 20).join("\n  ")}${failures.length > 20 ? "\n  ..." : ""}`);
