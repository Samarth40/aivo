import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { useAuth } from '@/contexts/AuthContext'
import {
    Settings2, User, Key, Bell, Shield, Save, Eye, EyeOff, CheckCircle2, Lock
} from "lucide-react"

export default function Settings() {
    const { twoFactorEnabled, toggle2FA } = useAuth()
    const [showKey, setShowKey] = useState(false)
    const [saved, setSaved] = useState(false)

    // Password change state
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    })
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false,
    })
    const [passwordErrors, setPasswordErrors] = useState({})
    const [isChangingPassword, setIsChangingPassword] = useState(false)
    const [passwordSuccess, setPasswordSuccess] = useState(false)

    // 2FA dialog
    const [show2FADialog, setShow2FADialog] = useState(false)
    const [twoFACode, setTwoFACode] = useState('')

    const handleSave = () => {
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
    }

    const handleChangePassword = () => {
        const errors = {}
        if (!passwordData.currentPassword) errors.currentPassword = 'Current password is required'
        if (!passwordData.newPassword) errors.newPassword = 'New password is required'
        if (passwordData.newPassword.length < 8) errors.newPassword = 'Must be at least 8 characters'
        if (passwordData.newPassword !== passwordData.confirmPassword) errors.confirmPassword = 'Passwords do not match'

        if (Object.keys(errors).length > 0) {
            setPasswordErrors(errors)
            return
        }

        setPasswordErrors({})
        setIsChangingPassword(true)
        console.log('Password change requested')
        setTimeout(() => {
            setIsChangingPassword(false)
            setPasswordSuccess(true)
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
            setTimeout(() => setPasswordSuccess(false), 3000)
        }, 1200)
    }

    const handle2FAToggle = () => {
        if (!twoFactorEnabled) {
            setShow2FADialog(true)
            setTwoFACode('')
        } else {
            toggle2FA(false)
        }
    }

    const confirm2FAEnable = () => {
        if (twoFACode.length === 6) {
            toggle2FA(true)
            setShow2FADialog(false)
            setTwoFACode('')
        }
    }

    return (
        <div className="flex-1 space-y-5 pt-6 animate-in fade-in duration-500">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                        <Settings2 className="w-5 h-5 text-primary-foreground" />
                    </div>
                    Settings
                </h2>
                <p className="text-muted-foreground mt-1.5 text-sm max-w-xl">
                    Manage your workspace, security, API keys, and notification preferences.
                </p>
            </div>

            <Tabs defaultValue="general" className="w-full">
                <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="api">API Keys</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                </TabsList>

                {/* General */}
                <TabsContent value="general">
                    <Card className="bg-card/40 border-border/40">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                                <User className="w-4 h-4 text-primary" /> Account
                            </CardTitle>
                            <CardDescription className="text-xs">Manage your profile and workspace.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label className="text-xs">Workspace Name</Label>
                                    <Input defaultValue="AIVO Production" />
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-xs">Notification Email</Label>
                                    <Input type="email" defaultValue="admin@aivo.ai" />
                                </div>
                            </div>

                            <Separator />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label className="text-xs">Default Target URL</Label>
                                    <Input placeholder="https://yoursite.com" />
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-xs">Industry</Label>
                                    <Input defaultValue="SaaS / Technology" />
                                </div>
                            </div>

                            <div className="flex justify-end pt-2">
                                <Button onClick={handleSave}>
                                    {saved ? <><CheckCircle2 className="w-4 h-4 mr-2" /> Saved</> : <><Save className="w-4 h-4 mr-2" /> Save Changes</>}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Security */}
                <TabsContent value="security" className="space-y-5">
                    {/* Change Password */}
                    <Card className="bg-card/40 border-border/40">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                                <Lock className="w-4 h-4 text-primary" /> Change Password
                            </CardTitle>
                            <CardDescription className="text-xs">Update your password to keep your account secure.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {passwordSuccess && (
                                <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
                                    <CheckCircle2 className="w-4 h-4" />
                                    Password updated successfully!
                                </div>
                            )}

                            <div className="space-y-1.5">
                                <Label className="text-xs">Current Password</Label>
                                <div className="relative max-w-sm">
                                    <Input
                                        type={showPasswords.current ? 'text' : 'password'}
                                        placeholder="Enter current password"
                                        className="pr-10"
                                        value={passwordData.currentPassword}
                                        onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                                    />
                                    <button type="button" onClick={() => setShowPasswords(p => ({ ...p, current: !p.current }))} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer">
                                        {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                                {passwordErrors.currentPassword && <p className="text-xs text-destructive">{passwordErrors.currentPassword}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                                <div className="space-y-1.5">
                                    <Label className="text-xs">New Password</Label>
                                    <div className="relative">
                                        <Input
                                            type={showPasswords.new ? 'text' : 'password'}
                                            placeholder="Enter new password"
                                            className="pr-10"
                                            value={passwordData.newPassword}
                                            onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                                        />
                                        <button type="button" onClick={() => setShowPasswords(p => ({ ...p, new: !p.new }))} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer">
                                            {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                    {passwordErrors.newPassword && <p className="text-xs text-destructive">{passwordErrors.newPassword}</p>}
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-xs">Confirm New Password</Label>
                                    <div className="relative">
                                        <Input
                                            type={showPasswords.confirm ? 'text' : 'password'}
                                            placeholder="Confirm new password"
                                            className="pr-10"
                                            value={passwordData.confirmPassword}
                                            onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                        />
                                        <button type="button" onClick={() => setShowPasswords(p => ({ ...p, confirm: !p.confirm }))} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer">
                                            {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                    {passwordErrors.confirmPassword && <p className="text-xs text-destructive">{passwordErrors.confirmPassword}</p>}
                                </div>
                            </div>

                            <div className="pt-1">
                                <Button variant="secondary" onClick={handleChangePassword} disabled={isChangingPassword} className="font-medium">
                                    {isChangingPassword ? (
                                        <span className="flex items-center gap-2">
                                            <span className="w-4 h-4 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin" />
                                            Updating...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            <Lock className="w-4 h-4" />
                                            Update Password
                                        </span>
                                    )}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Two-Factor Authentication */}
                    <Card className="bg-card/40 border-border/40">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                                <Shield className="w-4 h-4 text-primary" /> Two-Factor Authentication
                            </CardTitle>
                            <CardDescription className="text-xs">Add an extra layer of security to your account.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="space-y-1 max-w-md">
                                    <p className="text-sm font-medium flex items-center gap-2">
                                        <span className={`w-2 h-2 rounded-full ${twoFactorEnabled ? 'bg-emerald-500' : 'bg-muted-foreground'}`} />
                                        {twoFactorEnabled ? 'Two-factor authentication is enabled' : 'Two-factor authentication is disabled'}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        When enabled, you'll need to enter a verification code from your authenticator app each time you sign in.
                                    </p>
                                </div>
                                <Switch
                                    id="two-factor"
                                    checked={twoFactorEnabled}
                                    onCheckedChange={handle2FAToggle}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Active Sessions (bonus) */}
                    <Card className="bg-card/40 border-border/40">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                                <User className="w-4 h-4 text-primary" /> Active Sessions
                            </CardTitle>
                            <CardDescription className="text-xs">Manage your active login sessions.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between p-3 bg-muted/20 border border-border/30 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Current Session</p>
                                        <p className="text-[10px] text-muted-foreground">Windows · Chrome · Last active now</p>
                                    </div>
                                </div>
                                <Badge variant="outline" className="text-[10px] font-semibold text-emerald-400 border-emerald-500/30 bg-emerald-500/5">
                                    Active
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* API Keys */}
                <TabsContent value="api">
                    <div className="space-y-4">
                        <Card className="bg-card/40 border-border/40">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base flex items-center gap-2">
                                    <Key className="w-4 h-4 text-primary" /> API Integrations
                                </CardTitle>
                                <CardDescription className="text-xs">Connect your LLM providers for live engine runs.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {[
                                    { name: "OpenAI", key: "sk-proj-•••••••••••••••••", status: "Connected" },
                                    { name: "Google Gemini", key: "", status: "Not connected" },
                                    { name: "Anthropic", key: "", status: "Not connected" },
                                    { name: "Perplexity", key: "", status: "Not connected" },
                                ].map((api, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 bg-muted/20 border border-border/30 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-primary/5 border border-border/30 flex items-center justify-center">
                                                <Key className="w-3.5 h-3.5 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold">{api.name}</p>
                                                <p className="text-[10px] text-muted-foreground font-mono">
                                                    {api.key || "No key configured"}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline" className={`text-[10px] font-semibold ${api.status === "Connected"
                                                ? "text-chart-2 border-chart-2/30 bg-chart-2/5"
                                                : "text-muted-foreground border-border"
                                                }`}>
                                                {api.status}
                                            </Badge>
                                            <Button variant="outline" size="sm" className="h-7 text-xs">
                                                {api.key ? "Update" : "Connect"}
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Notifications */}
                <TabsContent value="notifications">
                    <Card className="bg-card/40 border-border/40">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                                <Bell className="w-4 h-4 text-primary" /> Notification Preferences
                            </CardTitle>
                            <CardDescription className="text-xs">Choose what you want to be notified about.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-1">
                            {[
                                { label: "Analysis complete", desc: "Get notified when an engine run finishes", default: true },
                                { label: "Weekly visibility digest", desc: "Receive a weekly summary of your AI visibility score", default: true },
                                { label: "Score drop alerts", desc: "Alert when your visibility drops below threshold", default: false },
                                { label: "Competitor changes", desc: "Notify when competitor scores change significantly", default: false },
                            ].map((n, i) => (
                                <div key={i} className="flex items-center justify-between py-3 border-b border-border/20 last:border-0">
                                    <div>
                                        <p className="text-sm font-medium">{n.label}</p>
                                        <p className="text-xs text-muted-foreground">{n.desc}</p>
                                    </div>
                                    <Switch defaultChecked={n.default} />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* 2FA Enable Dialog */}
            <Dialog open={show2FADialog} onOpenChange={setShow2FADialog}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-primary" />
                            Enable Two-Factor Authentication
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                            Scan the QR code below with your authenticator app (Google Authenticator, Authy, etc.)
                        </p>

                        <div className="w-48 h-48 mx-auto bg-white rounded-xl flex items-center justify-center">
                            <div className="text-center">
                                <Shield className="w-12 h-12 text-primary mx-auto mb-2" />
                                <p className="text-xs text-muted-foreground font-medium">QR Code</p>
                                <p className="text-[10px] text-muted-foreground">Will be generated by backend</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Verification Code</Label>
                            <Input
                                type="text"
                                placeholder="Enter 6-digit code"
                                className="text-center tracking-[0.5em] font-mono"
                                maxLength={6}
                                value={twoFACode}
                                onChange={(e) => setTwoFACode(e.target.value.replace(/\D/g, ''))}
                            />
                            <p className="text-[11px] text-muted-foreground">Enter the code from your authenticator app to verify setup.</p>
                        </div>
                    </div>
                    <DialogFooter className="gap-2">
                        <Button variant="outline" onClick={() => setShow2FADialog(false)} className="bg-transparent">Cancel</Button>
                        <Button onClick={confirm2FAEnable} disabled={twoFACode.length !== 6}>
                            <Shield className="w-4 h-4 mr-2" />
                            Enable 2FA
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
