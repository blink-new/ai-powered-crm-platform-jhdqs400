export interface Contact {
  id: string
  userId: string
  name: string
  email?: string
  phone?: string
  company?: string
  position?: string
  leadScore: number
  status: 'new' | 'contacted' | 'qualified' | 'unqualified'
  source?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface Deal {
  id: string
  userId: string
  contactId?: string
  title: string
  value: number
  stage: string
  probability: number
  expectedCloseDate?: string
  aiScore: number
  aiInsights?: string
  status: 'open' | 'won' | 'lost'
  notes?: string
  createdAt: string
  updatedAt: string
  contact?: Contact
}

export interface Activity {
  id: string
  userId: string
  contactId?: string
  dealId?: string
  type: 'call' | 'email' | 'meeting' | 'task' | 'note'
  subject: string
  description?: string
  dueDate?: string
  completed: boolean
  createdAt: string
}

export interface PipelineStage {
  id: string
  userId: string
  name: string
  position: number
  color: string
  createdAt: string
}

export interface AIInsight {
  type: 'lead_score' | 'deal_probability' | 'next_action' | 'forecast'
  title: string
  description: string
  confidence: number
  actionable: boolean
}