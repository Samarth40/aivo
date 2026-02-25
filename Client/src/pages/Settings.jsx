import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Settings() {
    return (
        <div className="flex-1 space-y-6 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
            </div>

            <div className="grid gap-6">
                <Card className="bg-card/40 border-border/40 shadow-sm">
                    <CardHeader>
                        <CardTitle>Account Configuration</CardTitle>
                        <CardDescription>
                            Manage your profile and workspace preferences.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Workspace Name</label>
                            <input
                                type="text"
                                defaultValue="AIVO Production"
                                className="w-full max-w-sm bg-background border border-border/50 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Notification Email</label>
                            <input
                                type="email"
                                defaultValue="admin@aivo.ai"
                                className="w-full max-w-sm bg-background border border-border/50 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                        </div>
                        <Button size="sm" className="mt-4">Save Changes</Button>
                    </CardContent>
                </Card>

                <Card className="bg-card/40 border-border/40 shadow-sm">
                    <CardHeader>
                        <CardTitle>API Integrations</CardTitle>
                        <CardDescription>
                            Connect external search tools and LLM keys.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">OpenAI API Key</label>
                            <input
                                type="password"
                                defaultValue="sk-........................"
                                className="w-full max-w-sm bg-background border border-border/50 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                        </div>
                        <Button size="sm" variant="outline" className="mt-4">Update Key</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
