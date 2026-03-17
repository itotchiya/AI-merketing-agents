# MOS Dashboard - Developer Handover Document

## 📋 Project Overview

**MOS (Marketing Operating System)** is a comprehensive marketing automation dashboard built with Astro 5.x, Vue 3, and Tailwind CSS. It supports 4 user roles with different permissions and capabilities.

---

## 🏗️ Architecture

### Tech Stack
- **Framework**: Astro 5.x (Static Site Generation)
- **Frontend**: Vue 3 + TypeScript
- **Styling**: Tailwind CSS v4 + Custom MOS theme
- **Icons**: lucide-vue-next
- **Build Output**: Static HTML for Vercel deployment

### Directory Structure
```
src/
├── components/
│   ├── agents/           # Agent-related components
│   ├── businesses/       # Business management
│   ├── dashboard/        # Dashboard widgets
│   ├── executif/         # Exécutif role views
│   ├── layout/           # Layout components
│   ├── manager/          # Manager role views
│   ├── projects/         # Project components
│   ├── reports/          # Report components
│   ├── team/             # Team management
│   ├── ui/               # Reusable UI components
│   └── validation/       # Validation components
├── data/
│   └── mockData.ts       # All mock data
├── layouts/
│   └── Layout.astro      # Main layout
├── pages/                # All pages
│   └── projects/
│       └── [id].astro    # Dynamic project pages
└── types/                # TypeScript types
```

---

## 👥 User Roles

### 1. SuperAdmin (`/superadmin`)
**Access**: All system features
- Platform-wide business management
- System health monitoring
- User management across all tenants
- Audit logs
- Global settings

### 2. Admin (`/`)
**Access**: Single business/tenant
- Project management
- Agent orchestration
- Team management
- Validation workflows
- Reports

### 3. Manager (`/manager`)
**Access**: Operations and execution
- Personal task queue
- Calendar view
- Agent execution
- Validation approval
- Team overview

### 4. Exécutif (`/executif`)
**Access**: Individual contributor
- Personal task assignments
- Active work tracking
- Agent usage
- Performance stats

---

## 📄 Page Inventory

### Core Pages
| Page | Route | Role | Features |
|------|-------|------|----------|
| Admin Dashboard | `/` | Admin | KPIs, validations, projects, activity |
| SuperAdmin Dashboard | `/superadmin` | SuperAdmin | Multi-tenant overview, system health |
| Manager Dashboard | `/manager` | Manager | Tasks, calendar, operations |
| Exécutif Dashboard | `/executif` | Exécutif | Work assignments, performance |

### Feature Pages
| Page | Route | Description |
|------|-------|-------------|
| Projects | `/projects` | Project listing with filters |
| Project Detail | `/projects/:id` | **Single project view with orchestration** |
| Agents | `/agents` | Agent catalog with categories |
| Validation | `/validation` | Approval queue with tabs |
| Team | `/team` | Team management with modals |
| Reports | `/reports` | Report categories and downloads |
| Businesses | `/businesses` | **SuperAdmin business management** |
| Health | `/health` | System monitoring |
| Users | `/users` | User management |
| Audit | `/audit` | Activity logs |
| Settings | `/settings` | Role-specific settings |

---

## 🎯 Key Features Implemented

### 1. Project Detail Page (`/projects/:id`)
**Full project orchestration view:**
- **Project Overview**: Status, progress bars, time tracking
- **Agent Workflow**: Visual step-by-step orchestration
  - Shows each agent in sequence
  - Real-time progress indicators
  - Status: Pending → In Progress → Completed
  - Actions: Pause, Restart, Review
- **Tasks**: Project task list with completion tracking
- **Team**: Project team members
- **Resources**: Files, documents, assets
- **Activity**: Timeline of project events

**Modals:**
- Edit Project
- Manage Team
- Archive Confirmation

### 2. Business Management (`/businesses`)
**SuperAdmin multi-tenant features:**
- Business cards with stats (users, projects, revenue)
- Status filtering (Active/Suspended/Trial)
- Search functionality

**Modals:**
- Add Business (with plan selection)
- Edit Business (usage stats displayed)
- Suspend Business (with reason selection)

### 3. Team Management (`/team`)
**Team administration:**
- Member cards with role, projects, tasks
- Role-based filtering
- Stats overview

**Modals:**
- Invite Member (email, role, projects)
- Edit Member (role, status)
- Remove Member (with confirmation)

### 4. Functional Tabs (All Pages)
All tabs use Vue reactive state (`ref`, `computed`) for instant switching:
- Validation: Pending/Approved/Rejected + Priority filter
- Agents: All/Strategic/Operational/Diffusion
- Projects: All/Active/Completed/Draft
- Manager: Overview/Tasks/Calendar
- Exécutif: Current Task/My Agents/Performance
- Reports: Category cards with dynamic filtering

### 5. Sidebar Active States
Dynamic route highlighting based on `activePath` prop:
```vue
<Sidebar role="admin" activePath="/projects" client:load />
```

---

## 🎨 UI Components

### Reusable Components
- **KPICard**: Metric display with trend
- **ProjectCard**: Project summary with progress
- **AgentCard**: Agent info with launch button
- **ValidationItem**: Approval queue item
- **ActivityFeed**: Timeline of events

### Modal Pattern
All modals use Vue reactive state:
```vue
<script setup>
const showModal = ref(false);
const selectedItem = ref(null);
</script>

<Button @click="showModal = true">Open</Button>

<div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
  <div class="rounded-xl border bg-card p-6 w-full max-w-md">
    <!-- Modal content -->
  </div>
</div>
```

---

## 📊 Data Model

### Key Interfaces (mockData.ts)
```typescript
interface Project {
  id: number;
  name: string;
  objective: string;
  budget: number;
  status: 'active' | 'draft' | 'completed';
  progress: number;
  team: string[];
  nextStep: string;
  dueDate: string;
  description?: string;
}

interface Agent {
  id: number;
  name: string;
  category: 'strategic' | 'operational' | 'diffusion';
  inputs: string[];
  outputs: string[];
  avgTime: string;
  status: 'available' | 'busy' | 'maintenance';
}

interface TeamMember {
  id: number;
  name: string;
  email: string;
  initials: string;
  role: string;
  status: string;
  projects: number;
  tasksCompleted: number;
}

interface Business {
  id: number;
  name: string;
  industry: string;
  users: number;
  projects: number;
  revenue: number;
  plan: 'starter' | 'professional' | 'enterprise';
  status: 'active' | 'suspended' | 'trial';
}
```

---

## 🚀 Build & Deploy

### Local Development
```bash
cd mos-dashboard
npm install
npm run dev
```

### Production Build
```bash
npm run build
```
Output: `dist/` folder with static HTML

### Deployment
- **Vercel**: Connect GitHub repo, Astro preset
- **Netlify**: Same configuration
- **Static Hosting**: Upload `dist/` contents

---

## 🔌 API Integration Points

### Current: Static Mock Data
All data currently comes from `src/data/mockData.ts`

### Future Integration Points

#### 1. Authentication
```typescript
// Replace role switching with real auth
const currentUser = await authAPI.getCurrentUser();
const role = currentUser.role; // 'admin' | 'superadmin' | 'manager' | 'executif'
```

#### 2. Projects API
```typescript
// Replace mock projects
const projects = await fetch('/api/projects');
const project = await fetch(`/api/projects/${id}`);
```

#### 3. Agent Orchestration API
```typescript
// Real-time workflow updates
const workflow = await fetch(`/api/projects/${id}/workflow`);
// WebSocket for live progress
ws.subscribe(`project:${id}:workflow`, (update) => {
  workflowSteps.value = update.steps;
});
```

#### 4. Business API (SuperAdmin)
```typescript
const businesses = await fetch('/api/businesses');
await fetch('/api/businesses', { method: 'POST', body: data });
await fetch(`/api/businesses/${id}`, { method: 'PATCH', body: data });
```

---

## 🎭 Role-Based Feature Access

```typescript
const rolePermissions = {
  superadmin: {
    pages: ['*'],
    actions: ['create_business', 'suspend_business', 'manage_users', 'view_audit']
  },
  admin: {
    pages: ['/', '/projects', '/agents', '/validation', '/reports', '/team', '/settings'],
    actions: ['create_project', 'edit_project', 'manage_team', 'approve_validation']
  },
  manager: {
    pages: ['/manager', '/agents', '/validation', '/reports', '/team'],
    actions: ['view_tasks', 'run_agents', 'approve_validation']
  },
  executif: {
    pages: ['/executif', '/agents'],
    actions: ['view_tasks', 'run_agents', 'view_stats']
  }
};
```

---

## 📱 Responsive Breakpoints

```css
/* Tailwind breakpoints used */
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
```

Sidebar collapses to hamburger menu on mobile (to be implemented).

---

## 🔮 Future Enhancements

### High Priority
1. **Real-time Updates**: WebSocket integration for live agent progress
2. **Authentication**: Login page + JWT session management
3. **API Integration**: Replace mock data with real backend
4. **Mobile Responsive**: Collapsible sidebar, touch-friendly modals

### Medium Priority
5. **Notifications**: Real-time notification system
6. **Search**: Global search across projects, agents, team
7. **Filters**: Advanced filtering on all listing pages
8. **Export**: PDF/CSV export for reports

### Nice to Have
9. **Dark Mode**: Theme switching
10. **Keyboard Shortcuts**: Power user features
11. **Onboarding**: First-time user tour
12. **Analytics**: Usage analytics dashboard

---

## 🐛 Known Limitations

1. **Static Data**: All data is mock data, no persistence
2. **No Auth**: Role switching is manual via dropdown
3. **No Real-time**: Agent progress is simulated
4. **Limited Mobile**: Sidebar doesn't collapse on mobile yet

---

## 📞 Questions?

For detailed component usage, see:
- `src/components/projects/ProjectDetailView.vue` - Complex component example
- `src/components/team/TeamManager.vue` - Modal implementation
- `src/data/mockData.ts` - Data structure reference

---

**Last Updated**: March 2026
**Version**: 1.0.0
