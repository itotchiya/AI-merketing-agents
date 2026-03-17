# Local Testing Guide - MOS Dashboard

## Prerequisites Check

### 1. Check Node.js Version
Open PowerShell or CMD and run:
```powershell
node -v
```

**Required**: Node.js 18.x or higher
**If you get an error or old version**: Download from https://nodejs.org/ (LTS version)

### 2. Check npm
```powershell
npm -v
```
Should show version 9.x or higher

---

## Step-by-Step Local Setup

### Step 1: Navigate to Project
```powershell
cd "C:\Users\lenovo\Downloads\Agent marketing\mos-dashboard"
```

### Step 2: Install Dependencies
```powershell
npm install
```

**Expected output**:
```
added 450 packages in 15s

> mos-dashboard@0.0.1 postinstall
> echo "Dependencies installed!"
```

**If you get errors**:
- Delete `node_modules` folder and `package-lock.json`
- Run `npm install` again

### Step 3: Start Development Server
```powershell
npm run dev
```

**Expected output**:
```
  🚀  astro  v4.0.0 started
  ├─ Local    http://localhost:4321/
  ├─ Network  http://192.168.x.x:4321/
  └─ output   static
```

### Step 4: Open in Browser
1. Open Chrome/Edge/Firefox
2. Go to: `http://localhost:4321`
3. You should see the **Admin Dashboard**

---

## Testing Checklist

### ✅ Dashboard Tests

#### Admin Dashboard (`/`)
- [ ] Page loads without errors
- [ ] MOS logo visible in sidebar
- [ ] Business Performance Score shows 8.4/10
- [ ] 4 KPI cards display (Revenue, Campaigns, ROAS, Conversion)
- [ ] Validation queue shows 2 items
- [ ] Projects section shows cards
- [ ] Agent activity chart visible
- [ ] Team activity feed populated

#### Role Switcher (Top Bar)
- [ ] Click "🔵 Admin Dashboard ▼" dropdown
- [ ] See all 4 role options with colors
- [ ] Click "🟣 SuperAdmin" → navigates to /superadmin
- [ ] Click "🟡 Manager" → navigates to /manager
- [ ] Click "🟢 Exécutif" → navigates to /executif

#### SuperAdmin Dashboard (`/superadmin`)
- [ ] Green "All Systems Operational" banner
- [ ] 5 KPI cards (Health, Businesses, API, Response Time, Uptime)
- [ ] Bar chart showing businesses
- [ ] Stacked bar chart for agent volume
- [ ] System alerts section

#### Manager Dashboard (`/manager`)
- [ ] Operations status indicator
- [ ] Quick Actions panel
- [ ] Mini calendar widget
- [ ] My Projects grid

#### Exécutif Dashboard (`/executif`)
- [ ] Large "Current Assignment" card at top
- [ ] Progress bar at 40%
- [ ] My Assigned Agents list
- [ ] Upcoming Tasks
- [ ] Weekly performance chart

#### Projects Page (`/projects`)
- [ ] Filter tabs (All, Active, Completed, Draft)
- [ ] Project cards with progress bars
- [ ] Team avatars on cards

#### Agent Hub (`/agents`)
- [ ] Category tabs (All, Strategic, Operational, Diffusion)
- [ ] Cards with colored left borders
  - [ ] Pink = Strategic
  - [ ] Blue = Operational
  - [ ] Green = Diffusion
- [ ] Run Agent buttons
- [ ] Studio Créatif shows "Running..." status

#### Validation Center (`/validation`)
- [ ] Tabs: Pending (3), Approved, Rejected
- [ ] Priority filter buttons
- [ ] Validation items with thumbnails
- [ ] Approve/Reject/Request Edits buttons

---

## Visual Verification

### Design Elements to Check

#### Colors
- [ ] Background is light gray (#f8fafc)
- [ ] Cards are white with rounded corners (12px)
- [ ] Primary buttons are indigo (#4f46e5)
- [ ] Strategic agents have pink accents
- [ ] Operational agents have blue accents
- [ ] Diffusion agents have green accents

#### Typography
- [ ] Font is Inter (clean, modern)
- [ ] Headings are bold
- [ ] Body text is readable

#### Layout
- [ ] Sidebar is fixed on left (240px width)
- [ ] Header is sticky at top
- [ ] Cards have consistent spacing (24px padding)
- [ ] Grid layouts work on different screen sizes

---

## Common Issues & Solutions

### Issue 1: Port 4321 Already in Use
**Error**: "Port 4321 is already in use"

**Solution**:
```powershell
npm run dev -- --port 3000
```
Then open: `http://localhost:3000`

### Issue 2: "Cannot find module"
**Error**: "Cannot find module '@/components/..."

**Solution**:
1. Stop the server (Ctrl+C)
2. Delete `.astro` folder
3. Run `npm run dev` again

### Issue 3: Styles Not Loading
**Error**: Page looks unstyled (no colors, plain HTML)

**Solution**:
```powershell
# Rebuild
npm run build
npm run preview
```

### Issue 4: Icons Not Showing
**Error**: Icons appear as squares or missing

**Solution**:
```powershell
# Reinstall lucide icons
npm install lucide-vue-next
npm run dev
```

### Issue 5: Vue Components Not Rendering
**Error**: Seeing `{{ variable }}` or component tags as text

**Solution**:
Make sure `client:load` directive is on Vue components in .astro files:
```astro
<KPICard client:load />
```

---

## Responsive Testing

### Test Different Screen Sizes

#### Desktop (1440px+)
- [ ] Sidebar fully visible
- [ ] 4 KPI cards in a row
- [ ] 3 project cards in a row
- [ ] All navigation visible

#### Laptop (1024px)
- [ ] Sidebar still visible
- [ ] 2-3 cards per row
- [ ] No horizontal scroll

#### Tablet (768px)
- [ ] Sidebar may collapse (if implemented)
- [ ] 2 cards per row
- [ ] Touch-friendly buttons

---

## Build Test (Before Deploying)

Once everything looks good in dev mode:

```powershell
# Build for production
npm run build
```

**Expected output**:
```
Building static entrypoints...
▶ src/pages/index.astro
  └─ /index.html (+20ms)
▶ src/pages/superadmin.astro
  └─ /superadmin.html (+15ms)
...
▶ src/pages/validation.astro
  └─ /validation.html (+12ms)

Completed in 3.45s
```

```powershell
# Test production build locally
npm run preview
```

Open `http://localhost:4321` and verify everything works.

---

## Quick Debug Commands

```powershell
# Check Astro version
npx astro --version

# Check for TypeScript errors
npx tsc --noEmit

# Lint Vue files (if eslint configured)
npx eslint src/

# Clear all caches
rm -rf node_modules .astro dist package-lock.json
npm install
```

---

## Success Criteria

✅ **Local testing successful if:**
1. All 7 pages load without console errors
2. Role switcher works (dropdown opens, navigation works)
3. All cards display properly
4. Colors look correct
5. Responsive layout works
6. Production build succeeds (`npm run build`)

Once all checks pass → Ready to deploy to Vercel! 🚀
