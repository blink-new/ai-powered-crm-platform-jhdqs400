import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { AIRecommendations } from '@/components/ai/AIRecommendations'
import { 
  TrendingUp, 
  Users, 
  Target, 
  DollarSign, 
  Brain,
  Calendar,
  Phone,
  Mail
} from 'lucide-react'

export function Dashboard() {
  // Mock data for demonstration
  const stats = [
    {
      title: 'Total Revenue',
      value: '$124,500',
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Active Deals',
      value: '23',
      change: '+3',
      icon: Target,
      color: 'text-blue-600'
    },
    {
      title: 'New Contacts',
      value: '156',
      change: '+8.2%',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      title: 'Conversion Rate',
      value: '24.8%',
      change: '+2.1%',
      icon: TrendingUp,
      color: 'text-orange-600'
    }
  ]

  const recentDeals = [
    {
      id: '1',
      title: 'Enterprise Software License',
      company: 'TechCorp Inc.',
      value: 45000,
      probability: 85,
      aiScore: 92,
      stage: 'Negotiation'
    },
    {
      id: '2',
      title: 'Marketing Automation Platform',
      company: 'GrowthCo',
      value: 28000,
      probability: 70,
      aiScore: 78,
      stage: 'Proposal'
    },
    {
      id: '3',
      title: 'Cloud Infrastructure Setup',
      company: 'StartupXYZ',
      value: 15000,
      probability: 60,
      aiScore: 65,
      stage: 'Qualified'
    }
  ]

  const aiInsights = [
    {
      type: 'opportunity',
      title: 'High-Value Lead Detected',
      description: 'TechCorp Inc. shows strong buying signals. Recommend immediate follow-up.',
      confidence: 94
    },
    {
      type: 'warning',
      title: 'Deal at Risk',
      description: 'GrowthCo deal probability dropped 15%. Consider price adjustment.',
      confidence: 87
    },
    {
      type: 'forecast',
      title: 'Monthly Target',
      description: 'On track to exceed monthly target by 12% based on current pipeline.',
      confidence: 91
    }
  ]

  const upcomingActivities = [
    {
      id: '1',
      type: 'call',
      title: 'Follow-up call with TechCorp',
      time: '2:00 PM',
      contact: 'John Smith'
    },
    {
      id: '2',
      type: 'meeting',
      title: 'Demo presentation for GrowthCo',
      time: '4:30 PM',
      contact: 'Sarah Johnson'
    },
    {
      id: '3',
      type: 'email',
      title: 'Send proposal to StartupXYZ',
      time: '6:00 PM',
      contact: 'Mike Chen'
    }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-sm ${stat.color}`}>{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-100`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Recommendations */}
        <div className="lg:col-span-1">
          <AIRecommendations />
        </div>

        {/* Recent Deals */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">High-Priority Deals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDeals.map((deal) => (
                <div key={deal.id} className="p-4 rounded-lg border bg-white hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900">{deal.title}</h4>
                      <p className="text-sm text-gray-600">{deal.company}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">${deal.value.toLocaleString()}</p>
                      <Badge variant="outline">{deal.stage}</Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500">Deal Probability</span>
                        <span className="text-xs font-medium">{deal.probability}%</span>
                      </div>
                      <Progress value={deal.probability} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500">AI Score</span>
                        <span className="text-xs font-medium flex items-center">
                          <Brain className="w-3 h-3 mr-1 text-primary" />
                          {deal.aiScore}
                        </span>
                      </div>
                      <Progress value={deal.aiScore} className="h-2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Activities */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Today's Activities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingActivities.map((activity) => {
              const Icon = activity.type === 'call' ? Phone : activity.type === 'email' ? Mail : Calendar
              return (
                <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-600">{activity.contact}</p>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {activity.time}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}