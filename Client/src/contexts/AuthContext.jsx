import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

const AuthContext = createContext(null)

const STORAGE_KEY = 'aivo_auth'

function getStoredAuth() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) return JSON.parse(stored)
    } catch { }
    return null
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => getStoredAuth()?.user || null)
    const [isOnboarded, setIsOnboarded] = useState(() => getStoredAuth()?.isOnboarded || false)
    const [isLoading, setIsLoading] = useState(false)

    const isAuthenticated = !!user

    // Persist auth state to localStorage
    useEffect(() => {
        if (user) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, isOnboarded }))
        } else {
            localStorage.removeItem(STORAGE_KEY)
        }
    }, [user, isOnboarded])

    const login = useCallback((userData) => {
        const authUser = {
            email: userData.email,
            name: userData.name || userData.email.split('@')[0],
            loggedInAt: new Date().toISOString(),
        }
        setUser(authUser)
        // If they logged in before, they must have already onboarded
        setIsOnboarded(true)
        console.log('[Auth] Login:', authUser)
    }, [])

    const signup = useCallback((userData) => {
        const authUser = {
            email: userData.email,
            name: userData.fullName || userData.email.split('@')[0],
            createdAt: new Date().toISOString(),
        }
        setUser(authUser)
        setIsOnboarded(false) // New user, must onboard
        console.log('[Auth] Signup:', authUser)
    }, [])

    const completeOnboarding = useCallback((onboardingData) => {
        setIsOnboarded(true)
        console.log('[Auth] Onboarding completed:', onboardingData)
    }, [])

    const logout = useCallback(() => {
        setUser(null)
        setIsOnboarded(false)
        localStorage.removeItem(STORAGE_KEY)
        console.log('[Auth] Logged out')
    }, [])

    const value = {
        user,
        isAuthenticated,
        isOnboarded,
        isLoading,
        login,
        signup,
        completeOnboarding,
        logout,
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
