import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Cookie, FileText, ChevronRight, Settings2 } from 'lucide-react';

const sections = [
    { id: 'what', title: '1. What Are Cookies' },
    { id: 'how', title: '2. How We Use Cookies' },
    { id: 'types', title: '3. Types of Cookies' },
    { id: 'third-party', title: '4. Third-Party Cookies' },
    { id: 'manage', title: '5. Managing Cookies' },
    { id: 'changes', title: '6. Changes to Policy' },
    { id: 'contact', title: '7. Contact Us' },
];

export default function CookiePolicy() {
    const [activeSection, setActiveSection] = useState('what');

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

    const handleManageCookies = () => {
        localStorage.removeItem('aivo-cookie-consent');
        window.location.reload();
    };

    return (
        <div className="bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
            <main className="pt-32 pb-24">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Header */}
                    <div className="mb-16 max-w-3xl animate-fade-up">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                            <Link to="/" className="hover:text-white transition-colors">Home</Link>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-primary">Cookie Policy</span>
                        </div>
                        <Badge variant="outline" className="px-3 py-1 rounded-full border-primary/20 bg-primary/5 text-primary text-[10px] font-semibold tracking-widest uppercase mb-6">
                            <Cookie className="w-3 h-3 mr-2" />
                            Cookies
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 tracking-tight">Cookie Policy</h1>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            This policy explains how AIVO uses cookies and similar technologies to recognize you when you visit our platform.
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
                                        <Link to="/legal/privacy" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                                            <FileText className="w-3.5 h-3.5" /> Privacy Policy
                                        </Link>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <Button
                                        variant="outline"
                                        className="w-full rounded-xl bg-transparent border-primary/20 hover:bg-primary/10 text-primary text-sm"
                                        onClick={handleManageCookies}
                                    >
                                        <Settings2 className="w-4 h-4 mr-2" /> Manage Cookies
                                    </Button>
                                </div>
                            </div>
                        </aside>

                        {/* Content */}
                        <article className="flex-1 max-w-3xl">
                            <section id="what" className="mb-12 scroll-mt-28">
                                <h2 className="text-2xl font-heading font-bold text-white mb-4">1. What Are Cookies</h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work efficiently, provide reporting information, and help with personalizing your experience.
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    Cookies set by the website owner (in this case, AIVO) are called "first-party cookies." Cookies set by parties other than the website owner are called "third-party cookies." Third-party cookies enable third-party features or functionality to be provided on or through the website.
                                </p>
                            </section>

                            <section id="how" className="mb-12 scroll-mt-28">
                                <h2 className="text-2xl font-heading font-bold text-white mb-4">2. How We Use Cookies</h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">AIVO uses cookies for the following purposes:</p>
                                <ul className="space-y-2 text-muted-foreground ml-6 list-disc">
                                    <li><strong className="text-white">Authentication:</strong> To identify you when you log in and maintain your session</li>
                                    <li><strong className="text-white">Preferences:</strong> To remember your settings and preferences (theme, language, dashboard layout)</li>
                                    <li><strong className="text-white">Analytics:</strong> To understand how users interact with our platform and improve the experience</li>
                                    <li><strong className="text-white">Security:</strong> To protect against fraudulent activity and unauthorized access</li>
                                </ul>
                            </section>

                            <section id="types" className="mb-12 scroll-mt-28">
                                <h2 className="text-2xl font-heading font-bold text-white mb-4">3. Types of Cookies We Use</h2>

                                <div className="space-y-6">
                                    <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                                        <h3 className="text-base font-heading font-semibold text-white mb-2">Essential Cookies</h3>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            Required for the platform to function. These include session management, authentication tokens, and CSRF protection. Cannot be disabled.
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-2"><strong className="text-white">Duration:</strong> Session / 30 days</p>
                                    </div>

                                    <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                                        <h3 className="text-base font-heading font-semibold text-white mb-2">Functional Cookies</h3>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            Enable personalized features such as theme preferences, dashboard layouts, and language settings. Enhance your experience but are not strictly necessary.
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-2"><strong className="text-white">Duration:</strong> 1 year</p>
                                    </div>

                                    <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                                        <h3 className="text-base font-heading font-semibold text-white mb-2">Analytics Cookies</h3>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            Help us understand how users navigate and interact with the platform. Data is aggregated and anonymized. We use this information to improve our Service.
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-2"><strong className="text-white">Duration:</strong> 2 years</p>
                                    </div>

                                    <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                                        <h3 className="text-base font-heading font-semibold text-white mb-2">Marketing Cookies</h3>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            Used to track visitors across websites for the purpose of displaying ads that are relevant to you. Currently, AIVO does not use marketing cookies but reserves the right to do so with prior notification.
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-2"><strong className="text-white">Duration:</strong> N/A</p>
                                    </div>
                                </div>
                            </section>

                            <section id="third-party" className="mb-12 scroll-mt-28">
                                <h2 className="text-2xl font-heading font-bold text-white mb-4">4. Third-Party Cookies</h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    Some cookies are placed by third-party services that appear on our pages. We do not control these cookies. Third parties that may set cookies include:
                                </p>
                                <ul className="space-y-2 text-muted-foreground ml-6 list-disc">
                                    <li><strong className="text-white">Analytics Providers:</strong> To collect anonymous usage statistics</li>
                                    <li><strong className="text-white">Payment Processors:</strong> To securely handle payment transactions</li>
                                    <li><strong className="text-white">Scheduling Tools:</strong> When you use our "Book a Demo" feature (e.g., Calendly)</li>
                                </ul>
                            </section>

                            <section id="manage" className="mb-12 scroll-mt-28">
                                <h2 className="text-2xl font-heading font-bold text-white mb-4">5. Managing Your Cookie Preferences</h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    You can manage your cookie preferences at any time. You have the following options:
                                </p>
                                <ul className="space-y-2 text-muted-foreground ml-6 list-disc mb-6">
                                    <li><strong className="text-white">Cookie Banner:</strong> Use our on-site cookie consent banner to accept or reject non-essential cookies</li>
                                    <li><strong className="text-white">Browser Settings:</strong> Most browsers allow you to block or delete cookies through their settings</li>
                                    <li><strong className="text-white">This Page:</strong> Click the button below to reset your cookie preferences and re-display the consent banner</li>
                                </ul>
                                <Button
                                    variant="outline"
                                    className="rounded-xl bg-transparent border-primary/20 hover:bg-primary/10 text-primary"
                                    onClick={handleManageCookies}
                                >
                                    <Settings2 className="w-4 h-4 mr-2" /> Reset Cookie Preferences
                                </Button>
                                <p className="text-muted-foreground text-sm mt-4">
                                    Please note that blocking some cookies may impact your experience on the platform.
                                </p>
                            </section>

                            <section id="changes" className="mb-12 scroll-mt-28">
                                <h2 className="text-2xl font-heading font-bold text-white mb-4">6. Changes to This Policy</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    We may update this Cookie Policy from time to time to reflect changes in our practices or for operational, legal, or regulatory reasons. Any changes will be posted on this page with an updated "Last updated" date.
                                </p>
                            </section>

                            <section id="contact" className="mb-12 scroll-mt-28">
                                <h2 className="text-2xl font-heading font-bold text-white mb-4">7. Contact Us</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    If you have any questions about our use of cookies, please contact us at{' '}
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
