import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Wand2, Loader2, Sparkles, CheckCircle2, AlertTriangle, ArrowRight, TrendingUp, Info } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

export default function AIStrategyAgent() {
    const [reportData, setReportData] = useState("")
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [plan, setPlan] = useState(null)

    const handleAnalyze = () => {
        if (!reportData.trim()) return

        // Very basic validation just to check if they pasted *something* that looks like JSON
        try {
            JSON.parse(reportData)
        } catch (e) {
            // In a real app we'd warn them, but for the mock we'll just proceed and pretend we understand it
        }

        setIsAnalyzing(true)
        setPlan(null)

        setTimeout(() => {
            setPlan({
                optimizationScore: 72,
                status: "Needs Structured Enhancement",
                summary: "Based on the extracted engine report, your content has strong foundational keywords but lacks the semantic density and structural markup required to confidently trigger AI Overviews.",
                criticalActions: [
                    {
                        title: "Inject FAQ Schema Markup",
                        description: "Top competitors feature structured Q&A. Wrap your H2s in valid FAQPage schema to increase extraction likelihood.",
                        type: "technical"
                    },
                    {
                        title: "Expand 'Large Language Model' Cluster",
                        description: "The semantic gap analysis shows you are missing critical LSI coverage around LLM training mechanisms.",
                        type: "content"
                    }
                ],
                recommendedActions: [
                    {
                        title: "Shorten Introductory Paragraph",
                        description: "SearchGPT prefers concise, dense introductions. Cut narrative fluff in the first 100 words.",
                        type: "structure"
                    },
                    {
                        title: "Increase Entity Density for 'Vector Database'",
                        description: "Mentioned only once. The Knowledge Graph engine suggests this needs a dedicated subsection.",
                        type: "content"
                    }
                ]
            })
            setIsAnalyzing(false)
        }, 3000)
    }

    return (
        <div className="flex-1 space-y-6 pt-6 animate-in fade-in duration-500 max-w-5xl mx-auto">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight flex items-center">
                        <Wand2 className="w-8 h-8 mr-3 text-primary" />
                        AI Strategy Agent
                    </h2>
                    <p className="text-muted-foreground mt-2 max-w-2xl">
                        Paste an exported report from any AIVO engine. The strategy agent will cross-reference ranking factors and generate a prioritized remediation plan.
                    </p>
                </div>
            </div>

            {/* Instructions */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mt-4 max-w-3xl">
                <h3 className="text-sm font-semibold text-primary mb-2 flex items-center">
                    <Info className="w-4 h-4 mr-2" />
                    How to use the Strategy Agent
                </h3>
                <ol className="list-decimal list-inside text-sm text-foreground/80 space-y-1">
                    <li>Export a JSON report from any of the 5 AIVO engines.</li>
                    <li>Paste the raw JSON text directly into the input box below.</li>
                    <li>Click <span className="font-semibold text-foreground">Generate Action Plan</span> to let the agent cross-reference ranking factors.</li>
                    <li>Review your Optimization Score and follow the prioritized Critical Remediation steps to improve your content.</li>
                </ol>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">

                {/* Input Column */}
                <div className="lg:col-span-5 space-y-4 flex flex-col">
                    <Card className="flex-1 bg-card/40 border-border/40 shadow-sm flex flex-col">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg">Input Engine Report</CardTitle>
                            <CardDescription>
                                Paste your raw JSON export here.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col pb-6">
                            <Textarea
                                placeholder="Paste JSON report here..."
                                className="flex-1 min-h-[300px] resize-none font-mono text-sm bg-background/50 border-input shadow-inner focus-visible:ring-primary/50"
                                value={reportData}
                                onChange={(e) => setReportData(e.target.value)}
                                disabled={isAnalyzing}
                            />

                            <Button
                                onClick={handleAnalyze}
                                disabled={isAnalyzing || !reportData.trim()}
                                className="w-full mt-4 h-12 text-md group"
                            >
                                {isAnalyzing ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        Synthesizing Strategy...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-5 h-5 mr-2 group-hover:text-amber-300 transition-colors" />
                                        Generate Action Plan
                                    </>
                                )}
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Output Column */}
                <div className="lg:col-span-7 flex flex-col relative min-h-[500px]">
                    <AnimatePresence mode="wait">

                        {!plan && !isAnalyzing && (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0 flex flex-col items-center justify-center text-center border-2 border-dashed border-border/50 rounded-xl bg-card/10 h-full"
                            >
                                <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center mb-6">
                                    <Wand2 className="w-10 h-10 text-primary opacity-50" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-foreground/80">Awaiting Report</h3>
                                <p className="text-muted-foreground max-w-sm text-sm">
                                    Export a JSON report from an engine and feed it to the agent to receive ranking advice.
                                </p>
                            </motion.div>
                        )}

                        {isAnalyzing && (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 flex flex-col items-center justify-center space-y-6 h-full bg-background/50 backdrop-blur-sm rounded-xl border border-primary/20 z-10"
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 bg-primary blur-xl opacity-20 rounded-full animate-pulse"></div>
                                    <Loader2 className="w-16 h-16 text-primary animate-spin relative z-10" />
                                </div>
                                <div className="space-y-2 text-center">
                                    <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-400 animate-pulse">
                                        Analyzing Engine Telemetry...
                                    </p>
                                    <p className="text-sm text-muted-foreground">Cross-referencing AEO guidelines...</p>
                                </div>
                            </motion.div>
                        )}

                        {plan && !isAnalyzing && (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, staggerChildren: 0.1 }}
                                className="flex flex-col space-y-6 h-full"
                            >
                                {/* Score Hero */}
                                <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                                    <Card className="bg-gradient-to-br from-primary/10 via-background to-background border-primary/20 shadow-sm overflow-hidden relative">
                                        <div className="absolute -right-6 -top-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
                                        <CardContent className="p-6">
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-1">
                                                    <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Optimization Potential</p>
                                                    <h3 className="text-2xl font-bold flex items-center">
                                                        {plan.status}
                                                    </h3>
                                                </div>
                                                <div className="w-20 h-20 rounded-full border-4 border-primary/30 flex items-center justify-center bg-background shadow-inner">
                                                    <span className="text-3xl font-black text-primary">{plan.optimizationScore}</span>
                                                </div>
                                            </div>
                                            <p className="mt-4 text-sm text-foreground/80 leading-relaxed max-w-lg">
                                                {plan.summary}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </motion.div>

                                {/* Critical Actions */}
                                <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="space-y-3">
                                    <h4 className="text-sm font-bold uppercase tracking-wider text-destructive flex items-center">
                                        <AlertTriangle className="w-4 h-4 mr-2" />
                                        Critical Remediation
                                    </h4>
                                    <div className="space-y-3">
                                        {plan.criticalActions.map((action, i) => (
                                            <Card key={i} className="border-destructive/30 bg-destructive/5 shadow-none overflow-hidden">
                                                <CardContent className="p-4 flex gap-4">
                                                    <div className="mt-1">
                                                        <div className="w-6 h-6 rounded-full bg-destructive/20 text-destructive flex items-center justify-center font-bold text-xs shadow-sm">
                                                            {i + 1}
                                                        </div>
                                                    </div>
                                                    <div className="space-y-1 w-full">
                                                        <div className="flex items-center justify-between">
                                                            <h5 className="font-semibold text-foreground/90">{action.title}</h5>
                                                            <Badge variant="outline" className="text-[10px] uppercase text-destructive border-destructive/30 bg-background/50">
                                                                {action.type}
                                                            </Badge>
                                                        </div>
                                                        <p className="text-sm text-foreground/70">{action.description}</p>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Recommended Actions */}
                                <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="space-y-3 pb-8">
                                    <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-500 flex items-center mt-4">
                                        <TrendingUp className="w-4 h-4 mr-2" />
                                        Recommended Enhancements
                                    </h4>
                                    <div className="space-y-3">
                                        {plan.recommendedActions.map((action, i) => (
                                            <Card key={i} className="border-border shadow-none overflow-hidden group hover:border-emerald-500/30 transition-colors">
                                                <CardContent className="p-4 flex gap-4">
                                                    <div className="mt-1">
                                                        <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold text-xs group-hover:bg-emerald-500/10 group-hover:text-emerald-500 transition-colors">
                                                            <ArrowRight className="w-3 h-3" />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-1 w-full">
                                                        <div className="flex items-center justify-between">
                                                            <h5 className="font-medium text-foreground/80 group-hover:text-foreground transition-colors">{action.title}</h5>
                                                            <Badge variant="secondary" className="text-[10px] uppercase">
                                                                {action.type}
                                                            </Badge>
                                                        </div>
                                                        <p className="text-sm text-muted-foreground">{action.description}</p>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </motion.div>

                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
