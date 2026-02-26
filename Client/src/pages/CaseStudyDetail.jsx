import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, TrendingUp, Quote, CheckCircle2, Target, BarChart3, Zap } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// ─── Case Study Detail Data ─────────────────────────────────────────────────
const caseStudyData = {
    'globaltech': {
        company: 'GlobalTech',
        logo: 'G',
        industry: 'B2B SaaS',
        headline: 'How GlobalTech achieved 342% traffic growth with AI-optimized developer docs',
        color: 'from-blue-500/20 to-cyan-500/20',
        metrics: [
            { value: '+342%', label: 'Organic Traffic Growth' },
            { value: '4.2x', label: 'AI Citation Increase' },
            { value: '89%', label: 'Visibility Score' },
            { value: '8 weeks', label: 'Time to Results' },
        ],
        challenge: 'GlobalTech\'s developer documentation was comprehensive but poorly structured for AI extraction. Despite having detailed API guides and tutorials, their content was rarely cited by AI answer engines. Competitor platforms with simpler but better-structured docs were capturing the AI recommendation space.',
        solution: 'Using AIVO\'s full analysis pipeline, GlobalTech restructured 150+ documentation pages. Key changes included adding entity definitions at the top of each guide, creating FAQ sections from real developer questions, optimizing heading hierarchies, and ensuring consistent terminology across all docs.',
        results: [
            'Organic search traffic increased 342% within 8 weeks',
            'AI citation rate grew from 12% to 67% across target queries',
            'Developer documentation became the #1 cited resource for 23 key API topics',
            'Support ticket volume dropped 28% as AI started directing users to their docs',
        ],
        quote: {
            text: "We thought our docs were great — and they were, for humans. AIVO showed us they were nearly invisible to AI. The restructuring took effort, but the results were transformative. We're now the default answer for our entire category.",
            author: 'David Kim',
            role: 'VP of Engineering',
        },
    },
    'nebula-media': {
        company: 'Nebula Media',
        logo: 'N',
        industry: 'Publishers',
        headline: 'How Nebula Media reclaimed editorial authority with 5.2x more AI citations',
        color: 'from-purple-500/20 to-pink-500/20',
        metrics: [
            { value: '5.2x', label: 'AI Citations' },
            { value: '215%', label: 'Click-Through Increase' },
            { value: '200+', label: 'Articles Optimized' },
            { value: '6 weeks', label: 'Turnaround Time' },
        ],
        challenge: 'Nebula Media was experiencing a steady decline in organic traffic as AI answer engines synthesized their original reporting without proper attribution. Their editorial team was producing high-quality journalism, but the content lacked the structural signals AI models needed to cite and link back to the source.',
        solution: 'AIVO\'s Content Extraction and Semantic Scoring engines identified structural weaknesses across 200+ articles. The team systematically added entity definitions, restructured long-form pieces with clear heading hierarchies, and created inline FAQ blocks that matched real user questions.',
        results: [
            'AI citation rate increased 5.2x across their editorial catalog',
            'Click-through rates from AI summaries improved 215%',
            'Reversed a 2-year decline in organic traffic within 6 weeks',
            'Advertising revenue recovered 18% from improved traffic',
        ],
        quote: {
            text: "AIVO gave us the playbook for a world where AI mediates our relationship with readers. We stopped fighting the shift and started engineering for it.",
            author: 'Rachel Torres',
            role: 'Editor-in-Chief',
        },
    },
    'foxrun-commerce': {
        company: 'FoxRun Commerce',
        logo: 'F',
        industry: 'E-commerce',
        headline: 'How FoxRun Commerce generated $2.4M in AI-driven revenue',
        color: 'from-amber-500/20 to-orange-500/20',
        metrics: [
            { value: '$2.4M', label: 'AI-Driven Revenue' },
            { value: '140', label: 'Queries Dominated' },
            { value: '4.7x', label: 'Product Recommendations' },
            { value: '-35%', label: 'Paid Search Spend' },
        ],
        challenge: 'FoxRun\'s product pages were optimized for traditional Google search but invisible to AI shopping assistants. Their thin product descriptions and marketing-heavy copy failed to provide the structured specifications and comparisons AI needed to recommend their products.',
        solution: 'AIVO\'s Product Entity Optimization engine restructured 800+ product pages with detailed specs, comparison tables, and FAQ sections derived from real customer questions. The Transactional Intent Matching module aligned content with high-value buyer queries.',
        results: [
            'Products became top AI recommendation for 140 transactional queries',
            'AI-referred traffic generated $2.4M in attributable revenue',
            'Paid search spend reduced by 35% while maintaining conversion volume',
            'Product recommendation rate by AI shopping assistants increased 4.7x',
        ],
        quote: {
            text: "We were hemorrhaging money on paid search because our organic presence had cratered. AIVO didn't just fix our AI visibility — it fundamentally changed how we think about product content.",
            author: 'Marcus Rivera',
            role: 'Head of E-commerce',
        },
    },
    'trio-health': {
        company: 'Trio Health',
        logo: 'T',
        industry: 'Healthcare',
        headline: 'How Trio Health achieved a 94% AI Visibility Score for patient education',
        color: 'from-emerald-500/20 to-teal-500/20',
        metrics: [
            { value: '94%', label: 'Visibility Score' },
            { value: '3.8x', label: 'Patient Referrals' },
            { value: '450+', label: 'Pages Optimized' },
            { value: '97%', label: 'Entity Accuracy' },
        ],
        challenge: 'Trio Health\'s patient education content was medically accurate but poorly structured for AI consumption. Complex medical terminology was used inconsistently, and key health entities lacked clear definitions, making it difficult for AI models to safely cite their content.',
        solution: 'AIVO\'s Entity & Knowledge Graph engine mapped medical terminology across 450+ pages, ensuring consistent naming and explicit definitions. The Tone & Clarity engine ensured content maintained medical authority while improving readability for both humans and AI.',
        results: [
            'Achieved the highest AIVO visibility score (94%) in the healthcare vertical',
            'Patient referrals from AI health queries increased 3.8x',
            'Entity consistency improved from 62% to 97% across the content library',
            'Content became the primary AI-cited source for 35 health topics',
        ],
        quote: {
            text: "In healthcare, being cited by AI isn't just about traffic — it's about trust. AIVO helped us ensure our medically-reviewed content is what AI recommends, not unverified sources.",
            author: 'Dr. Amara Osei',
            role: 'Chief Medical Officer',
        },
    },
    'aivo-inc': {
        company: 'AIVO Inc.',
        logo: 'A',
        industry: 'B2B SaaS',
        headline: 'How AIVO used its own platform to grow demo requests 267%',
        color: 'from-violet-500/20 to-indigo-500/20',
        metrics: [
            { value: '+267%', label: 'Demo Requests' },
            { value: '91%', label: 'Content Readiness' },
            { value: '42%', label: 'Shorter Sales Cycles' },
            { value: '#1', label: 'Category Citation' },
        ],
        challenge: 'As creators of the AIVO platform, our own marketing content needed to demonstrate the product\'s value. Our early content was conceptually strong but lacked the entity clarity and structural optimization that AI models needed to recommend us.',
        solution: 'We dogfooded our own platform — running every piece of marketing content through the full 6-engine pipeline. We restructured 30 key articles, optimized entity definitions, and built an FAQ library aligned with real prospect questions.',
        results: [
            'AI-referred demo requests increased 267%',
            'Content readiness score improved from 48% to 91%',
            'Sales cycles shortened by 42% as prospects arrived more educated',
            'Became the #1 cited platform for AI visibility optimization queries',
        ],
        quote: {
            text: "Eating our own cooking was the best marketing decision we ever made. Every improvement we saw in our own metrics gave us a new case study to share with prospects.",
            author: 'Alex Chen',
            role: 'Co-Founder & CEO',
        },
    },
    'daily-chronicle': {
        company: 'The Daily Chronicle',
        logo: 'D',
        industry: 'Publishers',
        headline: 'How The Daily Chronicle reversed a 2-year traffic decline in 6 weeks',
        color: 'from-rose-500/20 to-red-500/20',
        metrics: [
            { value: '+215%', label: 'Click-Through Rate' },
            { value: '6 wks', label: 'Time to Reversal' },
            { value: '93%', label: 'Structure Score' },
            { value: '2.4x', label: 'AI Citations' },
        ],
        challenge: 'The Daily Chronicle had watched organic traffic decline for two consecutive years. Their investigative pieces were being summarized by AI but never linked. The editorial team needed a systematic approach to make their journalism AI-visible without compromising editorial quality.',
        solution: 'AIVO\'s Content Structure Optimization identified that key pieces lacked entity definitions, had inconsistent heading hierarchies, and missed FAQ blocks. The team restructured their editorial workflow to include AI-visibility checks before publication.',
        results: [
            'Reversed a 2-year decline in organic traffic within 6 weeks',
            'AI-referred click-through rates improved 215%',
            'Content structure scores improved from 41% to 93%',
            'Integrated AIVO checks into the editorial publishing workflow',
        ],
        quote: {
            text: "AIVO helped us understand why our investigative pieces were being summarized but never linked. After optimizing entity definitions and adding structured FAQ sections, our AI-referred traffic increased 215% in six weeks.",
            author: 'Sarah Chen',
            role: 'VP of Digital Strategy',
        },
    },
    'techgear-pro': {
        company: 'TechGear Pro',
        logo: 'T',
        industry: 'E-commerce',
        headline: 'How TechGear Pro cut ad spend 35% while growing AI product recommendations 4.7x',
        color: 'from-sky-500/20 to-blue-500/20',
        metrics: [
            { value: '-35%', label: 'Paid Search Spend' },
            { value: '4.7x', label: 'AI Recommendations' },
            { value: '156%', label: 'Conversion Lift' },
            { value: '$180K/mo', label: 'Previous Ad Spend' },
        ],
        challenge: 'TechGear Pro was spending $180K monthly on paid search because their organic product visibility had cratered. Product pages had marketing-heavy descriptions but lacked the structured specs and comparisons that AI shopping assistants needed to recommend products.',
        solution: 'The AIVO Product Entity Optimization engine restructured product pages with detailed specifications, feature comparison tables, and buyer FAQ sections. Transactional Intent Matching aligned content with high-value purchase queries.',
        results: [
            'Reduced paid search spend by 35% ($63K monthly savings)',
            'AI product recommendations increased 4.7x',
            'Organic conversion rate lifted 156%',
            'Products appeared in AI recommendations for 89 new queries',
        ],
        quote: {
            text: "We were hemorrhaging money on paid search. AIVO showed us that the problem wasn't our products — it was how we described them. Structured specs and FAQ sections were the unlock.",
            author: 'James Wong',
            role: 'Director of Digital Marketing',
        },
    },
    'cloudsync-analytics': {
        company: 'CloudSync Analytics',
        logo: 'C',
        industry: 'B2B SaaS',
        headline: 'How CloudSync Analytics became the #1 cited analytics platform in 3 months',
        color: 'from-indigo-500/20 to-purple-500/20',
        metrics: [
            { value: '#1', label: 'Category Citation Rank' },
            { value: '267%', label: 'Demo Request Growth' },
            { value: '3 mo', label: 'Time to Category Lead' },
            { value: '30', label: 'Articles Restructured' },
        ],
        challenge: 'CloudSync Analytics was producing excellent thought leadership content, but it wasn\'t translating to pipeline. Their content team wrote insightful analysis that humans loved, but the entity definitions were inconsistent and expertise signals were buried deep in long-form articles.',
        solution: 'AIVO\'s Thought Leadership Optimization analyzed 340+ content pieces, prioritizing 30 key articles for restructuring. The team focused on explicit entity definitions, claim+evidence structure, and consistent terminology across the content library.',
        results: [
            'Became the #1 cited analytics platform for category queries',
            'AI-referred demo requests jumped 267%',
            'Content readiness score improved from 34% to 88%',
            'Sales team reported prospects arriving significantly more educated',
        ],
        quote: {
            text: "Our content team was producing great material but it wasn't translating to pipeline. AIVO showed us exactly why — our entity definitions were inconsistent and our expertise signals were buried.",
            author: 'Jennifer Park',
            role: 'CMO',
        },
    },
};

const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: 'easeOut' },
};

export default function CaseStudyDetail() {
    const { slug } = useParams();
    const study = caseStudyData[slug];

    if (!study) {
        return (
            <div className="bg-background text-foreground min-h-[60vh] flex items-center justify-center pt-32">
                <div className="text-center">
                    <h1 className="text-4xl font-heading font-bold text-white mb-4">Case study not found</h1>
                    <p className="text-muted-foreground mb-8">The case study you're looking for doesn't exist.</p>
                    <Button asChild variant="outline" className="rounded-full">
                        <Link to="/customers">← Back to Customers</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-background text-foreground font-sans pt-4">

            {/* Hero */}
            <section className="pt-32 pb-12 md:pt-44 md:pb-16">
                <div className="max-w-4xl mx-auto px-6">
                    <motion.div {...fadeUp}>
                        <Link to="/customers" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
                            <ArrowLeft className="w-4 h-4" /> Back to Customers
                        </Link>
                    </motion.div>

                    <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="flex items-center gap-4 mb-6">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${study.color} flex items-center justify-center`}>
                            <span className="text-2xl font-heading font-bold text-white/60">{study.logo}</span>
                        </div>
                        <div>
                            <h2 className="text-xl font-heading font-bold text-white">{study.company}</h2>
                            <Badge variant="outline" className="border-primary/20 text-primary text-[10px] tracking-widest uppercase">{study.industry}</Badge>
                        </div>
                    </motion.div>

                    <motion.h1 {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }} className="text-3xl md:text-5xl font-heading font-bold text-white leading-tight mb-8">
                        {study.headline}
                    </motion.h1>

                    {/* Metrics */}
                    <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {study.metrics.map((metric, i) => (
                            <Card key={i} className="glass bg-transparent border-white/5 rounded-xl">
                                <CardContent className="p-4 text-center">
                                    <div className="text-2xl md:text-3xl font-bold text-primary font-heading">{metric.value}</div>
                                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1 font-semibold">{metric.label}</div>
                                </CardContent>
                            </Card>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <section className="py-16">
                <div className="max-w-3xl mx-auto px-6 space-y-16">

                    {/* Challenge */}
                    <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                                <Target className="w-5 h-5 text-red-400" />
                            </div>
                            <h3 className="text-xl font-heading font-bold text-white">The Challenge</h3>
                        </div>
                        <p className="text-muted-foreground leading-relaxed text-base">{study.challenge}</p>
                    </motion.div>

                    {/* Solution */}
                    <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                <Zap className="w-5 h-5 text-primary" />
                            </div>
                            <h3 className="text-xl font-heading font-bold text-white">The AIVO Solution</h3>
                        </div>
                        <p className="text-muted-foreground leading-relaxed text-base">{study.solution}</p>
                    </motion.div>

                    {/* Results */}
                    <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }}>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                                <BarChart3 className="w-5 h-5 text-emerald-400" />
                            </div>
                            <h3 className="text-xl font-heading font-bold text-white">The Results</h3>
                        </div>
                        <ul className="space-y-4">
                            {study.results.map((result, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                                    <span className="text-slate-300 leading-relaxed">{result}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Blockquote */}
                    <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.25 }}>
                        <Card className="glass bg-transparent rounded-2xl border-primary/10 p-8 relative overflow-hidden">
                            <div className="absolute top-2 left-6 text-7xl font-heading text-primary/10 select-none leading-none">"</div>
                            <div className="relative z-10">
                                <blockquote className="text-lg text-white font-light leading-relaxed italic mb-6">
                                    "{study.quote.text}"
                                </blockquote>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold font-heading">
                                        {study.quote.author.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="text-white font-semibold text-sm">{study.quote.author}</div>
                                        <div className="text-xs text-muted-foreground">{study.quote.role}, {study.company}</div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-gradient-to-t from-primary/5 to-transparent border-t border-white/5">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                        Ready for results like {study.company}?
                    </h2>
                    <p className="text-muted-foreground text-lg mb-8">Start your 14-day free trial and see your AI visibility score today.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button asChild size="lg" className="rounded-full px-10 py-7 font-bold hover:scale-105 transition-transform text-base shadow-[0_0_40px_-10px_rgba(var(--primary),0.5)]">
                            <Link to="/auth">Get Started Free</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="rounded-full px-8 py-7 font-bold bg-transparent border-white/10 text-white hover:bg-white/5">
                            <Link to="/pricing">View Pricing</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
