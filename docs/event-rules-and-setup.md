# Event rules, sponsor setup and submission checklist

Pulled from the Devpost (overview, rules, resources), the Nicrron sponsor guide and the Problem Tracks doc on 2026-10-24 at 10:50 ET. Sources: [nyc-vc-hack.devpost.com](https://nyc-vc-hack.devpost.com/) · [/rules](https://nyc-vc-hack.devpost.com/rules) · [/resources](https://nyc-vc-hack.devpost.com/resources).

## Hard rules that change our plan

| Rule | Source | What it means for us |
|---|---|---|
| **All four sponsor tools are required. Any project that skips one can't win a prize.** NicrronNinoo, PRISM by Block Convey, akta.pro by Wokelo AI, Roundtable. | Devpost Requirements | Two of the four (Nicrron, Roundtable) weren't in our stack. See `docs/plan-v2.md`. |
| **Submission deadline: 4:00 PM ET.** The rules page says 4:30, but the overview schedule says 4:00. | Devpost overview vs. rules | Treat **3:45** as our deadline. |
| Live demos 4:15–6:00 PM. | Schedule | Rehearse before 3:45, not after. |
| All code written during the event. Pre-work (interviews, research, designs, datasets) is expected. | Rules | The app repo is new today. `data-pack/` is the dataset pre-work. If asked about `score.py`, say it scores the synthetic dataset; it isn't the product. |
| Public or synthetic data only. | Rules | Already the case. Akta returns public data on real companies, which is allowed. |
| Teams of 2–4, at least one person who codes. | Rules | — |

### What to submit on Devpost

1. Project name and description
2. Track (4, Funds) **and the sponsor awards we're entering**: Best Use of External Data (Akta), the PRISM challenge, the Content Award
3. **One-page founder brief:** problem, customer, interview evidence, market size, competition, business model, why now
4. Tools used: must list **NicrronNinoo, PRISM, akta.pro, Roundtable**
5. Code repo link
6. Live demo link
7. **Demo video, 3 minutes or less**
8. Links to our social posts (for the Content Award)

### Judging rubric (each criterion scored 1–5)

| Criterion | What judges look for | Our answer |
|---|---|---|
| **Design** | Value in the first minute with no walkthrough; outputs a VC could forward as they are (memo, ranked list, alert) | Open on the flagged reconciliation and a letter you can forward, not a dashboard |
| **Uniqueness** | Judges know Harmonic, Carta and spreadsheets. "Another dashboard" scores low. | Provenance to the founder's sentence, plus mark calibration from external data |
| **Execution** | Works end to end on realistic data, not a front end over a mock; handles messy inputs; "clear where every number or claim comes from" | This criterion describes our thesis. Paste a new messy update live. |
| **Business feasibility** | A specific buyer, a believable price, **interview evidence**, a credible path to the first 10 customers, why we win, why now | Fund I/II GP at ~$6k a year; ILPA v2.0 and IPEV 2025 as the why-now; first 10 through emerging-manager communities |

## Setup to-dos (do in this order, about 20 minutes)

| # | Tool | Status at 10:50 | Action | Code |
|---|---|---|---|---|
| 1 | **Nicrron / Ninoo** (required) | **Not set up** | Sign up at https://nicrron.ai/redeem?code=BETAWORKS250 (**one** link only; using both gets the account flagged). Confirm the email. Create a key at https://nicrron.ai/dashboard/keys and save it as `NICRRON_API_KEY` in `.env`. | `BETAWORKS250`: $250 + $10. **Unused credit expires tonight at 11:59 PM.** |
| 2 | **akta.pro** (required; Best Use of External Data award) | Connected, but on **pay-as-you-go** ($138.80). That plan **can't** use headcount, web traffic, job posts, reviews or funding detail, and caps company lists at 20. | Sign up through https://playground.akta.pro/login?redirectTo=dashboard%2Fmanage%2Fbilling&plan_code=pro_50_1250&source=dealflowhk, click Subscribe, then on Stripe choose "Add promotion code". | `DEALFLOW50`: first month $0, then **$50 a month. Cancel by Nov 23.** |
| 3 | **PRISM** (required; PRISM challenge) | MCP connected; Free plan, 0 traces | `pip install prismtrace-sdk` (or add it as an OTel exporter). Save the key as `PRISMTRACE_API_KEY`. **After the first trace:** Settings → Billing & usage → Have a code? Owner invites teammates. | `DEALFLOW`: Builder plan, 200 credits, one workspace per team |
| 4 | **Roundtable** (required) | **Not set up; docs unread.** The quick-start Notion page redirects to the Notion desktop app, and neither the Notion connector nor a web search could reach it. | Open it in a browser: https://app.notion.com/p/Build-on-Roundtable-hackathon-quick-start-402cdc879e1b80baa982e5c49046787f. Paste the SDK snippet into the repo. | — |
| 5 | Solari (optional) | — | Skip unless we need a sandbox | `VC-HACK1MO-DNNXSYYM` |
| 6 | Backup wifi | — | https://pangiapass.com/r/the-hackathon | Password on the Devpost resources page |

**Ask the organizers right away (Discord #questions, or somyag00@gmail.com):** Nicrron's guide says an entry is disqualified unless it's (1) built in Ninoo Builder, (2) listed on market.ninoo.ai, and (3) makes every AI call through `api.nicrron.ai`. Is that the bar for the whole hackathon, or only for Nicrron's own award? Until we hear back, plan for all three (see `docs/plan-v2.md`).

## The PRISM challenge (it fits our eval almost exactly)

Show four things: (1) the editor connected to PRISM's MCP; (2) the editor finds a real problem using PRISM's tools; (3) the editor adds our rule to PRISM through MCP; (4) **v1 breaks the rule and v2 doesn't, on the same inputs**. Requirements: 20+ runs on fixed inputs, with one agent name per version. Bonus points: a guardrail, a second rule, our own evaluator, a bug report with a trace ID.

How we meet it: the fixed inputs are the 22 Q3 updates plus one injection file. The rules are **"every value's quote must string-match the source"** and **"no instruction in a founder update changes an extracted number."** The agents are `extractor-v1` (naive prompt) and `extractor-v2` (span validator plus quarantined prompt).

## Content Award ($150)

Post on **LinkedIn and X during the hack.** Tag SeedLegals, NicrronNinoo, Roundtable, akta.pro (@akta_pro) and Block Convey (@blockconvey), plus the organizer (LinkedIn `somya-gupta-sg`, X `somgupnyc`). Include a demo clip or screenshots, and add the post links to the Devpost. Judged on creativity and reach.

## Prizes

Grand Winner: $500 cash plus perks. Content: $150. Best Use of External Data (Akta): amount not listed.
