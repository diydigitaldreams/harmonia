# Synthetic Dataset Method

Harmonia's proof-of-concept dataset is synthetic by design.

The dataset should demonstrate realistic developer-support noise without using real social, client, or personal data.

## Design Goals

The dataset should contain short support-style messages that show how small signals become engineering work.

A good sample cluster includes:

- multiple messages about the same issue
- at least one conflicting detail
- one clue pointing toward likely affected files
- one user-impact statement
- enough ambiguity to justify confidence scoring

## Example Issue Types

Planned synthetic clusters:

1. Environment variable mismatch
   - README mentions one variable name.
   - `.env.example` uses another.
   - Config loader expects a different value.

2. Broken onboarding path
   - New users follow setup docs but miss a required step.
   - Error message does not explain the missing dependency.

3. Unclear validation error
   - Users receive a generic failure.
   - The app could provide a clearer actionable message.

## Confidence and Review

Harmonia should not pretend every signal is certain.

Each issue cluster should include:

- confidence score
- review status
- explanation of why it is ready for Bob or needs human review

Example review statuses:

```text
ready_for_bob
needs_human_review
insufficient_signal
```

## Compliance

The dataset should remain synthetic, English-only for v1, and safe for a public GitHub repository.
