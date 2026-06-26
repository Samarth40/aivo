import React, { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Swords, Loader2, CheckCircle2, Globe, Download,
    ArrowUpRight, ArrowDownRight, Minus, Lightbulb, Info
} from "lucide-react"
import { motion } from "motion/react"
import { useAuth } from "@/contexts/AuthContext"
import { competitorApi, pollJob } from "@/services/api"
import { toast } from "sonner"
import { downloadCSV } from "@/lib/exportUtils"

// --- Simulated data ---
const generateComparison = (targetUrl, competitorUrl) => {
    const getDomain = (u) => {
        try { return new URL(u.startsWith("http") ? u : `https://${u}`).hostname } catch { return u }
    }
    return {
        target: {
            url: targetUrl,
            domain: getDomain(targetUrl),
            scores: { overall: 64, contentQuality: 72, semanticDepth: 58, entityCoverage: 55, structuredData: 70, aiReadability: 68 },
            strengths: ["Well-structured heading hierarchy (H1–H3)", "Schema.org article markup detected", "Good internal linking density"],
            weaknesses: ["Lacks Q&A formatting", "Missing FAQ schema", "Promotional language at 15%", "Low entity coverage"],
        },
        competitor: {
            url: competitorUrl,
            domain: getDomain(competitorUrl),
            scores: { overall: 82, contentQuality: 88, semanticDepth: 79, entityCoverage: 85, structuredData: 90, aiReadability: 76 },
            strengths: ["Comprehensive entity coverage", "FAQ schema with 8 Q&A pairs", "Dense factual assertions with citations", "Zero promotional language", "Optimized for AI Overview extraction"],
            weaknesses: ["Readability score Grade 12", "Content may exceed ideal AI snippet length"],
        },
        suggestions: [
            { priority: "High", title: "Add structured FAQ schema", desc: "Competitor has 8 Q&A pairs in FAQ schema, significantly boosting AI extraction." },
            { priority: "High", title: "Expand entity coverage", desc: "Missing 12 key entities: 'Generative AI', 'Knowledge Graph', 'Semantic Search'." },
            { priority: "Medium", title: "Reduce promotional content", desc: "15% promo ratio vs competitor's 0%. AI models penalize marketing-heavy content." },
            { priority: "Medium", title: "Add summary paragraphs", desc: "Start each H2 section with a 2-sentence factual summary like the competitor does." },
            { priority: "Low", title: "Optimize content length", desc: "Target 1,200–1,800 words for optimal AI snippet extraction (currently 980)." },
        ],
    }
}

const SCORE_ROWS = [
    { key: "overall", label: "Overall" },
    { key: "contentQuality", label: "Content Quality" },
    { key: "semanticDepth", label: "Semantic Depth" },
    { key: "entityCoverage", label: "Entity Coverage" },
    { key: "structuredData", label: "Structured Data" },
    { key: "aiReadability", label: "AI Readability" },
]

// --- Download Report ---
import { exportCompetitorTXT } from "@/lib/exportUtils"

// --- Component ---
export default function CompetitorIntelligence() {
    const { getToken } = useAuth()
    const [targetUrl, setTargetUrl] = useState("")
    const [competitorUrl, setCompetitorUrl] = useState("")
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [comparison, setComparison] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)

    const getDomain = (u) => {
        try { return new URL(u.startsWith("http") ? u : `https://${u}`).hostname } catch { return u }
    }

    const hydrateResult = useCallback((pollData) => {
        const results = pollData.results
        if (results) {
            results.target.domain = getDomain(results.target.url || "")
            results.competitor.domain = getDomain(results.competitor.url || "")
            setComparison(results)
        }
    }, [])

    React.useEffect(() => {
        const lastJobId = sessionStorage.getItem("lastCompetitorJobId")
        if (!lastJobId) return

        let isMounted = true
        const restoreJob = async () => {
            try {
                const token = await getToken()
                const data = await competitorApi.getById(token, lastJobId)
                if (isMounted && data && data.status === "Completed") {
                    setTargetUrl(data.targetUrl || "")
                    setCompetitorUrl(data.competitorUrl || "")
                    hydrateResult(data)
                }
            } catch (err) {
                console.error("Failed to restore competitor job:", err)
            }
        }
        restoreJob()
        return () => { isMounted = false }
    }, [getToken, hydrateResult])

    const handleAnalyze = async () => {
        if (!targetUrl.trim() || !competitorUrl.trim()) return
        setIsAnalyzing(true)
        setComparison(null)
        setErrorMsg(null)

        try {
            const token = await getToken()
            const { competitor } = await competitorApi.start(token, targetUrl, competitorUrl)
            const jobId = competitor._id
            sessionStorage.setItem("lastCompetitorJobId", jobId)

            const cancel = pollJob(
                async () => {
                    const freshToken = await getToken()
                    return competitorApi.getById(freshToken, jobId)
                },
                (pollData) => {
                    if (pollData.status === 'Completed') {
                        cancel()
                        toast.success("Competitor Analysis Complete!")
                        hydrateResult(pollData)
                        setIsAnalyzing(false)
                    } else if (pollData.status === 'Failed') {
                        cancel()
                        toast.error("Analysis Failed: " + pollData.error)
                        setErrorMsg(pollData.error || "Failed to complete analysis.")
                        setIsAnalyzing(false)
                    }
                },
                3000
            )
        } catch (e) {
            setErrorMsg(e.message)
            setIsAnalyzing(false)
        }
    }

    return (
        <div className="flex-1 space-y-5 pt-6 animate-in fade-in duration-500">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                        <Swords className="w-5 h-5 text-primary-foreground" />
                    </div>
                    Competitor Intelligence
                </h2>
                <p className="text-muted-foreground mt-1.5 text-sm max-w-xl">
                    Compare your page against a competitor side by side. Get scores, gaps, and suggestions.
                </p>
            </div>

            {/* Input */}
            <Card className="bg-card/40 border-border/40">
                <CardContent className="pt-5 pb-4 space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <Label className="text-xs flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-primary" /> Your URL
                            </Label>
                            <Input
                                placeholder="https://yoursite.com/page"
                                value={targetUrl}
                                onChange={(e) => setTargetUrl(e.target.value)}
                                disabled={isAnalyzing}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-xs flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-destructive" /> Competitor URL
                            </Label>
                            <Input
                                placeholder="https://competitor.com/page"
                                value={competitorUrl}
                                onChange={(e) => setCompetitorUrl(e.target.value)}
                                disabled={isAnalyzing}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end pt-1">
                        <Button onClick={handleAnalyze} disabled={isAnalyzing || !targetUrl.trim() || !competitorUrl.trim()}>
                            {isAnalyzing ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analyzing...</> : <><Swords className="w-4 h-4 mr-2" /> Compare Pages</>}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Error Message */}
            {errorMsg && (
                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm text-center">
                    {errorMsg}
                </div>
            )}

            {/* Loading */}
            {isAnalyzing && (
                <div className="flex flex-col items-center justify-center py-14 space-y-3">
                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                    <p className="text-sm text-muted-foreground">Analyzing both pages...</p>
                </div>
            )}

            {/* Empty */}
            {!comparison && !isAnalyzing && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-border/50 rounded-xl bg-card/20"
                >
                    <Swords className="w-10 h-10 text-primary/40 mb-3" />
                    <h3 className="text-lg font-semibold mb-1">Ready to Compare</h3>
                    <p className="text-muted-foreground text-sm max-w-sm">Enter two URLs above for a detailed side-by-side analysis.</p>
                </motion.div>
            )}

            {/* Results */}
            {comparison && !isAnalyzing && (
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">

                    {/* Score Overview - Two compact cards */}
                    <div className="grid grid-cols-2 gap-4">
                        <Card className="bg-primary/5 border-primary/20">
                            <CardContent className="py-4 px-5 flex items-center justify-between">
                                <div className="min-w-0">
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Your Site</p>
                                    <p className="text-xs text-foreground/60 truncate">{comparison.target.domain}</p>
                                </div>
                                <div className="text-4xl font-black text-primary">{comparison.target.scores.overall}</div>
                            </CardContent>
                        </Card>
                        <Card className="bg-destructive/5 border-destructive/20">
                            <CardContent className="py-4 px-5 flex items-center justify-between">
                                <div className="min-w-0">
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Competitor</p>
                                    <p className="text-xs text-foreground/60 truncate">{comparison.competitor.domain}</p>
                                </div>
                                <div className="text-4xl font-black text-destructive">{comparison.competitor.scores.overall}</div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Score Table + Insights in Tabs */}
                    <Tabs defaultValue="scores" className="w-full">
                        <div className="flex items-center justify-between mb-1">
                            <TabsList>
                                <TabsTrigger value="scores">Score Breakdown</TabsTrigger>
                                <TabsTrigger value="insights">Insights</TabsTrigger>
                                <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                            </TabsList>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={() => {
                                    const csvData = SCORE_ROWS.map(({ key, label }) => ({
                                        metric: label,
                                        yourScore: comparison.target.scores[key],
                                        competitorScore: comparison.competitor.scores[key],
                                        gap: comparison.target.scores[key] - comparison.competitor.scores[key]
                                    }))
                                    downloadCSV("aivo_competitor_comparison.csv", csvData)
                                }}>
                                    Export CSV
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => exportCompetitorTXT(comparison, SCORE_ROWS)}>
                                    <Download className="w-3.5 h-3.5 mr-1.5" /> Download Report
                                </Button>
                            </div>
                        </div>

                        {/* Scores Tab */}
                        <TabsContent value="scores">
                            <Card className="bg-card/40 border-border/40">
                                <CardContent className="p-0">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-[180px]">Metric</TableHead>
                                                <TableHead className="text-center">You</TableHead>
                                                <TableHead className="text-center">Competitor</TableHead>
                                                <TableHead className="text-center w-[80px]">Gap</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {SCORE_ROWS.map(({ key, label }) => {
                                                const t = comparison.target.scores[key]
                                                const c = comparison.competitor.scores[key]
                                                const diff = t - c
                                                return (
                                                    <TableRow key={key}>
                                                        <TableCell className="font-medium text-sm">{label}</TableCell>
                                                        <TableCell>
                                                            <div className="flex items-center justify-center gap-2">
                                                                <Progress value={t} className="w-16 h-1.5 [&>div]:bg-primary" />
                                                                <span className="text-sm font-bold w-7 text-right">{t}</span>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex items-center justify-center gap-2">
                                                                <Progress value={c} className="w-16 h-1.5 [&>div]:bg-destructive" />
                                                                <span className="text-sm font-bold w-7 text-right">{c}</span>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            {diff > 0 ? (
                                                                <Badge variant="outline" className="text-chart-2 border-chart-2/30 bg-chart-2/10 text-xs">
                                                                    <ArrowUpRight className="w-3 h-3 mr-0.5" />+{diff}
                                                                </Badge>
                                                            ) : diff < 0 ? (
                                                                <Badge variant="outline" className="text-destructive border-destructive/30 bg-destructive/10 text-xs">
                                                                    <ArrowDownRight className="w-3 h-3 mr-0.5" />{diff}
                                                                </Badge>
                                                            ) : (
                                                                <Badge variant="outline" className="text-muted-foreground text-xs">
                                                                    <Minus className="w-3 h-3 mr-0.5" />0
                                                                </Badge>
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Insights Tab */}
                        <TabsContent value="insights">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Card className="bg-card/40 border-border/40">
                                    <CardHeader className="pb-2 pt-4 px-4">
                                        <CardTitle className="text-sm flex items-center gap-1.5 text-chart-2">
                                            <CheckCircle2 className="w-4 h-4" /> Your Strengths
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="px-4 pb-4">
                                        <ul className="space-y-1.5">
                                            {comparison.target.strengths.map((s, i) => (
                                                <li key={i} className="text-xs text-foreground/75 flex items-start gap-1.5">
                                                    <span className="text-chart-2 mt-0.5">•</span> {s}
                                                </li>
                                            ))}
                                        </ul>
                                        <Separator className="my-3" />
                                        <CardTitle className="text-sm flex items-center gap-1.5 text-destructive mb-2">
                                            <ArrowDownRight className="w-4 h-4" /> Your Weaknesses
                                        </CardTitle>
                                        <ul className="space-y-1.5">
                                            {comparison.target.weaknesses.map((s, i) => (
                                                <li key={i} className="text-xs text-foreground/75 flex items-start gap-1.5">
                                                    <span className="text-destructive mt-0.5">•</span> {s}
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>

                                <Card className="bg-card/40 border-border/40">
                                    <CardHeader className="pb-2 pt-4 px-4">
                                        <CardTitle className="text-sm flex items-center gap-1.5 text-destructive">
                                            <ArrowUpRight className="w-4 h-4" /> Competitor Strengths
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="px-4 pb-4">
                                        <ul className="space-y-1.5">
                                            {comparison.competitor.strengths.map((s, i) => (
                                                <li key={i} className="text-xs text-foreground/75 flex items-start gap-1.5">
                                                    <span className="text-destructive mt-0.5">•</span> {s}
                                                </li>
                                            ))}
                                        </ul>
                                        <Separator className="my-3" />
                                        <CardTitle className="text-sm flex items-center gap-1.5 text-chart-2 mb-2">
                                            <ArrowDownRight className="w-4 h-4" /> Competitor Weaknesses
                                        </CardTitle>
                                        <ul className="space-y-1.5">
                                            {comparison.competitor.weaknesses.map((s, i) => (
                                                <li key={i} className="text-xs text-foreground/75 flex items-start gap-1.5">
                                                    <span className="text-chart-2 mt-0.5">•</span> {s}
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        {/* Suggestions Tab */}
                        <TabsContent value="suggestions">
                            <Card className="bg-card/40 border-border/40">
                                <CardContent className="pt-4 pb-3">
                                    <div className="space-y-2.5">
                                        {comparison.suggestions.map((s, i) => {
                                            const pColor =
                                                s.priority === "High" ? "bg-destructive/10 text-destructive border-destructive/30" :
                                                    s.priority === "Medium" ? "bg-chart-5/10 text-chart-5 border-chart-5/30" :
                                                        "bg-muted text-muted-foreground border-border"
                                            return (
                                                <div key={i} className="flex items-start gap-3 p-3 bg-muted/20 border border-border/30 rounded-lg">
                                                    <Badge variant="outline" className={`text-[10px] font-bold mt-0.5 flex-shrink-0 ${pColor}`}>
                                                        {s.priority}
                                                    </Badge>
                                                    <div className="min-w-0">
                                                        <p className="text-sm font-semibold text-foreground">{s.title}</p>
                                                        <p className="text-xs text-muted-foreground mt-0.5">{s.desc}</p>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </motion.div>
            )}
        </div>
    )
}
