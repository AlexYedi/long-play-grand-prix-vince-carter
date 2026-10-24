---
description: "Turn an interview recording (a judge, GP or LP conversation at the hackathon) into a clean, diarized, proper-noun-correct transcript (ElevenLabs scribe_v2 + roster-seeded keyterms), then hand it to the transcript-conditioning skill for the founder brief's interview evidence."
argument-hint: "[audio path in interviews/; optional --num-speakers N]"
---

# /ingest-recording: recording → clean transcript

**Prerequisite:** `ELEVENLABS_API_KEY` in `.env`. If the key fails, use the ElevenLabs MCP `creative_transcribe_audio` tool or a phone recorder's transcript, and mark it lower fidelity on proper nouns.

**Consent first:** ask before recording and say what it's for. No recording means typed notes, conditioned the same way.

## Steps
1. **Keyterms seed:** the interviewee's full name AND first name, their firm, plus the terms likely to be garbled: `Nicrron,Ninoo,PRISM,Block Convey,akta,Roundtable,ILPA,IPEV,TVPI,DPI,NAV,Carta,Halyard,VCLab,Betaworks`.
2. **Run** (from the repo root):
   ```bash
   set -a; source ./.env; set +a
   uv run --with elevenlabs python .claude/scripts/ingest_recording.py \
     --audio "interviews/<recording>.m4a" \
     --keyterms "<name>,<first name>,<firm>,Nicrron,PRISM,akta,Roundtable,ILPA,IPEV,TVPI" \
     --expand-names [--num-speakers 2]
   ```
   Locked config: `model=scribe_v2` (required for keyterms), `diarize=True`, word timestamps.
3. **Outputs land next to the audio** (all gitignored): `… — Transcript (ElevenLabs).md`, the `.json` word-level data, and `… — REVIEW (low-confidence spots).md`.
4. **Quote safety:** before any verbatim quote ships, check it against the REVIEW list; low-confidence words carry a timestamp to listen back to.
5. **Then run the `transcript-conditioning` skill** on the transcript.

## On failure (say which step failed, then degrade)
- Audio not found → name the path you tried; don't guess a neighbouring file.
- Missing key or HTTP 401 → stop, report "ElevenLabs auth failed", fall back as above.
- HTTP 429 or quota exhausted → stop after one retry and report the message verbatim.
- Gotchas: `keyterms` needs `scribe_v2` (v1 returns 400). Diarization over-segments; use `--num-speakers`. A file's extension can lie about its container; `ffprobe` reads it anyway.
