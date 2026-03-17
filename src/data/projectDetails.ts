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

// PROJECT 1: Lancement Été 2026 - Campagne active en cours
export const summerLaunchDetail: ProjectDetail = {
  project: {
    id: 1,
    name: 'Lancement Été 2026',
    objective: 'Notoriété de la marque',
    budget: 45000,
    status: 'active',
    progress: 65,
    team: ['Thomas', 'Marie', 'Sophie', 'Pierre'],
    nextStep: 'Revoir Meta Ads',
    dueDate: '15 mars',
    description: 'Campagne de lancement produit été ciblant la tranche 25-34 ans sur Meta et Email. Focus sur l\'optimisation de la conversion et la notoriété de la marque avec un budget de 45K€.'
  },
  stats: {
    taskCompletion: 65,
    workflowProgress: 60,
    timeRemaining: '4 jours',
    budgetUsed: 28500,
    budgetTotal: 45000
  },
  workflowSteps: [
    { 
      id: 1, 
      agent: 'Agent IA Stratégie & SCP', 
      status: 'completed', 
      output: 'Document de stratégie de campagne avec définition des personas cibles et sélection des canaux',
      duration: '2h 15m',
      timestamp: '10 mars, 10:00'
    },
    { 
      id: 2, 
      agent: 'Agent IA Création de contenu multimédia', 
      status: 'completed', 
      output: '12 ressources visuelles générées incluant images principales, carrousels et stories',
      duration: '4h 30m',
      timestamp: '10 mars, 14:30'
    },
    { 
      id: 3, 
      agent: 'Agent IA Email Marketing', 
      status: 'in_progress', 
      output: 'Rédaction des variations de copies publicitaires (8 sur 12 terminés)...',
      duration: '45m écoulées',
      timestamp: '11 mars, 9:00',
      progress: 67
    },
    { 
      id: 4, 
      agent: 'Agent IA Ads Manager', 
      status: 'pending', 
      output: 'En attente de validation des copies avant configuration de la campagne',
      duration: '-',
      timestamp: '-'
    },
    { 
      id: 5, 
      agent: 'Agent IA Diffusion & Publishing', 
      status: 'pending', 
      output: 'Planifié après la finalisation des Meta Ads',
      duration: '-',
      timestamp: '-'
    },
  ],
  tasks: [
    { id: 1, title: 'Définir les personas de l\'audience cible', status: 'completed', assignee: 'Thomas', dueDate: '8 mars', priority: 'high' },
    { id: 2, title: 'Créer les ressources visuelles pour la campagne', status: 'completed', assignee: 'Agent Création', dueDate: '10 mars', priority: 'high' },
    { id: 3, title: 'Rédiger les variations de copies publicitaires', status: 'in_progress', assignee: 'Agent Email', dueDate: '12 mars', priority: 'high' },
    { id: 4, title: 'Configurer la structure de la campagne Meta Ads', status: 'pending', assignee: 'Pierre', dueDate: '13 mars', priority: 'high' },
    { id: 5, title: 'Configurer le suivi des conversions', status: 'pending', assignee: 'Pierre', dueDate: '13 mars', priority: 'medium' },
    { id: 6, title: 'Planifier la séquence email', status: 'pending', assignee: 'Agent Email', dueDate: '14 mars', priority: 'medium' },
    { id: 7, title: 'Réviser et approuver toutes les ressources', status: 'pending', assignee: 'Marie', dueDate: '15 mars', priority: 'high' },
    { id: 8, title: 'Lancer la campagne', status: 'pending', assignee: 'Thomas', dueDate: '15 mars', priority: 'high' },
  ],
  team: [
    { id: 1, name: 'Thomas Dubois', initials: 'TD', role: 'Chef de Projet' },
    { id: 2, name: 'Marie Laurent', initials: 'ML', role: 'Responsable Campagne' },
    { id: 4, name: 'Pierre Martin', initials: 'PM', role: 'Spécialiste Ads' },
  ],
  resources: [
    { id: 1, name: 'Brief Campagne.pdf', type: 'document', size: '2,4 Mo', updated: 'il y a 2 jours' },
    { id: 2, name: 'Ressources Visuelles.zip', type: 'archive', size: '45 Mo', updated: 'il y a 1 jour' },
    { id: 3, name: 'Image Principale - Plage.jpg', type: 'image', size: '3,2 Mo', updated: 'il y a 1 jour' },
    { id: 4, name: 'Copies Publicitaires v1.docx', type: 'document', size: '12 Ko', updated: 'il y a 3 heures' },
    { id: 5, name: 'Recherche Audience Cible.xlsx', type: 'spreadsheet', size: '156 Ko', updated: 'il y a 3 jours' },
  ],
  activities: [
    { id: 1, user: 'Marie', action: 'a approuvé les ressources visuelles de', target: 'Agent Création', time: 'il y a 2 heures', type: 'approval' },
    { id: 2, user: 'Agent Email', action: 'a commencé la rédaction des', target: 'variations de copies', time: 'il y a 3 heures', type: 'agent' },
    { id: 3, user: 'Agent Création', action: 'a terminé', target: '12 ressources visuelles', time: 'il y a 1 jour', type: 'agent' },
    { id: 4, user: 'Thomas', action: 'a créé le projet', target: 'Lancement Été 2026', time: 'il y a 3 jours', type: 'user' },
    { id: 5, user: 'Agent Stratégie', action: 'a livré', target: 'document de stratégie campagne', time: 'il y a 3 jours', type: 'agent' },
  ]
};

// PROJECT 2: Bêta Produit - Phase créative précoce
export const productBetaDetail: ProjectDetail = {
  project: {
    id: 2,
    name: 'Bêta Produit',
    objective: 'Génération de leads',
    budget: 28000,
    status: 'active',
    progress: 40,
    team: ['Marie', 'Pierre', 'Lucas'],
    nextStep: 'Conception séquence email',
    dueDate: '20 mars',
    description: 'Campagne de test bêta pour les nouvelles fonctionnalités produit avec les premiers adoptants. Focus sur l\'acquisition utilisateur et la collecte de feedback via des campagnes email ciblées et des landing pages.'
  },
  stats: {
    taskCompletion: 40,
    workflowProgress: 33,
    timeRemaining: '9 jours',
    budgetUsed: 8500,
    budgetTotal: 28000
  },
  workflowSteps: [
    { 
      id: 1, 
      agent: 'Agent IA Stratégie & SCP', 
      status: 'completed', 
      output: 'Stratégie de lancement bêta avec segmentation utilisateur',
      duration: '1h 45m',
      timestamp: '8 mars, 11:00'
    },
    { 
      id: 2, 
      agent: 'Agent IA Création de contenu multimédia', 
      status: 'in_progress', 
      output: 'Conception des maquettes de landing page (2 sur 3 terminées)...',
      duration: '2h 20m écoulées',
      timestamp: '11 mars, 14:00',
      progress: 65
    },
    { 
      id: 3, 
      agent: 'Agent IA Email Marketing', 
      status: 'pending', 
      output: 'En file d\'attente après la finalisation de la conception visuelle',
      duration: '-',
      timestamp: '-'
    },
    { 
      id: 4, 
      agent: 'Agent IA Ads Manager', 
      status: 'pending', 
      output: 'En attente des ressources de copie et de design',
      duration: '-',
      timestamp: '-'
    },
    { 
      id: 5, 
      agent: 'Agent IA Performance & Décision', 
      status: 'pending', 
      output: 'Configuration du suivi après le lancement de la campagne',
      duration: '-',
      timestamp: '-'
    },
  ],
  tasks: [
    { id: 1, title: 'Définir les critères des utilisateurs bêta', status: 'completed', assignee: 'Marie', dueDate: '9 mars', priority: 'high' },
    { id: 2, title: 'Créer le design de la landing page', status: 'in_progress', assignee: 'Agent Création', dueDate: '12 mars', priority: 'high' },
    { id: 3, title: 'Rédiger la copie d\'inscription bêta', status: 'pending', assignee: 'Agent Email', dueDate: '14 mars', priority: 'high' },
    { id: 4, title: 'Configurer la séquence d\'onboarding email', status: 'pending', assignee: 'Agent Email', dueDate: '16 mars', priority: 'medium' },
    { id: 5, title: 'Configurer le système d\'accès bêta', status: 'pending', assignee: 'Lucas', dueDate: '17 mars', priority: 'high' },
    { id: 6, title: 'Créer le sondage de feedback', status: 'pending', assignee: 'Marie', dueDate: '18 mars', priority: 'medium' },
    { id: 7, title: 'Lancer la campagne bêta', status: 'pending', assignee: 'Pierre', dueDate: '20 mars', priority: 'high' },
  ],
  team: [
    { id: 2, name: 'Marie Laurent', initials: 'ML', role: 'Chef de Produit' },
    { id: 4, name: 'Pierre Martin', initials: 'PM', role: 'Spécialiste Growth' },
    { id: 5, name: 'Lucas Bernard', initials: 'LB', role: 'Développeur' },
  ],
  resources: [
    { id: 1, name: 'PRD Bêta.pdf', type: 'document', size: '1,8 Mo', updated: 'il y a 4 jours' },
    { id: 2, name: 'Personas Utilisateurs.pdf', type: 'document', size: '890 Ko', updated: 'il y a 3 jours' },
    { id: 3, name: 'Maquettes Landing Page.fig', type: 'archive', size: '12 Mo', updated: 'il y a 1 jour' },
    { id: 4, name: 'Flux Inscription Bêta.mp4', type: 'video', size: '24 Mo', updated: 'il y a 2 jours' },
  ],
  activities: [
    { id: 1, user: 'Marie', action: 'a mis à jour les exigences dans', target: 'PRD Bêta', time: 'il y a 1 heure', type: 'user' },
    { id: 2, user: 'Agent Création', action: 'a généré un brouillon de', target: 'concepts de landing page', time: 'il y a 4 heures', type: 'agent' },
    { id: 3, user: 'Lucas', action: 'a commenté sur', target: 'le flux d\'inscription', time: 'il y a 5 heures', type: 'user' },
    { id: 4, user: 'Agent Stratégie', action: 'a livré', target: 'analyse de segmentation utilisateur', time: 'il y a 2 jours', type: 'agent' },
  ]
};

// PROJECT 3: Newsletter T1 - Étape de planification/brouillon
export const q1NewsletterDetail: ProjectDetail = {
  project: {
    id: 3,
    name: 'Newsletter T1',
    objective: 'Engagement',
    budget: 5000,
    status: 'draft',
    progress: 20,
    team: ['Thomas', 'Sophie'],
    nextStep: 'Création de contenu',
    dueDate: '25 mars',
    description: 'Newsletter trimestrielle avec les actualités de l\'entreprise, les insights du secteur et les événements à venir. Ciblant la base de clients existants pour la rétention et l\'engagement.'
  },
  stats: {
    taskCompletion: 20,
    workflowProgress: 25,
    timeRemaining: '14 jours',
    budgetUsed: 800,
    budgetTotal: 5000
  },
  workflowSteps: [
    { 
      id: 1, 
      agent: 'Agent IA Stratégie & SCP', 
      status: 'completed', 
      output: 'Plan de contenu de newsletter et suggestions de sujets',
      duration: '45m',
      timestamp: '9 mars, 10:00'
    },
    { 
      id: 2, 
      agent: 'Agent IA Email Marketing', 
      status: 'in_progress', 
      output: 'Rédaction des brouillons d\'articles (1 sur 4 terminé)...',
      duration: '1h 30m écoulées',
      timestamp: '11 mars, 9:30',
      progress: 25
    },
    { 
      id: 3, 
      agent: 'Agent IA Création de contenu multimédia', 
      status: 'pending', 
      output: 'En attente de finalisation du contenu',
      duration: '-',
      timestamp: '-'
    },
    { 
      id: 4, 
      agent: 'Agent IA Diffusion & Publishing', 
      status: 'pending', 
      output: 'Sélection du modèle en attente',
      duration: '-',
      timestamp: '-'
    },
  ],
  tasks: [
    { id: 1, title: 'Définir les sujets de la newsletter', status: 'completed', assignee: 'Thomas', dueDate: '10 mars', priority: 'medium' },
    { id: 2, title: 'Rédiger l\'article de fond', status: 'in_progress', assignee: 'Agent Email', dueDate: '15 mars', priority: 'high' },
    { id: 3, title: 'Rédiger la section mises à jour produit', status: 'pending', assignee: 'Sophie', dueDate: '17 mars', priority: 'medium' },
    { id: 4, title: 'Designer le modèle de newsletter', status: 'pending', assignee: 'Agent Création', dueDate: '19 mars', priority: 'medium' },
    { id: 5, title: 'Créer les graphiques d\'en-tête', status: 'pending', assignee: 'Agent Création', dueDate: '20 mars', priority: 'low' },
    { id: 6, title: 'Réviser et relire le contenu', status: 'pending', assignee: 'Thomas', dueDate: '22 mars', priority: 'high' },
    { id: 7, title: 'Planifier et envoyer la newsletter', status: 'pending', assignee: 'Sophie', dueDate: '25 mars', priority: 'high' },
  ],
  team: [
    { id: 1, name: 'Thomas Dubois', initials: 'TD', role: 'Responsable Contenu' },
    { id: 3, name: 'Sophie Bernard', initials: 'SB', role: 'Coordinatrice Marketing' },
  ],
  resources: [
    { id: 1, name: 'Brief Newsletter.pdf', type: 'document', size: '420 Ko', updated: 'il y a 5 jours' },
    { id: 2, name: 'Rapport Métriques T1.xlsx', type: 'spreadsheet', size: '234 Ko', updated: 'il y a 3 jours' },
    { id: 3, name: 'Brouillon Article 1.docx', type: 'document', size: '8 Ko', updated: 'il y a 2 heures' },
  ],
  activities: [
    { id: 1, user: 'Sophie', action: 'a demandé des modifications sur', target: 'le brouillon d\'article', time: 'il y a 30 min', type: 'user' },
    { id: 2, user: 'Agent Email', action: 'a soumis', target: 'premier brouillon d\'article', time: 'il y a 2 heures', type: 'agent' },
    { id: 3, user: 'Thomas', action: 'a créé', target: 'le plan de la newsletter', time: 'il y a 2 jours', type: 'user' },
  ]
};

// PROJECT 4: Campagne Hiver - Terminée/Archivée
export const winterCampaignDetail: ProjectDetail = {
  project: {
    id: 4,
    name: 'Campagne Hiver',
    objective: 'Conversion',
    budget: 60000,
    status: 'completed',
    progress: 100,
    team: ['Marie', 'Sophie', 'Pierre', 'Thomas'],
    nextStep: 'Analyse des rapports',
    dueDate: '28 févr.',
    description: 'Campagne de saison des fêts axée sur les ventes de fin d\'année et les promotions. Terminée avec succès avec 340% de ROI et 12K nouvelles acquisitions client.'
  },
  stats: {
    taskCompletion: 100,
    workflowProgress: 100,
    timeRemaining: 'Terminé',
    budgetUsed: 58500,
    budgetTotal: 60000
  },
  workflowSteps: [
    { 
      id: 1, 
      agent: 'Agent IA Stratégie & SCP', 
      status: 'completed', 
      output: 'Stratégie de campagne des fêtes avec calendrier promotionnel',
      duration: '3h 00m',
      timestamp: '15 févr., 9:00'
    },
    { 
      id: 2, 
      agent: 'Agent IA Création de contenu multimédia', 
      status: 'completed', 
      output: '20 ressources promotionnelles incluant bannières, emails et posts sociaux',
      duration: '6h 15m',
      timestamp: '16 févr., 15:15'
    },
    { 
      id: 3, 
      agent: 'Agent IA Email Marketing', 
      status: 'completed', 
      output: 'Toutes les copies promotionnelles livrées et approuvées',
      duration: '2h 45m',
      timestamp: '17 févr., 11:00'
    },
    { 
      id: 4, 
      agent: 'Agent IA Ads Manager', 
      status: 'completed', 
      output: 'Campagne livrée : 2,4M impressions, 45K clics',
      duration: '14 jours',
      timestamp: '28 févr., 18:00'
    },
    { 
      id: 5, 
      agent: 'Agent IA Diffusion & Publishing', 
      status: 'completed', 
      output: 'Séquence : 42% taux d\'ouverture, 8,5% CTR',
      duration: '10 jours',
      timestamp: '28 févr., 18:00'
    },
    { 
      id: 6, 
      agent: 'Agent IA Performance & Décision', 
      status: 'completed', 
      output: 'Rapport final : 340% ROI, 12K nouveaux clients',
      duration: '1h 30m',
      timestamp: '1 mars, 10:00'
    },
  ],
  tasks: [
    { id: 1, title: 'Définir la stratégie de promotion des fêtes', status: 'completed', assignee: 'Marie', dueDate: '15 févr.', priority: 'high' },
    { id: 2, title: 'Créer les ressources promotionnelles', status: 'completed', assignee: 'Agent Création', dueDate: '17 févr.', priority: 'high' },
    { id: 3, title: 'Rédiger les copies promotionnelles', status: 'completed', assignee: 'Agent Email', dueDate: '18 févr.', priority: 'high' },
    { id: 4, title: 'Configurer les campagnes Meta Ads', status: 'completed', assignee: 'Pierre', dueDate: '20 févr.', priority: 'high' },
    { id: 5, title: 'Lancer les séquences email', status: 'completed', assignee: 'Agent Email', dueDate: '22 févr.', priority: 'high' },
    { id: 6, title: 'Surveiller la performance quotidienne', status: 'completed', assignee: 'Thomas', dueDate: '28 févr.', priority: 'medium' },
    { id: 7, title: 'Générer le rapport final', status: 'completed', assignee: 'Agent Performance', dueDate: '1 mars', priority: 'high' },
  ],
  team: [
    { id: 1, name: 'Thomas Dubois', initials: 'TD', role: 'Chef de Campagne' },
    { id: 2, name: 'Marie Laurent', initials: 'ML', role: 'Responsable Stratégie' },
    { id: 3, name: 'Sophie Bernard', initials: 'SB', role: 'Directrice Créative' },
    { id: 4, name: 'Pierre Martin', initials: 'PM', role: 'Responsable Ads' },
  ],
  resources: [
    { id: 1, name: 'Stratégie Campagne.pdf', type: 'document', size: '3,2 Mo', updated: 'il y a 14 jours' },
    { id: 2, name: 'Toutes les Ressources.zip', type: 'archive', size: '128 Mo', updated: 'il y a 12 jours' },
    { id: 3, name: 'Rapport Final.pdf', type: 'document', size: '4,5 Mo', updated: 'il y a 2 jours' },
    { id: 4, name: 'Données Performance.xlsx', type: 'spreadsheet', size: '1,2 Mo', updated: 'il y a 2 jours' },
    { id: 5, name: 'Kit Médias Sociaux.zip', type: 'archive', size: '56 Mo', updated: 'il y a 13 jours' },
    { id: 6, name: 'Récap Campagne.mp4', type: 'video', size: '45 Mo', updated: 'il y a 1 jour' },
  ],
  activities: [
    { id: 1, user: 'Agent Performance', action: 'a généré le', target: 'rapport de performance final', time: 'il y a 2 jours', type: 'agent' },
    { id: 2, user: 'Thomas', action: 'a marqué le projet comme', target: 'terminé', time: 'il y a 2 jours', type: 'user' },
    { id: 3, user: 'Meta Ads', action: 'la campagne s\'est terminée avec', target: '2,4M impressions', time: 'il y a 3 jours', type: 'system' },
    { id: 4, user: 'Agent Email', action: 'la séquence s\'est terminée avec', target: '42% taux d\'ouverture', time: 'il y a 3 jours', type: 'agent' },
    { id: 5, user: 'Sophie', action: 'a approuvé toutes les', target: 'ressources finales', time: 'il y a 14 jours', type: 'approval' },
    { id: 6, user: 'Pierre', action: 'a lancé', target: 'les campagnes Meta Ads', time: 'il y a 15 jours', type: 'user' },
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
