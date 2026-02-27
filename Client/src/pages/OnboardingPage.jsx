import React, { useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowRight, ArrowLeft, Check, Globe, Target, Briefcase, Megaphone, Search } from 'lucide-react'
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
            // Submit onboarding data
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

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-background text-foreground font-sans overflow-hidden px-4 py-12">
            {/* Animated Background */}
            <DotPattern
                className="opacity-20"
                cx={1} cy={1} cr={1}
                width={20} height={20}
                fill="currentColor"
            />
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/15 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

            {/* Branding */}
            <Link to="/" className="relative z-10 flex items-center gap-2.5 mb-6 hover:opacity-80 transition-opacity">
                <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/30">
                    <span className="text-primary-foreground font-bold text-xl">A</span>
                </div>
                <span className="font-heading font-bold text-white text-2xl tracking-tight">AIVO</span>
            </Link>

            {/* Step Indicator */}
            <div className="relative z-10 flex items-center gap-2 mb-8">
                {STEPS.map((step, index) => (
                    <React.Fragment key={step.number}>
                        <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                                currentStep > step.number
                                    ? 'bg-emerald-500 text-white'
                                    : currentStep === step.number
                                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/40'
                                        : 'bg-muted text-muted-foreground'
                            }`}>
                                {currentStep > step.number ? (
                                    <Check className="w-4 h-4" />
                                ) : (
                                    step.number
                                )}
                            </div>
                            <span className={`text-sm font-medium hidden sm:block transition-colors ${
                                currentStep >= step.number ? 'text-foreground' : 'text-muted-foreground'
                            }`}>
                                {step.label}
                            </span>
                        </div>
                        {index < STEPS.length - 1 && (
                            <div className={`w-12 h-0.5 rounded-full transition-colors duration-300 ${
                                currentStep > step.number ? 'bg-emerald-500' : 'bg-muted'
                            }`} />
                        )}
                    </React.Fragment>
                ))}
            </div>

            {/* Card Container */}
            <div className="relative z-10 w-full max-w-lg">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                        {/* Step 1: Role Selection */}
                        {currentStep === 1 && (
                            <Card className="bg-card/60 border-border/40 backdrop-blur-xl shadow-2xl">
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
                            <Card className="bg-card/60 border-border/40 backdrop-blur-xl shadow-2xl">
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
                                            Enter your primary website domain. You can add more domains later from your dashboard settings.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Step 3: Competitors */}
                        {currentStep === 3 && (
                            <Card className="bg-card/60 border-border/40 backdrop-blur-xl shadow-2xl">
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
                                        You can always update your competitor list later from the Competitor Intelligence dashboard.
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-6">
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
    )
}
