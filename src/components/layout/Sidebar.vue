<template>
  <aside class="fixed left-0 top-0 z-40 h-screen w-60 border-r border-border bg-card">
    <!-- Logo -->
    <div class="flex h-16 items-center border-b border-border px-6">
      <div class="flex items-center gap-2">
        <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
          M
        </div>
        <span class="text-lg font-semibold">MOS</span>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex flex-col gap-1 p-4">
      <div v-for="section in navigation" :key="section.title" class="mb-4">
        <p class="mb-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {{ section.title }}
        </p>
        <div class="flex flex-col gap-1">
          <a
            v-for="item in section.items"
            :key="item.label"
            :href="item.href"
            :class="cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              isActive(item.href)
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            )"
          >
            <component :is="item.icon" class="h-4 w-4" />
            {{ item.label }}
            <Badge v-if="item.badge" variant="destructive" class="ml-auto text-[10px] px-1.5 py-0">
              {{ item.badge }}
            </Badge>
          </a>
        </div>
      </div>
    </nav>

    <!-- User Profile -->
    <div class="absolute bottom-0 left-0 right-0 border-t border-border p-4">
      <div class="flex items-center gap-3">
        <Avatar fallback="TA" class="h-9 w-9" />
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium truncate">{{ userName }}</p>
          <p class="text-xs text-muted-foreground capitalize">{{ userRoleLabel }}</p>
        </div>
        <div class="h-2 w-2 rounded-full bg-green-500" />
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@/lib/utils';
import Badge from '@/components/ui/Badge.vue';
import Avatar from '@/components/ui/Avatar.vue';
import {
  LayoutDashboard,
  FolderKanban,
  Bot,
  CheckCircle,
  BarChart3,
  Users,
  Settings,
  Shield,
  Building2,
  HeartPulse,
  ClipboardList,
  Briefcase,
  LineChart,
  TrendingUp,
  Plus,
  UserPlus,
  Eye
} from 'lucide-vue-next';

interface NavItem {
  label: string;
  href: string;
  icon: any;
  badge?: string | number;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const props = defineProps<{
  role?: 'admin' | 'superadmin' | 'manager' | 'executif';
  activePath?: string;
}>();

// Get current path from window location
const currentPath = typeof window !== 'undefined' 
  ? window.location.pathname 
  : '/';

// Get all navigation items for this role
const allNavItems = computed(() => {
  const nav = navigation.value;
  return nav.flatMap(section => section.items);
});

const isActive = (href: string) => {
  // Use provided activePath prop if available, otherwise use currentPath
  const path = props.activePath || currentPath;
  
  // Remove trailing slashes for comparison
  const cleanPath = path.replace(/\/$/, '') || '/';
  const cleanHref = href.replace(/\/$/, '') || '/';
  
  // Exact match
  if (cleanPath === cleanHref) return true;
  
  // For root/dashboard paths, only match exact
  if (cleanHref === '/' || cleanHref === '/manager' || cleanHref === '/executif' || cleanHref === '/superadmin') {
    return cleanPath === cleanHref;
  }
  
  // Check if this href is the most specific match
  // Get all nav items hrefs
  const allHrefs = allNavItems.value.map(item => item.href.replace(/\/$/, '') || '/');
  
  // Filter hrefs that match the current path (path starts with href)
  const matchingHrefs = allHrefs.filter(h => {
    if (h === '/') return false;
    return cleanPath.startsWith(h + '/') || cleanPath === h;
  });
  
  // If there are matching hrefs, only the longest one should be active
  if (matchingHrefs.length > 0) {
    // Sort by length descending to get most specific
    const mostSpecific = matchingHrefs.sort((a, b) => b.length - a.length)[0];
    return cleanHref === mostSpecific;
  }
  
  // Handle query params (e.g., /manager?view=tasks)
  if (cleanHref.includes('?')) {
    return cleanPath.startsWith(cleanHref.split('?')[0]);
  }
  
  return false;
};

// User info based on role
const userName = computed(() => {
  switch (props.role) {
    case 'superadmin': return 'Sarah Chen';
    case 'manager': return 'Marie Dubois';
    case 'executif': return 'Pierre Martin';
    default: return 'Thomas Anderson';
  }
});

const userRoleLabel = computed(() => {
  switch (props.role) {
    case 'superadmin': return 'Super Admin';
    case 'manager': return 'Manager';
    case 'executif': return 'Exécutif';
    default: return 'Admin';
  }
});

// ==================== ADMIN (Monitor Only) ====================
const adminNav: NavSection[] = [
  {
    title: 'Principal',
    items: [
      { label: 'Tableau de bord', href: '/', icon: LayoutDashboard },
      { label: 'Monitoring Projets', href: '/projects', icon: Eye },
      { label: 'Workflow IA', href: '/ai-workflow', icon: TrendingUp },
      { label: 'Hub Agents', href: '/agents', icon: Bot },
    ]
  },
  {
    title: 'Gestion',
    items: [
      { label: 'Managers', href: '/admin/managers', icon: UserPlus },
      { label: 'Équipe', href: '/team', icon: Users },
      { label: 'Paramètres', href: '/settings', icon: Settings },
    ]
  }
];

// ==================== SUPERADMIN ====================
const superAdminNav: NavSection[] = [
  {
    title: 'Plateforme',
    items: [
      { label: 'Tableau de bord', href: '/superadmin', icon: LayoutDashboard },
      { label: 'Entreprises', href: '/businesses', icon: Building2 },
      { label: 'Santé Système', href: '/health', icon: HeartPulse },
    ]
  },
  {
    title: 'Gestion',
    items: [
      { label: 'Utilisateurs', href: '/users', icon: Users },
      { label: "Journaux d'audit", href: '/audit', icon: Shield },
      { label: 'Paramètres', href: '/superadmin/settings', icon: Settings },
    ]
  }
];

// ==================== MANAGER (Full Control) ====================
const managerNav: NavSection[] = [
  {
    title: 'Opérations',
    items: [
      { label: 'Tableau de bord', href: '/manager', icon: LayoutDashboard },
      { label: 'Nouveau Projet', href: '/manager/project-input', icon: Plus },
      { label: 'Mes Projets', href: '/manager/projects', icon: FolderKanban },
      { label: 'Validation', href: '/manager/validation', icon: CheckCircle, badge: 3 },
    ]
  },
  {
    title: 'Agents & Équipe',
    items: [
      { label: 'Hub Agents', href: '/manager/agents', icon: Bot },
      { label: 'Exécutifs', href: '/manager/executifs', icon: UserPlus },
      { label: 'Mon Équipe', href: '/manager/team', icon: Users },
    ]
  },
  {
    title: 'Analyses',
    items: [
      { label: 'Rapports', href: '/manager/reports', icon: BarChart3 },
      { label: 'Paramètres', href: '/manager/settings', icon: Settings },
    ]
  }
];

// ==================== EXECUTIF (Daily Only) ====================
const executifNav: NavSection[] = [
  {
    title: 'Travail',
    items: [
      { label: 'Tableau de bord', href: '/executif', icon: LayoutDashboard },
      { label: 'Tâches Quotidiennes', href: '/executif/tasks', icon: ClipboardList },
      { label: 'Validation Quotidienne', href: '/executif/validation', icon: CheckCircle, badge: 2 },
    ]
  },
  {
    title: 'Agents',
    items: [
      { label: 'Mes Agents (Daily)', href: '/executif/agents', icon: Bot },
    ]
  },
  {
    title: 'Performance',
    items: [
      { label: 'Mes Stats', href: '/executif/stats', icon: LineChart },
      { label: 'Équipe', href: '/executif/team', icon: Users },
      { label: 'Paramètres', href: '/executif/settings', icon: Settings },
    ]
  }
];

const navigation = computed(() => {
  switch (props.role) {
    case 'superadmin': return superAdminNav;
    case 'manager': return managerNav;
    case 'executif': return executifNav;
    default: return adminNav;
  }
});
</script>
