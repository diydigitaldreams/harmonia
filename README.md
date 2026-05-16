# Harmonia

**Turn developer support chatter into repo-aware engineering action**

Harmonia is a proof-of-concept project for the IBM Bob Hackathon that demonstrates how messy developer-support signals can be transformed into structured, actionable engineering work.

## Hackathon Theme

**Turn idea into impact faster.**

Harmonia focuses on the messy middle between an idea/problem being reported and an engineering team knowing what to do next.

## What Harmonia Does

1. **Loads synthetic developer-support chatter** - Sample messages representing common support issues
2. **Detects issue clusters** - Groups related messages using similarity analysis
3. **Assigns metadata** - Category, severity, confidence score, and review status for each cluster
4. **Generates IBM Bob IDE task prompts** - Ready-to-use prompts for implementation
5. **Produces engineering-ready output:**
   - Ticket title and summary
   - Evidence from support messages
   - Likely affected files
   - Acceptance criteria
   - Test plan (unit, integration, manual)
   - Documentation update plan

## Demo Flow

```
Synthetic Messages → Clustering → Analysis → Ticket Generation → Bob IDE Prompt
```

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Modern web browser

For detailed setup instructions and troubleshooting, see [`docs/setup.md`](docs/setup.md)

### Installation

```bash
# Clone the repository
git clone https://github.com/diydigitaldreams/harmonia.git
cd harmonia

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## Usage

1. **Step 1: Load Data**
   - Click "Load Synthetic Data & Analyze"
   - The app processes 27 synthetic support messages

2. **Step 2: Review Clusters**
   - View detected issue clusters with confidence scores
   - Each cluster shows category, severity, and review status
   - Click any cluster to generate a ticket

3. **Step 3: Generate Ticket**
   - View complete engineering ticket
   - See IBM Bob IDE task prompt
   - Copy prompt to use in Bob IDE
   - Review acceptance criteria, test plan, and docs updates

## IBM Bob IDE Usage

IBM Bob IDE is the primary AI development partner for this project.

Bob was used for:
- Planning the MVP architecture
- Generating implementation code
- Creating the clustering algorithm
- Building the React UI
- Reviewing and refining code
- Producing documentation

All relevant Bob task session exports are stored in:

```
bob_sessions/
```

### How the App Uses Bob

The app generates Bob IDE task prompts that include:
- Full context from issue clusters
- Specific task description
- Affected files
- Implementation constraints
- Expected output
- Acceptance criteria
- Test plan

These prompts can be copied and used directly in IBM Bob IDE to implement solutions.

## Data Policy

This repository uses **synthetic English-language developer-support data only**.

It does NOT include:
- Real Discord logs or Slack exports
- Social media data
- Client data or confidential company data
- Personal information or PII
- API keys, secrets, or credentials

See [`docs/data-compliance-note.md`](docs/data-compliance-note.md) for details.

## Project Structure

```
harmonia/
├── src/
│   ├── types/           # TypeScript type definitions
│   ├── data/            # Synthetic dataset
│   ├── utils/           # Core logic (clustering, scoring, etc.)
│   ├── App.tsx          # Main React component
│   ├── main.tsx         # Entry point
│   └── index.css        # Styles
├── docs/                # Documentation
│   ├── mvp-plan.md
│   ├── architecture.md
│   ├── bob-integration.md
│   └── ...
├── bob_sessions/        # IBM Bob IDE session exports
└── package.json
```

## Technology Stack

- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Processing:** Client-side JavaScript (no backend)
- **AI Partner:** IBM Bob IDE

## Key Features

### Clustering Algorithm
- Keyword extraction from messages
- Similarity scoring using Jaccard similarity
- Automatic cluster detection
- Minimum cluster size validation

### Confidence Scoring
- Message count factor
- Keyword consistency analysis
- Evidence strength evaluation
- Temporal clustering detection

### Categorization
- Automatic issue category detection
- Severity assignment
- Review status determination
- Affected file inference

### Ticket Generation
- Engineering-ready ticket format
- Category-specific acceptance criteria
- Comprehensive test plans
- Documentation update plans

### Bob Prompt Generation
- Context-aware prompt creation
- Mode selection (Plan/Code/Review)
- Constraint specification
- Expected output definition

## Documentation

- [`docs/setup.md`](docs/setup.md) - Detailed setup and installation guide
- [`docs/mvp-plan.md`](docs/mvp-plan.md) - Complete MVP implementation plan
- [`docs/architecture.md`](docs/architecture.md) - System architecture and data flow
- [`docs/bob-integration.md`](docs/bob-integration.md) - How IBM Bob IDE is used
- [`docs/data-compliance-note.md`](docs/data-compliance-note.md) - Data compliance policy
- [`docs/synthetic-dataset-method.md`](docs/synthetic-dataset-method.md) - Dataset design approach
- [`docs/judging-map.md`](docs/judging-map.md) - Hackathon evaluation alignment

## Demo Video

[Link to demo video - under 5 minutes]

## Submission Artifacts

- ✅ Public GitHub repository
- ✅ Working proof-of-concept
- ✅ Synthetic dataset only
- ✅ IBM Bob IDE session exports
- ✅ Comprehensive documentation
- ⏳ Demo video (in progress)
- ⏳ Written statement (in progress)

## Business Value

Harmonia addresses a real problem: engineering teams lose time translating vague human reports into clear work.

**Benefits:**
- Reduces time from report to action
- Structures ambiguous feedback
- Generates actionable tickets
- Creates Bob-ready implementation prompts
- Improves support signal quality

**Target Users:**
- Hackathon teams
- Developer tools companies
- Support-heavy SaaS teams
- Internal engineering organizations

## Originality

Harmonia is not just sentiment analysis or a chatbot. It's a **signal-to-software workflow** that bridges the gap between scattered human feedback and structured engineering action.

## Future Enhancements

- Real-time message streaming
- Machine learning-based clustering
- Integration with issue trackers (Jira, GitHub Issues)
- Multi-language support
- Team collaboration features
- Historical trend analysis
- Direct IBM Bob IDE API integration

## License

MIT License - See [LICENSE](LICENSE) file

## Contributing

This is a hackathon proof-of-concept. Contributions, issues, and feature requests are welcome!

## Acknowledgments

- Built for the IBM Bob Hackathon 2024
- Developed with IBM Bob IDE as the primary AI partner
- Theme: "Turn idea into impact faster"

## Contact

Repository: https://github.com/diydigitaldreams/harmonia

---

**Note:** This is a proof-of-concept demonstration using synthetic data only. It is not intended for production use without significant additional development, testing, and security review.
