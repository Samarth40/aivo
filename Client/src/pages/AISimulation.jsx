import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bot, Loader2, Sparkles, AlertTriangle, ShieldCheck, FileSearch2, CheckCircle2, Copy, Info } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

export default function AISimulation() {
    const [url, setUrl] = useState("")
    const [isSimulating, setIsSimulating] = useState(false)
    const [result, setResult] = useState(null)
    const [isExporting, setIsExporting] = useState(false)

    const handleSimulate = () => {
        if (!url) return
        setIsSimulating(true)

        setTimeout(() => {
            setResult({
                aiVisibilityScore: 68,
                status: "Moderate Candidate",
                extractionLikelihood: "Medium",
                hallucinationRisk: "Low",
                structuralIssues: [
                    "H2 Headers lack direct Q&A formatting",
                    "Missing concise introductory summary paragraph",
                    "Bullet points contain overly promotional language"
                ],
                strengths: [
                    "High raw word count (1,400+ words)",
                    "Strong underlying semantic relevance to topic",
                    "Valid Schema markup detected"
                ]
            })
            setIsSimulating(false)
        }, 2200)
    }

    const handleExport = () => {
        if (!result) return

        setIsExporting(true)
        const exportData = JSON.stringify({ sourceEngine: "AISimulation", timestamp: new Date().toISOString(), data: result }, null, 2)
        navigator.clipboard.writeText(exportData)

        setTimeout(() => setIsExporting(false), 2000)
    }

    return (
        <div className="flex-1 space-y-6 pt-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">AI Simulation Engine</h2>
            </div>

            <p className="text-muted-foreground w-full max-w-3xl">
                Simulates the extraction logic of generative search models (like Google AI Overviews or SearchGPT) to estimate a page's likelihood to be selected or paraphrased.
            </p>

            {/* Instructions */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mt-2 max-w-3xl">
                <h3 className="text-sm font-semibold text-primary mb-2 flex items-center">
                    <Info className="w-4 h-4 mr-2" />
                    How to use this engine
                </h3>
                <ol className="list-decimal list-inside text-sm text-foreground/80 space-y-1">
                    <li>Enter the URL of the page you want to test.</li>
                    <li>Click <span className="font-semibold text-foreground">Run AI Simulation</span> to estimate the probability of being cited in an AI Overview.</li>
                    <li>Review the structural blockers and AI-friendly strengths to understand Hallucination Risk.</li>
                    <li>Click <span className="font-semibold text-foreground">Export Report</span> to pass this simulation data to the AI Strategy Agent.</li>
                </ol>
            </div>

            {/* Input Section */}
            <Card className="bg-card/40 border-border/40 shadow-sm mt-4">
                <CardContent className="pt-6 space-y-4">
                    <div className="space-y-2">
                        <div className="relative">
                            <Bot className="absolute left-3 top-3 h-4 w-4 text-muted-foreground/70" />
                            <input
                                type="url"
                                placeholder="Enter URL to simulate LLM ingestion..."
                                className="w-full max-w-2xl bg-background/50 border border-border/50 rounded-md py-2.5 text-sm pl-10 pr-3 focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                disabled={isSimulating}
                            />
                        </div>
                    </div>

                    <div className="flex justify-start pt-2">
                        <Button
                            onClick={handleSimulate}
                            disabled={isSimulating || !url}
                            className="px-6 bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                            {isSimulating ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Simulating Extraction...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-4 h-4 mr-2" />
                                    Run AI Simulation
                                </>
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Results Section */}
            {isSimulating && (
                <div className="flex flex-col items-center justify-center py-24 space-y-4">
                    <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
                    <p className="text-lg font-medium text-muted-foreground animate-pulse">Running Generative Engine Simulation...</p>
                </div>
            )}

            {!result && !isSimulating && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-border/50 rounded-xl bg-card/20"
                >
                    <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4">
                        <FileSearch2 className="w-8 h-8 text-indigo-500" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Ready for Simulation</h3>
                    <p className="text-muted-foreground max-w-md">
                        Enter a URL above to test how easily an AI search engine can parse and extract its information.
                    </p>
                </motion.div>
            )}

            {result && !isSimulating && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, staggerChildren: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >

                    {/* Hero Score Area */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="lg:col-span-3"
                    >
                        <Card className="bg-gradient-to-br from-indigo-900/40 via-background to-background border-indigo-500/30 shadow-lg shadow-indigo-500/5 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-700 transform group-hover:scale-110 group-hover:-rotate-12">
                                <Bot className="w-64 h-64 text-indigo-300" />
                            </div>
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none mix-blend-overlay"></div>

                            <CardHeader className="relative z-10 border-b border-indigo-500/10 bg-background/50 backdrop-blur-sm">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-xl flex items-center text-indigo-100">
                                            <Sparkles className="w-5 h-5 mr-2 text-indigo-400" />
                                            Simulation Results
                                        </CardTitle>
                                        <CardDescription className="text-indigo-200/60 font-medium">
                                            Probability of this page triggering an AI Overview citation.
                                        </CardDescription>
                                    </div>
                                    <Button size="sm" variant="outline" className={`h-8 transition-all ${isExporting ? 'bg-indigo-500/20 text-indigo-300 hover:text-indigo-200 hover:bg-indigo-500/30 border-indigo-500/50' : 'text-indigo-200 border-indigo-500/30 hover:bg-indigo-500/10'}`} onClick={handleExport}>
                                        <AnimatePresence mode="wait">
                                            {isExporting ? (
                                                <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center">
                                                    <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                                                    Copied
                                                </motion.div>
                                            ) : (
                                                <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center">
                                                    <Copy className="w-3.5 h-3.5 mr-1.5" />
                                                    Export Report
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 pt-8 pb-8">

                                <div className="flex flex-col md:flex-row items-center md:space-x-12 w-full max-w-3xl mx-auto">
                                    <div className="text-center md:text-left mb-6 md:mb-0">
                                        <div className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-2">Visibility Score</div>
                                        <motion.div
                                            initial={{ scale: 0.5, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ type: "spring", bounce: 0.5, delay: 0.3 }}
                                            className="text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-indigo-400 to-purple-400 drop-shadow-sm"
                                        >
                                            {result.aiVisibilityScore}%
                                        </motion.div>
                                        <div className="inline-block mt-3 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-sm font-bold uppercase tracking-widest text-indigo-300">
                                            {result.status}
                                        </div>
                                    </div>

                                    <div className="w-full md:w-px h-px md:h-24 bg-gradient-to-b from-indigo-500/0 via-indigo-500/30 to-indigo-500/0 hidden md:block"></div>

                                    <div className="space-y-5 flex-1 w-full">
                                        <div className="bg-background/40 backdrop-blur-md border border-indigo-500/10 rounded-lg p-4 flex justify-between items-center shadow-inner">
                                            <div className="text-xs text-indigo-200/70 uppercase tracking-widest font-bold">Extraction Likelihood</div>
                                            <motion.div
                                                initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }}
                                                className="flex items-center text-amber-400 font-bold bg-amber-400/10 px-2.5 py-1 rounded-md"
                                            >
                                                <span className="w-2 h-2 rounded-full bg-amber-400 mr-2 shadow-[0_0_8px_rgba(251,191,36,0.6)]"></span>
                                                {result.extractionLikelihood}
                                            </motion.div>
                                        </div>
                                        <div className="bg-background/40 backdrop-blur-md border border-indigo-500/10 rounded-lg p-4 flex justify-between items-center shadow-inner">
                                            <div className="text-xs text-indigo-200/70 uppercase tracking-widest font-bold">Hallucination Risk</div>
                                            <motion.div
                                                initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.7 }}
                                                className="flex items-center text-emerald-400 font-bold bg-emerald-400/10 px-2.5 py-1 rounded-md"
                                            >
                                                <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 shadow-[0_0_8px_rgba(52,211,153,0.6)]"></span>
                                                {result.hallucinationRisk}
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>

                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Issue Breakdown */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="lg:col-span-1"
                    >
                        <Card className="h-full bg-destructive/5 border-destructive/20 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-destructive/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
                            <CardHeader className="pb-4 border-b border-border/20 z-10 relative">
                                <CardTitle className="text-lg flex items-center text-destructive">
                                    <AlertTriangle className="w-5 h-5 mr-2" />
                                    Structural Blockers
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6 z-10 relative">
                                <ul className="space-y-4">
                                    {result.structuralIssues.map((issue, i) => (
                                        <motion.li
                                            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + (i * 0.1) }}
                                            key={i} className="text-sm flex items-start text-foreground/85 leading-relaxed bg-background/50 border border-destructive/10 p-3 rounded-lg shadow-sm"
                                        >
                                            <span className="bg-destructive/20 text-destructive text-[10px] font-black px-1.5 py-0.5 rounded mr-3 mt-0.5 whitespace-nowrap shadow-[0_0_5px_rgba(239,68,68,0.2)]">FIX</span>
                                            {issue}
                                        </motion.li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Strengths Breakdown */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="lg:col-span-2"
                    >
                        <Card className="h-full bg-emerald-500/5 border-emerald-500/20 shadow-sm relative overflow-hidden group">
                            <div className="absolute bottom-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl transform translate-x-1/3 translate-y-1/3"></div>
                            <CardHeader className="pb-4 border-b border-border/20 z-10 relative">
                                <CardTitle className="text-lg flex items-center text-emerald-500">
                                    <ShieldCheck className="w-5 h-5 mr-2" />
                                    AI-Friendly Strengths
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6 z-10 relative">
                                <ul className="space-y-4">
                                    {result.strengths.map((strength, i) => (
                                        <motion.li
                                            initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + (i * 0.1) }}
                                            key={i} className="text-sm flex items-start text-foreground/85 leading-relaxed bg-background/50 border border-emerald-500/10 p-3 rounded-lg shadow-sm"
                                        >
                                            <span className="text-emerald-500 mr-3 mt-0 w-5 h-5 flex items-center justify-center bg-emerald-500/20 rounded-full flex-shrink-0 shadow-[0_0_5px_rgba(16,185,129,0.3)]">
                                                <ShieldCheck className="w-3 h-3" />
                                            </span>
                                            {strength}
                                        </motion.li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </motion.div>

                </motion.div>
            )}
        </div>
    )
}
