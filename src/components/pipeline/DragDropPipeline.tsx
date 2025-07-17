import { useState } from 'react'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import {
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  DollarSign, 
  Brain, 
  Calendar, 
  User, 
  Plus,
  MoreHorizontal,
  TrendingUp
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Deal {
  id: string
  title: string
  company: string
  contact: string
  value: number
  probability: number
  aiScore: number
  expectedCloseDate: string
  stage: string
}

interface PipelineStage {
  id: string
  name: string
  color: string
  deals: Deal[]
}

interface DealCardProps {
  deal: Deal
  isDragging?: boolean
}

function DealCard({ deal, isDragging = false }: DealCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: deal.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const getAIScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "cursor-grab hover:shadow-md transition-shadow",
        (isDragging || isSortableDragging) && "opacity-50 rotate-3 shadow-lg"
      )}
    >
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Deal Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 truncate">{deal.title}</h4>
              <p className="text-sm text-gray-600 truncate">{deal.company}</p>
            </div>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 flex-shrink-0">
              <MoreHorizontal className="w-3 h-3" />
            </Button>
          </div>

          {/* Deal Value */}
          <div className="text-lg font-semibold text-gray-900">
            ${deal.value.toLocaleString()}
          </div>

          {/* Contact */}
          <div className="flex items-center text-sm text-gray-600">
            <User className="w-3 h-3 mr-1" />
            {deal.contact}
          </div>

          {/* Expected Close Date */}
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-3 h-3 mr-1" />
            {new Date(deal.expectedCloseDate).toLocaleDateString()}
          </div>

          {/* Progress Bars */}
          <div className="space-y-2">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500">Probability</span>
                <span className="text-xs font-medium">{deal.probability}%</span>
              </div>
              <Progress value={deal.probability} className="h-1.5" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500">AI Score</span>
                <span className={cn("text-xs font-medium flex items-center", getAIScoreColor(deal.aiScore))}>
                  <Brain className="w-3 h-3 mr-1" />
                  {deal.aiScore}
                </span>
              </div>
              <Progress value={deal.aiScore} className="h-1.5" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface StageColumnProps {
  stage: PipelineStage
  deals: Deal[]
}

function StageColumn({ stage, deals }: StageColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: stage.id,
  })

  return (
    <div className="space-y-3">
      {/* Stage Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className={cn("w-3 h-3 rounded-full", stage.color)}></div>
          <h3 className="font-medium text-gray-900">{stage.name}</h3>
          <Badge variant="secondary" className="text-xs">
            {deals.length}
          </Badge>
        </div>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
          <Plus className="w-3 h-3" />
        </Button>
      </div>

      {/* Stage Value */}
      <div className="text-sm text-gray-600">
        ${deals.reduce((total, deal) => total + deal.value, 0).toLocaleString()}
      </div>

      {/* Deal Cards */}
      <div 
        ref={setNodeRef}
        className={cn(
          "space-y-3 min-h-[200px] p-2 rounded-lg transition-colors",
          isOver && "bg-blue-50 border-2 border-blue-200 border-dashed"
        )}
      >
        <SortableContext items={deals.map(deal => deal.id)} strategy={verticalListSortingStrategy}>
          {deals.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </SortableContext>
      </div>
    </div>
  )
}

export function DragDropPipeline() {
  const [stages, setStages] = useState<PipelineStage[]>([
    {
      id: 'lead',
      name: 'Lead',
      color: 'bg-gray-500',
      deals: []
    },
    {
      id: 'qualified',
      name: 'Qualified',
      color: 'bg-blue-500',
      deals: []
    },
    {
      id: 'proposal',
      name: 'Proposal',
      color: 'bg-yellow-500',
      deals: []
    },
    {
      id: 'negotiation',
      name: 'Negotiation',
      color: 'bg-orange-500',
      deals: []
    },
    {
      id: 'closed-won',
      name: 'Closed Won',
      color: 'bg-green-500',
      deals: []
    },
    {
      id: 'closed-lost',
      name: 'Closed Lost',
      color: 'bg-gray-400',
      deals: []
    }
  ])

  const [deals, setDeals] = useState<Deal[]>([
    {
      id: '1',
      title: 'Website Redesign',
      company: 'DesignCorp',
      contact: 'Alice Johnson',
      value: 12000,
      probability: 30,
      aiScore: 65,
      expectedCloseDate: '2024-02-15',
      stage: 'lead'
    },
    {
      id: '2',
      title: 'Mobile App Development',
      company: 'AppStart',
      contact: 'Bob Wilson',
      value: 35000,
      probability: 25,
      aiScore: 58,
      expectedCloseDate: '2024-02-20',
      stage: 'lead'
    },
    {
      id: '3',
      title: 'Cloud Infrastructure Setup',
      company: 'StartupXYZ',
      contact: 'Mike Chen',
      value: 15000,
      probability: 60,
      aiScore: 72,
      expectedCloseDate: '2024-02-10',
      stage: 'qualified'
    },
    {
      id: '4',
      title: 'Marketing Automation Platform',
      company: 'GrowthCo',
      contact: 'Sarah Johnson',
      value: 28000,
      probability: 70,
      aiScore: 78,
      expectedCloseDate: '2024-02-08',
      stage: 'proposal'
    },
    {
      id: '5',
      title: 'Enterprise Software License',
      company: 'TechCorp Inc.',
      contact: 'John Smith',
      value: 45000,
      probability: 85,
      aiScore: 92,
      expectedCloseDate: '2024-02-05',
      stage: 'negotiation'
    }
  ])

  const [activeDeal, setActiveDeal] = useState<Deal | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const deal = deals.find(d => d.id === active.id)
    setActiveDeal(deal || null)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveDeal(null)

    if (!over) return

    const dealId = active.id as string
    const overId = over.id as string

    // Check if we're dropping on a stage column
    const targetStage = stages.find(stage => stage.id === overId)
    if (!targetStage) return

    const currentDeal = deals.find(deal => deal.id === dealId)
    if (!currentDeal || currentDeal.stage === targetStage.id) return

    // Update the deal's stage
    setDeals(prevDeals => 
      prevDeals.map(deal => 
        deal.id === dealId 
          ? { ...deal, stage: targetStage.id }
          : deal
      )
    )
  }

  const getDealsForStage = (stageId: string) => {
    return deals.filter(deal => deal.stage === stageId)
  }

  const totalValue = deals.reduce((total, deal) => total + deal.value, 0)
  const weightedValue = deals.reduce((total, deal) => 
    total + (deal.value * deal.probability / 100), 0
  )

  return (
    <div className="space-y-6">
      {/* Pipeline Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Pipeline</p>
                <p className="text-2xl font-bold">${totalValue.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Weighted Value</p>
                <p className="text-2xl font-bold">${Math.round(weightedValue).toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Deals</p>
                <p className="text-2xl font-bold">{deals.length}</p>
              </div>
              <Brain className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. AI Score</p>
                <p className="text-2xl font-bold">
                  {Math.round(deals.reduce((total, deal) => total + deal.aiScore, 0) / deals.length)}
                </p>
              </div>
              <Brain className="w-8 h-8 text-indigo-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline Board */}
      <div className="bg-white rounded-lg border">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Sales Pipeline</h2>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Deal
            </Button>
          </div>
        </div>

        <div className="p-4">
          <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
              {stages.map((stage) => (
                <div key={stage.id} className="droppable" data-stage={stage.id}>
                  <StageColumn 
                    stage={stage} 
                    deals={getDealsForStage(stage.id)} 
                  />
                </div>
              ))}
            </div>
            
            <DragOverlay>
              {activeDeal ? <DealCard deal={activeDeal} isDragging /> : null}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
    </div>
  )
}