import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { AddDealModal } from '@/components/modals/AddDealModal'
import { 
  Search, 
  Plus, 
  Calendar, 
  DollarSign, 
  Brain,
  TrendingUp,
  User,
  Building,
  MoreHorizontal,
  Filter,
  ArrowUpDown
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Deal {
  id: string
  title: string
  company: string
  contact: string
  value: number
  stage: string
  probability: number
  aiScore: number
  expectedCloseDate: string
  lastActivity: string
  source: string
  notes?: string
}

const mockDeals: Deal[] = [
  {
    id: '1',
    title: 'Enterprise Software License',
    company: 'TechCorp Inc.',
    contact: 'John Smith',
    value: 45000,
    stage: 'Negotiation',
    probability: 85,
    aiScore: 92,
    expectedCloseDate: '2024-02-15',
    lastActivity: '2 hours ago',
    source: 'Website'
  },
  {
    id: '2',
    title: 'Marketing Automation Platform',
    company: 'GrowthCo',
    contact: 'Sarah Johnson',
    value: 28000,
    stage: 'Proposal',
    probability: 70,
    aiScore: 78,
    expectedCloseDate: '2024-02-20',
    lastActivity: '1 day ago',
    source: 'LinkedIn'
  },
  {
    id: '3',
    title: 'Cloud Infrastructure Setup',
    company: 'StartupXYZ',
    contact: 'Mike Chen',
    value: 15000,
    stage: 'Qualified',
    probability: 60,
    aiScore: 65,
    expectedCloseDate: '2024-02-25',
    lastActivity: '3 days ago',
    source: 'Referral'
  },
  {
    id: '4',
    title: 'CRM Implementation',
    company: 'RetailPlus',
    contact: 'Lisa Wang',
    value: 35000,
    stage: 'Qualified',
    probability: 45,
    aiScore: 55,
    expectedCloseDate: '2024-03-01',
    lastActivity: '5 days ago',
    source: 'Cold Email'
  },
  {
    id: '5',
    title: 'Data Analytics Solution',
    company: 'FinanceFirst',
    contact: 'David Brown',
    value: 52000,
    stage: 'Lead',
    probability: 30,
    aiScore: 42,
    expectedCloseDate: '2024-03-10',
    lastActivity: '1 week ago',
    source: 'Trade Show'
  },
  {
    id: '6',
    title: 'Mobile App Development',
    company: 'InnovateTech',
    contact: 'Emily Rodriguez',
    value: 38000,
    stage: 'Proposal',
    probability: 75,
    aiScore: 88,
    expectedCloseDate: '2024-02-18',
    lastActivity: '4 hours ago',
    source: 'Website'
  }
]

const stageColors = {
  'Lead': 'bg-gray-100 text-gray-800',
  'Qualified': 'bg-blue-100 text-blue-800',
  'Proposal': 'bg-yellow-100 text-yellow-800',
  'Negotiation': 'bg-orange-100 text-orange-800',
  'Won': 'bg-green-100 text-green-800',
  'Lost': 'bg-red-100 text-red-800'
}

export function Deals() {
  const [deals, setDeals] = useState<Deal[]>(mockDeals)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStage, setSelectedStage] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'value' | 'probability' | 'aiScore' | 'date'>('value')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const filteredAndSortedDeals = deals
    .filter(deal => {
      const matchesSearch = deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           deal.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           deal.contact.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStage = selectedStage === 'all' || deal.stage === selectedStage
      
      return matchesSearch && matchesStage
    })
    .sort((a, b) => {
      let aValue: number, bValue: number
      
      switch (sortBy) {
        case 'value':
          aValue = a.value
          bValue = b.value
          break
        case 'probability':
          aValue = a.probability
          bValue = b.probability
          break
        case 'aiScore':
          aValue = a.aiScore
          bValue = b.aiScore
          break
        case 'date':
          aValue = new Date(a.expectedCloseDate).getTime()
          bValue = new Date(b.expectedCloseDate).getTime()
          break
        default:
          return 0
      }
      
      return sortOrder === 'desc' ? bValue - aValue : aValue - bValue
    })

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getProbabilityColor = (probability: number) => {
    if (probability >= 70) return 'text-green-600'
    if (probability >= 40) return 'text-yellow-600'
    return 'text-red-600'
  }

  const handleAddDeal = (newDeal: Deal) => {
    setDeals(prevDeals => [newDeal, ...prevDeals])
  }

  const totalValue = deals.reduce((sum, deal) => sum + deal.value, 0)
  const weightedValue = deals.reduce((sum, deal) => sum + (deal.value * deal.probability / 100), 0)
  const avgProbability = Math.round(deals.reduce((sum, deal) => sum + deal.probability, 0) / deals.length)
  const avgAiScore = Math.round(deals.reduce((sum, deal) => sum + deal.aiScore, 0) / deals.length)

  const DealCard = ({ deal }: { deal: Deal }) => (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">{deal.title}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Building className="w-4 h-4" />
              <span>{deal.company}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
              <User className="w-4 h-4" />
              <span>{deal.contact}</span>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <span className="text-xl font-bold text-gray-900">
                ${deal.value.toLocaleString()}
              </span>
            </div>
            <Badge className={cn(stageColors[deal.stage as keyof typeof stageColors])}>
              {deal.stage}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500">Probability</span>
                <span className={cn("text-xs font-medium", getProbabilityColor(deal.probability))}>
                  {deal.probability}%
                </span>
              </div>
              <Progress value={deal.probability} className="h-2" />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500">AI Score</span>
                <span className={cn("text-xs font-medium flex items-center", getScoreColor(deal.aiScore))}>
                  <Brain className="w-3 h-3 mr-1" />
                  {deal.aiScore}
                </span>
              </div>
              <Progress value={deal.aiScore} className="h-2" />
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-gray-600">
                <Calendar className="w-4 h-4 mr-1" />
                <span>Close Date</span>
              </div>
              <span className="text-gray-900">
                {new Date(deal.expectedCloseDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Last Activity</span>
              <span className="text-gray-900">{deal.lastActivity}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Source</span>
              <span className="text-gray-900">{deal.source}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Deals</h2>
          <p className="text-gray-600">Track and manage your sales opportunities</p>
        </div>
        <AddDealModal onAddDeal={handleAddDeal} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <DollarSign className="w-5 h-5 text-green-600 mr-1" />
              <p className="text-2xl font-bold text-gray-900">
                ${totalValue.toLocaleString()}
              </p>
            </div>
            <p className="text-sm text-gray-600">Total Pipeline</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-5 h-5 text-blue-600 mr-1" />
              <p className="text-2xl font-bold text-blue-600">
                ${Math.round(weightedValue).toLocaleString()}
              </p>
            </div>
            <p className="text-sm text-gray-600">Weighted Pipeline</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-orange-600">{avgProbability}%</p>
            <p className="text-sm text-gray-600">Avg Probability</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Brain className="w-5 h-5 text-primary mr-1" />
              <p className="text-2xl font-bold text-primary">{avgAiScore}</p>
            </div>
            <p className="text-sm text-gray-600">Avg AI Score</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="flex items-center space-x-4 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search deals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <select
            value={selectedStage}
            onChange={(e) => setSelectedStage(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Stages</option>
            <option value="Lead">Lead</option>
            <option value="Qualified">Qualified</option>
            <option value="Proposal">Proposal</option>
            <option value="Negotiation">Negotiation</option>
            <option value="Won">Won</option>
            <option value="Lost">Lost</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="value">Sort by Value</option>
            <option value="probability">Sort by Probability</option>
            <option value="aiScore">Sort by AI Score</option>
            <option value="date">Sort by Close Date</option>
          </select>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
          >
            <ArrowUpDown className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Deals Grid */}
      <div className="space-y-4">
        {filteredAndSortedDeals.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No deals found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || selectedStage !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'Get started by adding your first deal'
                }
              </p>
              <AddDealModal onAddDeal={handleAddDeal} />
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedDeals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}