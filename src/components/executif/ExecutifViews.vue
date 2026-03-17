<script setup lang="ts">
import { ref, computed } from 'vue';
import AgentCard from '@/components/dashboard/AgentCard.vue';
import { agents } from '@/data/mockData';
import type { Agent } from '@/types';

const activeTab = ref('current');

const tabs = [
  { id: 'current', label: 'Current Task' },
  { id: 'agents', label: 'My Agents' },
  { id: 'performance', label: 'Performance' },
];

const assignedAgents = computed(() => agents.filter((a: Agent) => 
  a.category === 'operational' || a.name === 'Stratégie & Planification'
));

const upcomingTasks = [
  { title: 'Review feedback', time: 'Tomorrow 10am', project: 'Summer Launch' },
  { title: 'Create variations', time: 'Wed 2pm', project: 'Product Beta' },
  { title: 'Team sync', time: 'Thu 3pm', project: 'General' },
];

const weeklyProgress = [8, 12, 10, 15, 9, 0, 0];
const weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const taskProgress = ref(40);
</script>

<template>
  <div>
    <!-- Tabs -->
    <div class="flex items-center gap-2 mb-6 border-b border-border pb-4">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="[
          'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
          activeTab === tab.id 
            ? 'bg-primary text-primary-foreground' 
            : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
        ]"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Current Task View -->
    <div v-if="activeTab === 'current'" class="grid gap-6 lg:grid-cols-2">
      <!-- Current Assignment -->
      <div class="rounded-xl border bg-gradient-to-r from-primary/5 to-primary/10 p-6">
        <div class="flex items-start justify-between">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="text-sm font-medium text-primary">Current Assignment</span>
              <span class="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-medium">Due Today</span>
            </div>
            <h2 class="text-2xl font-bold">Create Ad Variants - Meta Ads</h2>
            <p class="mt-1 text-muted-foreground">Project: Summer Launch 2026 • Assigned by: Marie</p>
            
            <div class="mt-4 flex items-center gap-4">
              <div>
                <p class="text-sm text-muted-foreground">Progress</p>
                <p class="text-xl font-semibold">2/5 variants</p>
              </div>
              <div class="h-10 w-px bg-border"></div>
              <div>
                <p class="text-sm text-muted-foreground">Time Left</p>
                <p class="text-xl font-semibold text-amber-600">4 hours</p>
              </div>
              <div class="h-10 w-px bg-border"></div>
              <div>
                <p class="text-sm text-muted-foreground">Agent</p>
                <p class="text-xl font-semibold">Ads Manager</p>
              </div>
            </div>
            
            <div class="mt-4 flex gap-2">
              <button class="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Continue Working
              </button>
              <button class="px-4 py-2 border border-input bg-background rounded-lg font-medium hover:bg-accent transition-colors">
                View Brief
              </button>
            </div>
          </div>
          <div class="h-20 w-20 rounded-2xl bg-primary/20 flex items-center justify-center">
            <svg class="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </div>
        </div>
        
        <div class="mt-6">
          <div class="flex items-center justify-between text-sm mb-2">
            <span class="text-muted-foreground">Completion</span>
            <span class="font-medium">{{ taskProgress }}%</span>
          </div>
          <div class="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div class="h-full bg-primary rounded-full transition-all duration-500" :style="{ width: taskProgress + '%' }"></div>
          </div>
        </div>
      </div>

      <!-- Upcoming Tasks -->
      <div class="rounded-xl border bg-card p-6">
        <h2 class="text-lg font-semibold mb-4">Upcoming Tasks</h2>
        <div class="space-y-3">
          <div v-for="(task, i) in upcomingTasks" :key="i" class="flex items-center gap-4 p-3 rounded-lg bg-secondary/50">
            <div class="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-medium">
              {{ i + 1 }}
            </div>
            <div class="flex-1">
              <p class="font-medium">{{ task.title }}</p>
              <p class="text-sm text-muted-foreground">{{ task.project }} • {{ task.time }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- My Agents View -->
    <div v-if="activeTab === 'agents'">
      <div class="mb-4">
        <h2 class="text-lg font-semibold">My Assigned Agents</h2>
        <p class="text-sm text-muted-foreground">Agents you can launch and manage</p>
      </div>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AgentCard v-for="agent in assignedAgents" :key="agent.id" :agent="agent" />
      </div>
    </div>

    <!-- Performance View -->
    <div v-if="activeTab === 'performance'">
      <div class="rounded-xl border bg-card p-6">
        <h2 class="text-lg font-semibold mb-4">This Week's Performance</h2>
        <div class="h-64 flex items-end gap-2">
          <div v-for="(height, i) in weeklyProgress" :key="i" class="flex-1 flex flex-col gap-1">
            <div class="relative w-full">
              <div 
                class="bg-primary/20 rounded-sm transition-all hover:bg-primary/30 w-full"
                :style="{ height: (height * 10) + 'px' }"
              ></div>
            </div>
            <span class="text-[10px] text-muted-foreground text-center">{{ weekdays[i] }}</span>
          </div>
        </div>
        <div class="mt-4 pt-4 border-t flex items-center justify-between text-sm">
          <span class="text-muted-foreground">Total: 54 tasks completed</span>
          <span class="text-green-600 font-medium">↑ 15% vs last week</span>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid gap-4 md:grid-cols-3 mt-6">
        <div class="rounded-xl border bg-card p-6">
          <p class="text-sm text-muted-foreground">Tasks Completed</p>
          <p class="text-3xl font-bold mt-1">54</p>
          <p class="text-sm text-green-600 mt-1">↑ 12% this week</p>
        </div>
        <div class="rounded-xl border bg-card p-6">
          <p class="text-sm text-muted-foreground">On-Time Rate</p>
          <p class="text-3xl font-bold mt-1">94%</p>
          <p class="text-sm text-green-600 mt-1">↑ 3% this week</p>
        </div>
        <div class="rounded-xl border bg-card p-6">
          <p class="text-sm text-muted-foreground">Quality Score</p>
          <p class="text-3xl font-bold mt-1">4.8/5</p>
          <p class="text-sm text-muted-foreground mt-1">Based on 12 reviews</p>
        </div>
      </div>
    </div>
  </div>
</template>
