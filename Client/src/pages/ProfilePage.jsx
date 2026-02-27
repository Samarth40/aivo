import React, { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Camera, Save, Trash2, Mail, ImagePlus, Check } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from '@/contexts/AuthContext'

export default function ProfilePage() {
    const { user, profile: authProfile, updateProfile: saveToAuth } = useAuth()

    const [form, setForm] = useState({
        firstName: authProfile.firstName || '',
        lastName: authProfile.lastName || '',
        jobTitle: authProfile.jobTitle || '',
        bio: authProfile.bio || '',
        avatarUrl: authProfile.avatarUrl || '',
    })
    const [isSaving, setIsSaving] = useState(false)
    const [saved, setSaved] = useState(false)

    // Avatar dialog state
    const [avatarDialogOpen, setAvatarDialogOpen] = useState(false)
    const [cropMode, setCropMode] = useState(false)
    const [rawImage, setRawImage] = useState(null)
    const [cropZoom, setCropZoom] = useState(1)
    const [cropOffset, setCropOffset] = useState({ x: 0, y: 0 })
    const [isDragging, setIsDragging] = useState(false)
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
    const fileInputRef = useRef(null)
    const canvasRef = useRef(null)
    const imageRef = useRef(null)
    const cropAreaRef = useRef(null)

    const updateForm = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }))
        setSaved(false)
    }

    const openAvatarDialog = () => {
        setCropMode(false)
        setRawImage(null)
        setCropZoom(1)
        setCropOffset({ x: 0, y: 0 })
        setAvatarDialogOpen(true)
    }

    const handleAvatarUpload = (e) => {
        const file = e.target.files?.[0]
        if (!file) return
        if (!file.type.startsWith('image/')) return
        if (file.size > 5 * 1024 * 1024) return // 5MB limit

        const reader = new FileReader()
        reader.onload = (event) => {
            setRawImage(event.target.result)
            setCropZoom(1)
            setCropOffset({ x: 0, y: 0 })
            setCropMode(true)
        }
        reader.readAsDataURL(file)
        e.target.value = ''
    }

    // Drag to reposition image inside crop area
    const handleMouseDown = useCallback((e) => {
        e.preventDefault()
        setIsDragging(true)
        setDragStart({ x: e.clientX - cropOffset.x, y: e.clientY - cropOffset.y })
    }, [cropOffset])

    const handleMouseMove = useCallback((e) => {
        if (!isDragging) return
        const newX = e.clientX - dragStart.x
        const newY = e.clientY - dragStart.y
        // Limit drag range based on zoom
        const limit = 60 * cropZoom
        setCropOffset({
            x: Math.max(-limit, Math.min(limit, newX)),
            y: Math.max(-limit, Math.min(limit, newY)),
        })
    }, [isDragging, dragStart, cropZoom])

    const handleMouseUp = useCallback(() => {
        setIsDragging(false)
    }, [])

    // Touch support for mobile
    const handleTouchStart = useCallback((e) => {
        const touch = e.touches[0]
        setIsDragging(true)
        setDragStart({ x: touch.clientX - cropOffset.x, y: touch.clientY - cropOffset.y })
    }, [cropOffset])

    const handleTouchMove = useCallback((e) => {
        if (!isDragging) return
        const touch = e.touches[0]
        const newX = touch.clientX - dragStart.x
        const newY = touch.clientY - dragStart.y
        const limit = 60 * cropZoom
        setCropOffset({
            x: Math.max(-limit, Math.min(limit, newX)),
            y: Math.max(-limit, Math.min(limit, newY)),
        })
    }, [isDragging, dragStart, cropZoom])

    // Attach global mouse listeners when dragging
    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove)
            window.addEventListener('mouseup', handleMouseUp)
            window.addEventListener('touchmove', handleTouchMove)
            window.addEventListener('touchend', handleMouseUp)
            return () => {
                window.removeEventListener('mousemove', handleMouseMove)
                window.removeEventListener('mouseup', handleMouseUp)
                window.removeEventListener('touchmove', handleTouchMove)
                window.removeEventListener('touchend', handleMouseUp)
            }
        }
    }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove])

    // Scroll-to-zoom (mouse wheel / trackpad)
    const handleWheel = useCallback((e) => {
        e.preventDefault()
        const delta = -e.deltaY * 0.002
        setCropZoom(prev => Math.min(3, Math.max(1, prev + delta)))
    }, [])

    // Attach wheel listener to crop area (needs { passive: false })
    useEffect(() => {
        const el = cropAreaRef.current
        if (el && cropMode) {
            el.addEventListener('wheel', handleWheel, { passive: false })
            return () => el.removeEventListener('wheel', handleWheel)
        }
    }, [cropMode, handleWheel])



    const handleCropConfirm = useCallback(() => {
        if (!imageRef.current || !canvasRef.current) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        const img = imageRef.current
        const size = 256

        canvas.width = size
        canvas.height = size
        ctx.clearRect(0, 0, size, size)

        // Circular clip
        ctx.beginPath()
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
        ctx.closePath()
        ctx.clip()

        const zoom = cropZoom
        const imgAspect = img.naturalWidth / img.naturalHeight
        let drawWidth, drawHeight

        if (imgAspect > 1) {
            drawHeight = size * zoom
            drawWidth = drawHeight * imgAspect
        } else {
            drawWidth = size * zoom
            drawHeight = drawWidth / imgAspect
        }

        // Scale offset from preview size (192px) to canvas size (256px)
        const scale = size / 192
        const drawX = (size - drawWidth) / 2 + cropOffset.x * scale
        const drawY = (size - drawHeight) / 2 + cropOffset.y * scale
        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight)

        const croppedUrl = canvas.toDataURL('image/png')
        setForm(prev => ({ ...prev, avatarUrl: croppedUrl }))
        // Also immediately persist to auth so navbar updates
        saveToAuth({ avatarUrl: croppedUrl })
        setAvatarDialogOpen(false)
        setCropMode(false)
        setRawImage(null)
        setSaved(false)
    }, [cropZoom, cropOffset, saveToAuth])

    const handleRemoveAvatar = () => {
        setForm(prev => ({ ...prev, avatarUrl: '' }))
        saveToAuth({ avatarUrl: '' })
        setAvatarDialogOpen(false)
    }

    const handleSave = () => {
        setIsSaving(true)
        // Persist all profile data through AuthContext
        saveToAuth({
            firstName: form.firstName,
            lastName: form.lastName,
            jobTitle: form.jobTitle,
            bio: form.bio,
            avatarUrl: form.avatarUrl,
        })
        setTimeout(() => {
            setIsSaving(false)
            setSaved(true)
            // Auto-dismiss success after 3 seconds
            setTimeout(() => setSaved(false), 3000)
        }, 800)
    }

    const initials = `${form.firstName?.[0] || ''}${form.lastName?.[0] || ''}`.toUpperCase() || 'U'

    return (
        <div className="flex-1 space-y-6 pt-2 max-w-4xl">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <p className="text-muted-foreground">Manage your personal information and profile details</p>
            </motion.div>

            {/* Avatar Section — click to open dialog */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
                <Card className="bg-card/40 border-border/40 shadow-sm">
                    <CardHeader>
                        <CardTitle>Avatar</CardTitle>
                        <CardDescription>Click your avatar to upload, crop, or remove your photo</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-5">
                            <button
                                type="button"
                                onClick={openAvatarDialog}
                                className="relative group cursor-pointer"
                            >
                                <Avatar className="w-20 h-20 border-2 border-border/50 transition-all group-hover:border-primary/50">
                                    {form.avatarUrl ? (
                                        <AvatarImage src={form.avatarUrl} alt="Profile avatar" />
                                    ) : null}
                                    <AvatarFallback className="text-lg font-bold bg-primary/10 text-primary">
                                        {initials}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Camera className="w-5 h-5 text-white" />
                                </div>
                            </button>
                            <div>
                                <p className="text-sm font-medium text-foreground">{form.firstName} {form.lastName}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">Click to manage your profile photo</p>
                            </div>
                        </div>
                        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
                    </CardContent>
                </Card>
            </motion.div>

            {/* Personal Details */}
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
                                <Input id="firstName" type="text" placeholder="John" className="bg-background/50" value={form.firstName} onChange={(e) => updateForm('firstName', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
                                <Input id="lastName" type="text" placeholder="Doe" className="bg-background/50" value={form.lastName} onChange={(e) => updateForm('lastName', e.target.value)} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="jobTitle" className="text-sm font-medium">Job Title</Label>
                            <Input id="jobTitle" type="text" placeholder="SEO Specialist" className="bg-background/50 max-w-sm" value={form.jobTitle} onChange={(e) => updateForm('jobTitle', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bio" className="text-sm font-medium">Bio</Label>
                            <textarea
                                id="bio"
                                placeholder="Tell us a little about yourself..."
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                                value={form.bio}
                                onChange={(e) => updateForm('bio', e.target.value)}
                                rows={3}
                            />
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Save Button */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }} className="flex items-center justify-end gap-3 pb-8">
                <AnimatePresence>
                    {saved && (
                        <motion.span
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="flex items-center gap-1.5 text-sm text-emerald-400"
                        >
                            <Check className="w-4 h-4" />
                            Changes saved
                        </motion.span>
                    )}
                </AnimatePresence>
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

            {/* ── Avatar Management Dialog ── */}
            <Dialog open={avatarDialogOpen} onOpenChange={(open) => { setAvatarDialogOpen(open); if (!open) { setCropMode(false); setRawImage(null) } }}>
                <DialogContent className="max-w-md">
                    <AnimatePresence mode="wait">
                        {cropMode && rawImage ? (
                            /* ── Crop View ── */
                            <motion.div
                                key="crop"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.2 }}
                            >
                                <DialogHeader>
                                    <DialogTitle>Crop your photo</DialogTitle>
                                    <DialogDescription>
                                        Drag to reposition • scroll to zoom
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="space-y-4 mt-4">
                                    {/* Crop area */}
                                    <div className="relative mx-auto" style={{ width: 220, height: 220 }}>
                                        {/* Glow ring */}
                                        <div className="absolute inset-0 rounded-full border-2 border-primary/30 shadow-[0_0_30px_rgba(124,58,237,0.15)]" />
                                        
                                        {/* Crop container */}
                                        <div
                                            ref={cropAreaRef}
                                            className="w-full h-full rounded-full overflow-hidden bg-muted cursor-grab active:cursor-grabbing select-none"
                                            onMouseDown={handleMouseDown}
                                            onTouchStart={handleTouchStart}
                                        >
                                            <img
                                                ref={imageRef}
                                                src={rawImage}
                                                alt="Crop preview"
                                                className="w-full h-full object-cover pointer-events-none"
                                                style={{
                                                    transform: `scale(${cropZoom}) translate(${cropOffset.x / cropZoom}px, ${cropOffset.y / cropZoom}px)`,
                                                    transition: isDragging ? 'none' : 'transform 0.15s ease-out',
                                                }}
                                                draggable={false}
                                            />
                                        </div>
                                    </div>

                                    {/* Subtle zoom indicator — only visible when zoomed */}
                                    {cropZoom > 1.05 && (
                                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm rounded-full px-2.5 py-0.5 text-[10px] font-medium text-white/80 tabular-nums pointer-events-none">
                                            {Math.round(cropZoom * 100)}%
                                        </div>
                                    )}

                                    <p className="text-[10px] text-muted-foreground/40 text-center mt-3 select-none">
                                        Scroll or pinch to zoom · drag to reposition
                                    </p>
                                </div>

                                <canvas ref={canvasRef} className="hidden" />

                                <DialogFooter className="gap-2 mt-4">
                                    <Button variant="outline" onClick={() => { setCropMode(false); setRawImage(null) }} className="bg-transparent">
                                        Back
                                    </Button>
                                    <Button onClick={handleCropConfirm}>
                                        <Check className="w-4 h-4 mr-1.5" />
                                        Apply
                                    </Button>
                                </DialogFooter>
                            </motion.div>
                        ) : (
                            /* ── Default View ── */
                            <motion.div
                                key="default"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.2 }}
                            >
                                <DialogHeader>
                                    <DialogTitle>Profile Photo</DialogTitle>
                                    <DialogDescription>
                                        Upload a new photo or remove the current one
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="space-y-5 mt-4">
                                    {/* Current avatar preview */}
                                    <div className="flex justify-center">
                                        <div className="relative">
                                            <Avatar className="w-32 h-32 border-2 border-border/50">
                                                {form.avatarUrl ? (
                                                    <AvatarImage src={form.avatarUrl} alt="Profile avatar" />
                                                ) : null}
                                                <AvatarFallback className="text-3xl font-bold bg-primary/10 text-primary">
                                                    {initials}
                                                </AvatarFallback>
                                            </Avatar>
                                            {!form.avatarUrl && (
                                                <div className="absolute inset-0 rounded-full border-2 border-dashed border-border/40 flex items-center justify-center">
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Action buttons */}
                                    <div className="space-y-2">
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start gap-3 h-11 bg-transparent border-border/50 hover:bg-white/5"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <ImagePlus className="w-4 h-4 text-primary" />
                                            Upload new photo
                                        </Button>

                                        {form.avatarUrl && (
                                            <Button
                                                variant="outline"
                                                className="w-full justify-start gap-3 h-11 bg-transparent border-border/50 text-destructive hover:text-destructive hover:bg-destructive/5"
                                                onClick={handleRemoveAvatar}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                Remove photo
                                            </Button>
                                        )}
                                    </div>

                                    <p className="text-[11px] text-muted-foreground text-center">
                                        JPG, PNG or GIF • Max 5MB • Image will be cropped to a circle
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </DialogContent>
            </Dialog>
        </div>
    )
}
