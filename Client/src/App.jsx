import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

// Context
import { AuthProvider } from '@/contexts/AuthContext'
import { Toaster } from 'sonner'

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
import SSOCallback from '@/components/auth/SSOCallback'

// Pages
import LandingPage from '@/pages/LandingPage'
import OnboardingPage from '@/pages/OnboardingPage'
import ProfilePage from '@/pages/ProfilePage'
import DashboardHome from '@/pages/DashboardHome'
// Engine Pages
import AnalysisPipeline from '@/pages/AnalysisPipeline'
import AISimulation from '@/pages/AISimulation'
import CompetitorIntelligence from '@/pages/CompetitorIntelligence'
import LlmsTxtGenerator from '@/pages/LlmsTxtGenerator'

// Resources
import DataLibrary from '@/pages/DataLibrary'
import Reports from '@/pages/Reports'
import Settings from '@/pages/Settings'

// Growth & Conversion Pages (Developer 1)
import Pricing from '@/pages/Pricing'
import Customers from '@/pages/Customers'
import CaseStudyDetail from '@/pages/CaseStudyDetail'
import Publishers from '@/pages/Solutions/Publishers'
import Ecommerce from '@/pages/Solutions/Ecommerce'
import B2BSaas from '@/pages/Solutions/B2BSaas'

// Trust & Corporate Pages (Developer 2)
import AboutUs from '@/pages/AboutUs'
import Contact from '@/pages/Contact'
import TermsOfService from '@/pages/Legal/TermsOfService'
import DataPolicy from '@/pages/Legal/DataPolicy'
import SitePreferences from '@/pages/Legal/SitePreferences'

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" richColors />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            {/* Developer 1 — Growth & Conversion */}
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/customers/:slug" element={<CaseStudyDetail />} />
            <Route path="/solutions/publishers" element={<Publishers />} />
            <Route path="/solutions/ecommerce" element={<Ecommerce />} />
            <Route path="/solutions/b2b-saas" element={<B2BSaas />} />
            {/* Developer 2 — Trust & Corporate */}
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/legal/terms" element={<TermsOfService />} />
            <Route path="/legal/privacy" element={<DataPolicy />} />
            <Route path="/legal/cookies" element={<SitePreferences />} />
          </Route>

          {/* Auth Routes — guests only (logged-in users get redirected) */}
          <Route element={<GuestRoute><AuthLayout /></GuestRoute>}>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/forgot-password" element={<ForgotPasswordForm />} />
            <Route path="/auth" element={<Navigate to="/login" replace />} />
          </Route>

          {/* SSO Callback — handles OAuth redirect from Google/GitHub */}
          <Route path="/sso-callback" element={<SSOCallback />} />

          {/* Onboarding — requires auth but NOT onboarding check */}
          <Route path="/onboarding" element={<OnboardingPage />} />

          {/* Protected Dashboard Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
            <Route index element={<DashboardHome />} />

            {/* Engines */}
            <Route path="analysis" element={<AnalysisPipeline />} />
            <Route path="ai-simulation" element={<AISimulation />} />
            <Route path="competitors" element={<CompetitorIntelligence />} />
            <Route path="llms-generator" element={<LlmsTxtGenerator />} />

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
