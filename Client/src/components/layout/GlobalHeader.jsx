import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { useAuth } from '@/contexts/AuthContext'
import { LogOut, UserCircle } from 'lucide-react'

export default function GlobalHeader() {
    const { isAuthenticated, user, logout } = useAuth()
    const location = useLocation()
    const isDashboard = location.pathname.startsWith('/dashboard')

    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 pointer-events-none">
            <nav className="max-w-7xl mx-auto glass rounded-full px-8 py-3 flex items-center justify-between pointer-events-auto shadow-lg border border-white/10 dark:border-white/5">
                <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <span className="text-primary-foreground font-bold text-lg">A</span>
                    </div>
                    <span className="font-heading font-bold text-white text-xl tracking-tight">AIVO</span>
                </Link>
                <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                    <a className="hover:text-primary transition-colors text-muted-foreground" href="/#platform">Platform</a>
                    <a className="hover:text-primary transition-colors text-muted-foreground" href="/#solutions">Solutions</a>
                    <a className="hover:text-primary transition-colors text-muted-foreground" href="/#pricing">Pricing</a>
                    <a className="hover:text-primary transition-colors text-muted-foreground" href="/#articles">Articles</a>
                    {isAuthenticated && (
                        <Link to="/dashboard" className="hover:text-primary transition-colors text-muted-foreground font-bold">Dashboard</Link>
                    )}
                </div>
                <div className="flex items-center gap-3">
                    {isAuthenticated ? (
                        <>
                            <Link
                                to="/dashboard/profile"
                                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                                    <span className="text-xs font-bold text-primary">
                                        {user?.name?.[0]?.toUpperCase() || 'U'}
                                    </span>
                                </div>
                                {!isDashboard && (
                                    <span className="hidden lg:inline font-medium">{user?.name || 'User'}</span>
                                )}
                            </Link>
                            {!isDashboard && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={logout}
                                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full"
                                >
                                    <LogOut className="w-4 h-4" />
                                </Button>
                            )}
                        </>
                    ) : (
                        <Button asChild variant="outline" className="rounded-full bg-transparent border-border hover:bg-white/5 text-white">
                            <Link to="/login">Login</Link>
                        </Button>
                    )}
                </div>
            </nav>
        </header>
    )
}
