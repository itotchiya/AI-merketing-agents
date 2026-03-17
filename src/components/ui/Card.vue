<template>
  <div :class="cardClasses">
    <div v-if="$slots.header" :class="headerClasses">
      <slot name="header" />
    </div>
    <div v-if="$slots.default" :class="contentClasses">
      <slot />
    </div>
    <div v-if="$slots.footer" :class="footerClasses">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@/lib/utils';

interface Props {
  class?: string;
}

const props = defineProps<Props>();

const cardClasses = computed(() => {
  return cn(
    'rounded-xl border bg-card text-card-foreground shadow-sm',
    props.class
  );
});

const headerClasses = 'flex flex-col space-y-1.5 p-6';
const contentClasses = 'p-6 pt-0';
const footerClasses = 'flex items-center p-6 pt-0';
</script>
