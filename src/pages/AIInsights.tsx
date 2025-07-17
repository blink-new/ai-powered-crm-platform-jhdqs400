import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  Lightbulb,
  BarChart3,
  Calendar
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Insight {
  id: string
  type: 'opportunity' | 'warning' | 'forecast' | 'recommendation'
  title: string
  description: string
  confidence: number
  impact: 'high' | 'medium' | 'low'
  actionable: boolean
  createdAt: string
}

interface Prediction {
  metric: string
  current: number
  predicted: number
  change: number
  confidence: number
  timeframe: string
}

export function AIInsights() {
  const insights: Insight[] = [
    {
      id: '1',
      type: 'opportunity',
      title: 'High-Value Lead Detected',
      description: 'TechCorp Inc. shows strong buying signals based on website activity and email engagement. Recommend immediate follow-up with personalized proposal.',
      confidence: 94,
      impact: 'high',
      actionable: true,
      createdAt: '2 hours ago'
    },
    {
      id: '2',
      type: 'warning',
      title: 'Deal at Risk',
      description: 'GrowthCo deal probability dropped 15% in the last week. No recent contact activity detected. Consider price adjustment or additional value proposition.',
      confidence: 87,
      impact: 'high',
      actionable: true,
      createdAt: '4 hours ago'
    },
    {
      id: '3',
      type: 'forecast',
      title: 'Monthly Target Achievement',
      description: 'Based on current pipeline velocity and historical data, you are on track to exceed monthly target by 12%. Expected revenue: $156,000.',
      confidence: 91,
      impact: 'medium',
      actionable: false,
      createdAt: '6 hours ago'
    },
    {
      id: '4',
      type: 'recommendation',
      title: 'Optimal Contact Time',
      description: 'Analysis shows John Smith (TechCorp) is most responsive to calls on Tuesday afternoons. Schedule follow-up accordingly for 40% higher success rate.',
      confidence: 78,
      impact: 'medium',
      actionable: true,
      createdAt: '1 day ago'
    },
    {
      id: '5',
      type: 'opportunity',
      title: 'Cross-sell Opportunity',
      description: 'StartupXYZ has shown interest in similar services. Based on their company profile, they may be interested in our premium package (+$20k potential).',
      confidence: 82,
      impact: 'high',
      actionable: true,
      createdAt: '1 day ago'
    },
    {
      id: '6',
      type: 'warning',
      title: 'Lead Score Decline',
      description: 'Alice Johnson\'s lead score dropped from 75 to 58. Reduced email engagement and no website visits in 5 days. Consider re-engagement campaign.',
      confidence: 85,
      impact: 'medium',
      actionable: true,
      createdAt: '2 days ago'
    }
  ]

  const predictions: Prediction[] = [
    {
      metric: 'Monthly Revenue',
      current: 124500,
      predicted: 156000,
      change: 25.3,
      confidence: 91,
      timeframe: 'End of month'
    },
    {
      metric: 'Deal Closure Rate',
      current: 24.8,
      predicted: 28.2,
      change: 13.7,
      confidence: 87,
      timeframe: 'Next 30 days'
    },
    {
      metric: 'Lead Conversion',
      current: 18.5,
      predicted: 22.1,
      change: 19.5,
      confidence: 83,
      timeframe: 'Next quarter'
    },
    {
      metric: 'Pipeline Value',
      current: 285000,
      predicted: 320000,
      change: 12.3,
      confidence: 89,
      timeframe: 'Next month'
    }
  ]

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return <TrendingUp className="w-5 h-5 text-green-600" />
      case 'warning': return <AlertTriangle className="w-5 h-5 text-red-600" />
      case 'forecast': return <BarChart3 className="w-5 h-5 text-blue-600" />
      case 'recommendation': return <Lightbulb className="w-5 h-5 text-yellow-600" />
      default: return <Brain className="w-5 h-5 text-purple-600" />
    }
  }

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'opportunity': return 'border-green-200 bg-green-50'
      case 'warning': return 'border-red-200 bg-red-50'
      case 'forecast': return 'border-blue-200 bg-blue-50'
      case 'recommendation': return 'border-yellow-200 bg-yellow-50'
      default: return 'border-gray-200 bg-gray-50'
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* AI Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Insights</p>
                <p className="text-2xl font-bold">{insights.length}</p>
              </div>
              <Brain className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">High Impact</p>
                <p className="text-2xl font-bold">
                  {insights.filter(i => i.impact === 'high').length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Actionable</p>
                <p className="text-2xl font-bold">
                  {insights.filter(i => i.actionable).length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Confidence</p>
                <p className="text-2xl font-bold">
                  {Math.round(insights.reduce((sum, i) => sum + i.confidence, 0) / insights.length)}%
                </p>
              </div>
              <Target className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Predictions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-primary" />
              AI Predictions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {predictions.map((prediction, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{prediction.metric}</h4>
                  <Badge variant="secondary" className="text-xs">
                    {prediction.confidence}% confident
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-gray-500">Current</p>
                    <p className="text-lg font-semibold">
                      {prediction.metric.includes('Revenue') || prediction.metric.includes('Value') 
                        ? `$${prediction.current.toLocaleString()}`
                        : `${prediction.current}%`
                      }
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Predicted</p>
                    <p className="text-lg font-semibold">
                      {prediction.metric.includes('Revenue') || prediction.metric.includes('Value')
                        ? `$${prediction.predicted.toLocaleString()}`
                        : `${prediction.predicted}%`
                      }
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-600">
                      +{prediction.change}%
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="w-3 h-3 mr-1" />
                    {prediction.timeframe}
                  </div>
                </div>

                <Progress value={prediction.confidence} className="h-2 mt-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="w-5 h-5 mr-2 text-primary" />
              Recent Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {insights.slice(0, 4).map((insight) => (
              <div key={insight.id} className={cn("p-4 border rounded-lg", getInsightColor(insight.type))}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getInsightIcon(insight.type)}
                    <h4 className="font-medium text-gray-900">{insight.title}</h4>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={cn("text-xs", getImpactColor(insight.impact))}>
                      {insight.impact} impact
                    </Badge>
                    {insight.actionable && (
                      <Badge variant="outline" className="text-xs">
                        Actionable
                      </Badge>
                    )}
                  </div>
                </div>

                <p className="text-sm text-gray-700 mb-3">{insight.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center">
                      <Target className="w-3 h-3 mr-1" />
                      {insight.confidence}% confident
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {insight.createdAt}
                    </div>
                  </div>
                  
                  {insight.actionable && (
                    <Button size="sm" variant="outline">
                      Take Action
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* All Insights */}
      <Card>
        <CardHeader>
          <CardTitle>All AI Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insights.map((insight) => (
              <div key={insight.id} className={cn("p-4 border rounded-lg hover:shadow-sm transition-shadow", getInsightColor(insight.type))}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getInsightIcon(insight.type)}
                    <div>
                      <h4 className="font-medium text-gray-900">{insight.title}</h4>
                      <p className="text-sm text-gray-600 capitalize">{insight.type}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge className={cn("text-xs", getImpactColor(insight.impact))}>
                      {insight.impact} impact
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {insight.confidence}% confident
                    </Badge>
                    {insight.actionable && (
                      <Badge variant="outline" className="text-xs">
                        Actionable
                      </Badge>
                    )}
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{insight.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {insight.createdAt}
                  </div>
                  
                  {insight.actionable && (
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      Take Action
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}