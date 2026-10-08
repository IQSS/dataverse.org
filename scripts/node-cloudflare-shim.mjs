// Lets Node import the built worker (dist/server/index.js) outside Cloudflare.
//
// Since @cloudflare/vite-plugin 1.6x the worker bundle imports the "cloudflare:workers"
// runtime module, which only exists inside workerd. The static export and the tests load the
// worker in plain Node, so this hook serves an empty stand-in for any "cloudflare:" specifier.
// Import this file before importing the worker.
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`
      export async function resolve(specifier, context, next) {
        if (specifier.startsWith("cloudflare:")) return { url: specifier, shortCircuit: true };
        return next(specifier, context);
      }
      export async function load(url, context, next) {
        if (url.startsWith("cloudflare:")) {
          return { format: "module", shortCircuit: true, source: "export const env = {}; export default {};" };
        }
        return next(url, context);
      }
    `),
);
