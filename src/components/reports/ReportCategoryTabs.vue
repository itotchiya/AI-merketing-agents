<script setup lang="ts">
import { ref, computed } from 'vue';

const activeCategory = ref('all');

const categories = [
  { id: 'all', label: 'All Reports', desc: 'View all', color: 'bg-gray-100 text-gray-600', icon: 'folder' },
  { id: 'performance', label: 'Performance', desc: 'Campaign metrics', color: 'bg-blue-100 text-blue-600', icon: 'chart' },
  { id: 'financial', label: 'Financial', desc: 'Budget & ROI', color: 'bg-green-100 text-green-600', icon: 'dollar' },
  { id: 'team', label: 'Team', desc: 'Productivity', color: 'bg-purple-100 text-purple-600', icon: 'users' },
  { id: 'trends', label: 'Trends', desc: 'Historical data', color: 'bg-amber-100 text-amber-600', icon: 'trend' },
];

const reports = [
  { id: 1, name: 'March 2026 Performance Report', type: 'performance', date: 'Mar 1, 2026', size: '2.4 MB', status: 'ready' },
  { id: 2, name: 'Q1 2026 Campaign Summary', type: 'performance', date: 'Jan 15, 2026', size: '4.1 MB', status: 'ready' },
  { id: 3, name: 'February Financial Report', type: 'financial', date: 'Feb 1, 2026', size: '2.1 MB', status: 'ready' },
  { id: 4, name: 'Winter Campaign Analysis', type: 'performance', date: 'Feb 20, 2026', size: '1.8 MB', status: 'generating' },
  { id: 5, name: 'Team Productivity Q1', type: 'team', date: 'Mar 5, 2026', size: '1.2 MB', status: 'ready' },
];

const filteredReports = computed(() => {
  if (activeCategory.value === 'all') return reports;
  return reports.filter(r => r.type === activeCategory.value);
});

const activeCategoryLabel = computed(() => {
  return categories.find(c => c.id === activeCategory.value)?.label || 'All Reports';
});
</script>

<template>
  <div>
    <!-- Category Cards -->
    <div class="grid gap-4 md:grid-cols-5 mb-8">
      <button 
        v-for="cat in categories" 
        :key="cat.id"
        @click="activeCategory = cat.id"
        :class="['rounded-xl border p-4 text-left transition-all hover:shadow-md', activeCategory === cat.id ? 'ring-2 ring-primary bg-card' : 'bg-card']"
      >
        <div :class="['h-10 w-10 rounded-lg flex items-center justify-center mb-3', cat.color]">
          <svg v-if="cat.icon === 'folder'" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
          <svg v-if="cat.icon === 'chart'" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
          <svg v-if="cat.icon === 'dollar'" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <svg v-if="cat.icon === 'users'" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          <svg v-if="cat.icon === 'trend'" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
        </div>
        <h3 class="font-semibold text-sm">{{ cat.label }}</h3>
        <p class="text-xs text-muted-foreground mt-1">{{ cat.desc }}</p>
      </button>
    </div>

    <!-- Reports List -->
    <div class="rounded-xl border bg-card">
      <div class="p-4 border-b flex items-center justify-between">
        <div class="flex items-center gap-2">
          <h2 class="text-lg font-semibold">{{ activeCategoryLabel }}</h2>
          <span v-if="activeCategory !== 'all'" class="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
            {{ filteredReports.length }} items
          </span>
        </div>
        <button class="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors">
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
          Create Report
        </button>
      </div>
      <div class="divide-y">
        <div v-for="report in filteredReports" :key="report.id" class="p-4 flex items-center justify-between hover:bg-muted/50">
          <div class="flex items-center gap-4">
            <div class="h-10 w-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
            </div>
            <div>
              <p class="font-medium">{{ report.name }}</p>
              <p class="text-sm text-muted-foreground capitalize">{{ report.type }} • {{ report.date }} • {{ report.size }}</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span v-if="report.status === 'generating'" class="text-sm text-amber-600 flex items-center gap-1">
              <svg class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>
              Generating...
            </span>
            <template v-else>
              <button class="p-2 rounded-lg hover:bg-accent text-muted-foreground" title="View Online">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              </button>
              <button class="p-2 rounded-lg hover:bg-accent text-muted-foreground" title="Download PDF">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              </button>
            </template>
          </div>
        </div>
        <div v-if="filteredReports.length === 0" class="p-8 text-center text-muted-foreground">
          No reports found in this category
        </div>
      </div>
    </div>
  </div>
</template>
