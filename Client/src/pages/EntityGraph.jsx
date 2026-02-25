import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
        <div className="flex-1 space-y-6 pt-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Entity & Knowledge Graph Engine</h2>
            </div>

            <p className="text-muted-foreground w-full max-w-3xl">
                Extracts Named Entities (NER) and maps relationships to build a lightweight content knowledge graph. AI models heavily rely on explicit entity definitions to ground their answers in fact.
            </p>

            {/* Instructions */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mt-2 max-w-3xl">
                <h3 className="text-sm font-semibold text-primary mb-2 flex items-center">
                    <Info className="w-4 h-4 mr-2" />
                    How to use this engine
                </h3>
                <ol className="list-decimal list-inside text-sm text-foreground/80 space-y-1">
                    <li>Paste a block of text into the input field.</li>
                    <li>Click <span className="font-semibold text-foreground">Extract Entities</span> to identify key concepts, products, and metrics.</li>
                    <li>Explore the Named Entities list and analyze the visual Concept Architecture graph.</li>
                    <li>Click <span className="font-semibold text-foreground">Export Report</span> to save the discovered relationship data.</li>
                </ol>
            </div>

            {/* Input Section */}
            <Card className="bg-card/40 border-border/40 shadow-sm mt-4">
                <CardContent className="pt-6 space-y-4">
                    <div className="space-y-2">
                        <textarea
                            placeholder="Paste content here to extract entities and map node relationships..."
                            className="w-full h-24 bg-background/50 border border-border/50 rounded-md p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all resize-none"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            disabled={isGenerating}
                        />
                    </div>

                    <div className="flex justify-end pt-2">
                        <Button
                            onClick={handleGenerate}
                            disabled={isGenerating || !content}
                            className="px-6"
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Building Graph...
                                </>
                            ) : (
                                <>
                                    <Network className="w-4 h-4 mr-2" />
                                    Extract Entities
                                </>
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Results Section */}
            {isGenerating && (
                <div className="flex flex-col items-center justify-center py-24 space-y-4">
                    <Loader2 className="w-12 h-12 text-primary animate-spin" />
                    <p className="text-lg font-medium text-muted-foreground animate-pulse">Extracting Entities and Mapping Knowledge Graph...</p>
                </div>
            )}

            {!result && !isGenerating && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-border/50 rounded-xl bg-card/20"
                >
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <FileSearch2 className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Ready for Extraction</h3>
                    <p className="text-muted-foreground max-w-md">
                        Paste content above to extract Named Entities and visualize their relationships in a mock graph.
                    </p>
                </motion.div>
            )}

            {result && !isGenerating && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, staggerChildren: 0.1 }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                >

                    {/* Entity List Area */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-1"
                    >
                        <Card className="bg-card/40 border-border/40 shadow-sm h-full flex flex-col relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl transform translate-x-12 -translate-y-12 transition-all duration-700 group-hover:bg-primary/10"></div>
                            <CardHeader className="pb-4 border-b border-border/20 z-10 flex flex-row items-center justify-between">
                                <CardTitle className="text-lg flex items-center">
                                    <Tags className="w-5 h-5 mr-2 text-primary" />
                                    Named Entities
                                </CardTitle>
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
                            </CardHeader>
                            <CardContent className="pt-6 flex-1 flex flex-col z-10">
                                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/20">
                                    <div className="text-center">
                                        <motion.div
                                            initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}
                                            className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70"
                                        >
                                            {result.entitiesFound}
                                        </motion.div>
                                        <div className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground mt-1">Found</div>
                                    </div>
                                    <div className="text-center">
                                        <motion.div
                                            initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}
                                            className="text-3xl font-bold tracking-tight text-primary"
                                        >
                                            {result.relationships}
                                        </motion.div>
                                        <div className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground mt-1">Relations</div>
                                    </div>
                                </div>

                                <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                                    {result.topEntities.map((entity, i) => (
                                        <motion.div
                                            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + (i * 0.1) }}
                                            key={i} className="flex flex-col p-3.5 rounded-lg bg-background/50 border border-border/40 hover:border-primary/30 transition-colors shadow-sm"
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="font-semibold text-sm leading-tight pr-2">{entity.name}</span>
                                                <span className="text-[9px] bg-primary/10 text-primary px-1.5 py-0.5 rounded uppercase font-bold tracking-widest whitespace-nowrap">{entity.type}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="text-muted-foreground font-medium">Confidence Score</span>
                                                <span className="font-semibold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">{entity.confidence}</span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Graph Visualization Area */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-2 flex flex-col h-full"
                    >
                        <Card className="bg-card/40 border-border/40 shadow-sm flex flex-col h-full overflow-hidden relative group">
                            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                            <CardHeader className="pb-4 border-b border-border/40 bg-muted/20 z-10">
                                <div className="flex justify-between items-center">
                                    <CardTitle className="text-lg flex items-center">
                                        <Workflow className="w-5 h-5 mr-2 text-primary" />
                                        Concept Architecture
                                    </CardTitle>
                                    <Button variant="outline" size="sm" className="h-7 text-xs px-3 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
                                        <ExternalLink className="w-3 h-3 mr-1.5" />
                                        Export JSON-LD
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1 p-0 min-h-[400px] relative bg-background/20 hidden md:flex items-center justify-center">
                                {/* Abstract Mock Graph Representation */}
                                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>

                                <svg className="w-full h-full absolute inset-0 z-0 pointer-events-none">
                                    <motion.line
                                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                                        x1="50%" y1="50%" x2="20%" y2="30%" stroke="currentColor" strokeWidth="2" className="text-primary/40"
                                    />
                                    <motion.line
                                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.7, ease: "easeInOut" }}
                                        x1="50%" y1="50%" x2="80%" y2="30%" stroke="currentColor" strokeWidth="2" className="text-primary/40"
                                    />
                                    <motion.line
                                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 1, ease: "linear" }}
                                        x1="50%" y1="50%" x2="50%" y2="80%" stroke="currentColor" strokeWidth="1" strokeDasharray="4" className="text-muted-foreground/40"
                                    />
                                </svg>

                                {/* Simulated Nodes */}
                                <motion.div
                                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5, delay: 0.8 }}
                                    className="absolute top-[30%] left-[20%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center hover:scale-110 transition-transform cursor-pointer"
                                    title="Reference: LLMs"
                                >
                                    <div className="w-12 h-12 rounded-full bg-background border-2 border-primary/60 flex items-center justify-center shadow-[0_0_15px_rgba(var(--primary),0.2)] z-10"><span className="text-xs font-semibold text-primary">LLMs</span></div>
                                </motion.div>

                                <motion.div
                                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5, delay: 1.0 }}
                                    className="absolute top-[30%] left-[80%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center hover:scale-110 transition-transform cursor-pointer"
                                    title="Reference: Google"
                                >
                                    <div className="w-12 h-12 rounded-full bg-background border-2 border-primary/60 flex items-center justify-center shadow-[0_0_15px_rgba(var(--primary),0.2)] z-10"><span className="text-xs font-semibold text-primary">Google</span></div>
                                </motion.div>

                                <motion.div
                                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5, delay: 1.3 }}
                                    className="absolute top-[80%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center hover:scale-110 transition-transform cursor-pointer"
                                    title="Foundational Knowledge Node"
                                >
                                    <div className="w-14 h-14 rounded-full bg-background border border-muted-foreground/30 flex items-center justify-center shadow-lg z-10 text-muted-foreground"><span className="text-xs font-semibold">Nodes</span></div>
                                </motion.div>

                                {/* Center Node */}
                                <motion.div
                                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.6, delay: 0.5 }}
                                    className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 cursor-pointer group/center"
                                >
                                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-[0_0_30px_rgba(var(--primary),0.4)] text-primary-foreground border-4 border-background group-hover/center:scale-105 transition-transform duration-300">
                                        <span className="font-bold tracking-tight text-xl">AEO</span>
                                    </div>
                                    <div className="mt-3 text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full backdrop-blur-md shadow-sm">Core Topic</div>
                                </motion.div>

                                <div className="absolute inset-0 flex md:hidden items-center justify-center p-6 text-center text-muted-foreground">
                                    Graph visualization is optimized for larger screens. Rotate your device or view on desktop.
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                </motion.div>
            )}
        </div>
    )
}
