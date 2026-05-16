# Harmonia Setup Guide

## System Requirements

### Required
- **Node.js:** Version 18.0.0 or higher
- **npm:** Version 9.0.0 or higher (comes with Node.js)
- **Modern Web Browser:** Chrome 90+, Firefox 88+, Safari 14+, or Edge 90+

### Recommended
- **Operating System:** Ubuntu 20.04+, macOS 11+, or Windows 10+
- **RAM:** 4GB minimum, 8GB recommended
- **Disk Space:** 500MB for dependencies

## Installation Steps

### 1. Install Node.js

If you don't have Node.js installed:

**Ubuntu/Debian:**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**macOS (using Homebrew):**
```bash
brew install node@18
```

**Windows:**
Download from https://nodejs.org/

**Verify installation:**
```bash
node --version  # Should show v18.x.x or higher
npm --version   # Should show v9.x.x or higher
```

### 2. Clone the Repository

```bash
git clone https://github.com/diydigitaldreams/harmonia.git
cd harmonia
```

### 3. Install Dependencies

```bash
npm install
```

This will install:
- React 18.2.0
- TypeScript 5.2.2
- Vite 5.0.8
- Tailwind CSS 3.4.0
- And other required packages

**Expected time:** 1-3 minutes depending on internet speed

### 4. Start Development Server

```bash
npm run dev
```

You should see:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### 5. Open in Browser

Navigate to http://localhost:5173/

You should see the Harmonia home page with "Load Synthetic Data & Analyze" button.

## Build for Production

### Create Production Build

```bash
npm run build
```

This creates an optimized build in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

Opens the production build at http://localhost:4173/

## Troubleshooting

### Port Already in Use

If port 5173 is already in use:

```bash
# Kill the process using the port
lsof -ti:5173 | xargs kill -9

# Or use a different port
npm run dev -- --port 3000
```

### Dependencies Installation Fails

```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### TypeScript Errors

```bash
# Rebuild TypeScript
npm run build
```

If errors persist, check that you have TypeScript 5.2.2:
```bash
npm list typescript
```

### Vite Build Fails

Ensure you have enough disk space:
```bash
df -h
```

Clear Vite cache:
```bash
rm -rf node_modules/.vite
npm run dev
```

### Browser Compatibility Issues

Harmonia requires a modern browser with:
- ES2020 support
- CSS Grid and Flexbox
- JavaScript modules
- Clipboard API (for copy functionality)

**Supported browsers:**
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

### Dark Mode Not Working

Dark mode uses system preferences. To test:

**macOS:**
System Preferences → General → Appearance

**Windows:**
Settings → Personalization → Colors → Choose your mode

**Linux:**
Depends on desktop environment (GNOME, KDE, etc.)

## Development Tips

### Hot Module Replacement

Vite provides instant hot module replacement. Changes to source files will update immediately in the browser without full page reload.

### TypeScript Checking

```bash
# Check types without building
npx tsc --noEmit
```

### Linting

```bash
# Run ESLint (if configured)
npm run lint
```

### Code Formatting

The project uses Prettier for code formatting. Most editors can auto-format on save.

## Environment Variables

Harmonia doesn't require any environment variables. All processing happens client-side.

## Deployment

### GitHub Pages

```bash
# Build
npm run build

# Deploy (requires gh-pages package)
npm install -D gh-pages
npx gh-pages -d dist
```

### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

Drag and drop the `dist/` folder to https://app.netlify.com/drop

Or use Netlify CLI:
```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

## Testing the App

### Manual Testing Checklist

1. **Load Data**
   - Click "Load Synthetic Data & Analyze"
   - Verify 3 clusters appear

2. **Review Clusters**
   - Check confidence scores (should be 75-90%)
   - Verify categories are assigned
   - Check evidence snippets display

3. **Generate Ticket**
   - Click on a cluster
   - Verify complete ticket appears
   - Check all sections are populated

4. **Copy Bob Prompt**
   - Click "Copy Prompt" button
   - Paste into a text editor
   - Verify prompt is complete and formatted

5. **Navigation**
   - Test "Back to Clusters" button
   - Test "Start Over" button
   - Verify state resets correctly

6. **Responsive Design**
   - Resize browser window
   - Test on mobile device (or use browser dev tools)
   - Verify layout adapts properly

7. **Dark Mode**
   - Switch system theme
   - Verify app theme updates
   - Check readability in both modes

## Getting Help

### Documentation
- **README.md** - Project overview
- **QUICKSTART.md** - Fast reference
- **docs/architecture.md** - System design
- **docs/demo-guide.md** - Demo walkthrough

### Common Issues
- **App won't start:** Check Node.js version
- **Build fails:** Clear cache and reinstall dependencies
- **Clusters not detected:** Verify synthetic data loaded correctly
- **Copy doesn't work:** Check browser clipboard permissions

### Support
- GitHub Issues: https://github.com/diydigitaldreams/harmonia/issues
- Repository: https://github.com/diydigitaldreams/harmonia

## Next Steps

After successful setup:

1. Read the [Demo Guide](demo-guide.md) for presentation tips
2. Review [Architecture](architecture.md) to understand the system
3. Check [Bob Integration](bob-integration.md) to see how IBM Bob IDE was used
4. See [SUBMISSION-READINESS.md](SUBMISSION-READINESS.md) for hackathon checklist

---

**Setup complete!** You're ready to demo Harmonia. 🚀