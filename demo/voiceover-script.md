# Harmonia 5-Minute Demo Voice-Over Script

## 0:00-0:30 — Problem

Hackathon communities move fast. Discord support channels fill up with bug reports, unclear complaints, duplicate issues, missing context, and emotional feedback. Developers then have to manually read everything, decide what matters, rewrite it into engineering language, and turn it into tickets. Harmonia solves that by turning messy community support chatter into structured, reviewable engineering work.

## 0:30-1:10 — Solution

Harmonia is a proof-of-concept triage tool for hackathon and developer communities. It takes synthetic support messages, classifies them by type and urgency, clusters related reports, and generates Linear-style engineering tickets. The goal is not just sentiment analysis. The goal is to help teams move from community noise to actionable development work faster.

## 1:10-2:00 — Bob as Development Partner

IBM Bob was used as the primary coding assistant for the project. The work was divided into Bob-led tasks: planning the architecture, implementing the triage schema, creating ticket generation logic, reviewing the application, and preparing documentation for submission. Each Bob task was exported into the required bob_sessions folder so judges can review the development trail.

## 2:00-3:10 — App Demo

In the app, the first step is loading a synthetic dataset. These messages are intentionally safe: they contain no private client data, no social media scrape, no secrets, and no personally identifying information. Harmonia then analyzes the messages and produces structured outputs: issue type, severity, confidence, suggested owner, and whether something should be routed for human review.

The important design choice here is confidence-based escalation. If a message is ambiguous, sarcastic, mixed, or low-confidence, Harmonia does not pretend to be certain. It flags the case for review. That makes the system safer and more useful for real support workflows.

## 3:10-4:00 — Ticket Generation

After classification, Harmonia turns the messy input into ticket-ready summaries. Instead of a developer reading twenty scattered messages, they receive a clean engineering artifact: title, summary, impact, reproduction hints, related reports, and recommended next step. That is where the product value is: reducing the distance between community feedback and developer action.

## 4:00-4:40 — Testing and Submission Readiness

The project was built as a focused proof-of-concept. The repo includes the application code, documentation, synthetic dataset method, demo notes, and exported Bob sessions. The app builds successfully, and the repo is prepared for public review.

## 4:40-5:00 — Closing

Harmonia turns discord into harmony. It helps hackathon teams, developer communities, and support-heavy products convert chaotic feedback into useful engineering work. Built with IBM Bob as the primary development partner, Harmonia demonstrates the hackathon theme clearly: turning an idea into impact faster.
