export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface Project {
  id: number;
  name: string;
  objective: string;
  budget: number;
  status: 'active' | 'draft' | 'completed';
  progress: number;
  team: string[];
  nextStep: string;
  dueDate: string;
  description?: string;
}

export interface Agent {
  id: number;
  name: string;
  description: string;
  category: 'strategic' | 'operational' | 'diffusion';
  inputs: string[];
  outputs: string[];
  avgTime: string;
  status: 'available' | 'busy' | 'maintenance';
}

export interface ValidationItem {
  id: number;
  title: string;
  project: string;
  agent: string;
  submittedBy: string;
  submittedAt: string;
  priority: 'high' | 'medium' | 'low';
  type: 'content' | 'budget' | 'launch';
}

export interface KPIData {
  label: string;
  value: string;
  trend: string;
  trendLabel: string;
  icon: string;
}

export interface ActivityItem {
  id: number;
  user: string;
  action: string;
  target: string;
  time: string;
  type: 'agent' | 'user' | 'system';
}

export interface TeamMember {
  id: number;
  name: string;
  email: string;
  initials: string;
  role: string;
  status: string;
  projects: number;
  tasksCompleted: number;
}

export const users: User[] = [
  { id: 1, name: 'Thomas', email: 'thomas@mos.ai', role: 'admin' },
  { id: 2, name: 'Marie', email: 'marie@mos.ai', role: 'manager' },
  { id: 3, name: 'Sophie', email: 'sophie@mos.ai', role: 'executive' },
];

export const projects: Project[] = [
  {
    id: 1,
    name: 'Summer Launch 2026',
    objective: 'Brand Awareness',
    budget: 45000,
    status: 'active',
    progress: 65,
    team: ['Thomas', 'Marie', 'Sophie'],
    nextStep: 'Review Meta Ads',
    dueDate: 'Mar 15',
    description: 'Summer product launch campaign targeting 25-34 demographic across Meta and Email channels. Focus on conversion optimization and brand awareness.'
  },
  {
    id: 2,
    name: 'Product Beta',
    objective: 'Lead Generation',
    budget: 28000,
    status: 'active',
    progress: 40,
    team: ['Marie', 'Pierre'],
    nextStep: 'Email Sequence',
    dueDate: 'Mar 20',
    description: 'Beta testing campaign for new product features with early adopters.'
  },
  {
    id: 3,
    name: 'Q1 Newsletter',
    objective: 'Engagement',
    budget: 5000,
    status: 'draft',
    progress: 20,
    team: ['Thomas'],
    nextStep: 'Content Creation',
    dueDate: 'Mar 25',
    description: 'Quarterly newsletter with company updates and industry insights.'
  },
  {
    id: 4,
    name: 'Winter Campaign',
    objective: 'Conversion',
    budget: 60000,
    status: 'completed',
    progress: 100,
    team: ['Marie', 'Sophie', 'Pierre'],
    nextStep: 'Report Analysis',
    dueDate: 'Feb 28',
    description: 'Holiday season campaign focusing on year-end sales and promotions.'
  },
];

export const agents: Agent[] = [
  {
    id: 1,
    name: 'Stratégie & Planification',
    description: 'Crée la stratégie marketing et le plan d\'action',
    category: 'strategic',
    inputs: ['Objectifs', 'Budget', 'Cible'],
    outputs: ['Stratégie', 'Calendrier', 'KPIs'],
    avgTime: '2-3 min',
    status: 'available'
  },
  {
    id: 2,
    name: 'Copywriter Pro',
    description: 'Génère des textes marketing et descriptions',
    category: 'operational',
    inputs: ['Brief', 'Tone', 'Format'],
    outputs: ['Copy', 'Headlines', 'CTAs'],
    avgTime: '1-2 min',
    status: 'available'
  },
  {
    id: 3,
    name: 'Meta Ads Manager',
    description: 'Crée et optimise les campagnes Meta Ads',
    category: 'operational',
    inputs: ['Creative', 'Copy', 'Budget'],
    outputs: ['Campaign', 'Targeting', 'Tracking'],
    avgTime: '2-3 min',
    status: 'available'
  },
  {
    id: 4,
    name: 'Email Marketer',
    description: 'Conçoit des séquences email performantes',
    category: 'operational',
    inputs: ['Goal', 'Audience', 'Content'],
    outputs: ['Sequence', 'Subject Lines', 'Timing'],
    avgTime: '1-2 min',
    status: 'available'
  },
  {
    id: 5,
    name: 'Studio Créatif',
    description: 'Génère visuels et concepts créatifs',
    category: 'operational',
    inputs: ['Brief', 'Brand Guidelines', 'Format'],
    outputs: ['Visuals', 'Variations', 'Specs'],
    avgTime: '3-5 min',
    status: 'available'
  },
  {
    id: 6,
    name: 'Analyste Performance',
    description: 'Analyse les données et suggère des optimisations',
    category: 'strategic',
    inputs: ['Campaign Data', 'Goals', 'Period'],
    outputs: ['Report', 'Insights', 'Recommendations'],
    avgTime: '2-3 min',
    status: 'available'
  },
  {
    id: 7,
    name: 'Social Publisher',
    description: 'Planifie et publie sur les réseaux sociaux',
    category: 'diffusion',
    inputs: ['Content', 'Schedule', 'Platforms'],
    outputs: ['Published Posts', 'Analytics', 'Engagement'],
    avgTime: 'Instant',
    status: 'available'
  },
  {
    id: 8,
    name: 'SEO Optimizer',
    description: 'Optimise le contenu pour le référencement',
    category: 'operational',
    inputs: ['Content', 'Keywords', 'Competitors'],
    outputs: ['Optimized Content', 'Meta Tags', 'Structure'],
    avgTime: '1-2 min',
    status: 'available'
  },
];

export const validationItems: ValidationItem[] = [
  {
    id: 1,
    title: 'Meta Ads Campaign "Summer Launch"',
    project: 'Summer Launch 2026',
    agent: 'Meta Ads Manager',
    submittedBy: 'Marie',
    submittedAt: '2 hours ago',
    priority: 'high',
    type: 'content'
  },
  {
    id: 2,
    title: 'Email Sequence for Beta Users',
    project: 'Product Beta',
    agent: 'Email Marketer',
    submittedBy: 'Sophie',
    submittedAt: '4 hours ago',
    priority: 'high',
    type: 'content'
  },
  {
    id: 3,
    title: 'Q1 Budget Reallocation',
    project: 'Q1 Newsletter',
    agent: 'Analyste Performance',
    submittedBy: 'Thomas',
    submittedAt: 'Yesterday',
    priority: 'medium',
    type: 'budget'
  },
];

export const adminKPIs: KPIData[] = [
  { label: 'Active Projects', value: '8', trend: '+2', trendLabel: 'vs last month', icon: 'folder' },
  { label: 'Pending Validations', value: '3', trend: '-1', trendLabel: 'vs yesterday', icon: 'check' },
  { label: 'Agent Executions', value: '127', trend: '+23', trendLabel: 'this week', icon: 'bot' },
  { label: 'BPS Score', value: '8.4', trend: '+0.3', trendLabel: 'from last week', icon: 'chart' },
];

export const superAdminKPIs: KPIData[] = [
  { label: 'Total Businesses', value: '24', trend: '+3', trendLabel: 'this month', icon: 'building' },
  { label: 'Active Users', value: '186', trend: '+12', trendLabel: 'this week', icon: 'users' },
  { label: 'Agent Executions', value: '12.4K', trend: '+18%', trendLabel: 'vs last month', icon: 'bot' },
  { label: 'Platform Health', value: '99.9%', trend: '0', trendLabel: 'uptime', icon: 'heart' },
  { label: 'Monthly Revenue', value: '€48.2K', trend: '+8%', trendLabel: 'vs last month', icon: 'dollar' },
];

export const managerKPIs: KPIData[] = [
  { label: 'My Projects', value: '4', trend: '+1', trendLabel: 'new this week', icon: 'folder' },
  { label: 'Pending My Review', value: '2', trend: '0', trendLabel: 'since yesterday', icon: 'check' },
  { label: 'Tasks Completed', value: '18', trend: '+5', trendLabel: 'this week', icon: 'check' },
  { label: 'Team Velocity', value: '94%', trend: '+4%', trendLabel: 'vs target', icon: 'chart' },
];

export const executifKPIs: KPIData[] = [
  { label: 'My Tasks', value: '5', trend: '-2', trendLabel: 'remaining today', icon: 'clipboard' },
  { label: 'Completed Today', value: '3', trend: '+1', trendLabel: 'vs yesterday', icon: 'check' },
  { label: 'Hours Logged', value: '6.5', trend: '1.5h', trendLabel: 'remaining', icon: 'clock' },
  { label: 'Quality Score', value: '4.8', trend: '+0.2', trendLabel: 'this week', icon: 'star' },
];

export const activities: ActivityItem[] = [
  { id: 1, user: 'Marie', action: 'approved', target: 'Meta Ads Campaign', time: '2 min ago', type: 'user' },
  { id: 2, user: 'Copy Agent', action: 'completed', target: 'Email Sequence Draft', time: '15 min ago', type: 'agent' },
  { id: 3, user: 'Thomas', action: 'created', target: 'Q1 Newsletter Project', time: '1 hour ago', type: 'user' },
  { id: 4, user: 'Studio Agent', action: 'generated', target: '12 visual assets', time: '2 hours ago', type: 'agent' },
  { id: 5, user: 'Sophie', action: 'submitted', target: 'Budget for review', time: '3 hours ago', type: 'user' },
];

export const businesses = [
  { id: 1, name: 'TechCorp', industry: 'SaaS', users: 12, projects: 8, revenue: 45000, plan: 'enterprise', status: 'active' },
  { id: 2, name: 'FashionStore', industry: 'E-commerce', users: 5, projects: 3, revenue: 12000, plan: 'professional', status: 'active' },
  { id: 3, name: 'HealthPlus', industry: 'Healthcare', users: 8, projects: 5, revenue: 28000, plan: 'professional', status: 'active' },
  { id: 4, name: 'BuildRight', industry: 'Construction', users: 3, projects: 2, revenue: 5000, plan: 'starter', status: 'trial' },
  { id: 5, name: 'FoodieBox', industry: 'Food Delivery', users: 0, projects: 0, revenue: 0, plan: 'starter', status: 'suspended' },
];

export const agentVolumeData = [
  { day: 'Mon', strategic: 45, operational: 120, diffusion: 25 },
  { day: 'Tue', strategic: 52, operational: 135, diffusion: 30 },
  { day: 'Wed', strategic: 38, operational: 110, diffusion: 22 },
  { day: 'Thu', strategic: 60, operational: 155, diffusion: 35 },
  { day: 'Fri', strategic: 48, operational: 140, diffusion: 28 },
  { day: 'Sat', strategic: 25, operational: 80, diffusion: 15 },
  { day: 'Sun', strategic: 20, operational: 65, diffusion: 12 }
];

export const teamMembers: TeamMember[] = [
  { id: 1, name: 'Thomas Dubois', email: 'thomas@mos.ai', initials: 'TD', role: 'Admin', status: 'active', projects: 4, tasksCompleted: 127 },
  { id: 2, name: 'Marie Laurent', email: 'marie@mos.ai', initials: 'ML', role: 'Manager', status: 'active', projects: 6, tasksCompleted: 89 },
  { id: 3, name: 'Sophie Bernard', email: 'sophie@mos.ai', initials: 'SB', role: 'Manager', status: 'active', projects: 3, tasksCompleted: 56 },
  { id: 4, name: 'Pierre Martin', email: 'pierre@mos.ai', initials: 'PM', role: 'Exécutif', status: 'active', projects: 5, tasksCompleted: 203 },
];
