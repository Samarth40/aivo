import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { DotPattern } from "@/components/ui/dot-pattern"
import { ShieldCheck, Zap, Search, BrainCircuit, Network, BarChart3, Sparkles } from 'lucide-react'

const ORBITAL_FEATURES = [
    { icon: Search, label: 'AI Simulation', color: 'text-violet-400', glow: 'shadow-violet-500/20', stat: '94%', statLabel: 'Score Lift' },
    { icon: BrainCircuit, label: 'Semantic Analysis', color: 'text-blue-400', glow: 'shadow-blue-500/20', stat: '6', statLabel: 'AI Engines' },
    { icon: Network, label: 'Knowledge Graphs', color: 'text-emerald-400', glow: 'shadow-emerald-500/20', stat: '2.4x', statLabel: 'Citations' },
    { icon: BarChart3, label: 'Deep Scoring', color: 'text-amber-400', glow: 'shadow-amber-500/20', stat: '< 2s', statLabel: 'Analysis' },
]

export default function AuthLayout() {
    return (
        <div className="relative min-h-screen flex flex-col bg-background text-foreground font-sans overflow-hidden">

            {/* ── Background Canvas ── */}
            <DotPattern
                className="opacity-15"
                cx={1} cy={1} cr={0.8}
                width={24} height={24}
                fill="currentColor"
            />

            {/* Atmospheric gradient orbs */}
            <div className="absolute top-[-15%] left-[20%] w-[500px] h-[500px] rounded-full bg-primary/20 blur-[200px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
            <div className="absolute bottom-[-10%] right-[15%] w-[450px] h-[450px] rounded-full bg-violet-500/12 blur-[180px] pointer-events-none animate-pulse" style={{ animationDuration: '12s' }} />
            <div className="absolute top-[50%] left-[-5%] w-[300px] h-[300px] rounded-full bg-blue-500/8 blur-[150px] pointer-events-none animate-pulse" style={{ animationDuration: '10s' }} />
            <div className="absolute top-[20%] right-[-5%] w-[250px] h-[250px] rounded-full bg-emerald-500/6 blur-[120px] pointer-events-none" />

            {/* Radial vignette */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 100%)' }}
            />

            {/* Subtle grid overlay for depth */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px'
                }}
            />

            {/* ── Top Navigation ── */}
            <nav className="relative z-20 flex items-center justify-between px-6 md:px-10 py-5">
                <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
                    <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/30">
                        <span className="text-primary-foreground font-bold text-xl">A</span>
                    </div>
                    <span className="font-heading font-bold text-white text-2xl tracking-tight">AIVO</span>
                </Link>

                <div className="hidden md:flex items-center gap-1.5">
                    {ORBITAL_FEATURES.slice(0, 3).map(({ icon: Icon, label, color }) => (
                        <div key={label} className="glass rounded-full px-3.5 py-1.5 flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
                            <Icon className={`w-3.5 h-3.5 ${color}`} />
                            {label}
                        </div>
                    ))}
                </div>
            </nav>

            {/* ── Main Content: Immersive Centered Layout ── */}
            <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-6">
                <div className="relative w-full max-w-6xl mx-auto">

                    {/* Floating orbital feature cards — positioned around the form */}
                    <div className="hidden lg:block">
                        {/* Top-left card */}
                        <div className="absolute -top-2 left-0 xl:left-8 animate-fade-up" style={{ animationDelay: '200ms' }}>
                            <div className={`glass rounded-xl p-3.5 flex items-center gap-3 hover:bg-white/[0.04] transition-all hover:-translate-y-0.5 cursor-default ${ORBITAL_FEATURES[0].glow} shadow-lg`}>
                                <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                                    <Search className="w-5 h-5 text-violet-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-foreground/90">{ORBITAL_FEATURES[0].label}</p>
                                    <p className="text-[11px] text-muted-foreground">Predict AI citations in real-time</p>
                                </div>
                                <div className="pl-3 border-l border-border/20 ml-1">
                                    <p className="text-lg font-bold text-violet-400">{ORBITAL_FEATURES[0].stat}</p>
                                    <p className="text-[9px] text-muted-foreground uppercase tracking-wider">{ORBITAL_FEATURES[0].statLabel}</p>
                                </div>
                            </div>
                        </div>

                        {/* Bottom-left card */}
                        <div className="absolute bottom-12 left-0 xl:left-4 animate-fade-up" style={{ animationDelay: '400ms' }}>
                            <div className={`glass rounded-xl p-3.5 flex items-center gap-3 hover:bg-white/[0.04] transition-all hover:-translate-y-0.5 cursor-default ${ORBITAL_FEATURES[1].glow} shadow-lg`}>
                                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                                    <BrainCircuit className="w-5 h-5 text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-foreground/90">{ORBITAL_FEATURES[1].label}</p>
                                    <p className="text-[11px] text-muted-foreground">Deep meaning, not keyword spam</p>
                                </div>
                                <div className="pl-3 border-l border-border/20 ml-1">
                                    <p className="text-lg font-bold text-blue-400">{ORBITAL_FEATURES[1].stat}</p>
                                    <p className="text-[9px] text-muted-foreground uppercase tracking-wider">{ORBITAL_FEATURES[1].statLabel}</p>
                                </div>
                            </div>
                        </div>

                        {/* Top-right card */}
                        <div className="absolute -top-2 right-0 xl:right-8 animate-fade-up" style={{ animationDelay: '300ms' }}>
                            <div className={`glass rounded-xl p-3.5 flex items-center gap-3 hover:bg-white/[0.04] transition-all hover:-translate-y-0.5 cursor-default ${ORBITAL_FEATURES[2].glow} shadow-lg`}>
                                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                                    <Network className="w-5 h-5 text-emerald-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-foreground/90">{ORBITAL_FEATURES[2].label}</p>
                                    <p className="text-[11px] text-muted-foreground">Entity mapping for AI clarity</p>
                                </div>
                                <div className="pl-3 border-l border-border/20 ml-1">
                                    <p className="text-lg font-bold text-emerald-400">{ORBITAL_FEATURES[2].stat}</p>
                                    <p className="text-[9px] text-muted-foreground uppercase tracking-wider">{ORBITAL_FEATURES[2].statLabel}</p>
                                </div>
                            </div>
                        </div>

                        {/* Bottom-right card */}
                        <div className="absolute bottom-12 right-0 xl:right-4 animate-fade-up" style={{ animationDelay: '500ms' }}>
                            <div className={`glass rounded-xl p-3.5 flex items-center gap-3 hover:bg-white/[0.04] transition-all hover:-translate-y-0.5 cursor-default ${ORBITAL_FEATURES[3].glow} shadow-lg`}>
                                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                                    <BarChart3 className="w-5 h-5 text-amber-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-foreground/90">{ORBITAL_FEATURES[3].label}</p>
                                    <p className="text-[11px] text-muted-foreground">Instant optimization insights</p>
                                </div>
                                <div className="pl-3 border-l border-border/20 ml-1">
                                    <p className="text-lg font-bold text-amber-400">{ORBITAL_FEATURES[3].stat}</p>
                                    <p className="text-[9px] text-muted-foreground uppercase tracking-wider">{ORBITAL_FEATURES[3].statLabel}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Center: Hero text + Form Card stacked vertically */}
                    <div className="flex flex-col items-center">
                        {/* Hero headline */}
                        <div className="text-center mb-6 animate-fade-up">
                            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-4 text-xs text-muted-foreground">
                                <Sparkles className="w-3.5 h-3.5 text-primary" />
                                AI Visibility Optimization Platform
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-heading font-bold tracking-tight leading-tight">
                                <span className="text-gradient">Master the Age</span>{' '}
                                <span className="text-foreground">of AI Search</span>
                            </h1>
                            <p className="text-muted-foreground text-sm mt-2 max-w-md mx-auto">
                                Get cited by Gemini, ChatGPT & AI Overviews. Optimize for the future of search.
                            </p>
                        </div>

                        {/* Form Card */}
                        <div className="w-full max-w-md animate-fade-up relative group" style={{ animationDelay: '100ms' }}>
                            {/* Glow ring */}
                            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-primary/30 via-primary/10 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]" />

                            <div className="relative glass rounded-2xl shadow-2xl shadow-primary/5 overflow-hidden">
                                <div className="bg-card/50 backdrop-blur-md">
                                    <Outlet />
                                </div>
                            </div>

                            {/* Trust indicators */}
                            <div className="flex items-center justify-center gap-5 mt-4 text-[10px] text-muted-foreground/50">
                                <span className="flex items-center gap-1.5">
                                    <ShieldCheck className="w-3 h-3" /> 256-bit encrypted
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Zap className="w-3 h-3" /> SOC 2 compliant
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Footer ── */}
            <div className="relative z-10 text-center px-6 py-4">
                <p className="text-xs text-muted-foreground/40">
                    © {new Date().getFullYear()} AIVO — AI Visibility Optimization Platform
                </p>
            </div>
        </div>
    )
}
