export type UserRole = 'CITIZEN' | 'AGENT' | 'ADMIN'
export type ComplaintStatus = 'EN_ATTENTE' | 'EN_COURS' | 'RESOLU'
export type ComplaintCategory =
  | 'INFRASTRUCTURE'
  | 'SANTE'
  | 'EDUCATION'
  | 'TRANSPORT'
  | 'ENVIRONNEMENT'
  | 'AUTRE'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
}

export interface Note {
  id: string
  agentId: string
  agentName: string
  content: string
  createdAt: string
}

export interface Complaint {
  id: string
  title: string
  description: string
  category: ComplaintCategory
  status: ComplaintStatus
  citizenId: string
  citizenName: string
  createdAt: string
  updatedAt: string
  notes: Note[]
}
