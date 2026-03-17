<script setup lang="ts">
import { ref, computed } from 'vue';
import ValidationItem from '@/components/dashboard/ValidationItem.vue';
import { validationItems } from '@/data/mockData';
import type { ValidationItem as ValidationItemType } from '@/types';
import Button from '@/components/ui/Button.vue';
import { CheckCircle, XCircle, RotateCcw, Filter } from 'lucide-vue-next';

// Reactive state for items (copy from mock data)
const pendingItems = ref<ValidationItemType[]>([...validationItems]);
const approvedItems = ref<ValidationItemType[]>([
  {
    id: 101,
    title: 'Q4 Social Media Calendar',
    project: 'Winter Campaign',
    agent: 'Social Publisher',
    submittedBy: 'Marie',
    submittedAt: 'Yesterday',
    priority: 'medium',
    type: 'content'
  },
  {
    id: 102,
    title: 'Email Template Redesign',
    project: 'Q1 Newsletter',
    agent: 'Email Marketer',
    submittedBy: 'Sophie',
    submittedAt: '2 days ago',
    priority: 'low',
    type: 'content'
  }
]);
const rejectedItems = ref<ValidationItemType[]>([
  {
    id: 201,
    title: 'Banner Ads v1',
    project: 'Summer Launch 2026',
    agent: 'Studio Créatif',
    submittedBy: 'Agent',
    submittedAt: '3 days ago',
    priority: 'high',
    type: 'content'
  }
]);

const activeTab = ref('pending');
const priorityFilter = ref('all');

const tabs = computed(() => [
  { id: 'pending', label: 'Pending', count: filteredPendingItems.value.length },
  { id: 'approved', label: 'Approved', count: approvedItems.value.length },
  { id: 'rejected', label: 'Rejected', count: rejectedItems.value.length },
]);

const priorities = [
  { id: 'all', label: 'All', color: '' },
  { id: 'high', label: 'High', color: 'bg-red-100 text-red-700' },
  { id: 'medium', label: 'Medium', color: 'bg-amber-100 text-amber-700' },
  { id: 'low', label: 'Low', color: 'bg-green-100 text-green-700' },
];

const filteredPendingItems = computed(() => {
  if (priorityFilter.value === 'all') return pendingItems.value;
  return pendingItems.value.filter((v: ValidationItemType) => v.priority === priorityFilter.value);
});

// Action handlers
const handleApprove = (id: number) => {
  const item = pendingItems.value.find(v => v.id === id);
  if (item) {
    // Remove from pending
    pendingItems.value = pendingItems.value.filter(v => v.id !== id);
    // Add to approved
    approvedItems.value.unshift({ ...item, submittedAt: 'Just now' });
    // Show success notification (could be implemented)
    console.log(`Approved item ${id}`);
  }
};

const handleReject = (id: number) => {
  const item = pendingItems.value.find(v => v.id === id);
  if (item) {
    // Remove from pending
    pendingItems.value = pendingItems.value.filter(v => v.id !== id);
    // Add to rejected
    rejectedItems.value.unshift({ ...item, submittedAt: 'Just now' });
    console.log(`Rejected item ${id}`);
  }
};

const handleEdit = (id: number) => {
  console.log(`Request edits for item ${id}`);
  // Could open a modal for edit comments
};

const handleRestore = (item: ValidationItemType, from: 'approved' | 'rejected') => {
  if (from === 'approved') {
    approvedItems.value = approvedItems.value.filter(v => v.id !== item.id);
  } else {
    rejectedItems.value = rejectedItems.value.filter(v => v.id !== item.id);
  }
  pendingItems.value.unshift({ ...item, submittedAt: 'Just now' });
};

const handleBulkApprove = () => {
  const itemsToApprove = [...pendingItems.value];
  pendingItems.value = [];
  approvedItems.value.unshift(...itemsToApprove.map(item => ({ ...item, submittedAt: 'Just now' })));
};
</script>

<template>
  <div>
    <!-- Header with bulk actions -->
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2">
        <Filter class="h-4 w-4 text-muted-foreground" />
        <span class="text-sm text-muted-foreground">Validation Queue</span>
      </div>
      <div v-if="activeTab === 'pending' && pendingItems.length > 0" class="flex gap-2">
        <Button size="sm" variant="outline" class="gap-2" @click="handleBulkApprove">
          <CheckCircle class="h-4 w-4" />
          Approve All ({{ pendingItems.length }})
        </Button>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex items-center gap-2 mb-6 border-b border-border pb-4">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="[
          'px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors',
          activeTab === tab.id 
            ? 'bg-primary text-primary-foreground' 
            : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
        ]"
      >
        {{ tab.label }}
        <span 
          v-if="tab.count > 0" 
          :class="[
            'px-1.5 py-0.5 rounded-full text-xs',
            activeTab === tab.id ? 'bg-primary-foreground text-primary' : 'bg-secondary'
          ]"
        >
          {{ tab.count }}
        </span>
      </button>
    </div>

    <!-- Priority Filters - Only show for pending tab -->
    <div v-show="activeTab === 'pending'" class="flex items-center gap-2 mb-6">
      <span class="text-sm text-muted-foreground">Filter by priority:</span>
      <button
        v-for="prio in priorities"
        :key="prio.id"
        @click="priorityFilter = prio.id"
        :class="[
          'px-3 py-1 rounded-full text-sm font-medium transition-colors',
          priorityFilter === prio.id 
            ? (prio.color || 'bg-primary text-primary-foreground')
            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
        ]"
      >
        {{ prio.label }}
      </button>
    </div>

    <!-- Validation Items -->
    <div class="space-y-4 max-w-3xl">
      <!-- Pending Tab Content -->
      <template v-if="activeTab === 'pending'">
        <div v-if="filteredPendingItems.length > 0" class="space-y-4">
          <ValidationItem 
            v-for="item in filteredPendingItems" 
            :key="item.id"
            :validation="item" 
            @approve="handleApprove"
            @reject="handleReject"
            @edit="handleEdit"
          />
        </div>
        <div v-else class="text-center py-12 rounded-xl border bg-card">
          <div class="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle class="h-8 w-8 text-green-600" />
          </div>
          <h3 class="text-lg font-semibold">All caught up!</h3>
          <p class="text-muted-foreground">No pending validations. Check back later for new items.</p>
        </div>
      </template>

      <!-- Approved Tab Content -->
      <template v-if="activeTab === 'approved'">
        <div v-if="approvedItems.length > 0" class="space-y-4">
          <div 
            v-for="item in approvedItems" 
            :key="item.id"
            class="rounded-xl border bg-card p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
          >
            <div class="flex items-center gap-4">
              <div class="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle class="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p class="font-medium">{{ item.title }}</p>
                <p class="text-sm text-muted-foreground">{{ item.project }} • {{ item.agent }} • {{ item.submittedAt }}</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <Button size="sm" variant="outline" class="gap-2" @click="handleRestore(item, 'approved')">
                <RotateCcw class="h-4 w-4" />
                Restore
              </Button>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-12 rounded-xl border bg-card">
          <div class="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <CheckCircle class="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 class="text-lg font-semibold">No approved items yet</h3>
          <p class="text-muted-foreground">Items you approve will appear here.</p>
        </div>
      </template>

      <!-- Rejected Tab Content -->
      <template v-if="activeTab === 'rejected'">
        <div v-if="rejectedItems.length > 0" class="space-y-4">
          <div 
            v-for="item in rejectedItems" 
            :key="item.id"
            class="rounded-xl border bg-card p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
          >
            <div class="flex items-center gap-4">
              <div class="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                <XCircle class="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p class="font-medium">{{ item.title }}</p>
                <p class="text-sm text-muted-foreground">{{ item.project }} • {{ item.agent }} • {{ item.submittedAt }}</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <Button size="sm" variant="outline" class="gap-2" @click="handleRestore(item, 'rejected')">
                <RotateCcw class="h-4 w-4" />
                Restore
              </Button>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-12 rounded-xl border bg-card">
          <div class="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <XCircle class="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 class="text-lg font-semibold">No rejected items</h3>
          <p class="text-muted-foreground">Items you reject will appear here.</p>
        </div>
      </template>
    </div>
  </div>
</template>
