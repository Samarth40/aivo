import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, ChevronDown, Sparkles, Zap, Building2, HelpCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DotPattern } from "@/components/ui/dot-pattern";

// ─── Pricing Data ───────────────────────────────────────────────────────────
const plans = {
    starter: {
        name: 'Starter',
        icon: Zap,
        badge: 'Growing Teams',
        description: 'For content teams and growing brands',
        monthlyPrice: 97,
        annualPrice: 970,
        features: [
            '3 seats included (+$29/seat)',
            '5 domains monitored',
            '40 AI-optimized articles/month',
            'Basic AI Visibility Score',
            'Content Extraction Engine',
            'Email support',
        ],
        cta: 'Start Free Trial',
        highlighted: false,
    },
    professional: {
        name: 'Professional',
        icon: Sparkles,
        badge: 'Most Popular',
        description: 'For agencies and high-volume teams',
        monthlyPrice: 297,
        annualPrice: 2970,
        features: [
            '10 seats included',
            '20 domains monitored',
            '100 AI-optimized articles/month',
            'Full AI Visibility Score + Breakdown',
            'All 6 Analysis Engines',
            'Competitor Intelligence',
            'Multi-channel content previews',
            'Priority support',
        ],
        cta: 'Start Free Trial',
        highlighted: true,
    },
    enterprise: {
        name: 'Enterprise',
        icon: Building2,
        badge: 'Custom',
        description: 'For large organizations with custom needs',
        monthlyPrice: null,
        annualPrice: null,
        features: [
            'Unlimited seats',
            'Unlimited domains',
            'Unlimited articles/month',
            'Custom AI model tuning',
            'All 6 Analysis Engines',
            'White-label reports',
            'Dedicated account manager',
            'Custom API integrations',
            'SSO & advanced security',
            'SLA guarantee',
        ],
        cta: 'Contact Sales',
        highlighted: false,
    },
};

// ─── Feature Comparison Data ────────────────────────────────────────────────
const comparisonCategories = [
    {
        name: 'Core Platform',
        features: [
            { name: 'AI Visibility Score', starter: true, professional: true, enterprise: true },
            { name: 'Score Component Breakdown', starter: false, professional: true, enterprise: true },
            { name: 'Content Extraction Engine', starter: true, professional: true, enterprise: true },
            { name: 'Semantic Scoring Engine', starter: true, professional: true, enterprise: true },
            { name: 'Entity & Knowledge Graph', starter: false, professional: true, enterprise: true },
            { name: 'Tone & Clarity Engine', starter: false, professional: true, enterprise: true },
            { name: 'AI Simulation Engine', starter: false, professional: true, enterprise: true },
            { name: 'Competitor Intelligence', starter: false, professional: true, enterprise: true },
        ],
    },
    {
        name: 'Content & Scale',
        features: [
            { name: 'Articles per month', starter: '40', professional: '100', enterprise: 'Unlimited' },
            { name: 'Domains monitored', starter: '5', professional: '20', enterprise: 'Unlimited' },
            { name: 'Team seats', starter: '3', professional: '10', enterprise: 'Unlimited' },
            { name: 'Report history', starter: '30 days', professional: '12 months', enterprise: 'Unlimited' },
        ],
    },
    {
        name: 'Advanced Features',
        features: [
            { name: 'Multi-channel previews', starter: false, professional: true, enterprise: true },
            { name: 'White-label reports', starter: false, professional: false, enterprise: true },
            { name: 'Custom API access', starter: false, professional: false, enterprise: true },
            { name: 'Custom AI model tuning', starter: false, professional: false, enterprise: true },
            { name: 'SSO & SAML', starter: false, professional: false, enterprise: true },
        ],
    },
    {
        name: 'Support',
        features: [
            { name: 'Email support', starter: true, professional: true, enterprise: true },
            { name: 'Priority support', starter: false, professional: true, enterprise: true },
            { name: 'Dedicated account manager', starter: false, professional: false, enterprise: true },
            { name: 'SLA guarantee', starter: false, professional: false, enterprise: true },
        ],
    },
];

// ─── FAQ Data ───────────────────────────────────────────────────────────────
const faqs = [
    {
        q: 'What is AI Visibility Optimization?',
        a: 'AI Visibility Optimization (AEO/AAIO) is the process of structuring and enhancing your web content so that AI-powered answer engines — like Google AI Overviews, Gemini, and ChatGPT — select, quote, and cite your pages. Unlike traditional SEO which focuses on ranking in blue links, AEO focuses on being the definitive source AI systems trust.',
    },
    {
        q: 'How is AIVO different from traditional SEO tools?',
        a: 'Traditional SEO tools measure keyword density, backlinks, and page authority. AIVO goes further by analyzing semantic density, entity coverage, structural clarity, and simulating how AI answer engines interpret your content. Our AI Simulation Engine predicts whether your content will be selected and cited by LLMs.',
    },
    {
        q: 'Can I switch between monthly and annual billing?',
        a: 'Yes! You can switch between monthly and annual billing at any time. When switching to annual, you\'ll receive a prorated credit for the remainder of your current billing period. Annual billing saves you approximately 17% compared to monthly.',
    },
    {
        q: 'What happens at the end of my free trial?',
        a: 'Your 14-day free trial includes full access to Professional tier features. At the end of the trial, you can choose any plan that fits your needs. If you don\'t select a plan, your account will be paused — no charges, no data loss.',
    },
    {
        q: 'Do you offer discounts for startups or non-profits?',
        a: 'Yes, we offer special pricing for qualified startups (under 2 years old, VC-backed or bootstrapped) and registered non-profit organizations. Contact our sales team with your details and we\'ll set up a custom plan.',
    },
    {
        q: 'How does the Competitor Intelligence Engine work?',
        a: 'Our Competitor Intelligence Engine scrapes and analyzes top-ranking competitor pages for your target topics. It compares their content structure, entity coverage, FAQ completeness, and semantic depth against yours — then provides prioritized, actionable recommendations to close the gaps.',
    },
];

// ─── Sub-Components ─────────────────────────────────────────────────────────

function BillingToggle({ isAnnual, setIsAnnual }) {
    return (
        <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-sm font-semibold transition-colors ${!isAnnual ? 'text-white' : 'text-muted-foreground'}`}>Monthly</span>
            <button
                onClick={() => setIsAnnual(!isAnnual)}
                className="relative w-14 h-7 bg-muted rounded-full p-1 cursor-pointer transition-colors hover:bg-muted/80"
                aria-label="Toggle billing period"
            >
                <motion.div
                    className="w-5 h-5 bg-primary rounded-full"
                    layout
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    style={{ x: isAnnual ? 28 : 0 }}
                />
            </button>
            <span className={`text-sm font-semibold transition-colors ${isAnnual ? 'text-white' : 'text-muted-foreground'}`}>
                Annual
            </span>
            {isAnnual && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/10">Save ~17%</Badge>
                </motion.div>
            )}
        </div>
    );
}

function PricingCard({ plan, isAnnual }) {
    const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
    const Icon = plan.icon;

    return (
        <motion.div
            layout
            className="relative h-full flex"
        >
            <div className={`w-full relative flex flex-col p-6 px-8 rounded-3xl border backdrop-blur-xl overflow-hidden transition-all duration-500 ${plan.highlighted
                ? 'bg-slate-900/80 border-primary/40 shadow-[0_0_50px_-15px_rgba(var(--primary),0.4)]'
                : 'bg-background/40 border-white/10 shadow-2xl hover:border-white/20'
                }`}>

                {/* Top Glow for Highlighted */}
                {plan.highlighted && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent blur-[1px]" />
                )}

                {/* Header Section */}
                <div className="flex flex-col mb-6 relative z-10">
                    {/* Floating Icon Box + Badge */}
                    <div className="flex items-center justify-between mb-5">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${plan.highlighted ? 'bg-primary/20' : 'bg-white/5'}`}>
                            <Icon className={`w-5 h-5 ${plan.highlighted ? 'text-primary' : 'text-white'}`} />
                        </div>
                        <Badge
                            variant="outline"
                            className={`px-3 py-1 uppercase tracking-[0.2em] text-[10px] font-bold rounded-full ${plan.highlighted
                                ? 'bg-primary/10 text-primary border-primary/20'
                                : 'bg-white/5 text-slate-400 border-white/10'
                                }`}
                        >
                            {plan.badge || plan.name}
                        </Badge>
                    </div>

                    {/* Price Area */}
                    <div className="flex flex-col gap-1 mb-2">
                        <div className="flex items-end gap-2">
                            {price !== null ? (
                                <>
                                    <AnimatePresence mode="wait">
                                        <motion.span
                                            key={price}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="text-4xl font-bold font-heading tracking-tighter text-white leading-none"
                                        >
                                            ${price.toLocaleString()}
                                        </motion.span>
                                    </AnimatePresence>
                                    <span className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">
                                        / {isAnnual ? 'YR' : 'MO'}
                                    </span>
                                </>
                            ) : (
                                <span className="text-3xl font-bold font-heading tracking-tighter text-white leading-none mb-1">
                                    Custom
                                </span>
                            )}
                        </div>
                    </div>

                    <p className="text-sm text-slate-400 font-medium mt-2">
                        {plan.description}
                    </p>
                </div>

                {/* Divider Line */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

                {/* Features List */}
                <ul className="space-y-3 flex-1 mb-8 relative z-10">
                    {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-4 text-sm text-slate-300 font-medium">
                            <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${plan.highlighted ? 'bg-primary/20' : 'bg-white/5'}`}>
                                <Check className={`w-3 h-3 ${plan.highlighted ? 'text-primary' : 'text-white/70'}`} />
                            </div>
                            <span className="leading-relaxed">{feature}</span>
                        </li>
                    ))}
                </ul>

                {/* CTA Button */}
                <div className="mt-auto relative z-10 pt-4">
                    <Button
                        asChild
                        size="lg"
                        className={`w-full group rounded-xl h-12 font-bold text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 ${plan.highlighted
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_30px_-5px_rgba(var(--primary),0.5)]'
                            : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                            }`}
                    >
                        <Link to="/auth">
                            <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${plan.highlighted ? '' : 'text-slate-400 group-hover:text-white'}`} />
                            {plan.cta}
                        </Link>
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}

function FeatureCell({ value, highlighted }) {
    if (typeof value === 'boolean') {
        return value
            ? <Check className={`w-4 h-4 mx-auto ${highlighted ? 'text-emerald-500' : 'text-emerald-500/70'}`} />
            : <X className="w-4 h-4 mx-auto text-slate-600" />;
    }
    return <span className={`text-sm ${highlighted ? 'text-white font-medium' : 'text-muted-foreground'}`}>{value}</span>;
}

function FAQItem({ faq, isOpen, onToggle }) {
    return (
        <div className="border-b border-white/5 last:border-0">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between py-5 text-left cursor-pointer group"
            >
                <span className="text-base font-medium text-white group-hover:text-primary transition-colors pr-4">
                    {faq.q}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0"
                >
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <p className="pb-5 text-sm text-muted-foreground leading-relaxed max-w-3xl">
                            {faq.a}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ─── Main Pricing Page ──────────────────────────────────────────────────────
export default function Pricing() {
    const [isAnnual, setIsAnnual] = useState(false);
    const [openFaq, setOpenFaq] = useState(null);

    return (
        <div className="bg-background text-foreground font-sans pt-4">

            {/* Hero */}
            <section className="relative pt-32 pb-16 md:pt-44 md:pb-24 overflow-hidden">
                <DotPattern
                    className="opacity-30"
                    cx={1} cy={1} cr={1}
                    width={20} height={20}
                    fill="currentColor"
                />
                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <Badge variant="outline" className="px-3 py-1 rounded-full border-primary/20 bg-primary/5 text-primary text-[10px] font-semibold tracking-widest uppercase mb-6 animate-fade-up">
                        Simple, Transparent Pricing
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4 leading-tight animate-fade-up">
                        Full platform. <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Any scale.</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-up font-light" style={{ animationDelay: '0.2s' }}>
                        Choose the plan that matches your operation today. Scale seamlessly as your AI visibility grows.
                    </p>
                </div>
            </section>

            {/* Billing Toggle + Pricing Cards */}
            <section className="pb-24 px-6 md:px-8">
                <BillingToggle isAnnual={isAnnual} setIsAnnual={setIsAnnual} />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto items-stretch">
                    {Object.values(plans).map((plan) => (
                        <PricingCard key={plan.name} plan={plan} isAnnual={isAnnual} />
                    ))}
                </div>
            </section>

            {/* Feature Comparison Matrix */}
            <section className="py-24 bg-card/30 border-y border-border">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-primary text-xs font-bold tracking-widest uppercase">Compare Plans</span>
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mt-4">Feature Comparison</h2>
                        <p className="text-muted-foreground mt-4 max-w-xl mx-auto">Every feature you need to dominate AI-powered search results, grouped by capability.</p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[640px]">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left py-4 pr-4 text-sm font-semibold text-muted-foreground w-[40%]">Feature</th>
                                    <th className="text-center py-4 px-4 text-sm font-semibold text-muted-foreground w-[20%]">Starter</th>
                                    <th className="text-center py-4 px-4 text-sm font-semibold text-white w-[20%]">
                                        <div className="flex flex-col items-center gap-1">
                                            <Badge className="bg-primary/10 text-primary hover:bg-primary/10 text-[10px] px-2 py-0">Popular</Badge>
                                            Professional
                                        </div>
                                    </th>
                                    <th className="text-center py-4 pl-4 text-sm font-semibold text-muted-foreground w-[20%]">Enterprise</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonCategories.map((category) => (
                                    <React.Fragment key={category.name}>
                                        <tr>
                                            <td colSpan={4} className="pt-8 pb-3">
                                                <span className="text-xs font-bold uppercase tracking-widest text-primary">{category.name}</span>
                                            </td>
                                        </tr>
                                        {category.features.map((feature) => (
                                            <tr key={feature.name} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                                <td className="py-3.5 pr-4 text-sm text-slate-300">{feature.name}</td>
                                                <td className="py-3.5 px-4 text-center"><FeatureCell value={feature.starter} /></td>
                                                <td className="py-3.5 px-4 text-center bg-primary/[0.03]"><FeatureCell value={feature.professional} highlighted /></td>
                                                <td className="py-3.5 pl-4 text-center"><FeatureCell value={feature.enterprise} /></td>
                                            </tr>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24">
                <div className="max-w-3xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="w-12 h-12 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                            <HelpCircle className="w-6 h-6 text-primary" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">Frequently Asked Questions</h2>
                        <p className="text-muted-foreground mt-4">Everything you need to know about AIVO and AI Visibility Optimization.</p>
                    </div>

                    <div className="glass rounded-2xl p-6 md:p-8">
                        {faqs.map((faq, i) => (
                            <FAQItem
                                key={i}
                                faq={faq}
                                isOpen={openFaq === i}
                                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-gradient-to-t from-primary/5 to-transparent">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
                        Ready to own the AI answer?
                    </h2>
                    <p className="text-muted-foreground text-lg mb-8">Start your 14-day free trial. No credit card required.</p>
                    <Button asChild size="lg" className="rounded-full px-10 py-7 font-bold hover:scale-105 transition-transform text-base shadow-[0_0_40px_-10px_rgba(var(--primary),0.5)]">
                        <Link to="/auth">Get Started Free</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
