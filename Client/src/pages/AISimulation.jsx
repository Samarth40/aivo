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

// --- Model Definitions (using theme-consistent solid colors) ---
const AI_MODELS = [
    {
        id: "chatgpt",
        name: "ChatGPT",
        version: "GPT-5.3",
        icon: "⚡",
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
        icon: "✦",
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
        icon: "🔍",
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
        icon: "🧠",
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
        icon: "𝕏",
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
        icon: "🌐",
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

    const toggleModel = (modelId) => {
        setSelectedModels((prev) =>
            prev.includes(modelId)
                ? prev.filter((id) => id !== modelId)
                : [...prev, modelId]
        )
    }

    const handleSimulate = () => {
        const hasInput = inputMode === "url" ? url : content
        if (!hasInput || selectedModels.length === 0) return
        setIsSimulating(true)
        setResults(null)

        setTimeout(() => {
            const res = {}
            selectedModels.forEach((id) => {
                if (SIMULATED_RESULTS[id]) {
                    res[id] = SIMULATED_RESULTS[id]
                }
            })
            setResults(res)
            setIsSimulating(false)
        }, 2800)
    }

    const handleExport = () => {
        if (!results) return
        setIsExporting(true)
        const exportData = JSON.stringify({
            sourceEngine: "AISimulationPlayground",
            timestamp: new Date().toISOString(),
            input: inputMode === "url" ? { url } : { content: content.substring(0, 200) + "..." },
            models: results,
        }, null, 2)
        navigator.clipboard.writeText(exportData)
        setTimeout(() => setIsExporting(false), 2000)
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
                                        <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> Copied!
                                    </motion.div>
                                ) : (
                                    <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center">
                                        <Copy className="w-3.5 h-3.5 mr-1.5" /> Export All
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Button>
                    </div>

                    {/* Model Result Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {Object.entries(results).map(([modelId, result], index) => {
                            const model = AI_MODELS.find((m) => m.id === modelId)
                            if (!model) return null

                            const scoreColor =
                                result.visibilityScore >= 80 ? "text-chart-2" :
                                    result.visibilityScore >= 60 ? "text-chart-5" :
                                        "text-destructive"

                            const likelihoodStyle =
                                result.citationLikelihood === "Very High" ? "bg-chart-2/15 text-chart-2 border-chart-2/30" :
                                    result.citationLikelihood === "High" ? "bg-chart-2/10 text-chart-2 border-chart-2/20" :
                                        result.citationLikelihood === "Medium" ? "bg-chart-5/10 text-chart-5 border-chart-5/20" :
                                            "bg-destructive/10 text-destructive border-destructive/20"

                            return (
                                <motion.div
                                    key={modelId}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.12, duration: 0.5 }}
                                >
                                    <Card className={`h-full bg-card/40 ${model.borderClass} shadow-sm overflow-hidden relative group hover:shadow-md transition-all duration-300`}>
                                        {/* Top accent bar */}
                                        <div className={`absolute inset-x-0 top-0 h-1 ${model.accentClass} opacity-60 group-hover:opacity-100 transition-opacity`} />

                                        <CardHeader className="pb-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2.5">
                                                    <div className={`w-9 h-9 rounded-lg ${model.accentClass} flex items-center justify-center text-white text-base shadow-sm`}>
                                                        {model.icon}
                                                    </div>
                                                    <div>
                                                        <CardTitle className="text-base">{model.name}</CardTitle>
                                                        <CardDescription className="text-[11px]">{model.version}</CardDescription>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <motion.div
                                                        initial={{ scale: 0.5, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        transition={{ delay: index * 0.12 + 0.3, type: "spring", bounce: 0.5 }}
                                                        className={`text-3xl font-black ${scoreColor}`}
                                                    >
                                                        {result.visibilityScore}
                                                    </motion.div>
                                                    <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">Score</div>
                                                </div>
                                            </div>
                                        </CardHeader>

                                        <CardContent className="space-y-4">
                                            {/* Citation Badge */}
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-muted-foreground">Citation Likelihood:</span>
                                                <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${likelihoodStyle}`}>
                                                    {result.citationLikelihood}
                                                </span>
                                            </div>

                                            {/* Simulated Response */}
                                            <div className="bg-muted/30 border border-border/40 rounded-lg p-3.5">
                                                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground font-bold mb-2">
                                                    <Bot className="w-3 h-3" />
                                                    Simulated AI Response
                                                </div>
                                                <p className="text-sm text-foreground/80 leading-relaxed line-clamp-4">
                                                    {result.simulatedResponse}
                                                </p>
                                            </div>

                                            {/* Key Signals */}
                                            <div>
                                                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground font-bold mb-2">
                                                    <Target className="w-3 h-3" />
                                                    Key Signals Detected
                                                </div>
                                                <ul className="space-y-1.5">
                                                    {result.keySignals.map((signal, i) => (
                                                        <motion.li
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: index * 0.12 + 0.4 + i * 0.08 }}
                                                            key={i}
                                                            className="flex items-start gap-2 text-xs text-foreground/70"
                                                        >
                                                            <ArrowRight className={`w-3 h-3 mt-0.5 flex-shrink-0 ${model.textClass}`} />
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
                            <Card className="bg-card/60 border-primary/20 shadow-sm overflow-hidden">
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <Trophy className="w-5 h-5 text-chart-4" />
                                        Comparison Summary
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                        {/* Best Performer */}
                                        <div className="bg-muted/30 border border-border/40 rounded-xl p-5 text-center">
                                            <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-3">Best Performer</div>
                                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${summary.bestModel.accentClass} text-white text-base font-bold shadow-sm`}>
                                                <span>{summary.bestModel.icon}</span>
                                                {summary.bestModel.name}
                                            </div>
                                            <div className="mt-2 text-2xl font-black text-chart-2">{summary.bestScore}%</div>
                                        </div>

                                        {/* Average Score */}
                                        <div className="bg-muted/30 border border-border/40 rounded-xl p-5 text-center">
                                            <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-3">Average Score</div>
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.8, type: "spring", bounce: 0.4 }}
                                                className="text-5xl font-black text-primary"
                                            >
                                                {summary.avg}%
                                            </motion.div>
                                            <div className="text-xs text-muted-foreground mt-1">across all tested models</div>
                                        </div>

                                        {/* Recommendations */}
                                        <div className="bg-muted/30 border border-border/40 rounded-xl p-5">
                                            <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-3">Top Recommendations</div>
                                            <ul className="space-y-2 text-sm text-foreground/80">
                                                <li className="flex items-start gap-2">
                                                    <Zap className="w-3.5 h-3.5 text-chart-4 mt-0.5 flex-shrink-0" />
                                                    Add concise Q&A-format headers
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <Zap className="w-3.5 h-3.5 text-chart-4 mt-0.5 flex-shrink-0" />
                                                    Strengthen explicit factual claims
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <Zap className="w-3.5 h-3.5 text-chart-4 mt-0.5 flex-shrink-0" />
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
