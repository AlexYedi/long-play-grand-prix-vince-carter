# Provable LP Update: founder brief

**One line:** investor and company agree a reporting framework once; agents run it every quarter; every number arrives verified and cited, so executives approve exceptions and LPs can check the report instead of trusting it.

## Problem
- LPs commit capital for ten years and receive PDFs they can't verify. Washington State Investment Board publishes GP-reported IRRs noting they "have not been confirmed by the general partners" ([WSIB, 3/31/2024](https://sib.wa.gov/docs/reports/quarterly/ir033124.pdf)).
- For emerging managers the report is a fundraising asset: 79% of LPs have declined to re-up with at least one GP (Coller Capital Global PE Barometer), and ILPA's DDQ 2.0 asks a Fund II manager for every quarterly package sent to LPs for predecessor funds ([ILPA DDQ 2.0](https://ilpa.org/wp-content/uploads/2021/11/ILPA-DDQ-2.0.pdf)).
- Underneath: founder updates arrive in every format or not at all (investors send an average of 3.75 reminders per request, per Visible, a vendor), and marks move without an explanation LPs can trace.

## Customer
- **Buyer:** the emerging-manager GP (Fund I–II) and, at larger firms, the platform/operations team. **Users:** GP, portfolio-company executives (approve their numbers), LPs (read and click through).
- **Job:** close Fund II faster by making every quarter provable; hours saved are a side benefit.

## Interview evidence
**[ALEX TO FILL before submitting: number of conversations today, who (role, fund type), and one or two quotes. Run `/ingest-recording` on any recordings. Do not submit with this placeholder.]**

## Market size
- Funds I–IV took ~12% of H1-2025 commitments ([Pipeline Road citing WITHIntelligence](https://pipelineroad.com/blog/fundraising-outlook-2026)), and every fund reports every quarter.
- **Bottom-up count of emerging managers × ~$6k: not yet sized** (open item; don't quote a TAM figure on stage).

## Competition
| Player | What they do | Why we're different |
|---|---|---|
| Carta | Admin + LP portal; AI collection with tracebacks on its roadmap | Locked to its own admin; tearsheets, not a provable narrative |
| Visible | Founder data requests, AI Inbox (Premium+) | Collection by form; the narrative is still hand-written |
| Standard Metrics | Accounting connectors, AI analyst, MCP | Priced for institutional funds |
| AngelList, Sydecar, Allocations | Fund admin, K-1s, LP portal | They produce the financials, not the letter: **channel partners** |
| Roundtable `funds` template, Tamarix | LP-side readers of GP reports | We're upstream: the GP-side system that makes the report verifiable at the source |

## What we built today (working, public repo)
Extraction through Nicrron with a verbatim-quote validator: 98.9% field accuracy on 22 synthetic portfolio companies vs. 18.2% for the do-nothing baseline · reconciliation against last quarter and internal systems, with claim checks · approval gated on annotated red flags · LP letter with click-to-source · versioned ledger in Roundtable · every call traced in PRISM · a headless MCP server with company, GP and LP lenses · real market context from akta.pro for two real funds (March Capital, Left Lane Capital) against Akta-defined competitor sets.

## Business model and distribution
- **~$6k per fund per year**, 10–30% of what a small fund already pays its admin (`research/market-map.md`); implementation per reporting agreement as a services line (forward-deployed).
- **Distribution:** platform teams bring it to every portfolio company at the first board meeting, so the framework is set from day one · one verified founder update to every investor on the cap table · the LP view is free, so LPs ask their other GPs for it · first customers through emerging-manager communities (VCLab) and fund admins as partners.

## Why now
- ILPA Reporting Template v2.0 applies to funds starting on or after 2026-01-01 ([ILPA](https://ilpa.org/news/how-we-got-to-new-reporting-standards/)).
- IPEV 2025 valuation guidelines call for "robust documentation and traceability" (via KPMG, Jan 2026).
- LPs already use GenAI to monitor investments (SS&C Intralinks 2026 LP Survey), so they will check what GPs send.
