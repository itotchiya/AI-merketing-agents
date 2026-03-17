<template>
  <div class="flex flex-col items-center">
    <div 
      class="flex h-12 w-12 items-center justify-center rounded-full border-2 text-sm font-semibold"
      :class="{
        'border-green-500 bg-green-500 text-white': status === 'completed',
        'border-blue-500 bg-blue-500 text-white': status === 'active',
        'border-gray-300 bg-white text-gray-400': status === 'pending',
      }"
    >
      <Check v-if="status === 'completed'" class="h-5 w-5" />
      <Loader2 v-else-if="status === 'active'" class="h-5 w-5 animate-spin" />
      <span v-else>{{ step }}</span>
    </div>
    <p class="mt-2 text-xs font-medium text-center">{{ label }}</p>
    <p 
      class="text-[10px] uppercase tracking-wider mt-0.5"
      :class="{
        'text-green-600': status === 'completed',
        'text-blue-600': status === 'active',
        'text-gray-400': status === 'pending',
      }"
    >
      {{ status }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { Check, Loader2 } from 'lucide-vue-next';

defineProps<{
  step: number;
  label: string;
  status: 'completed' | 'active' | 'pending';
}>();
</script>
