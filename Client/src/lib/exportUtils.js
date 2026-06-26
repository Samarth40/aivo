import jsPDF from "jspdf";

export function downloadCSV(filename, rows) {
    if (!rows || !rows.length) return

    const keys = Object.keys(rows[0])
    const csvContent = [
        keys.join(','),
        ...rows.map(row => keys.map(k => {
            let val = row[k] === null || row[k] === undefined ? '' : row[k]
            val = String(val).replace(/"/g, '""')
            if (val.search(/("|,|\n)/g) >= 0) {
                val = `"${val}"`
            }
            return val
        }).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", filename)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

export function exportAnalysisPDF(url, topic, extractionResult, scoringResult, entityResult, callback) {
    const doc = new jsPDF({ unit: "mm", format: "a4" })
    const pageW = doc.internal.pageSize.getWidth()
    const marginL = 18
    const marginR = 18
    const contentW = pageW - marginL - marginR
    let y = 20

    const addPageIfNeeded = (needed = 20) => {
        if (y + needed > 275) { doc.addPage(); y = 20 }
    }

    // ── Header ──────────────────────────────────────────
    doc.setFillColor(30, 27, 56) // dark violet
    doc.rect(0, 0, pageW, 40, "F")
    doc.setFont("helvetica", "bold")
    doc.setFontSize(22)
    doc.setTextColor(255, 255, 255)
    doc.text("AIVO", marginL, 18)
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.text("Analysis Pipeline Report", marginL, 26)
    doc.setFontSize(8)
    doc.setTextColor(180, 180, 220)
    doc.text(`Generated: ${new Date().toLocaleString()}`, marginL, 33)
    doc.text(`Source: ${url}`, pageW - marginR - doc.getTextWidth(`Source: ${url}`), 33)
    y = 50

    // ── Target Topic ────────────────────────────────────
    if (topic) {
        doc.setFont("helvetica", "normal")
        doc.setFontSize(9)
        doc.setTextColor(120, 120, 160)
        doc.text(`Target Topic: ${topic}`, marginL, y)
        y += 10
    }

    // ═══════════════════════════════════════════════════
    // SECTION 1: Content Extraction
    // ═══════════════════════════════════════════════════
    if (extractionResult) {
        doc.setFillColor(88, 80, 230) // primary
        doc.roundedRect(marginL, y, contentW, 8, 1, 1, "F")
        doc.setFont("helvetica", "bold")
        doc.setFontSize(11)
        doc.setTextColor(255, 255, 255)
        doc.text("1. Content Extraction", marginL + 4, y + 5.5)
        y += 14

        doc.setTextColor(50, 50, 50)
        doc.setFont("helvetica", "bold")
        doc.setFontSize(12)
        doc.text(extractionResult.title || "Analyzed URL", marginL, y)
        y += 8

        // Stats row
        doc.setFont("helvetica", "normal")
        doc.setFontSize(9)
        doc.setTextColor(80, 80, 80)
        doc.text(`Clean Words: ${extractionResult.wordCount}`, marginL, y)
        doc.text(`Noise Removed: ${extractionResult.noiseRemoved}`, marginL + 50, y)
        y += 8

        // Clean text
        doc.setFont("helvetica", "normal")
        doc.setFontSize(9)
        doc.setTextColor(60, 60, 60)
        const cleanText = extractionResult.cleanText || ""
        const textLines = doc.splitTextToSize(cleanText, contentW)
        textLines.forEach((line) => {
            addPageIfNeeded(5)
            doc.text(line, marginL, y)
            y += 4.5
        })
        y += 4

        // Elements stripped
        addPageIfNeeded(15)
        doc.setFont("helvetica", "bold")
        doc.setFontSize(9)
        doc.setTextColor(180, 50, 50)
        doc.text("Elements Stripped:", marginL, y)
        y += 5
        doc.setFont("helvetica", "normal")
        doc.setTextColor(100, 60, 60)
        const stripped = extractionResult.elementsStripped || []
        stripped.forEach((el) => {
            addPageIfNeeded(5)
            doc.text(`  • ${el}`, marginL, y)
            y += 4.5
        })
        y += 8
    }

    // ═══════════════════════════════════════════════════
    // SECTION 2: Semantic Scoring
    // ═══════════════════════════════════════════════════
    if (scoringResult) {
        addPageIfNeeded(40)
        doc.setFillColor(88, 80, 230)
        doc.roundedRect(marginL, y, contentW, 8, 1, 1, "F")
        doc.setFont("helvetica", "bold")
        doc.setFontSize(11)
        doc.setTextColor(255, 255, 255)
        doc.text("2. Semantic Scoring", marginL + 4, y + 5.5)
        y += 14

        // Score
        doc.setFont("helvetica", "bold")
        doc.setFontSize(28)
        doc.setTextColor(88, 80, 230)
        doc.text(`${scoringResult.overallScore}`, marginL, y + 2)
        doc.setFont("helvetica", "normal")
        doc.setFontSize(10)
        doc.setTextColor(80, 80, 80)
        const lbl = scoringResult.overallScore >= 80 ? "Very strong alignment" : scoringResult.overallScore >= 60 ? "Moderate alignment" : "Weak alignment"
        doc.text(`/ 100  —  ${lbl}`, marginL + 18, y)
        y += 12

        // Topic & Comprehensiveness
        doc.setFont("helvetica", "normal")
        doc.setFontSize(9)
        doc.setTextColor(60, 60, 60)
        doc.text(`Topic Relevance Match: ${scoringResult.topicMatch}%`, marginL, y)
        y += 5
        doc.text(`Topical Comprehensiveness: ${scoringResult.comprehensiveness}%`, marginL, y)
        y += 8

        // Covered
        doc.setFont("helvetica", "bold")
        doc.setFontSize(9)
        doc.setTextColor(34, 170, 100)
        doc.text("Covered Subtopics:", marginL, y)
        y += 5
        doc.setFont("helvetica", "normal")
        doc.setTextColor(40, 130, 80)
        const strong = scoringResult.strongSubtopics || []
        strong.forEach((s) => {
            addPageIfNeeded(5)
            doc.text(`  ✓ ${s}`, marginL, y)
            y += 4.5
        })
        y += 3

        // Missing
        addPageIfNeeded(15)
        doc.setFont("helvetica", "bold")
        doc.setTextColor(200, 120, 30)
        doc.text("Missing Subtopics:", marginL, y)
        y += 5
        doc.setFont("helvetica", "normal")
        doc.setTextColor(180, 100, 20)
        const missing = scoringResult.missingSubtopics || []
        missing.forEach((s) => {
            addPageIfNeeded(5)
            doc.text(`  ✗ ${s}`, marginL, y)
            y += 4.5
        })
        y += 8
    }

    // ═══════════════════════════════════════════════════
    // SECTION 3: Entity Graph
    // ═══════════════════════════════════════════════════
    if (entityResult) {
        addPageIfNeeded(40)
        doc.setFillColor(88, 80, 230)
        doc.roundedRect(marginL, y, contentW, 8, 1, 1, "F")
        doc.setFont("helvetica", "bold")
        doc.setFontSize(11)
        doc.setTextColor(255, 255, 255)
        doc.text("3. Entity Graph", marginL + 4, y + 5.5)
        y += 14

        doc.setTextColor(50, 50, 50)
        doc.setFont("helvetica", "normal")
        doc.setFontSize(9)
        doc.text(`Entities Found: ${entityResult.entitiesFound}    |    Relationships: ${entityResult.relationships}`, marginL, y)
        y += 8

        // Entity table header
        doc.setFillColor(240, 240, 250)
        doc.rect(marginL, y, contentW, 6, "F")
        doc.setFont("helvetica", "bold")
        doc.setFontSize(8)
        doc.setTextColor(80, 80, 100)
        doc.text("Entity", marginL + 3, y + 4)
        doc.text("Type", marginL + 80, y + 4)
        doc.text("Confidence", marginL + 120, y + 4)
        y += 8

        // Entity rows
        doc.setFont("helvetica", "normal")
        doc.setTextColor(60, 60, 60)
        const topEntities = entityResult.topEntities || []
        topEntities.forEach((ent, i) => {
            addPageIfNeeded(6)
            if (i % 2 === 0) {
                doc.setFillColor(248, 248, 252)
                doc.rect(marginL, y - 3.5, contentW, 6, "F")
            }
            doc.text(ent.name, marginL + 3, y)
            doc.text(ent.type, marginL + 80, y)
            doc.text(ent.confidence, marginL + 120, y)
            y += 6
        })
        y += 5
    }

    // ── Footer ──────────────────────────────────────────
    const pageCount = doc.internal.getNumberOfPages()
    for (let p = 1; p <= pageCount; p++) {
        doc.setPage(p)
        doc.setFillColor(30, 27, 56)
        doc.rect(0, 287, pageW, 10, "F")
        doc.setFont("helvetica", "normal")
        doc.setFontSize(7)
        doc.setTextColor(150, 150, 190)
        doc.text("AIVO — AI-Powered Answer Engine Optimization", marginL, 292)
        doc.text(`Page ${p} of ${pageCount}`, pageW - marginR - 15, 292)
    }

    // ── Save ─────────────────────────────────────────────
    doc.save(`AIVO_Analysis_${new Date().toISOString().slice(0, 10)}.pdf`)
    if (callback) setTimeout(callback, 1500)
}

export function exportSimulationPDF(inputMode, url, results, AI_MODELS, callback) {
    const doc = new jsPDF({ unit: "mm", format: "a4" })
    const pageW = doc.internal.pageSize.getWidth()
    const mL = 18, mR = 18
    const cW = pageW - mL - mR
    let y = 20

    const checkPage = (need = 20) => { if (y + need > 275) { doc.addPage(); y = 20 } }

    // ── Header ──────────────────────────────────────
    doc.setFillColor(30, 27, 56)
    doc.rect(0, 0, pageW, 38, "F")
    doc.setFont("helvetica", "bold")
    doc.setFontSize(22)
    doc.setTextColor(255, 255, 255)
    doc.text("AIVO", mL, 17)
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.text("AI Simulation Report", mL, 25)
    doc.setFontSize(8)
    doc.setTextColor(180, 180, 220)
    doc.text(`Generated: ${new Date().toLocaleString()}`, mL, 32)
    const srcText = inputMode === "url" ? `Source: ${url}` : "Source: Pasted Content"
    doc.text(srcText, pageW - mR - doc.getTextWidth(srcText), 32)
    y = 48

    // ── Per-model sections ──────────────────────────
    const entries = Object.entries(results)
    entries.forEach(([modelId, result], idx) => {
        const model = AI_MODELS.find(m => m.id === modelId)
        if (!model) return

        checkPage(60)

        // Section header bar
        doc.setFillColor(88, 80, 230)
        doc.roundedRect(mL, y, cW, 8, 1, 1, "F")
        doc.setFont("helvetica", "bold")
        doc.setFontSize(11)
        doc.setTextColor(255, 255, 255)
        doc.text(`${idx + 1}. ${model.name} (${model.version})`, mL + 4, y + 5.5)
        y += 13

        // Score + Citation row
        doc.setFont("helvetica", "bold")
        doc.setFontSize(22)
        const sc = result.visibilityScore
        if (sc >= 80) doc.setTextColor(34, 170, 100)
        else if (sc >= 60) doc.setTextColor(200, 150, 30)
        else doc.setTextColor(200, 50, 50)
        doc.text(`${sc}`, mL, y + 2)

        doc.setFont("helvetica", "normal")
        doc.setFontSize(9)
        doc.setTextColor(80, 80, 80)
        doc.text(`/ 100   |   Citation Likelihood: ${result.citationLikelihood}`, mL + 16, y)
        y += 10

        // Simulated Response
        doc.setFont("helvetica", "bold")
        doc.setFontSize(8)
        doc.setTextColor(100, 100, 120)
        doc.text("SIMULATED AI RESPONSE", mL, y)
        y += 5
        doc.setFont("helvetica", "normal")
        doc.setFontSize(9)
        doc.setTextColor(60, 60, 60)
        const respLines = doc.splitTextToSize(result.simulatedResponse, cW)
        respLines.forEach(line => {
            checkPage(5)
            doc.text(line, mL, y)
            y += 4.5
        })
        y += 4

        // Key Signals
        checkPage(15)
        doc.setFont("helvetica", "bold")
        doc.setFontSize(8)
        doc.setTextColor(100, 100, 120)
        doc.text("KEY SIGNALS", mL, y)
        y += 5
        doc.setFont("helvetica", "normal")
        doc.setFontSize(9)
        doc.setTextColor(60, 60, 60)
        result.keySignals.forEach(sig => {
            checkPage(5)
            doc.text(`  • ${sig}`, mL, y)
            y += 4.5
        })
        y += 8
    })

    // ── Comparison Summary ──────────────────────────
    const scores = entries.map(([, r]) => r.visibilityScore)
    const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    const bestEntry = entries.reduce((best, curr) => curr[1].visibilityScore > best[1].visibilityScore ? curr : best)
    const bestModel = AI_MODELS.find(m => m.id === bestEntry[0])

    checkPage(30)
    doc.setFillColor(88, 80, 230)
    doc.roundedRect(mL, y, cW, 8, 1, 1, "F")
    doc.setFont("helvetica", "bold")
    doc.setFontSize(11)
    doc.setTextColor(255, 255, 255)
    doc.text("Comparison Summary", mL + 4, y + 5.5)
    y += 14

    doc.setFont("helvetica", "normal")
    doc.setFontSize(9)
    doc.setTextColor(60, 60, 60)
    doc.text(`Best Performer: ${bestModel?.name} (${bestEntry[1].visibilityScore}%)`, mL, y)
    y += 5
    doc.text(`Average Score: ${avg}%`, mL, y)
    y += 5
    doc.text(`Models Tested: ${entries.length}`, mL, y)
    y += 8

    doc.setFont("helvetica", "bold")
    doc.setFontSize(8)
    doc.setTextColor(100, 100, 120)
    doc.text("TOP RECOMMENDATIONS", mL, y)
    y += 5
    doc.setFont("helvetica", "normal")
    doc.setFontSize(9)
    doc.setTextColor(60, 60, 60)
    ;["Add concise Q&A-format headers", "Strengthen explicit factual claims", "Reduce promotional language below 5%"].forEach(r => {
        checkPage(5)
        doc.text(`  • ${r}`, mL, y)
        y += 4.5
    })

    // ── Footer ──────────────────────────────────────
    const pages = doc.internal.getNumberOfPages()
    for (let p = 1; p <= pages; p++) {
        doc.setPage(p)
        doc.setFillColor(30, 27, 56)
        doc.rect(0, 287, pageW, 10, "F")
        doc.setFont("helvetica", "normal")
        doc.setFontSize(7)
        doc.setTextColor(150, 150, 190)
        doc.text("AIVO — AI Simulation Playground", mL, 292)
        doc.text(`Page ${p} of ${pages}`, pageW - mR - 15, 292)
    }

    doc.save(`AIVO_Simulation_${new Date().toISOString().slice(0, 10)}.pdf`)
    if (callback) setTimeout(callback, 1500)
}

export function exportCompetitorTXT(comparison, SCORE_ROWS) {
    const lines = []
    lines.push("═══════════════════════════════════════════════════")
    lines.push("        AIVO — Competitor Intelligence Report")
    lines.push("═══════════════════════════════════════════════════")
    lines.push(`Generated: ${new Date().toLocaleString()}`)
    lines.push("")
    lines.push(`YOUR SITE:   ${comparison.target.domain} (${comparison.target.url})`)
    lines.push(`COMPETITOR:  ${comparison.competitor.domain} (${comparison.competitor.url})`)
    lines.push("")
    lines.push("───────────────────────────────────────────────────")
    lines.push("  SCORE BREAKDOWN")
    lines.push("───────────────────────────────────────────────────")
    lines.push(`${"Metric".padEnd(20)} ${"You".padStart(6)} ${"Comp".padStart(6)} ${"Diff".padStart(6)}`)
    lines.push("─".repeat(40))
    SCORE_ROWS.forEach(({ key, label }) => {
        const t = comparison.target.scores[key]
        const c = comparison.competitor.scores[key]
        const d = t - c
        lines.push(`${label.padEnd(20)} ${String(t).padStart(6)} ${String(c).padStart(6)} ${(d > 0 ? "+" : "") + d}`.padStart(6))
    })
    lines.push("")
    lines.push("───────────────────────────────────────────────────")
    lines.push("  YOUR STRENGTHS")
    lines.push("───────────────────────────────────────────────────")
    comparison.target.strengths.forEach((s, i) => lines.push(`  ${i + 1}. ${s}`))
    lines.push("")
    lines.push("───────────────────────────────────────────────────")
    lines.push("  YOUR WEAKNESSES")
    lines.push("───────────────────────────────────────────────────")
    comparison.target.weaknesses.forEach((s, i) => lines.push(`  ${i + 1}. ${s}`))
    lines.push("")
    lines.push("───────────────────────────────────────────────────")
    lines.push("  COMPETITOR STRENGTHS")
    lines.push("───────────────────────────────────────────────────")
    comparison.competitor.strengths.forEach((s, i) => lines.push(`  ${i + 1}. ${s}`))
    lines.push("")
    lines.push("───────────────────────────────────────────────────")
    lines.push("  SUGGESTIONS TO GET AHEAD")
    lines.push("───────────────────────────────────────────────────")
    comparison.suggestions.forEach((s, i) => {
        lines.push(`  ${i + 1}. [${s.priority.toUpperCase()}] ${s.title}`)
        lines.push(`     ${s.desc}`)
        lines.push("")
    })
    lines.push("═══════════════════════════════════════════════════")
    lines.push("  Report generated by AIVO Competitor Intelligence")
    lines.push("═══════════════════════════════════════════════════")

    const blob = new Blob([lines.join("\n")], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `aivo-competitor-report-${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
}

export function exportLlmsTXT(llmsTxt) {
    const blob = new Blob([llmsTxt], { type: "text/plain" })
    const dlUrl = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = dlUrl
    a.download = "llms.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(dlUrl)
}
