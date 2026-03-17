<script setup lang="ts">
import { ref, computed } from 'vue';
import ValidationItem from '@/components/dashboard/ValidationItem.vue';
import ProjectCard from '@/components/dashboard/ProjectCard.vue';
import { validationItems, projects } from '@/data/mockData';
import type { ValidationItem as ValidationItemType, Project } from '@/types';

const activeView = ref('overview');

const views = [
  { id: 'overview', label: 'Overview' },
  { id: 'tasks', label: 'My Tasks' },
  { id: 'calendar', label: 'Calendar' },
];

const pendingValidations = computed<ValidationItemType[]>(() => validationItems.slice(0, 2));
const activeProjects = computed(() => projects.filter((p: Project) => p.status === 'active'));

const upcomingTasks = [
  { title: 'Review campaign assets', project: 'Summer Launch', time: 'Today 2pm', status: 'urgent' },
  { title: 'Approve social posts', project: 'Product Beta', time: 'Tomorrow 10am', status: 'normal' },
  { title: 'Check analytics report', project: 'Q1 Review', time: 'Wed 3pm', status: 'normal' },
];

const calendarEvents = [
  { day: 'Mon', date: '10', events: [{ title: 'FB Post', time: '9am', status: 'done' }] },
  { day: 'Tue', date: '11', events: [{ title: 'Email Blast', time: '2pm', status: 'scheduled' }] },
  { day: 'Wed', date: '12', events: [{ title: 'IG Stories', time: '6pm', status: 'scheduled' }, { title: 'Team Sync', time: '3pm', status: 'scheduled' }] },
  { day: 'Thu', date: '13', events: [{ title: 'Campaign Review', time: '11am', status: 'pending' }] },
  { day: 'Fri', date: '14', events: [] },
];
</script>

<template>
  <div>
    <!-- View Tabs -->
    <div class="flex items-center gap-2 mb-6 border-b border-border pb-4">
      <button 
        v-for="view in views" 
        :key="view.id"
        @click="activeView = view.id"
        :class="[
          'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
          activeView === view.id 
            ? 'bg-primary text-primary-foreground' 
            : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
        ]"
      >
        {{ view.label }}
      </button>
    </div>

    <!-- Overview View -->
    <div v-if="activeView === 'overview'" class="grid gap-6 lg:grid-cols-3">
      <!-- Validation Queue -->
      <div class="lg:col-span-2">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold">My Validation Queue (2)</h2>
          <a href="/validation" class="text-sm text-primary hover:underline">View All</a>
        </div>
        <div class="space-y-4">
          <ValidationItem v-for="item in pendingValidations" :key="item.id" :validation="item" />
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="space-y-6">
        <div class="rounded-xl border bg-card p-6">
          <h2 class="text-lg font-semibold mb-4">Quick Actions</h2>
          <div class="space-y-2">
            <a href="/agents?category=operational" class="w-full flex items-center gap-3 p-3 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Run Studio Créatif
            </a>
            <button @click="activeView = 'calendar'" class="w-full flex items-center gap-3 p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors text-left">
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              View Calendar
            </button>
            <a href="/reports" class="w-full flex items-center gap-3 p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Check Reports
            </a>
          </div>
        </div>

        <!-- Mini Calendar -->
        <div class="rounded-xl border bg-card p-6">
          <h2 class="text-lg font-semibold mb-4">This Week</h2>
          <div class="space-y-3">
            <div v-for="(day, i) in calendarEvents.slice(0, 3)" :key="i" class="flex items-center gap-3">
              <div :class="['h-10 w-10 rounded-lg flex items-center justify-center text-sm font-medium', i === 0 ? 'bg-primary/10 text-primary' : 'bg-secondary']">
                {{ day.day[0] }}
              </div>
              <div class="flex-1">
                <p class="text-sm font-medium">{{ day.events[0]?.title || 'No events' }} {{ day.events[0]?.time || '' }}</p>
                <p :class="['text-xs', day.events[0]?.status === 'done' ? 'text-green-600' : 'text-amber-600']">
                  {{ day.events[0]?.status === 'done' ? '✓ Done' : '⏰ Scheduled' }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tasks View -->
    <div v-if="activeView === 'tasks'">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold">My Tasks</h2>
        <button class="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm">+ Add Task</button>
      </div>
      <div class="space-y-3">
        <div v-for="(task, i) in upcomingTasks" :key="i" :class="['flex items-center gap-4 p-4 rounded-xl border', task.status === 'urgent' ? 'bg-red-50 border-red-200' : 'bg-card']">
          <div :class="['h-10 w-10 rounded-lg flex items-center justify-center', task.status === 'urgent' ? 'bg-red-100 text-red-600' : 'bg-primary/10 text-primary']">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div class="flex-1">
            <p class="font-medium">{{ task.title }}</p>
            <p class="text-sm text-muted-foreground">{{ task.project }} • {{ task.time }}</p>
          </div>
          <span v-if="task.status === 'urgent'" class="px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium">Urgent</span>
        </div>
      </div>

      <!-- My Projects -->
      <div class="mt-8">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold">My Projects</h2>
          <a href="/projects" class="text-sm text-primary hover:underline">View All</a>
        </div>
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ProjectCard v-for="project in activeProjects" :key="project.id" :project="project" />
        </div>
      </div>
    </div>

    <!-- Calendar View -->
    <div v-if="activeView === 'calendar'">
      <div class="rounded-xl border bg-card p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-lg font-semibold">March 2026</h2>
          <div class="flex gap-2">
            <button class="p-2 rounded-lg hover:bg-secondary">
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button class="p-2 rounded-lg hover:bg-secondary">
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
        <div class="grid grid-cols-5 gap-4">
          <div v-for="day in calendarEvents" :key="day.date" class="min-h-[120px] p-3 rounded-lg border">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-medium">{{ day.day }}</span>
              <span class="text-lg font-bold">{{ day.date }}</span>
            </div>
            <div class="space-y-1">
              <div v-for="(event, j) in day.events" :key="j" :class="['text-xs p-1.5 rounded', event.status === 'done' ? 'bg-green-100 text-green-700' : 'bg-primary/10 text-primary']">
                {{ event.title }} {{ event.time }}
              </div>
              <div v-if="day.events.length === 0" class="text-xs text-muted-foreground">No events</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
