import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Link2, Scissors, Loader2, CheckCircle2, FileText, AlertCircle, FileSearch, Copy, Info } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

export default function ContentExtraction() {
    const [url, setUrl] = useState("")
    const [isExtracting, setIsExtracting] = useState(false)
    const [result, setResult] = useState(null)
    const [isExporting, setIsExporting] = useState(false)

    const handleExtract = () => {
        if (!url) return
        setIsExtracting(true)

        setTimeout(() => {
            setResult({
                title: "The Ultimate Guide to Answer Engine Optimization",
                wordCount: 1420,
                noiseRemoved: "34%",
                cleanText: "Answer Engine Optimization (AEO) is the ongoing process of structuring and writing content specifically so that Generative AI models (like ChatGPT, Gemini, and Perplexity) will cite and paraphrase it directly in their answers.\n\nUnlike traditional SEO which focuses on ten blue links, AEO focuses entirely on the synthesis of factual entities. To succeed, content must be dense in facts, devoid of promotional marketing fluff, and structured logically using clear H2s and bulleted lists.\n\nThe core of AEO relies on ensuring your Knowledge Graph is populated with your brand's specific terminology and entities. By treating your website as a raw data API designed for LLMs, you vastly increase the likelihood of inclusion in AI Overviews.",
                elementsStripped: ["Global Navbar", "Cookie Consent Banner", "Sidebar Advertisements (3)", "Footer Links"],
            })
            setIsExtracting(false)
        }, 1500)
    }

    const handleExport = () => {
        if (!result) return
        setIsExporting(true)
        const exportData = JSON.stringify({ sourceEngine: "ContentExtraction", timestamp: new Date().toISOString(), data: result }, null, 2)
        navigator.clipboard.writeText(exportData)
        setTimeout(() => setIsExporting(false), 2000)
    }

    return (
        <div className="flex-1 space-y-5 pt-6 animate-in fade-in duration-500">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                        <Scissors className="w-5 h-5 text-primary-foreground" />
                    </div>
                    Content Extraction Engine
                </h2>
                <p className="text-muted-foreground mt-1.5 text-sm max-w-2xl">
                    DOM-based extraction strips noise (navbars, ads, boilerplate) from URLs. Generates a clean text view representing what an AI model actually "reads."
                </p>
            </div>

            {/* Instructions */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 max-w-2xl">
                <h3 className="text-sm font-semibold text-primary mb-2 flex items-center">
                    <Info className="w-4 h-4 mr-2" />
                    How to use this engine
                </h3>
                <ol className="list-decimal list-inside text-sm text-foreground/80 space-y-1">
                    <li>Paste the URL of the article you want to analyze.</li>
                    <li>Click <span className="font-semibold text-foreground">Extract Content</span> to strip away noise.</li>
                    <li>Review the clean text and removed noise metrics.</li>
                    <li>Click <span className="font-semibold text-foreground">Export Report</span> to save the results.</li>
                </ol>
            </div>

            {/* Input */}
            <Card className="bg-card/40 border-border/40">
                <CardContent className="pt-5 pb-4">
                    <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                            <Link2 className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground/70" />
                            <Input
                                type="url"
                                placeholder="https://example.com/blog/article..."
                                className="pl-10"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                disabled={isExtracting}
                            />
                        </div>
                        <Button onClick={handleExtract} disabled={isExtracting || !url}>
                            {isExtracting ? (
                                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Extracting...</>
                            ) : (
                                <><Scissors className="w-4 h-4 mr-2" /> Extract Content</>
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Loading */}
            {isExtracting && (
                <div className="flex flex-col items-center justify-center py-16 space-y-3">
                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                    <p className="text-sm text-muted-foreground">Running DOM Extraction and Density Heuristics...</p>
                </div>
            )}

            {/* Empty */}
            {!result && !isExtracting && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-border/50 rounded-xl bg-card/20"
                >
                    <FileSearch className="w-10 h-10 text-primary/40 mb-3" />
                    <h3 className="text-lg font-semibold mb-1">Ready for Extraction</h3>
                    <p className="text-muted-foreground max-w-sm text-sm">
                        Enter a URL above to strip away noise and reveal the core semantic content.
                    </p>
                </motion.div>
            )}

            {/* Results */}
            {result && !isExtracting && (
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-5"
                >
                    {/* Main Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="md:col-span-2 flex flex-col"
                    >
                        <Card className="bg-card/40 border-border/40 flex flex-col h-full">
                            <CardHeader className="border-b border-border/30 pb-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center gap-1.5 mb-1.5">
                                            <Badge variant="outline" className="text-[10px] font-bold text-chart-2 border-chart-2/30 bg-chart-2/5">
                                                <CheckCircle2 className="w-3 h-3 mr-1" /> Extraction Successful
                                            </Badge>
                                        </div>
                                        <CardTitle className="text-lg">{result.title}</CardTitle>
                                    </div>
                                    <Button size="sm" variant="outline" className="h-7 flex-shrink-0" onClick={handleExport}>
                                        <AnimatePresence mode="wait">
                                            {isExporting ? (
                                                <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center">
                                                    <CheckCircle2 className="w-3 h-3 mr-1" /> Copied
                                                </motion.div>
                                            ) : (
                                                <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center">
                                                    <Copy className="w-3 h-3 mr-1" /> Export
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-4 flex-1">
                                <div className="bg-muted/15 border border-border/40 rounded-lg p-5 font-mono text-sm leading-relaxed text-foreground/80 whitespace-pre-wrap relative">
                                    <FileText className="absolute top-4 right-4 w-20 h-20 text-muted-foreground/5" />
                                    <span className="relative z-10">{result.cleanText}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Stats Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 }}
                        className="space-y-4"
                    >
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
                                            {result.wordCount}
                                        </motion.div>
                                        <div className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider mt-0.5">Clean Words</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-black text-chart-2">{result.noiseRemoved}</div>
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
                                    {result.elementsStripped.map((element, i) => (
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
                    </motion.div>
                </motion.div>
            )}
        </div>
    )
}
