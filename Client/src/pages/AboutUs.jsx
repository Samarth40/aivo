import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Sparkles,
    Brain,
    Target,
    TrendingUp,
    Users,
    Lightbulb,
    Rocket,
    Award,
    Globe,
    ArrowRight,
} from 'lucide-react';
import { DotPattern } from '@/components/ui/dot-pattern';

const teamMembers = [
    {
        name: 'Prof. Ashvini Bamanikar',
        role: 'Project Advisor',
        bio: 'Assistant Professor at PDEA\'s College of Engineering with deep expertise in AI/ML systems and web technologies. Guides the AIVO vision from research to production.',
        avatar: 'AB',
        color: 'from-violet-500 to-purple-600',
    },
    {
        name: 'Samarth Shinde',
        role: 'Lead Developer',
        bio: 'Full-stack engineer driving AIVO\'s core architecture. Specializes in building scalable AI-powered SaaS platforms and NLP pipeline design.',
        avatar: 'SS',
        color: 'from-blue-500 to-cyan-500',
    },
    {
        name: 'Sakshi Pawar',
        role: 'Frontend Engineer',
        bio: 'Crafts the premium user experience and interactive dashboards that make complex AI analytics intuitive and delightful.',
        avatar: 'SP',
        color: 'from-pink-500 to-rose-500',
    },
    {
        name: 'Sagar Wavhal',
        role: 'ML Engineer',
        bio: 'Builds the AI simulation and semantic scoring engines. Expert in transformer architectures and vector embeddings for content analysis.',
        avatar: 'SW',
        color: 'from-emerald-500 to-teal-500',
    },
    {
        name: 'Rohit Gajbhiye',
        role: 'Backend Engineer',
        bio: 'Architects the API gateway and microservices layer. Ensures AIVO\'s infrastructure is resilient, secure, and blazing fast.',
        avatar: 'RG',
        color: 'from-amber-500 to-orange-500',
    },
];

const timeline = [
    {
        date: 'Q1 2025',
        title: 'The Insight',
        description: 'Recognized that AI answer engines were fundamentally changing how content gets discovered — traditional SEO was becoming insufficient.',
        icon: Lightbulb,
    },
    {
        date: 'Q2 2025',
        title: 'Research & Validation',
        description: 'Published the foundational research paper on AI Visibility Optimization, validating the gap between SEO and AI content interpretability.',
        icon: Brain,
    },
    {
        date: 'Q3 2025',
        title: 'Architecture Design',
        description: 'Designed the 6-engine analysis pipeline: content extraction, semantic scoring, entity graphs, tone analysis, AI simulation, and competitor intelligence.',
        icon: Target,
    },
    {
        date: 'Q4 2025',
        title: 'Platform Development',
        description: 'Built the cloud-native microservices platform with Kubernetes orchestration, Python ML pods, and the React interactive dashboard.',
        icon: Rocket,
    },
    {
        date: 'Q1 2026',
        title: 'Beta Launch',
        description: 'Opened AIVO to early adopters. Initial users reported measurable improvements in AI visibility scores and content citation rates.',
        icon: Award,
    },
    {
        date: 'Q2 2026',
        title: 'Global Expansion',
        description: 'Scaling to support multilingual optimization, multimodal content analysis, and real-time trend monitoring for enterprise clients worldwide.',
        icon: Globe,
    },
];

const pillars = [
    {
        icon: Brain,
        title: 'Semantic Intelligence',
        description: 'Beyond keywords — we measure whether your content truly answers user intent through deep semantic analysis.',
    },
    {
        icon: Target,
        title: 'Entity Coherence',
        description: 'Ensure every concept is explicitly defined, consistently named, and logically connected for AI interpretability.',
    },
    {
        icon: TrendingUp,
        title: 'AI Simulation',
        description: 'Preview how answer engines see your content before publishing. Optimize for selection, not just ranking.',
    },
];

function TeamCard({ member }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="group relative rounded-2xl overflow-hidden cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Card className="bg-card/40 border-border/50 backdrop-blur h-full">
                <CardContent className="p-8 flex flex-col items-center text-center relative min-h-[280px] justify-center">
                    {/* Avatar */}
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                        <span className="text-white font-bold text-2xl font-heading">{member.avatar}</span>
                    </div>
                    <h4 className="text-lg font-heading font-bold text-white mb-1">{member.name}</h4>
                    <p className="text-primary text-sm font-medium">{member.role}</p>

                    {/* Hover Bio Overlay */}
                    <div
                        className={`absolute inset-0 bg-gradient-to-t from-background via-background/95 to-background/80 backdrop-blur-sm flex items-center justify-center p-6 transition-all duration-500 ${
                            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                        }`}
                    >
                        <div className="text-center">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${member.color} flex items-center justify-center mx-auto mb-4`}>
                                <span className="text-white font-bold text-lg font-heading">{member.avatar}</span>
                            </div>
                            <h4 className="text-base font-heading font-bold text-white mb-1">{member.name}</h4>
                            <p className="text-primary text-xs font-medium mb-3">{member.role}</p>
                            <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default function AboutUs() {
    return (
        <div className="bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground pt-4">
            <main>
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 md:pt-48 md:pb-28 overflow-hidden flex flex-col items-center justify-center">
                    <DotPattern
                        className="opacity-30"
                        cx={1} cy={1} cr={1}
                        width={20} height={20}
                        fill="currentColor"
                    />
                    <div className="w-full px-6 flex flex-col items-center text-center relative z-10">
                        <Badge variant="outline" className="px-3 py-1 md:py-1.5 rounded-full border-primary/20 bg-primary/5 text-primary text-[10px] md:text-xs font-semibold tracking-widest uppercase mb-8 animate-fade-up">
                            <span className="relative flex h-2 w-2 mr-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            About AIVO
                        </Badge>

                        <h1 className="max-w-4xl mx-auto text-4xl md:text-6xl lg:text-7xl font-heading font-medium text-white mb-6 leading-tight md:leading-[1.1] tracking-tight animate-fade-up">
                            From SEO to{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
                                AI Visibility
                            </span>
                        </h1>

                        <p className="max-w-2xl mx-auto text-base md:text-lg text-muted-foreground mb-10 animate-fade-up font-light leading-relaxed" style={{ animationDelay: '0.2s' }}>
                            Search is no longer about ten blue links. AI answer engines synthesize information from the most structured, semantically clear sources. AIVO ensures your content is the one that gets chosen, quoted, and cited.
                        </p>

                        <div className="flex gap-4 animate-fade-up" style={{ animationDelay: '0.4s' }}>
                            <Button asChild size="lg" className="rounded-full px-8 py-6 font-semibold hover:scale-105 transition-transform duration-300 text-base">
                                <Link to="/contact">Get in Touch</Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="rounded-full px-8 py-6 font-semibold bg-transparent border-border hover:bg-white/5 text-white">
                                <Link to="/auth">Try AIVO Free</Link>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Narrative: The Paradigm Shift */}
                <section className="py-24 border-y border-white/5 bg-muted/10">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="text-center mb-16 animate-fade-up">
                            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-4 block">The Problem We Solve</span>
                            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white leading-tight">
                                The rules of visibility have{' '}
                                <span className="text-primary">changed forever</span>
                            </h2>
                            <p className="text-muted-foreground mt-6 max-w-3xl mx-auto text-lg leading-relaxed">
                                AI-powered answer engines like Google AI Overviews, Gemini, and ChatGPT don't rank pages — they <strong className="text-white">synthesize answers</strong> from the most interpretable sources. Keyword density and backlinks alone no longer guarantee visibility. Content needs to be semantically rich, entity-coherent, and structurally clear.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            {pillars.map((pillar, i) => (
                                <Card key={i} className="glass rounded-2xl border-border overflow-hidden bg-transparent group hover:border-primary/30 transition-all duration-300 animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                                    <CardContent className="p-8 text-center">
                                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors">
                                            <pillar.icon className="w-7 h-7 text-primary" />
                                        </div>
                                        <h3 className="text-lg font-heading font-bold text-white mb-3">{pillar.title}</h3>
                                        <p className="text-muted-foreground text-sm leading-relaxed">{pillar.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Meet the Team */}
                <section className="py-24 relative overflow-hidden" id="team">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="text-center mb-16 animate-fade-up">
                            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-4 block">Our People</span>
                            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white leading-tight">
                                Meet the <span className="text-primary">Team</span>
                            </h2>
                            <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
                                A dedicated team of researchers and engineers bridging the gap between AI research and practical content optimization.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                            {teamMembers.slice(0, 3).map((member, i) => (
                                <div key={i} className="animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                                    <TeamCard member={member} />
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto mt-6">
                            {teamMembers.slice(3).map((member, i) => (
                                <div key={i} className="animate-fade-up" style={{ animationDelay: `${(i + 3) * 0.1}s` }}>
                                    <TeamCard member={member} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Our Story Timeline */}
                <section className="py-24 bg-card/30 border-y border-border" id="story">
                    <div className="max-w-4xl mx-auto px-6">
                        <div className="text-center mb-20 animate-fade-up">
                            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-4 block">Our Journey</span>
                            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white leading-tight">
                                Our <span className="text-primary">Story</span>
                            </h2>
                            <p className="text-muted-foreground mt-4 text-lg">
                                From a research insight to a production-ready platform.
                            </p>
                        </div>

                        {/* Timeline */}
                        <div className="relative">
                            {/* Vertical Line */}
                            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent md:-translate-x-px"></div>

                            <div className="space-y-12 md:space-y-16">
                                {timeline.map((item, i) => {
                                    const isLeft = i % 2 === 0;
                                    return (
                                        <div key={i} className="relative animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                                            {/* Node Dot */}
                                            <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-primary shadow-[0_0_12px_rgba(var(--primary),0.6)] -translate-x-1.5 top-2 z-10"></div>

                                            {/* Content */}
                                            <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? 'md:mr-auto md:pr-8 md:text-right' : 'md:ml-auto md:pl-8'}`}>
                                                <Card className="glass rounded-2xl border-border bg-transparent hover:border-primary/30 transition-all duration-300 group">
                                                    <CardContent className="p-6">
                                                        <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                                                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                                                                <item.icon className="w-5 h-5 text-primary" />
                                                            </div>
                                                            <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary text-[10px] font-semibold tracking-widest uppercase">
                                                                {item.date}
                                                            </Badge>
                                                        </div>
                                                        <h3 className="text-lg font-heading font-bold text-white mb-2">{item.title}</h3>
                                                        <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-32">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
                            Ready to be the answer?
                        </h2>
                        <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
                            Join the companies already optimizing their content for the age of AI-powered search.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild size="lg" className="rounded-full px-10 py-6 font-bold hover:scale-105 transition-transform text-base bg-white text-background hover:bg-white/90">
                                <Link to="/auth">Start Your Free Trial</Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="rounded-full px-10 py-6 font-bold bg-transparent border-border hover:bg-white/5 text-white group">
                                <Link to="/contact" className="flex items-center gap-2">
                                    Contact Sales <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
