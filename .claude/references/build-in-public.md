# Build in public: what ships and what never does

Adapted 2026-10-24 from the Empire pipeline's rule. This repo is public (the Devpost needs the code link), so the default is public. The exceptions protect someone; they don't hide the work.

## Never public
| What | Why | How |
|---|---|---|
| Secrets (Nicrron, PRISM, Akta, Roundtable, ElevenLabs keys, promo codes tied to an account) | account takeover, billing abuse, the Nicrron account getting flagged | `.env` gitignored; never in screenshots or the demo video |
| Raw interview audio, transcripts, REVIEW sheets | other people's words aren't ours to publish wholesale | gitignored under `interviews/`; only conditioned files with consented quotes are committed |
| Anything said off the record, and named quotes without consent | it's their information | redact in every derived file with a dated `[REDACTED: reason]` marker |
| Personal contact details of anyone outside the team | PII | keep them out of files; use `*.example` domains in fixtures |

## Public, and good to share
Code, the data pack (synthetic, labeled as such), eval results including failures, the docs and research, and the posts.

## Before you commit
1. `git diff --cached` doesn't touch `.env*` or a gitignored path.
2. Any new interview-derived file: search the source for "off the record|stays in the room|don't post|confidential" and redact matches.
