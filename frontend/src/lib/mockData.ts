import { Complaint, User } from './types'

export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'Jean Dupont',
    email: 'citoyen@test.com',
    role: 'CITIZEN',
  },
  {
    id: 'u2',
    name: 'Marie Martin',
    email: 'agent@test.com',
    role: 'AGENT',
  },
  {
    id: 'u3',
    name: 'Admin Principal',
    email: 'admin@test.com',
    role: 'ADMIN',
  },
]

const today = new Date()
const minusDays = (days: number) =>
  new Date(today.getTime() - days * 24 * 60 * 60 * 1000).toISOString()

export const mockComplaints: Complaint[] = [
  {
    id: 'C-2026-001',
    title: 'Nid de poule dangereux rue de la République',
    description:
      "Un grand nid de poule s'est formé au milieu de la voie, causant des dommages aux véhicules et un risque pour les cyclistes.",
    category: 'INFRASTRUCTURE',
    status: 'EN_ATTENTE',
    citizenId: 'u1',
    citizenName: 'Jean Dupont',
    createdAt: minusDays(2),
    updatedAt: minusDays(2),
    notes: [],
  },
  {
    id: 'C-2026-002',
    title: 'Manque de médicaments au dispensaire Sud',
    description:
      "Le dispensaire du quartier Sud n'a plus de paracétamol ni d'antibiotiques de base depuis deux semaines.",
    category: 'SANTE',
    status: 'EN_COURS',
    citizenId: 'u1',
    citizenName: 'Jean Dupont',
    createdAt: minusDays(5),
    updatedAt: minusDays(1),
    notes: [
      {
        id: 'n1',
        agentId: 'u2',
        agentName: 'Marie Martin',
        content:
          'Dossier transmis à la direction de la santé publique. En attente de réapprovisionnement.',
        createdAt: minusDays(1),
      },
    ],
  },
  {
    id: 'C-2026-003',
    title: 'Bus ligne 4 systématiquement en retard',
    description:
      "Le bus de 7h30 passe souvent à 8h00, ce qui fait arriver les enfants en retard à l'école.",
    category: 'TRANSPORT',
    status: 'RESOLU',
    citizenId: 'u1',
    citizenName: 'Jean Dupont',
    createdAt: minusDays(15),
    updatedAt: minusDays(3),
    notes: [
      {
        id: 'n2',
        agentId: 'u2',
        agentName: 'Marie Martin',
        content:
          'Problème identifié avec le chauffeur de la ligne. Un ajustement des horaires a été effectué.',
        createdAt: minusDays(3),
      },
    ],
  },
  {
    id: 'C-2026-004',
    title: "Dépôt sauvage d'ordures près du parc",
    description:
      "Des déchets de construction ont été abandonnés à l'entrée du parc municipal.",
    category: 'ENVIRONNEMENT',
    status: 'EN_ATTENTE',
    citizenId: 'u1',
    citizenName: 'Jean Dupont',
    createdAt: minusDays(1),
    updatedAt: minusDays(1),
    notes: [],
  },
  {
    id: 'C-2026-005',
    title: "Toiture de l'école primaire qui fuit",
    description:
      "Dans la classe de CM2, l'eau s'infiltre par le plafond lors des fortes pluies.",
    category: 'EDUCATION',
    status: 'EN_COURS',
    citizenId: 'u1',
    citizenName: 'Jean Dupont',
    createdAt: minusDays(8),
    updatedAt: minusDays(2),
    notes: [
      {
        id: 'n3',
        agentId: 'u2',
        agentName: 'Marie Martin',
        content:
          'Équipe technique envoyée sur place pour évaluation. Devis en cours.',
        createdAt: minusDays(2),
      },
    ],
  },
  {
    id: 'C-2026-006',
    title: 'Éclairage public défectueux',
    description:
      "Les lampadaires de l'avenue des Lilas ne fonctionnent plus depuis 3 jours.",
    category: 'INFRASTRUCTURE',
    status: 'RESOLU',
    citizenId: 'u1',
    citizenName: 'Jean Dupont',
    createdAt: minusDays(20),
    updatedAt: minusDays(18),
    notes: [
      {
        id: 'n4',
        agentId: 'u2',
        agentName: 'Marie Martin',
        content: 'Fusible principal remplacé par l\'équipe de maintenance.',
        createdAt: minusDays(18),
      },
    ],
  },
  {
    id: 'C-2026-007',
    title: 'Nuisances sonores nocturnes',
    description:
      'Le bar de la place centrale met la musique trop fort tous les week-ends après minuit.',
    category: 'AUTRE',
    status: 'EN_ATTENTE',
    citizenId: 'u1',
    citizenName: 'Jean Dupont',
    createdAt: minusDays(0),
    updatedAt: minusDays(0),
    notes: [],
  },
  {
    id: 'C-2026-008',
    title: "Fuite d'eau sur la voie publique",
    description:
      'Une canalisation semble avoir rompu au croisement de la rue Pasteur.',
    category: 'INFRASTRUCTURE',
    status: 'EN_COURS',
    citizenId: 'u1',
    citizenName: 'Jean Dupont',
    createdAt: minusDays(3),
    updatedAt: minusDays(1),
    notes: [
      {
        id: 'n5',
        agentId: 'u2',
        agentName: 'Marie Martin',
        content: 'Service des eaux prévenu. Intervention prévue demain matin.',
        createdAt: minusDays(1),
      },
    ],
  },
]
