# Quick Start Guide

## Option 1: Local Development

```bash
# Navigate to project
cd mos-dashboard

# Install dependencies
npm install

# Start dev server
npm run dev

# Open http://localhost:4321
```

## Option 2: Build and Preview

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Option 3: Deploy to Vercel

### Using Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Using Git + Vercel Dashboard
```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial MOS Dashboard commit"

# Create repo on GitHub and push
git remote add origin https://github.com/YOUR_USERNAME/mos-dashboard.git
git branch -M main
git push -u origin main

# Then import in Vercel dashboard
```

## URLs to Test

Once running, visit:

- `/` - Admin Dashboard
- `/superadmin` - SuperAdmin Dashboard
- `/manager` - Manager Dashboard
- `/executif` - Exécutif Dashboard
- `/projects` - Projects List
- `/agents` - Agent Hub
- `/validation` - Validation Center

## Project Structure Quick Reference

```
mos-dashboard/
├── src/
│   ├── components/     # Vue components
│   ├── layouts/        # Astro layouts
│   ├── pages/          # Routes (7 pages)
│   ├── data/           # Mock data
│   └── styles/         # CSS
├── public/             # Static assets
└── package.json
```

## Troubleshooting

**Issue: Port already in use**
```bash
npm run dev -- --port 3000
```

**Issue: Node version too old**
Make sure you have Node.js 18+ installed.

**Issue: Dependencies not found**
```bash
rm -rf node_modules package-lock.json
npm install
```
