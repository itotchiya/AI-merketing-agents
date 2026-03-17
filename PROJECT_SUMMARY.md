# MOS Dashboard - Project Summary

## Overview
A static demo dashboard built with **Astro + Vue.js + Tailwind CSS** showcasing the Marketing Operating System (MOS) interface for 4 different user roles.

## Pages Implemented

### 1. Admin Dashboard (`/`)
- Business Performance Score (BPS)
- 4 KPI Cards (Revenue, Campaigns, ROAS, Conversion)
- Validation Queue (2 items)
- Active Projects (3 cards)
- Agent Activity Chart
- Team Activity Feed

### 2. SuperAdmin Dashboard (`/superadmin`)
- Platform Health Status Banner
- 5 KPI Cards (Health, Businesses, API Requests, Response Time, Uptime)
- Businesses Overview (bar chart)
- Agent Execution Volume (stacked bar chart)
- System Alerts
- Activity Stream

### 3. Manager Dashboard (`/manager`)
- Operations Status Indicator
- 4 KPI Cards (Pending Reviews, Tasks, Campaigns, Performance Score)
- Validation Queue
- Quick Actions Panel
- Mini Content Calendar
- My Projects Grid

### 4. Exécutif Dashboard (`/executif`)
- Current Assignment (prominent card with progress)
- 4 KPI Cards (Variants, Drafts, Campaigns, My Score)
- My Assigned Agents
- Upcoming Tasks
- Weekly Performance Chart

### 5. Projects (`/projects`)
- Filter tabs (All, Active, Completed, Draft)
- New Project button
- Grid of project cards

### 6. Agent Hub (`/agents`)
- Category tabs (All, Strategic, Operational, Diffusion)
- Color-coded agent cards by category
- Run Agent buttons
- Agent status indicators

### 7. Validation Center (`/validation`)
- Tab navigation (Pending, Approved, Rejected)
- Priority filters
- Validation item cards with preview thumbnails
- Approve/Reject/Request Edits actions

## ✨ Role Switcher Feature

All pages include a **Role Switcher dropdown** in the top bar:

```
┌──────────────────────────────────────────────────────────────┐
│  Dashboard — Welcome back!         [🟣 SuperAdmin ▼] [🔔] [👤]│
└──────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
                            ┌──────────────────┐
                            │ Switch Dashboard │
                            ├──────────────────┤
                            │ 🟣 SuperAdmin  ✓ │
                            │ 🔵 Admin         │
                            │ 🟡 Manager       │
                            │ 🟢 Exécutif      │
                            ├──────────────────┤
                            │ Other Pages      │
                            │ 📁 Projects      │
                            │ 🤖 Agent Hub     │
                            │ ✅ Validation    │
                            └──────────────────┘
```

**Features:**
- Color-coded role indicators (Purple/Blue/Amber/Green)
- Checkmark shows current active role
- One-click navigation to any dashboard
- Quick links to other pages
- Works on all static pages

## Components Created

### UI Components (`/components/ui/`)
- `Button.vue` - Primary, secondary, outline, ghost variants
- `Card.vue` - Card container with header/content/footer slots
- `Badge.vue` - Status badges (default, success, warning, error)
- `Progress.vue` - Progress bar
- `Avatar.vue` - User avatar with fallback

### Layout Components (`/components/layout/`)
- `Sidebar.vue` - Navigation sidebar with role-based menus
- `Header.vue` - Top header with **Role Switcher**, search, notifications, user menu

### Dashboard Components (`/components/dashboard/`)
- `KPICard.vue` - KPI display with trend and sparkline
- `ProjectCard.vue` - Project overview card
- `AgentCard.vue` - Agent card with category colors
- `ValidationItem.vue` - Validation queue item
- `ActivityFeed.vue` - Activity stream list
- `PipelineStep.vue` - Pipeline step indicator

## Design System

### Color Palette
```
Primary:       #4f46e5 (Indigo)
Strategic:     #ec4899 (Pink)
Operational:   #3b82f6 (Blue)
Diffusion:     #10b981 (Emerald)
Success:       #22c55e (Green)
Warning:       #f59e0b (Amber)
Error:         #ef4444 (Red)
Background:    #f8fafc (Slate-50)
Card:          #ffffff (White)
```

### Typography
- Font: Inter (Google Fonts)
- Scale: 10px base with rem units
- Headings: Semibold to Bold
- Body: Regular

### Spacing
- Card padding: 24px
- Card border-radius: 12px
- Grid gap: 24px
- Sidebar width: 240px

## File Structure

```
mos-dashboard/
├── src/
│   ├── components/
│   │   ├── ui/           # 5 UI components
│   │   ├── layout/       # 2 layout components (Sidebar, Header with Role Switcher)
│   │   └── dashboard/    # 6 dashboard components
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── index.astro           # Admin
│   │   ├── superadmin.astro      # SuperAdmin
│   │   ├── manager.astro         # Manager
│   │   ├── executif.astro        # Exécutif
│   │   ├── projects.astro
│   │   ├── agents.astro
│   │   └── validation.astro
│   ├── data/
│   │   └── mockData.ts   # All demo data
│   ├── lib/
│   │   └── utils.ts      # Utility functions
│   ├── styles/
│   │   └── globals.css   # Tailwind + CSS variables
│   └── env.d.ts
├── public/
│   └── favicon.svg
├── package.json
├── astro.config.mjs
├── tailwind.config.mjs
├── postcss.config.mjs
├── tsconfig.json
├── components.json
├── README.md
├── PROJECT_SUMMARY.md
└── QUICKSTART.md
```

## Key Features

1. **Role-Based Views**: 4 distinct dashboards tailored to each user role
2. **Role Switcher**: Top bar dropdown to instantly switch between all dashboards
3. **Color-Coded Agents**: Pink (strategic), Blue (operational), Green (diffusion)
4. **Interactive Components**: Hover states, buttons, tabs (visual only)
5. **Responsive Grid**: Cards adapt to screen size
6. **Clean Aesthetic**: Matches reference images - minimal, modern SaaS look

## How to Run

```bash
cd mos-dashboard
npm install
npm run dev
```

## How to Deploy to Vercel

1. Push to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/mos-dashboard.git
git push -u origin main
```

2. Import in Vercel:
   - Go to vercel.com
   - Import Git Repository
   - Select the repository
   - Framework: Astro
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Deploy

## Mock Data

All data is static and located in `src/data/mockData.ts`:
- 4 users (SuperAdmin, Admin, Manager, Exécutif)
- 4 projects
- 8 agents (categorized)
- 3 validation items
- KPI data for each role
- Activity feed data

## Next Steps for Production

1. Add authentication (Clerk, Auth0, or custom)
2. Connect to backend API
3. Add real-time updates (WebSockets)
4. Implement data fetching
5. Add form validation
6. Add error boundaries
7. Implement search functionality
8. Add dark mode toggle

## Demo URLs

Once deployed, you can access:
- `/` - Admin Dashboard
- `/superadmin` - SuperAdmin Dashboard
- `/manager` - Manager Dashboard
- `/executif` - Exécutif Dashboard
- `/projects` - Projects
- `/agents` - Agent Hub
- `/validation` - Validation Center

**Use the Role Switcher dropdown in the top bar to instantly jump between dashboards!**
