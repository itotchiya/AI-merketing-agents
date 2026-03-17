import type { Project } from './mockData';

// Project-specific workflow configurations
export interface WorkflowStep {
  id: number;
  agent: string;
  status: 'completed' | 'in_progress' | 'pending' | 'failed';
  output: string;
  duration: string;
  timestamp: string;
  progress?: number;
}

export interface ProjectTask {
  id: number;
  title: string;
  status: 'completed' | 'in_progress' | 'pending' | 'blocked';
  assignee: string;
  dueDate: string;
  priority?: 'high' | 'medium' | 'low';
}

export interface ProjectResource {
  id: number;
  name: string;
  type: 'document' | 'image' | 'video' | 'archive' | 'spreadsheet';
  size: string;
  updated: string;
  url?: string;
}

export interface ProjectActivity {
  id: number;
  user: string;
  action: string;
  target: string;
  time: string;
  type: 'agent' | 'user' | 'system' | 'approval';
}

export interface ProjectTeamMember {
  id: number;
  name: string;
  initials: string;
  role: string;
  avatar?: string;
}

export interface ProjectDetail {
  project: Project;
  workflowSteps: WorkflowStep[];
  tasks: ProjectTask[];
  team: ProjectTeamMember[];
  resources: ProjectResource[];
  activities: ProjectActivity[];
  stats: {
    taskCompletion: number;
    workflowProgress: number;
    timeRemaining: string;
    budgetUsed: number;
    budgetTotal: number;
  };
}

// PROJECT 1: Summer Launch 2026 - Active campaign in progress
export const summerLaunchDetail: ProjectDetail = {
  project: {
    id: 1,
    name: 'Summer Launch 2026',
    objective: 'Brand Awareness',
    budget: 45000,
    status: 'active',
    progress: 65,
    team: ['Thomas', 'Marie', 'Sophie', 'Pierre'],
    nextStep: 'Review Meta Ads',
    dueDate: 'Mar 15',
    description: 'Summer product launch campaign targeting 25-34 demographic across Meta and Email channels. Focus on conversion optimization and brand awareness with a €45K budget allocation.'
  },
  stats: {
    taskCompletion: 65,
    workflowProgress: 60,
    timeRemaining: '4 days',
    budgetUsed: 28500,
    budgetTotal: 45000
  },
  workflowSteps: [
    { 
      id: 1, 
      agent: 'Stratégie & Planification', 
      status: 'completed', 
      output: 'Campaign strategy document with target persona definition and channel selection',
      duration: '2h 15m',
      timestamp: 'Mar 10, 10:00 AM'
    },
    { 
      id: 2, 
      agent: 'Studio Créatif', 
      status: 'completed', 
      output: '12 visual assets generated including hero images, carousels, and stories',
      duration: '4h 30m',
      timestamp: 'Mar 10, 2:30 PM'
    },
    { 
      id: 3, 
      agent: 'Copywriter Pro', 
      status: 'in_progress', 
      output: 'Writing ad copy variations (8 of 12 completed)...',
      duration: '45m elapsed',
      timestamp: 'Mar 11, 9:00 AM',
      progress: 67
    },
    { 
      id: 4, 
      agent: 'Meta Ads Manager', 
      status: 'pending', 
      output: 'Waiting for copy approval before campaign setup',
      duration: '-',
      timestamp: '-'
    },
    { 
      id: 5, 
      agent: 'Email Marketer', 
      status: 'pending', 
      output: 'Scheduled after Meta Ads completion',
      duration: '-',
      timestamp: '-'
    },
  ],
  tasks: [
    { id: 1, title: 'Define target audience personas', status: 'completed', assignee: 'Thomas', dueDate: 'Mar 8', priority: 'high' },
    { id: 2, title: 'Create visual assets for campaign', status: 'completed', assignee: 'Studio Agent', dueDate: 'Mar 10', priority: 'high' },
    { id: 3, title: 'Write ad copy variations', status: 'in_progress', assignee: 'Copy Agent', dueDate: 'Mar 12', priority: 'high' },
    { id: 4, title: 'Setup Meta Ads campaign structure', status: 'pending', assignee: 'Pierre', dueDate: 'Mar 13', priority: 'high' },
    { id: 5, title: 'Configure conversion tracking', status: 'pending', assignee: 'Pierre', dueDate: 'Mar 13', priority: 'medium' },
    { id: 6, title: 'Schedule email sequence', status: 'pending', assignee: 'Email Agent', dueDate: 'Mar 14', priority: 'medium' },
    { id: 7, title: 'Review and approve all assets', status: 'pending', assignee: 'Marie', dueDate: 'Mar 15', priority: 'high' },
    { id: 8, title: 'Launch campaign', status: 'pending', assignee: 'Thomas', dueDate: 'Mar 15', priority: 'high' },
  ],
  team: [
    { id: 1, name: 'Thomas Dubois', initials: 'TD', role: 'Project Lead' },
    { id: 2, name: 'Marie Laurent', initials: 'ML', role: 'Campaign Manager' },
    { id: 4, name: 'Pierre Martin', initials: 'PM', role: 'Ads Specialist' },
  ],
  resources: [
    { id: 1, name: 'Campaign Brief.pdf', type: 'document', size: '2.4 MB', updated: '2 days ago' },
    { id: 2, name: 'Visual Assets.zip', type: 'archive', size: '45 MB', updated: '1 day ago' },
    { id: 3, name: 'Hero Image - Beach.jpg', type: 'image', size: '3.2 MB', updated: '1 day ago' },
    { id: 4, name: 'Ad Copy v1.docx', type: 'document', size: '12 KB', updated: '3 hours ago' },
    { id: 5, name: 'Target Audience Research.xlsx', type: 'spreadsheet', size: '156 KB', updated: '3 days ago' },
  ],
  activities: [
    { id: 1, user: 'Marie', action: 'approved visual assets from', target: 'Studio Créatif', time: '2 hours ago', type: 'approval' },
    { id: 2, user: 'Copy Agent', action: 'started writing', target: 'ad copy variations', time: '3 hours ago', type: 'agent' },
    { id: 3, user: 'Studio Agent', action: 'completed', target: '12 visual assets', time: '1 day ago', type: 'agent' },
    { id: 4, user: 'Thomas', action: 'created the project', target: 'Summer Launch 2026', time: '3 days ago', type: 'user' },
    { id: 5, user: 'Stratégie Agent', action: 'delivered', target: 'campaign strategy document', time: '3 days ago', type: 'agent' },
  ]
};

// PROJECT 2: Product Beta - Early stage, creative phase
export const productBetaDetail: ProjectDetail = {
  project: {
    id: 2,
    name: 'Product Beta',
    objective: 'Lead Generation',
    budget: 28000,
    status: 'active',
    progress: 40,
    team: ['Marie', 'Pierre', 'Lucas'],
    nextStep: 'Email Sequence Design',
    dueDate: 'Mar 20',
    description: 'Beta testing campaign for new product features with early adopters. Focus on user acquisition and feedback collection through targeted email campaigns and landing pages.'
  },
  stats: {
    taskCompletion: 40,
    workflowProgress: 33,
    timeRemaining: '9 days',
    budgetUsed: 8500,
    budgetTotal: 28000
  },
  workflowSteps: [
    { 
      id: 1, 
      agent: 'Stratégie & Planification', 
      status: 'completed', 
      output: 'Beta launch strategy with user segmentation',
      duration: '1h 45m',
      timestamp: 'Mar 8, 11:00 AM'
    },
    { 
      id: 2, 
      agent: 'Studio Créatif', 
      status: 'in_progress', 
      output: 'Designing landing page mockups (2 of 3 completed)...',
      duration: '2h 20m elapsed',
      timestamp: 'Mar 11, 2:00 PM',
      progress: 65
    },
    { 
      id: 3, 
      agent: 'Copywriter Pro', 
      status: 'pending', 
      output: 'Queued after visual design completion',
      duration: '-',
      timestamp: '-'
    },
    { 
      id: 4, 
      agent: 'Email Marketer', 
      status: 'pending', 
      output: 'Waiting for copy and design assets',
      duration: '-',
      timestamp: '-'
    },
    { 
      id: 5, 
      agent: 'Analyste Performance', 
      status: 'pending', 
      output: 'Will setup tracking after campaign launch',
      duration: '-',
      timestamp: '-'
    },
  ],
  tasks: [
    { id: 1, title: 'Define beta user criteria', status: 'completed', assignee: 'Marie', dueDate: 'Mar 9', priority: 'high' },
    { id: 2, title: 'Create landing page design', status: 'in_progress', assignee: 'Studio Agent', dueDate: 'Mar 12', priority: 'high' },
    { id: 3, title: 'Write beta signup copy', status: 'pending', assignee: 'Copy Agent', dueDate: 'Mar 14', priority: 'high' },
    { id: 4, title: 'Setup email onboarding sequence', status: 'pending', assignee: 'Email Agent', dueDate: 'Mar 16', priority: 'medium' },
    { id: 5, title: 'Configure beta access system', status: 'pending', assignee: 'Lucas', dueDate: 'Mar 17', priority: 'high' },
    { id: 6, title: 'Create feedback survey', status: 'pending', assignee: 'Marie', dueDate: 'Mar 18', priority: 'medium' },
    { id: 7, title: 'Launch beta campaign', status: 'pending', assignee: 'Pierre', dueDate: 'Mar 20', priority: 'high' },
  ],
  team: [
    { id: 2, name: 'Marie Laurent', initials: 'ML', role: 'Product Manager' },
    { id: 4, name: 'Pierre Martin', initials: 'PM', role: 'Growth Specialist' },
    { id: 5, name: 'Lucas Bernard', initials: 'LB', role: 'Developer' },
  ],
  resources: [
    { id: 1, name: 'Beta PRD.pdf', type: 'document', size: '1.8 MB', updated: '4 days ago' },
    { id: 2, name: 'User Personas.pdf', type: 'document', size: '890 KB', updated: '3 days ago' },
    { id: 3, name: 'Landing Page Mockups.fig', type: 'archive', size: '12 MB', updated: '1 day ago' },
    { id: 4, name: 'Beta Signup Flow.mp4', type: 'video', size: '24 MB', updated: '2 days ago' },
  ],
  activities: [
    { id: 1, user: 'Marie', action: 'updated requirements in', target: 'Beta PRD', time: '1 hour ago', type: 'user' },
    { id: 2, user: 'Studio Agent', action: 'generated draft', target: 'landing page concepts', time: '4 hours ago', type: 'agent' },
    { id: 3, user: 'Lucas', action: 'commented on', target: 'signup flow', time: '5 hours ago', type: 'user' },
    { id: 4, user: 'Stratégie Agent', action: 'delivered', target: 'user segmentation analysis', time: '2 days ago', type: 'agent' },
  ]
};

// PROJECT 3: Q1 Newsletter - Draft/Planning stage
export const q1NewsletterDetail: ProjectDetail = {
  project: {
    id: 3,
    name: 'Q1 Newsletter',
    objective: 'Engagement',
    budget: 5000,
    status: 'draft',
    progress: 20,
    team: ['Thomas', 'Sophie'],
    nextStep: 'Content Creation',
    dueDate: 'Mar 25',
    description: 'Quarterly newsletter with company updates, industry insights, and upcoming events. Targeting existing customer base for retention and engagement.'
  },
  stats: {
    taskCompletion: 20,
    workflowProgress: 25,
    timeRemaining: '14 days',
    budgetUsed: 800,
    budgetTotal: 5000
  },
  workflowSteps: [
    { 
      id: 1, 
      agent: 'Stratégie & Planification', 
      status: 'completed', 
      output: 'Newsletter content outline and topic suggestions',
      duration: '45m',
      timestamp: 'Mar 9, 10:00 AM'
    },
    { 
      id: 2, 
      agent: 'Copywriter Pro', 
      status: 'in_progress', 
      output: 'Writing article drafts (1 of 4 completed)...',
      duration: '1h 30m elapsed',
      timestamp: 'Mar 11, 9:30 AM',
      progress: 25
    },
    { 
      id: 3, 
      agent: 'Studio Créatif', 
      status: 'pending', 
      output: 'Waiting for content finalization',
      duration: '-',
      timestamp: '-'
    },
    { 
      id: 4, 
      agent: 'Email Marketer', 
      status: 'pending', 
      output: 'Template selection pending',
      duration: '-',
      timestamp: '-'
    },
  ],
  tasks: [
    { id: 1, title: 'Define newsletter topics', status: 'completed', assignee: 'Thomas', dueDate: 'Mar 10', priority: 'medium' },
    { id: 2, title: 'Write feature article', status: 'in_progress', assignee: 'Copy Agent', dueDate: 'Mar 15', priority: 'high' },
    { id: 3, title: 'Write product updates section', status: 'pending', assignee: 'Sophie', dueDate: 'Mar 17', priority: 'medium' },
    { id: 4, title: 'Design newsletter template', status: 'pending', assignee: 'Studio Agent', dueDate: 'Mar 19', priority: 'medium' },
    { id: 5, title: 'Create header graphics', status: 'pending', assignee: 'Studio Agent', dueDate: 'Mar 20', priority: 'low' },
    { id: 6, title: 'Review and proofread content', status: 'pending', assignee: 'Thomas', dueDate: 'Mar 22', priority: 'high' },
    { id: 7, title: 'Schedule and send newsletter', status: 'pending', assignee: 'Sophie', dueDate: 'Mar 25', priority: 'high' },
  ],
  team: [
    { id: 1, name: 'Thomas Dubois', initials: 'TD', role: 'Content Lead' },
    { id: 3, name: 'Sophie Bernard', initials: 'SB', role: 'Marketing Coordinator' },
  ],
  resources: [
    { id: 1, name: 'Newsletter Brief.pdf', type: 'document', size: '420 KB', updated: '5 days ago' },
    { id: 2, name: 'Q1 Metrics Report.xlsx', type: 'spreadsheet', size: '234 KB', updated: '3 days ago' },
    { id: 3, name: 'Article Draft 1.docx', type: 'document', size: '8 KB', updated: '2 hours ago' },
  ],
  activities: [
    { id: 1, user: 'Sophie', action: 'requested changes to', target: 'article draft', time: '30 min ago', type: 'user' },
    { id: 2, user: 'Copy Agent', action: 'submitted', target: 'first article draft', time: '2 hours ago', type: 'agent' },
    { id: 3, user: 'Thomas', action: 'created', target: 'newsletter outline', time: '2 days ago', type: 'user' },
  ]
};

// PROJECT 4: Winter Campaign - Completed/Archived
export const winterCampaignDetail: ProjectDetail = {
  project: {
    id: 4,
    name: 'Winter Campaign',
    objective: 'Conversion',
    budget: 60000,
    status: 'completed',
    progress: 100,
    team: ['Marie', 'Sophie', 'Pierre', 'Thomas'],
    nextStep: 'Report Analysis',
    dueDate: 'Feb 28',
    description: 'Holiday season campaign focusing on year-end sales and promotions. Successfully completed with 340% ROI and 12K new customer acquisitions.'
  },
  stats: {
    taskCompletion: 100,
    workflowProgress: 100,
    timeRemaining: 'Completed',
    budgetUsed: 58500,
    budgetTotal: 60000
  },
  workflowSteps: [
    { 
      id: 1, 
      agent: 'Stratégie & Planification', 
      status: 'completed', 
      output: 'Holiday campaign strategy with promotional calendar',
      duration: '3h 00m',
      timestamp: 'Feb 15, 9:00 AM'
    },
    { 
      id: 2, 
      agent: 'Studio Créatif', 
      status: 'completed', 
      output: '20 promotional assets including banners, emails, and social posts',
      duration: '6h 15m',
      timestamp: 'Feb 16, 3:15 PM'
    },
    { 
      id: 3, 
      agent: 'Copywriter Pro', 
      status: 'completed', 
      output: 'All promotional copy delivered and approved',
      duration: '2h 45m',
      timestamp: 'Feb 17, 11:00 AM'
    },
    { 
      id: 4, 
      agent: 'Meta Ads Manager', 
      status: 'completed', 
      output: 'Campaign delivered 2.4M impressions, 45K clicks',
      duration: '14 days',
      timestamp: 'Feb 28, 6:00 PM'
    },
    { 
      id: 5, 
      agent: 'Email Marketer', 
      status: 'completed', 
      output: 'Sequence achieved 42% open rate, 8.5% CTR',
      duration: '10 days',
      timestamp: 'Feb 28, 6:00 PM'
    },
    { 
      id: 6, 
      agent: 'Analyste Performance', 
      status: 'completed', 
      output: 'Final report: 340% ROI, 12K new customers',
      duration: '1h 30m',
      timestamp: 'Mar 1, 10:00 AM'
    },
  ],
  tasks: [
    { id: 1, title: 'Define holiday promotion strategy', status: 'completed', assignee: 'Marie', dueDate: 'Feb 15', priority: 'high' },
    { id: 2, title: 'Create promotional assets', status: 'completed', assignee: 'Studio Agent', dueDate: 'Feb 17', priority: 'high' },
    { id: 3, title: 'Write promotional copy', status: 'completed', assignee: 'Copy Agent', dueDate: 'Feb 18', priority: 'high' },
    { id: 4, title: 'Setup Meta Ads campaigns', status: 'completed', assignee: 'Pierre', dueDate: 'Feb 20', priority: 'high' },
    { id: 5, title: 'Launch email sequences', status: 'completed', assignee: 'Email Agent', dueDate: 'Feb 22', priority: 'high' },
    { id: 6, title: 'Monitor daily performance', status: 'completed', assignee: 'Thomas', dueDate: 'Feb 28', priority: 'medium' },
    { id: 7, title: 'Generate final report', status: 'completed', assignee: 'Analyste Agent', dueDate: 'Mar 1', priority: 'high' },
  ],
  team: [
    { id: 1, name: 'Thomas Dubois', initials: 'TD', role: 'Campaign Lead' },
    { id: 2, name: 'Marie Laurent', initials: 'ML', role: 'Strategy Lead' },
    { id: 3, name: 'Sophie Bernard', initials: 'SB', role: 'Creative Director' },
    { id: 4, name: 'Pierre Martin', initials: 'PM', role: 'Ads Manager' },
  ],
  resources: [
    { id: 1, name: 'Campaign Strategy.pdf', type: 'document', size: '3.2 MB', updated: '14 days ago' },
    { id: 2, name: 'All Assets.zip', type: 'archive', size: '128 MB', updated: '12 days ago' },
    { id: 3, name: 'Final Report.pdf', type: 'document', size: '4.5 MB', updated: '2 days ago' },
    { id: 4, name: 'Performance Data.xlsx', type: 'spreadsheet', size: '1.2 MB', updated: '2 days ago' },
    { id: 5, name: 'Social Media Kit.zip', type: 'archive', size: '56 MB', updated: '13 days ago' },
    { id: 6, name: 'Campaign Recap.mp4', type: 'video', size: '45 MB', updated: '1 day ago' },
  ],
  activities: [
    { id: 1, user: 'Analyste Agent', action: 'generated final', target: 'performance report', time: '2 days ago', type: 'agent' },
    { id: 2, user: 'Thomas', action: 'marked project as', target: 'completed', time: '2 days ago', type: 'user' },
    { id: 3, user: 'Meta Ads', action: 'campaign ended with', target: '2.4M impressions', time: '3 days ago', type: 'system' },
    { id: 4, user: 'Email Agent', action: 'sequence completed with', target: '42% open rate', time: '3 days ago', type: 'agent' },
    { id: 5, user: 'Sophie', action: 'approved all', target: 'final assets', time: '14 days ago', type: 'approval' },
    { id: 6, user: 'Pierre', action: 'launched', target: 'Meta Ads campaigns', time: '15 days ago', type: 'user' },
  ]
};

// Export function to get project details by ID
export function getProjectDetail(id: number): ProjectDetail {
  switch (id) {
    case 1:
      return summerLaunchDetail;
    case 2:
      return productBetaDetail;
    case 3:
      return q1NewsletterDetail;
    case 4:
      return winterCampaignDetail;
    default:
      return summerLaunchDetail;
  }
}

// Export all for reference
export const allProjectDetails = [
  summerLaunchDetail,
  productBetaDetail,
  q1NewsletterDetail,
  winterCampaignDetail
];
