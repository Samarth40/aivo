import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowRight, ArrowLeft, Check, Globe, Target, Briefcase, Megaphone, Search, Sparkles, BrainCircuit, Network, BarChart3 } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DotPattern } from "@/components/ui/dot-pattern"

const ROLES = [
    {
        id: 'marketer',
        title: 'Digital Marketer',
        description: 'Running campaigns and optimizing content reach',
        icon: Megaphone,
    },
    {
        id: 'founder',
        title: 'Founder / CEO',
        description: 'Building and scaling a business online',
        icon: Briefcase,
    },
    {
        id: 'seo',
        title: 'SEO Specialist',
        description: 'Optimizing search visibility and rankings',
        icon: Search,
    },
]

const STEPS = [
    { number: 1, label: 'Your Role' },
    { number: 2, label: 'Your Domain' },
    { number: 3, label: 'Competitors' },
]

// Contextual tips that change with each step
const STEP_TIPS = [
    [
        { icon: Sparkles, text: 'Personalized AI insights based on your role' },
        { icon: BarChart3, text: 'Custom dashboards tailored to your workflow' },
    ],
    [
        { icon: BrainCircuit, text: 'We analyze your content for AI readiness' },
        { icon: Network, text: 'Build your unique knowledge graph' },
    ],
    [
        { icon: Target, text: 'Track competitor AI visibility scores' },
        { icon: Search, text: 'Get alerts when competitors gain citations' },
    ],
]

export default function OnboardingPage() {
    const navigate = useNavigate()
    const { isAuthenticated, isOnboarded, completeOnboarding } = useAuth()
    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState({
        role: '',
        domain: '',
        competitors: ['', '', ''],
    })
    const [errors, setErrors] = useState({})

    const validateStep = () => {
        const newErrors = {}
        if (currentStep === 1 && !formData.role) {
            newErrors.role = 'Please select your role'
        }
        if (currentStep === 2) {
            if (!formData.domain.trim()) {
                newErrors.domain = 'Please enter your primary domain'
            } else if (!/^[a-zA-Z0-9][a-zA-Z0-9-]*\.[a-zA-Z]{2,}$/.test(formData.domain.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0])) {
                newErrors.domain = 'Please enter a valid domain (e.g., example.com)'
            }
        }
        if (currentStep === 3) {
            const filledCompetitors = formData.competitors.filter(c => c.trim())
            if (filledCompetitors.length === 0) {
                newErrors.competitors = 'Please enter at least one competitor'
            }
        }
        return newErrors
    }

    const handleNext = () => {
        const validationErrors = validateStep()
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }
        setErrors({})
        if (currentStep < 3) {
            setCurrentStep(prev => prev + 1)
        } else {
            const submissionData = {
                ...formData,
                competitors: formData.competitors.filter(c => c.trim()),
            }
            console.log('Onboarding completed:', submissionData)
            completeOnboarding(submissionData)
            navigate('/dashboard')
        }
    }

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1)
            setErrors({})
        }
    }

    const updateCompetitor = (index, value) => {
        const newCompetitors = [...formData.competitors]
        newCompetitors[index] = value
        setFormData(prev => ({ ...prev, competitors: newCompetitors }))
        if (errors.competitors) setErrors(prev => ({ ...prev, competitors: '' }))
    }

    const currentTips = STEP_TIPS[currentStep - 1]

    return (
        <div className="relative min-h-screen flex flex-col bg-background text-foreground font-sans overflow-hidden">

            {/* ── Background Canvas (matching AuthLayout) ── */}
            <DotPattern
                className="opacity-15"
                cx={1} cy={1} cr={0.8}
                width={24} height={24}
                fill="currentColor"
            />

            {/* Atmospheric gradient orbs */}
            <div className="absolute top-[-15%] left-[20%] w-[500px] h-[500px] rounded-full bg-primary/20 blur-[200px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
            <div className="absolute bottom-[-10%] right-[15%] w-[450px] h-[450px] rounded-full bg-violet-500/12 blur-[180px] pointer-events-none animate-pulse" style={{ animationDuration: '12s' }} />
            <div className="absolute top-[50%] left-[-5%] w-[300px] h-[300px] rounded-full bg-blue-500/8 blur-[150px] pointer-events-none animate-pulse" style={{ animationDuration: '10s' }} />

            {/* Radial vignette */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 100%)' }}
            />

            {/* Subtle grid overlay */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px'
                }}
            />

            {/* ── Top Navigation ── */}
            <nav className="relative z-20 flex items-center justify-between px-6 md:px-10 py-5">
                <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
                    <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/30">
                        <span className="text-primary-foreground font-bold text-xl">A</span>
                    </div>
                    <span className="font-heading font-bold text-white text-2xl tracking-tight">AIVO</span>
                </Link>

                {/* Step progress pills in navbar */}
                <div className="hidden sm:flex items-center gap-2">
                    {STEPS.map((step, index) => (
                        <React.Fragment key={step.number}>
                            <div className="flex items-center gap-2">
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                                    currentStep > step.number
                                        ? 'bg-emerald-500 text-white'
                                        : currentStep === step.number
                                            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/40'
                                            : 'bg-muted/60 text-muted-foreground'
                                }`}>
                                    {currentStep > step.number ? (
                                        <Check className="w-3.5 h-3.5" />
                                    ) : (
                                        step.number
                                    )}
                                </div>
                                <span className={`text-xs font-medium hidden md:block transition-colors ${
                                    currentStep >= step.number ? 'text-foreground' : 'text-muted-foreground/60'
                                }`}>
                                    {step.label}
                                </span>
                            </div>
                            {index < STEPS.length - 1 && (
                                <div className={`w-8 h-0.5 rounded-full transition-colors duration-300 ${
                                    currentStep > step.number ? 'bg-emerald-500' : 'bg-muted/40'
                                }`} />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </nav>

            {/* ── Main Content ── */}
            <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-6">
                <div className="relative w-full max-w-6xl mx-auto">

                    {/* Floating context tips — positioned at sides */}
                    <div className="hidden lg:block">
                        {/* Left tip cards */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`left-tips-${currentStep}`}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3, delay: 0.15 }}
                                className="absolute top-1/2 -translate-y-1/2 left-0 xl:left-8 space-y-3"
                            >
                                {currentTips.map(({ icon: Icon, text }, i) => (
                                    <div key={i} className="glass rounded-xl p-3.5 flex items-center gap-3 max-w-[240px] hover:bg-white/[0.04] transition-all">
                                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <Icon className="w-4 h-4 text-primary" />
                                        </div>
                                        <p className="text-xs text-muted-foreground leading-relaxed">{text}</p>
                                    </div>
                                ))}
                            </motion.div>
                        </AnimatePresence>

                        {/* Right: progress info */}
                        <div className="absolute top-1/2 -translate-y-1/2 right-0 xl:right-8">
                            <div className="glass rounded-xl p-4 max-w-[220px]">
                                <p className="text-xs font-semibold text-foreground/80 mb-3">Setup Progress</p>
                                <div className="space-y-2">
                                    {STEPS.map((step) => (
                                        <div key={step.number} className="flex items-center gap-2.5">
                                            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                                                currentStep > step.number
                                                    ? 'bg-emerald-500/20 text-emerald-400'
                                                    : currentStep === step.number
                                                        ? 'bg-primary/20 text-primary'
                                                        : 'bg-muted/40 text-muted-foreground'
                                            }`}>
                                                {currentStep > step.number ? <Check className="w-3 h-3" /> : step.number}
                                            </div>
                                            <span className={`text-xs ${
                                                currentStep > step.number
                                                    ? 'text-emerald-400/80 line-through'
                                                    : currentStep === step.number
                                                        ? 'text-foreground font-medium'
                                                        : 'text-muted-foreground/50'
                                            }`}>
                                                {step.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-3 pt-3 border-t border-border/20">
                                    <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                                        <span>Completion</span>
                                        <span className="font-bold text-primary">{Math.round(((currentStep - 1) / 3) * 100)}%</span>
                                    </div>
                                    <div className="w-full h-1.5 rounded-full bg-muted/30 mt-1.5 overflow-hidden">
                                        <motion.div
                                            className="h-full rounded-full bg-gradient-to-r from-primary to-violet-500"
                                            initial={{ width: '0%' }}
                                            animate={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                                            transition={{ duration: 0.5, ease: 'easeOut' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Center: Form Card */}
                    <div className="flex flex-col items-center">
                        {/* Header pill */}
                        <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-5 text-xs text-muted-foreground animate-fade-up">
                            <Sparkles className="w-3.5 h-3.5 text-primary" />
                            Let's personalize your experience
                        </div>

                        <div className="w-full max-w-lg relative group">
                            {/* Glow ring */}
                            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-primary/25 via-primary/8 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]" />

                            <div className="relative glass rounded-2xl shadow-2xl shadow-primary/5 overflow-hidden">
                                <div className="bg-card/50 backdrop-blur-md">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={currentStep}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                                        >
                                            {/* Step 1: Role Selection */}
                                            {currentStep === 1 && (
                                                <Card className="bg-transparent border-0 shadow-none">
                                                    <CardContent className="p-6 sm:p-8">
                                                        <div className="text-center mb-6">
                                                            <h2 className="text-xl font-heading font-bold text-foreground">Tell us about your role</h2>
                                                            <p className="text-sm text-muted-foreground mt-1">This helps us personalize your AIVO experience</p>
                                                        </div>

                                                        <div className="space-y-3">
                                                            {ROLES.map(role => {
                                                                const Icon = role.icon
                                                                const isSelected = formData.role === role.id
                                                                return (
                                                                    <button
                                                                        key={role.id}
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setFormData(prev => ({ ...prev, role: role.id }))
                                                                            if (errors.role) setErrors(prev => ({ ...prev, role: '' }))
                                                                        }}
                                                                        className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                                                                            isSelected
                                                                                ? 'border-primary bg-primary/5 shadow-md shadow-primary/10'
                                                                                : 'border-border/40 bg-background/30 hover:border-border/70 hover:bg-background/50'
                                                                        }`}
                                                                    >
                                                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                                                                            isSelected ? 'bg-primary/20' : 'bg-muted'
                                                                        }`}>
                                                                            <Icon className={`w-5 h-5 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                                                                        </div>
                                                                        <div className="flex-1 min-w-0">
                                                                            <p className={`font-semibold text-sm ${isSelected ? 'text-foreground' : 'text-foreground/80'}`}>
                                                                                {role.title}
                                                                            </p>
                                                                            <p className="text-xs text-muted-foreground mt-0.5">{role.description}</p>
                                                                        </div>
                                                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${
                                                                            isSelected ? 'border-primary bg-primary' : 'border-muted-foreground/30'
                                                                        }`}>
                                                                            {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                                                                        </div>
                                                                    </button>
                                                                )
                                                            })}
                                                        </div>

                                                        {errors.role && (
                                                            <p className="text-xs text-destructive mt-3 text-center">{errors.role}</p>
                                                        )}
                                                    </CardContent>
                                                </Card>
                                            )}

                                            {/* Step 2: Domain */}
                                            {currentStep === 2 && (
                                                <Card className="bg-transparent border-0 shadow-none">
                                                    <CardContent className="p-6 sm:p-8">
                                                        <div className="text-center mb-6">
                                                            <div className="mx-auto w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                                                                <Globe className="w-5 h-5 text-primary" />
                                                            </div>
                                                            <h2 className="text-xl font-heading font-bold text-foreground">What is your primary domain?</h2>
                                                            <p className="text-sm text-muted-foreground mt-1">We'll analyze and track this website's AI visibility</p>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <Label htmlFor="domain" className="text-sm font-medium">Website URL</Label>
                                                            <div className="relative">
                                                                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                                <Input
                                                                    id="domain"
                                                                    type="text"
                                                                    placeholder="example.com"
                                                                    className="pl-10 bg-background/50"
                                                                    value={formData.domain}
                                                                    onChange={(e) => {
                                                                        setFormData(prev => ({ ...prev, domain: e.target.value }))
                                                                        if (errors.domain) setErrors(prev => ({ ...prev, domain: '' }))
                                                                    }}
                                                                    aria-invalid={!!errors.domain}
                                                                />
                                                            </div>
                                                            {errors.domain && (
                                                                <p className="text-xs text-destructive">{errors.domain}</p>
                                                            )}
                                                            <p className="text-xs text-muted-foreground/60 mt-2">
                                                                Enter your primary website domain. You can add more domains later.
                                                            </p>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            )}

                                            {/* Step 3: Competitors */}
                                            {currentStep === 3 && (
                                                <Card className="bg-transparent border-0 shadow-none">
                                                    <CardContent className="p-6 sm:p-8">
                                                        <div className="text-center mb-6">
                                                            <div className="mx-auto w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                                                                <Target className="w-5 h-5 text-primary" />
                                                            </div>
                                                            <h2 className="text-xl font-heading font-bold text-foreground">Who are your top competitors?</h2>
                                                            <p className="text-sm text-muted-foreground mt-1">We'll benchmark your AI visibility against them</p>
                                                        </div>

                                                        <div className="space-y-3">
                                                            {formData.competitors.map((comp, index) => (
                                                                <div key={index} className="space-y-1.5">
                                                                    <Label htmlFor={`competitor-${index}`} className="text-sm font-medium text-muted-foreground">
                                                                        Competitor {index + 1} {index === 0 ? '' : '(optional)'}
                                                                    </Label>
                                                                    <div className="relative">
                                                                        <Target className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                                        <Input
                                                                            id={`competitor-${index}`}
                                                                            type="text"
                                                                            placeholder={`competitor${index + 1}.com`}
                                                                            className="pl-10 bg-background/50"
                                                                            value={comp}
                                                                            onChange={(e) => updateCompetitor(index, e.target.value)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>

                                                        {errors.competitors && (
                                                            <p className="text-xs text-destructive mt-3">{errors.competitors}</p>
                                                        )}

                                                        <p className="text-xs text-muted-foreground/60 mt-4">
                                                            You can update your competitor list later from the dashboard.
                                                        </p>
                                                    </CardContent>
                                                </Card>
                                            )}
                                        </motion.div>
                                    </AnimatePresence>

                                    {/* Navigation Buttons inside the card */}
                                    <div className="flex items-center justify-between px-6 sm:px-8 pb-6 sm:pb-8">
                                        <Button
                                            variant="ghost"
                                            className={`text-muted-foreground hover:text-foreground ${currentStep === 1 ? 'invisible' : ''}`}
                                            onClick={handleBack}
                                        >
                                            <ArrowLeft className="w-4 h-4 mr-2" />
                                            Back
                                        </Button>

                                        <Button
                                            className="font-semibold group px-6"
                                            onClick={handleNext}
                                        >
                                            {currentStep === 3 ? (
                                                <span className="flex items-center gap-2">
                                                    Complete Setup
                                                    <Check className="w-4 h-4" />
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-2">
                                                    Continue
                                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                                </span>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Footer ── */}
            <div className="relative z-10 text-center px-6 py-4">
                <p className="text-xs text-muted-foreground/40">
                    © {new Date().getFullYear()} AIVO — AI Visibility Optimization Platform
                </p>
            </div>
        </div>
    )
}
