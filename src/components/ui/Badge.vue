<template>
  <div :class="badgeClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@/lib/utils';

interface Props {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning';
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
});

const badgeClasses = computed(() => {
  return cn(
    'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    {
      'border-transparent bg-primary text-primary-foreground hover:bg-primary/80': props.variant === 'default',
      'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80': props.variant === 'secondary',
      'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80': props.variant === 'destructive',
      'text-foreground': props.variant === 'outline',
      'border-transparent bg-green-100 text-green-700 hover:bg-green-200': props.variant === 'success',
      'border-transparent bg-amber-100 text-amber-700 hover:bg-amber-200': props.variant === 'warning',
    },
    props.class
  );
});
</script>
