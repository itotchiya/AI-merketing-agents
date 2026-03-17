<script setup lang="ts">
import { ref, computed } from 'vue';
import { getProjectDetail } from '@/data/projectDetails';
import { getProjectWorkflow } from '@/data/projectWorkflows';
import ProjectWorkflow from './ProjectWorkflow.vue';
import Button from '@/components/ui/Button.vue';
import Progress from '@/components/ui/Progress.vue';
import Badge from '@/components/ui/Badge.vue';
import { 
  Play, Pause, RotateCcw, CheckCircle, Clock, Users, 
  FileText, Image, Video, BarChart3, AlertCircle, CheckCheck,
  FileSpreadsheet, FolderArchive, ChevronLeft, TrendingUp
} from 'lucide-vue-next';

const props = defineProps<{
  projectId: number;
}>();

// Get project-specific data
const projectDetail = computed(() => getProjectDetail(props.projectId));
const project = computed(() => projectDetail.value.project);
const stats = computed(() => projectDetail.value.stats);

// Get project workflow
const projectWorkflow = computed(() => getProjectWorkflow(props.projectId));

// Local reactive state for UI interactions
const tasks = ref(projectDetail.value.tasks);
const resources = ref(projectDetail.value.resources);
const activities = ref(projectDetail.value.activities);
const team = computed(() => projectDetail.value.team);

// Active tab
const activeTab = ref('workflow');
const tabs = [
  { id: 'workflow', label: 'AI Workflow', icon: TrendingUp },
  { id: 'tasks', label: 'Tasks', icon: CheckCircle },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'resources', label: 'Resources', icon: FileText },
  { id: 'activity', label: 'Activity', icon: Clock },
];

// Modals
const showEditModal = ref(false);
const showTeamModal = ref(false);
const showArchiveModal = ref(false);
const showLaunchModal = ref(false);

// Helper functions
const getStatusVariant = (status: string) => {
  switch (status) {
    case 'completed': return 'success';
    case 'active': return 'default';
    case 'draft': return 'warning';
    default: return 'secondary';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-green-500 text-white';
    case 'in_progress': return 'bg-primary text-primary-foreground';
    case 'failed': return 'bg-red-500 text-white';
    case 'blocked': return 'bg-amber-500 text-white';
    default: return 'bg-muted text-muted-foreground';
  }
};

const getResourceIcon = (type: string) => {
  switch (type) {
    case 'document': return FileText;
    case 'image': return Image;
    case 'video': return Video;
    case 'spreadsheet': return FileSpreadsheet;
    case 'archive': return FolderArchive;
    default: return FileText;
  }
};

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'approval': return 'bg-green-100 text-green-600';
    case 'agent': return 'bg-blue-100 text-blue-600';
    case 'system': return 'bg-purple-100 text-purple-600';
    default: return 'bg-gray-100 text-gray-600';
  }
};

// Actions
const approveTask = (taskId: number) => {
  const task = tasks.value.find(t => t.id === taskId);
  if (task) {
    task.status = 'completed';
  }
};

// Calculate progress from tasks
const completedTasks = computed(() => tasks.value.filter(t => t.status === 'completed').length);
const totalTasks = computed(() => tasks.value.length);
const taskProgress = computed(() => Math.round((completedTasks.value / totalTasks.value) * 100));

// Calculate workflow progress from 3-phase workflow
const workflowProgress = computed(() => projectWorkflow.value.overallProgress);

// Get waiting approvals count
const waitingApprovals = computed(() => {
  return projectWorkflow.value.phases.reduce((count, phase) => {
    return count + phase.steps.filter(s => s.status === 'waiting_approval').length;
  }, 0);
});

// Budget percentage
const budgetPercentage = computed(() => Math.round((stats.value.budgetUsed / stats.value.budgetTotal) * 100));
</script>

<template>
  <div class="space-y-6">
    <!-- Back Link -->
    <a href="/projects" class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
      <ChevronLeft class="h-4 w-4" />
      Back to Projects
    </a>

    <!-- Project Header Card -->
    <div class="rounded-xl border bg-card p-6">
      <div class="flex items-start justify-between">
        <div class="flex-1">
          <div class="flex items-center gap-3 mb-2">
            <Badge :variant="getStatusVariant(project.status)">
              {{ project.status }}
            </Badge>
            <span class="text-sm text-muted-foreground">{{ project.objective }} • Created 3 days ago</span>
          </div>
          <h1 class="text-2xl font-bold mb-2">{{ project.name }}</h1>
          <p class="text-muted-foreground max-w-3xl">{{ project.description }}</p>
          
          <!-- Progress Section -->
          <div class="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="p-3 rounded-lg bg-muted/50">
              <div class="flex items-center justify-between text-sm mb-1">
                <span class="text-muted-foreground">Task Progress</span>
                <span class="font-medium">{{ taskProgress }}%</span>
              </div>
              <Progress :value="taskProgress" class="h-2" />
              <p class="text-xs text-muted-foreground mt-1">{{ completedTasks }}/{{ totalTasks }} tasks</p>
            </div>
            <div class="p-3 rounded-lg bg-muted/50">
              <div class="flex items-center justify-between text-sm mb-1">
                <span class="text-muted-foreground">AI Workflow</span>
                <span class="font-medium">{{ workflowProgress }}%</span>
              </div>
              <Progress :value="workflowProgress" class="h-2" />
              <p class="text-xs text-muted-foreground mt-1">
                Phase {{ projectWorkflow.currentPhase }} of 3
                <span v-if="waitingApprovals > 0" class="text-blue-600 ml-1">({{ waitingApprovals }} pending approval)</span>
              </p>
            </div>
            <div class="p-3 rounded-lg bg-muted/50">
              <div class="flex items-center justify-between text-sm mb-1">
                <span class="text-muted-foreground">Budget Used</span>
                <span class="font-medium">{{ budgetPercentage }}%</span>
              </div>
              <Progress :value="budgetPercentage" class="h-2" />
              <p class="text-xs text-muted-foreground mt-1">€{{ stats.budgetUsed.toLocaleString() }} of €{{ stats.budgetTotal.toLocaleString() }}</p>
            </div>
            <div class="p-3 rounded-lg bg-muted/50">
              <div class="flex items-center justify-between text-sm mb-1">
                <span class="text-muted-foreground">Time</span>
                <span :class="['font-medium', stats.timeRemaining === 'Completed' ? 'text-green-600' : 'text-amber-600']">{{ stats.timeRemaining }}</span>
              </div>
              <Progress :value="stats.timeRemaining === 'Completed' ? 100 : 60" class="h-2" />
              <p class="text-xs text-muted-foreground mt-1">Due {{ project.dueDate }}</p>
            </div>
          </div>
        </div>
        
        <!-- Actions -->
        <div class="flex flex-col gap-2 ml-6">
          <Button v-if="project.status === 'active'" size="sm" class="gap-2" @click="showLaunchModal = true">
            <Play class="h-4 w-4" />
            Launch Now
          </Button>
          <Button v-else-if="project.status === 'draft'" size="sm" class="gap-2" @click="showLaunchModal = true">
            <Play class="h-4 w-4" />
            Start Project
          </Button>
          <Button v-else size="sm" variant="secondary" class="gap-2">
            <BarChart3 class="h-4 w-4" />
            View Report
          </Button>
          <Button size="sm" variant="outline" class="gap-2" @click="showEditModal = true">
            <FileText class="h-4 w-4" />
            Edit Project
          </Button>
          <Button size="sm" variant="outline" class="gap-2" @click="showTeamModal = true">
            <Users class="h-4 w-4" />
            Manage Team
          </Button>
          <Button size="sm" variant="outline" :class="project.status === 'completed' ? 'gap-2 text-amber-600' : 'gap-2 text-red-600'" @click="showArchiveModal = true">
            <RotateCcw class="h-4 w-4" />
            {{ project.status === 'completed' ? 'Archive' : 'Delete' }}
          </Button>
        </div>
      </div>
    </div>

    <!-- Tabs Navigation -->
    <div class="flex items-center gap-2 border-b border-border">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="[
          'flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors',
          activeTab === tab.id
            ? 'border-primary text-primary'
            : 'border-transparent text-muted-foreground hover:text-foreground'
        ]"
      >
        <component :is="tab.icon" class="h-4 w-4" />
        {{ tab.label }}
        <span v-if="tab.id === 'tasks'" class="ml-1 px-1.5 py-0.5 rounded-full bg-secondary text-xs">
          {{ tasks.length }}
        </span>
        <span v-if="tab.id === 'workflow' && waitingApprovals > 0" class="ml-1 px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs">
          {{ waitingApprovals }}
        </span>
      </button>
    </div>

    <!-- Tab Content -->
    <div class="min-h-[400px]">
      <!-- AI Workflow Tab - 3 Phase Process -->
      <div v-if="activeTab === 'workflow'">
        <ProjectWorkflow :project-id="projectId" />
      </div>

      <!-- Tasks Tab -->
      <div v-if="activeTab === 'tasks'" class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold">Project Tasks ({{ completedTasks }}/{{ totalTasks }})</h2>
          <Button v-if="project.status !== 'completed'" size="sm" class="gap-2">
            <CheckCircle class="h-4 w-4" />
            Add Task
          </Button>
        </div>
        
        <div class="rounded-xl border bg-card divide-y">
          <div 
            v-for="task in tasks" 
            :key="task.id"
            class="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
          >
            <button 
              @click="approveTask(task.id)"
              :class="[
                'h-5 w-5 rounded border-2 flex items-center justify-center transition-colors',
                task.status === 'completed' ? 'bg-green-500 border-green-500' : 'border-muted-foreground hover:border-primary'
              ]"
            >
              <CheckCheck v-if="task.status === 'completed'" class="h-3.5 w-3.5 text-white" />
            </button>
            <div class="flex-1 min-w-0">
              <p :class="['font-medium truncate', task.status === 'completed' && 'line-through text-muted-foreground']">
                {{ task.title }}
              </p>
              <p class="text-sm text-muted-foreground">Assigned to {{ task.assignee }} • Due {{ task.dueDate }}</p>
            </div>
            <Badge 
              v-if="task.priority === 'high'" 
              variant="destructive" 
              class="text-xs"
            >
              High
            </Badge>
            <Badge 
              :variant="task.status === 'completed' ? 'secondary' : task.status === 'in_progress' ? 'default' : task.status === 'blocked' ? 'destructive' : 'outline'"
              class="text-xs capitalize"
            >
              {{ task.status.replace('_', ' ') }}
            </Badge>
          </div>
        </div>
      </div>

      <!-- Team Tab -->
      <div v-if="activeTab === 'team'" class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold">Project Team ({{ team.length }} members)</h2>
          <Button v-if="project.status !== 'completed'" size="sm" variant="outline" class="gap-2" @click="showTeamModal = true">
            <Users class="h-4 w-4" />
            Edit Team
          </Button>
        </div>
        
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="member in team" :key="member.id" class="rounded-xl border bg-card p-4 flex items-center gap-4">
            <div class="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-lg font-medium text-primary">
              {{ member.initials }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-medium truncate">{{ member.name }}</p>
              <p class="text-sm text-muted-foreground">{{ member.role }}</p>
            </div>
          </div>
          
          <!-- Add Agent Card -->
          <button v-if="project.status !== 'completed'" class="rounded-xl border border-dashed border-border p-4 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:bg-muted/50 transition-colors min-h-[88px]">
            <div class="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
              <Play class="h-5 w-5" />
            </div>
            <span class="text-sm font-medium">Add AI Agent</span>
          </button>
        </div>
      </div>

      <!-- Resources Tab -->
      <div v-if="activeTab === 'resources'" class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold">Resources & Assets ({{ resources.length }})</h2>
          <Button v-if="project.status !== 'completed'" size="sm" class="gap-2">
            <FileText class="h-4 w-4" />
            Upload
          </Button>
        </div>
        
        <div class="rounded-xl border bg-card divide-y">
          <div v-for="resource in resources" :key="resource.id" class="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors">
            <div class="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <component :is="getResourceIcon(resource.type)" class="h-5 w-5 text-primary" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-medium truncate">{{ resource.name }}</p>
              <p class="text-sm text-muted-foreground">{{ resource.size }} • {{ resource.type }} • Updated {{ resource.updated }}</p>
            </div>
            <Button size="sm" variant="ghost" class="shrink-0">
              Download
            </Button>
          </div>
        </div>
      </div>

      <!-- Activity Tab -->
      <div v-if="activeTab === 'activity'" class="space-y-4">
        <h2 class="text-lg font-semibold">Activity Log ({{ activities.length }} events)</h2>
        
        <div class="space-y-4">
          <div v-for="activity in activities" :key="activity.id" class="flex gap-4">
            <div :class="['h-8 w-8 rounded-full flex items-center justify-center shrink-0', getActivityIcon(activity.type)]">
              <CheckCircle v-if="activity.type === 'approval'" class="h-4 w-4" />
              <Play v-else-if="activity.type === 'agent'" class="h-4 w-4" />
              <BarChart3 v-else-if="activity.type === 'system'" class="h-4 w-4" />
              <FileText v-else class="h-4 w-4" />
            </div>
            <div class="flex-1 pb-4 border-b border-border">
              <p>
                <span class="font-medium">{{ activity.user }}</span>
                <span class="text-muted-foreground"> {{ activity.action }} </span>
                <span class="font-medium">{{ activity.target }}</span>
              </p>
              <p class="text-sm text-muted-foreground">{{ activity.time }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Project Modal -->
    <div v-if="showEditModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click="showEditModal = false">
      <div class="rounded-xl border bg-card p-6 w-full max-w-lg" @click.stop>
        <h2 class="text-lg font-semibold mb-4">Edit Project</h2>
        <div class="space-y-4">
          <div>
            <label class="text-sm font-medium mb-1.5 block">Project Name</label>
            <input type="text" :value="project.name" class="w-full px-3 py-2 rounded-lg border bg-background" />
          </div>
          <div>
            <label class="text-sm font-medium mb-1.5 block">Description</label>
            <textarea class="w-full px-3 py-2 rounded-lg border bg-background h-20">{{ project.description }}</textarea>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-medium mb-1.5 block">Due Date</label>
              <input type="text" :value="project.dueDate" class="w-full px-3 py-2 rounded-lg border bg-background" />
            </div>
            <div>
              <label class="text-sm font-medium mb-1.5 block">Status</label>
              <select class="w-full px-3 py-2 rounded-lg border bg-background">
                <option :selected="project.status === 'active'">Active</option>
                <option :selected="project.status === 'completed'">Completed</option>
                <option :selected="project.status === 'draft'">Draft</option>
                <option :selected="project.status === 'on_hold'">On Hold</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-medium mb-1.5 block">Budget Used (€)</label>
              <input type="number" :value="stats.budgetUsed" class="w-full px-3 py-2 rounded-lg border bg-background" />
            </div>
            <div>
              <label class="text-sm font-medium mb-1.5 block">Total Budget (€)</label>
              <input type="number" :value="stats.budgetTotal" class="w-full px-3 py-2 rounded-lg border bg-background" />
            </div>
          </div>
        </div>
        <div class="flex justify-end gap-2 mt-6">
          <Button variant="outline" @click="showEditModal = false">Cancel</Button>
          <Button @click="showEditModal = false">Save Changes</Button>
        </div>
      </div>
    </div>

    <!-- Manage Team Modal -->
    <div v-if="showTeamModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click="showTeamModal = false">
      <div class="rounded-xl border bg-card p-6 w-full max-w-md" @click.stop>
        <h2 class="text-lg font-semibold mb-4">Manage Team</h2>
        <div class="space-y-3 mb-4 max-h-60 overflow-y-auto">
          <div v-for="member in team" :key="member.id" class="flex items-center gap-3 p-3 rounded-lg border">
            <div class="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-medium text-primary">
              {{ member.initials }}
            </div>
            <div class="flex-1">
              <p class="font-medium">{{ member.name }}</p>
              <p class="text-sm text-muted-foreground">{{ member.role }}</p>
            </div>
            <Button size="sm" variant="ghost" class="text-red-600 hover:text-red-700">Remove</Button>
          </div>
        </div>
        <div class="border-t pt-4">
          <label class="text-sm font-medium mb-2 block">Add Team Member</label>
          <select class="w-full px-3 py-2 rounded-lg border bg-background mb-3">
            <option>Select a user...</option>
            <option>Emma Dubois</option>
            <option>Lucas Bernard</option>
            <option>Sophie Martin</option>
          </select>
          <Button size="sm" class="w-full">Add to Project</Button>
        </div>
        <div class="flex justify-end mt-4">
          <Button variant="outline" @click="showTeamModal = false">Done</Button>
        </div>
      </div>
    </div>

    <!-- Archive/Delete Modal -->
    <div v-if="showArchiveModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click="showArchiveModal = false">
      <div class="rounded-xl border bg-card p-6 w-full max-w-sm text-center" @click.stop>
        <div class="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
          <RotateCcw class="h-6 w-6 text-amber-600" />
        </div>
        <h2 class="text-lg font-semibold mb-2">
          {{ project.status === 'completed' ? 'Archive Project?' : 'Delete Project?' }}
        </h2>
        <p class="text-sm text-muted-foreground mb-6">
          <span v-if="project.status === 'completed'">
            This will move "{{ project.name }}" to archives. You can restore it later.
          </span>
          <span v-else>
            This will permanently delete "{{ project.name }}" and all associated data.
          </span>
        </p>
        <div class="flex gap-2 justify-center">
          <Button variant="outline" @click="showArchiveModal = false">Cancel</Button>
          <Button :variant="project.status === 'completed' ? 'default' : 'destructive'" @click="showArchiveModal = false">
            {{ project.status === 'completed' ? 'Archive' : 'Delete' }}
          </Button>
        </div>
      </div>
    </div>

    <!-- Launch Modal -->
    <div v-if="showLaunchModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click="showLaunchModal = false">
      <div class="rounded-xl border bg-card p-6 w-full max-w-md text-center" @click.stop>
        <div class="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <Play class="h-6 w-6 text-green-600" />
        </div>
        <h2 class="text-lg font-semibold mb-2">
          {{ project.status === 'draft' ? 'Start Project?' : 'Launch Campaign?' }}
        </h2>
        <p class="text-sm text-muted-foreground mb-6">
          <span v-if="project.status === 'draft'">
            This will activate "{{ project.name }}" and start the first agent in the workflow.
          </span>
          <span v-else>
            This will publish "{{ project.name }}" to all configured channels immediately.
          </span>
        </p>
        <div class="bg-muted rounded-lg p-3 mb-6 text-left">
          <p class="text-sm font-medium mb-1">Actions that will be triggered:</p>
          <ul class="text-sm text-muted-foreground space-y-1">
            <li v-for="step in workflowSteps.filter(s => s.status === 'pending').slice(0, 3)" :key="step.id">
              • {{ step.agent }}
            </li>
            <li v-if="workflowSteps.filter(s => s.status === 'pending').length > 3" class="text-xs">
              ...and {{ workflowSteps.filter(s => s.status === 'pending').length - 3 }} more
            </li>
          </ul>
        </div>
        <div class="flex gap-2 justify-center">
          <Button variant="outline" @click="showLaunchModal = false">Cancel</Button>
          <Button class="gap-2" @click="showLaunchModal = false">
            <Play class="h-4 w-4" />
            {{ project.status === 'draft' ? 'Start Project' : 'Launch Now' }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
