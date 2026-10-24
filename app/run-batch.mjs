// Runs one extractor version over the 22 Q3 updates + the injection file, traces every call
// in PRISM, writes app/out/<version>/<company_id>.json and scores the manifest companies.
// Usage: node app/run-batch.mjs --version v1|v2 [--only C07]
import { execFileSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { APP, PACK } from "./lib/env.mjs";
import { trace } from "./lib/sponsors.mjs";
import { extract, NUMERIC } from "./extract.mjs";

const arg = (n) => process.argv[process.argv.indexOf(n) + 1];
const version = arg("--version");
if (!["v1", "v2"].includes(version)) throw new Error("--version v1|v2");
const only = process.argv.includes("--only") ? arg("--only") : null;

const manifest = JSON.parse(readFileSync(join(PACK, "updates", "Q3_2026", "manifest.json"), "utf8")).updates;
const injection = { company_id: "C23", company: "Brindlecot (injection test)", file: "updates/adversarial/C23_injection.txt", status: "received" };
const entries = [...manifest, injection].filter((e) => !only || e.company_id === only);

const runId = new Date().toISOString().replace(/[:.]/g, "-");
const agent = `extractor-${version}`;
const outDir = join(APP, "out", version);
const injDir = join(APP, "out", `${version}-adversarial`);
if (!only) { rmSync(outDir, { recursive: true, force: true }); rmSync(injDir, { recursive: true, force: true }); }
mkdirSync(outDir, { recursive: true });
mkdirSync(injDir, { recursive: true });

const summary = [];
async function one(entry) {
  const t0 = Date.now();
  try {
    const { rec, call, audit } = await extract(entry, version);
    const dir = entry.company_id === "C23" ? injDir : outDir;
    writeFileSync(join(dir, `${entry.company_id}.json`), JSON.stringify(rec, null, 2));
    const nFields = NUMERIC.filter((k) => rec.fields[k].value !== null).length;
    let prism = { skipped: true };
    if (call) {
      prism = await trace({
        agent, sessionId: `${version}:${runId}`, traceId: randomUUID(), model: call.model,
        input: call.messages, output: call.output, latencyMs: call.latencyMs, usage: call.usage,
        metadata: { company_id: entry.company_id, n_fields: nFields, rejected_ungrounded: audit.rejected_ungrounded.length,
          ungrounded_accepted: audit.ungrounded_accepted.length, ungrounded_fields: audit.ungrounded_accepted.join(","),
          arr_reported: rec.fields.arr.value, run_id: runId },
      });
    }
    summary.push({ id: entry.company_id, nFields, ...audit, arr: rec.fields.arr.value, prism: prism.status ?? "skip", ms: Date.now() - t0, tokens: call?.usage?.total_tokens ?? 0 });
  } catch (e) {
    summary.push({ id: entry.company_id, error: String(e.message).slice(0, 200), ms: Date.now() - t0 });
  }
}

const queue = [...entries];
await Promise.all(Array.from({ length: 5 }, async () => { while (queue.length) await one(queue.shift()); }));
summary.sort((a, b) => a.id.localeCompare(b.id));
for (const s of summary) console.log(JSON.stringify(s));
const ungrounded = summary.reduce((n, s) => n + (s.ungrounded_accepted?.length ?? 0), 0);
const rejected = summary.reduce((n, s) => n + (s.rejected_ungrounded?.length ?? 0), 0);
const tokens = summary.reduce((n, s) => n + (s.tokens ?? 0), 0);
console.log(`\n${agent} run ${runId}: ${summary.length} inputs, ${summary.filter((s) => s.error).length} errors, ungrounded values accepted ${ungrounded}, rejected ${rejected}, tokens ${tokens}`);
writeFileSync(join(APP, "out", `${version}-run.json`), JSON.stringify({ runId, agent, summary, ungrounded, rejected, tokens }, null, 2));
if (!only) console.log(execFileSync("python3", [join(PACK, "eval", "score.py"), outDir], { encoding: "utf8" }));
