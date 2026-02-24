import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { LayoutDashboard, FileSearch, TrendingUp, Settings } from 'lucide-react'

export default function AppLayout() {
    return (
        <div className="flex min-h-screen bg-background text-foreground">

            {/* Sidebar Navigation */}
            <aside className="w-64 border-r border-border bg-card/50 flex flex-col p-4 hidden md:flex">
                <div className="font-extrabold text-2xl text-primary mb-8 px-2 tracking-tight">AIVO</div>

                <nav className="flex-1 space-y-2">
                    <Link to="/" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                        <LayoutDashboard size={20} />
                        <span className="font-medium">Dashboard</span>
                    </Link>
                    <Link to="/analysis" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                        <FileSearch size={20} />
                        <span className="font-medium">URL Analysis</span>
                    </Link>
                    <Link to="/competitors" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                        <TrendingUp size={20} />
                        <span className="font-medium">Competitors</span>
                    </Link>
                </nav>

                <div className="pt-4 border-t border-border mt-auto">
                    <Link to="/settings" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                        <Settings size={20} />
                        <span className="font-medium">Settings</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
                {/* Top Header Placeholder (Mobile Nav / Breadcrumbs / User Profile) */}
                <header className="h-14 border-b border-border bg-background/95 backdrop-blur flex items-center px-6 shrink-0 z-10">
                    <div className="ml-auto font-medium text-sm text-muted-foreground">John Doe</div>
                </header>

                {/* Scrollable Page Content */}
                <div className="flex-1 overflow-auto p-6 lg:p-10">
                    <div className="mx-auto max-w-5xl">
                        <Outlet />
                    </div>
                </div>
            </main>

        </div>
    )
}
