# Provable LP Update

**Deal Flow: NYC's first VC hackathon** (localhost:nyc × VCLab at betaworks, 2026-10-24). Track 4, Funds: "make LPs as informed as their GPs."

**The idea:** the quarterly LP update writes itself from founder updates, and every number is one click from its source. It's built GP-side, for emerging managers running Fund I or Fund II.

Messy founder updates → extracted metrics with source spans → reconciliation against last quarter (unexplained marks and low runway get flagged) → an ILPA-aligned quarterly report plus a GP letter that LPs can click through to check.

## What's here

| Path | What it is |
|---|---|
| `team-kit.html` | One page for the team: problem, scope, demo plan, roles. Open it in a browser. |
| `docs/plan-v2.md` | **Read first.** What the Devpost and Problem Tracks doc confirm and change: the four required sponsor tools as product layers, the 4:00 deadline, the new demo |
| `docs/event-rules-and-setup.md` | Rules, rubric, submission checklist, sponsor setup and promo codes |
| `docs/synthesis.md` | The plan. Every feature traces to an organizer challenge clause (F1–F4, P1–P2, E1); anything without an ID gets cut. |
| `docs/evidence.md` | Every problem with current LP reporting, its cited source and tier, the value we unlock, plus real LP reports to benchmark against |
| `docs/lp-requirements-and-architecture.md` | What LPs weigh for a new fund, how LP types differ, the legal landscape, standards, the biggest vs. hardest gaps, and the architecture and sovereignty posture |
| `docs/systems-analysis.md` | LP reporting as a trust system, not a document pipeline |
| `research/judges.md` | The audience: who each judge is, what they have said, and what the demo shows them |
| `research/market-map.md` · `value-chain-research.md` · `liquidity-and-lp-expansion.md` | The market, the stakeholders, and the bigger vision |
| `research/outreach-and-interview-guide.md` | The script for customer-evidence calls |
| `stack-card/` | The stack (`stack.json`, an HTML card, and `stack-for-agents.md` for coding agents) |
| `data-pack/` | A synthetic fund (Halyard Ventures Fund I, all fictional) with 22 companies, Q2 and Q3 2026 updates, answer keys, an extraction schema, an ILPA field map and a scorer. See `data-pack/README.md`. |

## Scoring

Stdlib Python 3 only, with no network calls and no API keys.

```bash
cd data-pack
python3 eval/check_answer_key.py                         # answer-key integrity
python3 eval/score.py path/to/your_predictions/          # your extractor vs. the baseline
```

Every score prints next to a **do-nothing baseline**: last quarter's values carried forward unchanged. On the Q3 answer key that baseline gets **18.2%** field accuracy, **12.5%** flag recall and **0%** traceback. A number reported without that comparison means nothing.
