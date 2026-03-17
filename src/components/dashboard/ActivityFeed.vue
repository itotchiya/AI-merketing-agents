<template>
  <div class="space-y-4">
    <div v-for="activity in activities" :key="activity.id" class="flex gap-3">
      <div 
        class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
        :class="{
          'bg-green-100 text-green-600': activity.type === 'validation',
          'bg-blue-100 text-blue-600': activity.type === 'agent',
          'bg-purple-100 text-purple-600': activity.type === 'user',
          'bg-gray-100 text-gray-600': activity.type === 'system',
        }"
      >
        <User v-if="activity.type === 'user'" class="h-4 w-4" />
        <Bot v-else-if="activity.type === 'agent'" class="h-4 w-4" />
        <CheckCircle v-else-if="activity.type === 'validation'" class="h-4 w-4" />
        <Settings v-else class="h-4 w-4" />
      </div>
      <div class="flex-1">
        <p class="text-sm">
          <span class="font-medium">{{ activity.user }}</span>
          {{ activity.action }}
          <span class="font-medium text-primary">{{ activity.target }}</span>
        </p>
        <p class="text-xs text-muted-foreground">{{ activity.time }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { User, Bot, CheckCircle, Settings } from 'lucide-vue-next';
import type { ActivityItem } from '@/data/mockData';

defineProps<{
  activities: ActivityItem[];
}>();
</script>
