import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { AddContactModal } from '@/components/modals/AddContactModal'
import { 
  Search, 
  Plus, 
  Filter, 
  Mail, 
  Phone, 
  Building, 
  Star,
  MoreHorizontal,
  Brain,
  TrendingUp,
  Users
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Contact {
  id: string
  name: string
  email: string
  phone?: string
  company: string
  position: string
  leadScore: number
  status: 'new' | 'contacted' | 'qualified' | 'unqualified'
  source: string
  lastActivity: string
  dealsCount: number
  totalValue: number
}

export function Contacts() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@techcorp.com',
      phone: '+1 (555) 123-4567',
      company: 'TechCorp Inc.',
      position: 'CTO',
      leadScore: 92,
      status: 'qualified',
      source: 'Website',
      lastActivity: '2 hours ago',
      dealsCount: 2,
      totalValue: 75000
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@growthco.com',
      phone: '+1 (555) 234-5678',
      company: 'GrowthCo',
      position: 'Marketing Director',
      leadScore: 78,
      status: 'contacted',
      source: 'LinkedIn',
      lastActivity: '1 day ago',
      dealsCount: 1,
      totalValue: 28000
    },
    {
      id: '3',
      name: 'Mike Chen',
      email: 'mike@startupxyz.com',
      company: 'StartupXYZ',
      position: 'Founder',
      leadScore: 65,
      status: 'new',
      source: 'Referral',
      lastActivity: '3 days ago',
      dealsCount: 1,
      totalValue: 15000
    },
    {
      id: '4',
      name: 'Alice Johnson',
      email: 'alice@designcorp.com',
      phone: '+1 (555) 345-6789',
      company: 'DesignCorp',
      position: 'Creative Director',
      leadScore: 58,
      status: 'new',
      source: 'Cold Email',
      lastActivity: '5 days ago',
      dealsCount: 1,
      totalValue: 12000
    },
    {
      id: '5',
      name: 'Bob Wilson',
      email: 'bob@appstart.com',
      company: 'AppStart',
      position: 'Product Manager',
      leadScore: 45,
      status: 'unqualified',
      source: 'Trade Show',
      lastActivity: '1 week ago',
      dealsCount: 0,
      totalValue: 0
    }
  ])

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contact.company.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = selectedStatus === 'all' || contact.status === selectedStatus
    
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800'
      case 'contacted': return 'bg-yellow-100 text-yellow-800'
      case 'qualified': return 'bg-green-100 text-green-800'
      case 'unqualified': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getLeadScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const handleAddContact = (newContact: Contact) => {
    setContacts(prevContacts => [newContact, ...prevContacts])
  }

  const totalContacts = contacts.length
  const qualifiedContacts = contacts.filter(c => c.status === 'qualified').length
  const avgLeadScore = Math.round(contacts.reduce((sum, c) => sum + c.leadScore, 0) / contacts.length)

  return (
    <div className="p-6 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Contacts</p>
                <p className="text-2xl font-bold">{totalContacts}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Qualified Leads</p>
                <p className="text-2xl font-bold">{qualifiedContacts}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Lead Score</p>
                <p className="text-2xl font-bold">{avgLeadScore}</p>
              </div>
              <Brain className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contacts Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold">Contacts</CardTitle>
            <AddContactModal onAddContact={handleAddContact} />
          </div>

          {/* Search and Filters */}
          <div className="flex items-center space-x-4 mt-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="unqualified">Unqualified</option>
              </select>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {filteredContacts.map((contact) => (
              <div key={contact.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-primary/10 text-primary font-medium">
                        {getInitials(contact.name)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="font-medium text-gray-900">{contact.name}</h3>
                        <Badge className={cn("text-xs", getStatusColor(contact.status))}>
                          {contact.status}
                        </Badge>
                        {contact.leadScore >= 80 && (
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        )}
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Building className="w-3 h-3 mr-1" />
                          {contact.company} • {contact.position}
                        </div>
                        <div className="flex items-center">
                          <Mail className="w-3 h-3 mr-1" />
                          {contact.email}
                        </div>
                        {contact.phone && (
                          <div className="flex items-center">
                            <Phone className="w-3 h-3 mr-1" />
                            {contact.phone}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span>Source: {contact.source}</span>
                        <span>Last activity: {contact.lastActivity}</span>
                        {contact.dealsCount > 0 && (
                          <span>{contact.dealsCount} deal(s) • ${contact.totalValue.toLocaleString()}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    {/* Lead Score */}
                    <div className="text-center">
                      <div className="flex items-center space-x-1">
                        <Brain className="w-4 h-4 text-primary" />
                        <span className={cn("font-semibold", getLeadScoreColor(contact.leadScore))}>
                          {contact.leadScore}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">AI Score</p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Mail className="w-4 h-4 mr-1" />
                        Email
                      </Button>
                      <Button variant="outline" size="sm">
                        <Phone className="w-4 h-4 mr-1" />
                        Call
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredContacts.length === 0 && (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}