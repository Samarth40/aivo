import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import {
    LayoutDashboard,
    Workflow, // Analysis Pipeline
    Bot, // AI Sim
    Swords, // Competitor

    FileBarChart, // Reports
    MoreHorizontal, // Settings
    FileText, // LLMs.txt Generator
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import GlobalHeader from '@/components/layout/GlobalHeader'
import GlobalFooter from '@/components/layout/GlobalFooter'

function SidebarItem({ icon: Icon, label, to, isActive }) {
    return (
        <Link
            to={to}
            className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                }`}
        >
            <Icon size={18} />
            {label}
        </Link>
    )
}


export default function AppLayout() {
    const location = useLocation()
    const currentPath = location.pathname

    return (
        <div className="flex flex-col min-h-screen w-full bg-background text-foreground">
            <GlobalHeader />
            <div className="flex flex-1 pt-[88px]">
                {/* Sticky Sidebar */}
                <aside className="w-[240px] flex-shrink-0 flex flex-col border-r border-border bg-card/30 sticky top-[88px] h-[calc(100vh-88px)]">
                    {/* Brand Logo */}
                    <div className="h-16 flex items-center px-6">
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full border-2 border-primary" />
                            <span className="font-semibold text-[15px] tracking-tight">AIVO</span>
                        </div>
                    </div>

                    {/* Navigation Sections */}
                    <div className="flex-1 overflow-y-auto px-3 py-2 space-y-6">

                        {/* Engines Group */}
                        <div className="space-y-1 w-full">
                            <div className="px-3 text-xs font-semibold text-muted-foreground mb-2">Engines</div>
                            <SidebarItem icon={LayoutDashboard} label="Dashboard" to="/dashboard" isActive={currentPath === '/dashboard' || currentPath === '/'} />
                            <SidebarItem icon={Workflow} label="Analysis Pipeline" to="/dashboard/analysis" isActive={currentPath === '/dashboard/analysis'} />
                            <SidebarItem icon={Bot} label="AI Simulation" to="/dashboard/ai-simulation" isActive={currentPath === '/dashboard/ai-simulation'} />
                            <SidebarItem icon={Swords} label="Competitor Data" to="/dashboard/competitors" isActive={currentPath === '/dashboard/competitors'} />
                            <SidebarItem icon={FileText} label="LLMs.txt Generator" to="/dashboard/llms-generator" isActive={currentPath === '/dashboard/llms-generator'} />
                        </div>

                        {/* Resources Group */}
                        <div className="space-y-1 w-full pt-4">
                            <div className="px-3 text-xs font-semibold text-muted-foreground mb-2">Resources</div>
                            <SidebarItem icon={FileBarChart} label="Reports" to="/dashboard/reports" isActive={currentPath === '/dashboard/reports'} />
                            <SidebarItem icon={MoreHorizontal} label="Settings" to="/dashboard/settings" isActive={currentPath === '/dashboard/settings'} />
                        </div>

                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 flex flex-col min-w-0 bg-background relative">


                    <div className="flex-1 p-8 pt-2">
                        <div className="mx-auto w-full max-w-[1400px]">
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>

            {/* Full-width footer placed beneath both the sidebar and main content */}
            <div className="relative z-20">
                <GlobalFooter />
            </div>
        </div>
    )
}
