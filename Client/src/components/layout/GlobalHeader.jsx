import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useAuth } from '@/contexts/AuthContext'
import { LogOut, UserCircle, Settings } from 'lucide-react'

export default function GlobalHeader() {
    const { isAuthenticated, user, profile, logout } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    const isDashboard = location.pathname.startsWith('/dashboard')
    const [showDropdown, setShowDropdown] = useState(false)

    const handleLogout = () => {
        setShowDropdown(false)
        logout()
        navigate('/login')
    }

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
                    <Link className="hover:text-primary transition-colors text-muted-foreground" to="/solutions/publishers">Solutions</Link>
                    <Link className="hover:text-primary transition-colors text-muted-foreground" to="/pricing">Pricing</Link>
                    <Link className="hover:text-primary transition-colors text-muted-foreground" to="/customers">Customers</Link>
                    {isAuthenticated && (
                        <Link to="/dashboard" className="hover:text-primary transition-colors text-muted-foreground font-bold">Dashboard</Link>
                    )}
                </div>
                <div className="flex items-center gap-3">
                    {isAuthenticated ? (
                        <div
                            className="relative"
                            onMouseEnter={() => setShowDropdown(true)}
                            onMouseLeave={() => setShowDropdown(false)}
                        >
                            {/* Avatar trigger */}
                            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                                {profile?.avatarUrl ? (
                                    <img src={profile.avatarUrl} alt="" className="w-8 h-8 rounded-full object-cover border border-primary/30" />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                                        <span className="text-xs font-bold text-primary">
                                            {user?.name?.[0]?.toUpperCase() || 'U'}
                                        </span>
                                    </div>
                                )}
                                <span className="hidden lg:inline font-medium">{user?.name || 'User'}</span>
                            </button>

                            {/* Hover dropdown */}
                            {showDropdown && (
                                <div className="absolute right-0 top-full pt-2">
                                    <div className="rounded-xl border border-border/60 shadow-2xl shadow-black/60 min-w-[220px] py-2 overflow-hidden bg-card/95 backdrop-blur-xl">
                                        {/* User info */}
                                        <div className="px-4 py-2.5">
                                            <p className="text-sm font-semibold text-foreground">{user?.name || 'User'}</p>
                                            <p className="text-xs text-muted-foreground truncate">{user?.email || ''}</p>
                                        </div>
                                        <Separator className="bg-border/20" />

                                        {/* Menu items */}
                                        <div className="py-1">
                                            <Link
                                                to="/dashboard/profile"
                                                onClick={() => setShowDropdown(false)}
                                                className="flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
                                            >
                                                <UserCircle className="w-4 h-4" />
                                                Profile
                                            </Link>
                                            <Link
                                                to="/dashboard/settings"
                                                onClick={() => setShowDropdown(false)}
                                                className="flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
                                            >
                                                <Settings className="w-4 h-4" />
                                                Settings
                                            </Link>
                                        </div>
                                        <Separator className="bg-border/20" />

                                        {/* Logout */}
                                        <div className="py-1">
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center gap-3 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors w-full text-left cursor-pointer"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                Log Out
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
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
