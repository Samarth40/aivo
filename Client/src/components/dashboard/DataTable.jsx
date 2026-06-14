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

const MOCK_ANALYSES = [
    { _id: "1", url: "yoursite.com/blog/aeo-guide", status: "Completed", scoreInfo: { aiVisibilityScore: 74 }, createdAt: new Date(Date.now() - 2 * 3600000).toISOString() },
    { _id: "2", url: "yoursite.com/blog/knowledge-graph", status: "Completed", scoreInfo: { aiVisibilityScore: 88 }, createdAt: new Date(Date.now() - 5 * 3600000).toISOString() },
    { _id: "3", url: "yoursite.com/services", status: "Completed", scoreInfo: { aiVisibilityScore: 62 }, createdAt: new Date(Date.now() - 86400000).toISOString() },
    { _id: "4", url: "yoursite.com/blog/llm-citation", status: "Completed", scoreInfo: { aiVisibilityScore: 84 }, createdAt: new Date(Date.now() - 86400000).toISOString() },
    { _id: "5", url: "yoursite.com/about", status: "Analyzing", scoreInfo: null, createdAt: new Date().toISOString() },
]

function timeAgo(isoString) {
    const diff = Math.floor((Date.now() - new Date(isoString)) / 1000)
    if (diff < 60) return "Just now"
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
    return `${Math.floor(diff / 86400)}d ago`
}

export function DataTable({ analyses: propAnalyses }) {
    const rows = propAnalyses?.length ? propAnalyses : MOCK_ANALYSES

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
                    {rows.map((item) => {
                        const score = item.scoreInfo?.aiVisibilityScore ?? null
                        const scoreColor = score === null ? "text-muted-foreground" : score >= 75 ? "text-chart-2" : score >= 50 ? "text-chart-5" : "text-destructive"
                        const isComplete = item.status === "Completed"

                        return (
                            <TableRow key={item._id} className="border-border/40 hover:bg-muted/30">
                                <TableCell className="font-medium text-sm truncate max-w-[200px]">{item.url}</TableCell>
                                <TableCell>
                                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary">
                                        <BrainCircuit className="w-3.5 h-3.5" />
                                        Analysis Pipeline
                                    </span>
                                </TableCell>
                                <TableCell className="text-center">
                                    {score !== null ? (
                                        <>
                                            <span className={`text-sm font-bold ${scoreColor}`}>{score}</span>
                                            <span className="text-[10px] text-muted-foreground">/100</span>
                                        </>
                                    ) : (
                                        <span className="text-xs text-muted-foreground">—</span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {isComplete ? (
                                        <Badge variant="outline" className="text-[10px] font-semibold text-chart-2 border-chart-2/30 bg-chart-2/5">
                                            <CheckCircle2 className="w-3 h-3 mr-1" /> Done
                                        </Badge>
                                    ) : (
                                        <Badge variant="outline" className="text-[10px] font-semibold text-muted-foreground border-border bg-muted/50">
                                            <Loader2 className="w-3 h-3 mr-1 animate-spin" /> {item.status}
                                        </Badge>
                                    )}
                                </TableCell>
                                <TableCell className="text-right text-xs text-muted-foreground">{timeAgo(item.createdAt)}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )
}

