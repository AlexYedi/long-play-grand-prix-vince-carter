// Thin clients for the four sponsor tools. Usage notes: docs/sponsor-tools.md.
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { APP, env } from "./env.mjs";

// ── Nicrron: every model call goes through here ──────────────────────────────
// Tested: 5-5 models reject a forced tool_choice, so use "auto" and retry, then
// fall back to the fallback model with a forced call.
async function chat(body) {
  const headers = { Authorization: `Bearer ${env.nicrronKey}`, "Content-Type": "application/json" };
  if (env.disableCache) headers["x-nicrron-cache"] = "false";
  const t0 = Date.now();
  const res = await fetch(`${env.nicrronBase}/chat/completions`, { method: "POST", headers, body: JSON.stringify(body), signal: AbortSignal.timeout(120_000) });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`Nicrron ${res.status}: ${JSON.stringify(json).slice(0, 300)}`);
  return { json, latencyMs: Date.now() - t0 };
}

export async function callTool({ messages, tool, model = env.modelExtractor }) {
  const attempts = [
    { model, tool_choice: "auto" },
    { model, tool_choice: "auto" },
    { model: env.modelFallback, tool_choice: { type: "function", function: { name: tool.function.name } } },
  ];
  let last;
  for (const a of attempts) {
    try {
      const { json, latencyMs } = await chat({ model: a.model, messages, tools: [tool], tool_choice: a.tool_choice, temperature: 0.2, max_tokens: env.maxTokens });
      const call = json.choices?.[0]?.message?.tool_calls?.[0];
      if (call) return { args: JSON.parse(call.function.arguments), raw: call.function.arguments, model: json.model, usage: json.usage, latencyMs, id: json.id };
      last = new Error("no tool call returned");
    } catch (e) {
      last = e;
    }
  }
  throw last;
}

export async function callText({ messages, model = env.modelExtractor, maxTokens = env.maxTokens }) {
  const { json, latencyMs } = await chat({ model, messages, temperature: 0.2, max_tokens: maxTokens });
  return { text: json.choices?.[0]?.message?.content ?? "", model: json.model, usage: json.usage, latencyMs, id: json.id };
}

// ── PRISM: one trace per model call ──────────────────────────────────────────
export async function trace({ agent, sessionId, traceId, model, input, output, latencyMs, usage, metadata }) {
  if (!env.prismKey) return { skipped: true };
  const res = await fetch(`${env.prismHost}/api/traces`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-PRISMtrace-Key": env.prismKey },
    body: JSON.stringify({
      project_id: env.prismProject, model, input_messages: input, output_message: output, latency_ms: latencyMs ?? 0,
      token_count_input: usage?.prompt_tokens ?? 0, token_count_output: usage?.completion_tokens ?? 0,
      agent_id: agent, agent_name: agent, session_id: sessionId, trace_id: traceId, metadata,
    }),
    signal: AbortSignal.timeout(15_000),
  }).catch((e) => ({ ok: false, status: 0, e }));
  return { ok: res.ok, status: res.status };
}

// ── Roundtable: versioned ledger files and tasks ─────────────────────────────
export async function rt(tool, body) {
  const res = await fetch(`${env.rtUrl}/api/tools/${tool}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${env.rtKey}`, "Content-Type": "application/json", "User-Agent": "roundtable-transfer/1.0" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(60_000),
  });
  const json = await res.json().catch(() => null);
  if (!res.ok) throw new Error(`Roundtable ${tool} ${res.status}: ${JSON.stringify(json).slice(0, 300)}`);
  return json;
}

// ── Akta: cached, because calls are slow and list generation is 100/month ────
const CACHE = join(APP, "data", "akta_cache");
export async function akta(method, path, { params, body, live = false } = {}) {
  const url = new URL(env.aktaBase + path);
  for (const [k, v] of Object.entries(params ?? {})) url.searchParams.set(k, v);
  const key = createHash("sha1").update(method + url.pathname + url.search + JSON.stringify(body ?? null)).digest("hex").slice(0, 16);
  const file = join(CACHE, `${key}.json`);
  if (!live && existsSync(file)) return { ...JSON.parse(readFileSync(file, "utf8")), cached: true };
  const res = await fetch(url, {
    method,
    headers: { "x-api-key": env.aktaKey, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(90_000),
  });
  const data = res.status === 204 ? null : await res.json().catch(() => null);
  if (!res.ok) throw new Error(`Akta ${path} ${res.status}: ${JSON.stringify(data).slice(0, 300)}`);
  const out = { request: { method, path: url.pathname + url.search, body: body ?? null }, fetchedAt: new Date().toISOString(), data };
  mkdirSync(CACHE, { recursive: true });
  writeFileSync(file, JSON.stringify(out, null, 2));
  return { ...out, cached: false };
}
