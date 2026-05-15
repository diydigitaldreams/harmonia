# Harmonia

Harmonia is a proof-of-concept project for the IBM Bob Hackathon.

The project explores a simple idea: messy developer-support chatter should not stay trapped in chat. It should become structured, repo-aware engineering action.

Harmonia turns synthetic developer-support messages into issue clusters, confidence scores, Bob-ready task prompts, engineering tickets, acceptance criteria, test plans, and documentation update suggestions.

## Hackathon Theme

**Turn idea into impact faster.**

Harmonia focuses on the messy middle between an idea/problem being reported and an engineering team knowing what to do next.

## What Harmonia Does

1. Loads or accepts synthetic developer-support chatter.
2. Detects likely issue clusters.
3. Assigns category, severity, confidence, and review status.
4. Generates IBM Bob IDE task prompts.
5. Produces engineering-ready output:
   - ticket title
   - issue summary
   - evidence
   - likely affected files
   - acceptance criteria
   - test plan
   - documentation update plan

## IBM Bob IDE Usage

IBM Bob IDE is intended to be the primary AI development partner for this project.

Bob will be used for:

- planning the MVP architecture
- generating and refactoring implementation code
- reviewing repo structure
- improving documentation
- preparing demo and submission materials
- producing exported Bob task session reports for judging

All relevant Bob task session exports and screenshots should be stored in:

```text
bob_sessions/
```

## Data Policy

This repository uses synthetic English-language developer-support data only.

It must not include:

- client data
- confidential company data
- personal information or PII
- social media data
- real Discord logs
- API keys, secrets, or credentials

See `docs/data-compliance-note.md` for more detail.

## Current Status

Initial hackathon repo structure created.

Next step: use IBM Bob IDE Plan Mode to generate the MVP implementation plan.
