---
name: hack-content
description: Content Award posts for the Deal Flow hackathon (2026-10-24). Drafts LinkedIn and X posts during the hack (build-in-public: kickoff, mid-build, demo/result), with the required sponsor and organizer tags, a demo clip or screenshot plan, and an optional carousel brief. Fact checks every draft with output_checks.py and the output-evaluator before a person posts it. Use when the team says "draft the post", "LinkedIn update", "X thread", "content award", or at the 14:30 freeze for the final post.
---

# Hackathon content (Content Award, $150: creativity and reach)

## Hard requirements (from `docs/event-rules-and-setup.md`)
- Post on **both LinkedIn and X during the hack**.
- Tag: SeedLegals, NicrronNinoo, Roundtable, akta.pro (X `@akta_pro`), Block Convey (X `@blockconvey`), and the organizer (LinkedIn `somya-gupta-sg`, X `somgupnyc`). Check each handle resolves before posting; flag any you couldn't verify.
- Include a demo clip or screenshots.
- Paste every post link into the Devpost submission.

## Voice
Read before drafting: `.claude/references/content-style-guide.md`, `.claude/references/content-anti-patterns.md`, `.claude/references/audience-north-star.md`. The previous post (`research/pre-event-post-v2.md`) is the voice baseline and the start of the series; don't repeat its content.

## The three posts
| # | When | Angle | Asset |
|---|---|---|---|
| 1 | By ~12:30 | The problem and the bet: WSIB publishes GP IRRs "not confirmed by the general partners"; we're building the LP update where every number clicks through to its source. Name the four sponsor tools by their role in the product (`docs/plan-v2.md` §1), not as a list of logos. | Architecture sketch or the messy-updates screenshot |
| 2 | ~14:00 | One real moment from the build: the PRISM v1-vs-v2 injection result, or the Akta calibration on the red row. Show, don't announce. | Screenshot or 10–20s screen clip |
| 3 | After the 14:30 freeze | The result: what works end to end, accuracy vs. the do-nothing baseline (synthetic data, say so), what we learned from the judges and GPs we interviewed | The demo video or a carousel (`visual-renderer`) |

X versions: a separate shorter draft, not a truncated LinkedIn post. Lead with the asset, one claim, tags at the end.

## Asset toolbox (claude.ai MCP connectors: account-level, no keys, verified signed in 2026-10-24)
Load a connector's tools with ToolSearch before first use. Real product footage beats generated footage: the rubric rewards "works end to end on realistic data."

| Need | First choice | Fallback | Notes |
|---|---|---|---|
| Demo video (≤3 min) and post clips | **Supercut**: record the screen, then pull the transcript through the connector and run `output_checks.py quotes` on the script | macOS screen recording | The submission video and post 3 asset |
| Voiceover, if not narrating live | **ElevenLabs** (`creative_list_voices` → `creative_generate_speech`) | Narrate live | Spends credits; never re-run a generation to retry |
| Carousel | `visual-renderer` agent (house style, local, free) | **Canva** (no brand kit set; pass the house colors) | |
| Static post image | **Canva** | Screenshot of the app | |
| Founder brief as a shareable page, or a pitch deck | **Gamma** (`generate`; themes "Basic Dark" / "Gamma Dark") | Markdown in the repo | Fact check the text before generating |
| 3–5s motion opener or b-roll (optional) | **Runway** (2,165 credits) | **Higgsfield** (589 credits) | Pick one; confirm cost first; max one clip |
| UI references for the LP view / reconciliation table | **Mobbin** (`search_screens`) | — | Build aid, not content |
| Quick UI mockup | **Magic Patterns** (no OS yet; `create_os` makes one) | Hand-code it | Build aid |

Anything that spends credits (Runway, Higgsfield, ElevenLabs, Gamma) gets a person's OK first.

## Rules
- **Synthetic data stays labeled.** Halyard Ventures and its 22 companies are fictional; any accuracy number appears next to the baseline (18.2% field accuracy for carry-forward).
- **Keep it reveal-safe.** No API keys, no screenshots showing `.env`, tokens or a teammate's private info.
- **Quote people only with consent.** A judge or GP quote needs their OK and a HIGH line in the quote bank (`transcript-conditioning`).
- **Every figure has a source** (`docs/evidence.md` holds the cited ones).

## Method
1. Draft the post in `content/post-N-<platform>.md`: one recommended version plus at most one alternative; give the character count (LinkedIn 3,000, X 280 per post).
2. For a carousel: write the brief in the visual-briefs output schema (`visual-briefs.md`) and dispatch the `visual-renderer` agent.
3. **Fact check:** run `python3 .claude/scripts/output_checks.py sources --draft <file>` (and `quotes --draft <file> --transcript <quote bank>` if anyone is quoted), then dispatch the `output-evaluator` agent with the JSON and the source files. Fix every fail before the draft goes to a person.
4. Hand back the post text ready to paste, the tag list, the asset path, and the evaluator verdict. **Never post anything yourself.**
