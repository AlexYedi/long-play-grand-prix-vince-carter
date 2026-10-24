# Plan v3: the reporting agreement (2026-10-24, 13:35 ET)

Supersedes `docs/plan-v2.md` where they differ. Plan-v2's sponsor-tool notes, rubric and evidence still hold.

## Thesis
Investor and company agree a reporting framework once. Agents run it every quarter. Every claim arrives verified and cited, so executives only review and approve. The same verified data rolls up into the GP's portfolio analysis and an LP report, and LPs' questions flow back down.

**The reporting agreement:** a per-company framework set by fund thesis, business model, size, stage and the goals the founder stated. Changing it is near-free because agents run the variations, not people remembering them.

**Headless first (13:38):** the product is an MCP server (`app/mcp.mjs`) over the verified ledger. The GP connects the agent of their choice and asks in plain English; every answer can pull its source (`get_source`). The web page is the rendered, shareable version produced by a design layer on top of the same data, not the product's main surface. Tools: `portfolio_overview` (with `group_by`), `get_company`, `find_companies`, `get_source`, `annotate` (append-only), `ask_question`, `render_guidelines`, `share_view`.

**Tailored harnessing at every layer (13:41):** one verified ledger, with a `lens` per layer: `company` (its own agreement), `gp` (full view, sliced by segment/stage/sector/thesis), `lp` (GP-approved companies only, internal rows withheld). Agents slice in plain English; `render_guidelines` is the design layer that turns any slice into a forwardable artifact. Customization is config (agreements + lenses + render formats), so it scales without people re-learning each variation.

**Real data layer (14:12):** the fund stays synthetic (rules: public or synthetic only; no invented private records about real companies). The market around it is real: `app/research.mjs` pulls akta.pro private-company data for Gantrell's competitive set (Overjet, Pearl, Videa, CareStack, Planet DDS, Weave): launch and regulatory news, strategic signals, product catalog, moats and peers, revenue/valuation estimates, funding, monthly headcount. `app/launches.mjs` tiers every launch (T1/T2/T3) with a verbatim-quote grounding check, collapses duplicate reports, and computes weighted launch velocity per 90 days, per 100 employees, vs. segment median, and before/after the latest round (only Overjet's Dec 2025 round falls in the 12-month window: 3.5 → 2.3; small n). Clay cross-checks firmographics (headcount, revenue band, funding range). MCP tool: `segment_product_velocity`.

**Real funds (14:27):** the market layer is rebuilt around two real funds chosen by Alex: **March Capital** (Akta `000086d`, 72 portcos in Akta) with Overjet, Snorkel AI, Forter; **Left Lane Capital** (`00004a4`, 93) with Pearl, GlossGenius, Talkiatry. Each portco's competitor set = Akta's own `company_assessment.peers` (4 each; 27 unique real companies). `app/universe.mjs` → `research.mjs` → `launches.mjs` / `adoption.mjs` produce per-portco rank vs. its competitors on tiered launch velocity and new public customers (last 90 days vs. prior quarterly average). MCP: `fund_portfolio`. Fund marks, LP capital accounts, founder updates and CRM rows are private and are NOT fabricated for these funds; the synthetic Halyard fund remains only as the illustration of the GP-side workflow (founder update → verified ledger → LP letter).

**Connector roadmap (slide):** Crunchbase (funding, overlaps Akta), Carta and AngelList (the GP's own proprietary cap-table/SPV/LP data, via the GP's account), X (social; Akta already covers social posts).

## Three layers
| Layer | Agents | Output | Approver |
|---|---|---|---|
| Company | Collector (founder text + internal systems) · Extractor · Verifier (quote must match source; claims checked against system data) | Verified metrics against the agreed framework, cited | Company execs |
| GP | Company analyst · Fund trend · Segment · Researcher (Akta) · Synthesizer | Fund view by segment; LP-ready report | GP |
| LP | LP view (GP-controlled tiers) · public-data-only version | Report with click-through; questions back | — |

Feedback loop: highlight → ask → Roundtable task to the company or GP team → the answer becomes a cited entry.

## Framework dimensions
Thesis/business model (SaaS: MRR, retention · payments: volume, take rate · services: billings, no ARR) · stage/size · stated goals as the target line · cross-function health: **invoice reconciliation %** (finance), **product velocity** (product), **founder-closed vs. team-closed deals and $** (sales repeatability) · maturity tier.

## Build (solo, freeze 14:30)
| By | Build |
|---|---|
| 13:55 | Extractor v1/v2 on 22 Q3 updates + `adversarial/C23_injection.txt`; scored vs. baseline; PRISM traces under `extractor-v1`/`extractor-v2` |
| 14:10 | Frameworks per segment (`data-pack/frameworks/`), synthetic internal exports for C07 Gantrell and C01 Loomvale (`data-pack/internal/`), `app/reconcile.mjs` → `app/out/ledger.json` (deterministic) → Roundtable `ledger/2026-Q3.json` |
| 14:30 | One page: fund view by segment → company card (metrics vs. targets, verified badges, claim checks) → highlight → Ask → Approve → LP letter with click-to-source → Akta comps for Gantrell |

Fallback if behind: internal sources = Gantrell CRM claim check only.

**Vision only (slides, brief):** freehand whiteboard, public LP version, sold to company and fund operations teams, FDE implementation services, growth-tier signal.

## Demo (3 min)
1. WSIB footnote. 2. Three companies, three agreed frameworks (Gantrell SaaS, Corvellum payments, Stillmote services). 3. Gantrell: "biggest pipeline yet" vs. CRM (founder-closed share, falling invoice reconciliation) → Verifier flag → exec approves with evidence. 4. GP fund view by segment; Akta comps put the held mark in context; highlight → question to founder. 5. LP letter click-through; PRISM, measured 13:39 on the same 23 inputs: v1 (naive prompt) left Gantrell's ~4-month runway unflagged and reported ARR for 2 non-recurring businesses (C09 Stillmote $1.2M, C19); v2: 0 and 0. Scores vs. baseline 18.2%: v1 88.6% fields / 12.5% flag recall; v2 98.9% / 87.5%. Neither version ungrounded a quote or obeyed the injected "$10M ARR" (v2 reported 12 x $41.2K = $494,400). Say the grounding validator is a guarantee, not an observed v1 failure. 6. Business: platform teams buy it and bring it to companies; implementation per framework; the verified archive is the Fund II data room.

## Honesty rules
- Internal-system metrics are computed by code from synthetic rows: traceable by construction, not scored. Accuracy numbers apply only to founder-text extraction, always next to the baseline.
- "Dashboard" is the way in, not the pitch: lead with the flagged claim, the approval and the forwardable letter.
