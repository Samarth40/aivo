import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { Mail, ArrowLeft, ArrowRight, MailCheck, Lock } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ForgotPasswordForm() {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isSent, setIsSent] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!email.trim()) {
            setError('Email is required')
            return
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address')
            return
        }
        setError('')
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            setIsSent(true)
        }, 1500)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <Card className="bg-card/60 border-border/40 backdrop-blur-xl shadow-2xl">
                <AnimatePresence mode="wait">
                    {!isSent ? (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <CardHeader className="text-center pb-2">
                                <div className="mx-auto w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                                    <Lock className="w-6 h-6 text-primary" />
                                </div>
                                <CardTitle className="text-2xl font-heading font-bold text-foreground">Forgot your password?</CardTitle>
                                <CardDescription className="text-muted-foreground">
                                    Enter your email and we'll send you a magic link to reset your password
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="pt-4">
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="reset-email" className="text-sm font-medium">Email address</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <Input
                                                id="reset-email"
                                                type="email"
                                                placeholder="you@company.com"
                                                className="pl-10 bg-background/50"
                                                value={email}
                                                onChange={(e) => {
                                                    setEmail(e.target.value)
                                                    if (error) setError('')
                                                }}
                                                aria-invalid={!!error}
                                            />
                                        </div>
                                        {error && (
                                            <p className="text-xs text-destructive mt-1">{error}</p>
                                        )}
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full py-5 font-semibold text-sm group"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <span className="flex items-center gap-2">
                                                <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                                Sending link...
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                Send Reset Link
                                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                            </span>
                                        )}
                                    </Button>
                                </form>
                            </CardContent>

                            <CardFooter className="justify-center pb-6 pt-2">
                                <Link
                                    to="/login"
                                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Back to sign in
                                </Link>
                            </CardFooter>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, ease: 'easeOut' }}
                        >
                            <CardHeader className="text-center pb-2">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                                    className="mx-auto w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4"
                                >
                                    <MailCheck className="w-7 h-7 text-emerald-500" />
                                </motion.div>
                                <CardTitle className="text-2xl font-heading font-bold text-foreground">Check your email</CardTitle>
                                <CardDescription className="text-muted-foreground leading-relaxed">
                                    We've sent a password reset link to{' '}
                                    <span className="text-foreground font-medium">{email}</span>
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="pt-4 space-y-4">
                                <div className="bg-muted/30 border border-border/30 rounded-xl p-4">
                                    <p className="text-xs text-muted-foreground leading-relaxed text-center">
                                        Didn't receive the email? Check your spam folder, or{' '}
                                        <button
                                            className="text-primary hover:text-primary/80 font-medium transition-colors"
                                            onClick={() => {
                                                setIsSent(false)
                                                setEmail('')
                                            }}
                                        >
                                            try another email address
                                        </button>
                                    </p>
                                </div>

                                <Button
                                    asChild
                                    variant="outline"
                                    className="w-full py-5 bg-transparent border-border/50 hover:bg-accent/50"
                                >
                                    <Link to="/login">
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        Back to sign in
                                    </Link>
                                </Button>
                            </CardContent>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Card>
        </motion.div>
    )
}
