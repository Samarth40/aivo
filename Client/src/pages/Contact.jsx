import React, { useState } from 'react';
import { z } from 'zod';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    ArrowRight,
    ArrowLeft,
    CheckCircle2,
    Mail,
    User,
    MessageSquare,
    Building2,
    MapPin,
    Phone,
    Calendar,
    Headphones,
    ShoppingCart,
    HelpCircle,
    Send,
} from 'lucide-react';
import { DotPattern } from '@/components/ui/dot-pattern';

// Zod schemas for each step
const step1Schema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
});

const step2Schema = z.object({
    inquiryType: z.enum(['general', 'sales', 'enterprise', 'support'], {
        errorMap: () => ({ message: 'Please select an inquiry type' }),
    }),
});

const step3Schema = z.object({
    message: z.string().min(10, 'Message must be at least 10 characters'),
});

const inquiryTypes = [
    { value: 'general', label: 'General Inquiry', icon: HelpCircle, description: 'Questions about AIVO' },
    { value: 'sales', label: 'Sales', icon: ShoppingCart, description: 'Pricing & plans' },
    { value: 'enterprise', label: 'Enterprise', icon: Building2, description: 'Custom solutions' },
    { value: 'support', label: 'Support', icon: Headphones, description: 'Technical help' },
];

const offices = [
    {
        city: 'Pune, India',
        address: 'PDEA\'s College of Engineering, Manjari (Bk), Pune, Maharashtra 412307',
        type: 'HQ & Engineering',
    },
    {
        city: 'Mumbai, India',
        address: 'Bandra Kurla Complex, Mumbai, Maharashtra 400051',
        type: 'Sales Office',
    },
    {
        city: 'Bangalore, India',
        address: 'Koramangala, Bangalore, Karnataka 560034',
        type: 'AI Research Lab',
    },
];

export default function Contact() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        inquiryType: '',
        message: '',
    });
    const [errors, setErrors] = useState({});

    const totalSteps = 3;

    const validateStep = (step) => {
        let result;
        switch (step) {
            case 1:
                result = step1Schema.safeParse({ name: formData.name, email: formData.email });
                break;
            case 2:
                result = step2Schema.safeParse({ inquiryType: formData.inquiryType });
                break;
            case 3:
                result = step3Schema.safeParse({ message: formData.message });
                break;
            default:
                return true;
        }

        if (!result.success) {
            const fieldErrors = {};
            result.error.errors.forEach((err) => {
                fieldErrors[err.path[0]] = err.message;
            });
            setErrors(fieldErrors);
            return false;
        }

        setErrors({});
        return true;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            if (currentStep < totalSteps) {
                setCurrentStep(currentStep + 1);
            } else {
                setIsSubmitted(true);
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setErrors({});
            setCurrentStep(currentStep - 1);
        }
    };

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };

    return (
        <div className="bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground pt-4">
            <main>
                {/* Hero */}
                <section className="relative pt-32 pb-16 md:pt-44 md:pb-20 overflow-hidden flex flex-col items-center justify-center">
                    <DotPattern
                        className="opacity-30"
                        cx={1} cy={1} cr={1}
                        width={20} height={20}
                        fill="currentColor"
                    />
                    <div className="w-full px-6 flex flex-col items-center text-center relative z-10">
                        <Badge variant="outline" className="px-3 py-1 md:py-1.5 rounded-full border-primary/20 bg-primary/5 text-primary text-[10px] md:text-xs font-semibold tracking-widest uppercase mb-8 animate-fade-up">
                            <Mail className="w-3 h-3 mr-2" />
                            Contact Us
                        </Badge>
                        <h1 className="max-w-4xl mx-auto text-4xl md:text-6xl lg:text-7xl font-heading font-medium text-white mb-6 leading-tight md:leading-[1.1] tracking-tight animate-fade-up">
                            Let's start a{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
                                conversation
                            </span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-base md:text-lg text-muted-foreground mb-6 animate-fade-up font-light leading-relaxed" style={{ animationDelay: '0.2s' }}>
                            Whether you're exploring AI visibility optimization or ready to transform your content strategy, we're here to help.
                        </p>
                    </div>
                </section>

                {/* Multi-step Form + Book a Demo */}
                <section className="py-16 md:py-24">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="grid lg:grid-cols-5 gap-12">
                            {/* Form - Takes 3 columns */}
                            <div className="lg:col-span-3">
                                <Card className="glass rounded-2xl border-border bg-transparent overflow-hidden">
                                    <CardContent className="p-8 md:p-10">
                                        {!isSubmitted ? (
                                            <>
                                                {/* Step Indicator */}
                                                <div className="flex items-center gap-2 mb-10">
                                                    {[1, 2, 3].map((step) => (
                                                        <React.Fragment key={step}>
                                                            <div className={`flex items-center justify-center w-9 h-9 rounded-full text-sm font-bold transition-all duration-300 ${currentStep >= step
                                                                    ? 'bg-primary text-primary-foreground shadow-[0_0_16px_rgba(var(--primary),0.4)]'
                                                                    : 'bg-white/5 text-muted-foreground border border-white/10'
                                                                }`}>
                                                                {currentStep > step ? (
                                                                    <CheckCircle2 className="w-4 h-4" />
                                                                ) : (
                                                                    step
                                                                )}
                                                            </div>
                                                            {step < 3 && (
                                                                <div className={`flex-1 h-px transition-colors duration-300 ${currentStep > step ? 'bg-primary/50' : 'bg-white/10'}`}></div>
                                                            )}
                                                        </React.Fragment>
                                                    ))}
                                                </div>

                                                {/* Step 1: Name & Email */}
                                                {currentStep === 1 && (
                                                    <div className="space-y-6 animate-fade-up">
                                                        <div>
                                                            <h3 className="text-2xl font-heading font-bold text-white mb-2">Your Details</h3>
                                                            <p className="text-muted-foreground text-sm">Tell us who you are so we can get back to you.</p>
                                                        </div>
                                                        <div className="space-y-4">
                                                            <div>
                                                                <label className="text-sm font-medium text-white mb-2 block">Full Name</label>
                                                                <div className="relative">
                                                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                                    <Input
                                                                        className="bg-white/5 border-white/10 focus-visible:ring-primary text-white pl-10 py-6"
                                                                        placeholder="John Doe"
                                                                        value={formData.name}
                                                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                                                    />
                                                                </div>
                                                                {errors.name && <p className="text-red-400 text-xs mt-1.5">{errors.name}</p>}
                                                            </div>
                                                            <div>
                                                                <label className="text-sm font-medium text-white mb-2 block">Email Address</label>
                                                                <div className="relative">
                                                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                                    <Input
                                                                        className="bg-white/5 border-white/10 focus-visible:ring-primary text-white pl-10 py-6"
                                                                        placeholder="john@company.com"
                                                                        type="email"
                                                                        value={formData.email}
                                                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                                                    />
                                                                </div>
                                                                {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Step 2: Inquiry Type */}
                                                {currentStep === 2 && (
                                                    <div className="space-y-6 animate-fade-up">
                                                        <div>
                                                            <h3 className="text-2xl font-heading font-bold text-white mb-2">Inquiry Type</h3>
                                                            <p className="text-muted-foreground text-sm">Select the category that best fits your inquiry.</p>
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4">
                                                            {inquiryTypes.map((type) => (
                                                                <button
                                                                    key={type.value}
                                                                    onClick={() => handleInputChange('inquiryType', type.value)}
                                                                    className={`p-5 rounded-xl border text-left transition-all duration-300 cursor-pointer ${formData.inquiryType === type.value
                                                                            ? 'border-primary bg-primary/10 shadow-[0_0_20px_rgba(var(--primary),0.15)]'
                                                                            : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                                                                        }`}
                                                                >
                                                                    <type.icon className={`w-5 h-5 mb-3 ${formData.inquiryType === type.value ? 'text-primary' : 'text-muted-foreground'}`} />
                                                                    <p className={`text-sm font-semibold ${formData.inquiryType === type.value ? 'text-white' : 'text-slate-300'}`}>{type.label}</p>
                                                                    <p className="text-xs text-muted-foreground mt-1">{type.description}</p>
                                                                </button>
                                                            ))}
                                                        </div>
                                                        {errors.inquiryType && <p className="text-red-400 text-xs mt-1.5">{errors.inquiryType}</p>}
                                                    </div>
                                                )}

                                                {/* Step 3: Message */}
                                                {currentStep === 3 && (
                                                    <div className="space-y-6 animate-fade-up">
                                                        <div>
                                                            <h3 className="text-2xl font-heading font-bold text-white mb-2">Your Message</h3>
                                                            <p className="text-muted-foreground text-sm">Share the details of your inquiry. The more context, the better.</p>
                                                        </div>
                                                        <div>
                                                            <div className="relative">
                                                                <Textarea
                                                                    className="bg-white/5 border-white/10 focus-visible:ring-primary text-white min-h-[180px] resize-none"
                                                                    placeholder="Tell us about your content strategy goals, challenges, or questions..."
                                                                    value={formData.message}
                                                                    onChange={(e) => handleInputChange('message', e.target.value)}
                                                                />
                                                            </div>
                                                            {errors.message && <p className="text-red-400 text-xs mt-1.5">{errors.message}</p>}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Navigation Buttons */}
                                                <div className="flex justify-between items-center mt-10">
                                                    <Button
                                                        variant="outline"
                                                        className={`rounded-full bg-transparent border-border hover:bg-white/5 text-white px-6 ${currentStep === 1 ? 'invisible' : ''}`}
                                                        onClick={handleBack}
                                                    >
                                                        <ArrowLeft className="w-4 h-4 mr-2" /> Back
                                                    </Button>
                                                    <Button
                                                        className="rounded-full px-8 font-semibold hover:scale-105 transition-transform duration-300"
                                                        onClick={handleNext}
                                                    >
                                                        {currentStep === totalSteps ? (
                                                            <>Submit <Send className="w-4 h-4 ml-2" /></>
                                                        ) : (
                                                            <>Next <ArrowRight className="w-4 h-4 ml-2" /></>
                                                        )}
                                                    </Button>
                                                </div>
                                            </>
                                        ) : (
                                            /* Success State */
                                            <div className="text-center py-12 animate-fade-up">
                                                <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
                                                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                                                </div>
                                                <h3 className="text-2xl font-heading font-bold text-white mb-3">Message Sent!</h3>
                                                <p className="text-muted-foreground max-w-md mx-auto mb-8">
                                                    Thank you, {formData.name}! Our team will review your {formData.inquiryType} inquiry and get back to you within 24 hours.
                                                </p>
                                                <Button
                                                    variant="outline"
                                                    className="rounded-full bg-transparent border-border hover:bg-white/5 text-white"
                                                    onClick={() => {
                                                        setIsSubmitted(false);
                                                        setCurrentStep(1);
                                                        setFormData({ name: '', email: '', inquiryType: '', message: '' });
                                                    }}
                                                >
                                                    Send Another Message
                                                </Button>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Book a Demo - Takes 2 columns */}
                            <div className="lg:col-span-2 space-y-6">
                                <Card className="bg-primary/5 border-primary/20 backdrop-blur rounded-2xl overflow-hidden relative group">
                                    <CardContent className="p-8">
                                        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-5">
                                            <Calendar className="w-6 h-6 text-primary" />
                                        </div>
                                        <h3 className="text-xl font-heading font-bold text-white mb-2">Book a Demo</h3>
                                        <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                                            See AIVO in action. Schedule a personalized walkthrough with our team, tailored to your enterprise needs.
                                        </p>
                                        <div className="bg-black/40 rounded-xl border border-white/10 p-6 mb-6 text-center">
                                            <Calendar className="w-10 h-10 text-primary/40 mx-auto mb-3" />
                                            <p className="text-xs text-muted-foreground mb-4">Calendly scheduling widget</p>
                                            <Button
                                                className="rounded-full px-6 font-semibold hover:scale-105 transition-transform duration-300 w-full"
                                                onClick={() => window.open('https://calendly.com', '_blank')}
                                            >
                                                Schedule a Call
                                            </Button>
                                        </div>
                                        <p className="text-[10px] text-muted-foreground text-center uppercase tracking-widest">
                                            30-minute personalized session • No commitment
                                        </p>
                                    </CardContent>
                                </Card>

                                {/* Quick Contact */}
                                <Card className="glass rounded-2xl border-border bg-transparent">
                                    <CardContent className="p-8">
                                        <h3 className="text-lg font-heading font-bold text-white mb-5">Quick Contact</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                                                    <Mail className="w-4 h-4 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-muted-foreground">Email</p>
                                                    <p className="text-sm text-white">hello@aivo.ai</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                                                    <Phone className="w-4 h-4 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-muted-foreground">Phone</p>
                                                    <p className="text-sm text-white">+91 20 1234 5678</p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Office Locations */}
                <section className="py-24 bg-card/30 border-y border-border">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="text-center mb-16 animate-fade-up">
                            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-4 block">Our Offices</span>
                            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white leading-tight">
                                Find us <span className="text-primary">worldwide</span>
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                            {offices.map((office, i) => (
                                <Card key={i} className="glass rounded-2xl border-border bg-transparent group hover:border-primary/30 transition-all duration-300 animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                                    <CardContent className="p-8">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                                            <MapPin className="w-6 h-6 text-primary" />
                                        </div>
                                        <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary text-[10px] font-semibold tracking-widest uppercase mb-4">
                                            {office.type}
                                        </Badge>
                                        <h3 className="text-lg font-heading font-bold text-white mb-2">{office.city}</h3>
                                        <p className="text-muted-foreground text-sm leading-relaxed">{office.address}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
