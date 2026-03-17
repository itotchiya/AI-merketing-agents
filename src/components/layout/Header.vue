<template>
  <header class="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-card px-6">
    <!-- Breadcrumb / Title -->
    <div class="flex flex-1 items-center gap-2">
      <h1 class="text-xl font-semibold">{{ title }}</h1>
      <span v-if="subtitle" class="text-muted-foreground">—</span>
      <p v-if="subtitle" class="text-sm text-muted-foreground">{{ subtitle }}</p>
    </div>

    <!-- Role Switcher -->
    <div class="relative" ref="roleMenuRef">
      <button 
        @click="isRoleMenuOpen = !isRoleMenuOpen"
        class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors text-sm font-medium"
      >
        <span class="flex items-center gap-1.5">
          <span 
            class="h-2 w-2 rounded-full"
            :class="{
              'bg-purple-500': currentRole === 'superadmin',
              'bg-blue-500': currentRole === 'admin',
              'bg-amber-500': currentRole === 'manager',
              'bg-green-500': currentRole === 'executif'
            }"
          ></span>
          {{ roleLabel }}
        </span>
        <ChevronDown class="h-4 w-4 text-muted-foreground transition-transform" :class="{ 'rotate-180': isRoleMenuOpen }" />
      </button>
      
      <!-- Role Dropdown -->
      <div 
        v-if="isRoleMenuOpen"
        class="absolute right-0 top-full mt-2 w-56 rounded-xl border bg-card shadow-lg py-2 z-50"
      >
        <p class="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Switch Dashboard
        </p>
        <a 
          v-for="role in roles" 
          :key="role.id"
          :href="role.href"
          :class="[
            'flex items-center gap-3 px-3 py-2.5 text-sm transition-colors',
            currentRole === role.id 
              ? 'bg-primary/10 text-primary' 
              : 'text-foreground hover:bg-accent'
          ]"
        >
          <span 
            class="h-2.5 w-2.5 rounded-full"
            :class="role.color"
          ></span>
          <span class="flex-1">{{ role.label }}</span>
          <Check v-if="currentRole === role.id" class="h-4 w-4 text-primary" />
        </a>
        
        <div class="my-2 border-t"></div>
        
        <p class="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Other Pages
        </p>
        <a 
          v-for="page in otherPages" 
          :key="page.href"
          :href="page.href"
          class="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        >
          <component :is="page.icon" class="h-4 w-4" />
          {{ page.label }}
        </a>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-4">
      <!-- Search -->
      <div class="relative hidden md:block">
        <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search anything..."
          class="h-9 w-64 rounded-lg border border-input bg-background pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <!-- Notifications -->
      <button class="relative rounded-lg p-2 hover:bg-accent">
        <Bell class="h-5 w-5" />
        <span v-if="notificationCount > 0" class="absolute right-1 top-1 h-4 w-4 rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground flex items-center justify-center">
          {{ notificationCount }}
        </span>
      </button>

      <!-- User Menu -->
      <button class="flex items-center gap-2 rounded-lg p-2 hover:bg-accent">
        <Avatar fallback="TA" class="h-8 w-8" />
        <ChevronDown class="h-4 w-4 text-muted-foreground" />
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { Search, Bell, ChevronDown, Check, FolderKanban, Bot, CheckCircle } from 'lucide-vue-next';
import Avatar from '@/components/ui/Avatar.vue';

const props = defineProps<{
  title: string;
  subtitle?: string;
  notificationCount?: number;
  currentRole?: 'superadmin' | 'admin' | 'manager' | 'executif';
}>();

const isRoleMenuOpen = ref(false);
const roleMenuRef = ref<HTMLElement | null>(null);

const roles = [
  { id: 'admin', label: 'Admin Dashboard', href: '/', color: 'bg-blue-500' },
  { id: 'superadmin', label: 'SuperAdmin', href: '/superadmin', color: 'bg-purple-500' },
  { id: 'manager', label: 'Manager', href: '/manager', color: 'bg-amber-500' },
  { id: 'executif', label: 'Exécutif', href: '/executif', color: 'bg-green-500' },
];

const otherPages = [
  { label: 'Projects', href: '/projects', icon: FolderKanban },
  { label: 'Agent Hub', href: '/agents', icon: Bot },
  { label: 'Validation', href: '/validation', icon: CheckCircle },
];

const roleLabel = computed(() => {
  const role = roles.find(r => r.id === props.currentRole);
  return role?.label || 'Select Role';
});

// Close menu when clicking outside
const handleClickOutside = (e: MouseEvent) => {
  if (roleMenuRef.value && !roleMenuRef.value.contains(e.target as Node)) {
    isRoleMenuOpen.value = false;
  }
};

onMounted(() => {
  window.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside);
});
</script>
