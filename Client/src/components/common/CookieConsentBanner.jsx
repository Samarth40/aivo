import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Cookie, X, Shield } from 'lucide-react';

export default function CookieConsentBanner() {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('aivo-cookie-consent');
        if (!consent) {
            // Small delay so it slides up after page load
            const timer = setTimeout(() => {
                setIsVisible(true);
                requestAnimationFrame(() => setIsAnimating(true));
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    // Also listen for storage changes (for when Cookie Policy page resets consent)
    useEffect(() => {
        const handleStorage = () => {
            const consent = localStorage.getItem('aivo-cookie-consent');
            if (!consent) {
                setIsVisible(true);
                requestAnimationFrame(() => setIsAnimating(true));
            }
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    const handleConsent = (choice) => {
        localStorage.setItem('aivo-cookie-consent', JSON.stringify({
            consent: choice,
            timestamp: new Date().toISOString(),
        }));
        setIsAnimating(false);
        setTimeout(() => setIsVisible(false), 400);
    };

    if (!isVisible) return null;

    return (
        <div
            className={`fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 transition-all duration-500 ease-out ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                }`}
        >
            <div className="max-w-5xl mx-auto">
                <div className="glass rounded-2xl border border-white/10 p-6 md:p-8 shadow-2xl shadow-black/40">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        {/* Icon & Text */}
                        <div className="flex items-start gap-4 flex-1">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                <Cookie className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h4 className="text-sm font-heading font-bold text-white mb-1">We value your privacy</h4>
                                <p className="text-xs text-muted-foreground leading-relaxed max-w-lg">
                                    We use cookies to enhance your experience, analyze site traffic, and serve personalized content. Read our{' '}
                                    <Link to="/legal/cookies" className="text-primary hover:underline">Cookie Policy</Link>{' '}
                                    for more information.
                                </p>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
                            <Button
                                variant="outline"
                                size="sm"
                                className="rounded-full bg-transparent border-white/10 hover:bg-white/5 text-white text-xs px-4 flex-1 md:flex-none"
                                onClick={() => handleConsent('rejected')}
                            >
                                Reject All
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="rounded-full bg-transparent border-primary/20 hover:bg-primary/10 text-primary text-xs px-4 flex-1 md:flex-none"
                                onClick={() => handleConsent('essential')}
                            >
                                <Shield className="w-3 h-3 mr-1.5" />
                                Essentials Only
                            </Button>
                            <Button
                                size="sm"
                                className="rounded-full text-xs px-5 font-semibold hover:scale-105 transition-transform flex-1 md:flex-none"
                                onClick={() => handleConsent('accepted')}
                            >
                                Accept All
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
