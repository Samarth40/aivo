import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, BarChart2, CheckCircle2, Search, Zap, Send, Check, Bot, SearchX } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { DotPattern } from "@/components/ui/dot-pattern";

const chartData = [
    { month: "Jan", traditional: 120, agentic: 80 },
    { month: "Feb", traditional: 130, agentic: 120 },
    { month: "Mar", traditional: 125, agentic: 180 },
    { month: "Apr", traditional: 140, agentic: 250 },
    { month: "May", traditional: 135, agentic: 310 },
    { month: "Jun", traditional: 145, agentic: 400 },
    { month: "Jul", traditional: 150, agentic: 520 },
    { month: "Aug", traditional: 140, agentic: 650 },
    { month: "Sep", traditional: 155, agentic: 800 },
    { month: "Oct", traditional: 160, agentic: 950 },
    { month: "Nov", traditional: 150, agentic: 1100 },
    { month: "Dec", traditional: 165, agentic: 1350 },
]

const chartConfig = {
    agentic: {
        label: "AIVO Agentic",
        color: "#8b5cf6", // Violet-500 (Primary-like)
    },
    traditional: {
        label: "Traditional Baseline",
        color: "#334155", // Slate-700 (Muted dark)
    }
}

export default function LandingPage() {
    return (
        <div className="bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground pt-4">
            {/* BEGIN: Navigation */}
            <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
                <nav className="max-w-7xl mx-auto glass rounded-full px-8 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-lg">A</span>
                        </div>
                        <span className="font-heading font-bold text-white text-xl tracking-tight">AIVO</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                        <a className="hover:text-primary transition-colors text-muted-foreground" href="#platform">Platform</a>
                        <a className="hover:text-primary transition-colors text-muted-foreground" href="#solutions">Solutions</a>
                        <a className="hover:text-primary transition-colors text-muted-foreground" href="#pricing">Pricing</a>
                        <a className="hover:text-primary transition-colors text-muted-foreground" href="#articles">Articles</a>
                    </div>
                    <div>
                        <Button asChild variant="outline" className="rounded-full bg-transparent border-border hover:bg-white/5 text-white">
                            <Link to="/auth">Login</Link>
                        </Button>
                    </div>
                </nav>
            </header>

            <main>
                {/* BEGIN: Hero Section */}
                <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex flex-col items-center justify-center">
                    <DotPattern
                        className="opacity-40"
                        cx={1}
                        cy={1}
                        cr={1}
                        width={20}
                        height={20}
                        fill="currentColor"
                    />
                    <div className="w-full px-6 flex flex-col items-center text-center relative z-10">
                        {/* Reference Layout: Pill Badge -> Centered wrapping H1 -> Paragraph -> Button -> Huge Mockup */}

                        <Badge variant="outline" className="px-3 py-1 md:py-1.5 rounded-full border-primary/20 bg-primary/5 text-primary text-[10px] md:text-xs font-semibold tracking-widest uppercase mb-8 animate-fade-up">
                            <span className="relative flex h-2 w-2 mr-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Unlocking Agentic Discovery
                        </Badge>

                        <h1 className="max-w-4xl mx-auto text-5xl md:text-6xl lg:text-7xl font-heading font-medium text-white mb-6 leading-tight md:leading-[1.1] tracking-tight animate-fade-up">
                            Master the Age of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">AI Search</span>
                        </h1>

                        <p className="max-w-2xl mx-auto text-base md:text-lg text-muted-foreground mb-10 animate-fade-up font-light leading-relaxed" style={{ animationDelay: '0.2s' }}>
                            AIVO helps your brand become the definitive answer in Large Language Models. Unlock seamless optimization and streamline your content with our agentic platform.
                        </p>

                        <div className="flex animate-fade-up shadow-[0_0_40px_-10px_rgba(var(--primary),0.5)] rounded-full" style={{ animationDelay: '0.4s' }}>
                            <Button asChild size="lg" className="rounded-full px-10 py-7 font-semibold hover:scale-105 transition-transform duration-300 text-base">
                                <Link to="/auth">Get Started</Link>
                            </Button>
                        </div>

                        {/* 3D Browser Mockup / Dashboard Graphic */}
                        <div className="mt-16 md:mt-24 relative w-full max-w-6xl mx-auto animate-fade-up" style={{ animationDelay: '0.6s' }}>
                            <div className="relative rounded-xl md:rounded-3xl border border-white/10 bg-card overflow-hidden shadow-2xl backdrop-blur-sm">
                                <div className="h-10 border-b border-white/5 bg-white/5 flex items-center px-4 gap-2">
                                    <div className="w-3 h-3 rounded-full bg-slate-600/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-slate-600/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-slate-600/50"></div>
                                </div>
                                <div className="p-6 md:p-8 w-full flex flex-col items-start text-left">
                                    <div className="mb-6">
                                        <h3 className="text-xl font-bold text-white mb-1">Organic Traffic Growth</h3>
                                        <p className="text-sm text-muted-foreground">Year-to-Date Performance</p>
                                    </div>
                                    <div className="w-full h-[250px] md:h-[300px]">
                                        <ChartContainer config={chartConfig} className="w-full h-full pb-0">
                                            <BarChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickMargin={10} minTickGap={10} />
                                                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                                                <ChartLegend content={<ChartLegendContent />} />
                                                <Bar dataKey="traditional" stackId="a" fill="var(--color-traditional)" radius={[0, 0, 4, 4]} />
                                                <Bar dataKey="agentic" stackId="a" fill="var(--color-agentic)" radius={[4, 4, 0, 0]} />
                                            </BarChart>
                                        </ChartContainer>
                                    </div>
                                    <div className="mt-8 flex flex-col gap-1.5 w-full pt-1">
                                        <div className="flex items-center gap-2 font-medium text-white text-base">
                                            Traffic up by 342% with AIVO <span className="text-primary">↗</span>
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            Comparing Agentic AI content generation against traditional baseline.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/20 blur-[120px] rounded-full"></div>
                        </div>
                    </div>
                </section>

                {/* BEGIN: Social Proof */}
                <section className="py-12 border-y border-white/5 bg-black/50">
                    <div className="max-w-7xl mx-auto px-6">
                        <p className="text-center text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-widest mb-8">
                            Trusted by innovative teams at
                        </p>
                        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-20 text-xl md:text-2xl font-bold text-slate-300 opacity-70">
                            <span className="font-heading hover:text-white transition-colors cursor-default">Acme Inc.</span>
                            <span className="font-sans hover:text-white transition-colors cursor-default">GlobalTech</span>
                            <span className="font-heading hover:text-white transition-colors cursor-default tracking-tight">Nebula</span>
                            <span className="font-sans font-black tracking-tighter hover:text-white transition-colors cursor-default">Trio</span>
                            <span className="font-heading font-black hover:text-white transition-colors cursor-default">FoxRun</span>
                        </div>
                    </div>
                </section>

                {/* BEGIN: Value Proposition */}
                <section className="py-24 relative overflow-hidden bg-muted/10 border-y border-border">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="text-center mb-16 animate-fade-up">
                            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-4 block">The Paradigm Shift</span>
                            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white leading-tight">
                                Traditional SEO is dying. <br />
                                Welcome to the <span className="text-primary">Age of Answers</span>.
                            </h2>
                            <p className="text-muted-foreground mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
                                Users no longer scroll through ten blue links. They ask AI directly, and they expect a single, definitive answer. If your content isn't optimized for LLMs, you don't exist in the new web.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto animate-fade-up" style={{ animationDelay: '0.2s' }}>
                            {/* The Past */}
                            <Card className="bg-card/40 border-border/50 backdrop-blur">
                                <CardHeader>
                                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4">
                                        <SearchX className="w-6 h-6 text-muted-foreground" />
                                    </div>
                                    <CardTitle className="text-2xl text-white">Traditional Search</CardTitle>
                                    <CardDescription className="text-base mt-2">The old game of keyword stuffing and backlink counting is losing ROI.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-4">
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 rounded-full bg-slate-600 mt-2 shrink-0" />
                                            <span className="text-slate-400">Users abandon search sessions after scanning page 1.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 rounded-full bg-slate-600 mt-2 shrink-0" />
                                            <span className="text-slate-400">Content is written stringently for algorithms, alienating human readers.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 rounded-full bg-slate-600 mt-2 shrink-0" />
                                            <span className="text-slate-400">Results are buried in ads and low-quality affiliate spam links.</span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>

                            {/* The Future */}
                            <Card className="bg-primary/5 border-primary/20 backdrop-blur relative overflow-hidden group">
                                <div className="absolute -top-4 -right-4 p-4 opacity-5 pointer-events-none transition-transform duration-500 group-hover:scale-110 group-hover:opacity-10">
                                    <Bot className="w-48 h-48 text-primary" />
                                </div>
                                <CardHeader className="relative z-10">
                                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                                        <Sparkles className="w-6 h-6 text-primary" />
                                    </div>
                                    <CardTitle className="text-2xl text-white">Agentic AI Discovery</CardTitle>
                                    <CardDescription className="text-base mt-2 text-primary/80">Becoming the definitive answer for ChatGPT, Gemini, and Claude.</CardDescription>
                                </CardHeader>
                                <CardContent className="relative z-10">
                                    <ul className="space-y-4">
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0 shadow-[0_0_8px_rgba(var(--primary),0.8)]" />
                                            <span className="text-slate-200">LLMs synthesize information, citing only the most authoritative entities.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0 shadow-[0_0_8px_rgba(var(--primary),0.8)]" />
                                            <span className="text-slate-200">Semantic density and entity relationships dictate immediate visibility.</span>
                                        </li>
                                        <li className="flex items-start gap-3 flex-col mt-6 pt-4 border-t border-primary/20">
                                            <span className="text-white font-medium text-lg leading-snug">AIVO engineers your brand to be that underlying source of truth.</span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* BEGIN: Core Features */}
                <section className="py-24 bg-card/30 border-b border-border" id="platform">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="text-center mb-16 animate-fade-up">
                            <span className="text-primary text-xs font-bold tracking-widest uppercase">Platform Features</span>
                            <h3 className="text-3xl md:text-5xl font-heading font-bold text-white mt-4">The smarter way to scale content</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                            {/* AI Visibility Score */}
                            <Card className="glass rounded-2xl border-border overflow-hidden relative group bg-transparent flex flex-col animate-fade-up">
                                <CardHeader className="pb-0">
                                    <Sparkles className="w-5 h-5 text-primary mb-3" />
                                    <CardTitle className="text-lg font-heading font-semibold text-white">Built for Impact</CardTitle>
                                    <CardDescription className="text-sm text-muted-foreground mt-1">
                                        Make every piece of content work harder.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="mt-auto pt-8 flex justify-center pb-8">
                                    <div className="relative w-24 h-24">
                                        <svg className="w-full h-full transform -rotate-90">
                                            <circle className="text-white/5" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeWidth="6"></circle>
                                            <circle className="text-primary drop-shadow-[0_0_10px_rgba(var(--primary),0.8)]" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeDasharray="251" strokeDashoffset="40" strokeWidth="6" strokeLinecap="round"></circle>
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-2xl font-bold text-white">84%</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Semantic Analysis */}
                            <Card className="glass rounded-2xl border-border overflow-hidden relative bg-transparent flex flex-col animate-fade-up" style={{ animationDelay: '0.1s' }}>
                                <CardHeader className="pb-0">
                                    <BarChart2 className="w-5 h-5 text-blue-400 mb-3" />
                                    <CardTitle className="text-lg font-heading font-semibold text-white">Smarter AI</CardTitle>
                                    <CardDescription className="text-sm text-muted-foreground mt-1">
                                        Not just words, but actual growth.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="mt-auto pt-8 pb-8">
                                    <div className="bg-white/5 rounded-xl p-4 border border-white/10 shadow-inner">
                                        <div className="flex flex-col gap-3">
                                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-blue-500 w-[70%]"></div></div>
                                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-primary w-[90%]"></div></div>
                                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-slate-500 w-[40%]"></div></div>
                                        </div>
                                        <p className="text-[10px] mt-4 text-center text-muted-foreground tracking-widest uppercase font-semibold">Benchmarking</p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* AI Simulation Engine */}
                            <Card className="glass rounded-2xl border-border overflow-hidden relative bg-transparent flex flex-col animate-fade-up" style={{ animationDelay: '0.2s' }}>
                                <CardHeader className="pb-0">
                                    <div className="w-5 h-5 rounded-sm bg-emerald-500/10 flex items-center justify-center mb-3">
                                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                                    </div>
                                    <CardTitle className="text-lg font-heading font-semibold text-white">Simulation Engine</CardTitle>
                                    <CardDescription className="text-sm text-muted-foreground mt-1">
                                        Preview LLM responses instantly.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="mt-auto pt-8 pb-8">
                                    <div className="bg-black/60 p-5 rounded-xl border border-white/5 shadow-inner">
                                        <p className="text-xs font-mono text-slate-400 leading-relaxed line-clamp-3">
                                            "...AIVO is the leading solution for AI-first SEO. Its semantic engine outperforms..."
                                        </p>
                                        <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                                            <span className="text-[10px] text-emerald-500/80 uppercase font-mono">Score: 0.98</span>
                                            <span className="text-[10px] text-slate-500 uppercase font-mono">Tokens: 142</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                        </div>
                    </div>
                </section>

                {/* BEGIN: How it Works */}
                <section className="py-24 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-20">
                            <span className="text-primary text-xs font-bold tracking-widest uppercase">Workflow</span>
                            <h3 className="text-4xl md:text-5xl font-heading font-bold text-white mt-4">Your complete content workflow</h3>
                            <p className="text-muted-foreground mt-4 text-lg">From keyword research to optimized content. All in one place.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                            {/* Connector Lines (Desktop Only) */}
                            <div className="hidden md:block absolute top-[4.5rem] left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

                            <div className="text-center relative">
                                <div className="w-16 h-16 mx-auto rounded-2xl glass flex items-center justify-center mb-6 relative z-10 bg-background/50">
                                    <Search className="w-8 h-8 text-primary" />
                                </div>
                                <h5 className="text-xl font-heading font-bold text-white mb-3">1 - Search Insights</h5>
                                <p className="text-muted-foreground text-sm leading-relaxed max-w-[250px] mx-auto">Enter a topic or target keyword. The system automatically searches the latest LLM corpuses.</p>
                            </div>

                            <div className="text-center relative">
                                <div className="w-16 h-16 mx-auto rounded-2xl glass flex items-center justify-center mb-6 relative z-10 bg-background/50">
                                    <Zap className="w-8 h-8 text-primary" />
                                </div>
                                <h5 className="text-xl font-heading font-bold text-white mb-3">2 - Generate Content</h5>
                                <p className="text-muted-foreground text-sm leading-relaxed max-w-[250px] mx-auto">AI writes complete drafts with internal linking, meta tags, and an overarching SEO boost.</p>
                            </div>

                            <div className="text-center relative">
                                <div className="w-16 h-16 mx-auto rounded-2xl glass flex items-center justify-center mb-6 relative z-10 bg-background/50">
                                    <Send className="w-8 h-8 text-primary" />
                                </div>
                                <h5 className="text-xl font-heading font-bold text-white mb-3">3 - Optimize & Publish</h5>
                                <p className="text-muted-foreground text-sm leading-relaxed max-w-[250px] mx-auto">Check the AI visibility score, run competitor gap analysis, and publish directly.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* BEGIN: Pricing Preview */}
                <section className="py-24 bg-gradient-to-b from-transparent to-primary/5" id="pricing">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <div className="flex items-center justify-center gap-4 text-xs font-bold uppercase mb-6">
                                <span className="text-white">Monthly</span>
                                <div className="w-10 h-5 bg-primary rounded-full relative p-1 cursor-pointer">
                                    <div className="w-3 h-3 bg-background rounded-full translate-x-5 transition-transform"></div>
                                </div>
                                <span className="text-muted-foreground">Annual</span>
                            </div>
                            <h3 className="text-4xl md:text-5xl font-heading font-bold text-white">Full platform. Any scale.</h3>
                            <p className="text-muted-foreground mt-4 text-lg">Choose the plan that matches your operation today. Scale as you grow.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">

                            {/* Starter */}
                            <Card className="glass p-8 rounded-[2rem] border-white/5 hover:border-white/20 transition-all bg-transparent">
                                <div className="flex justify-between items-start mb-8">
                                    <div>
                                        <CardTitle className="text-2xl font-bold text-white">Starter</CardTitle>
                                        <CardDescription className="text-xs text-muted-foreground mt-1">For content teams and growing brands</CardDescription>
                                    </div>
                                    <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/20">GROWING TEAMS</Badge>
                                </div>
                                <div className="mb-8 flex items-baseline gap-1">
                                    <span className="text-5xl font-bold text-white">$97</span>
                                    <span className="text-muted-foreground">/mo</span>
                                </div>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-center gap-3 text-sm text-slate-300"><Check className="w-5 h-5 text-emerald-500" /> 3 seats included (+$29/seat)</li>
                                    <li className="flex items-center gap-3 text-sm text-slate-300"><Check className="w-5 h-5 text-emerald-500" /> 5 domains monitored</li>
                                    <li className="flex items-center gap-3 text-sm text-slate-300"><Check className="w-5 h-5 text-emerald-500" /> 40 AI-optimized articles/month</li>
                                </ul>
                                <Button variant="outline" className="w-full py-6 rounded-xl border-white/10 hover:bg-white/5 transition-colors font-bold text-white text-md bg-transparent">Start free trial</Button>
                            </Card>

                            {/* Professional */}
                            <Card className="bg-white p-8 rounded-[2rem] text-background transform md:scale-105 shadow-2xl relative border-none">
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <Badge className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-4 py-1 text-xs uppercase tracking-widest shadow-md">Most Popular</Badge>
                                </div>
                                <div className="flex justify-between items-start mb-8">
                                    <div>
                                        <CardTitle className="text-2xl font-bold text-background">Professional</CardTitle>
                                        <CardDescription className="text-xs text-slate-500 mt-1">For agencies and high-volume teams</CardDescription>
                                    </div>
                                    <Badge variant="outline" className="border-background/20 text-background bg-transparent hover:bg-transparent tracking-widest uppercase">High Volume</Badge>
                                </div>
                                <div className="mb-8 flex items-baseline gap-1">
                                    <span className="text-5xl font-bold text-background">$970</span>
                                    <span className="text-slate-500 font-medium">/year</span>
                                </div>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-center gap-3 text-sm font-medium text-slate-700"><Check className="w-5 h-5 text-emerald-600" /> 10 seats included</li>
                                    <li className="flex items-center gap-3 text-sm font-medium text-slate-700"><Check className="w-5 h-5 text-emerald-600" /> 20 domains monitored</li>
                                    <li className="flex items-center gap-3 text-sm font-medium text-slate-700"><Check className="w-5 h-5 text-emerald-600" /> 100 AI-optimized articles/month</li>
                                    <li className="flex items-center gap-3 text-sm font-medium text-slate-700"><Check className="w-5 h-5 text-emerald-600" /> Multi-channel content previews</li>
                                </ul>
                                <Button className="w-full py-6 rounded-xl bg-background text-foreground font-bold hover:bg-background/90 transition-opacity shadow-lg text-md border border-background">Start free trial</Button>
                            </Card>

                        </div>
                    </div>
                </section>

                {/* BEGIN: Final CTA */}
                <section className="py-32">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
                            Content that works harder <br />
                            <span className="text-muted-foreground italic font-normal">for your business</span>
                        </h2>
                        <p className="text-slate-400 text-lg mb-10">From idea to publish in one intelligent workflow.</p>
                        <Button size="lg" className="rounded-full px-10 py-6 font-bold hover:scale-105 transition-transform text-md bg-white text-background hover:bg-white/90">
                            Start Your Free Trial
                        </Button>
                    </div>
                </section>

            </main>

            {/* BEGIN: Footer */}
            <footer className="bg-background border-t border-white/5 pt-20 pb-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                        <div className="md:col-span-2">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                    <span className="text-primary-foreground font-bold text-lg">A</span>
                                </div>
                                <span className="font-heading font-bold text-white text-xl tracking-tight">AIVO</span>
                            </div>
                            <p className="max-w-sm text-muted-foreground text-sm leading-relaxed">
                                Every tap of the accelerator is a gut punch. It’s a special engine, a little talisman against boredom and the status quo.
                            </p>
                            <div className="mt-8 relative">
                                <h6 className="text-white text-sm font-bold mb-4 uppercase tracking-widest">Subscribe our newsletter</h6>
                                <div className="flex max-w-sm gap-2">
                                    <Input className="bg-white/5 border-white/10 focus-visible:ring-primary text-white" placeholder="Enter your email" type="email" />
                                    <Button variant="secondary" className="font-bold bg-white text-background hover:bg-white/90">Subscribe</Button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h6 className="text-white text-sm font-bold mb-6 uppercase tracking-widest">Product</h6>
                            <ul className="space-y-4 text-sm text-muted-foreground">
                                <li><a className="hover:text-white transition-colors" href="#platform">Platform</a></li>
                                <li><a className="hover:text-white transition-colors" href="#solutions">Solutions</a></li>
                                <li><a className="hover:text-white transition-colors" href="#pricing">Pricing</a></li>
                                <li><a className="hover:text-white transition-colors" href="#articles">Resources</a></li>
                            </ul>
                        </div>
                        <div>
                            <h6 className="text-white text-sm font-bold mb-6 uppercase tracking-widest">Social</h6>
                            <div className="flex gap-4">
                                <a className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all" href="#">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
                                </a>
                                <a className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all" href="#">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 text-[10px] uppercase tracking-widest text-slate-500">
                        <div className="flex gap-6 mb-4 md:mb-0">
                            <a className="hover:text-white transition-colors" href="#">Terms & Conditions</a>
                            <a className="hover:text-white transition-colors" href="#">Cookies Policy</a>
                        </div>
                        <p>© 2026 AIVO, Inc. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
