import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Swords, Loader2, ArrowUpRight, ArrowDownRight, Minus, Trophy, FileSearch2, CheckCircle2, Copy, Info } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

export default function CompetitorIntelligence() {
    const [keyword, setKeyword] = useState("")
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [result, setResult] = useState(null)
    const [isExporting, setIsExporting] = useState(false)

    const handleAnalyze = () => {
        if (!keyword) return
        setIsAnalyzing(true)

        setTimeout(() => {
            setResult({
                keyword: keyword,
                competitorsAnalyzed: 3,
                userBaseline: 42,
                competitors: [
                    { rank: 1, domain: "hubspot.com", entityCoverage: 88, gap: "+46", status: "loss" },
                    { rank: 2, domain: "searchenginejournal.com", entityCoverage: 76, gap: "+34", status: "loss" },
                    { rank: 3, domain: "backlinko.com", entityCoverage: 65, gap: "+23", status: "loss" },
                    { rank: "You", domain: "yourdomain.com", entityCoverage: 42, gap: "0", status: "neutral" },
                ],
                actionableGaps: [
                    "Competitors explicitly define 'Agentic AI', you do not.",
                    "Top 3 results all feature a structured FAQ schema.",
                    "Your content lacks the 'Large Language Model' entity cluster."
                ]
            })
            setIsAnalyzing(false)
        }, 2500)
    }

    const handleExport = () => {
        if (!result) return

        setIsExporting(true)
        const exportData = JSON.stringify({ sourceEngine: "CompetitorIntelligence", timestamp: new Date().toISOString(), data: result }, null, 2)
        navigator.clipboard.writeText(exportData)

        setTimeout(() => setIsExporting(false), 2000)
    }

    return (
        <div className="flex-1 space-y-6 pt-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Competitor Intelligence Engine</h2>
            </div>

            <p className="text-muted-foreground w-full max-w-3xl">
                Scrapes top competing pages for a target query and compares them based on interpretability, entity coverage, and structural gaps.
            </p>

            {/* Instructions */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mt-2 max-w-3xl">
                <h3 className="text-sm font-semibold text-primary mb-2 flex items-center">
                    <Info className="w-4 h-4 mr-2" />
                    How to use this engine
                </h3>
                <ol className="list-decimal list-inside text-sm text-foreground/80 space-y-1">
                    <li>Enter your target keyword to analyze the top-ranking search results.</li>
                    <li>Click <span className="font-semibold text-foreground">Analyze Market Share</span> to evaluate topical authority.</li>
                    <li>Compare the Entity Coverage Score of top competitors against your baseline.</li>
                    <li>Review the Actionable Gaps, then click <span className="font-semibold text-foreground">Export Report</span> for strategic synthesis.</li>
                </ol>
            </div>

            {/* Input Section */}
            <Card className="bg-card/40 border-border/40 shadow-sm mt-4">
                <CardContent className="pt-6 space-y-4">
                    <div className="space-y-2">
                        <div className="relative">
                            <Swords className="absolute left-3 top-3 h-4 w-4 text-muted-foreground/70" />
                            <input
                                type="text"
                                placeholder="Enter a target keyword to analyze top ranking competitors..."
                                className="w-full max-w-2xl bg-background/50 border border-border/50 rounded-md py-2.5 text-sm pl-10 pr-3 focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                disabled={isAnalyzing}
                            />
                        </div>
                    </div>

                    <div className="flex justify-start pt-2">
                        <Button
                            onClick={handleAnalyze}
                            disabled={isAnalyzing || !keyword}
                            className="px-6"
                        >
                            {isAnalyzing ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Scraping SERP...
                                </>
                            ) : (
                                <>
                                    <Trophy className="w-4 h-4 mr-2" />
                                    Analyze Market Share
                                </>
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Results Section */}
            {isAnalyzing && (
                <div className="flex flex-col items-center justify-center py-24 space-y-4">
                    <Loader2 className="w-12 h-12 text-primary animate-spin" />
                    <p className="text-lg font-medium text-muted-foreground animate-pulse">Scraping SERP and Analyzing Competitor Networks...</p>
                </div>
            )}

            {!result && !isAnalyzing && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-border/50 rounded-xl bg-card/20"
                >
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <FileSearch2 className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Ready for Intelligence</h3>
                    <p className="text-muted-foreground max-w-md">
                        Enter a target keyword above. AIVO will identify top-ranking competitors and find gaps in your semantic coverage.
                    </p>
                </motion.div>
            )}

            {result && !isAnalyzing && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, staggerChildren: 0.1 }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                >

                    {/* Table Area */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-2"
                    >
                        <Card className="h-full bg-card/40 border-border/40 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl transform -translate-x-12 -translate-y-12 transition-all duration-700 group-hover:bg-primary/10"></div>
                            <CardHeader className="pb-4 border-b border-border/20 z-10 relative">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-lg flex items-center">
                                            <Swords className="w-5 h-5 mr-2 text-primary" />
                                            Entity Coverage Comparison
                                        </CardTitle>
                                        <CardDescription className="text-foreground/60">
                                            How much relevant semantic territory your competitors explicitly cover vs. your baseline.
                                        </CardDescription>
                                    </div>
                                    <Button size="sm" variant="outline" className={`h-8 transition-all ${isExporting ? 'bg-primary/20 text-primary hover:text-primary hover:bg-primary/30 border-primary/50' : ''}`} onClick={handleExport}>
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
                            <CardContent className="pt-6 z-10 relative">
                                <div className="rounded-xl border border-border/50 overflow-hidden shadow-sm bg-background/50 backdrop-blur-sm">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-muted/40 text-muted-foreground uppercase tracking-wider text-[10px] font-bold border-b border-border/50">
                                            <tr>
                                                <th className="px-4 py-3.5 text-center w-16">Rank</th>
                                                <th className="px-4 py-3.5">Domain</th>
                                                <th className="px-4 py-3.5 text-right">Coverage Score</th>
                                                <th className="px-4 py-3.5 text-right">Gap vs Baseline</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border/30">
                                            {result.competitors.map((comp, i) => (
                                                <motion.tr
                                                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + (i * 0.1) }}
                                                    key={i}
                                                    className={`hover:bg-muted/30 transition-colors ${comp.rank === 'You' ? 'bg-primary/10 border-t-2 border-primary/30 relative shadow-[inset_0_0_15px_rgba(var(--primary),0.05)]' : ''}`}
                                                >
                                                    {comp.rank === 'You' && <td className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></td>}
                                                    <td className="px-4 py-4 text-center font-bold text-foreground/80">
                                                        {comp.rank === 1 ? <Trophy className="w-5 h-5 mx-auto text-amber-500 drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]" /> : comp.rank}
                                                    </td>
                                                    <td className={`px-4 py-4 tracking-wide ${comp.rank === 'You' ? 'font-black text-primary' : 'font-semibold text-foreground/90'}`}>
                                                        {comp.domain}
                                                    </td>
                                                    <td className="px-4 py-4 text-right">
                                                        <div className="flex items-center justify-end">
                                                            <div className="w-16 h-1.5 bg-muted/50 rounded-full overflow-hidden mr-3 hidden sm:block">
                                                                <div className={`h-full rounded-full ${comp.rank === 'You' ? 'bg-primary' : 'bg-foreground/40'}`} style={{ width: `${comp.entityCoverage}%` }}></div>
                                                            </div>
                                                            <span className="font-bold text-foreground/90">{comp.entityCoverage}<span className="text-muted-foreground text-xs font-medium ml-0.5">/100</span></span>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-right">
                                                        {comp.status === 'loss' && (
                                                            <span className="inline-flex items-center text-destructive bg-destructive/10 px-2 py-1 rounded text-xs font-black tracking-widest uppercase shadow-sm border border-destructive/20">
                                                                <ArrowUpRight className="w-3 h-3 mr-1 translate-y-[0.5px]" />
                                                                {comp.gap}
                                                            </span>
                                                        )}
                                                        {comp.status === 'win' && (
                                                            <span className="inline-flex items-center text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded text-xs font-black tracking-widest uppercase shadow-sm border border-emerald-500/20">
                                                                <ArrowDownRight className="w-3 h-3 mr-1 translate-y-[0.5px]" />
                                                                {comp.gap}
                                                            </span>
                                                        )}
                                                        {comp.status === 'neutral' && (
                                                            <span className="inline-flex items-center text-primary bg-primary/10 px-2 py-1 rounded text-xs font-black tracking-widest uppercase shadow-sm border border-primary/20">
                                                                <Minus className="w-3 h-3 mr-1 translate-y-[0.5px]" />
                                                                Baseline
                                                            </span>
                                                        )}
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Actionable Gaps Area */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-1"
                    >
                        <Card className="h-full bg-card/40 border-border/40 shadow-sm flex flex-col relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl transform translate-x-12 -translate-y-12 transition-all duration-700 group-hover:bg-amber-500/10"></div>
                            <CardHeader className="pb-4 border-b border-border/20 bg-muted/20 z-10 relative">
                                <CardTitle className="text-lg flex items-center">
                                    <Trophy className="w-5 h-5 mr-2 text-amber-500" />
                                    Actionable Gaps
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6 flex-1 flex flex-col bg-background/30 z-10 relative">
                                <div className="space-y-4 flex-1">
                                    {result.actionableGaps.map((gap, i) => (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + (i * 0.1) }}
                                            key={i} className="flex gap-4 items-start pb-4 border-b border-border/30 last:border-0 last:pb-0"
                                        >
                                            <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center justify-center text-xs font-black shrink-0 mt-0.5 shadow-sm">
                                                {i + 1}
                                            </div>
                                            <p className="text-sm text-foreground/80 leading-snug font-medium">
                                                {gap}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>

                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
                                    <Button className="w-full mt-8 bg-background border-border/50 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all shadow-sm" variant="outline">
                                        Add to Remediation Queue
                                    </Button>
                                </motion.div>
                            </CardContent>
                        </Card>
                    </motion.div>

                </motion.div>
            )}
        </div>
    )
}
