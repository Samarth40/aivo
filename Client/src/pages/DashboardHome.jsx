import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
    TrendingDown,
    Eye,
    FileText,
    Network,
    Quote,
} from "lucide-react"

const RANGES = [
    { key: "3m", label: "3 Months" },
    { key: "30d", label: "30 Days" },
    { key: "7d", label: "7 Days" },
]

export default function DashboardHome() {
    const [chartRange, setChartRange] = useState("3m")

    return (
        <div className="flex-1 space-y-5 animate-in fade-in duration-500">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Card 1: AI Visibility Score */}
                <Card className="bg-card/40 border-border/40">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-xs font-medium text-muted-foreground">
                            AI Visibility Score
                        </CardTitle>
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Eye className="w-4 h-4 text-primary" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black tracking-tight">74<span className="text-lg text-muted-foreground font-semibold">/100</span></div>
                        <div className="flex items-center gap-1.5 mt-2">
                            <Badge variant="outline" className="text-[10px] font-bold text-chart-2 border-chart-2/30 bg-chart-2/5 px-1.5 py-0">
                                <TrendingUp className="w-3 h-3 mr-0.5" /> +8.2%
                            </Badge>
                            <span className="text-[11px] text-muted-foreground">vs last month</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Card 2: Pages Analyzed */}
                <Card className="bg-card/40 border-border/40">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-xs font-medium text-muted-foreground">
                            Pages Analyzed
                        </CardTitle>
                        <div className="w-8 h-8 rounded-lg bg-chart-1/10 flex items-center justify-center">
                            <FileText className="w-4 h-4 text-chart-1" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black tracking-tight">128</div>
                        <div className="flex items-center gap-1.5 mt-2">
                            <Badge variant="outline" className="text-[10px] font-bold text-chart-2 border-chart-2/30 bg-chart-2/5 px-1.5 py-0">
                                <TrendingUp className="w-3 h-3 mr-0.5" /> +23
                            </Badge>
                            <span className="text-[11px] text-muted-foreground">this week</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Card 3: Entity Coverage */}
                <Card className="bg-card/40 border-border/40">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-xs font-medium text-muted-foreground">
                            Entity Coverage
                        </CardTitle>
                        <div className="w-8 h-8 rounded-lg bg-chart-2/10 flex items-center justify-center">
                            <Network className="w-4 h-4 text-chart-2" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black tracking-tight">67<span className="text-lg text-muted-foreground font-semibold">%</span></div>
                        <div className="flex items-center gap-1.5 mt-2">
                            <Badge variant="outline" className="text-[10px] font-bold text-chart-5 border-chart-5/30 bg-chart-5/5 px-1.5 py-0">
                                <TrendingDown className="w-3 h-3 mr-0.5" /> -3%
                            </Badge>
                            <span className="text-[11px] text-muted-foreground">needs attention</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Card 4: Citation Likelihood */}
                <Card className="bg-card/40 border-border/40">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-xs font-medium text-muted-foreground">
                            Citation Likelihood
                        </CardTitle>
                        <div className="w-8 h-8 rounded-lg bg-chart-4/10 flex items-center justify-center">
                            <Quote className="w-4 h-4 text-chart-4" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black tracking-tight">High</div>
                        <div className="flex items-center gap-1.5 mt-2">
                            <Badge variant="outline" className="text-[10px] font-bold text-chart-2 border-chart-2/30 bg-chart-2/5 px-1.5 py-0">
                                <TrendingUp className="w-3 h-3 mr-0.5" /> +12%
                            </Badge>
                            <span className="text-[11px] text-muted-foreground">across 6 models</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Chart */}
            <Card className="bg-card/40 border-border/40 overflow-hidden">
                <CardHeader className="flex flex-row items-start justify-between pb-4 pt-5 px-5">
                    <div>
                        <CardTitle className="text-sm font-semibold tracking-tight">AI Visibility Trend</CardTitle>
                        <p className="text-xs text-muted-foreground mt-1">Your visibility score across AI models over time</p>
                    </div>
                    <div className="flex gap-1 bg-muted/30 p-0.5 rounded-lg border border-border/50">
                        {RANGES.map((r) => (
                            <Button
                                key={r.key}
                                variant={chartRange === r.key ? "secondary" : "ghost"}
                                size="sm"
                                className={`h-6 text-[11px] px-2.5 font-medium ${chartRange === r.key ? "shadow-sm" : "text-muted-foreground"}`}
                                onClick={() => setChartRange(r.key)}
                            >
                                {r.label}
                            </Button>
                        ))}
                    </div>
                </CardHeader>
                <CardContent className="p-0 pr-2 pb-2">
                    <Overview range={chartRange} />
                </CardContent>
            </Card>

            {/* Recent Analyses Table */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-semibold">Recent Analyses</h3>
                        <p className="text-xs text-muted-foreground">Latest engine runs across your content</p>
                    </div>
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                        View All
                    </Button>
                </div>
                <DataTable />
            </div>
        </div>
    )
}
