import React, { useState, useRef, useCallback } from 'react'
import { motion } from 'motion/react'
import { Camera, Save, User, Moon, Sun, Bell, BellOff, Trash2, Upload, Lock, Shield, Eye, EyeOff, Mail } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from '@/contexts/AuthContext'

export default function ProfilePage() {
    const { user } = useAuth()

    // Derive initial name from auth context
    const nameParts = (user?.name || '').split(' ')
    const [profile, setProfile] = useState({
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        jobTitle: '',
        avatarUrl: '',
    })
    const [preferences, setPreferences] = useState({
        darkMode: true,
        emailNotifications: true,
        weeklyDigest: true,
        productUpdates: false,
    })
    const [isSaving, setIsSaving] = useState(false)

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

    // 2FA state
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
    const [show2FADialog, setShow2FADialog] = useState(false)

    // Avatar crop state
    const [cropDialogOpen, setCropDialogOpen] = useState(false)
    const [rawImage, setRawImage] = useState(null)
    const [cropZoom, setCropZoom] = useState([1])
    const [cropPosition, setCropPosition] = useState({ x: 0, y: 0 })
    const fileInputRef = useRef(null)
    const canvasRef = useRef(null)
    const imageRef = useRef(null)

    const updateProfile = (field, value) => {
        setProfile(prev => ({ ...prev, [field]: value }))
    }

    const togglePreference = (key) => {
        setPreferences(prev => ({ ...prev, [key]: !prev[key] }))
    }

    const handleAvatarUpload = (e) => {
        const file = e.target.files?.[0]
        if (!file) return
        if (!file.type.startsWith('image/')) return

        const reader = new FileReader()
        reader.onload = (event) => {
            setRawImage(event.target.result)
            setCropZoom([1])
            setCropPosition({ x: 0, y: 0 })
            setCropDialogOpen(true)
        }
        reader.readAsDataURL(file)
        e.target.value = ''
    }

    const handleCropConfirm = useCallback(() => {
        if (!imageRef.current || !canvasRef.current) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        const img = imageRef.current
        const size = 200

        canvas.width = size
        canvas.height = size
        ctx.clearRect(0, 0, size, size)
        ctx.beginPath()
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
        ctx.closePath()
        ctx.clip()

        const zoom = cropZoom[0]
        const imgAspect = img.naturalWidth / img.naturalHeight
        let drawWidth, drawHeight
        if (imgAspect > 1) {
            drawHeight = size * zoom
            drawWidth = drawHeight * imgAspect
        } else {
            drawWidth = size * zoom
            drawHeight = drawWidth / imgAspect
        }

        const drawX = (size - drawWidth) / 2 + cropPosition.x
        const drawY = (size - drawHeight) / 2 + cropPosition.y
        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight)

        const croppedUrl = canvas.toDataURL('image/png')
        setProfile(prev => ({ ...prev, avatarUrl: croppedUrl }))
        setCropDialogOpen(false)
        setRawImage(null)
    }, [cropZoom, cropPosition])

    const handleRemoveAvatar = () => {
        setProfile(prev => ({ ...prev, avatarUrl: '' }))
    }

    const handleSave = () => {
        setIsSaving(true)
        console.log('Profile saved:', { profile, preferences })
        setTimeout(() => setIsSaving(false), 1200)
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
        console.log('Password changed')
        setTimeout(() => {
            setIsChangingPassword(false)
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
        }, 1200)
    }

    const handle2FAToggle = () => {
        if (!twoFactorEnabled) {
            setShow2FADialog(true)
        } else {
            setTwoFactorEnabled(false)
        }
    }

    const confirm2FAEnable = () => {
        setTwoFactorEnabled(true)
        setShow2FADialog(false)
    }

    const initials = `${profile.firstName?.[0] || ''}${profile.lastName?.[0] || ''}`.toUpperCase() || 'U'

    return (
        <div className="flex-1 space-y-6 pt-2 max-w-4xl">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <p className="text-muted-foreground">Manage your personal information, security, and preferences</p>
            </motion.div>

            {/* Avatar Section */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
                <Card className="bg-card/40 border-border/40 shadow-sm">
                    <CardHeader>
                        <CardTitle>Avatar</CardTitle>
                        <CardDescription>Upload and crop your profile picture</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-6">
                            <div className="relative group">
                                <Avatar className="w-20 h-20 border-2 border-border/50">
                                    {profile.avatarUrl ? (
                                        <AvatarImage src={profile.avatarUrl} alt="Profile avatar" />
                                    ) : null}
                                    <AvatarFallback className="text-lg font-bold bg-primary/10 text-primary">
                                        {initials}
                                    </AvatarFallback>
                                </Avatar>
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                                >
                                    <Camera className="w-5 h-5 text-white" />
                                </button>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm" className="bg-transparent border-border/50" onClick={() => fileInputRef.current?.click()}>
                                        <Upload className="w-4 h-4 mr-2" />
                                        Upload Photo
                                    </Button>
                                    {profile.avatarUrl && (
                                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive/80 hover:bg-destructive/5" onClick={handleRemoveAvatar}>
                                            <Trash2 className="w-4 h-4 mr-2" />
                                            Remove
                                        </Button>
                                    )}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    JPG, PNG or GIF. Max 5MB. Image will be cropped to a circle.
                                </p>
                            </div>
                            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Personal Details + Email */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}>
                <Card className="bg-card/40 border-border/40 shadow-sm">
                    <CardHeader>
                        <CardTitle>Personal Details</CardTitle>
                        <CardDescription>Your basic profile information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Email — read only */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    value={user?.email || ''}
                                    readOnly
                                    className="bg-muted/30 pl-10 cursor-not-allowed opacity-70"
                                />
                            </div>
                            <p className="text-[11px] text-muted-foreground">This is the email associated with your account and cannot be changed here.</p>
                        </div>

                        <Separator className="bg-border/20" />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
                                <Input id="firstName" type="text" placeholder="John" className="bg-background/50" value={profile.firstName} onChange={(e) => updateProfile('firstName', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
                                <Input id="lastName" type="text" placeholder="Doe" className="bg-background/50" value={profile.lastName} onChange={(e) => updateProfile('lastName', e.target.value)} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="jobTitle" className="text-sm font-medium">Job Title</Label>
                            <Input id="jobTitle" type="text" placeholder="SEO Specialist" className="bg-background/50 max-w-sm" value={profile.jobTitle} onChange={(e) => updateProfile('jobTitle', e.target.value)} />
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Change Password */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
                <Card className="bg-card/40 border-border/40 shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Lock className="w-5 h-5 text-primary" />
                            Change Password
                        </CardTitle>
                        <CardDescription>Update your password to keep your account secure</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="currentPassword" className="text-sm font-medium">Current Password</Label>
                            <div className="relative max-w-sm">
                                <Input
                                    id="currentPassword"
                                    type={showPasswords.current ? 'text' : 'password'}
                                    placeholder="Enter current password"
                                    className="bg-background/50 pr-10"
                                    value={passwordData.currentPassword}
                                    onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                                />
                                <button type="button" onClick={() => setShowPasswords(p => ({ ...p, current: !p.current }))} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer">
                                    {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {passwordErrors.currentPassword && <p className="text-xs text-destructive">{passwordErrors.currentPassword}</p>}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                            <div className="space-y-2">
                                <Label htmlFor="newPassword" className="text-sm font-medium">New Password</Label>
                                <div className="relative">
                                    <Input
                                        id="newPassword"
                                        type={showPasswords.new ? 'text' : 'password'}
                                        placeholder="Enter new password"
                                        className="bg-background/50 pr-10"
                                        value={passwordData.newPassword}
                                        onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                                    />
                                    <button type="button" onClick={() => setShowPasswords(p => ({ ...p, new: !p.new }))} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer">
                                        {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                                {passwordErrors.newPassword && <p className="text-xs text-destructive">{passwordErrors.newPassword}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm New Password</Label>
                                <div className="relative">
                                    <Input
                                        id="confirmPassword"
                                        type={showPasswords.confirm ? 'text' : 'password'}
                                        placeholder="Confirm new password"
                                        className="bg-background/50 pr-10"
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

                        <div className="pt-2">
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
            </motion.div>

            {/* Two-Factor Authentication */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25 }}>
                <Card className="bg-card/40 border-border/40 shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-primary" />
                            Two-Factor Authentication
                        </CardTitle>
                        <CardDescription>Add an extra layer of security to your account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="space-y-1 max-w-md">
                                <p className="text-sm font-medium">
                                    {twoFactorEnabled ? (
                                        <span className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-green-500" />
                                            Two-factor authentication is enabled
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-muted-foreground" />
                                            Two-factor authentication is disabled
                                        </span>
                                    )}
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
            </motion.div>

            {/* Preferences */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
                <Card className="bg-card/40 border-border/40 shadow-sm">
                    <CardHeader>
                        <CardTitle>Preferences</CardTitle>
                        <CardDescription>Customize your experience</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-1">
                        {/* Dark Mode */}
                        <div className="flex items-center justify-between py-3">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                                    {preferences.darkMode ? <Moon className="w-4 h-4 text-primary" /> : <Sun className="w-4 h-4 text-yellow-500" />}
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Dark Mode</p>
                                    <p className="text-xs text-muted-foreground">{preferences.darkMode ? 'Dark theme is active' : 'Light theme is active'}</p>
                                </div>
                            </div>
                            <Switch id="dark-mode" checked={preferences.darkMode} onCheckedChange={() => togglePreference('darkMode')} />
                        </div>

                        <Separator className="bg-border/30" />

                        {/* Email Notifications */}
                        <div className="flex items-center justify-between py-3">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                                    {preferences.emailNotifications ? <Bell className="w-4 h-4 text-primary" /> : <BellOff className="w-4 h-4 text-muted-foreground" />}
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Email Notifications</p>
                                    <p className="text-xs text-muted-foreground">Receive alerts about your analysis reports</p>
                                </div>
                            </div>
                            <Switch id="email-notifications" checked={preferences.emailNotifications} onCheckedChange={() => togglePreference('emailNotifications')} />
                        </div>

                        <Separator className="bg-border/30" />

                        {/* Weekly Digest */}
                        <div className="flex items-center justify-between py-3">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                                    <Bell className="w-4 h-4 text-muted-foreground" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Weekly Digest</p>
                                    <p className="text-xs text-muted-foreground">Get a weekly summary of your AI visibility metrics</p>
                                </div>
                            </div>
                            <Switch id="weekly-digest" checked={preferences.weeklyDigest} onCheckedChange={() => togglePreference('weeklyDigest')} />
                        </div>

                        <Separator className="bg-border/30" />

                        {/* Product Updates */}
                        <div className="flex items-center justify-between py-3">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                                    <Bell className="w-4 h-4 text-muted-foreground" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Product Updates</p>
                                    <p className="text-xs text-muted-foreground">News about new features and improvements</p>
                                </div>
                            </div>
                            <Switch id="product-updates" checked={preferences.productUpdates} onCheckedChange={() => togglePreference('productUpdates')} />
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Save Button */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.35 }} className="flex justify-end pb-8">
                <Button className="px-8 py-5 font-semibold" onClick={handleSave} disabled={isSaving}>
                    {isSaving ? (
                        <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                            Saving...
                        </span>
                    ) : (
                        <span className="flex items-center gap-2">
                            <Save className="w-4 h-4" />
                            Save Changes
                        </span>
                    )}
                </Button>
            </motion.div>

            {/* Avatar Crop Dialog */}
            <Dialog open={cropDialogOpen} onOpenChange={setCropDialogOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Crop your avatar</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden border-2 border-border/50 bg-muted">
                            {rawImage && (
                                <img ref={imageRef} src={rawImage} alt="Crop preview" className="absolute inset-0 w-full h-full object-cover" style={{ transform: `scale(${cropZoom[0]}) translate(${cropPosition.x}px, ${cropPosition.y}px)` }} draggable={false} />
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Zoom</Label>
                            <Slider value={cropZoom} onValueChange={setCropZoom} min={1} max={3} step={0.1} className="w-full" />
                        </div>
                    </div>
                    <canvas ref={canvasRef} className="hidden" />
                    <DialogFooter className="gap-2">
                        <Button variant="outline" onClick={() => { setCropDialogOpen(false); setRawImage(null) }} className="bg-transparent">Cancel</Button>
                        <Button onClick={handleCropConfirm}>Apply</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

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
                            To enable 2FA, scan the QR code below with your authenticator app (Google Authenticator, Authy, etc.)
                        </p>

                        {/* Placeholder QR code */}
                        <div className="w-48 h-48 mx-auto bg-white rounded-xl flex items-center justify-center">
                            <div className="text-center">
                                <Shield className="w-12 h-12 text-primary mx-auto mb-2" />
                                <p className="text-xs text-muted-foreground font-medium">QR Code</p>
                                <p className="text-[10px] text-muted-foreground">Will be generated by backend</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Verification Code</Label>
                            <Input type="text" placeholder="Enter 6-digit code" className="bg-background/50 text-center tracking-[0.5em] font-mono" maxLength={6} />
                            <p className="text-[11px] text-muted-foreground">Enter the code from your authenticator app to verify setup.</p>
                        </div>
                    </div>
                    <DialogFooter className="gap-2">
                        <Button variant="outline" onClick={() => setShow2FADialog(false)} className="bg-transparent">Cancel</Button>
                        <Button onClick={confirm2FAEnable}>
                            <Shield className="w-4 h-4 mr-2" />
                            Enable 2FA
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
