import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { DotPattern } from "@/components/ui/dot-pattern"
import { Separator } from "@/components/ui/separator"
import { BrainCircuit, Network, Search, ShieldCheck, Zap, BarChart3 } from 'lucide-react'

const FEATURES = [
    { icon: Search, label: 'AI Simulation' },
    { icon: BrainCircuit, label: 'Semantic Scoring' },
    { icon: Network, label: 'Knowledge Graphs' },
]

export default function AuthLayout() {
    return (
        <div className="relative min-h-screen flex items-center justify-center bg-background text-foreground font-sans overflow-hidden">

            {/* ── Background Layers ── */}
            <DotPattern
                className="opacity-25"
                cx={1} cy={1} cr={1}
                width={22} height={22}
                fill="currentColor"
            />

            {/* Gradient orbs */}
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/20 blur-[180px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
            <div className="absolute bottom-[-15%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/15 blur-[160px] pointer-events-none animate-pulse" style={{ animationDuration: '12s' }} />
            <div className="absolute top-[30%] left-[50%] w-[350px] h-[350px] rounded-full bg-primary/6 blur-[130px] pointer-events-none animate-pulse" style={{ animationDuration: '10s' }} />

            {/* Radial vignette */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)' }}
            />

            {/* ── Header ── */}
            <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-8 py-5">
                <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
                    <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/30">
                        <span className="text-primary-foreground font-bold text-xl">A</span>
                    </div>
                    <span className="font-heading font-bold text-white text-2xl tracking-tight">AIVO</span>
                </Link>

                <div className="hidden md:flex items-center gap-2">
                    {FEATURES.map(({ icon: Icon, label }) => (
                        <div key={label} className="glass rounded-full px-3.5 py-1.5 flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
                            <Icon className="w-3.5 h-3.5 text-primary" />
                            {label}
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Main Content: Two-Column Blended ── */}
            <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

                {/* Left: Brand Story — blends naturally, no hard boundary */}
                <div className="flex-1 max-w-md text-center lg:text-left animate-fade-up">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold tracking-tight leading-tight mb-4">
                        <span className="text-gradient">Master the Age</span>
                        <br />
                        <span className="text-foreground">of AI Search</span>
                    </h1>
                    <p className="text-muted-foreground text-sm lg:text-base leading-relaxed mb-8">
                        Optimize your content for AI answer engines. Get cited by Gemini, AI Overviews & conversational AI systems.
                    </p>

                    {/* Stats row */}
                    <div className="hidden lg:flex items-center gap-6 mb-8">
                        <div>
                            <p className="text-2xl font-heading font-bold text-foreground">94<span className="text-primary">%</span></p>
                            <p className="text-[11px] text-muted-foreground">Avg. Score Lift</p>
                        </div>
                        <Separator orientation="vertical" className="h-10 bg-border/20" />
                        <div>
                            <p className="text-2xl font-heading font-bold text-foreground">6</p>
                            <p className="text-[11px] text-muted-foreground">AI Engines</p>
                        </div>
                        <Separator orientation="vertical" className="h-10 bg-border/20" />
                        <div>
                            <p className="text-2xl font-heading font-bold text-foreground">2.4<span className="text-primary">x</span></p>
                            <p className="text-[11px] text-muted-foreground">Citation Rate</p>
                        </div>
                    </div>

                    {/* Feature mini-cards */}
                    <div className="hidden lg:flex flex-col gap-3">
                        {[
                            { icon: Search, title: 'AI Simulation Engine', desc: 'Estimate citation likelihood across AI systems', color: 'text-primary', bg: 'bg-primary/10' },
                            { icon: BarChart3, title: 'Semantic Scoring', desc: 'Measure meaning density, not keyword frequency', color: 'text-blue-400', bg: 'bg-blue-500/10' },
                            { icon: Network, title: 'Knowledge Graphs', desc: 'Map entities for crystal-clear interpretability', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                        ].map((f) => (
                            <div key={f.title} className="flex items-center gap-3 glass rounded-xl px-4 py-3 hover:bg-white/[0.03] transition-colors">
                                <div className={`w-9 h-9 rounded-lg ${f.bg} flex items-center justify-center flex-shrink-0`}>
                                    <f.icon className={`w-4 h-4 ${f.color}`} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-foreground/90">{f.title}</p>
                                    <p className="text-[11px] text-muted-foreground">{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Form Card */}
                <div className="w-full max-w-md animate-fade-up relative group" style={{ animationDelay: '150ms' }}>
                    {/* Glow ring */}
                    <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-primary/25 via-primary/8 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]" />

                    <div className="relative glass rounded-2xl shadow-2xl shadow-primary/5 overflow-hidden">
                        <div className="bg-card/50 backdrop-blur-md">
                            <Outlet />
                        </div>
                    </div>

                    {/* Trust indicators below form */}
                    <div className="flex items-center justify-center gap-5 mt-5 text-[10px] text-muted-foreground/50">
                        <span className="flex items-center gap-1.5">
                            <ShieldCheck className="w-3 h-3" /> 256-bit encrypted
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Zap className="w-3 h-3" /> SOC 2 compliant
                        </span>
                    </div>
                </div>
            </div>

            {/* ── Footer ── */}
            <div className="absolute bottom-0 left-0 right-0 z-10 text-center px-6 py-5">
                <p className="text-xs text-muted-foreground/50">
                    © {new Date().getFullYear()} AIVO — AI Visibility Optimization Platform
                </p>
            </div>
        </div>
    )
}
