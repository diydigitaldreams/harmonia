# IBM Bob IDE Integration Strategy

## Overview

IBM Bob IDE is the primary AI development partner for Harmonia. This document explains how Bob is used throughout the project lifecycle and how the app itself generates Bob-ready prompts.

## Bob's Role in Development

### 1. Planning Phase (Plan Mode)
**Purpose:** Architecture design and implementation strategy

**Activities:**
- Review project requirements
- Design system architecture
- Define data schemas
- Create implementation roadmap
- Identify risks and mitigations
- Plan documentation structure

**Deliverables:**
- [`mvp-plan.md`](mvp-plan.md) - Comprehensive MVP plan
- [`architecture.md`](architecture.md) - System design
- Implementation order and timeline

**Session Export:**
- [`bob_sessions/01-plan-mode-session.md`](../bob_sessions/01-plan-mode-session.md)
- [`bob_sessions/01-plan-mode-summary.png`](../bob_sessions/01-plan-mode-summary.png)

### 2. Implementation Phase (Code Mode)
**Purpose:** Feature development and code generation

**Activities:**
- Project initialization (Vite + React + TypeScript)
- Type definition creation
- Core algorithm implementation
- Component development
- Utility function creation
- Integration work

**Key Features Built with Bob:**
- Clustering algorithm in [`clustering.ts`](../src/utils/clustering.ts)
- Confidence scoring in [`scoring.ts`](../src/utils/scoring.ts)
- Ticket generation in [`ticket-generation.ts`](../src/utils/ticket-generation.ts)
- Bob prompt generation in [`bob-prompt-generation.ts`](../src/utils/bob-prompt-generation.ts)
- React components for all pages

**Session Exports:**
- [`bob_sessions/02-code-mode-session.md`](../bob_sessions/02-code-mode-session.md)
- [`bob_sessions/02-code-mode-summary.png`](../bob_sessions/02-code-mode-summary.png)
- Additional code sessions as needed

### 3. Review Phase (Review Mode)
**Purpose:** Code quality, refactoring, and optimization

**Activities:**
- Code review and refactoring
- Performance optimization
- Type safety improvements
- Documentation enhancement
- Test coverage review
- Compliance verification

**Session Export:**
- [`bob_sessions/03-review-session.md`](../bob_sessions/03-review-session.md)
- [`bob_sessions/03-review-summary.png`](../bob_sessions/03-review-summary.png)

### 4. Documentation Phase (Ask/Code Mode)
**Purpose:** Documentation completion and demo preparation

**Activities:**
- README enhancement
- API documentation
- Demo script creation
- Video pitch preparation
- Submission materials

**Session Exports:**
- [`bob_sessions/04-docs-session.md`](../bob_sessions/04-docs-session.md)
- [`bob_sessions/04-docs-summary.png`](../bob_sessions/04-docs-summary.png)

## Bob Prompt Generation Feature

### Purpose
Harmonia generates Bob IDE-ready prompts for each detected issue cluster. This demonstrates how the app can feed directly into Bob's workflow for implementation.

### Prompt Structure

```typescript
interface BobPrompt {
  mode: "plan" | "code" | "review";
  context: string;
  task: string;
  constraints: string[];
  expectedOutput: string[];
}
```

### Example Generated Prompt

```markdown
# Bob IDE Task Prompt

## Mode: Code

## Context
Issue cluster detected from developer support messages:
- Category: Documentation
- Severity: Medium
- Confidence: 87%
- Messages: 8 related reports

Evidence:
- "The README says to use DATABASE_URL but .env.example has DB_CONNECTION_STRING"
- "Setup failed because I used the wrong env var name"
- "Documentation is inconsistent about environment variables"

## Task
Fix environment variable naming inconsistency across documentation and configuration files.

## Affected Files
- README.md (lines 45-52)
- .env.example (line 3)
- src/config/database.ts (lines 12-15)

## Constraints
- Use DATABASE_URL as the standard name
- Update all references consistently
- Maintain backward compatibility if possible
- Add validation for missing variables

## Expected Output
1. Updated README.md with correct variable name
2. Updated .env.example with correct variable name
3. Updated database.ts to use correct variable name
4. Added validation error message for missing DATABASE_URL
5. Migration guide if breaking change

## Acceptance Criteria
- [ ] All documentation uses DATABASE_URL consistently
- [ ] .env.example matches README instructions
- [ ] Config loader uses DATABASE_URL
- [ ] Clear error message if variable is missing
- [ ] No other environment variables affected

## Test Plan
- [ ] Unit test: config loader with DATABASE_URL
- [ ] Unit test: config loader with missing variable
- [ ] Integration test: app starts with correct env var
- [ ] Manual test: follow README setup instructions
```

### Prompt Generation Logic

The [`bob-prompt-generation.ts`](../src/utils/bob-prompt-generation.ts) utility:

1. **Analyzes cluster data**
   - Category and severity
   - Evidence messages
   - Affected files
   - Confidence score

2. **Determines appropriate Bob mode**
   - Plan mode: Complex architectural changes
   - Code mode: Implementation tasks
   - Review mode: Refactoring or optimization

3. **Formats context**
   - Issue summary
   - Evidence excerpts
   - User impact statement

4. **Defines task clearly**
   - Specific, actionable description
   - Clear scope boundaries
   - Success criteria

5. **Lists constraints**
   - Technical requirements
   - Compatibility needs
   - Performance considerations

6. **Specifies expected output**
   - Files to modify
   - Tests to write
   - Documentation to update

## Bob Session Export Process

### When to Export
- After completing each major phase
- After significant feature implementation
- Before switching to a different mode
- At project milestones

### How to Export
1. Complete Bob IDE session
2. Use Bob's export functionality
3. Save as Markdown file
4. Take screenshot of token usage summary
5. Review for sensitive information
6. Commit to [`bob_sessions/`](../bob_sessions/) directory

### Naming Convention
```
bob_sessions/
  [number]-[mode]-[description].md
  [number]-[mode]-summary.png
```

Examples:
- `01-plan-mode-session.md`
- `02-code-mode-clustering-logic.md`
- `03-review-mode-refactoring.md`

### What to Include
- Full conversation context
- All code generated
- Explanations and reasoning
- Any errors and resolutions
- Final implementation decisions

### What to Redact
- API keys or credentials (if accidentally included)
- Personal information
- Private URLs
- Confidential data
- Real user data

## Demonstrating Bob's Value

### In the Demo
1. **Show the planning session**
   - "Bob helped design the architecture"
   - Display [`mvp-plan.md`](mvp-plan.md)

2. **Show code generation**
   - "Bob implemented the clustering algorithm"
   - Display [`clustering.ts`](../src/utils/clustering.ts)

3. **Show the app generating Bob prompts**
   - "Now Harmonia can feed issues back to Bob"
   - Display generated prompt for a cluster

4. **Show the feedback loop**
   - User reports → Harmonia clusters → Bob implements → User benefits

### In Documentation
- README includes "Built with IBM Bob IDE" badge
- Each major file includes Bob attribution comment
- [`bob-integration.md`](bob-integration.md) (this file) explains the workflow
- Session exports demonstrate Bob's contributions

### In Video Pitch
- Mention Bob in introduction
- Show Bob session export folder
- Demonstrate prompt generation feature
- Explain the development workflow

## Bob IDE Best Practices

### Effective Prompting
- Provide clear context
- Specify constraints upfront
- Define success criteria
- Include relevant file paths
- Request specific output format

### Iterative Development
- Start with Plan mode for architecture
- Use Code mode for implementation
- Use Review mode for refinement
- Export sessions regularly

### Documentation
- Document Bob's role in each feature
- Include session exports
- Explain decision rationale
- Show before/after comparisons

## Measuring Bob's Impact

### Development Speed
- Time from idea to implementation
- Reduction in boilerplate code
- Faster debugging and problem-solving

### Code Quality
- Type safety improvements
- Better error handling
- More comprehensive tests
- Clearer documentation

### Learning and Knowledge Transfer
- Understanding new patterns
- Best practices adoption
- Architecture insights
- Technology recommendations

## Future Bob Integration Ideas

### Beyond MVP
- Real-time Bob prompt generation
- Bob session history in app
- Direct Bob IDE integration
- Automated ticket-to-implementation pipeline
- Bob-powered code review suggestions

### Production Features
- Bob API integration for automated processing
- Team collaboration with shared Bob sessions
- Bob prompt templates library
- Analytics on Bob usage patterns

---

## Summary

IBM Bob IDE is not just a tool used to build Harmonia—it's integral to the product's value proposition. Harmonia demonstrates how AI-assisted development can be systematized and scaled, turning messy human feedback into structured engineering work that Bob can execute efficiently.

The app itself generates Bob-ready prompts, creating a feedback loop where:
1. Users report issues
2. Harmonia structures the signals
3. Bob implements the solutions
4. Users benefit from faster fixes

This is the essence of "Turn idea into impact faster."