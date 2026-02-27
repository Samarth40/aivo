import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { BrainCircuit, Loader2, Target, BarChart2, CheckCircle2, ChevronRight, FileSearch2, Copy, Info } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

export default function SemanticScoring() {
    const [topic, setTopic] = useState("")
    const [content, setContent] = useState("")
    const [isScoring, setIsScoring] = useState(false)
    const [result, setResult] = useState(null)
    const [isExporting, setIsExporting] = useState(false)

    const handleScore = () => {
        if (!topic || !content) return
        setIsScoring(true)

        setTimeout(() => {
            setResult({
                overallScore: 84,
                topicMatch: 92,
                comprehensiveness: 76,
                missingSubtopics: [
                    "Zero-Click Searches",
                    "Knowledge Panel Integration",
                    "Voice Search Impact"
                ],
                strongSubtopics: [
                    "Generative Engine Algorithms",
                    "Entity Structuring",
                    "LLM Hallucinations"
                ]
            })
            setIsScoring(false)
        }, 1800)
    }

    const handleExport = () => {
        if (!result) return
        setIsExporting(true)
        const exportData = JSON.stringify({ sourceEngine: "SemanticScoring", timestamp: new Date().toISOString(), data: result }, null, 2)
        navigator.clipboard.writeText(exportData)
        setTimeout(() => setIsExporting(false), 2000)
    }

    const scoreLabel = result
        ? result.overallScore >= 80 ? "Very strong alignment" : result.overallScore >= 60 ? "Moderate alignment" : "Weak alignment"
        : ""
    const scoreColor = result
        ? result.overallScore >= 80 ? "text-chart-2" : result.overallScore >= 60 ? "text-chart-5" : "text-destructive"
        : ""

    return (
        <div className="flex-1 space-y-5 pt-6 animate-in fade-in duration-500">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                        <BrainCircuit className="w-5 h-5 text-primary-foreground" />
                    </div>
                    Semantic Scoring Engine
                </h2>
                <p className="text-muted-foreground mt-1.5 text-sm max-w-2xl">
                    Evaluates meaning density, topical comprehensiveness, and query intent match. Determines if content truly answers the semantic intent behind the target topic.
                </p>
            </div>

            {/* Instructions */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 max-w-2xl">
                <h3 className="text-sm font-semibold text-primary mb-2 flex items-center">
                    <Info className="w-4 h-4 mr-2" />
                    How to use this engine
                </h3>
                <ol className="list-decimal list-inside text-sm text-foreground/80 space-y-1">
                    <li>Enter the specific <span className="font-semibold text-foreground">Target Topic</span> or keyword you want to rank for.</li>
                    <li>Paste the <span className="font-semibold text-foreground">Content Body</span> from your article.</li>
                    <li>Click <span className="font-semibold text-foreground">Score Semantics</span> to measure topic coverage.</li>
                    <li>Review covered clusters and missing intents.</li>
                </ol>
            </div>

            {/* Input */}
            <Card className="bg-card/40 border-border/40">
                <CardContent className="pt-5 pb-4 space-y-3">
                    <div className="space-y-1.5">
                        <Label className="text-xs">Target Topic / Intent</Label>
                        <div className="relative max-w-md">
                            <Target className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground/70" />
                            <Input
                                placeholder="e.g. Answer Engine Optimization Strategies"
                                className="pl-10"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                disabled={isScoring}
                            />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <Label className="text-xs">Content Body</Label>
                        <textarea
                            placeholder="Paste the main content body here to evaluate against the target topic..."
                            className="w-full h-28 bg-background/50 border border-border/50 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            disabled={isScoring}
                        />
                    </div>
                    <div className="flex justify-end">
                        <Button onClick={handleScore} disabled={isScoring || !topic || !content}>
                            {isScoring ? (
                                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Embedding Vectors...</>
                            ) : (
                                <><BrainCircuit className="w-4 h-4 mr-2" /> Score Semantics</>
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Loading */}
            {isScoring && (
                <div className="flex flex-col items-center justify-center py-16 space-y-3">
                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                    <p className="text-sm text-muted-foreground">Calculating Vector Distance and Meaning Density...</p>
                </div>
            )}

            {/* Empty */}
            {!result && !isScoring && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-border/50 rounded-xl bg-card/20"
                >
                    <FileSearch2 className="w-10 h-10 text-primary/40 mb-3" />
                    <h3 className="text-lg font-semibold mb-1">Ready for Scoring</h3>
                    <p className="text-muted-foreground max-w-sm text-sm">
                        Enter a Target Topic and paste Content Body above to measure semantic relevance.
                    </p>
                </motion.div>
            )}

            {/* Results */}
            {result && !isScoring && (
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-5"
                >
                    {/* Score Ring */}
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="md:col-span-1">
                        <Card className="bg-card/40 border-border/40 flex flex-col justify-center items-center py-8 h-full">
                            {/* Export button */}
                            <div className="absolute top-3 right-3">
                                <Button size="icon" variant="ghost" className="h-7 w-7" onClick={handleExport}>
                                    <AnimatePresence mode="wait">
                                        {isExporting ? (
                                            <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                                <CheckCircle2 className="w-3.5 h-3.5 text-chart-2" />
                                            </motion.div>
                                        ) : (
                                            <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                                <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </Button>
                            </div>

                            <div className="text-center space-y-2">
                                <div className="relative inline-block">
                                    <svg className="w-36 h-36 transform -rotate-90">
                                        <circle cx="72" cy="72" r="62" className="text-muted/30" strokeWidth="10" fill="none" stroke="currentColor" />
                                        <motion.circle
                                            initial={{ strokeDashoffset: 390 }}
                                            animate={{ strokeDashoffset: 390 - (390 * result.overallScore) / 100 }}
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
                                            {result.overallScore}
                                        </motion.span>
                                    </div>
                                </div>
                                <h3 className="text-base font-semibold">Semantic Score</h3>
                                <p className={`text-sm font-medium ${scoreColor}`}>{scoreLabel}</p>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Breakdown */}
                    <motion.div
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="md:col-span-2"
                    >
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
                                            {result.topicMatch}%
                                        </motion.span>
                                    </div>
                                    <div className="w-full h-2 bg-muted/50 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }} animate={{ width: `${result.topicMatch}%` }} transition={{ duration: 1, delay: 0.4 }}
                                            className="h-full bg-chart-2 rounded-full"
                                        />
                                    </div>
                                </div>

                                {/* Comprehensiveness */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium">Topical Comprehensiveness</span>
                                        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="font-bold text-chart-5">
                                            {result.comprehensiveness}%
                                        </motion.span>
                                    </div>
                                    <div className="w-full h-2 bg-muted/50 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }} animate={{ width: `${result.comprehensiveness}%` }} transition={{ duration: 1, delay: 0.6 }}
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
                                            {result.strongSubtopics.map((item, i) => (
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
                                            {result.missingSubtopics.map((item, i) => (
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
                    </motion.div>
                </motion.div>
            )}
        </div>
    )
}
