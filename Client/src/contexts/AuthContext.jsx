import React, { createContext, useContext, useState } from 'react'
import { useUser, useAuth as useClerkAuth } from '@clerk/clerk-react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const { user: clerkUser, isLoaded } = useUser()
    const { signOut, getToken } = useClerkAuth()

    // For now we mock onboarding status
    const [isOnboarded, setIsOnboarded] = useState(true)

    // Map Clerk user to our auth user structure
    const user = clerkUser ? {
        email: clerkUser.primaryEmailAddress?.emailAddress,
        name: clerkUser.fullName || clerkUser.primaryEmailAddress?.emailAddress?.split('@')[0],
        id: clerkUser.id,
        imageUrl: clerkUser.imageUrl
    } : null;

    const isAuthenticated = !!user

    const completeOnboarding = (onboardingData) => {
        setIsOnboarded(true)
        console.log('[Auth] Onboarding completed:', onboardingData)
    }

    const logout = () => {
        signOut()
        console.log('[Auth] Logged out')
    }

    const value = {
        user,
        isAuthenticated,
        isOnboarded,
        isLoading: !isLoaded,
        completeOnboarding,
        logout,
        getToken,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export default AuthContext
