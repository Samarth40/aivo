import React from 'react'

export default function DashboardHome() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
                <p className="text-muted-foreground">Welcome back. Here is your AI Visibility summary.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                {/* Placeholder Stat Cards */}
                <div className="p-6 border rounded-xl bg-card text-card-foreground shadow-sm">
                    <h3 className="text-sm font-medium text-muted-foreground">Total URLs Analyzed</h3>
                    <div className="text-2xl font-bold mt-2">12</div>
                </div>
                <div className="p-6 border rounded-xl bg-card text-card-foreground shadow-sm">
                    <h3 className="text-sm font-medium text-muted-foreground">Avg AI Visibility</h3>
                    <div className="text-2xl font-bold mt-2 text-primary">68%</div>
                </div>
                <div className="p-6 border rounded-xl bg-card text-card-foreground shadow-sm">
                    <h3 className="text-sm font-medium text-muted-foreground">Actionable Gaps</h3>
                    <div className="text-2xl font-bold mt-2 text-destructive">5</div>
                </div>
            </div>

            <div className="p-8 border rounded-xl bg-muted/50 text-center">
                <h2 className="text-xl font-semibold mb-2">Analyze a new URL</h2>
                <div className="max-w-md mx-auto flex gap-2">
                    <input type="text" placeholder="https://your-page.com" className="flex-1 rounded-md border bg-background px-3 py-2 text-sm" />
                    <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium">Analyze</button>
                </div>
            </div>
        </div>
    )
}
