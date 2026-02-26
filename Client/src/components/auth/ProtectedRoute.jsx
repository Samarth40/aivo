import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

export default function ProtectedRoute({ children }) {
    const { isAuthenticated, isOnboarded } = useAuth()
    const location = useLocation()

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
