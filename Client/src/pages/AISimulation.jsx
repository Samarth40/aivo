import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Bot, Loader2, Sparkles, AlertTriangle, ShieldCheck,
    CheckCircle2, Copy, Globe, FlaskConical, Zap, Brain,
    BarChart3, ArrowRight, Trophy, Target,
    FileText, Link2
} from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import jsPDF from "jspdf"
import { useAuth } from "@/contexts/AuthContext"

// --- Brand SVG Icons --------------------------------------------------------
const OpenAIIcon = ({ className = "w-4 h-4" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.998 5.998 0 0 0-3.998 2.9 6.042 6.042 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" fill="currentColor" />
    </svg>
)

const GeminiIcon = ({ className = "w-4 h-4" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M12 0C12 6.627 6.627 12 0 12c6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12z" fill="currentColor" />
    </svg>
)

const PerplexityIcon = ({ className = "w-4 h-4" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M12.16 1L6 7.14V12.28L1 17.12V22.5H6.42L12.16 16.78L17.9 22.5H23V17.12L18 12.28V7.14L12.16 1ZM12.16 3.82L16 7.64V11.46L12.16 15.28L8 11.46V7.64L12.16 3.82ZM3 18.52L6.72 14.82L8 16.1V20.5H3V18.52ZM21 20.5H16V16.1L17.28 14.82L21 18.52V20.5Z" fill="currentColor" />
    </svg>
)

const ClaudeIcon = ({ className = "w-4 h-4" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M14.478 3.645c-.27-.824-1.286-.824-1.556 0l-2.024 6.186a.82.82 0 0 1-.52.52L4.193 12.375c-.824.27-.824 1.286 0 1.556l6.185 2.024a.82.82 0 0 1 .52.52l2.024 6.186c.27.824 1.286.824 1.556 0l2.024-6.186a.82.82 0 0 1 .52-.52l6.186-2.024c.824-.27.824-1.286 0-1.556l-6.186-2.024a.82.82 0 0 1-.52-.52L14.478 3.645z" fill="currentColor" />
    </svg>
)

const GrokIcon = ({ className = "w-4 h-4" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor" />
    </svg>
)

const GoogleIcon = ({ className = "w-4 h-4" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.97 10.97 0 0 0 1 12c0 1.77.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
)

// --- Model Definitions (using theme-consistent solid colors) ---
const AI_MODELS = [
    {
        id: "chatgpt",
        name: "ChatGPT",
        version: "GPT-5.3",
        icon: <OpenAIIcon />,
        accentClass: "bg-chart-2",        // teal from chart-2
        textClass: "text-chart-2",
        bgLightClass: "bg-chart-2/10",
        borderClass: "border-chart-2/30",
        ringClass: "ring-chart-2/30",
    },
    {
        id: "gemini",
        name: "Gemini 3",
        version: "Pro",
        icon: <GeminiIcon />,
        accentClass: "bg-primary",         // primary (indigo/violet)
        textClass: "text-primary",
        bgLightClass: "bg-primary/10",
        borderClass: "border-primary/30",
        ringClass: "ring-primary/30",
    },
    {
        id: "perplexity",
        name: "Perplexity",
        version: "Deep Research",
        icon: <PerplexityIcon />,
        accentClass: "bg-chart-3",         // dark teal from chart-3
        textClass: "text-chart-3",
        bgLightClass: "bg-chart-3/10",
        borderClass: "border-chart-3/30",
        ringClass: "ring-chart-3/30",
    },
    {
        id: "claude",
        name: "Claude",
        version: "4.5 Sonnet",
        icon: <ClaudeIcon />,
        accentClass: "bg-chart-1",         // orange from chart-1
        textClass: "text-chart-1",
        bgLightClass: "bg-chart-1/10",
        borderClass: "border-chart-1/30",
        ringClass: "ring-chart-1/30",
    },
    {
        id: "grok",
        name: "Grok",
        version: "4.1",
        icon: <GrokIcon />,
        accentClass: "bg-muted-foreground", // neutral gray
        textClass: "text-muted-foreground",
        bgLightClass: "bg-muted/50",
        borderClass: "border-muted-foreground/30",
        ringClass: "ring-muted-foreground/30",
    },
    {
        id: "google-aio",
        name: "Google AI Overview",
        version: "SGE",
        icon: <GoogleIcon />,
        accentClass: "bg-chart-4",         // gold from chart-4
        textClass: "text-chart-4",
        bgLightClass: "bg-chart-4/10",
        borderClass: "border-chart-4/30",
        ringClass: "ring-chart-4/30",
    },
]

// --- Simulated Results Per Model ---
const SIMULATED_RESULTS = {
    chatgpt: {
        visibilityScore: 74,
        citationLikelihood: "High",
        simulatedResponse: "According to the analyzed content, Answer Engine Optimization focuses on structuring content for AI extraction. The page demonstrates strong semantic density with well-organized H2 headers and factual entity chains that align with GPT's ingestion patterns.",
        keySignals: [
            "High semantic density detected (1,400+ tokens)",
            "Well-structured H2 hierarchy for chunk extraction",
            "Low promotional language ratio (8%)",
            "Schema.org markup validated",
        ],
    },
    gemini: {
        visibilityScore: 81,
        citationLikelihood: "High",
        simulatedResponse: "Gemini's multimodal analysis identifies this page as a strong candidate for AI Overview inclusion. The content's factual density and structured data align well with Google's Knowledge Graph integration, making it likely to appear in AI-generated search snippets.",
        keySignals: [
            "Direct Knowledge Graph entity matches found",
            "Content aligns with EEAT signals",
            "Structured FAQ data detected",
            "Mobile-optimized rendering confirmed",
            "Page speed within threshold (LCP < 2.5s)",
        ],
    },
    perplexity: {
        visibilityScore: 88,
        citationLikelihood: "Very High",
        simulatedResponse: "Perplexity Deep Research identifies this content as highly citable. The article provides verifiable claims with implicit source chains, dense factual paragraphs ideal for citation extraction, and minimal noise after DOM stripping.",
        keySignals: [
            "Highest citation-density score among tested models",
            "Verifiable claim chains detected (12 factual assertions)",
            "Cross-reference validation: 9/12 claims verified",
            "Clean DOM structure — minimal extraction noise",
        ],
    },
    claude: {
        visibilityScore: 72,
        citationLikelihood: "Medium",
        simulatedResponse: "Claude's analysis shows moderate suitability for AI citation. While the content demonstrates expertise, some sections use implicit assumptions rather than explicit factual statements, which may reduce extraction confidence in safety-first evaluation.",
        keySignals: [
            "Expertise signals strong, but authority signals moderate",
            "3 sections flagged for implicit rather than explicit claims",
            "Readability score: Grade 11 (could be simplified)",
            "No harmful or misleading content detected",
        ],
    },
    grok: {
        visibilityScore: 65,
        citationLikelihood: "Medium",
        simulatedResponse: "Real-time analysis via X/web data correlation shows this content is being discussed in relevant communities. Grok identifies topical authority but notes the content could benefit from more conversational formatting for social-first discovery.",
        keySignals: [
            "Topic trending in relevant X communities",
            "Content referenced in 3 recent X threads",
            "Conversational tone score: 45% (below optimal)",
            "Real-time relevance: High (topic actively discussed)",
        ],
    },
    "google-aio": {
        visibilityScore: 78,
        citationLikelihood: "High",
        simulatedResponse: "This page has a strong probability of triggering an AI Overview snippet. The combination of structured headers, concise definitions, and bulleted actionable items matches the extraction patterns observed in SGE-generated summaries for similar queries.",
        keySignals: [
            "Matches 4/5 AI Overview trigger patterns",
            "Featured Snippet candidate (definition + list format)",
            "Domain authority within top-20 for target query cluster",
            "Content freshness signal: Updated within 30 days",
        ],
    },
}

// --- Component ---
export default function AISimulation() {
    const [url, setUrl] = useState("")
    const [content, setContent] = useState("")
    const [inputMode, setInputMode] = useState("url")
    const [selectedModels, setSelectedModels] = useState(["chatgpt", "gemini", "perplexity"])
    const [isSimulating, setIsSimulating] = useState(false)
    const [results, setResults] = useState(null)
    const [isExporting, setIsExporting] = useState(false)
    const { getToken } = useAuth()

    const toggleModel = (modelId) => {
        setSelectedModels((prev) =>
            prev.includes(modelId)
                ? prev.filter((id) => id !== modelId)
                : [...prev, modelId]
        )
    }

    const handleSimulate = async () => {
        const hasInput = inputMode === "url" ? url : content
        if (!hasInput || selectedModels.length === 0) return
        setIsSimulating(true)
        setResults(null)

        try {
            const token = await getToken()
            const payload = {
                selectedModels,
                ...(inputMode === "url" ? { url } : { content })
            }

            const res = await fetch("http://localhost:5000/api/simulate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            })

            if (!res.ok) {
                console.error("Failed to enqueue simulation job")
                setIsSimulating(false)
                return
            }

            const resData = await res.json()
            const jobId = resData.simulation._id

            const pollInterval = setInterval(async () => {
                try {
                    const freshToken = await getToken()  // fresh token every poll
                    const pollRes = await fetch(`http://localhost:5000/api/simulate/${jobId}`, {
                        headers: { "Authorization": `Bearer ${freshToken}` }
                    })
                    
                    if (pollRes.ok) {
                        const pollData = await pollRes.json()
                        if (pollData.status === 'Completed') {
                            clearInterval(pollInterval)
                            setResults(pollData.results)
                            setIsSimulating(false)
                        } else if (pollData.status === 'Failed') {
                            clearInterval(pollInterval)
                            console.error("Simulation failed:", pollData.error)
                            setIsSimulating(false)
                        }
                    }
                } catch (err) {
                    console.error("Polling error", err)
                    clearInterval(pollInterval)
                    setIsSimulating(false)
                }
            }, 3000)

        } catch (err) {
            console.error("Simulation API error", err)
            setIsSimulating(false)
        }
    }

    const handleExport = () => {
        if (!results) return
        setIsExporting(true)

        const doc = new jsPDF({ unit: "mm", format: "a4" })
        const pageW = doc.internal.pageSize.getWidth()
        const mL = 18, mR = 18
        const cW = pageW - mL - mR
        let y = 20

        const checkPage = (need = 20) => { if (y + need > 275) { doc.addPage(); y = 20 } }

        // ── Header ──────────────────────────────────────
        doc.setFillColor(30, 27, 56)
        doc.rect(0, 0, pageW, 38, "F")
        doc.setFont("helvetica", "bold")
        doc.setFontSize(22)
        doc.setTextColor(255, 255, 255)
        doc.text("AIVO", mL, 17)
        doc.setFontSize(10)
        doc.setFont("helvetica", "normal")
        doc.text("AI Simulation Report", mL, 25)
        doc.setFontSize(8)
        doc.setTextColor(180, 180, 220)
        doc.text(`Generated: ${new Date().toLocaleString()}`, mL, 32)
        const srcText = inputMode === "url" ? `Source: ${url}` : "Source: Pasted Content"
        doc.text(srcText, pageW - mR - doc.getTextWidth(srcText), 32)
        y = 48

        // ── Per-model sections ──────────────────────────
        const entries = Object.entries(results)
        entries.forEach(([modelId, result], idx) => {
            const model = AI_MODELS.find(m => m.id === modelId)
            if (!model) return

            checkPage(60)

            // Section header bar
            doc.setFillColor(88, 80, 230)
            doc.roundedRect(mL, y, cW, 8, 1, 1, "F")
            doc.setFont("helvetica", "bold")
            doc.setFontSize(11)
            doc.setTextColor(255, 255, 255)
            doc.text(`${idx + 1}. ${model.name} (${model.version})`, mL + 4, y + 5.5)
            y += 13

            // Score + Citation row
            doc.setFont("helvetica", "bold")
            doc.setFontSize(22)
            const sc = result.visibilityScore
            if (sc >= 80) doc.setTextColor(34, 170, 100)
            else if (sc >= 60) doc.setTextColor(200, 150, 30)
            else doc.setTextColor(200, 50, 50)
            doc.text(`${sc}`, mL, y + 2)

            doc.setFont("helvetica", "normal")
            doc.setFontSize(9)
            doc.setTextColor(80, 80, 80)
            doc.text(`/ 100   |   Citation Likelihood: ${result.citationLikelihood}`, mL + 16, y)
            y += 10

            // Simulated Response
            doc.setFont("helvetica", "bold")
            doc.setFontSize(8)
            doc.setTextColor(100, 100, 120)
            doc.text("SIMULATED AI RESPONSE", mL, y)
            y += 5
            doc.setFont("helvetica", "normal")
            doc.setFontSize(9)
            doc.setTextColor(60, 60, 60)
            const respLines = doc.splitTextToSize(result.simulatedResponse, cW)
            respLines.forEach(line => {
                checkPage(5)
                doc.text(line, mL, y)
                y += 4.5
            })
            y += 4

            // Key Signals
            checkPage(15)
            doc.setFont("helvetica", "bold")
            doc.setFontSize(8)
            doc.setTextColor(100, 100, 120)
            doc.text("KEY SIGNALS", mL, y)
            y += 5
            doc.setFont("helvetica", "normal")
            doc.setFontSize(9)
            doc.setTextColor(60, 60, 60)
            result.keySignals.forEach(sig => {
                checkPage(5)
                doc.text(`  \u2022 ${sig}`, mL, y)
                y += 4.5
            })
            y += 8
        })

        // ── Comparison Summary ──────────────────────────
        const scores = entries.map(([, r]) => r.visibilityScore)
        const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
        const bestEntry = entries.reduce((best, curr) => curr[1].visibilityScore > best[1].visibilityScore ? curr : best)
        const bestModel = AI_MODELS.find(m => m.id === bestEntry[0])

        checkPage(30)
        doc.setFillColor(88, 80, 230)
        doc.roundedRect(mL, y, cW, 8, 1, 1, "F")
        doc.setFont("helvetica", "bold")
        doc.setFontSize(11)
        doc.setTextColor(255, 255, 255)
        doc.text("Comparison Summary", mL + 4, y + 5.5)
        y += 14

        doc.setFont("helvetica", "normal")
        doc.setFontSize(9)
        doc.setTextColor(60, 60, 60)
        doc.text(`Best Performer: ${bestModel?.name} (${bestEntry[1].visibilityScore}%)`, mL, y)
        y += 5
        doc.text(`Average Score: ${avg}%`, mL, y)
        y += 5
        doc.text(`Models Tested: ${entries.length}`, mL, y)
        y += 8

        doc.setFont("helvetica", "bold")
        doc.setFontSize(8)
        doc.setTextColor(100, 100, 120)
        doc.text("TOP RECOMMENDATIONS", mL, y)
        y += 5
        doc.setFont("helvetica", "normal")
        doc.setFontSize(9)
        doc.setTextColor(60, 60, 60)
            ;["Add concise Q&A-format headers", "Strengthen explicit factual claims", "Reduce promotional language below 5%"].forEach(r => {
                checkPage(5)
                doc.text(`  \u2022 ${r}`, mL, y)
                y += 4.5
            })

        // ── Footer ──────────────────────────────────────
        const pages = doc.internal.getNumberOfPages()
        for (let p = 1; p <= pages; p++) {
            doc.setPage(p)
            doc.setFillColor(30, 27, 56)
            doc.rect(0, 287, pageW, 10, "F")
            doc.setFont("helvetica", "normal")
            doc.setFontSize(7)
            doc.setTextColor(150, 150, 190)
            doc.text("AIVO \u2014 AI Simulation Playground", mL, 292)
            doc.text(`Page ${p} of ${pages}`, pageW - mR - 15, 292)
        }

        doc.save(`AIVO_Simulation_${new Date().toISOString().slice(0, 10)}.pdf`)
        setTimeout(() => setIsExporting(false), 1500)
    }

    const inputValue = inputMode === "url" ? url.trim() : content.trim()

    // Compute summary
    const summary = results ? (() => {
        const entries = Object.entries(results)
        const scores = entries.map(([, r]) => r.visibilityScore)
        const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
        const bestEntry = entries.reduce((best, curr) =>
            curr[1].visibilityScore > best[1].visibilityScore ? curr : best
        )
        const bestModel = AI_MODELS.find((m) => m.id === bestEntry[0])
        return { avg, bestModel, bestScore: bestEntry[1].visibilityScore }
    })() : null

    return (
        <div className="flex-1 space-y-6 pt-6 animate-in fade-in duration-500">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-sm">
                        <FlaskConical className="w-5 h-5 text-primary-foreground" />
                    </div>
                    AI Simulation Playground
                </h2>
                <p className="text-muted-foreground mt-2 max-w-2xl">
                    Test how different AI models interpret, extract, and cite your content. Select models, provide a URL or paste content, and compare results side by side.
                </p>
            </div>

            {/* Model Selector */}
            <Card className="bg-card/40 border-border/40 shadow-sm">
                <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                        <Brain className="w-4 h-4" />
                        Select AI Models to Test
                    </CardTitle>
                    <CardDescription className="text-xs">
                        Choose which models to simulate. Each model has different extraction patterns and citation preferences.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-3">
                        {AI_MODELS.map((model) => {
                            const isSelected = selectedModels.includes(model.id)
                            return (
                                <button
                                    key={model.id}
                                    onClick={() => toggleModel(model.id)}
                                    className={`group relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl border-2 transition-all duration-300 cursor-pointer select-none ${isSelected
                                        ? `${model.borderClass} ${model.bgLightClass} ring-2 ${model.ringClass}`
                                        : "border-border/50 bg-background/50 hover:border-border hover:bg-muted/30"
                                        }`}
                                >
                                    <span className="text-lg">{model.icon}</span>
                                    <div className="text-left">
                                        <div className={`text-sm font-semibold ${isSelected ? model.textClass : "text-foreground/80"}`}>
                                            {model.name}
                                        </div>
                                        <div className="text-[10px] text-muted-foreground font-medium">{model.version}</div>
                                    </div>
                                    {isSelected && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className={`absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full ${model.accentClass} flex items-center justify-center shadow-sm`}
                                        >
                                            <CheckCircle2 className="w-3 h-3 text-white" />
                                        </motion.div>
                                    )}
                                </button>
                            )
                        })}
                    </div>
                    {selectedModels.length === 0 && (
                        <p className="text-xs text-destructive mt-3 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" /> Select at least one model to run the simulation.
                        </p>
                    )}
                </CardContent>
            </Card>

            {/* Input Section */}
            <Card className="bg-card/40 border-border/40 shadow-sm">
                <CardContent className="pt-6 space-y-4">
                    {/* Toggle URL / Content */}
                    <div className="flex items-center gap-2 mb-2">
                        <button
                            onClick={() => setInputMode("url")}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${inputMode === "url"
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                }`}
                        >
                            <Link2 className="w-3.5 h-3.5" />
                            URL
                        </button>
                        <button
                            onClick={() => setInputMode("content")}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${inputMode === "content"
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                }`}
                        >
                            <FileText className="w-3.5 h-3.5" />
                            Paste Content
                        </button>
                    </div>

                    {inputMode === "url" ? (
                        <div className="relative">
                            <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground/70" />
                            <input
                                type="url"
                                placeholder="https://example.com/blog/article..."
                                className="w-full bg-background/50 border border-border/50 rounded-lg py-2.5 text-sm pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                disabled={isSimulating}
                            />
                        </div>
                    ) : (
                        <textarea
                            placeholder="Paste your content here to test how AI models would interpret it..."
                            className="w-full bg-background/50 border border-border/50 rounded-lg py-3 px-4 text-sm min-h-[140px] focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-y"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            disabled={isSimulating}
                        />
                    )}

                    <div className="flex items-center justify-between pt-1">
                        <p className="text-xs text-muted-foreground">
                            {selectedModels.length} model{selectedModels.length !== 1 ? "s" : ""} selected
                        </p>
                        <Button
                            onClick={handleSimulate}
                            disabled={isSimulating || !inputValue || selectedModels.length === 0}
                            className="px-6"
                            size="lg"
                        >
                            {isSimulating ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Simulating {selectedModels.length} Models...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-4 h-4 mr-2" />
                                    Run Simulation
                                </>
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Loading State */}
            {isSimulating && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-16"
                >
                    <div className="flex flex-col items-center justify-center space-y-6">
                        <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                            <Loader2 className="w-10 h-10 text-primary animate-spin" />
                        </div>
                        <div className="text-center space-y-2">
                            <p className="text-lg font-semibold text-foreground">Running Multi-Model Simulation</p>
                            <p className="text-sm text-muted-foreground">Analyzing content across {selectedModels.length} AI models simultaneously...</p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-3">
                            {selectedModels.map((id, i) => {
                                const model = AI_MODELS.find((m) => m.id === id)
                                return (
                                    <motion.div
                                        key={id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.15 }}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${model.bgLightClass} ${model.borderClass} border text-xs font-medium ${model.textClass}`}
                                    >
                                        <span>{model.icon}</span>
                                        {model.name}
                                        <Loader2 className="w-3 h-3 animate-spin ml-1" />
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Empty State */}
            {!results && !isSimulating && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-border/50 rounded-xl bg-card/20"
                >
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 border border-primary/20">
                        <FlaskConical className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Ready for Multi-Model Testing</h3>
                    <p className="text-muted-foreground max-w-md text-sm">
                        Select your AI models above, enter a URL or paste content, and run the simulation to see how each model would interpret and cite your content.
                    </p>
                </motion.div>
            )}

            {/* Results Grid */}
            {results && !isSimulating && (
                <div className="space-y-6">
                    {/* Export bar */}
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-primary" />
                            Simulation Results
                            <Badge variant="secondary" className="ml-2 font-mono text-xs">
                                {Object.keys(results).length} models
                            </Badge>
                        </h3>
                        <Button size="sm" variant="outline" onClick={handleExport}>
                            <AnimatePresence mode="wait">
                                {isExporting ? (
                                    <motion.div key="done" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center">
                                        <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> Downloaded!
                                    </motion.div>
                                ) : (
                                    <motion.div key="export" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center">
                                        <FileText className="w-3.5 h-3.5 mr-1.5" /> Export PDF
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Button>
                    </div>

                    {/* Model Result Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(results).map(([modelId, result], index) => {
                            const model = AI_MODELS.find((m) => m.id === modelId)
                            if (!model) return null

                            const scoreColor =
                                result.visibilityScore >= 80 ? "text-chart-2" :
                                    result.visibilityScore >= 60 ? "text-chart-5" :
                                        "text-destructive"

                            const scoreBg =
                                result.visibilityScore >= 80 ? "bg-chart-2/8" :
                                    result.visibilityScore >= 60 ? "bg-chart-5/8" :
                                        "bg-destructive/8"

                            const likelihoodDot =
                                result.citationLikelihood === "Very High" ? "bg-chart-2" :
                                    result.citationLikelihood === "High" ? "bg-chart-2/70" :
                                        result.citationLikelihood === "Medium" ? "bg-chart-5" :
                                            "bg-destructive"

                            return (
                                <motion.div
                                    key={modelId}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.4 }}
                                >
                                    <Card className="h-full bg-card/30 border-border/30 hover:border-border/60 transition-all duration-300">
                                        <CardContent className="p-5 space-y-4">
                                            {/* Model header row */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-8 h-8 rounded-lg ${model.bgLightClass} flex items-center justify-center text-sm`}>
                                                        {model.icon}
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-semibold leading-none">{model.name}</h4>
                                                        <span className="text-[11px] text-muted-foreground">{model.version}</span>
                                                    </div>
                                                </div>
                                                <motion.div
                                                    initial={{ scale: 0.5, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    transition={{ delay: index * 0.1 + 0.25, type: "spring", bounce: 0.4 }}
                                                    className={`${scoreBg} rounded-lg px-3 py-1.5 text-center`}
                                                >
                                                    <div className={`text-2xl font-black leading-none ${scoreColor}`}>{result.visibilityScore}</div>
                                                    <div className="text-[9px] text-muted-foreground uppercase tracking-wider font-semibold mt-0.5">score</div>
                                                </motion.div>
                                            </div>

                                            {/* Citation likelihood */}
                                            <div className="flex items-center gap-2">
                                                <span className={`w-1.5 h-1.5 rounded-full ${likelihoodDot}`} />
                                                <span className="text-xs text-muted-foreground">Citation:</span>
                                                <span className="text-xs font-medium">{result.citationLikelihood}</span>
                                            </div>

                                            {/* Simulated AI Response */}
                                            <div className="rounded-lg bg-muted/20 p-3.5">
                                                <div className="flex items-center gap-1.5 mb-2">
                                                    <Bot className="w-3 h-3 text-muted-foreground" />
                                                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">AI Response</span>
                                                </div>
                                                <p className="text-[13px] text-foreground/75 leading-relaxed line-clamp-3">
                                                    {result.simulatedResponse}
                                                </p>
                                            </div>

                                            {/* Key Signals */}
                                            <div>
                                                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Signals</span>
                                                <ul className="mt-1.5 space-y-1">
                                                    {result.keySignals.map((signal, i) => (
                                                        <motion.li
                                                            initial={{ opacity: 0, x: -6 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: index * 0.1 + 0.35 + i * 0.06 }}
                                                            key={i}
                                                            className="flex items-start gap-2 text-xs text-foreground/65"
                                                        >
                                                            <span className={`w-1 h-1 rounded-full ${model.accentClass} mt-1.5 flex-shrink-0`} />
                                                            {signal}
                                                        </motion.li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            )
                        })}
                    </div>

                    {/* Comparison Summary */}
                    {summary && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                        >
                            <Card className="bg-card/30 border-border/30">
                                <CardContent className="p-5">
                                    <h4 className="text-sm font-semibold flex items-center gap-2 mb-4">
                                        <Trophy className="w-4 h-4 text-chart-4" />
                                        Comparison Summary
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        {/* Best Performer */}
                                        <div className="rounded-lg bg-muted/20 p-4 text-center">
                                            <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold mb-2.5">Best Performer</div>
                                            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${summary.bestModel.bgLightClass} text-sm font-semibold`}>
                                                <span>{summary.bestModel.icon}</span>
                                                <span className={summary.bestModel.textClass}>{summary.bestModel.name}</span>
                                            </div>
                                            <div className="mt-2 text-xl font-black text-chart-2">{summary.bestScore}%</div>
                                        </div>

                                        {/* Average Score */}
                                        <div className="rounded-lg bg-muted/20 p-4 text-center">
                                            <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold mb-2.5">Average Score</div>
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.8, type: "spring", bounce: 0.4 }}
                                                className="text-4xl font-black text-primary"
                                            >
                                                {summary.avg}%
                                            </motion.div>
                                            <div className="text-[11px] text-muted-foreground mt-1">across all tested models</div>
                                        </div>

                                        {/* Recommendations */}
                                        <div className="rounded-lg bg-muted/20 p-4">
                                            <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold mb-2.5">Top Recommendations</div>
                                            <ul className="space-y-2 text-xs text-foreground/75">
                                                <li className="flex items-start gap-2">
                                                    <Zap className="w-3 h-3 text-chart-4 mt-0.5 flex-shrink-0" />
                                                    Add concise Q&A-format headers
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <Zap className="w-3 h-3 text-chart-4 mt-0.5 flex-shrink-0" />
                                                    Strengthen explicit factual claims
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <Zap className="w-3 h-3 text-chart-4 mt-0.5 flex-shrink-0" />
                                                    Reduce promotional language below 5%
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </div>
            )}
        </div>
    )
}
