# 🚀 START HERE - Quick Setup

## Prerequisites
- [Node.js 18+](https://nodejs.org/) installed
- A web browser (Chrome, Edge, Firefox)

---

## ⚡ Quick Start (3 Steps)

### Step 1: Open PowerShell
Press `Win + X`, then select **Windows PowerShell** or **Terminal**

### Step 2: Navigate to Project
```powershell
cd "C:\Users\lenovo\Downloads\Agent marketing\mos-dashboard"
```

### Step 3: Run Test Script
```powershell
.\test-local.ps1
```

This will:
- ✅ Check Node.js is installed
- ✅ Install dependencies (if needed)
- ✅ Verify all files exist
- ✅ Build the project
- ✅ Tell you if everything is ready

---

## 🎨 Manual Testing (If Script Works)

### Start Dev Server
```powershell
npm run dev
```

### Open Browser
Go to: **http://localhost:4321**

You should see:
```
┌─────────────────────────────────────────────────────────┐
│  🎨 MOS       Dashboard — Welcome back!   [🔵 Admin ▼] │
├──────────┬──────────────────────────────────────────────┤
│          │  Welcome back, Thomas! 👋                    │
│  📊      │  Business Performance Score: 8.4/10          │
│  📁      │                                               │
│  🤖      │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐│
│  ✅ (3)  │  │€24,500 │ │   8    │ │  4.2x  │ │  3.8%  ││
│  📈      │  └────────┘ └────────┘ └────────┘ └────────┘│
│  👥      │                                               │
│  ⚙️      │  [Pending Validations]    [Active Projects] │
└──────────┴──────────────────────────────────────────────┘
```

---

## 🔄 Test Role Switcher

1. Click **"🔵 Admin Dashboard ▼"** in top bar
2. Select **"🟣 SuperAdmin"** from dropdown
3. You should see the SuperAdmin dashboard with:
   - Green "All Systems Operational" banner
   - 5 KPI cards
   - Business charts

---

## 📋 Test All Pages

| URL | What to Check |
|-----|---------------|
| `/` | Admin Dashboard |
| `/superadmin` | Platform Health, Charts |
| `/manager` | Operations, Quick Actions |
| `/executif` | Current Assignment, Progress |
| `/projects` | Project Cards, Filters |
| `/agents` | Agent Cards (Pink/Blue/Green) |
| `/validation` | Validation Queue, Buttons |

---

## 🔧 If Something Breaks

### Problem: Port already in use
```powershell
npm run dev -- --port 3000
```

### Problem: Build fails
```powershell
# Clear everything and restart
rm -rf node_modules .astro
npm install
npm run dev
```

### Problem: Can't find module
```powershell
# Make sure you're in the right folder
pwd  # Should show: ...\mos-dashboard
```

---

## ✅ Success Checklist

Before deploying, verify:

- [ ] `npm run dev` starts without errors
- [ ] Admin Dashboard loads at `/`
- [ ] Role switcher dropdown works
- [ ] Can navigate to all 4 role dashboards
- [ ] Agent cards show correct colors (Pink/Blue/Green)
- [ ] Charts and progress bars visible
- [ ] `npm run build` completes successfully

---

## 🌐 Deploy to Vercel (After Testing)

```powershell
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Follow prompts:
- Set up and deploy? **Y**
- Link to existing project? **N** (create new)
- What's your project name? **mos-dashboard**

---

## 📚 More Documentation

- `LOCAL_TESTING_GUIDE.md` - Detailed testing instructions
- `BUILD_CHECKLIST.md` - Build verification
- `FIXES_SUMMARY.md` - What was fixed
- `PROJECT_SUMMARY.md` - Project overview

---

## 🆘 Need Help?

If you get stuck:

1. Check `build.log` for error messages
2. Run `test-local.ps1` to diagnose issues
3. Make sure Node.js is 18+: `node -v`
4. Try deleting `node_modules` and running `npm install` again

---

**Ready? Let's test! Run:**
```powershell
.\test-local.ps1
```
