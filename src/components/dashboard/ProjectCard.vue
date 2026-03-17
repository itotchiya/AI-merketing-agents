<template>
  <Card class="overflow-hidden hover:shadow-lg transition-shadow">
    <div class="p-6">
      <div class="flex items-start justify-between">
        <Badge :variant="statusVariant">{{ statusLabel }}</Badge>
        <div class="flex -space-x-2">
          <div
            v-for="(member, i) in project.team.slice(0, 3)"
            :key="i"
            class="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-xs font-medium"
          >
            {{ member.charAt(0) }}
          </div>
          <div v-if="project.team.length > 3" class="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-slate-200 text-xs font-medium">
            +{{ project.team.length - 3 }}
          </div>
        </div>
      </div>
      
      <h3 class="mt-4 text-lg font-semibold">{{ project.name }}</h3>
      <p class="text-sm text-slate-500">{{ project.objective }} • {{ project.budget.toLocaleString() }}€</p>
      
      <div class="mt-4">
        <div class="flex items-center justify-between text-sm">
          <span class="text-slate-500">Progression</span>
          <span class="font-medium">{{ project.progress }}%</span>
        </div>
        <Progress :value="project.progress" class="mt-2" />
      </div>
      
      <div class="mt-4 flex items-center justify-between">
        <div>
          <p class="text-xs text-slate-500">Prochaine étape</p>
          <p class="text-sm font-medium">{{ project.nextStep }}</p>
        </div>
        <span class="text-xs text-slate-500">Échéance {{ project.dueDate }}</span>
      </div>
    </div>
    
    <div class="border-t border-slate-100 bg-slate-50 px-6 py-3">
      <a :href="`/projects/${project.id}`" class="text-sm font-medium text-emerald-600 hover:text-emerald-700">
        Voir le Pipeline →
      </a>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Card from '@/components/ui/Card.vue';
import Badge from '@/components/ui/Badge.vue';
import Progress from '@/components/ui/Progress.vue';
import type { Project } from '@/data/mockData';

const props = defineProps<{
  project: Project;
}>();

const statusLabel = computed(() => {
  switch (props.project.status) {
    case 'active': return 'Actif';
    case 'draft': return 'Brouillon';
    case 'completed': return 'Terminé';
    default: return props.project.status;
  }
});

const statusVariant = computed(() => {
  switch (props.project.status) {
    case 'active': return 'success';
    case 'draft': return 'warning';
    case 'completed': return 'default';
    default: return 'secondary';
  }
});
</script>
