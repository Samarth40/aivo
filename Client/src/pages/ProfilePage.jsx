import React, { useState, useRef, useCallback } from 'react'
import { motion } from 'motion/react'
import { Camera, Save, Upload, Trash2, Mail } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from '@/contexts/AuthContext'

export default function ProfilePage() {
    const { user } = useAuth()

    const nameParts = (user?.name || '').split(' ')
    const [profile, setProfile] = useState({
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        jobTitle: '',
        bio: '',
        avatarUrl: '',
    })
    const [isSaving, setIsSaving] = useState(false)

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
        console.log('Profile saved:', profile)
        setTimeout(() => setIsSaving(false), 1200)
    }

    const initials = `${profile.firstName?.[0] || ''}${profile.lastName?.[0] || ''}`.toUpperCase() || 'U'

    return (
        <div className="flex-1 space-y-6 pt-2 max-w-4xl">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <p className="text-muted-foreground">Manage your personal information and profile details</p>
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
                        <div className="space-y-2">
                            <Label htmlFor="bio" className="text-sm font-medium">Bio</Label>
                            <textarea
                                id="bio"
                                placeholder="Tell us a little about yourself..."
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                                value={profile.bio}
                                onChange={(e) => updateProfile('bio', e.target.value)}
                                rows={3}
                            />
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Save Button */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }} className="flex justify-end pb-8">
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
        </div>
    )
}
