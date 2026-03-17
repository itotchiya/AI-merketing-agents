<script setup lang="ts">
import { ref, computed } from 'vue';
import { teamMembers } from '@/data/mockData';
import Button from '@/components/ui/Button.vue';
import Badge from '@/components/ui/Badge.vue';
import { 
  Users, Plus, Search, Mail, Shield, 
  Edit, Trash2, UserPlus
} from 'lucide-vue-next';

const searchQuery = ref('');
const roleFilter = ref('all');

const filteredMembers = computed(() => {
  let filtered = teamMembers;
  if (roleFilter.value !== 'all') {
    filtered = filtered.filter(m => m.role.toLowerCase().includes(roleFilter.value.toLowerCase()));
  }
  if (searchQuery.value) {
    filtered = filtered.filter(m => 
      m.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
  return filtered;
});

// Modals
const showInviteModal = ref(false);
const showEditModal = ref(false);
const showRemoveModal = ref(false);
const selectedMember = ref<any>(null);

const openEditModal = (member: any) => {
  selectedMember.value = member;
  showEditModal.value = true;
};

const openRemoveModal = (member: any) => {
  selectedMember.value = member;
  showRemoveModal.value = true;
};

const roles = ['Admin', 'Manager', 'Exécutif', 'Viewer'];
</script>

<template>
  <div class="space-y-6">
    <!-- Stats Cards -->
    <div class="grid gap-4 md:grid-cols-4">
      <div class="rounded-xl border bg-card p-4">
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Users class="h-5 w-5 text-primary" />
          </div>
          <div>
            <p class="text-sm text-muted-foreground">Total Members</p>
            <p class="text-2xl font-bold">{{ teamMembers.length }}</p>
          </div>
        </div>
      </div>
      <div class="rounded-xl border bg-card p-4">
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
            <Shield class="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <p class="text-sm text-muted-foreground">Admins</p>
            <p class="text-2xl font-bold">{{ teamMembers.filter(m => m.role === 'Admin').length }}</p>
          </div>
        </div>
      </div>
      <div class="rounded-xl border bg-card p-4">
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <Users class="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p class="text-sm text-muted-foreground">Managers</p>
            <p class="text-2xl font-bold">{{ teamMembers.filter(m => m.role === 'Manager').length }}</p>
          </div>
        </div>
      </div>
      <div class="rounded-xl border bg-card p-4">
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
            <UserPlus class="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p class="text-sm text-muted-foreground">Active Now</p>
            <p class="text-2xl font-bold">3</p>
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
          placeholder="Search team members..."
          class="w-full pl-10 pr-4 py-2 rounded-lg border bg-background"
        />
      </div>
      <div class="flex gap-2">
        <button 
          v-for="filter in ['all', 'admin', 'manager', 'executif']" 
          :key="filter"
          @click="roleFilter = filter"
          :class="[
            'px-3 py-2 rounded-lg text-sm font-medium transition-colors capitalize',
            roleFilter === filter 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          ]"
        >
          {{ filter }}
        </button>
      </div>
      <Button class="gap-2" @click="showInviteModal = true">
        <Plus class="h-4 w-4" />
        Invite Member
      </Button>
    </div>

    <!-- Team Grid -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div v-for="member in filteredMembers" :key="member.id" class="rounded-xl border bg-card p-5">
        <div class="flex items-start justify-between mb-4">
          <div class="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-xl font-medium text-primary">
            {{ member.initials }}
          </div>
          <Badge :variant="member.status === 'active' ? 'success' : 'secondary'">
            {{ member.status }}
          </Badge>
        </div>
        
        <h3 class="font-semibold text-lg">{{ member.name }}</h3>
        <p class="text-sm text-muted-foreground mb-4">{{ member.email }}</p>
        
        <div class="space-y-2 mb-4">
          <div class="flex items-center justify-between text-sm">
            <span class="text-muted-foreground">Role</span>
            <span class="font-medium">{{ member.role }}</span>
          </div>
          <div class="flex items-center justify-between text-sm">
            <span class="text-muted-foreground">Projects</span>
            <span class="font-medium">{{ member.projects }}</span>
          </div>
          <div class="flex items-center justify-between text-sm">
            <span class="text-muted-foreground">Tasks Done</span>
            <span class="font-medium">{{ member.tasksCompleted }}</span>
          </div>
        </div>
        
        <div class="flex gap-2 pt-4 border-t">
          <Button size="sm" variant="outline" class="flex-1 gap-2" @click="openEditModal(member)">
            <Edit class="h-4 w-4" />
            Edit
          </Button>
          <Button size="sm" variant="outline" class="flex-1 gap-2 text-red-600" @click="openRemoveModal(member)">
            <Trash2 class="h-4 w-4" />
            Remove
          </Button>
        </div>
      </div>
      
      <!-- Add Member Card -->
      <button @click="showInviteModal = true" class="rounded-xl border border-dashed border-border p-5 flex flex-col items-center justify-center gap-3 text-muted-foreground hover:bg-muted/50 transition-colors min-h-[280px]">
        <div class="h-14 w-14 rounded-full bg-muted flex items-center justify-center">
          <Plus class="h-6 w-6" />
        </div>
        <span class="font-medium">Invite New Member</span>
      </button>
    </div>

    <!-- Invite Modal -->
    <div v-if="showInviteModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click="showInviteModal = false">
      <div class="rounded-xl border bg-card p-6 w-full max-w-md" @click.stop>
        <h2 class="text-lg font-semibold mb-4">Invite Team Member</h2>
        <div class="space-y-4">
          <div>
            <label class="text-sm font-medium mb-1.5 block">Email Address</label>
            <div class="relative">
              <Mail class="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input type="email" placeholder="colleague@company.com" class="w-full pl-10 pr-4 py-2 rounded-lg border bg-background" />
            </div>
          </div>
          <div>
            <label class="text-sm font-medium mb-1.5 block">Role</label>
            <select class="w-full px-3 py-2 rounded-lg border bg-background">
              <option v-for="role in roles" :key="role">{{ role }}</option>
            </select>
          </div>
          <div>
            <label class="text-sm font-medium mb-1.5 block">Projects (Optional)</label>
            <select class="w-full px-3 py-2 rounded-lg border bg-background">
              <option>All Projects</option>
              <option>Summer Launch 2026</option>
              <option>Product Beta</option>
              <option>Q1 Newsletter</option>
            </select>
          </div>
          <div class="p-3 rounded-lg bg-muted">
            <p class="text-sm font-medium mb-1">Permission Preview</p>
            <p class="text-sm text-muted-foreground">Can create projects, launch agents, and manage team members.</p>
          </div>
        </div>
        <div class="flex justify-end gap-2 mt-6">
          <Button variant="outline" @click="showInviteModal = false">Cancel</Button>
          <Button @click="showInviteModal = false">Send Invitation</Button>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="showEditModal && selectedMember" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click="showEditModal = false">
      <div class="rounded-xl border bg-card p-6 w-full max-w-md" @click.stop>
        <h2 class="text-lg font-semibold mb-4">Edit Member</h2>
        <div class="flex items-center gap-4 mb-6">
          <div class="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-medium text-primary">
            {{ selectedMember.initials }}
          </div>
          <div>
            <p class="font-semibold">{{ selectedMember.name }}</p>
            <p class="text-sm text-muted-foreground">{{ selectedMember.email }}</p>
          </div>
        </div>
        <div class="space-y-4">
          <div>
            <label class="text-sm font-medium mb-1.5 block">Role</label>
            <select class="w-full px-3 py-2 rounded-lg border bg-background">
              <option v-for="role in roles" :key="role" :selected="selectedMember.role === role">{{ role }}</option>
            </select>
          </div>
          <div>
            <label class="text-sm font-medium mb-1.5 block">Status</label>
            <select class="w-full px-3 py-2 rounded-lg border bg-background">
              <option selected>Active</option>
              <option>Inactive</option>
            </select>
          </div>
          <div class="p-3 rounded-lg bg-muted">
            <p class="text-sm font-medium">Current Stats</p>
            <div class="mt-2 grid grid-cols-2 gap-4 text-sm">
              <div>
                <span class="text-muted-foreground">Projects:</span>
                <span class="ml-1 font-medium">{{ selectedMember.projects }}</span>
              </div>
              <div>
                <span class="text-muted-foreground">Tasks:</span>
                <span class="ml-1 font-medium">{{ selectedMember.tasksCompleted }}</span>
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

    <!-- Remove Modal -->
    <div v-if="showRemoveModal && selectedMember" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click="showRemoveModal = false">
      <div class="rounded-xl border bg-card p-6 w-full max-w-sm text-center" @click.stop>
        <div class="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
          <Trash2 class="h-6 w-6 text-red-600" />
        </div>
        <h2 class="text-lg font-semibold mb-2">Remove Member?</h2>
        <p class="text-sm text-muted-foreground mb-4">
          This will remove <strong>{{ selectedMember.name }}</strong> from all projects. Their completed work will be preserved.
        </p>
        <div class="flex gap-2 justify-center">
          <Button variant="outline" @click="showRemoveModal = false">Cancel</Button>
          <Button variant="destructive" @click="showRemoveModal = false">Remove</Button>
        </div>
      </div>
    </div>
  </div>
</template>
