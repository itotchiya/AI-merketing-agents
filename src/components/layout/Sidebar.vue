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
          <p class="text-xs text-muted-foreground capitalize">{{ userRole }}</p>
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
  TrendingUp
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

const isActive = (href: string) => {
  // Handle root path
  if (href === '/' && currentPath === '/') return true;
  // Handle other paths
  if (href !== '/' && currentPath.startsWith(href)) return true;
  // Handle activePath prop if provided
  if (props.activePath && href.includes(props.activePath)) return true;
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

const userRole = computed(() => props.role || 'admin');

// Admin Navigation
const adminNav: NavSection[] = [
  {
    title: 'Main',
    items: [
      { label: 'Dashboard', href: '/', icon: LayoutDashboard },
      { label: 'AI Workflow', href: '/ai-workflow', icon: TrendingUp },
      { label: 'Projects', href: '/projects', icon: FolderKanban },
      { label: 'Agent Hub', href: '/agents', icon: Bot },
      { label: 'Validation', href: '/validation', icon: CheckCircle, badge: 3 },
      { label: 'Reports', href: '/reports', icon: BarChart3 },
    ]
  },
  {
    title: 'Team',
    items: [
      { label: 'Team Members', href: '/team', icon: Users },
      { label: 'Settings', href: '/settings', icon: Settings },
    ]
  }
];

// SuperAdmin Navigation
const superAdminNav: NavSection[] = [
  {
    title: 'Platform',
    items: [
      { label: 'Dashboard', href: '/superadmin', icon: LayoutDashboard },
      { label: 'Businesses', href: '/businesses', icon: Building2 },
      { label: 'System Health', href: '/health', icon: HeartPulse },
    ]
  },
  {
    title: 'Management',
    items: [
      { label: 'Users', href: '/users', icon: Users },
      { label: 'Audit Logs', href: '/audit', icon: Shield },
      { label: 'Settings', href: '/settings', icon: Settings },
    ]
  }
];

// Manager Navigation
const managerNav: NavSection[] = [
  {
    title: 'Operations',
    items: [
      { label: 'Dashboard', href: '/manager', icon: LayoutDashboard },
      { label: 'My Tasks', href: '/manager?view=tasks', icon: ClipboardList },
      { label: 'Agent Hub', href: '/agents', icon: Bot },
      { label: 'Validation', href: '/validation', icon: CheckCircle, badge: 2 },
    ]
  },
  {
    title: 'Insights',
    items: [
      { label: 'Reports', href: '/reports', icon: BarChart3 },
      { label: 'Team', href: '/team', icon: Users },
      { label: 'Settings', href: '/settings', icon: Settings },
    ]
  }
];

// Exécutif Navigation
const executifNav: NavSection[] = [
  {
    title: 'Work',
    items: [
      { label: 'My Tasks', href: '/executif', icon: ClipboardList },
      { label: 'Current Task', href: '/executif?tab=current', icon: Briefcase },
      { label: 'My Agents', href: '/agents', icon: Bot },
    ]
  },
  {
    title: 'Performance',
    items: [
      { label: 'My Stats', href: '/executif?tab=performance', icon: LineChart },
      { label: 'Team', href: '/team', icon: Users },
      { label: 'Settings', href: '/settings', icon: Settings },
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
