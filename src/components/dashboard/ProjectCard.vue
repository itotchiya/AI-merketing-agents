<template>
  <Card class="overflow-hidden">
    <div class="p-6">
      <div class="flex items-start justify-between">
        <Badge :variant="statusVariant">{{ project.status }}</Badge>
        <div class="flex -space-x-2">
          <div
            v-for="(member, i) in project.team.slice(0, 3)"
            :key="i"
            class="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-secondary text-xs font-medium"
          >
            {{ member.charAt(0) }}
          </div>
          <div v-if="project.team.length > 3" class="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
            +{{ project.team.length - 3 }}
          </div>
        </div>
      </div>
      
      <h3 class="mt-4 text-lg font-semibold">{{ project.name }}</h3>
      <p class="text-sm text-muted-foreground">{{ project.objective }} • €{{ project.budget.toLocaleString() }}</p>
      
      <div class="mt-4">
        <div class="flex items-center justify-between text-sm">
          <span class="text-muted-foreground">Progress</span>
          <span class="font-medium">{{ project.progress }}%</span>
        </div>
        <Progress :value="project.progress" class="mt-2" />
      </div>
      
      <div class="mt-4 flex items-center justify-between">
        <div>
          <p class="text-xs text-muted-foreground">Next Step</p>
          <p class="text-sm font-medium">{{ project.nextStep }}</p>
        </div>
        <span class="text-xs text-muted-foreground">Due {{ project.dueDate }}</span>
      </div>
    </div>
    
    <div class="border-t border-border bg-muted/50 px-6 py-3">
      <a :href="`/projects/${project.id}`" class="text-sm font-medium text-primary hover:underline">
        View Pipeline →
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

const statusVariant = computed(() => {
  switch (props.project.status) {
    case 'active': return 'success';
    case 'draft': return 'warning';
    case 'completed': return 'default';
    default: return 'secondary';
  }
});
</script>
