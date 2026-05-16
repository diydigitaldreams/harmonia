# Harmonia - Quick Start Guide

## Prerequisites

- Node.js 18+ and npm
- Modern web browser

For detailed setup instructions, see [`docs/setup.md`](docs/setup.md)

## Run the App

```bash
# Install dependencies (first time only)
npm install

# Start development server
npm run dev
```

Open http://localhost:5173/ in your browser.

## Test the Demo Flow

1. **Click "Load Synthetic Data & Analyze"**
   - Processes 27 synthetic messages
   - Detects 3 issue clusters

2. **Review the clusters**
   - See confidence scores (75-90%)
   - Check categories and severity
   - View evidence snippets

3. **Click any cluster**
   - Generates complete engineering ticket
   - Shows Bob IDE task prompt
   - Displays test plan and docs updates

4. **Copy the Bob prompt**
   - Click "Copy Prompt" button
   - Paste into IBM Bob IDE to implement

## Build for Production

```bash
# Build the app
npm run build

# Preview production build
npm run preview
```

## What to Check

- ✅ All 3 clusters appear
- ✅ Confidence scores are reasonable
- ✅ Tickets have complete information
- ✅ Bob prompts are detailed and actionable
- ✅ Copy to clipboard works
- ✅ UI is responsive

## Documentation

- **Setup:** See README.md
- **Demo Script:** See docs/demo-guide.md
- **Submission Checklist:** See docs/SUBMISSION-READINESS.md
- **Architecture:** See docs/architecture.md

## Compliance

✅ Uses only synthetic data  
✅ No real user information  
✅ Safe for public repository

---

**Ready to demo!** 🚀