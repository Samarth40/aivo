import React, { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { motion } from 'motion/react'
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, Check, X } from 'lucide-react'
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
    const { signup } = useAuth()
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

    const handleSubmit = (e) => {
        e.preventDefault()
        const validationErrors = validate()
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }
        setErrors({})
        setIsLoading(true)
        console.log('Sign up submitted:', formData)
        setTimeout(() => {
            signup({ email: formData.email, fullName: formData.fullName })
            navigate('/onboarding', { replace: true })
        }, 1200)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <Card className="bg-card/60 border-border/40 backdrop-blur-xl shadow-2xl">
                <CardHeader className="text-center pb-2">
                    <CardTitle className="text-2xl font-heading font-bold text-foreground">Create your account</CardTitle>
                    <CardDescription className="text-muted-foreground">
                        Start optimizing your AI visibility today
                    </CardDescription>
                </CardHeader>

                <CardContent className="pt-4">
                    {/* OAuth Buttons */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <Button
                            variant="outline"
                            className="w-full bg-transparent border-border/50 hover:bg-accent/50 hover:border-border transition-all"
                            type="button"
                            onClick={() => console.log('Google OAuth')}
                        >
                            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Google
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full bg-transparent border-border/50 hover:bg-accent/50 hover:border-border transition-all"
                            type="button"
                            onClick={() => console.log('GitHub OAuth')}
                        >
                            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            GitHub
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
                            disabled={isLoading}
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
            </Card>
        </motion.div>
    )
}
