import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Scale, FileText, ChevronRight } from 'lucide-react';

const sections = [
    { id: 'acceptance', title: '1. Acceptance of Terms' },
    { id: 'description', title: '2. Service Description' },
    { id: 'accounts', title: '3. User Accounts' },
    { id: 'use', title: '4. Acceptable Use' },
    { id: 'ip', title: '5. Intellectual Property' },
    { id: 'data', title: '6. Data & Privacy' },
    { id: 'payment', title: '7. Payment Terms' },
    { id: 'termination', title: '8. Termination' },
    { id: 'liability', title: '9. Limitation of Liability' },
    { id: 'governing', title: '10. Governing Law' },
    { id: 'changes', title: '11. Changes to Terms' },
    { id: 'contact', title: '12. Contact' },
];

export default function TermsOfService() {
    const [activeSection, setActiveSection] = useState('acceptance');
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            for (const section of sections) {
                const el = document.getElementById(section.id);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        setActiveSection(section.id);
                        break;
                    }
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
            <main className="pt-32 pb-24">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Header */}
                    <div className="mb-16 max-w-3xl animate-fade-up">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                            <Link to="/" className="hover:text-white transition-colors">Home</Link>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-primary">Terms of Service</span>
                        </div>
                        <Badge variant="outline" className="px-3 py-1 rounded-full border-primary/20 bg-primary/5 text-primary text-[10px] font-semibold tracking-widest uppercase mb-6">
                            <Scale className="w-3 h-3 mr-2" />
                            Legal
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 tracking-tight">Terms of Service</h1>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Please read these terms carefully before using the AIVO platform. By accessing or using our services, you agree to be bound by these terms.
                        </p>
                        <p className="text-muted-foreground text-sm mt-4">Last updated: February 2026</p>
                    </div>

                    <div className="flex gap-12">
                        {/* Sidebar TOC */}
                        <aside className="hidden lg:block w-64 shrink-0">
                            <div className="sticky top-28">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">On this page</h4>
                                <nav className="space-y-1">
                                    {sections.map((section) => (
                                        <a
                                            key={section.id}
                                            href={`#${section.id}`}
                                            className={`block text-sm py-1.5 px-3 rounded-lg transition-all duration-200 ${activeSection === section.id
                                                    ? 'text-primary bg-primary/10 font-medium'
                                                    : 'text-muted-foreground hover:text-white hover:bg-white/5'
                                                }`}
                                        >
                                            {section.title}
                                        </a>
                                    ))}
                                </nav>
                                <div className="mt-8 pt-6 border-t border-white/10">
                                    <div className="flex flex-col gap-2 text-sm">
                                        <Link to="/legal/privacy" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                                            <FileText className="w-3.5 h-3.5" /> Privacy Policy
                                        </Link>
                                        <Link to="/legal/cookies" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                                            <FileText className="w-3.5 h-3.5" /> Cookie Policy
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Content */}
                        <article className="flex-1 max-w-3xl legal-content">
                            <section id="acceptance" className="mb-12 scroll-mt-28">
                                <h2 className="text-2xl font-heading font-bold text-white mb-4">1. Acceptance of Terms</h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    By accessing, browsing, or using the AIVO platform ("Service"), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you must not use the Service.
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    These Terms apply to all visitors, users, and others who access or use the Service. By using the Service, you also agree to our <Link to="/legal/privacy" className="text-primary hover:underline">Privacy Policy</Link> and <Link to="/legal/cookies" className="text-primary hover:underline">Cookie Policy</Link>.
                                </p>
                            </section>

                            <section id="description" className="mb-12 scroll-mt-28">
                                <h2 className="text-2xl font-heading font-bold text-white mb-4">2. Service Description</h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    AIVO is an AI Visibility Optimization platform designed to help content teams optimize their web content for AI-powered answer engines, including but not limited to Google AI Overviews, Gemini, ChatGPT, and similar systems.
                                </p>
                                <p className="text-muted-foreground leading-relaxed mb-4">The Service includes, but is not limited to:</p>
                                <ul className="space-y-2 text-muted-foreground ml-6 list-disc">
                                    <li>Content extraction and semantic analysis</li>
                                    <li>Entity and knowledge graph construction</li>
                                    <li>AI visibility scoring and simulation</li>
                                    <li>Competitor intelligence and benchmarking</li>
                                    <li>Actionable content recommendations</li>
                                    <li>Report generation and historical tracking</li>
                                </ul>
                            </section>

                            <section id="accounts" className="mb-12 scroll-mt-28">
                                <h2 className="text-2xl font-heading font-bold text-white mb-4">3. User Accounts</h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    To access certain features of the Service, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    You are responsible for safeguarding your account credentials and for any activities or actions under your account. You agree to notify AIVO immediately of any unauthorized access to or use of your account.
                                </p>
                            </section>

                            <section id="use" className="mb-12 scroll-mt-28">
                                <h2 className="text-2xl font-heading font-bold text-white mb-4">4. Acceptable Use</h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">You agree not to use the Service to:</p>
                                <ul className="space-y-2 text-muted-foreground ml-6 list-disc">
                                    <li>Violate any applicable local, state, national, or international law</li>
                                    <li>Engage in any activity that is harmful, fraudulent, or deceptive</li>
                                    <li>Attempt to scrape, data-mine, or reverse-engineer the Service</li>
                                    <li>Manipulate AI systems with misleading or false content</li>
                                    <li>Upload content that infringes on intellectual property rights</li>
                                    <li>Interfere with the security or integrity of the Service</li>
                                </ul>
                            </section>

                            <section id="ip" className="mb-12 scroll-mt-28">
                                <h2 className="text-2xl font-heading font-bold text-white mb-4">5. Intellectual Property</h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    The Service and its original content (excluding user-submitted content), features, and functionality are and will remain the exclusive property of AIVO, Inc. and its licensors. The Service is protected by copyright, trademark, and other laws.
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    You retain all rights to your content. By submitting content to the Service, you grant AIVO a non-exclusive, worldwide, royalty-free license to use, process, and analyze your content solely for the purpose of providing the Service to you.
                                </p>
                            </section>

                            <section id="data" className="mb-12 scroll-mt-28">
                                <h2 className="text-2xl font-heading font-bold text-white mb-4">6. Data & Privacy</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    Your privacy is critically important to us. Our collection and use of personal information in connection with the Service is described in our <Link to="/legal/privacy" className="text-primary hover:underline">Privacy Policy</Link>. By using the Service, you consent to the collection and use of your information as outlined therein.
                                </p>
                            </section>

                            <section id="payment" className="mb-12 scroll-mt-28">
                                <h2 className="text-2xl font-heading font-bold text-white mb-4">7. Payment Terms</h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    Some aspects of the Service are provided on a paid subscription basis. You will be billed in advance on a recurring basis ("Billing Cycle"). Billing cycles are set on a monthly or annual basis, depending on the subscription plan you select.
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    All fees are non-refundable except as expressly stated in these Terms or as required by applicable law. AIVO reserves the right to change subscription fees upon 30 days' written notice.
                                </p>
                            </section>

                            <section id="termination" className="mb-12 scroll-mt-28">
                                <h2 className="text-2xl font-heading font-bold text-white mb-4">8. Termination</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason, including but not limited to a breach of these Terms. Upon termination, your right to use the Service will immediately cease. All data associated with your account may be deleted after a 30-day grace period.
                                </p>
                            </section>

                            <section id="liability" className="mb-12 scroll-mt-28">
                                <h2 className="text-2xl font-heading font-bold text-white mb-4">9. Limitation of Liability</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    In no event shall AIVO, Inc., nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                                </p>
                            </section>

                            <section id="governing" className="mb-12 scroll-mt-28">
                                <h2 className="text-2xl font-heading font-bold text-white mb-4">10. Governing Law</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in Pune, Maharashtra, India.
                                </p>
                            </section>

                            <section id="changes" className="mb-12 scroll-mt-28">
                                <h2 className="text-2xl font-heading font-bold text-white mb-4">11. Changes to Terms</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    We reserve the right to modify or replace these Terms at any time at our sole discretion. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. Continued use of the Service after any such changes constitutes your acceptance of the new Terms.
                                </p>
                            </section>

                            <section id="contact" className="mb-12 scroll-mt-28">
                                <h2 className="text-2xl font-heading font-bold text-white mb-4">12. Contact</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    If you have any questions about these Terms, please contact us at{' '}
                                    <a href="mailto:legal@aivo.ai" className="text-primary hover:underline">legal@aivo.ai</a>{' '}
                                    or visit our <Link to="/contact" className="text-primary hover:underline">Contact page</Link>.
                                </p>
                            </section>
                        </article>
                    </div>
                </div>
            </main>
        </div>
    );
}
