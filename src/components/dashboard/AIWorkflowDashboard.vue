<script setup lang="ts">
import { ref, computed } from 'vue';
import Badge from '@/components/ui/Badge.vue';
import { 
  Clock,
  Bot,
  ChevronRight,
  TrendingUp,
  BarChart3,
  Target,
  CheckCircle2,
  ArrowRight,
  ArrowDown,
  CornerDownRight,
  CornerUpRight,
  RotateCcw
} from 'lucide-vue-next';

// Animation state
const activeAgent = ref(0);
const animationSpeed = 2000; // ms between agent activations

// Start animation demo
const startDemo = () => {
  activeAgent.value = 1;
  const interval = setInterval(() => {
    activeAgent.value++;
    if (activeAgent.value > 9) {
      clearInterval(interval);
      setTimeout(() => {
        activeAgent.value = 0;
      }, 2000);
    }
  }, animationSpeed);
};

// Phase configuration
const phases = ref([
  {
    id: 1,
    name: 'Phase 1: Étude de Marché',
    agent: 'Agent IA Etude marché',
    frequency: '2-5 ans',
    color: 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200',
    iconColor: 'text-fuchsia-600',
    headerBg: 'bg-fuchsia-50/50',
    description: 'Analyse macro, demande, offre, micro et SWOT synthétique',
    steps: [
      { name: 'Analyse Macro', output: 'Tendances du marché' },
      { name: 'Analyse de la demande', output: 'Besoins clients' },
      { name: 'Analyse de l\'offre', output: 'Concurrents' },
      { name: 'Analyse micro', output: 'Marché cible' },
      { name: 'SWOT synthétique', output: 'Matrice SWOT' }
    ],
    outputs: ['Pertinence du projet', 'SWOT Analysis'],
    decision: 'GO / NO-GO'
  },
  {
    id: 2,
    name: 'Phase 2: Stratégie & Planification',
    agent: 'Agent IA Stratégie & SCP',
    frequency: '90 jours',
    color: 'bg-orange-100 text-orange-700 border-orange-200',
    iconColor: 'text-orange-600',
    headerBg: 'bg-orange-50/50',
    description: 'Segmentation, ciblage, positionnement, 4P/7P et plan d\'action',
    steps: [
      { name: 'Segmentation', output: 'Persona' },
      { name: 'Ciblage & Positionnement', output: 'Schéma de vente' },
      { name: '4P / 7P Marketing', output: 'Mix marketing' },
      { name: 'Plan d\'action Marketing', output: 'Stratégie' },
      { name: 'Calendrier Planning 90 jours', output: 'Calendrier éditorial' }
    ],
    outputs: ['Persona', 'Schéma de vente', '4P/7P', 'Plan d\'action', 'Calendrier 90j']
  },
  {
    id: 3,
    name: 'Phase 3: Exécution & Performance',
    agent: 'Multi-Agent Orchestration',
    frequency: 'Quotidien',
    color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    iconColor: 'text-emerald-600',
    headerBg: 'bg-emerald-50/50',
    description: '4 agents opérationnels → Diffusion → Performance & Décision',
    subAgents: [
      { name: 'Agent IA Ads Manager', color: 'bg-blue-100 text-blue-700' },
      { name: 'Agent IA Création contenu multimédia', color: 'bg-blue-100 text-blue-700' },
      { name: 'Agent IA Email Marketing', color: 'bg-blue-100 text-blue-700' },
      { name: 'Agent IA community manager', color: 'bg-blue-100 text-blue-700' },
      { name: 'Agent IA Diffusion & Publishing', color: 'bg-emerald-100 text-emerald-700' },
      { name: 'Agent IA Performance & Décision', color: 'bg-fuchsia-100 text-fuchsia-700' }
    ],
    outputs: ['Contenu publié', 'Métriques de performance', 'Auto-optimisation']
  }
]);

const expandedPhases = ref<number[]>([1, 2, 3]);

const togglePhase = (phaseId: number) => {
  const index = expandedPhases.value.indexOf(phaseId);
  if (index > -1) {
    expandedPhases.value.splice(index, 1);
  } else {
    expandedPhases.value.push(phaseId);
  }
};
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-semibold text-slate-900">Workflow IA Global</h2>
        <p class="text-sm text-slate-500">Orchestration en 3 phases avec points de validation</p>
      </div>
      <button 
        @click="startDemo"
        class="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2"
      >
        <RotateCcw class="w-4 h-4" />
        Démonstration du flux
      </button>
    </div>

    <!-- Clean Flow Diagram -->
    <div class="rounded-xl border border-slate-200 bg-white shadow-sm p-8">
      <div class="text-center mb-6">
        <h3 class="text-lg font-semibold text-blue-700">Marketing Operating System</h3>
      </div>

      <!-- Flow Container -->
      <div class="relative">
        
        <!-- Row 1: Input → Strategic Chain -->
        <div class="flex items-center justify-center gap-4 mb-8">
          <!-- Input Box -->
          <div 
            class="w-48 p-4 rounded-lg border-2 border-slate-300 bg-white text-center transition-all duration-500"
            :class="{ 'ring-4 ring-emerald-400 ring-opacity-50': activeAgent === 0 }"
          >
            <div class="text-xs font-semibold text-slate-700 mb-2">Input</div>
            <div class="text-[10px] text-slate-500 leading-tight">
              formulation d'objectif /<br>besoin / budget /<br>cible en tête
            </div>
            <div class="mt-2 text-[10px] text-slate-400">Cahier de charge</div>
          </div>

          <!-- Arrow -->
          <ArrowRight class="w-6 h-6 text-slate-400" />

          <!-- Agent 1: Etude Marché -->
          <div 
            class="w-40 p-3 rounded-lg border-2 border-fuchsia-400 bg-fuchsia-50 text-center transition-all duration-500"
            :class="{ 
              'ring-4 ring-fuchsia-400 ring-opacity-50 scale-105': activeAgent === 1,
              'opacity-50': activeAgent > 0 && activeAgent !== 1
            }"
          >
            <div class="text-[10px] font-medium text-slate-700 mb-1">Agent IA Etude marché</div>
            <div class="flex justify-center">
              <div class="w-10 h-10 rounded-lg bg-fuchsia-200 flex items-center justify-center">
                <Bot class="w-6 h-6 text-fuchsia-700" />
              </div>
            </div>
          </div>

          <!-- Arrow -->
          <ArrowRight class="w-6 h-6 text-slate-400" />

          <!-- Agent 2: Stratégie -->
          <div 
            class="w-40 p-3 rounded-lg border-2 border-fuchsia-400 bg-fuchsia-50 text-center transition-all duration-500"
            :class="{ 
              'ring-4 ring-fuchsia-400 ring-opacity-50 scale-105': activeAgent === 2,
              'opacity-50': activeAgent > 0 && activeAgent !== 2
            }"
          >
            <div class="text-[10px] font-medium text-slate-700 mb-1">Agent IA Stratégie & SCP</div>
            <div class="flex justify-center">
              <div class="w-10 h-10 rounded-lg bg-fuchsia-200 flex items-center justify-center">
                <Bot class="w-6 h-6 text-fuchsia-700" />
              </div>
            </div>
          </div>

          <!-- Arrow -->
          <ArrowRight class="w-6 h-6 text-slate-400" />

          <!-- Agent 3: Concepteur -->
          <div 
            class="w-44 p-3 rounded-lg border-2 border-fuchsia-400 bg-fuchsia-50 text-center transition-all duration-500"
            :class="{ 
              'ring-4 ring-fuchsia-400 ring-opacity-50 scale-105': activeAgent === 3,
              'opacity-50': activeAgent > 0 && activeAgent !== 3
            }"
          >
            <div class="text-[10px] font-medium text-slate-700 mb-1">Agent IA concepteur opérationnel et orchestrateur éditorial</div>
            <div class="flex justify-center">
              <div class="w-10 h-10 rounded-lg bg-fuchsia-200 flex items-center justify-center">
                <Bot class="w-6 h-6 text-fuchsia-700" />
              </div>
            </div>
          </div>
        </div>

        <!-- Split to 4 Operational Agents -->
        <div class="flex justify-center mb-4">
          <div class="relative">
            <ArrowDown class="w-6 h-6 text-slate-400" />
          </div>
        </div>

        <!-- Row 2: 4 Parallel Operational Agents -->
        <div class="flex items-start justify-center gap-4 mb-8">
          <!-- Vertical connectors from split -->
          <div class="absolute left-1/2 -translate-x-1/2 top-0 flex gap-16">
            <div class="w-px h-6 bg-slate-300"></div>
          </div>

          <!-- Agent 4: Ads Manager -->
          <div 
            class="w-36 p-3 rounded-lg border-2 border-blue-400 bg-blue-50 text-center transition-all duration-500"
            :class="{ 
              'ring-4 ring-blue-400 ring-opacity-50 scale-105': activeAgent === 4,
              'opacity-50': activeAgent > 0 && activeAgent !== 4
            }"
          >
            <div class="text-[10px] font-medium text-slate-700 mb-1">Agent IA Ads Manager</div>
            <div class="flex justify-center">
              <div class="w-10 h-10 rounded-lg bg-blue-200 flex items-center justify-center">
                <Bot class="w-6 h-6 text-blue-700" />
              </div>
            </div>
          </div>

          <!-- Agent 5: Création contenu -->
          <div 
            class="w-36 p-3 rounded-lg border-2 border-blue-400 bg-blue-50 text-center transition-all duration-500"
            :class="{ 
              'ring-4 ring-blue-400 ring-opacity-50 scale-105': activeAgent === 5,
              'opacity-50': activeAgent > 0 && activeAgent !== 5
            }"
          >
            <div class="text-[10px] font-medium text-slate-700 mb-1">Agent IA Création de contenu multimédia</div>
            <div class="flex justify-center">
              <div class="w-10 h-10 rounded-lg bg-blue-200 flex items-center justify-center">
                <Bot class="w-6 h-6 text-blue-700" />
              </div>
            </div>
          </div>

          <!-- Agent 6: Email Marketing -->
          <div 
            class="w-36 p-3 rounded-lg border-2 border-blue-400 bg-blue-50 text-center transition-all duration-500"
            :class="{ 
              'ring-4 ring-blue-400 ring-opacity-50 scale-105': activeAgent === 6,
              'opacity-50': activeAgent > 0 && activeAgent !== 6
            }"
          >
            <div class="text-[10px] font-medium text-slate-700 mb-1">Agent IA Email Marketing</div>
            <div class="flex justify-center">
              <div class="w-10 h-10 rounded-lg bg-blue-200 flex items-center justify-center">
                <Bot class="w-6 h-6 text-blue-700" />
              </div>
            </div>
          </div>

          <!-- Agent 7: Community Manager -->
          <div 
            class="w-36 p-3 rounded-lg border-2 border-blue-400 bg-blue-50 text-center transition-all duration-500"
            :class="{ 
              'ring-4 ring-blue-400 ring-opacity-50 scale-105': activeAgent === 7,
              'opacity-50': activeAgent > 0 && activeAgent !== 7
            }"
          >
            <div class="text-[10px] font-medium text-slate-700 mb-1">Agent IA community manager</div>
            <div class="flex justify-center">
              <div class="w-10 h-10 rounded-lg bg-blue-200 flex items-center justify-center">
                <Bot class="w-6 h-6 text-blue-700" />
              </div>
            </div>
          </div>
        </div>

        <!-- Converge to Diffusion -->
        <div class="flex justify-center mb-4">
          <div class="grid grid-cols-4 gap-16 w-full max-w-3xl">
            <div class="flex justify-center"><ArrowDown class="w-6 h-6 text-slate-400" /></div>
            <div class="flex justify-center"><ArrowDown class="w-6 h-6 text-slate-400" /></div>
            <div class="flex justify-center"><ArrowDown class="w-6 h-6 text-slate-400" /></div>
            <div class="flex justify-center"><ArrowDown class="w-6 h-6 text-slate-400" /></div>
          </div>
        </div>

        <!-- Row 3: Diffusion & Performance -->
        <div class="flex items-center justify-center gap-8">
          <!-- Agent 8: Diffusion -->
          <div 
            class="w-44 p-4 rounded-lg border-2 border-emerald-400 bg-emerald-50 text-center transition-all duration-500"
            :class="{ 
              'ring-4 ring-emerald-400 ring-opacity-50 scale-105': activeAgent === 8,
              'opacity-50': activeAgent > 0 && activeAgent !== 8
            }"
          >
            <div class="text-xs font-medium text-slate-700 mb-2">Agent IA Diffusion & Publishing</div>
            <div class="flex justify-center">
              <div class="w-12 h-12 rounded-lg bg-emerald-200 flex items-center justify-center">
                <Bot class="w-7 h-7 text-emerald-700" />
              </div>
            </div>
          </div>

          <!-- Arrow -->
          <ArrowRight class="w-8 h-8 text-slate-400" />

          <!-- Agent 9: Performance -->
          <div 
            class="w-44 p-4 rounded-lg border-2 border-fuchsia-400 bg-fuchsia-50 text-center transition-all duration-500"
            :class="{ 
              'ring-4 ring-fuchsia-400 ring-opacity-50 scale-105': activeAgent === 9,
              'opacity-50': activeAgent > 0 && activeAgent !== 9 && activeAgent !== 0
            }"
          >
            <div class="text-xs font-medium text-slate-700 mb-2">Agent IA Performance & Décision</div>
            <div class="flex justify-center">
              <div class="w-12 h-12 rounded-lg bg-fuchsia-200 flex items-center justify-center">
                <Bot class="w-7 h-7 text-fuchsia-700" />
              </div>
            </div>
          </div>
        </div>

        <!-- Feedback Loop Arrow -->
        <div class="absolute right-4 top-1/2 -translate-y-1/2">
          <svg width="100" height="200" class="text-slate-300">
            <path 
              d="M 80 100 Q 50 0, 10 50" 
              fill="none" 
              stroke="currentColor" 
              stroke-width="2"
              stroke-dasharray="5,5"
              class="transition-all duration-1000"
              :class="{ 'text-emerald-500': activeAgent === 9 }"
            />
            <polygon 
              points="10,50 15,45 15,55" 
              fill="currentColor"
              class="transition-all duration-1000"
              :class="{ 'text-emerald-500': activeAgent === 9 }"
            />
          </svg>
        </div>
        <div class="absolute right-0 top-1/4 text-[10px] text-slate-400 -rotate-12">
          Rectification auto
        </div>

      </div>

      <!-- Legend -->
      <div class="mt-8 flex items-center justify-center gap-6 text-xs">
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 rounded bg-fuchsia-200 border border-fuchsia-400"></div>
          <span class="text-slate-600">Stratégique (2-5 ans / 90 jours)</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 rounded bg-blue-200 border border-blue-400"></div>
          <span class="text-slate-600">Opérationnel (Quotidien)</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 rounded bg-emerald-200 border border-emerald-400"></div>
          <span class="text-slate-600">Diffusion (Quotidien)</span>
        </div>
      </div>
    </div>

    <!-- Phases Detail -->
    <div class="grid gap-4">
      <div 
        v-for="phase in phases" 
        :key="phase.id"
        class="rounded-xl border border-slate-200 bg-white shadow-sm"
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
              class="flex items-center justify-between p-3 rounded-lg border bg-slate-50 border-slate-200"
            >
              <div class="flex items-center gap-3">
                <div class="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-medium">
                  {{ index + 1 }}
                </div>
                <span class="text-sm font-medium text-slate-700">
                  {{ step.name }}
                </span>
                <Badge v-if="phase.id === 1 && index === 4" variant="secondary" class="text-xs">
                  <Target class="w-3 h-3 mr-1" />
                  {{ phase.decision }}
                </Badge>
              </div>
              <Badge variant="outline" class="text-xs">
                <CheckCircle2 class="w-3 h-3 mr-1" />
                {{ step.output }}
              </Badge>
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
