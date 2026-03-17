<template>
  <Card class="p-6">
    <div class="flex items-start justify-between">
      <div>
        <p class="text-sm font-medium text-muted-foreground">{{ label }}</p>
        <h3 class="mt-2 text-3xl font-bold tracking-tight">{{ value }}</h3>
        <div class="mt-2 flex items-center gap-1 text-sm">
          <TrendingUp v-if="trend > 0" class="h-4 w-4 text-green-500" />
          <TrendingDown v-else-if="trend < 0" class="h-4 w-4 text-red-500" />
          <Minus v-else class="h-4 w-4 text-gray-400" />
          <span :class="trend > 0 ? 'text-green-500' : trend < 0 ? 'text-red-500' : 'text-gray-500'">
            {{ trend > 0 ? '+' : '' }}{{ trend }}%
          </span>
          <span class="text-muted-foreground">{{ trendLabel }}</span>
        </div>
      </div>
      <div :class="cn('rounded-lg p-3', iconBgClass)">
        <component :is="iconComponent" class="h-5 w-5" :class="iconColorClass" />
      </div>
    </div>
    <!-- Sparkline placeholder -->
    <div class="mt-4 h-10 flex items-end gap-0.5">
      <div
        v-for="(height, i) in sparklineData"
        :key="i"
        class="flex-1 rounded-sm bg-primary/20 transition-all"
        :style="{ height: `${height}%` }"
      />
    </div>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@/lib/utils';
import Card from '@/components/ui/Card.vue';
import { TrendingUp, TrendingDown, Minus, DollarSign, Target, Percent, Activity, Building, Clock, CheckCircle, ClipboardList, Award, Layers, FileText, Settings, Star } from 'lucide-vue-next';

const props = defineProps<{
  label: string;
  value: string;
  trend: number;
  trendLabel: string;
  icon: string;
}>();

const iconMap: Record<string, any> = {
  euro: DollarSign,
  target: Target,
  'trending-up': TrendingUp,
  percent: Percent,
  activity: Activity,
  building: Building,
  clock: Clock,
  'check-circle': CheckCircle,
  'clipboard-list': ClipboardList,
  award: Award,
  layers: Layers,
  'file-text': FileText,
  settings: Settings,
  star: Star,
};

const iconComponent = computed(() => iconMap[props.icon] || Activity);

const iconBgClass = computed(() => {
  if (props.trend > 0) return 'bg-green-100';
  if (props.trend < 0) return 'bg-red-100';
  return 'bg-primary/10';
});

const iconColorClass = computed(() => {
  if (props.trend > 0) return 'text-green-600';
  if (props.trend < 0) return 'text-red-600';
  return 'text-primary';
});

// Generate fake sparkline data
const sparklineData = [40, 60, 45, 70, 55, 80, 65, 75, 60, 85, 70, 90];
</script>
