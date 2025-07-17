import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Brain, TrendingUp, AlertTriangle, Lightbulb, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AIRecommendation {
  id: string
  type: 'opportunity' | 'warning' | 'suggestion' | 'insight'
  title: string
  description: string
  confidence: number
  priority: 'high' | 'medium' | 'low'
  actionable: boolean
}

export function AIRecommendations() {
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate AI processing
    const timer = setTimeout(() => {
      setRecommendations([
        {
          id: '1',
          type: 'opportunity',
          title: 'High-Value Lead Detected',
          description: 'TechCorp Inc. has visited your pricing page 5 times this week and downloaded 3 resources. Their engagement score is 94%. Recommend immediate follow-up.',
          confidence: 94,
          priority: 'high',
          actionable: true
        },
        {
          id: '2',
          type: 'warning',
          title: 'Deal Risk Alert',
          description: 'GrowthCo deal has been in "Proposal" stage for 18 days with no activity. Historical data shows deals in this stage for >14 days have 40% lower close rate.',
          confidence: 87,
          priority: 'high',
          actionable: true
        },
        {
          id: '3',
          type: 'suggestion',
          title: 'Optimal Contact Time',
          description: 'Based on John Smith\'s email response patterns, he\'s most responsive on Tuesday afternoons between 2-4 PM. Schedule your next call accordingly.',
          confidence: 78,
          priority: 'medium',
          actionable: true
        },
        {
          id: '4',
          type: 'insight',
          title: 'Pipeline Velocity Improvement',
          description: 'Your average deal cycle has decreased by 12% this quarter. Deals with early technical demos close 23% faster than those without.',
          confidence: 91,
          priority: 'low',
          actionable: false
        }
      ])
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const getIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return <TrendingUp className="w-4 h-4 text-green-600" />
      case 'warning': return <AlertTriangle className="w-4 h-4 text-red-600" />
      case 'suggestion': return <Lightbulb className="w-4 h-4 text-yellow-600" />
      case 'insight': return <Brain className="w-4 h-4 text-blue-600" />
      default: return <Brain className="w-4 h-4 text-gray-600" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'opportunity': return 'border-green-200 bg-green-50'
      case 'warning': return 'border-red-200 bg-red-50'
      case 'suggestion': return 'border-yellow-200 bg-yellow-50'
      case 'insight': return 'border-blue-200 bg-blue-50'
      default: return 'border-gray-200 bg-gray-50'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="w-5 h-5 mr-2 text-primary animate-pulse" />
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Brain className="w-5 h-5 mr-2 text-primary" />
            AI Recommendations
          </div>
          <Badge variant="secondary" className="text-xs">
            {recommendations.length} insights
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec) => (
          <div key={rec.id} className={cn("p-4 rounded-lg border", getTypeColor(rec.type))}>
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                {getIcon(rec.type)}
                <h4 className="font-medium text-gray-900">{rec.title}</h4>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={cn("text-xs", getPriorityColor(rec.priority))}>
                  {rec.priority}
                </Badge>
                {rec.actionable && (
                  <Badge variant="outline" className="text-xs">
                    Actionable
                  </Badge>
                )}
              </div>
            </div>
            
            <p className="text-sm text-gray-700 mb-3">{rec.description}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center text-xs text-gray-500">
                <CheckCircle className="w-3 h-3 mr-1" />
                {rec.confidence}% confident
              </div>
              
              {rec.actionable && (
                <Button size="sm" variant="outline" className="text-xs">
                  Take Action
                </Button>
              )}
            </div>
          </div>
        ))}
        
        <div className="pt-4 border-t">
          <Button variant="ghost" className="w-full text-sm">
            View All AI Insights
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}