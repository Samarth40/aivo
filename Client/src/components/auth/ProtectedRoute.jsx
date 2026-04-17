import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

export default function ProtectedRoute({ children }) {
    const { isAuthenticated, isOnboarded, isLoading } = useAuth()
    const location = useLocation()

    // Wait for Clerk to finish hydrating — prevents flash redirect to /login
    if (isLoading) return null

    if (!isAuthenticated) {
        // Redirect to login, preserving the intended destination
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    if (!isOnboarded) {
        // Authenticated but not onboarded — force onboarding
        return <Navigate to="/onboarding" replace />
    }

    return children
}
