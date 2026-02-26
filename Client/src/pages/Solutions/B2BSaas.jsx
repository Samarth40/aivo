import React from 'react';
import { BookOpen, Lightbulb, Award, Users, BrainCircuit, FileText, Target, TrendingUp } from 'lucide-react';
import SolutionTemplate from '@/components/common/SolutionTemplate';

export default function B2BSaas() {
    return (
        <SolutionTemplate
            industry="B2B SaaS"
            tagline="Solutions for B2B SaaS"
            title="Become the cited authority for"
            titleHighlight="AI-Driven Decisions"
            subtitle="When CTOs and decision-makers ask AI for software recommendations, your thought leadership content needs to be the definitive source. AIVO positions your brand as the expert AI trusts."
            stats={[
                { value: '5.8x', label: 'More thought leadership citations' },
                { value: '267%', label: 'Growth in AI-referred demos' },
                { value: '91%', label: 'Content readiness improvement' },
                { value: '42%', label: 'Shorter sales cycles' },
            ]}
            painPoints={[
                {
                    icon: Lightbulb,
                    title: 'Thought Leadership Goes Unnoticed',
                    description: 'You invest heavily in whitepapers, guides, and blog posts. But AI models synthesize generic answers instead of citing your expert analysis because it lacks semantic clarity.',
                },
                {
                    icon: Users,
                    title: 'Competitors Get the AI Recommendation',
                    description: 'When prospects ask AI "what\'s the best project management tool?", your competitor is cited because their content is more structurally optimized for AI extraction.',
                },
                {
                    icon: Award,
                    title: 'Diminishing Content ROI',
                    description: 'Your content marketing budget grows but pipeline attribution shrinks. The disconnect is clear: great content isn\'t enough if AI can\'t interpret and recommend it.',
                },
            ]}
            features={[
                {
                    icon: BrainCircuit,
                    title: 'Thought Leadership Optimization',
                    description: 'AIVO analyzes your blog posts, whitepapers, and documentation for the semantic signals that make AI trust and cite your expertise. Transform your content from informative to authoritative.',
                    bullets: [
                        'Expert entity and authority signal detection',
                        'Claim+evidence structure optimization',
                        'Terminology consistency across content library',
                        'Citation-readiness scoring per article',
                    ],
                    metrics: [
                        { value: '4.2x', label: 'Authority Score Increase' },
                        { value: '82%', label: 'AI Citation Rate' },
                    ],
                },
                {
                    icon: FileText,
                    title: 'Content Library Intelligence',
                    description: 'Analyze your entire content library at scale. AIVO identifies which pieces drive AI visibility and which need optimization, helping you prioritize updates for maximum pipeline impact.',
                    bullets: [
                        'Bulk content analysis (100+ pages)',
                        'Content scoring and prioritization matrix',
                        'Topic gap analysis vs. buyer journey stages',
                        'Automated optimization recommendations',
                    ],
                    metrics: [
                        { value: '340+', label: 'Pages Analyzed per Client' },
                        { value: '67%', label: 'Time Savings on Audits' },
                    ],
                },
                {
                    icon: Target,
                    title: 'Competitive Authority Tracking',
                    description: 'Monitor how your brand\'s AI visibility compares to competitors across key decision queries. Track citation share, identify content gaps, and build a roadmap to own your category.',
                    bullets: [
                        'Real-time category citation share dashboard',
                        'Competitor content strategy analysis',
                        'Decision-stage query mapping',
                        'Quarterly AI visibility trend reports',
                    ],
                    metrics: [
                        { value: '15', label: 'Competitors Tracked' },
                        { value: '3 mo', label: 'Avg. Time to Category Lead' },
                    ],
                },
            ]}
            testimonial={{
                quote: "Our content team was producing great material but it wasn't translating to pipeline. AIVO showed us exactly why — our entity definitions were inconsistent and our expertise signals were buried. After restructuring 30 key articles, AI-referred demo requests jumped 267%.",
                name: "Jennifer Park",
                role: "CMO",
                company: "CloudSync Analytics",
            }}
            ctaTitle="Own your category in the AI era"
            ctaDescription="Position your brand as the authority AI trusts for B2B recommendations."
            ctaButton="Start Your Free Trial"
        />
    );
}
