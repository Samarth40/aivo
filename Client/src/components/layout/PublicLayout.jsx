import React from 'react'
import { Outlet } from 'react-router-dom'
import GlobalHeader from '@/components/layout/GlobalHeader'
import GlobalFooter from '@/components/layout/GlobalFooter'

export default function PublicLayout() {
    return (
        <div className="bg-background text-foreground font-sans min-h-screen flex flex-col selection:bg-primary selection:text-primary-foreground">
            <GlobalHeader />

            {/* Main Content Area */}
            <main className="flex-1 w-full flex flex-col">
                <Outlet />
            </main>

            <GlobalFooter />
        </div>
    )
}
