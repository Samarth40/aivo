import React, { useState, useEffect } from "react"
import { useAuth } from '@/contexts/AuthContext'
import { reportsApi, analysisApi, simulationApi, competitorApi, llmsApi } from '@/services/api'
import { toast } from "sonner"
import { jsPDF } from "jspdf"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
    FileBarChart, Download, FileText, Trash2, Eye, Clock,
    Scissors, BrainCircuit, Network, Swords, FlaskConical
} from "lucide-react"

import { exportAnalysisPDF, exportSimulationPDF, exportCompetitorTXT, exportLlmsTXT } from "@/lib/exportUtils"

const AI_MODELS = [
    { id: "chatgpt", name: "ChatGPT", version: "GPT-5.3" },
    { id: "gemini", name: "Gemini 3", version: "Pro" },
    { id: "perplexity", name: "Perplexity", version: "Deep Research" },
    { id: "claude", name: "Claude", version: "4.5 Sonnet" },
    { id: "grok", name: "Grok", version: "4.1" },
    { id: "google-aio", name: "Google AI Overview", version: "SGE" },
]

const SCORE_ROWS = [
    { key: "overall", label: "Overall" },
    { key: "contentQuality", label: "Content Quality" },
    { key: "semanticDepth", label: "Semantic Depth" },
    { key: "entityCoverage", label: "Entity Coverage" },
    { key: "structuredData", label: "Structured Data" },
    { key: "aiReadability", label: "AI Readability" },
]

const ENGINE_ICONS = {
    "Content Extraction": { icon: Scissors, color: "text-primary" },
    "Semantic Scoring": { icon: BrainCircuit, color: "text-chart-1" },
    "Entity Graph": { icon: Network, color: "text-chart-2" },
    "Competitor Intel": { icon: Swords, color: "text-chart-3" },
    "AI Simulation": { icon: FlaskConical, color: "text-chart-4" },
}


const scheduled = [
    { id: 1, name: "Weekly Visibility Digest", frequency: "Every Monday", nextRun: "Mar 3, 2026", engines: ["AI Simulation", "Semantic Scoring"] },
    { id: 2, name: "Monthly Competitor Review", frequency: "1st of month", nextRun: "Mar 1, 2026", engines: ["Competitor Intel"] },
]

export default function Reports() {
    const { getToken } = useAuth()
    const [reportsList, setReportsList] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const token = await getToken()
                const data = await reportsApi.getAll(token)
                setReportsList(data.reports || [])
            } catch (err) {
                console.error(err)
                toast.error("Failed to fetch reports")
            } finally {
                setLoading(false)
            }
        }
        fetchReports()
    }, [getToken])

    const handleDelete = async (id, engine) => {
        try {
            const token = await getToken()
            await reportsApi.delete(token, engine, id)
            setReportsList(prev => prev.filter(r => r.id !== id))
            toast.success("Report deleted successfully")
        } catch (err) {
            console.error(err)
            toast.error("Failed to delete report")
        }
    }


    const handleDownload = async (report) => {
        try {
            toast.info(`Fetching detailed data for ${report.name}...`);
            const token = await getToken();

            if (report.engine === "Semantic Scoring") {
                const data = await analysisApi.getById(token, report.id);
                if (data) {
                    const extractionResult = {
                        title: data.url || report.name || "Analyzed URL",
                        wordCount: "Analyzed",
                        noiseRemoved: "HTML Cleaned",
                        cleanText: "Semantic Analysis Complete. SEO metrics have been fully retrieved from the AIVO backend Engine.",
                        elementsStripped: []
                    }
                    const scoringResult = {
                        overallScore: data.scoreInfo?.aiVisibilityScore || 0,
                        topicMatch: (data.scoreInfo?.expectedCitations || 0) * 10,
                        comprehensiveness: (data.semanticDensity || 0) * 10,
                        missingSubtopics: [],
                        strongSubtopics: []
                    }
                    const entities = data.entitiesFound || []
                    const entityResult = {
                        entitiesFound: entities.length,
                        relationships: entities.length * 2,
                        topEntities: entities.map(ent => ({ name: ent, type: "Entity", confidence: "High" })),
                        graphNodes: entities.map((ent, i) => ({ id: i, label: ent, x: 50 + (i * 10), y: 50 + (i * 5) }))
                    }
                    exportAnalysisPDF(data.url || report.name, "", extractionResult, scoringResult, entityResult)
                }
            } else if (report.engine === "AI Simulation") {
                const data = await simulationApi.getById(token, report.id);
                if (data && data.results) {
                    exportSimulationPDF(data.url ? "url" : "content", data.url || report.name, data.results, AI_MODELS)
                }
            } else if (report.engine === "Competitor Intel") {
                const data = await competitorApi.getById(token, report.id);
                if (data && data.results) {
                    exportCompetitorTXT(data.results, SCORE_ROWS)
                }
            } else if (report.engine === "Content Extraction") {
                const data = await llmsApi.getById(token, report.id);
                if (data && data.results) {
                    const { brandName, tagline, description, sections = [] } = data.results;
                    let output = ""
                    if (brandName) output += `# ${brandName}\n\n`
                    if (tagline) output += `> ${tagline}\n\n`
                    if (description) output += `${description}\n\n`
                    sections.forEach((section) => {
                        if (section.title) {
                            output += `## ${section.title}\n\n`
                            section.links.forEach((link) => {
                                if (link.label && link.url) {
                                    output += `- [${link.label}](${link.url})\n`
                                } else if (link.label) {
                                    output += `- ${link.label}\n`
                                }
                            })
                            if (section.links.some(l => l.label || l.url)) output += "\n"
                        }
                    })
                    exportLlmsTXT(output.trim() || JSON.stringify(data.results, null, 2))
                }
            }

            toast.success(`Successfully downloaded report`);
        } catch (err) {
            console.error("Download error:", err);
            toast.error("Failed to fetch detailed data or generate report");
        }
    }

    return (
        <div className="flex-1 space-y-5 pt-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                            <FileBarChart className="w-5 h-5 text-primary-foreground" />
                        </div>
                        Reports
                    </h2>
                    <p className="text-muted-foreground mt-1.5 text-sm max-w-xl">
                        View, download, and manage your generated analysis reports.
                    </p>
                </div>
                <Button>
                    <FileBarChart className="w-4 h-4 mr-2" /> Generate Report
                </Button>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4">
                <Card className="bg-card/40 border-border/40">
                    <CardContent className="py-4 px-5 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Total Reports</p>
                            <p className="text-2xl font-black mt-0.5">{reportsList.length}</p>
                        </div>
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                            <FileText className="w-4 h-4 text-primary" />
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-card/40 border-border/40">
                    <CardContent className="py-4 px-5 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Scheduled</p>
                            <p className="text-2xl font-black mt-0.5">{scheduled.length}</p>
                        </div>
                        <div className="w-9 h-9 rounded-lg bg-chart-4/10 flex items-center justify-center">
                            <Clock className="w-4 h-4 text-chart-4" />
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-card/40 border-border/40">
                    <CardContent className="py-4 px-5 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Avg Score</p>
                            <p className="text-2xl font-black mt-0.5">80<span className="text-sm text-muted-foreground font-semibold">/100</span></p>
                        </div>
                        <div className="w-9 h-9 rounded-lg bg-chart-2/10 flex items-center justify-center">
                            <Eye className="w-4 h-4 text-chart-2" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="all" className="w-full">
                <TabsList>
                    <TabsTrigger value="all">All Reports</TabsTrigger>
                    <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                </TabsList>

                {/* All Reports */}
                <TabsContent value="all">
                    <Card className="bg-card/40 border-border/40">
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-border/40 hover:bg-transparent">
                                        <TableHead className="font-semibold text-foreground text-xs">Report</TableHead>
                                        <TableHead className="font-semibold text-foreground text-xs">Engine</TableHead>
                                        <TableHead className="font-semibold text-foreground text-xs text-center">Score</TableHead>
                                        <TableHead className="font-semibold text-foreground text-xs">Date</TableHead>
                                        <TableHead className="font-semibold text-foreground text-xs text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {loading ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="h-24 text-center">
                                                <div className="flex justify-center items-center gap-2">
                                                    <span className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                                    <span className="text-muted-foreground text-sm font-medium">Loading reports...</span>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : reportsList.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="h-24 text-center text-muted-foreground text-sm">
                                                No reports generated yet.
                                            </TableCell>
                                        </TableRow>
                                    ) : reportsList.map((r) => {
                                        const eng = ENGINE_ICONS[r.engine] || {}
                                        const Icon = eng.icon || FileText
                                        const scoreColor = r.score >= 80 ? "text-chart-2" : r.score >= 60 ? "text-chart-5" : "text-destructive"

                                        return (
                                            <TableRow key={r.id} className="border-border/40 hover:bg-muted/30">
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-lg bg-primary/5 border border-border/30 flex items-center justify-center flex-shrink-0">
                                                            <FileText className="w-3.5 h-3.5 text-primary" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium">{r.name}</p>
                                                            <p className="text-[10px] text-muted-foreground uppercase">{r.type} • {r.size}</p>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${eng.color || "text-muted-foreground"}`}>
                                                        <Icon className="w-3.5 h-3.5" /> {r.engine}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <span className={`text-sm font-bold ${scoreColor}`}>{r.score}</span>
                                                </TableCell>
                                                <TableCell className="text-xs text-muted-foreground">{r.date}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleDownload(r)}>
                                                            <Download className="w-3.5 h-3.5 text-muted-foreground" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleDelete(r.id, r.engine)}>
                                                            <Trash2 className="w-3.5 h-3.5 text-muted-foreground" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Scheduled */}
                <TabsContent value="scheduled">
                    <div className="space-y-3">
                        {scheduled.map((s) => (
                            <Card key={s.id} className="bg-card/40 border-border/40">
                                <CardContent className="py-4 px-5 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-9 h-9 rounded-lg bg-chart-4/10 flex items-center justify-center">
                                            <Clock className="w-4 h-4 text-chart-4" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold">{s.name}</p>
                                            <p className="text-xs text-muted-foreground">{s.frequency} • Next: {s.nextRun}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {s.engines.map((e) => {
                                            const ec = ENGINE_ICONS[e] || {}
                                            return (
                                                <Badge key={e} variant="outline" className={`text-[10px] font-semibold ${ec.color || ""}`}>
                                                    {e}
                                                </Badge>
                                            )
                                        })}
                                        <Button variant="outline" size="sm" className="h-7 text-xs ml-2">Edit</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
