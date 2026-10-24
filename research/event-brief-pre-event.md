<!-- Copied 2026-10-24 from Empire_State_Events_Pipeline_Take_3/.claude/.state/research/ (event-deep-research run, 2026-10-18). Pre-event research: judges and sponsors as researched before the event. research/judges.md is newer and takes precedence where they differ. -->

# PART 2: EVIDENCE SET (for the Deep Read render; do not display to Alex as brief content)

Pronoun rule for the renderer: Radhika Khandelwal "she" (event bio); everyone else they/them. Every ledger row below is passed through verbatim with URL and tier intact. Rows tagged `url: n/a` are `email-signal` and stay as-is. Items from training knowledge are not ledgered and must be rendered as unverified.

## The Frame (pointer)
- **Room:** One-day, 9-hour in-person hackathon at Betaworks, hosted by localhost:nyc and VCLab. Teams of 4. Sourcing, Diligence, Portfolio ops and LP reporting tracks. Six judges (Plug and Play principal, Everywhere associate, 3x-exited founder/VC, operator-angel, AI-agent product leader, founder-CEO). Sponsors akta.pro and SeedLegals. Prizes TBA; stated reward is intros to funds. 422+ registered on Luma. Schedule: 9:00 team formation, 10:00 intros and demos, 10:30-4:30 hacking, 4:30-5:30 judging, 5:30-6:00 demos and winners. Attendance first-come, first-served.
- **State of field:** Incumbents (Affinity Ascend and MCP, PitchBook Data MCP, Carta Claude workflows, akta MCP) exposed data and workflows to agents within ~90 days. The data moat is turning into a commodity API; the contested layer is workflow, judgment and a firm's own context.
- **Why now:** MCP lowers the build cost, so a 4-person team can wire real data into an agent in hours. That is why a one-day VC hackathon is feasible in 2026 and was not in 2023.
- **What Alex walks out able to discuss:** where the edge sits (data vs context vs workflow), what pre-seed/enterprise investors would adopt, the human-approval design choice shared across vendors, and what builders at this event chose. The renderer expands this.

## Primer / Landscape (Topic: AI for VC Workflows)

#### AI for VC Workflows (sourcing / diligence / portfolio ops / LP reporting)

Run note from the topic analyst: Fidelity: ran on the VERBATIM SOURCE (E7 file), not a summarized artifact. Standard brief, builders plus NYC ecosystem. No Prior-Context Pack; topic path NEW. Quality-bar flag: only ONE item verified inside the last 60 days (since ~2026-08-19), the PitchBook Data MCP on 2026-10-14, single secondary source. Akta's MCP launch (2026-07-23) is ~87 days old. No other dated in-window launches found from Harmonic, Affinity, Specter or Carta (the signal scanner separately found Carta items in-window; see Signals). Several vendor and listicle figures conflict or are marketing claims and are labeled.

- **Lineage (historical spine):**
  - 1990s-2000s: VC ran on the Rolodex, email and Excel. Deal flow was relationship-driven, and information was the edge.
  - 2007-2014 database era: Crunchbase and PitchBook (both 2007) made "who raised what" searchable. PitchBook was later acquired by Morningstar (2016). Carta (2012) digitized cap tables. Affinity (about 2014) auto-logged emails and calendars into a relationship CRM. This is "relationship intelligence" (training knowledge, no ledger row).
  - 2014-2019 "quant VC" experiments:
    - EQT Ventures' Motherbrain, SignalFire's Beacon, Correlation Ventures' model-based screening, Social Capital and others scored startups on data signals.
    - The pitch was that algorithms could pick winners or at least surface them.
    - Mostly it became a sourcing and triage layer rather than a decision-maker (training knowledge; search did not verify firm-level history or dates).
  - 2020-2023 signal platforms: Harmonic (about 2021), Specter and similar tools tracked stealth founders via LinkedIn job changes, hiring surges, GitHub activity and web traffic. The thesis shifted from "predict winners" to "find them earlier".
  - 2023-2024 LLM wave: GPT-4-class models made memo drafting, deck summarization and market-map generation cheap. Many wrapper startups appeared.
  - 2025-2026 agent and MCP era:
    - Incumbents expose data to agents through MCP, the Model Context Protocol, which is a standard plug for AI apps to call a vendor's data and tools.
    - PitchBook partnered with LLM vendors (Anthropic, Perplexity, Rogo, Hebbia) in July 2025. Affinity shipped an MCP server in May 2026. Akta shipped an MCP server in July 2026. PitchBook added a Data MCP and agents in October 2026.
  - Inflection: the data moat is turning into a commodity API. The contested layer is now the workflow, the judgment and the proprietary context (a firm's own memos, notes and relationships).

- **Mechanism (novice on-ramp):**
  - Signal-based sourcing: instead of waiting for inbound pitches, crawl public traces of a founder starting something and rank them. Examples are a senior engineer leaving a big-tech job, a GitHub repo gaining contributors, a startup's first hires, or a domain being registered. Analogy: a smoke detector, not a fire inspector. It tells you where to look, and it does not tell you whether the company is good. A HackerNoon analysis found GitHub signals noisy and blind to stealth or closed-source startups.
  - Entity resolution: matching "Acme Inc.", "acme.ai" and "Acme Labs" across LinkedIn, GitHub, news and filings into one company record. It is the unglamorous core of every data vendor. Akta claims 20M+ entity-resolved companies.
  - MCP (Model Context Protocol): a standard plug that lets Claude or ChatGPT call a vendor's data or tools, such as "find seed-stage fintechs in NYC". It lowers the cost of building an agent on someone else's data. Akta ships both a REST API and an MCP server.
  - Agentic workflow vs. copilot: a copilot answers a question. An agent runs a multi-step loop on its own (pull data, draft memo, check sources, log to CRM). Failure compounds across steps.
  - RAG (retrieval-augmented generation, standard background): the model reads retrieved documents before answering. This is how a memo cites a deck and a data room instead of guessing.
  - Hallucinated metrics: LLMs invent plausible numbers. A diligence memo needs "source tracebacks", where every figure links to its origin. Carta's roadmap emphasizes this.
  - Fund admin data: LP reporting is mostly collecting numbers from portfolio companies (via forms or email), reconciling them with accounting (NAV, IRR, TVPI/DPI are standard return metrics) and formatting them. Much of the pain is the collecting and reconciling, not the writing.

- **Current Events:**

## Deal Flow: NYC's First VC Hackathon @ Betaworks — 2026-10-18
  - PitchBook (Morningstar), 2026-10-14: announced enhanced agentic functions in PitchBook AI and a new PitchBook Data MCP, unveiled at TechCrunch Disrupt. It adds "Skills" for competitive analysis, market sizing and financing activity, with cited PDF exports. It also adds Configurable Agents for recurring research. This was single-source coverage, so verify. The legacy data giant is now an MCP vendor, which is the direct comparison for Akta's pitch.
  - Akta.pro (hackathon sponsor): reported hosted MCP server launch on 2026-07-23, alongside its REST API. Secondary source (Scalekit). The publisher is listed as Wokelo AI. Listings claim 20M+ entity-resolved companies, 70+ data points each, news with sentiment and event classification, and about 80% of noise filtered. Access is OAuth for Claude and ChatGPT web, or an API key for Cursor, VS Code and the CLI. Teams can build against it on the day.
  - Affinity, May 2026: shipped an MCP server (beta blog dated 2026-05-26) so Claude, ChatGPT or Gemini can query and write back to the firm's relationship graph (CRM). The blog quotes a Bain Capital principal. A competitor says it is not on the Essential plan. Vendor claim, no independent coverage.
  - Harmonic, 2026-05: its post describes Scout, an AI research agent for market mapping through IC prep. It claims 35M+ companies and 195M+ people. It cites an Earlybird benchmark of 98% signal capture vs. 75% for legacy tools. That is a vendor-framed benchmark. A job listing describes an "AI-native hub for VC workflows", with unclear date.
  - Carta, 2026-03-24: launched a Fund of Funds solution automating LP workflows and portfolio visibility. Its 2026 "ERP for private capital" roadmap includes AI data collection with source tracebacks and a Tearsheet Builder for LP-ready reports. Carta also acquired Accelex (AI LP analytics extracting KPIs from portals, emails and documents).
  - Adoption data (Affinity 2026 survey, N about 275, vendor-run): AI use for investment decisions rose from 13% to 28%. About 85% automate daily tasks (up from 76%). About 82% of firms using AI for deal-sourcing research. Note that figures vary by write-up.
  - Macro: Crunchbase-based reports put H1 2026 global venture at about $510B, with OpenAI and Anthropic about 43%. AI took about 81% of Q1 funding. The firms judges represent are chasing a very concentrated market, which raises the value of sourcing under the radar.
  - Anecdote only: Ellipsis Venture, a two-partner fund, claimed at an AI Tinkerers Zurich talk (April 2026) to run sourcing, memos and IR through an agentic system. It is self-reported.

- **Opportunities:**
  - Sourcing: the signal graph is cheap to build from public data. Adding an LLM layer turns raw signals ("3 ex-Stripe engineers left in 60 days") into ranked, explained leads. NYC-specific lenses (the localhost:nyc community) are a plausible differentiator.
  - Diligence: market maps, competitor tables and first-draft memos compress from days to hours. StackAI's vendor claim is 15-20 hours down to 3-4 per deal (a sales claim, not independent).
  - Portfolio ops: "support at scale" (intros, hiring help, fundraising prep) is the least tooled area. A small team cannot hand-hold 40 companies. Agent-based monitoring of news and hiring can trigger timely help.
  - LP reporting: the work is collection and reconciliation. Agents that chase founders for numbers and draft the narrative remove a quarterly time sink. Carta and Visible are moving here.
  - MCP lowers the build cost: a 4-person team can wire Akta, PitchBook or Affinity into an agent in hours. That is why a one-day VC hackathon is feasible now and was not in 2023.
  - Market-sizing call, hedged: this is a seat-based B2B tool market, and the buyers (funds) are few and small. Base case: tools sell to several thousand firms at mid-four to low-five figures per year, so the venture-scale story depends on expanding to adjacent private-markets buyers (PE, family offices, corporate VC). Trigger that changes the call: a frontier lab or Affinity/PitchBook bundling the capability for free. No sourced TAM, so treat this as a framing, not a number.

- **Challenges:**
  - Live debate 1, "Does AI replace the investing judgment?": the survey says only 28% let AI touch the decision. The camp that sees AI as the edge says speed and coverage win. The skeptic camp says the judgment call (founder quality, conviction) is the job, and a memo isn't a decision. Founder-side voices argue faster filtering will also reject weak narratives faster.
  - Live debate 2, "Is data a moat or a commodity?": MCP lets every vendor's data plug into the same agent. Harmonic claims better signal coverage, while Akta, PitchBook and Affinity all offer MCP. If data is equal access, the moat shifts to proprietary firm context and workflow. Disagreement is about which layer captures value.
  - Hallucination and source-checking: fabricated figures in memos are the top trust risk, so source tracebacks are becoming a must-have.
  - Signal noise: GitHub stars and fork counts mislead, and stealth founders leave no public trace. LinkedIn shows trajectory but not depth. Many "signals" are lagging by the time they are visible.
  - Crowding: every sourcing tool surfaces the same loud signals, so the edge decays. Overhyped: "AI finds the next unicorn". Real: coverage, triage and drafting.
  - Data/PII and confidentiality: funds are wary of sending LP data, deal memos and portfolio financials to third-party models. A small judge pool (Everywhere Ventures, Plug and Play) will care about what leaves their systems. This is the analyst's inference, not sourced.
  - Heterogeneous data: fund admin, CRM and portfolio-company reporting live in different formats. Integrations are a drag on every LP-reporting startup.
  - What has been tried and failed, hedged: (a) full algorithmic stock-picking VC (the Motherbrain-era promise) did not displace human partners (training knowledge, unverified here). (b) Wrapper memo generators with no proprietary data are easy to copy. (c) No dated post-mortems found this run, so no specific failed companies named.

- **Use Cases & Practical Applications:**
  - Incumbent stack by job:
    - Sourcing/data: Harmonic, Specter, Crunchbase, PitchBook, and now Akta.
    - CRM/relationships: Affinity.
    - Cap tables/fund admin/LP: Carta (plus Accelex).
    - Portfolio data collection and LP updates: Visible, Standard Metrics (could not verify Standard Metrics this run; background only).
    - General AI: Claude/ChatGPT via MCP connectors.
  - Affinity: a Bain Capital principal gets relationship snapshots from Claude and writes meeting notes back (vendor-published).
  - Visible: a customer case study reports about 30% less reporting workload (vendor-published).
  - Harmonic: claims coverage lift for pre-seed/stealth vs legacy tools (vendor benchmark).
  - Ellipsis Venture: the "agent-run fund" example (self-reported).
  - How a strong 9-hour build slots in (analyst inference from the verbatim schedule):
    - Team formation 9:00-10:00; hacking 10:30-4:30; judging 4:30-5:30; demos 5:30-6:00. Judges include a Plug and Play principal, an Everywhere Ventures associate, a 3x-exited founder, an operator-angel, an AI-agent product leader (wants "slick code and a real business"; host wording) and a founder-CEO.
    - Strong shape: pick ONE of the four themes and ship a narrow, demoable agent loop on real data. Example: take Akta's MCP, watch a given list of companies, and draft a source-cited weekly note.
    - Demo with a real founder or fund as the test case. The brief promises "investors in the room to test your ideas against", so use them for feedback at lunch.
    - Choose the unglamorous pain (collection, reconciliation, source tracebacks) over another market map.
    - Show the failure handling: what the agent does when data is missing, and how every claim links to its source.
    - Weaker: a generic memo writer, a dashboard with no data connection, or a pitch that needs the judge's own data to work.
    - Prizes are TBA, and the stated reward is intros to the funds.

- **Top Questions:** (see head; Q1 data-moat, Q2 what was switched off and why, Q3 collection vs. reading in LP reporting)

##### Evidence Ledger — AI for VC Workflows
- claim: PitchBook announced Data MCP and enhanced agentic PitchBook AI on 2026-10-14 (single secondary source) | tier: web-verified | source: startupresearcher.com | url: https://www.startupresearcher.com/news/pitchbook-unveils-ai-agents-and-data-mcp-for-investors | date: 2026-10-14
- claim: PitchBook announced LLM partnerships with Anthropic, Perplexity, Rogo, Hebbia | tier: web-verified | source: Business Wire | url: https://www.businesswire.com/news/home/20250722027538/en/PitchBook-Announces-LLM-Partnerships-with-Anthropic-Perplexity-Rogo-and-Hebbia-to-Expand-Access-to-Private-Capital-Market-Data | date: 2025-07-22
- claim: Affinity launched an MCP server letting Claude, ChatGPT, Gemini read/write CRM data | tier: web-verified | source: Affinity blog | url: https://www.affinity.co/blog/affinity-is-building-the-best-mcp-for-private-capital | date: 2026-05-26
- claim: Akta MCP server reportedly launched July 23, 2026, alongside REST API (secondary source) | tier: web-verified | source: Scalekit blog | url: https://www.scalekit.com/blog/akta-pro-mcp-vs-api | date: 2026-07-23
- claim: Akta MCP listing: 20M+ companies, 70+ data points, news signals, OAuth/API-key access | tier: web-verified | source: mcpservers.org | url: https://mcpservers.org/servers/akta-pro/akta.pro-mcp | date: 2026-07-23
- claim: Harmonic Scout agent, 35M+ companies, cited Earlybird 98% vs 75% signal benchmark (vendor claim) | tier: web-verified | source: Harmonic blog | url: https://harmonic.ai/blog/how-harmonic-serves-venture-capital-firms | date: 2026-05-01
- claim: Affinity survey: AI for investment decisions rose 13% to 28%; 85% automate daily tasks | tier: web-verified | source: Affinity guide | url: https://www.affinity.co/guides/vc-ai-tools | date: 2026-01-01
- claim: Carta launched Fund of Funds solution automating LP workflows, March 2026 | tier: web-verified | source: Business Wire | url: https://www.businesswire.com/news/home/20260324569161/en | date: 2026-03-24
- claim: Carta 2026 roadmap: AI data collection with source tracebacks, Tearsheet Builder, Accelex acquisition | tier: web-verified | source: Carta | url: https://carta.com/sg/en/product-updates/2026-erp-product-roadmap/ | date: 2026-03-24
- claim: Visible case study reports roughly 30% lower reporting workload (vendor-published) | tier: web-verified | source: Visible | url: https://astro.visible.vc/blog/cartography | date: 2026-01-01
- claim: GitHub activity as fundraising predictor is noisy; useless for stealth startups | tier: web-verified | source: HackerNoon | url: https://hackernoon.com/can-github-activity-predict-the-next-startup-fundraise | date: 2026-01-01
- claim: Vendor claims memo prep drops from 15-20 hours to 3-4 (sales claim) | tier: web-verified | source: StackAI | url: https://www.stackai.com/blog/the-top-ai-agent-use-cases-for-private-equity-venture-capital | date: 2026-01-01
- claim: Ellipsis Venture self-reports agentic sourcing, memos and IR (AI Tinkerers Zurich) | tier: web-verified | source: AI Tinkerers | url: https://zurich.aitinkerers.org/talks/rsvp_cPNM9rUu4j8 | date: 2026-04-01
- claim: Event schedule, themes, judges and sponsors per the Luma listing | tier: web-verified | source: Luma | url: https://luma.com/vc-hack-nyc | date: 2026-10-18

Ledger date notes (from analyst): dates set to the first of the month or year are approximate (Harmonic, Affinity survey, Visible, HackerNoon, StackAI, AI Tinkerers). Not ledgered: lineage items from training knowledge (PitchBook/Crunchbase 2007, Affinity about 2014, Motherbrain/Beacon, Harmonic about 2021). Standard Metrics and Specter returned no coverage this run. Not done (deep-dive scope): per-judge theses, fund-level Q3 2026 AI-VC rounds, failed AI-VC startups by name, verified Specter or Crunchbase 2026 update.

Thin-dimension note for the render: the Opportunities market-sizing is explicitly "a framing, not a number" and the "tried and failed" dimension has no named, sourced post-mortems. Do not pad either.

## Companies
Run notes from company-researcher: VERBATIM SOURCE treated as authoritative. Pulse NYC AI (pulsefoundry.ai), ConnNext, Visionbrew and Olivia Iarmak (Meta Reality Labs) are named as hosts but were not in triage and were not researched. Gmail: only a Luma registration confirmation and newsletters (Betaworks "Bytes", Plug and Play event invites); no prior correspondence. akta.pro and its pricing page returned 403, so akta details come from Product Hunt and aggregator listings. wand.ai and yaven.ai were fetched and are primary.

#### localhost:nyc
**Value Frame**
- **Value prop:** A NYC builder community that runs hackathons and a hacker house to grow a young, ambitious founder culture in the city.
- **For whom:** Student and young founders and builders in NYC.
- **Problem (as they state it):** The site names four NYC gaps: few young founders, limited bold ambition, money over building, and no close-knit founder community (localhost-nyc.com).
- **How:** Hackathons (time-boxed team builds judged live), a Hacker House (a residency where builders live and work together), and a planned Venture Fund. It claims 7,000+ founders and builders and 70+ events, which is self-reported.
- **Unique bet:** [insight] "Builders over talkers, culture over capital" (own site). [distribution] Luma-run events as the funnel into a community.
- **Our read:** The claim is plausible on event cadence. It looks more community-brand than company. The Venture Fund is listed only as a future step. Counterpoints are the many NYC Luma hackathon series, and "LocalHost", a separate hacker-house org (co-founder Suhas Sumukh) that should not be conflated with this one.
- **Industry / Space:** Community / Ecosystem (closest of the allowed values: VC/Investment, Developer Tools).
- **Funding stage:** N/A, community organization. No funding found.
- **Recent funding ($):** null
- **Recent developments:** Hosted "GTM Hack NYC" (Brooklyn, a 5-hour build sprint) per a Luma page. Co-hosts Deal Flow with VCLab. No dated news found.
- **Historical spine:** The site names Somya Gupta as founder (moved to NYC Aug 2023, attended NYU, started an AI education company called Context). Founding year not found. Programs run: hackathons, then Hacker House, with a venture fund planned. The funding arc is not discoverable.
- **Why this matters for the event:** Lead host. The audience is builders and the NYC ecosystem, which matches Alex's target audience. It is a networking surface with 422+ registered on Luma.
- **Headwinds / challenges:** A planned venture fund with no sourced raise. The "NYC's first VC hackathon" claim is unverified. The community metrics are self-reported.

##### Evidence Ledger — localhost:nyc
- claim: Mission is making NYC the largest startup ecosystem; founder-culture programs | tier: web-verified | source: localhost-nyc.com | url: https://localhost-nyc.com/ | date: 2026-10-18
- claim: Site claims 7,000+ founders/builders and 70+ events | tier: web-verified | source: localhost-nyc.com | url: https://localhost-nyc.com/ | date: 2026-10-18
- claim: Founder Somya Gupta moved to NYC Aug 2023, attended NYU, started Context | tier: web-verified | source: localhost-nyc.com | url: https://localhost-nyc.com/ | date: 2026-10-18
- claim: Programs: hackathons active, Hacker House, planned Venture Fund | tier: web-verified | source: localhost-nyc.com | url: https://localhost-nyc.com/ | date: 2026-10-18
- claim: Hosted GTM Hack NYC, a 5-hour Brooklyn build sprint | tier: web-verified | source: Luma | url: https://luma.com/b4rw8usx | date: 2026-10-18
- claim: Deal Flow event hosted by localhost:nyc and VCLab; 422 going | tier: web-verified | source: Luma | url: https://luma.com/vc-hack-nyc | date: 2026-10-18

---

#### VC Lab (VCLab)
**Disambiguation: UNRESOLVED, and probably not Kauffman Fellows' VC Lab.** The only identification is the Luma host line: "Tracy Huang: VC Lab and CEO of Interlink IQ." Three searches (VCLab + NYC, VC Lab + Kauffman, Interlink IQ + Tracy Huang) found no organization page, no site and no press for either name. The search surfaced only unrelated Tracy Huangs: a singer, a Berkeley/Wipro architect, and SEO-spam pages. I could not confirm any Kauffman link either way. Treat as an unverified small community or program. Source-check on Luma or LinkedIn before any public copy. Do not state what VCLab is.
**Value Frame**
- **Value prop:** Unverified. Co-host of Deal Flow, apparently an NYC VC-community or education vehicle.
- **For whom:** Unverified.
- **Problem (as they state it):** Not available. The Luma page gives no VCLab description.
- **How:** Unknown.
- **Unique bet:** None sourced.
- **Our read:** Cannot assess. The nearest NYC analogues found are NYU Stern's VC Launchpad and the NYCEDC VC Internship Program. That is for context only and not a claimed relation.
- **Industry / Space:** VC/Investment (presumed)
- **Funding stage:** Unknown
- **Recent funding ($):** null
- **Recent developments:** None found.
- **Historical spine:** Not discoverable. Do not invent a founding story.
- **Why this matters for the event:** Co-host, and Tracy Huang is the host contact. Ask her at the event what VCLab is.
- **Headwinds / challenges:** No verifiable public footprint. That is a diligence flag for anyone relying on it, not a judgment of quality.

##### Evidence Ledger — VC Lab
- claim: Event hosted by localhost:nyc and VCLab; Tracy Huang titled VC Lab and CEO of Interlink IQ | tier: web-verified | source: Luma | url: https://luma.com/vc-hack-nyc | date: 2026-10-18
- claim: Searches found no public page for VCLab or Interlink IQ | tier: web-verified | source: WebSearch (absence) | url: https://luma.com/vc-hack-nyc | date: 2026-10-18

---

#### akta.pro (sponsor, matters most for builders)
**Value Frame**
- **Value prop:** Private-company data and news signals, queryable by AI agents via API, MCP or CLI, for VC and GTM workflows.
- **For whom:** Financial-services, VC and GTM teams and the agents they build.
- **Problem (as they state it):** Product Hunt tagline: "Private company data and signals API for the agent economy." The pitch is that PitchBook and ZoomInfo are priced for seats, not for agent calls.
- **How:** The company-data API covers 20M+ companies with 70+ fields. The news layer adds AI summaries, sentiment and event-type tags, and filters about 80% of noise (per the glama listing, i.e. vendor-published). MCP (Model Context Protocol, a standard that lets an LLM call tools and data sources) is exposed as a remote server at mcp.akta.pro/mcp. Auth is OAuth for web clients (Claude, ChatGPT) or an API-key header for others (Cursor, VS Code, Claude Code), per the mcpservers.org listing.
- **Unique bet:** [business model] Pay-as-you-go credits with no seats or monthly commitment. [data] A broad private-company graph plus news signals in one call. [distribution] Native MCP so agents consume it directly.
- **Our read:** The pricing model fits hackathon use. Coverage and cost claims ("5x cheaper than PitchBook", "2x PitchBook's coverage") are vendor claims, so test the data quality on companies you know. Competitors: PitchBook, Crunchbase API, Apollo/ZoomInfo, and Harmonic and similar VC-sourcing APIs.
- **What builders get (hackathon-relevant):** 50 free credits on signup, and a PH50 code for 50 credits was promoted on Product Hunt in August (it may be expired). Pay-as-you-go top-up beyond that. Subscription and Enterprise tiers for higher rate limits, custom schemas and bulk export. Per-call credit costs were NOT retrievable (pricing page 403). Ask akta at the event about hackathon credits.
- **Industry / Space:** Data Infrastructure, AI/ML, Developer Tools
- **Funding stage:** Unverified. No funding found.
- **Recent funding ($):** null
- **Recent developments:** Launched on Product Hunt on 2026-08-25, ranked #1 Product of the Day. Maker Siddhant Masson, with Saswat Nanda and Rohan Chaubey on the launch team. A search summary also tied it to Wokelo AI, which I did not verify.
- **Historical spine:** Founded or launched 2026. Thesis: cheap, agent-ready private-company data. Funding arc not discoverable. The Wokelo AI link needs confirmation.
- **Why this matters for the event:** It is the sourcing and diligence data layer for the Sourcing and Diligence tracks. Teams can use it as the API or MCP backend. For Alex, it is a concrete example of MCP-native data selling to agents, which supports his AI-and-GTM positioning.
- **Headwinds / challenges:** About two months post-launch, with named users (KPMG, Adobe, Premji Invest, JLL, Chicago Booth) that are self-claimed and unverified. It competes with incumbents that hold entrenched data and relationships. The "20M companies" breadth leaves coverage depth on early-stage startups open to test.

##### Evidence Ledger — akta.pro
- claim: akta.pro is a private company data and signals API for the agent economy | tier: web-verified | source: Product Hunt | url: https://www.producthunt.com/posts/1216588 | date: 2026-08-25
- claim: 20M+ companies, 70+ fields; usable via API, MCP or CLI | tier: web-verified | source: Product Hunt | url: https://www.producthunt.com/posts/1216588 | date: 2026-08-25
- claim: Pay-as-you-go credits; subscription and enterprise tiers exist | tier: web-verified | source: Product Hunt | url: https://www.producthunt.com/posts/1216588 | date: 2026-08-25
- claim: 50 free credits on signup; promo code PH50 | tier: web-verified | source: Product Hunt | url: https://www.producthunt.com/posts/1216588 | date: 2026-08-25
- claim: Ranked #1 Product of the Day, 2026-08-25 | tier: web-verified | source: Product Hunt | url: https://www.producthunt.com/posts/1216588 | date: 2026-08-25
- claim: Maker Siddhant Masson; team Saswat Nanda, Rohan Chaubey | tier: web-verified | source: Product Hunt | url: https://www.producthunt.com/posts/1216588 | date: 2026-08-25
- claim: Remote MCP server at mcp.akta.pro/mcp; OAuth or API-key auth | tier: web-verified | source: mcpservers.org (via search) | url: https://mcpservers.org/servers/akta-pro/akta.pro-mcp | date: 2026-10-18
- claim: Named users KPMG, Adobe, Premji Invest, JLL, Chicago Booth (self-claimed) | tier: web-verified | source: mcpservers.org (via search) | url: https://mcpservers.org/servers/akta-pro/akta.pro-mcp | date: 2026-10-18
- claim: Sponsor of Deal Flow; company data, news, signals via API or MCP | tier: web-verified | source: Luma | url: https://luma.com/vc-hack-nyc | date: 2026-10-18

Signal-scanner addendum for akta.pro (Tier 2): API about 20M companies, 70+ data points, 15 profile sections; News API; hosted MCP at mcp.akta.pro/mcp. Funding and M&A detail reportedly Enterprise-only. Scalekit dates the MCP server 2026-07-23 (single source). Built by Wokelo AI and positioned against PitchBook per the sources (Wokelo link unconfirmed). Shared key reportedly rate-limited to 25 requests per minute. Sources: https://www.scalekit.com/connectors/aktapromcp · https://www.scalekit.com/blog/akta-pro-mcp-vs-api · https://mcpservers.org/servers/akta-pro/akta.pro-mcp. Hook: ask what data akta can't give (funding detail is gated) and what teams do about it. Date conflict (Scalekit July 23 vs. Product Hunt Aug 25) is flagged in the head.

---

#### SeedLegals (sponsor)
**Value Frame**
- **Value prop:** One platform for startup legal and fundraising paperwork (incorporation, SAFEs, cap table, options, priced rounds) at a fraction of law-firm cost.
- **For whom:** Pre-seed to Series A founders, plus investors and accountants.
- **Problem (as they state it):** "Save a fortune compared to hiring lawyers the old way." Startups made easy. Sorted. (seedlegals.com)
- **How:** Templated, automated legal documents plus a cap-table and investor-deal workflow. SAFE (Simple Agreement for Future Equity) is the standard pre-seed instrument. The platform also handles Delaware incorporation and LLC-to-C-Corp conversion, plus a "Delaware flip" for UK startups moving to the US.
- **Unique bet:** [product] End-to-end from incorporation to priced round on one platform. [business model] Membership with support instead of billable hours. [distribution] UK incumbent with a pitch-deck and founder content funnel (claims 3,500+ founders helped raise).
- **Our read:** The cost claim is credible for templated work. Its US brand is much younger than its UK one. Counterpoints are Stripe Atlas, Clerky and Carta, plus Cooley and Gunderson template tools.
- **Industry / Space:** Enterprise Software (legaltech/fintech), VC/Investment
- **Funding stage:** Series A (2019). A later-stage round is unverified: Dealroom hints at Series B+ investors but gives no amount or date.
- **Recent funding ($):** $4M Series A, Index Ventures lead (2019). Nothing newer verified.
- **Recent developments:** Launched in the US on 2025-01-14. Self-reported "$2.7B+" and "$3B" raised on the platform (pages conflict).
- **Historical spine:** Seed 2017 (~€3.6M reported). Series A in 2019: $4M, Index lead, with Kima, The Family and Seedcamp. UK-first, then US launch January 2025. Founding date and founders were not retrieved.
- **Why this matters for the event:** Sponsor aimed at the pre-seed and seed founders in the audience. For Portfolio ops builders it is the "after the check clears" legal-ops layer.
- **Headwinds / challenges:** Entering the US against entrenched players (Atlas, Clerky, Carta) with a young US brand. Its own page figures conflict ($2.7B vs $3B), and the Series B+ data is paywalled.

##### Evidence Ledger — SeedLegals
- claim: Tagline "Startups made easy. Sorted."; saves vs hiring lawyers | tier: web-verified | source: seedlegals.com | url: https://seedlegals.com/ | date: 2026-10-18
- claim: Claims 50,000+ startups and investors; Trustpilot 4.9 | tier: web-verified | source: seedlegals.com | url: https://seedlegals.com/ | date: 2026-10-18
- claim: Launched in the US on 2025-01-14 | tier: web-verified | source: seedlegals.com | url: https://seedlegals.com/us/seedlegals-launches-in-the-u-s-to-revolutionize-startup-fundraising-and-legal-documentation/ | date: 2025-01-14
- claim: Delaware C corp formation includes 83(b) and EIN | tier: web-verified | source: seedlegals.com | url: https://seedlegals.com/us/incorporate/ | date: 2026-10-18
- claim: Series A, Index Ventures led, with Kima, The Family, Seedcamp | tier: web-verified | source: Index Ventures | url: https://www.indexventures.com/news-room/news/seedlegals-uks-largest-legal-platform-for-startups-raises-series-a-round-led-by-index | date: 2019-01-01
- claim: Seed round of about €3.6M reported (2017) | tier: web-verified | source: Silicon Canals | url: https://siliconcanals.com/?p=22722 | date: 2017-07-01
- claim: Dealroom shows Series B+ investors, no amount or date | tier: web-verified | source: Dealroom | url: https://dealroom.co/companies/seedlegals/ | date: 2026-10-18

Signal-scanner addendum for SeedLegals (Tier 2, low severity): Delaware C-corp incorporation and LLC-to-C-corp flips marketed on the US site. A 2026-03-25 post says about 3 founders per day ask about flipping to the US. US launch was January 2025 (EINPresswire, 2025-01-14), so not new. Sources: https://seedlegals.com/us/seedlegals-launches-in-the-u-s-to-revolutionize-startup-fundraising-and-legal-documentation.md · https://seedlegals.com/

---

#### Everywhere Ventures (judge: Michael Barone)
**Value Frame**
- **Value prop:** Pre-seed capital with a community of founder-and-operator LPs who help portfolio companies.
- **For whom:** Pre-seed founders globally, including NYC.
- **Problem (as they state it):** Tagline "Backing founders, everywhere." No detailed thesis on the site, so any thesis claim beyond that is unverified.
- **How:** About $250k checks at pre-seed, funded by locally run city funds (NYC, London, Austin). About 500 founder LPs act as a built-in advisor network. The site lists ~$100M AUM, ~300 portfolio companies and 30 countries (self-reported, aggregator counts vary widely).
- **Unique bet:** [distribution] A global LP-operator network. [business model] Many small checks across cities.
- **Our read:** The scale claims are inconsistent across trackers (43 to 502 investments), so quote only the site's own figures. Counterpoints: Precursor, Pear, and the other pre-seed funds.
- **Industry / Space:** VC/Investment
- **Funding stage:** N/A (venture fund). Specific fund vintage is unverified.
- **Recent funding ($):** null (no 2026 fund announcement found).
- **Recent developments:** Site lists a news item on North raising $60M (undated). CB Insights lists a $20M Series A in Complyance in February 2026 as a co-investment. Partner on the NYC VC Internship Program (NYCEDC, Supermomos, CUNY IAR).
- **Historical spine:** Co-founders Jenny Fielding and Scott Hartley, with Anna Barber as GP. Founding year was not retrieved. Funding arc not discoverable.
- **Why this matters for the event:** Judge Michael Barone (Associate) represents the pre-seed lens for the pre-seed and seed attendees. The sourcing and portfolio-ops builds speak directly to its LP-network model.
- **Headwinds / challenges:** Pre-seed funds face pressure from larger funds moving earlier and from the AI-driven valuation squeeze. The fund-size and portfolio figures are inconsistent across sources.

##### Evidence Ledger — Everywhere Ventures
- claim: Tagline "Backing founders, everywhere"; ~$250k pre-seed checks | tier: web-verified | source: everywhere.vc | url: https://www.everywhere.vc | date: 2026-10-18
- claim: Site lists ~$100M AUM, 300 portfolio companies, 500 founder LPs, 30 countries | tier: web-verified | source: everywhere.vc | url: https://www.everywhere.vc | date: 2026-10-18
- claim: Founders Jenny Fielding and Scott Hartley; Anna Barber GP | tier: web-verified | source: everywhere.vc | url: https://www.everywhere.vc | date: 2026-10-18
- claim: Portfolio counts vary across trackers; Complyance $20M Series A Feb 2026 | tier: web-verified | source: CB Insights | url: https://www.cbinsights.com/investor/everywhere-ventures | date: 2026-02-01
- claim: Partner in NYC VC Internship Program with NYCEDC | tier: web-verified | source: NYCEDC | url: https://edc.nyc/program/nyc-vc-internship-program | date: 2026-10-18

Signal-scanner addendum for Everywhere Ventures (Tier 2, low severity, low-medium confidence): No fund-close news. Trackers show it led or joined a Complyance Series A ($20M, 2026-02-11) plus Keebler Health and Flora Fertility rounds in April 2026. AUM about $100M but sources conflict. Sources: https://www.cbinsights.com/investor/everywhere-ventures · https://www.caplight.com/investor/everywhere-ventures. Person-researcher note: aggregators put assets at "$75M+"; NFX Signal names Scott Hartley and Jenny Fielding as Managing Partners.

---

#### Wand AI (judge: Radhika Khandelwal)
**Value Frame**
- **Value prop:** An operating system for mixed teams of people and AI agents, with centralized management and oversight.
- **For whom:** Governments and large enterprises (per their site).
- **Problem (as they state it):** The site pitches "Agentic Labor Infrastructure": enterprises need to create, manage and scale teams of humans and agents with accountability. A blog post argues that delaying adoption is a strategic risk.
- **How:** Products named: Smart Agents, Agentic Workforce Technology, Wand OS. Agents are built, run, orchestrated and governed in one layer, with dashboards and decision tracking. SOC2-ready; on-premise, private cloud or hosted.
- **Unique bet:** [product] Governance and orchestration layer across systems and departments. [distribution] Services and SI partnerships (Nityo Infotech, Nov 2025).
- **Our read:** The positioning is crowded (agent-orchestration platforms from Microsoft, Salesforce, UiPath, CrewAI and others). The site names no customers, funding or leadership.
- **Industry / Space:** AI/ML, Enterprise Software
- **Funding stage:** Seed (unverified). Totals conflict: Clay ~$10M, Prospeo $20M across 2 rounds, Jobright/Crunchbase $25M. No Series A found. Investors named: InnoRevo Ventures, Mighty Capital, Plug and Play (CB Insights, accelerator round April 2024).
- **Recent funding ($):** Unverified (~$10M-25M cumulative).
- **Recent developments:** Multi-year collaboration with Nityo Infotech, 2025-11-25. The legal entity appears as "Wand Synthesis AI Inc".
- **Historical spine:** Founded 2022 per aggregators, founder Rotem Alaluf per Village/BuiltIn, with seed in July 2022 per Clay. Aggregator data; unverified against a primary source.
- **Why this matters for the event:** Radhika Khandelwal builds AI agents as a product leader there and (per the host's wording) wants "slick code and a real business", so build to both. A Plug and Play investor link adds a cross-thread with the judge from Plug and Play.
- **Headwinds / challenges:** Conflicting funding data and no named customers on its own site, in a market where hyperscalers bundle orchestration for free.

##### Evidence Ledger — Wand AI
- claim: Describes "Agentic Labor Infrastructure"; products Smart Agents, Wand OS | tier: web-verified | source: wand.ai | url: https://wand.ai | date: 2026-10-18
- claim: Site names no customers, funding or leadership | tier: web-verified | source: wand.ai | url: https://wand.ai | date: 2026-10-18
- claim: Nityo Infotech multi-year collaboration, 2025-11-25 | tier: web-verified | source: Wand AI via search | url: https://wand.ai/blog/the-agentic-workforce-why-delaying-adoption-is-a-strategic-risk | date: 2025-11-25
- claim: Funding totals conflict: $10M, $20M and $25M | tier: web-verified | source: Clay dossier | url: https://www.clay.com/dossier/wand-ai-funding | date: 2026-10-18
- claim: Investors InnoRevo Ventures and Mighty Capital; seed stage Dec 2024 | tier: web-verified | source: VCBacked | url: https://www.vcbacked.co/company/wand-ai | date: 2026-10-18
- claim: Plug and Play Silicon Valley named in April 2024 accelerator round | tier: web-verified | source: CB Insights | url: https://www.cbinsights.com/company/wand-1 | date: 2024-04-01

Signal-scanner addendum for Wand AI (Tier 3, unverified, do NOT state as fact): no 2026 funding found. Trackers show only an early seed (Mighty Capital, InnoRevo) and Plug and Play-linked accelerator money (April 2024); tracker dates may be stale. Do not name a round or valuation. Confirm it is the Palo Alto agentic-workforce company, not the NYC "Wand" creative-tool company. Sources: https://www.vcbacked.co/company/wand-ai · https://www.cbinsights.com/company/wand-1/financials

---

#### Yaven (judge: Bettina Sosa, co-founder and CEO)
**Value Frame**
- **Value prop:** A private, Mac-resident AI assistant that researches prospects, triages briefs and re-engages past clients for independent creative agencies.
- **For whom:** Owners and teams of independent marketing, branding and design agencies.
- **Problem (as they state it):** The site lists the work agencies lose time on: client research and outreach, inbound-brief fit checks, market tracking, and re-engaging past clients. Creative decisions stay with the team.
- **How:** "Local-first" means personal context is stored on your own Mac, inspectable and editable, rather than in a vendor cloud. It starts as a personal assistant, with shared agents added for the whole agency. It runs in the Mac notch and connects to 20+ tools (email, calendar, Notion, Google Workspace, CRMs, messaging). The team sets it up with you.
- **Unique bet:** [product] Local-first context. [distribution] Agency-vertical focus with white-glove onboarding. [business model] Pricing by team size, unpublished.
- **Our read:** Privacy and local-first is a real differentiator against cloud agents. It is a services-heavy early product. Counterparts: generic assistants (Claude, ChatGPT with connectors, Rewind-style tools).
- **Industry / Space:** AI/ML, Enterprise Software
- **Funding stage:** Seed (per F4 listing, 1-10 employees, founded 2026). F4 lists it in the UK, which conflicts with the .us domain and the NYC-judge context. Unverified.
- **Recent funding ($):** null
- **Recent developments:** No dated news found. The site is in waitlist mode for solo users.
- **Historical spine:** Founded 2026 per F4. Founder and CEO Bettina Sosa. Nothing further discoverable.
- **Why this matters for the event:** Sosa's description in the event copy ("local-first AI workforce for independent businesses") is the lens she will judge with. A small-business, privacy-first angle is worth building toward for the Portfolio ops theme. (Note: "she" here is the company researcher's wording; the pronoun rule for Sosa is they/them.)
- **Headwinds / challenges:** Very early (2026-founded, a few employees), with unpublished pricing and no public customers or funding.

##### Evidence Ledger — Yaven
- claim: Private AI assistant for independent marketing, branding and design agencies | tier: web-verified | source: yaven.ai | url: https://www.yaven.ai/ | date: 2026-10-18
- claim: Personal context stored on the user's Mac; connects to 20+ tools | tier: web-verified | source: yaven.ai | url: https://www.yaven.ai/ | date: 2026-10-18
- claim: Pricing unpublished; waitlist for solo users | tier: web-verified | source: yaven.ai | url: https://www.yaven.ai/ | date: 2026-10-18
- claim: F4 lists Yaven seed, founded 2026, UK, founder Bettina Sosa | tier: web-verified | source: F4 | url: https://f4.fund/startups/yaven | date: 2026-10-18
- claim: Sosa is co-founder and CEO of Yaven | tier: web-verified | source: Luma | url: https://luma.com/vc-hack-nyc | date: 2026-10-18

Signal-scanner addendum for Yaven (Tier 3): the scanner's search returned nothing on Yaven or on Sosa and relies solely on the event description; the company researcher and person researcher did find yaven.ai, F4 and LinkedIn material (ledgered above). Treat as a deep-dive coverage item.

---

#### Plug and Play (REFRESH-light, last 90 days; judge: Abeera Saeed)
**Value Frame**
- **Value prop:** Corporate-startup innovation platform and VC that runs accelerator programs and connects startups with corporate partners.
- **For whom:** Early-stage startups and the corporates that pilot with them.
- **Problem (as they state it):** Not re-sourced this run (refresh-light).
- **How:** Accelerator batches plus an in-house VC arm (Plug and Play Ventures, 2,190 investments per trackers) with sector funds.
- **Unique bet:** [distribution] Corporate partner network.
- **Our read:** Volume model with pre-seed to Series A breadth. Judge Abeera Saeed invests in Enterprise and AI B2B SaaS, Pre-Seed to Series A (event copy).
- **Industry / Space:** VC/Investment, Enterprise Software
- **Funding stage:** N/A (VC and accelerator)
- **Recent funding ($):** $50M Fintech & AI Fund closed June 2025 (outside the 90-day window, noted for context).
- **Recent developments (last 90 days):** Fall 2026 batch of 140 startups from 20 countries (55% non-US), culminating at the Silicon Valley Summit, 2026-11-03 to 05. July 2026 letter of intent with Pakistan to accelerate up to 300 university startups. Form D for "Plug & Play New Jersey Fund I-A, L.P." (Sept 2026, $10M, a filing not an announcement). Expo in Tirana, Oct 7-8. Local NYC activity (email signal only, lead not corroboration): Plug and Play x PMAI hackathon Oct 7, Pitching Masterclass III Oct 28.
- **Historical spine:** Not refreshed (see the older Notion record).
- **Why this matters for the event:** Judge Abeera Saeed represents the enterprise and AI B2B seed-to-A lens. Plug and Play also appears as a Wand AI investor.
- **Headwinds / challenges:** Many parallel funds and programs, with a high-volume portfolio that dilutes brand signal. The New Jersey fund appears only as a filing so far.

##### Evidence Ledger — Plug and Play
- claim: Fall 2026 cohort of 140 startups from 20 countries | tier: web-verified | source: TechJuice | url: https://www.techjuice.pk/?p=258329 | date: 2026-10-18
- claim: Silicon Valley Summit scheduled Nov 3-5, 2026 | tier: web-verified | source: TechJuice | url: https://www.techjuice.pk/?p=258329 | date: 2026-10-18
- claim: Form D for Plug & Play New Jersey Fund I-A, $10M, Sept 2026 | tier: web-verified | source: formds.com | url: https://formds.com/issuers/plug-play-new-jersey-fund-i-a-l-p | date: 2026-09-01
- claim: Closed $50M Fintech & AI Fund, June 2025 | tier: web-verified | source: Webull news | url: https://www.webull.com/news/12967350195708928 | date: 2025-06-01
- claim: Plug and Play x PMAI Pitching Masterclass III on Oct 28 | tier: email-signal | source: Luma invite email | url: n/a | date: 2026-10-10
- claim: Judge Abeera Saeed invests Pre-Seed to Series A, Enterprise and AI B2B | tier: web-verified | source: Luma | url: https://luma.com/vc-hack-nyc | date: 2026-10-18

Signal-scanner addendum for Plug and Play (Tier 2, low severity, medium confidence): NYC presence launched 2025-11-23 with the NYC EDC-backed NYC AI Nexus (co-operated with C10 Labs, targeting up to 165 startups and 96 pilots over three years) and a Landing Pad with Cornell Tech. Batch 1 Expo for the first NYC cohort listed 2026-06-03. Nothing material in the last 60 days. Sources: https://pulse2.com/plug-and-play-nyc/amp/ · https://civichall.org/event/plug-play---applied-ai-for-the-modern-brand

---

#### Betaworks (REFRESH-light, last 90 days; host and venue)
**Value Frame**
- **Value prop:** NYC studio, early-stage AI fund and Camp program that backs and houses frontier-tech startups.
- **For whom:** Early-stage founders building AI products.
- **Problem (as they state it):** Not re-sourced this run (refresh-light).
- **How:** Three branches (Build, Fund, Camp). Camp is a themed, in-residence program with up to $500k guaranteed investment.
- **Unique bet:** [product] Themed residency cohorts ("AI Camp: Agent Systems" currently). [distribution] The NYC space and community.
- **Our read:** Venue is the community anchor. The relevant signal for builders is its agent-systems thesis.
- **Industry / Space:** VC/Investment, AI/ML
- **Funding stage:** N/A (fund). Fund III closed at $66M in July 2025 (outside the 90-day window).
- **Recent funding ($):** null in window.
- **Recent developments (last 90 days):** Little dated news found. Official apply page says the Spring 2026 AI Camp: Agent Systems is in session with applications closed. A third-party guide claims a Fall 2026 theme "The New Agentic Economy" (conflicts with the official page, unverified). Latest named cohort article is TechCrunch Nov 2025 (10 companies from Camp 13). Email signal: Betaworks newsletter 2026-10-13 mentions an "AI Agents Build Day at Betaworks" (a lead, not corroborated).
- **Historical spine:** Not refreshed (see the older Notion record). Fund I $48M (2016), Fund II $46M (2020), Fund III $66M (2025).
- **Why this matters for the event:** Venue and Luma co-host. Judges, builders and Betaworks Camp founders will overlap, and the agent-systems theme matches the AI-for-VC-workflows topic.
- **Headwinds / challenges:** Fund III at $66M is small for the capital needs of agent startups. Camp timing and theme info is inconsistent across sources.

##### Evidence Ledger — Betaworks
- claim: Spring 2026 AI Camp: Agent Systems in session; applications closed | tier: web-verified | source: Betaworks | url: https://betaworks.com/apply | date: 2026-10-18
- claim: Camp offers up to $500k guaranteed investment plus NYC space | tier: web-verified | source: Betaworks | url: https://betaworks.com/apply | date: 2026-10-18
- claim: Fund III closed at $66M; Fund II $46M, Fund I $48M | tier: web-verified | source: TechCrunch | url: https://techcrunch.com/2025/07/22/betaworks-third-fund-closes-at-66m-to-invest-in-early-stage-ai-startups | date: 2025-07-22
- claim: Camp 13 launched 10 companies, AI interfaces theme | tier: web-verified | source: TechCrunch | url: https://techcrunch.com/2025/11/13/the-10-companies-that-just-launched-from-betaworks-latest-startup-camp | date: 2025-11-13
- claim: Third-party guide lists a Fall 2026 theme (unverified) | tier: web-verified | source: Causo | url: https://hub.causo.ai/guides/how-to-apply-to-betaworks-camp-2026 | date: 2026-08-24
- claim: Betaworks newsletter mentions AI Agents Build Day | tier: email-signal | source: Betaworks Bytes email | url: n/a | date: 2026-10-13

Signal-scanner note for Betaworks / localhost:nyc / VC Lab / Interlink IQ (Tier 3): no notable signals in the last 60 days. The search tool did not index localhost:nyc. Betaworks returned only old coverage; absence of 2026 news may be a search limitation. Venue and host context should come from their own pages in the deep dive.

---

### Competitive Signal Log (Companies slice; Signals scanner, 2026-10-18)
Format: severity (H/M/L) · confidence · relevance. Most hits are secondary or vendor sources; nothing meets the strict Tier 1 bar of two independent sources plus an event tie except where noted. Verify against primary pages before quoting (Rule 12). The scanner has no Evidence Ledger heading; URLs are inline.

**Tier 1**
- **Affinity** — Launched "Affinity Ascend", an agent platform for private capital, on 2026-07-22. Three starting agents (Data Update, meeting prep, warm intro); pitched across sourcing, deal qualification, IC prep, monitoring and fundraising. Agents run inside Affinity or through Claude, ChatGPT and custom environments, building on earlier MCP work. Support docs say agents queue suggestions and nothing reaches the CRM until a user approves it. Outside the 60-day window by a few days, but it is the incumbent baseline for the hackathon. Severity H · confidence high (press release plus support docs plus a third-party tracker) · relevance: overlaps Sourcing, Diligence and Portfolio ops. Sources: [cmswire press release](https://www.cmswire.com/the-wire/affinity-ascend-the-new-agent-platform-for-private-capital/), [Affinity support docs](https://support.affinity.co/s/article/Working-with-Affinity-agents.md), [Distill](https://www.distillintelligence.com/news/affinity). What Alex might do with it: ask judges and builders what a four-person, nine-hour team can do that an incumbent shipping agents plus MCP can't (a vertical workflow, a pre-seed niche, approval-gated agents as a feature versus a product). Also check whether any team builds on Affinity's MCP.
- **PitchBook** — Announced 2026-10-14 at TechCrunch Disrupt: upgraded agentic functions in PitchBook AI, a new PitchBook Data MCP, and "Skills" (preset workflows for competitive analysis, market sizing, financing activity and industry trends, with PDF export and citations). Configurable recurring Agents can attach to Saved Lists. Plans to extend Skills through 2027 to deal sourcing, deal execution, credit research and fund analysis. Features due Q4 2026. Follows the November 2025 Navigator and OpenAI connector launch; a PitchBook Premium connector for Claude is already listed. Severity H · confidence medium-high (one secondary source for the October details, plus the earlier press release and connector listing) · relevance: Diligence theme. Sources: [startupresearcher](https://www.startupresearcher.com/news/pitchbook-unveils-ai-agents-and-data-mcp-for-investors), [Business Wire, Nov 2025](https://www.businesswire.com/news/home/20251110140497/en/PitchBook-Launches-New-Generative-AI-Experiences-with-the-Introduction-of-PitchBook-Navigator-and-Upcoming-Integration-with-OpenAI). Hook: verify against PitchBook's own release before quoting. "Data vendors are racing to be the MCP layer that agents call, which is also akta.pro's pitch. Who owns the data layer?"
- **Carta** — Three signals. (1) 2026-10-12: licensed by Luxembourg's CSSF as fund administrator and transfer agent. (2) 2026-09-17: customers can run their Carta to-do list and workflows such as capital calls inside Claude Desktop via a Workhub live artifact. (3) 2026-05-13: acquired Avantia and launched Carta Law, an AI legal and compliance product for asset managers. Severity M-H · confidence high (Business Wire plus Carta's own posts) · relevance: LP reporting and portfolio ops. Sources: [Carta Luxembourg release](https://via.tt.se/pressmeddelande/4590432/carta-secures-authorization-to-operate-as-fund-administrator-and-transfer-agent-in-luxembourg?lang=en), [Change Agents Briefing](https://carta.com/uk/en/blog/change-agents-briefing/), [Carta Law/Avantia](https://www.enidnews.com/region/carta-launches-carta-law-with-acquisition-of-avantia/article_d2a57a89-1aad-5a9e-bfd8-b38a218fd086.html). Hook: Carta is turning fund admin into a Claude-native surface; for an LP-reporting hack, the question is where an outside team has a wedge when the system of record is going agentic itself.

**Tier 2** (akta.pro, Plug and Play, SeedLegals and Everywhere Ventures addenda are placed under their company blocks above)
- **Harmonic (harmonic.ai, VC sourcing)** — iOS app v2.1 on 2026-07-11 added "skills" in Scout (its AI sourcing agent) for meeting prep and startup evaluation. Scout takes an uploaded scoring rubric and returns ranked founders. Claims 35M+ companies and 195M+ people. No 2026 round found. Severity M · confidence medium · relevance: Sourcing. Sources: [mwm.ai app listing](https://mwm.ai/apps/harmonicai/6755873868), [CO/AI](https://getcoai.com/tool-detail/harmonic/165282/). Disambiguation: do NOT confuse with (a) Harmonic the math-AI startup ($120M Series C, early 2026, $1.45B valuation) or (b) Harmonic Security ($50M Series B on 2026-10-14). Neither is VC tooling. Source: [Axios](https://axios.com/2026/01/15/nvidia-harmonic-ai-math-accuracy).
- **Specter** — No 2026 funding found. Self-reported (unverified): 400+ VC funds, 55M+ companies, warehouse delivery to Snowflake, AWS and GCP, and an investor-interest feed. Funding totals conflict across trackers (about $12.5M versus $60M). Traffic up 39% month on month as of 2026-06-19 (Caplight). Severity L-M · confidence low-medium · relevance: Sourcing. Sources: [Specter vs Harmonic](https://www.tryspecter.com/features/vs-harmonic), [Caplight](https://www.caplight.com/company/specter).
- **Pulse NYC AI** — Ran AI Week New York in May 2026 (2026-05-11 to 05-17) and a Vercel-sponsored hackathon (past, date not given). Community, incubator and fund. Nothing in the last 60 days. Severity L · confidence medium. Sources: [Luma](https://luma.com/awgzazkr), [createwith listing](https://www.createwith.com/event/new-york-ai-week-new-york-2026-may-11-17-spring-edition-may-2026).
- **Visible.vc** — No AI launch found. CB Insights shows a news item dated 2026-06-18 with no content retrieved. Severity L · confidence low. Source: [CB Insights](https://www.cbinsights.com/investor/visiblevc).

**Tier 3 (unverified or gaps, do NOT state as fact)**
- **Other agentic VC-workflow launches or funding** — No specific October 2026 seed or Series A for an AI-for-VC startup surfaced. Context only: an AI VC benchmark updated July 2026 scores 11 agents on deal sourcing and competitor identification; Dili raised $3.6M in February 2024 (old). Confidence low. Sources: [aimultiple AI VC](https://aimultiple.com/ai-vc), [Tom Walczak substack](https://tomwalczak.substack.com/p/what-ive-learned-from-a-year-of-building).

**Patterns across companies (scanner)**
1. Four incumbents shipped agents plus an MCP surface in roughly 90 days: Affinity (Ascend, July), PitchBook (October), Carta (Claude workflows, September), and akta.pro (MCP, July by one source). Harmonic's Scout skills are a weaker fifth data point. VC data and system-of-record vendors now expose themselves as tools that Claude-class agents call, so a hackathon team's moat is workflow and judgment, not data access. Good gut-check for any pitch that says "we built an AI VC analyst".
2. Human approval is the shared design choice. Affinity's agents queue suggestions that need approval. PitchBook outputs carry citations. This lines up with the event's "diligence, memo drafting" theme.
3. Not asserted as a pattern (only two, or unverified): hosts' and judges' firms (Plug and Play, Everywhere, Pulse) all positioned around NYC ecosystem-building, but that is context from the event page, not a signal.

Reconciliation notes for the renderer: (a) Topic analyst found no in-window Carta items; the scanner found Carta items dated 2026-09-17 and 2026-10-12. Use the scanner rows for Carta currency. (b) Affinity: topic analyst has the May 2026 MCP; scanner adds the July 22 Ascend launch. Both are valid and complementary. (c) Specialist-supplied funding figures for Wand AI, Everywhere Ventures and SeedLegals conflict internally; render with hedging. (d) Every company above carries at least one headwind.

## People
Run notes from person-researcher: Standard-depth, all NEW. Entity list and verbatim text match for all 7 people. **Coverage warning:** Web search returned almost nothing on these people. LinkedIn was fetchable for only 3 of 7 (Radhika, Bettina, Abeera) and those pages were thin. D. J. Patel, Garrett Higgins and Michael Barone returned HTTP 999 and web search returned no profile. Tracy Huang has no LinkedIn URL in the source. Nothing was fabricated or inferred where nothing was found. Gmail: no prior correspondence with any of them; only the Luma registration confirmation (2026-10-18).

#### Tracy Huang — VC Lab; CEO, Interlink IQ (Host / co-host)
- **Known POV / Bio:** Per the Luma page, Tracy is affiliated with VC Lab and is CEO of Interlink IQ. VC Lab is named as a co-host with localhost:nyc. Web search found nothing on Tracy, Interlink IQ, or VC Lab beyond the Luma listing. Luma profile: lu.ma/user/usr-VMYSJvWtn0D6ZtT. The listing also links Instagram (tracyy_huang) and X (TracyHuang8h6p). Handles are unverified as belonging to this person beyond the Luma link. Tracy is not findable via web search beyond Luma. Alex may know context that isn't online.
- **Career arc:** Not discoverable from public sources found.
- **Recent activity (last 6mo):** Co-hosting this event. Nothing else found.
- **Prior correspondence:** None found.
- **Talking Points:**
  - *Personal hook:* None found. Engage off-topic in the room.
  - *Professional hook:* None found beyond co-hosting the first NYC VC hackathon (the "first" is unverified). A safe opener is to ask what VC Lab is and why a VC-side hackathon now.
- **Prioritization Signals:**
  - *Prioritize because:* Host and organizer of the event. The only person who can tell you how judges and funds follow up with teams.
  - *De-prioritize because:* No public footprint. The Interlink IQ and VC Lab relationship is unclear.
  - *Open on-site:* What is VC Lab? What is Interlink IQ? Do the fund intros happen after the event, and who owns that follow-up?

##### Evidence Ledger — Tracy Huang
- claim: Listed as VC Lab and CEO of Interlink IQ; co-host of Deal Flow | tier: web-verified | source: Luma event page | url: https://luma.com/vc-hack-nyc | date: 2026-10-18

---

#### Abeera Saeed — Ventures Principal, Plug and Play (per event bio) (Judge)
- **Known POV / Bio:** The event bio says Ventures Principal at Plug and Play, investing in Enterprise & AI B2B SaaS from Pre-Seed to Series A. **Discrepancy:** their LinkedIn page, as fetched, shows Propel (Propel Capital), NYC, as the current company, with an About line starting "At the intersection of finance and ethics, Abeera Saeed serves as Vice President of…". It was truncated and had no dates. The page may be stale, or the event bio may be. Confirm current employer on-site before naming a firm in public copy. Other LinkedIn items: Co-Founder and Executive Director of Ali Leadership Institute (a civic engagement program for urban youth, since 2019). Participation in Plug and Play and Pioneering Minds AI events, including judging a hackathon. A Wall Street Prep and Wharton Online applied value investing certificate (2026). Yale (2017-2021).
- **Career arc:** Not fully discoverable. Only Propel, Ali Leadership Institute and the Plug and Play affiliation were visible, with no dated prior employers.
- **Recent activity (last 6mo):** Hackathon judging and Plug and Play events (from LinkedIn, undated). No talks or essays found.
- **Prior correspondence:** None found.
- **What they are likely to reward (inferred from stated focus, not a sourced POV):** A tool that fits a pre-seed to Series A enterprise or AI B2B SaaS pipeline. That points to sourcing or diligence workflows that screen B2B SaaS startups against a thesis. The valuation and applied-value-investing coursework suggests they would credit memo or valuation rigor. The finance-and-ethics and impact framing suggests a working-style fit with transparent, explainable diligence. This is an inference. Do not state it as their thesis.
- **Talking Points:**
  - *Personal hook:* They co-founded and run Ali Leadership Institute, a youth civic-engagement program (LinkedIn, volunteer entry). It is referenceable in 10 seconds if the question is "how do you split time between that and investing."
  - *Professional hook:* Their stated lane is Enterprise and AI B2B SaaS, pre-seed to Series A. Ask how Plug and Play's corporate partner network changes what a good deal looks like.
- **Prioritization Signals:**
  - *Prioritize because:* Enterprise AI and B2B SaaS investor, which is the closest overlap with Alex's GTM background. Possible corporate-partner access via Plug and Play.
  - *De-prioritize because:* Employer ambiguity (Plug and Play vs Propel).
  - *Open on-site:* Are you currently at Plug and Play or Propel? Which of the four challenge tracks do you actually feel as a pain point?

##### Evidence Ledger — Abeera Saeed
- claim: Event bio: Ventures Principal at Plug and Play, Enterprise and AI B2B SaaS, Pre-Seed to Series A | tier: web-verified | source: Luma event page | url: https://luma.com/vc-hack-nyc | date: 2026-10-18
- claim: LinkedIn shows Propel (NYC) as current company, with a Vice President line, no dates | tier: web-verified | source: LinkedIn profile | url: https://www.linkedin.com/in/abeera-saeed-a608ba134/ | date: 2026-10-18
- claim: Co-Founder and Executive Director of Ali Leadership Institute since 2019 | tier: web-verified | source: LinkedIn profile | url: https://www.linkedin.com/in/abeera-saeed-a608ba134/ | date: 2026-10-18

---

#### Michael Barone — Associate, Everywhere Ventures (Judge)
- **Known POV / Bio:** Associate at Everywhere Ventures, a global pre-seed VC firm (event bio). Web search confirms the firm exists, with Scott Hartley and Jenny Fielding as Managing Partners and roughly $75M+ in assets (aggregator estimates vary; the firm's own site says ~$100M). It is a pre-seed fund that sources through a network of 500+ founders and operators as LPs. No page found mentions Michael Barone, and LinkedIn returned HTTP 999. Michael is not findable via web search beyond the event bio.
- **Career arc:** Not discoverable.
- **Recent activity (last 6mo):** None found.
- **Prior correspondence:** None found.
- **What they are likely to reward (inferred from role and firm, not a sourced POV):** An associate at a pre-seed fund typically lives in sourcing and first-pass screening. Expect the most interest in sourcing tools that surface founders before everyone else, and in anything that cuts the inbox-triage load. The firm's network-sourced model suggests tools that map warm paths and signals from founder and operator networks, which is the firm's own model rather than a stated view of Michael's. This is an inference.
- **Talking Points:**
  - *Personal hook:* None found. Engage off-topic in the room.
  - *Professional hook:* Everywhere's model is a pre-seed fund backed by founder and operator LPs (aggregator profiles, e.g. NFX Signal and F4). Ask how an associate decides what to take to partners from a flood of inbound. This is firm-level, not Michael's stated POV.
- **Prioritization Signals:**
  - *Prioritize because:* Day-to-day sourcing practitioner. Probably the best on-site source of real screening pain points for teams building sourcing tools.
  - *De-prioritize because:* No public footprint to anchor on. Associate seniority means limited check-writing authority.
  - *Open on-site:* What does your weekly sourcing workflow look like? What tool would you actually adopt?

##### Evidence Ledger — Michael Barone
- claim: Event bio: Associate at Everywhere Ventures, a global pre-seed VC firm | tier: web-verified | source: Luma event page | url: https://luma.com/vc-hack-nyc | date: 2026-10-18
- claim: Everywhere Ventures is a pre-seed fund led by Scott Hartley and Jenny Fielding | tier: web-verified | source: NFX Signal firm page | url: https://signal.nfx.com/firms/the-fund | date: 2026-10-18

---

#### D. J. Patel — VC, 3x exited founder (Judge)
- **Known POV / Bio:** Event bio only: "VC | 3x exited founder." No firm, no named exits, and no employer were found. Web search returned only different people with similar names: DJ Patil of GreatPoint Ventures, and Dinesh Patel of vSpring. Neither is verified to be this person. Do not conflate them. LinkedIn returned HTTP 999. D. J. Patel is not findable via web search. Alex may know context that isn't online.
- **Career arc:** Not discoverable. "3x exited founder" is claimed in the event bio only. The companies are unnamed.
- **Recent activity (last 6mo):** None found.
- **Prior correspondence:** None found.
- **What they are likely to reward:** Cannot be sourced. Weak inference: a three-time founder who is now an investor likely values products that save founders and funds time, and a working demo over slides. No public POV exists to support more than that.
- **Talking Points:**
  - *Personal hook:* None found. Engage off-topic in the room.
  - *Professional hook:* None found. Ask which three companies they exited and what they would build for VCs from the founder side.
- **Prioritization Signals:**
  - *Prioritize because:* Founder-turned-investor can speak to both sides, and has seen three exits.
  - *De-prioritize because:* Zero verifiable detail. Do not use in public copy beyond the event bio.
  - *Open on-site:* Which fund? What were the exits? What did you wish you had from investors as a founder?

##### Evidence Ledger — D. J. Patel
- claim: Event bio: "VC, 3x exited founder"; no firm or exits named | tier: web-verified | source: Luma event page | url: https://luma.com/vc-hack-nyc | date: 2026-10-18

---

#### Garrett Higgins — Operator (Finance + GTM Ops) and angel (Judge)
- **Known POV / Bio:** Event bio: operator with experience running Finance and GTM Operations at high-growth companies, and an angel investor who "loves helping founders win and drive growth." No employer or portfolio was found. Web searches returned only other people. LinkedIn returned HTTP 999. Garrett is not findable via web search beyond the event bio.
- **Career arc:** Not discoverable.
- **Recent activity (last 6mo):** None found.
- **Prior correspondence:** None found.
- **What they are likely to reward (inferred from the stated background, not a sourced POV):** A Finance and GTM Ops background suggests an eye for numbers and process. Likely to value portfolio ops tools that help portfolio companies with pipeline, forecasting or reporting, and LP reporting that is cleaner and more useful. Also likely to ask whether a tool fits how an operator actually works. Alex shares the GTM operator lens, so this is the closest peer judge. This is an inference.
- **Talking Points:**
  - *Personal hook:* None found. Engage off-topic in the room.
  - *Professional hook:* The shared GTM-operations lens. Ask how they would score portfolio-ops tools as an operator versus as an angel. This is Alex's framing, not their stated view.
- **Prioritization Signals:**
  - *Prioritize because:* Peer operator in GTM and finance ops. Lowest-friction conversation of the judges for Alex's background.
  - *De-prioritize because:* No verifiable portfolio or employer, so there is little to anchor on.
  - *Open on-site:* Where do you operate now? What do you angel-invest in? What GTM-ops pain would you pay to remove for a portfolio company?

##### Evidence Ledger — Garrett Higgins
- claim: Event bio: operator in Finance and GTM Ops at high-growth companies; angel investor | tier: web-verified | source: Luma event page | url: https://luma.com/vc-hack-nyc | date: 2026-10-18

---

#### Radhika Khandelwal — Product leader, Wand AI (Judge; she per event bio)
- **Known POV / Bio:** Event bio: builds AI agents as a product leader at Wand AI, and has spent years in the VC world. "She'll want to see both slick code and a real business." That last line is the host's characterization, not a sourced statement from Radhika. Pronouns "she" come from the event bio. LinkedIn (fetched) shows Wand AI as current company with no title shown, NYU Stern MBA plus a Master's in AI/ML (per About), and a volunteer Advisory Committee seat at Ankh Impact Ventures since May 2024. A recommendation on the page calls them one of the best product managers a colleague has worked with. Wand AI (per secondary profiles): Palo Alto-based, founded 2022, sells an "operating system for the agentic workforce" with agents for finance, HR and legal. Those profiles are secondary and not official.
- **Career arc:** Only Wand AI is named on the visible profile. The "years in the VC world" claim is from the event bio and the firms could not be sourced. Not otherwise discoverable.
- **Recent activity (last 6mo):** None found.
- **Prior correspondence:** None found.
- **What they are likely to reward (partly sourced):** The host bio says they want "both slick code and a real business", so expect questions on business viability, not just demo polish. As someone building enterprise agents, they would likely credit well-scoped agent workflows with clear human-in-the-loop points and governance. The finance, HR and legal agent focus is from secondary profiles of Wand AI, not Radhika's own POV. The VC-world angle suggests the same bar for a diligence or memo-drafting agent.
- **Talking Points:**
  - *Personal hook:* They sit on the Advisory Committee of Ankh Impact Ventures (LinkedIn, since May 2024). Ask what impact-focused VC looks like from the advisory side.
  - *Professional hook:* They build agents at Wand AI, an enterprise agent platform. Ask where agentic workflows break in enterprise settings. This is directly relevant to Alex's AI and GTM focus and to any agentic VC tool.
- **Prioritization Signals:**
  - *Prioritize because:* Agent builder who also knows VC. Both lenses match Alex's AI-native interests. Wand AI is a possible target-company contact.
  - *De-prioritize because:* Title and tenure unconfirmed.
  - *Open on-site:* What is your role at Wand AI? Which VC workflow has the best shot at agent automation?

##### Evidence Ledger — Radhika Khandelwal
- claim: Event bio: product leader at Wand AI building AI agents; years in VC world | tier: web-verified | source: Luma event page | url: https://luma.com/vc-hack-nyc | date: 2026-10-18
- claim: LinkedIn lists Wand AI as current company; NYU Stern MBA; Master's in AI/ML | tier: web-verified | source: LinkedIn profile | url: https://www.linkedin.com/in/radhikaakhandelwal/ | date: 2026-10-18
- claim: Advisory Committee member, Ankh Impact Ventures, since May 2024 | tier: web-verified | source: LinkedIn profile | url: https://www.linkedin.com/in/radhikaakhandelwal/ | date: 2026-10-18

---

#### Bettina Sosa — Co-founder and CEO, Yaven (Judge)
- **Known POV / Bio:** Event bio: co-founder and CEO of Yaven, "building a local-first AI workforce for independent businesses." The F4 fund directory lists Yaven as "human ai interfaces," UK-based, founded 2026, 1-10 employees, seed stage, with Bettina as founder and CEO. That is a directory listing, and the page itself returned 403 in fetch, so treat it as a search-snippet fact. LinkedIn (fetched, uk.linkedin.com) shows London, Imperial College London (2017-2021), no title or headline displayed. Bettina is active in NYC.
- **Career arc:** Prior employers not visible. Imperial College London, then Yaven. Not otherwise discoverable.
- **Recent activity (last 6mo), from LinkedIn post timestamps relative to fetch date, so approximate:**
  - About 1 week ago: recap of a Betaworks roundtable in NYC with creative-agency founders on AI workflows and "company brain" tools.
  - About 3 weeks ago: announced "The Creative Breakfast Club 001," an invite-only NYC event (Oct 2) on AI in creative agency operations.
  - About 3 weeks ago: demoed Yaven's JEV implementation at a TypeSafe AI event, claiming a 5x cut in cost and latency of tool and model routing.
  - About 1 month ago: wrote that attention becomes the main constraint as people run many agents, and that filtering what reaches humans will be a key interface.
  - About 3 months ago: a Thoreau/Walden essay on people becoming "the tools of their tools."
- **Prior correspondence:** None found.
- **What they are likely to reward (sourced from their own posts):** Their own stated view is that filtering what reaches a human is a key interface once agents multiply. That points to triage tools that surface the few deals that need a partner's attention instead of dumping more output on them. Also local-first and privacy-preserving (they say Yaven keeps personal context on the user's Mac with no training on client data), so expect them to probe data handling in any LP-reporting or diligence tool. Also network-mapping, since they credit Yaven with mapping attendees' networks.
- **Talking Points:**
  - *Personal hook:* They hosted or recapped a Betaworks roundtable about a week before this event and are running an NYC "Creative Breakfast Club." They are active at the venue. Ask how the Betaworks roundtable went.
  - *Professional hook:* Their post that attention is the constraint for people running many agents, and that filtering is the interface. Alex can engage on it as a GTM person: an agent that decides what reaches an AE. A second hook is the claimed 5x routing cost and latency cut from the TypeSafe AI demo.
- **Prioritization Signals:**
  - *Prioritize because:* Early-stage AI founder in NYC with an explicit public POV that relates to the hackathon's triage problem, and active in the same community.
  - *De-prioritize because:* Yaven is tiny (1-10 per directory) and founded 2026, so it is not a hiring target. The 5x claim is self-reported.
  - *Open on-site:* Is Yaven based in London or NYC? What is the "JEV" implementation? What would a local-first VC tool look like?

##### Evidence Ledger — Bettina Sosa
- claim: Event bio: co-founder and CEO of Yaven, local-first AI workforce for independent businesses | tier: web-verified | source: Luma event page | url: https://luma.com/vc-hack-nyc | date: 2026-10-18
- claim: LinkedIn shows Yaven as current company, London, Imperial College London 2017-2021 | tier: web-verified | source: LinkedIn profile | url: https://uk.linkedin.com/in/bettina-sosa | date: 2026-10-18
- claim: Posted a Yaven demo claiming 5x lower tool and model routing cost and latency | tier: web-verified | source: LinkedIn profile (post, about 3 weeks before fetch) | url: https://uk.linkedin.com/in/bettina-sosa | date: 2026-10-18
- claim: Posted that attention is the main constraint with many agents; filtering is a key interface | tier: web-verified | source: LinkedIn profile (post, about 1 month before fetch) | url: https://uk.linkedin.com/in/bettina-sosa | date: 2026-10-18
- claim: Yaven listed as seed-stage, UK, founded 2026, 1-10 employees | tier: web-verified | source: F4 fund directory (search snippet) | url: https://f4.fund/startups/yaven | date: 2026-10-18

---

Person-researcher verification flags carried through: Abeera Saeed employer discrepancy; D. J. Patel "3x exited founder" unsourced beyond event bio and not to be confused with DJ Patil or Dinesh Patel; Radhika Khandelwal "years in the VC world" and "wants slick code and a real business" are host wording, unverified thesis claim; all "likely to reward" notes are inferences except Bettina's (own-words support); Wand AI details are secondary-source; they/them except Radhika "she".

Person-researcher gaps for the deep dive: pull LinkedIn text or firm team pages for Michael Barone, D. J. Patel, Garrett Higgins and Tracy Huang by another route (WebFetch blocked); identify what VC Lab and Interlink IQ are.

Note for the renderer: not-researched named hosts and co-hosts (Pulse NYC AI, ConnNext, Visionbrew, Olivia Iarmak, Somya Gupta, Matthew Pisinski, Mitchell Itkin, Dominic Smith, Celia Davis) have no People or Companies block. Do not invent them.

## Cross-Event Threads
None. First-touch event, no Prior-Context Pack, no Continuity Ledger, no Graph Signals. Recurring-entity notes for the renderer: Plug and Play and Betaworks are REFRESH-light entities with older Notion records (not passed in); Plug and Play appears twice in this event (judge Abeera Saeed's stated employer, and Wand AI investor). Skip this render section for E7.

## Source files (absolute paths)
- /private/tmp/claude-501/-Users-sameoldexpressions-Documents-GitHub-Empire-State-Events-Pipeline-Take-3/60e2c18d-9731-47a1-b928-439b66f37fb9/scratchpad/batch/E7-deal-flow-vc-hackathon.md
- /private/tmp/claude-501/-Users-sameoldexpressions-Documents-GitHub-Empire-State-Events-Pipeline-Take-3/60e2c18d-9731-47a1-b928-439b66f37fb9/scratchpad/batch/returns/E7-companies.md
- /private/tmp/claude-501/-Users-sameoldexpressions-Documents-GitHub-Empire-State-Events-Pipeline-Take-3/60e2c18d-9731-47a1-b928-439b66f37fb9/scratchpad/batch/returns/E7-people.md
- /private/tmp/claude-501/-Users-sameoldexpressions-Documents-GitHub-Empire-State-Events-Pipeline-Take-3/60e2c18d-9731-47a1-b928-439b66f37fb9/scratchpad/batch/returns/E7-topics.md
- /private/tmp/claude-501/-Users-sameoldexpressions-Documents-GitHub-Empire-State-Events-Pipeline-Take-3/60e2c18d-9731-47a1-b928-439b66f37fb9/scratchpad/batch/returns/E7-signals.md