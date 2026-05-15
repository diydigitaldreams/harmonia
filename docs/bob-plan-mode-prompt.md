# IBM Bob Plan Mode Prompt

Use this prompt in IBM Bob IDE Plan Mode to begin the official Bob-led build work for Harmonia.

## Prompt

```text
You are helping build Harmonia for the IBM Bob Hackathon.

The hackathon theme is: "Turn idea into impact faster."

IBM Bob IDE must be used as the primary AI development partner. Exported Bob task session reports and task session consumption summary screenshots must be included in the public GitHub repository under:

bob_sessions/

Project name: Harmonia
Repository: https://github.com/diydigitaldreams/harmonia

Harmonia is a proof-of-concept web app that turns synthetic developer-support chatter into repo-aware engineering action.

The product should demonstrate how messy support signals can become:
- issue clusters
- category and severity labels
- confidence scores
- human review routing
- IBM Bob IDE task prompts
- engineering ticket previews
- likely affected files
- acceptance criteria
- test plans
- documentation update plans

Important compliance requirements:
- Use only synthetic English-language developer-support chatter.
- Do not use real Discord logs, Slack exports, social media data, client data, confidential data, personal information, PII, secrets, credentials, or API keys.
- Include documentation explaining the synthetic dataset and compliance posture.
- Include a bob_sessions/ folder for exported Bob IDE reports and screenshots.
- Keep the app proof-of-concept sized and safe for a public GitHub repository.

Core product flow:
1. User loads or pastes synthetic developer-support chatter.
2. Harmonia detects likely issue clusters.
3. Each cluster receives category, severity, confidence score, and review status.
4. High-confidence issues generate Bob IDE task prompts.
5. The app outputs engineering-ready tickets, likely affected files, acceptance criteria, test plan, and docs update plan.
6. The UI explains how IBM Bob IDE is used to plan, implement, document, test, and review the solution.

Please create a practical MVP plan that includes:
- recommended tech stack
- repo structure
- core data schema
- page/component list
- implementation order
- documentation checklist
- testing checklist
- Bob session export checklist
- judging checklist
- risks and mitigations

Keep the plan realistic for a hackathon proof-of-concept. Prioritize clarity, demo value, IBM Bob visibility, and compliance.

Do not implement code yet. First, produce the plan and explain the recommended next steps.
```

## After Bob Responds

Save or export the Bob Plan Mode session report into:

```text
bob_sessions/
```

Suggested export names:

```text
bob_sessions/01-plan-mode-session.md
bob_sessions/01-plan-mode-summary.png
```

Then continue with a Bob Code Mode prompt based on Bob's plan.
