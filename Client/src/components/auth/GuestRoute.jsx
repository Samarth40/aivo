import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

export default function GuestRoute({ children }) {
    const { isAuthenticated, isOnboarded, isLoading } = useAuth()
    const location = useLocation()

    // Wait for Clerk to finish hydrating — prevents login page flash after OAuth
    if (isLoading) return null

    if (isAuthenticated) {
        // If they came from somewhere, send them back; otherwise go to dashboard
        const from = location.state?.from?.pathname || '/dashboard'

        if (!isOnboarded) {
            return <Navigate to="/onboarding" replace />
        }

        return <Navigate to={from} replace />
    }

    return children
}
