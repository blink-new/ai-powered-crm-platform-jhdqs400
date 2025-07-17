import { useState, useEffect } from 'react'
import { blink } from './blink/client'
import { Sidebar } from './components/layout/Sidebar'
import { Header } from './components/layout/Header'
import { Dashboard } from './pages/Dashboard'
import { Pipeline } from './pages/Pipeline'
import { Contacts } from './pages/Contacts'
import { AIInsights } from './pages/AIInsights'

// Placeholder components for other pages
const Deals = () => (
  <div className="p-6">
    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Deals</h2>
    <p className="text-gray-600">Deals management coming soon...</p>
  </div>
)

const Reports = () => (
  <div className="p-6">
    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Reports</h2>
    <p className="text-gray-600">Analytics and reports coming soon...</p>
  </div>
)

const Settings = () => (
  <div className="p-6">
    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Settings</h2>
    <p className="text-gray-600">Settings panel coming soon...</p>
  </div>
)

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading AI CRM...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI-Powered CRM</h1>
          <p className="text-gray-600 mb-6">
            Intelligent customer relationship management with AI-driven insights and automation.
          </p>
          <p className="text-sm text-gray-500">
            Please sign in to continue to your CRM dashboard.
          </p>
        </div>
      </div>
    )
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'pipeline':
        return <Pipeline />
      case 'contacts':
        return <Contacts />
      case 'deals':
        return <Deals />
      case 'ai-insights':
        return <AIInsights />
      case 'reports':
        return <Reports />
      case 'settings':
        return <Settings />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header currentPage={currentPage} />
        
        <main className="flex-1 overflow-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  )
}

export default App