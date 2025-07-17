import { Search, Bell, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AddDealModal } from '@/components/modals/AddDealModal'

interface HeaderProps {
  currentPage: string
}

const pageNames: Record<string, string> = {
  dashboard: 'Dashboard',
  pipeline: 'Sales Pipeline',
  contacts: 'Contacts',
  deals: 'Deals',
  'ai-insights': 'AI Insights',
  reports: 'Reports',
  settings: 'Settings'
}

export function Header({ currentPage }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-semibold text-gray-900">
            {pageNames[currentPage] || 'Dashboard'}
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search contacts, deals..."
              className="pl-10 w-80"
            />
          </div>

          {/* Quick Actions */}
          <AddDealModal onAddDeal={() => {}} />

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
          </Button>
        </div>
      </div>
    </header>
  )
}