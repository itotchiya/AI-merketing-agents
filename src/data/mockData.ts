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
  {
    id: 2,
    name: 'Bêta Produit',
    objective: 'Génération de leads',
    budget: 28000,
    status: 'active',
    progress: 40,
    team: ['Marie', 'Pierre', 'Lucas'],
    nextStep: 'Conception séquence email',
    dueDate: '20 mars',
    description: 'Campagne de test bêta pour les nouvelles fonctionnalités produit avec les premiers adoptants.'
  },
  {
    id: 3,
    name: 'Newsletter T1',
    objective: 'Engagement',
    budget: 5000,
    status: 'draft',
    progress: 20,
    team: ['Thomas', 'Sophie'],
    nextStep: 'Création de contenu',
    dueDate: '25 mars',
    description: 'Newsletter trimestrielle avec les actualités de l\'entreprise, les insights du secteur et les événements à venir.'
  },
  {
    id: 4,
    name: 'Campagne Hiver',
    objective: 'Conversion',
    budget: 60000,
    status: 'completed',
    progress: 100,
    team: ['Marie', 'Sophie', 'Pierre', 'Thomas'],
    nextStep: 'Analyse des rapports',
    dueDate: '28 févr.',
    description: 'Campagne de saison des fêtes axée sur les ventes de fin d\'année et les promotions.'
  },
];

// Updated agents with exact names from the schema image
export const agents: Agent[] = [
  // Phase 1 - Strategic (Pink/Purple)
  {
    id: 1,
    name: 'Agent IA Etude marché',
    description: 'Analyse Macro, Analyse de la demande, Analyse de l\'offre, Analyse micro, SWOT Synthétique',
    category: 'strategic',
    inputs: ['Formulation d\'objectif', 'Besoin', 'Budget', 'Cible', 'Cahier de charge'],
    outputs: ['Pertinence du projet', 'SWOT Analysis', 'Market Data'],
    avgTime: 'Cycle 2-5 ans',
    status: 'available'
  },
  // Phase 2 - Strategic (Pink)
  {
    id: 2,
    name: 'Agent IA Stratégie & SCP',
    description: 'Segmentation, Ciblage & Positionnement, 4P/7P Marketing Mix, Plan d\'action Marketing',
    category: 'strategic',
    inputs: ['SWOT Data', 'Analyse de marché', 'Objectifs business'],
    outputs: ['Persona', 'Schéma de vente', 'Stratégie marketing', 'Calendrier 90j'],
    avgTime: 'Cycle 90 jours',
    status: 'available'
  },
  // Phase 2 - Combined
  {
    id: 3,
    name: 'Agent IA concepteur opérationnel et orchestrateur éditorial',
    description: 'Conception opérationnelle et planification éditoriale complète',
    category: 'strategic',
    inputs: ['Stratégie marketing', 'Budget', 'Timeline'],
    outputs: ['Calendrier planning', 'Calendrier éditorial 90j', 'Stratégie de contenu'],
    avgTime: 'Cycle 90 jours',
    status: 'available'
  },
  // Phase 3 - Operational Agents (Blue)
  {
    id: 4,
    name: 'Agent IA Ads Manager',
    description: 'Crée et optimise les campagnes publicitaires sur toutes les plateformes',
    category: 'operational',
    inputs: ['Créatifs', 'Copies', 'Budget', 'Ciblage'],
    outputs: ['Campagnes Live', 'Configuration ciblage', 'Suivi performance'],
    avgTime: 'Exécution quotidienne',
    status: 'available'
  },
  {
    id: 5,
    name: 'Agent IA Création de contenu multimédia',
    description: 'Génère contenu visuel, vidéo et graphique pour tous les canaux',
    category: 'operational',
    inputs: ['Brief', 'Charte graphique', 'Format', 'Calendrier'],
    outputs: ['Visuels', 'Vidéos', 'Graphiques', 'Contenu multimédia'],
    avgTime: 'Exécution quotidienne',
    status: 'available'
  },
  {
    id: 6,
    name: 'Agent IA Email Marketing',
    description: 'Conçoit et envoie des séquences email performantes',
    category: 'operational',
    inputs: ['Objectif', 'Audience', 'Contenu', 'Planning'],
    outputs: ['Séquences email', 'Newsletters', 'Flux d\'automatisation'],
    avgTime: 'Exécution quotidienne',
    status: 'available'
  },
  {
    id: 7,
    name: 'Agent IA community manager',
    description: 'Gère l\'engagement communautaire et les interactions sociales',
    category: 'operational',
    inputs: ['Calendrier éditorial', 'Ton de marque', 'Paramètres plateformes'],
    outputs: ['Posts sociaux', 'Réponses communauté', 'Métriques d\'engagement'],
    avgTime: 'Exécution quotidienne',
    status: 'available'
  },
  // Phase 3 - Diffusion (Green)
  {
    id: 8,
    name: 'Agent IA Diffusion & Publishing',
    description: 'Publie et diffuse le contenu sur tous les canaux sélectionnés',
    category: 'diffusion',
    inputs: ['Contenu validé', 'Planning', 'Plateformes'],
    outputs: ['Contenu publié', 'Métriques de diffusion', 'Posts multi-plateformes'],
    avgTime: 'Exécution quotidienne',
    status: 'available'
  },
  // Phase 3 - Performance & Decision (Pink)
  {
    id: 9,
    name: 'Agent IA Performance & Décision',
    description: 'Analyse les performances et prend des décisions d\'optimisation',
    category: 'strategic',
    inputs: ['Données campagnes', 'Analytics', 'KPIs', 'Objectifs'],
    outputs: ['Rapports performance', 'Insights', 'Recommandations', 'Auto-optimisation'],
    avgTime: 'Temps réel',
    status: 'available'
  },
];

export const validationItems: ValidationItem[] = [
  {
    id: 1,
    title: 'Campagne Meta Ads "Lancement Été"',
    project: 'Lancement Été 2026',
    agent: 'Agent IA Ads Manager',
    submittedBy: 'Marie',
    submittedAt: 'il y a 2 heures',
    priority: 'high',
    type: 'content'
  },
  {
    id: 2,
    title: 'Séquence Email pour Utilisateurs Bêta',
    project: 'Bêta Produit',
    agent: 'Agent IA Email Marketing',
    submittedBy: 'Sophie',
    submittedAt: 'il y a 4 heures',
    priority: 'high',
    type: 'content'
  },
  {
    id: 3,
    title: 'Réallocation Budget T1',
    project: 'Newsletter T1',
    agent: 'Agent IA Performance & Décision',
    submittedBy: 'Thomas',
    submittedAt: 'hier',
    priority: 'medium',
    type: 'budget'
  },
];

export const adminKPIs: KPIData[] = [
  { label: 'Projets Actifs', value: '8', trend: 2, trendLabel: 'vs mois dernier', icon: 'folder' },
  { label: 'Validations en Attente', value: '3', trend: -1, trendLabel: 'vs hier', icon: 'check' },
  { label: 'Exécutions Agents', value: '127', trend: 23, trendLabel: 'cette semaine', icon: 'bot' },
  { label: 'Score BPS', value: '8.4', trend: 0.3, trendLabel: 'vs semaine dernière', icon: 'chart' },
];

export const superAdminKPIs: KPIData[] = [
  { label: 'Entreprises Totales', value: '24', trend: 3, trendLabel: 'ce mois-ci', icon: 'building' },
  { label: 'Utilisateurs Actifs', value: '186', trend: 12, trendLabel: 'cette semaine', icon: 'users' },
  { label: 'Exécutions Agents', value: '12.4K', trend: 18, trendLabel: 'vs mois dernier', icon: 'bot' },
  { label: 'Santé Plateforme', value: '99.9%', trend: 0, trendLabel: 'disponibilité', icon: 'heart' },
  { label: 'Revenu Mensuel', value: '48.2K€', trend: 8, trendLabel: 'vs mois dernier', icon: 'dollar' },
];

export const managerKPIs: KPIData[] = [
  { label: 'Mes Projets', value: '4', trend: 1, trendLabel: 'nouveau cette semaine', icon: 'folder' },
  { label: 'En Attente de Validation', value: '2', trend: 0, trendLabel: 'depuis hier', icon: 'check' },
  { label: 'Tâches Terminées', value: '18', trend: 5, trendLabel: 'cette semaine', icon: 'check' },
  { label: 'Velocité Équipe', value: '94%', trend: 4, trendLabel: 'vs objectif', icon: 'chart' },
];

export const executifKPIs: KPIData[] = [
  { label: 'Mes Tâches', value: '5', trend: -2, trendLabel: 'reste aujourd\'hui', icon: 'clipboard' },
  { label: 'Terminées Aujourd\'hui', value: '3', trend: 1, trendLabel: 'vs hier', icon: 'check' },
  { label: 'Heures Loguées', value: '6.5', trend: 1.5, trendLabel: 'restantes', icon: 'clock' },
  { label: 'Score Qualité', value: '4.8', trend: 0.2, trendLabel: 'cette semaine', icon: 'star' },
];

export const activities: ActivityItem[] = [
  { id: 1, user: 'Marie', action: 'a approuvé', target: 'Campagne Meta Ads', time: 'il y a 2 min', type: 'user' },
  { id: 2, user: 'Agent IA Création de contenu multimédia', action: 'a terminé', target: 'Brouillon Séquence Email', time: 'il y a 15 min', type: 'agent' },
  { id: 3, user: 'Thomas', action: 'a créé', target: 'Projet Newsletter T1', time: 'il y a 1 heure', type: 'user' },
  { id: 4, user: 'Agent IA concepteur opérationnel et orchestrateur éditorial', action: 'a généré', target: '12 ressources visuelles', time: 'il y a 2 heures', type: 'agent' },
  { id: 5, user: 'Sophie', action: 'a soumis', target: 'Budget pour validation', time: 'il y a 3 heures', type: 'user' },
];

export const businesses = [
  { id: 1, name: 'TechCorp', industry: 'SaaS', users: 12, projects: 8, revenue: 45000, plan: 'enterprise', status: 'active' },
  { id: 2, name: 'FashionStore', industry: 'E-commerce', users: 5, projects: 3, revenue: 12000, plan: 'professional', status: 'active' },
  { id: 3, name: 'HealthPlus', industry: 'Santé', users: 8, projects: 5, revenue: 28000, plan: 'professional', status: 'active' },
  { id: 4, name: 'BuildRight', industry: 'Construction', users: 3, projects: 2, revenue: 5000, plan: 'starter', status: 'trial' },
  { id: 5, name: 'FoodieBox', industry: 'Livraison repas', users: 0, projects: 0, revenue: 0, plan: 'starter', status: 'suspended' },
];

export const agentVolumeData = [
  { day: 'Lun', strategic: 45, operational: 120, diffusion: 25 },
  { day: 'Mar', strategic: 52, operational: 135, diffusion: 30 },
  { day: 'Mer', strategic: 38, operational: 110, diffusion: 22 },
  { day: 'Jeu', strategic: 60, operational: 155, diffusion: 35 },
  { day: 'Ven', strategic: 48, operational: 140, diffusion: 28 },
  { day: 'Sam', strategic: 25, operational: 80, diffusion: 15 },
  { day: 'Dim', strategic: 20, operational: 65, diffusion: 12 }
];

export const teamMembers: TeamMember[] = [
  { id: 1, name: 'Thomas Dubois', email: 'thomas@mos.ai', initials: 'TD', role: 'Admin', status: 'active', projects: 4, tasksCompleted: 127 },
  { id: 2, name: 'Marie Laurent', email: 'marie@mos.ai', initials: 'ML', role: 'Manager', status: 'active', projects: 6, tasksCompleted: 89 },
  { id: 3, name: 'Sophie Bernard', email: 'sophie@mos.ai', initials: 'SB', role: 'Manager', status: 'active', projects: 3, tasksCompleted: 56 },
  { id: 4, name: 'Pierre Martin', email: 'pierre@mos.ai', initials: 'PM', role: 'Exécutif', status: 'active', projects: 5, tasksCompleted: 203 },
];
