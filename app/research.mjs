// Real public data (Akta) for the segment Gantrell competes in: product launches, regulatory
// approvals and funding rounds. Cached in app/data/akta_cache/ so the demo replays for free.
// Usage: node app/research.mjs   → app/data/segment_dental_raw.json
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { APP } from "./lib/env.mjs";
import { akta } from "./lib/sponsors.mjs";

export const COMPS = [
  { akta_id: "00002m5", name: "Overjet", category: "Dental AI" },
  { akta_id: "00002dz", name: "Pearl", category: "Dental AI" },
  { akta_id: "00002z9", name: "Videa", category: "Dental AI" },
  { akta_id: "0000gqh", name: "CareStack", category: "Practice management" },
  { akta_id: "0005yzu", name: "Planet DDS", category: "Practice management" },
  { akta_id: "0000ees", name: "Weave", category: "Patient communication (public)" },
];
const START = process.env.START || "2025-10-25";

// Universe mode: every portco + its Akta-defined peers, deduped; `groups` maps each portco to its set.
const UNI = join(APP, "data", "universe.json");
export const universe = existsSync(UNI) ? JSON.parse(readFileSync(UNI, "utf8")) : null;
export const GROUPS = universe ? universe.funds.flatMap((f) => f.portcos.map((p) => ({ fund: f.name, fund_akta_id: f.akta_id, portco: p.name, portco_akta_id: p.akta_id, members: [p.akta_id, ...p.peers.map((x) => x.akta_id)] }))) : null;
const ALL = universe ? [...new Map(universe.funds.flatMap((f) => f.portcos.flatMap((p) => [{ akta_id: p.akta_id, name: p.name, category: p.product_category ?? "" }, ...p.peers.map((x) => ({ akta_id: x.akta_id, name: x.name.replace(/ \(.*\)$/, ""), category: x.peer_type ?? "" }))])).map((c) => [c.akta_id, c])).values()] : COMPS;

const main = process.argv[1] && import.meta.url.endsWith(process.argv[1].split("/").pop());
const out = { fetched_at: new Date().toISOString(), window: { start: START, end: "2026-10-24" }, source: "akta.pro REST: news (SD01 launches, RC01 approvals, CM01 equity), company enrichment (funding_detail, product_offering, strategic_signal, financial_estimate, company_assessment), headcount-trends", companies: [] };
async function pull(c) {
  const rec = { ...c, launches: [], approvals: [], funding_news: [], funding_detail: null, headcount: null, errors: [] };
  const news = async (types, limit) => (await akta("GET", "/v1/news", { params: { primary_company: c.akta_id, type_list: types, start_date: START, limit } })).data;
  try { rec.launches = (await news("SD01", 50))?.data ?? []; } catch (e) { rec.errors.push(String(e.message).slice(0, 200)); }
  try { rec.approvals = (await news("RC01", 20))?.data ?? []; } catch (e) { rec.errors.push(String(e.message).slice(0, 200)); }
  try { rec.funding_news = (await news("CM01", 20))?.data ?? []; } catch (e) { rec.errors.push(String(e.message).slice(0, 200)); }
  try { rec.funding_detail = (await akta("GET", "/v1/company/enrichment", { params: { company: c.akta_id, sections: "funding_detail,product_offering,strategic_signal,financial_estimate,company_assessment" } })).data; } catch (e) { rec.errors.push(String(e.message).slice(0, 200)); }
  try { rec.headcount = (await akta("GET", "/v1/company/headcount-trends", { params: { company: c.akta_id } })).data; } catch (e) { rec.errors.push(String(e.message).slice(0, 200)); }
  console.log(c.name, "launches", rec.launches.length, "approvals", rec.approvals.length, "funding news", rec.funding_news.length, rec.errors.length ? rec.errors : "");
  out.companies.push(rec);
}
if (main) { const q = [...ALL]; await Promise.all(Array.from({ length: 5 }, async () => { while (q.length) await pull(q.shift()); })); }
if (main) { out.groups = GROUPS; writeFileSync(join(APP, "data", universe ? "universe_raw.json" : "segment_dental_raw.json"), JSON.stringify(out, null, 2)); }
