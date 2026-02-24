import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

// Layouts
import AppLayout from '@/components/layout/AppLayout'

// Pages
import LandingPage from '@/pages/LandingPage'
import AuthPage from '@/pages/AuthPage'
import DashboardHome from '@/pages/DashboardHome'
import AnalysisReport from '@/pages/AnalysisReport'
import Competitors from '@/pages/Competitors'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />

        {/* Protected Application Routes (Wrapped in Layout) */}
        <Route path="/dashboard" element={<AppLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="analysis" element={<AnalysisReport />} />
          <Route path="competitors" element={<Competitors />} />

          {/* Settings / Future Routes */}
          <Route path="settings" element={<div className="p-8 text-center text-muted-foreground">Settings Module Setup</div>} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
