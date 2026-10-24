// Deterministic reconciler: extraction JSONs + Q2 key + marks + frameworks + internal exports -> app/out/ledger.json.
// SYNTHETIC: every input is the fictional Halyard data pack; the ledger says so ("synthetic": true).
// No network, no LLM. Usage: node app/reconcile.mjs [--input app/out/v2]
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const APP = dirname(fileURLToPath(import.meta.url));
const ROOT = join(APP, "..");
const PACK = join(ROOT, "data-pack");
const readJson = (p) => JSON.parse(readFileSync(p, "utf8"));

const argIdx = process.argv.indexOf("--input");
const inputDir = resolve(ROOT, argIdx > -1 ? process.argv[argIdx + 1] : "app/out/v2");

// ---------- inputs ----------
const keyQ3 = Object.fromEntries(readJson(join(PACK, "answer_key/q3_2026_metrics.json")).companies.map((c) => [c.company_id, c]));
const keyQ2 = Object.fromEntries(readJson(join(PACK, "answer_key/q2_2026_metrics.json")).companies.map((c) => [c.company_id, c]));
const fundKey = readJson(join(PACK, "answer_key/q3_2026_fund_metrics.json"));
const segmentsCfg = readJson(join(PACK, "frameworks/segments.json"));
const agreements = Object.fromEntries(readJson(join(PACK, "frameworks/agreements.json")).agreements.map((a) => [a.company_id, a]));

const extracted = {};
if (existsSync(inputDir)) {
  for (const f of readdirSync(inputDir).filter((f) => f.endsWith(".json"))) {
    const j = readJson(join(inputDir, f));
    if (j && /^C\d{2}$/.test(j.company_id || "")) extracted[j.company_id] = j;
  }
}
const usingInput = Object.keys(extracted).length > 0;
const input_source = usingInput ? relative(ROOT, inputDir) : "answer_key_fallback";
const fallbackIds = [];

function parseCsv(path) {
  const lines = readFileSync(path, "utf8").split(/\r?\n/).filter((l) => l && !l.startsWith("#"));
  const head = lines[0].split(",");
  return lines.slice(1).map((l) => Object.fromEntries(l.split(",").map((v, i) => [head[i], v])));
}
// portfolio_marks.csv has quoted fields with commas (hq), so split on commas outside quotes
const marks = {};
const [marksHead, ...marksRows] = readFileSync(join(PACK, "fund/portfolio_marks.csv"), "utf8").split("\n").filter(Boolean);
for (const line of marksRows) {
  const cells = line.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/).map((c) => c.replace(/^"|"$/g, ""));
  marks[cells[0]] = Object.fromEntries(marksHead.split(",").map((h, i) => [h, cells[i]]));
}

// ---------- source text (code-point spans, as the pack defines them) ----------
const textCache = {};
const codePoints = (file) => (textCache[file] ??= Array.from(readFileSync(join(PACK, file), "utf8")));
const slice = (file, s, e) => codePoints(file).slice(s, e).join("");

function founderSource(file, span, quote) {
  if (!file || !span || quote == null) return null;
  if (!existsSync(join(PACK, file))) return null;
  if (slice(file, span.start, span.end) !== quote) return null; // grounding rule: quote must string-match the founder's text
  return { kind: "founder_text", file, span: [span.start, span.end], quote };
}
function findSpan(file, re) {
  const text = codePoints(file).join("");
  const m = re.exec(text);
  if (!m) return null;
  const start = Array.from(text.slice(0, m.index)).length;
  return { start, end: start + Array.from(m[0]).length, quote: m[0] };
}

// ---------- internal systems (synthetic exports) ----------
const Q2_MONTHS = ["2026-04", "2026-05", "2026-06"];
const Q3_MONTHS = ["2026-07", "2026-08", "2026-09"];
const Q2_DATES = ["2026-04", "2026-05", "2026-06"];
const pct1 = (x) => Math.round(x * 1000) / 10;

function systemMetrics(cid) {
  const dir = join(PACK, "internal", cid);
  if (!existsSync(dir)) return null;
  const rel = (f) => `internal/${cid}/${f}`;
  const out = {};

  const inv = parseCsv(join(dir, "invoices.csv"));
  const recon = (months) => {
    const rows = inv.filter((r) => months.includes(r.month));
    const billed = rows.reduce((a, r) => a + Number(r.amount_billed), 0);
    const coll = rows.reduce((a, r) => a + Number(r.amount_collected), 0);
    return { value: pct1(coll / billed), rows };
  };
  const r3 = recon(Q3_MONTHS), r2 = recon(Q2_MONTHS);
  out.invoice_reconciliation_pct = {
    value: r3.value, prior: r2.value,
    source: { kind: "system", file: rel("invoices.csv"), row_ids: r3.rows.map((r) => r.invoice_id), formula: "sum(amount_collected) / sum(amount_billed), invoices dated 2026-07..2026-09" },
  };

  const deals = parseCsv(join(dir, "crm_deals.csv"));
  const won = (months) => deals.filter((d) => d.stage === "closed_won" && months.includes(d.closed_month));
  const founderPct = (rows) => pct1(rows.filter((d) => d.owner_role === "founder").reduce((a, d) => a + Number(d.amount), 0) / rows.reduce((a, d) => a + Number(d.amount), 0));
  const w3 = won(Q3_MONTHS), w2 = won(Q2_MONTHS);
  out.founder_closed_pct = {
    value: founderPct(w3), prior: founderPct(w2),
    source: { kind: "system", file: rel("crm_deals.csv"), row_ids: w3.map((d) => d.deal_id), formula: "founder-owned closed_won $ / all closed_won $, closed 2026-07..2026-09" },
  };
  const sum = (rows) => rows.reduce((a, d) => a + Number(d.amount), 0);
  const open = deals.filter((d) => !d.stage.startsWith("closed"));
  out._crm = { w3, w2, wonQ3: sum(w3), wonQ2: sum(w2), open, openSum: sum(open), openFounderPct: open.length ? pct1(sum(open.filter((d) => d.owner_role === "founder")) / sum(open)) : null, file: rel("crm_deals.csv") };

  const eng = parseCsv(join(dir, "eng_shipped.csv"));
  const shipped = (months) => eng.filter((e) => months.includes(e.shipped_date.slice(0, 7)));
  const e3 = shipped(Q3_MONTHS), e2 = shipped(Q2_DATES);
  out.product_velocity = {
    value: e3.length, prior: e2.length,
    source: { kind: "system", file: rel("eng_shipped.csv"), row_ids: e3.map((e) => e.item_id), formula: "count of items shipped 2026-07-01..2026-09-30" },
  };
  return out;
}

// ---------- metric presentation ----------
const LABELS = {
  monthly_revenue: "Monthly revenue", arr: "ARR", monthly_burn: "Net monthly burn", cash: "Cash", runway_months: "Runway",
  headcount: "Headcount", customers: "Customers", invoice_reconciliation_pct: "Invoice reconciliation",
  product_velocity: "Product velocity (items shipped)", founder_closed_pct: "Founder-closed share of won $",
};
const LOWER_IS_BETTER = new Set(["monthly_burn", "founder_closed_pct"]);
const usd = (n) => "$" + Math.round(n).toLocaleString("en-US");

function buildMetric(key, ext, prior, sys, target) {
  let value = null, unit = null, currency = null, source = null, verified = "unverified", priorV = null;
  if (sys && sys[key]) {
    ({ value, source } = sys[key]);
    priorV = sys[key].prior;
    unit = key === "product_velocity" ? "count" : "pct";
    verified = "system_rows";
  } else if (ext?.fields?.[key]) {
    const f = ext.fields[key];
    value = typeof f.value === "number" ? (f.unit === "currency" ? Math.round(f.value) : f.value) : f.value;
    unit = f.unit; currency = f.currency;
    source = value == null ? null : founderSource(f.source_file, f.source_span, f.quote);
    verified = source ? "founder_quote" : "unverified";
    priorV = prior?.fields?.[key]?.value ?? null;
  }
  const delta_pct = typeof value === "number" && typeof priorV === "number" && priorV !== 0 ? Math.round(((value - priorV) / priorV) * 1000) / 10 : null;
  const t = target ?? null;
  let status = "no_target";
  if (value == null) status = "not_reported";
  else if (t != null) status = (LOWER_IS_BETTER.has(key) ? value <= t : value >= t) ? "on_track" : "off_track";
  return { key, label: LABELS[key] || key, value, unit, currency, prior: priorV, delta_pct, target: t, status, verified, source };
}

// ---------- per company ----------
const RED = new Set(["low_runway", "missing_update", "unexplained_mark", "revenue_decline"]);
const companies = [];

for (const cid of Object.keys(agreements).sort()) {
  const ag = agreements[cid];
  let ext = extracted[cid];
  if (!ext) { ext = keyQ3[cid]; if (usingInput) fallbackIds.push(cid); }
  const prior = keyQ2[cid];
  const mk = marks[cid];
  const sys = systemMetrics(cid);

  const metrics = ag.metrics.map((k) => buildMetric(k, ext, prior, sys, ag.targets[k]));
  const m = Object.fromEntries(metrics.map((x) => [x.key, x]));

  // flags from the extraction, then computed ones
  const flags = (ext.flags || []).map((f) => ({
    flag: f.flag, severity: RED.has(f.flag) ? "red" : "amber",
    reason: f.quote ? `Extractor flag; founder text: "${f.quote}"` : "Extractor flag; no source text (no update received)",
    source: founderSource(f.source_file, f.source_span, f.quote),
  }));
  const has = (n) => flags.some((f) => f.flag === n);
  const rev = m.monthly_revenue, run = m.runway_months;
  const revFell = rev && typeof rev.value === "number" && typeof rev.prior === "number" && rev.value < rev.prior;
  const lowRun = run && typeof run.value === "number" && run.value <= 6;

  if (revFell && !has("revenue_decline"))
    flags.push({ flag: "revenue_decline", severity: "red", reason: `Monthly revenue ${usd(rev.value)} vs ${usd(rev.prior)} in Q2 (${rev.delta_pct}%).`, source: rev.source });
  if (lowRun && !has("low_runway"))
    flags.push({ flag: "low_runway", severity: "red", reason: `Runway ${run.value} months (threshold 6).`, source: run.source });

  const q2 = Number(mk.mark_q2_2026_usd), q3 = Number(mk.mark_q3_2026_usd);
  if (q3 === q2 && (revFell || (run && typeof run.value === "number" && run.value < 6))) {
    const why = [revFell && `monthly revenue fell ${Math.abs(rev.delta_pct)}% (${usd(rev.prior)} to ${usd(rev.value)})`, run?.value < 6 && `runway is ${run.value} months`].filter(Boolean).join(" and ");
    flags.push({ flag: "unexplained_mark", severity: "red", reason: `Q3 mark held at ${usd(q3)} (${mk.valuation_method_q3}, last round ${mk.last_round_date}) while ${why}.`, source: rev?.source || run?.source || null });
  }
  for (const x of metrics.filter((x) => x.status === "off_track"))
    flags.push({ flag: "off_target", severity: "amber", reason: `${x.label} ${x.unit === "currency" ? usd(x.value) : x.value} vs agreed target ${x.unit === "currency" ? usd(x.target) : x.target}.`, source: x.source });
  if (m.founder_closed_pct && m.founder_closed_pct.value > 60)
    flags.push({ flag: "founder_dependent_sales", severity: "amber", reason: `${m.founder_closed_pct.value}% of Q3 closed-won $ was founder-closed (Q2: ${m.founder_closed_pct.prior}%).`, source: m.founder_closed_pct.source });
  const rc = m.invoice_reconciliation_pct;
  if (rc && typeof rc.value === "number" && typeof rc.prior === "number" && rc.prior - rc.value > 5)
    flags.push({ flag: "collections_slipping", severity: "amber", reason: `Invoice reconciliation ${rc.value}% in Q3 vs ${rc.prior}% in Q2 (${Math.round((rc.value - rc.prior) * 10) / 10} pts).`, source: rc.source });

  // claims: founder pipeline language checked against the CRM
  const claims = [];
  if (ext.source_file && existsSync(join(PACK, ext.source_file))) {
    const sp = findSpan(ext.source_file, /\b(biggest|largest|strongest|record) pipeline[^.\n]*|pipeline is the (biggest|largest|strongest)[^.\n:]*/i);
    if (sp) {
      const c = sys?._crm;
      let verdict = "unverifiable", evidence = "No CRM export connected for this company.", evidence_source = null;
      if (c) {
        // The CRM export has no prior open-pipeline snapshot, so "biggest ever" can't be tested
        // either way; report what the rows do show instead of overclaiming a contradiction.
        verdict = "unverifiable";
        evidence = `No prior-quarter pipeline snapshot in the CRM, so "biggest ever" can't be checked. What the rows show: closed-won ${usd(c.wonQ3)} in Q3 vs ${usd(c.wonQ2)} in Q2 (${Math.round(((c.wonQ3 - c.wonQ2) / c.wonQ2) * 1000) / 10}%); open pipeline ${usd(c.openSum)} across ${c.open.length} deals, ${c.openFounderPct}% founder-owned.`;
        evidence_source = { kind: "system", file: c.file, row_ids: [...c.w2, ...c.w3, ...c.open].map((d) => d.deal_id), formula: "sum(amount) where stage=closed_won by quarter of closed_month; open = stage not closed_*" };
      }
      claims.push({ claim: sp.quote, source: { kind: "founder_text", file: ext.source_file, span: [sp.start, sp.end], quote: sp.quote }, check: "CRM open pipeline and closed-won, Q3 vs Q2", verdict, evidence, evidence_source });
    }
  }

  let reason = null;
  if (q3 !== q2) {
    const own = mk.ownership_pct_q2_2026 !== mk.ownership_pct_q3_2026 ? `; ownership ${mk.ownership_pct_q2_2026}% to ${mk.ownership_pct_q3_2026}%` : "";
    reason = `New round at $${Number(mk.last_round_post_money_usd) / 1e6}M post (${mk.last_round_date})${own}.`;
  }

  companies.push({
    company_id: cid, company: mk.company, sector: mk.sector, segment: ag.segment, stage: ag.stage,
    update_status: ext.update_status,
    framework: { metrics: ag.metrics, targets: ag.targets },
    metrics,
    mark: { q2_usd: q2, q3_usd: q3, method_q3: mk.valuation_method_q3, change_pct: Math.round(((q3 - q2) / q2) * 1000) / 10, reason },
    flags, claims,
  });
}

// ---------- roll-ups ----------
const segments = Object.keys(segmentsCfg.segments).map((segment) => {
  const cs = companies.filter((c) => c.segment === segment);
  const red = cs.filter((c) => c.flags.some((f) => f.severity === "red")).length;
  const amber = cs.filter((c) => !c.flags.some((f) => f.severity === "red") && c.flags.some((f) => f.severity === "amber")).length;
  return { segment, company_ids: cs.map((c) => c.company_id), summary: { n: cs.length, red, amber } };
}).filter((s) => s.summary.n > 0);

const pq = fundKey.prior_quarter;
const ledger = {
  period: "2026-Q3", generated_at: new Date().toISOString(), synthetic: true, input_source,
  ...(fallbackIds.length ? { input_fallback_company_ids: fallbackIds } : {}),
  fund: {
    nav_usd: fundKey.nav_usd, tvpi: fundKey.tvpi, dpi: fundKey.dpi, net_irr: fundKey.net_irr_estimate_pct,
    label: "Computed by the synthetic fund model (data-pack answer key); net_irr in percent.",
    prior: { period: pq.quarter, nav_usd: pq.nav_usd, tvpi: pq.tvpi, dpi: pq.dpi, net_irr: pq.net_irr_estimate_pct },
  },
  segments, companies,
};

mkdirSync(join(APP, "out"), { recursive: true });
writeFileSync(join(APP, "out/ledger.json"), JSON.stringify(ledger, null, 2) + "\n");
console.log(`ledger: ${companies.length} companies, input_source=${input_source}${fallbackIds.length ? ` (answer-key fill for ${fallbackIds.length})` : ""} -> app/out/ledger.json`);
