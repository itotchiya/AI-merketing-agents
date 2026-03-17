<template>
  <Card 
    class="overflow-hidden"
    :class="{
      'border-red-200 bg-red-50/30': validation.priority === 'high',
      'border-amber-200 bg-amber-50/30': validation.priority === 'medium',
      'border-green-200 bg-green-50/30': validation.priority === 'low',
    }"
  >
    <div class="p-6">
      <div class="flex items-start justify-between">
        <div class="flex items-center gap-2">
          <Badge 
            :variant="validation.priority === 'high' ? 'destructive' : validation.priority === 'medium' ? 'warning' : 'success'"
          >
            {{ validation.priority }} priority
          </Badge>
          <span class="text-sm text-muted-foreground">⏰ {{ validation.submittedAt }}</span>
        </div>
        <Badge variant="outline" class="text-xs">
          {{ validation.type }}
        </Badge>
      </div>
      
      <h3 class="mt-3 font-semibold text-lg">{{ validation.title }}</h3>
      
      <div class="mt-3 space-y-2">
        <div class="flex items-center gap-2 text-sm">
          <Bot class="h-4 w-4 text-muted-foreground" />
          <span class="text-muted-foreground">Agent:</span>
          <span class="font-medium">{{ validation.agent }}</span>
        </div>
        <div class="flex items-center gap-2 text-sm">
          <FolderKanban class="h-4 w-4 text-muted-foreground" />
          <span class="text-muted-foreground">Project:</span>
          <span class="font-medium">{{ validation.project }}</span>
        </div>
        <div class="flex items-center gap-2 text-sm">
          <User class="h-4 w-4 text-muted-foreground" />
          <span class="text-muted-foreground">Submitted by:</span>
          <span class="font-medium">{{ validation.submittedBy }}</span>
        </div>
      </div>
      
      <!-- Preview thumbnails (simulated) -->
      <div class="mt-4 flex gap-2">
        <div 
          v-for="i in 3" 
          :key="i"
          class="h-16 w-16 rounded-lg bg-muted flex items-center justify-center border border-border hover:border-primary transition-colors cursor-pointer"
        >
          <ImageIcon class="h-5 w-5 text-muted-foreground" />
        </div>
        <div class="h-16 w-16 rounded-lg bg-muted flex items-center justify-center text-sm text-muted-foreground border border-border">
          +2
        </div>
      </div>
      
      <!-- Actions -->
      <div class="mt-6 flex gap-2">
        <Button class="flex-1 gap-2" variant="default" @click="handleApprove">
          <CheckCircle class="h-4 w-4" />
          Approve
        </Button>
        <Button class="flex-1 gap-2" variant="outline" @click="handleEdit">
          <Edit class="h-4 w-4" />
          Request Edits
        </Button>
        <Button variant="outline" size="icon" class="text-red-600 hover:text-red-700" @click="handleReject">
          <X class="h-4 w-4" />
        </Button>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Card from '@/components/ui/Card.vue';
import Badge from '@/components/ui/Badge.vue';
import Button from '@/components/ui/Button.vue';
import { Bot, FolderKanban, ImageIcon, CheckCircle, Edit, X, User } from 'lucide-vue-next';
import type { ValidationItem } from '@/types';

const props = defineProps<{
  validation: ValidationItem;
}>();

const emit = defineEmits<{
  (e: 'approve', id: number): void;
  (e: 'reject', id: number): void;
  (e: 'edit', id: number): void;
}>();

const isProcessing = ref(false);

const handleApprove = () => {
  isProcessing.value = true;
  // Simulate API call
  setTimeout(() => {
    emit('approve', props.validation.id);
    isProcessing.value = false;
  }, 500);
};

const handleReject = () => {
  isProcessing.value = true;
  setTimeout(() => {
    emit('reject', props.validation.id);
    isProcessing.value = false;
  }, 500);
};

const handleEdit = () => {
  emit('edit', props.validation.id);
};
</script>
