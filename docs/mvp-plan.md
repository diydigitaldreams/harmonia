# Harmonia MVP Plan

**Project:** Harmonia - Developer Support Signal to Engineering Action  
**Hackathon:** IBM Bob Hackathon  
**Theme:** Turn idea into impact faster  
**Status:** Planning Phase  
**Date:** 2026-05-15

---

## Executive Summary

Harmonia transforms messy developer-support chatter into structured, repo-aware engineering action. This MVP demonstrates how scattered support signals can be clustered, analyzed, scored, and converted into actionable engineering tickets with IBM Bob IDE task prompts, acceptance criteria, test plans, and documentation updates.

**Key Differentiator:** Not just sentiment analysis or chatbots—this is a signal-to-software workflow that bridges the gap between user feedback and engineering execution.

---

## Recommended Tech Stack

### Frontend
- **Framework:** React 18+ with TypeScript
- **Build Tool:** Vite (fast, modern, excellent DX)
- **Styling:** Tailwind CSS (rapid prototyping, consistent design)
- **State Management:** React Context API (sufficient for MVP scope)
- **UI Components:** Headless UI or Radix UI (accessible, customizable)

### Backend/Processing
- **Runtime:** Node.js (for any server-side processing if needed)
- **Processing Logic:** Client-side JavaScript/TypeScript (keeps deployment simple)
- **Data Storage:** LocalStorage + JSON files (no database needed for POC)

### Clustering & Analysis
- **Text Processing:** Simple keyword matching + frequency analysis
- **Clustering Algorithm:** Basic similarity scoring (cosine similarity on keyword vectors)
- **Confidence Scoring:** Rule-based heuristics (message count, keyword strength, consistency)

### Deployment
- **Hosting:** GitHub Pages or Vercel (free, simple, fast)
- **CI/CD:** GitHub Actions (automated deployment)

### Development Tools
- **Primary AI Partner:** IBM Bob IDE (all modes: Plan, Code, Review)
- **Version Control:** Git + GitHub
- **Code Quality:** ESLint + Prettier
- **Testing:** Vitest (unit) + Playwright (e2e, optional for MVP)

**Rationale:** This stack prioritizes speed, simplicity, and demo clarity. No backend complexity, no database setup, no API keys—just a clean, client-side web app that can be deployed instantly and demoed anywhere.

---

## Repository Structure

```
harmonia/
├── README.md                          # Project overview
├── LICENSE                            # Open source license
├── package.json                       # Dependencies
├── tsconfig.json                      # TypeScript config
├── vite.config.ts                     # Vite config
├── .gitignore                         # Git exclusions
├── .eslintrc.json                     # Linting rules
├── .prettierrc                        # Code formatting
│
├── bob_sessions/                      # IBM Bob IDE exports
│   ├── README.md                      # Session export guide
│   ├── 01-plan-mode-session.md        # This planning session
│   ├── 01-plan-mode-summary.png       # Token usage screenshot
│   ├── 02-code-mode-session.md        # Implementation session
│   ├── 02-code-mode-summary.png       # Token usage screenshot
│   └── 03-review-session.md           # Review and refinement
│
├── docs/                              # Documentation
│   ├── mvp-plan.md                    # This document
│   ├── data-compliance-note.md        # Compliance explanation
│   ├── synthetic-dataset-method.md    # Dataset design
│   ├── judging-map.md                 # Hackathon alignment
│   ├── demo-script.md                 # Demo walkthrough
│   ├── architecture.md                # System design
│   └── bob-integration.md             # How Bob is used
│
├── public/                            # Static assets
│   ├── favicon.ico
│   └── demo-data/                     # Sample datasets
│       ├── sample-cluster-1.json
│       ├── sample-cluster-2.json
│       └── sample-cluster-3.json
│
└── src/                               # Application source
    ├── main.tsx                       # App entry point
    ├── App.tsx                        # Root component
    ├── index.css                      # Global styles
    │
    ├── types/                         # TypeScript definitions
    │   ├── index.ts
    │   ├── message.ts
    │   ├── cluster.ts
    │   └── ticket.ts
    │
    ├── data/                          # Synthetic datasets
    │   ├── synthetic-messages.ts      # Sample support messages
    │   └── sample-repos.ts            # Mock repo structures
    │
    ├── utils/                         # Core logic
    │   ├── clustering.ts              # Message clustering
    │   ├── scoring.ts                 # Confidence scoring
    │   ├── categorization.ts          # Issue categorization
    │   ├── ticket-generation.ts       # Ticket creation
    │   └── bob-prompt-generation.ts   # Bob IDE prompt creation
    │
    ├── components/                    # React components
    │   ├── layout/
    │   │   ├── Header.tsx
    │   │   ├── Footer.tsx
    │   │   └── Layout.tsx
    │   │
    │   ├── input/
    │   │   ├── MessageInput.tsx       # Paste/load messages
    │   │   ├── SampleDataLoader.tsx   # Load demo data
    │   │   └── FileUpload.tsx         # Upload JSON
    │   │
    │   ├── analysis/
    │   │   ├── ClusterList.tsx        # Display clusters
    │   │   ├── ClusterCard.tsx        # Individual cluster
    │   │   ├── ConfidenceScore.tsx    # Score visualization
    │   │   └── CategoryBadge.tsx      # Category label
    │   │
    │   ├── output/
    │   │   ├── TicketPreview.tsx      # Engineering ticket
    │   │   ├── BobPrompt.tsx          # Bob IDE task prompt
    │   │   ├── AcceptanceCriteria.tsx # AC list
    │   │   ├── TestPlan.tsx           # Test plan
    │   │   ├── AffectedFiles.tsx      # File list
    │   │   └── DocsUpdatePlan.tsx     # Documentation plan
    │   │
    │   └── common/
    │       ├── Button.tsx
    │       ├── Card.tsx
    │       ├── Badge.tsx
    │       └── LoadingSpinner.tsx
    │
    └── pages/                         # Page components
        ├── HomePage.tsx               # Landing/input page
        ├── AnalysisPage.tsx           # Cluster analysis
        └── OutputPage.tsx             # Ticket generation
```

---

## Core Data Schema

### Message
```typescript
interface Message {
  id: string;
  content: string;
  timestamp: Date;
  author: string;        // Synthetic username
  channel: string;       // e.g., "support", "onboarding"
  keywords: string[];    // Extracted keywords
}
```

### Cluster
```typescript
interface Cluster {
  id: string;
  messages: Message[];
  category: IssueCategory;
  severity: Severity;
  confidence: number;    // 0-100
  reviewStatus: ReviewStatus;
  summary: string;
  evidence: string[];    // Key message excerpts
  affectedFiles: string[];
  createdAt: Date;
}

type IssueCategory = 
  | "documentation"
  | "configuration"
  | "validation"
  | "onboarding"
  | "error-messaging"
  | "api"
  | "performance"
  | "other";

type Severity = "low" | "medium" | "high" | "critical";

type ReviewStatus = 
  | "ready_for_bob"
  | "needs_human_review"
  | "insufficient_signal";
```

### Ticket
```typescript
interface EngineeringTicket {
  id: string;
  clusterId: string;
  title: string;
  summary: string;
  category: IssueCategory;
  severity: Severity;
  evidence: string[];
  affectedFiles: string[];
  acceptanceCriteria: string[];
  testPlan: TestPlan;
  docsUpdatePlan: DocsUpdatePlan;
  bobPrompt: string;
  createdAt: Date;
}

interface TestPlan {
  unitTests: string[];
  integrationTests: string[];
  manualTests: string[];
}

interface DocsUpdatePlan {
  filesToUpdate: string[];
  sections: string[];
  rationale: string;
}
```

### BobPrompt
```typescript
interface BobPrompt {
  mode: "plan" | "code" | "review";
  context: string;
  task: string;
  constraints: string[];
  expectedOutput: string[];
}
```

---

## Pages and Components

### 1. Home Page (Landing)
**Purpose:** Introduction and data input

**Components:**
- [`Header`](src/components/layout/Header.tsx) - App title, navigation
- [`MessageInput`](src/components/input/MessageInput.tsx) - Textarea for pasting messages
- [`SampleDataLoader`](src/components/input/SampleDataLoader.tsx) - Load demo datasets
- [`FileUpload`](src/components/input/FileUpload.tsx) - Upload JSON files
- Call-to-action button: "Analyze Messages"

**User Flow:**
1. User lands on page
2. Sees explanation of what Harmonia does
3. Can paste messages, load sample data, or upload JSON
4. Clicks "Analyze Messages" → navigates to Analysis Page

### 2. Analysis Page
**Purpose:** Display detected clusters with confidence scores

**Components:**
- [`ClusterList`](src/components/analysis/ClusterList.tsx) - List of all clusters
- [`ClusterCard`](src/components/analysis/ClusterCard.tsx) - Individual cluster details
- [`ConfidenceScore`](src/components/analysis/ConfidenceScore.tsx) - Visual confidence indicator
- [`CategoryBadge`](src/components/analysis/CategoryBadge.tsx) - Issue category label
- Review status indicator
- "Generate Ticket" button for high-confidence clusters

**User Flow:**
1. System processes messages and detects clusters
2. User sees list of clusters with:
   - Category (e.g., "Documentation")
   - Severity (e.g., "Medium")
   - Confidence score (e.g., 87%)
   - Review status (e.g., "Ready for Bob")
   - Message count and evidence snippets
3. User selects a cluster → clicks "Generate Ticket"
4. Navigates to Output Page

### 3. Output Page (Ticket Generation)
**Purpose:** Display engineering-ready ticket and Bob prompt

**Components:**
- [`TicketPreview`](src/components/output/TicketPreview.tsx) - Full ticket display
- [`BobPrompt`](src/components/output/BobPrompt.tsx) - Bob IDE task prompt
- [`AcceptanceCriteria`](src/components/output/AcceptanceCriteria.tsx) - AC checklist
- [`TestPlan`](src/components/output/TestPlan.tsx) - Test plan sections
- [`AffectedFiles`](src/components/output/AffectedFiles.tsx) - File list with explanations
- [`DocsUpdatePlan`](src/components/output/DocsUpdatePlan.tsx) - Documentation plan
- "Copy Bob Prompt" button
- "Export Ticket" button (JSON/Markdown)

**User Flow:**
1. User sees complete engineering ticket
2. Reviews Bob IDE task prompt
3. Can copy prompt to use in Bob IDE
4. Can export ticket for issue tracker
5. Sees explanation of how Bob would be used to implement

---

## Implementation Order

### Phase 1: Foundation (Days 1-2)
1. **Project Setup**
   - Initialize Vite + React + TypeScript project
   - Configure Tailwind CSS
   - Set up ESLint and Prettier
   - Create basic folder structure
   - Initialize Git repository

2. **Type Definitions**
   - Define all TypeScript interfaces
   - Create type exports in [`types/index.ts`](src/types/index.ts)

3. **Synthetic Dataset**
   - Write 3 sample issue clusters (15-20 messages each)
   - Create [`synthetic-messages.ts`](src/data/synthetic-messages.ts)
   - Document dataset in [`synthetic-dataset-method.md`](docs/synthetic-dataset-method.md)

4. **Basic Layout**
   - Create [`Layout`](src/components/layout/Layout.tsx), [`Header`](src/components/layout/Header.tsx), [`Footer`](src/components/layout/Footer.tsx)
   - Set up routing (React Router or simple state-based navigation)
   - Create placeholder pages

### Phase 2: Core Logic (Days 2-3)
5. **Clustering Algorithm**
   - Implement keyword extraction in [`clustering.ts`](src/utils/clustering.ts)
   - Build similarity scoring
   - Create cluster detection logic
   - Test with synthetic data

6. **Scoring and Categorization**
   - Implement confidence scoring in [`scoring.ts`](src/utils/scoring.ts)
   - Build category detection in [`categorization.ts`](src/utils/categorization.ts)
   - Add severity assignment
   - Determine review status

7. **Ticket Generation**
   - Implement ticket creation in [`ticket-generation.ts`](src/utils/ticket-generation.ts)
   - Generate acceptance criteria
   - Create test plan structure
   - Build docs update plan

8. **Bob Prompt Generation**
   - Create Bob IDE prompt templates in [`bob-prompt-generation.ts`](src/utils/bob-prompt-generation.ts)
   - Include context, task, constraints
   - Format for different Bob modes

### Phase 3: UI Implementation (Days 3-4)
9. **Home Page**
   - Build [`MessageInput`](src/components/input/MessageInput.tsx)
   - Create [`SampleDataLoader`](src/components/input/SampleDataLoader.tsx)
   - Add [`FileUpload`](src/components/input/FileUpload.tsx)
   - Implement "Analyze" action

10. **Analysis Page**
    - Build [`ClusterList`](src/components/analysis/ClusterList.tsx) and [`ClusterCard`](src/components/analysis/ClusterCard.tsx)
    - Create [`ConfidenceScore`](src/components/analysis/ConfidenceScore.tsx) visualization
    - Add [`CategoryBadge`](src/components/analysis/CategoryBadge.tsx)
    - Implement cluster selection

11. **Output Page**
    - Build [`TicketPreview`](src/components/output/TicketPreview.tsx)
    - Create [`BobPrompt`](src/components/output/BobPrompt.tsx) display
    - Add [`AcceptanceCriteria`](src/components/output/AcceptanceCriteria.tsx), [`TestPlan`](src/components/output/TestPlan.tsx), [`AffectedFiles`](src/components/output/AffectedFiles.tsx)
    - Implement copy and export functions

### Phase 4: Polish and Documentation (Days 4-5)
12. **Styling and UX**
    - Refine Tailwind styles
    - Add loading states
    - Improve responsive design
    - Add animations and transitions

13. **Documentation**
    - Complete [`architecture.md`](docs/architecture.md)
    - Write [`bob-integration.md`](docs/bob-integration.md)
    - Create [`demo-script.md`](docs/demo-script.md)
    - Update [`README.md`](README.md) with screenshots

14. **Testing**
    - Write unit tests for core logic
    - Test with all sample datasets
    - Manual testing of full flow
    - Cross-browser testing

15. **Deployment**
    - Set up GitHub Pages or Vercel
    - Configure CI/CD
    - Deploy MVP
    - Test production build

### Phase 5: Submission Prep (Day 5)
16. **Bob Session Exports**
    - Export all Bob IDE sessions
    - Take token usage screenshots
    - Organize in [`bob_sessions/`](bob_sessions/)
    - Document Bob's role

17. **Final Review**
    - Compliance check (no PII, secrets, real data)
    - Test demo flow end-to-end
    - Record demo video (under 5 minutes)
    - Prepare written statement

---

## Documentation Checklist

- [x] [`README.md`](README.md) - Project overview and setup
- [x] [`docs/data-compliance-note.md`](docs/data-compliance-note.md) - Compliance explanation
- [x] [`docs/synthetic-dataset-method.md`](docs/synthetic-dataset-method.md) - Dataset design
- [x] [`docs/judging-map.md`](docs/judging-map.md) - Hackathon alignment
- [ ] [`docs/mvp-plan.md`](docs/mvp-plan.md) - This document
- [ ] [`docs/architecture.md`](docs/architecture.md) - System design and flow
- [ ] [`docs/bob-integration.md`](docs/bob-integration.md) - How Bob IDE is used
- [ ] [`docs/demo-script.md`](docs/demo-script.md) - Demo walkthrough
- [ ] [`docs/api-reference.md`](docs/api-reference.md) - Core functions (optional)
- [ ] [`LICENSE`](LICENSE) - Open source license
- [ ] Code comments in all utility functions
- [ ] Component documentation (JSDoc)
- [ ] Type documentation (TSDoc)

---

## Testing Checklist

### Unit Tests
- [ ] [`clustering.ts`](src/utils/clustering.ts) - Keyword extraction
- [ ] [`clustering.ts`](src/utils/clustering.ts) - Similarity scoring
- [ ] [`clustering.ts`](src/utils/clustering.ts) - Cluster detection
- [ ] [`scoring.ts`](src/utils/scoring.ts) - Confidence calculation
- [ ] [`categorization.ts`](src/utils/categorization.ts) - Category detection
- [ ] [`ticket-generation.ts`](src/utils/ticket-generation.ts) - Ticket creation
- [ ] [`bob-prompt-generation.ts`](src/utils/bob-prompt-generation.ts) - Prompt formatting

### Integration Tests
- [ ] Full flow: messages → clusters → ticket
- [ ] Sample data loading
- [ ] File upload and parsing
- [ ] Export functionality

### Manual Tests
- [ ] All 3 sample datasets process correctly
- [ ] UI is responsive on mobile, tablet, desktop
- [ ] Copy to clipboard works
- [ ] Export to JSON/Markdown works
- [ ] Navigation between pages works
- [ ] Loading states display correctly
- [ ] Error states display correctly

### Browser Compatibility
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if available)

---

## Bob Session Export Checklist

### Required Exports
- [ ] Plan Mode session (this planning phase)
- [ ] Plan Mode token usage screenshot
- [ ] Code Mode session (implementation)
- [ ] Code Mode token usage screenshot
- [ ] Review Mode session (code review and refinement)
- [ ] Review Mode token usage screenshot

### Optional Exports
- [ ] Additional Code Mode sessions for specific features
- [ ] Ask Mode sessions for technical questions
- [ ] Debug Mode sessions if issues arise

### Export Guidelines
- Export as Markdown files
- Include full conversation context
- Redact any accidental sensitive information
- Name files descriptively (e.g., `02-code-mode-clustering-logic.md`)
- Include timestamps
- Take clear screenshots of token usage summaries

---

## Judging Checklist

### Theme Alignment: "Turn Idea Into Impact Faster"
- [ ] Demo clearly shows before/after transformation
- [ ] Emphasize time saved in translation phase
- [ ] Highlight reduction in ambiguity
- [ ] Show how Bob IDE accelerates implementation

### Application of Technology
- [ ] IBM Bob IDE used as primary development partner
- [ ] Bob session exports included and documented
- [ ] Clear explanation of Bob's role in development
- [ ] Bob prompts generated by the app itself

### Business Value
- [ ] Clear target audience identified
- [ ] Quantifiable benefits explained
- [ ] Real-world use cases described
- [ ] Scalability potential discussed

### Originality
- [ ] Unique signal-to-software workflow
- [ ] Not just sentiment analysis
- [ ] Not just a chatbot
- [ ] Novel approach to support signal processing

### Presentation
- [ ] Clean, professional UI
- [ ] Clear demo flow
- [ ] Video under 5 minutes
- [ ] Written statement prepared
- [ ] Screenshots in README

### Compliance
- [ ] Only synthetic data used
- [ ] No PII, secrets, or credentials
- [ ] Compliance documentation included
- [ ] Safe for public repository

### Submission Artifacts
- [ ] Public GitHub repository
- [ ] Working deployed demo
- [ ] README with setup instructions
- [ ] Video pitch
- [ ] Written statement
- [ ] Bob session exports

---

## Risks and Mitigations

### Risk 1: Clustering Algorithm Too Simple
**Impact:** Clusters may not be meaningful or accurate

**Mitigation:**
- Start with rule-based keyword matching
- Use multiple sample datasets to validate
- Add manual cluster adjustment in UI (future enhancement)
- Focus on demo clarity over algorithmic sophistication
- Document limitations transparently

### Risk 2: Scope Creep
**Impact:** MVP becomes too complex to finish in hackathon timeframe

**Mitigation:**
- Strict adherence to implementation order
- No features beyond core flow
- Use pre-built UI components (Tailwind, Headless UI)
- Client-side only (no backend)
- 3 sample datasets maximum

### Risk 3: Bob Session Export Quality
**Impact:** Exports may not clearly demonstrate Bob's value

**Mitigation:**
- Export sessions immediately after completion
- Include clear context in each session
- Take screenshots of token usage
- Document Bob's role in [`bob-integration.md`](docs/bob-integration.md)
- Review exports before final submission

### Risk 4: Demo Not Compelling
**Impact:** Judges may not understand the value proposition

**Mitigation:**
- Write detailed [`demo-script.md`](docs/demo-script.md)
- Practice demo multiple times
- Use clear before/after comparison
- Emphasize time savings and clarity gains
- Include visual indicators (confidence scores, badges)

### Risk 5: Compliance Violation
**Impact:** Disqualification or legal issues

**Mitigation:**
- Only synthetic data from day one
- Document dataset creation method
- Pre-submission compliance review
- No external data sources
- Clear compliance documentation

### Risk 6: Technical Deployment Issues
**Impact:** Demo not accessible for judging

**Mitigation:**
- Deploy early and often
- Use reliable hosting (GitHub Pages or Vercel)
- Test deployed version thoroughly
- Have backup deployment option
- Include local setup instructions in README

### Risk 7: Time Management
**Impact:** Not finishing MVP in time

**Mitigation:**
- Follow implementation order strictly
- Set daily milestones
- Cut features if behind schedule
- Focus on core flow first
- Polish is secondary to functionality

---

## Success Criteria

### Minimum Viable Product (Must Have)
1. ✅ User can input synthetic messages
2. ✅ System detects at least 2 clusters
3. ✅ Each cluster has category, severity, confidence
4. ✅ High-confidence cluster generates ticket
5. ✅ Ticket includes Bob IDE prompt
6. ✅ Ticket includes acceptance criteria
7. ✅ Ticket includes test plan
8. ✅ Ticket includes affected files
9. ✅ UI is clean and functional
10. ✅ App is deployed and accessible

### Enhanced Features (Nice to Have)
- Multiple sample datasets
- Export to JSON/Markdown
- Copy Bob prompt to clipboard
- Responsive design
- Loading animations
- Error handling
- File upload support

### Documentation (Must Have)
- Complete README
- Compliance documentation
- Bob session exports
- Demo script
- Architecture documentation

---

## Recommended Next Steps

### Immediate Actions (Today)
1. **Review and approve this plan**
   - Discuss any concerns or modifications
   - Confirm tech stack choices
   - Validate scope and timeline

2. **Export this Bob Plan Mode session**
   - Save as [`bob_sessions/01-plan-mode-session.md`](bob_sessions/01-plan-mode-session.md)
   - Take screenshot of token usage
   - Save as [`bob_sessions/01-plan-mode-summary.png`](bob_sessions/01-plan-mode-summary.png)

3. **Set up development environment**
   - Ensure Node.js and npm/yarn installed
   - Verify Git configuration
   - Prepare code editor (VS Code recommended)

### Phase 1 Start (Tomorrow)
4. **Initialize project with Bob Code Mode**
   - Use Bob to set up Vite + React + TypeScript
   - Configure Tailwind CSS
   - Create folder structure
   - Set up ESLint and Prettier

5. **Create type definitions**
   - Define all TypeScript interfaces
   - Set up type exports

6. **Write synthetic dataset**
   - Create 3 issue clusters
   - 15-20 messages per cluster
   - Document in [`synthetic-dataset-method.md`](docs/synthetic-dataset-method.md)

### Ongoing
7. **Use Bob IDE for all development**
   - Plan Mode for architecture decisions
   - Code Mode for implementation
   - Review Mode for code quality
   - Export all sessions

8. **Daily progress tracking**
   - Follow implementation order
   - Check off completed items
   - Adjust timeline if needed

9. **Regular compliance checks**
   - Review all new content
   - Ensure no sensitive data
   - Validate synthetic dataset

---

## Conclusion

This MVP plan provides a clear, achievable path to building Harmonia for the IBM Bob Hackathon. The focus is on:

- **Simplicity:** Client-side web app, no backend complexity
- **Clarity:** Clear before/after demo value
- **Compliance:** Synthetic data only, well-documented
- **Bob Integration:** Bob IDE as primary development partner
- **Demo Value:** Compelling signal-to-software workflow

The plan is realistic for a hackathon timeframe and prioritizes the core flow over advanced features. By following the implementation order and using Bob IDE throughout, the project should demonstrate both technical capability and alignment with the hackathon theme.

**Next step:** Review this plan, make any necessary adjustments, then switch to Bob Code Mode to begin implementation.