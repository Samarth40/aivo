import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { DotPattern } from "@/components/ui/dot-pattern"
import { ShieldCheck, Zap, Search, BrainCircuit, Network, BarChart3, Sparkles, TrendingUp, Target, ChevronRight } from 'lucide-react'

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

            {/* Radial vignette */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 100%)' }}
            />

            {/* Subtle grid overlay */}
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
                    {[
                        { icon: Search, label: 'AI Simulation', color: 'text-violet-400' },
                        { icon: BrainCircuit, label: 'Semantic Analysis', color: 'text-blue-400' },
                        { icon: Network, label: 'Knowledge Graphs', color: 'text-emerald-400' },
                    ].map(({ icon: Icon, label, color }) => (
                        <div key={label} className="glass rounded-full px-3.5 py-1.5 flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
                            <Icon className={`w-3.5 h-3.5 ${color}`} />
                            {label}
                        </div>
                    ))}
                </div>
            </nav>

            {/* ── Main Content: 3-Column Flanked Layout ── */}
            <div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-10 py-4">
                <div className="w-full max-w-7xl mx-auto flex items-stretch gap-6 xl:gap-10">

                    {/* ─── Left Column: Brand Story ─── */}
                    <div className="hidden lg:flex flex-col justify-center flex-1 max-w-xs xl:max-w-sm space-y-5 animate-fade-up">
                        {/* Headline block */}
                        <div>
                            <h1 className="text-3xl xl:text-4xl font-heading font-bold tracking-tight leading-tight mb-3">
                                <span className="text-gradient">Master the Age</span>
                                <br />
                                <span className="text-foreground">of AI Search</span>
                            </h1>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Optimize your content for AI answer engines. Get cited by Gemini, AI Overviews & conversational AI systems.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-5">
                            {[
                                { value: '94%', label: 'Score Lift', color: 'text-violet-400' },
                                { value: '6', label: 'AI Engines', color: 'text-blue-400' },
                                { value: '2.4x', label: 'Citations', color: 'text-emerald-400' },
                            ].map((s) => (
                                <div key={s.label}>
                                    <p className={`text-xl font-heading font-bold ${s.color}`}>{s.value}</p>
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{s.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Feature cards — stacked, filling vertical space */}
                        <div className="space-y-2.5">
                            {[
                                { icon: Search, title: 'AI Simulation Engine', desc: 'Predict citation likelihood across AI systems', color: 'text-violet-400', bg: 'bg-violet-500/10' },
                                { icon: BrainCircuit, title: 'Semantic Scoring', desc: 'Measure meaning density, not keywords', color: 'text-blue-400', bg: 'bg-blue-500/10' },
                                { icon: Network, title: 'Knowledge Graphs', desc: 'Map entities for crystal-clear interpretability', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                            ].map((f) => (
                                <div key={f.title} className="glass rounded-xl px-4 py-3 flex items-center gap-3 hover:bg-white/[0.04] transition-all group cursor-default">
                                    <div className={`w-9 h-9 rounded-lg ${f.bg} flex items-center justify-center flex-shrink-0`}>
                                        <f.icon className={`w-4 h-4 ${f.color}`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-foreground/90">{f.title}</p>
                                        <p className="text-[11px] text-muted-foreground truncate">{f.desc}</p>
                                    </div>
                                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-muted-foreground transition-colors flex-shrink-0" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ─── Center: Form Card ─── */}
                    <div className="flex flex-col items-center justify-center w-full lg:w-auto lg:min-w-[420px] xl:min-w-[440px]">
                        {/* Pill badge — mobile only */}
                        <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-4 text-xs text-muted-foreground animate-fade-up lg:hidden">
                            <Sparkles className="w-3.5 h-3.5 text-primary" />
                            AI Visibility Optimization Platform
                        </div>

                        {/* Mobile headline */}
                        <div className="text-center mb-4 lg:hidden animate-fade-up">
                            <h1 className="text-2xl sm:text-3xl font-heading font-bold tracking-tight leading-tight">
                                <span className="text-gradient">Master the Age</span>{' '}
                                <span className="text-foreground">of AI Search</span>
                            </h1>
                        </div>

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

                    {/* ─── Right Column: Social Proof + Why AIVO ─── */}
                    <div className="hidden lg:flex flex-col justify-center flex-1 max-w-xs xl:max-w-sm space-y-5 animate-fade-up" style={{ animationDelay: '200ms' }}>

                        {/* Why AIVO section */}
                        <div className="glass rounded-xl p-5">
                            <div className="flex items-center gap-2 mb-3">
                                <Sparkles className="w-4 h-4 text-primary" />
                                <span className="text-sm font-semibold text-foreground">Why AIVO?</span>
                            </div>
                            <div className="space-y-3">
                                {[
                                    { icon: Target, text: 'Only platform built for AI-era SEO', color: 'text-violet-400' },
                                    { icon: TrendingUp, text: 'Average 94% improvement in AI visibility', color: 'text-emerald-400' },
                                    { icon: BarChart3, text: 'Real-time scoring across 6+ AI engines', color: 'text-blue-400' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-2.5">
                                        <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
                                        </div>
                                        <p className="text-xs text-muted-foreground leading-relaxed">{item.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Testimonial card */}
                        <div className="glass rounded-xl p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/30 to-violet-500/30 flex items-center justify-center text-xs font-bold text-foreground">
                                    JD
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-foreground/90">John Doe</p>
                                    <p className="text-[10px] text-muted-foreground">Head of SEO, TechCorp</p>
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground/80 leading-relaxed italic">
                                "AIVO helped us achieve 3x more AI citations in just 4 weeks. The semantic scoring engine is a game-changer for modern SEO."
                            </p>
                            <div className="flex items-center gap-0.5 mt-3">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <svg key={i} className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20">
                                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                    </svg>
                                ))}
                            </div>
                        </div>

                        {/* Live activity indicator */}
                        <div className="glass rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-2.5">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                                </span>
                                <span className="text-xs font-medium text-foreground/80">Live Platform Stats</span>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { label: 'Analyses today', value: '12,847' },
                                    { label: 'Active users', value: '3,421' },
                                    { label: 'Avg. score lift', value: '+94%' },
                                    { label: 'Domains tracked', value: '8,500+' },
                                ].map((s) => (
                                    <div key={s.label}>
                                        <p className="text-sm font-bold text-foreground">{s.value}</p>
                                        <p className="text-[9px] text-muted-foreground uppercase tracking-wider">{s.label}</p>
                                    </div>
                                ))}
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
