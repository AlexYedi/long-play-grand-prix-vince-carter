// Publishes the verified ledger and the real market layer to Roundtable as versioned files.
// Roundtable keeps every version with its author, so the ledger is append-only by construction:
// an earlier quarter's numbers are never silently overwritten. Records the returned versions in
// app/out/roundtable_versions.json so the UI/MCP can cite "file, version, author".
// Usage: node app/publish.mjs
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { APP, env } from "./lib/env.mjs";
import { rt } from "./lib/sponsors.mjs";

const FILES = [
  ["ledger/2026-Q3.json", "out/ledger.json", "extractor-v2 + reconciler: Halyard Fund I Q3 2026 ledger (synthetic fund)"],
  ["market/universe.json", "data/universe.json", "Real funds (March Capital, Left Lane) and Akta-defined competitor sets"],
  ["market/launch_velocity.json", "data/universe_launches_summary.json", "launch-analyst: tiered launches and velocity vs. competitors (akta.pro)"],
  ["market/customer_adoption.json", "data/universe_adoption_summary.json", "adoption-analyst: new public customers vs. competitors (akta.pro)"],
];
const versions = {};
for (const [path, local, message] of FILES) {
  const content = readFileSync(join(APP, local), "utf8");
  // request_id makes a retried publish idempotent (same content + path → same version).
  const body = { bank: env.rtBank, path, content, message, request_id: `publish:${path}:${createHash("sha1").update(content).digest("hex").slice(0, 16)}` };
  const res = await rt("write_file", body).catch(() => rt("write_file", { request: body }));
  versions[path] = res;
  console.log(path, "→", JSON.stringify(res).slice(0, 200));
}
writeFileSync(join(APP, "out", "roundtable_versions.json"), JSON.stringify({ bank: env.rtBank, published_at: new Date().toISOString(), versions }, null, 2));
