// Project-specific AI Workflow configurations
// Each project has its own instance of the 3-phase workflow

export interface WorkflowStep {
  id: string;
  name: string;
  status: 'completed' | 'in_progress' | 'pending' | 'failed' | 'waiting_approval';
  duration: string;
  startTime?: string;
  endTime?: string;
  progress?: number;
  approvalPoint?: boolean;
  output?: string;
  approvedBy?: string;
  approvalTime?: string;
}

export interface SubAgent {
  name: string;
  status: 'running' | 'completed' | 'pending' | 'idle';
  task: string;
  output: string;
  lastRun?: string;
  nextRun?: string;
}

export interface WorkflowPhase {
  id: number;
  name: string;
  subtitle: string;
  agent: string;
  frequency: string;
  frequencyType: 'long_term' | 'quarterly' | 'daily';
  status: 'completed' | 'active' | 'running' | 'pending' | 'locked';
  color: string;
  headerColor: string;
  icon: string;
  lastRun?: string;
  nextRun?: string;
  progress: number;
  steps: WorkflowStep[];
  subAgents?: SubAgent[];
  decision?: {
    type: 'go_no_go' | 'completion';
    status: 'go' | 'no_go' | 'pending';
    label: string;
  };
  feedbackLoop?: string;
}

export interface ProjectWorkflow {
  projectId: number;
  phases: WorkflowPhase[];
  currentPhase: number;
  overallProgress: number;
}

// Project 1: Summer Launch 2026 - Active in Phase 2
export const summerLaunchWorkflow: ProjectWorkflow = {
  projectId: 1,
  currentPhase: 2,
  overallProgress: 68,
  phases: [
    {
      id: 1,
      name: 'Phase 1: Market Intelligence',
      subtitle: 'Strategic Foundation',
      agent: 'Agent IA Étude Marché',
      frequency: '2-5 years',
      frequencyType: 'long_term',
      status: 'completed',
      color: 'bg-pink-100 border-pink-300',
      headerColor: 'bg-pink-500',
      icon: 'BarChart3',
      lastRun: '2023-08-15',
      nextRun: '2028-08-15',
      progress: 100,
      steps: [
        { id: 'p1s1', name: 'Analyse Macro', status: 'completed', duration: '2h', startTime: '2023-08-15 09:00', endTime: '2023-08-15 11:00' },
        { id: 'p1s2', name: 'Analyse de la demande', status: 'completed', duration: '3h', startTime: '2023-08-15 11:30', endTime: '2023-08-15 14:30' },
        { id: 'p1s3', name: 'Analyse de l\'offre', status: 'completed', duration: '2h', startTime: '2023-08-15 15:00', endTime: '2023-08-15 17:00' },
        { id: 'p1s4', name: 'Analyse micro', status: 'completed', duration: '4h', startTime: '2023-08-16 09:00', endTime: '2023-08-16 13:00' },
        { 
          id: 'p1s5', 
          name: 'SWOT Synthétique', 
          status: 'completed', 
          duration: '1h', 
          startTime: '2023-08-16 14:00',
          endTime: '2023-08-16 15:00',
          approvalPoint: true, 
          output: 'Pertinence du projet: GO',
          approvedBy: 'Thomas Dubois',
          approvalTime: '2023-08-16 16:00'
        },
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
      status: 'active',
      color: 'bg-orange-100 border-orange-300',
      headerColor: 'bg-orange-500',
      icon: 'Target',
      lastRun: '2024-03-01',
      nextRun: '2024-06-01',
      progress: 75,
      steps: [
        { 
          id: 'p2s1', 
          name: 'Segmentation', 
          status: 'completed', 
          duration: '4h', 
          startTime: '2024-03-01 09:00',
          endTime: '2024-03-01 13:00',
          approvalPoint: true, 
          output: 'Persona: 25-34 Urban Professionals',
          approvedBy: 'Marie Laurent',
          approvalTime: '2024-03-01 14:30'
        },
        { id: 'p2s2', name: 'Ciblage & Positionnement', status: 'completed', duration: '3h', startTime: '2024-03-01 15:00', endTime: '2024-03-01 18:00' },
        { 
          id: 'p2s3', 
          name: '4P / 7P Marketing Mix', 
          status: 'in_progress', 
          duration: '6h', 
          startTime: '2024-03-11 09:00',
          progress: 75 
        },
        { 
          id: 'p2s4', 
          name: 'Plan d\'action Marketing', 
          status: 'waiting_approval', 
          duration: '3h',
          approvalPoint: true, 
          output: 'Schéma de vente Q2 2024'
        },
      ],
      decision: { type: 'completion', status: 'pending', label: 'Awaiting Approval' }
    },
    {
      id: 3,
      name: 'Phase 3: Daily Execution',
      subtitle: 'Autonomous Operations',
      agent: 'Multi-Agent Orchestration',
      frequency: 'Daily',
      frequencyType: 'daily',
      status: 'pending',
      color: 'bg-green-100 border-green-300',
      headerColor: 'bg-green-500',
      icon: 'Zap',
      progress: 0,
      subAgents: [
        { name: 'Orchestrateur Éditorial', status: 'pending', task: 'Calendar Planning', output: 'Calendrier planning' },
        { name: 'Agent IA Advertising', status: 'pending', task: 'Campaign Strategy', output: 'Calendrier éditorial' },
        { name: 'Studio Créatif', status: 'pending', task: 'Content Creation', output: 'Création de contenu' },
        { name: 'Community Manager', status: 'pending', task: 'Organic Community', output: 'Engagement' },
      ],
      steps: [
        { id: 'p3s1', name: 'Calendar Planning', status: 'pending', duration: 'Daily', approvalPoint: true },
        { id: 'p3s2', name: 'Content Creation', status: 'pending', duration: 'Daily' },
        { id: 'p3s3', name: 'Campaign Execution', status: 'pending', duration: 'Daily' },
        { id: 'p3s4', name: 'Distribution', status: 'pending', duration: 'Scheduled' },
        { id: 'p3s5', name: 'Reporting & Control', status: 'pending', duration: 'Real-time', feedback: true },
      ],
      feedbackLoop: 'Rectification automatique'
    }
  ]
};

// Project 2: Product Beta - In Phase 3 (Daily Execution)
export const productBetaWorkflow: ProjectWorkflow = {
  projectId: 2,
  currentPhase: 3,
  overallProgress: 82,
  phases: [
    {
      id: 1,
      name: 'Phase 1: Market Intelligence',
      subtitle: 'Strategic Foundation',
      agent: 'Agent IA Étude Marché',
      frequency: '2-5 years',
      frequencyType: 'long_term',
      status: 'completed',
      color: 'bg-pink-100 border-pink-300',
      headerColor: 'bg-pink-500',
      icon: 'BarChart3',
      lastRun: '2023-11-01',
      progress: 100,
      steps: [
        { id: 'p1s1', name: 'Analyse Macro', status: 'completed', duration: '2h' },
        { id: 'p1s2', name: 'Analyse de la demande', status: 'completed', duration: '3h' },
        { id: 'p1s3', name: 'Analyse de l\'offre', status: 'completed', duration: '2h' },
        { id: 'p1s4', name: 'Analyse micro', status: 'completed', duration: '4h' },
        { 
          id: 'p1s5', 
          name: 'SWOT Synthétique', 
          status: 'completed', 
          duration: '1h',
          approvalPoint: true, 
          output: 'Pertinence du projet: GO',
          approvedBy: 'Marie Laurent',
          approvalTime: '2023-11-02'
        },
      ],
      decision: { type: 'go_no_go', status: 'go', label: 'GO - Beta Approved' }
    },
    {
      id: 2,
      name: 'Phase 2: Strategy & Planning',
      subtitle: 'Quarterly Review',
      agent: 'Agent IA Stratégie',
      frequency: '90 days',
      frequencyType: 'quarterly',
      status: 'completed',
      color: 'bg-orange-100 border-orange-300',
      headerColor: 'bg-orange-500',
      icon: 'Target',
      lastRun: '2024-02-01',
      nextRun: '2024-05-01',
      progress: 100,
      steps: [
        { 
          id: 'p2s1', 
          name: 'Segmentation', 
          status: 'completed', 
          duration: '4h',
          approvalPoint: true, 
          output: 'Persona: Early Adopters Tech',
          approvedBy: 'Marie Laurent',
          approvalTime: '2024-02-01'
        },
        { id: 'p2s2', name: 'Ciblage & Positionnement', status: 'completed', duration: '3h' },
        { id: 'p2s3', name: '4P / 7P Marketing Mix', status: 'completed', duration: '6h' },
        { 
          id: 'p2s4', 
          name: 'Plan d\'action Marketing', 
          status: 'completed', 
          duration: '3h',
          approvalPoint: true, 
          output: 'Beta Launch Strategy',
          approvedBy: 'Thomas Dubois',
          approvalTime: '2024-02-03'
        },
      ],
      decision: { type: 'completion', status: 'go', label: 'Strategy Approved' }
    },
    {
      id: 3,
      name: 'Phase 3: Daily Execution',
      subtitle: 'Autonomous Operations',
      agent: 'Multi-Agent Orchestration',
      frequency: 'Daily',
      frequencyType: 'daily',
      status: 'running',
      color: 'bg-green-100 border-green-300',
      headerColor: 'bg-green-500',
      icon: 'Zap',
      lastRun: 'Today 06:00',
      nextRun: 'Tomorrow 06:00',
      progress: 65,
      subAgents: [
        { name: 'Orchestrateur Éditorial', status: 'completed', task: 'Calendar Planning', output: 'Calendrier planning', lastRun: '06:00', nextRun: 'Tomorrow 06:00' },
        { name: 'Agent IA Advertising', status: 'running', task: 'Beta Ads Optimization', output: 'Lead generation', lastRun: '09:30', nextRun: 'Continuous' },
        { name: 'Studio Créatif', status: 'completed', task: 'Landing Page Assets', output: 'Visual content', lastRun: '10:00', nextRun: 'On demand' },
        { name: 'Community Manager', status: 'running', task: 'Beta User Engagement', output: 'Support & feedback', lastRun: 'Continuous', nextRun: 'Continuous' },
      ],
      steps: [
        { id: 'p3s1', name: 'Calendar Planning', status: 'completed', duration: 'Daily', approvalPoint: true },
        { id: 'p3s2', name: 'Content Creation', status: 'completed', duration: 'Daily' },
        { id: 'p3s3', name: 'Campaign Execution', status: 'running', duration: 'Daily' },
        { id: 'p3s4', name: 'Distribution', status: 'running', duration: 'Scheduled' },
        { id: 'p3s5', name: 'Reporting & Control', status: 'running', duration: 'Real-time', feedback: true },
      ],
      feedbackLoop: 'Rectification automatique - A/B testing active'
    }
  ]
};

// Project 3: Q1 Newsletter - In Phase 2
export const q1NewsletterWorkflow: ProjectWorkflow = {
  projectId: 3,
  currentPhase: 2,
  overallProgress: 45,
  phases: [
    {
      id: 1,
      name: 'Phase 1: Market Intelligence',
      subtitle: 'Strategic Foundation',
      agent: 'Agent IA Étude Marché',
      frequency: '2-5 years',
      frequencyType: 'long_term',
      status: 'completed',
      color: 'bg-pink-100 border-pink-300',
      headerColor: 'bg-pink-500',
      icon: 'BarChart3',
      lastRun: '2023-09-01',
      progress: 100,
      steps: [
        { id: 'p1s1', name: 'Analyse Macro', status: 'completed', duration: '2h' },
        { id: 'p1s2', name: 'Analyse de la demande', status: 'completed', duration: '3h' },
        { id: 'p1s3', name: 'Analyse de l\'offre', status: 'completed', duration: '2h' },
        { id: 'p1s4', name: 'Analyse micro', status: 'completed', duration: '4h' },
        { 
          id: 'p1s5', 
          name: 'SWOT Synthétique', 
          status: 'completed', 
          duration: '1h',
          approvalPoint: true, 
          output: 'Pertinence du projet: GO',
          approvedBy: 'Thomas Dubois',
          approvalTime: '2023-09-02'
        },
      ],
      decision: { type: 'go_no_go', status: 'go', label: 'GO - Newsletter Strategy' }
    },
    {
      id: 2,
      name: 'Phase 2: Strategy & Planning',
      subtitle: 'Quarterly Review',
      agent: 'Agent IA Stratégie',
      frequency: '90 days',
      frequencyType: 'quarterly',
      status: 'active',
      color: 'bg-orange-100 border-orange-300',
      headerColor: 'bg-orange-500',
      icon: 'Target',
      lastRun: '2024-03-01',
      nextRun: '2024-06-01',
      progress: 50,
      steps: [
        { 
          id: 'p2s1', 
          name: 'Segmentation', 
          status: 'completed', 
          duration: '4h',
          approvalPoint: true, 
          output: 'Persona: Existing Customers',
          approvedBy: 'Thomas Dubois',
          approvalTime: '2024-03-01'
        },
        { id: 'p2s2', name: 'Ciblage & Positionnement', status: 'in_progress', duration: '3h', progress: 60 },
        { id: 'p2s3', name: '4P / 7P Marketing Mix', status: 'pending', duration: '6h' },
        { 
          id: 'p2s4', 
          name: 'Plan d\'action Marketing', 
          status: 'pending', 
          duration: '3h',
          approvalPoint: true, 
          output: 'Newsletter Content Plan'
        },
      ],
      decision: { type: 'completion', status: 'pending', label: 'Planning in Progress' }
    },
    {
      id: 3,
      name: 'Phase 3: Daily Execution',
      subtitle: 'Autonomous Operations',
      agent: 'Multi-Agent Orchestration',
      frequency: 'Daily',
      frequencyType: 'daily',
      status: 'locked',
      color: 'bg-gray-100 border-gray-300',
      headerColor: 'bg-gray-400',
      icon: 'Zap',
      progress: 0,
      subAgents: [
        { name: 'Orchestrateur Éditorial', status: 'idle', task: 'Waiting for strategy', output: 'Calendrier planning' },
        { name: 'Agent IA Copywriting', status: 'idle', task: 'Newsletter content', output: 'Email copy' },
        { name: 'Studio Créatif', status: 'idle', task: 'Template design', output: 'Newsletter template' },
      ],
      steps: [
        { id: 'p3s1', name: 'Calendar Planning', status: 'pending', duration: 'Daily', approvalPoint: true },
        { id: 'p3s2', name: 'Content Creation', status: 'pending', duration: 'Daily' },
        { id: 'p3s3', name: 'Email Distribution', status: 'pending', duration: 'Scheduled' },
        { id: 'p3s4', name: 'Analytics & Reporting', status: 'pending', duration: 'Real-time', feedback: true },
      ],
      feedbackLoop: 'Rectification automatique'
    }
  ]
};

// Project 4: Winter Campaign - All Phases Completed
export const winterCampaignWorkflow: ProjectWorkflow = {
  projectId: 4,
  currentPhase: 3,
  overallProgress: 100,
  phases: [
    {
      id: 1,
      name: 'Phase 1: Market Intelligence',
      subtitle: 'Strategic Foundation',
      agent: 'Agent IA Étude Marché',
      frequency: '2-5 years',
      frequencyType: 'long_term',
      status: 'completed',
      color: 'bg-pink-100 border-pink-300',
      headerColor: 'bg-pink-500',
      icon: 'BarChart3',
      lastRun: '2023-06-01',
      progress: 100,
      steps: [
        { id: 'p1s1', name: 'Analyse Macro', status: 'completed', duration: '2h' },
        { id: 'p1s2', name: 'Analyse de la demande', status: 'completed', duration: '3h' },
        { id: 'p1s3', name: 'Analyse de l\'offre', status: 'completed', duration: '2h' },
        { id: 'p1s4', name: 'Analyse micro', status: 'completed', duration: '4h' },
        { 
          id: 'p1s5', 
          name: 'SWOT Synthétique', 
          status: 'completed', 
          duration: '1h',
          approvalPoint: true, 
          output: 'Pertinence du projet: GO',
          approvedBy: 'Marie Laurent',
          approvalTime: '2023-06-02'
        },
      ],
      decision: { type: 'go_no_go', status: 'go', label: 'GO - Winter Strategy' }
    },
    {
      id: 2,
      name: 'Phase 2: Strategy & Planning',
      subtitle: 'Quarterly Review',
      agent: 'Agent IA Stratégie',
      frequency: '90 days',
      frequencyType: 'quarterly',
      status: 'completed',
      color: 'bg-orange-100 border-orange-300',
      headerColor: 'bg-orange-500',
      icon: 'Target',
      lastRun: '2023-11-01',
      progress: 100,
      steps: [
        { 
          id: 'p2s1', 
          name: 'Segmentation', 
          status: 'completed', 
          duration: '4h',
          approvalPoint: true, 
          output: 'Persona: Holiday Shoppers',
          approvedBy: 'Marie Laurent',
          approvalTime: '2023-11-01'
        },
        { id: 'p2s2', name: 'Ciblage & Positionnement', status: 'completed', duration: '3h' },
        { id: 'p2s3', name: '4P / 7P Marketing Mix', status: 'completed', duration: '6h' },
        { 
          id: 'p2s4', 
          name: 'Plan d\'action Marketing', 
          status: 'completed', 
          duration: '3h',
          approvalPoint: true, 
          output: 'Holiday Campaign Plan',
          approvedBy: 'Thomas Dubois',
          approvalTime: '2023-11-03'
        },
      ],
      decision: { type: 'completion', status: 'go', label: 'Strategy Approved' }
    },
    {
      id: 3,
      name: 'Phase 3: Daily Execution',
      subtitle: 'Autonomous Operations',
      agent: 'Multi-Agent Orchestration',
      frequency: 'Daily',
      frequencyType: 'daily',
      status: 'completed',
      color: 'bg-green-100 border-green-300',
      headerColor: 'bg-green-500',
      icon: 'Zap',
      lastRun: '2024-02-28',
      progress: 100,
      subAgents: [
        { name: 'Orchestrateur Éditorial', status: 'completed', task: 'Calendar completed', output: 'Full calendar executed' },
        { name: 'Agent IA Advertising', status: 'completed', task: 'Campaign ended', output: '2.4M impressions, 45K clicks' },
        { name: 'Studio Créatif', status: 'completed', task: 'All assets delivered', output: '20 promotional assets' },
        { name: 'Community Manager', status: 'completed', task: 'Engagement complete', output: '12K interactions' },
      ],
      steps: [
        { id: 'p3s1', name: 'Calendar Planning', status: 'completed', duration: 'Daily', approvalPoint: true },
        { id: 'p3s2', name: 'Content Creation', status: 'completed', duration: 'Daily' },
        { id: 'p3s3', name: 'Campaign Execution', status: 'completed', duration: 'Daily' },
        { id: 'p3s4', name: 'Distribution', status: 'completed', duration: 'Scheduled' },
        { id: 'p3s5', name: 'Reporting & Control', status: 'completed', duration: 'Real-time', feedback: true },
      ],
      feedbackLoop: 'Rectification automatique - Final ROI: 340%'
    }
  ]
};

// Export function to get workflow by project ID
export function getProjectWorkflow(projectId: number): ProjectWorkflow {
  switch (projectId) {
    case 1:
      return summerLaunchWorkflow;
    case 2:
      return productBetaWorkflow;
    case 3:
      return q1NewsletterWorkflow;
    case 4:
      return winterCampaignWorkflow;
    default:
      return summerLaunchWorkflow;
  }
}

// Get all workflows
export const allProjectWorkflows = [
  summerLaunchWorkflow,
  productBetaWorkflow,
  q1NewsletterWorkflow,
  winterCampaignWorkflow
];
