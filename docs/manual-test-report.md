# Manual Test Report

This document records the manual validation checklist for the Harmonia proof-of-concept.

## Test Environment

- Operating system: Ubuntu desktop
- Runtime: Node.js 18+ expected
- Browser: Modern Chromium/Firefox browser expected
- App command: `npm run dev`

## Checklist

| Area | Manual Test | Expected Result | Status |
| --- | --- | --- | --- |
| Install | Run `npm install` | Dependencies install without errors | Pending local confirmation |
| Dev server | Run `npm run dev` | Vite starts and shows a local URL | Pending local confirmation |
| App load | Open local app URL | Harmonia UI renders | Pending local confirmation |
| Data load | Click `Load Synthetic Data & Analyze` | Synthetic support messages are processed | Pending local confirmation |
| Clustering | Review cluster cards | Related messages appear grouped by issue theme | Pending local confirmation |
| Ticket generation | Select a cluster | Engineering ticket preview appears | Pending local confirmation |
| Bob prompt | Review generated prompt | Bob-ready prompt includes context, affected files, constraints, and expected output | Pending local confirmation |
| Copy flow | Use copy button | Prompt can be copied for IBM Bob IDE | Pending local confirmation |
| Production build | Run `npm run build` | TypeScript and Vite build complete | Pending local confirmation |

## Notes

The current POC uses transparent keyword extraction, Jaccard similarity, and rule-based scoring. This is intentional for the hackathon demo: the core value is the workflow from messy support chatter to structured engineering action and Bob-ready implementation prompts.

Before final submission, update the Status column after running the checklist locally.
