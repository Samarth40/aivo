import React, { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useAuth } from '@/contexts/AuthContext'
import { LogOut, UserCircle, Settings, ChevronDown, Menu, X } from 'lucide-react'

export default function GlobalHeader() {
    const { isAuthenticated, user, profile, logout } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    const [showDropdown, setShowDropdown] = useState(false)
    const [showSolutions, setShowSolutions] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const solutionsTimeout = useRef(null)

    const handleLogout = () => {
        setShowDropdown(false)
        setMobileOpen(false)
        logout()
        navigate('/login')
    }

    // Close mobile menu on route change
    useEffect(() => { setMobileOpen(false) }, [location.pathname])

    const isActive = (path) => location.pathname === path

    const solutionsLinks = [
        { label: "Publishers", to: "/solutions/publishers", desc: "Optimize editorial content for AI" },
        { label: "Ecommerce", to: "/solutions/ecommerce", desc: "Product visibility in AI answers" },
        { label: "B2B SaaS", to: "/solutions/b2b-saas", desc: "Technical content optimization" },
    ]

    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 pointer-events-none">
            <nav className="max-w-7xl mx-auto glass rounded-full px-6 sm:px-8 py-3 flex items-center justify-between pointer-events-auto shadow-lg border border-white/10 dark:border-white/5">

                {/* ── Logo ── */}
                <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <span className="text-primary-foreground font-bold text-lg">A</span>
                    </div>
                    <span className="font-heading font-bold text-white text-xl tracking-tight">AIVO</span>
                </Link>

                {/* ── Desktop Nav Links ── */}
                <div className="hidden md:flex items-center gap-1">
                    <NavLink href="/#platform" label="Platform" />

                    {/* Solutions Dropdown */}
                    <div
                        className="relative"
                        onMouseEnter={() => { clearTimeout(solutionsTimeout.current); setShowSolutions(true) }}
                        onMouseLeave={() => { solutionsTimeout.current = setTimeout(() => setShowSolutions(false), 150) }}
                    >
                        <button className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${showSolutions ? 'text-white bg-white/5' : 'text-muted-foreground hover:text-white'}`}>
                            Solutions
                            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showSolutions ? 'rotate-180' : ''}`} />
                        </button>

                        {showSolutions && (
                            <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2">
                                <div className="rounded-xl border border-white/10 shadow-2xl shadow-black/50 min-w-[260px] py-2 overflow-hidden bg-[#1a1730]/95 backdrop-blur-xl">
                                    {solutionsLinks.map((item) => (
                                        <Link
                                            key={item.to}
                                            to={item.to}
                                            onClick={() => setShowSolutions(false)}
                                            className={`block px-4 py-2.5 transition-colors hover:bg-white/5 ${isActive(item.to) ? 'bg-white/5' : ''}`}
                                        >
                                            <div className="text-sm font-medium text-foreground">{item.label}</div>
                                            <div className="text-xs text-muted-foreground mt-0.5">{item.desc}</div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <NavLink to="/pricing" label="Pricing" active={isActive('/pricing')} />
                    <NavLink to="/customers" label="Customers" active={isActive('/customers')} />
                </div>

                {/* ── Right Side ── */}
                <div className="flex items-center gap-3">
                    {isAuthenticated ? (
                        /* ── Logged-in: Avatar Dropdown ── */
                        <div
                            className="relative"
                            onMouseEnter={() => setShowDropdown(true)}
                            onMouseLeave={() => setShowDropdown(false)}
                        >
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

                            {showDropdown && (
                                <div className="absolute right-0 top-full pt-2">
                                    <div className="rounded-xl border border-border/60 shadow-2xl shadow-black/60 min-w-[220px] py-2 overflow-hidden bg-card/95 backdrop-blur-xl">
                                        {/* User info */}
                                        <div className="px-4 py-2.5">
                                            <p className="text-sm font-semibold text-foreground">{user?.name || 'User'}</p>
                                            <p className="text-xs text-muted-foreground truncate">{user?.email || ''}</p>
                                        </div>
                                        <Separator className="bg-border/20" />
                                        <div className="py-1">
                                            <Link
                                                to="/dashboard/profile"
                                                onClick={() => setShowDropdown(false)}
                                                className="flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
                                            >
                                                <UserCircle className="w-4 h-4" /> Profile
                                            </Link>
                                            <Link
                                                to="/dashboard/settings"
                                                onClick={() => setShowDropdown(false)}
                                                className="flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
                                            >
                                                <Settings className="w-4 h-4" /> Settings
                                            </Link>
                                        </div>
                                        <Separator className="bg-border/20" />
                                        <div className="py-1">
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center gap-3 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors w-full text-left cursor-pointer"
                                            >
                                                <LogOut className="w-4 h-4" /> Log Out
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        /* ── Guest: Login + Get Started ── */
                        <div className="hidden md:flex items-center gap-2">
                            <Button asChild variant="ghost" className="rounded-full text-muted-foreground hover:text-white hover:bg-white/5">
                                <Link to="/login">Login</Link>
                            </Button>
                            <Button asChild className="rounded-full">
                                <Link to="/signup">Get Started</Link>
                            </Button>
                        </div>
                    )}

                    {/* ── Mobile Hamburger ── */}
                    <button
                        className="md:hidden text-muted-foreground hover:text-white transition-colors cursor-pointer"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </nav>

            {/* ── Mobile Menu ── */}
            {mobileOpen && (
                <div className="md:hidden mt-2 glass rounded-2xl border border-white/10 shadow-2xl shadow-black/40 p-4 pointer-events-auto mx-2">
                    <div className="space-y-1">
                        <MobileLink href="/#platform" label="Platform" onClick={() => setMobileOpen(false)} />
                        <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Solutions</div>
                        {solutionsLinks.map((item) => (
                            <Link
                                key={item.to}
                                to={item.to}
                                onClick={() => setMobileOpen(false)}
                                className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-white hover:bg-white/5 rounded-lg transition-colors pl-6"
                            >
                                {item.label}
                            </Link>
                        ))}
                        <MobileLink to="/pricing" label="Pricing" onClick={() => setMobileOpen(false)} />
                        <MobileLink to="/customers" label="Customers" onClick={() => setMobileOpen(false)} />
                    </div>
                    {!isAuthenticated && (
                        <>
                            <Separator className="bg-border/20 my-3" />
                            <div className="flex flex-col gap-2">
                                <Button asChild variant="outline" className="w-full rounded-lg bg-transparent border-border hover:bg-white/5 text-white">
                                    <Link to="/login">Login</Link>
                                </Button>
                                <Button asChild className="w-full rounded-lg">
                                    <Link to="/signup">Get Started</Link>
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </header>
    )
}

// ── Small helper components ─────────────────────────────
function NavLink({ to, href, label, active }) {
    const cls = `px-3 py-2 text-sm font-medium rounded-lg transition-colors ${active ? 'text-white bg-white/5' : 'text-muted-foreground hover:text-white'}`
    if (href) return <a className={cls} href={href}>{label}</a>
    return <Link className={cls} to={to}>{label}</Link>
}

function MobileLink({ to, href, label, onClick }) {
    const cls = "block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-white hover:bg-white/5 rounded-lg transition-colors"
    if (href) return <a className={cls} href={href} onClick={onClick}>{label}</a>
    return <Link className={cls} to={to} onClick={onClick}>{label}</Link>
}
