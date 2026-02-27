import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, TrendingUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DotPattern } from "@/components/ui/dot-pattern";

// ─── Case Study Data ────────────────────────────────────────────────────────
const caseStudies = [
    {
        slug: 'globaltech',
        company: 'GlobalTech',
        logo: 'G',
        industry: 'B2B SaaS',
        metric: 'Traffic up 342%',
        metricValue: '+342%',
        description: 'GlobalTech transformed their developer documentation into the most-cited resource in their category.',
        tags: ['AI Visibility', 'Content Strategy'],
        color: 'from-blue-500/20 to-cyan-500/20',
    },
    {
        slug: 'nebula-media',
        company: 'Nebula Media',
        logo: 'N',
        industry: 'Publishers',
        metric: 'AI Citations 5.2x',
        metricValue: '5.2x',
        description: 'Nebula reclaimed editorial traffic by restructuring 200+ articles for AI readability.',
        tags: ['Entity Optimization', 'Competitor Analysis'],
        color: 'from-purple-500/20 to-pink-500/20',
    },
    {
        slug: 'foxrun-commerce',
        company: 'FoxRun Commerce',
        logo: 'F',
        industry: 'E-commerce',
        metric: 'Revenue +$2.4M',
        metricValue: '+$2.4M',
        description: 'FoxRun\'s product pages became the top AI recommendation across 140 transactional queries.',
        tags: ['Product Optimization', 'Transactional Intent'],
        color: 'from-amber-500/20 to-orange-500/20',
    },
    {
        slug: 'trio-health',
        company: 'Trio Health',
        logo: 'T',
        industry: 'Healthcare',
        metric: 'Visibility Score 94%',
        metricValue: '94%',
        description: 'Trio Health\'s patient education content achieved the highest AIVO score in the healthcare vertical.',
        tags: ['Healthcare', 'Semantic Scoring'],
        color: 'from-emerald-500/20 to-teal-500/20',
    },
    {
        slug: 'aivo-inc',
        company: 'AIVO Inc.',
        logo: 'A',
        industry: 'B2B SaaS',
        metric: 'Demo requests +267%',
        metricValue: '+267%',
        description: 'We used our own platform to optimize AIVO\'s marketing site — and the results speak for themselves.',
        tags: ['Thought Leadership', 'Self-Optimized'],
        color: 'from-violet-500/20 to-indigo-500/20',
    },
    {
        slug: 'daily-chronicle',
        company: 'The Daily Chronicle',
        logo: 'D',
        industry: 'Publishers',
        metric: 'Click-throughs +215%',
        metricValue: '+215%',
        description: 'The Daily Chronicle reversed a 2-year decline in organic traffic within 6 weeks of using AIVO.',
        tags: ['Content Structure', 'Citation Recovery'],
        color: 'from-rose-500/20 to-red-500/20',
    },
    {
        slug: 'techgear-pro',
        company: 'TechGear Pro',
        logo: 'T',
        industry: 'E-commerce',
        metric: 'Ad spend -35%',
        metricValue: '-35%',
        description: 'TechGear Pro cut paid search spend by 35% while growing AI-driven product recommendations by 4.7x.',
        tags: ['Cost Reduction', 'Product Intelligence'],
        color: 'from-sky-500/20 to-blue-500/20',
    },
    {
        slug: 'cloudsync-analytics',
        company: 'CloudSync Analytics',
        logo: 'C',
        industry: 'B2B SaaS',
        metric: 'Category authority #1',
        metricValue: '#1',
        description: 'CloudSync went from page-2 obscurity to the most-cited analytics platform in under 3 months.',
        tags: ['Authority Building', 'Competitive Intelligence'],
        color: 'from-indigo-500/20 to-purple-500/20',
    },
];

const industries = ['All', 'Publishers', 'E-commerce', 'B2B SaaS', 'Healthcare'];

export default function Customers() {
    const [activeFilter, setActiveFilter] = useState('All');

    const filtered = activeFilter === 'All'
        ? caseStudies
        : caseStudies.filter(cs => cs.industry === activeFilter);

    return (
        <div className="bg-background text-foreground font-sans pt-4">

            {/* Hero */}
            <section className="relative pt-32 pb-16 md:pt-44 md:pb-20 overflow-hidden">
                <DotPattern
                    className="opacity-25"
                    cx={1} cy={1} cr={1}
                    width={20} height={20}
                    fill="currentColor"
                />
                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <Badge variant="outline" className="px-3 py-1 rounded-full border-primary/20 bg-primary/5 text-primary text-[10px] font-semibold tracking-widest uppercase mb-6 animate-fade-up">
                        Customer Success
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4 leading-tight animate-fade-up">
                        Trusted by teams that{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">own AI search</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-up font-light" style={{ animationDelay: '0.2s' }}>
                        See how leading brands use AIVO to reclaim visibility, drive conversions, and become the definitive answer in AI-powered search.
                    </p>
                </div>
            </section>

            {/* Filter Pills */}
            <section className="pb-12 px-6">
                <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-3">
                    {industries.map((industry) => (
                        <button
                            key={industry}
                            onClick={() => setActiveFilter(industry)}
                            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer border ${activeFilter === industry
                                ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20'
                                : 'bg-transparent text-muted-foreground border-white/10 hover:border-white/20 hover:text-white'
                                }`}
                        >
                            {industry}
                        </button>
                    ))}
                </div>
            </section>

            {/* Masonry Grid */}
            <section className="pb-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        <AnimatePresence mode="popLayout">
                            {filtered.map((cs, i) => (
                                <motion.div
                                    key={cs.slug}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3, delay: i * 0.05 }}
                                    className=""
                                >
                                    <Link
                                        to={`/customers/${cs.slug}`}
                                        className="block h-[280px] glass rounded-2xl border-white/5 hover:border-primary/20 transition-all duration-300 overflow-hidden group"
                                    >
                                        {/* Gradient Header */}
                                        <div className={`h-20 bg-gradient-to-br ${cs.color} relative flex items-center justify-center`}>
                                            <span className="text-4xl font-heading font-bold text-white/20 group-hover:text-white/40 transition-colors select-none">
                                                {cs.logo}
                                            </span>
                                            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <ArrowUpRight className="w-5 h-5 text-white/60" />
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-5">
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <h3 className="text-base font-heading font-bold text-white group-hover:text-primary transition-colors">{cs.company}</h3>
                                                    <span className="text-xs text-muted-foreground">{cs.industry}</span>
                                                </div>
                                                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/10 text-xs shrink-0">
                                                    <TrendingUp className="w-3 h-3 mr-1" />
                                                    {cs.metricValue}
                                                </Badge>
                                            </div>

                                            <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">{cs.description}</p>

                                            <div className="flex flex-wrap gap-2">
                                                {cs.tags.map((tag) => (
                                                    <span key={tag} className="text-[10px] px-2 py-1 rounded-full bg-white/5 text-slate-400 font-medium uppercase tracking-wide">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-gradient-to-t from-primary/5 to-transparent border-t border-white/5">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
                        Your success story starts here
                    </h2>
                    <p className="text-muted-foreground text-lg mb-8">Join the brands that are winning in AI-powered search. Start your free trial today.</p>
                    <Button asChild size="lg" className="rounded-full px-10 py-7 font-bold hover:scale-105 transition-transform text-base shadow-[0_0_40px_-10px_rgba(var(--primary),0.5)]">
                        <Link to="/auth">Get Started Free</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
