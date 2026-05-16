# Harmonia Demo Guide

This guide explains how to demonstrate Harmonia for the IBM Bob Hackathon.

## Demo Overview

**Duration:** 3-5 minutes  
**Goal:** Show how developer support chatter becomes structured engineering action  
**Key Message:** Turn idea into impact faster

---

## Demo Script

### Introduction (30 seconds)

"Harmonia solves a common problem: engineering teams waste time translating messy support messages into clear work.

Instead of leaving bugs and friction buried in chat, Harmonia structures those signals into tickets, Bob prompts, tests, and documentation tasks.

This is built entirely with IBM Bob IDE as the primary development partner."

### Step 1: Load Data (30 seconds)

**Action:** Click "Load Synthetic Data & Analyze"

**Narration:**
"We start with 27 synthetic developer support messages representing three common issues:
- Environment variable naming inconsistencies
- Missing setup prerequisites  
- Unclear validation error messages

These are synthetic messages - no real user data or PII."

**What Happens:**
- Messages are processed
- Clustering algorithm detects patterns
- System moves to analysis view

### Step 2: Review Clusters (60 seconds)

**Action:** Show the detected clusters

**Narration:**
"Harmonia detected 3 issue clusters with confidence scores.

Look at this first cluster:
- Category: Configuration
- Severity: Medium
- Confidence: 87%
- Review Status: Ready for Bob

The confidence score is based on:
- Number of related messages (8 reports)
- Keyword consistency
- Specific file references
- Temporal clustering

The evidence shows users reporting DATABASE_URL vs DB_CONNECTION_STRING confusion.

Likely affected files are automatically identified: README.md, .env.example, and src/config/database.ts."

**Action:** Click on the first cluster

### Step 3: Engineering Ticket (90 seconds)

**Action:** Show the generated ticket

**Narration:**
"Harmonia generates a complete engineering ticket:

**Title:** Fix configuration issue: database_url

**Affected Files:** README.md, .env.example, src/config/database.ts

**Acceptance Criteria:**
- Configuration naming is consistent across all files
- Environment variables are properly documented
- Default values are provided where appropriate
- Validation errors are clear and actionable

**Test Plan includes:**
- Unit tests for configuration loading
- Integration tests for application startup
- Manual verification of documentation

**Documentation Updates:**
- Files to update: README.md, docs/setup.md
- Sections: Environment variables, Configuration reference
- Rationale: Document configuration changes and standardize naming"

### Step 4: Bob IDE Prompt (60 seconds)

**Action:** Show the Bob prompt and copy it

**Narration:**
"Here's the key innovation: Harmonia generates an IBM Bob IDE task prompt.

This prompt includes:
- Full context from the issue cluster
- Specific task description
- Affected files with line numbers
- Implementation constraints
- Expected output
- Complete acceptance criteria
- Test plan

I can copy this prompt and paste it directly into IBM Bob IDE to implement the solution.

This creates a feedback loop:
1. Users report issues
2. Harmonia structures the signals
3. Bob implements the solutions
4. Users benefit from faster fixes

That's turning idea into impact faster."

### Conclusion (30 seconds)

**Narration:**
"Harmonia demonstrates how AI-assisted development can be systematized.

Built entirely with IBM Bob IDE - you can see all the session exports in the bob_sessions folder.

The app uses only synthetic data and is safe for public repositories.

This proof-of-concept shows how support signals can become structured engineering action, reducing the time from problem report to solution."

---

## Key Points to Emphasize

### Theme Alignment
- **"Turn idea into impact faster"** - Reduces time from vague report to clear action
- Shows before/after transformation clearly
- Demonstrates measurable time savings

### IBM Bob Integration
- Built with Bob as primary development partner
- App generates Bob-ready prompts
- Session exports included in repository
- Creates feedback loop with Bob

### Technical Innovation
- Not just sentiment analysis
- Not just a chatbot
- Signal-to-software workflow
- Repo-aware analysis

### Business Value
- Real problem: translation overhead
- Clear benefits: time savings, clarity
- Target audience: dev tools, SaaS, internal eng
- Scalable approach

### Compliance
- Synthetic data only
- No PII or confidential information
- Safe for public repository
- Well-documented approach

---

## Demo Tips

### Preparation
1. Have the app running locally
2. Test the full flow beforehand
3. Have Bob session exports ready to show
4. Prepare backup if live demo fails

### Pacing
- Don't rush through the clusters
- Highlight the confidence scores
- Show the evidence clearly
- Emphasize the Bob prompt quality

### Visuals
- Use a clean browser window
- Zoom in if presenting remotely
- Highlight key sections as you talk
- Show the copy-to-clipboard action

### Questions to Anticipate

**Q: Is this using real user data?**  
A: No, all messages are synthetic. See docs/data-compliance-note.md for our policy.

**Q: How accurate is the clustering?**  
A: This is a proof-of-concept using simple similarity scoring. Production would use ML models.

**Q: Can it integrate with issue trackers?**  
A: Not in this MVP, but that's a planned enhancement. The ticket format is designed to be compatible.

**Q: How was IBM Bob IDE used?**  
A: Bob was used for planning, implementation, code review, and documentation. All sessions are exported in bob_sessions/.

**Q: What makes this different from sentiment analysis?**  
A: We're not just detecting sentiment - we're creating actionable engineering artifacts with specific files, tests, and Bob prompts.

**Q: Can it handle multiple languages?**  
A: This MVP is English-only, but the architecture supports multi-language with appropriate NLP models.

---

## Backup Plan

If live demo fails:
1. Have screenshots ready
2. Show the Bob session exports
3. Walk through the code structure
4. Explain the workflow conceptually

---

## Post-Demo

### Follow-up Materials
- GitHub repository link
- Bob session exports
- Documentation links
- Contact information

### Metrics to Share
- 27 synthetic messages → 3 actionable tickets
- 87% confidence on high-quality clusters
- Complete Bob prompts in seconds
- Zero manual ticket writing

---

## Video Recording Tips

If recording for submission:

### Setup
- Clean desktop
- Good lighting
- Clear audio
- Screen recording software ready

### Structure
1. Title slide (5 seconds)
2. Problem statement (20 seconds)
3. Live demo (3 minutes)
4. Bob integration highlight (30 seconds)
5. Conclusion and call-to-action (20 seconds)

### Editing
- Add captions for key points
- Highlight important UI elements
- Include Bob IDE logo/branding
- Keep under 5 minutes total

---

## Success Criteria

A successful demo should:
- ✅ Clearly show the problem being solved
- ✅ Demonstrate the full workflow
- ✅ Highlight IBM Bob IDE integration
- ✅ Emphasize the "idea to impact" theme
- ✅ Show technical innovation
- ✅ Explain business value
- ✅ Confirm compliance and safety

---

## Additional Resources

- Full documentation: `docs/`
- Architecture diagram: `docs/architecture.md`
- Bob integration details: `docs/bob-integration.md`
- MVP plan: `docs/mvp-plan.md`