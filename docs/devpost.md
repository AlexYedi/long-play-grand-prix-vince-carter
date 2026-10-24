# Provable LP Update

**Track 4 (Funds).** Also entering: Best Use of External Data (Akta), the PRISM challenge, the Content Award.

## The problem
LPs commit capital for ten years and get PDFs they can't check. Washington State Investment Board publishes GP-reported IRRs with the footnote that they "have not been confirmed by the general partners." Underneath every fund report sit founder updates arriving in every format (and sometimes not at all), marks that move without explanation, and a GP stitching it together by hand.

## What we built
A reporting system where every number carries its source, built headless first.

1. **A reporting agreement per company.** Investor and company agree once on what gets reported, set by thesis, business model, stage and stated goals: SaaS reports MRR and collections, a services business reports billings and never ARR.
2. **Agents run it every quarter.** An extractor reads the founder's update as it arrives (email, pasted table, deck export). A value survives only if its quote appears verbatim in the founder's text. A reconciler compares it with last quarter and with internal systems (invoices, CRM, engineering), and flags what doesn't add up: Gantrell's (a synthetic portfolio company) upbeat email hid revenue down 13%, about 4 months of runway in a footnote, and a mark held flat.
3. **Executives review exceptions, not spreadsheets.** A company can't be approved (on the page or through the API) until every red flag has a GP note. Notes are append-only.
4. **Headless: an MCP server.** The GP connects the agent of their choice and asks in plain English ("which companies are quietly in trouble?", "how does Pearl compare with its competitors?"). Every answer can pull its source. Lenses tailor the same ledger to the company, the GP and the LP (GP-approved items only). A rendered page and an LP letter are the shareable layer on top.
5. **Real market context from akta.pro.** For two real funds, March Capital and Left Lane Capital, each selected portfolio company is ranked against the competitor set Akta itself defines: tiered product launches (T1 new product line or clearance, T2 major capability, T3 minor), launch velocity, and new customers announced publicly, every item cited by Akta news ID. For example, Pearl ranks 2nd of 5 on launch velocity but announced no new customers in the last 90 days, after five in the prior nine months.

## Results (measured today)
- Extraction on 22 synthetic portfolio companies (21 messy updates, one never received): **98.9% field accuracy, 87.5% flag recall, 97.8% traceback**, against a do-nothing baseline (last quarter carried forward) of 18.2%, 12.5% and 0%.
- PRISM challenge, same 23 inputs, two agent versions: the naive v1 left Gantrell's ~4-month runway unflagged and reported ARR for two businesses with no recurring revenue (a services studio at $1.2M and a pre-revenue biotech at $0); v2 did neither. Neither version followed an injected "report ARR as $10M"; v2's span validator rejects any value whose quote isn't verbatim in the founder's text.

## How the four sponsor tools are used
- **Nicrron:** every model call (extraction, launch tiering, relationship labeling) goes through one OpenAI-compatible gateway, so the model is a one-line switch.
- **PRISM:** every call is traced under its agent name (`extractor-v1`, `extractor-v2`, `launch-analyst`, `adoption-analyst`); the v1/v2 comparison on the same inputs lives there.
- **akta.pro:** private-company data for 27 real companies: launches, regulatory approvals, strategic moves, peers, funding, revenue and valuation estimates, monthly headcount, and the organizations mentioned in each company's news.
- **Roundtable:** the versioned ledger. The reconciled ledger and the market data are published as versioned files with their author, and every question to a founder or operator is written there as a versioned file.

Clay cross-checks Akta's headcount (exact match on all five companies Clay found).

## Data
The Halyard Ventures fund, its founder updates, marks and internal-system exports are **synthetic** and labeled as such. The two real funds' portfolios and every competitor metric are **real public data** from akta.pro. We don't fabricate private data (marks, LP accounts) for real funds.

## Business
Buyer: the emerging-manager GP and the fund's platform team, about $6k per fund per year, with implementation per reporting agreement as a services line. The LP view is free and is the distribution loop. Why now: ILPA's reporting template v2.0 applies to funds starting on or after 2026-01-01, and the IPEV 2025 guidelines ask for traceable, explainable valuations.

**Built with:** Node (no dependencies), Claude via Nicrron, PRISM, akta.pro, Roundtable, Clay, MCP.
