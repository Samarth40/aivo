import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

export default function GuestRoute({ children }) {
    const { isAuthenticated, isOnboarded } = useAuth()
    const location = useLocation()

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
