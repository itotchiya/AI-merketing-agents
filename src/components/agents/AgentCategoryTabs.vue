<script setup lang="ts">
import { ref, computed } from 'vue';
import AgentCard from '@/components/dashboard/AgentCard.vue';
import { agents } from '@/data/mockData';
import type { Agent } from '@/types';

const activeCategory = ref('all');

const categories = [
  { id: 'all', label: 'All', color: '' },
  { id: 'strategic', label: 'Strategic', color: 'bg-pink-500' },
  { id: 'operational', label: 'Operational', color: 'bg-blue-500' },
  { id: 'diffusion', label: 'Diffusion', color: 'bg-emerald-500' },
];

const filteredAgents = computed(() => {
  if (activeCategory.value === 'all') return agents;
  return agents.filter((a: Agent) => a.category === activeCategory.value);
});

const strategicAgents = computed(() => agents.filter((a: Agent) => a.category === 'strategic'));
const operationalAgents = computed(() => agents.filter((a: Agent) => a.category === 'operational'));
const diffusionAgents = computed(() => agents.filter((a: Agent) => a.category === 'diffusion'));
</script>

<template>
  <div>
    <!-- Category Tabs -->
    <div class="flex items-center gap-2 mb-6">
      <button 
        v-for="cat in categories" 
        :key="cat.id"
        @click="activeCategory = cat.id"
        :class="[
          'px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2',
          activeCategory === cat.id 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
        ]"
      >
        <div v-if="cat.color" :class="['h-2 w-2 rounded-full', cat.color]"></div>
        {{ cat.label }}
      </button>
    </div>

    <!-- All Categories View -->
    <div v-if="activeCategory === 'all'">
      <!-- Strategic Agents -->
      <div class="mb-8">
        <h2 class="text-lg font-semibold mb-4 flex items-center gap-2">
          <div class="h-3 w-3 rounded-full bg-pink-500"></div>
          Strategic Agents
        </h2>
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <AgentCard v-for="agent in strategicAgents" :key="agent.id" :agent="agent" />
        </div>
      </div>

      <!-- Operational Agents -->
      <div class="mb-8">
        <h2 class="text-lg font-semibold mb-4 flex items-center gap-2">
          <div class="h-3 w-3 rounded-full bg-blue-500"></div>
          Operational Agents
        </h2>
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <AgentCard v-for="agent in operationalAgents" :key="agent.id" :agent="agent" />
        </div>
      </div>

      <!-- Diffusion Agents -->
      <div>
        <h2 class="text-lg font-semibold mb-4 flex items-center gap-2">
          <div class="h-3 w-3 rounded-full bg-emerald-500"></div>
          Diffusion Agents
        </h2>
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <AgentCard v-for="agent in diffusionAgents" :key="agent.id" :agent="agent" />
        </div>
      </div>
    </div>

    <!-- Filtered Category View -->
    <div v-else class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <AgentCard v-for="agent in filteredAgents" :key="agent.id" :agent="agent" />
    </div>
  </div>
</template>
