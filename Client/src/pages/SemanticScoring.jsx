import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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

        // Simulate API delay
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

    return (
        <div className="flex-1 space-y-6 pt-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Semantic Scoring Engine</h2>
            </div>

            <p className="text-muted-foreground w-full max-w-3xl">
                Evaluates meaning density, topical comprehensiveness, and query intent match using transformer-based vector embeddings. Determines if the content truly answers the semantic intent behind the target topic.
            </p>

            {/* Instructions */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mt-2 max-w-3xl">
                <h3 className="text-sm font-semibold text-primary mb-2 flex items-center">
                    <Info className="w-4 h-4 mr-2" />
                    How to use this engine
                </h3>
                <ol className="list-decimal list-inside text-sm text-foreground/80 space-y-1">
                    <li>Enter the specific <span className="font-semibold text-foreground">Target Topic</span> or Keyword you want to rank for.</li>
                    <li>Paste the <span className="font-semibold text-foreground">Content Body</span> text from your article into the textarea.</li>
                    <li>Click <span className="font-semibold text-foreground">Score Semantics</span> to measure topic coverage.</li>
                    <li>Review your covered clusters, then click <span className="font-semibold text-foreground">Export Report</span> to save this data.</li>
                </ol>
            </div>

            {/* Input Section */}
            <Card className="bg-card/40 border-border/40 shadow-sm mt-4">
                <CardContent className="pt-6 space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Target Topic / Intent</label>
                        <div className="relative max-w-md">
                            <Target className="absolute left-3 top-3 h-4 w-4 text-muted-foreground/70" />
                            <input
                                type="text"
                                placeholder="e.g. Answer Engine Optimization Strategies"
                                className="w-full bg-background/50 border border-border/50 rounded-md py-2 text-sm pl-10 pr-3 focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                disabled={isScoring}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Content Body</label>
                        <textarea
                            placeholder="Paste the main content body here to evaluate its semantic density against the target topic..."
                            className="w-full h-32 bg-background/50 border border-border/50 rounded-md p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all resize-none"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            disabled={isScoring}
                        />
                    </div>

                    <div className="flex justify-end pt-2">
                        <Button
                            onClick={handleScore}
                            disabled={isScoring || !topic || !content}
                            className="px-6"
                        >
                            {isScoring ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Embedding Vectors...
                                </>
                            ) : (
                                <>
                                    <BrainCircuit className="w-4 h-4 mr-2" />
                                    Score Semantics
                                </>
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Results Section */}
            {isScoring && (
                <div className="flex flex-col items-center justify-center py-24 space-y-4">
                    <Loader2 className="w-12 h-12 text-primary animate-spin" />
                    <p className="text-lg font-medium text-muted-foreground animate-pulse">Calculating Vector Distance and Meaning Density...</p>
                </div>
            )}

            {!result && !isScoring && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-border/50 rounded-xl bg-card/20"
                >
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <FileSearch2 className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Ready for Scoring</h3>
                    <p className="text-muted-foreground max-w-md">
                        Enter a Target Topic and paste the Content Body above. AIVO will vectorize the text to grade its comprehensiveness and semantic relevance.
                    </p>
                </motion.div>
            )}

            {result && !isScoring && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, staggerChildren: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >

                    {/* Main Score Area */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="md:col-span-1"
                    >
                        <Card className="bg-card/40 border-border/40 shadow-sm flex flex-col justify-center items-center py-8 h-full relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
                            <div className="absolute top-2 right-2 z-20">
                                <Button size="icon" variant="ghost" className={`h-8 w-8 hover:bg-emerald-500/20 hover:text-emerald-500 ${isExporting ? 'text-emerald-500' : 'text-muted-foreground'}`} onClick={handleExport}>
                                    <AnimatePresence mode="wait">
                                        {isExporting ? (
                                            <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                                <CheckCircle2 className="w-4 h-4" />
                                            </motion.div>
                                        ) : (
                                            <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                                <Copy className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </Button>
                            </div>
                            <div className="text-center space-y-2 relative z-10">
                                <svg className="w-40 h-40 transform -rotate-90 filter drop-shadow-[0_0_8px_rgba(34,197,94,0.4)]">
                                    <circle cx="80" cy="80" r="70" className="text-muted/20" strokeWidth="12" fill="none" stroke="currentColor" />
                                    <motion.circle
                                        initial={{ strokeDashoffset: 440 }}
                                        animate={{ strokeDashoffset: 440 - (440 * result.overallScore) / 100 }}
                                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                                        cx="80" cy="80" r="70"
                                        className="text-primary"
                                        strokeWidth="12" fill="none" stroke="currentColor" strokeDasharray="440" strokeLinecap="round"
                                    />
                                </svg>
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1 }}
                                        className="text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70"
                                    >
                                        {result.overallScore}
                                    </motion.span>
                                </div>
                                <h3 className="text-lg font-semibold mt-4">Semantic Score</h3>
                                <p className="text-sm text-emerald-500 font-medium tracking-wide">Very strong alignment</p>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Breakdown Area */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="md:col-span-2 flex flex-col h-full"
                    >
                        <Card className="bg-card/40 border-border/40 shadow-sm flex-1 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl transform translate-x-12 -translate-y-12"></div>
                            <CardHeader className="pb-4 border-b border-border/20">
                                <CardTitle className="text-lg flex items-center justify-between">
                                    <span className="flex items-center">
                                        <BarChart2 className="w-5 h-5 mr-2 text-primary" />
                                        Vector Dimensionality
                                    </span>
                                    <span className="text-xs tracking-wider text-muted-foreground uppercase font-semibold">Breakdown</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6 pt-6">

                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium tracking-wide">Topic Relevance Match</span>
                                        <motion.span
                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                                            className="font-bold text-emerald-500"
                                        >
                                            {result.topicMatch}%
                                        </motion.span>
                                    </div>
                                    <div className="w-full h-2.5 bg-muted/50 rounded-full overflow-hidden shadow-inner">
                                        <motion.div
                                            initial={{ width: 0 }} animate={{ width: `${result.topicMatch}%` }} transition={{ duration: 1, delay: 0.5 }}
                                            className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full"
                                        ></motion.div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium tracking-wide">Topical Comprehensiveness</span>
                                        <motion.span
                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
                                            className="font-bold text-amber-500"
                                        >
                                            {result.comprehensiveness}%
                                        </motion.span>
                                    </div>
                                    <div className="w-full h-2.5 bg-muted/50 rounded-full overflow-hidden shadow-inner">
                                        <motion.div
                                            initial={{ width: 0 }} animate={{ width: `${result.comprehensiveness}%` }} transition={{ duration: 1, delay: 0.7 }}
                                            className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full"
                                        ></motion.div>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1.5 glass-panel p-2 rounded-md border border-border/30">
                                        <span className="font-semibold text-amber-500/80 mr-1">Note:</span> Content answers the primary query well, but leaves adjacent intent avenues unexplored.
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-6 pt-6 mt-4 border-t border-border/40">
                                    <div className="bg-emerald-500/5 rounded-lg border border-emerald-500/10 p-4">
                                        <h4 className="text-sm font-semibold mb-3 flex items-center text-emerald-500 tracking-wide">
                                            <CheckCircle2 className="w-4 h-4 mr-1.5" /> Covered Clusters
                                        </h4>
                                        <ul className="space-y-2.5">
                                            {result.strongSubtopics.map((item, i) => (
                                                <motion.li
                                                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 + (i * 0.1) }}
                                                    key={i} className="text-xs flex items-start text-foreground/80 font-medium"
                                                >
                                                    <ChevronRight className="w-3.5 h-3.5 mr-1 text-emerald-500 mt-0.5 flex-shrink-0" />
                                                    {item}
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="bg-amber-500/5 rounded-lg border border-amber-500/10 p-4">
                                        <h4 className="text-sm font-semibold mb-3 flex items-center text-amber-500 tracking-wide">
                                            <Target className="w-4 h-4 mr-1.5" /> Missing Intents
                                        </h4>
                                        <ul className="space-y-2.5">
                                            {result.missingSubtopics.map((item, i) => (
                                                <motion.li
                                                    initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.3 + (i * 0.1) }}
                                                    key={i} className="text-xs flex items-start text-foreground/80 font-medium"
                                                >
                                                    <ChevronRight className="w-3.5 h-3.5 mr-1 text-amber-500 mt-0.5 flex-shrink-0" />
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
