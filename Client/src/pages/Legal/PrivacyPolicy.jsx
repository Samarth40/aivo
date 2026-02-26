import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Shield, FileText, ChevronRight } from 'lucide-react';

const sections = [
    { id: 'overview', title: '1. Overview' },
    { id: 'collect', title: '2. Information We Collect' },
    { id: 'usage', title: '3. How We Use Your Data' },
    { id: 'sharing', title: '4. Data Sharing' },
    { id: 'retention', title: '5. Data Retention' },
    { id: 'security', title: '6. Security' },
    { id: 'rights', title: '7. Your Rights' },
    { id: 'international', title: '8. International Transfers' },
    { id: 'children', title: '9. Children\'s Privacy' },
    { id: 'changes', title: '10. Policy Changes' },
    { id: 'contact', title: '11. Contact Us' },
];

export default function PrivacyPolicy() {
    const [activeSection, setActiveSection] = useState('overview');

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
                            <span className="text-primary">Privacy Policy</span>
                        </div>
                        <Badge variant="outline" className="px-3 py-1 rounded-full border-primary/20 bg-primary/5 text-primary text-[10px] font-semibold tracking-widest uppercase mb-6">
                            <Shield className="w-3 h-3 mr-2" />
                            Privacy
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 tracking-tight">Privacy Policy</h1>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Your privacy matters to us. This policy explains how AIVO collects, uses, shares, and protects your personal information.
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
                                        <Link to="/legal/terms" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                                            <FileText className="w-3.5 h-3.5" /> Terms of Service
                                        </Link>
                                        <Link to="/legal/cookies" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                                            <FileText className="w-3.5 h-3.5" /> Cookie Policy
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Content */}
                        <article className="flex-1 max-w-3xl">
                            <section id="overview" className="mb-12 scroll-mt-28">
                                <h2 className="text-2xl font-heading font-bold text-white mb-4">1. Overview</h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    AIVO, Inc. ("we", "us", or "our") operates the AIVO AI Visibility Optimization platform. This Privacy Policy informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    We are committed to protecting your privacy and ensuring compliance with the General Data Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA), and other applicable data protection laws.
                                </p>
                            </section>

                            <section id="collect" className="mb-12 scroll-mt-28">
                                <h2 className="text-2xl font-heading font-bold text-white mb-4">2. Information We Collect</h2>
                                <h3 className="text-lg font-heading font-semibold text-white mb-3 mt-6">2.1 Information You Provide</h3>
                                <ul className="space-y-2 text-muted-foreground ml-6 list-disc">
                                    <li><strong className="text-white">Account Information:</strong> Name, email address, company name, and password when you register</li>
                                    <li><strong className="text-white">Content Data:</strong> URLs and text content you submit for analysis</li>
                                    <li><strong className="text-white">Payment Information:</strong> Billing address and payment method details (processed by our payment processor)</li>
                                    <li><strong className="text-white">Communications:</strong> Messages you send to us through our contact forms or support channels</li>
                                </ul>

                                <h3 className="text-lg font-heading font-semibold text-white mb-3 mt-6">2.2 Information Collected Automatically</h3>
                                <ul className="space-y-2 text-muted-foreground ml-6 list-disc">
                                    <li><strong className="text-white">Usage Data:</strong> How you interact with our Service, including pages visited and features used</li>
                                    <li><strong className="text-white">Device Information:</strong> Browser type, operating system, and device identifiers</li>
                                    <li><strong className="text-white">Log Data:</strong> IP address, access times, and referring URLs</li>
                                    <li><strong className="text-white">Cookies:</strong> As described in our <Link to="/legal/cookies" className="text-primary hover:underline">Cookie Policy</Link></li>
                                </ul>
                            </section>

                            <section id="usage" className="mb-12 scroll-mt-28">
                                <h2 className="text-2xl font-heading font-bold text-white mb-4">3. How We Use Your Data</h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">We use the collected data for the following purposes:</p>
                                <ul className="space-y-2 text-muted-foreground ml-6 list-disc">
                                    <li>To provide, maintain, and improve the AIVO platform</li>
                                    <li>To analyze content and generate AI visibility reports</li>
                                    <li>To process payments and manage subscriptions</li>
                                    <li>To communicate with you about service updates, security alerts, and support messages</li>
                                    <li>To detect, prevent, and address technical issues and security threats</li>
                                    <li>To comply with legal obligations</li>
                                </ul>
                            </section>

                            <section id="sharing" className="mb-12 scroll-mt-28">
                                <h2 className="text-2xl font-heading font-bold text-white mb-4">4. Data Sharing</h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    We do not sell your personal data. We may share your information only in the following circumstances:
                                </p>
                                <ul className="space-y-2 text-muted-foreground ml-6 list-disc">
                                    <li><strong className="text-white">Service Providers:</strong> Third-party vendors who assist us in providing the Service (cloud hosting, payment processing, analytics)</li>
                                    <li><strong className="text-white">AI Processing:</strong> Content you submit may be processed by external LLM APIs (e.g., OpenAI, Google) for analysis purposes. Content is not stored by these providers beyond the processing session.</li>
                                    <li><strong className="text-white">Legal Requirements:</strong> When required by law, regulation, or legal process</li>
                                    <li><strong className="text-white">Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                                </ul>
                            </section>

                            <section id="retention" className="mb-12 scroll-mt-28">
                                <h2 className="text-2xl font-heading font-bold text-white mb-4">5. Data Retention</h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    We retain your personal data only for as long as necessary to fulfill the purposes outlined in this Privacy Policy. Specifically:
                                </p>
                                <ul className="space-y-2 text-muted-foreground ml-6 list-disc">
                                    <li>Account data is retained until you delete your account</li>
                                    <li>Analysis reports are retained for 12 months after generation</li>
                                    <li>Usage logs are retained for 90 days</li>
                                    <li>Payment records are retained as required by tax and accounting regulations</li>
                                </ul>
                            </section>

                            <section id="security" className="mb-12 scroll-mt-28">
                                <h2 className="text-2xl font-heading font-bold text-white mb-4">6. Security</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    We implement industry-standard security measures to protect your data, including encryption in transit (TLS) and at rest, role-based access control (RBAC), network segmentation within our Kubernetes infrastructure, and regular security audits. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                                </p>
                            </section>

                            <section id="rights" className="mb-12 scroll-mt-28">
                                <h2 className="text-2xl font-heading font-bold text-white mb-4">7. Your Rights</h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    Depending on your location, you may have the following rights regarding your personal data:
                                </p>
                                <ul className="space-y-2 text-muted-foreground ml-6 list-disc">
                                    <li><strong className="text-white">Access:</strong> Request a copy of the personal data we hold about you</li>
                                    <li><strong className="text-white">Rectification:</strong> Request correction of inaccurate personal data</li>
                                    <li><strong className="text-white">Erasure:</strong> Request deletion of your personal data ("right to be forgotten")</li>
                                    <li><strong className="text-white">Portability:</strong> Request your data in a structured, machine-readable format</li>
                                    <li><strong className="text-white">Objection:</strong> Object to processing of your personal data</li>
                                    <li><strong className="text-white">Restriction:</strong> Request restriction of processing of your personal data</li>
                                </ul>
                                <p className="text-muted-foreground leading-relaxed mt-4">
                                    To exercise any of these rights, please contact us at <a href="mailto:privacy@aivo.ai" className="text-primary hover:underline">privacy@aivo.ai</a>.
                                </p>
                            </section>

                            <section id="international" className="mb-12 scroll-mt-28">
                                <h2 className="text-2xl font-heading font-bold text-white mb-4">8. International Data Transfers</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    Your information may be transferred to and maintained on servers located outside of your state, province, country, or jurisdiction where data protection laws may differ. We ensure appropriate safeguards are in place, including standard contractual clauses as approved by relevant data protection authorities.
                                </p>
                            </section>

                            <section id="children" className="mb-12 scroll-mt-28">
                                <h2 className="text-2xl font-heading font-bold text-white mb-4">9. Children's Privacy</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    Our Service is not intended for individuals under the age of 16. We do not knowingly collect personal data from children. If you are a parent or guardian and you are aware that your child has provided us with personal data, please contact us.
                                </p>
                            </section>

                            <section id="changes" className="mb-12 scroll-mt-28">
                                <h2 className="text-2xl font-heading font-bold text-white mb-4">10. Policy Changes</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
                                </p>
                            </section>

                            <section id="contact" className="mb-12 scroll-mt-28">
                                <h2 className="text-2xl font-heading font-bold text-white mb-4">11. Contact Us</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    If you have any questions about this Privacy Policy, please contact our Data Protection Officer at{' '}
                                    <a href="mailto:privacy@aivo.ai" className="text-primary hover:underline">privacy@aivo.ai</a>{' '}
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
