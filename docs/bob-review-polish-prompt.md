# IBM Bob Review and Polish Prompt

Use this prompt in IBM Bob IDE after the Code Mode implementation session has been completed, committed, synced, exported, and saved under `bob_sessions/`.

## Prompt

```text
You are continuing work on Harmonia for the IBM Bob Hackathon.

The proof-of-concept implementation is now complete. Please review the current repository as if you are preparing it for hackathon judging.

Do not rebuild the app from scratch.

Review and improve only what is necessary for clarity, demo value, compliance, and judging readiness.

Check:
- the app runs locally
- README has clear setup and run instructions
- the UI clearly demonstrates the flow from synthetic chatter to issue cluster to Bob task prompt to engineering ticket
- all data is synthetic and safe for a public repo
- no secrets, API keys, credentials, PII, client data, real Discord logs, Slack logs, or social media data are present
- docs explain how IBM Bob IDE was used as the primary AI development partner
- docs explain the synthetic dataset and compliance posture
- docs/demo-script.md supports a video under 5 minutes
- bob_sessions/ is referenced correctly for exported Bob task reports

If changes are needed, make small targeted edits directly in the repo.

Also produce a short final readiness checklist covering:
1. What is ready
2. What still needs testing
3. What should be shown in the demo video
4. What should be included in the final submission statement
```

## After Bob Responds

Use Bob Source Control to review any changed files before committing.

Suggested commit message for Bob's polish changes:

```text
Polish Harmonia for judging
```

Then export the Bob Review and Polish session report into:

```text
bob_sessions/
```

Suggested export names:

```text
bob_sessions/03-review-polish-session.md
bob_sessions/03-review-polish-summary.png
```

Commit the exported session evidence with:

```text
Add Bob review and polish session export
```
