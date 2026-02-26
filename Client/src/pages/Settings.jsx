import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Settings2, User, Key, Bell, Shield, Save, Eye, EyeOff, CheckCircle2
} from "lucide-react"

export default function Settings() {
    const [showKey, setShowKey] = useState(false)
    const [saved, setSaved] = useState(false)

    const handleSave = () => {
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
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
                    Manage your workspace, API keys, and notification preferences.
                </p>
            </div>

            <Tabs defaultValue="general" className="w-full">
                <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>
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
        </div>
    )
}
