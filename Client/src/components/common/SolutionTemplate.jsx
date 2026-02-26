import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DotPattern } from "@/components/ui/dot-pattern";

const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.6, ease: 'easeOut' },
};

export default function SolutionTemplate({
    industry,
    tagline,
    title,
    titleHighlight,
    subtitle,
    painPoints = [],
    features = [],
    stats = [],
    testimonial = null,
    ctaTitle = 'Ready to transform your AI visibility?',
    ctaDescription = 'Start your 14-day free trial. No credit card required.',
    ctaButton = 'Get Started Free',
}) {
    return (
        <div className="bg-background text-foreground font-sans pt-4">

            {/* Hero */}
            <section className="relative pt-32 pb-16 md:pt-44 md:pb-24 overflow-hidden">
                <DotPattern
                    className="opacity-25"
                    cx={1} cy={1} cr={1}
                    width={20} height={20}
                    fill="currentColor"
                />
                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <motion.div {...fadeUp}>
                        <Badge variant="outline" className="px-3 py-1 rounded-full border-primary/20 bg-primary/5 text-primary text-[10px] font-semibold tracking-widest uppercase mb-6">
                            {tagline}
                        </Badge>
                    </motion.div>
                    <motion.h1 {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="text-4xl md:text-6xl font-heading font-bold text-white mb-4 leading-tight">
                        {title}{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">{titleHighlight}</span>
                    </motion.h1>
                    <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }} className="text-lg text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
                        {subtitle}
                    </motion.p>
                    <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.3 }} className="mt-8 flex flex-wrap justify-center gap-4">
                        <Button asChild size="lg" className="rounded-full px-8 py-7 font-bold hover:scale-105 transition-transform text-base shadow-[0_0_40px_-10px_rgba(var(--primary),0.5)]">
                            <Link to="/auth">Start Free Trial</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="rounded-full px-8 py-7 font-bold bg-transparent border-white/10 text-white hover:bg-white/5">
                            <Link to="/pricing">View Pricing</Link>
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Stats Bar */}
            {stats.length > 0 && (
                <section className="py-12 border-y border-white/5 bg-black/40">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    {...fadeUp}
                                    transition={{ ...fadeUp.transition, delay: i * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="text-3xl md:text-4xl font-bold text-white font-heading">{stat.value}</div>
                                    <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1 font-semibold">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Pain Points */}
            <section className="py-24">
                <div className="max-w-6xl mx-auto px-6">
                    <motion.div {...fadeUp} className="text-center mb-16">
                        <span className="text-primary text-xs font-bold tracking-widest uppercase">The Challenge</span>
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mt-4">Why {industry} needs AI Visibility</h2>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {painPoints.map((point, i) => (
                            <motion.div key={i} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.1 }}>
                                <Card className="glass bg-transparent border-white/5 hover:border-primary/20 transition-all duration-300 h-full rounded-2xl group">
                                    <CardHeader>
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                            <point.icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <CardTitle className="text-lg text-white font-heading">{point.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground leading-relaxed">{point.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* AIVO Features for this Industry */}
            <section className="py-24 bg-card/30 border-y border-border">
                <div className="max-w-6xl mx-auto px-6">
                    <motion.div {...fadeUp} className="text-center mb-16">
                        <span className="text-primary text-xs font-bold tracking-widest uppercase">The Solution</span>
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mt-4">How AIVO empowers {industry}</h2>
                    </motion.div>
                    <div className="space-y-16">
                        {features.map((feature, i) => (
                            <motion.div
                                key={i}
                                {...fadeUp}
                                transition={{ ...fadeUp.transition, delay: 0.1 }}
                                className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16 items-center`}
                            >
                                {/* Visual */}
                                <div className="w-full md:w-1/2">
                                    <div className="glass rounded-2xl p-8 border-white/5 relative overflow-hidden">
                                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-3xl" />
                                        <div className="relative z-10">
                                            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                                                <feature.icon className="w-7 h-7 text-primary" />
                                            </div>
                                            {feature.metrics && (
                                                <div className="grid grid-cols-2 gap-4 mt-6">
                                                    {feature.metrics.map((m, j) => (
                                                        <div key={j} className="bg-white/5 rounded-xl p-4 border border-white/5">
                                                            <div className="text-2xl font-bold text-white font-heading">{m.value}</div>
                                                            <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">{m.label}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Text */}
                                <div className="w-full md:w-1/2">
                                    <h3 className="text-2xl font-heading font-bold text-white mb-4">{feature.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed mb-6">{feature.description}</p>
                                    <ul className="space-y-3">
                                        {feature.bullets.map((bullet, j) => (
                                            <li key={j} className="flex items-start gap-3 text-sm text-slate-300">
                                                <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                                                {bullet}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonial */}
            {testimonial && (
                <section className="py-24">
                    <div className="max-w-3xl mx-auto px-6">
                        <motion.div {...fadeUp}>
                            <Card className="glass bg-transparent rounded-2xl border-primary/10 p-8 md:p-12 relative overflow-hidden">
                                <div className="absolute top-4 left-8 text-8xl font-heading text-primary/10 select-none leading-none">"</div>
                                <div className="relative z-10">
                                    <blockquote className="text-lg md:text-xl text-white font-light leading-relaxed italic mb-8">
                                        "{testimonial.quote}"
                                    </blockquote>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold font-heading text-lg">
                                            {testimonial.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="text-white font-semibold">{testimonial.name}</div>
                                            <div className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="py-24 bg-gradient-to-t from-primary/5 to-transparent">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <motion.div {...fadeUp}>
                        <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">{ctaTitle}</h2>
                        <p className="text-muted-foreground text-lg mb-8">{ctaDescription}</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button asChild size="lg" className="rounded-full px-10 py-7 font-bold hover:scale-105 transition-transform text-base shadow-[0_0_40px_-10px_rgba(var(--primary),0.5)]">
                                <Link to="/auth">{ctaButton} <ArrowRight className="ml-2 w-4 h-4" /></Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
