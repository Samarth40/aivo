import React from "react"
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { CheckCircle2, Loader2, Scissors, BrainCircuit, Network, Swords, FlaskConical } from "lucide-react"

const ENGINE_CONFIG = {
    "Content Extraction": { icon: Scissors, color: "text-primary" },
    "Semantic Scoring": { icon: BrainCircuit, color: "text-chart-1" },
    "Entity Graph": { icon: Network, color: "text-chart-2" },
    "Competitor Intel": { icon: Swords, color: "text-chart-3" },
    "AI Simulation": { icon: FlaskConical, color: "text-chart-4" },
}

const analyses = [
    {
        id: "1",
        url: "yoursite.com/blog/aeo-guide",
        engine: "AI Simulation",
        score: 74,
        status: "Completed",
        date: "2 hours ago",
    },
    {
        id: "2",
        url: "yoursite.com/blog/knowledge-graph",
        engine: "Entity Graph",
        score: 88,
        status: "Completed",
        date: "5 hours ago",
    },
    {
        id: "3",
        url: "yoursite.com/services",
        engine: "Content Extraction",
        score: 62,
        status: "Completed",
        date: "Yesterday",
    },
    {
        id: "4",
        url: "yoursite.com/blog/llm-citation",
        engine: "Semantic Scoring",
        score: 84,
        status: "Completed",
        date: "Yesterday",
    },
    {
        id: "5",
        url: "yoursite.com/about",
        engine: "Competitor Intel",
        score: 45,
        status: "In Progress",
        date: "Just now",
    },
]

export function DataTable() {
    return (
        <div className="rounded-xl border border-border/40 bg-card/40 overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className="border-border/40 hover:bg-transparent">
                        <TableHead className="font-semibold text-foreground text-xs">URL</TableHead>
                        <TableHead className="font-semibold text-foreground text-xs">Engine</TableHead>
                        <TableHead className="font-semibold text-foreground text-xs text-center">Score</TableHead>
                        <TableHead className="font-semibold text-foreground text-xs">Status</TableHead>
                        <TableHead className="font-semibold text-foreground text-xs text-right">When</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {analyses.map((item) => {
                        const engineConf = ENGINE_CONFIG[item.engine] || {}
                        const Icon = engineConf.icon || FlaskConical
                        const scoreColor = item.score >= 75 ? "text-chart-2" : item.score >= 50 ? "text-chart-5" : "text-destructive"

                        return (
                            <TableRow key={item.id} className="border-border/40 hover:bg-muted/30">
                                <TableCell className="font-medium text-sm truncate max-w-[200px]">{item.url}</TableCell>
                                <TableCell>
                                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${engineConf.color || "text-muted-foreground"}`}>
                                        <Icon className="w-3.5 h-3.5" />
                                        {item.engine}
                                    </span>
                                </TableCell>
                                <TableCell className="text-center">
                                    <span className={`text-sm font-bold ${scoreColor}`}>{item.score}</span>
                                    <span className="text-[10px] text-muted-foreground">/100</span>
                                </TableCell>
                                <TableCell>
                                    {item.status === "Completed" ? (
                                        <Badge variant="outline" className="text-[10px] font-semibold text-chart-2 border-chart-2/30 bg-chart-2/5">
                                            <CheckCircle2 className="w-3 h-3 mr-1" /> Done
                                        </Badge>
                                    ) : (
                                        <Badge variant="outline" className="text-[10px] font-semibold text-muted-foreground border-border bg-muted/50">
                                            <Loader2 className="w-3 h-3 mr-1 animate-spin" /> Running
                                        </Badge>
                                    )}
                                </TableCell>
                                <TableCell className="text-right text-xs text-muted-foreground">{item.date}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )
}
