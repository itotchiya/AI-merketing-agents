<template>
  <div :class="cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', $attrs.class)">
    <img v-if="src" :src="src" :alt="alt" class="aspect-square h-full w-full" />
    <div v-else class="flex h-full w-full items-center justify-center bg-secondary text-sm font-medium">
      {{ fallback }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils';

defineProps<{
  src?: string;
  alt?: string;
  fallback: string;
}>();
</script>
