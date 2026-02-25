import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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

        // Simulate API delay
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
        <div className="flex-1 space-y-6 pt-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Content Extraction Engine</h2>
            </div>

            <p className="text-muted-foreground w-full max-w-3xl">
                DOM-based extraction and density heuristics strip noise (navbars, ads, boilerplate) from URLs. Provide a raw URL to generate a clean, stable text view representing what an AI model actually "reads."
            </p>

            {/* Instructions */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mt-2 max-w-3xl">
                <h3 className="text-sm font-semibold text-primary mb-2 flex items-center">
                    <Info className="w-4 h-4 mr-2" />
                    How to use this engine
                </h3>
                <ol className="list-decimal list-inside text-sm text-foreground/80 space-y-1">
                    <li>Paste the URL of the article you want to analyze.</li>
                    <li>Click <span className="font-semibold text-foreground">Extract Content</span> to strip away noise.</li>
                    <li>Review the clean text and removed noise metrics.</li>
                    <li>Click <span className="font-semibold text-foreground">Export Report</span> to save these results for the AI Strategy Agent.</li>
                </ol>
            </div>

            {/* Input Section */}
            <Card className="bg-card/40 border-border/40 shadow-sm mt-4">
                <CardContent className="pt-6">
                    <div className="flex items-center space-x-2">
                        <div className="relative flex-1">
                            <Link2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground/70" />
                            <input
                                type="url"
                                placeholder="https://example.com/blog/article..."
                                className="w-full bg-background/50 border border-border/50 rounded-md py-2.5 text-sm pl-10 pr-3 focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                disabled={isExtracting}
                            />
                        </div>
                        <Button
                            onClick={handleExtract}
                            disabled={isExtracting || !url}
                            className="px-6"
                        >
                            {isExtracting ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Extracting...
                                </>
                            ) : (
                                <>
                                    <Scissors className="w-4 h-4 mr-2" />
                                    Extract Content
                                </>
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Results Section */}
            {isExtracting && (
                <div className="flex flex-col items-center justify-center py-24 space-y-4">
                    <Loader2 className="w-12 h-12 text-primary animate-spin" />
                    <p className="text-lg font-medium text-muted-foreground animate-pulse">Running DOM Extraction and Density Heuristics...</p>
                </div>
            )}

            {!result && !isExtracting && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-border/50 rounded-xl bg-card/20"
                >
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <FileSearch className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Ready for Extraction</h3>
                    <p className="text-muted-foreground max-w-md">
                        Enter a URL above to strip away navigation bars, advertisements, and boilerplate noise to reveal the core semantic content.
                    </p>
                </motion.div>
            )}

            {result && !isExtracting && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, staggerChildren: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >

                    {/* Main Content Area */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="md:col-span-2 flex flex-col"
                    >
                        <Card className="bg-card/40 border-border/40 shadow-sm flex flex-col h-full overflow-hidden relative group">
                            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500/0 via-emerald-500/50 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                            <CardHeader className="border-b border-border/40 bg-muted/20 pb-4">
                                <div className="flex justify-between items-start">
                                    <div className="flex flex-col">
                                        <div className="flex items-center space-x-2 text-emerald-500 mb-1">
                                            <CheckCircle2 className="w-4 h-4" />
                                            <span className="text-xs font-semibold tracking-wide uppercase">Extraction Successful</span>
                                        </div>
                                        <CardTitle className="text-xl sm:text-2xl pt-1">
                                            {result.title}
                                        </CardTitle>
                                    </div>
                                    <Button size="sm" variant="outline" className={`h-8 transition-all ${isExporting ? 'bg-emerald-500/10 text-emerald-500 hover:text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/50' : ''}`} onClick={handleExport}>
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
                            <CardContent className="pt-6 flex-1">
                                <div className="bg-background/40 border border-border/50 rounded-lg p-6 h-full font-mono text-sm leading-relaxed text-foreground/80 whitespace-pre-wrap relative overflow-hidden group-hover:border-primary/20 transition-colors">
                                    <div className="absolute top-0 right-0 p-4 opacity-5">
                                        <FileText className="w-32 h-32" />
                                    </div>
                                    <span className="relative z-10">{result.cleanText}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Stats & Info Area */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-6"
                    >
                        <Card className="bg-card/40 border-border/40 shadow-sm overflow-hidden relative">
                            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/50"></div>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                                    Volume Metrics
                                    <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between items-end mb-4">
                                    <div>
                                        <motion.div
                                            initial={{ scale: 0.5 }}
                                            animate={{ scale: 1 }}
                                            className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70"
                                        >
                                            {result.wordCount}
                                        </motion.div>
                                        <div className="text-xs text-muted-foreground mt-1 font-medium tracking-wide uppercase">Clean Word Count</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold tracking-tight text-emerald-500">{result.noiseRemoved}</div>
                                        <div className="text-xs text-muted-foreground mt-1 text-right font-medium tracking-wide uppercase">Noise Removed</div>
                                    </div>
                                </div>

                                {/* Visual Progress Bar imitating 'clean vs noise' */}
                                <div className="w-full h-3 bg-destructive/20 rounded-full mt-4 overflow-hidden flex shadow-inner">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: '66%' }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                        className="h-full bg-emerald-500"
                                    ></motion.div>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: '34%' }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                        className="h-full bg-destructive/40"
                                    ></motion.div>
                                </div>
                                <div className="flex justify-between text-[10px] text-muted-foreground mt-2 uppercase font-semibold">
                                    <span>Retained Content</span>
                                    <span>Stripped Bloat</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-card/40 border-border/40 shadow-sm overflow-hidden relative">
                            <div className="absolute top-0 left-0 w-1 h-full bg-destructive/50"></div>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                                    <AlertCircle className="w-4 h-4 mr-2" />
                                    Elements Stripped
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 mt-2">
                                    {result.elementsStripped.map((element, index) => (
                                        <motion.li
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.6 + (index * 0.1) }}
                                            key={index}
                                            className="flex items-center text-sm text-foreground/80 bg-background/50 border border-border/40 p-2.5 rounded-md hover:bg-muted/50 transition-colors"
                                        >
                                            <Scissors className="w-3.5 h-3.5 text-destructive mr-2 flex-shrink-0" />
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
