# IBM Bob Code Mode Prompt

Use this prompt in IBM Bob IDE Code Mode after the Plan Mode session has been exported and committed under `bob_sessions/`.

## Prompt

```text
You are continuing work on Harmonia for the IBM Bob Hackathon.

Use the MVP plan from the previous Plan Mode task as the source of truth.

Now implement the proof-of-concept web app.

Requirements:
- Keep the project small and demo-ready.
- Use only synthetic English-language developer-support data.
- Do not include real Discord logs, Slack exports, social media data, client data, confidential data, PII, secrets, credentials, or API keys.
- Build a simple single-page app that demonstrates this flow:
  1. load synthetic support chatter
  2. detect issue clusters
  3. show category, severity, confidence, and review status
  4. generate IBM Bob IDE task prompts
  5. output engineering ticket preview
  6. show likely affected files, acceptance criteria, test plan, and docs update plan

Include or update:
- app source files
- synthetic sample data
- README run instructions if needed
- docs explaining how to run the demo
- docs explaining how Bob is used in the workflow

Keep implementation practical and easy to run locally on Ubuntu.

Before making changes, briefly summarize the files you plan to create or modify. Then proceed with implementation.
```

## After Bob Responds

Do not immediately start another Bob task.

First, inspect the changes locally:

```bash
cd ~/harmonia
git status
git diff --stat
```

Then follow Bob's run instructions to install dependencies and test the app.

After confirming the app runs, export the Code Mode session report into:

```text
bob_sessions/
```

Suggested export names:

```text
bob_sessions/02-code-mode-session.md
bob_sessions/02-code-mode-summary.png
```

Then commit the implementation and the Bob session export.
