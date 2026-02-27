import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

const AuthContext = createContext(null)

const STORAGE_KEY = 'aivo_auth'
const PROFILE_KEY = 'aivo_profile'

function getStoredAuth() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) return JSON.parse(stored)
    } catch { }
    return null
}

function getStoredProfile() {
    try {
        const stored = localStorage.getItem(PROFILE_KEY)
        if (stored) return JSON.parse(stored)
    } catch { }
    return null
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => getStoredAuth()?.user || null)
    const [isOnboarded, setIsOnboarded] = useState(() => getStoredAuth()?.isOnboarded || false)
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(() => getStoredAuth()?.twoFactorEnabled || false)
    const [isLoading, setIsLoading] = useState(false)
    const [profile, setProfile] = useState(() => getStoredProfile() || {
        firstName: '',
        lastName: '',
        jobTitle: '',
        bio: '',
        avatarUrl: '',
    })

    const isAuthenticated = !!user

    // Sync profile firstName/lastName from user on login/signup
    useEffect(() => {
        if (user && !getStoredProfile()) {
            const nameParts = (user.name || '').split(' ')
            setProfile(prev => ({
                ...prev,
                firstName: prev.firstName || nameParts[0] || '',
                lastName: prev.lastName || nameParts.slice(1).join(' ') || '',
            }))
        }
    }, [user])

    // Persist auth state to localStorage
    useEffect(() => {
        if (user) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, isOnboarded, twoFactorEnabled }))
        } else {
            localStorage.removeItem(STORAGE_KEY)
        }
    }, [user, isOnboarded, twoFactorEnabled])

    // Persist profile to localStorage
    useEffect(() => {
        if (user) {
            localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
        }
    }, [profile, user])

    const login = useCallback((userData) => {
        const authUser = {
            email: userData.email,
            name: userData.name || userData.email.split('@')[0],
            loggedInAt: new Date().toISOString(),
        }
        setUser(authUser)
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
        setIsOnboarded(false)
        console.log('[Auth] Signup:', authUser)
    }, [])

    const completeOnboarding = useCallback((onboardingData) => {
        setIsOnboarded(true)
        console.log('[Auth] Onboarding completed:', onboardingData)
    }, [])

    const toggle2FA = useCallback((enabled) => {
        setTwoFactorEnabled(enabled)
        console.log('[Auth] 2FA:', enabled ? 'enabled' : 'disabled')
    }, [])

    const updateProfile = useCallback((updates) => {
        setProfile(prev => {
            const updated = { ...prev, ...updates }
            // Also update user name if firstName/lastName changed
            if (updates.firstName !== undefined || updates.lastName !== undefined) {
                const newName = `${updated.firstName} ${updated.lastName}`.trim()
                setUser(prevUser => prevUser ? { ...prevUser, name: newName } : prevUser)
            }
            return updated
        })
        console.log('[Auth] Profile updated:', updates)
    }, [])

    const logout = useCallback(() => {
        setUser(null)
        setIsOnboarded(false)
        setTwoFactorEnabled(false)
        setProfile({ firstName: '', lastName: '', jobTitle: '', bio: '', avatarUrl: '' })
        localStorage.removeItem(STORAGE_KEY)
        localStorage.removeItem(PROFILE_KEY)
        console.log('[Auth] Logged out')
    }, [])

    const value = {
        user,
        isAuthenticated,
        isOnboarded,
        isLoading,
        twoFactorEnabled,
        profile,
        login,
        signup,
        completeOnboarding,
        toggle2FA,
        updateProfile,
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
