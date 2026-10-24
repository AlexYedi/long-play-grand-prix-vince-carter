---
name: transcript-conditioning
description: "Turn a raw interview transcript (a judge, GP or LP conversation recorded at the hackathon, or notes typed during it) into scored interview evidence for the founder brief and the video: resolve 'Speaker N' labels to the right person, fix garbled proper nouns, extract a confidence-scored verbatim quote bank, and map each answer to the Track 4 interview questions. Use after /ingest-recording or on a pasted transcript. Triggers: 'condition this interview', 'who said what', 'pull quotes from the judge chat', 'interview evidence'."
---

# Transcript conditioning (interview evidence)

Business feasibility is scored on **interview evidence**. Raw transcripts arrive with two defects that would put a wrong quote in front of the judges: diarized "Speaker N" labels split on pauses rather than identity, and ASR-mangled proper nouns (Nicrron → "Nickron", ILPA → "Ilpa", akta → "actor"). Condition first, then quote.

## Inputs
- The transcript (from `/ingest-recording`, a phone recorder, or typed notes) in `interviews/`.
- The roster: who was in the conversation (name, role, firm). For judges, `research/judges.md`. If you don't know who someone is, don't name them.
- The interview questions: `research/outreach-and-interview-guide.md` and the three Track 4 questions in `docs/plan-v2.md`.

## Method
1. **Speaker resolution, by content, not label.** Table: `raw labels | resolved person | tell | confidence`. A voice you can't resolve stays `UNRESOLVED` and never carries a name in public copy.
2. **Entity glossary.** `mangled → canonical`, anchored to the docs (sponsor tools, ILPA, IPEV, Carta, fund terms). Garbles too damaged to resolve go on an excluded list and never enter a quote.
3. **Quote bank.** Verbatim lines per resolved speaker, lightly de-noised (filler, doubled words) without changing meaning. **HIGH** = clearly recorded, safe to quote verbatim. **MED** = substance certain, phrasing approximate: paraphrase only. Note whether the person agreed to be quoted by name.
4. **Evidence map.** For each interview question: what this person said (quote-bank ID), whether it confirms, complicates or contradicts our thesis, and any willingness-to-pay or buyer signal. Contradictions are kept; they're the most credible evidence.
5. **Confidence score.** Overall % plus the sections you down-weighted.

## Output
Write `interviews/<yyyy-mm-dd>-<person-or-role>-conditioned.md` with the five parts above. The founder brief, the Devpost text and the posts quote only from HIGH lines in these files, and run the `output-evaluator` before anything ships.

## Discipline
- A transcript is a primary source for what someone **said**, not for outside facts they mention. Those still need a citation.
- Never guess a proper noun into public copy. Never promote a MED line to a verbatim quote.
- Raw audio and transcripts stay local (gitignored); only the conditioned file, with consented quotes, is committed. Redact anything said off the record.
