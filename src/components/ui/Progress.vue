<template>
  <div :class="cn('relative h-2 w-full overflow-hidden rounded-full bg-secondary', className)">
    <div
      class="h-full w-full flex-1 bg-primary transition-all duration-500 ease-out"
      :style="{ width: `${value}%` }"
    />
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils';

interface Props {
  value: number;
  className?: string;
}

defineProps<Props>();
</script>
