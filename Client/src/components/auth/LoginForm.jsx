import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSignIn } from '@clerk/clerk-react'
import { motion, AnimatePresence } from 'motion/react'
import { Mail, Lock, Eye, EyeOff, ArrowRight, Shield } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

export default function LoginForm() {
    const navigate = useNavigate()
    const location = useLocation()
    const { isLoaded, signIn, setActive } = useSignIn()
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})

    // 2FA state
    const [show2FAStep, setShow2FAStep] = useState(false)
    const [twoFACode, setTwoFACode] = useState('')
    const [twoFAError, setTwoFAError] = useState('')
    const [isVerifying2FA, setIsVerifying2FA] = useState(false)

    const validate = () => {
        const newErrors = {}
        if (!email.trim()) newErrors.email = 'Email is required'
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email address'
        if (!password) newErrors.password = 'Password is required'
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
            const result = await signIn.create({
                identifier: email,
                password,
            })

            if (result.status === 'COMPLETE') {
                await setActive({ session: result.createdSessionId })
                const from = location.state?.from?.pathname || '/dashboard'
                navigate(from, { replace: true })
            } else if (result.status === 'NEEDS_SECOND_FACTOR') {
                setShow2FAStep(true)
            } else {
                // Unexpected sign-in status — no action needed
            }
        } catch (err) {
            console.error('Login error:', err)
            const clerkError = err.errors?.[0]?.message || 'Invalid email or password'
            setErrors({ email: clerkError })
        } finally {
            setIsLoading(false)
        }
    }

    const handle2FASubmit = async (e) => {
        e.preventDefault()
        if (!isLoaded) return

        if (twoFACode.length !== 6) {
            setTwoFAError('Please enter a 6-digit code')
            return
        }
        setTwoFAError('')
        setIsVerifying2FA(true)

        try {
            const result = await signIn.attemptSecondFactor({
                strategy: 'totp',
                code: twoFACode,
            })

            if (result.status === 'COMPLETE') {
                await setActive({ session: result.createdSessionId })
                const from = location.state?.from?.pathname || '/dashboard'
                navigate(from, { replace: true })
            } else {
                setTwoFAError('Incorrect verification code')
            }
        } catch (err) {
            console.error('2FA error:', err)
            const clerkError = err.errors?.[0]?.message || 'Invalid verification code'
            setTwoFAError(clerkError)
        } finally {
            setIsVerifying2FA(false)
        }
    }

    const handleOAuth = (strategy) => {
        if (!isLoaded) return
        signIn.authenticateWithRedirect({
            strategy,
            redirectUrl: '/sso-callback',
            redirectUrlComplete: '/dashboard',
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
                    {!show2FAStep ? (
                        <motion.div
                            key="login-form"
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.25 }}
                        >
                            <CardHeader className="text-center pb-2">
                                <CardTitle className="text-2xl font-heading font-bold text-foreground">Welcome back</CardTitle>
                                <CardDescription className="text-muted-foreground">
                                    Sign in to your AIVO account
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

                                {/* Login Form */}
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="login-email" className="text-sm font-medium">Email</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <Input
                                                id="login-email"
                                                type="email"
                                                placeholder="you@company.com"
                                                className="pl-10 bg-background/50"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                aria-invalid={!!errors.email}
                                            />
                                        </div>
                                        {errors.email && (
                                            <p className="text-xs text-destructive mt-1">{errors.email}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="login-password" className="text-sm font-medium">Password</Label>
                                            <Link
                                                to="/forgot-password"
                                                className="text-xs text-primary hover:text-primary/80 transition-colors font-medium"
                                            >
                                                Forgot password?
                                            </Link>
                                        </div>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <Input
                                                id="login-password"
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="••••••••"
                                                className="pl-10 pr-10 bg-background/50"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
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
                                        {errors.password && (
                                            <p className="text-xs text-destructive mt-1">{errors.password}</p>
                                        )}
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full py-5 font-semibold text-sm group"
                                        disabled={isLoading || !isLoaded}
                                    >
                                        {isLoading ? (
                                            <span className="flex items-center gap-2">
                                                <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                                Signing in...
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                Sign In
                                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                            </span>
                                        )}
                                    </Button>
                                </form>
                            </CardContent>

                            <CardFooter className="justify-center pb-6">
                                <p className="text-sm text-muted-foreground">
                                    Don't have an account?{' '}
                                    <Link to="/signup" className="text-primary hover:text-primary/80 font-semibold transition-colors">
                                        Sign up
                                    </Link>
                                </p>
                            </CardFooter>
                        </motion.div>
                    ) : (
                        /* 2FA Verification Step */
                        <motion.div
                            key="2fa-step"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                        >
                            <CardHeader className="text-center pb-2">
                                <div className="mx-auto w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                                    <Shield className="w-6 h-6 text-primary" />
                                </div>
                                <CardTitle className="text-2xl font-heading font-bold text-foreground">Two-Factor Verification</CardTitle>
                                <CardDescription className="text-muted-foreground">
                                    Enter the 6-digit code from your authenticator app
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="pt-4">
                                <form onSubmit={handle2FASubmit} className="space-y-5">
                                    <div className="space-y-2">
                                        <Label htmlFor="2fa-code" className="text-sm font-medium">Verification Code</Label>
                                        <Input
                                            id="2fa-code"
                                            type="text"
                                            placeholder="000000"
                                            className="text-center tracking-[0.5em] font-mono text-lg bg-background/50 py-6"
                                            maxLength={6}
                                            value={twoFACode}
                                            onChange={(e) => {
                                                setTwoFACode(e.target.value.replace(/\D/g, ''))
                                                if (twoFAError) setTwoFAError('')
                                            }}
                                            autoFocus
                                        />
                                        {twoFAError && (
                                            <p className="text-xs text-destructive mt-1">{twoFAError}</p>
                                        )}
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full py-5 font-semibold text-sm group"
                                        disabled={isVerifying2FA}
                                    >
                                        {isVerifying2FA ? (
                                            <span className="flex items-center gap-2">
                                                <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                                Verifying...
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                Verify & Sign In
                                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                            </span>
                                        )}
                                    </Button>

                                    <div className="text-center">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShow2FAStep(false)
                                                setTwoFACode('')
                                                setTwoFAError('')
                                            }}
                                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            ← Back to login
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
