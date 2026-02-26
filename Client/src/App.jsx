import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

// Context
import { AuthProvider } from '@/contexts/AuthContext'

// Layouts
import AppLayout from '@/components/layout/AppLayout'
import PublicLayout from '@/components/layout/PublicLayout'
import AuthLayout from '@/components/layout/AuthLayout'

// Route Guards
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import GuestRoute from '@/components/auth/GuestRoute'

// Auth Components
import LoginForm from '@/components/auth/LoginForm'
import SignUpForm from '@/components/auth/SignUpForm'
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm'

// Pages
import LandingPage from '@/pages/LandingPage'
import OnboardingPage from '@/pages/OnboardingPage'
import ProfilePage from '@/pages/ProfilePage'
import DashboardHome from '@/pages/DashboardHome'
// Engine Pages
import ContentExtraction from '@/pages/ContentExtraction'
import SemanticScoring from '@/pages/SemanticScoring'
import EntityGraph from '@/pages/EntityGraph'
import AISimulation from '@/pages/AISimulation'
import CompetitorIntelligence from '@/pages/CompetitorIntelligence'
import AIStrategyAgent from '@/pages/AIStrategyAgent'

// Resources
import DataLibrary from '@/pages/DataLibrary'
import Reports from '@/pages/Reports'
import Settings from '@/pages/Settings'

// Trust & Corporate Pages (Developer 2)
import AboutUs from '@/pages/AboutUs'
import Contact from '@/pages/Contact'
import TermsOfService from '@/pages/Legal/TermsOfService'
import PrivacyPolicy from '@/pages/Legal/PrivacyPolicy'
import CookiePolicy from '@/pages/Legal/CookiePolicy'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/legal/terms" element={<TermsOfService />} />
            <Route path="/legal/privacy" element={<PrivacyPolicy />} />
            <Route path="/legal/cookies" element={<CookiePolicy />} />
          </Route>

          {/* Auth Routes — guests only (logged-in users get redirected) */}
          <Route element={<GuestRoute><AuthLayout /></GuestRoute>}>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/forgot-password" element={<ForgotPasswordForm />} />
            <Route path="/auth" element={<Navigate to="/login" replace />} />
          </Route>

          {/* Onboarding — requires auth but NOT onboarding check */}
          <Route path="/onboarding" element={<OnboardingPage />} />

          {/* Protected Dashboard Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
            <Route index element={<DashboardHome />} />

            {/* Engines */}
            <Route path="extraction" element={<ContentExtraction />} />
            <Route path="semantic-scoring" element={<SemanticScoring />} />
            <Route path="knowledge-graph" element={<EntityGraph />} />
            <Route path="ai-simulation" element={<AISimulation />} />
            <Route path="competitors" element={<CompetitorIntelligence />} />
            <Route path="strategy-agent" element={<AIStrategyAgent />} />

            {/* Resources */}
            <Route path="data-library" element={<DataLibrary />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
