<script setup lang="ts">
import { ref, computed } from 'vue';
import { businesses } from '@/data/mockData';
import Button from '@/components/ui/Button.vue';
import Badge from '@/components/ui/Badge.vue';
import { 
  Building2, Users, TrendingUp, Plus, 
  Search, Edit, PauseCircle
} from 'lucide-vue-next';

const searchQuery = ref('');
const statusFilter = ref('all');

const filteredBusinesses = computed(() => {
  let filtered = businesses;
  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(b => b.status === statusFilter.value);
  }
  if (searchQuery.value) {
    filtered = filtered.filter(b => 
      b.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
  return filtered;
});

// Modals
const showAddModal = ref(false);
const showEditModal = ref(false);
const showSuspendModal = ref(false);
const selectedBusiness = ref<any>(null);

const openEditModal = (business: any) => {
  selectedBusiness.value = business;
  showEditModal.value = true;
};

const openSuspendModal = (business: any) => {
  selectedBusiness.value = business;
  showSuspendModal.value = true;
};
</script>

<template>
  <div class="space-y-6">
    <!-- Stats Cards -->
    <div class="grid gap-4 md:grid-cols-4">
      <div class="rounded-xl border bg-card p-4">
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Building2 class="h-5 w-5 text-primary" />
          </div>
          <div>
            <p class="text-sm text-muted-foreground">Total</p>
            <p class="text-2xl font-bold">24</p>
          </div>
        </div>
      </div>
      <div class="rounded-xl border bg-card p-4">
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
            <TrendingUp class="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p class="text-sm text-muted-foreground">Active</p>
            <p class="text-2xl font-bold">22</p>
          </div>
        </div>
      </div>
      <div class="rounded-xl border bg-card p-4">
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center">
            <Users class="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <p class="text-sm text-muted-foreground">Trial</p>
            <p class="text-2xl font-bold">1</p>
          </div>
        </div>
      </div>
      <div class="rounded-xl border bg-card p-4">
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center">
            <PauseCircle class="h-5 w-5 text-red-600" />
          </div>
          <div>
            <p class="text-sm text-muted-foreground">Suspended</p>
            <p class="text-2xl font-bold">1</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Search and Filter -->
    <div class="flex items-center gap-4">
      <div class="flex-1 relative">
        <Search class="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Search businesses..."
          class="w-full pl-10 pr-4 py-2 rounded-lg border bg-background"
        />
      </div>
      <div class="flex gap-2">
        <button 
          v-for="filter in ['all', 'active', 'suspended']" 
          :key="filter"
          @click="statusFilter = filter"
          :class="[
            'px-3 py-2 rounded-lg text-sm font-medium transition-colors capitalize',
            statusFilter === filter 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          ]"
        >
          {{ filter }}
        </button>
      </div>
      <Button class="gap-2" @click="showAddModal = true">
        <Plus class="h-4 w-4" />
        Add Business
      </Button>
    </div>

    <!-- Businesses Grid -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div v-for="business in filteredBusinesses" :key="business.id" class="rounded-xl border bg-card p-5">
        <div class="flex items-start justify-between mb-4">
          <div class="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Building2 class="h-6 w-6 text-primary" />
          </div>
          <Badge :variant="business.status === 'active' ? 'success' : 'destructive'">
            {{ business.status }}
          </Badge>
        </div>
        
        <h3 class="font-semibold text-lg mb-1">{{ business.name }}</h3>
        <p class="text-sm text-muted-foreground mb-4">{{ business.industry }}</p>
        
        <div class="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <p class="text-muted-foreground">Users</p>
            <p class="font-medium">{{ business.users }}</p>
          </div>
          <div>
            <p class="text-muted-foreground">Projects</p>
            <p class="font-medium">{{ business.projects }}</p>
          </div>
          <div>
            <p class="text-muted-foreground">Revenue</p>
            <p class="font-medium">€{{ business.revenue.toLocaleString() }}</p>
          </div>
          <div>
            <p class="text-muted-foreground">Plan</p>
            <p class="font-medium capitalize">{{ business.plan }}</p>
          </div>
        </div>
        
        <div class="flex gap-2 pt-4 border-t">
          <Button size="sm" variant="outline" class="flex-1 gap-2" @click="openEditModal(business)">
            <Edit class="h-4 w-4" />
            Edit
          </Button>
          <Button 
            v-if="business.status === 'active'"
            size="sm" 
            variant="outline" 
            class="flex-1 gap-2 text-amber-600"
            @click="openSuspendModal(business)"
          >
            <PauseCircle class="h-4 w-4" />
            Suspend
          </Button>
          <Button v-else size="sm" variant="outline" class="flex-1 gap-2 text-green-600">
            <TrendingUp class="h-4 w-4" />
            Activate
          </Button>
        </div>
      </div>
    </div>

    <!-- Add Business Modal -->
    <div v-if="showAddModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click="showAddModal = false">
      <div class="rounded-xl border bg-card p-6 w-full max-w-md" @click.stop>
        <h2 class="text-lg font-semibold mb-4">Add New Business</h2>
        <div class="space-y-4">
          <div>
            <label class="text-sm font-medium mb-1.5 block">Business Name</label>
            <input type="text" placeholder="Acme Inc." class="w-full px-3 py-2 rounded-lg border bg-background" />
          </div>
          <div>
            <label class="text-sm font-medium mb-1.5 block">Industry</label>
            <select class="w-full px-3 py-2 rounded-lg border bg-background">
              <option>E-commerce</option>
              <option>SaaS</option>
              <option>Retail</option>
              <option>Healthcare</option>
              <option>Finance</option>
            </select>
          </div>
          <div>
            <label class="text-sm font-medium mb-1.5 block">Plan</label>
            <select class="w-full px-3 py-2 rounded-lg border bg-background">
              <option>Starter</option>
              <option>Professional</option>
              <option>Enterprise</option>
            </select>
          </div>
          <div>
            <label class="text-sm font-medium mb-1.5 block">Admin Email</label>
            <input type="email" placeholder="admin@company.com" class="w-full px-3 py-2 rounded-lg border bg-background" />
          </div>
        </div>
        <div class="flex justify-end gap-2 mt-6">
          <Button variant="outline" @click="showAddModal = false">Cancel</Button>
          <Button @click="showAddModal = false">Create Business</Button>
        </div>
      </div>
    </div>

    <!-- Edit Business Modal -->
    <div v-if="showEditModal && selectedBusiness" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click="showEditModal = false">
      <div class="rounded-xl border bg-card p-6 w-full max-w-md" @click.stop>
        <h2 class="text-lg font-semibold mb-4">Edit Business</h2>
        <div class="space-y-4">
          <div>
            <label class="text-sm font-medium mb-1.5 block">Business Name</label>
            <input type="text" :value="selectedBusiness.name" class="w-full px-3 py-2 rounded-lg border bg-background" />
          </div>
          <div>
            <label class="text-sm font-medium mb-1.5 block">Industry</label>
            <select class="w-full px-3 py-2 rounded-lg border bg-background">
              <option :selected="selectedBusiness.industry === 'E-commerce'">E-commerce</option>
              <option :selected="selectedBusiness.industry === 'SaaS'">SaaS</option>
              <option :selected="selectedBusiness.industry === 'Retail'">Retail</option>
            </select>
          </div>
          <div>
            <label class="text-sm font-medium mb-1.5 block">Plan</label>
            <select class="w-full px-3 py-2 rounded-lg border bg-background">
              <option :selected="selectedBusiness.plan === 'starter'">Starter</option>
              <option :selected="selectedBusiness.plan === 'professional'">Professional</option>
              <option :selected="selectedBusiness.plan === 'enterprise'">Enterprise</option>
            </select>
          </div>
          <div class="p-3 rounded-lg bg-muted">
            <p class="text-sm font-medium">Current Usage</p>
            <div class="mt-2 space-y-1 text-sm">
              <div class="flex justify-between">
                <span class="text-muted-foreground">Users</span>
                <span>{{ selectedBusiness.users }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-muted-foreground">Projects</span>
                <span>{{ selectedBusiness.projects }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-muted-foreground">Revenue</span>
                <span>€{{ selectedBusiness.revenue.toLocaleString() }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-end gap-2 mt-6">
          <Button variant="outline" @click="showEditModal = false">Cancel</Button>
          <Button @click="showEditModal = false">Save Changes</Button>
        </div>
      </div>
    </div>

    <!-- Suspend Modal -->
    <div v-if="showSuspendModal && selectedBusiness" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click="showSuspendModal = false">
      <div class="rounded-xl border bg-card p-6 w-full max-w-sm text-center" @click.stop>
        <div class="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
          <PauseCircle class="h-6 w-6 text-amber-600" />
        </div>
        <h2 class="text-lg font-semibold mb-2">Suspend Business?</h2>
        <p class="text-sm text-muted-foreground mb-4">
          This will suspend <strong>{{ selectedBusiness.name }}</strong>. All users will lose access until reactivated.
        </p>
        <div class="space-y-2">
          <label class="text-sm font-medium">Reason for suspension</label>
          <select class="w-full px-3 py-2 rounded-lg border bg-background text-sm">
            <option>Payment overdue</option>
            <option>Violation of terms</option>
            <option>Requested by admin</option>
            <option>Other</option>
          </select>
        </div>
        <div class="flex gap-2 justify-center mt-6">
          <Button variant="outline" @click="showSuspendModal = false">Cancel</Button>
          <Button variant="destructive" @click="showSuspendModal = false">Suspend</Button>
        </div>
      </div>
    </div>
  </div>
</template>
