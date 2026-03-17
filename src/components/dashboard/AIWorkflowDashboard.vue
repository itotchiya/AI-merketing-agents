<script setup lang="ts">
import { ref, computed } from 'vue';
import Badge from '@/components/ui/Badge.vue';
import Button from '@/components/ui/Button.vue';
import { 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Clock,
  Bot,
  ChevronRight,
  ArrowRight,
  TrendingUp,
  BarChart3,
  Target
} from 'lucide-vue-next';

// New agent schema per image
interface AgentFlow {
  id: number;
  name: string;
  type: 'strategic' | 'operational' | 'diffusion';
  inputs?: string[];
  outputs?: string[];
  nextAgents?: number[];
}

const agentFlows: AgentFlow[] = [
  {
    id: 1,
    name: 'Agent IA Etude marché',
    type: 'strategic',
    inputs: ['Formulation d\'objectif', 'Besoin', 'Budget', 'Cible'],
    outputs: ['Pertinence du projet', 'SWOT'],
    nextAgents: [2]
  },
  {
    id: 2,
    name: 'Agent IA Stratégie & SCP',
    type: 'strategic',
    inputs: ['SWOT Data'],
    outputs: ['Persona', 'Schéma de vente', '4P/7P', 'Plan d\'action'],
    nextAgents: [3]
  },
  {
    id: 3,
    name: 'Agent IA concepteur opérationnel et orchestrateur éditorial',
    type: 'strategic',
    inputs: ['Plan d\'action'],
    outputs: ['Calendrier planning 90 days'],
    nextAgents: [4, 5, 6, 7]
  },
  {
    id: 4,
    name: 'Agent IA Ads Manager',
    type: 'operational',
    inputs: ['Calendrier planning'],
    outputs: ['Campagnes Live'],
    nextAgents: [8]
  },
  {
    id: 5,
    name: 'Agent IA Création de contenu multimédia',
    type: 'operational',
    inputs: ['Calendrier planning'],
    outputs: ['Contenu multimédia'],
    nextAgents: [8]
  },
  {
    id: 6,
    name: 'Agent IA Email Marketing',
    type: 'operational',
    inputs: ['Calendrier planning'],
    outputs: ['Emails & Séquences'],
    nextAgents: [8]
  },
  {
    id: 7,
    name: 'Agent IA community manager',
    type: 'operational',
    inputs: ['Calendrier planning'],
    outputs: ['Posts & Engagement'],
    nextAgents: [8]
  },
  {
    id: 8,
    name: 'Agent IA Diffusion & Publishing',
    type: 'diffusion',
    inputs: ['Contenu des 4 agents'],
    outputs: ['Contenu publié'],
    nextAgents: [9]
  },
  {
    id: 9,
    name: 'Agent IA Performance & Décision',
    type: 'strategic',
    inputs: ['Données de publication'],
    outputs: ['Performance', 'Décisions', 'Rectification'],
    nextAgents: []
  }
];

// Phase configuration
const phases = ref([
  {
    id: 1,
    name: 'Phase 1: Market Study',
    shortName: 'Market Study',
    agent: 'Agent IA Etude marché',
    frequency: '2-5 years',
    color: 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200',
    iconColor: 'text-fuchsia-600',
    headerBg: 'bg-fuchsia-50/50',
    status: 'completed' as const,
    description: 'Analyse macro, demande, offre, micro et SWOT synthétique',
    steps: [
      { name: 'Analyse Macro', status: 'completed' },
      { name: 'Analyse de la demande', status: 'completed' },
      { name: 'Analyse de l\'offre', status: 'completed' },
      { name: 'Analyse micro', status: 'completed' },
      { name: 'SWOT synthétique', status: 'completed' }
    ],
    outputs: ['Pertinence du projet', 'SWOT Analysis'],
    decision: { type: 'GO / NO-GO', status: 'GO' }
  },
  {
    id: 2,
    name: 'Phase 2: Strategy & Planning',
    shortName: 'Strategy & Planning',
    agent: 'Agent IA Stratégie & SCP + Agent IA concepteur opérationnel',
    frequency: '90 days',
    color: 'bg-orange-100 text-orange-700 border-orange-200',
    iconColor: 'text-orange-600',
    headerBg: 'bg-orange-50/50',
    status: 'active' as const,
    description: 'Segmentation, ciblage, positionnement, 4P/7P et plan d\'action',
    steps: [
      { name: 'Segmentation', status: 'completed', approvalPoint: true, output: 'Persona' },
      { name: 'Ciblage & Positionnement', status: 'completed', output: 'Schéma de vente' },
      { name: '4P / 7P Marketing', status: 'completed' },
      { name: 'Plan d\'action Marketing', status: 'active', approvalPoint: true },
      { name: 'Calendrier Planning 90 days', status: 'active', output: 'Calendrier éditorial' }
    ],
    outputs: ['Persona', 'Schéma de vente', '4P/7P', 'Plan d\'action', 'Calendrier 90 days']
  },
  {
    id: 3,
    name: 'Phase 3: Execution & Performance',
    shortName: 'Daily Execution',
    agent: 'Multi-Agent Orchestration',
    frequency: 'Daily',
    color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    iconColor: 'text-emerald-600',
    headerBg: 'bg-emerald-50/50',
    status: 'pending' as const,
    description: '4 agents opérationnels → Diffusion → Performance & Décision',
    subAgents: [
      { name: 'Agent IA Ads Manager', status: 'pending', color: 'bg-blue-100 text-blue-700' },
      { name: 'Agent IA Création contenu multimédia', status: 'pending', color: 'bg-blue-100 text-blue-700' },
      { name: 'Agent IA Email Marketing', status: 'pending', color: 'bg-blue-100 text-blue-700' },
      { name: 'Agent IA community manager', status: 'pending', color: 'bg-blue-100 text-blue-700' },
      { name: 'Agent IA Diffusion & Publishing', status: 'pending', color: 'bg-emerald-100 text-emerald-700' },
      { name: 'Agent IA Performance & Décision', status: 'pending', color: 'bg-fuchsia-100 text-fuchsia-700' }
    ],
    outputs: ['Contenu publié', 'Performance metrics', 'Auto-optimization']
  }
]);

const expandedPhases = ref<number[]>([2]);
const selectedAgent = ref<AgentFlow | null>(null);

const togglePhase = (phaseId: number) => {
  const index = expandedPhases.value.indexOf(phaseId);
  if (index > -1) {
    expandedPhases.value.splice(index, 1);
  } else {
    expandedPhases.value.push(phaseId);
  }
};

const selectAgent = (agent: AgentFlow) => {
  selectedAgent.value = selectedAgent.value?.id === agent.id ? null : agent;
};

const getCategoryColor = (type: string) => {
  switch (type) {
    case 'strategic': return 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200';
    case 'operational': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'diffusion': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const getCategoryBadge = (type: string) => {
  switch (type) {
    case 'strategic': return 'Stratégique';
    case 'operational': return 'Opérationnel';
    case 'diffusion': return 'Diffusion';
    default: return type;
  }
};

const pendingApprovals = computed(() => {
  return phases.value.reduce((count, phase) => {
    if (phase.steps) {
      return count + phase.steps.filter(s => s.status === 'active' && s.approvalPoint).length;
    }
    return count;
  }, 0);
});
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-semibold text-slate-900">Global AI Workflow</h2>
        <p class="text-sm text-slate-500">3-phase execution with real-time orchestration</p>
      </div>
      <div class="flex items-center gap-3">
        <Button variant="outline" size="sm" class="gap-2">
          <RefreshCw class="w-4 h-4" />
          Refresh Status
        </Button>
        <Badge v-if="pendingApprovals > 0" variant="destructive" class="gap-1">
          <AlertCircle class="w-3 h-3" />
          {{ pendingApprovals }} Pending Approvals
        </Badge>
      </div>
    </div>

    <!-- Agent Flow Diagram -->
    <div class="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div class="p-6">
        <div class="flex items-center gap-2 mb-2">
          <TrendingUp class="w-5 h-5 text-emerald-600" />
          <h3 class="text-base font-semibold">Agent Flow & Orchestration</h3>
        </div>
        <p class="text-sm text-slate-500 mb-6">
          Input → Strategic Agents → Operational Agents → Diffusion → Performance
        </p>
        
        <!-- Flow Visualization -->
        <div class="flex flex-col gap-4">
          <!-- Row 1: Strategic Input -->
          <div class="flex items-center gap-3 flex-wrap">
            <div class="px-4 py-2 bg-slate-100 rounded-lg border border-slate-200 text-sm font-medium text-slate-700">
              Input
            </div>
            <ArrowRight class="w-4 h-4 text-slate-400" />
            <div 
              v-for="agent in agentFlows.filter(a => a.id === 1)" 
              :key="agent.id"
              @click="selectAgent(agent)"
              :class="[
                'px-4 py-2 rounded-lg border text-sm font-medium cursor-pointer transition-all hover:shadow-md',
                getCategoryColor(agent.type),
                selectedAgent?.id === agent.id ? 'ring-2 ring-offset-2 ring-fuchsia-400' : ''
              ]"
            >
              {{ agent.name }}
            </div>
          </div>

          <!-- Row 2: Strategy Chain -->
          <div class="flex items-center gap-3 flex-wrap pl-4 md:pl-16">
            <ArrowRight class="w-4 h-4 text-slate-400" />
            <div 
              v-for="agent in agentFlows.filter(a => a.id === 2 || a.id === 3)" 
              :key="agent.id"
              @click="selectAgent(agent)"
              :class="[
                'px-4 py-2 rounded-lg border text-sm font-medium cursor-pointer transition-all hover:shadow-md',
                getCategoryColor(agent.type),
                selectedAgent?.id === agent.id ? 'ring-2 ring-offset-2 ring-fuchsia-400' : ''
              ]"
            >
              {{ agent.name.replace('Agent IA ', '') }}
            </div>
          </div>

          <!-- Row 3: Operational Agents (4 parallel) -->
          <div class="flex items-center gap-3 flex-wrap pl-4 md:pl-32">
            <ArrowRight class="w-4 h-4 text-slate-400" />
            <div class="flex flex-wrap gap-2">
              <div 
                v-for="agent in agentFlows.filter(a => a.id >= 4 && a.id <= 7)" 
                :key="agent.id"
                @click="selectAgent(agent)"
                :class="[
                  'px-3 py-2 rounded-lg border text-xs font-medium cursor-pointer transition-all hover:shadow-md text-center max-w-[140px]',
                  getCategoryColor(agent.type),
                  selectedAgent?.id === agent.id ? 'ring-2 ring-offset-2 ring-blue-400' : ''
                ]"
              >
                {{ agent.name.replace('Agent IA ', '').replace('Création de ', '').replace('community', 'Community') }}
              </div>
            </div>
          </div>

          <!-- Row 4: Diffusion & Performance -->
          <div class="flex items-center gap-3 flex-wrap pl-4 md:pl-32">
            <ArrowRight class="w-4 h-4 text-slate-400" />
            <div 
              v-for="agent in agentFlows.filter(a => a.id === 8)" 
              :key="agent.id"
              @click="selectAgent(agent)"
              :class="[
                'px-4 py-2 rounded-lg border text-sm font-medium cursor-pointer transition-all hover:shadow-md',
                getCategoryColor(agent.type),
                selectedAgent?.id === agent.id ? 'ring-2 ring-offset-2 ring-green-400' : ''
              ]"
            >
              {{ agent.name.replace('Agent IA ', '') }}
            </div>
            <ArrowRight class="w-4 h-4 text-slate-400" />
            <div 
              v-for="agent in agentFlows.filter(a => a.id === 9)" 
              :key="agent.id"
              @click="selectAgent(agent)"
              :class="[
                'px-4 py-2 rounded-lg border text-sm font-medium cursor-pointer transition-all hover:shadow-md',
                getCategoryColor(agent.type),
                selectedAgent?.id === agent.id ? 'ring-2 ring-offset-2 ring-fuchsia-400' : ''
              ]"
            >
              {{ agent.name.replace('Agent IA ', '') }}
            </div>
          </div>
        </div>

        <!-- Selected Agent Details -->
        <div v-if="selectedAgent" class="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <div class="flex items-start justify-between mb-3">
            <div>
              <h4 class="font-semibold text-slate-900">{{ selectedAgent.name }}</h4>
              <Badge :class="getCategoryColor(selectedAgent.type)" class="mt-1 text-xs">
                {{ getCategoryBadge(selectedAgent.type) }}
              </Badge>
            </div>
            <Button variant="ghost" size="sm" @click="selectedAgent = null">×</Button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span class="text-slate-500">Inputs:</span>
              <div class="flex flex-wrap gap-1 mt-1">
                <span v-for="input in selectedAgent.inputs" :key="input" class="px-2 py-0.5 bg-white rounded text-slate-700 border border-slate-200 text-xs">
                  {{ input }}
                </span>
              </div>
            </div>
            <div>
              <span class="text-slate-500">Outputs:</span>
              <div class="flex flex-wrap gap-1 mt-1">
                <span v-for="output in selectedAgent.outputs" :key="output" class="px-2 py-0.5 bg-white rounded text-slate-700 border border-slate-200 text-xs">
                  {{ output }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Phases -->
    <div class="grid gap-4">
      <div 
        v-for="phase in phases" 
        :key="phase.id"
        :class="[
          'rounded-xl border border-slate-200 bg-white shadow-sm transition-all',
          phase.status === 'active' ? 'ring-1 ring-emerald-300 ring-offset-1' : ''
        ]"
      >
        <div 
          class="cursor-pointer p-4"
          :class="phase.headerBg"
          @click="togglePhase(phase.id)"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <Badge :class="phase.color">
                <Bot class="w-3 h-3 mr-1" />
                {{ phase.shortName }}
              </Badge>
              <div>
                <h3 class="font-semibold text-base">{{ phase.name }}</h3>
                <p class="text-sm text-slate-500 mt-0.5">{{ phase.agent }}</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <Badge variant="outline" class="text-xs">
                <Clock class="w-3 h-3 mr-1" />
                {{ phase.frequency }}
              </Badge>
              <ChevronRight 
                class="w-5 h-5 text-slate-400 transition-transform"
                :class="expandedPhases.includes(phase.id) ? 'rotate-90' : ''"
              />
            </div>
          </div>
        </div>
        
        <div v-if="expandedPhases.includes(phase.id)" class="p-6 pt-0">
          <p class="text-sm text-slate-600 mb-4">{{ phase.description }}</p>
          
          <!-- Phase 1 & 2: Steps List -->
          <div v-if="phase.steps" class="space-y-2">
            <div 
              v-for="(step, index) in phase.steps" 
              :key="index"
              class="flex items-center justify-between p-3 rounded-lg border"
              :class="step.status === 'completed' ? 'bg-slate-50 border-slate-200' : 
                      step.status === 'active' ? 'bg-emerald-50/50 border-emerald-200' : 
                      'bg-white border-slate-200'"
            >
              <div class="flex items-center gap-3">
                <div 
                  class="w-6 h-6 rounded-full flex items-center justify-center text-xs"
                  :class="step.status === 'completed' ? 'bg-emerald-500 text-white' : 
                          step.status === 'active' ? 'bg-emerald-500 text-white animate-pulse' : 
                          'bg-slate-200 text-slate-500'"
                >
                  <CheckCircle2 v-if="step.status === 'completed'" class="w-4 h-4" />
                  <Clock v-else-if="step.status === 'active'" class="w-4 h-4" />
                  <span v-else>{{ index + 1 }}</span>
                </div>
                <span 
                  class="text-sm font-medium"
                  :class="step.status === 'completed' ? 'text-slate-700 line-through' : 
                          step.status === 'active' ? 'text-emerald-700' : 
                          'text-slate-600'"
                >
                  {{ step.name }}
                </span>
                <Badge v-if="step.approvalPoint" variant="secondary" class="text-xs">
                  <AlertCircle class="w-3 h-3 mr-1" />
                  Approval Required
                </Badge>
                <Badge v-if="step.output" variant="outline" class="text-xs">
                  <Target class="w-3 h-3 mr-1" />
                  {{ step.output }}
                </Badge>
              </div>
              <div class="flex items-center gap-2">
                <Button 
                  v-if="step.status === 'active' && step.approvalPoint"
                  size="sm" 
                  variant="default"
                  class="h-8 gap-1 bg-emerald-600 hover:bg-emerald-700"
                >
                  <CheckCircle2 class="w-3 h-3" />
                  Approve
                </Button>
              </div>
            </div>
          </div>

          <!-- Phase 3: Multi-Agent Grid -->
          <div v-else-if="phase.subAgents" class="space-y-4">
            <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div 
                v-for="subAgent in phase.subAgents" 
                :key="subAgent.name"
                class="p-3 rounded-lg border flex items-center gap-2"
                :class="subAgent.color"
              >
                <Bot class="w-4 h-4" />
                <span class="text-sm font-medium">{{ subAgent.name.replace('Agent IA ', '') }}</span>
                <span class="text-xs opacity-70">{{ subAgent.status }}</span>
              </div>
            </div>
            <div class="flex items-center gap-2 p-3 bg-fuchsia-50 rounded-lg border border-fuchsia-200">
              <BarChart3 class="w-5 h-5 text-fuchsia-600" />
              <span class="text-sm text-fuchsia-700 font-medium">Performance & Décision:</span>
              <span class="text-sm text-fuchsia-600">Rectification automatique basée sur les KPIs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
