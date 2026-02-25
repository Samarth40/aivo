import React from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Overview } from "@/components/dashboard/Overview"
import { DataTable } from "@/components/dashboard/DataTable"
import {
    TrendingUp,
    TrendingDown
} from "lucide-react"

export default function DashboardHome() {
    return (
        <div className="flex-1 space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Card 1: Total Revenue */}
                <Card className="bg-card/40 border-border/40 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-[13px] font-medium text-muted-foreground/80">
                            Total Revenue
                        </CardTitle>
                        <div className="flex items-center text-[11px] font-medium bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            +12.5%
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold tracking-tight mb-4">$1,250.00</div>
                        <div className="flex items-center text-[13px] font-medium text-foreground/90 mb-1">
                            Trending up this month <TrendingUp className="w-3.5 h-3.5 ml-1.5 opacity-70" />
                        </div>
                        <p className="text-[12px] text-muted-foreground/70">
                            Visitors for the last 6 months
                        </p>
                    </CardContent>
                </Card>

                {/* Card 2: New Customers */}
                <Card className="bg-card/40 border-border/40 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-[13px] font-medium text-muted-foreground/80">
                            New Customers
                        </CardTitle>
                        <div className="flex items-center text-[11px] font-medium bg-foreground/10 text-foreground/70 px-2 py-0.5 rounded-full">
                            <TrendingDown className="w-3 h-3 mr-1" />
                            -20%
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold tracking-tight mb-4">1,234</div>
                        <div className="flex items-center text-[13px] font-medium text-foreground/90 mb-1">
                            Down 20% this period <TrendingDown className="w-3.5 h-3.5 ml-1.5 opacity-70" />
                        </div>
                        <p className="text-[12px] text-muted-foreground/70">
                            Acquisition needs attention
                        </p>
                    </CardContent>
                </Card>

                {/* Card 3: Active Accounts */}
                <Card className="bg-card/40 border-border/40 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-[13px] font-medium text-muted-foreground/80">
                            Active Accounts
                        </CardTitle>
                        <div className="flex items-center text-[11px] font-medium bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            +12.5%
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold tracking-tight mb-4">45,678</div>
                        <div className="flex items-center text-[13px] font-medium text-foreground/90 mb-1">
                            Strong user retention <TrendingUp className="w-3.5 h-3.5 ml-1.5 opacity-70" />
                        </div>
                        <p className="text-[12px] text-muted-foreground/70">
                            Engagement exceed targets
                        </p>
                    </CardContent>
                </Card>

                {/* Card 4: Growth Rate */}
                <Card className="bg-card/40 border-border/40 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-[13px] font-medium text-muted-foreground/80">
                            Growth Rate
                        </CardTitle>
                        <div className="flex items-center text-[11px] font-medium bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            +4.5%
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold tracking-tight mb-4">4.5%</div>
                        <div className="flex items-center text-[13px] font-medium text-foreground/90 mb-1">
                            Steady performance increase <TrendingUp className="w-3.5 h-3.5 ml-1.5 opacity-70" />
                        </div>
                        <p className="text-[12px] text-muted-foreground/70">
                            Meets growth projections
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-card/40 border-border/40 shadow-sm overflow-hidden">
                <CardHeader className="flex flex-row items-start justify-between pb-6 pt-5 px-6">
                    <div>
                        <CardTitle className="text-[15px] font-semibold tracking-tight">Total Visitors</CardTitle>
                        <p className="text-[13px] text-muted-foreground/80 mt-1">Total for the last 3 months</p>
                    </div>
                    <div className="flex space-x-1.5 bg-background/50 p-1 rounded-lg border border-border/50">
                        <Button variant="secondary" size="sm" className="bg-card text-foreground shadow-sm h-7 text-[12px] px-3 font-medium">
                            Last 3 months
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground h-7 text-[12px] px-3 font-medium">
                            Last 30 days
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground h-7 text-[12px] px-3 font-medium">
                            Last 7 days
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="pl-0 pb-0 pr-0 pt-0">
                    <Overview />
                </CardContent>
            </Card>

            {/* Data Table Section */}
            <div className="pt-4">
                <DataTable />
            </div>

        </div>
    )
}
