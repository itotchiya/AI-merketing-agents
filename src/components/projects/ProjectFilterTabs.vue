<script setup lang="ts">
import { ref, computed } from 'vue';
import ProjectCard from '@/components/dashboard/ProjectCard.vue';
import { projects } from '@/data/mockData';
import type { Project } from '@/types';

const activeFilter = ref('all');

const filters = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'completed', label: 'Completed' },
  { id: 'draft', label: 'Draft' },
];

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') return projects;
  return projects.filter((p: Project) => p.status === activeFilter.value);
});
</script>

<template>
  <div>
    <!-- Filters -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-2">
        <button 
          v-for="filter in filters" 
          :key="filter.id"
          @click="activeFilter = filter.id"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
            activeFilter === filter.id 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          ]"
        >
          {{ filter.label }}
        </button>
      </div>
      <button class="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors">
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        New Project
      </button>
    </div>

    <!-- Projects Grid -->
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <ProjectCard v-for="project in filteredProjects" :key="project.id" :project="project" />
    </div>

    <!-- Empty State -->
    <div v-if="filteredProjects.length === 0" class="text-center py-12">
      <div class="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
        <svg class="h-8 w-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
      </div>
      <h3 class="text-lg font-semibold">No projects found</h3>
      <p class="text-muted-foreground">Try changing the filter or create a new project</p>
    </div>
  </div>
</template>
