// Loads the repo-root .env (never printed) and resolves Alex's variable names.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
export const APP = join(ROOT, "app");
export const PACK = join(ROOT, "data-pack");

const raw = {};
for (const line of readFileSync(join(ROOT, ".env"), "utf8").split("\n")) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m) raw[m[1]] = m[2].trim();
}
const pick = (...names) => names.map((n) => process.env[n] || raw[n]).find(Boolean) || "";

export const env = {
  nicrronKey: pick("NICRRON_API_KEY"),
  nicrronBase: pick("NICRRON_BASE_URL") || "https://api.nicrron.ai/v1",
  modelExtractor: pick("NICRRON_MODEL_EXTRACTOR") || "anthropic/claude-sonnet-5-5",
  modelNarrator: pick("NICRRON_MODEL_NARRATOR") || "anthropic/claude-opus-5-5",
  modelFallback: pick("NICRRON_FORCED_TOOL_FALLBACK_MODEL") || "anthropic/claude-haiku-5-5",
  maxTokens: Number(pick("NICRRON_MAX_TOKENS") || 4000),
  disableCache: pick("NICRRON_DISABLE_CACHE") !== "false",

  prismKey: pick("PRISMTRACE_INGEST_API_KEY", "PRISMTRACE_API_KEY"),
  prismProject: pick("PRISMTRACE_PROJECT_ID"),
  prismHost: pick("PRISMTRACE_HOST") || "https://prism.blockconvey.com",

  aktaKey: pick("AKTA_API_KEY"),
  aktaBase: pick("AKTA_BASE_URL") || "https://api.akta.pro/api",

  rtKey: pick("ROUNDTABLE_API_KEY", "ROUNDTABLE_KEY"),
  rtBank: pick("ROUNDTABLE_WORKSPACE_ID", "ROUNDTABLE_PROJECT") || "lp-update-orchestrator",
  rtUrl: pick("ROUNDTABLE_BASE_URL", "ROUNDTABLE_URL") || "https://roundtable.bot",
};
