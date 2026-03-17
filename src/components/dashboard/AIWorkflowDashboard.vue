<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import Button from '@/components/ui/Button.vue';
import Badge from '@/components/ui/Badge.vue';
import Progress from '@/components/ui/Progress.vue';
import { 
  Play, Pause, RotateCcw, CheckCircle, Clock, AlertCircle,
  ChevronDown, ChevronRight, Zap, BarChart3,
  Users, Target, TrendingUp
} from 'lucide-vue-next';

// Workflow phases with timing configuration
const phases = ref([
  {
    id: 1,
    name: 'Phase 1: Market Intelligence',
    subtitle: 'Strategic Foundation',
    agent: 'Agent IA Étude Marché',
    frequency: '2-5 years',
    frequencyType: 'long_term',
    color: 'bg-pink-100 border-pink-300',
    headerColor: 'bg-pink-500',
    icon: BarChart3,
    status: 'completed',
    lastRun: '2023-06-15',
    nextRun: '2028-06-15',
    progress: 100,
    steps: [
      { id: 'p1s1', name: 'Analyse Macro', status: 'completed', duration: '2h' },
      { id: 'p1s2', name: 'Analyse de la demande', status: 'completed', duration: '3h' },
      { id: 'p1s3', name: 'Analyse de l\'offre', status: 'completed', duration: '2h' },
      { id: 'p1s4', name: 'Analyse micro', status: 'completed', duration: '4h' },
      { id: 'p1s5', name: 'SWOT Synthétique', status: 'completed', duration: '1h', approvalPoint: true, output: 'Pertinence du projet' },
    ],
    decision: { type: 'go_no_go', status: 'go', label: 'GO - Project Validated' }
  },
  {
    id: 2,
    name: 'Phase 2: Strategy & Planning',
    subtitle: 'Quarterly Review',
    agent: 'Agent IA Stratégie',
    frequency: '90 days',
    frequencyType: 'quarterly',
    color: 'bg-orange-100 border-orange-300',
    headerColor: 'bg-orange-500',
    icon: Target,
    status: 'active',
    lastRun: '2024-01-01',
    nextRun: '2024-04-01',
    progress: 75,
    steps: [
      { id: 'p2s1', name: 'Segmentation', status: 'completed', duration: '4h', approvalPoint: true, output: 'Persona' },
      { id: 'p2s2', name: 'Ciblage & Positionnement', status: 'completed', duration: '3h' },
      { id: 'p2s3', name: '4P / 7P', status: 'in_progress', duration: '2h', progress: 60 },
      { id: 'p2s4', name: 'Plan d\'action Marketing', status: 'pending', duration: '3h', approvalPoint: true, output: 'Schéma de vente' },
    ],
    decision: { type: 'ongoing', status: 'pending', label: 'In Progress' }
  },
  {
    id: 3,
    name: 'Phase 3: Daily Execution',
    subtitle: 'Autonomous Operations',
    agent: 'Multi-Agent Orchestration',
    frequency: 'Daily',
    frequencyType: 'daily',
    color: 'bg-green-100 border-green-300',
    headerColor: 'bg-green-500',
    icon: Zap,
    status: 'running',
    lastRun: 'Today 06:00',
    nextRun: 'Tomorrow 06:00',
    progress: 45,
    subAgents: [
      {
        name: 'Orchestrateur Éditorial',
        status: 'running',
        task: 'Calendar Planning',
        output: 'Calendrier planning'
      },
      {
        name: 'Advertising (Ads)',
        status: 'running',
        task: 'Campaign Strategy → Setup',
        output: 'Calendrier éditorial'
      },
      {
        name: 'Studio Créatif',
        status: 'running',
        task: 'Content Creation',
        output: 'Création de contenu'
      },
      {
        name: 'Community Management',
        status: 'running',
        task: 'Organic Community',
        output: 'Calendrier éditorial'
      }
    ],
    steps: [
      { id: 'p3s1', name: 'Calendar Planning', status: 'running', duration: 'Continuous', approvalPoint: true },
      { id: 'p3s2', name: 'Content Creation', status: 'running', duration: 'Daily' },
      { id: 'p3s3', name: 'Campaign Execution', status: 'running', duration: 'Daily' },
      { id: 'p3s4', name: 'Distribution', status: 'pending', duration: 'Scheduled' },
      { id: 'p3s5', name: 'Reporting & Control', status: 'pending', duration: 'Real-time', feedback: true },
    ],
    feedbackLoop: 'Rectification automatique'
  }
]);

// Active approvals (blue checkpoints)
const pendingApprovals = ref([
  {
    id: 'app-1',
    phase: 'Phase 2',
    step: 'Plan d\'action Marketing',
    type: 'validation',
    priority: 'high',
    waitingTime: '2 hours',
    description: 'Quarterly marketing action plan ready for review'
  }
]);

// UI State
const expandedPhase = ref<number | null>(2);
const activeTab = ref('overview');
const autoRefresh = ref(true);
let refreshInterval: number | null = null;

// Clock for daily operations
const currentTime = ref(new Date());

// Toggle phase expansion
const togglePhase = (phaseId: number) => {
  expandedPhase.value = expandedPhase.value === phaseId ? null : phaseId;
};

// Handle approvals
const handleApproval = (approvalId: string, decision: 'approve' | 'reject') => {
  const index = pendingApprovals.value.findIndex(a => a.id === approvalId);
  if (index > -1) {
    pendingApprovals.value.splice(index, 1);
    // Update phase progress
    const phase = phases.value.find(p => p.id === 2);
    if (phase) {
      phase.steps[3].status = decision === 'approve' ? 'completed' : 'failed';
    }
  }
};

// Simulate real-time updates for Phase 3
const simulatePhase3Updates = () => {
  const phase3 = phases.value.find(p => p.id === 3);
  if (phase3 && phase3.subAgents) {
    phase3.subAgents.forEach(agent => {
      // Randomly update agent status
      if (Math.random() > 0.7) {
        agent.status = Math.random() > 0.3 ? 'running' : 'completed';
      }
    });
  }
};

// Timer for auto-refresh
onMounted(() => {
  if (autoRefresh.value) {
    refreshInterval = window.setInterval(() => {
      currentTime.value = new Date();
      simulatePhase3Updates();
    }, 5000);
  }
});

onUnmounted(() => {
  if (refreshInterval) {
    clearInterval(refreshInterval);
  }
});

// Computed
const completedPhases = computed(() => phases.value.filter(p => p.status === 'completed').length);
const activePhases = computed(() => phases.value.filter(p => p.status === 'active' || p.status === 'running').length);
const totalProgress = computed(() => Math.round(phases.value.reduce((acc, p) => acc + p.progress, 0) / phases.value.length));
</script>

<template>
  <div class="space-y-6">
    <!-- Header Stats -->
    <div class="grid grid-cols-4 gap-4">
      <div class="rounded-xl border bg-card p-4">
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 rounded-lg bg-pink-100 flex items-center justify-center">
            <BarChart3 class="h-5 w-5 text-pink-600" />
          </div>
          <div>
            <p class="text-sm text-muted-foreground">Phase 1</p>
            <p class="text-lg font-semibold">Completed</p>
            <p class="text-xs text-muted-foreground">Every 2-5 years</p>
          </div>
        </div>
      </div>
      <div class="rounded-xl border bg-card p-4">
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center">
            <Target class="h-5 w-5 text-orange-600" />
          </div>
          <div>
            <p class="text-sm text-muted-foreground">Phase 2</p>
            <p class="text-lg font-semibold">Active</p>
            <p class="text-xs text-muted-foreground">Every 90 days</p>
          </div>
        </div>
      </div>
      <div class="rounded-xl border bg-card p-4">
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
            <Zap class="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p class="text-sm text-muted-foreground">Phase 3</p>
            <p class="text-lg font-semibold">Running</p>
            <p class="text-xs text-muted-foreground">Daily execution</p>
          </div>
        </div>
      </div>
      <div class="rounded-xl border bg-card p-4">
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <Clock class="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p class="text-sm text-muted-foreground">Next Run</p>
            <p class="text-lg font-semibold">6h 30m</p>
            <p class="text-xs text-muted-foreground">Phase 3 cycle</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Pending Approvals Alert -->
    <div v-if="pendingApprovals.length > 0" class="rounded-xl border-2 border-blue-300 bg-blue-50 p-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
            <AlertCircle class="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 class="font-semibold text-blue-900">Approval Required</h3>
            <p class="text-sm text-blue-700">
              {{ pendingApprovals[0].phase }}: {{ pendingApprovals[0].step }} - waiting {{ pendingApprovals[0].waitingTime }}
            </p>
          </div>
        </div>
        <div class="flex gap-2">
          <Button variant="outline" class="gap-2" @click="handleApproval(pendingApprovals[0].id, 'reject')">
            <RotateCcw class="h-4 w-4" />
            Request Changes
          </Button>
          <Button class="gap-2 bg-blue-600 hover:bg-blue-700" @click="handleApproval(pendingApprovals[0].id, 'approve')">
            <CheckCircle class="h-4 w-4" />
            Approve & Continue
          </Button>
        </div>
      </div>
    </div>

    <!-- Workflow Visualization -->
    <div class="space-y-4">
      <h2 class="text-lg font-semibold flex items-center gap-2">
        <TrendingUp class="h-5 w-5" />
        AI Process Workflow
      </h2>

      <!-- Phase Cards -->
      <div v-for="phase in phases" :key="phase.id" class="rounded-xl border overflow-hidden">
        <!-- Phase Header -->
        <button 
          @click="togglePhase(phase.id)"
          :class="['w-full p-4 flex items-center justify-between transition-colors', phase.color]"
        >
          <div class="flex items-center gap-4">
            <div :class="['h-12 w-12 rounded-xl flex items-center justify-center text-white', phase.headerColor]">
              <component :is="phase.icon" class="h-6 w-6" />
            </div>
            <div class="text-left">
              <h3 class="font-semibold text-lg">{{ phase.name }}</h3>
              <p class="text-sm text-muted-foreground">{{ phase.subtitle }} • {{ phase.agent }}</p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <Badge :variant="phase.status === 'completed' ? 'secondary' : phase.status === 'running' ? 'default' : 'outline'" class="capitalize">
              {{ phase.status }}
            </Badge>
            <div class="text-right">
              <p class="text-sm font-medium">{{ phase.frequency }}</p>
              <p class="text-xs text-muted-foreground">
                <span v-if="phase.frequencyType === 'long_term'">Last: {{ phase.lastRun }}</span>
                <span v-else-if="phase.frequencyType === 'quarterly'">Next: {{ phase.nextRun }}</span>
                <span v-else>{{ phase.lastRun }}</span>
              </p>
            </div>
            <component :is="expandedPhase === phase.id ? ChevronDown : ChevronRight" class="h-5 w-5 text-muted-foreground" />
          </div>
        </button>

        <!-- Phase Details -->
        <div v-if="expandedPhase === phase.id" class="p-4 bg-white border-t">
          <!-- Phase 1 & 2: Linear Steps -->
          <div v-if="phase.id !== 3" class="space-y-4">
            <div class="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span>Workflow Steps</span>
              <span>Progress: {{ phase.progress }}%</span>
            </div>
            <div class="relative">
              <!-- Progress Line -->
              <div class="absolute left-6 top-8 bottom-8 w-0.5 bg-border"></div>
              
              <!-- Steps -->
              <div class="space-y-6">
                <div v-for="(step, index) in phase.steps" :key="step.id" class="relative flex gap-4">
                  <!-- Step Indicator -->
                  <div :class="[
                    'relative z-10 h-12 w-12 rounded-full flex items-center justify-center shrink-0 border-2',
                    step.status === 'completed' ? 'bg-green-500 border-green-500 text-white' :
                    step.status === 'in_progress' ? 'bg-primary border-primary text-primary-foreground animate-pulse' :
                    step.status === 'failed' ? 'bg-red-500 border-red-500 text-white' :
                    'bg-muted border-muted-foreground text-muted-foreground'
                  ]">
                    <CheckCircle v-if="step.status === 'completed'" class="h-5 w-5" />
                    <Play v-else-if="step.status === 'in_progress'" class="h-5 w-5" />
                    <AlertCircle v-else-if="step.status === 'failed'" class="h-5 w-5" />
                    <span v-else class="text-sm font-medium">{{ index + 1 }}</span>
                  </div>

                  <!-- Step Content -->
                  <div class="flex-1 pb-4">
                    <div :class="['rounded-lg border p-3', step.approvalPoint ? 'border-blue-300 bg-blue-50/50' : 'bg-card']">
                      <div class="flex items-start justify-between">
                        <div>
                          <div class="flex items-center gap-2">
                            <span class="font-medium">{{ step.name }}</span>
                            <!-- Approval Point Badge -->
                            <Badge v-if="step.approvalPoint" variant="default" class="bg-blue-600 text-xs">
                              <Users class="h-3 w-3 mr-1" />
                              Approval Point
                            </Badge>
                          </div>
                          <p class="text-sm text-muted-foreground mt-1">
                            Duration: {{ step.duration }}
                            <span v-if="step.output" class="text-blue-600">→ Output: {{ step.output }}</span>
                          </p>
                          <!-- Progress Bar for In Progress -->
                          <div v-if="step.status === 'in_progress' && step.progress" class="mt-2">
                            <Progress :value="step.progress" class="h-1.5" />
                            <p class="text-xs text-muted-foreground mt-1">{{ step.progress }}% complete</p>
                          </div>
                        </div>
                        <Badge :variant="step.status === 'completed' ? 'secondary' : step.status === 'in_progress' ? 'default' : 'outline'" class="capitalize text-xs">
                          {{ step.status.replace('_', ' ') }}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Go/No Go Decision -->
            <div v-if="phase.decision" class="mt-4 p-4 rounded-lg border-2" :class="phase.decision.status === 'go' ? 'border-green-300 bg-green-50' : 'border-amber-300 bg-amber-50'">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div :class="['h-10 w-10 rounded-full flex items-center justify-center', phase.decision.status === 'go' ? 'bg-green-500' : 'bg-amber-500']">
                    <CheckCircle v-if="phase.decision.status === 'go'" class="h-5 w-5 text-white" />
                    <AlertCircle v-else class="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p class="font-semibold">Decision Gate: {{ phase.decision.label }}</p>
                    <p class="text-sm text-muted-foreground">{{ phase.decision.type === 'go_no_go' ? 'Project continuation decision' : 'Phase completion status' }}</p>
                  </div>
                </div>
                <Button v-if="phase.decision.status === 'pending'" size="sm" class="gap-2">
                  <Play class="h-4 w-4" />
                  Make Decision
                </Button>
              </div>
            </div>
          </div>

          <!-- Phase 3: Multi-Agent Parallel Execution -->
          <div v-else class="space-y-4">
            <div class="text-sm text-muted-foreground mb-2">Autonomous Multi-Agent Execution</div>
            
            <!-- Sub-Agents Grid -->
            <div class="grid grid-cols-2 gap-3 mb-4">
              <div v-for="agent in phase.subAgents" :key="agent.name" class="rounded-lg border p-3 bg-card">
                <div class="flex items-center gap-2 mb-2">
                  <div :class="['h-2 w-2 rounded-full', agent.status === 'running' ? 'bg-green-500 animate-pulse' : 'bg-blue-500']"></div>
                  <span class="font-medium text-sm">{{ agent.name }}</span>
                </div>
                <p class="text-xs text-muted-foreground">{{ agent.task }}</p>
                <p class="text-xs text-blue-600 mt-1">→ {{ agent.output }}</p>
              </div>
            </div>

            <!-- Daily Workflow Steps -->
            <div class="rounded-lg border p-4 bg-muted/30">
              <div class="flex items-center justify-between mb-3">
                <span class="font-medium">Daily Execution Cycle</span>
                <Badge variant="outline" class="text-xs">
                  <Clock class="h-3 w-3 mr-1" />
                  Auto-refresh: {{ currentTime.toLocaleTimeString() }}
                </Badge>
              </div>
              <div class="flex items-center gap-2 overflow-x-auto pb-2">
                <div v-for="(step, index) in phase.steps" :key="step.id" class="flex items-center gap-2 shrink-0">
                  <div :class="[
                    'px-3 py-2 rounded-lg border text-sm min-w-[120px] text-center',
                    step.status === 'running' ? 'bg-green-100 border-green-300 text-green-800' :
                    step.status === 'completed' ? 'bg-secondary text-secondary-foreground' :
                    'bg-muted text-muted-foreground'
                  ]">
                    <div class="font-medium">{{ step.name }}</div>
                    <div v-if="step.approvalPoint" class="text-xs text-blue-600 mt-1">
                      <Users class="h-3 w-3 inline mr-1" />
                      Approval
                    </div>
                    <div v-if="step.feedback" class="text-xs text-purple-600 mt-1">
                      <RotateCcw class="h-3 w-3 inline mr-1" />
                      Feedback Loop
                    </div>
                  </div>
                  <ChevronRight v-if="index < phase.steps.length - 1" class="h-4 w-4 text-muted-foreground shrink-0" />
                </div>
              </div>
            </div>

            <!-- Feedback Loop Indicator -->
            <div v-if="phase.feedbackLoop" class="flex items-center justify-center p-3 rounded-lg border-2 border-purple-300 bg-purple-50">
              <div class="flex items-center gap-2 text-purple-800">
                <RotateCcw class="h-5 w-5 animate-spin" style="animation-duration: 3s;" />
                <span class="font-medium">{{ phase.feedbackLoop }}</span>
                <span class="text-sm">- Continuous optimization based on performance data</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Legend -->
    <div class="rounded-xl border bg-card p-4">
      <h3 class="font-medium mb-3">Workflow Legend</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
        <div class="flex items-center gap-2">
          <div class="h-4 w-4 rounded-full bg-green-500"></div>
          <span>Completed</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="h-4 w-4 rounded-full bg-primary animate-pulse"></div>
          <span>In Progress</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="h-4 w-4 rounded-full bg-blue-600"></div>
          <span>Approval Point</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="h-4 w-4 rounded bg-pink-100 border border-pink-300"></div>
          <span>2-5 Year Cycle</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="h-4 w-4 rounded bg-orange-100 border border-orange-300"></div>
          <span>90-Day Cycle</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="h-4 w-4 rounded bg-green-100 border border-green-300"></div>
          <span>Daily Cycle</span>
        </div>
        <div class="flex items-center gap-2">
          <RotateCcw class="h-4 w-4 text-purple-600" />
          <span>Auto-Feedback Loop</span>
        </div>
      </div>
    </div>
  </div>
</template>
