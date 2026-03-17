<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { getProjectWorkflow, type ProjectWorkflow, type WorkflowPhase, type WorkflowStep, type SubAgent } from '@/data/projectWorkflows';
import Button from '@/components/ui/Button.vue';
import Badge from '@/components/ui/Badge.vue';
import Progress from '@/components/ui/Progress.vue';
import { 
  Play, Pause, RotateCcw, CheckCircle, Clock, AlertCircle,
  ChevronDown, ChevronRight, Zap, BarChart3,
  Users, Target, TrendingUp, Lock
} from 'lucide-vue-next';

const props = defineProps<{
  projectId: number;
}>();

// Get project-specific workflow
const workflow = computed(() => getProjectWorkflow(props.projectId));

// Reactive state for UI interactions
const expandedPhase = ref<number | null>(null);
const currentTime = ref(new Date());
const autoRefresh = ref(true);
let refreshInterval: number | null = null;

// Modal state
const showApprovalModal = ref(false);
const currentApproval = ref<{ phaseId: number; stepId: string; stepName: string; output: string } | null>(null);

// Toggle phase expansion
const togglePhase = (phaseId: number) => {
  expandedPhase.value = expandedPhase.value === phaseId ? null : phaseId;
};

// Get status color class
const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-green-500 text-white';
    case 'in_progress': return 'bg-primary text-primary-foreground';
    case 'running': return 'bg-green-500 text-white animate-pulse';
    case 'waiting_approval': return 'bg-blue-500 text-white';
    case 'failed': return 'bg-red-500 text-white';
    case 'pending': return 'bg-muted text-muted-foreground';
    case 'locked': return 'bg-gray-300 text-gray-600';
    case 'idle': return 'bg-gray-200 text-gray-500';
    default: return 'bg-muted text-muted-foreground';
  }
};

// Get phase status badge variant
const getPhaseStatusVariant = (status: string) => {
  switch (status) {
    case 'completed': return 'secondary';
    case 'active': return 'default';
    case 'running': return 'default';
    case 'pending': return 'outline';
    case 'locked': return 'secondary';
    default: return 'outline';
  }
};

// Approval handling
const openApprovalModal = (phaseId: number, step: WorkflowStep) => {
  currentApproval.value = {
    phaseId,
    stepId: step.id,
    stepName: step.name,
    output: step.output || ''
  };
  showApprovalModal.value = true;
};

const handleApprove = () => {
  if (!currentApproval.value) return;
  
  const phase = workflow.value.phases.find(p => p.id === currentApproval.value?.phaseId);
  if (phase) {
    const step = phase.steps.find(s => s.id === currentApproval.value?.stepId);
    if (step) {
      step.status = 'completed';
      step.approvedBy = 'Current User';
      step.approvalTime = new Date().toLocaleString();
      
      // Update phase progress
      updatePhaseProgress(phase);
      
      // Check if all steps in phase are complete
      checkPhaseCompletion(phase);
    }
  }
  
  showApprovalModal.value = false;
  currentApproval.value = null;
};

const handleReject = () => {
  if (!currentApproval.value) return;
  
  const phase = workflow.value.phases.find(p => p.id === currentApproval.value?.phaseId);
  if (phase) {
    const step = phase.steps.find(s => s.id === currentApproval.value?.stepId);
    if (step) {
      step.status = 'failed';
    }
  }
  
  showApprovalModal.value = false;
  currentApproval.value = null;
};

const updatePhaseProgress = (phase: WorkflowPhase) => {
  const totalSteps = phase.steps.length;
  const completedSteps = phase.steps.filter(s => s.status === 'completed').length;
  phase.progress = Math.round((completedSteps / totalSteps) * 100);
};

const checkPhaseCompletion = (phase: WorkflowPhase) => {
  const allCompleted = phase.steps.every(s => s.status === 'completed');
  if (allCompleted) {
    phase.status = 'completed';
    
    // Unlock next phase
    const nextPhase = workflow.value.phases.find(p => p.id === phase.id + 1);
    if (nextPhase && nextPhase.status === 'locked') {
      nextPhase.status = 'pending';
    }
  }
};

// Check if phase has waiting approvals
const hasWaitingApproval = (phase: WorkflowPhase) => {
  return phase.steps.some(s => s.status === 'waiting_approval');
};

// Get waiting approval count for phase
const getWaitingApprovalCount = (phase: WorkflowPhase) => {
  return phase.steps.filter(s => s.status === 'waiting_approval').length;
};

// Simulate real-time updates for running phases
const simulateUpdates = () => {
  workflow.value.phases.forEach(phase => {
    if (phase.status === 'running' && phase.subAgents) {
      phase.subAgents.forEach(agent => {
        if (Math.random() > 0.8) {
          agent.status = agent.status === 'running' ? 'completed' : 'running';
          agent.lastRun = 'Just now';
        }
      });
    }
  });
};

// Timer setup
onMounted(() => {
  // Expand current phase by default
  const currentPhase = workflow.value.phases.find(p => 
    p.status === 'active' || p.status === 'running'
  );
  if (currentPhase) {
    expandedPhase.value = currentPhase.id;
  }
  
  if (autoRefresh.value) {
    refreshInterval = window.setInterval(() => {
      currentTime.value = new Date();
      simulateUpdates();
    }, 5000);
  }
});

onUnmounted(() => {
  if (refreshInterval) {
    clearInterval(refreshInterval);
  }
});

// Computed overall stats
const overallProgress = computed(() => {
  const totalProgress = workflow.value.phases.reduce((acc, p) => acc + p.progress, 0);
  return Math.round(totalProgress / workflow.value.phases.length);
});

const completedPhases = computed(() => workflow.value.phases.filter(p => p.status === 'completed').length);
const activePhases = computed(() => workflow.value.phases.filter(p => p.status === 'active' || p.status === 'running').length);
const waitingApprovals = computed(() => {
  return workflow.value.phases.reduce((count, phase) => {
    return count + phase.steps.filter(s => s.status === 'waiting_approval').length;
  }, 0);
});
</script>

<template>
  <div class="space-y-6">
    <!-- Header Stats -->
    <div class="grid grid-cols-4 gap-4">
      <div class="rounded-xl border bg-card p-4">
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <TrendingUp class="h-5 w-5 text-primary" />
          </div>
          <div>
            <p class="text-sm text-muted-foreground">Overall Progress</p>
            <p class="text-2xl font-bold">{{ overallProgress }}%</p>
          </div>
        </div>
      </div>
      <div class="rounded-xl border bg-card p-4">
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
            <CheckCircle class="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p class="text-sm text-muted-foreground">Completed Phases</p>
            <p class="text-2xl font-bold">{{ completedPhases }}/{{ workflow.phases.length }}</p>
          </div>
        </div>
      </div>
      <div class="rounded-xl border bg-card p-4">
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <Users class="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p class="text-sm text-muted-foreground">Pending Approvals</p>
            <p class="text-2xl font-bold">{{ waitingApprovals }}</p>
          </div>
        </div>
      </div>
      <div class="rounded-xl border bg-card p-4">
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center">
            <Clock class="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <p class="text-sm text-muted-foreground">Current Phase</p>
            <p class="text-2xl font-bold">{{ workflow.currentPhase }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Waiting Approvals Alert -->
    <div v-if="waitingApprovals > 0" class="rounded-xl border-2 border-blue-300 bg-blue-50 p-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
            <AlertCircle class="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 class="font-semibold text-blue-900">Approval Required</h3>
            <p class="text-sm text-blue-700">
              {{ waitingApprovals }} workflow step(s) waiting for your approval
            </p>
          </div>
        </div>
        <Button class="bg-blue-600 hover:bg-blue-700 gap-2" @click="expandedPhase = workflow.currentPhase">
          <Users class="h-4 w-4" />
          Review Now
        </Button>
      </div>
    </div>

    <!-- Phase Timeline -->
    <div class="relative">
      <!-- Timeline Line -->
      <div class="absolute left-6 top-0 bottom-0 w-0.5 bg-border"></div>

      <!-- Phases -->
      <div class="space-y-6">
        <div v-for="phase in workflow.phases" :key="phase.id" class="relative pl-16">
          <!-- Timeline Dot -->
          <div :class="[
            'absolute left-3 top-4 h-6 w-6 rounded-full border-4 flex items-center justify-center z-10',
            phase.status === 'completed' ? 'bg-green-500 border-green-500' :
            phase.status === 'active' || phase.status === 'running' ? 'bg-primary border-primary' :
            phase.status === 'locked' ? 'bg-gray-300 border-gray-300' :
            'bg-muted border-muted-foreground'
          ]">
            <CheckCircle v-if="phase.status === 'completed'" class="h-3 w-3 text-white" />
            <Play v-else-if="phase.status === 'active' || phase.status === 'running'" class="h-3 w-3 text-white" />
            <Lock v-else-if="phase.status === 'locked'" class="h-3 w-3 text-gray-600" />
          </div>

          <!-- Phase Card -->
          <div class="rounded-xl border overflow-hidden" :class="phase.color">
            <!-- Phase Header -->
            <button 
              @click="togglePhase(phase.id)"
              class="w-full p-4 flex items-center justify-between hover:opacity-90 transition-opacity"
            >
              <div class="flex items-center gap-4">
                <div :class="['h-12 w-12 rounded-xl flex items-center justify-center text-white', phase.headerColor]">
                  <component 
                    :is="phase.icon === 'BarChart3' ? BarChart3 : phase.icon === 'Target' ? Target : Zap" 
                    class="h-6 w-6" 
                  />
                </div>
                <div class="text-left">
                  <div class="flex items-center gap-2">
                    <h3 class="font-semibold text-lg">{{ phase.name }}</h3>
                    <Badge v-if="hasWaitingApproval(phase)" variant="default" class="bg-blue-600">
                      <Users class="h-3 w-3 mr-1" />
                      {{ getWaitingApprovalCount(phase) }} Approval
                    </Badge>
                  </div>
                  <p class="text-sm text-muted-foreground">{{ phase.subtitle }} • {{ phase.agent }}</p>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <Badge :variant="getPhaseStatusVariant(phase.status)" class="capitalize">
                  {{ phase.status.replace('_', ' ') }}
                </Badge>
                <div class="text-right">
                  <p class="text-sm font-medium">{{ phase.frequency }}</p>
                  <p class="text-xs text-muted-foreground" v-if="phase.status !== 'locked'">
                    {{ phase.status === 'completed' ? `Completed ${phase.lastRun}` : `Next: ${phase.nextRun}` }}
                  </p>
                </div>
                <component :is="expandedPhase === phase.id ? ChevronDown : ChevronRight" class="h-5 w-5 text-muted-foreground" />
              </div>
            </button>

            <!-- Phase Details -->
            <div v-if="expandedPhase === phase.id" class="p-4 bg-white border-t">
              <!-- Progress Bar -->
              <div class="mb-4">
                <div class="flex items-center justify-between text-sm mb-1">
                  <span class="text-muted-foreground">Phase Progress</span>
                  <span class="font-medium">{{ phase.progress }}%</span>
                </div>
                <Progress :value="phase.progress" class="h-2" />
              </div>

              <!-- Phase 1 & 2: Linear Steps -->
              <div v-if="phase.id !== 3" class="space-y-3">
                <div v-for="(step, index) in phase.steps" :key="step.id" class="relative flex gap-4">
                  <!-- Step Connector -->
                  <div v-if="index < phase.steps.length - 1" class="absolute left-5 top-10 bottom-0 w-0.5 bg-border"></div>
                  
                  <!-- Step Indicator -->
                  <div :class="[
                    'relative z-10 h-10 w-10 rounded-full flex items-center justify-center shrink-0',
                    getStatusColor(step.status)
                  ]">
                    <CheckCircle v-if="step.status === 'completed'" class="h-5 w-5" />
                    <AlertCircle v-else-if="step.status === 'waiting_approval'" class="h-5 w-5" />
                    <Play v-else-if="step.status === 'in_progress'" class="h-5 w-5" />
                    <Clock v-else class="h-5 w-5" />
                  </div>

                  <!-- Step Content -->
                  <div class="flex-1 pb-4">
                    <div :class="[
                      'rounded-lg border p-3',
                      step.status === 'waiting_approval' ? 'border-blue-300 bg-blue-50' : 
                      step.approvalPoint && step.status === 'completed' ? 'border-green-300 bg-green-50' :
                      'bg-card'
                    ]">
                      <div class="flex items-start justify-between">
                        <div class="flex-1">
                          <div class="flex items-center gap-2 mb-1">
                            <span class="font-medium">{{ step.name }}</span>
                            <Badge v-if="step.approvalPoint" :variant="step.status === 'waiting_approval' ? 'default' : 'secondary'" class="text-xs">
                              <Users class="h-3 w-3 mr-1" />
                              {{ step.status === 'waiting_approval' ? 'Needs Approval' : 'Approved' }}
                            </Badge>
                          </div>
                          <p class="text-sm text-muted-foreground">
                            Duration: {{ step.duration }}
                            <span v-if="step.output" class="text-primary">→ {{ step.output }}</span>
                          </p>
                          <p v-if="step.approvedBy" class="text-xs text-green-600 mt-1">
                            ✓ Approved by {{ step.approvedBy }} on {{ step.approvalTime }}
                          </p>
                          <div v-if="step.status === 'in_progress' && step.progress" class="mt-2">
                            <Progress :value="step.progress" class="h-1.5" />
                            <p class="text-xs text-muted-foreground mt-1">{{ step.progress }}% complete</p>
                          </div>
                        </div>
                        <div class="flex flex-col items-end gap-2">
                          <Badge :variant="step.status === 'completed' ? 'secondary' : step.status === 'in_progress' ? 'default' : step.status === 'waiting_approval' ? 'default' : 'outline'" class="capitalize text-xs">
                            {{ step.status.replace('_', ' ') }}
                          </Badge>
                          <Button 
                            v-if="step.status === 'waiting_approval'" 
                            size="sm" 
                            class="gap-1 bg-blue-600 hover:bg-blue-700"
                            @click="openApprovalModal(phase.id, step)"
                          >
                            <Users class="h-3 w-3" />
                            Review
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Go/No Go Decision -->
                <div v-if="phase.decision" class="mt-4 p-4 rounded-lg border-2" :class="phase.decision.status === 'go' ? 'border-green-300 bg-green-50' : phase.decision.status === 'no_go' ? 'border-red-300 bg-red-50' : 'border-amber-300 bg-amber-50'">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <div :class="['h-10 w-10 rounded-full flex items-center justify-center', phase.decision.status === 'go' ? 'bg-green-500' : phase.decision.status === 'no_go' ? 'bg-red-500' : 'bg-amber-500']">
                        <CheckCircle v-if="phase.decision.status === 'go'" class="h-5 w-5 text-white" />
                        <AlertCircle v-else class="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p class="font-semibold">{{ phase.decision.label }}</p>
                        <p class="text-sm text-muted-foreground">{{ phase.decision.type === 'go_no_go' ? 'Phase completion decision' : 'Workflow milestone' }}</p>
                      </div>
                    </div>
                    <Badge v-if="phase.decision.status === 'go'" variant="secondary" class="bg-green-100 text-green-700">
                      ✓ Approved
                    </Badge>
                  </div>
                </div>
              </div>

              <!-- Phase 3: Multi-Agent Execution -->
              <div v-else class="space-y-4">
                <div class="text-sm text-muted-foreground mb-2">Autonomous Multi-Agent Execution</div>
                
                <!-- Sub-Agents Grid -->
                <div class="grid grid-cols-2 gap-3">
                  <div v-for="agent in phase.subAgents" :key="agent.name" class="rounded-lg border p-3 bg-card">
                    <div class="flex items-center gap-2 mb-2">
                      <div :class="['h-2 w-2 rounded-full', agent.status === 'running' ? 'bg-green-500 animate-pulse' : agent.status === 'completed' ? 'bg-green-500' : 'bg-gray-400']"></div>
                      <span class="font-medium text-sm">{{ agent.name }}</span>
                    </div>
                    <p class="text-xs text-muted-foreground">{{ agent.task }}</p>
                    <p class="text-xs text-blue-600 mt-1">→ {{ agent.output }}</p>
                    <p v-if="agent.lastRun" class="text-xs text-muted-foreground mt-1">
                      Last: {{ agent.lastRun }}
                    </p>
                  </div>
                </div>

                <!-- Daily Workflow Steps -->
                <div class="rounded-lg border p-3 bg-muted/30">
                  <div class="flex items-center justify-between mb-2">
                    <span class="font-medium text-sm">Daily Execution Cycle</span>
                    <Badge variant="outline" class="text-xs">
                      <Clock class="h-3 w-3 mr-1" />
                      {{ currentTime.toLocaleTimeString() }}
                    </Badge>
                  </div>
                  <div class="flex flex-wrap gap-2">
                    <Badge v-for="step in phase.steps" :key="step.id" :variant="step.status === 'running' ? 'default' : step.status === 'completed' ? 'secondary' : 'outline'" class="text-xs">
                      {{ step.name }}
                    </Badge>
                  </div>
                </div>

                <!-- Feedback Loop -->
                <div v-if="phase.feedbackLoop" class="flex items-center justify-center p-3 rounded-lg border-2 border-purple-300 bg-purple-50">
                  <div class="flex items-center gap-2 text-purple-800">
                    <RotateCcw class="h-4 w-4" :style="{ animation: 'spin 3s linear infinite' }" />
                    <span class="font-medium text-sm">{{ phase.feedbackLoop }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Approval Modal -->
    <div v-if="showApprovalModal && currentApproval" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click="showApprovalModal = false">
      <div class="rounded-xl border bg-card p-6 w-full max-w-md" @click.stop>
        <div class="flex items-center gap-3 mb-4">
          <div class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
            <Users class="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h2 class="text-lg font-semibold">Approve Workflow Step</h2>
            <p class="text-sm text-muted-foreground">{{ currentApproval.stepName }}</p>
          </div>
        </div>
        
        <div class="bg-muted rounded-lg p-3 mb-4">
          <p class="text-sm font-medium mb-1">Agent Output:</p>
          <p class="text-sm">{{ currentApproval.output }}</p>
        </div>

        <div class="space-y-3 mb-4">
          <label class="text-sm font-medium">Approval Notes (Optional)</label>
          <textarea class="w-full px-3 py-2 rounded-lg border bg-background h-20" placeholder="Add any comments or feedback..."></textarea>
        </div>

        <div class="flex gap-2">
          <Button variant="outline" class="flex-1" @click="handleReject">
            <RotateCcw class="h-4 w-4 mr-2" />
            Request Changes
          </Button>
          <Button class="flex-1 bg-blue-600 hover:bg-blue-700" @click="handleApprove">
            <CheckCircle class="h-4 w-4 mr-2" />
            Approve
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
