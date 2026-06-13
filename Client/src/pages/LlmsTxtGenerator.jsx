import React, { useState, useMemo, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
    FileText, Link2, Plus, Trash2, ChevronDown, ChevronRight,
    Copy, Download, RotateCcw, CheckCircle2, Info, Loader2,
    Globe, Tag, Layers, Zap, Search, Pencil
} from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { useAuth } from "@/contexts/AuthContext"
import { llmsApi, pollJob } from "@/services/api"
// ─── Helpers ─────────────────────────────────────────────────────────
const createSection = (title = "", links = [{ label: "", url: "" }]) => ({
    id: crypto.randomUUID(),
    title,
    links,
    isOpen: true,
})

// ─── Crawl progress steps ────────────────────────────────────────────
const CRAWL_STEPS = [
    { label: "Connecting to site...", duration: 800 },
    { label: "Fetching page metadata...", duration: 1000 },
    { label: "Discovering internal links...", duration: 1200 },
    { label: "Analyzing content structure...", duration: 1000 },
    { label: "Generating llms.txt with AI...", duration: 1500 },
]

// ─── Mock data generator based on URL ────────────────────────────────
function generateMockData(url) {
    let hostname = ""
    try {
        hostname = new URL(url.startsWith("http") ? url : `https://${url}`).hostname
    } catch {
        hostname = url.replace(/^(https?:\/\/)?(www\.)?/, "").split("/")[0]
    }

    const siteName = hostname
        .replace(/^www\./, "")
        .split(".")[0]
        .replace(/-/g, " ")
        .replace(/\b\w/g, c => c.toUpperCase())

    const cleanDomain = hostname.replace(/^www\./, "")
    const baseUrl = `https://${hostname}`

    return {
        brandName: siteName,
        domain: hostname,
        tagline: `${siteName} — Empowering users with innovative solutions and comprehensive resources.`,
        description: `${siteName} is a digital platform that provides valuable content, tools, and resources for its audience. The website serves as a comprehensive hub for information, offering guides, documentation, and interactive features. Users, including professionals and enthusiasts, can leverage the platform to discover insights, access tools, and stay up-to-date with industry trends.\n\nLLMs should understand that this is a professional website primarily offering informational content, product documentation, and industry resources rather than interactive services or e-commerce.`,
        sections: [
            createSection("Main Pages", [
                { label: `${siteName} Home`, url: baseUrl },
                { label: "About Us", url: `${baseUrl}/about` },
                { label: "Contact", url: `${baseUrl}/contact` },
            ]),
            createSection("Documentation", [
                { label: "Getting Started Guide", url: `${baseUrl}/docs/getting-started` },
                { label: "API Reference", url: `${baseUrl}/docs/api` },
                { label: "FAQ", url: `${baseUrl}/docs/faq` },
            ]),
            createSection("Blog", [
                { label: "Latest Articles", url: `${baseUrl}/blog` },
                { label: "Industry Insights", url: `${baseUrl}/blog/insights` },
            ]),
            createSection("Legal", [
                { label: "Privacy Policy", url: `${baseUrl}/privacy` },
                { label: "Terms of Service", url: `${baseUrl}/terms` },
            ]),
        ],
    }
}

// ═══════════════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════

export default function LlmsTxtGenerator() {
    const { getToken } = useAuth()
    // ─── Phase State ──────────────────────────────────────────
    const [phase, setPhase] = useState("input") // "input" | "crawling" | "editing" | "error"
    const [url, setUrl] = useState("")
    const [crawlStep, setCrawlStep] = useState(0)
    const [errorMsg, setErrorMsg] = useState(null)

    // ─── Form State (editable after crawl) ───────────────────────────
    const [brandName, setBrandName] = useState("")
    const [domain, setDomain] = useState("")
    const [tagline, setTagline] = useState("")
    const [description, setDescription] = useState("")
    const [sections, setSections] = useState([])

    // ─── UI State ────────────────────────────────────────────────────
    const [copied, setCopied] = useState(false)

    // ─── Computed llms.txt output ────────────────────────────────────
    const llmsTxt = useMemo(() => {
        let output = ""
        if (brandName) output += `# ${brandName}\n\n`
        if (tagline) output += `> ${tagline}\n\n`
        if (description) output += `${description}\n\n`
        sections.forEach((section) => {
            if (section.title) {
                output += `## ${section.title}\n\n`
                section.links.forEach((link) => {
                    if (link.label && link.url) {
                        output += `- [${link.label}](${link.url})\n`
                    } else if (link.label) {
                        output += `- ${link.label}\n`
                    }
                })
                if (section.links.some(l => l.label || l.url)) output += "\n"
            }
        })
        return output.trim()
    }, [brandName, tagline, description, sections])

    // ─── Crawl & Generate ────────────────────────────────────────────
    const handleGenerate = useCallback(async () => {
        if (!url.trim()) return

        setPhase("crawling")
        setCrawlStep(0)
        setErrorMsg(null)

        // Keep mock UI steps animating
        let totalDelay = 0
        CRAWL_STEPS.forEach((step, idx) => {
            totalDelay += step.duration
            setTimeout(() => setCrawlStep(idx + 1), totalDelay)
        })

        try {
            const token = await getToken()
            const { job } = await llmsApi.start(token, url)
            const jobId = job._id

            const cancel = pollJob(
                async () => {
                    const freshToken = await getToken()
                    return llmsApi.getById(freshToken, jobId)
                },
                (pollData) => {
                    const status = pollData.status

                    if (status === 'Crawling') setCrawlStep(1)
                    if (status === 'Generating') setCrawlStep(3)

                    if (status === 'Completed') {
                        cancel()
                        const results = pollData.results
                        if (results) {
                            setBrandName(results.brandName || "")
                            setDomain(results.domain || url)
                            setTagline(results.tagline || "")
                            setDescription(results.description || "")
                            setSections(results.sections || [])
                        }
                        setPhase("editing")
                    } else if (status === 'Failed') {
                        cancel()
                        setErrorMsg(pollData.error || "Worker failed to generate llms.txt")
                        setPhase("error")
                    }
                },
                3000
            )
        } catch (e) {
            setErrorMsg(e.message)
            setPhase("error")
        }
    }, [url, getToken])

    // ─── Section Handlers ────────────────────────────────────────────
    const addSection = useCallback(() => {
        setSections(prev => [...prev, createSection()])
    }, [])

    const removeSection = useCallback((id) => {
        setSections(prev => prev.filter(s => s.id !== id))
    }, [])

    const toggleSection = useCallback((id) => {
        setSections(prev => prev.map(s => s.id === id ? { ...s, isOpen: !s.isOpen } : s))
    }, [])

    const updateSectionTitle = useCallback((id, title) => {
        setSections(prev => prev.map(s => s.id === id ? { ...s, title } : s))
    }, [])

    const addLink = useCallback((sectionId) => {
        setSections(prev => prev.map(s =>
            s.id === sectionId ? { ...s, links: [...s.links, { label: "", url: "" }] } : s
        ))
    }, [])

    const updateLink = useCallback((sectionId, linkIndex, field, value) => {
        setSections(prev => prev.map(s =>
            s.id === sectionId
                ? { ...s, links: s.links.map((l, i) => i === linkIndex ? { ...l, [field]: value } : l) }
                : s
        ))
    }, [])

    const removeLink = useCallback((sectionId, linkIndex) => {
        setSections(prev => prev.map(s =>
            s.id === sectionId
                ? { ...s, links: s.links.filter((_, i) => i !== linkIndex) }
                : s
        ))
    }, [])

    // ─── Actions ─────────────────────────────────────────────────────
    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(llmsTxt)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }, [llmsTxt])

    const handleDownload = useCallback(() => {
        const blob = new Blob([llmsTxt], { type: "text/plain" })
        const dlUrl = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = dlUrl
        a.download = "llms.txt"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(dlUrl)
    }, [llmsTxt])

    const handleRestart = useCallback(() => {
        setUrl("")
        setBrandName("")
        setDomain("")
        setTagline("")
        setDescription("")
        setSections([])
        setPhase("input")
        setCrawlStep(0)
    }, [])

    // ─── Stats ───────────────────────────────────────────────────────
    const sectionCount = sections.filter(s => s.title).length
    const linkCount = sections.reduce((acc, s) => acc + s.links.filter(l => l.label && l.url).length, 0)

    // ═════════════════════════════════════════════════════════════════
    //  RENDER
    // ═════════════════════════════════════════════════════════════════
    return (
        <div className="flex-1 space-y-5 pt-6 animate-in fade-in duration-500">
            {/* ── Header ─────────────────────────────────────────────── */}
            <div>
                <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary-foreground" />
                    </div>
                    LLMs.txt Generator
                </h2>
                <p className="text-muted-foreground mt-1.5 text-sm max-w-2xl">
                    Paste your website URL and AIVO will crawl your site, analyze metadata and internal links, then auto-generate a structured{" "}
                    <code className="text-primary font-mono text-xs bg-primary/10 px-1.5 py-0.5 rounded">llms.txt</code>{" "}
                    file so AI models can accurately understand, cite, and summarize your brand.
                </p>
            </div>

            {/* ── Instructions ───────────────────────────────────────── */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 max-w-2xl">
                <h3 className="text-sm font-semibold text-primary mb-2 flex items-center">
                    <Info className="w-4 h-4 mr-2" />
                    How it works
                </h3>
                <ol className="list-decimal list-inside text-sm text-foreground/80 space-y-1">
                    <li>Paste your <span className="font-semibold text-foreground">website URL</span> and click <span className="font-semibold text-foreground">Generate</span>.</li>
                    <li>AIVO crawls your site, discovers pages, and <span className="font-semibold text-foreground">auto-fills</span> brand info, tagline, description, and sections.</li>
                    <li><span className="font-semibold text-foreground">Review and edit</span> the generated data — add missing pages, refine descriptions.</li>
                    <li><span className="font-semibold text-foreground">Copy or Download</span> and save to your site root as <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">/llms.txt</code>.</li>
                </ol>
            </div>

            {/* ── URL Input ──────────────────────────────────────────── */}
            <Card className="bg-card/40 border-border/40">
                <CardContent className="pt-5 pb-4">
                    <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                            <Globe className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground/70" />
                            <Input
                                type="url"
                                placeholder="https://example.com"
                                className="pl-10"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                disabled={phase !== "input"}
                                onKeyDown={(e) => { if (e.key === "Enter") handleGenerate() }}
                            />
                        </div>
                        {phase === "input" ? (
                            <Button onClick={handleGenerate} disabled={!url.trim()} size="lg">
                                <Zap className="w-4 h-4 mr-2" /> Generate
                            </Button>
                        ) : (
                            <Button variant="outline" onClick={handleRestart} size="lg">
                                <RotateCcw className="w-4 h-4 mr-2" /> New URL
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* ════════════════════════════════════════════════════════
                PHASE: CRAWLING — animated progress
            ════════════════════════════════════════════════════════ */}
            {/* error component */}
            {phase === "error" && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center py-20 space-y-4 text-destructive"
                >
                    <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center">
                        <Info className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold">Generation Failed</h3>
                    <p className="text-sm opacity-80 max-w-sm text-center">{errorMsg}</p>
                </motion.div>
            )}

            {phase === "crawling" && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center py-20 space-y-6"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary blur-2xl opacity-20 rounded-full animate-pulse" />
                        <Loader2 className="w-14 h-14 text-primary animate-spin relative z-10" />
                    </div>

                    <div className="space-y-4 w-full max-w-sm">
                        {CRAWL_STEPS.map((step, i) => {
                            const isDone = crawlStep > i
                            const isActive = crawlStep === i
                            const isPending = crawlStep < i

                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 flex-shrink-0
                                        ${isDone ? "bg-chart-2 text-white" : ""}
                                        ${isActive ? "bg-primary text-primary-foreground ring-4 ring-primary/20" : ""}
                                        ${isPending ? "bg-muted text-muted-foreground" : ""}
                                    `}>
                                        {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : (i + 1)}
                                    </div>
                                    <span className={`text-sm transition-colors duration-300 ${isDone ? "text-chart-2 line-through" : isActive ? "text-foreground font-medium" : "text-muted-foreground/50"}`}>
                                        {step.label}
                                    </span>
                                </motion.div>
                            )
                        })}
                    </div>
                </motion.div>
            )}

            {/* ════════════════════════════════════════════════════════
                PHASE: INPUT — Empty state
            ════════════════════════════════════════════════════════ */}
            {phase === "input" && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-border/50 rounded-xl bg-card/20"
                >
                    <Search className="w-10 h-10 text-primary/40 mb-3" />
                    <h3 className="text-lg font-semibold mb-1">Ready to Generate</h3>
                    <p className="text-muted-foreground max-w-sm text-sm">
                        Enter your website URL above and AIVO will crawl your site to auto-generate a complete llms.txt file.
                    </p>
                </motion.div>
            )}

            {/* ════════════════════════════════════════════════════════
                PHASE: EDITING — Form + Preview
            ════════════════════════════════════════════════════════ */}
            {phase === "editing" && (
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    {/* Success banner */}
                    <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs font-bold text-chart-2 border-chart-2/30 bg-chart-2/5 px-3 py-1">
                            <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> Site Crawled — {sectionCount} sections · {linkCount} links discovered
                        </Badge>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Pencil className="w-3 h-3" /> Edit any field below, changes update the preview instantly
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                        {/* ── LEFT: Editable Form ─────────────────────────── */}
                        <div className="space-y-4">
                            {/* Brand + Domain */}
                            <Card className="bg-card/40 border-border/40">
                                <CardContent className="pt-5 pb-4 space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <Label className="text-xs flex items-center gap-1">
                                                <Tag className="w-3 h-3 text-muted-foreground" />
                                                Brand Name
                                            </Label>
                                            <Input value={brandName} onChange={(e) => setBrandName(e.target.value)} />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label className="text-xs flex items-center gap-1">
                                                <Globe className="w-3 h-3 text-muted-foreground" />
                                                Domain
                                            </Label>
                                            <Input value={domain} onChange={(e) => setDomain(e.target.value)} />
                                        </div>
                                    </div>

                                    {/* Tagline */}
                                    <div className="space-y-1.5">
                                        <Label className="text-xs flex items-center justify-between">
                                            <span>Tagline</span>
                                            <span className="text-muted-foreground text-[10px]">Shown as blockquote</span>
                                        </Label>
                                        <Input value={tagline} onChange={(e) => setTagline(e.target.value)} />
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-1.5">
                                        <Label className="text-xs">Description</Label>
                                        <textarea
                                            className="w-full h-28 bg-background/50 border border-border/50 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Sections */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-semibold flex items-center gap-2">
                                        <Layers className="w-4 h-4 text-primary" />
                                        Sections
                                    </h3>
                                    <Button variant="outline" size="sm" className="h-7 text-xs" onClick={addSection}>
                                        <Plus className="w-3 h-3 mr-1" /> Add Section
                                    </Button>
                                </div>

                                <div className="space-y-2">
                                    <AnimatePresence mode="popLayout">
                                        {sections.map((section) => (
                                            <motion.div
                                                key={section.id}
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <Card className="bg-card/40 border-border/40">
                                                    {/* Section Header */}
                                                    <div
                                                        className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-muted/20 transition-colors rounded-t-lg"
                                                        onClick={() => toggleSection(section.id)}
                                                    >
                                                        <div className="flex items-center gap-2 flex-1 min-w-0">
                                                            {section.isOpen
                                                                ? <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                                                : <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                                            }
                                                            <Input
                                                                placeholder="Section title"
                                                                className="h-7 text-sm font-medium border-none shadow-none focus-visible:ring-0 px-0 bg-transparent"
                                                                value={section.title}
                                                                onChange={(e) => { e.stopPropagation(); updateSectionTitle(section.id, e.target.value) }}
                                                                onClick={(e) => e.stopPropagation()}
                                                            />
                                                            <Badge variant="secondary" className="text-[10px] flex-shrink-0">
                                                                {section.links.filter(l => l.label || l.url).length} link{section.links.filter(l => l.label || l.url).length !== 1 ? "s" : ""}
                                                            </Badge>
                                                        </div>
                                                        <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-destructive ml-2"
                                                            onClick={(e) => { e.stopPropagation(); removeSection(section.id) }}>
                                                            <Trash2 className="w-3 h-3" />
                                                        </Button>
                                                    </div>

                                                    {/* Section Links */}
                                                    <AnimatePresence>
                                                        {section.isOpen && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: "auto", opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                transition={{ duration: 0.2 }}
                                                                className="overflow-hidden"
                                                            >
                                                                <CardContent className="pt-0 pb-4 px-4 space-y-2">
                                                                    <Separator className="mb-3" />
                                                                    {section.links.map((link, linkIdx) => (
                                                                        <div key={linkIdx} className="flex items-center gap-2">
                                                                            <Input
                                                                                placeholder="Link label"
                                                                                className="h-8 text-xs flex-1"
                                                                                value={link.label}
                                                                                onChange={(e) => updateLink(section.id, linkIdx, "label", e.target.value)}
                                                                            />
                                                                            <Input
                                                                                placeholder="https://..."
                                                                                className="h-8 text-xs flex-1"
                                                                                value={link.url}
                                                                                onChange={(e) => updateLink(section.id, linkIdx, "url", e.target.value)}
                                                                            />
                                                                            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive flex-shrink-0"
                                                                                onClick={() => removeLink(section.id, linkIdx)}>
                                                                                <Trash2 className="w-3 h-3" />
                                                                            </Button>
                                                                        </div>
                                                                    ))}
                                                                    <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground w-full hover:text-primary"
                                                                        onClick={() => addLink(section.id)}>
                                                                        <Plus className="w-3 h-3 mr-1" /> Add Link
                                                                    </Button>
                                                                </CardContent>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </Card>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>

                        {/* ── RIGHT: Live Preview ─────────────────────────── */}
                        <div className="flex flex-col">
                            <Card className="bg-card/40 border-border/40 flex-1 flex flex-col overflow-hidden">
                                {/* Preview Header (macOS-style) */}
                                <CardHeader className="pb-3 border-b border-border/30">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-1.5">
                                                <span className="w-3 h-3 rounded-full bg-destructive/60" />
                                                <span className="w-3 h-3 rounded-full bg-chart-5/60" />
                                                <span className="w-3 h-3 rounded-full bg-chart-2/60" />
                                            </div>
                                            <span className="text-xs text-muted-foreground font-mono ml-2">
                                                {domain ? `${domain}/llms.txt` : "your-site.com/llms.txt"}
                                            </span>
                                        </div>
                                        <Badge variant="outline" className="text-[10px] font-bold text-chart-2 border-chart-2/30 bg-chart-2/5">
                                            {sectionCount} section{sectionCount !== 1 ? "s" : ""} · {linkCount} link{linkCount !== 1 ? "s" : ""}
                                        </Badge>
                                    </div>
                                </CardHeader>

                                {/* Preview Content (dark terminal-style) */}
                                <CardContent className="flex-1 p-0 relative">
                                    <div className="h-full min-h-[500px] bg-[oklch(0.17_0.02_280)] rounded-b-none overflow-auto">
                                        <pre className="p-5 text-sm font-mono leading-relaxed whitespace-pre-wrap break-words">
                                            {llmsTxt.split("\n").map((line, i) => (
                                                <LlmsLine key={i} line={line} />
                                            ))}
                                        </pre>
                                    </div>
                                </CardContent>

                                {/* Action Bar */}
                                <div className="border-t border-border/30 px-4 py-3 flex items-center justify-between bg-card/60">
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-[11px] text-muted-foreground">Save as</span>
                                        <code className="text-[11px] font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded">/llms.txt</code>
                                        <span className="text-[11px] text-muted-foreground">in your site root</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" size="sm" className="h-7 text-xs" onClick={handleRestart}>
                                            <RotateCcw className="w-3 h-3 mr-1" /> Restart
                                        </Button>
                                        <Button variant="outline" size="sm" className="h-7 text-xs" onClick={handleCopy} disabled={!llmsTxt}>
                                            <AnimatePresence mode="wait">
                                                {copied ? (
                                                    <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center">
                                                        <CheckCircle2 className="w-3 h-3 mr-1 text-chart-2" /> Copied!
                                                    </motion.div>
                                                ) : (
                                                    <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center">
                                                        <Copy className="w-3 h-3 mr-1" /> Copy
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </Button>
                                        <Button size="sm" className="h-7 text-xs bg-chart-1 hover:bg-chart-1/90 text-white" onClick={handleDownload} disabled={!llmsTxt}>
                                            <Download className="w-3 h-3 mr-1" /> Download
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    )
}

// ─── Syntax-highlighted line for the preview ─────────────────────────
function LlmsLine({ line }) {
    if (/^#{1,2}\s/.test(line)) {
        const isH1 = line.startsWith("# ")
        return (
            <div className={`${isH1 ? "text-lg font-bold text-white" : "text-base font-semibold text-chart-5"} ${isH1 ? "mb-1" : "mt-2"}`}>
                {line}
            </div>
        )
    }
    if (line.startsWith("> ")) {
        return (
            <div className="text-primary/80 italic border-l-2 border-primary/40 pl-3 my-1">
                {line}
            </div>
        )
    }
    const linkMatch = line.match(/^- \[(.+?)\]\((.+?)\)$/)
    if (linkMatch) {
        return (
            <div className="text-foreground/60 flex items-start gap-1">
                <span className="text-muted-foreground">-</span>
                <span>[</span>
                <span className="text-chart-2">{linkMatch[1]}</span>
                <span>](</span>
                <span className="text-primary/70 underline underline-offset-2">{linkMatch[2]}</span>
                <span>)</span>
            </div>
        )
    }
    if (line.startsWith("- ")) {
        return <div className="text-foreground/60">{line}</div>
    }
    if (!line.trim()) {
        return <div className="h-3" />
    }
    return <div className="text-foreground/70 leading-relaxed">{line}</div>
}
