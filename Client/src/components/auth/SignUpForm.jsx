import React, { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSignUp } from '@clerk/clerk-react'
import { motion, AnimatePresence } from 'motion/react'
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, Check, X, Shield } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"

const PASSWORD_RULES = [
    { key: 'length', label: 'At least 8 characters', test: (p) => p.length >= 8 },
    { key: 'upper', label: 'One uppercase letter', test: (p) => /[A-Z]/.test(p) },
    { key: 'lower', label: 'One lowercase letter', test: (p) => /[a-z]/.test(p) },
    { key: 'number', label: 'One number', test: (p) => /[0-9]/.test(p) },
    { key: 'special', label: 'One special character', test: (p) => /[^A-Za-z0-9]/.test(p) },
]

function getStrength(password) {
    if (!password) return { score: 0, label: '', color: '' }
    const passed = PASSWORD_RULES.filter(r => r.test(password)).length
    if (passed <= 1) return { score: 20, label: 'Weak', color: 'bg-red-500' }
    if (passed <= 2) return { score: 40, label: 'Fair', color: 'bg-orange-500' }
    if (passed <= 3) return { score: 60, label: 'Good', color: 'bg-yellow-500' }
    if (passed <= 4) return { score: 80, label: 'Strong', color: 'bg-emerald-400' }
    return { score: 100, label: 'Excellent', color: 'bg-emerald-500' }
}

export default function SignUpForm() {
    const navigate = useNavigate()
    const { isLoaded, signUp, setActive } = useSignUp()
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})

    // Verification Step state
    const [showVerificationStep, setShowVerificationStep] = useState(false)
    const [verificationCode, setVerificationCode] = useState('')
    const [verificationError, setVerificationError] = useState('')
    const [isVerifying, setIsVerifying] = useState(false)

    const strength = useMemo(() => getStrength(formData.password), [formData.password])

    const updateField = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
    }

    const validate = () => {
        const newErrors = {}
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
        if (!formData.email.trim()) newErrors.email = 'Email is required'
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email address'
        if (!formData.password) newErrors.password = 'Password is required'
        else if (strength.score < 60) newErrors.password = 'Password is too weak'
        if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password'
        else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
        return newErrors
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!isLoaded) return

        const validationErrors = validate()
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }
        setErrors({})
        setIsLoading(true)

        try {
            // Map fullName to Clerk's firstName and lastName
            const nameParts = formData.fullName.trim().split(' ')
            const firstName = nameParts[0]
            const lastName = nameParts.slice(1).join(' ') || undefined

            // 1. Create the user
            await signUp.create({
                firstName,
                lastName,
                emailAddress: formData.email,
                password: formData.password,
            })

            // 2. Prepare email verification
            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

            // 3. Show OTP verification UI
            setShowVerificationStep(true)

        } catch (err) {
            console.error('Sign up error:', err)
            const clerkError = err.errors?.[0]?.longMessage || err.errors?.[0]?.message || 'An error occurred during sign up'
            setErrors({ email: clerkError })
        } finally {
            setIsLoading(false)
        }
    }

    const handleVerificationSubmit = async (e) => {
        e.preventDefault()
        if (!isLoaded) return

        if (verificationCode.length !== 6) {
            setVerificationError('Please enter the 6-digit code')
            return
        }
        setVerificationError('')
        setIsVerifying(true)

        try {
            const result = await signUp.attemptEmailAddressVerification({
                code: verificationCode,
            })

            if (result.status === 'COMPLETE') {
                await setActive({ session: result.createdSessionId })
                navigate('/onboarding', { replace: true })
            } else {
                setVerificationError('Verification incomplete. Please try again.')
            }
        } catch (err) {
            console.error('Verification error:', err)
            const clerkError = err.errors?.[0]?.message || 'Invalid verification code'
            setVerificationError(clerkError)
        } finally {
            setIsVerifying(false)
        }
    }

    const handleOAuth = (strategy) => {
        if (!isLoaded) return
        signUp.authenticateWithRedirect({
            strategy,
            redirectUrl: '/sso-callback',
            redirectUrlComplete: '/onboarding',
        })
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <Card className="bg-card/60 border-border/40 backdrop-blur-xl shadow-2xl">
                <AnimatePresence mode="wait">
                    {!showVerificationStep ? (
                        <motion.div
                            key="signup-form"
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.25 }}
                        >
                            <CardHeader className="text-center pb-2">
                                <CardTitle className="text-2xl font-heading font-bold text-foreground">Create your account</CardTitle>
                                <CardDescription className="text-muted-foreground">
                                    Start optimizing your AI visibility today
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="pt-4">
                                {/* OAuth Buttons */}
                                <div className="mb-6">
                                    <Button
                                        variant="outline"
                                        className="w-full bg-transparent border-border/50 hover:bg-accent/50 hover:border-border transition-all cursor-pointer"
                                        type="button"
                                        onClick={() => handleOAuth('oauth_google')}
                                    >
                                        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                        </svg>
                                        Continue with Google
                                    </Button>
                                </div>

                                <div className="relative mb-6">
                                    <Separator className="bg-border/40" />
                                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-xs text-muted-foreground uppercase tracking-widest">
                                        or
                                    </span>
                                </div>

                                {/* Sign Up Form */}
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="signup-name" className="text-sm font-medium">Full Name</Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <Input
                                                id="signup-name"
                                                type="text"
                                                placeholder="John Doe"
                                                className="pl-10 bg-background/50"
                                                value={formData.fullName}
                                                onChange={(e) => updateField('fullName', e.target.value)}
                                                aria-invalid={!!errors.fullName}
                                            />
                                        </div>
                                        {errors.fullName && (
                                            <p className="text-xs text-destructive mt-1">{errors.fullName}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="signup-email" className="text-sm font-medium">Email</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <Input
                                                id="signup-email"
                                                type="email"
                                                placeholder="you@company.com"
                                                className="pl-10 bg-background/50"
                                                value={formData.email}
                                                onChange={(e) => updateField('email', e.target.value)}
                                                aria-invalid={!!errors.email}
                                            />
                                        </div>
                                        {errors.email && (
                                            <p className="text-xs text-destructive mt-1">{errors.email}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="signup-password" className="text-sm font-medium">Password</Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <Input
                                                id="signup-password"
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="Create a strong password"
                                                className="pl-10 pr-10 bg-background/50"
                                                value={formData.password}
                                                onChange={(e) => updateField('password', e.target.value)}
                                                aria-invalid={!!errors.password}
                                            />
                                            <button
                                                type="button"
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                                onClick={() => setShowPassword(!showPassword)}
                                                tabIndex={-1}
                                            >
                                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>

                                        {/* Password Strength Meter */}
                                        {formData.password && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                className="space-y-3 pt-1"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                                                        <motion.div
                                                            className={`h-full rounded-full ${strength.color}`}
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${strength.score}%` }}
                                                            transition={{ duration: 0.3 }}
                                                        />
                                                    </div>
                                                    <span className={`text-xs font-semibold min-w-[60px] text-right ${
                                                        strength.score <= 20 ? 'text-red-500' :
                                                        strength.score <= 40 ? 'text-orange-500' :
                                                        strength.score <= 60 ? 'text-yellow-500' :
                                                        'text-emerald-500'
                                                    }`}>
                                                        {strength.label}
                                                    </span>
                                                </div>

                                                <div className="grid grid-cols-1 gap-1.5">
                                                    {PASSWORD_RULES.map(rule => {
                                                        const passed = rule.test(formData.password)
                                                        return (
                                                            <div key={rule.key} className="flex items-center gap-2">
                                                                {passed ? (
                                                                    <Check className="w-3 h-3 text-emerald-500" />
                                                                ) : (
                                                                    <X className="w-3 h-3 text-muted-foreground/50" />
                                                                )}
                                                                <span className={`text-xs ${passed ? 'text-emerald-500' : 'text-muted-foreground/60'}`}>
                                                                    {rule.label}
                                                                </span>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </motion.div>
                                        )}

                                        {errors.password && (
                                            <p className="text-xs text-destructive mt-1">{errors.password}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="signup-confirm" className="text-sm font-medium">Confirm Password</Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <Input
                                                id="signup-confirm"
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                placeholder="Confirm your password"
                                                className="pl-10 pr-10 bg-background/50"
                                                value={formData.confirmPassword}
                                                onChange={(e) => updateField('confirmPassword', e.target.value)}
                                                aria-invalid={!!errors.confirmPassword}
                                            />
                                            <button
                                                type="button"
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                tabIndex={-1}
                                            >
                                                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                        {errors.confirmPassword && (
                                            <p className="text-xs text-destructive mt-1">{errors.confirmPassword}</p>
                                        )}
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full py-5 font-semibold text-sm group mt-2"
                                        disabled={isLoading || !isLoaded}
                                    >
                                        {isLoading ? (
                                            <span className="flex items-center gap-2">
                                                <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                                Creating account...
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                Create Account
                                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                            </span>
                                        )}
                                    </Button>

                                    <p className="text-[11px] text-muted-foreground/60 text-center leading-relaxed">
                                        By signing up, you agree to our{' '}
                                        <Link to="/legal/terms" className="text-primary/70 hover:text-primary underline-offset-4 hover:underline">Terms of Service</Link>{' '}
                                        and{' '}
                                        <Link to="/legal/privacy" className="text-primary/70 hover:text-primary underline-offset-4 hover:underline">Privacy Policy</Link>.
                                    </p>
                                </form>
                            </CardContent>

                            <CardFooter className="justify-center pb-6">
                                <p className="text-sm text-muted-foreground">
                                    Already have an account?{' '}
                                    <Link to="/login" className="text-primary hover:text-primary/80 font-semibold transition-colors">
                                        Sign in
                                    </Link>
                                </p>
                            </CardFooter>
                        </motion.div>
                    ) : (
                        /* Email Verification Step */
                        <motion.div
                            key="verification-step"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                        >
                            <CardHeader className="text-center pb-2">
                                <div className="mx-auto w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                                    <Shield className="w-6 h-6 text-primary" />
                                </div>
                                <CardTitle className="text-2xl font-heading font-bold text-foreground">Verify Your Email</CardTitle>
                                <CardDescription className="text-muted-foreground">
                                    We've sent a 6-digit code to <span className="font-medium text-foreground">{formData.email}</span>
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="pt-4">
                                <form onSubmit={handleVerificationSubmit} className="space-y-5">
                                    <div className="space-y-2">
                                        <Label htmlFor="verification-code" className="text-sm font-medium">Verification Code</Label>
                                        <Input
                                            id="verification-code"
                                            type="text"
                                            placeholder="000000"
                                            className="text-center tracking-[0.5em] font-mono text-lg bg-background/50 py-6"
                                            maxLength={6}
                                            value={verificationCode}
                                            onChange={(e) => {
                                                setVerificationCode(e.target.value.replace(/\D/g, ''))
                                                if (verificationError) setVerificationError('')
                                            }}
                                            autoFocus
                                        />
                                        {verificationError && (
                                            <p className="text-xs text-destructive mt-1">{verificationError}</p>
                                        )}
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full py-5 font-semibold text-sm group"
                                        disabled={isVerifying}
                                    >
                                        {isVerifying ? (
                                            <span className="flex items-center gap-2">
                                                <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                                Verifying...
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                Verify Email
                                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                            </span>
                                        )}
                                    </Button>

                                    <div className="text-center">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowVerificationStep(false)
                                                setVerificationCode('')
                                                setVerificationError('')
                                            }}
                                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            ← Back to sign up
                                        </button>
                                    </div>
                                </form>
                            </CardContent>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Card>
        </motion.div>
    )
}
