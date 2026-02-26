import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Network, Loader2, Workflow, Tags, ExternalLink, FileSearch2, CheckCircle2, Copy, Info } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

export default function EntityGraph() {
    const [content, setContent] = useState("")
    const [isGenerating, setIsGenerating] = useState(false)
    const [result, setResult] = useState(null)
    const [isExporting, setIsExporting] = useState(false)

    const handleGenerate = () => {
        if (!content) return
        setIsGenerating(true)

        setTimeout(() => {
            setResult({
                entitiesFound: 14,
                relationships: 8,
                topEntities: [
                    { name: "Answer Engine Optimization", type: "Concept", confidence: "98%" },
                    { name: "Google AI Overviews", type: "Product", confidence: "95%" },
                    { name: "Knowledge Graph", type: "Technology", confidence: "91%" },
                    { name: "Large Language Models", type: "Concept", confidence: "88%" },
                    { name: "Brand Authority", type: "Metric", confidence: "82%" },
                ],
                graphNodes: [
                    { id: 1, label: "AEO", x: 50, y: 50 },
                    { id: 2, label: "LLMs", x: 20, y: 30 },
                    { id: 3, label: "Google", x: 80, y: 30 },
                    { id: 4, label: "Knowledge", x: 50, y: 80 },
                ]
            })
            setIsGenerating(false)
        }, 2000)
    }

    const handleExport = () => {
        if (!result) return

        setIsExporting(true)
        const exportData = JSON.stringify({ sourceEngine: "EntityGraph", timestamp: new Date().toISOString(), data: result }, null, 2)
        navigator.clipboard.writeText(exportData)

        setTimeout(() => setIsExporting(false), 2000)
    }

    return (
        <div className="flex-1 space-y-5 pt-6 animate-in fade-in duration-500">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                        <Network className="w-5 h-5 text-primary-foreground" />
                    </div>
                    Entity & Knowledge Graph
                </h2>
                <p className="text-muted-foreground mt-1.5 text-sm max-w-2xl">
                    Extracts Named Entities (NER) and maps relationships to build a lightweight content knowledge graph. AI models rely on explicit entity definitions to ground their answers.
                </p>
            </div>

            {/* Instructions */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 max-w-2xl">
                <h3 className="text-sm font-semibold text-primary mb-2 flex items-center">
                    <Info className="w-4 h-4 mr-2" />
                    How to use this engine
                </h3>
                <ol className="list-decimal list-inside text-sm text-foreground/80 space-y-1">
                    <li>Paste a block of text into the input field.</li>
                    <li>Click <span className="font-semibold text-foreground">Extract Entities</span> to identify key concepts, products, and metrics.</li>
                    <li>Explore the Named Entities list and the Concept Architecture graph.</li>
                    <li>Click <span className="font-semibold text-foreground">Export Report</span> to save the relationship data.</li>
                </ol>
            </div>

            {/* Input */}
            <Card className="bg-card/40 border-border/40">
                <CardContent className="pt-5 pb-4 space-y-3">
                    <textarea
                        placeholder="Paste content here to extract entities and map relationships..."
                        className="w-full h-24 bg-background/50 border border-border/50 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        disabled={isGenerating}
                    />
                    <div className="flex justify-end">
                        <Button onClick={handleGenerate} disabled={isGenerating || !content}>
                            {isGenerating ? (
                                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Building Graph...</>
                            ) : (
                                <><Network className="w-4 h-4 mr-2" /> Extract Entities</>
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Loading */}
            {isGenerating && (
                <div className="flex flex-col items-center justify-center py-16 space-y-3">
                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                    <p className="text-sm text-muted-foreground">Extracting Entities and Mapping Knowledge Graph...</p>
                </div>
            )}

            {/* Empty State */}
            {!result && !isGenerating && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-border/50 rounded-xl bg-card/20"
                >
                    <FileSearch2 className="w-10 h-10 text-primary/40 mb-3" />
                    <h3 className="text-lg font-semibold mb-1">Ready for Extraction</h3>
                    <p className="text-muted-foreground max-w-md text-sm">
                        Paste content above to extract Named Entities and visualize their relationships.
                    </p>
                </motion.div>
            )}

            {/* Results */}
            {result && !isGenerating && (
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-5"
                >
                    {/* Entity List */}
                    <motion.div
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-1"
                    >
                        <Card className="bg-card/40 border-border/40 h-full flex flex-col">
                            <CardHeader className="pb-3 flex flex-row items-center justify-between">
                                <CardTitle className="text-base flex items-center gap-2">
                                    <Tags className="w-4 h-4 text-primary" />
                                    Named Entities
                                </CardTitle>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-7 w-7"
                                    onClick={handleExport}
                                >
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
                            </CardHeader>

                            <CardContent className="pt-0 flex-1 flex flex-col">
                                {/* Stats */}
                                <div className="flex items-center gap-6 mb-4 pb-3 border-b border-border/30">
                                    <div className="text-center">
                                        <motion.div
                                            initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ duration: 0.4 }}
                                            className="text-2xl font-black text-foreground"
                                        >
                                            {result.entitiesFound}
                                        </motion.div>
                                        <div className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground">Found</div>
                                    </div>
                                    <Separator orientation="vertical" className="h-8" />
                                    <div className="text-center">
                                        <motion.div
                                            initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ duration: 0.4, delay: 0.1 }}
                                            className="text-2xl font-black text-primary"
                                        >
                                            {result.relationships}
                                        </motion.div>
                                        <div className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground">Relations</div>
                                    </div>
                                </div>

                                {/* Entity List */}
                                <div className="space-y-2 flex-1 overflow-y-auto">
                                    {result.topEntities.map((entity, i) => (
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
                    </motion.div>

                    {/* Graph Visualization */}
                    <motion.div
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 }}
                        className="lg:col-span-2 flex flex-col"
                    >
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
                    </motion.div>
                </motion.div>
            )}
        </div>
    )
}
