import React from 'react';
import { ShoppingCart, PackageSearch, MousePointerClick, DollarSign, Search, BarChart3, Tags, ShoppingBag } from 'lucide-react';
import SolutionTemplate from '@/components/common/SolutionTemplate';

export default function Ecommerce() {
    return (
        <SolutionTemplate
            industry="E-commerce"
            tagline="Solutions for E-commerce"
            title="Own transactional intent in"
            titleHighlight="AI-Powered Shopping"
            subtitle="When shoppers ask AI 'what's the best laptop under $1,000?', your products need to be the answer. AIVO optimizes your product and category content for AI-driven purchase decisions."
            stats={[
                { value: '342%', label: 'Avg. AI referral traffic lift' },
                { value: '4.7x', label: 'Product mention increase' },
                { value: '73%', label: 'Better transactional matching' },
                { value: '$2.4M', label: 'Revenue attributed to AIVO' },
            ]}
            painPoints={[
                {
                    icon: PackageSearch,
                    title: 'Products Invisible to AI',
                    description: 'AI shopping assistants recommend products based on structured specs, reviews, and entity data. Thin product descriptions with marketing fluff get zero recommendations.',
                },
                {
                    icon: MousePointerClick,
                    title: 'Zero-Click Product Answers',
                    description: 'AI engines compare products inline and display specs, pricing, and reviews directly — your product pages may never get visited even when featured.',
                },
                {
                    icon: DollarSign,
                    title: 'Rising Paid Search Costs',
                    description: 'As organic visibility drops for transactional queries, you\'re forced to spend more on paid ads to maintain the same conversion volume. The ROI squeeze is real.',
                },
            ]}
            features={[
                {
                    icon: Tags,
                    title: 'Product Entity Optimization',
                    description: 'AIVO extracts and evaluates the entities in your product content — specs, features, comparisons, and pricing — ensuring AI models can accurately represent your products in recommendations.',
                    bullets: [
                        'Automated product specification extraction',
                        'Feature comparison table generation',
                        'Entity consistency checks across variants',
                        'Price and availability schema validation',
                    ],
                    metrics: [
                        { value: '96%', label: 'Entity Accuracy Score' },
                        { value: '3.1x', label: 'Product Mentions Increase' },
                    ],
                },
                {
                    icon: Search,
                    title: 'Transactional Intent Matching',
                    description: 'Our semantic engine maps your product content to real buyer queries. We identify the high-intent questions shoppers are asking AI and show you exactly how to match them.',
                    bullets: [
                        'Buyer intent query discovery',
                        'Product-to-query semantic alignment scoring',
                        'Category page optimization recommendations',
                        'FAQ generation from real shopper questions',
                    ],
                    metrics: [
                        { value: '87%', label: 'Intent Match Rate' },
                        { value: '156%', label: 'Organic Conversion Lift' },
                    ],
                },
                {
                    icon: BarChart3,
                    title: 'Competitive Product Intelligence',
                    description: 'Track how competitor products appear in AI recommendations. See why certain products are featured over yours and get actionable steps to close the gap.',
                    bullets: [
                        'AI recommendation share tracking',
                        'Competitor product content analysis',
                        'Missing feature and spec gap alerts',
                        'Category-level visibility benchmarking',
                    ],
                    metrics: [
                        { value: '23', label: 'Avg. Competitive Gaps Found' },
                        { value: '41%', label: 'Market Share Recovery' },
                    ],
                },
            ]}
            testimonial={{
                quote: "We were spending $180K/month on paid search because our organic product visibility had cratered. After 8 weeks with AIVO, our products started appearing in AI shopping recommendations, and we cut paid spend by 35% while growing revenue.",
                name: "Marcus Rivera",
                role: "Head of E-commerce",
                company: "TechGear Pro",
            }}
            ctaTitle="Make your products the AI's top recommendation"
            ctaDescription="Start optimizing your product content for AI-powered shopping in minutes."
            ctaButton="Start Your Free Trial"
        />
    );
}
