# Sponsor tools: how to use them correctly (2026-10-24)

Read from the live docs this morning. Every endpoint and parameter cites its page. "Untested" means the docs don't say, so run the test before building on it. Key values live in `.env` only.

## Verified status (live calls with our keys, 12:1x ET)

| Tool | Status | Evidence |
|---|---|---|
| Nicrron | ✅ chat works; ⚠ structured output needs the pattern in §1 | `anthropic/claude-sonnet-5-5` answered in 2.2 s; the response header showed `x-ratelimit-limit: 10000` |
| PRISM | ✅ ingest + live connection | test trace 200; setup-doctor `credential_ok`, `live_connected`, `app_connected` all true; plan **Builder**, 200 credits |
| Akta | ✅ REST works | `GET /v1/company/search?query=dentrix` returned 200 in 16 s (slow: cache everything); plan **subscription**, 1,388.8 credits |
| Roundtable | ⏳ CLI 0.2.19 installed; **key not yet in `.env`** | see §5 |
| Solari | key set, not tested (optional) | |

---

## 1. Nicrron (LLM gateway)

**Setup checklist**
- `NICRRON_API_KEY` (`sk-af-...`, shown once, server-side only) and `NICRRON_BASE_URL=https://api.nicrron.ai/v1`. https://nicrron.ai/docs/authentication
- Use the stock OpenAI SDK with only `base_url` and the key changed. Python: `openai`. TS: `openai`. https://nicrron.ai/docs/sdks
- Model ids from `GET /v1/models` (no key needed). `anthropic/claude-sonnet-5-5`, `anthropic/claude-opus-5-5`, `anthropic/claude-haiku-5-5` and `anthropic/claude-sonnet-5` are all listed today. https://nicrron.ai/docs/api

**Calls we'll make** (all from https://nicrron.ai/docs/api)
| Call | Use | Notes |
|---|---|---|
| `POST /v1/chat/completions` | extractor-v1/v2, narrator | OpenAI body plus `models` (fallbacks, max 10) and `provider` (`order`/`only`/`ignore`/`sort`/`allow_fallbacks`) |
| `GET /v1/models` | check ids | no key needed |
| `GET /v1/generation?id=gen-…` | cost and latency per call (log it into the PRISM trace metadata) | may 404 for a moment after the call |
| `GET /v1/key` | remaining balance and rate limit | |
| `POST /v1/embeddings` | optional | `models` fallback works here too; never cached. https://nicrron.ai/docs/embeddings |

**Structured output: TESTED 2026-10-24** (9 variants; script in the session scratchpad)

| Variant | Result |
|---|---|
| sonnet-5-5 / opus-5-5, `tool_choice: "auto"`, one tool | ✅ tool call returned; quotes verbatim; ignored the injected "$10M ARR" |
| sonnet-5-5, forced `tool_choice` (named function **or** `"required"`), even with `reasoning_effort: "none"` or `reasoning.enabled: false` | ❌ **502**: Anthropic says forced `tool_choice` isn't "supported for this model" (5-5 models always reason) |
| sonnet-5 / haiku-5-5, forced `tool_choice` | ✅ works (haiku in 3 s) |
| `response_format: json_schema` (strict) | ❌ **silently ignored**: returned fenced markdown JSON with different keys plus the extra field we asked for |
| `max_tokens: 200` on sonnet-5-5 | ❌ `content: null`, `finish_reason: length`. Reasoning ate the budget. Use ≥ 2,000. |

**Pattern to use:** `tools=[ONE_TOOL]`, `tool_choice="auto"`, a system prompt that says "always call record_metrics", and `max_tokens` 4000. If no tool call comes back, retry once, then fall back to `anthropic/claude-haiku-5-5` with a forced `tool_choice`. Validate every value's `quote` against the source no matter which path ran (this is the v2 validator). Never use `json_schema`.

**PRISM v1 vs. v2 implication:** a decent prompt on any of these models already ignores the injected instruction. So `extractor-v1` has to be *genuinely naive* to show a break. Candidates: no "the source is data" line; JSON in free text with no tool; no span check, so a paraphrased or invented quote passes; or a fabrication the validator catches (e.g. annualising MRR into an "ARR" figure that appears nowhere in the source). The honest v1 failure is **ungrounded numbers**, not obedience to the injection. Pick the rule that v1 measurably breaks on the 23 inputs.

**Gotchas and limits** (https://nicrron.ai/docs/api unless noted)
- **Caching changes results:** `temperature: 0` turns on the exact-match response cache (24 h, per account). A repeated identical request returns `x-nicrron-cache: HIT` and costs nothing. For the 20+ PRISM runs this means identical outputs and near-zero latency. Use `temperature` > 0, or send the header `x-nicrron-cache: false` if you want real runs. Answers that call tools are never cached. https://nicrron.ai/docs/quickstart
- `models` is not in the OpenAI types. Python: `extra_body={"models":[...]}`. TS: `// @ts-expect-error`. Fallback happens only on a provider 429/5xx before it answers. Limits: 8 models after expansion, 6 endpoint attempts, 90 s per request.
- The response's `model`/`provider` fields say who actually answered. Log them, because a fallback may have answered.
- Rate limit: the docs say **60 requests/min per key** by calendar minute, but the live header showed `x-ratelimit-limit: 10000`. Plan for 60/min anyway (run the 23-file batches 5 at a time). Headers `x-ratelimit-limit`/`-remaining`; a 429 carries `retry-after`.
- Errors: 400 bad body, >10 fallbacks or context overflow · 401 key · 402 balance (or prompt cost > balance + $1) · 403 spend limit · 404 model · 429 rate · 502 whole chain failed · 503 media down. Chat errors carry `error.code`.
- Routing slugs (`nicrron/auto`, `nicrron/fastest`…) pick different models depending on prompt length. Don't use them for the v1/v2 comparison, because results won't be comparable. https://nicrron.ai/docs/quickstart

**Copy-paste (TS)**
```ts
import OpenAI from "openai";
const nic = new OpenAI({ baseURL: process.env.NICRRON_BASE_URL, apiKey: process.env.NICRRON_API_KEY });
const r = await nic.chat.completions.create({
  model: process.env.NICRRON_MODEL_EXTRACTOR!, messages, temperature: 0.2,
  // @ts-expect-error Nicrron field
  models: process.env.NICRRON_FALLBACK_MODELS?.split(","),
});
```

**Open questions:** Does `json_schema` work (run the test)? Does the 60/min limit apply per key, so that teammates should each have their own key?

---

## 2. akta.pro (comparables, funding rounds, outside signals)

**Setup checklist**
- `AKTA_API_KEY` sent as `x-api-key: <key>` (raw key, no Bearer). Base `https://api.akta.pro/api`. https://docs.akta.pro/api-reference/supporting-apis/company-search.md
- Our plan is Pro $50, which is the **"Sub 50"** tier: global 100/min; company/industry search 400/day; company data 1,500/mo; list generation **100/mo**; alt-data **10/min · 750/mo**. https://docs.akta.pro/getting-started/rate-limits.md
- Credits cost $0.04 each on subscription. https://docs.akta.pro/getting-started/pricing.md
- The company id is a short Akta id such as `00000l1`, returned by company search. Never construct one.

**Calls we'll make** (credits from https://docs.akta.pro/getting-started/pricing.md)
| Endpoint | Method + path | Key params | Credits |
|---|---|---|---|
| Company search ([ref](https://docs.akta.pro/api-reference/supporting-apis/company-search.md)) | `GET /v1/company/search` | `query` (name or website) → `data[].uuid,name,website,product_category,company_status` | 0 |
| Industry search ([ref](https://docs.akta.pro/api-reference/supporting-apis/industry-search.md)) | `GET /v1/industry/search/` | `query`, `level` = `l1`..`l4`,`all` (comma list; default `l4`) → `data[].code,industry_name,similarity` | 0 |
| Filter builder ([ref](https://docs.akta.pro/api-reference/supporting-apis/filter-builder.md)) | `POST /v1/list/filter-builder/` | body `{"query": "..."}` → `data.filters` | 2.5 |
| List generation ([ref](https://docs.akta.pro/api-reference/listgen-api.md)) | `POST /v1/list/generate/companies/` | `filters` **or** `query` (not both), `sections[]`, `sort_by`, `sort_order`, `limit` (default 50, max 500), `offset` | 1.5 + 2.5 if `query` + 0.2/company + section cost × companies |
| Company data ([ref](https://docs.akta.pro/api-reference/company-data.md)) | `GET /v1/company/enrichment` | `company` (id or website), `sections` (comma list) | per section: `funding_detail` 3, `firmographic` 2, `financial_estimate` 0.5, `mna_and_investment` 5 … |
| News signals ([ref](https://docs.akta.pro/api-reference/news-signals.md)) | `GET /v1/news` | `company` / `primary_company` / `industry` / `query` / `title`, `type_list`, `start_date`, `end_date`, `limit` (≤100), `unique_article`, `sentiment_list` | 0.1/call + 0.01/article |
| Headcount ([ref](https://docs.akta.pro/api-reference/alternative-data/headcount-trends.md)) | `GET /v1/company/headcount-trends` | `company` | 2.5 |
| Website traffic ([ref](https://docs.akta.pro/api-reference/alternative-data/website-traffic.md)) | `GET /v1/company/website-traffic` | `company` | 1.5 |
| Job posts ([ref](https://docs.akta.pro/api-reference/alternative-data/job-posts.md)) | `GET /v1/company/jobs` | `company`, `limit` (default 10), `offset` | 4 per 10 records |

Useful list filters (all AND-ed): `industry.industry` (codes from industry search), `business_model.offering_type` [`software`], `business_model.revenue_model` [`subscription_recurring`], `business_model.gtm_type` [`b2b`], `location.hq.country` [`USA`], `funding_detail.funding_overview.funding_stage` [`seed`,`series_a`,…], `funding_detail.funding_overview.last_funding_date` {`gte`:"YYYY-MM-DD"}, `funding_detail.funding_rounds` {`round`,`date`,`amount_usd`}. Sort with `sort_by=total_funding`. https://docs.akta.pro/api-reference/listgen-api.md
News type codes: `CM01` Equity Fund-Raising, `CM09` Valuation Events, `CM02` Debt Financing. https://docs.akta.pro/news-types.md

**Recipe: 5 real comparables for a fictional dental-practice SaaS, plus their latest rounds** (about 47 credits ≈ $1.90)
1. `GET /v1/industry/search/?query=dental practice management software&level=l4,l3` (free). Keep the top 2–3 `code`s by `similarity`, and save `industry_name` for the citation.
2. `POST /v1/list/generate/companies/` (1.5 + 0.2×5 = 2.5 credits; uses 1 of 100/mo):
   `{"filters":{"industry.industry":[codes],"business_model.offering_type":["software"],"firmographic.company_type":["private"]},"sort_by":"total_funding","sort_order":"desc","limit":5}`.
   Don't request `sections` here: it multiplies cost by the number of companies. If the list comes back empty, run filter-builder with "dental practice management SaaS companies in the US" (2.5) and reuse its `filters`.
3. For each of the 5 ids: `GET /v1/company/enrichment?company=<id>&sections=funding_detail` (3 each = 15). Read `funding_detail.funding_overview.{funding_stage,last_funding_date,total_funding_usd}` and `funding_rounds[].{round,date,amount_usd,investors}`.
4. For each id: `GET /v1/news?company=<id>&type_list=CM01&limit=5` (≈0.15 each). Cite the article `id`/URL as provenance for the round.
5. Optional outside signal on 1–2 comps: `headcount-trends` (2.5). Watch the 10/min limit.

**Gotchas and limits**
- **Leaving out `sections` on company data returns ALL sections and bills each one** (about 26 credits). Always pass `sections`. https://docs.akta.pro/api-reference/company-data.md
- `funding_detail` on subscription is a **trimmed view** (first 3 rounds, month-year dates, with a note on what's withheld). Show "per Akta, partial view" in the UI. https://docs.akta.pro/getting-started/pricing.md
- The news page says non-enterprise plans have a **6-month lookback** on `start_date`. The Akta MCP server's own instructions say subscription gets 1 year. Assume 6 months. https://docs.akta.pro/api-reference/news-signals.md
- `query` and `filters` are mutually exclusive in list generation, and so are `company` and `primary_company` (and `query` and `title`) in news.
- Doc examples use trailing slashes (`/v1/industry/search/`, `/v1/list/generate/companies/`). Copy the path exactly as shown.
- Errors: 400/422 means fix the input; 401 retry once; 403 means the plan doesn't include it; 429 backoff from 1 s to 60 s; 500 up to 3 retries; 502/503 up to 5. https://docs.akta.pro/getting-started/error-codes.md
- An empty result can come back as **204 No Content** (company search, industry search). Handle a missing body.

**Copy-paste (Python)**
```python
import os, httpx
ak = httpx.Client(base_url=os.environ["AKTA_BASE_URL"], headers={"x-api-key": os.environ["AKTA_API_KEY"]}, timeout=60)
codes = [d["code"] for d in ak.get("/v1/industry/search/", params={"query":"dental practice management software","level":"l4,l3"}).json()["data"][:3]]
comps = ak.post("/v1/list/generate/companies/", json={"filters":{"industry.industry":codes,
        "business_model.offering_type":["software"]},"sort_by":"total_funding","limit":5}).json()["data"]
for c in comps:
    fd = ak.get("/v1/company/enrichment", params={"company":c["uuid"],"sections":"funding_detail"}).json()
    news = ak.get("/v1/news", params={"company":c["uuid"],"type_list":"CM01","limit":5}).json()
```
Cache every Akta response to `data/akta_cache/*.json` and replay it in the demo. That protects the 100/mo list quota.

**Open questions:** Are the trimmed "first 3 rounds" the earliest or the latest rounds? If they're the earliest, use the news from step 4 for the latest round. Does REST `type_list` take `CM01` codes? (The docs link the code table; check it on the first call.)

---

## 3. PRISM by Block Convey (tracing, audit trail, v1-vs-v2)

**Setup checklist** (https://blockconvey.com/docs)
- `PRISMTRACE_HOST=https://prism.blockconvey.com` (ingest), `PRISMTRACE_PROJECT_ID` (UUID, from Settings → Project), `PRISMTRACE_API_KEY` (`pt-sk-...`, **ingest** scope).
- The guardrail evaluate, Knowledge Base and MCP endpoints live on a different host: `https://api.prism.blockconvey.com`.
- **MCP uses a separate management key**, created under Developers → AI assistant (MCP). It's sent as `Authorization: Bearer pt-sk-...`. Ingest keys are refused there on purpose, and creating a new management key retires the old one after 7 days.
- `pip install "prismtrace-sdk>=0.4.3"` (current release 0.5.3); import it as `prismtrace`. There's no npm package: JS posts JSON to `/api/traces`.
- Guardrails, Evaluators Hub and every MCP **write** (add guardrail, policy doc or evaluator) need the **Builder plan**, at 5 credits each. Free can only read. Check `prism_overview` for our plan right away.
- Verify the connection with `GET $HOST/api/setup-doctor?project_id=…` and read `live_connected`/`blocked_step`, or run `python -m prismtrace.verify`.

**Calls we'll make**
| Call | Purpose |
|---|---|
| `PRISMtrace(...).trace_llm(...)` → `POST /api/traces` | one trace per extraction call |
| `POST https://prism.blockconvey.com/api/traces` (header `X-PRISMtrace-Key`) | TS/JS path. Required: `project_id, model, input_messages, output_message, latency_ms`. Optional: `session_id, agent_id, agent_name, trace_id, token_count_*, metadata` |
| `POST https://api.prism.blockconvey.com/api/guardrails/evaluate` | pre-check the founder text for injection before calling the model. Body `{project_id, messages, trace_id?, agent_id?}` → `blocked`, `evaluated`, `rule_name`, `fallback_message` |
| MCP `prism_find_traces(agent_name, status="any")`, `prism_list_issues`, `prism_get_trace` | v1-vs-v2 evidence (free) |
| MCP `prism_add_guardrail`, `prism_add_policy_document`, `prism_add_evaluator`, `prism_run_evaluator` | the "rule added through MCP" beat |

**Recipe A: trace one extraction from Python (manual client).** The docs name `PRISMtrace` with `trace_llm`, `submit_trajectory` and a `trace` decorator. The signature below is from the published `prismtrace-sdk` 0.5.3 source (`prismtrace/client.py`), because the docs page lists the symbol without its arguments.
```python
import os, time, json, prismtrace
from prismtrace import PRISMtrace
pt = PRISMtrace(api_key=os.environ["PRISMTRACE_API_KEY"], host=os.environ["PRISMTRACE_HOST"],
                project_id=os.environ["PRISMTRACE_PROJECT_ID"])
def extract(update_text, company_id, agent="extractor-v1", run_id="run-1"):
    msgs = [{"role":"system","content":SYSTEM_PROMPT[agent]}, {"role":"user","content":update_text}]
    t0 = time.time()
    r = nic.chat.completions.create(model=os.environ["NICRRON_MODEL_EXTRACTOR"], messages=msgs, tools=TOOLS,
                                    tool_choice=FORCE, temperature=0.2)
    out = r.choices[0].message.tool_calls[0].function.arguments
    pt.trace_llm(model=r.model, input_messages=msgs, output=out, latency_ms=int((time.time()-t0)*1000),
                 token_count_input=r.usage.prompt_tokens, token_count_output=r.usage.completion_tokens,
                 agent_id=agent, agent_name=agent, session_id=f"{agent}:{run_id}:{company_id}",
                 trace_id=f"{agent}:{run_id}:{company_id}", metadata={"nicrron_id": r.id, "input_file": company_id})
    return json.loads(out)
# ... at exit:
pt.flush(); pt.close()
```
- `trace_llm` posts on a background thread. Call `pt.flush()`/`pt.close()` before a script exits, or the last traces are lost (an atexit hook exists, but don't rely on it).
- **Send both `agent_id` and `agent_name`.** `agent_id` is the stable identity that rules and Model Inventory key on. `prism_find_traces` filters by `agent_name`.
- `trace_id` is idempotent: re-sending the same id returns the existing trace. Use a new `run_id` per batch, or reruns won't be recorded.
- A `session_id` can't be backfilled. Send it from the first trace.

**Recipe B: 20+ runs as extractor-v1, then extractor-v2.** The docs pattern for checking a fix: run the new version under its own agent name, on the same inputs.
1. Fix the input list (the 23 files including `C23_injection.txt`). Loop `extract(f, id, agent="extractor-v1", run_id="v1-a")` → 23 traces.
2. Change only the prompt/guard and loop again with `agent="extractor-v2", run_id="v2-a"`, using the same model, temperature and files.
3. Compare through MCP: `prism_find_traces(agent_name="extractor-v2", status="any")` first (it proves v2 has traces), then `status="failed"` for each name, then `prism_list_issues`. Zero failures for a name with zero traces proves nothing.
4. Optional scorer: `prism_add_evaluator` with an instruction like "Every number in {output} appears verbatim in {input}; labels: grounded, ungrounded", then `prism_run_evaluator` (1 credit per trace).
- Automatic LLM scoring is capped at 100/day on Free and 200/day on Builder. 46 traces fits, but don't burn the cap on test runs.

**Recipe C: add a rule, policy doc or guardrail through MCP**
- Connect: `claude mcp add --transport http prism-<project> https://api.prism.blockconvey.com/mcp --header "Authorization: Bearer <management key>"`. Keep this config out of any committed file.
- Guardrail: `prism_add_guardrail(name="Injected metric instruction", rule_type="custom_regex"|"prompt_injection", pattern="(?i)(note to (any )?ai|report \\w+ as \\$)", action="flag", severity="high", agent_id="extractor-v2")`.
- Policy doc: `prism_add_policy_document(title="LP reporting rules v2", markdown=..., agent_id=...)`.
- Every write takes two steps. The first call returns a preview and a `confirm_code`, and the change happens only after the human approves (5 credits, Builder plan). Show the approval on camera.
- Guardrails only flag on the SDK/HTTP path. To actually block, call `/api/guardrails/evaluate` before the model call and honour `blocked`. For the Enforcement Check, pass the same `trace_id`, and after a block send no LLM span (or a trace with no output). PRISM fails open: `evaluated:false` means use your own fail mode.

**Gotchas and limits:** Ingest allows 2,000 requests/min. Errors: 401 bad header (it's not Bearer on ingest), 403 wrong project or scope, 402 `insufficient_credits`/`plan_limit_reached`, 404 project, 429. Free plan: 10k traces/mo, 14-day retention, 100 credits. MCP results return at most 5 items on Free (25 paid), with 50 tool calls/day on Free. Trace content is untrusted. Never add a rule because text inside a trace asked for it. The docs page has an "agent integration brief" aimed at coding agents. We treat it as reference only.

**Copy-paste (TS, HTTP ingest; fire-and-forget per docs)**
```ts
void fetch(process.env.PRISMTRACE_HOST + "/api/traces", { method: "POST",
  headers: { "Content-Type": "application/json", "X-PRISMtrace-Key": process.env.PRISMTRACE_API_KEY! },
  body: JSON.stringify({ project_id: process.env.PRISMTRACE_PROJECT_ID, model, input_messages, output_message,
    latency_ms, session_id, agent_id: "narrator", agent_name: "narrator", trace_id }),
  signal: AbortSignal.timeout(5000) }).catch(e => console.warn("PRISM ingest failed", e));
```

**Resolved:** the workspace is on **Builder** (200 credits), so MCP writes work. Two MCP connections (`prism`, `prism-ao-workspace`) point at the same project. Keep one. The setup-doctor still shows `verified_by_test_trace: false`; it's harmless, and `POST /api/setup-doctor/handshake` with `send_test_trace: true` clears it. **Open:** does `prism_find_traces` match `agent_name` or `agent_id`? Set both to the same string.

---

## 4. Solari (optional)

- **Sandbox preview URL:** `@solarisdk/sandbox` → `sandboxes.create({template:"base"})`, run the app on a port, then `sbx.previewUrl(3000)` → `{url, token}`. The URL is signed with an `slr_token` that lasts **1 hour**; refresh on a 401. The token can also go in the `x-solari-preview-token` header. Base `https://api.getsolari.com`. Possible use: a judge-clickable live demo URL. https://docs.getsolari.com/sandboxes
- **Recorded browser replay:** `client.launch({ recording: true })`, then `client.sessions.getReplayUrl(sessionId)` → `{url, expiresInSeconds}`, or `downloadReplay` for NDJSON. Possible use: a recorded "LP clicks a number → lands on the source span" walkthrough as backup for the video. Recordings capture input values, so use no real credentials. https://docs.getsolari.com/recording
- Close browsers and `sbx.kill()` when done. JS SDK only (`npm install @solarisdk/browser|sandbox`). https://docs.getsolari.com

---

## 5. Roundtable

Sources: the quick-start text you pasted, plus https://roundtable.bot/docs/bots, /docs/start, /docs/cli and /docs/talk (all public). Templates: https://github.com/roundtable-bot/roundtable-cli/tree/main/templates

**Setup checklist**
- Account at roundtable.bot/sign-up with event code `VCHACK` (done).
- **Key:** Agents → Connect agent → **Assistant** (e.g. `lp-update-orchestrator`). The key is the value after `Authorization: Bearer`, shown once. Put it in `.env` as `ROUNDTABLE_KEY`. Use an *Assistant* key: a coding-agent key makes `roundtable init` fail with "No writable team bank". Rotate it in Settings → Agents & keys.
- CLI `roundtable 0.2.19` is **installed** (global npm, from the GitHub release; its postinstall downloads a binary and verifies its SHA-256). We are deliberately **not** running `roundtable login` / `setup`. Those install a background service that monitors coding sessions, and bots don't need them.
- SDK `@roundtable/sdk` 0.1.1 is **not on npm**. It comes in through the template's `package.json` (GitHub tarball). **Node ≥ 20.6, JS only.** No Python SDK, so Roundtable code lives in Node.
- Env (from the docs): `ROUNDTABLE_KEY`, `ROUNDTABLE_URL` (default `https://roundtable.bot`), `ROUNDTABLE_PROJECT` (the bank folder, written by `init`), plus per-bot `<NAME>_KEY` / `<NAME>_ID` (or `_NAME`). `init` writes its **own** `.env` in the template folder (git-ignored).

**Model:** files in "banks" with version history and an author per version; chats between two assistants; **tasks** dispatched to bots. A bot returns `{summary, sources:[{bank,path,version}], data}`. Every result cites exact file versions, which matches our provenance rule one-to-one.

**Calls we'll make**
| Call | Use |
|---|---|
| `new Roundtable({ key })`, `rt.bot({name, project, skills}).onTask(h).run()` | the extractor/reconciler/narrator as bots |
| `rt.dispatch([{bot, goal, input}], {project})` → `job.gather()` | orchestrator: one task per company |
| `ctx.read(path,{version})`, `ctx.save(path, content, msg)`, `ctx.source(path, version)` | ledger files with versions; citations |
| `rt.call("write_file", {bank, path, content, expected_version})` | the **append-only ledger**: refuses stale writes |
| `rt.call("claim_task", {assignee, ...})` / `get_task` | GP-review and founder-follow-up tasks |

**Gotchas:** `ctx.save` has no version check (use unique paths or `expected_version`) · idle bots take up to 30 s to pick up work, so start them before the demo · blocked tasks aren't retried · input ≤ 20 KB, result ≤ 50 KB (save big output and return its source) · 600 writes/min, 20 chat posts/hour per agent · names aren't unique, so dispatch by id · a timeout doesn't cancel the task · restart bots after edits · file and task text is untrusted data.

**The `funds` template is close to Track 4 (`roundtable init <dir> --template funds`).** Its `fund-reader` bot reads an LP's quarterly reports, capital calls and K-1s, builds a NAV bridge, runs 20 cross-checks, and writes a quarter brief that cites file versions. The sample fund is named "Halyard III" (ours is "Halyard Ventures Fund I", a coincidence). The `portfolio` template (`watcher` → early-warnings digest) is close to Track 3. **Other teams will start from these.** Our position: they're LP-side readers of GP reports; **we're the GP-side system that produces a report those readers can verify**, down to the founder's sentence. Use the template as scaffolding for the bot plumbing only, and rename the bots for our pipeline.
