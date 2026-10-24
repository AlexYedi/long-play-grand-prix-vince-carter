// The real universe: two funds (from Akta investor data), their selected portfolio companies, and
// each portfolio company's competitor set as Akta defines it (company_assessment.peers).
// Usage: node app/universe.mjs   → app/data/universe.json
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { APP } from "./lib/env.mjs";
import { akta } from "./lib/sponsors.mjs";

const FUNDS = [
  { name: "March Capital", akta_id: "000086d", portfolio_size_in_akta: 72, portcos: [["00002m5", "Overjet"], ["00008iv", "Snorkel AI"], ["00003id", "Forter"]] },
  { name: "Left Lane Capital", akta_id: "00004a4", portfolio_size_in_akta: 93, portcos: [["00002dz", "Pearl"], ["0000lea", "GlossGenius"], ["00000so", "Talkiatry"]] },
];
const PEERS_PER_PORTCO = 4;

const out = { built_at: new Date().toISOString(), real_data: true, source: "akta.pro: list generation by investor uuid (portfolio), company_assessment.peers (competitor set)", funds: [] };
for (const f of FUNDS) {
  const fund = { name: f.name, akta_id: f.akta_id, portfolio_size_in_akta: f.portfolio_size_in_akta, portcos: [] };
  for (const [id, name] of f.portcos) {
    const d = (await akta("GET", "/v1/company/enrichment", { params: { company: id, sections: "company_assessment,firmographic,business_model" } })).data?.data ?? {};
    const peers = (d.company_assessment?.peers ?? []).filter((p) => p.uuid && p.uuid !== id);
    const direct = peers.filter((p) => /direct/i.test(p.type?.label ?? p.type ?? ""));
    const chosen = [...direct, ...peers.filter((p) => !direct.includes(p))].slice(0, PEERS_PER_PORTCO);
    fund.portcos.push({
      akta_id: id, name, product_category: d.firmographic?.product_category ?? null,
      business_model: d.business_model?.revenue_model ?? d.business_model?.offering_type ?? null,
      peers: chosen.map((p) => ({ akta_id: p.uuid, name: p.name, peer_type: p.type?.label ?? p.type ?? null, why: p.description ?? null })),
    });
    console.log(f.name, "·", name, "→", chosen.map((p) => `${p.name} (${p.type?.label ?? p.type})`).join(", "));
  }
  out.funds.push(fund);
}
writeFileSync(join(APP, "data", "universe.json"), JSON.stringify(out, null, 2));
