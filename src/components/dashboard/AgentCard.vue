<template>
  <Card 
    class="overflow-hidden transition-all hover:shadow-md"
    :class="{
      'border-l-4 border-l-pink-500': agent.category === 'strategic',
      'border-l-4 border-l-blue-500': agent.category === 'operational',
      'border-l-4 border-l-emerald-500': agent.category === 'diffusion',
    }"
  >
    <div class="p-6">
      <div class="flex items-start justify-between">
        <div>
          <Badge 
            variant="outline" 
            class="text-[10px] uppercase tracking-wider"
            :class="{
              'border-pink-200 text-pink-700 bg-pink-50': agent.category === 'strategic',
              'border-blue-200 text-blue-700 bg-blue-50': agent.category === 'operational',
              'border-emerald-200 text-emerald-700 bg-emerald-50': agent.category === 'diffusion',
            }"
          >
            {{ agent.category }}
          </Badge>
          <h3 class="mt-2 text-lg font-semibold">{{ agent.name }}</h3>
          <p class="mt-1 text-sm text-muted-foreground line-clamp-2">{{ agent.description }}</p>
        </div>
        <div 
          class="flex h-10 w-10 items-center justify-center rounded-lg"
          :class="{
            'bg-pink-100 text-pink-600': agent.category === 'strategic',
            'bg-blue-100 text-blue-600': agent.category === 'operational',
            'bg-emerald-100 text-emerald-600': agent.category === 'diffusion',
          }"
        >
          <Bot class="h-5 w-5" />
        </div>
      </div>
      
      <div class="mt-4 flex items-center gap-4">
        <div class="flex items-center gap-1.5">
          <div 
            class="h-2 w-2 rounded-full"
            :class="{
              'bg-green-500': agent.status === 'ready',
              'bg-blue-500 animate-pulse': agent.status === 'running',
              'bg-gray-400': agent.status === 'completed',
              'bg-red-500': agent.status === 'failed',
            }"
          />
          <span class="text-sm capitalize">{{ agent.status }}</span>
        </div>
        <span v-if="agent.successRate" class="text-sm text-muted-foreground">
          {{ agent.successRate }}% success
        </span>
      </div>
      
      <div v-if="agent.status === 'running'" class="mt-4">
        <div class="flex items-center justify-between text-sm">
          <span class="text-muted-foreground">Progress</span>
          <span class="font-medium">75%</span>
        </div>
        <Progress :value="75" class="mt-2" />
        <p class="mt-1 text-xs text-muted-foreground">Est. completion: 5 min</p>
      </div>
    </div>
    
    <div class="border-t border-border bg-muted/50 px-6 py-3 flex items-center justify-between">
      <span v-if="agent.lastRun" class="text-xs text-muted-foreground">
        Last run: {{ agent.lastRun }}
      </span>
      <span v-else class="text-xs text-muted-foreground">Never run</span>
      
      <Button 
        size="sm" 
        :variant="agent.status === 'running' ? 'outline' : 'default'"
        :disabled="agent.status === 'running'"
      >
        <Play v-if="agent.status !== 'running'" class="mr-1 h-3 w-3" />
        <Pause v-else class="mr-1 h-3 w-3" />
        {{ agent.status === 'running' ? 'Running...' : 'Run Agent' }}
      </Button>
    </div>
  </Card>
</template>

<script setup lang="ts">
import Card from '@/components/ui/Card.vue';
import Badge from '@/components/ui/Badge.vue';
import Progress from '@/components/ui/Progress.vue';
import Button from '@/components/ui/Button.vue';
import { Bot, Play, Pause } from 'lucide-vue-next';
import type { Agent } from '@/data/mockData';

defineProps<{
  agent: Agent;
}>();
</script>
