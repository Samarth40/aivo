import React from 'react';
import { Newspaper, TrendingDown, Eye, EyeOff, BarChart3, FileSearch, BrainCircuit, Target } from 'lucide-react';
import SolutionTemplate from '@/components/common/SolutionTemplate';

export default function Publishers() {
    return (
        <SolutionTemplate
            industry="Publishers"
            tagline="Solutions for Publishers"
            title="Reclaim your traffic in the"
            titleHighlight="Age of AI Answers"
            subtitle="AI answer engines are synthesizing your content and showing it to users — without a click. AIVO helps publishers ensure their original journalism and editorial content gets properly cited, quoted, and linked."
            stats={[
                { value: '65%', label: 'Avg. traffic lost to zero-click' },
                { value: '3.2x', label: 'More citations with AIVO' },
                { value: '89%', label: 'Entity coverage improvement' },
                { value: '14 days', label: 'Average time to see results' },
            ]}
            painPoints={[
                {
                    icon: TrendingDown,
                    title: 'Declining Click-Through Rates',
                    description: 'AI Overviews and featured snippets answer user queries directly, reducing the need to visit your site. Your ad revenue and subscription funnels are drying up.',
                },
                {
                    icon: EyeOff,
                    title: 'Uncredited Content Synthesis',
                    description: 'AI models scrape and synthesize your original reporting without clear attribution. Your editorial investment yields value for platforms, not your publication.',
                },
                {
                    icon: Newspaper,
                    title: 'Outdated SEO Strategies',
                    description: 'Traditional keyword optimization and backlink building no longer guarantee visibility when AI systems prioritize semantic clarity and entity-rich content.',
                },
            ]}
            features={[
                {
                    icon: FileSearch,
                    title: 'Content Structure Optimization',
                    description: 'AIVO analyzes your articles for structural elements that AI engines prioritize — clear headings, FAQ blocks, entity definitions, and concise factual statements that are easy to quote.',
                    bullets: [
                        'Automated heading hierarchy analysis',
                        'FAQ block recommendations from reader queries',
                        'Fact-dense paragraph scoring',
                        'Quote-readiness assessment for key claims',
                    ],
                    metrics: [
                        { value: '93%', label: 'Structure Score Improvement' },
                        { value: '2.4x', label: 'More AI Citations' },
                    ],
                },
                {
                    icon: BrainCircuit,
                    title: 'AI Citation Simulation',
                    description: 'Our simulation engine models how LLMs like GPT, Gemini, and Perplexity process and select source material. See exactly which paragraphs are likely to be quoted and which are being ignored.',
                    bullets: [
                        'Paragraph-level citation prediction',
                        'Source attribution likelihood scoring',
                        'Multi-model simulation (GPT, Gemini, Claude)',
                        'Before/after content comparison',
                    ],
                    metrics: [
                        { value: '0.94', label: 'Simulation Accuracy' },
                        { value: '47%', label: 'Avg. Score Improvement' },
                    ],
                },
                {
                    icon: Target,
                    title: 'Competitor Gap Analysis',
                    description: 'See exactly why competing publications are being cited over yours. Our competitor engine compares entity coverage, structural clarity, and semantic depth across your topic landscape.',
                    bullets: [
                        'Side-by-side content structure comparison',
                        'Missing entity and topic gap detection',
                        'Recommended content additions ranked by impact',
                        'Automated tracking of competitor visibility changes',
                    ],
                    metrics: [
                        { value: '12', label: 'Avg. Gaps Identified' },
                        { value: '68%', label: 'Gap Closure in 30 Days' },
                    ],
                },
            ]}
            testimonial={{
                quote: "AIVO helped us understand why our investigative pieces were being summarized but never linked. After optimizing entity definitions and adding structured FAQ sections, our AI-referred traffic increased by 215% in just six weeks.",
                name: "Sarah Chen",
                role: "VP of Digital Strategy",
                company: "The Daily Chronicle",
            }}
            ctaTitle="Stop losing traffic to AI summaries"
            ctaDescription="Join leading publishers who are reclaiming their visibility in the age of AI answers."
            ctaButton="Start Your Free Trial"
        />
    );
}
