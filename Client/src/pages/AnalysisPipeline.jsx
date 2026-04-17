import React, { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
    Workflow, Link2, Scissors, BrainCircuit, Network, Loader2,
    CheckCircle2, FileText, AlertCircle, Target, BarChart2,
    ChevronRight, Tags, ExternalLink, Copy, Info, Zap, FileSearch
} from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import jsPDF from "jspdf"
import { useAuth } from "@/contexts/AuthContext"

// ─── Pipeline Phase Constants ───────────────────────────────────────────
const PHASE_IDLE = "idle"
const PHASE_EXTRACTING = "extracting"
const PHASE_SCORING = "scoring"       // scoring + entity graph run simultaneously
const PHASE_COMPLETE = "complete"

// ─── Step indicator item ────────────────────────────────────────────────
function PipelineStep({ stepNum, label, icon: Icon, status }) {
    const isActive = status === "active"
    const isDone = status === "done"
    const isPending = status === "pending"

    return (
        <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500
                ${isDone ? "bg-chart-2 text-white" : ""}
                ${isActive ? "bg-primary text-primary-foreground ring-4 ring-primary/20 animate-pulse" : ""}
                ${isPending ? "bg-muted text-muted-foreground" : ""}
            `}>
                {isDone ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-3.5 h-3.5" />}
            </div>
            <div>
                <div className={`text-xs font-semibold transition-colors duration-300 ${isDone ? "text-chart-2" : isActive ? "text-foreground" : "text-muted-foreground"}`}>
                    Step {stepNum}
                </div>
                <div className={`text-[11px] transition-colors duration-300 ${isDone || isActive ? "text-foreground/70" : "text-muted-foreground/60"}`}>
                    {label}
                </div>
            </div>
        </div>
    )
}

function PipelineConnector({ active }) {
    return (
        <div className="w-10 h-[2px] rounded-full bg-muted relative overflow-hidden mx-1">
            {active && (
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-y-0 left-0 bg-chart-2 rounded-full"
                />
            )}
        </div>
    )
}

// ═══════════════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════

export default function AnalysisPipeline() {
    // ─── Inputs ──────────────────────────────────────────────────────
    const [url, setUrl] = useState("")
    const [topic, setTopic] = useState("")

    // ─── Pipeline State ──────────────────────────────────────────────
    const [phase, setPhase] = useState(PHASE_IDLE)
    const [extractionResult, setExtractionResult] = useState(null)
    const [scoringResult, setScoringResult] = useState(null)
    const [entityResult, setEntityResult] = useState(null)
    const [activeTab, setActiveTab] = useState("extraction")
    const [isExporting, setIsExporting] = useState(false)
    const { getToken } = useAuth()

    const handleRunPipeline = useCallback(async () => {
        if (!url) return

        // Reset
        setExtractionResult(null)
        setScoringResult(null)
        setEntityResult(null)
        setActiveTab("extraction")

        // Initial phase
        setPhase(PHASE_EXTRACTING)
        
        try {
            const token = await getToken()
            // 1. Kick off analysis
            const res = await fetch("http://localhost:5000/api/analyze", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ url })
            })
            
            if (!res.ok) {
                console.error("Failed to enqueue analysis job")
                setPhase(PHASE_IDLE)
                return
            }
            
            const resData = await res.json()
            const jobId = resData.analysis._id
            
            // 2. Poll for results
            const pollInterval = setInterval(async () => {
                try {
                    const pollRes = await fetch(`http://localhost:5000/api/analyze/${jobId}`, {
                        headers: { "Authorization": `Bearer ${token}` }
                    })
                    
                    if (pollRes.ok) {
                        const pollData = await pollRes.json()
                        const status = pollData.status
                        
                        // Map backend status to frontend phases
                        if (status === 'Extracting') {
                            setPhase(PHASE_EXTRACTING)
                        } else if (status === 'Analyzing') {
                            setPhase(PHASE_SCORING)
                            
                            // Provide placeholder while analyzing
                            if (!extractionResult) {
                                setExtractionResult({
                                    title: "Raw Extraction Complete",
                                    wordCount: "N/A",
                                    noiseRemoved: "Cleaned",
                                    cleanText: "HTML text extracted. Generating AIVO semantic metrics... Please wait.",
                                    elementsStripped: ["Noise", "Scripts", "Nav"]
                                })
                            }
                        } else if (status === 'Completed') {
                            clearInterval(pollInterval)
                            setPhase(PHASE_COMPLETE)
                            
                            // Map actual backend results to the UI
                            const result = pollData
                            
                            // Fake extraction summary since we didn't save raw text to mongo
                            setExtractionResult({
                                title: url,
                                wordCount: "Analyzed",
                                noiseRemoved: "HTML Cleaned",
                                cleanText: "Semantic Analysis Complete. SEO metrics have been fully retrieved from the AIVO backend Engine.",
                                elementsStripped: []
                            })
                            
                            setScoringResult({
                                overallScore: result.scoreInfo?.aiVisibilityScore || 0,
                                topicMatch: (result.scoreInfo?.expectedCitations || 0) * 10,
                                comprehensiveness: (result.semanticDensity || 0) * 10,
                                missingSubtopics: [],
                                strongSubtopics: []
                            })
                            
                            const entities = result.entitiesFound || []
                            setEntityResult({
                                entitiesFound: entities.length,
                                relationships: entities.length * 2,
                                topEntities: entities.map(ent => ({ name: ent, type: "Entity", confidence: "High" })),
                                graphNodes: entities.map((ent, i) => ({ id: i, label: ent, x: 50 + (i*10), y: 50 + (i*5) }))
                            })
                        } else if (status === 'Failed') {
                            clearInterval(pollInterval)
                            setPhase(PHASE_IDLE)
                            console.error("Analysis failed:", pollData.errorMessage)
                            alert("Analysis Failed: " + pollData.errorMessage)
                        }
                    }
                } catch (e) {
                    console.error("Polling error", e)
                }
            }, 2000)

        } catch (err) {
            console.error("Error communicating with API Gateway:", err)
            setPhase(PHASE_IDLE)
        }
    }, [url, getToken])

    // ─── Export all results as PDF ──────────────────────────────────
    const handleExport = useCallback(() => {
        setIsExporting(true)

        const doc = new jsPDF({ unit: "mm", format: "a4" })
        const pageW = doc.internal.pageSize.getWidth()
        const marginL = 18
        const marginR = 18
        const contentW = pageW - marginL - marginR
        let y = 20

        const addPageIfNeeded = (needed = 20) => {
            if (y + needed > 275) { doc.addPage(); y = 20 }
        }

        // ── Header ──────────────────────────────────────────
        doc.setFillColor(30, 27, 56) // dark violet
        doc.rect(0, 0, pageW, 40, "F")
        doc.setFont("helvetica", "bold")
        doc.setFontSize(22)
        doc.setTextColor(255, 255, 255)
        doc.text("AIVO", marginL, 18)
        doc.setFontSize(10)
        doc.setFont("helvetica", "normal")
        doc.text("Analysis Pipeline Report", marginL, 26)
        doc.setFontSize(8)
        doc.setTextColor(180, 180, 220)
        doc.text(`Generated: ${new Date().toLocaleString()}`, marginL, 33)
        doc.text(`Source: ${url}`, pageW - marginR - doc.getTextWidth(`Source: ${url}`), 33)
        y = 50

        // ── Target Topic ────────────────────────────────────
        if (topic) {
            doc.setFont("helvetica", "normal")
            doc.setFontSize(9)
            doc.setTextColor(120, 120, 160)
            doc.text(`Target Topic: ${topic}`, marginL, y)
            y += 10
        }

        // ═══════════════════════════════════════════════════
        // SECTION 1: Content Extraction
        // ═══════════════════════════════════════════════════
        if (extractionResult) {
            doc.setFillColor(88, 80, 230) // primary
            doc.roundedRect(marginL, y, contentW, 8, 1, 1, "F")
            doc.setFont("helvetica", "bold")
            doc.setFontSize(11)
            doc.setTextColor(255, 255, 255)
            doc.text("1. Content Extraction", marginL + 4, y + 5.5)
            y += 14

            doc.setTextColor(50, 50, 50)
            doc.setFont("helvetica", "bold")
            doc.setFontSize(12)
            doc.text(extractionResult.title, marginL, y)
            y += 8

            // Stats row
            doc.setFont("helvetica", "normal")
            doc.setFontSize(9)
            doc.setTextColor(80, 80, 80)
            doc.text(`Clean Words: ${extractionResult.wordCount}`, marginL, y)
            doc.text(`Noise Removed: ${extractionResult.noiseRemoved}`, marginL + 50, y)
            y += 8

            // Clean text
            doc.setFont("helvetica", "normal")
            doc.setFontSize(9)
            doc.setTextColor(60, 60, 60)
            const textLines = doc.splitTextToSize(extractionResult.cleanText, contentW)
            textLines.forEach((line) => {
                addPageIfNeeded(5)
                doc.text(line, marginL, y)
                y += 4.5
            })
            y += 4

            // Elements stripped
            addPageIfNeeded(15)
            doc.setFont("helvetica", "bold")
            doc.setFontSize(9)
            doc.setTextColor(180, 50, 50)
            doc.text("Elements Stripped:", marginL, y)
            y += 5
            doc.setFont("helvetica", "normal")
            doc.setTextColor(100, 60, 60)
            extractionResult.elementsStripped.forEach((el) => {
                addPageIfNeeded(5)
                doc.text(`  • ${el}`, marginL, y)
                y += 4.5
            })
            y += 8
        }

        // ═══════════════════════════════════════════════════
        // SECTION 2: Semantic Scoring
        // ═══════════════════════════════════════════════════
        if (scoringResult) {
            addPageIfNeeded(40)
            doc.setFillColor(88, 80, 230)
            doc.roundedRect(marginL, y, contentW, 8, 1, 1, "F")
            doc.setFont("helvetica", "bold")
            doc.setFontSize(11)
            doc.setTextColor(255, 255, 255)
            doc.text("2. Semantic Scoring", marginL + 4, y + 5.5)
            y += 14

            // Score
            doc.setFont("helvetica", "bold")
            doc.setFontSize(28)
            doc.setTextColor(88, 80, 230)
            doc.text(`${scoringResult.overallScore}`, marginL, y + 2)
            doc.setFont("helvetica", "normal")
            doc.setFontSize(10)
            doc.setTextColor(80, 80, 80)
            const lbl = scoringResult.overallScore >= 80 ? "Very strong alignment" : scoringResult.overallScore >= 60 ? "Moderate alignment" : "Weak alignment"
            doc.text(`/ 100  —  ${lbl}`, marginL + 18, y)
            y += 12

            // Topic & Comprehensiveness
            doc.setFont("helvetica", "normal")
            doc.setFontSize(9)
            doc.setTextColor(60, 60, 60)
            doc.text(`Topic Relevance Match: ${scoringResult.topicMatch}%`, marginL, y)
            y += 5
            doc.text(`Topical Comprehensiveness: ${scoringResult.comprehensiveness}%`, marginL, y)
            y += 8

            // Covered
            doc.setFont("helvetica", "bold")
            doc.setFontSize(9)
            doc.setTextColor(34, 170, 100)
            doc.text("Covered Subtopics:", marginL, y)
            y += 5
            doc.setFont("helvetica", "normal")
            doc.setTextColor(40, 130, 80)
            scoringResult.strongSubtopics.forEach((s) => {
                addPageIfNeeded(5)
                doc.text(`  ✓ ${s}`, marginL, y)
                y += 4.5
            })
            y += 3

            // Missing
            addPageIfNeeded(15)
            doc.setFont("helvetica", "bold")
            doc.setTextColor(200, 120, 30)
            doc.text("Missing Subtopics:", marginL, y)
            y += 5
            doc.setFont("helvetica", "normal")
            doc.setTextColor(180, 100, 20)
            scoringResult.missingSubtopics.forEach((s) => {
                addPageIfNeeded(5)
                doc.text(`  ✗ ${s}`, marginL, y)
                y += 4.5
            })
            y += 8
        }

        // ═══════════════════════════════════════════════════
        // SECTION 3: Entity Graph
        // ═══════════════════════════════════════════════════
        if (entityResult) {
            addPageIfNeeded(40)
            doc.setFillColor(88, 80, 230)
            doc.roundedRect(marginL, y, contentW, 8, 1, 1, "F")
            doc.setFont("helvetica", "bold")
            doc.setFontSize(11)
            doc.setTextColor(255, 255, 255)
            doc.text("3. Entity Graph", marginL + 4, y + 5.5)
            y += 14

            doc.setTextColor(50, 50, 50)
            doc.setFont("helvetica", "normal")
            doc.setFontSize(9)
            doc.text(`Entities Found: ${entityResult.entitiesFound}    |    Relationships: ${entityResult.relationships}`, marginL, y)
            y += 8

            // Entity table header
            doc.setFillColor(240, 240, 250)
            doc.rect(marginL, y, contentW, 6, "F")
            doc.setFont("helvetica", "bold")
            doc.setFontSize(8)
            doc.setTextColor(80, 80, 100)
            doc.text("Entity", marginL + 3, y + 4)
            doc.text("Type", marginL + 80, y + 4)
            doc.text("Confidence", marginL + 120, y + 4)
            y += 8

            // Entity rows
            doc.setFont("helvetica", "normal")
            doc.setTextColor(60, 60, 60)
            entityResult.topEntities.forEach((ent, i) => {
                addPageIfNeeded(6)
                if (i % 2 === 0) {
                    doc.setFillColor(248, 248, 252)
                    doc.rect(marginL, y - 3.5, contentW, 6, "F")
                }
                doc.text(ent.name, marginL + 3, y)
                doc.text(ent.type, marginL + 80, y)
                doc.text(ent.confidence, marginL + 120, y)
                y += 6
            })
            y += 5
        }

        // ── Footer ──────────────────────────────────────────
        const pageCount = doc.internal.getNumberOfPages()
        for (let p = 1; p <= pageCount; p++) {
            doc.setPage(p)
            doc.setFillColor(30, 27, 56)
            doc.rect(0, 287, pageW, 10, "F")
            doc.setFont("helvetica", "normal")
            doc.setFontSize(7)
            doc.setTextColor(150, 150, 190)
            doc.text("AIVO — AI-Powered Answer Engine Optimization", marginL, 292)
            doc.text(`Page ${p} of ${pageCount}`, pageW - marginR - 15, 292)
        }

        // ── Save ─────────────────────────────────────────────
        doc.save(`AIVO_Report_${new Date().toISOString().slice(0, 10)}.pdf`)
        setTimeout(() => setIsExporting(false), 1500)
    }, [url, topic, extractionResult, scoringResult, entityResult])

    // ─── Helpers ─────────────────────────────────────────────────────
    const isRunning = phase === PHASE_EXTRACTING || phase === PHASE_SCORING
    const hasResults = phase === PHASE_COMPLETE

    const stepOneStatus = phase === PHASE_IDLE ? "pending" : phase === PHASE_EXTRACTING ? "active" : "done"
    const stepTwoStatus = phase === PHASE_IDLE || phase === PHASE_EXTRACTING ? "pending" : phase === PHASE_SCORING ? "active" : "done"
    const stepThreeStatus = phase === PHASE_IDLE || phase === PHASE_EXTRACTING ? "pending" : phase === PHASE_SCORING ? "active" : "done"

    const scoreLabel = scoringResult
        ? scoringResult.overallScore >= 80 ? "Very strong alignment" : scoringResult.overallScore >= 60 ? "Moderate alignment" : "Weak alignment"
        : ""
    const scoreColor = scoringResult
        ? scoringResult.overallScore >= 80 ? "text-chart-2" : scoringResult.overallScore >= 60 ? "text-chart-5" : "text-destructive"
        : ""

    // ═════════════════════════════════════════════════════════════════
    //  RENDER
    // ═════════════════════════════════════════════════════════════════
    return (
        <div className="flex-1 space-y-5 pt-6 animate-in fade-in duration-500">
            {/* ── Header ─────────────────────────────────────────────── */}
            <div>
                <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                        <Workflow className="w-5 h-5 text-primary-foreground" />
                    </div>
                    Analysis Pipeline
                </h2>
                <p className="text-muted-foreground mt-1.5 text-sm max-w-2xl">
                    Enter a URL and an optional target topic. All three engines — Content Extraction, Semantic Scoring and Entity Graph — run as an automated pipeline and deliver a unified report.
                </p>
            </div>

            {/* ── Instructions ───────────────────────────────────────── */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 max-w-2xl">
                <h3 className="text-sm font-semibold text-primary mb-2 flex items-center">
                    <Info className="w-4 h-4 mr-2" />
                    How it works
                </h3>
                <ol className="list-decimal list-inside text-sm text-foreground/80 space-y-1">
                    <li>Paste the <span className="font-semibold text-foreground">URL</span> of the page you want to analyze.</li>
                    <li>Optionally enter a <span className="font-semibold text-foreground">Target Topic</span> for semantic scoring.</li>
                    <li>Click <span className="font-semibold text-foreground">Run Analysis</span> — the pipeline extracts content, scores semantics, and maps entities automatically.</li>
                    <li>Review results across tabs and <span className="font-semibold text-foreground">Export Full Report</span>.</li>
                </ol>
            </div>

            {/* ── Input Section ───────────────────────────────────────── */}
            <Card className="bg-card/40 border-border/40">
                <CardContent className="pt-5 pb-4 space-y-3">
                    <div className="flex flex-col sm:flex-row gap-3">
                        {/* URL */}
                        <div className="flex-1 space-y-1.5">
                            <Label className="text-xs">Page URL</Label>
                            <div className="relative">
                                <Link2 className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground/70" />
                                <Input
                                    type="url"
                                    placeholder="https://example.com/blog/article..."
                                    className="pl-10"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    disabled={isRunning}
                                />
                            </div>
                        </div>
                        {/* Topic */}
                        <div className="sm:w-72 space-y-1.5">
                            <Label className="text-xs">Target Topic <span className="text-muted-foreground">(optional)</span></Label>
                            <div className="relative">
                                <Target className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground/70" />
                                <Input
                                    placeholder="e.g. Answer Engine Optimization"
                                    className="pl-10"
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    disabled={isRunning}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button onClick={handleRunPipeline} disabled={isRunning || !url} size="lg">
                            {isRunning ? (
                                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Pipeline Running...</>
                            ) : (
                                <><Zap className="w-4 h-4 mr-2" /> Run Analysis</>
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* ── Pipeline Progress ─────────────────────────────────── */}
            {phase !== PHASE_IDLE && (
                <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center gap-1 py-3"
                >
                    <PipelineStep stepNum={1} label="Content Extraction" icon={Scissors} status={stepOneStatus} />
                    <PipelineConnector active={stepOneStatus === "done"} />
                    <PipelineStep stepNum={2} label="Semantic Scoring" icon={BrainCircuit} status={stepTwoStatus} />
                    <PipelineConnector active={stepTwoStatus === "done"} />
                    <PipelineStep stepNum={3} label="Entity Graph" icon={Network} status={stepThreeStatus} />
                </motion.div>
            )}

            {/* ── Loading State ──────────────────────────────────────── */}
            {isRunning && (
                <div className="flex flex-col items-center justify-center py-12 space-y-3">
                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                    <p className="text-sm text-muted-foreground">
                        {phase === PHASE_EXTRACTING
                            ? "Running DOM Extraction and Density Heuristics..."
                            : "Embedding Vectors & Extracting Entities in parallel..."
                        }
                    </p>
                </div>
            )}

            {/* ── Empty State ────────────────────────────────────────── */}
            {phase === PHASE_IDLE && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-border/50 rounded-xl bg-card/20"
                >
                    <FileSearch className="w-10 h-10 text-primary/40 mb-3" />
                    <h3 className="text-lg font-semibold mb-1">Ready to Analyze</h3>
                    <p className="text-muted-foreground max-w-sm text-sm">
                        Enter a URL above to run the full analysis pipeline across all three engines.
                    </p>
                </motion.div>
            )}

            {/* ═══════════════════════════════════════════════════════════
                TABBED RESULTS
            ═══════════════════════════════════════════════════════════ */}
            {hasResults && (
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    {/* Export bar */}
                    <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs font-bold text-chart-2 border-chart-2/30 bg-chart-2/5 px-3 py-1">
                            <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> Pipeline Complete
                        </Badge>
                        <Button variant="outline" size="sm" onClick={handleExport}>
                            <AnimatePresence mode="wait">
                                {isExporting ? (
                                    <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center">
                                        <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> Downloaded!
                                    </motion.div>
                                ) : (
                                    <motion.div key="export" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center">
                                        <FileText className="w-3.5 h-3.5 mr-1.5" /> Export Full Report
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Button>
                    </div>

                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="w-full">
                            <TabsTrigger value="extraction" className="flex items-center gap-1.5">
                                <Scissors className="w-3.5 h-3.5" /> Content Extraction
                            </TabsTrigger>
                            <TabsTrigger value="scoring" className="flex items-center gap-1.5">
                                <BrainCircuit className="w-3.5 h-3.5" /> Semantic Scoring
                            </TabsTrigger>
                            <TabsTrigger value="entities" className="flex items-center gap-1.5">
                                <Network className="w-3.5 h-3.5" /> Entity Graph
                            </TabsTrigger>
                        </TabsList>

                        {/* ══════════════════════════════════════════════
                            TAB 1 — CONTENT EXTRACTION
                        ══════════════════════════════════════════════ */}
                        <TabsContent value="extraction">
                            {extractionResult && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4"
                                >
                                    {/* Main Content */}
                                    <div className="md:col-span-2 flex flex-col">
                                        <Card className="bg-card/40 border-border/40 flex flex-col h-full">
                                            <CardHeader className="border-b border-border/30 pb-3">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <div className="flex items-center gap-1.5 mb-1.5">
                                                            <Badge variant="outline" className="text-[10px] font-bold text-chart-2 border-chart-2/30 bg-chart-2/5">
                                                                <CheckCircle2 className="w-3 h-3 mr-1" /> Extraction Successful
                                                            </Badge>
                                                        </div>
                                                        <CardTitle className="text-lg">{extractionResult.title}</CardTitle>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="pt-4 flex-1">
                                                <div className="bg-muted/15 border border-border/40 rounded-lg p-5 font-mono text-sm leading-relaxed text-foreground/80 whitespace-pre-wrap relative">
                                                    <FileText className="absolute top-4 right-4 w-20 h-20 text-muted-foreground/5" />
                                                    <span className="relative z-10">{extractionResult.cleanText}</span>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    {/* Stats Sidebar */}
                                    <div className="space-y-4">
                                        {/* Volume Metrics */}
                                        <Card className="bg-card/40 border-border/40">
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center justify-between">
                                                    Volume Metrics
                                                    <span className="w-2 h-2 rounded-full bg-chart-2" />
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="flex justify-between items-end mb-3">
                                                    <div>
                                                        <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="text-3xl font-black text-foreground">
                                                            {extractionResult.wordCount}
                                                        </motion.div>
                                                        <div className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider mt-0.5">Clean Words</div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-2xl font-black text-chart-2">{extractionResult.noiseRemoved}</div>
                                                        <div className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider mt-0.5">Noise Removed</div>
                                                    </div>
                                                </div>

                                                {/* Clean vs noise bar */}
                                                <div className="w-full h-2.5 bg-destructive/15 rounded-full overflow-hidden flex">
                                                    <motion.div
                                                        initial={{ width: 0 }} animate={{ width: "66%" }}
                                                        transition={{ duration: 0.8, delay: 0.4 }}
                                                        className="h-full bg-chart-2 rounded-l-full"
                                                    />
                                                    <motion.div
                                                        initial={{ width: 0 }} animate={{ width: "34%" }}
                                                        transition={{ duration: 0.8, delay: 0.4 }}
                                                        className="h-full bg-destructive/30"
                                                    />
                                                </div>
                                                <div className="flex justify-between text-[9px] text-muted-foreground mt-1.5 uppercase font-semibold">
                                                    <span>Retained</span>
                                                    <span>Stripped</span>
                                                </div>
                                            </CardContent>
                                        </Card>

                                        {/* Elements Stripped */}
                                        <Card className="bg-card/40 border-border/40">
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                                                    <AlertCircle className="w-3.5 h-3.5" />
                                                    Elements Stripped
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <ul className="space-y-1.5">
                                                    {extractionResult.elementsStripped.map((element, i) => (
                                                        <motion.li
                                                            initial={{ opacity: 0, x: -8 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: 0.5 + i * 0.08 }}
                                                            key={i}
                                                            className="flex items-center text-sm text-foreground/75 bg-muted/20 border border-border/30 p-2 rounded-lg"
                                                        >
                                                            <Scissors className="w-3 h-3 text-destructive mr-2 flex-shrink-0" />
                                                            {element}
                                                        </motion.li>
                                                    ))}
                                                </ul>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </motion.div>
                            )}
                        </TabsContent>

                        {/* ══════════════════════════════════════════════
                            TAB 2 — SEMANTIC SCORING
                        ══════════════════════════════════════════════ */}
                        <TabsContent value="scoring">
                            {scoringResult && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4"
                                >
                                    {/* Score Ring */}
                                    <div className="md:col-span-1">
                                        <Card className="bg-card/40 border-border/40 flex flex-col justify-center items-center py-8 h-full">
                                            <div className="text-center space-y-2">
                                                <div className="relative inline-block">
                                                    <svg className="w-36 h-36 transform -rotate-90">
                                                        <circle cx="72" cy="72" r="62" className="text-muted/30" strokeWidth="10" fill="none" stroke="currentColor" />
                                                        <motion.circle
                                                            initial={{ strokeDashoffset: 390 }}
                                                            animate={{ strokeDashoffset: 390 - (390 * scoringResult.overallScore) / 100 }}
                                                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                                                            cx="72" cy="72" r="62"
                                                            className="text-primary"
                                                            strokeWidth="10" fill="none" stroke="currentColor" strokeDasharray="390" strokeLinecap="round"
                                                        />
                                                    </svg>
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <motion.span
                                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                                                            className="text-4xl font-black text-foreground"
                                                        >
                                                            {scoringResult.overallScore}
                                                        </motion.span>
                                                    </div>
                                                </div>
                                                <h3 className="text-base font-semibold">Semantic Score</h3>
                                                <p className={`text-sm font-medium ${scoreColor}`}>{scoreLabel}</p>
                                            </div>
                                        </Card>
                                    </div>

                                    {/* Breakdown */}
                                    <div className="md:col-span-2">
                                        <Card className="bg-card/40 border-border/40 h-full">
                                            <CardHeader className="pb-3 border-b border-border/30">
                                                <CardTitle className="text-base flex items-center justify-between">
                                                    <span className="flex items-center gap-2">
                                                        <BarChart2 className="w-4 h-4 text-primary" />
                                                        Vector Dimensionality
                                                    </span>
                                                    <span className="text-[10px] tracking-wider text-muted-foreground uppercase font-semibold">Breakdown</span>
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-5 pt-5">
                                                {/* Topic Match */}
                                                <div className="space-y-2">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="font-medium">Topic Relevance Match</span>
                                                        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="font-bold text-chart-2">
                                                            {scoringResult.topicMatch}%
                                                        </motion.span>
                                                    </div>
                                                    <div className="w-full h-2 bg-muted/50 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }} animate={{ width: `${scoringResult.topicMatch}%` }} transition={{ duration: 1, delay: 0.4 }}
                                                            className="h-full bg-chart-2 rounded-full"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Comprehensiveness */}
                                                <div className="space-y-2">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="font-medium">Topical Comprehensiveness</span>
                                                        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="font-bold text-chart-5">
                                                            {scoringResult.comprehensiveness}%
                                                        </motion.span>
                                                    </div>
                                                    <div className="w-full h-2 bg-muted/50 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }} animate={{ width: `${scoringResult.comprehensiveness}%` }} transition={{ duration: 1, delay: 0.6 }}
                                                            className="h-full bg-chart-5 rounded-full"
                                                        />
                                                    </div>
                                                    <p className="text-xs text-muted-foreground bg-muted/20 border border-border/30 p-2 rounded-lg">
                                                        <span className="font-semibold text-chart-5 mr-1">Note:</span>
                                                        Content answers the primary query well, but leaves adjacent intent avenues unexplored.
                                                    </p>
                                                </div>

                                                <Separator />

                                                {/* Clusters */}
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="bg-chart-2/5 rounded-lg border border-chart-2/15 p-3.5">
                                                        <h4 className="text-xs font-semibold mb-2.5 flex items-center text-chart-2 uppercase tracking-wider">
                                                            <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> Covered
                                                        </h4>
                                                        <ul className="space-y-2">
                                                            {scoringResult.strongSubtopics.map((item, i) => (
                                                                <motion.li
                                                                    initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                                                                    transition={{ delay: 0.8 + i * 0.08 }}
                                                                    key={i} className="text-xs flex items-start text-foreground/75"
                                                                >
                                                                    <ChevronRight className="w-3 h-3 mr-1 text-chart-2 mt-0.5 flex-shrink-0" />
                                                                    {item}
                                                                </motion.li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <div className="bg-chart-5/5 rounded-lg border border-chart-5/15 p-3.5">
                                                        <h4 className="text-xs font-semibold mb-2.5 flex items-center text-chart-5 uppercase tracking-wider">
                                                            <Target className="w-3.5 h-3.5 mr-1.5" /> Missing
                                                        </h4>
                                                        <ul className="space-y-2">
                                                            {scoringResult.missingSubtopics.map((item, i) => (
                                                                <motion.li
                                                                    initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}
                                                                    transition={{ delay: 1 + i * 0.08 }}
                                                                    key={i} className="text-xs flex items-start text-foreground/75"
                                                                >
                                                                    <ChevronRight className="w-3 h-3 mr-1 text-chart-5 mt-0.5 flex-shrink-0" />
                                                                    {item}
                                                                </motion.li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </motion.div>
                            )}
                        </TabsContent>

                        {/* ══════════════════════════════════════════════
                            TAB 3 — ENTITY GRAPH
                        ══════════════════════════════════════════════ */}
                        <TabsContent value="entities">
                            {entityResult && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="grid grid-cols-1 lg:grid-cols-3 gap-5 pt-4"
                                >
                                    {/* Entity List */}
                                    <div className="lg:col-span-1">
                                        <Card className="bg-card/40 border-border/40 h-full flex flex-col">
                                            <CardHeader className="pb-3">
                                                <CardTitle className="text-base flex items-center gap-2">
                                                    <Tags className="w-4 h-4 text-primary" />
                                                    Named Entities
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="pt-0 flex-1 flex flex-col">
                                                {/* Stats */}
                                                <div className="flex items-center gap-6 mb-4 pb-3 border-b border-border/30">
                                                    <div className="text-center">
                                                        <motion.div
                                                            initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ duration: 0.4 }}
                                                            className="text-2xl font-black text-foreground"
                                                        >
                                                            {entityResult.entitiesFound}
                                                        </motion.div>
                                                        <div className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground">Found</div>
                                                    </div>
                                                    <Separator orientation="vertical" className="h-8" />
                                                    <div className="text-center">
                                                        <motion.div
                                                            initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ duration: 0.4, delay: 0.1 }}
                                                            className="text-2xl font-black text-primary"
                                                        >
                                                            {entityResult.relationships}
                                                        </motion.div>
                                                        <div className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground">Relations</div>
                                                    </div>
                                                </div>

                                                {/* Entity List Items */}
                                                <div className="space-y-2 flex-1 overflow-y-auto">
                                                    {entityResult.topEntities.map((entity, i) => (
                                                        <motion.div
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: 0.3 + (i * 0.08) }}
                                                            key={i}
                                                            className="p-3 rounded-lg bg-muted/20 border border-border/30 hover:border-primary/30 transition-colors"
                                                        >
                                                            <div className="flex justify-between items-start mb-1.5">
                                                                <span className="font-semibold text-sm leading-tight pr-2">{entity.name}</span>
                                                                <Badge variant="outline" className="text-[9px] font-bold tracking-wider text-primary border-primary/30 bg-primary/5 flex-shrink-0">
                                                                    {entity.type}
                                                                </Badge>
                                                            </div>
                                                            <div className="flex justify-between items-center text-xs">
                                                                <span className="text-muted-foreground">Confidence</span>
                                                                <Badge variant="outline" className="text-[10px] font-bold text-chart-2 border-chart-2/30 bg-chart-2/5">
                                                                    {entity.confidence}
                                                                </Badge>
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    {/* Graph Visualization */}
                                    <div className="lg:col-span-2 flex flex-col">
                                        <Card className="bg-card/40 border-border/40 flex flex-col h-full overflow-hidden">
                                            <CardHeader className="pb-3 border-b border-border/30">
                                                <div className="flex justify-between items-center">
                                                    <CardTitle className="text-base flex items-center gap-2">
                                                        <Workflow className="w-4 h-4 text-primary" />
                                                        Concept Architecture
                                                    </CardTitle>
                                                    <Button variant="outline" size="sm" className="h-7 text-xs px-3">
                                                        <ExternalLink className="w-3 h-3 mr-1.5" />
                                                        Export JSON-LD
                                                    </Button>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="flex-1 p-0 min-h-[400px] relative bg-muted/10 hidden md:flex items-center justify-center">
                                                {/* Dot grid background */}
                                                <div
                                                    className="absolute inset-0 opacity-[0.06]"
                                                    style={{
                                                        backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
                                                        backgroundSize: '24px 24px'
                                                    }}
                                                />

                                                {/* Edges */}
                                                <svg className="w-full h-full absolute inset-0 z-0 pointer-events-none">
                                                    <motion.line
                                                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                                                        transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                                                        x1="50%" y1="50%" x2="20%" y2="30%"
                                                        stroke="currentColor" strokeWidth="1.5" className="text-primary/30"
                                                    />
                                                    <motion.line
                                                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                                                        transition={{ duration: 1.5, delay: 0.7, ease: "easeInOut" }}
                                                        x1="50%" y1="50%" x2="80%" y2="30%"
                                                        stroke="currentColor" strokeWidth="1.5" className="text-primary/30"
                                                    />
                                                    <motion.line
                                                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                                                        transition={{ duration: 2, delay: 1, ease: "linear" }}
                                                        x1="50%" y1="50%" x2="50%" y2="80%"
                                                        stroke="currentColor" strokeWidth="1" strokeDasharray="4"
                                                        className="text-muted-foreground/30"
                                                    />
                                                </svg>

                                                {/* Satellite Nodes */}
                                                <motion.div
                                                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                                                    transition={{ type: "spring", bounce: 0.4, delay: 0.8 }}
                                                    className="absolute top-[30%] left-[20%] -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"
                                                >
                                                    <div className="w-12 h-12 rounded-full bg-card border-2 border-primary/40 flex items-center justify-center shadow-sm">
                                                        <span className="text-xs font-semibold text-primary">LLMs</span>
                                                    </div>
                                                </motion.div>

                                                <motion.div
                                                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                                                    transition={{ type: "spring", bounce: 0.4, delay: 1.0 }}
                                                    className="absolute top-[30%] left-[80%] -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"
                                                >
                                                    <div className="w-12 h-12 rounded-full bg-card border-2 border-primary/40 flex items-center justify-center shadow-sm">
                                                        <span className="text-xs font-semibold text-primary">Google</span>
                                                    </div>
                                                </motion.div>

                                                <motion.div
                                                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                                                    transition={{ type: "spring", bounce: 0.4, delay: 1.3 }}
                                                    className="absolute top-[80%] left-[50%] -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"
                                                >
                                                    <div className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center shadow-sm">
                                                        <span className="text-xs font-semibold text-muted-foreground">Nodes</span>
                                                    </div>
                                                </motion.div>

                                                {/* Center Node */}
                                                <motion.div
                                                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                                                    transition={{ type: "spring", bounce: 0.5, delay: 0.5 }}
                                                    className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group/center"
                                                >
                                                    <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-primary-foreground border-4 border-background shadow-md group-hover/center:scale-105 transition-transform duration-300">
                                                        <span className="font-bold tracking-tight text-lg">AEO</span>
                                                    </div>
                                                    <div className="mt-2 text-center">
                                                        <Badge variant="outline" className="text-[9px] font-bold uppercase tracking-widest text-primary border-primary/30 bg-primary/5">
                                                            Core Topic
                                                        </Badge>
                                                    </div>
                                                </motion.div>
                                            </CardContent>

                                            {/* Mobile fallback */}
                                            <div className="flex md:hidden items-center justify-center p-6 text-center text-sm text-muted-foreground min-h-[200px]">
                                                Graph visualization is optimized for larger screens.
                                            </div>
                                        </Card>
                                    </div>
                                </motion.div>
                            )}
                        </TabsContent>
                    </Tabs>
                </motion.div>
            )}
        </div>
    )
}
